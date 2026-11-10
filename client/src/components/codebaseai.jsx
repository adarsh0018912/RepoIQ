
import { useState } from "react";
import {
  Brain,
  Send,
  Sparkles,
  Code2,
  Network,
  FileText,
  Plus,
} from "lucide-react";

function CodebaseAI() {
  const [repository, setRepository] = useState("AI-Code-Reviewer");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const suggestions = [
    "Explain this project",
    "Explain the tech stack",
    "Explain the project architecture",
    "Explain an important code flow",
    "How do I run this project?",
  ];

  const questionCount = messages.length;

  const handleSend = () => {
    if (!message.trim() || questionCount >= 5) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: message.trim() },
    ]);

    setMessage("");
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
  };

  const handleRepositoryChange = (e) => {
    setRepository(e.target.value);
    handleNewChat();
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-5 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Codebase AI</h1>
          <p className="text-sm text-zinc-500 mt-2">
            Ask questions and understand your codebase.
          </p>
        </div>

        <select
          value={repository}
          onChange={handleRepositoryChange}
          className="bg-[#111113] border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none"
        >
          <option>AI-Code-Reviewer</option>
          <option>Ecommerce-Platform</option>
          <option>Task-Management-App</option>
          <option>Weather-Dashboard</option>
        </select>
      </div>

      {/* Chat Workspace */}
      <div className="border border-zinc-800 bg-[#111113] rounded-2xl flex flex-col min-h-[600px]">

        {/* Chat Header */}
        <div className="flex items-center justify-between gap-3 p-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="bg-violet-500/10 text-violet-400 p-2 rounded-lg">
              <Brain size={21} />
            </div>

            <div>
              <h2 className="text-sm font-semibold">RepoIQ Assistant</h2>
              <p className="text-xs text-zinc-500">
                Analyzing: {repository}
              </p>
              <p className="text-xs text-violet-400 mt-1">
                {questionCount}/5 questions used
              </p>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            disabled={questionCount === 0}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 rounded-lg px-3 py-2 disabled:opacity-40"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-6">

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="bg-violet-500/10 text-violet-400 p-4 rounded-2xl mb-5">
                <Sparkles size={30} />
              </div>

              <h2 className="text-xl font-semibold">
                Understand your codebase with AI
              </h2>

              <p className="text-sm text-zinc-500 mt-3 max-w-md leading-6">
                Ask questions about your repository, explore its architecture,
                understand functions and discover how different files work together.
              </p>

              {/* Suggested Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
                {suggestions.map((question, index) => (
                  <button
                    key={question}
                    onClick={() => setMessage(question)}
                    className="flex items-center gap-3 text-left border border-zinc-800 hover:border-violet-500/50 bg-zinc-900/50 rounded-xl p-4 text-sm text-zinc-300 transition"
                  >
                    {index === 0 && <Brain size={17} />}
                    {index === 1 && <Code2 size={17} />}
                    {index === 2 && <Network size={17} />}
                    {index === 3 && <FileText size={17} />}
                    {index === 4 && <Sparkles size={17} />}
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <div key={index} className="flex justify-end">
                  <div className="bg-violet-600 text-white rounded-2xl rounded-br-sm px-5 py-3 max-w-[85%] text-sm leading-6">
                    {msg.content}
                  </div>
                </div>
              ))}

              <p className="text-xs text-zinc-500 text-center mt-4">
                Your questions are recorded in this session.
                AI responses will be connected through Gemini.
              </p>
            </div>
          )}

        </div>

        {/* Message Input */}
        <div className="p-5 border-t border-zinc-800">
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4">
            <input
              value={message}
              disabled={questionCount >= 5}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={
                questionCount >= 5
                  ? "Question limit reached. Start a new chat."
                  : "Ask a question about your codebase..."
              }
              className="flex-1 min-w-0 bg-transparent py-4 text-sm outline-none placeholder:text-zinc-600 disabled:opacity-50"
            />

            <button
              onClick={handleSend}
              disabled={!message.trim() || questionCount >= 5}
              className="bg-violet-600 disabled:opacity-40 text-white p-2 rounded-lg"
              title="Send question"
            >
              <Send size={17} />
            </button>
          </div>

          <p className="text-xs text-zinc-600 mt-3 text-center">
            {questionCount >= 5
              ? "You have reached your 5-question limit."
              : `${5 - questionCount} questions remaining in this session.`}
          </p>
        </div>

      </div>
    </div>
  );
}

export default CodebaseAI;
