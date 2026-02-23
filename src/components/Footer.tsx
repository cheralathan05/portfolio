import { HiOutlineHeart } from "react-icons/hi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
       
          
        </p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/cheralathan05" className="text-muted-foreground hover:text-primary transition-colors">
            <SiGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/cheralathan05/" className="text-muted-foreground hover:text-secondary transition-colors">
            <SiLinkedin className="w-5 h-5" />
          
          </a>
        </div>
      </div>
    </footer>
  );
}
