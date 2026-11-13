
import { useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import {
  Network,
  GitBranch,
  Folder,
  FileCode,
  Layers,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

const FileNode = ({ data }) => {
  return (
    <div className="min-w-[280px] rounded-xl border border-zinc-700 bg-[#18181b] p-5 shadow-lg">
      <Handle type="target" position={Position.Left} />

      <div className="flex items-center gap-3">
        <FileCode size={21} className="text-violet-400" />
        <p className="text-base font-semibold text-zinc-100">
          {data.label}
        </p>
      </div>

      <p className="mt-3 break-all text-sm text-zinc-400">
        {data.path}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-violet-500/10 px-2 py-1 text-xs text-violet-300">
          {data.language}
        </span>
        <span className="rounded-md bg-zinc-700/50 px-2 py-1 text-xs text-zinc-300">
          {data.functions.length} functions
        </span>
        <span className="rounded-md bg-zinc-700/50 px-2 py-1 text-xs text-zinc-300">
          {data.classes.length} classes
        </span>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const nodeTypes = {
  fileNode: FileNode,
};

const getLayoutedElements = (nodes, edges) => {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: "LR",
    nodesep: 80,
    ranksep: 140,
  });

  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: 300,
      height: 155,
    });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const position = graph.node(node.id);

    return {
      ...node,
      position: {
        x: position.x - 150,
        y: position.y - 77,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
};

function Architecture() {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [architecture, setArchitecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`${API_URL}/repositories`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch repositories");
        }

        setRepositories(result.data || []);

        if (result.data && result.data.length > 0) {
          setSelectedRepo(result.data[0].id);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRepositories();
  }, []);

  useEffect(() => {
    if (!selectedRepo) {
      setArchitecture(null);
      return;
    }

    const fetchArchitecture = async () => {
      setLoading(true);
      setError("");
      setArchitecture(null);

      try {
        const response = await fetch(
          `${API_URL}/architecture/${selectedRepo}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch architecture");
        }

        setArchitecture(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArchitecture();
  }, [selectedRepo]);

  const graph = useMemo(() => {
    if (!architecture) {
      return { nodes: [], edges: [] };
    }

    const nodes = architecture.nodes.map((file) => ({
      id: file.id,
      type: "fileNode",
      data: {
        label: file.label,
        path: file.path,
        language: file.language,
        functions: file.functions || [],
        classes: file.classes || [],
      },
      position: { x: 0, y: 0 },
    }));

    const edges = architecture.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#8b5cf6",
      },
      style: {
        stroke: "#8b5cf6",
        strokeWidth: 1.8,
      },
      labelStyle: {
        fill: "#a1a1aa",
        fontSize: 11,
      },
    }));

    return getLayoutedElements(nodes, edges);
  }, [architecture]);

  const directoryCount = useMemo(() => {
    if (!architecture) return 0;

    return new Set(
      architecture.nodes.map((node) => {
        const parts = node.path.split("/");
        parts.pop();
        return parts.join("/");
      })
    ).size;
  }, [architecture]);

  const stats = [
    {
      label: "Source Files",
      value: architecture?.summary.totalFiles ?? 0,
      icon: FileCode,
    },
    {
      label: "Dependencies",
      value: architecture?.summary.totalConnections ?? 0,
      icon: GitBranch,
    },
    {
      label: "Directories",
      value: directoryCount,
      icon: Folder,
    },
    {
      label: "External Packages",
      value: architecture?.summary.externalDependencyCount ?? 0,
      icon: Layers,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] p-5 text-zinc-100 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Architecture</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Explore real repository files and their dependencies.
          </p>
        </div>

        <select
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-[#111113] px-4 py-3 text-sm outline-none"
        >
          <option value="">Select Repository</option>

          {repositories.map((repo) => (
            <option key={repo.id} value={repo.id}>
              {repo.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-800 bg-[#111113] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{item.label}</p>
                <Icon size={19} className="text-violet-400" />
              </div>

              <h2 className="mt-4 text-2xl font-semibold">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Architecture Graph */}
      <div className="mb-8 rounded-2xl border border-zinc-800 bg-[#111113] p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Repository Dependency Graph</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Each node represents a source file. Edges represent imports.
            </p>
          </div>

          <Network size={20} className="text-violet-400" />
        </div>

        <div className="h-[800px] overflow-hidden rounded-xl border border-zinc-800 bg-[#09090b]">
          {loading ? (
            <div className="flex h-full items-center justify-center gap-3 text-sm text-zinc-400">
              <RefreshCw size={18} className="animate-spin" />
              Analyzing repository architecture...
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center px-5 text-center text-sm text-red-400">
              {error}
            </div>
          ) : !selectedRepo ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              Add a repository first to view its architecture.
            </div>
          ) : graph.nodes.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              No architecture data found.
            </div>
          ) : (
            <ReactFlow
              nodes={graph.nodes}
              edges={graph.edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.05 }}
              minZoom={0.45}
              maxZoom={2.5}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#27272a" gap={25} />
              <Controls />

              <MiniMap
                nodeColor="#8b5cf6"
                maskColor="rgba(9, 9, 11, 0.7)"
                style={{
                  backgroundColor: "#18181b",
                  width: 160,
                  height: 110,
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                }}
              />
            </ReactFlow>
          )}
        </div>
      </div>

      {/* Module and Dependency Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6">
          <h2 className="mb-5 font-semibold">Language Overview</h2>

          <div className="space-y-4">
            {architecture &&
              Object.entries(
                architecture.nodes.reduce((languages, file) => {
                  languages[file.language] =
                    (languages[file.language] || 0) + 1;

                  return languages;
                }, {})
              ).map(([language, count]) => (
                <div
                  key={language}
                  className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <FileCode size={19} className="text-violet-400" />
                    <span className="text-sm">{language}</span>
                  </div>

                  <span className="text-sm text-zinc-400">
                    {count} files
                  </span>
                </div>
              ))}

            {!architecture && (
              <p className="text-sm text-zinc-500">
                Select a repository to see its languages.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6">
          <h2 className="mb-5 font-semibold">External Dependencies</h2>

          <div className="flex flex-wrap gap-2">
            {architecture?.externalDependencies?.map((dependency) => (
              <span
                key={dependency}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-emerald-400"
              >
                {dependency}
              </span>
            ))}

            {!architecture?.externalDependencies?.length && (
              <p className="text-sm text-zinc-500">
                No external dependencies found.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Architecture;
