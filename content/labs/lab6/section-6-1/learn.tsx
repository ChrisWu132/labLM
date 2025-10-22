/**
 * Lab 6, Section 6.1: Why Workflows?
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Why Do We Need AI Workflows?
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Imagine you're writing a research report. You need to:
      </p>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          <li>Ask AI: "What are the main topics about space exploration?"</li>
          <li><strong>Copy</strong> the response</li>
          <li><strong>Paste</strong> it into a new prompt: "Explain the first topic in detail: [paste here]"</li>
          <li><strong>Copy</strong> that response</li>
          <li><strong>Paste</strong> it again: "Write this in simpler language: [paste here]"</li>
          <li><strong>Copy</strong> and <strong>paste</strong> again and again...</li>
        </ol>
      </div>

      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-red-700 mb-2">
          The Problem
        </p>
        <p className="text-gray-700">
          All that copying and pasting is <strong>tedious</strong>, <strong>error-prone</strong>, and <strong>slow</strong>. You're basically acting as a messenger between AI steps!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Enter: AI Workflows
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        A <strong className="text-[#164055]">workflow</strong> is like a recipe that automatically connects multiple AI steps together. You set it up once, and then it runs all the steps for you - no copying and pasting needed!
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-[#3b999c] mb-2">
          With Workflows
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li><strong>Step 1:</strong> Generate topics about space exploration</li>
          <li><strong>Step 2:</strong> Automatically take first topic → explain in detail</li>
          <li><strong>Step 3:</strong> Automatically take explanation → simplify language</li>
          <li> <strong>Done!</strong> Get your final result in one click</li>
        </ol>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Real-World Examples
      </h3>

      <div className="grid gap-4 mb-8">
        <div className="bg-white border-2 border-[#f7aa37] rounded-lg p-5">
          <h4 className="text-lg font-bold text-[#164055] mb-2"> Essay Writing</h4>
          <p className="text-gray-700 text-sm">
            <strong>Step 1:</strong> Brainstorm ideas → <strong>Step 2:</strong> Create outline → <strong>Step 3:</strong> Write introduction → <strong>Step 4:</strong> Expand each point
          </p>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-lg p-5">
          <h4 className="text-lg font-bold text-[#164055] mb-2"> Research Assistant</h4>
          <p className="text-gray-700 text-sm">
            <strong>Step 1:</strong> Gather facts → <strong>Step 2:</strong> Summarize → <strong>Step 3:</strong> Check accuracy → <strong>Step 4:</strong> Format as report
          </p>
        </div>

        <div className="bg-white border-2 border-[#e67c6d] rounded-lg p-5">
          <h4 className="text-lg font-bold text-[#164055] mb-2"> Study Guide Creator</h4>
          <p className="text-gray-700 text-sm">
            <strong>Step 1:</strong> Extract key concepts → <strong>Step 2:</strong> Generate questions → <strong>Step 3:</strong> Create answers → <strong>Step 4:</strong> Format as flashcards
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Key Insight
        </p>
        <p className="text-gray-700">
          Workflows let you break down <strong>complex tasks</strong> into <strong>simple steps</strong>, then chain them together automatically. This is called <strong>computational thinking</strong> - a superpower for solving big problems!
        </p>
      </div>
    </LearnContent>
  )
}
