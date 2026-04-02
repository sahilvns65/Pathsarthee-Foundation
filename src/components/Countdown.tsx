import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Calendar } from "lucide-react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set birthday to next year if it has passed this year
  const getNextBirthday = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    // Example birthday: March 15th
    let birthday = new Date(currentYear, 2, 15); // Month is 0-indexed (2 = March)
    
    if (now > birthday) {
      birthday = new Date(currentYear + 1, 2, 15);
    }
    return birthday;
  };

  useEffect(() => {
    const target = getNextBirthday();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-24 px-6 bg-midnight/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Clock className="w-4 h-4" />
            <span>The Next Celebration</span>
          </div>
          <h2 className="serif text-5xl md:text-7xl text-white font-light tracking-tight">
            Counting the <span className="italic text-gold">Moments</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center transition-all group-hover:border-gold/30 group-hover:bg-gold/5">
                <p className="serif text-5xl md:text-6xl text-white mb-2 font-light">
                  {stat.value.toString().padStart(2, '0')}
                </p>
                <p className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-4 text-white/40 text-sm font-light"
        >
          <Calendar className="w-4 h-4" />
          <span>Next Celebration: March 15, 2026</span>
        </motion.div>
      </div>

      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
