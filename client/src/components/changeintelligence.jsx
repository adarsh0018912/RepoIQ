
import {
  GitCommit,
  FileCode,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";

function ChangeIntelligence() {
  const changes = [
    {
      file: "AuthController.js",
      type: "Authentication",
      commit: "Updated JWT token validation",
      author: "adarsh0018912",
      time: "2 hours ago",
      status: "Outdated",
      additions: 24,
      deletions: 8,
    },
    {
      file: "ProductRoutes.js",
      type: "API Routes",
      commit: "Added product filtering endpoint",
      author: "adarsh0018912",
      time: "Yesterday",
      status: "Up to date",
      additions: 18,
      deletions: 4,
    },
    {
      file: "UserModel.js",
      type: "Database",
      commit: "Modified user schema",
      author: "developer",
      time: "2 days ago",
      status: "Outdated",
      additions: 12,
      deletions: 3,
    },
    {
      file: "README.md",
      type: "Documentation",
      commit: "Updated installation instructions",
      author: "adarsh0018912",
      time: "3 days ago",
      status: "Up to date",
      additions: 10,
      deletions: 2,
    },
  ];

  const stats = [
    { label: "Commits Analyzed", value: "48", icon: GitCommit },
    { label: "Files Changed", value: "16", icon: FileCode },
    { label: "Docs Outdated", value: "4", icon: AlertTriangle },
    { label: "Docs Up to Date", value: "12", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-5 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Change Intelligence</h1>
          <p className="text-sm text-zinc-500 mt-2">
            Track code changes and monitor documentation freshness.
          </p>
        </div>

        <select className="bg-[#111113] border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none">
          <option>AI-Code-Reviewer</option>
          <option>Ecommerce-Platform</option>
          <option>Task-Management-App</option>
          <option>Weather-Dashboard</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="bg-[#111113] border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{item.label}</p>
                <Icon size={19} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-semibold mt-4">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Documentation Health */}
      <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="font-semibold">Documentation Health</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Current documentation freshness overview
            </p>
          </div>
          <span className="text-sm text-amber-400">
            4 documents need attention
          </span>
        </div>

        <div className="w-full bg-zinc-800 h-3 rounded-full mt-6 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-[75%]" />
        </div>

        <div className="flex justify-between text-xs text-zinc-500 mt-3">
          <span>12 documents up to date</span>
          <span>75% healthy</span>
        </div>
      </div>

      {/* Recent Changes */}
      <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="font-semibold">Recent Code Changes</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Recent commits and their documentation impact
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg transition">
            <RefreshCw size={15} />
            Analyze Changes
          </button>
        </div>

        <div className="space-y-4">
          {changes.map((change) => (
            <div
              key={change.file}
              className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-violet-500/10 text-violet-400 p-2 rounded-lg">
                    <FileCode size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">{change.file}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{change.type}</p>
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full w-fit ${
                    change.status === "Outdated"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {change.status}
                </span>
              </div>

              <p className="text-sm text-zinc-300 mt-4">{change.commit}</p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <GitBranch size={13} />
                  {change.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {change.time}
                </span>
                <span className="text-emerald-400">
                  +{change.additions}
                </span>
                <span className="text-red-400">
                  -{change.deletions}
                </span>
              </div>

              {change.status === "Outdated" && (
                <button className="flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 mt-4">
                  <FileText size={14} />
                  Regenerate Documentation
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-zinc-600 mt-5 text-center">
        Demonstration data. GitHub commit analysis and documentation comparison will be connected later.
      </p>
    </div>
  );
}

export default ChangeIntelligence;
