'use client'

/**
 * Lab 5, Section 5.6: Review & Quiz
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
      question: 'What is the Golden Rule of AI Ethics?',
      options: [
        { id: 'a', text: 'Always use AI for every task to save time' },
        { id: 'b', text: 'Use AI to help you LEARN, not to AVOID learning' },
        { id: 'c', text: 'Never use AI for any schoolwork' },
        { id: 'd', text: 'Only use AI when your teacher is not watching' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'Which of the following is an example of GOOD (ethical) AI use for schoolwork?',
      options: [
        { id: 'a', text: 'Asking AI to write your entire essay and submitting it' },
        { id: 'b', text: 'Using AI during a test without permission' },
        { id: 'c', text: 'Asking AI to explain a concept, then writing your own explanation' },
        { id: 'd', text: 'Copying AI answers without understanding them' }
      ],
      correct: 'c'
    },
    {
      id: 'q3',
      question: 'What should you NEVER share with AI?',
      options: [
        { id: 'a', text: 'Your passwords and personal address' },
        { id: 'b', text: 'That you are a student learning a subject' },
        { id: 'c', text: 'That you need help with homework' },
        { id: 'd', text: 'General information about your interests' }
      ],
      correct: 'a'
    },
    {
      id: 'q4',
      question: 'What is an AI "hallucination"?',
      options: [
        { id: 'a', text: 'When AI becomes self-aware' },
        { id: 'b', text: 'When AI generates information that sounds believable but is made up' },
        { id: 'c', text: 'When AI gets too creative with responses' },
        { id: 'd', text: 'When AI takes too long to respond' }
      ],
      correct: 'b'
    },
    {
      id: 'q5',
      question: 'According to the Critical Thinking Framework, what should you do with important information from AI?',
      options: [
        { id: 'a', text: 'Always trust it because AI is very smart' },
        { id: 'b', text: 'Ignore it completely because AI makes mistakes' },
        { id: 'c', text: 'Verify it with at least 2-3 reliable sources' },
        { id: 'd', text: 'Only use it if it sounds correct' }
      ],
      correct: 'c'
    },
    {
      id: 'q6',
      question: 'Emma shares this with AI: "My name is Emma Rodriguez, I live at 123 Oak St in Seattle, and I\'m 12 years old." What is the problem?',
      options: [
        { id: 'a', text: 'She should have included her phone number too' },
        { id: 'b', text: 'She shared too much personal identifying information' },
        { id: 'c', text: 'There is no problem, this is fine to share' },
        { id: 'd', text: 'She should have told AI her email address instead' }
      ],
      correct: 'b'
    },
    {
      id: 'q7',
      question: 'What is the main benefit of using multi-step workflows (prompt chaining)?',
      options: [
        { id: 'a', text: 'It makes AI work faster' },
        { id: 'b', text: 'It lets you avoid doing any work yourself' },
        { id: 'c', text: 'It gives you more control and leads to better quality results' },
        { id: 'd', text: 'It prevents AI from making any mistakes' }
      ],
      correct: 'c'
    },
    {
      id: 'q8',
      question: 'Which statement about AI bias is TRUE?',
      options: [
        { id: 'a', text: 'AI has no biases because it is a computer' },
        { id: 'b', text: 'AI can reflect human biases from its training data' },
        { id: 'c', text: 'AI bias only affects social media' },
        { id: 'd', text: 'AI bias is not something students need to worry about' }
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
    <TryItContent exerciseId="lab5-quiz">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 5 Knowledge Check: Responsible AI Use
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Test your understanding of responsible AI use, ethics, privacy, and critical thinking! Answer all 8 questions below.
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
        <div className={`mt-8 border-2 rounded-xl p-6 ${
          score >= 7
            ? 'bg-green-50 border-green-500'
            : score >= 5
            ? 'bg-yellow-50 border-yellow-500'
            : 'bg-red-50 border-red-500'
        }`}>
          <h3 className={`text-2xl font-bold mb-4 ${
            score >= 7
              ? 'text-green-900'
              : score >= 5
              ? 'text-yellow-900'
              : 'text-red-900'
          }`}>
            Your Score: {score}/{questions.length}
          </h3>

          {score === 8 && (
            <div>
              <p className="text-green-800 font-semibold mb-2"> Perfect Score!</p>
              <p className="text-green-700 mb-4">
                Outstanding! You have mastered all the key concepts of responsible AI use. You understand ethics, privacy, critical thinking, and best practices. You're ready to use AI confidently and responsibly!
              </p>
              <p className="text-green-800 font-semibold">
                You've completed the entire LLM Learning Lab course! You're now an AI-literate learner ready to tackle Lab 6 (coming soon) or apply these skills in real-world situations.
              </p>
            </div>
          )}

          {score === 7 && (
            <div>
              <p className="text-green-800 font-semibold mb-2"> Excellent Work!</p>
              <p className="text-green-700 mb-4">
                You have a strong understanding of responsible AI use! Review the question you missed to solidify your knowledge, but you're well-prepared to use AI ethically and effectively.
              </p>
              <p className="text-green-800">
                You've successfully completed the LLM Learning Lab course!
              </p>
            </div>
          )}

          {score === 6 && (
            <div>
              <p className="text-green-800 font-semibold mb-2"> Good Job!</p>
              <p className="text-green-700">
                You understand most of the key concepts about responsible AI use. Review the sections where you missed questions to strengthen your understanding of ethics, privacy, or critical thinking.
              </p>
            </div>
          )}

          {score === 5 && (
            <div>
              <p className="text-yellow-800 font-semibold mb-2"> Solid Foundation</p>
              <p className="text-yellow-700">
                You have a basic understanding but should review several key concepts. Focus on the areas where you missed questions—ethics, privacy protection, or critical thinking frameworks.
              </p>
            </div>
          )}

          {score < 5 && (
            <div>
              <p className="text-red-800 font-semibold mb-2"> Review Needed</p>
              <p className="text-red-700 mb-4">
                It looks like you need to review Lab 5 more carefully. The concepts of ethics, privacy, and critical thinking are crucial for responsible AI use. Take time to go through each section again!
              </p>
              <p className="text-red-600 text-sm">
                Key areas to focus on: AI ethics principles, academic integrity guidelines, privacy protection rules, critical thinking framework, and multi-step workflows.
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300">
            <p className="font-semibold text-gray-800 mb-2"> Key Takeaways to Remember:</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
              <li>Use AI to help you LEARN, not to AVOID learning</li>
              <li>Never share personal information, passwords, or location with AI</li>
              <li>AI can hallucinate and have biases—think critically!</li>
              <li>Verify important information with multiple reliable sources</li>
              <li>Break complex problems into multi-step workflows for better results</li>
              <li>Be honest about your AI use and follow academic integrity guidelines</li>
            </ul>
          </div>

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

      {showResults && score >= 6 && (
        <div className="mt-8 bg-[#164055] text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Congratulations on Completing the LLM Learning Lab!
          </h3>
          <p className="text-lg mb-4">
            You've mastered all 5 labs and learned how to use AI effectively, ethically, and responsibly.
          </p>
          <div className="max-w-2xl mx-auto text-left space-y-2 mb-6">
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Understanding AI and how LLMs work</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Writing clear, effective prompts</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Using context, constraints, and role-playing</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Applying Chain-of-Thought reasoning</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Using AI ethically and protecting your privacy</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Thinking critically about AI outputs</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <span>Creating multi-step workflows</span>
            </p>
          </div>
          <p className="text-xl font-semibold text-[#f7aa37]">
            You're now an AI-literate learner!
          </p>
          <p className="mt-4 text-gray-200">
            Keep practicing these skills and stay tuned for Lab 6: AI Workflow Builder (coming soon)!
          </p>
        </div>
      )}
    </TryItContent>
  )
}
