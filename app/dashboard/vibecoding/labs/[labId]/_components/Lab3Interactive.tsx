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

export function Lab3Interactive() {
  const [showCongratulations, setShowCongratulations] = useState(false)
  
  return (
    <div className="border-2 rounded-3xl p-8 space-y-10" style={{borderColor: '#3b999c40', backgroundColor: 'rgba(59, 153, 156, 0.02)'}}>
      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
          Lab 3: AI's "Thinking" Process
        </h1>
      </div>

      {/* Learning Objectives */}
      <ObjectivesCard duration="~25 minutes">
        By the end of this lab, you will:
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Understand how LLMs generate responses word-by-word</li>
          <li>Learn what "tokens" are and how AI processes text</li>
          <li>Discover why the same prompt gives slightly different answers</li>
          <li>Master role-playing techniques to control output style</li>
          <li>Create custom AI assistant personas</li>
        </ul>
      </ObjectivesCard>

      {/* Part A: How LLMs Generate Responses */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part A: How LLMs Generate Responses (12 minutes)</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>The Word-by-Word Generation Process</h3>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              Remember: LLMs are "next word predictors." Let's see how they actually generate responses!
            </p>
            
            <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Example: "What is the capital of France?"</h4>
              <p className="mb-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>Here's what happens inside the AI:</p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm">
                <div className="mb-2">Your question: "What is the capital of France?"</div>
                <div className="mb-2">AI thinks step-by-step:</div>
                <div className="space-y-1 ml-4">
                  <div>1. "The" (most likely start)</div>
                  <div>2. "The capital" (logical continuation)</div>
                  <div>3. "The capital of" (completing the pattern)</div>
                  <div>4. "The capital of France" (repeating your question)</div>
                  <div>5. "The capital of France is" (setting up the answer)</div>
                  <div>6. "The capital of France is Paris" (THE answer!)</div>
                  <div>7. "The capital of France is Paris." (add punctuation, DONE!)</div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)', border: '1px solid'}}>
                <p className="text-base md:text-lg font-semibold"><strong style={{color: '#164055'}}>Key insight</strong>: The AI doesn't "know" the full answer upfront. It generates it <strong style={{color: '#164055'}}>one piece at a time</strong>, with each word influencing what comes next!</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>What Are Tokens?</h3>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>
              <strong style={{color: '#164055'}}>Token</strong> = The basic unit of text that AI processes
            </p>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              Think of tokens as puzzle pieces that make up words and sentences.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Token Examples</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• "cat" = 1 token</li>
                  <li>• "running" = 1-2 tokens</li>
                  <li>• "The cat sat on the mat" = 7 tokens</li>
                  <li>• "don't" = 2 tokens ("don" + "'t")</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Why Tokens Matter</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• AI processes text in tokens, not letters</li>
                  <li>• Longer prompts = more tokens = higher cost</li>
                  <li>• Token limits exist (e.g., 4000 tokens max)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Experiment 1 */}
      <ExperimentBlock title="Interactive Experiment 1: Observing Variations">
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's see the AI generate responses! Run this same prompt <strong style={{color: '#164055'}}>3 times</strong> and compare:</p>
          
          <InteractivePromptEditor
            exerciseId="lab3-demo1"
            mode="editable"
            placeholder="Write a creative opening sentence for a mystery story about a missing cat.

Run this 3 times and notice how each opening is different!"
          />
          
          <div className="space-y-4">
            <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What did you observe?</strong></p>
              <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li>✅ Each response is slightly different</li>
                <li>✅ All responses are relevant to the prompt</li>
                <li>✅ The AI makes different "creative choices" each time</li>
              </ul>
            </div>
            
            <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
              <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>Why does this happen?</strong></p>
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}>At each step, the AI has multiple good options:</p>
              <ul className="space-y-1 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li>• "The cat disappeared..." (40% likely)</li>
                <li>• "On a foggy evening..." (30% likely)</li>
                <li>• "Nobody knew when..." (20% likely)</li>
                <li>• "Detective Smith noticed..." (10% likely)</li>
              </ul>
              <p className="text-base md:text-lg mt-3" style={{color: '#3f3f3f'}}>The AI <strong style={{color: '#164055'}}>randomly picks</strong> from the top options, so you get variety!</p>
            </div>
          </div>
        </div>
      </ExperimentBlock>

      {/* Interactive Experiment 2 */}
      <ExperimentBlock title="Interactive Experiment 2: Adding Context">
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's see how adding context improves responses:</p>
          
          <div className="space-y-6">
            <div>
              <p className="text-base md:text-lg font-semibold mb-3" style={{color: '#164055'}}>First, try with NO context:</p>
              <InteractivePromptEditor
                exerciseId="lab3-demo2a"
                mode="editable"
                placeholder="Explain quantum mechanics."
              />
            </div>
            
            <div>
              <p className="text-base md:text-lg font-semibold mb-3" style={{color: '#164055'}}>Now, try with RICH context:</p>
              <InteractivePromptEditor
                exerciseId="lab3-demo2b"
                mode="editable"
                placeholder="I'm a 13-year-old who loves video games. Explain quantum mechanics using a video game analogy that makes it exciting and easy to understand."
              />
            </div>
          </div>
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What changed?</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• <strong style={{color: '#164055'}}>With context</strong>: The AI knows WHO you are, WHAT you like, and HOW to explain</li>
              <li>• <strong style={{color: '#164055'}}>Without context</strong>: The AI gives a generic, possibly boring explanation</li>
            </ul>
            <p className="text-base md:text-lg mt-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>This is why context matters!</strong> It shapes every word the AI chooses.</p>
          </div>
        </div>
      </ExperimentBlock>

      {/* Part B: Role-Playing Magic */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part B: Role-Playing Magic (13 minutes)</h2>
        
        <div className="space-y-8">
          <div>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              Now that you understand how AI generates text, let's learn to <strong style={{color: '#164055'}}>control</strong> its style using roles!
            </p>
            
            <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Why Role-Setting Works</h4>
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}>Remember: Context shapes every word the AI chooses.</p>
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>When you set a role</strong> (like "You are a teacher"), you're providing powerful context that influences:</p>
              <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li>• Vocabulary choice</li>
                <li>• Explanation style</li>
                <li>• Level of detail</li>
                <li>• Tone and personality</li>
              </ul>
            </div>
            
            <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
              <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>The Magic Phrase: "You are..."</h4>
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}>The simplest way to set a role:</p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm mb-3">
                "You are a [ROLE]. [Your request]."
              </div>
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Examples:</strong></p>
              <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li>• "You are a patient teacher. Explain photosynthesis to a 10-year-old."</li>
                <li>• "You are a creative poet. Write a poem about the ocean."</li>
                <li>• "You are a professional chef. Give me a recipe for chocolate cake."</li>
              </ul>
              <p className="text-base md:text-lg mt-3" style={{color: '#3f3f3f'}}>This tiny phrase completely changes the AI's "personality"!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise 1 */}
      <ExerciseBlock title="AI as a Teacher" number={1}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's make the AI explain a complex topic as if it's a patient, encouraging teacher:</p>
          
          <InteractivePromptEditor
            exerciseId="lab3-ex1"
            mode="editable"
            placeholder="You are a friendly and patient middle school science teacher who loves using analogies.

Explain how the internet works to a student who has never thought about it before. Use a simple analogy and keep it under 100 words."
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What to notice:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• The AI adopts a teaching tone</li>
              <li>• Uses analogies (because you asked!)</li>
              <li>• Explains at an appropriate level</li>
              <li>• Sounds encouraging and friendly</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Exercise 2 */}
      <ExerciseBlock title="Comparing Different Roles" number={2}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's see how the SAME task changes with different roles!</p>
          <p className="text-base md:text-lg font-semibold" style={{color: '#164055'}}>Task: Explain why exercise is important</p>
          
          <div className="space-y-6">
            <div>
              <p className="font-semibold mb-3 text-base md:text-lg" style={{color: '#164055'}}>Role 1 - Doctor:</p>
              <InteractivePromptEditor
                exerciseId="lab3-ex2a"
                mode="editable"
                placeholder="You are a medical doctor. Explain in 3 sentences why exercise is important for health."
              />
            </div>
            
            <div>
              <p className="font-semibold mb-3 text-base md:text-lg" style={{color: '#164055'}}>Role 2 - Sports Coach:</p>
              <InteractivePromptEditor
                exerciseId="lab3-ex2b"
                mode="editable"
                placeholder="You are an energetic sports coach. Explain in 3 sentences why exercise is important, using motivational language."
              />
            </div>
            
            <div>
              <p className="font-semibold mb-3 text-base md:text-lg" style={{color: '#164055'}}>Role 3 - Scientist:</p>
              <InteractivePromptEditor
                exerciseId="lab3-ex2c"
                mode="editable"
                placeholder="You are a research scientist. Explain in 3 sentences why exercise is important, focusing on biological mechanisms."
              />
            </div>
          </div>
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What differences do you see?</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Doctor → Medical/health focus</li>
              <li>• Coach → Motivational/performance focus</li>
              <li>• Scientist → Technical/biological focus</li>
            </ul>
            <p className="text-base md:text-lg mt-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Same topic, completely different approaches!</strong></p>
          </div>
        </div>
      </ExerciseBlock>

      {/* Challenge Exercise */}
      <ExerciseBlock title="Design Your Custom AI Assistant" number={3}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Create your own AI assistant with a unique personality!</p>
          
          <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>Your task:</strong> Design an AI assistant that helps with homework. Give it:</p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• A specific expertise (math, writing, science, etc.)</li>
              <li>• A personality (patient, funny, strict, creative, etc.)</li>
              <li>• A teaching style (uses analogies, step-by-step, questions, etc.)</li>
              <li>• Any unique traits that make it special</li>
            </ul>
          </div>
          
          <InteractivePromptEditor
            exerciseId="lab3-challenge"
            mode="editable"
            placeholder="You are [describe your custom AI assistant's role and personality here]

[Then ask it a homework-related question to see how it responds]

Example:
You are Professor Sparks, an enthusiastic physics teacher who explains everything using superhero movie analogies and always adds fun facts. You encourage students to ask 'what if' questions.

Explain Newton's First Law of Motion."
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>Success Criteria:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Clear role definition</li>
              <li>• Specific personality traits</li>
              <li>• Unique teaching or communication style</li>
              <li>• The response matches the personality you created</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Key Discoveries */}
      <DiscoveriesCard>
        <ul className="space-y-4">
          <li><strong style={{color: '#164055'}}>Word-by-Word Generation</strong> - LLMs build responses one piece at a time, with each word influencing what comes next</li>
          <li><strong style={{color: '#164055'}}>Tokens</strong> - The basic units that AI processes (roughly equivalent to words or word pieces)</li>
          <li><strong style={{color: '#164055'}}>Context is King</strong> - Everything that came before shapes what the AI predicts next. More context = better responses</li>
          <li><strong style={{color: '#164055'}}>Probabilistic Selection</strong> - The AI doesn't always pick the most likely word, adding creativity and variation</li>
          <li><strong style={{color: '#164055'}}>Role-Playing Power</strong> - Using "You are a [ROLE]" dramatically changes the AI's output style, tone, and approach</li>
        </ul>
      </DiscoveriesCard>

      {/* Quiz */}
      <QuizCard onAllCompleted={() => setShowCongratulations(true)}>
        <QuizItem>I understand how LLMs generate responses word-by-word</QuizItem>
        <QuizItem>I know what tokens are and why they matter</QuizItem>
        <QuizItem>I understand why the same prompt gives different responses (probabilistic selection)</QuizItem>
        <QuizItem>I can use "You are a [ROLE]" to control AI personality and style</QuizItem>
        <QuizItem>I can design custom AI assistants with specific personalities</QuizItem>
      </QuizCard>

      {/* Congratulations - only show when quiz is complete */}
      {showCongratulations && (
        <div className="animate-fadeIn space-y-10">
          <NextSteps href="/dashboard/vibecoding/labs/lab4">
            Fantastic! You now understand both how AI generates text AND how to control its personality! 
            You've mastered the word-by-word generation process, learned about tokens and context, 
            and discovered the power of role-playing to create custom AI assistants.
          </NextSteps>
          
          {/* Lab 4 Preview - separate from congratulations card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>What's Next?</h3>
            <div className="space-y-6" style={{color: '#3f3f3f'}}>
              <div>
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>In Lab 4</strong>, you'll learn:</p>
                <ul className="space-y-3 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>What AI is REALLY good at (and what it struggles with)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>How to recognize "hallucinations" (when AI makes things up)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Advanced techniques for making AI think step-by-step</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Pro Tip</strong>: Try the same prompt with different roles and see how dramatically the style changes. Role-playing is one of the most powerful prompt techniques!</p>
              </div>
              
              <div className="pt-4">
                <a
                  href="/dashboard/vibecoding/labs/lab4"
                  className="inline-flex items-center gap-3 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{backgroundColor: '#f7aa37'}}
                >
                  <span>Continue to Lab 4</span>
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
