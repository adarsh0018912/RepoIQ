
import {
  Network,
  GitBranch,
  Folder,
  FileCode,
  Layers,
  Database,
  Server,
  Globe,
  ArrowDown,
} from "lucide-react";

function Architecture() {
  const modules = [
    {
      name: "Frontend",
      description: "React components and user interface",
      files: 18,
      icon: Globe,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      name: "Backend API",
      description: "Express routes and controllers",
      files: 12,
      icon: Server,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      name: "Database",
      description: "MongoDB models and schemas",
      files: 8,
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  const dependencies = [
    { name: "App.jsx", connects: "Repository.jsx", type: "Component import" },
    { name: "server.js", connects: "routes/", type: "API routing" },
    { name: "routes/", connects: "models/", type: "Database interaction" },
    { name: "models/", connects: "MongoDB", type: "Data access" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-5 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Architecture</h1>
          <p className="text-sm text-zinc-500 mt-2">
            Explore your repository structure and module relationships.
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
        {[
          { label: "Total Modules", value: "12", icon: Layers },
          { label: "Dependencies", value: "28", icon: GitBranch },
          { label: "Source Files", value: "38", icon: FileCode },
          { label: "Directories", value: "9", icon: Folder },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="bg-[#111113] border border-zinc-800 rounded-xl p-5">
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-500">{item.label}</p>
                <Icon size={19} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-semibold mt-4">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Architecture Diagram */}
      <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold">System Architecture</h2>
            <p className="text-xs text-zinc-500 mt-1">
              High-level module relationships
            </p>
          </div>
          <Network size={20} className="text-violet-400" />
        </div>

        <div className="flex flex-col items-center gap-3 py-5">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <div key={module.name} className="w-full max-w-lg flex flex-col items-center">
                <div className="w-full border border-zinc-800 bg-zinc-900/70 rounded-xl p-5 flex items-center gap-4">
                  <div className={`${module.bg} ${module.color} p-3 rounded-lg`}>
                    <Icon size={23} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{module.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {module.description}
                    </p>
                  </div>

                  <span className="text-xs text-zinc-500">
                    {module.files} files
                  </span>
                </div>

                {index !== modules.length - 1 && (
                  <ArrowDown size={20} className="text-zinc-600 my-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-6">
          <h2 className="font-semibold mb-5">Module Overview</h2>

          <div className="space-y-4">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <div key={module.name} className="flex items-center gap-3 border-b border-zinc-800 pb-4 last:border-0">
                  <div className={`${module.bg} ${module.color} p-2 rounded-lg`}>
                    <Icon size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{module.name}</p>
                    <p className="text-xs text-zinc-500">{module.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dependencies */}
        <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-6">
          <h2 className="font-semibold mb-5">Dependency Relationships</h2>

          <div className="space-y-4">
            {dependencies.map((dependency, index) => (
              <div key={index} className="border border-zinc-800 bg-zinc-900/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-violet-400">{dependency.name}</span>
                  <ArrowDown size={15} className="text-zinc-500" />
                  <span className="text-emerald-400">{dependency.connects}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">{dependency.type}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <p className="text-xs text-zinc-600 mt-5 text-center">
        Demonstration architecture data. Actual repository analysis will be connected later.
      </p>
    </div>
  );
}

export default Architecture;
