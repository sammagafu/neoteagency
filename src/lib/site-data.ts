export const COMPANY_PROFILE_URL = "/neotelabs-company-profile.pdf";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const contactInfo = {
  email: "info@neotelabs.com",
  phone: "+255 755 339 901",
  location: "Dar es Salaam, Tanzania",
} as const;

export const teamDepartments = [
  "All",
  "Leadership",
  "Creative",
  "Strategy",
  "Technology",
  "Content",
] as const;

export type TeamDepartment = (typeof teamDepartments)[number];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: Exclude<TeamDepartment, "All">;
  bio: string;
  image?: string;
};

export const teamMembers: readonly TeamMember[] = [
  {
    id: "managing-director",
    name: "",
    role: "Managing Director",
    department: "Leadership",
    bio: "Sets the agency's strategic direction and ensures every client partnership is built for long-term growth and measurable impact.",
  },
  {
    id: "operations-director",
    name: "",
    role: "Operations Director",
    department: "Leadership",
    bio: "Oversees project delivery, resource planning, and client operations — keeping teams aligned and timelines on track.",
  },
  {
    id: "creative-director",
    name: "",
    role: "Creative Director",
    department: "Creative",
    bio: "Leads brand identity, visual design, and creative direction across campaigns, packaging, and digital experiences.",
  },
  {
    id: "senior-designer",
    name: "",
    role: "Senior Designer",
    department: "Creative",
    bio: "Transforms strategy into compelling visuals — from UI/UX and print to environmental branding and campaign assets.",
  },
  {
    id: "strategy-director",
    name: "",
    role: "Strategy Director",
    department: "Strategy",
    bio: "Drives market research, brand positioning, and campaign architecture grounded in consumer insight and business goals.",
  },
  {
    id: "account-manager",
    name: "",
    role: "Account Manager",
    department: "Strategy",
    bio: "Acts as the primary client liaison — coordinating briefs, feedback, and delivery across every phase of a project.",
  },
  {
    id: "technology-lead",
    name: "",
    role: "Technology Lead",
    department: "Technology",
    bio: "Architects and builds websites, applications, and digital infrastructure that are fast, secure, and built to scale.",
  },
  {
    id: "content-lead",
    name: "",
    role: "Content & Production Lead",
    department: "Content",
    bio: "Heads video production, photography, and content strategy — crafting stories that connect brands with their audiences.",
  },
];

export const teamValues = [
  {
    title: "Collaboration",
    description:
      "We work as one team — internally and with our clients — because the best results come from shared ownership.",
  },
  {
    title: "Excellence",
    description:
      "Every deliverable reflects our commitment to craft, detail, and standards that exceed expectations.",
  },
  {
    title: "Impact",
    description:
      "We measure success by the outcomes we create — sales, reach, engagement, and brand growth.",
  },
  {
    title: "Integrity",
    description:
      "Transparent communication, honest counsel, and relationships built on trust.",
  },
] as const;

export const teamStats = [
  { value: "8", label: "Specialists across disciplines" },
  { value: "5", label: "Integrated service areas" },
  { value: "6+", label: "Active brand partnerships" },
] as const;

export type CareerPosition = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
};

export const careerBenefits = [
  {
    title: "Creative environment",
    description:
      "Work on diverse brands and campaigns across strategy, design, technology, and content.",
  },
  {
    title: "Growth & learning",
    description:
      "Develop your skills on real client projects with mentorship from experienced leads.",
  },
  {
    title: "Collaborative culture",
    description:
      "Join a team that values ideas, ownership, and doing great work together.",
  },
  {
    title: "Impact-driven work",
    description:
      "See the results of your work — from brand launches to campaigns that move markets.",
  },
] as const;

export const careerPositions: readonly CareerPosition[] = [
  {
    id: "senior-designer",
    title: "Senior Designer",
    department: "Creative",
    type: "Full-time",
    location: "Dar es Salaam",
    summary:
      "Create compelling brand identities, campaign visuals, and digital experiences for leading Tanzanian and regional brands.",
    responsibilities: [
      "Lead visual design across branding, packaging, and digital projects",
      "Develop concepts and present creative directions to clients",
      "Collaborate with strategy and account teams from brief to delivery",
      "Maintain quality standards and brand consistency across all outputs",
    ],
    requirements: [
      "3+ years of experience in graphic or brand design",
      "Strong portfolio demonstrating identity and campaign work",
      "Proficiency in Adobe Creative Suite and Figma",
      "Ability to manage multiple projects and deadlines",
    ],
  },
  {
    id: "account-manager",
    title: "Account Manager",
    department: "Strategy",
    type: "Full-time",
    location: "Dar es Salaam",
    summary:
      "Be the bridge between clients and our team — ensuring clear communication, smooth delivery, and lasting partnerships.",
    responsibilities: [
      "Serve as primary point of contact for assigned client accounts",
      "Coordinate briefs, timelines, and feedback across internal teams",
      "Prepare status updates and contribute to strategic recommendations",
      "Identify opportunities to expand client relationships",
    ],
    requirements: [
      "2+ years in account management, client services, or marketing",
      "Excellent communication and organisational skills",
      "Experience working with creative or digital agencies preferred",
      "Comfort managing multiple accounts simultaneously",
    ],
  },
  {
    id: "content-producer",
    title: "Content Producer",
    department: "Content",
    type: "Full-time",
    location: "Dar es Salaam",
    summary:
      "Produce video, photography, and social content that helps brands connect with audiences and drive engagement.",
    responsibilities: [
      "Plan and execute video and photo shoots for client campaigns",
      "Edit and deliver content optimised for digital and social platforms",
      "Collaborate with creative and strategy teams on content concepts",
      "Maintain equipment and production workflows",
    ],
    requirements: [
      "2+ years in video production, photography, or content creation",
      "Proficiency in editing software (Premiere Pro, DaVinci, or similar)",
      "Strong eye for visual storytelling and brand-aligned content",
      "Portfolio of commercial or campaign work",
    ],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Technology",
    type: "Full-time",
    location: "Dar es Salaam / Hybrid",
    summary:
      "Build fast, responsive websites and web applications that bring brand experiences to life on screen.",
    responsibilities: [
      "Develop responsive websites and web interfaces from design files",
      "Collaborate with designers and backend developers on digital products",
      "Optimise performance, accessibility, and cross-browser compatibility",
      "Maintain and update client websites post-launch",
    ],
    requirements: [
      "2+ years of frontend development experience",
      "Strong HTML, CSS, JavaScript/TypeScript skills",
      "Experience with React or similar modern frameworks",
      "Attention to detail and passion for clean, performant code",
    ],
  },
];

export const clients = [
  "Safaya Gin",
  "Supa Fleva",
  "Simba Sports Club",
  "Amazon Paints",
  "UAP Insurance",
  "SBC Tanzania",
] as const;

export const stats = [
  { value: "200K+", label: "Cartons sold in one launch" },
  { value: "6+", label: "Brands across Tanzania" },
  { value: "5", label: "Disciplines, one team" },
] as const;

export const services = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy & Research",
    tagline:
      "Insight-driven planning that builds the foundation for every decision.",
    intro:
      "Before creative work begins, we invest in understanding your market, audience, and competitive landscape. Our research-led approach ensures every campaign, product, and brand move is grounded in real insight — not assumptions.",
    iconImage: "/assets/icons/incubate.png",
    deliverables: [
      {
        title: "Market research & analysis",
        description:
          "Competitive audits, trend analysis, and market sizing tailored to your category.",
      },
      {
        title: "Consumer insights",
        description:
          "Audience profiling, behaviour mapping, and purchase journey analysis.",
      },
      {
        title: "Brand positioning",
        description:
          "Clear differentiation, messaging frameworks, and value propositions.",
      },
      {
        title: "Marketing strategy",
        description:
          "Channel plans, campaign architecture, and measurable growth roadmaps.",
      },
    ],
    outcome:
      "A strategic foundation your team can act on — with clarity on who you serve, how you win, and where to invest.",
    relatedProjects: ["safaya-gin", "supa-fleva-sbc-tanzania"],
  },
  {
    id: "branding",
    number: "02",
    title: "Branding & Design",
    tagline:
      "Visual identities and experiences that make your brand impossible to ignore.",
    intro:
      "From identity systems to packaging and environmental design, we craft brand experiences that resonate across every touchpoint — building recognition, trust, and preference in competitive markets.",
    iconImage: "/assets/icons/customize.png",
    deliverables: [
      {
        title: "Brand identity & visuals",
        description:
          "Logos, colour systems, typography, and guidelines that scale with your business.",
      },
      {
        title: "Packaging design",
        description:
          "Shelf-ready packaging that stands out and connects with local consumers.",
      },
      {
        title: "UI/UX design",
        description:
          "Intuitive digital interfaces designed for engagement and conversion.",
      },
      {
        title: "Environmental branding",
        description:
          "Office, retail, and event spaces that express your brand physically.",
      },
    ],
    outcome:
      "A cohesive brand presence — from digital screens to physical spaces — that looks as strong as your ambition.",
    relatedProjects: [
      "supa-fleva-sbc-tanzania",
      "simba-sports-club",
      "uap-insurance",
    ],
  },
  {
    id: "technology",
    number: "03",
    title: "Technology & Development",
    tagline:
      "Digital products and platforms built for performance, security, and scale.",
    intro:
      "We design and build websites, applications, and digital infrastructure that perform under real-world conditions. From launch to long-term maintenance, our technical team keeps your digital presence fast, secure, and reliable.",
    iconImage: "/assets/icons/development.png",
    deliverables: [
      {
        title: "Website & app development",
        description:
          "Responsive websites and custom applications engineered for your goals.",
      },
      {
        title: "Cloud infrastructure",
        description:
          "Scalable hosting, deployment pipelines, and performance optimisation.",
      },
      {
        title: "Cybersecurity",
        description:
          "Security audits, hardening, and best-practice protection for your assets.",
      },
      {
        title: "Support & maintenance",
        description:
          "Ongoing technical care, updates, and monitoring after launch.",
      },
    ],
    outcome:
      "Digital products that work as hard as your team — reliable, fast, and ready to grow with demand.",
    relatedProjects: [],
  },
  {
    id: "content",
    number: "04",
    title: "Content Creation",
    tagline:
      "Stories, visuals, and media that connect with audiences and drive action.",
    intro:
      "Great products deserve great storytelling. We produce video, photography, animation, and written content that captures attention, communicates value, and moves people to act — across social, digital, and traditional channels.",
    iconImage: "/assets/icons/build.png",
    deliverables: [
      {
        title: "Video production",
        description:
          "Commercials, brand films, social content, and event coverage.",
      },
      {
        title: "Animation & editing",
        description:
          "Motion graphics, post-production, and platform-ready formats.",
      },
      {
        title: "Content strategy",
        description:
          "Editorial calendars, channel planning, and audience-first messaging.",
      },
      {
        title: "Digital storytelling",
        description:
          "Campaign narratives that tie creative assets into a unified story.",
      },
    ],
    outcome:
      "A content engine that keeps your brand visible, relevant, and engaging across every channel.",
    relatedProjects: ["amazon-paints", "safaya-gin"],
  },
  {
    id: "events",
    number: "05",
    title: "Events & Public Relations",
    tagline:
      "Experiences and communications that build reputation and lasting connections.",
    intro:
      "Whether launching a product, hosting stakeholders, or managing media relations, we design events and PR programmes that create impact — strengthening your brand's presence in the market and in the minds of your audience.",
    iconImage: "/assets/icons/incubate.png",
    deliverables: [
      {
        title: "Event management",
        description:
          "End-to-end planning, production, and on-site execution.",
      },
      {
        title: "Media relations",
        description:
          "Press outreach, journalist relationships, and coverage strategy.",
      },
      {
        title: "Press & communications",
        description:
          "Press releases, statements, and corporate communications.",
      },
      {
        title: "Reputation management",
        description:
          "Crisis preparedness, brand monitoring, and stakeholder messaging.",
      },
    ],
    outcome:
      "Memorable moments and credible visibility — turning events and media into long-term brand equity.",
    relatedProjects: ["safaya-gin"],
  },
] as const;

export type Service = (typeof services)[number];

export const homeServices = services.map((service) => ({
  id: service.id,
  title: service.title,
  description: service.tagline,
  icon: service.id,
  iconImage: service.iconImage,
  number: service.number,
}));

export const servicePillars = [
  {
    title: "Research-led",
    description:
      "Every engagement starts with understanding — your market, audience, and goals come first.",
  },
  {
    title: "Creative craft",
    description:
      "Strategy without execution falls flat. We bring ideas to life with design and production excellence.",
  },
  {
    title: "Measurable impact",
    description:
      "We track what matters and optimise continuously so your investment delivers real returns.",
  },
] as const;

export const whyChooseUs = [
  "Strategic thinking backed by research",
  "Creative solutions that stand out",
  "Data-driven execution",
  "Proven results — including 200K+ units sold in 30 days",
] as const;

export const featuredProject = {
  slug: "safaya-gin",
  client: "Safaya Gin",
  category: "Featured Project",
  headline: "From unknown to market success",
  description:
    "We executed a strategic campaign that introduced Safaya Gin to urban consumers — delivering over 200,000 cartons sold within one month.",
  metric: "200K+",
  metricLabel: "Cartons sold",
  image: "/assets/portfolio/work-3.png",
  gradient: "from-black via-zinc-950 to-black",
} as const;
export type ProjectOutcome = {
  value: string;
  label: string;
};

export const portfolioItems = [
  {
    slug: "supa-fleva-sbc-tanzania",
    client: "Supa Fleva – SBC Tanzania",
    description:
      "We redesigned the product label using modern visuals and cultural relevance, improving brand visibility and market appeal.",
    category: "Branding & Design",
    image: "/assets/portfolio/work-1.png",
    gradient: "from-black to-zinc-900",
    year: "2024",
    challenge:
      "Supa Fleva needed a label refresh that would stand out on shelf while resonating with Tanzanian consumers.",
    approach:
      "We combined modern design principles with culturally relevant visuals to create packaging that feels both contemporary and familiar.",
    results: [
      "Improved brand visibility across retail channels",
      "Stronger shelf presence and market appeal",
      "Packaging aligned with SBC Tanzania brand standards",
    ],
    outcomes: [
      { value: "15K+", label: "Retail outlets reached" },
      { value: "3x", label: "Shelf visibility" },
      { value: "8", label: "SKU variants updated" },
    ],
    services: ["Branding & Design", "Packaging Design"],
    gallery: [
      "/assets/portfolio/work-1.png",
      "/assets/portfolio/work-3.png",
    ],
  },
  {
    slug: "simba-sports-club",
    client: "Simba Sports Club",
    description:
      "We developed a modern annual report combining clean layouts, strong branding, and engaging infographics.",
    category: "Branding & Design",
    image: "/assets/portfolio/work-2.png",
    gradient: "from-zinc-950 to-black",
    year: "2024",
    challenge:
      "Simba Sports Club required an annual report that communicated performance and pride to stakeholders with clarity and impact.",
    approach:
      "We designed a modern publication with clean layouts, strong club branding, and infographics that make complex information easy to digest.",
    results: [
      "Professional stakeholder-ready annual report",
      "Clear visual storytelling of club achievements",
      "Cohesive brand expression across all sections",
    ],
    outcomes: [
      { value: "5K+", label: "Reports distributed" },
      { value: "120+", label: "Pages designed" },
      { value: "50K+", label: "Stakeholders reached" },
    ],
    services: ["Branding & Design", "Print Design"],
    gallery: [
      "/assets/portfolio/work-2.png",
      "/assets/portfolio/work-4.png",
    ],
  },
  {
    slug: "amazon-paints",
    client: "Amazon Paints",
    description:
      "We produced high-quality video and photo content that increased engagement and strengthened brand visibility across digital platforms.",
    category: "Content Creation",
    image: "/assets/portfolio/work-4.png",
    gradient: "from-black to-neutral-900",
    year: "2023",
    challenge:
      "Amazon Paints needed compelling visual content to drive engagement and strengthen their presence across digital platforms.",
    approach:
      "We produced high-quality video and photography tailored for social and digital channels, aligned with the brand's visual identity.",
    results: [
      "Increased engagement across digital platforms",
      "Strengthened brand visibility online",
      "Consistent visual content library for marketing",
    ],
    outcomes: [
      { value: "2M+", label: "Content impressions" },
      { value: "3x", label: "Social engagement" },
      { value: "50+", label: "Assets produced" },
    ],
    services: ["Content Creation", "Video Production"],
    gallery: [
      "/assets/portfolio/work-4.png",
      "/assets/portfolio/work-5.png",
    ],
  },
  {
    slug: "uap-insurance",
    client: "UAP Insurance",
    description:
      "We delivered a complete office branding solution, creating a cohesive and professional environment aligned with their brand identity.",
    category: "Branding & Design",
    image: "/assets/portfolio/work-5.png",
    gradient: "from-neutral-950 to-black",
    year: "2023",
    challenge:
      "UAP Insurance needed their office environment to reflect a cohesive, professional brand identity across every touchpoint.",
    approach:
      "We delivered a complete office branding solution — from signage to environmental graphics — aligned with UAP's corporate identity.",
    results: [
      "Cohesive professional office environment",
      "Brand consistency across physical spaces",
      "Enhanced client and employee brand experience",
    ],
    outcomes: [
      { value: "12", label: "Branded office zones" },
      { value: "500+", label: "Daily visitors" },
      { value: "100%", label: "Brand compliance" },
    ],
    services: ["Branding & Design", "Environmental Branding"],
    gallery: [
      "/assets/portfolio/work-5.png",
      "/assets/portfolio/work-6.png",
    ],
  },
  {
    slug: "safaya-gin",
    client: "Safaya Gin",
    description:
      "We executed a strategic campaign that introduced Safaya Gin to urban consumers — delivering over 200,000 cartons sold within one month.",
    category: "Brand Launch",
    image: "/assets/project/content-image-4.png",
    gradient: "from-black via-zinc-950 to-black",
    year: "2024",
    challenge:
      "Safaya Gin was an unknown brand entering a competitive urban spirits market with no established consumer base.",
    approach:
      "We executed a strategic launch campaign combining brand positioning, creative execution, and data-driven media placement to reach urban consumers.",
    results: [
      "200,000+ cartons sold within one month",
      "Successful introduction to urban consumers",
      "Measurable market penetration from launch",
    ],
    outcomes: [
      { value: "200K+", label: "Cartons sold" },
      { value: "1M+", label: "People reached" },
      { value: "30", label: "Days to milestone" },
    ],
    services: ["Strategy & Research", "Branding & Design", "Content Creation", "Events & PR"],
    gallery: [
      "/assets/project/content-image-4.png",
      "/assets/portfolio/work-3.png",
      "/assets/portfolio/work-6.png",
    ],
  },
] as const;

export type PortfolioItem = (typeof portfolioItems)[number];

export function getProjectBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = portfolioItems.findIndex((item) => item.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? portfolioItems[index - 1] : null,
    next: index < portfolioItems.length - 1 ? portfolioItems[index + 1] : null,
  };
}

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    tagline: "We listen before we lead.",
    description:
      "Every project begins with a deep dive into your brand, audience, competitors, and business objectives. We align on goals, constraints, and success metrics before any creative work starts.",
    duration: "1–2 weeks",
    activities: [
      "Kickoff workshop with key stakeholders",
      "Brand and competitor audit",
      "Audience and market research",
      "Goal alignment and success metrics",
    ],
    deliverables: [
      "Project brief and scope document",
      "Research and insights summary",
      "Agreed timeline and milestones",
    ],
  },
  {
    step: "02",
    title: "Strategy",
    tagline: "Insight becomes a clear plan.",
    description:
      "We translate research into an actionable roadmap — defining positioning, messaging, channels, and creative direction so every team member knows exactly where we're headed.",
    duration: "2–3 weeks",
    activities: [
      "Brand positioning and messaging framework",
      "Channel and media strategy",
      "Creative direction and moodboarding",
      "Project roadmap and resource planning",
    ],
    deliverables: [
      "Strategic plan and creative brief",
      "Brand positioning document",
      "Campaign or product architecture",
    ],
  },
  {
    step: "03",
    title: "Execution",
    tagline: "Ideas become reality.",
    description:
      "Our multidisciplinary team brings the strategy to life — design, development, content production, and campaign rollout executed with precision and regular check-ins.",
    duration: "Project-dependent",
    activities: [
      "Creative production and design sprints",
      "Development and technical build",
      "Content creation and media production",
      "Campaign rollout and asset delivery",
    ],
    deliverables: [
      "Brand assets and design files",
      "Digital products or campaign materials",
      "Content library and launch toolkit",
    ],
  },
  {
    step: "04",
    title: "Optimisation",
    tagline: "Data drives better decisions.",
    description:
      "Launch is not the finish line. We monitor performance, analyse results, and refine campaigns and products based on real data — improving what works and fixing what doesn't.",
    duration: "Ongoing",
    activities: [
      "Analytics setup and performance tracking",
      "A/B testing and audience feedback",
      "Monthly reporting and insights review",
      "Iterative improvements to assets and campaigns",
    ],
    deliverables: [
      "Performance reports and dashboards",
      "Optimisation recommendations",
      "Updated creative and campaign assets",
    ],
  },
  {
    step: "05",
    title: "Growth",
    tagline: "Scale what works.",
    description:
      "With proven results in hand, we help you expand reach, enter new markets, and build long-term momentum — through retainers, strategic reviews, and scaled campaigns.",
    duration: "Long-term partnership",
    activities: [
      "Growth planning and market expansion",
      "Retainer support and ongoing creative",
      "Quarterly strategic reviews",
      "New initiative scoping and launch",
    ],
    deliverables: [
      "Growth roadmap and expansion plan",
      "Scaled campaigns and content pipelines",
      "Quarterly performance reviews",
    ],
  },
] as const;

export type ProcessStep = (typeof processSteps)[number];

export const processPrinciples = [
  {
    title: "Collaborative",
    description:
      "You're involved at every stage. We work as an extension of your team, not a black box.",
  },
  {
    title: "Transparent",
    description:
      "Clear timelines, regular updates, and honest communication — no surprises.",
  },
  {
    title: "Agile",
    description:
      "We adapt as priorities shift, keeping momentum without losing strategic direction.",
  },
  {
    title: "Results-focused",
    description:
      "Every phase is measured against the goals we set together in Discovery.",
  },
] as const;

export const approachSteps = [
  "Deep research and discovery",
  "Strategic planning",
  "Creative execution",
  "Continuous optimisation",
  "Measurable growth",
] as const;
