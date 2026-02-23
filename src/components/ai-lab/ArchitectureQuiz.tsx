import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "You need real-time notifications for 100K users. What's the best approach?",
    options: ["Long polling", "WebSockets with pub/sub", "Periodic REST polling", "Server-Sent Events"],
    correct: 1,
    explanation: "WebSockets with a pub/sub system (like Redis) allow bi-directional, persistent connections that scale horizontally. SSE is close but lacks bi-directional communication.",
  },
  {
    question: "A microservice is causing cascading failures. What pattern do you apply first?",
    options: ["Add more replicas", "Circuit breaker pattern", "Increase timeout", "Switch to monolith"],
    correct: 1,
    explanation: "Circuit breakers prevent cascading failures by failing fast when a downstream service is unhealthy, allowing the system to degrade gracefully instead of collapsing entirely.",
  },
  {
    question: "Your database reads are 10x writes. How do you optimize?",
    options: ["Shard the database", "Add read replicas + caching", "Denormalize everything", "Use a NoSQL database"],
    correct: 1,
    explanation: "Read replicas distribute read load while caching (Redis) serves hot data without hitting the DB. This addresses the read-heavy pattern without the complexity of sharding or the risks of denormalization.",
  },
  {
    question: "You need to process 1M events/hour asynchronously. What architecture?",
    options: ["Direct API calls", "Message queue (Kafka/SQS)", "Cron job batch processing", "In-memory processing"],
    correct: 1,
    explanation: "Message queues provide durable, scalable async processing with backpressure handling. Kafka excels at high-throughput event streaming with consumer groups for parallel processing.",
  },
];

export default function ArchitectureQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🧪</span>
        <h3 className="font-bold text-foreground">Architecture Quiz</h3>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-muted-foreground font-mono">Q{current + 1}/{questions.length}</span>
              <span className="text-xs text-neon-cyan font-mono">Score: {score}</span>
            </div>
            <p className="text-sm text-foreground mb-4 font-medium">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left text-sm px-4 py-2.5 rounded-lg transition-all ${
                    selected === null
                      ? "glass hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                      : i === q.correct
                      ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30"
                      : i === selected
                      ? "bg-destructive/20 text-destructive border border-destructive/30"
                      : "glass text-muted-foreground/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selected !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 leading-relaxed">
                  💡 {q.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground"
                >
                  {current < questions.length - 1 ? "Next" : "See Results"}
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <p className="text-3xl mb-2">{score === questions.length ? "🏆" : score >= 3 ? "🎯" : "📚"}</p>
            <p className="text-lg font-bold text-foreground">{score}/{questions.length}</p>
            <p className="text-xs text-muted-foreground mb-4">
              {score === questions.length
                ? "Perfect! You think like Cheralathan."
                : "These are the patterns Cheralathan applies daily."}
            </p>
            <button onClick={restart} className="px-4 py-2 text-xs font-semibold rounded-lg glass hover:bg-muted/30 text-muted-foreground">
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
