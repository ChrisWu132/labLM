// App-wide constants and configuration

// Lab Configuration (5 Progressive LLM Experiment Labs)
export const LABS = [
  {
    number: 1,
    title: "AI Basics",
    path: "/dashboard/vibecoding?lab=1",
    description: "Experiment with prompts and responses. Discover how LLMs understand instructions and what makes a good prompt.",
    duration: "15 min",
    icon: "compass",
    difficulty: "Beginner",
    concepts: ["Prompts & Responses", "AI Understanding", "Basic Interaction"],
  },
  {
    number: 2,
    title: "AI Hallucinations",
    path: "/dashboard/vibecoding?lab=2",
    description: "Discover when AI makes things up! Experiment with hallucinations and learn how to spot fake information.",
    duration: "20 min",
    icon: "code",
    difficulty: "Beginner",
    concepts: ["Hallucinations", "Fact-Checking", "AI Limitations"],
  },
  {
    number: 3,
    title: "Role & Personality",
    path: "/dashboard/vibecoding?lab=3",
    description: "Make AI act like different characters. Explore how roles and tone change AI's behavior and responses.",
    duration: "20 min",
    icon: "award",
    difficulty: "Intermediate",
    concepts: ["Roles & Characters", "Personality", "Response Style"],
  },
  {
    number: 4,
    title: "AI Reasoning",
    path: "/dashboard/vibecoding?lab=4",
    description: "Guide AI to think step-by-step. Experiment with chain-of-thought and see how AI solves complex problems.",
    duration: "25 min",
    icon: "code",
    difficulty: "Intermediate",
    concepts: ["Step-by-Step Thinking", "Problem Solving", "AI Logic"],
  },
  {
    number: 5,
    title: "Bias & Ethics",
    path: "/dashboard/vibecoding?lab=5",
    description: "Explore AI biases and ethical concerns. Experiment with fairness and discover what AI should and shouldn't do.",
    duration: "30 min",
    icon: "award",
    difficulty: "Advanced",
    concepts: ["AI Bias", "Ethics", "Responsible AI"],
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
    title: "AI Basics",
    description:
      "Experiment with prompts and responses. Discover how LLMs understand instructions and generate text.",
  },
  {
    step: 2,
    title: "Hallucinations & Limits",
    description: "Discover when AI makes things up! Learn to spot fake information and understand AI's limitations.",
  },
  {
    step: 3,
    title: "Roles & Reasoning",
    description: "Explore how AI takes on different personalities and thinks step-by-step through problems.",
  },
  {
    step: 4,
    title: "Bias & Ethics",
    description: "Investigate AI biases and ethical concerns. Learn what AI should and shouldn't do.",
  },
  {
    step: 5,
    title: "Responsible AI Use",
    description: "Apply what you've learned to use AI safely and responsibly in real situations.",
  },
] as const

// FAQs
export const FAQS = [
  {
    question: "Who is this for?",
    answer:
      "LLM Learning Lab is designed for elementary and middle school students (grades 5-9). If you're curious about how AI works and want to experiment, this is for you! No coding or tech background needed.",
  },
  {
    question: "How long does it take?",
    answer:
      "All 5 experimental labs take about 2 hours total. Each lab is 15-30 minutes. You can pause anytime and continue later—your progress is automatically saved!",
  },
  {
    question: "What will I learn?",
    answer:
      "You'll discover how LLMs really work through hands-on experiments! Learn about hallucinations (when AI makes things up), biases, reasoning, and how to spot AI's mistakes. Understand what AI can and can't do.",
  },
  {
    question: "Why learn about AI hallucinations?",
    answer:
      "Understanding AI's limitations is just as important as knowing its capabilities! You'll learn to spot when AI is guessing or making up information, which is crucial for using AI safely and responsibly.",
  },
  {
    question: "Is this safe for kids?",
    answer:
      "Yes! All content is age-appropriate and educational. We teach critical thinking about AI, including its limitations and ethical concerns. Students learn to use AI responsibly and question its outputs.",
  },
  {
    question: "What makes this different from other AI courses?",
    answer:
      "We focus on understanding HOW LLMs work, not just HOW TO USE them. Through experiments, students discover AI behaviors like hallucinations, biases, and reasoning patterns. It's science education for the AI age!",
  },
] as const

// Proof Points
export const PROOF_POINTS = [
  { stat: "5 Experiments", label: "Hands-On Labs" },
  { stat: "Grades 5-9", label: "Perfect For" },
  { stat: "2 Hours", label: "Complete Course" },
  { stat: "Zero Coding", label: "Required" },
] as const

// Pricing Configuration
export const PRICING = {
  price: 0,
  currency: "$",
  period: "free",
  description: "All 5 experimental labs are completely free. Start exploring AI today!",
  features: [
    "5 hands-on experiments (2 hours total)",
    "Explore AI hallucinations & limitations",
    "Discover bias & ethical concerns",
    "Learn how AI reasons & thinks",
    "Real-time AI interactions",
    "Progress tracking & achievements",
    "AI coach for guidance",
    "Perfect for grades 5-9",
  ],
  guarantee: "100% free. No credit card required.",
} as const

// Sample Learning Outcomes
export const SAMPLE_PROJECTS = [
  {
    title: "Discover AI Behaviors",
    description: "Experiment with prompts and responses. Learn about hallucinations, when AI makes mistakes, and how to spot fake information.",
    gradient: "from-primary/20 to-teal/20",
  },
  {
    title: "Understand AI Reasoning",
    description: "See how AI thinks step-by-step. Explore different personalities, roles, and how context changes AI's behavior.",
    gradient: "from-teal/20 to-amber/20",
  },
  {
    title: "Explore Ethics & Bias",
    description: "Investigate AI biases and ethical concerns. Learn what AI should and shouldn't do, and how to use it responsibly.",
    gradient: "from-amber/20 to-primary/20",
  },
] as const

// Copy Text
export const COPY = {
  app: {
    name: "LLM Learning Lab",
    tagline: "Hands-on experiments to understand how AI really works",
  },
  hero: {
    badge: "For Elementary & Middle School Students",
    headline: "Discover How AI Thinks.",
    subheadline: "Experiment. Learn. Understand.",
    description:
      "Hands-on experiments to explore LLM behaviors—prompts, responses, hallucinations, and more. Designed for grades 5-9. No coding required.",
  },
  cta: {
    primary: "Start Learning Free",
    secondary: "Begin Your Journey",
    view: "View Labs",
    enroll: "Start Lab 1",
  },
  sections: {
    modules: {
      title: "5 Experiments. Real Understanding.",
      description:
        "Discover how LLMs work through hands-on experiments. Explore prompts, hallucinations, biases, and AI reasoning step-by-step.",
    },
    proof: {
      title: "Learn By Experimenting.",
      description: "Elementary and middle school students explore AI behaviors through interactive experiments. See what AI can and can't do.",
    },
    pricing: {
      title: "Free For All Students",
      description: "All 5 experimental labs are completely free. Educational access for everyone.",
      badge: "100% Free",
    },
    faq: {
      title: "Common Questions",
      description: "Everything you need to know about LLM Learning Lab",
    },
    finalCta: {
      title: "Ready to Explore AI?",
      description:
        "Join students discovering how LLMs really work through hands-on experiments. Start free today.",
    },
  },
  orientation: {
    welcome: {
      title: "Welcome Video",
      description: "Watch this 3-minute introduction to LLM experiments",
      ctaText: "Play Video",
      infoText:
        "Discover how you'll explore AI through hands-on experiments. Learn about hallucinations, biases, and how AI really works!",
    },
    checklist: {
      title: "Setup Checklist",
      description: "Complete these steps to get ready for your experiments",
    },
    journey: {
      title: "Your Experiment Journey",
      description: "Here's what you'll discover in the next 2 hours",
    },
    nextSteps: {
      title: "Ready to Experiment?",
      descriptionComplete:
        "Great! You've completed the setup. Let's start Experiment 1: AI Basics!",
      descriptionIncomplete: "Complete the checklist above to unlock the experiments",
      ctaText: "Start Experiment 1",
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
