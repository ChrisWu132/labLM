'use client'

/**
 * Lab 1, Section 1.5: Review & Quiz
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
      question: 'What does LLM stand for?',
      options: [
        { id: 'a', text: 'Large Language Model' },
        { id: 'b', text: 'Limited Learning Machine' },
        { id: 'c', text: 'Language Learning Module' },
        { id: 'd', text: 'Logical Language Mechanism' }
      ],
      correct: 'a'
    },
    {
      id: 'q2',
      question: 'How do LLMs generate responses?',
      options: [
        { id: 'a', text: 'By searching the internet for answers' },
        { id: 'b', text: 'By predicting the next word based on patterns' },
        { id: 'c', text: 'By calculating exact solutions' },
        { id: 'd', text: 'By memorizing all possible answers' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      question: 'Why do you get slightly different answers when asking the same question twice?',
      options: [
        { id: 'a', text: 'The AI is broken' },
        { id: 'b', text: 'The AI forgets what it said before' },
        { id: 'c', text: 'The AI uses randomness to select from multiple good options' },
        { id: 'd', text: 'The AI is learning from each conversation' }
      ],
      correct: 'c'
    },
    {
      id: 'q4',
      question: 'Which prompt is better?',
      options: [
        { id: 'a', text: 'Tell me about space' },
        { id: 'b', text: 'Explain black holes to a 12-year-old in 3 simple points' },
        { id: 'c', text: 'Space stuff' },
        { id: 'd', text: 'What is space?' }
      ],
      correct: 'b'
    },
    {
      id: 'q5',
      question: 'What should a good prompt include?',
      options: [
        { id: 'a', text: 'Just the question' },
        { id: 'b', text: 'Clear task, context, details, and format' },
        { id: 'c', text: 'As few words as possible' },
        { id: 'd', text: 'Technical jargon to sound smart' }
      ],
      correct: 'b'
    }
  ]

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId })
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const score = questions.reduce((acc, q) => {
    return answers[q.id] === q.correct ? acc + 1 : acc
  }, 0)

  return (
    <TryItContent exerciseId="lab1-quiz">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 1 Knowledge Check
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Test your understanding of Lab 1! Answer all 5 questions below.
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
              : 'bg-[#3b999c] hover:bg-[#2d7a7d]'
          }`}
        >
          {Object.keys(answers).length < questions.length
            ? `Answer all questions (${Object.keys(answers).length}/${questions.length})`
            : 'Submit Quiz'}
        </button>
      )}

      {showResults && (
        <div className={`mt-8 border-2 rounded-xl p-6 ${score >= 4 ? 'bg-green-50 border-green-500' : score >= 3 ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'}`}>
          <h3 className="text-2xl font-bold mb-4 ${score >= 4 ? 'text-green-900' : score >= 3 ? 'text-yellow-900' : 'text-red-900'}">
            Your Score: {score}/{questions.length}
          </h3>

          {score === 5 && (
            <div>
              <p className="text-green-800 font-semibold mb-2">🎉 Perfect Score!</p>
              <p className="text-green-700">
                Excellent work! You've mastered all the key concepts from Lab 1. You're ready to move on to Lab 2!
              </p>
            </div>
          )}

          {score === 4 && (
            <div>
              <p className="text-green-800 font-semibold mb-2">✅ Great Job!</p>
              <p className="text-green-700">
                You have a strong understanding of the material. Review the question you missed, then proceed to Lab 2!
              </p>
            </div>
          )}

          {score === 3 && (
            <div>
              <p className="text-yellow-800 font-semibold mb-2">👍 Good Effort!</p>
              <p className="text-yellow-700">
                You understand most concepts. Review the sections where you missed questions before moving to Lab 2.
              </p>
            </div>
          )}

          {score < 3 && (
            <div>
              <p className="text-red-800 font-semibold mb-2">📚 Review Needed</p>
              <p className="text-red-700">
                Consider reviewing Lab 1 sections before moving forward. Make sure you understand the key concepts!
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setAnswers({})
              setShowResults(false)
            }}
            className="mt-6 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </TryItContent>
  )
}
