import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

interface Projection {
  answer: string;
  reasoning: string[];
}

const skillProfile = {
  current: ["React", "Node.js", "Spring Boot", "TypeScript", "Java", "MySQL", "OpenAI API", "Computer Vision", "Tailwind CSS", "Three.js"],
  projects: [self-directed learner", "impact-driven engineering"],
};

function generateProjection(question: string): Projection {
  const q = question.toLowerCase();

  if (q.match(/2\s*year|two\s*year|short.?term|near\s*future/)) {
    return {
      answer: `In 2 years, Cheralathan will likely be a Senior Full-Stack Engineer or AI Product Engineer at a growth-stage company. His trajectory shows rapid skill accumulation — from classical backend (Spring Boot, MySQL) to modern AI integration (OpenAI APIs, computer vision). Given his pattern of building end-to-end systems independently, he'll naturally evolve into a technical lead who owns entire product verticals.`,
      reasoning: [
        "Already builds production-grade full-stack systems solo",
        "AI integration skills position him ahead of most peers",
        "Track record of measurable impact (94% accuracy, 60% efficiency gains)",
        "Portfolio engineering quality signals senior-level thinking",
      ],
    };
  }

  if (q.match(/5\s*year|five\s*year|long.?term|future\s*plan/)) {
    return {
      answer: `In 5 years, Cheralathan is positioned to become a Staff Engineer or Engineering Manager leading AI-integrated product teams. His combination of deep technical skill, systems thinking, and product-level ownership is rare. He'll likely architect platforms that serve millions, mentor engineering teams, or co-found a technical product company.`,
      reasoning: [
        "Systems-level thinking evident in architecture decisions",
        "AI + full-stack combination is the most in-demand profile for leadership",
        "History of shipping independently → ready to lead teams",
        "Entrepreneurial mindset visible in portfolio innovation",
      ],
    };
  }

  if (q.match(/role|position|fit|best.*job|ideal|suited/)) {
    return {
      answer: `The ideal roles for Cheralathan are: AI Product Engineer, Full-Stack Tech Lead, or Founding Engineer at an AI-first startup. His unique strength is bridging the gap between AI capabilities and production engineering — he doesn't just prototype, he ships. Companies building AI-powered products need exactly this profile: someone who can own the entire stack from model integration to user interface.`,
      reasoning: [
        "Combines AI integration with production-grade engineering",
        "Full-stack capability means fewer dependencies on other engineers",
        "Impact-driven approach aligns with startup and product-focused roles",
        "Portfolio itself demonstrates founding-engineer-level initiative",
      ],
    };
  }

  if (q.match(/salary|earn|compensation|worth|market/)) {
    return {
      answer: `Based on his skill profile — full-stack TypeScript/Java, AI integration, and production shipping experience — Cheralathan is positioned competitively in the top tier for his experience level. Engineers with AI + full-stack capabilities command premium compensation because they reduce team size requirements while delivering high-impact features. His demonstrable portfolio further strengthens negotiation leverage.`,
      reasoning: [
        "AI engineering skills carry significant market premium",
        "Full-stack ownership reduces company hiring needs",
        "Measurable project outcomes provide concrete negotiation evidence",
        "Portfolio quality signals professional maturity beyond experience years",
      ],
    };
  }

  if (q.match(/startup|found|entrepreneur|build.*company|own.*product/)) {
    return {
      answer: `Cheralathan has strong founding-engineer DNA. His ability to independently architect, build, and ship complete products — from database to AI to 3D frontend — means he can take a product from zero to one without a large team. If he pursues entrepreneurship, his most likely path is building an AI-powered SaaS product, leveraging his full-stack skills to move fast and his AI expertise to create defensible technology.`,
      reasoning: [
        "Solo-ships complete production systems",
        "AI expertise creates technical moat for products",
        "Full-stack capability = fastest possible iteration speed",
        "Already thinks in systems and impact, not just features",
      ],
    };
  }

  if (q.match(/learn|grow|skill|next|improve|development/)) {
    return {
      answer: `Cheralathan's learning trajectory suggests he'll next move into cloud architecture (AWS/GCP), advanced ML/LLM fine-tuning, and distributed systems. His pattern is clear: he learns by building production systems, not just studying. Each project in his portfolio represents a deliberate skill expansion — from backend to AI to 3D graphics. This self-directed growth pattern is the strongest predictor of continued rapid advancement.`,
      reasoning: [
        "Each project strategically expanded his technical range",
        "Learning-by-building approach leads to deeper, retained skills",
        "AI foundation naturally leads to ML engineering depth",
        "Full-stack base makes cloud/infrastructure the logical next frontier",
      ],
    };
  }

  // Default / general future question
  return {
    answer: `Cheralathan's trajectory points toward becoming a high-impact technical leader in AI-powered software. His current profile — full-stack engineering combined with hands-on AI integration and a track record of measurable outcomes — places him on an accelerated path. Whether in a senior IC role, tech lead position, or as a founding engineer, his ability to own problems end-to-end and ship production-quality solutions will define his career.`,
    reasoning: [
      "Rare combination: AI skills + production engineering + design sense",
      "Every project demonstrates measurable business impact",
      "Self-directed learning pattern ensures continuous growth",
      "Portfolio quality signals someone who holds themselves to a high standard",
    ],
  };
}

export default function AskMyFuture() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [projection, setProjection] = useState<Projection | null>(null);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleQuestions = [
    "Where will you be in 2 years?",
    "What role fits you best?",
    "Will you start a company?",
    "What will you learn next?",
    "Where in 5 years?",
  ];

  const handleAsk = (q?: string) => {
    const query = q || question;
    if (!query.trim()) return;
    setQuestion(query);
    setThinking(true);
    setProjection(null);

    setTimeout(() => {
      setProjection(generateProjection(query));
      setThinking(false);
    }, 1500);
  };

  const handleReset = () => {
    setQuestion("");
    setProjection(null);
    setThinking(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-cyan transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🔮</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            Ask My Future
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          "Where will Cheralathan be in 5 years?" — career projection engine
        </p>
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
              className="glass-strong rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto neon-glow-cyan"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">🔮 Ask My Future</h2>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-5">
                Ask any question about Cheralathan's career trajectory. Get a realistic projection based on skills, projects, and growth patterns.
              </p>

              {/* Input */}
              <div className="flex gap-2 mb-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  placeholder="e.g. Where will you be in 2 years?"
                  className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-neon-cyan/50"
                />
                <button
                  onClick={() => handleAsk()}
                  disabled={!question.trim() || thinking}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground text-sm font-medium disabled:opacity-40 transition-opacity"
                >
                  Ask
                </button>
              </div>

              {/* Sample questions */}
              {!projection && !thinking && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {sampleQuestions.map((sq) => (
                    <button
                      key={sq}
                      onClick={() => handleAsk(sq)}
                      className="text-xs px-3 py-1.5 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              )}

              {/* Thinking */}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-xl p-6 flex items-center gap-3"
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce [animation-delay:300ms]" />
                  </div>
                  <span className="text-sm text-muted-foreground">Analyzing career trajectory...</span>
                </motion.div>
              )}

              {/* Projection result */}
              {projection && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-neon-cyan mb-3">Projection</h3>
                    <p className="text-sm text-foreground leading-relaxed">{projection.answer}</p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-neon-purple mb-3">Supporting Evidence</h3>
                    <ul className="space-y-2">
                      {projection.reasoning.map((r, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-neon-cyan mt-0.5">→</span>
                          <span>{r}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Ask another question
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
