import { useEffect, useState } from "react"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-4 transition-all duration-300 ${
        scrolled ? "bg-[rgba(5,6,8,0.92)] backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <a href="#" className="font-syncopate text-white text-lg sm:text-xl tracking-[2px] hover:text-neon transition-colors no-underline interactive">
        KARBONTECK
      </a>
      <span className="font-space text-xs text-neon border border-neon px-3 py-1.5 rounded-full uppercase tracking-wider">
        System Initialization...
      </span>
    </nav>
  )
}
