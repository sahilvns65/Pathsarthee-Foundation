import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { triggerSingleConfetti } from "./Confetti";

interface HeroProps {
  onOpen: () => void;
  isOpened: boolean;
}

export default function Hero({ onOpen, isOpened }: HeroProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        {!isOpened ? (
          <motion.div
            key="closed"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="space-y-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5"
              >
                <Heart className="text-gold w-8 h-8 fill-gold/20" />
              </motion.div>
            </div>
            
            <h1 className="serif text-5xl md:text-7xl font-light tracking-tight text-white mb-4">
              Celebrating <br />
              <span className="italic text-gold">Our Director</span>
            </h1>
            
            <p className="text-white/60 font-light tracking-widest uppercase text-xs mb-12">
              A tribute to leadership and kindness
            </p>

            <button
              onClick={() => {
                onOpen();
                triggerSingleConfetti();
              }}
              className="group relative px-12 py-4 bg-transparent border border-gold/40 rounded-full overflow-hidden transition-all hover:border-gold"
            >
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors" />
              <span className="relative text-gold font-medium tracking-widest uppercase text-sm flex items-center gap-2">
                Open Your Gift <Sparkles className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="serif text-6xl md:text-9xl font-light tracking-tighter text-white">
              Happy <br />
              <span className="italic text-gold">Birthday</span>
            </h1>
            <p className="text-white/70 max-w-md mx-auto text-lg font-light leading-relaxed">
              Wishing a wonderful birthday to the Director of Pathsarthee. Thank you for your inspiring leadership and dedication.
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-12"
            >
              <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent mx-auto animate-bounce" />
              <p className="text-gold/50 text-[10px] uppercase tracking-[0.3em] mt-4">Scroll to Explore</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
