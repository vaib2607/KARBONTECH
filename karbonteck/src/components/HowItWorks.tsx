import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { howItWorksSteps } from "../data/howItWorks"

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <motion.h2
        className="font-syncopate text-2xl sm:text-3xl text-center mb-16 uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {howItWorksSteps.map((step, i) => (
          <motion.div
            key={step.step}
            className="bg-surface rounded-xl border border-white/10 p-8 text-center interactive"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="w-12 h-12 rounded-full border border-neon text-neon font-syncopate text-lg flex items-center justify-center mx-auto mb-6">
              {step.step}
            </div>
            <h3 className="font-syncopate text-white text-lg mb-3">{step.title}</h3>
            <p className="text-steel text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
