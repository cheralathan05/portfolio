import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CinematicIntro from "@/components/CinematicIntro";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillGalaxy from "@/components/SkillGalaxy";
import ProjectLab from "@/components/ProjectLab";
import AILabSection from "@/components/ai-lab/AILabSection";
import ProblemSolver from "@/components/ai-lab/ProblemSolver";
import DecisionTraceEngine from "@/components/ai-lab/DecisionTraceEngine";
import BlogSection from "@/components/BlogSection";
import ResumeSection from "@/components/ResumeSection";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && <CinematicIntro onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="min-h-screen bg-background text-foreground overflow-x-hidden"
      >
        <Navbar />
        <HeroSection />
        <SkillGalaxy />
        <ProjectLab />
        <AILabSection />
        <ProblemSolver />
        <DecisionTraceEngine />
        <BlogSection />
        <ResumeSection />
        <Footer />
        <AIAssistant />
      </motion.div>
    </>
  );
};

export default Index;
