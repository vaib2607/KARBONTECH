import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { stats } from "../data/stats"

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="font-syncopate text-3xl sm:text-4xl text-neon mb-2">{stat.value}</div>
            <div className="font-space text-xs text-steel uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
