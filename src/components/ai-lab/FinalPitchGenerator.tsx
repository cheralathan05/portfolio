import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

type PitchType = "30s" | "1min" | "technical";

const pitches: Record<PitchType, { label: string; duration: string; content: string }> = {
  "30s": {
    label: "30-Second Pitch",
    duration: "~30 seconds",
    content: `I'm Cheralathan B.N — a Computer Science Engineer who builds intelligent, production-ready systems. I've shipped AI-powered applications, built real-time safety systems with 94% accuracy, and engineered enterprise platforms that cut data retrieval time by 60%. I combine deep full-stack expertise with cutting-edge AI integration. I don't just write code — I build systems that make an impact.`,
  },
  "1min": {
    label: "1-Minute Pitch",
    duration: "~1 minute",
    content: `I'm Cheralathan B.N, a Computer Science Engineer passionate about building systems at the intersection of AI and software engineering.

My work spans three key areas:

First, AI Integration — I build applications powered by OpenAI and modern AI APIs, from intelligent assistants to context-aware systems.

Second, Full-Stack Engineering — I architect end-to-end solutions using React, Node.js, Spring Boot, and MySQL, with a focus on performance and scalability.

Third, Real-World Impact — My Driver Safety System achieves 94% drowsiness detection accuracy. My Unified Business Platform reduced data retrieval time by 60%.

What sets me apart is that I don't just use technology — I push its boundaries. This portfolio itself is proof: 3D graphics, AI assistant, and recruiter-grade intelligence built from scratch.

I'm looking for opportunities where I can combine technical depth with creative problem-solving to build products that matter.`,
  },
  technical: {
    label: "Technical Pitch",
    duration: "~45 seconds",
    content: `I'm a full-stack engineer with production experience across the React/Node.js/Spring Boot ecosystem. My architecture decisions are driven by scalability — I've designed systems handling real-time data processing with WebSocket integration and optimized database queries that improved retrieval performance by 60%.

On the AI side, I've integrated OpenAI APIs into production applications with proper prompt engineering, context windowing, and embedding-based search. My computer vision work uses CNN-based classification with OpenCV for real-time frame processing.

I write TypeScript end-to-end, practice component-driven development, and believe in infrastructure as code. My current stack: React + Tailwind for UI, Three.js for 3D, edge functions for serverless compute, and PostgreSQL for persistence.

I ship fast, architect for scale, and think in systems.`,
  },
};

export default function FinalPitchGenerator() {
  const [open, setOpen] = useState(false);
  const [activePitch, setActivePitch] = useState<PitchType>("30s");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-cyan transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🎯</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            AI Final Pitch Generator
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">"Why should we hire Cheralathan?" — instant pitch</p>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto neon-glow-cyan"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">🎯 Why Hire Cheralathan?</h2>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Pitch type selector */}
              <div className="flex gap-2 mb-6">
                {(Object.keys(pitches) as PitchType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActivePitch(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activePitch === type
                        ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {pitches[type].label}
                  </button>
                ))}
              </div>

              {/* Pitch content */}
              <motion.div
                key={activePitch}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-neon-cyan">{pitches[activePitch].duration}</span>
                </div>
                <div className="text-foreground leading-relaxed whitespace-pre-line text-sm">
                  {pitches[activePitch].content}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
