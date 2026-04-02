import { motion } from "motion/react";
import { Camera, Heart, Star } from "lucide-react";

const memories = [
  { id: 1, src: "/input_file_0.png", title: "Visionary Leadership", date: "2026" },
  { id: 2, src: "/input_file_1.png", title: "Moments of Grace", date: "2026" },
  { id: 3, src: "/input_file_2.png", title: "Elegant Director", date: "2026" },
  { id: 4, src: "/input_file_3.png", title: "Pathsarthee Spirit", date: "2026" },
  { id: 5, src: "/input_file_4.png", title: "Quiet Reflection", date: "2026" },
];

export default function Memories() {
  return (
    <section id="gallery" className="py-24 px-6 bg-midnight/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">
              <Camera className="w-4 h-4" />
              <span>Our Beautiful Memories</span>
            </div>
            <h2 className="serif text-5xl md:text-7xl text-white font-light tracking-tight">
              Captured <span className="italic text-gold">Moments</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm font-light leading-relaxed">
            Every picture tells a story of laughter, growth, and the beautiful journey we've shared together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-white/5"
            >
              <img
                src={memory.src}
                alt={memory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-gold/80 text-[10px] uppercase tracking-widest mb-2">
                  <Star className="w-3 h-3 fill-gold/20" />
                  <span>{memory.date}</span>
                </div>
                <h3 className="serif text-2xl text-white font-light group-hover:text-gold transition-colors">
                  {memory.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-white/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  <Heart className="w-3 h-3 fill-white/10" />
                  <span>A moment to remember forever</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
