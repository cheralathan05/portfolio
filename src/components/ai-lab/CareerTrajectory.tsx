import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineX, HiOutlineTrendingUp } from "react-icons/hi";

const milestones = [
  {
    year: "Now",
    title: "CS Engineer & GenAI Developer",
    description: "Building intelligent systems with React, Spring Boot, and OpenAI integrations.",
    skills: ["React", "Java", "OpenAI API"],
    highlight: true,
  },
  {
    year: "1 Year",
    title: "Full-Stack AI Engineer",
    description: "Leading AI feature development at a fast-growing startup. Shipping production ML pipelines and building AI-native products.",
    skills: ["LangChain", "Vector DBs", "Cloud Architecture"],
    highlight: false,
  },
  {
    year: "3 Years",
    title: "Senior AI/ML Engineer",
    description: "Architecting end-to-end AI platforms. Contributing to open-source AI tools. Speaking at conferences about AI in production.",
    skills: ["System Design", "MLOps", "Team Leadership"],
    highlight: false,
  },
  {
    year: "5 Years",
    title: "AI Product Lead / Co-founder",
    description: "Leading an AI-first product team or building an AI startup. Combining deep technical skills with product vision to create transformative technology.",
    skills: ["Product Strategy", "AI Research", "Entrepreneurship"],
    highlight: false,
  },
];

export default function CareerTrajectory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-cyan transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🧬</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            AI Career Trajectory
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">AI-predicted career roadmap based on skills & trends</p>
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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                    <HiOutlineTrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Career Trajectory Engine</h2>
                    <p className="text-xs text-muted-foreground">AI-predicted based on skills, projects & industry trends</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-cyan/20" />

                <div className="space-y-8">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="relative flex gap-5"
                    >
                      {/* Dot */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          m.highlight
                            ? "bg-gradient-to-br from-neon-cyan to-neon-purple neon-glow-cyan"
                            : "glass border border-border"
                        }`}
                      >
                        <span className={`text-xs font-bold ${m.highlight ? "text-primary-foreground" : "text-muted-foreground"}`}>
                          {m.year === "Now" ? "●" : m.year.replace(" Year", "Y").replace(" Years", "Y")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className={`glass rounded-xl p-4 flex-1 ${m.highlight ? "border-neon-cyan/30" : ""}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-neon-cyan">{m.year}</span>
                        </div>
                        <h3 className="font-bold text-foreground mb-1">{m.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{m.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {m.skills.map((s) => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-xs text-muted-foreground text-center italic">
                Trajectory generated based on current skill velocity, market trends, and project complexity analysis.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
