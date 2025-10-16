'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { WorkflowEngine } from '@/lib/workflow/workflow-engine'
import type { Workflow, WorkflowConfig } from '@/lib/workflow/types'

/**
 * Save a new workflow or update existing one
 */
export async function saveWorkflow(workflow: {
  id?: string
  name: string
  description?: string
  config: WorkflowConfig
}) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Please log in first' }
  }

  try {
    if (workflow.id) {
      // Update existing
      const { data, error } = await supabase
        .from('workflows')
        .update({
          name: workflow.name,
          description: workflow.description,
          config: workflow.config,
          updated_at: new Date().toISOString()
        })
        .eq('id', workflow.id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } else {
      // Create new
      const { data, error } = await supabase
        .from('workflows')
        .insert({
          user_id: user.id,
          name: workflow.name,
          description: workflow.description,
          config: workflow.config,
          lab_number: 6
        })
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save workflow'
    }
  }
}

/**
 * Get user's workflows
 */
export async function getUserWorkflows() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please log in first' }
  }

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * Get public workflow templates
 */
export async function getWorkflowTemplates() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('is_template', true)
    .eq('is_public', true)
    .order('template_category')

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * Load a specific workflow
 */
export async function loadWorkflow(workflowId: string) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', workflowId)
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  // Check permission (own workflow or public template)
  if (data.user_id !== user?.id && !(data.is_public && data.is_template)) {
    return { success: false, error: 'No permission to access this workflow' }
  }

  return { success: true, data }
}

/**
 * Execute a workflow
 */
export async function executeWorkflow(workflowId: string, inputData: string) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Please log in first' }
  }

  try {
    // Load workflow
    const { data: workflow, error: loadError } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .single()

    if (loadError || !workflow) {
      return { success: false, error: 'Workflow not found' }
    }

    // Create execution record
    const { data: execution, error: createError } = await supabase
      .from('workflow_executions')
      .insert({
        workflow_id: workflowId,
        user_id: user.id,
        input_data: inputData,
        status: 'running'
      })
      .select()
      .single()

    if (createError || !execution) {
      return { success: false, error: 'Failed to create execution record' }
    }

    // Execute workflow
    const engine = new WorkflowEngine(
      workflow.config.nodes,
      workflow.config.edges
    )

    const result = await engine.execute(inputData)

    // Update execution record
    const updateData = {
      status: result.success ? 'completed' : 'failed',
      final_output: result.finalOutput,
      execution_log: { steps: result.log },
      error_message: result.error,
      completed_at: new Date().toISOString(),
      tokens_used: estimateTokens(result.log),
      api_calls: result.log.length
    }

    await supabase
      .from('workflow_executions')
      .update(updateData)
      .eq('id', execution.id)

    // Update workflow stats
    await supabase.rpc('increment_workflow_execution', {
      workflow_id_param: workflowId
    })

    return {
      success: result.success,
      data: {
        executionId: execution.id,
        finalOutput: result.finalOutput,
        log: result.log
      },
      error: result.error
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Execution failed'
    }
  }
}

/**
 * Execute workflow without saving (for testing in builder)
 */
export async function executeWorkflowDirect(
  config: WorkflowConfig,
  inputData: string
) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Please log in first' }
  }

  try {
    const engine = new WorkflowEngine(config.nodes, config.edges)
    const result = await engine.execute(inputData)

    return {
      success: result.success,
      data: {
        finalOutput: result.finalOutput,
        log: result.log
      },
      error: result.error
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Execution failed'
    }
  }
}

/**
 * Delete a workflow
 */
export async function deleteWorkflow(workflowId: string) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please log in first' }
  }

  const { error } = await supabase
    .from('workflows')
    .delete()
    .eq('id', workflowId)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Clone a template to user's workflows
 */
export async function cloneTemplate(templateId: string) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please log in first' }
  }

  // Load template
  const { data: template, error: loadError } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', templateId)
    .eq('is_template', true)
    .single()

  if (loadError || !template) {
    return { success: false, error: 'Template not found' }
  }

  // Create copy
  const { data, error } = await supabase
    .from('workflows')
    .insert({
      user_id: user.id,
      name: `${template.name} (我的副本)`,
      description: template.description,
      config: template.config,
      lab_number: 6,
      is_template: false,
      is_public: false
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * Estimate token usage from execution log
 */
function estimateTokens(log: any[]): number {
  let total = 0
  for (const entry of log) {
    // Rough estimate: 1 token ≈ 4 characters
    total += Math.ceil((entry.input.length + entry.output.length) / 4)
  }
  return total
}
