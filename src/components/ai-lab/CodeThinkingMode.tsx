import { motion } from "framer-motion";

const steps = [
  {
    phase: "1. Understand",
    icon: "🔍",
    thought: "Before writing any code, I map the problem space. What's the input? What's the expected output? What are the constraints? I draw it out — sometimes literally on paper.",
  },
  {
    phase: "2. Decompose",
    icon: "🧩",
    thought: "I break big problems into small, testable pieces. Each piece should be independently verifiable. If I can't explain a component in one sentence, it's too complex — split it further.",
  },
  {
    phase: "3. Prototype",
    icon: "⚡",
    thought: "I build the ugliest working version first. No abstractions, no optimization. Just make it work. This reveals hidden assumptions and edge cases faster than any design document.",
  },
  {
    phase: "4. Refine",
    icon: "✨",
    thought: "Now I refactor with intent. Extract patterns, add types, write tests for edge cases. I ask: 'Would another engineer understand this at 2 AM during an incident?'",
  },
  {
    phase: "5. Ship & Learn",
    icon: "🚀",
    thought: "Perfect is the enemy of shipped. I deploy, monitor, gather feedback. Every production issue teaches more than any tutorial. The code is never 'done' — it evolves.",
  },
];

export default function CodeThinkingMode() {
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <motion.div
          key={s.phase}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{s.icon}</span>
            <h4 className="text-sm font-bold text-foreground">{s.phase}</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed italic">"{s.thought}"</p>
        </motion.div>
      ))}
    </div>
  );
}
