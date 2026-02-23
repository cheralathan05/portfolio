import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

const storyChapters = [
  {
    title: "The Spark",
    content: `It started the way most engineering stories do — with curiosity and a broken thing.

Cheralathan didn't set out to become a software engineer. He set out to understand how things worked. The first time he wrote code that actually ran, something clicked. Not just logically — emotionally. It felt like speaking a new language that the universe understood.

But the early days weren't glamorous. Failed builds. Cryptic errors. Hours spent on bugs that turned out to be a missing semicolon. Every beginner knows this pain. Cheralathan lived it.`,
  },
  {
    title: "The Grind",
    content: `Computer Science engineering wasn't just about passing exams — it was about building. While others memorized algorithms, Cheralathan was building projects. Real ones. Messy ones.

The Driver Safety System was born from a simple question: "Can code save lives?" The answer required learning OpenCV, training detection models, and building something that worked in real-time — not just in theory.

There were weeks of failure. Models that detected everything as "drowsy." Camera feeds that crashed. But each failure was a lesson disguised as frustration.`,
  },
  {
    title: "The Breakthrough",
    content: `The moment it changed was when AI became accessible. When OpenAI released their APIs, Cheralathan didn't just use them — he integrated them into real products.

The Unified Business Platform wasn't a school project. It was an engineering challenge: consolidate fragmented data, build real-time updates, and make it actually useful. When the data retrieval time dropped by 60%, it wasn't just a metric — it was proof that good engineering has measurable impact.

This is when "student" started feeling too small. "Engineer" felt right.`,
  },
  {
    title: "The Vision",
    content: `Today, Cheralathan builds at the intersection of AI and software engineering — not because it's trending, but because it's where the most interesting problems live.

This portfolio isn't just a resume. It's a statement: technology should be experienced, not just displayed. The 3D graphics, the AI assistant, the interactive features — they're not gimmicks. They're demonstrations of what's possible when engineering meets creative ambition.

The journey isn't over. It's barely chapter one. But if there's one thing the story proves so far — Cheralathan doesn't just learn technology. He builds with it. Obsessively. Relentlessly. Joyfully.`,
  },
];

export default function AIStoryteller() {
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState(0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left glass rounded-xl p-5 hover:neon-glow-cyan transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">📖</span>
          <h3 className="font-bold text-foreground group-hover:gradient-text transition-all">
            AI Storyteller
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Cheralathan's journey — told like a human story</p>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">📖 The Story of Cheralathan</h2>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Chapter selector */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {storyChapters.map((ch, i) => (
                  <button
                    key={i}
                    onClick={() => setChapter(i)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      chapter === i
                        ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {ch.title}
                  </button>
                ))}
              </div>

              <motion.div
                key={chapter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-xl font-bold gradient-text mb-4">{storyChapters[chapter].title}</h3>
                <div className="text-sm text-muted-foreground leading-[1.8] whitespace-pre-line italic">
                  {storyChapters[chapter].content}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setChapter(Math.max(0, chapter - 1))}
                  disabled={chapter === 0}
                  className="px-4 py-2 glass rounded-lg text-sm text-muted-foreground disabled:opacity-30"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setChapter(Math.min(storyChapters.length - 1, chapter + 1))}
                  disabled={chapter === storyChapters.length - 1}
                  className="px-4 py-2 glass rounded-lg text-sm text-muted-foreground disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
