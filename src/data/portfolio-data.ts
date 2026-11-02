export interface Project {
  id: string;
  title: string;
  category: string;
  period: string;
  description: string;
  details: string[];
  technologies: string[];
  metrics?: string;
  github?: string;
  demo?: string;
  hotspotCoord?: [number, number, number]; // Coordinates relative to jellyfish in 3D
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: { name: string; level?: string; highlight?: boolean }[];
}

export interface ResearchItem {
  id: string;
  title: string;
  area: string;
  summary: string;
  methodology: string;
  impact: string;
  status: 'In Progress' | 'Experimental' | 'Completed';
  tags: string[];
}

export const PERSONAL_INFO = {
  name: "Hemanathan R",
  role: "Creative Engineer & Systems Developer",
  status: "Integrated M.Tech CSE · VIT Vellore",
  education: {
    degree: "Integrated M.Tech in Computer Science and Engineering",
    institution: "Vellore Institute of Technology (VIT), Vellore",
    school: "School of Computer Science and Engineering (SCOPE)",
    timeline: "2024 – 2029",
    location: "Vellore, Tamil Nadu, India"
  },
  bio: "Exploring the convergence of artificial intelligence, computer vision, and distributed systems. Focused on architecting resilient digital ecosystems and high-fidelity algorithmic models that bring clarity to complex data.",
  quote: "Every great idea begins somewhere in the unknown.",
  links: {
    github: "https://github.com/hemanathan-r",
    linkedin: "https://linkedin.com/in/hemanathan-r",
    email: "hemanathan.r@vitstudent.ac.in",
    portfolio: "https://hemanathan.dev"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "handloom-fabric",
    title: "Indian Handloom Fabric Classification",
    category: "Deep Learning & Computer Vision",
    period: "2025 – Present",
    description: "A hybrid deep learning architecture combining Convolutional Neural Networks and Vision Transformers for fine-grained classification of traditional Indian handloom weaves, preserving cultural heritage through automated textile forensics.",
    details: [
      "Engineered a multi-scale feature extractor capturing both micro-texture thread weave geometry and macro-level artisan motif patterns.",
      "Trained on high-resolution microscopic and macroscopic handloom datasets across diverse regional styles (Kanchipuram, Banarasi, Chanderi, Ikat).",
      "Achieved high accuracy on fine-grained weave classification under varying illumination and wear conditions.",
      "Implemented Grad-CAM explainability maps to validate feature saliency along warp and weft yarn intersections."
    ],
    technologies: ["PyTorch", "Vision Transformers", "ResNet/EfficientNet", "OpenCV", "FastAPI", "Python"],
    metrics: "94.8% Top-1 Accuracy",
    github: "https://github.com/hemanathan-r/handloom-fabric-classification",
    hotspotCoord: [1.2, 0.4, 0.5]
  },
  {
    id: "veridegree",
    title: "VeriDegree — Blockchain Verification",
    category: "Web3 & Distributed Systems",
    period: "2025",
    description: "Decentralized tamper-proof academic credential issuance and verification protocol built on Ethereum smart contracts and IPFS decentralized storage, eliminating credential fraud.",
    details: [
      "Architected Solidity smart contracts supporting cryptographic signature verification and verifiable tamper-evident credential hashes.",
      "Decentralized metadata storage using IPFS with cryptographic pinning for lifetime accessibility without centralized server dependencies.",
      "Sub-second verification engine enabling employers and universities to independently validate academic records without third-party intermediaries.",
      "Optimized gas consumption using cryptographic Merkle proofs for batch certification issuance."
    ],
    technologies: ["Solidity", "Ethereum", "IPFS", "Ethers.js", "Next.js", "TypeScript", "Tailwind CSS"],
    metrics: "Gas-optimized Merkle proofs",
    github: "https://github.com/hemanathan-r/veridegree",
    hotspotCoord: [-1.2, 0.2, 0.6]
  },
  {
    id: "wildlife-monitoring",
    title: "Cloud-Based Wildlife Monitoring",
    category: "IoT & Distributed Cloud AI",
    period: "2024 – 2025",
    description: "An automated sensor-camera telemetry platform for remote wildlife habitats, utilizing edge motion filtering and cloud deep learning inference to detect, classify, and track endangered species in near-real-time.",
    details: [
      "Integrated low-power IoT camera nodes with lightweight edge motion detection algorithms to conserve battery life and bandwidth.",
      "Constructed a scalable cloud ingestion pipeline processing asynchronous telemetry events and visual triggers.",
      "Custom YOLO-based wildlife detection pipeline trained on challenging forest night-vision and camouflage camera trap imagery.",
      "Real-time geographic dashboard tracking migration corridors and issuing automated conservation alert dispatches."
    ],
    technologies: ["Python", "YOLOv8", "AWS S3 / Lambda", "MQTT", "Docker", "PostgreSQL", "React"],
    metrics: "Near real-time alert latency (<1.8s)",
    github: "https://github.com/hemanathan-r/wildlife-monitoring-cloud",
    hotspotCoord: [0.9, -0.6, 0.8]
  },
  {
    id: "video-summarization",
    title: "Automated Video Summarization",
    category: "Multimedia Computing & NLP",
    period: "2024",
    description: "An intelligent video summarization engine that processes long-form lecture and surveillance footage into concise, high-entropy keyframe storyboards and temporal digest reels.",
    details: [
      "Employed spatio-temporal convolutional embeddings alongside clustering algorithms to identify non-redundant informative scene boundaries.",
      "Integrated audio transcription and NLP keyword density scoring to align visual transitions with salient semantic discussion peaks.",
      "Reduces 60+ minute recordings into dynamic 3-5 minute high-information synopses without losing critical context.",
      "Export formats support interactive chapter markers and exportable time-coded research notes."
    ],
    technologies: ["Python", "FFmpeg", "OpenCV", "Scikit-Learn", "Transformers", "Streamlit"],
    metrics: "85% Redundancy Reduction",
    github: "https://github.com/hemanathan-r/video-summarizer",
    hotspotCoord: [-0.9, -0.8, 0.7]
  },
  {
    id: "silkweave",
    title: "Silkweave",
    category: "Full Stack & Artisan Commerce",
    period: "2024",
    description: "A digital ecosystem linking traditional weavers directly with global consumers, combining generative design previews, provenance tracking, and an intuitive minimal commerce interface.",
    details: [
      "Built responsive, accessible frontend with high-performance product rendering and fluid micro-interactions.",
      "Incorporated transparent supply-chain provenance logging highlighting individual weaver artisan profiles.",
      "Designed an interactive 3D fabric drape simulator enabling buyers to visualize textile sheen and texture under lighting.",
      "Secure payment processing and real-time inventory management backend."
    ],
    technologies: ["Next.js", "TypeScript", "Three.js", "Node.js", "Prisma", "PostgreSQL"],
    metrics: "Direct-to-Artisan Fair Trade",
    github: "https://github.com/hemanathan-r/silkweave",
    hotspotCoord: [0.7, -1.5, 0.5]
  },
  {
    id: "lifeos",
    title: "LifeOS",
    category: "Productivity & Personal Systems",
    period: "2024",
    description: "A unified cognitive operating system and knowledge graph designed to manage academic tasks, research notes, habits, and algorithmic problem-solving progress in one cohesive workspace.",
    details: [
      "Bidirectional knowledge linking with dynamic graph visualization of research concepts and course topics.",
      "Automated spaced-repetition scheduling algorithm tailored for complex engineering and mathematical concepts.",
      "Minimalist dark editorial aesthetic optimized for sustained cognitive focus and distraction-free deep work.",
      "Local-first architecture with end-to-end encrypted synchronization."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "IndexedDB", "Zustand", "Graphology"],
    metrics: "Zero-latency local first",
    github: "https://github.com/hemanathan-r/life-os",
    hotspotCoord: [-0.7, -1.6, 0.5]
  }
];

export const SKILL_GROUPS: SkillCategory[] = [
  {
    title: "Programming & Foundations",
    subtitle: "Core algorithmic and systems engineering languages",
    skills: [
      { name: "Python", highlight: true },
      { name: "C++", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript" },
      { name: "SQL (PostgreSQL)" },
      { name: "Solidity" },
      { name: "Data Structures & Algorithms", highlight: true },
      { name: "OOP & Systems Design" }
    ]
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Deep neural networks, models & evaluation frameworks",
    skills: [
      { name: "PyTorch", highlight: true },
      { name: "TensorFlow" },
      { name: "Scikit-Learn" },
      { name: "Vision Transformers (ViT)", highlight: true },
      { name: "Convolutional Networks (CNN)", highlight: true },
      { name: "Transfer Learning" },
      { name: "Model Optimization" },
      { name: "Feature Engineering" }
    ]
  },
  {
    title: "Computer Vision & Media",
    subtitle: "Image forensics, video processing & spatio-temporal analysis",
    skills: [
      { name: "OpenCV", highlight: true },
      { name: "YOLO Object Detection", highlight: true },
      { name: "Fine-Grained Classification" },
      { name: "Keyframe Extraction" },
      { name: "Spatio-Temporal Clustering" },
      { name: "Image Segmentation" },
      { name: "FFmpeg Pipelines" },
      { name: "Grad-CAM Explainability" }
    ]
  },
  {
    title: "Web & Interactive Systems",
    subtitle: "Modern client-server architectures & 3D graphics",
    skills: [
      { name: "Next.js (App Router)", highlight: true },
      { name: "React", highlight: true },
      { name: "Three.js / React Three Fiber", highlight: true },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "REST & GraphQL APIs" },
      { name: "WebGL Shaders" },
      { name: "State Management" }
    ]
  },
  {
    title: "Distributed & Web3 Systems",
    subtitle: "Decentralized trust, cloud infrastructure & containerization",
    skills: [
      { name: "Ethereum Smart Contracts", highlight: true },
      { name: "IPFS Decentralized Storage" },
      { name: "Docker & Containerization", highlight: true },
      { name: "Git & Version Control" },
      { name: "Linux Systems Administration" },
      { name: "Cloud Ingestion (AWS/GCP)" },
      { name: "Cryptographic Hashing & Merkle Trees" },
      { name: "CI/CD Workflows" }
    ]
  }
];

export const RESEARCH_TOPICS: ResearchItem[] = [
  {
    id: "res-handloom",
    title: "Hybrid Feature Fusion for Micro-Texture Pattern Classification",
    area: "Deep Learning & Cultural Computing",
    summary: "Investigating the complementary representation of localized high-frequency spatial filters (CNNs) and global self-attention mechanisms (Vision Transformers) for classifying intricate organic and woven microstructures under non-uniform illumination.",
    methodology: "Dual-branch backbone architecture with cross-attention fusion modules and entropy-weighted loss formulation.",
    impact: "Provides automated, verifiable non-destructive authentication for artisanal textile preservation and intellectual property protection.",
    status: "Experimental",
    tags: ["Cross-Attention", "Micro-Texture Analysis", "ViT Hybrid", "Textile Forensics"]
  },
  {
    id: "res-credential",
    title: "Decentralized Cryptographic Proofs for Academic Verification",
    area: "Distributed Ledger Technology & Cryptography",
    summary: "Developing verifiable, zero-knowledge adjacent credential schemas that permit third parties to mathematically verify academic qualifications and degrees without exposing student personally identifiable information (PII).",
    methodology: "Sparse Merkle trees coupled with off-chain IPFS payload hashes signed via institutional ECDSA keys on Ethereum compatible L2 networks.",
    impact: "Mitigates credential counterfeiting on a global scale while drastically reducing operational verification latency and gas overhead.",
    status: "In Progress",
    tags: ["Smart Contracts", "Sparse Merkle Trees", "Zero PII Exposure", "IPFS Storage"]
  },
  {
    id: "res-video",
    title: "Spatio-Temporal Redundancy Minimization in Educational Footage",
    area: "Multimedia Systems & Video Analytics",
    summary: "Researching content-adaptive temporal segmentation algorithms that evaluate visual frame entropy alongside acoustic semantic shifts to synthesize minimal yet comprehensive video summaries.",
    methodology: "Temporal contrastive learning on video clip snippets combined with unsupervised agglomerative clustering on deep feature representations.",
    impact: "Enables accelerated student revision and accessible indexing of high-volume digital educational repositories.",
    status: "Completed",
    tags: ["Video Summarization", "Frame Entropy", "Contrastive Embeddings", "Keyframe Clustering"]
  },
  {
    id: "res-edge",
    title: "Low-Power Edge Ingestion & Event Detection in Wildlife Habitats",
    area: "Edge AI & IoT Systems",
    summary: "Designing quantized neural models deployable on ultra-low-power microcontrollers for real-time edge filtering of camera trap telemetry, transmitting only high-confidence wildlife interaction windows.",
    methodology: "8-bit integer post-training quantization (INT8) of compact convolutional networks optimized for micro-power ARM Cortex architectures.",
    impact: "Extends remote wildlife surveillance sensor lifespans by up to 400% through active solar and battery duty-cycling.",
    status: "In Progress",
    tags: ["Edge Computing", "Model Quantization", "IoT Telemetry", "Conservation Tech"]
  }
];
