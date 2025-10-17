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

export function Lab5Interactive() {
  const [showCongratulations, setShowCongratulations] = useState(false)
  
  return (
    <div className="border-2 rounded-3xl p-8 space-y-10" style={{borderColor: '#3b999c40', backgroundColor: 'rgba(59, 153, 156, 0.02)'}}>
      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
          Lab 5: Responsible AI Use & Mastery
        </h1>
      </div>

      {/* Learning Objectives */}
      <ObjectivesCard duration="~30 minutes">
        By the end of this lab, you will:
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Understand how to use AI ethically and responsibly</li>
          <li>Know the difference between AI-assisted learning and plagiarism</li>
          <li>Protect your privacy when using AI tools</li>
          <li>Apply ALL prompt techniques in real-world scenarios</li>
          <li>Become a confident, responsible AI user</li>
        </ul>
      </ObjectivesCard>

      {/* Part A: AI Ethics & Responsible Use */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part A: AI Ethics & Responsible Use (12 minutes)</h2>
        
        <div className="space-y-8">
          <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
            Now that you know <strong style={{color: '#164055'}}>HOW</strong> to use AI effectively, let's talk about <strong style={{color: '#164055'}}>WHEN</strong> and <strong style={{color: '#164055'}}>HOW</strong> you should use it responsibly.
          </p>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6" style={{color: '#164055'}}>Academic Integrity: The Right Way to Use AI</h3>
            <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>
                Using AI for schoolwork is like using a calculator—it's a tool that can help you learn, but you need to use it <strong style={{color: '#164055'}}>correctly</strong>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Good Uses */}
              <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-3" style={{color: '#164055'}}>
                  <span className="text-2xl">✅</span> GOOD: AI-Assisted Learning
                </h4>
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>These uses help you LEARN:</strong></p>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>1. Understanding Concepts</p>
                    <div className="bg-red-100 p-3 rounded mb-2">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-red-600">❌ BAD:</span> "What's the answer to question 5 on my worksheet?"</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-green-600">✅ GOOD:</span> "I don't understand photosynthesis. Can you explain it using a simple analogy?"</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>2. Getting Unstuck</p>
                    <div className="bg-red-100 p-3 rounded mb-2">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-red-600">❌ BAD:</span> "Write my essay about Romeo and Juliet."</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-green-600">✅ GOOD:</span> "I'm writing about themes in Romeo and Juliet. Can you help me brainstorm 3 possible themes to explore?"</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>3. Checking Your Work</p>
                    <div className="bg-red-100 p-3 rounded mb-2">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-red-600">❌ BAD:</span> "Solve this math problem for me."</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-green-600">✅ GOOD:</span> "I solved this problem and got X. Can you check my steps and tell me if I made a mistake?"</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>4. Learning New Skills</p>
                    <div className="bg-red-100 p-3 rounded mb-2">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-red-600">❌ BAD:</span> "Write my code for me."</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="text-sm" style={{color: '#3f3f3f'}}><span className="font-bold text-green-600">✅ GOOD:</span> "I'm trying to create a loop in Python but I'm stuck. Can you explain how loops work with an example?"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bad Uses */}
              <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)'}}>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-3" style={{color: '#164055'}}>
                  <span className="text-2xl">❌</span> BAD: Plagiarism & Cheating
                </h4>
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>These uses hurt your learning:</strong></p>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>1. Direct Copying</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Asking AI to write your essay and submitting it as yours</li>
                      <li>• Copying answers from AI without understanding</li>
                      <li>• Using AI to do your homework entirely</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>2. Avoiding Learning</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Never attempting problems yourself first</li>
                      <li>• Using AI as a shortcut instead of a learning tool</li>
                      <li>• Not understanding what the AI produces</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>3. Academic Dishonesty</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Submitting AI-generated work as your own original work</li>
                      <li>• Using AI during tests when it's not allowed</li>
                      <li>• Not citing AI when you're required to</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
              <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>The Golden Rule of AI for School</h4>
              <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>
                <strong style={{color: '#164055'}}>Use AI to help you LEARN, not to AVOID learning.</strong>
              </p>
              
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Ask yourself:</strong></p>
              <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li>• "Am I learning from this, or just getting an answer?"</li>
                <li>• "Could I explain this to someone else after using AI?"</li>
                <li>• "Am I using AI to understand better, or to skip the work?"</li>
              </ul>
              <p className="text-base md:text-lg mt-4 font-semibold" style={{color: '#164055'}}>
                If you're not learning, you're using it wrong!
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6" style={{color: '#164055'}}>Privacy & Safety: What NOT to Tell AI</h3>
            <div className="rounded-xl p-6 mb-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
              <p className="text-base md:text-lg font-semibold" style={{color: '#164055'}}>
                Rule: Treat AI like a stranger on the internet—don't share personal information!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Never Share */}
              <div className="rounded-xl p-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-3" style={{color: '#164055'}}>
                  <span className="text-2xl">❌</span> NEVER Share With AI:
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>1. Personal Information</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Your full name, address, phone number</li>
                      <li>• Your school's name or exact location</li>
                      <li>• Your age, birthday, or identifying details</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>2. Passwords & Security</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Any passwords</li>
                      <li>• Security questions/answers</li>
                      <li>• Banking or financial information</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>3. Private Content</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Family photos or personal photos</li>
                      <li>• Private conversations</li>
                      <li>• Confidential information about others</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{color: '#164055'}}>4. Plans & Location</p>
                    <ul className="space-y-1 text-sm" style={{color: '#3f3f3f'}}>
                      <li>• Where you'll be and when</li>
                      <li>• Your daily schedule</li>
                      <li>• Travel plans</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Safe to Share */}
              <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-3" style={{color: '#164055'}}>
                  <span className="text-2xl">✅</span> Safe to Share:
                </h4>
                
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>
                  <strong style={{color: '#164055'}}>General information that doesn't identify you:</strong>
                </p>
                
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm" style={{color: '#3f3f3f'}}>"I'm a middle school student learning about..."</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm" style={{color: '#3f3f3f'}}>"I'm working on a science project about..."</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm" style={{color: '#3f3f3f'}}>"I'm interested in learning programming..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Exercise: Ethics Quiz */}
      <ExerciseBlock title="Interactive Exercise: Ethics Quiz" number={1}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's test your judgment! For each scenario, decide if it's ethical AI use:</p>
          
          <InteractivePromptEditor
            exerciseId="lab5-ethics"
            mode="editable"
            placeholder="Analyze these scenarios. Which ones are ethical?

Scenario 1: Sarah is stuck on a math problem. She asks AI to explain the concept, then solves the problem herself.

Scenario 2: Tom asks AI to write his entire history essay, then copies it word-for-word and submits it.

Scenario 3: Maya uses AI to brainstorm ideas for her science fair project, then researches and develops her favorite idea on her own.

Scenario 4: Alex is taking a test and secretly uses AI on his phone to answer questions.

Which scenarios show responsible AI use? Explain why or why not."
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>Think about:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Is the student learning?</li>
              <li>• Is it honest?</li>
              <li>• Would a teacher approve?</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Creating Personal AI Usage Principles */}
      <ExerciseBlock title="Creating Your Personal AI Usage Principles" number={2}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's create YOUR rules for using AI responsibly!</p>
          
          <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>My AI Usage Principles:</h4>
            <ol className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li><strong style={{color: '#164055'}}>Learning First</strong>: I will use AI to help me understand, not to avoid thinking</li>
              <li><strong style={{color: '#164055'}}>Honesty</strong>: I will be honest about when I use AI and never claim AI's work as my own</li>
              <li><strong style={{color: '#164055'}}>Privacy</strong>: I will never share personal information with AI</li>
              <li><strong style={{color: '#164055'}}>Critical Thinking</strong>: I will always verify important facts and not blindly trust AI</li>
              <li><strong style={{color: '#164055'}}>Effort</strong>: I will try problems myself first before asking AI for help</li>
            </ol>
          </div>
          
          <InteractivePromptEditor
            exerciseId="lab5-principles"
            mode="editable"
            placeholder="Write your personal AI usage principles. What rules will you follow?

Example:
- I will use AI to learn, not to cheat
- I will always try problems myself first
- I will check AI's facts before trusting them
- I will not share personal information
- I will be honest about using AI

Write at least 3 principles that matter to you!"
          />
        </div>
      </ExerciseBlock>

      {/* Part B: Comprehensive Application */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#f7aa37'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part B: Comprehensive Application (18 minutes)</h2>
        
        <div className="space-y-8">
          <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
            Time to put <strong style={{color: '#164055'}}>EVERYTHING</strong> together! You'll apply all the techniques you've learned in real-world scenarios.
          </p>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6" style={{color: '#164055'}}>Skills Recap</h3>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>You've mastered these techniques:</p>
            
            <TableCard>
              <table className="w-full">
                <thead style={{backgroundColor: '#f7aa37'}}>
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700 text-left">Lab</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 text-left">Technique</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 text-left">Key Skill</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Lab 1</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Clear Instructions</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Ask specific questions</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Lab 2</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Context & Constraints</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Provide details, set limits</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Lab 3</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Role-Playing</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">"You are a..."</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Lab 4</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">Chain-of-Thought</td>
                    <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100">"Let's think step by step"</td>
                  </tr>
                </tbody>
              </table>
            </TableCard>
            
            <div className="mt-4 text-center">
              <p className="text-xl font-bold" style={{color: '#164055'}}>Now combine them ALL!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Exercises */}
      <ExerciseBlock title="Scenario 1: Learning Assistant" number={3}>
        <div className="space-y-6">
          <div>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Situation</strong>: You're studying a difficult topic for school and need help understanding it.</p>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Task</strong>: Use AI to help you learn about a concept WITHOUT just getting the answer.</p>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Your Challenge</strong>: Pick a topic you're currently studying and create a prompt that:</p>
          </div>
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Sets AI's role as a patient teacher</li>
              <li>• Asks for explanation with examples</li>
              <li>• Requests step-by-step reasoning</li>
              <li>• Asks for practice questions to test your understanding</li>
            </ul>
          </div>
          
          <InteractivePromptEditor
            exerciseId="lab5-scenario1"
            mode="editable"
            placeholder="Example approach:

You are a patient and encouraging science teacher who loves using real-world analogies.

I'm struggling to understand photosynthesis. Please:
1. Explain what photosynthesis is using a simple analogy
2. Walk me through the process step-by-step
3. Explain why it's important for life on Earth
4. Give me 2 practice questions to test if I understand

Keep your explanation clear and suitable for a 13-year-old.

Now write YOUR prompt for a topic YOU need help with!"
          />
        </div>
      </ExerciseBlock>

      <ExerciseBlock title="Scenario 2: Creative Writing Partner" number={4}>
        <div className="space-y-6">
          <div>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Situation</strong>: You need to write a short creative story for English class.</p>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Task</strong>: Use AI as a brainstorming partner, but YOU write the actual story.</p>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Your Challenge</strong>: Create a prompt that:</p>
          </div>
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Sets AI's role as a creative writing consultant</li>
              <li>• Asks for story ideas or plot suggestions</li>
              <li>• Gets feedback on YOUR ideas</li>
              <li>• Helps you develop characters or settings</li>
              <li>• Reminds AI you'll write it yourself</li>
            </ul>
          </div>
          
          <InteractivePromptEditor
            exerciseId="lab5-scenario2"
            mode="editable"
            placeholder="Example approach:

You are a creative writing coach helping a student develop their own story ideas. Don't write the story for me - just help me brainstorm and develop my ideas.

I need to write a 500-word adventure story. Here's my rough idea: [describe your idea]

Please:
1. Give me 3 possible plot twists I could add
2. Suggest interesting character traits for my main character
3. Help me think of a compelling opening sentence
4. Ask me questions to help me develop the story further

Write your own version with YOUR story idea!"
          />
        </div>
      </ExerciseBlock>

      <ExerciseBlock title="Final Challenge: Your Real Problem" number={5}>
        <div className="space-y-6">
          <div>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Your Task</strong>: Think of a REAL problem you have right now—homework help, learning a skill, planning something, creative project, etc.</p>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Requirements</strong>: Your prompt must use AT LEAST 3 of these:</p>
          </div>
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
            <ol className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>1. Role-setting ("You are...")</li>
              <li>2. Clear details and context</li>
              <li>3. Specific constraints (format, length, style)</li>
              <li>4. Chain-of-Thought ("Let's think step by step")</li>
              <li>5. Responsible use (learning-focused, not cheating)</li>
            </ol>
          </div>
          
          <InteractivePromptEditor
            exerciseId="lab5-final"
            mode="editable"
            placeholder="This is your moment! Craft a comprehensive prompt for a REAL problem you have.

Think about:
- What role would help AI assist you best?
- What specific details does AI need to know?
- What constraints or format do you need?
- Should AI show step-by-step reasoning?
- Are you using AI to learn (not to cheat)?

Make this YOUR masterpiece prompt!

Here's a complex example:

You are an experienced study coach who helps students develop effective learning strategies.

I have a biology test in 3 days covering cell structure, photosynthesis, and the cell cycle. I struggle with memorizing parts of the cell.

Please help me by:
1. Suggesting 2-3 effective memorization techniques for biology terms
2. Creating a 3-day study plan that balances all three topics
3. Recommending how to test myself to ensure I actually understand (not just memorize)
4. Providing ONE practice question for each topic so I can gauge my readiness

Let's think step by step about the best approach for someone who learns better with visual aids and real-world connections.

Now write YOURS!"
          />
        </div>
      </ExerciseBlock>

      {/* Key Discoveries */}
      <DiscoveriesCard>
        <ul className="space-y-4">
          <li><strong style={{color: '#164055'}}>Ethical AI Use</strong> - Use AI to learn, not to avoid learning</li>
          <li><strong style={{color: '#164055'}}>Academic Integrity</strong> - AI should enhance understanding, not replace effort</li>
          <li><strong style={{color: '#164055'}}>Privacy Protection</strong> - Never share personal information with AI</li>
          <li><strong style={{color: '#164055'}}>Critical Thinking</strong> - Always verify important information</li>
          <li><strong style={{color: '#164055'}}>Comprehensive Skills</strong> - Combine all prompting techniques for complex problems</li>
          <li><strong style={{color: '#164055'}}>Responsible Learning</strong> - AI is a tool to amplify your thinking, not replace it</li>
        </ul>
      </DiscoveriesCard>

      {/* Quiz */}
      <QuizCard onAllCompleted={() => setShowCongratulations(true)}>
        <QuizItem>I understand how to use AI ethically for learning without plagiarizing</QuizItem>
        <QuizItem>I know what personal information to never share with AI</QuizItem>
        <QuizItem>I can combine multiple prompting techniques for complex scenarios</QuizItem>
        <QuizItem>I will always verify important information from AI</QuizItem>
        <QuizItem>I'm committed to using AI as a learning tool, not a shortcut</QuizItem>
      </QuizCard>

      {/* Congratulations - only show when quiz is complete */}
      {showCongratulations && (
        <div className="animate-fadeIn space-y-10">
          {/* Main Congratulations */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>🎓 Congratulations!</h3>
              <p className="text-xl md:text-2xl mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>You've completed the LLM Learning Lab course!</p>
              
              <div className="space-y-6" style={{color: '#3f3f3f'}}>
                <div>
                  <h4 className="text-xl font-bold mb-4" style={{color: '#164055'}}>What You've Mastered</h4>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                      <h5 className="font-bold mb-2" style={{color: '#164055'}}>✅ Understanding AI</h5>
                      <ul className="text-sm space-y-1">
                        <li>• How LLMs work (word prediction, training, tokens)</li>
                        <li>• AI's strengths and weaknesses</li>
                        <li>• Knowledge boundaries and hallucinations</li>
                      </ul>
                    </div>
                    <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                      <h5 className="font-bold mb-2" style={{color: '#164055'}}>✅ Practical Skills</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Writing clear, specific prompts</li>
                        <li>• Adding context and constraints</li>
                        <li>• Role-playing techniques</li>
                        <li>• Chain-of-Thought reasoning</li>
                      </ul>
                    </div>
                    <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                      <h5 className="font-bold mb-2" style={{color: '#164055'}}>✅ Responsible Use</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Academic integrity with AI</li>
                        <li>• Privacy and safety</li>
                        <li>• Critical thinking and fact-checking</li>
                        <li>• Ethical AI usage principles</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                  <h4 className="text-xl font-bold mb-4" style={{color: '#164055'}}>🌟 You Are Now an AI-Literate Learner!</h4>
                  <p className="text-base md:text-lg mb-4">You don't just know how to USE AI—you understand:</p>
                  <ul className="space-y-2 text-base md:text-lg">
                    <li>• <strong style={{color: '#164055'}}>What it is</strong> and how it works</li>
                    <li>• <strong style={{color: '#164055'}}>When to trust it</strong> and when to question it</li>
                    <li>• <strong style={{color: '#164055'}}>How to use it</strong> effectively and responsibly</li>
                    <li>• <strong style={{color: '#164055'}}>Why it matters</strong> to be a critical thinker</li>
                  </ul>
                  <p className="text-base md:text-lg mt-4 font-semibold" style={{color: '#164055'}}>
                    This knowledge will serve you for years to come as AI becomes more integrated into education, work, and daily life.
                  </p>
                </div>
                
                <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
                  <h4 className="text-xl font-bold mb-4" style={{color: '#164055'}}>Remember:</h4>
                  <p className="text-2xl font-bold text-center" style={{color: '#164055'}}>
                    AI is a tool. YOU are the thinker.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Return to Dashboard Button */}
          <div className="text-center">
            <a
              href="/dashboard/vibecoding"
              className="inline-flex items-center gap-3 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
              style={{backgroundColor: '#f7aa37'}}
            >
              <span>Return to Dashboard</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
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