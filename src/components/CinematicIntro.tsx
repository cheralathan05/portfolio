import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const welcomeWords = [
  "Welcome",
  "வரவேற்கிறேன்",
  "स्वागत है",
  "Bienvenue",
  "Willkommen",
  "Bienvenido",
  "ようこそ",
  "환영합니다",
  "أهلاً وسهلاً",
  "欢迎",
];

const LANGUAGE_DURATION = 400; // ms per language
const FADE_DURATION = 0.15;    // seconds for each cross-fade

interface CinematicIntroProps {
  onEnter: () => void;
}

export default function CinematicIntro({ onEnter }: CinematicIntroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Step through each language once, then auto-exit
    if (currentIndex < welcomeWords.length - 1) {
      const t = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, LANGUAGE_DURATION);
      return () => clearTimeout(t);
    } else {
      // Last language shown — start cinematic exit
      const t = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onEnter, 1000);
      }, LANGUAGE_DURATION + 200);
      return () => clearTimeout(t);
    }
  }, [currentIndex, onEnter]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Welcome text */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-widest select-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {welcomeWords[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
