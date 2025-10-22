/**
 * Lab 6, Section 6.8: Review & Gallery
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 6 Review: AI Workflows
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Congratulations! You've completed Lab 6 and learned how to build AI workflows. Let's review what you've mastered.
      </p>

      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-4">
          What You've Accomplished
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Problem Identification</h4>
            <p className="text-xs text-gray-600">
              Recognized the tedium of manual copy-paste between AI steps
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Interface Mastery</h4>
            <p className="text-xs text-gray-600">
              Learned to navigate the workflow builder canvas, nodes, and controls
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Basic Building</h4>
            <p className="text-xs text-gray-600">
              Created 2-3 step workflows with connected nodes
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Variable Usage</h4>
            <p className="text-xs text-gray-600">
              Mastered {'{{variable}}'} syntax to pass data between steps
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Real Application</h4>
            <p className="text-xs text-gray-600">
              Rebuilt Lab 5's manual process as an automated workflow
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Customization</h4>
            <p className="text-xs text-gray-600">
              Modified templates and adapted them for specific needs
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Original Creation</h4>
            <p className="text-xs text-gray-600">
              Designed and built a completely original workflow from scratch
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2"></div>
            <h4 className="font-bold text-[#164055] mb-1 text-sm">Problem Decomposition</h4>
            <p className="text-xs text-gray-600">
              Learned to break complex tasks into simple, sequential steps
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Key Concepts Recap
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-lg">
          <h4 className="font-bold text-[#164055] mb-2">1. Workflows Automate Multi-Step Tasks</h4>
          <p className="text-sm text-gray-700">
            Instead of manually copying and pasting between prompts, workflows automatically pass data from one step to the next, saving time and reducing errors.
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#f7aa37] p-5 rounded-lg">
          <h4 className="font-bold text-[#164055] mb-2">2. Variables Connect Steps</h4>
          <p className="text-sm text-gray-700">
            Using <code className="bg-gray-100 px-2 py-1 rounded">{'{{node_name}}'}</code> syntax, you can reference previous outputs in later prompts, creating a chain of dependent operations.
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#e67c6d] p-5 rounded-lg">
          <h4 className="font-bold text-[#164055] mb-2">3. Decomposition is Key</h4>
          <p className="text-sm text-gray-700">
            Breaking complex problems into simple steps (decomposition) is a fundamental computational thinking skill that applies far beyond AI workflows.
          </p>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-5 rounded-lg">
          <h4 className="font-bold text-[#164055] mb-2">4. Templates Speed Development</h4>
          <p className="text-sm text-gray-700">
            Starting with proven templates and customizing them for your needs is faster and more reliable than building everything from scratch.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Beyond This Lab
      </h3>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h4 className="font-bold text-[#164055] mb-3">
          Where Can You Use Workflows?
        </h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-xl"></span>
            <div>
              <strong className="text-[#164055]">School:</strong>
              <span className="text-gray-700"> Research, essay planning, study guides</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xl"></span>
            <div>
              <strong className="text-[#164055]">Work:</strong>
              <span className="text-gray-700"> Report generation, data analysis, documentation</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xl"></span>
            <div>
              <strong className="text-[#164055]">Creative:</strong>
              <span className="text-gray-700"> Story development, content creation, brainstorming</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xl"></span>
            <div>
              <strong className="text-[#164055]">Problem-Solving:</strong>
              <span className="text-gray-700"> Planning, decision-making, troubleshooting</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          The Big Picture
        </p>
        <p className="text-gray-700">
          Workflow building isn't just about AI - it's about <strong>systematic thinking</strong>. The ability to break down complex problems, automate repetitive tasks, and design efficient processes is valuable in every field, from science to business to art.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Next: Take the Quiz
        </p>
        <p className="text-gray-700">
          Head to the Quiz tab to test your knowledge of workflows. This will help solidify what you've learned and identify any areas to review!
        </p>
      </div>
    </LearnContent>
  )
}
