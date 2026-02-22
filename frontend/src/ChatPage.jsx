import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTED_PROMPTS = [
  {
    id: 1,
    label: "Stopped on the Street",
    prompt:
      "A Boston police officer just stopped me on the street and is asking me questions. What are my rights and what should I say?",
  },
  {
    id: 2,
    label: "Stopped in a Car",
    prompt:
      "I got pulled over by a Boston police officer. What are my rights during a traffic stop and what should I do?",
  },
  {
    id: 3,
    label: "Officer Asks to Search Me",
    prompt:
      "A Boston police officer is asking to search my bag or my body. Do I have to let them and what should I say?",
  },
  {
    id: 4,
    label: "I Was FIO'd",
    prompt:
      "A Boston police officer filed a Field Interrogation and Observation report on me. What does that mean and how does it affect me?",
  },
  {
    id: 5,
    label: "I Witnessed a Police Interaction",
    prompt:
      "I just witnessed a Boston police officer stopping a young person in my neighborhood. What can I legally do and how can I document it?",
  },
  {
    id: 6,
    label: "I Want to File a Complaint",
    prompt:
      "I had a bad experience with a Boston police officer and want to file a misconduct complaint. How do I do that and what happens after?",
  },
  {
    id: 7,
    label: "My Child Was Stopped",
    prompt:
      "A Boston police officer stopped and questioned my child who is under 18. What rights did they have and what should I do now?",
  },
  {
    id: 8,
    label: "Officer Used Force",
    prompt:
      "A Boston police officer used physical force during an interaction with me or someone I know. What are my options and who can I contact?",
  },
  {
    id: 9,
    label: "Understand This District's Data",
    prompt:
      "What do the youth police interaction and misconduct statistics mean for my neighborhood and how should I interpret them?",
  },
  {
    id: 10,
    label: "Know My Rights at School",
    prompt:
      "A Boston police officer approached me or a student at or near school. What are the specific rights students have in that situation?",
  },
];

const API_BASE = "http://127.0.0.1:8000";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello. I'm here to provide information about your rights during Boston police interactions and help you understand BPD accountability data.\n\nChoose a situation from the dropdown below to get started.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (promptObj) => {
    if (loading) return;

    // Track which dropdown item was used (so the dropdown keeps the selected value)
    setSelectedPrompt(String(promptObj.id));

    const userMessage = { role: "user", content: promptObj.label };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    const chatHistory = updatedMessages
      .slice(1)
      .slice(0, -1)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptObj.prompt,
          chat_history: chatHistory,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello. I'm here to provide information about your rights during Boston police interactions and help you understand BPD accountability data.\n\nChoose a situation from the dropdown below to get started.",
      },
    ]);
    setSelectedPrompt("");
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedPrompt(val);

    if (!val) return;
    const promptObj = SUGGESTED_PROMPTS.find((p) => String(p.id) === val);
    if (promptObj) sendMessage(promptObj);
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgGrain} />

      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>⚖</div>
          <div>
            <div style={styles.logoTitle}>Boston Cop Watch</div>
            <div style={styles.logoSub}>Youth Focused · Know Your Rights · Boston, MA</div>
          </div>
        </div>
        <div style={styles.headerRight}>
            <button
                style={styles.mapBtn}
                onClick={() => console.log("Boston Map page coming soon")}
            >
                Boston Map
            </button>

            <div style={styles.disclaimer}>
                Not legal advice · For information only
            </div>

            <button style={styles.resetBtn} onClick={handleReset}>
                ↺ Reset
            </button>
        </div>
      </header>

      <div style={styles.body}>
        <main style={styles.main}>
          <div style={styles.messagesContainer}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "assistant" && <div style={styles.avatar}>⚖</div>}
                <div
                  style={{
                    ...styles.bubble,
                    ...(msg.role === "user" ? styles.userBubble : styles.assistantBubble),
                  }}
                >
                  {msg.role === "assistant" ? (
                    <div className="markdown">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    ) : (
                    msg.content
                    )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
                <div style={styles.avatar}>⚖</div>
                <div style={{ ...styles.bubble, ...styles.assistantBubble }}>
                  <div style={styles.typingDots}>
                    <span style={{ ...styles.dot, animationDelay: "0s" }} />
                    <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
                    <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ✅ Dropdown BELOW the chat/messages (no free text input) */}
          <div style={styles.dropdownBar}>
            <div style={styles.dropdownLabel}>Select a situation</div>
            <select
              value={selectedPrompt}
              onChange={handleSelectChange}
              disabled={loading}
              style={styles.dropdownSelect}
            >
              <option value="">Choose an option…</option>
              {SUGGESTED_PROMPTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.footerLinks}>
            <a
              href="https://nlgmass.org"
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              NLG MA
            </a>
            <span style={styles.linkDot}>·</span>
            <a href="https://aclum.org" target="_blank" rel="noreferrer" style={styles.link}>
              ACLU MA
            </a>
            <span style={styles.linkDot}>·</span>
            <a href="https://macdl.com" target="_blank" rel="noreferrer" style={styles.link}>
              MACDL
            </a>
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a120a; overflow: hidden; }

        @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
        }
            
        button:hover {
          transform: scale(1.05);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a3a2a; border-radius: 2px; }
        button:hover { opacity: 0.85; }

        .markdown p { margin: 0 0 8px; }
        .markdown ul, .markdown ol { margin: 0 0 8px 18px; }
        .markdown li { margin: 4px 0; }
        .markdown h1, .markdown h2, .markdown h3 { margin: 10px 0 6px; }
        .markdown a { color: #6a9a6a; text-decoration: underline; }
        `}</style>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    background: "#cbd7e8",
    color: "#0f172a",
    fontFamily: "'DM Mono', monospace",
    position: "relative",
    overflow: "hidden",
  },
  bgGrain: {
    position: "fixed",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "5px solid #071935",
    background: "#ffffff",
    zIndex: 10,
    flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerRight: { display: "flex", alignItems: "center", gap: "12px" },
  logo: {
    fontSize: "22px",
    background: "#0b1f3a",
    border: "1px solid #142f57",
    color: "#ffffff",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "23px",
    color: "#0b1f3a",
    letterSpacing: "0.02em",
  },
  logoSub: {
    fontSize: "13px",
    color: "#64748b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  mapBtn: {
    fontSize: "16px",
    background: "#0b1f3a",
    color: "#ffffff",
    border: "5px solid #2d5694",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
    marginRight: "8px",
},
  disclaimer: {
    fontSize: "13px",
    color: "#1e4ed8",
    border: "1px solid #dbe4f2",
    background: "#eef4ff",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: "4px",
  },
resetBtn: {
    fontSize: "13px",
    color: "#0b1f3a",
    background: "transparent",
    border: "3px solid #0b1f3a",
    borderRadius: "4px",
    padding: "4px 10px",
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
},
  body: { display: "flex", flex: 1, overflow: "hidden", zIndex: 1 },
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },

  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "760px",
    width: "100%",
    margin: "0 auto",
    alignSelf: "center",
    boxSizing: "border-box",
  },
  messageRow: { display: "flex", alignItems: "flex-start", gap: "10px", width: "100%" },
  avatar: {
    fontSize: "14px",
    background: "#8795e4",
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "2px solid #070726",
  },
  bubble: {
    maxWidth: "80%",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },
  assistantBubble: {
    background: "#ffffff",
    border: "1px solid #dbe4f2",
    color: "#0f172a",
    borderTopLeftRadius: "2px",
  },
  userBubble: {
    background: "#0b1f3a",
    border: "1px solid #142f57",
    color: "#ffffff",
    borderTopRightRadius: "2px",
  },
  typingDots: { display: "flex", gap: "4px", alignItems: "center", height: "18px" },
  dot: {
    width: "5px",
    height: "5px",
    background: "#142f57",
    borderRadius: "50%",
    display: "inline-block",
    animation: "bounce 1.2s infinite",
  },

  // ✅ New dropdown bar styles (matches your theme)
  dropdownBar: {
    maxWidth: "760px",
    width: "100%",
    margin: "0 auto",
    alignSelf: "center",
    padding: "12px 24px",
    borderTop: "3px solid #151137",
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  dropdownLabel: {
    fontSize: "13px",
    color: "#0b1f3a",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    flexShrink: 0,
  },
  dropdownSelect: {
    flex: 1,
    background: "#ffffff",
    color: "#0f172a",
    border: "3px solid #dbe4f2",
    borderRadius: "8px",
    padding: "10px 12px",
    fontFamily: "'DM Mono', monospace",
    fontSize: "15px",
    cursor: "pointer",
  },

  footerLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px",
    borderTop: "3px solid #07040e",
    flexShrink: 0,
  },
  link: {
    color: "#1e4ed8",
    fontSize: "13px",
    textDecoration: "none",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  linkDot: { color: "#94a3b8" }
};