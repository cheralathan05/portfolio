import { motion } from "framer-motion";
import { useState } from "react";

interface TechItem {
  name: string;
  ring: "adopt" | "trial" | "assess" | "hold";
  quadrant: string;
  note: string;
}

const techItems: TechItem[] = [
  { name: "React", ring: "adopt", quadrant: "Frontend", note: "Primary UI framework, deep expertise" },
  { name: "TypeScript", ring: "adopt", quadrant: "Languages", note: "Default for all new projects" },
  { name: "Tailwind CSS", ring: "adopt", quadrant: "Frontend", note: "Utility-first styling, rapid iteration" },
  { name: "Node.js", ring: "adopt", quadrant: "Backend", note: "Production API development" },
  { name: "Spring Boot", ring: "adopt", quadrant: "Backend", note: "Enterprise-grade Java services" },
  { name: "PostgreSQL", ring: "adopt", quadrant: "Data", note: "Primary relational database" },
  { name: "OpenAI API", ring: "adopt", quadrant: "AI", note: "Production GenAI integration" },
  { name: "Three.js", ring: "trial", quadrant: "Frontend", note: "3D web experiences, actively exploring" },
  { name: "LangChain", ring: "trial", quadrant: "AI", note: "AI orchestration, evaluating for production" },
  { name: "Docker", ring: "trial", quadrant: "DevOps", note: "Containerization, growing adoption" },
  { name: "Rust", ring: "assess", quadrant: "Languages", note: "Interested for performance-critical systems" },
  { name: "GraphQL", ring: "assess", quadrant: "Backend", note: "Evaluating for complex data fetching" },
  { name: "Kubernetes", ring: "assess", quadrant: "DevOps", note: "Future scaling infrastructure" },
  { name: "Web3/Solidity", ring: "hold", quadrant: "Emerging", note: "Monitoring, not actively pursuing" },
];

const ringColors: Record<string, { bg: string; text: string; label: string }> = {
  adopt: { bg: "bg-neon-cyan/20", text: "text-neon-cyan", label: "Adopt" },
  trial: { bg: "bg-neon-purple/20", text: "text-neon-purple", label: "Trial" },
  assess: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Assess" },
  hold: { bg: "bg-muted/40", text: "text-muted-foreground", label: "Hold" },
};

export default function TechRadar() {
  const [activeRing, setActiveRing] = useState<string | null>(null);
  const filtered = activeRing ? techItems.filter((t) => t.ring === activeRing) : techItems;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📡</span>
        <h3 className="font-bold text-foreground">Tech Radar</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Where each technology sits in my engineering practice:
      </p>

      {/* Ring filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(ringColors).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActiveRing(activeRing === key ? null : key)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              activeRing === key ? `${val.bg} ${val.text} neon-glow-cyan` : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {filtered.map((item, i) => {
          const ring = ringColors[item.ring];
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/20 transition-colors group"
            >
              <span className={`w-2 h-2 rounded-full ${ring.bg.replace("/20", "")} shrink-0`} style={{
                backgroundColor: item.ring === "adopt" ? "hsl(var(--neon-cyan))" : item.ring === "trial" ? "hsl(var(--neon-purple))" : item.ring === "assess" ? "#facc15" : "hsl(var(--muted-foreground))"
              }} />
              <span className="text-sm text-foreground font-medium flex-1">{item.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${ring.bg} ${ring.text} font-mono`}>
                {item.quadrant}
              </span>
              <span className="text-xs text-muted-foreground hidden group-hover:inline-block max-w-[200px] truncate">
                {item.note}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
