import { profile, skills, projects, blogs, strengths, goals, achievements } from "./knowledgeBase";

export interface MatchedResponse {
  content: string;
}

// Language detection: detect the language of user input
const langPatterns: Record<string, RegExp> = {
  ta: /[\u0B80-\u0BFF]/,
  hi: /[\u0900-\u097F]/,
  ja: /[\u3040-\u30FF\u4E00-\u9FFF]/,
  es: /\b(hola|qué|cómo|dónde|cuál|por qué|quién|háblame|cuéntame|eres|tienes|puedes|trabajas|experiencia|habilidades|proyectos)\b/i,
  fr: /\b(bonjour|comment|pourquoi|qui|quel|parlez|expérience|compétences|projets|embaucher)\b/i,
  de: /\b(hallo|warum|wer|wie|was|erzähl|fähigkeiten|projekte|erfahrung|einstellen)\b/i,
};

export function detectInputLang(text: string): string {
  for (const [lang, pat] of Object.entries(langPatterns)) {
    if (pat.test(text)) return lang;
  }
  return "en";
}

// Wrappers to format responses in detected language
const introByLang: Record<string, string> = {
  en: `I'm Cheralathan B.N — ${profile.title}. ${profile.summary}`,
  ta: `நான் செராலதன் B.N — கணினி அறிவியல் பொறியாளர். முழு-அடுக்கு மேம்பாடு, ஜெனரேட்டிவ் AI மற்றும் அளவிடக்கூடிய வலை கட்டமைப்பில் நிபுணத்துவம் கொண்ட ஆர்வமுள்ள பொறியாளர்.`,
  hi: `मैं चेरालतन B.N हूँ — कंप्यूटर साइंस इंजीनियर। फुल-स्टैक डेवलपमेंट, जेनरेटिव AI और स्केलेबल वेब आर्किटेक्चर में विशेषज्ञता वाला भावुक इंजीनियर।`,
  es: `Soy Cheralathan B.N — Ingeniero en Ciencias de la Computación. Apasionado por el desarrollo full-stack, la IA generativa y la arquitectura web escalable.`,
  fr: `Je suis Cheralathan B.N — Ingénieur en Informatique. Passionné par le développement full-stack, l'IA générative et l'architecture web évolutive.`,
  de: `Ich bin Cheralathan B.N — Informatik-Ingenieur. Leidenschaftlich für Full-Stack-Entwicklung, generative KI und skalierbare Web-Architektur.`,
  ja: `チェラーラタン B.N です。コンピューターサイエンスエンジニアとして、フルスタック開発、生成AI、スケーラブルなWebアーキテクチャに情熱を注いでいます。`,
};

// Topic detection patterns (language-agnostic via multilingual keywords)
interface TopicMatcher {
  pattern: RegExp;
  key: string;
}

const topicMatchers: TopicMatcher[] = [
  { pattern: /\b(skill|tech|stack|language|framework|திறன்|कौशल|habilidad|compétence|fähigkeit|スキル|技術)\b/i, key: "skills" },
  { pattern: /\b(project|work|built|portfolio|ship|திட்ட|प्रोजेक्ट|proyecto|projet|projekt|プロジェクト)\b/i, key: "projects" },
  { pattern: /\b(hire|why.*hire|recruit|pitch|value|நியமி|भर्ती|contratar|embaucher|einstellen|採用)\b/i, key: "hire" },
  { pattern: /\b(experience|background|about|who|journey|story|அனுபவ|अनुभव|experiencia|expérience|erfahrung|経験)\b/i, key: "about" },
  { pattern: /\b(education|degree|study|college|university|கல்வி|शिक्षा|educación|formation|bildung|学歴)\b/i, key: "education" },
  { pattern: /\b(blog|article|write|post|வலைப்பதிவு|ब्लॉग|artículo|article|artikel|ブログ)\b/i, key: "blogs" },
  { pattern: /\b(resume|cv|download|சுயவிவரம்|रेज़्यूमे|currículum|lebenslauf|履歴書)\b/i, key: "resume" },
  { pattern: /\b(goal|future|plan|vision|ambition|இலக்கு|लक्ष्य|objetivo|objectif|ziel|目標)\b/i, key: "goals" },
  { pattern: /\b(strength|strong|best|quality|சிறந்த|ताकत|fortaleza|force|stärke|強み)\b/i, key: "strengths" },
  { pattern: /\b(achievement|accomplish|highlight|சாதனை|उपलब्धि|logro|réalisation|leistung|実績)\b/i, key: "achievements" },
  { pattern: /\b(contact|email|reach|connect|தொடர்பு|संपर्क|contacto|kontakt|連絡)\b/i, key: "contact" },
  { pattern: /\b(hello|hi|hey|greet|வணக்கம்|नमस्ते|hola|bonjour|hallo|こんにちは|salut)\b/i, key: "greeting" },
  { pattern: /\b(driver|safety|drowsin|drown|கண்டறி|졸음|somnolen|sécurité|sicherheit)\b/i, key: "project_driver" },
  { pattern: /\b(business|unified|platform|enterprise|dashboard|வணிக|व्यापार|negocio|entreprise)\b/i, key: "project_business" },
  { pattern: /\b(java|spring\s*boot)\b/i, key: "skill_java" },
  { pattern: /\b(react|frontend|front.?end|tailwind|three\.?js)\b/i, key: "skill_frontend" },
  { pattern: /\b(node|backend|back.?end|mysql|database|api)\b/i, key: "skill_backend" },
  { pattern: /\b(ai|openai|genai|artificial|intelligence|machine\s*learn|prompt)\b/i, key: "skill_ai" },
];

function detectTopic(input: string): string {
  for (const { pattern, key } of topicMatchers) {
    if (pattern.test(input)) return key;
  }
  return "general";
}

// Response generators for each topic
const responses: Record<string, (lang: string) => string> = {
  greeting: (lang) => introByLang[lang] || introByLang.en,

  skills: () =>
    `**My Technical Stack:**\n\n` +
    `• **Languages:** ${skills.languages.join(", ")}\n` +
    `• **Frontend:** ${skills.frontend.join(", ")}\n` +
    `• **Backend:** ${skills.backend.join(", ")}\n` +
    `• **AI & ML:** ${skills.ai.join(", ")}\n` +
    `• **Tools:** ${skills.tools.join(", ")}\n\n` +
    `Every technology here is backed by real production projects, not just tutorials or coursework.`,

  projects: () =>
    `**My Projects:**\n\n` +
    projects
      .map((p) => `**${p.name}** — ${p.description}\n📊 Impact: ${p.impact}\n🛠 Tech: ${p.tech.join(", ")}`)
      .join("\n\n"),

  project_driver: () =>
    `**Driver Safety System**\n\n${projects[0].description}\n\n` +
    `📊 **Impact:** ${projects[0].impact}\n` +
    `🛠 **Tech:** ${projects[0].tech.join(", ")}\n\n` +
    `This project demonstrates my ability to build real-time, safety-critical systems using computer vision and deep learning.`,

  project_business: () =>
    `**Unified Business Information System**\n\n${projects[1].description}\n\n` +
    `📊 **Impact:** ${projects[1].impact}\n` +
    `🛠 **Tech:** ${projects[1].tech.join(", ")}\n\n` +
    `This project showcases my enterprise engineering skills — database optimization, API design, and performance-first architecture.`,

  hire: () =>
    `**Why You Should Hire Me:**\n\n` +
    strengths.map((s, i) => `${i + 1}. ${s}`).join("\n") +
    `\n\n**The Bottom Line:** I'm the engineer who builds the thing AND makes it beautiful. Every project I ship has measurable impact, production-grade quality, and thoughtful architecture. This portfolio itself is proof — 15+ AI features, 3D graphics, multilingual support, all built from scratch.`,

  about: () =>
    `${introByLang.en}\n\n` +
    `I specialize in building intelligent, production-ready systems that combine full-stack engineering with cutting-edge AI integration. My approach is impact-driven: I measure everything, ship fast, and architect for scale.\n\n` +
    `What sets me apart is that I don't just use technology — I push its boundaries. Every project in my portfolio demonstrates real-world problem solving with quantifiable results.`,

  education: () =>
    `**Education:**\n\n🎓 **${profile.education.degree}**\n\nFocus: ${profile.education.focus}\n\nBut my real education happens through building. Each project pushed me far beyond the classroom — from computer vision to AI integration to 3D web graphics. I learn by shipping, not just studying.`,

  blogs: () =>
    `**My Engineering Blog:**\n\n` +
    blogs.map((b) => `📝 **${b.title}**\n   Topics: ${b.topic}`).join("\n\n") +
    `\n\nI write about the engineering decisions and technical depth behind real-world systems. These aren't summaries — they're detailed technical breakdowns with production insights.`,

  resume: () =>
    `My resume is available for download directly from this portfolio. Click the **"Download Resume"** button in the Hero section or the Resume section.\n\nIt includes my full professional summary, education, project highlights, and technical skills.`,

  goals: () =>
    `**My Career Goals:**\n\n` +
    goals.map((g) => `🎯 ${g}`).join("\n") +
    `\n\nI'm building toward a future where I lead engineering teams that ship AI-powered products with real impact. Every project I take on is a deliberate step in that direction.`,

  strengths: () =>
    `**My Core Strengths:**\n\n` +
    strengths.map((s) => `✅ ${s}`).join("\n") +
    `\n\nThese aren't self-assessments — they're demonstrated through every project in my portfolio.`,

  achievements: () =>
    `**Key Achievements:**\n\n` +
    achievements.map((a) => `🏆 ${a}`).join("\n"),

  contact: () =>
    `You can connect with me through this portfolio. I'm currently **available for opportunities** — feel free to reach out about roles in full-stack development, AI engineering, or founding-engineer positions.\n\nYou can also download my resume for detailed contact information.`,

  skill_java: () =>
    `**Java & Spring Boot Expertise:**\n\nI use Java and Spring Boot for building resilient, enterprise-grade backend services. My experience includes:\n\n• RESTful API design with Spring Boot\n• Database optimization with MySQL\n• Circuit breaker patterns with Resilience4j\n• Structured logging and observability\n\nMy Unified Business Platform was built entirely on this stack, achieving a 60% reduction in data retrieval time through architectural decisions like in-memory caching and query optimization.`,

  skill_frontend: () =>
    `**Frontend Engineering:**\n\nMy frontend stack: **React + TypeScript + Tailwind CSS + Three.js + Framer Motion**\n\nI build component-driven UIs with attention to performance, accessibility, and user experience. This portfolio is a live demonstration — featuring:\n\n• 3D graphics with React Three Fiber\n• Smooth animations with Framer Motion\n• Responsive design with Tailwind CSS\n• 15+ interactive AI features\n• Multilingual support across 7 languages`,

  skill_backend: () =>
    `**Backend Engineering:**\n\nI build production-ready backend systems using:\n\n• **Node.js** for high-throughput event-driven services\n• **Spring Boot** for enterprise-grade Java applications\n• **MySQL** for relational data with optimized queries\n• **REST APIs** with proper error handling, validation, and documentation\n\nI design for failure first — circuit breakers, retry patterns, and structured logging are part of my standard architecture.`,

  skill_ai: () =>
    `**AI & Machine Learning:**\n\nMy AI experience spans:\n\n• **OpenAI API** — Production integrations with proper prompt engineering, context management, and structured outputs\n• **Computer Vision** — CNN-based classification with OpenCV for real-time processing (94% accuracy in my Driver Safety System)\n• **Prompt Engineering** — Advanced techniques including chain-of-thought, few-shot learning, and output schema design\n\nI don't just use AI — I engineer AI into production systems with measurable outcomes.`,

  general: (lang) =>
    (introByLang[lang] || introByLang.en) +
    `\n\nI can tell you about my skills, projects, experience, education, blog posts, achievements, goals, or why I'd be a great addition to your team. What would you like to know?`,
};

// Memory to avoid repeating the exact same response
const usedTopics = new Set<string>();

export function generateResponse(input: string): MatchedResponse {
  const lang = detectInputLang(input);
  const topic = detectTopic(input);

  let responseKey = topic;

  // If we already answered this topic, redirect to a related one
  if (usedTopics.has(topic) && topic !== "greeting" && topic !== "general") {
    const alternatives = Object.keys(responses).filter((k) => !usedTopics.has(k) && k !== "general" && k !== "greeting");
    if (alternatives.length > 0) {
      responseKey = alternatives[0];
    }
  }

  usedTopics.add(responseKey);
  const generator = responses[responseKey] || responses.general;
  return { content: generator(lang) };
}

export function getGreeting(lang: string): string {
  return introByLang[lang] || introByLang.en;
}

export function resetMemory() {
  usedTopics.clear();
}
