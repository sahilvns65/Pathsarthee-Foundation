import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Type, RefreshCcw, Trophy, CheckCircle2 } from "lucide-react";
import { triggerSingleConfetti } from "./Confetti";

const WORDS = [
  { word: "LEADERSHIP", hint: "The quality that guides Pathsarthee" },
  { word: "KINDNESS", hint: "The heart of every NGO mission" },
  { word: "VISIONARY", hint: "A director who sees the future" },
  { word: "EMPOWER", hint: "To give strength to others" },
  { word: "PATHSARTHEE", hint: "The name of our beloved NGO" },
  { word: "DIRECTOR", hint: "The captain of this ship" },
  { word: "INSPIRATION", hint: "What you provide to us daily" },
  { word: "COMMUNITY", hint: "The family we build together" },
];

export default function WordScramble() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scrambleWord = (word: string) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const initGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    loadWord(0);
  };

  const loadWord = (index: number) => {
    const word = WORDS[index].word;
    let scrambledWord = scrambleWord(word);
    while (scrambledWord === word) {
      scrambledWord = scrambleWord(word);
    }
    setScrambled(scrambledWord);
    setUserInput("");
    setIsCorrect(false);
  };

  useEffect(() => {
    loadWord(0);
  }, []);

  const handleCheck = () => {
    if (userInput.toUpperCase() === WORDS[currentIndex].word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      triggerSingleConfetti();
      
      setTimeout(() => {
        if (currentIndex < WORDS.length - 1) {
          setCurrentIndex(i => i + 1);
          loadWord(currentIndex + 1);
        } else {
          setIsFinished(true);
        }
      }, 1500);
    }
  };

  return (
    <section id="scramble" className="py-24 px-6 bg-midnight relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Type className="w-4 h-4" />
            <span>Word Challenge</span>
          </div>
          <h2 className="serif text-5xl md:text-7xl text-white font-light tracking-tight">
            Word <span className="italic text-gold">Scramble</span>
          </h2>
          <p className="text-white/40 text-sm font-light">Unscramble the values that define the Director's journey</p>
        </div>

        <div className="relative p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center space-y-6">
                  <div className="flex justify-center gap-2">
                    {scrambled.split("").map((char, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="w-10 h-10 md:w-14 md:h-14 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center text-xl md:text-3xl serif text-gold"
                      >
                        {char}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-white/60 italic text-sm">Hint: {WORDS[currentIndex].hint}</p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                      placeholder="Type your answer..."
                      className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 text-center text-xl serif focus:outline-none focus:border-gold/50 transition-colors"
                    />
                    {isCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                      >
                        <CheckCircle2 className="w-8 h-8" />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <p className="text-white/40 text-xs uppercase tracking-widest">
                      Word {currentIndex + 1} of {WORDS.length}
                    </p>
                    <button
                      onClick={handleCheck}
                      className="px-8 py-3 bg-gold text-midnight rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                    >
                      Check
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <Trophy className="w-20 h-20 text-gold mx-auto animate-bounce" />
                <div className="space-y-4">
                  <h3 className="serif text-5xl text-white">Master of Words!</h3>
                  <p className="text-white/60">You've successfully unscrambled all the core values of Pathsarthee.</p>
                </div>
                <button
                  onClick={initGame}
                  className="px-12 py-4 bg-gold text-midnight rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                >
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
