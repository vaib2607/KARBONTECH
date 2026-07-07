import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center">
      <motion.span
        className="block text-white font-semibold text-xl sm:text-2xl mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Founded by two brothers who are driven by innovation.
      </motion.span>
      <motion.p
        className="text-steel leading-relaxed text-base sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        KARBONTECK isn&apos;t building software for Silicon Valley. We are building robust, compliant, and deeply integrated
        AI solutions for the heavy industries of India — from steel mills to commodity floors. Our ecosystem bridges the gap
        between physical trades and advanced algorithmic intelligence.
      </motion.p>
    </section>
  )
}
