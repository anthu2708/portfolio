// To add a project, append one object to this array.
export const projects = [
  {
    no: "No. 01",
    slug: "detection",
    name: "Fraud Detection Pipeline",
    kind: "Artifact",
    overview:
        "A simulated real-time fraud detection system modeled on Stripe Radar: transactions stream through Kafka, get scored by an unsupervised Isolation Forest model, and results are queryable via a FastAPI service backed by Postgres. Includes a dual-queue priority pattern isolating latency-sensitive requests from bulk stream backlog (measured at ~20ms vs. 8.7–55s under load), containerized services deployed via Helm, and GitOps continuous delivery through ArgoCD on Kubernetes.",
    meta: "2026 · ML/Infra · Kafka · Isolation Forest · Kubernetes",
    image: "/projects/detection.png",
    link: "https://fraud.anphung.dev/",
  },
  {
    no: "No. 02",
    slug: "safee-nest",
    name: "SafeNest",
    kind: "Artifact",
    overview:
      "A full-stack rental platform built solo, covering the entire tenant–landlord lifecycle end to end: browsing, applying, negotiating, signing a lease, and paying rent. Every route is locked down by ownership-scoped authorization, with Stripe handling rent payments via signature-verified webhooks. Built with Rails 8.1 and Hotwire.",
    meta: "2026 · Full-Stack · Rails 8.1 · Stripe · Hotwire",
    image: "/projects/safee-nest.png",
    link: "https://safenest.anphung.dev/",
  },
  {
    no: "No. 03",
    slug: "ragnote-ai",
    name: "ragNote",
    kind: "Artifact",
    overview:
        "A full-stack AI Q&A tool that lets users upload documents and get answers grounded in their own content instead of generic LLM guesses. The core is a RAG pipeline: chunking, embedding, and vector retrieval feeding OpenAI for grounded responses. Built with FastAPI, Pinecone, and a React/TypeScript frontend.",
    meta: "2025 · Full-Stack · FastAPI · React · Pinecone",
    image: "/projects/ragnote-ai.png",
    link: "https://ragnote.anphung.dev/",
  },
];
