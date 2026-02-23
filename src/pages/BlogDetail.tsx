import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineArrowLeft } from "react-icons/hi";
import { blogPosts } from "@/data/blogPosts";
import { useLanguage } from "@/contexts/LanguageContext";

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: JSX.Element[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      key++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.indexOf("**", 2) === trimmed.length - 2) {
      elements.push(
        <p key={key} className="font-semibold text-foreground mt-6 mb-2">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else {
      // Inline bold support
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={key} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i} className="text-foreground font-semibold">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      );
    }
    key++;
  }
  return elements;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">{t.blog.notFound}</p>
        <Link
          to="/#blog"
          className="text-sm text-neon-cyan hover:text-neon-purple transition-colors flex items-center gap-1"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          {t.blog.backToBlogs}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass-strong border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.blog.backToBlogs}
          </Link>
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-6 py-16"
      >
        {/* Tag */}
        <div className="mb-6">
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {post.tag}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-5 mb-10 pb-10 border-b border-border">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <HiOutlineCalendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <HiOutlineClock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.blog.backToBlogs}
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
