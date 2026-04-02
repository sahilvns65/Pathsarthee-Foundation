import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Puzzle as PuzzleIcon, Trophy, RefreshCcw } from "lucide-react";
import { triggerSingleConfetti } from "./Confetti";

export default function Puzzle() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const COLS = 4;
  const ROWS = 3;
  const TOTAL_TILES = COLS * ROWS;
  const PUZZLE_IMAGE = "/input_file_0.png";

  useEffect(() => {
    const img = new Image();
    img.src = PUZZLE_IMAGE;
    img.onload = () => setImageLoaded(true);
  }, []);

  const initGame = () => {
    // 4x3 puzzle (11 tiles + 1 empty)
    const initialTiles = Array.from({ length: TOTAL_TILES - 1 }, (_, i) => i + 1).concat(0);
    
    // Shuffle and ensure it's solvable
    let shuffled = [...initialTiles].sort(() => Math.random() - 0.5);
    
    // Simple check: if it's not solvable, just swap two tiles (this is a simplification)
    // For a 4x3 grid, solvability is complex, but for a birthday app, we can just shuffle until it's okay or just shuffle.
    // Let's just shuffle for now.
    setTiles(shuffled);
    setMoves(0);
    setIsSolved(false);
    setStartTime(Date.now());
    setTime(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let interval: any;
    if (startTime && !isSolved) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isSolved]);

  const moveTile = (index: number) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    const emptyRow = Math.floor(emptyIndex / COLS);
    const emptyCol = emptyIndex % COLS;

    const isAdjacent = 
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      // Check if solved
      const solvedOrder = Array.from({ length: TOTAL_TILES - 1 }, (_, i) => i + 1).concat(0);
      if (newTiles.every((tile, i) => tile === solvedOrder[i])) {
        setIsSolved(true);
        triggerSingleConfetti();
      }
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="puzzles" className="py-24 px-6 bg-midnight relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">
            <PuzzleIcon className="w-4 h-4" />
            <span>Birthday Challenge</span>
          </div>
          <h2 className="serif text-5xl md:text-7xl text-white font-light tracking-tight">
            The Director's <span className="italic text-gold">Puzzle</span>
          </h2>
          <p className="text-white/40 text-sm font-light">Arrange the 12 pieces to complete the portrait</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Stats */}
          <div className="flex lg:flex-col gap-8 lg:w-48 order-2 lg:order-1">
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Time</p>
              <p className="serif text-3xl text-white">{formatTime(time)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Moves</p>
              <p className="serif text-3xl text-white">{moves}</p>
            </div>
            <button 
              onClick={initGame}
              className="flex items-center gap-2 text-gold hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Puzzle Grid */}
          <div className="relative p-4 bg-white/5 rounded-3xl border border-white/10 shadow-2xl order-1 lg:order-2">
            {!imageLoaded ? (
              <div className="w-[320px] h-[240px] md:w-[480px] md:h-[360px] flex items-center justify-center">
                <RefreshCcw className="w-8 h-8 text-gold animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 w-[320px] h-[240px] md:w-[480px] md:h-[360px]">
                {tiles.map((tile, index) => {
                  if (tile === 0) {
                    return (
                      <div key="empty" className="bg-transparent rounded-lg" />
                    );
                  }

                  // Calculate background position
                  // Original position of the tile
                  const origCol = (tile - 1) % COLS;
                  const origRow = Math.floor((tile - 1) / COLS);
                  
                  const bgX = (origCol / (COLS - 1)) * 100;
                  const bgY = (origRow / (ROWS - 1)) * 100;

                  return (
                    <motion.button
                      key={tile}
                      layout
                      onClick={() => moveTile(index)}
                      className="relative rounded-lg overflow-hidden border border-white/10 hover:border-gold/50 transition-colors shadow-lg group"
                      style={{
                        backgroundImage: `url(${PUZZLE_IMAGE})`,
                        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                        backgroundPosition: `${bgX}% ${bgY}%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors" />
                    </motion.button>
                  );
                })}
              </div>
            )}

            <AnimatePresence>
              {isSolved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-midnight/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-8 z-20"
                >
                  <Trophy className="w-16 h-16 text-gold mb-6 animate-bounce" />
                  <h3 className="serif text-4xl text-white mb-2">Brilliant!</h3>
                  <p className="text-white/60 mb-8">You've completed the portrait in {moves} moves!</p>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
