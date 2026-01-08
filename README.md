# NotesBuff

NotesBuff is an AI-assisted learning platform designed to help students **identify gaps in their notes** rather than replacing the learning process with automated note-taking. The core philosophy of NotesBuff is that *actively taking notes is essential for understanding and retention*, and AI should be used to **augment reflection and review**, not replace cognition.

Instead of generating notes for students, NotesBuff analyzes *student-authored notes*, compares them against course materials, and provides structured feedback on coverage, missing concepts, and areas that require deeper study.

---

## 🧠 Core Idea

Most AI note-taking tools optimize for convenience. NotesBuff optimizes for **learning quality**.

The system:

1. Ingests student-created notes (PDFs, plaintext, images)
2. Extracts and normalizes the textual content
3. Builds a semantic knowledge representation of the notes
4. Compares that representation against official course materials
5. Surfaces **conceptual gaps**, weak coverage areas, and targeted study recommendations

This approach preserves the pedagogical benefits of note-taking while providing objective, AI-assisted feedback.

---

## ✨ Key Features

### 📄 Note Ingestion

* Upload notes as PDFs, plaintext files, or images
* Store original files and metadata in PostgreSQL
* Designed to support both typed and handwritten notes

### 🔍 Text Extraction Pipeline

* Plaintext decoding (UTF-8)
* PDF text extraction using Apache PDFBox
* OCR pipeline (planned) for handwritten or photographed notes
* Text cleaning and normalization prior to analysis

### 🧩 Semantic Analysis

* Notes are chunked into manageable semantic units
* Each chunk is embedded using a large language model embedding API
* Embeddings are stored in PostgreSQL using `pgvector`

### 📊 Coverage & Gap Detection

* Notes are compared semantically against course materials
* Similarity metrics identify:

  * Well-covered topics
  * Weakly covered concepts
  * Missing or absent material

### 🧪 Practice Test Agents (Planned)

NotesBuff includes a multi-agent evaluation framework:

* **Notes-only agent** – answers using student notes alone
* **Notes + course materials agent** – simulates ideal studying
* **Notes + materials + internet agent** – upper bound reference

Differences in performance are used to generate actionable study metrics.

---

## 🏗️ System Architecture

```
[ React Frontend ]
        ↓ HTTP (JSON / multipart)
[ Spring Boot Backend ]
        ↓
[ PostgreSQL + pgvector ]
        ↓
[ LLM APIs (Embeddings & Analysis) ]
```

The system follows a **clean separation of concerns**:

* Frontend handles UI and user interaction
* Backend handles deterministic logic, data persistence, and AI orchestration
* LLMs are treated as *tools*, not decision-makers

---

## 🧰 Tech Stack

### Backend

* **Java 17+**
* **Spring Boot** (REST API)
* **Spring Web** – HTTP endpoints
* **Spring Data JPA** – persistence layer
* **PostgreSQL** – primary database
* **pgvector** – semantic embedding storage

### Frontend

* **React**
* **TypeScript**
* **Vite** – fast dev/build tooling
* Fetch API for backend communication

### AI / NLP

* LLM embedding APIs (e.g., OpenAI, Cohere)
* Vector similarity search via pgvector
* Future support for local or open-source models

---

## 📁 Project Structure

```
NotesBuff/
├── notesbuff-backend/   # Spring Boot application
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── repositories/
│
├── notesbuff-frontend/  # React application
│   ├── src/
│   ├── public/
│   └── vite.config.ts
│
└── README.md
```

---

## 🗄️ Data Model Overview

### Notes

* Original file bytes
* File metadata (name, type, upload time)
* Extracted text

### Note Chunks

* Reference to parent note
* Cleaned text chunk
* Vector embedding

This design enables fine-grained semantic comparison instead of coarse document-level analysis.

---

## 🚀 Local Development

### Prerequisites

* Java 17+
* Node.js 18+
* PostgreSQL 14+

### Backend Setup

1. Create a local PostgreSQL database
2. Enable pgvector extension
3. Configure `application.properties`
4. Run Spring Boot application

### Frontend Setup

```bash
cd notesbuff-frontend
npm install
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:8080
```

---

## 🔐 Security & Cost Control (Planned)

* API keys stored as environment variables
* Rate limiting on LLM calls
* Optional caching of embeddings and analysis results

---

## 🎯 Design Philosophy

* **Human-in-the-loop**: Students remain the primary agents of learning
* **Determinism first**: AI outputs are advisory, not authoritative
* **Transparency**: Clear reasoning behind analysis and recommendations
* **Scalability**: Designed to scale from local dev to cloud deployment

---

## 📈 Roadmap

* [ ] OCR support for handwritten notes
* [ ] Course material ingestion pipeline
* [ ] Practice test generation agent
* [ ] Embedding similarity dashboards
* [ ] Async job processing for large uploads
* [ ] Cloud deployment (Render/Vercel/Supabase)

---

## 📚 Motivation

NotesBuff was created to explore how AI can be used to **strengthen learning rather than replace it**. The project emphasizes system reliability, explainability, and pedagogical integrity while serving as a hands-on exploration of applied AI, backend systems, and human-centered design.

---

## 📜 License

MIT License (subject to change)

---

*NotesBuff is an active learning project and will continue evolving as new ideas and insights emerge.*
