import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <motion.footer
      ref={ref}
      className="relative z-10 text-center py-12 sm:py-16 border-t border-white/5 font-space text-neon font-bold tracking-widest text-sm"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <p>COMING TO YOUR WORKFLOW DEC 2027</p>
      <p className="text-[10px] text-steel font-normal mt-4 tracking-wider">&copy; {new Date().getFullYear()} KARBONTECK. All rights reserved.</p>
    </motion.footer>
  )
}
