import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero from "./components/Hero";
import Memories from "./components/Memories";
import Message from "./components/Message";
import Playlist from "./components/Playlist";
import Puzzle from "./components/Puzzle";
import MemoryGame from "./components/MemoryGame";
import WordScramble from "./components/WordScramble";
import { triggerConfetti } from "./components/Confetti";
import { Heart, Menu, X } from "lucide-react";

const CELEBRATION_SOUND = "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3";

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    triggerConfetti();
    const audio = new Audio(CELEBRATION_SOUND);
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const navItems = [
    { name: "Gallery", href: "#gallery" },
    { name: "Music", href: "#music" },
    { name: "Puzzles", href: "#puzzles" },
  ];

  return (
    <div className="min-h-screen bg-midnight text-white selection:bg-gold/30 selection:text-gold">
      {/* Navigation */}
      <AnimatePresence>
        {isOpened && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              isScrolled ? "bg-midnight/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              <a href="#" className="flex items-center gap-2 group">
                <span className="serif text-xl tracking-tight font-light hidden sm:block">Pathsarthee <span className="italic text-gold">Director</span></span>
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-12">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white/70 hover:text-gold transition-colors"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-midnight flex flex-col items-center justify-center gap-12"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-6 text-white/70 hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="serif text-4xl text-white hover:text-gold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero onOpen={handleOpen} isOpened={isOpened} />
        
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Memories />
            <Message />
            <Playlist />
            <Puzzle />
            <MemoryGame />
            <WordScramble />
            
            {/* Footer */}
            <footer className="py-24 px-6 border-t border-white/5 bg-midnight text-center">
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="serif text-3xl md:text-5xl font-light">
                  Happy Birthday, <span className="italic text-gold">Director Mam!</span>
                </h2>
                <p className="text-white/40 text-sm font-light tracking-widest uppercase">
                  © 2026 Pathsarthee NGO. Celebrating special moments.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </main>
    </div>
  );
}
