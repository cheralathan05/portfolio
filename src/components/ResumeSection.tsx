import { motion } from "framer-motion";
import { HiOutlineDownload, HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineLightBulb } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResumeSection() {
  const { t } = useLanguage();
  const r = t.resume;

  return (
    <section id="resume" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{r.heading}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">{r.subheading}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-10 space-y-10"
        >
          {/* Summary */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <HiOutlineLightBulb className="w-5 h-5 text-secondary" />
              {r.summary}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{r.summaryText}</p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <HiOutlineAcademicCap className="w-5 h-5 text-primary" />
              {r.education}
            </h3>
            <div className="glass rounded-xl p-4">
              <p className="font-semibold text-foreground">{r.degreeTitle}</p>
              <p className="text-sm text-muted-foreground">{r.degreeDesc}</p>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <HiOutlineBriefcase className="w-5 h-5 text-secondary" />
              {r.highlights}
            </h3>
            <div className="space-y-3">
              {r.highlightItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download */}
          <div className="flex justify-center pt-4">
            <motion.a
              href="/Cheralathan_resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold neon-glow-purple hover:opacity-90 transition-opacity"
            >
              <HiOutlineDownload className="w-5 h-5" />
              {r.download}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
