import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LiveStatus() {
  const { t } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full cursor-default hover:neon-glow-cyan transition-shadow duration-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"
              style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6), 0 0 20px rgba(52,211,153,0.3)" }}
            />
          </span>
          <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
            {t.hero.status}
          </span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="bg-card border-border text-foreground text-xs"
      >
        {t.hero.statusTooltip}
      </TooltipContent>
    </Tooltip>
  );
}
