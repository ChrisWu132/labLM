# Hackathon Submission: LLM Learning Lab

## What did you build? (One-liner)

An AI literacy education platform for k12 studednt that teaches them to understand how LLMs actually work through 6 progressive hands-on interactive labs and AI coach.

---

## Technical Feasibility

The platform is fully functional with 6 complete progressive labs deployed in production. The core technical challenge we solved was building an interactive learning system that allows middle school students to experiment with GPT-4o in real-time while maintaining cost efficiency and educational effectiveness. Every lab features embedded prompt editors and live AI output displays integrated directly into lesson content through custom MDX architecture, eliminating context switching between reading and practice.

The most technically complex component is our context engineering system for age-appropriate AI interactions. We developed a sophisticated prompt template system that wraps student inputs with educational scaffolding to ensure GPT-4o responses are appropriate for 12-15 year olds while remaining true to how LLMs actually behave. This required extensive testing to balance authenticity with safety. The system includes dynamic context injection based on the current lab, student progress, and exercise objectives, with all prompts tracked and validated for educational alignment.

The visual workflow builder in Lab 6 required solving complex technical problems in state management and execution orchestration. We built a custom React Flow implementation with specialized node types for Input, AI Prompt Steps, and Output, combined with a topological sorting execution engine that processes multi-step AI workflows in correct dependency order. The challenge was making this accessible to middle schoolers through intuitive drag-and-drop while handling sophisticated variable substitution between steps. Students can create workflows like Story Creator or Homework Helper that chain multiple AI calls with intermediate data transformation.


---

## Problem Identification (Social Good)

We identified a critical gap in K-12 education where students use AI tools like ChatGPT daily but receive no foundational AI literacy instruction. In 2025, middle schoolers interact with LLMs for homework help, creative writing, and research, yet they fundamentally lack understanding of what these systems actually are, how they work, and when to trust their outputs. This creates immediate educational risks including blind dependence on potentially flawed AI responses, widespread plagiarism without recognition of wrongdoing, acceptance of hallucinated information as fact, and complete inability to critically evaluate AI-generated content. The problem extends beyond academic integrity to long-term societal impact as this generation becomes adults who cannot distinguish reliable AI outputs from misinformation.

Our platform addresses social good through democratizing AI education for the next generation.The core educational contribution is building critical thinking skills for the AI age. Lab 4 specifically teaches hallucination recognition and fact-checking techniques, training students to question AI outputs rather than blindly accepting them as authoritative. Lab 5 dedicates substantial time to ethics and academic integrity, clearly distinguishing legitimate AI-assisted learning from plagiarism while teaching students what personal information should never be shared with AI systems. This dual focus on critical evaluation and responsible use helps prevent both academic misconduct and personal data exposure. Lab 6 develops computational thinking through visual workflow building, providing foundation skills for future AI and machine learning careers while teaching problem decomposition applicable across all domains.


---

## Novelty of Solution

Our fundamental innovation is integrating theory with practice through a 40 percent theory and 60 percent practice curriculum balance. Most AI education platforms follow one of two failing approaches. Skills-focused competitors like Anthropic and Codecademy dedicate only 10 percent to theory and 90 percent to practice, teaching students how to write effective prompts without understanding why they work or when they fail. Traditional academic approaches flip this to 90 percent theory and 10 percent practice, leaving students with conceptual knowledge but no practical application ability. Our balanced approach delivers both comprehension and capability. Each lab follows a consistent structure where Part A explores how AI actually works through interactive experiments, followed by Part B teaching practical techniques through hands-on exercises. 

The visual workflow builder serving as Lab 6 capstone represents an industry first for middle school AI curriculum. We transform the abstract concept of prompt chaining into tangible drag-and-drop workflow creation where students build multi-step AI systems with real-time execution and variable substitution. TThis bridges the gap between basic prompt engineering and actual AI system design, introducing computational thinking applicable to future programming and machine learning work.

---

## Venture Feasibility (Hackathon Context)

Our target market encompasses 50 million middle school students in the United States and 130 million globally, with primary revenue through a ToB model targeting schools and districts, supplemented by secondary ToC freemium access for individual students and parents. We offer three pricing tiers addressing different institutional needs and budgets. The Classroom Pack at $199 per year serves up to 4 classes totaling 100 students with full curriculum access to Labs 1-6 and email support. The School License at $999 per year provides unlimited classes per school, priority support, teacher training workshops, and an analytics dashboard. The District License uses custom pricing for multi-school deployments, includes a dedicated success manager, offers custom LMS integration, and provides white-label options for districts wanting branded experiences.

Unit economics demonstrate strong profitability with $0.26 cost per student for LLM API usage. A Classroom Pack serving 100 students generates $199 in revenue against $26 in costs, yielding 87 percent gross margin compared to 60 percent typical for traditional edtech. This margin provides substantial room for customer acquisition investment and growth. Our go-to-market strategy unfolds in three phases. Phase one covers pilot deployment in months 1-3, partnering with 10 schools offering free pilots to collect testimonials and case studies while iterating based on teacher feedback. Phase two targets early adopters in months 4-6, focusing on progressive districts in the Bay Area, NYC, and Austin, attending education conferences including ISTE and SXSW EDU, and executing content marketing through teacher blogs and YouTube tutorials. Phase three drives scale in months 7-12 through partnerships with LMS providers like Canvas and Google Classroom, securing state and district procurement contracts, and launching a referral program incentivizing teachers to recommend the platform.

---

