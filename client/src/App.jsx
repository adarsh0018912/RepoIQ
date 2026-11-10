
import { useState } from "react";

import Repository from "./components/repository";
import Documentation from "./components/documentation";
import CodebaseAI from "./components/codebaseai";
import Architecture from "./components/architecture";
import ChangeIntelligence from "./components/changeintelligence";
import SettingsPage from "./components/settings";

import {
  LayoutDashboard,
  GitBranch,
  FileText,
  Brain,
  Network,
  Settings,
  Search,
  Bell,
  Plus,
  Code2,
  GitFork,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Repositories", icon: GitBranch },
    { name: "Documentation", icon: FileText }, 
    { name: "Codebase AI", icon: Brain },
    { name: "Architecture", icon: Network },
    { name: "Change Intelligence", icon: GitBranch },
    { name: "Settings", icon: Settings },
  ];

  function handleSubmit(event) {
    event.preventDefault();

    if (!repoUrl.trim()) {
      alert("Please enter a GitHub repository URL.");
      return;
    }

    alert("Repository URL: " + repoUrl);
  }

  function handleNavigation(page) {
    setActivePage(page);
    setSidebarOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 p-5 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Logo */}
        <div className="mb-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2">
              <Code2 size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold">RepoIQ</h1>
              <p className="text-xs text-zinc-500">
                Intelligent documentation
              </p>
            </div>
          </div>

          <button
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Workspace
        </p>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                  activePage === item.name
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-zinc-800 pt-4">
          <p className="text-xs text-zinc-500">
            RepoIQ · Codebase Intelligence
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={21} />
            </button>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold sm:text-xl">
                {activePage}
              </h2>

              <p className="mt-1 hidden text-sm text-zinc-500 sm:block">
                Understand your codebase, automatically.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <button
              aria-label="Notifications"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800"
            >
              <Bell size={19} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
              U
            </div>
          </div>
        </header>

        {/* Overview */}
        {activePage === "Overview" && (
          <section className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-indigo-400">
                AI-POWERED CODE INTELLIGENCE
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Your codebase,{" "}
                <span className="text-indigo-400">understood.</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Generate documentation, explore architecture, and ask
                questions about your code using AI.
              </p>
            </div>

            {/* Repository input */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-zinc-800 p-2">
                  <GitFork size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Connect a repository</h3>
                  <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                    Start by entering a public GitHub repository URL.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4">
                  <Search size={18} className="shrink-0 text-zinc-500" />

                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-zinc-600"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500"
                >
                  <Plus size={18} />
                  Add repository
                </button>
              </form>
            </div>

            {/* Feature cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <FileText className="mb-4 text-indigo-400" size={23} />
                <h3 className="font-semibold">Smart documentation</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Generate useful README files and code explanations.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <Brain className="mb-4 text-indigo-400" size={23} />
                <h3 className="font-semibold">Ask your codebase</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Ask questions and get answers grounded in your source files.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:col-span-2 lg:col-span-1">
                <Network className="mb-4 text-indigo-400" size={23} />
                <h3 className="font-semibold">Architecture insights</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Explore how modules and files relate to each other.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* Repositories */}
        {activePage === "Repositories" && (
          <section className="p-4 sm:p-6 lg:p-8">
            <Repository />
          </section>
        )}

        {/* Documentation */}
        {activePage === "Documentation" && (
          <section className="p-4 sm:p-6 lg:p-8">
            <Documentation />
          </section>
        )}

        {/* Codebase AI */}
        {activePage === "Codebase AI" && (
          <section className="p-4 sm:p-6 lg:p-8">
            <CodebaseAI />
          </section>
        )}

        {/* Architecture */}
        {activePage === "Architecture" && (
          <section className="p-4 sm:p-6 lg:p-8">
            <Architecture />
          </section>
        )}

        {/* Change Intelligence */}
        {activePage === "Change Intelligence" && (
          <section className="p-4 sm:p-6 lg:p-8">
            <ChangeIntelligence />
          </section>
        )}

        {/* Settings */}
        {activePage === "Settings" && (
          <section className="p-4 sm:p-6 lg:p-8">
            <SettingsPage />
          </section>
        )}

      </main>
    </div>
  );
}

export default App;
