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

// FAQs (For Educators & Administrators)
export const FAQS = [
  {
    question: "How does this fit into our existing curriculum?",
    answer:
      "LLM Learning Lab integrates seamlessly into STEM, Computer Science, or Digital Literacy courses. The 5-lab curriculum (2 hours total) can be delivered as a standalone unit, integrated across multiple class periods, or offered as an enrichment program. It aligns with ISTE and CSTA standards for K-12 education.",
  },
  {
    question: "What teacher training is required?",
    answer:
      "Teachers complete a 2-hour online professional development program covering curriculum objectives, platform features, and teaching strategies. No prior AI knowledge required! We provide detailed lesson plans, answer keys, and ongoing support through our educator community and monthly live Q&A sessions.",
  },
  {
    question: "What are the technical requirements?",
    answer:
      "Students need only a web browser and internet connection—no software installation required. The platform works on Chromebooks, tablets, laptops, and desktops. Minimum bandwidth: 1 Mbps per student. We support Chrome, Firefox, Safari, and Edge browsers.",
  },
  {
    question: "How do you ensure age-appropriate content?",
    answer:
      "All AI responses go through content moderation filters. Exercises are designed to avoid sensitive topics. Teachers have full visibility into student interactions and can review all content. We comply with COPPA and FERPA regulations for student data privacy.",
  },
  {
    question: "Can we try it before committing?",
    answer:
      "Absolutely! Our free Pilot program allows up to 30 students to access the full curriculum with no credit card required. Run a pilot cohort, gather feedback from teachers and students, then decide on scaling. Many schools pilot with one class before district-wide deployment.",
  },
  {
    question: "What support do you provide?",
    answer:
      "We offer comprehensive support: teacher onboarding, detailed implementation guides, email/chat support, educator community forum, monthly live Q&A sessions, and regular curriculum updates. School and District plans include priority support and dedicated account management.",
  },
] as const

// Proof Points (ToB Metrics)
export const PROOF_POINTS = [
  { stat: "2 Hours", label: "Implementation Time" },
  { stat: "Grades 5-9", label: "Target Age Group" },
  { stat: "5 Labs", label: "Complete Curriculum" },
  { stat: "Standards-Aligned", label: "Educational Framework" },
] as const

// Why AI Literacy Matters
export const WHY_AI_LITERACY = [
  {
    title: "Critical Thinking in the AI Age",
    description: "Students learn to question AI outputs, spot hallucinations, and verify information—essential skills for navigating an AI-powered world.",
  },
  {
    title: "Future-Ready Workforce",
    description: "Understanding AI fundamentals prepares students for careers in a technology-driven economy, regardless of their chosen field.",
  },
  {
    title: "Responsible Digital Citizens",
    description: "Students explore AI ethics, bias, and limitations, learning to use technology responsibly and ethically.",
  },
] as const

// Educator Benefits
export const EDUCATOR_BENEFITS = [
  {
    title: "Turn-Key Curriculum",
    description: "Complete lesson plans, activities, and assessments ready to deploy in your classroom.",
    features: [
      "5 structured 110-minute labs",
      "Detailed teacher guides with talking points",
      "Assessment rubrics and success criteria",
      "Alignment to educational standards",
    ],
  },
  {
    title: "Classroom Management Tools",
    description: "Monitor student progress, track engagement, and provide targeted support.",
    features: [
      "Real-time student progress dashboard",
      "Individual and class-wide analytics",
      "Identify students needing help",
      "Export progress reports",
    ],
  },
  {
    title: "Professional Development",
    description: "Comprehensive training and ongoing support to teach AI literacy with confidence.",
    features: [
      "2-hour teacher onboarding program",
      "Video tutorials and teaching tips",
      "Community forum for educators",
      "Monthly live Q&A sessions",
    ],
  },
  {
    title: "Flexible Implementation",
    description: "Adapt the curriculum to your schedule and teaching style.",
    features: [
      "Self-paced or instructor-led options",
      "Integrate into existing STEM/CS courses",
      "After-school program ready",
      "Homework or in-class activities",
    ],
  },
] as const

// Implementation Steps
export const IMPLEMENTATION_STEPS = [
  {
    step: 1,
    title: "Request Demo & Consultation",
    description: "Schedule a personalized demo to see how LLM Learning Lab fits your school's needs. Our team will help you plan implementation.",
    duration: "30 minutes",
  },
  {
    step: 2,
    title: "Teacher Onboarding",
    description: "Educators complete a 2-hour professional development program covering curriculum, platform features, and best practices.",
    duration: "2 hours",
  },
  {
    step: 3,
    title: "Pilot Program (Optional)",
    description: "Start with a small cohort to test the curriculum, gather feedback, and refine your approach before full rollout.",
    duration: "2-4 weeks",
  },
  {
    step: 4,
    title: "Full Deployment",
    description: "Roll out to all students with ongoing support. Access live support, community forums, and regular updates.",
    duration: "Ongoing",
  },
] as const

// Pricing Tiers
export const PRICING = {
  tiers: [
    {
      name: "Pilot",
      price: "Free",
      period: "",
      description: "Perfect for trying out the curriculum with a small group",
      features: [
        "Up to 30 students",
        "Full curriculum access (5 labs)",
        "Basic progress tracking",
        "Email support",
        "Community access",
      ],
      cta: "Start Pilot Program",
      highlighted: false,
    },
    {
      name: "School",
      price: "$499",
      period: "year",
      description: "Comprehensive solution for individual schools",
      features: [
        "Up to 300 students",
        "Advanced analytics dashboard",
        "Teacher professional development",
        "Priority email & chat support",
        "Customizable progress reports",
        "Integration with LMS (Canvas, Google Classroom)",
      ],
      cta: "Request Quote",
      highlighted: true,
    },
    {
      name: "District",
      price: "Custom",
      period: "",
      description: "Scalable solution for school districts and educational organizations",
      features: [
        "Unlimited students",
        "District-wide analytics",
        "On-site teacher training",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options available",
        "SLA with 24/7 support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ],
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
    tagline: "AI literacy curriculum for K-12 education",
  },
  hero: {
    badge: "Turn-Key AI Literacy Curriculum",
    headline: "Prepare Students for an AI-Powered Future",
    description:
      "A comprehensive, standards-aligned curriculum teaching grades 5-9 students to understand, question, and responsibly use AI through hands-on experiments. Explore hallucinations, biases, ethics, and critical thinking.",
  },
  cta: {
    primary: "Request Demo",
    secondary: "View Curriculum",
    view: "View Labs",
    enroll: "Get Started",
  },
  sections: {
    why: {
      title: "Why AI Literacy Matters Now",
      description:
        "AI is transforming every industry and aspect of life. Students need to understand how it works, where it fails, and how to use it responsibly. Our curriculum builds critical thinking skills for the AI age.",
    },
    curriculum: {
      title: "5-Lab Experimental Curriculum",
      description:
        "Students discover how LLMs work through interactive experiments—exploring prompts, hallucinations, biases, reasoning, and ethics. Each lab builds on the last for comprehensive understanding.",
    },
    educators: {
      title: "Built for Educators, By Educators",
      description:
        "Everything you need to successfully teach AI literacy in your classroom. From lesson plans to professional development, we support you every step of the way.",
    },
    implementation: {
      title: "Simple Implementation Process",
      description:
        "Get started in days, not months. Our streamlined onboarding ensures teachers are confident and students are engaged from day one.",
    },
    pricing: {
      title: "Flexible Pricing for Every School",
      description: "From pilot programs to district-wide deployments, we have a plan that fits your needs and budget.",
      badge: "Free Pilot Available",
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Common questions from educators and administrators",
    },
    finalCta: {
      title: "Ready to Bring AI Literacy to Your School?",
      description:
        "Join forward-thinking educators preparing students for an AI-powered future. Schedule a demo to see LLM Learning Lab in action.",
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
