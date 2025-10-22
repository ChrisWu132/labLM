'use client'

/**
 * Lab 4, Section 4.6: Review & Quiz
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
      question: 'What is AI particularly good at?',
      options: [
        { id: 'a', text: 'Complex mathematical proofs' },
        { id: 'b', text: 'Writing, explaining, and creative content' },
        { id: 'c', text: 'Accessing real-time information' },
        { id: 'd', text: 'Performing precise calculations' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'What is a "hallucination" in AI?',
      options: [
        { id: 'a', text: 'When AI crashes or stops working' },
        { id: 'b', text: 'When AI takes too long to respond' },
        { id: 'c', text: 'When AI generates plausible but false information' },
        { id: 'd', text: 'When AI refuses to answer a question' }
      ],
      correct: 'c'
    },
    {
      id: 'q3',
      question: 'Which of these is a "red flag" that requires verification?',
      options: [
        { id: 'a', text: 'General explanations of concepts' },
        { id: 'b', text: 'Very specific dates or numbers without sources' },
        { id: 'c', text: 'Creative brainstorming ideas' },
        { id: 'd', text: 'Writing suggestions' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      question: 'What does "Let\'s think step by step" help AI do?',
      options: [
        { id: 'a', text: 'Generate responses faster' },
        { id: 'b', text: 'Access the internet' },
        { id: 'c', text: 'Show reasoning transparently and reduce errors' },
        { id: 'd', text: 'Remember previous conversations' }
      ],
      correct: 'c'
    },
    {
      id: 'q5',
      question: 'When should you NOT rely solely on AI?',
      options: [
        { id: 'a', text: 'Brainstorming creative ideas' },
        { id: 'b', text: 'Learning new concepts' },
        { id: 'c', text: 'Important decisions like medical or legal advice' },
        { id: 'd', text: 'Writing practice' }
      ],
      correct: 'c'
    },
    {
      id: 'q6',
      question: 'What is the best approach to using AI for homework?',
      options: [
        { id: 'a', text: 'Copy AI answers directly' },
        { id: 'b', text: 'Use AI to understand concepts, then verify facts' },
        { id: 'c', text: 'Never use AI for school' },
        { id: 'd', text: 'Trust everything AI says' }
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
    <TryItContent exerciseId="lab4-quiz">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 4 Knowledge Check
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Test your understanding of Lab 4! Answer all 6 questions below.
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
                    <span className="ml-auto text-green-700 font-semibold"> Correct</span>
                  )}
                  {showResults && answers[q.id] === option.id && option.id !== q.correct && (
                    <span className="ml-auto text-red-700 font-semibold"> Incorrect</span>
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
        <div className={`mt-8 border-2 rounded-xl p-6 ${score >= 5 ? 'bg-green-50 border-green-500' : score >= 4 ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${score >= 5 ? 'text-green-900' : score >= 4 ? 'text-yellow-900' : 'text-red-900'}`}>
            Your Score: {score}/{questions.length}
          </h3>

          {score === 6 && (
            <div>
              <p className="text-green-800 font-semibold mb-2"> Perfect Score!</p>
              <p className="text-green-700">
                Outstanding! You've mastered AI's capabilities and limitations. You're ready to move on to Lab 5 where you'll learn about responsible AI use!
              </p>
            </div>
          )}

          {score === 5 && (
            <div>
              <p className="text-green-800 font-semibold mb-2"> Excellent Work!</p>
              <p className="text-green-700">
                You have a strong grasp of the material. Review the question you missed, then proceed to Lab 5!
              </p>
            </div>
          )}

          {score === 4 && (
            <div>
              <p className="text-yellow-800 font-semibold mb-2"> Good Job!</p>
              <p className="text-yellow-700">
                You understand most concepts. Review the sections where you missed questions before moving to Lab 5.
              </p>
            </div>
          )}

          {score < 4 && (
            <div>
              <p className="text-red-800 font-semibold mb-2"> Review Recommended</p>
              <p className="text-red-700">
                Consider reviewing Lab 4 sections before moving forward. Understanding AI's limits is crucial for responsible use!
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
