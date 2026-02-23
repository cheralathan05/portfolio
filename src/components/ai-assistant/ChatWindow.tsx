import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { HiOutlineChat, HiOutlineX, HiOutlinePaperAirplane } from "react-icons/hi";
import { generateResponse, getGreeting, resetMemory } from "./responseEngine";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWindow() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize greeting
  useEffect(() => {
    if (messages.length === 0) {
      resetMemory();
      setMessages([{ role: "assistant", content: getGreeting("en") + "\n\nAsk me anything — about my skills, projects, experience, or why I'd be a great fit for your team." }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = useCallback(() => {
    if (!input.trim() || typing) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMsg);
      setTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: response.content }]);
    }, 1000 + Math.random() * 800);
  }, [input, typing]);

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center neon-glow-purple shadow-2xl"
      >
        {open ? (
          <HiOutlineX className="w-6 h-6 text-primary-foreground" />
        ) : (
          <HiOutlineChat className="w-6 h-6 text-primary-foreground" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] glass-strong rounded-2xl flex flex-col overflow-hidden neon-glow-purple"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">C</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Cheralathan</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  <span className="text-[10px] text-muted-foreground">Online · Ask me anything</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 max-h-[340px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] text-sm leading-relaxed rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-neon-purple/20 text-foreground rounded-br-md"
                        : "bg-muted text-muted-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <span key={j}>
                        {line.split("**").map((part, k) =>
                          k % 2 === 1 ? (
                            <strong key={k} className="text-foreground">{part}</strong>
                          ) : (
                            part
                          )
                        )}
                        {j < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Cheralathan..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={handleSend}
                disabled={typing}
                className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center hover:bg-neon-purple/30 transition-colors disabled:opacity-40"
              >
                <HiOutlinePaperAirplane className="w-4 h-4 text-neon-purple rotate-90" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
