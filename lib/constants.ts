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
    question: "Do I need any experience to start?",
    answer:
      "Absolutely not! LLM Learning Lab is designed for complete beginners. If you've ever used ChatGPT or similar AI tools, you already have the basics. We'll teach you how to use them like a pro!",
  },
  {
    question: "How long does it take to complete?",
    answer:
      "All 5 labs take about 2 hours total. Lab 1 is 15 minutes, Labs 2-3 are 20 minutes each, Lab 4 is 25 minutes, and Lab 5 is 30 minutes. You can pause anytime and continue later—your progress is saved!",
  },
  {
    question: "What will I actually learn?",
    answer:
      "You'll learn prompt engineering—the art of communicating effectively with AI. You'll discover how to write clear instructions, guide AI's thinking, and get exactly the results you want. These are essential skills for the AI age!",
  },
  {
    question: "Is this suitable for middle school students?",
    answer:
      "Yes! The course is specifically designed for 12-15 year olds. The content is age-appropriate, engaging, and uses examples relevant to students. No coding required—just curiosity and creativity!",
  },
  {
    question: "What if I get stuck?",
    answer:
      "Each lab includes hints and examples. You can also ask our AI coach for help anytime. Plus, every exercise shows you what success looks like, so you'll know when you've got it right!",
  },
  {
    question: "What can I do after completing all labs?",
    answer:
      "You'll be able to use AI tools like ChatGPT, Claude, and others much more effectively! You can apply these skills to homework, creative projects, learning new topics, or even helping with everyday tasks. Prompt engineering is a superpower in the AI age!",
  },
] as const

// Proof Points
export const PROOF_POINTS = [
  { stat: "2 Hours", label: "Complete Course" },
  { stat: "5 Labs", label: "Hands-On Practice" },
  { stat: "Ages 12-15", label: "Perfect For" },
  { stat: "100%", label: "Interactive" },
] as const

// Pricing Configuration
export const PRICING = {
  price: 0,
  currency: "$",
  period: "free",
  description: "All 5 labs are completely free. Start learning prompt engineering today!",
  features: [
    "5 complete labs (2 hours total)",
    "Interactive prompt exercises",
    "Real-time AI responses",
    "Instant success feedback",
    "Progress tracking",
    "AI coach assistance",
    "No coding required",
    "Perfect for ages 12-15",
  ],
  guarantee: "100% free. No credit card required.",
} as const

// Sample Learning Outcomes
export const SAMPLE_PROJECTS = [
  {
    title: "Master Basic Prompts",
    description: "Learn the fundamentals of prompt engineering. Discover how to write clear instructions that AI understands perfectly.",
    gradient: "from-primary/20 to-teal/20",
  },
  {
    title: "Unlock AI's Potential",
    description: "Guide AI to think step-by-step and take on different roles. See how advanced techniques dramatically improve results.",
    gradient: "from-teal/20 to-amber/20",
  },
  {
    title: "Solve Real Problems",
    description: "Apply your prompt skills to homework, creative projects, and everyday challenges. Turn AI into your personal assistant!",
    gradient: "from-amber/20 to-primary/20",
  },
] as const

// Copy Text
export const COPY = {
  app: {
    name: "LLM Learning Lab",
    tagline: "Master AI through hands-on practice",
  },
  hero: {
    badge: "Learn by Doing",
    headline: "Learn to Talk to AI.",
    subheadline: "Master Prompt Engineering.",
    description:
      "2 hours to master the art of communicating with AI. Interactive labs designed for middle school students. Zero coding required.",
  },
  cta: {
    primary: "Start Learning Free",
    secondary: "Begin Your Journey",
    view: "View Labs",
    enroll: "Start Lab 1",
  },
  sections: {
    modules: {
      title: "5 Labs. Complete Mastery.",
      description:
        "Learn prompt engineering step-by-step. From basic instructions to advanced techniques—write better prompts, get better results.",
    },
    proof: {
      title: "2 Hours. Zero to Expert.",
      description: "Middle school students master AI communication through interactive practice. No coding required.",
    },
    pricing: {
      title: "Start Learning Free",
      description: "All 5 labs are completely free. No hidden costs, no credit card needed.",
      badge: "100% Free",
    },
    faq: {
      title: "Common Questions",
      description: "Everything you need to know about LLM Learning Lab",
    },
    finalCta: {
      title: "Ready to Master AI?",
      description:
        "Join students learning to communicate with AI like pros. Start your free journey today.",
    },
  },
  orientation: {
    welcome: {
      title: "Welcome Video",
      description: "Watch this 3-minute introduction to prompt engineering",
      ctaText: "Play Video",
      infoText:
        "Learn what prompt engineering is, why it matters, and how you'll master it through hands-on practice.",
    },
    checklist: {
      title: "Setup Checklist",
      description: "Complete these steps to get ready for the labs",
    },
    journey: {
      title: "Your Learning Journey",
      description: "Here's what you'll master in the next 2 hours",
    },
    nextSteps: {
      title: "Ready to Start?",
      descriptionComplete:
        "Great! You've completed the setup. Let's dive into Lab 1: What is a Prompt?",
      descriptionIncomplete: "Complete the checklist above to unlock the labs",
      ctaText: "Start Lab 1",
    },
  },
  lab: {
    objectiveLabel: "Learning Goal:",
    startText: "Start Lab",
    reviewText: "Review",
    completeText: "Mark Complete",
  },
  footer: {
    copyright: "© 2025 LLM Learning Lab. All rights reserved.",
  },
} as const

// Video Configuration
export const VIDEO_CONFIG = {
  orientation: {
    url: "", // To be configured
    title: "Welcome to LLM Learning Lab",
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
