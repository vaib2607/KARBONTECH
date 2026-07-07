import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { team } from "../data/team"

export default function Team() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <motion.h2
        className="font-syncopate text-2xl sm:text-3xl text-center mb-16 uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        The Founders
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            className="bg-surface rounded-xl border border-white/10 p-8 text-center interactive"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 text-neon font-syncopate text-xl">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="font-syncopate text-white text-base mb-1">{member.name}</h3>
            <span className="font-space text-xs text-neon block mb-4 uppercase tracking-wider">{member.role}</span>
            <p className="text-steel text-sm leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
