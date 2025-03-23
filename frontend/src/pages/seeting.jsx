import { useEffect } from "react";
import { THEMES } from "../constants";
import { userThemeStore } from "../store/useThemeStore";

const Preview_Messages = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

function Setting() {
  const { theme, setTheme } = userThemeStore();

  // Apply the theme to the HTML element dynamically
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* Full Page with Applied Theme */}
      <div className="min-h-screen w-full mx-auto px-4 pt-12 bg-base-200">
        {/* Theme Selection Header */}
        <div className="p-4 flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold text-primary">Theme Settings</h1>
          <p className="text-lg text-base-content/80">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mx-auto max-w-5xl">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                theme === t ? "bg-primary text-white" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-10 w-full rounded-lg overflow-hidden border"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-sm font-medium capitalize">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h2 className="text-2xl font-bold text-center mt-8">Live Preview</h2>
        <div className="flex w-full justify-center items-center mt-6">
          <div className="w-full max-w-4xl h-[550px] flex items-center justify-center border-2 rounded-2xl bg-base-100 shadow-lg">
            <div className="w-[420px] h-[480px] border border-base-300 rounded-xl overflow-hidden bg-base-200 shadow-md flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center gap-3 bg-primary p-4 text-primary-content">
                <div className="text-lg rounded-full bg-secondary flex items-center justify-center font-medium w-10 h-10">
                  J
                </div>
                <div>
                  <h3 className="font-medium">Vinayak Rasgotra</h3>
                  <p className="text-xs opacity-70">Online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-base-100">
                {Preview_Messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                        m.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-300 text-base-content"
                      }`}
                    >
                      <p className="text-sm">{m.content}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          m.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/70"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input - Fixed Alignment */}
              <div className="flex items-center gap-3 p-4 bg-base-300 border-t">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded-lg bg-base-100 border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type a message..."
                />
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 flex items-center justify-center">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
