import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

interface NavbarProps {
  onChatClick: () => void;
}

export const Navbar = ({ onChatClick }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-glass-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              {/* <Sparkles className="h-8 w-8 text-primary animate-glow" /> */}
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-lg animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              GramAI
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#about"
              className="text-foreground/70 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.a
              href="#features"
              className="text-foreground/70 hover:text-primary transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Features
            </motion.a>
            <motion.button
              onClick={onChatClick}
              className="glass border border-primary/30 px-6 py-2 rounded-xl text-primary hover:shadow-glow-primary transition-all duration-300 flex items-center space-x-2 hover:bg-primary/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Start Chat</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={onChatClick}
            className="md:hidden glass border border-primary/30 p-3 rounded-xl text-primary hover:shadow-glow-primary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};