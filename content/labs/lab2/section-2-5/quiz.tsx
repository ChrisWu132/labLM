'use client'

/**
 * Lab 2, Section 2.5: Review & Quiz
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
      question: 'How do LLMs learn patterns from training data?',
      options: [
        { id: 'a', text: 'By memorizing every piece of text word-for-word' },
        { id: 'b', text: 'By recognizing patterns and relationships between concepts' },
        { id: 'c', text: 'By connecting to the internet in real-time' },
        { id: 'd', text: 'By asking human teachers for help' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'Why do popular topics get better answers than obscure ones?',
      options: [
        { id: 'a', text: 'The AI prefers popular topics' },
        { id: 'b', text: 'Popular topics are easier to understand' },
        { id: 'c', text: 'More training data exists for popular topics' },
        { id: 'd', text: 'Obscure topics are blocked by the AI' }
      ],
      correct: 'c'
    },
    {
      id: 'q3',
      question: 'What is a "knowledge cutoff date"?',
      options: [
        { id: 'a', text: 'The date when the AI stops working' },
        { id: 'b', text: 'The last time the AI was trained on new data' },
        { id: 'c', text: 'The date when the AI was created' },
        { id: 'd', text: 'A random date chosen by developers' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      question: 'What are the three elements of a great prompt?',
      options: [
        { id: 'a', text: 'Questions, answers, and examples' },
        { id: 'b', text: 'Details, constraints, and context' },
        { id: 'c', text: 'Length, speed, and accuracy' },
        { id: 'd', text: 'Words, sentences, and paragraphs' }
      ],
      correct: 'b'
    },
    {
      id: 'q5',
      question: 'When should you NOT rely on AI for information?',
      options: [
        { id: 'a', text: 'When learning about historical events' },
        { id: 'b', text: 'When understanding timeless concepts' },
        { id: 'c', text: 'When getting current news or recent statistics' },
        { id: 'd', text: 'When asking for explanations' }
      ],
      correct: 'c'
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
    <TryItContent exerciseId="lab2-quiz">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 2 Knowledge Check
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Test your understanding of Lab 2! Answer all 5 questions below.
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
          <h3 className={`text-2xl font-bold mb-4 ${score >= 4 ? 'text-green-900' : score >= 3 ? 'text-yellow-900' : 'text-red-900'}`}>
            Your Score: {score}/{questions.length}
          </h3>

          {score === 5 && (
            <div>
              <p className="text-green-800 font-semibold mb-2">🎉 Perfect Score!</p>
              <p className="text-green-700">
                Excellent work! You've mastered all the key concepts from Lab 2. You're ready to move on to Lab 3!
              </p>
            </div>
          )}

          {score === 4 && (
            <div>
              <p className="text-green-800 font-semibold mb-2">✅ Great Job!</p>
              <p className="text-green-700">
                You have a strong understanding of the material. Review the question you missed, then proceed to Lab 3!
              </p>
            </div>
          )}

          {score === 3 && (
            <div>
              <p className="text-yellow-800 font-semibold mb-2">👍 Good Effort!</p>
              <p className="text-yellow-700">
                You understand most concepts. Review the sections where you missed questions before moving to Lab 3.
              </p>
            </div>
          )}

          {score < 3 && (
            <div>
              <p className="text-red-800 font-semibold mb-2">📚 Review Needed</p>
              <p className="text-red-700">
                Consider reviewing Lab 2 sections before moving forward. Make sure you understand the key concepts!
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
