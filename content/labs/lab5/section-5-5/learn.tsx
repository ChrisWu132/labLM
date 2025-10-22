/**
 * Lab 5, Section 5.5: Multi-Step Workflow
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Multi-Step Workflows: Chaining Prompts Together
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        So far you've been creating single prompts. But what about complex problems that require multiple steps? That's where multi-step workflows come in—using the output from one prompt as input for the next!
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-[#3b999c] mb-2">
          Why Multi-Step Workflows?
        </p>
        <p className="text-gray-700">
          Complex problems often require breaking down into smaller steps. By chaining prompts together, you can tackle sophisticated tasks that would be difficult or impossible with a single prompt.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        What is Prompt Chaining?
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        <strong>Prompt chaining</strong> means using the output from one AI conversation as the input or context for the next conversation. Think of it like following a recipe with multiple steps—each step builds on the previous one.
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-[#3b999c] mb-4">
          Example: Writing a Story (Single vs. Multi-Step)
        </h4>

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-red-700 mb-2"> Single Large Prompt (Overwhelming):</p>
            <div className="bg-red-50 border border-red-300 rounded p-4 text-sm text-gray-700">
              "Write a complete short story with characters, plot, setting, conflict, and resolution. Make it 500 words."
            </div>
            <p className="text-sm text-red-600 mt-2">Problem: Too much at once, less control over each element</p>
          </div>

          <div>
            <p className="font-semibold text-green-700 mb-2"> Multi-Step Workflow (Manageable):</p>
            <div className="space-y-2">
              <div className="bg-green-50 border border-green-300 rounded p-3 text-sm">
                <p className="font-semibold text-green-800 mb-1">Step 1: Brainstorm</p>
                <p className="text-gray-700">"Help me brainstorm 3 story ideas about friendship. For each, give a one-sentence summary."</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded p-3 text-sm">
                <p className="font-semibold text-green-800 mb-1">Step 2: Develop Characters</p>
                <p className="text-gray-700">"I chose idea #2. Help me develop 2 main characters with distinct personalities and backgrounds."</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded p-3 text-sm">
                <p className="font-semibold text-green-800 mb-1">Step 3: Outline Plot</p>
                <p className="text-gray-700">"With these characters, help me create a 5-point plot outline: setup, conflict, rising action, climax, resolution."</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded p-3 text-sm">
                <p className="font-semibold text-green-800 mb-1">Step 4: Write (You do this!)</p>
                <p className="text-gray-700">Use the brainstorming, characters, and outline to write your own story!</p>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">Benefit: More control, better quality, you learn at each step</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        When to Use Multi-Step Workflows
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-blue-700 mb-3">
            1. Complex Research Projects
          </h4>
          <div className="text-gray-700 space-y-2">
            <p><strong>Step 1:</strong> Identify main topic areas to research</p>
            <p><strong>Step 2:</strong> Deep dive into each topic area</p>
            <p><strong>Step 3:</strong> Compare and synthesize findings</p>
            <p><strong>Step 4:</strong> Create your own analysis or presentation</p>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-purple-700 mb-3">
            2. Problem-Solving Tasks
          </h4>
          <div className="text-gray-700 space-y-2">
            <p><strong>Step 1:</strong> Break down the problem into components</p>
            <p><strong>Step 2:</strong> Solve each component separately</p>
            <p><strong>Step 3:</strong> Combine solutions</p>
            <p><strong>Step 4:</strong> Test and refine your solution</p>
          </div>
        </div>

        <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-orange-700 mb-3">
            3. Creative Projects
          </h4>
          <div className="text-gray-700 space-y-2">
            <p><strong>Step 1:</strong> Brainstorm ideas and choose direction</p>
            <p><strong>Step 2:</strong> Develop detailed elements</p>
            <p><strong>Step 3:</strong> Get feedback on your plan</p>
            <p><strong>Step 4:</strong> Create the final product yourself</p>
          </div>
        </div>

        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-3">
            4. Learning Complex Topics
          </h4>
          <div className="text-gray-700 space-y-2">
            <p><strong>Step 1:</strong> Get a high-level overview</p>
            <p><strong>Step 2:</strong> Deep dive into difficult concepts</p>
            <p><strong>Step 3:</strong> Practice with examples</p>
            <p><strong>Step 4:</strong> Test your understanding</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Best Practices for Prompt Chaining
      </h3>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8">
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-yellow-800 mb-2">1. Start with a Plan</p>
            <p className="text-gray-700 text-sm">Before you begin, outline all the steps you'll need. What's the end goal? What information do you need at each stage?</p>
          </div>

          <div>
            <p className="font-semibold text-yellow-800 mb-2">2. Make Each Step Clear</p>
            <p className="text-gray-700 text-sm">Each prompt should have a specific, focused goal. Don't try to do too much in one step.</p>
          </div>

          <div>
            <p className="font-semibold text-yellow-800 mb-2">3. Reference Previous Steps</p>
            <p className="text-gray-700 text-sm">In later prompts, reference what you learned earlier: "Based on the characters we developed..." or "Using the outline from before..."</p>
          </div>

          <div>
            <p className="font-semibold text-yellow-800 mb-2">4. Review Between Steps</p>
            <p className="text-gray-700 text-sm">Don't blindly move forward. Check each output, think critically, and decide if you need to adjust before the next step.</p>
          </div>

          <div>
            <p className="font-semibold text-yellow-800 mb-2">5. You Do the Final Work</p>
            <p className="text-gray-700 text-sm">Use AI to help with planning, brainstorming, and understanding—but YOU should create the final product using what you learned.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#164055] text-white rounded-xl p-8 text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Manual vs. Automated Prompt Chaining
        </h3>
        <div className="text-left max-w-3xl mx-auto space-y-4">
          <div>
            <p className="font-semibold text-lg mb-2">Manual Chaining (What you're learning now):</p>
            <p className="text-gray-200 text-sm">You run each prompt yourself, review the output, and decide what to do next. Great for learning and complex tasks where you need control!</p>
          </div>
          <div>
            <p className="font-semibold text-lg mb-2">Automated Chaining (Lab 6 preview!):</p>
            <p className="text-gray-200 text-sm">You set up a workflow once, and the system automatically chains prompts together. Perfect for repetitive tasks or standardized processes. Coming in Lab 6!</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Pro Tip
        </p>
        <p className="text-gray-700">
          Think of prompt chaining like building with LEGO bricks. Each prompt is a building block. You can combine them in different ways to create something complex and amazing!
        </p>
      </div>
    </LearnContent>
  )
}
