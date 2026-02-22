import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {SUGGESTED_PROMPTS} from "./SUGGESTED_PROMPTS";
import "../../App.css";
import "./ChatPage.css";

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
      <>
      <header className="header">
            <button
                className="mapBtn">
                Boston Map
            </button>

            <button className="resetBtn" onClick={handleReset}>
                ↺ Reset
            </button>
      </header>

      <div className="body">
        <main className="main">
          <div className="messagesContainer">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="messageRow"
                style={{
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "assistant" && <div className="avatar">⚖</div>}
                <div
                    className={`bubble ${
                        msg.role === "user" ? "userBubble" : "assistantBubble"
                    }`}
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
              <div className="messageRow" style={{ justifyContent: "flex-start" }}>
                <div className="avatar">⚖</div>
                <div className="bubble assistantBubble">
                  <div className="typingDots">
                    <span className="dot" style={{animationDelay: "0s" }} />
                    <span className="dot" style={{ animationDelay: "0.2s" }} />
                    <span className="dot" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ✅ Dropdown BELOW the chat/messages (no free text input) */}
          <div className="dropdownBar">
            <div className="dropdownLabel">Select a situation</div>
            <select
              value={selectedPrompt}
              onChange={handleSelectChange}
              disabled={loading}
              className="dropdownSelect"
            >
              <option value="">Choose an option…</option>
              {SUGGESTED_PROMPTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="footerLinks">
            <a
              href="https://nlgmass.org"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              NLG MA
            </a>
            <span className="linkDot">·</span>
            <a href="https://aclum.org" target="_blank" rel="noreferrer" className="link">
              ACLU MA
            </a>
            <span className="linkDot">·</span>
            <a href="https://macdl.com" target="_blank" rel="noreferrer" className="link">
              MACDL
            </a>
          </div>
        </main>
      </div>
      </>
  );
}
