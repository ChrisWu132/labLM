/**
 * Lab 6, Section 6.6: Customize Template
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Customizing Workflow Templates
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Now that you've built workflows from scratch, let's learn how to adapt and customize pre-built templates for your specific needs!
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <h3 className="font-bold text-[#164055] mb-3">
          🎯 Why Use Templates?
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            ✅ <strong>Save Time:</strong> Don't reinvent the wheel for common tasks
          </p>
          <p>
            ✅ <strong>Learn Best Practices:</strong> See how experienced users structure workflows
          </p>
          <p>
            ✅ <strong>Starting Point:</strong> Modify templates to fit your exact needs
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Common Template Types
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border-2 border-blue-400 rounded-lg p-5">
          <div className="text-3xl mb-2">📝</div>
          <h4 className="font-bold text-[#164055] mb-2">Writing Assistant</h4>
          <p className="text-sm text-gray-700 mb-3">
            Brainstorm → Outline → Draft → Revise
          </p>
          <p className="text-xs text-gray-500">
            <strong>Good for:</strong> Essays, articles, creative writing
          </p>
        </div>

        <div className="bg-white border-2 border-purple-400 rounded-lg p-5">
          <div className="text-3xl mb-2">🔬</div>
          <h4 className="font-bold text-[#164055] mb-2">Research Pipeline</h4>
          <p className="text-sm text-gray-700 mb-3">
            Gather → Organize → Analyze → Summarize
          </p>
          <p className="text-xs text-gray-500">
            <strong>Good for:</strong> School projects, reports, investigations
          </p>
        </div>

        <div className="bg-white border-2 border-green-400 rounded-lg p-5">
          <div className="text-3xl mb-2">📚</div>
          <h4 className="font-bold text-[#164055] mb-2">Study Guide Maker</h4>
          <p className="text-sm text-gray-700 mb-3">
            Extract concepts → Create questions → Generate answers → Format
          </p>
          <p className="text-xs text-gray-500">
            <strong>Good for:</strong> Test prep, flashcards, review materials
          </p>
        </div>

        <div className="bg-white border-2 border-orange-400 rounded-lg p-5">
          <div className="text-3xl mb-2">💡</div>
          <h4 className="font-bold text-[#164055] mb-2">Idea Generator</h4>
          <p className="text-sm text-gray-700 mb-3">
            Generate ideas → Evaluate → Expand best → Refine
          </p>
          <p className="text-xs text-gray-500">
            <strong>Good for:</strong> Brainstorming, problem-solving, creativity
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How to Customize a Template
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-5 rounded-lg">
          <h4 className="font-bold text-blue-700 mb-2">
            1. Understand the Original Purpose
          </h4>
          <p className="text-sm text-gray-700">
            Read through each node to see what the template is designed to do. Identify the input, process steps, and expected output.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-5 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">
            2. Modify Prompts for Your Needs
          </h4>
          <p className="text-sm text-gray-700">
            Click on each node and adjust the prompts to match your specific task. Change keywords, add constraints, or specify format requirements.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-5 rounded-lg">
          <h4 className="font-bold text-green-700 mb-2">
            3. Add or Remove Steps
          </h4>
          <p className="text-sm text-gray-700">
            Need an extra verification step? Add it! Don't need summarization? Remove that node. Make the workflow fit your process.
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-5 rounded-lg">
          <h4 className="font-bold text-orange-700 mb-2">
            4. Test and Iterate
          </h4>
          <p className="text-sm text-gray-700">
            Run the customized workflow with test data. If outputs aren't quite right, refine the prompts and try again.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Customization Example
        </p>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Original Template:</strong> "Essay Writer" for high school
          </p>
          <p>
            <strong>Your Modification:</strong> Change prompts to write for middle school audience, add a step for vocabulary simplification, remove formal citation step
          </p>
          <p>
            <strong>Result:</strong> Middle-school friendly essay writer!
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          🎯 Your Task
        </p>
        <p className="text-gray-700">
          In the Try It tab, you'll start with a template and customize it for your own specific needs. Think about how you can adapt it to match your writing style, subject, or goals!
        </p>
      </div>
    </LearnContent>
  )
}
