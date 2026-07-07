import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { timeline } from "../data/timeline"

export default function Timeline() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <motion.h2
        className="font-syncopate text-2xl sm:text-3xl text-center mb-16 uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Our Journey
      </motion.h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
        {timeline.map((event, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={event.year}
              className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="hidden md:flex md:w-1/2" />
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-neon -translate-x-1/2 mt-1.5 ring-4 ring-bg" />
              <div className="flex-1 md:w-1/2 pl-10 md:pl-0 md:px-8">
                <span className="font-space text-xs text-neon uppercase tracking-widest">{event.year}</span>
                <h3 className="font-syncopate text-white text-base sm:text-lg mt-1 mb-2">{event.title}</h3>
                <p className="text-steel text-sm leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
