
import { useState } from "react";
import {
  User,
  GitBranch,
  Bell,
  Shield,
  Palette,
  Save,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

function Settings() {
  const [profile, setProfile] = useState({
    username: "Adarsh Singh",
    email: "adarsh@example.com",
  });

  const [notifications, setNotifications] = useState({
    repositoryUpdates: true,
    documentationUpdates: true,
    securityAlerts: true,
  });

  const [theme, setTheme] = useState("Dark");
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");

  const sections = [
    { name: "Profile", icon: User },
    { name: "GitHub Integration", icon: GitBranch },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Shield },
    { name: "Preferences", icon: Palette },
  ];

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);

    const element = document.getElementById(
      section.toLowerCase().replaceAll(" ", "-")
    );

    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="space-y-8 text-zinc-100">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 h-fit">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.name}
                onClick={() => handleSectionClick(section.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                  activeSection === section.name
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {section.name}
              </button>
            );
          })}
        </div>

        {/* Main Settings */}
        <div className="lg:col-span-3 space-y-6">

          {/* Profile */}
          <div
            id="profile"
            className="scroll-mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="text-indigo-400" />
              <div>
                <h3 className="font-semibold">Profile Settings</h3>
                <p className="text-xs text-zinc-500">
                  Manage your personal information.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">
                  Username
                </label>
                <input
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* GitHub Integration */}
          <div
            id="github-integration"
            className="scroll-mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="text-indigo-400" />
              <div>
                <h3 className="font-semibold">GitHub Integration</h3>
                <p className="text-xs text-zinc-500">
                  Connect your GitHub account to analyze repositories.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800 rounded-lg p-4">
              <div>
                <p className="text-sm font-medium">GitHub Account</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Not connected
                </p>
              </div>

              <button
                disabled
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-500 text-sm cursor-not-allowed"
              >
                Connect GitHub
              </button>
            </div>

            <p className="text-xs text-zinc-500 mt-3">
              GitHub OAuth will be enabled during backend integration.
            </p>
          </div>

          {/* Notifications */}
          <div
            id="notifications"
            className="scroll-mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <Bell className="text-indigo-400" />
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-xs text-zinc-500">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>

            {Object.entries({
              repositoryUpdates: "Repository updates",
              documentationUpdates: "Documentation updates",
              securityAlerts: "Security alerts",
            }).map(([key, label]) => (
              <div
                key={key}
                className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0"
              >
                <span className="text-sm text-zinc-300">
                  {label}
                </span>

                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[key]}
                  onClick={() => toggleNotification(key)}
                  className={`w-11 h-6 rounded-full p-1 transition ${
                    notifications[key]
                      ? "bg-indigo-600"
                      : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition ${
                      notifications[key] ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Security */}
          <div
            id="security"
            className="scroll-mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Shield className="text-indigo-400" />
              <div>
                <h3 className="font-semibold">Security</h3>
                <p className="text-xs text-zinc-500">
                  Account security and access management.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center py-3">
              <div>
                <p className="text-sm">Two-factor authentication</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Additional account protection.
                </p>
              </div>
              <span className="text-xs text-zinc-500">
                Not configured
              </span>
            </div>
          </div>

          {/* Preferences */}
          <div
            id="preferences"
            className="scroll-mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <Palette className="text-indigo-400" />
              <div>
                <h3 className="font-semibold">Preferences</h3>
                <p className="text-xs text-zinc-500">
                  Customize your application experience.
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-3">
              Application Theme
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Light", icon: Sun },
                { name: "Dark", icon: Moon },
                { name: "System", icon: Monitor },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setTheme(item.name);
                      setSaved(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border text-sm ${
                      theme === item.name
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                        : "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center justify-between gap-4">
            {saved && (
              <span className="text-sm text-green-400 flex items-center gap-2">
                <CheckCircle2 size={16} />
                Settings saved locally (demo).
              </span>
            )}

            <button
              onClick={handleSave}
              className="ml-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg text-sm font-medium"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;
