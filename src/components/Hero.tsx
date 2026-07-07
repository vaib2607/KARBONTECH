import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <header ref={ref} className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-8 pt-32 pb-20">
      <motion.h1
        className="font-syncopate text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 uppercase tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        HEAVY INDUSTRY.
        <br />
        <span className="text-gradient">REDEFINED BY AI.</span>
      </motion.h1>
      <motion.p
        className="text-steel text-base sm:text-lg md:text-xl max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        Next-generation computational tools designed specifically for the raw realities of Indian manufacturing, trading, and core infrastructure.
      </motion.p>
    </header>
  )
}
