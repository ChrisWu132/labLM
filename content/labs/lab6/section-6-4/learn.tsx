/**
 * Lab 6, Section 6.4: Using Variables
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Using Variables in Workflows
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        The real power of workflows comes from <strong>passing data between steps</strong>. This is done using <strong>variables</strong>!
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4">
        What Are Variables?
      </h3>

      <p className="text-gray-700 mb-6">
        A variable is like a container that holds the output from a previous step. You can reference it in later steps using special syntax.
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-[#164055] mb-4">
          Variable Syntax
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <code className="text-[#3b999c] font-mono text-lg">
              {'{{node_name}}'}
            </code>
            <p className="text-sm text-gray-600 mt-2">
              References the entire output from a node named "node_name"
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Example: Research Workflow
      </h3>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
        <div className="space-y-4">
          <div className="bg-white border-2 border-blue-400 rounded-lg p-4">
            <div className="font-bold text-blue-700 mb-2">Step 1: "Topic Finder"</div>
            <p className="text-sm text-gray-700 mb-2">Prompt:</p>
            <code className="block bg-gray-100 p-3 rounded text-sm">
              "What are 5 interesting topics about renewable energy?"
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Output: List of 5 topics
            </p>
          </div>

          <div className="text-center text-2xl text-[#3b999c]">↓</div>

          <div className="bg-white border-2 border-purple-400 rounded-lg p-4">
            <div className="font-bold text-purple-700 mb-2">Step 2: "Detail Expander"</div>
            <p className="text-sm text-gray-700 mb-2">Prompt:</p>
            <code className="block bg-gray-100 p-3 rounded text-sm">
              "Take the first topic from this list: <span className="text-[#3b999c] font-bold">{'{{Topic Finder}}'}</span> and explain it in detail for middle school students."
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Output: Detailed explanation
            </p>
          </div>

          <div className="text-center text-2xl text-[#3b999c]">↓</div>

          <div className="bg-white border-2 border-green-400 rounded-lg p-4">
            <div className="font-bold text-green-700 mb-2">Step 3: "Quiz Generator"</div>
            <p className="text-sm text-gray-700 mb-2">Prompt:</p>
            <code className="block bg-gray-100 p-3 rounded text-sm">
              "Based on this explanation: <span className="text-[#3b999c] font-bold">{'{{Detail Expander}}'}</span>, create 3 quiz questions."
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Output: 3 quiz questions
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Important Rules
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Node names matter:</strong> The variable name must match the node name exactly
          </li>
          <li>
            <strong>Use double curly braces:</strong> {'{{node_name}}'} not {'{node_name}'}
          </li>
          <li>
            <strong>Execution order:</strong> Make sure the referenced node runs before the node using the variable
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Variables Are Powerful
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border-2 border-[#3b999c] rounded-lg p-5">
          <div className="text-3xl mb-2"></div>
          <h4 className="font-bold text-[#164055] mb-2">Automatic Flow</h4>
          <p className="text-sm text-gray-700">
            Data flows automatically from one step to the next without manual intervention
          </p>
        </div>

        <div className="bg-white border-2 border-[#f7aa37] rounded-lg p-5">
          <div className="text-3xl mb-2"></div>
          <h4 className="font-bold text-[#164055] mb-2">No Copy-Paste</h4>
          <p className="text-sm text-gray-700">
            Never need to manually copy output from one step and paste into another
          </p>
        </div>

        <div className="bg-white border-2 border-[#e67c6d] rounded-lg p-5">
          <div className="text-3xl mb-2"></div>
          <h4 className="font-bold text-[#164055] mb-2">Build Complex Chains</h4>
          <p className="text-sm text-gray-700">
            Chain together many steps to solve complex multi-stage problems
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Practice Time
        </p>
        <p className="text-gray-700">
          In the Try It tab, you'll build a 3-step workflow that uses variables to pass data between steps. Pay close attention to how you reference previous nodes!
        </p>
      </div>
    </LearnContent>
  )
}
