import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { testimonials as testimonialData } from "../data/testimonials"

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <motion.h2
        className="font-syncopate text-2xl sm:text-3xl text-center mb-16 uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        What People Say
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonialData.map((t, i) => (
          <motion.div
            key={t.author}
            className="bg-surface rounded-xl border border-white/10 p-6 interactive"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <p className="text-steel text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="border-t border-white/5 pt-4">
              <div className="font-space text-xs text-white">{t.author}</div>
              <div className="font-space text-[10px] text-steel uppercase tracking-wider mt-1">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
