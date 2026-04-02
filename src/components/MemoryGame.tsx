import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, RefreshCcw, Trophy } from "lucide-react";
import { triggerSingleConfetti } from "./Confetti";

const IMAGES = [
  "/input_file_0.png",
  "/input_file_1.png",
  "/input_file_2.png",
  "/input_file_3.png",
  "/input_file_4.png",
  "/input_file_0.png", // Duplicate for pairs
  "/input_file_1.png",
  "/input_file_2.png",
  "/input_file_3.png",
  "/input_file_4.png",
];

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  const initGame = () => {
    const shuffled = [...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsSolved(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;

      if (cards[firstId].image === cards[secondId].image) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(card => card.isMatched)) {
            setIsSolved(true);
            triggerSingleConfetti();
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <section id="memory" className="py-24 px-6 bg-midnight/50 relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Brain className="w-4 h-4" />
            <span>Mental Agility</span>
          </div>
          <h2 className="serif text-5xl md:text-7xl text-white font-light tracking-tight">
            Memory <span className="italic text-gold">Match</span>
          </h2>
          <p className="text-white/40 text-sm font-light">Find all the matching pairs of the Director's moments</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Stats */}
          <div className="flex lg:flex-col gap-8 lg:w-48 order-2 lg:order-1">
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Moves</p>
              <p className="serif text-3xl text-white">{moves}</p>
            </div>
            <button 
              onClick={initGame}
              className="flex items-center gap-2 text-gold hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>

          {/* Game Grid */}
          <div className="relative p-6 bg-white/5 rounded-3xl border border-white/10 shadow-2xl order-1 lg:order-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-[600px]">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(card.id)}
                  className="aspect-[3/4] relative perspective-1000"
                >
                  <motion.div
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                  >
                    {/* Front (Back of card) */}
                    <div className="absolute inset-0 backface-hidden bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-gold/40" />
                      </div>
                    </div>
                    {/* Back (Image side) */}
                    <div 
                      className="absolute inset-0 backface-hidden rotate-y-180 bg-white/10 rounded-xl overflow-hidden border border-gold/50"
                      style={{
                        backgroundImage: `url(${card.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </motion.div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {isSolved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-midnight/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-8 z-20"
                >
                  <Trophy className="w-16 h-16 text-gold mb-6 animate-bounce" />
                  <h3 className="serif text-4xl text-white mb-2">Excellent!</h3>
                  <p className="text-white/60 mb-8">You matched all moments in {moves} moves!</p>
                  <button 
                    onClick={initGame}
                    className="px-8 py-3 bg-gold text-midnight rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                  >
                    Play Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
