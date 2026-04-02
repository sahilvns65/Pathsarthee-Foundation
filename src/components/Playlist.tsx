import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Music, Disc } from "lucide-react";

const tracks = [
  { id: 1, title: "Raabta", artist: "Birthday Collection", duration: "4:03" },
  { id: 2, title: "Tum Hi Ho", artist: "Arijit Singh", duration: "5:22" },
  { id: 3, title: "Kesariya", artist: "Brahmastra", duration: "4:28" },
];

export default function Playlist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  return (
    <section id="music" className="py-24 px-6 bg-midnight/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Music className="w-4 h-4" />
            <span>Birthday Playlist</span>
          </div>
          <h2 className="serif text-5xl md:text-7xl text-white font-light tracking-tight">
            Melodies of <span className="italic text-gold">Joy</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Player Visualizer */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-gold/10 animate-spin-slow-reverse" />
            
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 rounded-full bg-gradient-to-br from-gold/20 to-midnight border border-gold/30 flex items-center justify-center overflow-hidden shadow-2xl shadow-gold/10"
            >
              <Disc className={isPlaying ? "w-32 h-32 text-gold/40 animate-pulse" : "w-32 h-32 text-gold/20"} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-midnight border border-gold/50" />
              </div>
            </motion.div>

            {/* Floating Notes */}
            {isPlaying && [1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -100, 
                  x: i % 2 === 0 ? 40 : -40 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.6,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 text-gold/60"
              >
                <Music className="w-6 h-6" />
              </motion.div>
            ))}
          </div>

          {/* Player Controls */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="mb-12 text-center lg:text-left">
              <h3 className="serif text-3xl text-white mb-2">{currentTrack.title}</h3>
              <p className="text-gold/60 text-sm tracking-widest uppercase font-medium">{currentTrack.artist}</p>
            </div>

            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isPlaying ? "65%" : "0%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="h-full bg-gold" 
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
                  <span>2:34</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center lg:justify-start gap-8">
                <button className="text-white/40 hover:text-gold transition-colors">
                  <SkipBack className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-midnight hover:scale-105 transition-transform shadow-lg shadow-gold/20"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-0.5" />}
                </button>
                <button className="text-white/40 hover:text-gold transition-colors">
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>

              {/* Track List */}
              <div className="pt-8 border-t border-white/10 space-y-4">
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrack(track)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      currentTrack.id === track.id ? 'bg-gold/10 text-gold' : 'hover:bg-white/5 text-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono opacity-40">0{track.id}</span>
                      <span className="text-sm font-medium">{track.title}</span>
                    </div>
                    <span className="text-[10px] opacity-40">{track.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
