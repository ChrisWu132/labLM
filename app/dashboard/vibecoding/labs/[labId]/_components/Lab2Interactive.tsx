'use client'

import { useState } from 'react'
import {
  ObjectivesCard,
  ExperimentBlock,
  ExerciseBlock,
  DiscoveriesCard,
  QuizCard,
  QuizItem,
  NextSteps,
  PromptComparison,
  TableCard
} from './LabCards'
import {
  InteractivePromptEditor,
  StaticPromptDemo
} from './LabWrapper'

export function Lab2Interactive() {
  const [showCongratulations, setShowCongratulations] = useState(false)
  
  return (
    <div className="border-2 rounded-3xl p-8 space-y-10" style={{borderColor: '#3b999c40', backgroundColor: 'rgba(59, 153, 156, 0.02)'}}>
      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
          Lab 2: How AI Gets Smart
        </h1>
      </div>

      {/* Learning Objectives */}
      <ObjectivesCard duration="~25 minutes">
        By the end of this lab, you will:
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Understand how LLMs learn from training data</li>
          <li>Know what knowledge LLMs have (and don't have)</li>
          <li>Discover why some questions get better answers than others</li>
          <li>Master techniques for writing clear, specific prompts</li>
        </ul>
      </ObjectivesCard>

      {/* Part A: LLM's Learning Process */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part A: LLM's Learning Process (12 minutes)</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>How Do LLMs Learn?</h3>
            <div className="space-y-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <p>Remember from Lab 1 that LLMs are "next word predictors"? But where did they learn all those patterns? Let's find out!</p>
              
              <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-xl mb-3" style={{color: '#164055'}}>The Training Process</h4>
                <p className="mb-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>Think of training an LLM like teaching someone to write by having them read millions of books:</p>
                <ol className="list-decimal ml-6 space-y-3">
                  <li><strong style={{color: '#164055'}}>Reading Phase</strong> - The AI reads massive amounts of text from books, websites, Wikipedia, and code repositories</li>
                  <li><strong style={{color: '#164055'}}>Pattern Recognition</strong> - It learns that "After 'The cat sat on the', usually comes 'mat' or 'chair'"</li>
                  <li><strong style={{color: '#164055'}}>Knowledge Compression</strong> - All this learning gets compressed into billions of neural network connections</li>
                </ol>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>What Has the AI "Read"?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>✅ LLMs Have Knowledge From:</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• General knowledge (history, science, culture)</li>
                  <li>• Programming languages and code patterns</li>
                  <li>• Multiple languages (English, Spanish, Chinese)</li>
                  <li>• Math concepts and problem-solving</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>❌ But They DON'T Have:</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Real-time internet access</li>
                  <li>• Your personal information</li>
                  <li>• Events after their cutoff date</li>
                  <li>• Private/unpublished content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Experiment 1 */}
      <ExperimentBlock title="Interactive Experiment 1: Discovering Knowledge Boundaries">
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's test the AI's knowledge boundaries! Try asking about recent vs older events:</p>
          
          <InteractivePromptEditor
            exerciseId="lab2-demo1"
            mode="editable"
            placeholder="Try these questions and compare:
1. What happened in the 2020 Olympics?
2. What are the latest AI developments in 2024?
3. Who won the Nobel Prize in Physics in 2015?

Notice which ones it answers confidently vs. which ones it struggles with!"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold"><strong style={{color: '#164055'}}>What to Notice</strong>:</p>
            <ul className="mt-3 space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Questions about well-documented past events → Great answers</li>
              <li>• Questions about very recent events → Might be outdated</li>
              <li>• Questions about common knowledge → Excellent answers</li>
            </ul>
          </div>
        </div>
      </ExperimentBlock>

      {/* Part B: Communication Techniques */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part B: Clear Communication Techniques (13 minutes)</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>The Power of Specificity</h3>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              Based on what we learned about training patterns, the AI responds best to <strong style={{color: '#164055'}}>specific, detailed prompts</strong>. 
              Why? Because specific prompts match clearer patterns in the training data.
            </p>
            
            <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Three Elements of Great Prompts</h4>
              <ol className="list-decimal ml-6 space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li><strong style={{color: '#164055'}}>Details</strong> - What exactly do you want?</li>
                <li><strong style={{color: '#164055'}}>Constraints</strong> - What are the limits (length, format, style)?</li>
                <li><strong style={{color: '#164055'}}>Context</strong> - What's the background or purpose?</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise 1 */}
      <ExerciseBlock title="Adding Details" number={1}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's see how adding details transforms a prompt:</p>
          
          <PromptComparison
            badPrompt="Tell me about programming."
            badOutput="Programming is the process of creating computer software using programming languages. It involves writing code, debugging, and testing applications. Common languages include Python, JavaScript, Java, and C++."
            goodPrompt="Explain to a 12-year-old beginner what programming is and why it's useful. Include 2 simple examples of things they could build."
            goodOutput="Programming is like giving instructions to a computer! Just like you follow a recipe to bake cookies, computers follow your code to perform tasks. You could build: 1) A Personal Website - share your hobbies and art with friends! 2) A Simple Game - like a number guessing game with hints until you win!"
          />
          
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Now you try!</strong> Make this vague prompt more specific:</p>
          
          <InteractivePromptEditor
            exerciseId="lab2-ex1"
            mode="editable"
            placeholder="Improve this vague prompt: 'Write about healthy eating'

Add details like:
- Who is this for? (kids, athletes, busy adults?)
- What aspect? (benefits, meal ideas, how to start?)
- How long should it be?"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold"><strong style={{color: '#164055'}}>Success Criteria</strong>:</p>
            <ul className="mt-3 space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Your prompt specifies the target audience</li>
              <li>• It includes what aspect of healthy eating to focus on</li>
              <li>• It provides format or length constraints</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Key Discoveries */}
      <DiscoveriesCard>
        <ul className="space-y-4">
          <li><strong style={{color: '#164055'}}>LLMs learn patterns</strong>, not facts - they predict based on training data patterns</li>
          <li><strong style={{color: '#164055'}}>Knowledge has boundaries</strong> - they know common topics well, but struggle with recent or very specific information</li>
          <li><strong style={{color: '#164055'}}>Specificity is key</strong> - detailed prompts with context get much better responses</li>
          <li><strong style={{color: '#164055'}}>Three elements work</strong> - Details + Constraints + Context = Great prompts</li>
        </ul>
      </DiscoveriesCard>

      {/* Quiz */}
      <QuizCard onAllCompleted={() => setShowCongratulations(true)}>
        <QuizItem>I understand that LLMs learn patterns from massive text data, not memorize facts</QuizItem>
        <QuizItem>I know LLMs have knowledge cutoff dates and can't access real-time information</QuizItem>
        <QuizItem>I can write specific prompts with details, constraints, and context</QuizItem>
        <QuizItem>I understand why specific prompts get better responses than vague ones</QuizItem>
      </QuizCard>

      {/* Congratulations - only show when quiz is complete */}
      {showCongratulations && (
        <div className="animate-fadeIn space-y-10">
          <NextSteps href="/dashboard/vibecoding/labs/lab3">
            You've mastered the fundamentals of how AI learns and how to communicate effectively with it! 
            You now understand that LLMs are pattern-recognition systems trained on vast amounts of text, 
            and you can craft specific, detailed prompts that get much better responses.
          </NextSteps>
          
          {/* Lab 3 Preview - separate from congratulations card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>What's Next?</h3>
            <div className="space-y-6" style={{color: '#3f3f3f'}}>
              <div>
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>In Lab 3</strong>, you'll learn:</p>
                <ul className="space-y-3 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Advanced prompting techniques for better control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>How to add constraints and format your AI outputs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Breaking down complex tasks into manageable steps</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Remember</strong>: The key to great AI interactions is being specific about what you want. Practice makes perfect!</p>
              </div>
              
              <div className="pt-4">
                <a
                  href="/dashboard/vibecoding/labs/lab3"
                  className="inline-flex items-center gap-3 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{backgroundColor: '#f7aa37'}}
                >
                  <span>Continue to Lab 3</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}