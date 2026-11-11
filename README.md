# RepoIQ 🚀
### AI-Powered Repository Documentation & Codebase Intelligence Platform

RepoIQ is an intelligent developer tool designed to understand GitHub repositories, analyze source code, manage technical documentation, and provide deeper insights into software architecture.

The goal of RepoIQ is to simplify codebase understanding and reduce the time developers spend exploring unfamiliar projects.

---

## 🎯 Project Vision

Understanding a large or unfamiliar codebase can be time-consuming, especially when documentation is incomplete or outdated.

RepoIQ aims to solve this problem by combining GitHub integration, automated code analysis, documentation management, and AI-powered codebase intelligence into a single platform.

---

## ✨ Key Features

### 1. GitHub Repository Integration
- Connect repositories using GitHub repository URLs.
- Fetch repository details and metadata.
- Retrieve branches and recent commits.
- Explore repository file structures.
- Fetch individual source file contents.

### 2. Code Analysis Engine
- Detect programming languages based on file extensions.
- Identify source files while excluding unnecessary directories.
- Extract functions, classes, and imports.
- Analyze repository code structure.
- Generate structured code analysis data.

### 3. Documentation Management
- Create and manage technical documentation.
- Support multiple documentation types:
  - README
  - API Reference
  - Setup Guide
  - Module Documentation
- Retrieve, update, and delete documentation.

### 4. Architecture Intelligence
- Analyze code dependencies and relationships.
- Prepare structured data for architecture visualization.
- Help developers understand project organization.

### 5. AI-Powered Codebase Intelligence (Planned)
- Generate documentation using an LLM.
- Ask predefined questions about a codebase.
- Understand project architecture and important code flows.
- Retrieve relevant code context using RAG.
- Provide answers grounded in repository source code.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose (planned) |
| GitHub Integration | GitHub REST API |
| AI / LLM | Google Gemini (planned) |
| Retrieval | RAG, Embeddings, Vector Search (planned) |
| Version Control | Git, GitHub |

---

## 📁 Project Structure

```text
RepoIQ/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/adarsh0018912/RepoIQ.git
cd RepoIQ
```

### 2. Setup Frontend

```bash
cd client
npm install
npm run dev
```

### 3. Setup Backend

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The backend currently runs on:

```text
http://localhost:5000
```

---

## 🔌 Backend API Overview

### Repository Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/repositories` | Add a repository |
| GET | `/api/repositories` | Get all repositories |
| GET | `/api/repositories/:id` | Get repository details |
| DELETE | `/api/repositories/:id` | Delete a repository |

### GitHub Integration

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/repositories/:id/branches` | Get branches |
| GET | `/api/repositories/:id/commits` | Get recent commits |
| GET | `/api/repositories/:id/files` | Get repository file tree |
| GET | `/api/repositories/:id/file` | Get individual file content |

### Code Analysis

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/repositories/:id/analysis` | Analyze repository source code |

### Documentation Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/documentation/:id` | Create documentation |
| GET | `/api/documentation/:id` | Get all documentation |
| GET | `/api/documentation/:id/:docId` | Get a specific document |
| PUT | `/api/documentation/:id/:docId` | Update documentation |
| DELETE | `/api/documentation/:id/:docId` | Delete documentation |

---

## 🚧 Development Status

RepoIQ is under active development.

- [x] Frontend dashboard and core pages
- [x] Repository management backend
- [x] GitHub API integration
- [x] Basic code analysis engine
- [x] Documentation CRUD service and controllers
- [ ] Complete documentation API testing
- [ ] Architecture analysis engine
- [ ] MongoDB integration
- [ ] Gemini API integration
- [ ] Code chunking and embeddings
- [ ] RAG-based codebase question answering
- [ ] Frontend and backend integration

---

## 🔮 Future Goals

- Intelligent documentation generation.
- Context-aware codebase question answering.
- Architecture and dependency visualization.
- More accurate code structure extraction.
- Scalable repository analysis.

---

## 👨‍💻 Author

**Adarsh Kumar Singh**

GitHub: [@adarsh0018912](https://github.com/adarsh0018912)

---

⭐ If you find RepoIQ interesting, consider giving the repository a star!

**RepoIQ — Understand Your Codebase. Smarter.**
