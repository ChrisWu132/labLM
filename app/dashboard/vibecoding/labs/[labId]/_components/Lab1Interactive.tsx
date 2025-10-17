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

export function Lab1Interactive() {
  const [showCongratulations, setShowCongratulations] = useState(false)
  
  return (
    <div className="border-2 rounded-3xl p-8 space-y-10" style={{borderColor: '#3b999c40', backgroundColor: 'rgba(59, 153, 156, 0.02)'}}>
      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
          Lab 1: Meet Your AI Friend
        </h1>
      </div>

      {/* Learning Objectives */}
      <ObjectivesCard duration="~20 minutes">
        By the end of this lab, you will:
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Understand what LLMs are and how they work</li>
          <li>Learn the difference between AI, LLMs, and search engines</li>
          <li>Write your first prompts and see how they affect AI responses</li>
          <li>Discover why clear communication matters when talking to AI</li>
        </ul>
      </ObjectivesCard>

      {/* Part A: Understanding LLMs */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part A: Understanding LLMs (10 minutes)</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>What is AI? What is an LLM?</h3>
            <div className="space-y-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <p><strong style={{color: '#164055'}}>AI (Artificial Intelligence)</strong> is software that can perform tasks that typically require human intelligence - like understanding language, recognizing patterns, and making decisions.</p>
              <p><strong style={{color: '#164055'}}>LLM (Large Language Model)</strong> is a specific type of AI that specializes in understanding and generating text. Think of it as an extremely well-read assistant that has learned from millions of books, articles, and conversations.</p>
              <p><strong style={{color: '#164055'}}>Examples of LLMs</strong>: ChatGPT, Claude, Google Gemini</p>
            </div>
          </div>

          <TableCard title="Tool Comparison">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold" style={{backgroundColor: '#f7aa37'}}>Tool</th>
                <th className="px-6 py-4 text-left text-white font-semibold" style={{backgroundColor: '#f7aa37'}}>What it does</th>
                <th className="px-6 py-4 text-left text-white font-semibold" style={{backgroundColor: '#f7aa37'}}>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="px-6 py-4 font-semibold">Calculator</td>
                <td className="px-6 py-4">Follows exact rules, always same answer</td>
                <td className="px-6 py-4">2 + 2 = 4 (always)</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="px-6 py-4 font-semibold">Search Engine</td>
                <td className="px-6 py-4">Finds existing web pages</td>
                <td className="px-6 py-4">Shows links to cat information</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">LLM</td>
                <td className="px-6 py-4">Generates new text based on patterns</td>
                <td className="px-6 py-4">Creates a unique explanation about cats</td>
              </tr>
            </tbody>
          </TableCard>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>How Does an LLM Work?</h3>
            <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <h4 className="font-bold text-xl mb-3" style={{color: '#164055'}}>The "Next Word Predictor"</h4>
              <p className="mb-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>When you write: "The sky is..."</p>
              <ul className="space-y-2">
                <li>• A human would say: "blue"</li>
                <li>• An LLM predicts: "blue" (most likely), "clear" (also likely), "falling" (less likely)</li>
              </ul>
            </div>
            
            <div className="space-y-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <p><strong style={{color: '#164055'}}>It works by</strong>:</p>
              <ol className="list-decimal ml-6 space-y-2 text-base md:text-lg">
                <li>Reading your prompt</li>
                <li>Breaking it into pieces (tokens)</li>
                <li>Predicting what should come next, word by word</li>
                <li>Continuing until it has a complete response</li>
              </ol>
              <p><strong style={{color: '#164055'}}>Important</strong>: The AI isn't thinking or conscious. It's using statistical patterns to generate helpful text.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Experiment */}
      <ExperimentBlock title="Interactive Experiment 1: See the AI in Action">
        <div className="space-y-6">
          <p className="text-lg md:text-xl" style={{color: '#3f3f3f'}}>Let's observe how an LLM responds to a simple question.</p>
          
          <StaticPromptDemo
            exerciseId="lab1-demo-static"
            mode="readonly"
            initialValue="What is a cat?"
            demoOutput="A cat is a small carnivorous mammal that has been domesticated for thousands of years. Cats are known for their independence, agility, and hunting skills. They are popular pets worldwide and come in many breeds with different appearances and personalities. Cats communicate through meowing, purring, and body language."
          />
          
          <p><strong style={{color: '#164055'}}>Try this multiple times</strong> - Click "Run Prompt" below and run it again. Notice something interesting?</p>
          
          <InteractivePromptEditor
            exerciseId="lab1-demo"
            mode="editable"
            placeholder="What is a cat?"
          />
          
          <p><strong style={{color: '#164055'}}>What did you notice?</strong> The answer is slightly different each time! This is because LLMs have some randomness built in - they don't always pick the *most* likely next word, but sometimes choose from the top few options.</p>
        </div>
      </ExperimentBlock>

      {/* Key Concept */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h3 className="text-xl md:text-2xl font-bold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Key Concept: AI is a Tool, Not a Person</h3>
        <div className="space-y-4">
          <p className="text-base"><strong style={{color: '#164055'}}>Remember</strong>:</p>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <span className="text-xl" style={{color: '#f7aa37'}}>✅</span>
              <span style={{color: '#3f3f3f'}}>LLMs are incredibly useful tools</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl" style={{color: '#f7aa37'}}>✅</span>
              <span style={{color: '#3f3f3f'}}>They can help you learn, write, and solve problems</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-500 text-xl">❌</span>
              <span style={{color: '#3f3f3f'}}>They are NOT conscious or thinking</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-500 text-xl">❌</span>
              <span className="text-slate-600">They don't have feelings or opinions (they just predict text patterns)</span>
            </li>
          </ul>
          <p className="mt-6 text-base" style={{color: '#3f3f3f'}}>Think of an LLM like a really smart parrot that has read millions of books - it can produce impressive language, but it's not truly understanding like a human does.</p>
        </div>
      </div>

      {/* Part B */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part B: Your First Conversation (10 minutes)</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>What is a Prompt?</h3>
            <div className="space-y-4 text-base" style={{color: '#3f3f3f'}}>
              <p>A <strong style={{color: '#164055'}}>prompt</strong> is the instruction or question you give to an LLM. It's how you communicate what you want.</p>
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <p><strong style={{color: '#164055'}}>Prompt</strong> = Input (what you say)</p>
                <p><strong style={{color: '#164055'}}>Response</strong> = Output (what AI generates)</p>
                <p className="mt-2 font-semibold" style={{color: '#164055'}}>The better your prompt, the better the response!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <ExerciseBlock title="Improving Your Questions" number={1}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's see how clarity affects AI responses.</p>
          
          <PromptComparison
            badPrompt="Tell me about dogs."
            badOutput="Dogs are domesticated mammals that belong to the Canidae family. They come in various breeds, sizes, and temperaments."
            goodPrompt="Explain to a 10-year-old why dogs are good pets. Include 3 specific reasons."
            goodOutput="Dogs make great pets for three main reasons: 1) Loyal Companions - they're like best friends who never get tired of playing! 2) Teach Responsibility - caring for them builds life skills. 3) Keep You Active - walks and playtime mean more outdoor fun!"
          />
          
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Now you try!</strong> Improve this vague prompt:</p>
          
          <InteractivePromptEditor
            exerciseId="lab1-ex1"
            mode="editable"
            placeholder="Write a better version of: 'Tell me about cats'

Hint: Be specific about:
- Who should the explanation be for?
- What aspects of cats interest you?
- How long should the answer be?"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold"><strong style={{color: '#164055'}}>Success Criteria</strong>:</p>
            <ul className="mt-3 space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Your prompt asks for specific information about cats</li>
              <li>• It includes context (who it's for, what aspects, etc.)</li>
              <li>• The AI response is focused and detailed</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      <ExerciseBlock title="Let AI Write a Story" number={2}>
        <div className="space-y-6">
          <p className="text-base" style={{color: '#3f3f3f'}}>Now let's have fun! Ask the AI to write a creative story.</p>
          
          <InteractivePromptEditor
            exerciseId="lab1-ex2"
            mode="editable"
            placeholder="Write a short adventure story about a brave cat. Include:
- Where the adventure takes place
- What challenge the cat faces
- How the cat solves the problem
Keep it under 150 words."
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base font-semibold"><strong style={{color: '#164055'}}>What to notice</strong>:</p>
            <ul className="mt-3 space-y-2 text-base" style={{color: '#3f3f3f'}}>
              <li>• The more details you provide, the better the story</li>
              <li>• Each time you run it, you'll get a slightly different story</li>
              <li>• The AI follows your instructions (length, elements to include)</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Key Discoveries */}
      <DiscoveriesCard>
        <ol className="space-y-4">
          <li><strong style={{color: '#164055'}}>LLMs are prediction machines</strong> - They generate text by predicting what words should come next, based on patterns from their training data.</li>
          <li><strong style={{color: '#164055'}}>Clarity matters</strong> - The more specific and clear your prompt, the better the AI's response will be.</li>
          <li><strong style={{color: '#164055'}}>Variability is normal</strong> - LLMs have some randomness, so running the same prompt twice gives slightly different results.</li>
          <li><strong style={{color: '#164055'}}>AI is a tool</strong> - LLMs are powerful assistants, but they're not thinking beings. They're tools that help us work faster and learn better.</li>
        </ol>
      </DiscoveriesCard>

      {/* Quiz */}
      <QuizCard onAllCompleted={() => setShowCongratulations(true)}>
        <QuizItem>What does LLM stand for? (Large Language Model)</QuizItem>
        <QuizItem>How is an LLM different from a search engine?</QuizItem>
        <QuizItem>What is a "prompt"?</QuizItem>
        <QuizItem>Why do you get slightly different answers each time you run the same prompt?</QuizItem>
      </QuizCard>

      {/* Congratulations - only show when quiz is complete */}
      {showCongratulations && (
        <div className="animate-fadeIn space-y-10">
          <NextSteps href="/dashboard/vibecoding/labs/lab2">
            Excellent work! You've mastered the fundamentals of clear AI communication! 
            Now you understand how LLMs work and can write specific, effective prompts.
          </NextSteps>
          
          {/* Lab 2 Preview - separate from congratulations card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>What's Next?</h3>
            <div className="space-y-6" style={{color: '#3f3f3f'}}>
              <div>
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>In Lab 2</strong>, you'll learn:</p>
                <ul className="space-y-3 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>How LLMs actually learn (where does all that knowledge come from?)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Advanced techniques for writing clear, effective prompts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Why being specific makes AI much more useful</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Remember</strong>: The best way to learn is by experimenting! Try changing your prompts and seeing how the AI responds differently. There's no wrong way to explore.</p>
              </div>
              
              <div className="pt-4">
                <a
                  href="/dashboard/vibecoding/labs/lab2"
                  className="inline-flex items-center gap-3 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{backgroundColor: '#f7aa37'}}
                >
                  <span>Continue to Lab 2</span>
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