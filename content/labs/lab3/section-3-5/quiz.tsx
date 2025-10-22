'use client'

/**
 * Lab 3, Section 3.5: Review & Quiz
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
      question: 'How do LLMs generate responses?',
      options: [
        { id: 'a', text: 'They create the entire response at once in their "mind"' },
        { id: 'b', text: 'They generate responses word-by-word, with each word influencing the next' },
        { id: 'c', text: 'They look up pre-written answers in a database' },
        { id: 'd', text: 'They search the internet for the best answer' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'What is a "token" in the context of LLMs?',
      options: [
        { id: 'a', text: 'A password used to access the AI' },
        { id: 'b', text: 'A complete sentence in the prompt' },
        { id: 'c', text: 'The basic unit of text that AI processes (roughly a word or word piece)' },
        { id: 'd', text: 'A special command that changes AI behavior' }
      ],
      correct: 'c'
    },
    {
      id: 'q3',
      question: 'Why do you sometimes get different responses when running the same prompt multiple times?',
      options: [
        { id: 'a', text: 'The AI is broken or malfunctioning' },
        { id: 'b', text: 'The AI uses probabilistic selection to randomly choose from multiple good options' },
        { id: 'c', text: 'The AI forgets what it said last time' },
        { id: 'd', text: 'Someone else is using the AI at the same time' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      question: 'What is "context" in AI responses?',
      options: [
        { id: 'a', text: 'The time of day you use the AI' },
        { id: 'b', text: 'Everything that came before the current word, which shapes predictions' },
        { id: 'c', text: 'The website you\'re using to access AI' },
        { id: 'd', text: 'The programming language the AI was written in' }
      ],
      correct: 'b'
    },
    {
      id: 'q5',
      question: 'Which prompt uses role-playing effectively?',
      options: [
        { id: 'a', text: '"Explain gravity"' },
        { id: 'b', text: '"Tell me about gravity please"' },
        { id: 'c', text: '"You are a patient physics teacher who uses everyday examples. Explain gravity to a 12-year-old."' },
        { id: 'd', text: '"Gravity explanation needed"' }
      ],
      correct: 'c'
    },
    {
      id: 'q6',
      question: 'What makes an "advanced persona" better than a simple role?',
      options: [
        { id: 'a', text: 'Advanced personas use complicated technical words' },
        { id: 'b', text: 'Advanced personas combine expertise, personality, style, and unique traits' },
        { id: 'c', text: 'Advanced personas are always longer' },
        { id: 'd', text: 'Advanced personas work faster' }
      ],
      correct: 'b'
    },
    {
      id: 'q7',
      question: 'Which of the following is NOT a type of context you should add to prompts?',
      options: [
        { id: 'a', text: 'Audience context (who the information is for)' },
        { id: 'b', text: 'Background context (what you already know)' },
        { id: 'c', text: 'Random context (unrelated information)' },
        { id: 'd', text: 'Preference context (how you want it explained)' }
      ],
      correct: 'c'
    },
    {
      id: 'q8',
      question: 'What is the benefit of probabilistic selection in AI?',
      options: [
        { id: 'a', text: 'Makes responses more expensive' },
        { id: 'b', text: 'Creates variety and more natural, creative responses' },
        { id: 'c', text: 'Makes AI responses identical every time' },
        { id: 'd', text: 'Slows down the AI' }
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
    <TryItContent exerciseId="lab3-quiz">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 3 Knowledge Check
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Test your understanding of Lab 3! Answer all 8 questions below.
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
        <div className={`mt-8 border-2 rounded-xl p-6 ${score >= 7 ? 'bg-green-50 border-green-500' : score >= 5 ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${score >= 7 ? 'text-green-900' : score >= 5 ? 'text-yellow-900' : 'text-red-900'}`}>
            Your Score: {score}/{questions.length}
          </h3>

          {score === 8 && (
            <div>
              <p className="text-green-800 font-semibold mb-2">🎉 Perfect Score!</p>
              <p className="text-green-700">
                Outstanding! You've mastered all concepts from Lab 3. You're ready to move on to Lab 4 where you'll learn about AI's capabilities and limitations!
              </p>
            </div>
          )}

          {score === 7 && (
            <div>
              <p className="text-green-800 font-semibold mb-2">✅ Excellent Work!</p>
              <p className="text-green-700">
                You have a strong understanding of Lab 3 concepts. Review the question you missed, then proceed to Lab 4!
              </p>
            </div>
          )}

          {score >= 5 && score < 7 && (
            <div>
              <p className="text-yellow-800 font-semibold mb-2">👍 Good Effort!</p>
              <p className="text-yellow-700">
                You understand most concepts. Review the sections where you missed questions before moving to Lab 4 to ensure you have a solid foundation.
              </p>
            </div>
          )}

          {score < 5 && (
            <div>
              <p className="text-red-800 font-semibold mb-2">📚 Review Recommended</p>
              <p className="text-red-700">
                Consider reviewing Lab 3 sections before moving forward. Make sure you understand tokens, context, and role-playing!
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
