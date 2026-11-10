
import { useState } from "react";
import {
  FileText,
  BookOpen,
  Code2,
  Settings,
  Search,
  Sparkles,
  Plus,
  Clock3,
  CheckCircle2,
  FileCode2,
  Download,
  Copy,
  Pencil,
  ChevronRight,
} from "lucide-react";

const documents = [
  {
    id: 1,
    title: "README.md",
    category: "README",
    repository: "AI-Code-Reviewer",
    updated: "2 hours ago",
    content: `# AI Code Reviewer

An AI-powered platform that reviews source code and suggests improvements.

## Features
- Automated code analysis
- AI-powered suggestions
- Code quality insights

## Tech Stack
- React
- Node.js
- Express
- MongoDB

## Getting Started
Clone the repository and install dependencies.

npm install
npm run dev`,
  },
  {
    id: 2,
    title: "API-Reference.md",
    category: "API Reference",
    repository: "AI-Code-Reviewer",
    updated: "Yesterday",
    content: `# API Reference

## Authentication API

POST /api/auth/register

Creates a new user account.

POST /api/auth/login

Authenticates an existing user.

## Code Review API

POST /api/review

Submits source code for AI review.`,
  },
  {
    id: 3,
    title: "Setup-Guide.md",
    category: "Setup Guide",
    repository: "Ecommerce-Platform",
    updated: "2 days ago",
    content: `# Setup Guide

## Installation

1. Clone the repository.
2. Install dependencies.
3. Configure environment variables.
4. Start the development server.

npm install
npm run dev`,
  },
  {
    id: 4,
    title: "AuthController.md",
    category: "File Documentation",
    repository: "Ecommerce-Platform",
    updated: "3 days ago",
    content: `# AuthController

Handles user authentication.

## Responsibilities
- User registration
- User login
- Token generation
- Authentication validation`,
  },
];

const categories = [
  "All Documents",
  "README",
  "API Reference",
  "Setup Guide",
  "File Documentation",
];

function Documentation() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Documents");
const [activeDocument, setActiveDocument] = useState(documents[0]);
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Documentation
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Generate, organize and manage your codebase documentation.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg px-5 py-3 text-sm font-medium transition">
          <Sparkles size={17} />
          Generate Documentation
        </button>
      </div>

      {/* Documentation Statistics */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

  <div className="border border-zinc-800 bg-[#111113] rounded-xl p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Total Documents</p>
      <FileText size={19} className="text-violet-400" />
    </div>
    <h2 className="text-2xl font-semibold mt-4">24</h2>
    <p className="text-xs text-zinc-500 mt-2">Across all repositories</p>
  </div>

  <div className="border border-zinc-800 bg-[#111113] rounded-xl p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Generated</p>
      <CheckCircle2 size={19} className="text-emerald-400" />
    </div>
    <h2 className="text-2xl font-semibold mt-4">18</h2>
    <p className="text-xs text-zinc-500 mt-2">Successfully generated</p>
  </div>

  <div className="border border-zinc-800 bg-[#111113] rounded-xl p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Drafts</p>
      <Pencil size={19} className="text-amber-400" />
    </div>
    <h2 className="text-2xl font-semibold mt-4">4</h2>
    <p className="text-xs text-zinc-500 mt-2">Waiting for review</p>
  </div>

  <div className="border border-zinc-800 bg-[#111113] rounded-xl p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Last Updated</p>
      <Clock3 size={19} className="text-blue-400" />
    </div>
    <h2 className="text-2xl font-semibold mt-4">2 hours ago</h2>
    <p className="text-xs text-zinc-500 mt-2">Latest documentation update</p>
  </div>

</div>

      {/* Documentation Workspace - we will build this next */}
      
{/* Documentation Workspace */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

  {/* Left Panel */}
  <div className="lg:col-span-4 border border-zinc-800 bg-[#111113] rounded-xl p-5">

    <h2 className="font-semibold text-sm mb-4">
      Document Explorer
    </h2>

    <div className="relative mb-5">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search documents..."
        className="w-full bg-[#09090b] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-violet-500"
      />
    </div>

    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
      Categories
    </p>

    <div className="space-y-1 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition ${
            activeCategory === category
              ? "bg-violet-500/10 text-violet-300"
              : "text-zinc-400 hover:bg-zinc-900"
          }`}
        >
          <span>{category}</span>

          <ChevronRight size={15} />
        </button>
      ))}
    </div>

    <div className="border-t border-zinc-800 pt-5">
      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
        Documents
      </p>

      <div className="space-y-2">
        {documents
          .filter((doc) => {
            const matchesCategory =
              activeCategory === "All Documents" ||
              doc.category === activeCategory;

            const matchesSearch =
              doc.title.toLowerCase().includes(search.toLowerCase()) ||
              doc.repository.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
          })
          .map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocument(doc)}
              className={`w-full text-left p-3 rounded-lg border transition ${
                activeDocument.id === doc.id
                  ? "border-violet-500/40 bg-violet-500/10"
                  : "border-transparent hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-violet-400 shrink-0" />

                <span className="text-sm truncate">
                  {doc.title}
                </span>
              </div>

              <p className="text-xs text-zinc-500 mt-2 ml-6">
                {doc.repository}
              </p>
            </button>
          ))}
      </div>
    </div>
  </div>

  {/* Right Panel */}
  <div className="lg:col-span-8 border border-zinc-800 bg-[#111113] rounded-xl p-5 md:p-6">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">

      <div>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-violet-400" />

          <h2 className="font-semibold text-sm">
            {activeDocument.title}
          </h2>
        </div>

        <p className="text-xs text-zinc-500 mt-2">
          {activeDocument.repository} · Updated {activeDocument.updated}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(activeDocument.content)}
          className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white transition"
          title="Copy document"
        >
          <Copy size={16} />
        </button>

        <button
          onClick={() => {
            const blob = new Blob([activeDocument.content], {
              type: "text/markdown",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = activeDocument.title;
            link.click();

            URL.revokeObjectURL(url);
          }}
          className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white transition"
          title="Download document"
        >
          <Download size={16} />
        </button>
      </div>

    </div>

    <div className="mt-6">
      <pre className="whitespace-pre-wrap text-sm text-zinc-300 leading-7 font-mono overflow-x-auto">
        {activeDocument.content}
      </pre>
    </div>

  </div>
</div>

    </div>
  );
}

export default Documentation;
