import { useEffect } from "react"
import { useReducedMotion } from "../hooks/useReducedMotion"

export default function Cursor() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const dot = document.querySelector<HTMLDivElement>(".cursor-dot")
    const ring = document.querySelector<HTMLDivElement>(".cursor-ring")
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let initialized = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!initialized) {
        document.body.classList.add("cursor-ready")
        dot.style.opacity = "1"
        ring.style.opacity = "1"
        initialized = true
      }
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`
    }

    const onMouseLeave = () => {
      if (initialized) {
        dot.style.opacity = "0"
        ring.style.opacity = "0"
      }
    }
    const onMouseEnter = () => {
      if (initialized) {
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
    }

    const render = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`
      requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    render()

    const interactive = document.querySelectorAll(".interactive, a, button, .card")
    const addHover = () => document.body.classList.add("hover-active")
    const removeHover = () => document.body.classList.remove("hover-active")
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", addHover)
      el.addEventListener("mouseleave", removeHover)
    })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", addHover)
        el.removeEventListener("mouseleave", removeHover)
      })
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div className="cursor-dot fixed pointer-events-none z-[9999] w-2 h-2 bg-neon rounded-full opacity-0"
        style={{ boxShadow: "0 0 10px #00ff88" }} />
      <div className="cursor-ring fixed pointer-events-none z-[9998] opacity-0 rounded-full"
        style={{
          width: 40,
          height: 40,
          border: "2px solid rgba(0, 255, 136, 0.4)",
          transition: "width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s",
        }} />
    </>
  )
}
