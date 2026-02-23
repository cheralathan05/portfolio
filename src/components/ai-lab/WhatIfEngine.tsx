import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

const scenarios = [
  {
    question: "What if Cheralathan joined a startup?",
    outcome:
      "At a fast-paced startup, Cheralathan would thrive as a founding engineer — wearing multiple hats across frontend, backend, and AI integration. His ability to ship full-stack features quickly (React + Spring Boot + OpenAI) makes him ideal for the 0-to-1 phase. Within 6 months, he'd likely own a core product vertical. Within 2 years, he could lead engineering.",
  },
  {
    question: "What if he focused on AI full-time?",
    outcome:
      "Transitioning to pure AI/ML, Cheralathan's strong foundation in OpenAI APIs and computer vision (Driver Safety System) positions him well. He'd likely specialize in applied AI — building production ML systems rather than research. Path: AI Engineer → Senior AI Engineer → AI Platform Lead. His full-stack background gives him an edge over pure ML engineers in productionizing models.",
  },
  {
    question: "What if he joined a FAANG company?",
    outcome:
      "At a FAANG, Cheralathan would bring fresh energy and hands-on building experience. His diverse project portfolio shows initiative beyond coursework. He'd likely start as SDE-1, excel in system design discussions due to his architecture experience, and reach SDE-2 within 18 months. His AI integration skills would be highly valued on teams building AI-native features.",
  },
  {
    question: "What if he built his own product?",
    outcome:
      "As a founder-engineer, Cheralathan has the rare combination of full-stack skills, AI knowledge, and product thinking. He could build and launch an AI-powered SaaS without hiring an engineering team initially. His portfolio itself demonstrates product design sensibility. Most likely path: indie hacker → bootstrapped SaaS → venture-backed if the product finds PMF.",
  },
];

export default function WhatIfEngine() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-purple transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🧪</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            AI "What If" Engine
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Simulate career scenarios with AI predictions</p>
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
              className="glass-strong rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto neon-glow-purple"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">🧪 What If Scenario Engine</h2>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-3 mb-6">
                {scenarios.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      selected === i
                        ? "bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 text-foreground border border-neon-purple/30"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.question}
                  </button>
                ))}
              </div>

              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-5"
              >
                <h3 className="font-bold text-foreground mb-3">{scenarios[selected].question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{scenarios[selected].outcome}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
