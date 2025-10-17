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

export function Lab4Interactive() {
  const [showCongratulations, setShowCongratulations] = useState(false)
  
  return (
    <div className="border-2 rounded-3xl p-8 space-y-10" style={{borderColor: '#3b999c40', backgroundColor: 'rgba(59, 153, 156, 0.02)'}}>
      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
          Lab 4: AI's Capabilities & Limits
        </h1>
      </div>

      {/* Learning Objectives */}
      <ObjectivesCard duration="~30 minutes">
        By the end of this lab, you will:
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Clearly understand what AI excels at and what it struggles with</li>
          <li>Recognize when AI might "hallucinate" (make things up)</li>
          <li>Develop critical thinking skills for evaluating AI responses</li>
          <li>Master Chain-of-Thought prompting for better reasoning</li>
          <li>Learn to guide AI through complex, multi-step problems</li>
        </ul>
      </ObjectivesCard>

      {/* Part A: LLM's Superpowers and Weaknesses */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part A: LLM's Superpowers and Weaknesses (15 minutes)</h2>
        
        <div className="space-y-8">
          <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
            Not all tasks are equal for AI! Let's discover what LLMs are amazing at—and where they fall short.
          </p>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>✅ AI's Superpowers</h3>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              LLMs are <strong style={{color: '#164055'}}>exceptional</strong> at these tasks:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Writing & Creative Content</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Essays, stories, poems</li>
                  <li>• Product descriptions</li>
                  <li>• Email drafts</li>
                  <li>• Blog posts</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Explanation & Teaching</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Breaking down complex concepts</li>
                  <li>• Using analogies</li>
                  <li>• Adapting to different audiences</li>
                  <li>• Answering "how" and "why" questions</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Summarization & Translation</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Condensing long texts</li>
                  <li>• Extracting key points</li>
                  <li>• Translating between languages</li>
                  <li>• Grammar and style improvements</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Brainstorming</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Generating ideas</li>
                  <li>• Exploring possibilities</li>
                  <li>• Creative problem-solving</li>
                  <li>• Alternative approaches</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>⚠️ Use AI Carefully For...</h3>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              These tasks work <strong style={{color: '#164055'}}>sometimes</strong>, but verify the results:
            </p>
            
            <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Math & Calculations</h4>
                  <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                    <li>• Simple math usually works</li>
                    <li>• Complex calculations can have errors</li>
                    <li>• Multi-step math problems are risky</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Current Events & Facts</h4>
                  <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                    <li>• Knowledge cutoff means outdated info</li>
                    <li>• Can't access real-time data</li>
                    <li>• Dates and recent events may be wrong</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Specific Facts & Statistics</h4>
                  <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                    <li>• May confuse similar facts</li>
                    <li>• Numbers might be approximations</li>
                    <li>• Always verify important data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>❌ AI's Weaknesses</h3>
            <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
              LLMs genuinely <strong style={{color: '#164055'}}>struggle</strong> with:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Complex Reasoning</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Deep logical chains</li>
                  <li>• Multi-step problem solving (without guidance)</li>
                  <li>• Abstract mathematical proofs</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Real-Time Information</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Can't browse the internet (most models)</li>
                  <li>• No access to current news</li>
                  <li>• Doesn't know what happened after training</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Personal Knowledge</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Doesn't know you or your life</li>
                  <li>• Can't remember previous conversations</li>
                  <li>• No access to private information</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Hallucinations ⚠️</h4>
                <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                  <li>• Sometimes invents plausible-sounding but false information</li>
                  <li>• Fills gaps in knowledge with "reasonable guesses"</li>
                  <li>• Can state incorrect things confidently</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Experiment 1 */}
      <ExperimentBlock title="Interactive Experiment 1: Testing Math Skills">
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's see where AI shines and where it stumbles!</p>
          
          <InteractivePromptEditor
            exerciseId="lab4-demo1"
            mode="editable"
            placeholder="Try these and see which ones work well:

1. What is 47 + 89?
2. What is 15% of $240?
3. If I buy 3 items at $12.47 each, with 8% sales tax, what's the total?

Notice: Simple math works great, but complex multi-step calculations may have errors!"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What did you discover?</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>✅ Basic arithmetic → Usually correct</li>
              <li>⚠️ Percentages & simple calculations → Mostly correct</li>
              <li>❌ Multi-step calculations → May have mistakes</li>
            </ul>
            <p className="text-base md:text-lg mt-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Key lesson</strong>: For important math, always verify or use a calculator!</p>
          </div>
        </div>
      </ExperimentBlock>

      {/* Interactive Experiment 2 */}
      <ExperimentBlock title="Interactive Experiment 2: Fact-Checking Challenge">
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Let's test AI's knowledge accuracy:</p>
          
          <InteractivePromptEditor
            exerciseId="lab4-demo2"
            mode="editable"
            placeholder="Ask the AI:

1. Who won the FIFA World Cup in 2018?
2. What is the current population of Tokyo?
3. What major AI breakthroughs happened in 2024?

Compare answers to what you can verify online. Are they accurate?"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What to watch for:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Historical facts (2018 World Cup) → Likely accurate</li>
              <li>• Current statistics (population) → Might be outdated</li>
              <li>• Recent events (2024) → May be past the knowledge cutoff</li>
            </ul>
          </div>
        </div>
      </ExperimentBlock>

      {/* Understanding Hallucinations Section */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#f7aa37'}}>
        <h3 className="text-xl md:text-2xl font-bold mb-6" style={{color: '#164055'}}>Understanding "Hallucinations" ⚠️</h3>
        
        <div className="space-y-6">
          <div className="rounded-xl p-6 border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>
              <strong style={{color: '#164055'}}>Hallucination</strong> = When AI makes up information that sounds plausible but is <strong style={{color: '#164055'}}>completely false</strong>
            </p>
            
            <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Why does this happen?</strong></p>
            <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>
              Remember: AI is a pattern predictor. When it doesn't know something, it sometimes:
            </p>
            <ol className="list-decimal ml-6 space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>Recognizes the pattern of how answers should sound</li>
              <li>Generates a "reasonable-sounding" response</li>
              <li>States it confidently (even though it's wrong!)</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>Example of a hallucination:</h4>
            <StaticPromptDemo
              exerciseId="lab4-hallucination-example"
              mode="readonly"
              initialValue="Tell me about the book 'The Adventures of Captain Whiskers' by Jane Smith."
              demoOutput="'The Adventures of Captain Whiskers' by Jane Smith is a beloved children's novel published in 2015. It follows the journey of Captain Whiskers, a brave ship captain, as he explores magical islands. The book won the Children's Literature Award in 2016 and has been translated into 15 languages."
            />
            <div className="mt-4 p-4 rounded-xl border border-red-300" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
              <p className="text-base md:text-lg font-semibold" style={{color: '#164055'}}>
                The problem: This book <strong>doesn't exist!</strong> The AI invented all those details because they "sound right" for a children's book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Experiment 3 */}
      <ExperimentBlock title="Interactive Experiment 3: Catching Hallucinations">
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Try to make the AI hallucinate by asking about something fake:</p>
          
          <InteractivePromptEditor
            exerciseId="lab4-demo3"
            mode="editable"
            placeholder="Ask about a completely made-up topic:

'Tell me about the scientific theory of Quantum Biscuits discovered by Dr. Martin Crumbsworth in 1987.'

See if the AI catches that this is fake, or if it plays along!"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What happened?</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• If the AI is cautious → Good! It might say "I don't have information about this"</li>
              <li>• If the AI generates details → Hallucination! It's making things up</li>
            </ul>
            <p className="text-base md:text-lg mt-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Key lesson</strong>: Don't blindly trust AI. Verify important information!</p>
          </div>
        </div>
      </ExperimentBlock>

      {/* Part B: Chain-of-Thought Reasoning */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8" style={{borderTopColor: '#3b999c'}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>Part B: Chain-of-Thought Reasoning (15 minutes)</h2>
        
        <div className="space-y-8">
          <p className="text-base md:text-lg mb-6" style={{color: '#3f3f3f'}}>
            Now that you know AI's limitations, let's learn to <strong style={{color: '#164055'}}>compensate</strong> for them with a powerful technique!
          </p>

          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#164055'}}>What is Chain-of-Thought (CoT)?</h3>
            <div className="rounded-xl p-6 mb-6 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}>
                <strong style={{color: '#164055'}}>Chain-of-Thought</strong> = Asking the AI to show its reasoning step-by-step before giving an answer
              </p>
              
              <p className="text-base md:text-lg mb-3" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Why this helps:</strong></p>
              <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
                <li>• Reduces errors in complex problems</li>
                <li>• Makes reasoning visible (so you can check it)</li>
                <li>• Forces the AI to "think" more carefully</li>
                <li>• Catches mistakes early</li>
              </ul>
            </div>
            
            <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
              <h4 className="font-bold text-lg mb-3" style={{color: '#164055'}}>The Magic Phrase</h4>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-lg mb-3 text-center">
                "Let's think step by step"
              </div>
              <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>
                That's it! This simple phrase dramatically improves AI reasoning.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4" style={{color: '#164055'}}>Before and After Comparison:</h4>
            
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-3 text-base md:text-lg" style={{color: '#164055'}}>Without CoT:</p>
                <StaticPromptDemo
                  exerciseId="lab4-without-cot"
                  mode="readonly"
                  initialValue="If a train leaves Chicago at 2 PM traveling at 60 mph, and another train leaves St. Louis at 3 PM traveling at 75 mph, and they're 300 miles apart, when do they meet?"
                  demoOutput="They will meet at approximately 5:24 PM."
                />
              </div>
              
              <div>
                <p className="font-semibold mb-3 text-base md:text-lg" style={{color: '#164055'}}>With CoT:</p>
                <StaticPromptDemo
                  exerciseId="lab4-with-cot"
                  mode="readonly"
                  initialValue="If a train leaves Chicago at 2 PM traveling at 60 mph, and another train leaves St. Louis at 3 PM traveling at 75 mph, and they're 300 miles apart, when do they meet?

Let's think step by step."
                  demoOutput="Let me solve this step by step:

**Step 1**: Determine the first train's head start
- Train 1 leaves at 2 PM, Train 2 leaves at 3 PM
- Head start: 1 hour

**Step 2**: Calculate distance covered by Train 1 in the head start
- Speed: 60 mph × 1 hour = 60 miles
- Remaining distance: 300 - 60 = 240 miles

**Step 3**: Calculate combined approach speed
- Train 1: 60 mph + Train 2: 75 mph = 135 mph (approaching each other)

**Step 4**: Calculate time to meet
- Distance: 240 miles ÷ Speed: 135 mph = 1.78 hours ≈ 1 hour 47 minutes

**Step 5**: Add to Train 2's departure time
- Train 2 leaves: 3:00 PM + 1 hour 47 minutes = **4:47 PM**"
                />
              </div>
            </div>
            
            <div className="mt-4 rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
              <p className="text-base md:text-lg font-semibold" style={{color: '#164055'}}>
                See the difference? You can follow the logic and verify each step!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise 1 */}
      <ExerciseBlock title="Using Let's Think Step by Step" number={1}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Try Chain-of-Thought on a problem:</p>
          
          <InteractivePromptEditor
            exerciseId="lab4-ex1"
            mode="editable"
            placeholder="I have a rectangular garden that's 12 feet long and 8 feet wide. I want to put a fence around it, and fencing costs $15 per foot. How much will the fence cost?

Let's think step by step."
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>Success Criteria:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• AI breaks down the problem into steps</li>
              <li>• Shows calculation for perimeter</li>
              <li>• Shows calculation for total cost</li>
              <li>• Gives a clear final answer</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Exercise 2 */}
      <ExerciseBlock title="Structured Reasoning Template" number={2}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>You can guide the AI's thinking with a template:</p>
          
          <InteractivePromptEditor
            exerciseId="lab4-ex2"
            mode="editable"
            placeholder="I need to decide: Should I learn Python or JavaScript first for web development?

Please analyze this by:
1. Listing the key factors to consider
2. Comparing Python vs JavaScript on each factor
3. Providing a recommendation with clear reasoning"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>What to notice:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• The structure ensures thorough analysis</li>
              <li>• Each factor gets considered</li>
              <li>• The reasoning is transparent</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Challenge Exercise */}
      <ExerciseBlock title="Multi-Step Problem Solving Challenge" number={3}>
        <div className="space-y-6">
          <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}>Combine everything you've learned! Solve this complex problem:</p>
          
          <InteractivePromptEditor
            exerciseId="lab4-challenge"
            mode="editable"
            placeholder="Challenge: Plan a school bake sale

Constraints:
- Budget: $100 for ingredients
- Goal: Raise $300 profit
- 3 different items to sell
- Each item must have different pricing strategy (low/medium/high)

Please solve this step-by-step:
1. Suggest 3 items to bake
2. Calculate ingredient costs for each
3. Determine pricing for each item
4. Calculate how many of each to make
5. Show profit calculation

Be specific with numbers!"
          />
          
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(247, 170, 55, 0.2)', borderColor: 'rgba(247, 170, 55, 0.4)'}}>
            <p className="text-base md:text-lg font-semibold mb-3"><strong style={{color: '#164055'}}>Success Criteria:</strong></p>
            <ul className="space-y-2 text-base md:text-lg" style={{color: '#3f3f3f'}}>
              <li>• Clear step-by-step breakdown</li>
              <li>• Realistic numbers</li>
              <li>• All constraints addressed</li>
              <li>• Verifiable math</li>
            </ul>
          </div>
        </div>
      </ExerciseBlock>

      {/* Key Discoveries */}
      <DiscoveriesCard>
        <ul className="space-y-4">
          <li><strong style={{color: '#164055'}}>AI's Strengths</strong> - Writing, explaining, summarizing, translating, brainstorming</li>
          <li><strong style={{color: '#164055'}}>AI's Weaknesses</strong> - Complex reasoning, math, current events, and can hallucinate</li>
          <li><strong style={{color: '#164055'}}>Critical Thinking</strong> - Always verify important facts, don't blindly trust AI</li>
          <li><strong style={{color: '#164055'}}>Hallucinations</strong> - AI sometimes invents plausible-sounding but false information</li>
          <li><strong style={{color: '#164055'}}>Chain-of-Thought</strong> - "Let's think step by step" dramatically improves reasoning</li>
          <li><strong style={{color: '#164055'}}>Structured Prompts</strong> - Giving AI a template to follow ensures thorough answers</li>
        </ul>
      </DiscoveriesCard>

      {/* Quiz */}
      <QuizCard onAllCompleted={() => setShowCongratulations(true)}>
        <QuizItem>I understand AI's strengths (writing, explaining, brainstorming) and weaknesses (math, current events, complex reasoning)</QuizItem>
        <QuizItem>I know what hallucinations are and why they happen</QuizItem>
        <QuizItem>I can use "Let's think step by step" for better reasoning</QuizItem>
        <QuizItem>I understand the importance of verifying important information from AI</QuizItem>
        <QuizItem>I can create structured prompts to guide AI through complex problems</QuizItem>
      </QuizCard>

      {/* Congratulations - only show when quiz is complete */}
      {showCongratulations && (
        <div className="animate-fadeIn space-y-10">
          <NextSteps href="/dashboard/vibecoding/labs/lab5">
            Excellent work! You now understand AI's limits AND how to work around them! 
            You've learned to identify AI's strengths and weaknesses, recognize hallucinations, 
            and use Chain-of-Thought reasoning to get better results from complex problems.
          </NextSteps>
          
          {/* Lab 5 Preview - separate from congratulations card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>What's Next?</h3>
            <div className="space-y-6" style={{color: '#3f3f3f'}}>
              <div>
                <p className="text-base md:text-lg mb-4" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>In Lab 5</strong>, you'll learn:</p>
                <ul className="space-y-3 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>How to use AI responsibly and ethically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Academic integrity when using AI for schoolwork</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{backgroundColor: '#3b999c'}}></span>
                    <span>Privacy and safety when interacting with AI</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl p-4 border" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
                <p className="text-base md:text-lg" style={{color: '#3f3f3f'}}><strong style={{color: '#164055'}}>Pro Tip</strong>: For anything important (homework answers, medical advice, legal info, financial decisions), ALWAYS verify AI outputs with reliable sources. AI is a powerful assistant, not an authority!</p>
              </div>
              
              <div className="pt-4">
                <a
                  href="/dashboard/vibecoding/labs/lab5"
                  className="inline-flex items-center gap-3 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{backgroundColor: '#f7aa37'}}
                >
                  <span>Continue to Lab 5</span>
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