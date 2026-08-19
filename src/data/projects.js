// To add a project, append one object to this array.
export const projects = [
  {
    no: "No. 01",
    slug: "ragnote-ai",
    name: "ragNote",
    kind: "Artifact",
    overview:
      "A full-stack AI document Q&A system that lets users upload documents and ask natural-language questions grounded in their content. The backend handles ingestion, embedding, and retrieval via an OpenAI RAG pipeline (FastAPI, Pinecone, PostgreSQL, AWS S3), with a React/TypeScript frontend for file management and chat.",
    meta: "2026 · Full-Stack · FastAPI · React · Pinecone",
    image: "/projects/ragnote-ai.png",
  },
  {
    no: "No. 02",
    slug: "safee-nest",
    name: "SafeNest",
    kind: "Artifact",
    overview:
      "A full-stack Ruby on Rails rental platform built solo end-to-end, covering the entire tenant–landlord lifecycle: browsing listings, applying, negotiating through a 9-state pipeline, signing a lease, and paying rent. Rails 8.1 + Hotwire power the app, ownership-scoped authorization locks down every route, Stripe Checkout handles rent payments with signature-verified webhooks, and a 170+ example RSpec suite holds an 80% coverage floor.",
    meta: "2026 · Full-Stack · Rails 8.1 · Stripe · Hotwire",
    image: "/projects/safee-nest.png",
  },
  {
    no: "No. 03",
    slug: "detection",
    name: "Fraud Detection Pipeline",
    kind: "Artifact",
    overview:
      "A simulated real-time fraud detection system modeled on Stripe Radar: transactions stream through Kafka, get scored by an unsupervised Isolation Forest model, and results are queryable via a FastAPI service backed by Postgres. Includes a dual-queue priority pattern isolating latency-sensitive requests from bulk stream backlog (measured at ~20ms vs. 8.7–55s under load), containerized services deployed via Helm, and GitOps continuous delivery through ArgoCD on Kubernetes.",
    meta: "2026 · ML/Infra · Kafka · Isolation Forest · Kubernetes",
    image: "/projects/detection.png",
  },
];
