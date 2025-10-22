'use client'

/**
 * Lab 6, Section 6.8: Review & Gallery
 * Quiz Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 'q1',
      question: 'What is the main benefit of using AI workflows?',
      options: [
        { id: 'a', text: 'They make AI responses more accurate' },
        { id: 'b', text: 'They automatically chain multiple steps without manual copy-paste' },
        { id: 'c', text: 'They make AI run faster' },
        { id: 'd', text: 'They remove the need to write prompts' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'How do you reference a previous node\'s output in a prompt?',
      options: [
        { id: 'a', text: 'Using {node_name} syntax' },
        { id: 'b', text: 'Using {{node_name}} syntax' },
        { id: 'c', text: 'Using @node_name syntax' },
        { id: 'd', text: 'Copy and paste manually' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      question: 'What is "decomposition" in the context of workflows?',
      options: [
        { id: 'a', text: 'Removing steps from a workflow' },
        { id: 'b', text: 'Breaking complex tasks into simple sequential steps' },
        { id: 'c', text: 'Combining multiple workflows into one' },
        { id: 'd', text: 'Deleting old workflows' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      question: 'Which of these is a good candidate for a workflow?',
      options: [
        { id: 'a', text: 'A single AI prompt with no follow-up' },
        { id: 'b', text: 'Real-time video processing' },
        { id: 'c', text: 'Converting class notes into study guides with multiple refinement steps' },
        { id: 'd', text: 'Solving complex math equations' }
      ],
      correct: 'c'
    },
    {
      id: 'q5',
      question: 'What should you do first when creating a workflow from scratch?',
      options: [
        { id: 'a', text: 'Start adding nodes immediately' },
        { id: 'b', text: 'Copy someone else\'s workflow exactly' },
        { id: 'c', text: 'Plan the steps and understand the data flow' },
        { id: 'd', text: 'Build the most complex workflow possible' }
      ],
      correct: 'c'
    },
    {
      id: 'q6',
      question: 'Why are workflow templates useful?',
      options: [
        { id: 'a', text: 'They are the only way to build workflows' },
        { id: 'b', text: 'They provide a starting point and show best practices' },
        { id: 'c', text: 'They guarantee perfect results every time' },
        { id: 'd', text: 'They cannot be modified' }
      ],
      correct: 'b'
    },
    {
      id: 'q7',
      question: 'In a workflow with 3 nodes (A → B → C), what can Node B reference?',
      options: [
        { id: 'a', text: 'Only Node A\'s output' },
        { id: 'b', text: 'Only Node C\'s output' },
        { id: 'c', text: 'Both Node A and Node C outputs' },
        { id: 'd', text: 'No other nodes' }
      ],
      correct: 'a'
    }
  ]

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId })
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
  }

  const score = questions.reduce((acc, q) => {
    return answers[q.id] === q.correct ? acc + 1 : acc
  }, 0)

  const percentage = Math.round((score / questions.length) * 100)

  const getScoreMessage = () => {
    if (percentage === 100) return "🎉 Perfect! You're a workflow master!"
    if (percentage >= 85) return "🌟 Excellent! You've mastered workflows!"
    if (percentage >= 70) return "✨ Great job! You understand workflows well!"
    if (percentage >= 50) return "👍 Good start! Review a few concepts and try again."
    return "📚 Keep learning! Review the materials and retake the quiz."
  }

  return (
    <TryItContent exerciseId="lab6-quiz">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 6 Knowledge Check
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Test your understanding of AI workflows! Answer all {questions.length} questions below.
      </p>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <p className="font-bold text-[#164055] mb-4">
              {index + 1}. {q.question}
            </p>

            <div className="space-y-3">
              {q.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[q.id] === option.id
                      ? 'border-[#3b999c] bg-[rgba(59,153,156,0.05)]'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    showResults && option.id === q.correct
                      ? 'bg-green-100 border-green-500'
                      : ''
                  } ${
                    showResults && answers[q.id] === option.id && option.id !== q.correct
                      ? 'bg-red-100 border-red-500'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={option.id}
                    checked={answers[q.id] === option.id}
                    onChange={() => handleAnswer(q.id, option.id)}
                    disabled={showResults}
                    className="w-5 h-5 text-[#3b999c]"
                  />
                  <span className="text-gray-700">{option.text}</span>
                  {showResults && option.id === q.correct && (
                    <span className="ml-auto text-green-700 font-semibold">✓ Correct</span>
                  )}
                  {showResults && answers[q.id] === option.id && option.id !== q.correct && (
                    <span className="ml-auto text-red-700 font-semibold">✗ Incorrect</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showResults && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className={`mt-8 px-8 py-4 rounded-lg font-semibold text-white text-lg transition-all ${
            Object.keys(answers).length < questions.length
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#3b999c] hover:bg-[#2d7a7d] shadow-lg'
          }`}
        >
          {Object.keys(answers).length < questions.length
            ? `Answer ${questions.length - Object.keys(answers).length} more question${questions.length - Object.keys(answers).length === 1 ? '' : 's'}`
            : 'Submit Quiz'}
        </button>
      )}

      {showResults && (
        <div className="mt-8 space-y-6">
          <div className={`border-2 rounded-xl p-8 text-center ${
            percentage >= 70
              ? 'bg-green-50 border-green-500'
              : percentage >= 50
              ? 'bg-yellow-50 border-yellow-500'
              : 'bg-blue-50 border-blue-500'
          }`}>
            <div className="text-5xl font-bold mb-4" style={{
              color: percentage >= 70 ? '#15803d' : percentage >= 50 ? '#ca8a04' : '#2563eb'
            }}>
              {score}/{questions.length}
            </div>
            <p className="text-2xl font-semibold mb-2" style={{
              color: percentage >= 70 ? '#15803d' : percentage >= 50 ? '#ca8a04' : '#2563eb'
            }}>
              {percentage}% Correct
            </p>
            <p className="text-lg text-gray-700">
              {getScoreMessage()}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[#3b999c] hover:bg-[#2d7a7d] text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              Retake Quiz
            </button>
          </div>

          {percentage === 100 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#164055] mb-3">
                🏆 Congratulations on Completing Lab 6!
              </h3>
              <p className="text-gray-700 mb-3">
                You've successfully mastered AI workflows - a powerful skill that will serve you in countless tasks. You can now:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>Break down complex problems into simple steps</li>
                <li>Automate multi-step AI tasks with workflows</li>
                <li>Use variables to connect workflow steps</li>
                <li>Customize templates for specific needs</li>
                <li>Design original workflows from scratch</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </TryItContent>
  )
}
