import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";

interface DecisionNode {
  id: string;
  title: string;
  context: string;
  options: { label: string; description: string }[];
  decision: string;
  reasoning: string;
}

interface Project {
  name: string;
  emoji: string;
  description: string;
  nodes: DecisionNode[];
}

const projects: Project[] = [
  {
    name: "Driver Safety System",
    emoji: "🚗",
    description: "Real-time drowsiness detection using computer vision",
    nodes: [
      {
        id: "detection-approach",
        title: "Detection Approach",
        context: "The core challenge: how to detect driver drowsiness reliably in real-time with varying lighting conditions.",
        options: [
          { label: "Option A: Full-body posture analysis", description: "Higher accuracy but requires expensive hardware and more processing power" },
          { label: "Option B: Facial landmark detection", description: "Focused scope, works with standard webcam, lower latency" },
        ],
        decision: "Option B — Facial landmark detection",
        reasoning: "Given the project constraints (consumer hardware, real-time requirement), facial landmarks provided the best accuracy-to-performance ratio. Eye aspect ratio (EAR) gives a reliable drowsiness signal with minimal computational overhead.",
      },
      {
        id: "model-selection",
        title: "ML Model Selection",
        context: "Choosing between deep learning and classical CV approaches for real-time inference.",
        options: [
          { label: "Option A: Custom CNN", description: "Higher accuracy potential but requires large training dataset and GPU inference" },
          { label: "Option B: dlib + shape predictor", description: "Pre-trained, lightweight, works on CPU, well-documented" },
        ],
        decision: "Option B — dlib with shape predictor",
        reasoning: "For a safety-critical system running on consumer hardware, inference speed matters more than marginal accuracy gains. dlib achieves 94% accuracy with sub-30ms inference, making it suitable for real-time alerts.",
      },
      {
        id: "alert-mechanism",
        title: "Alert System Design",
        context: "When drowsiness is detected, the system needs to alert the driver without causing panic.",
        options: [
          { label: "Option A: Immediate hard alert", description: "Instant loud alarm on first detection" },
          { label: "Option B: Progressive escalation", description: "Gentle warning → stronger alert → emergency signal" },
        ],
        decision: "Option B — Progressive escalation",
        reasoning: "False positives in safety systems erode trust. A progressive approach validates the signal over multiple frames before escalating, reducing false alerts by ~60% while maintaining response time under 2 seconds for genuine drowsiness events.",
      },
    ],
  },
  {
    name: "Business Information System",
    emoji: "📊",
    description: "Unified data platform reducing retrieval time by 60%",
    nodes: [
      {
        id: "data-integration",
        title: "Data Integration Strategy",
        context: "Multiple business data sources needed unification without disrupting existing workflows.",
        options: [
          { label: "Option A: ETL pipeline to data warehouse", description: "Centralized but introduces latency and maintenance burden" },
          { label: "Option B: API aggregation layer", description: "Real-time data access, lower infrastructure cost, faster to build" },
        ],
        decision: "Option B — API aggregation layer",
        reasoning: "The business required real-time data visibility, not batch analytics. An aggregation layer with intelligent caching provided fresh data while reducing source system load. This also allowed incremental migration without big-bang risk.",
      },
      {
        id: "caching-strategy",
        title: "Caching Architecture",
        context: "Database queries were the primary bottleneck. Needed to reduce load without stale data issues.",
        options: [
          { label: "Option A: Application-level caching", description: "Simple but limited to single instance" },
          { label: "Option B: Distributed cache (Redis)", description: "Scalable, shared across instances, TTL control" },
        ],
        decision: "Option B — Redis distributed cache",
        reasoning: "With multiple API consumers, a shared cache was essential. Redis with intelligent TTL per data type (5s for real-time metrics, 5min for reports) achieved the 60% retrieval improvement while keeping data freshness within acceptable bounds.",
      },
      {
        id: "query-optimization",
        title: "Query Performance",
        context: "Complex joins across normalized tables were causing 3-5 second response times.",
        options: [
          { label: "Option A: Denormalize the schema", description: "Faster reads but write complexity and data consistency risks" },
          { label: "Option B: Materialized views + indexes", description: "Maintain normalization, pre-compute expensive joins" },
        ],
        decision: "Option B — Materialized views with strategic indexes",
        reasoning: "Denormalization would've created maintenance nightmares with the team size. Materialized views gave us the read performance of denormalized data while keeping the source of truth clean. Refreshed on a schedule aligned with business reporting cycles.",
      },
    ],
  },
];

export default function DecisionTraceEngine() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <section id="decision-trace" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-glow-pulse" />
            <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
              {t.decisions.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.decisions.heading} <span className="gradient-text">{t.decisions.headingHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t.decisions.subheading}
          </p>
        </motion.div>

        {/* Project selector */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {projects.map((project) => (
            <motion.button
              key={project.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedProject(project);
                setActiveNode(null);
              }}
              className={`glass rounded-2xl p-5 text-left transition-all ${
                selectedProject?.name === project.name
                  ? "neon-glow-cyan border-neon-cyan/30"
                  : "hover:border-border/60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{project.emoji}</span>
                <h3 className="font-bold text-foreground">{project.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{project.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Decision map */}
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              key={selectedProject.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Node flow visualization */}
              <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                {selectedProject.nodes.map((node, idx) => (
                  <div key={node.id} className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                        activeNode === node.id
                          ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground neon-glow-purple"
                          : "glass hover:border-border/60 text-muted-foreground"
                      }`}
                    >
                      {node.title}
                    </motion.button>
                    {idx < selectedProject.nodes.length - 1 && (
                      <HiOutlineChevronRight className="w-4 h-4 text-muted-foreground/40" />
                    )}
                  </div>
                ))}
              </div>

              {/* Expanded decision detail */}
              <AnimatePresence mode="wait">
                {activeNode && (
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-strong rounded-2xl p-6 space-y-5"
                  >
                    {(() => {
                      const node = selectedProject.nodes.find((n) => n.id === activeNode)!;
                      return (
                        <>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">{node.title}</h4>
                            <p className="text-sm text-muted-foreground">{node.context}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3">
                            {node.options.map((opt, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-xl p-4 border text-sm ${
                                  opt.label.includes(node.decision.split("—")[0].trim().slice(-1))
                                    ? "border-neon-cyan/40 bg-neon-cyan/5"
                                    : "border-border bg-muted/20"
                                }`}
                              >
                                <p className="font-semibold text-foreground mb-1">{opt.label}</p>
                                <p className="text-xs text-muted-foreground">{opt.description}</p>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-xl bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 border border-neon-cyan/20 p-4"
                          >
                            <p className="text-xs font-mono text-neon-cyan mb-2">{t.decisions.decisionLabel}</p>
                            <p className="text-sm font-semibold text-foreground mb-2">{node.decision}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{node.reasoning}</p>
                          </motion.div>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>

              {!activeNode && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground py-8"
                >
                  {t.decisions.prompt}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
