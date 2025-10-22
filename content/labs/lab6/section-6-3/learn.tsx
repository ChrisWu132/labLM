/**
 * Lab 6, Section 6.3: First Workflow
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Building Your First Workflow
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Let's build a simple 2-step workflow! We'll create a "Story Idea Generator" that:
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-4 py-2 bg-[#3b999c] text-white rounded-lg font-semibold">
            Step 1
          </div>
          <p className="text-gray-700">Generate 3 story ideas about a topic</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#f7aa37] text-white rounded-lg font-semibold">
            Step 2
          </div>
          <p className="text-gray-700">Expand the first idea into a full story outline</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Step-by-Step Instructions
      </h3>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 rounded-lg">
          <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Add First Node
          </h4>
          <ol className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li>Drag an "AI Prompt" node from the left panel to the canvas</li>
            <li>Click on the node to select it</li>
            <li>In the right panel, name it <strong>"Generate Ideas"</strong></li>
            <li>Enter this prompt: <code className="bg-white px-2 py-1 rounded">"Give me 3 creative story ideas about space exploration"</code></li>
          </ol>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-6 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
            Add Second Node
          </h4>
          <ol className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li>Drag another "AI Prompt" node to the canvas, below the first one</li>
            <li>Name it <strong>"Expand Idea"</strong></li>
            <li>Enter this prompt: <code className="bg-white px-2 py-1 rounded">"Take this idea and create a detailed story outline: ..."</code></li>
          </ol>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-6 rounded-lg">
          <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
            Connect the Nodes
          </h4>
          <ol className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li>Hover over the first node to see connection points (small circles)</li>
            <li>Click and drag from the output point (bottom) to the input point of the second node (top)</li>
            <li>You should see a line connecting them!</li>
          </ol>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-6 rounded-lg">
          <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
            Run Your Workflow!
          </h4>
          <ol className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li>Click the "Run" button at the top</li>
            <li>Watch as Step 1 executes first</li>
            <li>Then Step 2 automatically runs using Step 1's output!</li>
          </ol>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mt-8 mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          What's Happening?
        </p>
        <p className="text-gray-700">
          When you connect nodes, the second node can automatically access the first node's output. No copying and pasting needed! The workflow builder handles the data flow for you.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Ready to Build?
        </p>
        <p className="text-gray-700">
          Head to the Try It tab and follow these steps to create your first working workflow! Take your time and experiment - you can't break anything.
        </p>
      </div>
    </LearnContent>
  )
}
