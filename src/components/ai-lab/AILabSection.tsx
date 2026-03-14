import { motion } from "framer-motion";
import RecruiterSimulator from "./RecruiterSimulator";
import CareerTrajectory from "./CareerTrajectory";
import SkillGapAnalyzer from "./SkillGapAnalyzer";
import FinalPitchGenerator from "./FinalPitchGenerator";
import WhatIfEngine from "./WhatIfEngine";
import AIStoryteller from "./AIStoryteller";
import AskMyFuture from "./AskMyFuture";
import ImpactMetrics from "./ImpactMetrics";
import ExplanationSwitcher from "./ExplanationSwitcher";
import CodeThinkingMode from "./CodeThinkingMode";
import TechRadar from "./TechRadar";
import ArchitectureQuiz from "./ArchitectureQuiz";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AILabSection() {
  const { t } = useLanguage();

  return (
    <section id="ai-lab" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-glow-pulse" />
            <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
              {t.aiLab.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.aiLab.heading} <span className="gradient-text">{t.aiLab.headingHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t.aiLab.subheading}
          </p>
        </motion.div>

        {/* Interactive modal-based features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <RecruiterSimulator />
          <CareerTrajectory />
          <SkillGapAnalyzer />
          <FinalPitchGenerator />
          <WhatIfEngine />
          <AIStoryteller />
          <AskMyFuture />
        </div>

        {/* Inline features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="font-bold text-foreground">{t.aiLab.impactMetrics}</h3>
            </div>
            <ImpactMetrics />
          </motion.div>

          {/* Explanation witcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧩</span>
              <h3 className="font-bold text-foreground">{t.aiLab.explanationMode}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{t.aiLab.explanationDesc}</p>
            <ExplanationSwitcher />
          </motion.div>

          {/* Code Thinking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧑‍💻</span>
              <h3 className="font-bold text-foreground">{t.aiLab.codeThinking}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{t.aiLab.codeThinkingDesc}</p>
            <CodeThinkingMode />
          </motion.div>

          {/* Tech Radar */}
          <TechRadar />

          {/* Architecture Quiz */}
          <ArchitectureQuiz />
        </div>
      </div>
    </section>
  );
}
