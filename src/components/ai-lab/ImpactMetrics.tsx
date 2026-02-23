import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    name: "Driver Safety System",
    metrics: [
      { label: "Detection Accuracy", value: "94%", context: "Real-time drowsiness detection under varied lighting" },
      { label: "Processing Latency", value: "<200ms", context: "Frame-to-alert response time" },
      { label: "False Positive Rate", value: "<3%", context: "Minimized alert fatigue for drivers" },
      { label: "Potential Lives Saved", value: "∞", context: "Every prevented accident matters" },
    ],
  },
  {
    name: "Unified Business Platform",
    metrics: [
      { label: "Data Retrieval Improvement", value: "60%", context: "Compared to fragmented multi-tool setup" },
      { label: "Cross-Department Adoption", value: "85%", context: "Team-wide platform usage within 3 months" },
      { label: "Report Generation Speed", value: "3x faster", context: "Automated vs. manual reporting" },
      { label: "API Uptime", value: "99.5%", context: "Production reliability benchmark" },
    ],
  },
  {
    name: "AI Portfolio",
    metrics: [
      { label: "Interactive AI Features", value: "11+", context: "Experimental AI systems integrated" },
      { label: "3D Rendering Performance", value: "60fps", context: "Smooth Three.js canvas rendering" },
      { label: "Time to Interactive", value: "<2s", context: "Optimized lazy loading & code splitting" },
      { label: "Recruiter Engagement", value: "∞", context: "You're reading this right now" },
    ],
  },
];

export default function ImpactMetrics() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => setActiveProject(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeProject === i
                ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground"
                : "glass text-muted-foreground"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {projects[activeProject].metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-lg p-3 text-center"
          >
            <p className="text-xl font-bold gradient-text">{m.value}</p>
            <p className="text-xs font-semibold text-foreground mt-1">{m.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{m.context}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
