
import { useState } from "react";
import {
  GitFork,
  Plus,
  Search,
  GitBranch,
  Clock3,
  CheckCircle2,
  LoaderCircle,
  AlertCircle,
  Code2,
  RefreshCw,
  Trash2,
  ExternalLink,
  BookOpen,
  Sparkles,
  X,
} from "lucide-react";

const initialRepositories = [
  {
    id: 1,
    name: "AI-Code-Reviewer",
    owner: "adarsh0018912",
    description: "An AI-powered code review platform that analyzes code and suggests improvements.",
    language: "JavaScript",
    branch: "main",
    status: "Analyzed",
    updated: "2 days ago",
    stars: 24,
    visibility: "Public",
  },
  {
    id: 2,
    name: "Ecommerce-Platform",
    owner: "adarsh0018912",
    description: "A full-stack e-commerce application with authentication and product management.",
    language: "TypeScript",
    branch: "main",
    status: "Processing",
    updated: "Yesterday",
    stars: 12,
    visibility: "Private",
  },
  {
    id: 3,
    name: "Task-Management-App",
    owner: "adarsh0018912",
    description: "A task management application with team collaboration features.",
    language: "JavaScript",
    branch: "develop",
    status: "Analyzed",
    updated: "4 days ago",
    stars: 8,
    visibility: "Public",
  },
  {
    id: 4,
    name: "Weather-Dashboard",
    owner: "adarsh0018912",
    description: "A weather dashboard that displays forecasts using external APIs.",
    language: "Python",
    branch: "main",
    status: "Failed",
    updated: "1 week ago",
    stars: 5,
    visibility: "Public",
  },
];

const filters = ["All", "Analyzed", "Processing", "Failed"];

function Repository() {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [repoUrl, setRepoUrl] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [error, setError] = useState("");

  const analyzed = repositories.filter(
    (repo) => repo.status === "Analyzed"
  ).length;

  const processing = repositories.filter(
    (repo) => repo.status === "Processing"
  ).length;

  const failed = repositories.filter(
    (repo) => repo.status === "Failed"
  ).length;

  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || repo.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  function handleAddRepository(event) {
    event.preventDefault();

    const url = repoUrl.trim();

  const githubPattern =
  /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+\/?$/;

    if (!githubPattern.test(url)) {
      setError("Enter a valid GitHub repository URL.");
      return;
    }

   const parts = url.replace(/\/$/, "").split("/");
    const owner = parts[parts.length - 2];
const name = parts[parts.length - 1].replace(/\.git$/, "");
    const alreadyExists = repositories.some(
      (repo) =>
        repo.owner.toLowerCase() === owner.toLowerCase() &&
        repo.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      setError("This repository has already been added.");
      return;
    }

    const newRepository = {
      id: Date.now(),
      name,
      owner,
      description: "Repository added. Ready for codebase analysis.",
      language: "Unknown",
      branch: "main",
      status: "Processing",
      updated: "Just now",
      stars: 0,
      visibility: "Unknown",
    };

    setRepositories((previous) => [newRepository, ...previous]);
    setRepoUrl("");
    setError("");
    setActiveFilter("All");
    setSearch("");
  }

  function handleReanalyze(id) {
    setRepositories((previous) =>
      previous.map((repo) =>
        repo.id === id
          ? { ...repo, status: "Processing" }
          : repo
      )
    );
  }

  function handleDelete(id) {
    setRepositories((previous) =>
      previous.filter((repo) => repo.id !== id)
    );
  }

  function getStatusIcon(status) {
    if (status === "Analyzed") return <CheckCircle2 size={14} />;
    if (status === "Processing") return <LoaderCircle size={14} />;
    return <AlertCircle size={14} />;
  }

  function getStatusStyle(status) {
    if (status === "Analyzed") {
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    }

    if (status === "Processing") {
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    }

    return "text-red-400 bg-red-400/10 border-red-400/20";
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-5 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Repositories
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Connect, manage and analyze your GitHub codebases.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 border border-zinc-800 rounded-lg px-3 py-2 w-fit">
          <Sparkles size={15} className="text-violet-400" />
          AI Codebase Workspace
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <StatCard
          title="Total Repositories"
          value={repositories.length}
          icon={<GitFork size={19} />}
          color="text-violet-400"
        />

        <StatCard
          title="Analyzed"
          value={analyzed}
          icon={<CheckCircle2 size={19} />}
          color="text-emerald-400"
        />

        <StatCard
          title="Processing"
          value={processing}
          icon={<LoaderCircle size={19} />}
          color="text-blue-400"
        />

        <StatCard
          title="Failed"
          value={failed}
          icon={<AlertCircle size={19} />}
          color="text-red-400"
        />

      </div>

      {/* Add Repository */}
      <div className="border border-zinc-800 bg-[#111113] rounded-xl p-5 md:p-6 mb-8">

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
            <Plus size={19} />
          </div>

          <h2 className="text-lg font-medium">
            Add a Repository
          </h2>
        </div>

        <p className="text-sm text-zinc-500 mb-5">
          Connect a GitHub repository to generate documentation and
          understand your codebase.
        </p>

        <form
          onSubmit={handleAddRepository}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <GitFork
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              value={repoUrl}
              onChange={(event) => {
                setRepoUrl(event.target.value);
                setError("");
              }}
              placeholder="https://github.com/username/repository"
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:border-violet-500 transition"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg px-5 py-3 text-sm font-medium transition"
          >
            <Plus size={17} />
            Add Repository
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-400 mt-3">
            {error}
          </p>
        )}

        <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500">
          <AlertCircle size={14} />
          Public repositories and authorized private repositories will be supported.
        </div>

      </div>

      {/* Repository List Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        <div>
          <h2 className="text-lg font-semibold">
            Your Repositories
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Manage all your connected codebases.
          </p>
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search repositories..."
            className="w-full bg-[#111113] border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-violet-500"
          />
        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-xs font-medium border transition ${
              activeFilter === filter
                ? "bg-violet-500/10 border-violet-500/40 text-violet-300"
                : "bg-[#111113] border-zinc-800 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            {filter}
            {filter === "All" && (
              <span className="ml-2">{repositories.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Repository Cards */}
      {filteredRepositories.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-xl py-16 text-center">
          <BookOpen size={30} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-sm font-medium text-zinc-300">
            No repositories found
          </h3>
          <p className="text-xs text-zinc-500 mt-2">
            Try another search or change your filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredRepositories.map((repo) => (
            <div
              key={repo.id}
              className="border border-zinc-800 bg-[#111113] rounded-xl p-5 hover:border-zinc-700 transition"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 bg-zinc-800/70 rounded-lg text-zinc-300">
                    <GitFork size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {repo.owner}
                    </p>
                  </div>
                </div>

                <span
                  className={`flex items-center gap-1.5 text-xs border rounded-full px-2.5 py-1 shrink-0 ${getStatusStyle(repo.status)}`}
                >
                  {getStatusIcon(repo.status)}
                  {repo.status}
                </span>

              </div>

              <p className="text-sm text-zinc-400 leading-6 mt-4 min-h-12">
                {repo.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 mt-4">

                <span className="flex items-center gap-1.5">
                  <Code2 size={14} />
                  {repo.language}
                </span>

                <span className="flex items-center gap-1.5">
                  <GitBranch size={14} />
                  {repo.branch}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {repo.updated}
                </span>

              </div>

              <div className="border-t border-zinc-800 mt-5 pt-4 flex items-center justify-between gap-3">

                <span className="text-xs text-zinc-500">
                  {repo.visibility} · {repo.stars} stars
                </span>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() => handleReanalyze(repo.id)}
                    title="Re-analyze repository"
                    className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-violet-400 hover:border-violet-500/40 transition"
                  >
                    <RefreshCw size={15} />
                  </button>

                  <button
                    onClick={() => handleDelete(repo.id)}
                    title="Remove repository"
                    className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/40 transition"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-zinc-600 text-center mt-8">
        Demo mode · Repository data is currently stored in React state only.
      </p>

    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="border border-zinc-800 bg-[#111113] rounded-xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{title}</p>
        <span className={color}>{icon}</span>
      </div>

      <h2 className="text-2xl font-semibold mt-4">
        {value}
      </h2>
    </div>
  );
}

export default Repository;
