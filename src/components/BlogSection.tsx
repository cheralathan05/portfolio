import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineCalendar, HiOutlineArrowRight, HiOutlineClock } from "react-icons/hi";
import { blogPosts } from "@/data/blogPosts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogSection() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.blog.heading}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t.blog.subheading}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:neon-glow-cyan transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HiOutlineCalendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HiOutlineClock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:gradient-text transition-all">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {post.excerpt}
              </p>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors group/link"
              >
                {t.blog.readMore}
                <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
