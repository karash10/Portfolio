export interface ProjectDoc {
  whatItIs: string;
  problemItSolves: string;
  architecture: string[];
  keyFeatures: string[];
  outcomes: string[];
  metricHighlights?: Array<{ label: string; value: string }>;
  architectureDiagram?: {
    src: string;
    alt: string;
    caption: string;
  };
}

export const projectDocs: Record<string, ProjectDoc> = {
  "1": {
    whatItIs:
      "DCASS (Dynamic Context-Aware Semantic Steganography) is a research-grade covert communication system that encodes intent through semantically matched media retrieval instead of editing carrier files. It combines multi-modal embeddings, vector search, behavior-aware scheduling, and adversarial evaluation to test whether hidden communication can remain statistically indistinguishable from normal content sharing.",
    problemItSolves:
      "Traditional steganography alters pixels, bytes, or waveforms, which can leave detectable artifacts under modern steganalysis. DCASS addresses that by keeping carriers untouched and encoding via semantic curation, then reducing traffic-level detectability with timing and channel-behavior controls.",
    architecture: [
      "Ingest and index text, image, and audio corpora into a unified semantic retrieval layer using CLIP, CLAP, and sentence-level embeddings with FAISS-backed nearest-neighbor search.",
      "Chunk each message into semantic units, generate query vectors, and map each unit to naturally occurring carriers instead of embedding bits into files.",
      "Apply dynamic context keying so carrier mappings shift with time and context inputs, reducing static pattern reuse across sessions.",
      "Route selected carrier sequences through the stealth layer, where GAN-based temporal generation and PPO-style policy optimization shape transmission behavior.",
      "Evaluate output through an adversarial warden pipeline and benchmark scripts that score detectability, throughput, and reconstruction quality.",
    ],
    keyFeatures: [
      "Zero-modification carrier strategy designed to resist classical content-level steganalysis.",
      "Cross-modal retrieval engine supporting text, image, and audio carriers from a shared semantic search interface.",
      "GAN + RL stealth stack that learns human-like dispatch timing under throughput and suspicion constraints.",
      "Dockerized sender-receiver simulation for controlled end-to-end experiments and reproducible evaluation.",
      "Extensible docs and benchmark flow for architecture, sequence behavior, and corpus expansion experiments.",
    ],
    outcomes: [
      "Demonstrates a practical transition from bit-level hiding to meaning-level covert encoding.",
      "Provides a reproducible research baseline for adversarial traffic-aware steganography experiments.",
      "Establishes a modular foundation for future real-channel deployment and comparative steganalysis studies.",
    ],
    metricHighlights: [
      { label: "Modalities", value: "Text + Image + Audio" },
      { label: "Retrieval Core", value: "FAISS + Multi-Embedder" },
      { label: "Stealth Layer", value: "GAN Scheduler + PPO Agent" },
    ],
  },
  "2": {
    whatItIs:
      "XJailGuard is an explainable LLM safety gateway for multilingual conversational systems. It wraps a generative model with input screening, multi-turn jailbreak detection, output filtering, and token-level explanation so unsafe requests and responses are blocked before user delivery.",
    problemItSolves:
      "Single-layer moderation often misses role-play jailbreaks, translated attack prompts, and chained multi-turn escalation. XJailGuard solves this by applying defense-in-depth at both ingress and egress, while exposing explainability artifacts for review and policy tuning.",
    architecture: [
      "Accept user prompt and route it through multilingual input classifiers that score jailbreak intent before generation.",
      "Evaluate recent conversational context with a dedicated multi-turn detector to catch staged or progressive attack chains.",
      "Forward safe requests to a quantized Vicuna-family generation layer and collect candidate model output.",
      "Pass generated output through a second safety classifier to prevent unsafe responses from leaving the system.",
      "Generate SHAP-based token attributions whenever content is blocked so operators can inspect why a decision was made.",
    ],
    keyFeatures: [
      "Modular guardrail pipeline with separate input, output, and context-aware classifiers.",
      "Multilingual attack detection to handle unsafe prompts beyond English-only threat models.",
      "Token-level SHAP explanation views for blocked prompts and blocked model responses.",
      "Gradio-based interactive interface for security testing and model-behavior auditing.",
      "Lazy LLM loading and quantized inference path for practical deployment on constrained hardware.",
    ],
    outcomes: [
      "Reduces jailbreak exposure for assistant workflows by filtering threats at both prompt and response stages.",
      "Improves trust and triage speed by pairing each block decision with transparent token-level evidence.",
      "Creates an extensible blueprint for explainable guardrails in multilingual production assistants.",
    ],
    metricHighlights: [
      { label: "Language Coverage", value: "10+ Languages" },
      { label: "Guardrail Scope", value: "Input + Output + Multi-turn" },
      { label: "Explainability", value: "SHAP Token Attribution" },
    ],
    architectureDiagram: {
      src: "https://raw.githubusercontent.com/karash10/XJailGuard/main/architecture.png",
      alt: "XJailGuard system architecture diagram",
      caption: "Pipeline showing prompt filtering, LLM generation, response validation, and explainability stages.",
    },
  },
  "3": {
    whatItIs:
      "CTI-RAG is a cybersecurity retrieval-augmented intelligence assistant that ingests CTI datasets, builds a semantic vector index, and serves cited analyst answers from CVE and MITRE ATT&CK knowledge.",
    problemItSolves:
      "Threat intelligence is fragmented across vulnerability feeds, ATT&CK technique references, and internal notes, forcing analysts to manually cross-reference sources. CTI-RAG reduces lookup overhead by centralizing retrieval and grounding responses in indexed evidence.",
    architecture: [
      "Ingest CTI files from the dataset layer and normalize CVE and ATT&CK records into consistent retrieval-ready documents.",
      "Chunk and embed documents with SentenceTransformer pipelines and persist vectors in ChromaDB.",
      "Run semantic retrieval for each analyst query and assemble evidence-rich context through LangChain components.",
      "Send grounded prompts to Gemini-backed generation and produce responses tied to concrete CVE and technique identifiers.",
      "Expose the workflow through a Streamlit analyst interface for iterative investigation and mitigation-focused questioning.",
    ],
    keyFeatures: [
      "Semantic retrieval over mixed CTI formats for faster vulnerability and technique discovery.",
      "Citation-oriented answer generation tied to specific CVE and ATT&CK artifacts.",
      "Mitigation extraction workflow for turning retrieved intelligence into practical action items.",
      "Two-stage execution model with explicit index-build and chatbot-run phases.",
      "Extensible dataset folder pattern for onboarding additional feeds without redesigning the stack.",
    ],
    outcomes: [
      "Cuts analyst time spent switching across disconnected intelligence sources.",
      "Improves response traceability by returning grounded outputs with identifiable threat references.",
      "Provides a reusable CTI-focused RAG architecture for SOC and threat research teams.",
    ],
    metricHighlights: [
      { label: "Intel Sources", value: "CVE + MITRE ATT&CK" },
      { label: "Retrieval Layer", value: "ChromaDB + LangChain" },
      { label: "Analyst Interface", value: "Interactive Streamlit" },
    ],
  },
  "4": {
    whatItIs:
      "SecureLogger is a cyber deception framework that trains a GAN on real URL-path behavior and injects realistic synthetic access-log entries to camouflage true traffic patterns.",
    problemItSolves:
      "Raw web access logs can reveal user behavior, system usage peaks, and high-value endpoints to adversaries. SecureLogger obscures those signals by continuously mixing plausible fake entries with real traffic traces.",
    architecture: [
      "Train an LSTM-based GAN on URL-path datasets so the generator learns realistic endpoint structures and sequence patterns.",
      "Persist trained generator weights and use them to produce novel but plausible fake request paths.",
      "Inject synthetic entries using manual and watcher-driven modes so deception can run as batch or continuous flood.",
      "Blend fake and real events at configurable noise levels to obfuscate traffic interpretation while keeping logs operational.",
      "Run in a testable local setup with a sample web app and flooder loop for fast experimentation.",
    ],
    keyFeatures: [
      "GAN-based synthetic log generation trained from real traffic signatures.",
      "Configurable fixed-count or ratio-based noise injection strategies.",
      "Manual and real-time watcher modes for flexible deployment across environments.",
      "Log privacy controls including redaction-friendly flow for sensitive fields.",
      "Operationally simple scripts for rapid proof-of-concept deployment.",
    ],
    outcomes: [
      "Raises attacker uncertainty when profiling services through stolen or monitored logs.",
      "Strengthens deception posture in honeypot and defensive-lab scenarios.",
      "Demonstrates practical adversarial ML use beyond classification into defensive obfuscation.",
    ],
    metricHighlights: [
      { label: "Modeling", value: "LSTM-based GAN" },
      { label: "Injection Modes", value: "Manual + Real-time" },
      { label: "Primary Goal", value: "Traffic Pattern Obfuscation" },
    ],
  },
  "5": {
    whatItIs:
      "Custom VPN is a from-scratch Layer-3 tunnel implementation in C that uses raw UDP encapsulation with Linux TUN interfaces to demonstrate core VPN internals without relying on OpenVPN or WireGuard frameworks.",
    problemItSolves:
      "Most production VPN stacks hide low-level packet lifecycle details. This project solves the learning gap by exposing tun interface setup, IP packet capture, UDP encapsulation, decapsulation, and route control in a minimal and inspectable codebase.",
    architecture: [
      "Run the server on the host namespace with a dedicated tun interface and UDP listener on port 5555.",
      "Run the client inside a Docker container to simulate remote isolation and avoid local routing-loop artifacts.",
      "Read Layer-3 packets from tun0/tun1, encapsulate payloads in UDP datagrams, and forward through the host-container path.",
      "Decapsulate packets at the opposite endpoint and hand them back to the kernel networking stack via the tun device.",
      "Verify connectivity with tunnel IP ping tests and monitor encrypted-tunnel transport behavior using tcpdump on docker0.",
    ],
    keyFeatures: [
      "Raw C implementation of tun-device packet IO and UDP tunnel transport.",
      "Containerized client topology that mirrors real remote endpoint behavior.",
      "Manual IP and peer route setup for full control over path semantics.",
      "Clear baseline architecture for later encryption, NAT, and multi-client expansion.",
      "Hands-on debugging workflow using packet capture and namespace-aware testing.",
    ],
    outcomes: [
      "Validates an end-to-end software tunnel from packet capture to remote forwarding.",
      "Demonstrates strong systems knowledge in networking, sockets, and Linux virtual interfaces.",
      "Provides a practical educational baseline for evolving toward production-grade VPN capabilities.",
    ],
    metricHighlights: [
      { label: "Protocol Level", value: "Layer 3 Tunnel" },
      { label: "Transport", value: "UDP Encapsulation" },
      { label: "Runtime Topology", value: "Host + Docker Client" },
    ],
  },
  "6": {
    whatItIs:
      "Intelligent Research Analysis is an NLP plus graph-analytics workflow that ingests research papers, encodes them into semantic vectors, and builds citation-aware knowledge structures for faster literature intelligence.",
    problemItSolves:
      "Manual literature review is slow, repetitive, and poor at revealing cross-paper gaps or contradiction patterns. This system addresses that by transforming isolated documents into a queryable semantic and relationship graph that supports structured exploration.",
    architecture: [
      "Parse paper metadata, abstracts, and section-level content into normalized records for downstream analytics.",
      "Generate dense embeddings for each paper or segment to support semantic clustering and nearest-neighbor retrieval.",
      "Construct directed graph links for citation flow, topic adjacency, and concept reuse across the corpus.",
      "Expose retrieval and graph-traversal operations through FastAPI endpoints for integration into analysis tools.",
      "Feed similarity and graph signals into gap-analysis views that highlight underexplored or conflicting research areas.",
    ],
    keyFeatures: [
      "Automated paper ingestion and cleaning pipeline for scalable corpus growth.",
      "Embedding-driven semantic search for rapid topic and method discovery.",
      "Directed citation and concept graph construction for structural insight.",
      "Gap and contradiction surfacing through combined graph and similarity signals.",
      "API-first architecture suitable for custom dashboards and research tooling.",
    ],
    outcomes: [
      "Speeds up literature triage by replacing manual scanning with semantic retrieval.",
      "Improves visibility into research clusters, weakly connected areas, and missing links.",
      "Creates a reusable foundation for institution-scale research intelligence systems.",
    ],
    metricHighlights: [
      { label: "Core Stack", value: "Embeddings + Graphs" },
      { label: "API Layer", value: "FastAPI Endpoints" },
      { label: "Analysis Goal", value: "Gap Discovery" },
    ],
  },
  "7": {
    whatItIs:
      "EventSphere is a Spring Boot booking platform for movies, sports, and concerts built for high-concurrency reservation safety, role-aware operations, and production-style deployment workflows.",
    problemItSolves:
      "Booking platforms frequently fail under concurrency with duplicate seat claims, weak authorization boundaries, and hard-to-monitor operations. EventSphere addresses this with Redis seat locking, transactional booking flows, and role-based access controls across user, organizer, and admin paths.",
    architecture: [
      "Organize the system as a modular monolith with controller, service, and repository layers in Spring Boot.",
      "Store primary transactional state in JPA-managed entities with H2 for development and production-ready DB compatibility.",
      "Use Redis-backed distributed seat locks with expiration to prevent race conditions during checkout windows.",
      "Secure browser and API flows with a hybrid model: JWT cookie sessions for web UX and role-based guards for protected operations.",
      "Render user and admin interfaces with Thymeleaf plus HTMX while exposing operational observability through actuator endpoints.",
    ],
    keyFeatures: [
      "Concurrency-safe seat reservation workflow using Redis lock semantics.",
      "Role-aware access model for USER, ORGANIZER, and ADMIN capabilities.",
      "Dynamic event, venue, show, and seat-pricing management across multiple event categories.",
      "Payment simulation with booking rollback behavior for failed transactions.",
      "Containerized deployment path with Docker Compose and CI-friendly structure.",
    ],
    outcomes: [
      "Prevents duplicate seat assignment under concurrent booking attempts.",
      "Delivers an end-to-end booking backbone with admin analytics and operational monitoring hooks.",
      "Provides a migration-ready architecture that can evolve from modular monolith to service decomposition.",
    ],
    metricHighlights: [
      { label: "Concurrency Model", value: "Redis Seat Locking" },
      { label: "Security", value: "JWT Cookie + RBAC" },
      { label: "Runtime Stack", value: "Spring Boot + Thymeleaf" },
    ],
  },
  "8": {
    whatItIs:
      "PlayTogether is a full-stack sports discovery and booking platform that combines a React frontend with a Node and Express backend for turf discovery, session booking, and user account workflows.",
    problemItSolves:
      "Players often rely on fragmented apps and manual coordination for finding facilities, organizing games, and completing bookings. PlayTogether unifies those steps into a single product flow from discovery to reservation.",
    architecture: [
      "Deliver a Vite and React frontend with page-level routing for home, turf lists, specific turf views, booking, login, signup, and profile operations.",
      "Expose backend domain APIs via Express for user authentication, turf management, and booking transactions.",
      "Persist user, turf, and booking entities in MongoDB models to maintain end-to-end booking state.",
      "Coordinate frontend API calls through custom hooks and shared UI components for consistent data access patterns.",
      "Support extensible external venue-intelligence integration where location APIs are configured for richer discovery experiences.",
    ],
    keyFeatures: [
      "Complete user journey from venue discovery to booking confirmation.",
      "JWT-based authentication with protected account and booking actions.",
      "Turf-centric catalog and detail views with booking-time interaction flows.",
      "Profile and account management features integrated with booking history behavior.",
      "Separation of frontend and backend codebases for independent iteration.",
    ],
    outcomes: [
      "Demonstrates full-stack product delivery across frontend UX, backend APIs, and data persistence.",
      "Validates practical booking-domain implementation with authentication and transactional workflows.",
      "Provides a reusable MERN blueprint for community sports and facility platforms.",
    ],
    metricHighlights: [
      { label: "Architecture", value: "MERN Stack" },
      { label: "Auth", value: "JWT-protected Flows" },
      { label: "External Data", value: "Foursquare Integration" },
    ],
  },
  "9": {
    whatItIs:
      "Live Attendance Monitor is a Spring Boot backend for classroom attendance operations that combines JWT-secured APIs with WebSocket-based real-time session updates for instructors and students.",
    problemItSolves:
      "Manual roll calls and delayed batch uploads create errors, weak visibility, and limited control during active class sessions. This project solves that with real-time attendance session management, role-aware access, and continuously updated attendance state.",
    architecture: [
      "Structure the backend into controller, service, repository, DTO, and entity layers using Spring Boot and JPA conventions.",
      "Authenticate users through JWT-based security filters and enforce role-aware access via Spring Security configuration.",
      "Manage live class sessions through attendance session services that coordinate active-session state and attendance windows.",
      "Push and receive real-time attendance events over WebSocket handlers with session registries for connected participants.",
      "Persist attendance, classroom, and user records in repository-backed entities for reporting and historical query workflows.",
    ],
    keyFeatures: [
      "Real-time attendance updates through dedicated WebSocket infrastructure.",
      "JWT authentication and role-based authorization for secure classroom operations.",
      "Active session management for start, monitor, and close attendance windows.",
      "Centralized API response and exception-handling patterns for stable backend behavior.",
      "Production-oriented modular code organization for extensibility and maintenance.",
    ],
    outcomes: [
      "Reduces manual attendance overhead with continuously synchronized class participation state.",
      "Improves operational visibility for instructors through session-aware live tracking workflows.",
      "Provides a strong reference implementation of secure real-time Java backend design.",
    ],
    metricHighlights: [
      { label: "Realtime Layer", value: "WebSocket Sessions" },
      { label: "Security", value: "JWT + Spring Security" },
      { label: "Domain", value: "Classroom Attendance Ops" },
    ],
  },
};
