import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function Message() {
  return (
    <section className="py-32 px-6 bg-midnight relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 bg-gold/5"
        >
          <Quote className="text-gold w-6 h-6 fill-gold/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-10"
        >
          <h2 className="serif text-4xl md:text-6xl text-white font-light leading-tight">
            Birthday Wishes <br />
            <span className="italic text-gold">From the Team</span>
          </h2>

          <div className="space-y-12 text-white/70 text-lg md:text-xl font-light leading-relaxed serif italic">
            <div className="space-y-2">
              <p className="text-white font-normal not-italic text-2xl md:text-3xl">
                "Happy birthday dear director mam"
              </p>
              <p className="text-gold font-medium not-italic text-sm uppercase tracking-[0.2em]">
                — Shaily Dhiman
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-white font-normal not-italic text-2xl md:text-3xl">
                "Wishing u happy birthday, full fillleddd with love and laughter"
              </p>
              <p className="text-gold font-medium not-italic text-sm uppercase tracking-[0.2em]">
                — Pankaj
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-white font-normal not-italic text-2xl md:text-3xl">
                "Happy birthday mam"
              </p>
              <p className="text-gold font-medium not-italic text-sm uppercase tracking-[0.2em]">
                — Dileep
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
    </section>
  );
}
