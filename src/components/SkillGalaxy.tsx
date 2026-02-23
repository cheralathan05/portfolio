import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiNodedotjs,
  SiTailwindcss, SiMysql, SiGit, SiGithub, SiSpringboot, SiOpenai,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const skillCategories = [
  {
    titleKey: "languages" as const,
    skills: [
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    titleKey: "frontend" as const,
    skills: [
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    titleKey: "backend" as const,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    titleKey: "aiTools" as const,
    skills: [
      { name: "OpenAI API", icon: SiOpenai },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SkillGalaxy() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.skills.heading.split(" ")[0]}{" "}
            <span className="gradient-text">{t.skills.heading.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t.skills.subheading}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.titleKey}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-mono text-secondary uppercase tracking-widest mb-4 neon-text-cyan">
                {t.skills.categories[cat.titleKey]}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="glass px-4 py-2.5 rounded-xl flex items-center gap-2.5 cursor-default group hover:neon-glow-purple transition-shadow"
                    >
                      <Icon className="w-4 h-4 text-primary group-hover:text-secondary transition-colors" />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
