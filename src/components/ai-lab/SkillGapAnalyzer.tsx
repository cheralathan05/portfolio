import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineX, HiOutlineCheckCircle, HiOutlineExclamation, HiOutlineArrowRight } from "react-icons/hi";

type Role = "frontend" | "backend" | "ai";

const roleData: Record<Role, { label: string; strong: string[]; missing: string[]; roadmap: string[] }> = {
  frontend: {
    label: "Frontend Engineer",
    strong: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Component Architecture"],
    missing: ["Next.js (SSR/SSG)", "Testing (Vitest/Playwright)", "Design Systems at Scale", "Web Accessibility (WCAG)"],
    roadmap: [
      "Master Next.js App Router and server components",
      "Build a component library with Storybook",
      "Learn advanced state management (Zustand/Jotai)",
      "Study web performance optimization (Core Web Vitals)",
      "Contribute to a popular open-source React project",
    ],
  },
  backend: {
    label: "Backend Engineer",
    strong: ["Java", "Spring Boot", "MySQL", "REST APIs", "Node.js"],
    missing: ["Microservices Architecture", "Docker/Kubernetes", "Message Queues (Kafka/RabbitMQ)", "Observability (Grafana/Prometheus)"],
    roadmap: [
      "Containerize applications with Docker and orchestrate with K8s",
      "Implement event-driven architecture with message queues",
      "Build CI/CD pipelines with GitHub Actions",
      "Study distributed systems fundamentals",
      "Add comprehensive observability and monitoring",
    ],
  },
  ai: {
    label: "AI/ML Engineer",
    strong: ["OpenAI API", "Prompt Engineering", "AI Integration", "Python Basics", "Computer Vision (OpenCV)"],
    missing: ["ML Frameworks (PyTorch/TensorFlow)", "LangChain/LlamaIndex", "Vector Databases", "ML Model Training & Fine-tuning"],
    roadmap: [
      "Deep dive into PyTorch and neural network fundamentals",
      "Build RAG applications with LangChain + vector stores",
      "Learn MLOps: model deployment, versioning, monitoring",
      "Study transformer architecture in depth",
      "Build and deploy a custom fine-tuned model",
    ],
  },
};

export default function SkillGapAnalyzer() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("ai");

  const data = roleData[selectedRole];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-purple transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🔍</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            AI Skill Gap Analyzer
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Analyze strengths vs. desired role requirements</p>
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
                <h2 className="text-lg font-bold text-foreground">🔍 Skill Gap Analyzer</h2>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Role selector */}
              <div className="flex gap-2 mb-6">
                {(Object.keys(roleData) as Role[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedRole === role
                        ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground neon-glow-purple"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {roleData[role].label}
                  </button>
                ))}
              </div>

              {/* Strong skills */}
              <div className="mb-6">
                <h3 className="text-sm font-mono text-neon-cyan uppercase tracking-wider mb-3 flex items-center gap-2">
                  <HiOutlineCheckCircle className="w-4 h-4" /> Strong At
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.strong.map((s) => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing skills */}
              <div className="mb-6">
                <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <HiOutlineExclamation className="w-4 h-4" /> Gaps to Fill
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.missing.map((s) => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-orange-400/10 text-orange-400 border border-orange-400/20">
                      ○ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning roadmap */}
              <div>
                <h3 className="text-sm font-mono text-neon-purple uppercase tracking-wider mb-3 flex items-center gap-2">
                  <HiOutlineArrowRight className="w-4 h-4" /> Learning Roadmap
                </h3>
                <div className="space-y-2">
                  {data.roadmap.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 glass rounded-lg p-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-neon-purple/20 text-neon-purple flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
