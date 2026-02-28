// ── Central data file for the portfolio ──
// Update content here instead of digging through components.

export const personal = {
  name: "K Harshit",
  role: "CS Undergrad | LLM Security & Adversarial ML",
  summary:
    "Computer Science undergrad at PES University specializing in LLM security and adversarial ML, with hands-on experience building secure backend systems and AI-driven threat detection pipelines. Skilled in designing scalable, high-performance architectures across security-focused AI systems and production-grade backend applications.",
  email: "kappalaharshith@gmail.com",
  phone: "+91-9845198405",
  github: "https://github.com/karash10",
  linkedin: "https://www.linkedin.com/in/k-harshit-109a07284/",
  portfolio: "https://portfolio-self-two-69.vercel.app/",
  location: "Bengaluru, India",
  resumeFile: "/K_Harshit.pdf",
  calLink: "https://cal.com/karash-tgoclq",
} as const;

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "PES University",
    location: "Karnataka, India",
    period: "2023 - 2027",
    cgpa: "8.54",
  },
] as const;

export const experience = [
  {
    title: "Summer Research Intern",
    org: "CCNCS, PES University",
    location: "Karnataka, India",
    period: "June 2025 - July 2025",
    bullets: [
      "Designed XJailGuard, a modular LLM security framework to detect multi-turn and cross-lingual prompt injection attacks in transformer-based models.",
      "Built multilingual classification pipelines using PyTorch and Hugging Face, incorporating sliding-window contextual memory for adversarial intent detection.",
      "Improved jailbreak detection accuracy from 8-12% baseline to 91-93% through layered input/output filtering and zero-trust validation.",
      "Integrated SHAP-based Explainable AI and evaluated performance using false positive/negative rates and latency benchmarks; authored for ICICC 2025 publication.",
    ],
    tags: ["PyTorch", "Hugging Face", "SHAP", "NLP"],
  },
] as const;

export interface Project {
  title: string;
  label: string;
  description: string;
  bullets: string[];
  tech: { name: string; color: "cyan" | "violet" | "emerald" | "neutral" }[];
  github?: string;
}

export const projects: Project[] = [
  // ── AI / ML / Security Research ──
  {
    title: "DCASS",
    label: "AI + Steganography",
    description:
      "Dynamic Context-Aware Semantic Steganography — a research system that encodes covert messages by curating semantically aligned media using multi-modal AI embeddings instead of modifying carrier files.",
    bullets: [
      "Multi-modal embedding pipeline using CLIP, CLAP, and SentenceTransformers for semantic alignment across text, image, and audio.",
      "Reinforcement-learning agent (Stable-Baselines3) for optimal carrier selection with FAISS-powered vector search.",
      "Adversarial robustness evaluation against steganalysis detectors with statistical indistinguishability metrics.",
    ],
    tech: [
      { name: "Python", color: "cyan" },
      { name: "PyTorch", color: "violet" },
      { name: "CLIP/CLAP", color: "violet" },
      { name: "FAISS", color: "emerald" },
      { name: "RL", color: "violet" },
    ],
    github: "https://github.com/karash10/DCASS",
  },
  {
    title: "XJailGuard",
    label: "LLM Security",
    description:
      "Explainable LLM security framework with modular pipeline for input sanitization, intent classification, and output validation against prompt injection attacks.",
    bullets: [
      "Modular pipeline with independently configurable stages for input sanitization, intent classification, and output validation.",
      "Cross-lingual threat detection supporting 10+ languages by fine-tuning multilingual transformer models on adversarial prompt datasets.",
      "SHAP-based token attribution dashboard to visualize flagged prompt regions, reducing manual audit time.",
    ],
    tech: [
      { name: "Python", color: "cyan" },
      { name: "PyTorch", color: "violet" },
      { name: "NLP", color: "violet" },
      { name: "SHAP", color: "emerald" },
    ],
    github: "https://github.com/karash10/XJailGuard",
  },
  {
    title: "CTI-RAG",
    label: "Threat Intel",
    description:
      "RAG pipeline over CVE and MITRE ATT&CK datasets with custom chunking strategies and vector indexing for high-precision semantic retrieval of threat intelligence.",
    bullets: [
      "RAG pipeline over CVE and MITRE ATT&CK datasets with custom document chunking and ChromaDB vector indexing.",
      "LangChain-based query engine grounding LLM responses in retrieved threat intelligence, reducing hallucination.",
      "Interactive Streamlit dashboard for analysts to explore threat data through natural language queries.",
    ],
    tech: [
      { name: "LangChain", color: "violet" },
      { name: "ChromaDB", color: "emerald" },
      { name: "Streamlit", color: "cyan" },
      { name: "Python", color: "cyan" },
    ],
    github: "https://github.com/karash10/CTI-RAG",
  },
  {
    title: "SecureLogger",
    label: "Cyber Deception",
    description:
      "GAN-powered adversarial log generation system that synthesizes realistic server access logs to obfuscate attacker behavioral fingerprints in honeypot environments.",
    bullets: [
      "GAN architecture trained to synthesize realistic server access logs that statistically mirror real traffic distributions.",
      "Discriminator trained on real server log datasets to enforce authenticity, iteratively refining Generator outputs.",
      "Deployed as a Flask microservice for seamless integration with honeypot environments.",
    ],
    tech: [
      { name: "PyTorch", color: "violet" },
      { name: "GAN", color: "violet" },
      { name: "Flask", color: "emerald" },
      { name: "Python", color: "cyan" },
    ],
    github: "https://github.com/karash10/SecureLogger",
  },
  // ── Systems / Networking ──
  {
    title: "Custom VPN",
    label: "Systems Programming",
    description:
      "Layer 3 VPN tunnel built from scratch using C, raw sockets, and Linux TUN/TAP interfaces with a Docker-based client-server architecture for network isolation.",
    bullets: [
      "Raw socket programming in C with Linux TUN/TAP interfaces for Layer 3 packet tunneling over UDP.",
      "Docker-based client-server architecture with the client isolated in a container for secure testing.",
      "Custom packet encapsulation and routing without relying on OpenVPN or WireGuard libraries.",
    ],
    tech: [
      { name: "C", color: "cyan" },
      { name: "Raw Sockets", color: "neutral" },
      { name: "Linux/TUN/TAP", color: "emerald" },
      { name: "Docker", color: "emerald" },
    ],
    github: "https://github.com/karash10/Custom_vpn",
  },
  // ── Full-Stack / Backend ──
  {
    title: "Intelligent Research Analysis",
    label: "NLP + Graphs",
    description:
      "Automated ingestion pipeline that parses and semantically embeds academic research papers, then builds a directed knowledge graph for gap analysis.",
    bullets: [
      "Semantic embedding of research papers using SentenceTransformers for dense vector representations.",
      "Directed knowledge graph with NetworkX mapping citation relationships and surfacing contradictions.",
      "FastAPI endpoints for graph traversal and embedding retrieval via a clean RESTful interface.",
    ],
    tech: [
      { name: "Python", color: "cyan" },
      { name: "FastAPI", color: "emerald" },
      { name: "SentenceTransformers", color: "violet" },
      { name: "NetworkX", color: "neutral" },
    ],
  },
  {
    title: "EventSphere",
    label: "Backend Systems",
    description:
      "Scalable event booking system with atomic seat-locking, optimistic concurrency control, and JWT-based RBAC for high-concurrency workloads.",
    bullets: [
      "Spring Boot backend with RESTful API layer designed for high concurrency and clean separation of concerns.",
      "Atomic seat-locking and transactional booking with optimistic concurrency control to eliminate race conditions.",
      "JWT-based authentication with role-based access control across users, organizers, and administrators.",
    ],
    tech: [
      { name: "Java", color: "cyan" },
      { name: "Spring Boot", color: "emerald" },
      { name: "MongoDB", color: "emerald" },
      { name: "JWT", color: "neutral" },
    ],
  },
  {
    title: "PlayTogether",
    label: "Full-Stack Web",
    description:
      "MERN-stack platform for discovering, booking, and organizing sports activities with real-time event management, court booking, and Foursquare API integration.",
    bullets: [
      "Full-stack React + Node.js application with Express REST API and MongoDB persistence layer.",
      "JWT-based authentication flow with protected routes and session management.",
      "Foursquare Places API integration for venue discovery and court availability lookup.",
    ],
    tech: [
      { name: "React", color: "cyan" },
      { name: "Node.js", color: "emerald" },
      { name: "MongoDB", color: "emerald" },
      { name: "Express", color: "neutral" },
    ],
    github: "https://github.com/karash10/playTogether",
  },
  {
    title: "Live Attendance Monitor",
    label: "Java Backend",
    description:
      "Real-time attendance monitoring system built in Java for automated tracking and reporting in institutional environments.",
    bullets: [
      "Java-based backend for real-time attendance tracking with automated presence detection.",
      "Modular architecture separating monitoring logic, data persistence, and reporting layers.",
    ],
    tech: [
      { name: "Java", color: "cyan" },
      { name: "Real-time", color: "violet" },
    ],
    github: "https://github.com/karash10/Live-Attendance-monitoring",
  },
];

// ── Skills — logically categorized by domain ──
// Categories flow from core → specialized → tooling
export const skills = [
  {
    category: "Languages & Core",
    description: "Primary programming languages",
    items: [
      { name: "Python", color: "cyan" as const },
      { name: "Java", color: "cyan" as const },
      { name: "C", color: "cyan" as const },
      { name: "JavaScript", color: "cyan" as const },
      { name: "TypeScript", color: "cyan" as const },
      { name: "SQL", color: "cyan" as const },
    ],
  },
  {
    category: "AI & Machine Learning",
    description: "ML frameworks, NLP, and model training",
    items: [
      { name: "PyTorch", color: "violet" as const },
      { name: "Hugging Face", color: "violet" as const },
      { name: "NLP", color: "violet" as const },
      { name: "GANs", color: "violet" as const },
      { name: "Reinforcement Learning", color: "violet" as const },
      { name: "SentenceTransformers", color: "violet" as const },
      { name: "CLIP / CLAP", color: "violet" as const },
      { name: "Vector Embeddings", color: "violet" as const },
      { name: "XAI (SHAP)", color: "violet" as const },
      { name: "LangChain", color: "violet" as const },
    ],
  },
  {
    category: "Security & Adversarial",
    description: "Offensive/defensive security and LLM safety",
    items: [
      { name: "LLM Security", color: "emerald" as const },
      { name: "Adversarial ML", color: "emerald" as const },
      { name: "Threat Modeling", color: "emerald" as const },
      { name: "OWASP Top 10", color: "emerald" as const },
      { name: "Pentesting", color: "emerald" as const },
      { name: "Steganography", color: "emerald" as const },
      { name: "JWT Auth", color: "emerald" as const },
    ],
  },
  {
    category: "Backend & Data",
    description: "Server frameworks, databases, and APIs",
    items: [
      { name: "Spring Boot", color: "cyan" as const },
      { name: "FastAPI", color: "cyan" as const },
      { name: "Flask", color: "cyan" as const },
      { name: "Node.js", color: "cyan" as const },
      { name: "REST APIs", color: "neutral" as const },
      { name: "MongoDB", color: "neutral" as const },
      { name: "ChromaDB", color: "neutral" as const },
      { name: "FAISS", color: "neutral" as const },
      { name: "Next.js", color: "cyan" as const },
    ],
  },
  {
    category: "Systems & Networking",
    description: "Low-level systems and network programming",
    items: [
      { name: "Socket Programming", color: "emerald" as const },
      { name: "Linux", color: "emerald" as const },
      { name: "Bash", color: "emerald" as const },
      { name: "Docker", color: "emerald" as const },
      { name: "TUN/TAP Interfaces", color: "emerald" as const },
      { name: "Nmap", color: "neutral" as const },
    ],
  },
  {
    category: "Tools & Workflow",
    description: "Development tools and platforms",
    items: [
      { name: "Git / GitHub", color: "neutral" as const },
      { name: "Streamlit", color: "neutral" as const },
      { name: "NetworkX", color: "neutral" as const },
    ],
  },
];

export const achievements = [
  {
    title: "Prof. C N R Rao Merit Scholarship",
    description: "Awarded for academic excellence at PES University.",
  },
];

export const certifications = [
  {
    title: "Cybersecurity - Basics of Red Teaming",
    description:
      "Fundamentals of ethical hacking, reconnaissance, exploitation, and post-exploitation techniques.",
  },
];
