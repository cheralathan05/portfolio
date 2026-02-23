import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ta" | "hi" | "es" | "fr" | "de" | "ja";

export interface Translations {
  nav: {
    home: string;
    skills: string;
    projects: string;
    aiLab: string;
    challenge: string;
    decisions: string;
    blog: string;
    resume: string;
  };
  hero: {
    status: string;
    statusTooltip: string;
    tagline: string;
    subtitle: string;
    viewProjects: string;
    downloadResume: string;
  };
  skills: {
    heading: string;
    subheading: string;
    categories: {
      languages: string;
      frontend: string;
      backend: string;
      aiTools: string;
    };
  };
  projects: {
    heading: string;
    subheading: string;
    explainAI: string;
    hideAI: string;
  };
  aiLab: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    impactMetrics: string;
    explanationMode: string;
    explanationDesc: string;
    codeThinking: string;
    codeThinkingDesc: string;
  };
  decisions: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    prompt: string;
    decisionLabel: string;
  };
  blog: {
    heading: string;
    subheading: string;
    readMore: string;
    backToBlogs: string;
    minRead: string;
    notFound: string;
  };
  resume: {
    heading: string;
    subheading: string;
    summary: string;
    summaryText: string;
    education: string;
    degreeTitle: string;
    degreeDesc: string;
    highlights: string;
    download: string;
    highlightItems: string[];
  };
  footer: {
    builtWith: string;
    by: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: { home: "Home", skills: "Skills", projects: "Projects", aiLab: "AI Lab", challenge: "Challenge Me", decisions: "Decisions", blog: "Blog", resume: "Resume" },
    hero: { status: "Available for Impact", statusTooltip: "Currently available for opportunities", tagline: "Building intelligent systems for the future.", subtitle: "Computer Science Engineer · Software Developer · GenAI & Web Innovator", viewProjects: "View Projects", downloadResume: "Download Resume" },
    skills: { heading: "Skill Galaxy", subheading: "Technologies I wield to build intelligent systems", categories: { languages: "Languages", frontend: "Frontend", backend: "Backend", aiTools: "AI & Tools" } },
    projects: { heading: "Project Lab", subheading: "AI-documented engineering work", explainAI: "Explain with AI", hideAI: "Hide AI Explanation" },
    aiLab: { badge: "Experimental AI Systems", heading: "AI", headingHighlight: "Lab", subheading: "15+ experimental AI systems that don't exist in other portfolios. Click to explore.", impactMetrics: "AI Impact Metrics", explanationMode: "Explanation Mode", explanationDesc: "Same project → different depth. Toggle complexity:", codeThinking: "Code Thinking Mode", codeThinkingDesc: "How Cheralathan approaches problems:" },
    decisions: { badge: "Decision Trace Engine™", heading: "How I", headingHighlight: "Think", subheading: "Explore the engineering decisions behind real projects. Every trade-off, every judgment call.", prompt: "Click a decision node above to explore the engineering reasoning.", decisionLabel: "DECISION →" },
    blog: { heading: "Blog", subheading: "Thoughts on engineering, AI, and the future of tech", readMore: "Read More", backToBlogs: "← Back to Blogs", minRead: "min read", notFound: "Blog post not found." },
    resume: { heading: "Resume", subheading: "Professional overview & experience", summary: "Professional Summary", summaryText: "Passionate Computer Science Engineer with expertise in full-stack development, generative AI, and scalable web architecture. Driven by a mission to build intelligent, user-centric systems that push the boundaries of modern technology.", education: "Education", degreeTitle: "B.E. Computer Science & Engineering", degreeDesc: "Building a strong foundation in algorithms, systems design, and AI", highlights: "Key Highlights", download: "Download Resume", highlightItems: ["Built real-time driver safety system with 94% detection accuracy", "Developed unified business information platform reducing data retrieval by 60%", "Designed AI-powered portfolio with intelligent assistant and 3D graphics", "Proficient in React, Node.js, Spring Boot, and OpenAI integrations"] },
    footer: { builtWith: "Built with", by: "by" },
  },
  ta: {
    nav: { home: "முகப்பு", skills: "திறன்கள்", projects: "திட்டங்கள்", aiLab: "AI ஆய்வகம்", challenge: "சவால் விடுங்கள்", decisions: "முடிவுகள்", blog: "வலைப்பதிவு", resume: "சுயவிவரம்" },
    hero: { status: "தாக்கத்திற்கு தயாராக உள்ளேன்", statusTooltip: "தற்போது வாய்ப்புகளுக்கு கிடைக்கிறேன்", tagline: "எதிர்காலத்திற்கான நுண்ணறிவு அமைப்புகளை உருவாக்குகிறேன்.", subtitle: "கணினி அறிவியல் பொறியாளர் · மென்பொருள் உருவாக்குநர் · GenAI & வலை புதுமையாளர்", viewProjects: "திட்டங்களைப் பாருங்கள்", downloadResume: "சுயவிவரம் பதிவிறக்கம்" },
    skills: { heading: "திறன் அண்டம்", subheading: "நுண்ணறிவு அமைப்புகளை உருவாக்க நான் பயன்படுத்தும் தொழில்நுட்பங்கள்", categories: { languages: "மொழிகள்", frontend: "முன்நிலை", backend: "பின்நிலை", aiTools: "AI & கருவிகள்" } },
    projects: { heading: "திட்ட ஆய்வகம்", subheading: "AI-ஆவணப்படுத்தப்பட்ட பொறியியல் பணிகள்", explainAI: "AI மூலம் விளக்கு", hideAI: "AI விளக்கத்தை மறை" },
    aiLab: { badge: "சோதனை AI அமைப்புகள்", heading: "AI", headingHighlight: "ஆய்வகம்", subheading: "மற்ற போர்ட்ஃபோலியோக்களில் இல்லாத 15+ சோதனை AI அமைப்புகள். ஆராய கிளிக் செய்யுங்கள்.", impactMetrics: "AI தாக்க அளவீடுகள்", explanationMode: "விளக்க முறை", explanationDesc: "ஒரே திட்டம் → வெவ்வேறு ஆழம். சிக்கலை மாற்றுங்கள்:", codeThinking: "குறியீடு சிந்தனை முறை", codeThinkingDesc: "செராலதன் பிரச்சனைகளை எப்படி அணுகுகிறார்:" },
    decisions: { badge: "முடிவு தடம் இயந்திரம்™", heading: "நான் எப்படி", headingHighlight: "சிந்திக்கிறேன்", subheading: "உண்மையான திட்டங்களின் பின்னால் உள்ள பொறியியல் முடிவுகளை ஆராயுங்கள்.", prompt: "பொறியியல் பகுத்தறிவை ஆராய மேலே உள்ள முடிவு முனையைக் கிளிக் செய்யவும்.", decisionLabel: "முடிவு →" },
    blog: { heading: "வலைப்பதிவு", subheading: "பொறியியல், AI மற்றும் தொழில்நுட்பத்தின் எதிர்காலம் பற்றிய கருத்துகள்", readMore: "மேலும் படிக்க", backToBlogs: "← வலைப்பதிவுகளுக்குத் திரும்பு", minRead: "நிமிட வாசிப்பு", notFound: "வலைப்பதிவு கிடைக்கவில்லை." },
    resume: { heading: "சுயவிவரம்", subheading: "தொழில்முறை கண்ணோட்டம் & அனுபவம்", summary: "தொழில்முறை சுருக்கம்", summaryText: "முழு-அடுக்கு மேம்பாடு, ஜெனரேட்டிவ் AI மற்றும் அளவிடக்கூடிய வலை கட்டமைப்பில் நிபுணத்துவம் கொண்ட ஆர்வமுள்ள கணினி அறிவியல் பொறியாளர்.", education: "கல்வி", degreeTitle: "B.E. கணினி அறிவியல் & பொறியியல்", degreeDesc: "வழிமுறைகள், அமைப்புகள் வடிவமைப்பு மற்றும் AI இல் வலுவான அடித்தளம் உருவாக்குகிறேன்", highlights: "முக்கிய சாதனைகள்", download: "சுயவிவரம் பதிவிறக்கம்", highlightItems: ["94% கண்டறிதல் துல்லியத்துடன் நிகழ்நேர ஓட்டுநர் பாதுகாப்பு அமைப்பை உருவாக்கினேன்", "தரவு மீட்டெடுப்பை 60% குறைக்கும் ஒருங்கிணைந்த வணிக தகவல் தளத்தை உருவாக்கினேன்", "3D கிராபிக்ஸுடன் AI-இயக்கப்படும் போர்ட்ஃபோலியோவை வடிவமைத்தேன்", "React, Node.js, Spring Boot மற்றும் OpenAI தொகுப்புகளில் நிபுணர்"] },
    footer: { builtWith: "உருவாக்கப்பட்டது", by: "ஆல்" },
  },
  hi: {
    nav: { home: "होम", skills: "कौशल", projects: "प्रोजेक्ट", aiLab: "AI लैब", challenge: "चुनौती दें", decisions: "निर्णय", blog: "ब्लॉग", resume: "रेज़्यूमे" },
    hero: { status: "प्रभाव के लिए उपलब्ध", statusTooltip: "वर्तमान में अवसरों के लिए उपलब्ध", tagline: "भविष्य के लिए बुद्धिमान प्रणालियाँ बना रहा हूँ।", subtitle: "कंप्यूटर साइंस इंजीनियर · सॉफ्टवेयर डेवलपर · GenAI & वेब इनोवेटर", viewProjects: "प्रोजेक्ट देखें", downloadResume: "रेज़्यूमे डाउनलोड करें" },
    skills: { heading: "कौशल आकाशगंगा", subheading: "तकनीकें जो मैं बुद्धिमान प्रणालियाँ बनाने के लिए उपयोग करता हूँ", categories: { languages: "भाषाएँ", frontend: "फ्रंटएंड", backend: "बैकएंड", aiTools: "AI & उपकरण" } },
    projects: { heading: "प्रोजेक्ट लैब", subheading: "AI-दस्तावेज़ीकृत इंजीनियरिंग कार्य", explainAI: "AI से समझाएं", hideAI: "AI स्पष्टीकरण छुपाएं" },
    aiLab: { badge: "प्रयोगात्मक AI प्रणालियाँ", heading: "AI", headingHighlight: "लैब", subheading: "15+ प्रयोगात्मक AI प्रणालियाँ जो अन्य पोर्टफोलियो में नहीं हैं। खोजने के लिए क्लिक करें।", impactMetrics: "AI प्रभाव मेट्रिक्स", explanationMode: "स्पष्टीकरण मोड", explanationDesc: "एक ही प्रोजेक्ट → अलग गहराई। जटिलता बदलें:", codeThinking: "कोड सोच मोड", codeThinkingDesc: "चेरालतन समस्याओं को कैसे हल करता है:" },
    decisions: { badge: "निर्णय ट्रेस इंजन™", heading: "मैं कैसे", headingHighlight: "सोचता हूँ", subheading: "वास्तविक प्रोजेक्ट्स के पीछे के इंजीनियरिंग निर्णयों का अन्वेषण करें।", prompt: "इंजीनियरिंग तर्क को जानने के लिए ऊपर एक निर्णय नोड पर क्लिक करें।", decisionLabel: "निर्णय →" },
    blog: { heading: "ब्लॉग", subheading: "इंजीनियरिंग, AI और तकनीक के भविष्य पर विचार", readMore: "और पढ़ें", backToBlogs: "← ब्लॉग पर वापस जाएं", minRead: "मिनट पढ़ाई", notFound: "ब्लॉग पोस्ट नहीं मिला।" },
    resume: { heading: "रेज़्यूमे", subheading: "पेशेवर अवलोकन और अनुभव", summary: "पेशेवर सारांश", summaryText: "फुल-स्टैक डेवलपमेंट, जेनरेटिव AI और स्केलेबल वेब आर्किटेक्चर में विशेषज्ञता वाला भावुक कंप्यूटर साइंस इंजीनियर।", education: "शिक्षा", degreeTitle: "B.E. कंप्यूटर साइंस & इंजीनियरिंग", degreeDesc: "एल्गोरिदम, सिस्टम डिज़ाइन और AI में मजबूत आधार बना रहा हूँ", highlights: "मुख्य उपलब्धियाँ", download: "रेज़्यूमे डाउनलोड करें", highlightItems: ["94% सटीकता के साथ रियल-टाइम ड्राइवर सुरक्षा प्रणाली बनाई", "डेटा पुनर्प्राप्ति को 60% कम करने वाला एकीकृत व्यापार सूचना प्लेटफॉर्म विकसित किया", "3D ग्राफिक्स के साथ AI-संचालित पोर्टफोलियो डिज़ाइन किया", "React, Node.js, Spring Boot और OpenAI में दक्ष"] },
    footer: { builtWith: "के साथ बनाया", by: "द्वारा" },
  },
  es: {
    nav: { home: "Inicio", skills: "Habilidades", projects: "Proyectos", aiLab: "Lab IA", challenge: "Desafíame", decisions: "Decisiones", blog: "Blog", resume: "Currículum" },
    hero: { status: "Disponible para generar impacto", statusTooltip: "Actualmente disponible para oportunidades", tagline: "Construyendo sistemas inteligentes para el futuro.", subtitle: "Ingeniero en Ciencias de la Computación · Desarrollador de Software · Innovador GenAI & Web", viewProjects: "Ver Proyectos", downloadResume: "Descargar Currículum" },
    skills: { heading: "Galaxia de Habilidades", subheading: "Tecnologías que uso para construir sistemas inteligentes", categories: { languages: "Lenguajes", frontend: "Frontend", backend: "Backend", aiTools: "IA & Herramientas" } },
    projects: { heading: "Laboratorio de Proyectos", subheading: "Trabajo de ingeniería documentado con IA", explainAI: "Explicar con IA", hideAI: "Ocultar explicación IA" },
    aiLab: { badge: "Sistemas IA Experimentales", heading: "IA", headingHighlight: "Lab", subheading: "15+ sistemas IA experimentales que no existen en otros portafolios. Haz clic para explorar.", impactMetrics: "Métricas de Impacto IA", explanationMode: "Modo Explicación", explanationDesc: "Mismo proyecto → diferente profundidad. Cambia la complejidad:", codeThinking: "Modo Pensamiento de Código", codeThinkingDesc: "Cómo Cheralathan aborda los problemas:" },
    decisions: { badge: "Motor de Trazado de Decisiones™", heading: "Cómo", headingHighlight: "Pienso", subheading: "Explora las decisiones de ingeniería detrás de proyectos reales.", prompt: "Haz clic en un nodo de decisión arriba para explorar el razonamiento.", decisionLabel: "DECISIÓN →" },
    blog: { heading: "Blog", subheading: "Reflexiones sobre ingeniería, IA y el futuro de la tecnología", readMore: "Leer más", backToBlogs: "← Volver al Blog", minRead: "min de lectura", notFound: "Publicación no encontrada." },
    resume: { heading: "Currículum", subheading: "Resumen profesional y experiencia", summary: "Resumen Profesional", summaryText: "Ingeniero en Ciencias de la Computación apasionado con experiencia en desarrollo full-stack, IA generativa y arquitectura web escalable.", education: "Educación", degreeTitle: "B.E. Ciencias de la Computación e Ingeniería", degreeDesc: "Construyendo una base sólida en algoritmos, diseño de sistemas e IA", highlights: "Logros Clave", download: "Descargar Currículum", highlightItems: ["Sistema de seguridad para conductores con 94% de precisión", "Plataforma empresarial que redujo el tiempo de recuperación de datos en 60%", "Portafolio con IA y gráficos 3D diseñado", "Competente en React, Node.js, Spring Boot y OpenAI"] },
    footer: { builtWith: "Construido con", by: "por" },
  },
  fr: {
    nav: { home: "Accueil", skills: "Compétences", projects: "Projets", aiLab: "Lab IA", challenge: "Défiez-moi", decisions: "Décisions", blog: "Blog", resume: "CV" },
    hero: { status: "Disponible pour créer de l'impact", statusTooltip: "Actuellement disponible pour des opportunités", tagline: "Construire des systèmes intelligents pour l'avenir.", subtitle: "Ingénieur en Informatique · Développeur Logiciel · Innovateur GenAI & Web", viewProjects: "Voir les Projets", downloadResume: "Télécharger le CV" },
    skills: { heading: "Galaxie de Compétences", subheading: "Technologies que j'utilise pour construire des systèmes intelligents", categories: { languages: "Langages", frontend: "Frontend", backend: "Backend", aiTools: "IA & Outils" } },
    projects: { heading: "Laboratoire de Projets", subheading: "Travail d'ingénierie documenté par IA", explainAI: "Expliquer avec l'IA", hideAI: "Masquer l'explication IA" },
    aiLab: { badge: "Systèmes IA Expérimentaux", heading: "IA", headingHighlight: "Lab", subheading: "15+ systèmes IA expérimentaux uniques. Cliquez pour explorer.", impactMetrics: "Métriques d'Impact IA", explanationMode: "Mode Explication", explanationDesc: "Même projet → profondeur différente. Basculez la complexité :", codeThinking: "Mode Pensée Code", codeThinkingDesc: "Comment Cheralathan aborde les problèmes :" },
    decisions: { badge: "Moteur de Traçage de Décisions™", heading: "Comment je", headingHighlight: "Pense", subheading: "Explorez les décisions d'ingénierie derrière de vrais projets.", prompt: "Cliquez sur un nœud de décision ci-dessus pour explorer le raisonnement.", decisionLabel: "DÉCISION →" },
    blog: { heading: "Blog", subheading: "Réflexions sur l'ingénierie, l'IA et l'avenir de la technologie", readMore: "Lire la suite", backToBlogs: "← Retour aux Articles", minRead: "min de lecture", notFound: "Article introuvable." },
    resume: { heading: "CV", subheading: "Aperçu professionnel & expérience", summary: "Résumé Professionnel", summaryText: "Ingénieur en Informatique passionné avec une expertise en développement full-stack, IA générative et architecture web évolutive.", education: "Formation", degreeTitle: "B.E. Informatique & Ingénierie", degreeDesc: "Construction d'une base solide en algorithmes, conception de systèmes et IA", highlights: "Points Clés", download: "Télécharger le CV", highlightItems: ["Système de sécurité conducteur en temps réel avec 94% de précision", "Plateforme d'information unifiée réduisant la récupération de données de 60%", "Portfolio alimenté par IA avec graphiques 3D conçu", "Maîtrise de React, Node.js, Spring Boot et OpenAI"] },
    footer: { builtWith: "Construit avec", by: "par" },
  },
  de: {
    nav: { home: "Startseite", skills: "Fähigkeiten", projects: "Projekte", aiLab: "KI-Labor", challenge: "Herausfordern", decisions: "Entscheidungen", blog: "Blog", resume: "Lebenslauf" },
    hero: { status: "Verfügbar für Wirkung", statusTooltip: "Derzeit verfügbar für Möglichkeiten", tagline: "Intelligente Systeme für die Zukunft entwickeln.", subtitle: "Informatikingenieur · Softwareentwickler · GenAI & Web-Innovator", viewProjects: "Projekte ansehen", downloadResume: "Lebenslauf herunterladen" },
    skills: { heading: "Fähigkeits-Galaxie", subheading: "Technologien, die ich zum Aufbau intelligenter Systeme einsetze", categories: { languages: "Sprachen", frontend: "Frontend", backend: "Backend", aiTools: "KI & Werkzeuge" } },
    projects: { heading: "Projekt-Labor", subheading: "KI-dokumentierte Ingenieurarbeit", explainAI: "Mit KI erklären", hideAI: "KI-Erklärung ausblenden" },
    aiLab: { badge: "Experimentelle KI-Systeme", heading: "KI", headingHighlight: "Labor", subheading: "15+ experimentelle KI-Systeme, die es in anderen Portfolios nicht gibt. Klicken zum Erkunden.", impactMetrics: "KI-Wirkungsmetriken", explanationMode: "Erklärungsmodus", explanationDesc: "Gleiches Projekt → unterschiedliche Tiefe. Komplexität umschalten:", codeThinking: "Code-Denkmodus", codeThinkingDesc: "Wie Cheralathan Probleme angeht:" },
    decisions: { badge: "Entscheidungs-Trace-Engine™", heading: "Wie ich", headingHighlight: "Denke", subheading: "Erkunden Sie die Ingenieursentscheidungen hinter echten Projekten.", prompt: "Klicken Sie oben auf einen Entscheidungsknoten, um die Argumentation zu erkunden.", decisionLabel: "ENTSCHEIDUNG →" },
    blog: { heading: "Blog", subheading: "Gedanken zu Ingenieurwesen, KI und der Zukunft der Technologie", readMore: "Mehr lesen", backToBlogs: "← Zurück zum Blog", minRead: "Min Lesezeit", notFound: "Blogbeitrag nicht gefunden." },
    resume: { heading: "Lebenslauf", subheading: "Beruflicher Überblick & Erfahrung", summary: "Berufliche Zusammenfassung", summaryText: "Leidenschaftlicher Informatikingenieur mit Expertise in Full-Stack-Entwicklung, generativer KI und skalierbarer Web-Architektur.", education: "Ausbildung", degreeTitle: "B.E. Informatik & Ingenieurwesen", degreeDesc: "Aufbau einer starken Grundlage in Algorithmen, Systemdesign und KI", highlights: "Wichtige Leistungen", download: "Lebenslauf herunterladen", highlightItems: ["Echtzeit-Fahrsicherheitssystem mit 94% Erkennungsgenauigkeit", "Einheitliche Informationsplattform mit 60% kürzerer Datenabrufzeit", "KI-betriebenes Portfolio mit 3D-Grafiken entworfen", "Kompetent in React, Node.js, Spring Boot und OpenAI"] },
    footer: { builtWith: "Gebaut mit", by: "von" },
  },
  ja: {
    nav: { home: "ホーム", skills: "スキル", projects: "プロジェクト", aiLab: "AIラボ", challenge: "挑戦する", decisions: "意思決定", blog: "ブログ", resume: "履歴書" },
    hero: { status: "インパクトのために利用可能", statusTooltip: "現在、機会を求めています", tagline: "未来のためのインテリジェントシステムを構築しています。", subtitle: "コンピュータサイエンスエンジニア · ソフトウェア開発者 · GenAI & Webイノベーター", viewProjects: "プロジェクトを見る", downloadResume: "履歴書をダウンロード" },
    skills: { heading: "スキル銀河", subheading: "インテリジェントシステムを構築するための技術", categories: { languages: "言語", frontend: "フロントエンド", backend: "バックエンド", aiTools: "AI & ツール" } },
    projects: { heading: "プロジェクトラボ", subheading: "AIドキュメント化されたエンジニアリング作業", explainAI: "AIで説明する", hideAI: "AI説明を非表示" },
    aiLab: { badge: "実験的AIシステム", heading: "AI", headingHighlight: "ラボ", subheading: "他のポートフォリオにない15以上の実験的AIシステム。クリックして探索。", impactMetrics: "AIインパクト指標", explanationMode: "説明モード", explanationDesc: "同じプロジェクト → 異なる深さ。複雑さを切り替え：", codeThinking: "コード思考モード", codeThinkingDesc: "チェララタンの問題解決アプローチ：" },
    decisions: { badge: "決定トレースエンジン™", heading: "私の", headingHighlight: "思考法", subheading: "実際のプロジェクトの背後にあるエンジニアリングの決定を探索。", prompt: "上の決定ノードをクリックしてエンジニアリングの理由を探索してください。", decisionLabel: "決定 →" },
    blog: { heading: "ブログ", subheading: "エンジニアリング、AI、テクノロジーの未来についての考え", readMore: "続きを読む", backToBlogs: "← ブログに戻る", minRead: "分で読めます", notFound: "ブログ記事が見つかりません。" },
    resume: { heading: "履歴書", subheading: "職歴概要と経験", summary: "職務要約", summaryText: "フルスタック開発、生成AI、スケーラブルなウェブアーキテクチャの専門知識を持つ情熱的なコンピュータサイエンスエンジニア。", education: "学歴", degreeTitle: "B.E. コンピュータサイエンス & エンジニアリング", degreeDesc: "アルゴリズム、システム設計、AIの強固な基盤を構築", highlights: "主な実績", download: "履歴書をダウンロード", highlightItems: ["94%の検出精度を持つリアルタイムドライバー安全システムを構築", "データ取得を60%削減する統合ビジネス情報プラットフォームを開発", "3Dグラフィックスを備えたAI搭載ポートフォリオを設計", "React、Node.js、Spring Boot、OpenAIに精通"] },
    footer: { builtWith: "で作られました", by: "by" },
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-lang");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
