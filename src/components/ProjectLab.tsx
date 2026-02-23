import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineSparkles, HiOutlineExternalLink } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  title: string;
  description: string;
  tech: string[];
  aiExplanation: string;
}

const projects: Project[] = [
  {
    title: "Driver Safety System",
    description: "Real-time driver drowsiness detection using computer vision and AI models to prevent road accidents.",
    tech: ["Python", "OpenCV", "TensorFlow", "IoT"],
    aiExplanation:
      "**Problem:** Road accidents caused by driver fatigue are a leading cause of death globally.\n\n**Solution:** A real-time monitoring system using computer vision to detect drowsiness patterns — eye closure, yawning, head tilt — and trigger immediate audio/visual alerts.\n\n**Architecture:** Camera feed → Frame processing with OpenCV → CNN-based classification model → Alert system with configurable thresholds.\n\n**Impact:** Demonstrated 94% accuracy in drowsiness detection under varied lighting conditions.",
  },
  {
    title: "Unified Business Information System",
    description: "Centralized platform for managing business operations, data analytics, and real-time reporting.",
    tech: ["React", "Node.js", "MySQL", "Spring Boot"],
    aiExplanation:
      "**Problem:** Businesses struggle with fragmented data across multiple tools, leading to inefficiency and poor decision-making.\n\n**Solution:** A unified platform that consolidates operations, analytics, and reporting into a single dashboard.\n\n**Architecture:** React SPA → REST API (Spring Boot) → MySQL with optimized queries → Real-time WebSocket updates.\n\n**Impact:** Reduced data retrieval time by 60% and improved cross-department collaboration.",
  },
  {
    title: "Personal Portfolio Website",
    description: "AI-powered interactive portfolio with 3D graphics, smart assistant, and recruiter-mode intelligence.",
    tech: ["React", "Three.js", "OpenAI", "Tailwind"],
    aiExplanation:
      "**Problem:** Traditional portfolios are static and fail to engage modern recruiters and tech leads.\n\n**Solution:** A futuristic AI-powered portfolio that lets visitors interact with an AI assistant to learn about skills, projects, and experience.\n\n**Architecture:** React + Three.js frontend → Edge functions → OpenAI embeddings → Context-aware responses.\n\n**Impact:** You're looking at it right now. This is the portfolio.",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [showAI, setShowAI] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 group hover:neon-glow-purple transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
        <HiOutlineExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((tech) => (
          <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>

      <button
        onClick={() => setShowAI(!showAI)}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
      >
        <HiOutlineSparkles className="w-4 h-4" />
        {showAI ? t.projects.hideAI : t.projects.explainAI}
      </button>

      {showAI && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
        >
          {project.aiExplanation.split("**").map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="text-foreground">{part}</strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ProjectLab() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.projects.heading.split(" ")[0]}{" "}
            <span className="gradient-text">{t.projects.heading.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t.projects.subheading}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
