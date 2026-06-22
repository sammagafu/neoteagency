export const COMPANY_PROFILE_URL = "/neotelabs-company-profile.pdf";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

export const contactInfo = {
  email: "info@neotelabs.com",
  phone: "+255 755 339 901",
  location: "Dar es Salaam, Tanzania",
} as const;

export const homeServices = [
  {
    title: "Strategy & Research",
    description: "Insight-driven planning that builds the foundation for success.",
    icon: "strategy",
  },
  {
    title: "Branding & Design",
    description: "Creating powerful and memorable brand experiences.",
    icon: "design",
  },
  {
    title: "Technology & Development",
    description: "Building scalable and high-performing digital solutions.",
    icon: "technology",
  },
  {
    title: "Content Creation",
    description: "Crafting engaging content that connects and converts.",
    icon: "content",
  },
  {
    title: "Events & Public Relations",
    description: "Delivering experiences that make lasting impressions.",
    icon: "events",
  },
] as const;

export const whyChooseUs = [
  "Strategic thinking backed by research",
  "Creative solutions that stand out",
  "Data-driven execution",
  "Proven, measurable results",
] as const;

export const servicesDetail = [
  {
    id: "strategy",
    title: "Strategy",
    intro: "Insight-driven planning that builds the foundation for success.",
    items: [
      "Market research and analysis",
      "Consumer insights",
      "Brand positioning",
      "Marketing strategy development",
    ],
  },
  {
    id: "branding",
    title: "Branding & Design",
    intro: "Creating powerful and memorable brand experiences.",
    items: [
      "Brand identity and visuals",
      "Packaging design",
      "UI/UX design",
      "Customer experience design",
    ],
  },
  {
    id: "technology",
    title: "Technology",
    intro: "Building scalable and high-performing digital solutions.",
    items: [
      "Website and application development",
      "Cloud computing",
      "Cybersecurity",
      "Technical support and maintenance",
    ],
  },
  {
    id: "content",
    title: "Content Creation",
    intro: "Crafting engaging content that connects and converts.",
    items: [
      "Video production",
      "Animation and editing",
      "Content strategy",
      "Digital storytelling",
    ],
  },
  {
    id: "events",
    title: "Events & PR",
    intro: "Delivering experiences that make lasting impressions.",
    items: [
      "Event management",
      "Media relations",
      "Press releases",
      "Reputation management",
    ],
  },
] as const;

export const portfolioItems = [
  {
    client: "Supa Fleva – SBC Tanzania",
    description:
      "We redesigned the product label using modern visuals and cultural relevance, improving brand visibility and market appeal.",
    category: "Branding & Design",
    gradient: "from-violet-600 to-indigo-800",
  },
  {
    client: "Simba Sports Club",
    description:
      "We developed a modern annual report combining clean layouts, strong branding, and engaging infographics.",
    category: "Branding & Design",
    gradient: "from-red-600 to-rose-900",
  },
  {
    client: "Amazon Paints",
    description:
      "We produced high-quality video and photo content that increased engagement and strengthened brand visibility across digital platforms.",
    category: "Content Creation",
    gradient: "from-amber-500 to-orange-800",
  },
  {
    client: "UAP Insurance",
    description:
      "We delivered a complete office branding solution, creating a cohesive and professional environment aligned with their brand identity.",
    category: "Branding & Design",
    gradient: "from-sky-500 to-blue-900",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your brand, audience, and goals",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Developing a roadmap for success",
  },
  {
    step: "03",
    title: "Execution",
    description: "Turning ideas into reality with precision",
  },
  {
    step: "04",
    title: "Optimisation",
    description: "Improving performance through data",
  },
  {
    step: "05",
    title: "Growth",
    description: "Scaling success for long-term impact",
  },
] as const;

export const approachSteps = [
  "Deep research and discovery",
  "Strategic planning",
  "Creative execution",
  "Continuous optimisation",
  "Measurable growth",
] as const;
