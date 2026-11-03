export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  technologies: string[];
  architecture?: string;
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  area: string;
  summary: string;
  focus: string;
}

export const PERSONAL_INFO = {
  name: "Hemanathan R",
  role: "Creative Developer & Systems Engineer",
  institution: "VIT Vellore",
  degree: "Integrated M.Tech CSE",
  location: "Vellore, Tamil Nadu, India",
  headline: "Exploring the Unknown.",
  subheadline: "Building intelligent systems and digital experiences at the intersection of machine learning and interaction design.",
  bio: "Exploring deep neural networks, computer vision architectures, and distributed systems through rigorous engineering and interaction design.",
  quote: "Every great idea begins somewhere in the unknown.",
  links: {
    github: "https://github.com/hemanathan-r",
    linkedin: "https://linkedin.com/in/hemanathan-r",
    email: "hemanathan.r@vitstudent.ac.in"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "handloom-fabric",
    title: "Indian Handloom Fabric Classification",
    category: "AI & Computer Vision",
    description: "Hybrid deep learning architecture combining convolutional neural networks with vision transformers for fine-grained classification of traditional Indian handloom textile weaves.",
    details: [
      "Dual-stream feature extractor capturing micro-texture thread geometry and macro-level artisan motif patterns.",
      "Trained on high-resolution microscopic and macroscopic datasets across diverse regional weaving traditions.",
      "Fine-grained multi-class evaluation under varying illumination and wear states.",
      "Grad-CAM saliency mapping to inspect feature activation across warp and weft yarn intersections."
    ],
    technologies: ["PyTorch", "Vision Transformers", "ResNet", "OpenCV", "Python"],
    architecture: "CNN + ViT Dual-Branch Backbone",
    github: "https://github.com/hemanathan-r/handloom-fabric-classification"
  },
  {
    id: "veridegree",
    title: "VeriDegree — Blockchain Verification",
    category: "Blockchain & Web3",
    description: "Decentralized tamper-proof academic credential issuance and verification protocol built on Ethereum smart contracts and IPFS decentralized storage.",
    details: [
      "Solidity smart contracts supporting cryptographic signature verification and tamper-evident credential records.",
      "Decentralized metadata persistence via IPFS with cryptographic pinning for long-term auditability.",
      "Direct verification engine enabling third parties to independently authenticate academic records without intermediaries.",
      "Gas-conscious transaction design using cryptographic Merkle roots for batch issuance."
    ],
    technologies: ["Solidity", "Ethereum", "IPFS", "Ethers.js", "TypeScript", "Next.js"],
    architecture: "Smart Contract Registry & IPFS Pinning",
    github: "https://github.com/hemanathan-r/veridegree"
  },
  {
    id: "wildlife-monitoring",
    title: "Cloud-Based Wildlife Monitoring",
    category: "Computer Vision & Cloud",
    description: "Automated sensor-camera telemetry platform for remote wildlife habitats, utilizing edge motion filtering and cloud deep learning inference to identify species.",
    details: [
      "IoT camera node telemetry integrating lightweight motion triggering to conserve remote battery life.",
      "Cloud ingestion pipeline processing asynchronous camera trap events and visual triggers.",
      "YOLO-based detection pipeline adapted for challenging forest night-vision and camouflage imagery.",
      "Interactive monitoring console mapping habitat events and temporal species activity."
    ],
    technologies: ["Python", "YOLOv8", "AWS S3 / Lambda", "MQTT", "Docker", "PostgreSQL"],
    architecture: "Edge Triggering & Cloud Inference Pipeline",
    github: "https://github.com/hemanathan-r/wildlife-monitoring-cloud"
  },
  {
    id: "video-summarization",
    title: "Automated Video Summarization",
    category: "Computer Vision & NLP",
    description: "Intelligent video processing engine that compresses long-form lecture and surveillance footage into high-entropy keyframe storyboards and concise digests.",
    details: [
      "Spatio-temporal convolutional embeddings paired with clustering algorithms to identify non-redundant scene boundaries.",
      "Integrated audio transcription alignment to balance visual transitions with semantic topic shifts.",
      "Reduces lengthy recordings into dynamic visual summaries without losing essential informational context.",
      "Exportable timeline markers and keyframe indexes."
    ],
    technologies: ["Python", "FFmpeg", "OpenCV", "Scikit-Learn", "Transformers"],
    architecture: "Spatio-Temporal Clustering & Keyframe Extraction",
    github: "https://github.com/hemanathan-r/video-summarizer"
  },
  {
    id: "silkweave",
    title: "Silkweave",
    category: "Full-Stack Development",
    description: "Digital ecosystem linking traditional textile weavers with global buyers, featuring real-time interactive 3D previews and provenance tracking.",
    details: [
      "Minimalist, accessible interface with high-performance product rendering and fluid transitions.",
      "Transparent supply-chain provenance logging highlighting individual weaver artisan profiles.",
      "Interactive 3D textile preview exploring material sheen and drape under dynamic virtual lighting.",
      "Responsive client-server architecture with secure backend data synchronization."
    ],
    technologies: ["Next.js", "TypeScript", "Three.js", "Node.js", "PostgreSQL"],
    architecture: "Modular Client-Server with WebGL Previews",
    github: "https://github.com/hemanathan-r/silkweave"
  },
  {
    id: "lifeos",
    title: "LifeOS",
    category: "Full-Stack Development",
    description: "Unified cognitive operating system and knowledge graph designed to organize academic coursework, algorithmic problem-solving, and research notes.",
    details: [
      "Bidirectional note linking with interactive graph visualization of connected engineering concepts.",
      "Spaced-repetition review scheduler tailored for algorithmic problem sets and systems architectures.",
      "Local-first architecture designed for zero distraction and instantaneous query performance.",
      "End-to-end client-side encryption with offline persistence."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "IndexedDB", "Zustand"],
    architecture: "Local-First Graph Database & Client Storage",
    github: "https://github.com/hemanathan-r/life-os"
  }
];

export const SKILL_GROUPS: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Neural network architectures, statistical modeling, and training pipelines.",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Vision Transformers",
      "CNNs",
      "Deep Learning",
      "Scikit-Learn",
      "Model Optimization",
      "Transfer Learning"
    ]
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Spatial-temporal pattern recognition, image processing, and forensic analysis.",
    skills: [
      "OpenCV",
      "YOLO Object Detection",
      "Fine-Grained Classification",
      "Keyframe Extraction",
      "Image Segmentation",
      "Grad-CAM Saliency"
    ]
  },
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description: "Modern interactive web systems, creative graphics, and performant backends.",
    skills: [
      "TypeScript",
      "Python",
      "C++",
      "Next.js",
      "React",
      "Three.js / WebGL",
      "Node.js",
      "PostgreSQL"
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain & Systems",
    description: "Decentralized consensus, verifiable credential protocols, and cloud infrastructure.",
    skills: [
      "Solidity",
      "Ethereum Smart Contracts",
      "IPFS",
      "Merkle Trees",
      "Docker",
      "Linux",
      "AWS Pipelines"
    ]
  }
];

export const RESEARCH_INTERESTS: ResearchItem[] = [
  {
    id: "hybrid-vision",
    title: "Hybrid Feature Fusion in Micro-Texture Analysis",
    area: "Deep Learning & Vision",
    summary: "Integrating local inductive spatial priors (convolutional layers) with global self-attention mechanisms (transformers) for fine-grained classification of organic and woven microstructures.",
    focus: "Dual-branch attention architectures and entropy-weighted loss functions for microscopic textile forensics."
  },
  {
    id: "verifiable-credentials",
    title: "Decentralized Cryptographic Proofs for Verification",
    area: "Blockchain & Cryptography",
    summary: "Designing verifiable, privacy-preserving credential issuance schemas that allow third parties to independently authenticate academic records on-chain without exposing personally identifiable information.",
    focus: "Sparse Merkle tree proofs, smart contract registries, and decentralized IPFS pinning schemas."
  },
  {
    id: "video-entropy",
    title: "Spatio-Temporal Redundancy in Video Streams",
    area: "Video Analytics",
    summary: "Content-adaptive segmentation algorithms that compute visual entropy and acoustic semantic shifts to condense lengthy surveillance and educational recordings into concise digests.",
    focus: "Contrastive temporal embeddings combined with agglomerative clustering across video frame spaces."
  },
  {
    id: "edge-inference",
    title: "Low-Power Edge Ingestion for Habitat Telemetry",
    area: "Edge Computing & IoT",
    summary: "Post-training quantization and lightweight event filtering for resource-constrained edge camera nodes in remote environmental and wildlife monitoring scenarios.",
    focus: "8-bit quantization and duty-cycle management on microcontroller architectures to extend solar-battery lifespans."
  }
];
