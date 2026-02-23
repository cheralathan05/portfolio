import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineChat, HiOutlineX, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineLightBulb } from "react-icons/hi";

interface Question {
  question: string;
  category: string;
  hints: string[];
}

const interviewQuestions: Question[] = [
  {
    question: "Tell me about a challenging technical problem you solved recently.",
    category: "Problem Solving",
    hints: ["Structure your answer using STAR method", "Focus on your specific contribution"],
  },
  {
    question: "How would you design a real-time notification system for a web application?",
    category: "System Design",
    hints: ["Consider WebSockets vs SSE", "Discuss scalability"],
  },
  {
    question: "What's the difference between SQL and NoSQL databases? When would you use each?",
    category: "Technical Knowledge",
    hints: ["Give concrete examples", "Mention trade-offs"],
  },
  {
    question: "Describe your experience with AI/ML integration in web applications.",
    category: "AI & Innovation",
    hints: ["Mention specific APIs or models", "Discuss practical applications"],
  },
  {
    question: "How do you approach code reviews and collaboration in a team?",
    category: "Teamwork",
    hints: ["Be specific about your process", "Show empathy and growth mindset"],
  },
  {
    question: "Walk me through how you'd optimize a slow-loading React application.",
    category: "Performance",
    hints: ["Mention code splitting, lazy loading", "Discuss profiling tools"],
  },
];

type Feedback = { score: "strong" | "good" | "needs-work"; message: string };

function evaluateAnswer(answer: string, question: Question): Feedback {
  const len = answer.trim().length;
  const hasKeywords = question.hints.some((h) =>
    h.split(" ").some((w) => answer.toLowerCase().includes(w.toLowerCase()))
  );

  if (len > 150 && hasKeywords) {
    return { score: "strong", message: "Strong answer — demonstrates depth and relevant knowledge." };
  }
  if (len > 80) {
    return { score: "good", message: "Good foundation — try adding specific examples or metrics for more impact." };
  }
  return { score: "needs-work", message: "Needs more detail — expand with concrete examples and your specific role." };
}

const scoreConfig = {
  strong: { icon: HiOutlineCheckCircle, color: "text-neon-cyan", bg: "bg-neon-cyan/10", border: "border-neon-cyan/20" },
  good: { icon: HiOutlineLightBulb, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
  "needs-work": { icon: HiOutlineExclamationCircle, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
};

export default function RecruiterSimulator() {
  const [open, setOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const question = interviewQuestions[currentQ];

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const fb = evaluateAnswer(answer, question);
    setFeedback(fb);
    setCompleted((prev) => [...new Set([...prev, currentQ])]);
  };

  const handleNext = () => {
    setAnswer("");
    setFeedback(null);
    setCurrentQ((prev) => (prev + 1) % interviewQuestions.length);
  };

  const handleReset = () => {
    setAnswer("");
    setFeedback(null);
    setCurrentQ(0);
    setCompleted([]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-purple transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🧠</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            AI Recruiter Simulator
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Practice real interview questions with AI feedback</p>
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                    <HiOutlineChat className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Recruiter View</h2>
                    <p className="text-xs text-muted-foreground">
                      Q{currentQ + 1}/{interviewQuestions.length} · {completed.length} completed
                    </p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Progress */}
              <div className="flex gap-1 mb-6">
                {interviewQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      completed.includes(i)
                        ? "bg-neon-cyan"
                        : i === currentQ
                        ? "bg-neon-purple"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="mb-4">
                <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">
                  {question.category}
                </span>
                <p className="text-foreground font-semibold mt-2 text-lg leading-relaxed">
                  "{question.question}"
                </p>
              </div>

              {/* Hints */}
              <div className="flex flex-wrap gap-2 mb-5">
                {question.hints.map((h, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    💡 {h}
                  </span>
                ))}
              </div>

              {/* Answer */}
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={5}
                disabled={!!feedback}
                className="w-full bg-muted/50 border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-neon-purple/50 transition-colors resize-none"
              />

              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl ${scoreConfig[feedback.score].bg} border ${scoreConfig[feedback.score].border}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {(() => {
                        const Icon = scoreConfig[feedback.score].icon;
                        return <Icon className={`w-5 h-5 ${scoreConfig[feedback.score].color}`} />;
                      })()}
                      <span className={`font-semibold text-sm capitalize ${scoreConfig[feedback.score].color}`}>
                        {feedback.score.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-5">
                {!feedback ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!answer.trim()}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground font-semibold text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Next Question →
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg glass text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
