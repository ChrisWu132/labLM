/**
 * Lab 6, Section 6.2: Guided Tour
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Workflow Builder: A Guided Tour
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        The Workflow Builder is your tool for creating automated AI workflows. Let's explore its key parts:
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#164055] mb-4">
          🎨 Main Components
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3b999c] text-white flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Canvas (Center)</h4>
              <p className="text-gray-700 text-sm">
                The main workspace where you build your workflow. Each step appears as a card (node) that you can move around.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f7aa37] text-white flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Node Library (Left)</h4>
              <p className="text-gray-700 text-sm">
                Drag-and-drop node types like "AI Prompt", "Input", or "Output". These are the building blocks of your workflow.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e67c6d] text-white flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Configuration Panel (Right)</h4>
              <p className="text-gray-700 text-sm">
                When you click a node, this panel lets you edit its prompt, name, and settings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Control Buttons (Top)</h4>
              <p className="text-gray-700 text-sm">
                "Run", "Save", "Clear" - buttons to execute your workflow or manage it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        🔗 How Workflows Work
      </h3>

      <div className="bg-gradient-to-r from-[#3b999c]/10 to-[#f7aa37]/10 border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <ol className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="font-bold text-[#3b999c] text-lg">1.</span>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Create Nodes</h4>
              <p className="text-gray-700 text-sm">
                Add AI prompt nodes to the canvas. Each node is one step in your workflow.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="font-bold text-[#3b999c] text-lg">2.</span>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Connect Nodes</h4>
              <p className="text-gray-700 text-sm">
                Draw connections (edges) between nodes to show data flow. The output of one node becomes available to the next.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="font-bold text-[#3b999c] text-lg">3.</span>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Use Variables</h4>
              <p className="text-gray-700 text-sm">
                Reference previous outputs using <code className="bg-gray-100 px-2 py-1 rounded text-xs">{'{{node_name}}'}</code> syntax in your prompts.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="font-bold text-[#3b999c] text-lg">4.</span>
            <div>
              <h4 className="font-bold text-[#164055] mb-1">Run & Watch</h4>
              <p className="text-gray-700 text-sm">
                Click "Run" and watch as each node executes in order, passing data automatically!
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-[#3b999c] mb-2">
          Example: Story Writer Workflow
        </p>
        <div className="text-gray-700 space-y-3">
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 bg-white border-2 border-[#3b999c] rounded-lg text-sm font-semibold">
              Input: Topic
            </div>
            <span className="text-[#3b999c]">→</span>
            <div className="px-3 py-2 bg-white border-2 border-[#3b999c] rounded-lg text-sm">
              AI: Generate ideas
            </div>
            <span className="text-[#3b999c]">→</span>
            <div className="px-3 py-2 bg-white border-2 border-[#3b999c] rounded-lg text-sm">
              AI: Write story
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Pro Tip
        </p>
        <p className="text-gray-700">
          Start simple! Build a 2-step workflow first, test it, then add more steps gradually. This makes debugging easier.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          🎯 In the Try It Tab
        </p>
        <p className="text-gray-700">
          You'll explore a pre-built workflow and see how each component works in action. Take your time clicking around and experimenting!
        </p>
      </div>
    </LearnContent>
  )
}
