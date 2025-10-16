// App-wide constants and configuration

// Lab Configuration (5 Progressive Prompt Engineering Labs)
export const LABS = [
  {
    number: 1,
    title: "What is a Prompt?",
    path: "/dashboard/vibecoding?lab=1",
    description: "Learn what prompts are and how to write basic instructions. See how AI understands your input.",
    duration: "15 min",
    icon: "compass",
    difficulty: "Beginner",
    concepts: ["Prompt Structure", "Basic Instructions", "AI Interaction"],
  },
  {
    number: 2,
    title: "Clear Instructions",
    path: "/dashboard/vibecoding?lab=2",
    description: "Master the art of being specific. Learn how to avoid confusion and get exactly what you want from AI.",
    duration: "20 min",
    icon: "code",
    difficulty: "Beginner",
    concepts: ["Specificity", "Context", "Clear Communication"],
  },
  {
    number: 3,
    title: "Role Playing",
    path: "/dashboard/vibecoding?lab=3",
    description: "Discover how to make AI act like different characters. See how roles change AI's responses.",
    duration: "20 min",
    icon: "award",
    difficulty: "Intermediate",
    concepts: ["System Prompts", "Character Roles", "Output Style"],
  },
  {
    number: 4,
    title: "Guided Thinking",
    path: "/dashboard/vibecoding?lab=4",
    description: "Learn to guide AI through step-by-step reasoning. Get detailed explanations for complex problems.",
    duration: "25 min",
    icon: "code",
    difficulty: "Intermediate",
    concepts: ["Chain-of-Thought", "Step-by-Step", "Deep Analysis"],
  },
  {
    number: 5,
    title: "Creative Challenge",
    path: "/dashboard/vibecoding?lab=5",
    description: "Put all your skills together! Solve real scenarios and create your own AI-powered solutions.",
    duration: "30 min",
    icon: "award",
    difficulty: "Advanced",
    concepts: ["Real Applications", "Creative Projects", "Problem Solving"],
  },
] as const

// Module Configuration (Orientation + LLM Learning Lab)
export const MODULES = [
  {
    number: 0,
    title: "Orientation",
    path: "/dashboard/orientation",
    description: "Quick introduction to get started with LLM Learning Lab",
    duration: "5 min",
    icon: "compass",
  },
  {
    number: 1,
    title: "LLM Learning Lab",
    path: "/dashboard/vibecoding",
    description: "Complete 5 progressive labs and master the art of prompt engineering",
    duration: "2 hours",
    icon: "code",
  },
] as const

// Module Status Configuration
export const MODULE_STATUS_CONFIG = {
  not_started: { label: "Not Started", variant: "secondary" as const },
  in_progress: { label: "In Progress", variant: "default" as const },
  completed: { label: "Completed", variant: "outline" as const },
} as const

// Orientation Checklist
export const ORIENTATION_CHECKLIST = [
  {
    id: "account",
    label: "Create your account",
    description: "Sign up to track your progress and save your prompts",
  },
  {
    id: "intro",
    label: "Watch intro video",
    description: "Learn what prompt engineering is and why it matters",
  },
  {
    id: "community",
    label: "Join the community",
    description: "Connect with other learners and share your creations",
  },
] as const

// Learning Journey Steps
export const LEARNING_JOURNEY = [
  {
    step: 1,
    title: "Prompt Basics",
    description:
      "Learn what prompts are and how AI understands instructions. Start with simple commands.",
  },
  {
    step: 2,
    title: "Clear Communication",
    description: "Master being specific and clear. Learn to get exactly what you want from AI.",
  },
  {
    step: 3,
    title: "Advanced Techniques",
    description: "Discover role-playing and step-by-step reasoning to unlock AI's full potential.",
  },
  {
    step: 4,
    title: "Real Applications",
    description: "Apply your skills to real scenarios like homework help, creative writing, and problem solving.",
  },
  {
    step: 5,
    title: "Create & Share",
    description: "Complete creative challenges and share your best prompts with the community.",
  },
] as const

// FAQs
export const FAQS = [
  {
    question: "Do I need any coding experience?",
    answer:
      "Absolutely not! VibeCoding Lab is designed for complete beginners. You watch AI code—you don't write code yourself. If you can watch a video and understand English, you can learn.",
  },
  {
    question: "How long does it take?",
    answer:
      "All 3 labs take about 45 minutes total. Lab 1 is 10 minutes, Lab 2 is 15 minutes, and Lab 3 is 20 minutes. You can pause anytime and continue later.",
  },
  {
    question: "What will I actually learn?",
    answer:
      "You'll understand how web applications work: frontend (what users see), JavaScript (interactivity), backend (servers), and APIs (data). You won't be a programmer yet, but you'll understand how programming works.",
  },
  {
    question: "Will I write any code myself?",
    answer:
      "No! In VibeCoding Lab, you only observe. The AI codes while explaining what it's doing. It's like watching a chef cook before you try cooking yourself. This builds understanding without the frustration of syntax errors.",
  },
  {
    question: "What if I don't understand something?",
    answer:
      "Each lab has an 'Explain Code' button that breaks down what the AI built in plain English. Plus, you can replay any lab as many times as you want.",
  },
  {
    question: "What happens after I finish all 3 labs?",
    answer:
      "You'll have a solid understanding of how web applications work! Many learners continue with traditional coding courses (Codecademy, freeCodeCamp) with much more confidence, or use this knowledge to better communicate with developers.",
  },
] as const

// Proof Points
export const PROOF_POINTS = [
  { stat: "45 min", label: "Total Learning Time" },
  { stat: "0", label: "Coding Required" },
  { stat: "3 Labs", label: "Complete Curriculum" },
  { stat: "100%", label: "Browser-Based" },
] as const

// Pricing Configuration
export const PRICING = {
  price: 0,
  currency: "$",
  period: "free",
  description: "Lab 1 is completely free. Unlock all 3 labs to complete your learning.",
  features: [
    "Lab 1: Personal Landing Page (Free)",
    "Lab 2: Interactive Counter App",
    "Lab 3: Weather Dashboard (Full-Stack)",
    "Watch AI code in real-time",
    "Learn by observation, not typing",
    "Browser-based (no installation)",
    "Beginner-friendly explanations",
  ],
  guarantee: "Try Lab 1 free. No credit card required.",
} as const

// Sample Learning Outcomes (replacing Sample Projects)
export const SAMPLE_PROJECTS = [
  {
    title: "Understand Frontend",
    description: "Learn how HTML and CSS create what users see. Watch AI build a personal landing page from scratch.",
    gradient: "from-primary/20 to-teal/20",
  },
  {
    title: "Grasp Interactivity",
    description: "See how JavaScript makes websites respond to clicks. Observe AI add behavior to static pages.",
    gradient: "from-teal/20 to-amber/20",
  },
  {
    title: "Master Full-Stack",
    description: "Understand how frontend and backend work together. Watch AI build a complete web application with APIs.",
    gradient: "from-amber/20 to-primary/20",
  },
] as const

// Copy Text
export const COPY = {
  app: {
    name: "VibeCoding Lab",
    tagline: "Learn coding by watching, not by typing",
  },
  hero: {
    badge: "Build by Doing",
    headline: "Watch AI Code.",
    subheadline: "Understand Full-Stack.",
    description:
      "45 minutes to understand how real apps work. Watch an AI expert build from frontend to backend. Zero experience needed.",
  },
  cta: {
    primary: "Try it Now",
    secondary: "Start Lab 1",
    view: "View Labs",
    enroll: "Start Building",
  },
  sections: {
    modules: {
      title: "3 Labs. Full Understanding.",
      description:
        "Watch AI code in real-time. HTML, CSS, JavaScript, backend, APIs—follow the real dev workflow, step by step.",
    },
    proof: {
      title: "45 Minutes. Zero to Understanding.",
      description: "Complete beginners gain real technical understanding by watching AI build. No typing required.",
    },
    pricing: {
      title: "Start Learning Free",
      description: "Lab 1 is free. Unlock all 3 Labs to complete your journey.",
      badge: "Free to Try",
    },
    faq: {
      title: "Common Questions",
      description: "Everything you need to know about VibeCoding Lab",
    },
    finalCta: {
      title: "Ready to Understand Code?",
      description:
        "Join beginners learning by watching, not struggling. Start Lab 1 free today.",
    },
  },
  orientation: {
    welcome: {
      title: "Welcome Video",
      description: "Watch this 3-minute introduction to the course",
      ctaText: "Play Video",
      infoText:
        "Learn about the course structure, meet your AI coach, and see what you'll build by the end.",
    },
    checklist: {
      title: "Setup Checklist",
      description: "Complete these steps to get ready for the course",
    },
    journey: {
      title: "Your Learning Journey",
      description: "Here's what you'll accomplish in the next few weeks",
    },
    nextSteps: {
      title: "Ready to Start?",
      descriptionComplete:
        "Great! You've completed the setup. Let's dive into Problem Discovery.",
      descriptionIncomplete: "Complete the checklist above to unlock the next module",
      ctaText: "Start Module 1",
    },
  },
  lab: {
    objectiveLabel: "Objective:",
    startText: "Start Lab",
    reviewText: "Review",
    completeText: "Mark Complete",
  },
  footer: {
    copyright: "© 2025 VibeCoding Lab. All rights reserved.",
  },
} as const

// Video Configuration
export const VIDEO_CONFIG = {
  orientation: {
    url: "", // To be configured
    title: "Welcome to AI Startup Course",
    duration: 180, // seconds
    thumbnail: "", // To be configured
  },
} as const

// External Links
export const LINKS = {
  auth: "/auth",
  support: "/dashboard/support",
  community: "#", // To be configured
  helpCenter: "#", // To be configured
  contact: "#", // To be configured
  privacy: "#", // To be configured
  terms: "#", // To be configured
  refund: "#", // To be configured
} as const
