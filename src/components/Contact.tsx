import { useState } from "react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 }

function sanitize(str: string) {
  return str.replace(/[<>"'`]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" })[c] as string
  )
}

function isValidEmail(email: string) {
  return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(email)
}

function isRateLimited(): boolean {
  try {
    const timestamps: number[] = JSON.parse(localStorage.getItem("kt_form_ts") || "[]")
    const now = Date.now()
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT.windowMs)
    return recent.length >= RATE_LIMIT.max
  } catch {
    return false
  }
}

function recordSubmission() {
  try {
    const now = Date.now()
    const timestamps: number[] = JSON.parse(localStorage.getItem("kt_form_ts") || "[]")
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT.windowMs)
    recent.push(now)
    localStorage.setItem("kt_form_ts", JSON.stringify(recent))
  } catch {
    /* localStorage unavailable */
  }
}

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = sanitize((data.get("name") as string)?.trim() || "")
    const email = (data.get("email") as string)?.trim() || ""
    const subject = sanitize((data.get("subject") as string) || "")
    const message = sanitize((data.get("message") as string)?.trim() || "")

    if (!name || name.length < 2) {
      setStatus({ type: "error", message: "Please enter your name." })
      return
    }
    if (!isValidEmail(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." })
      return
    }
    if (!subject) {
      setStatus({ type: "error", message: "Please select a subject." })
      return
    }
    if (message.length < 10) {
      setStatus({ type: "error", message: "Message is too short." })
      return
    }
    if (isRateLimited()) {
      setStatus({ type: "error", message: "Too many messages. Please wait 10 minutes." })
      return
    }

    setSending(true)
    setStatus(null)

    try {
      const res = await fetch("https://formspree.io/f/mgobzjpa", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        recordSubmission()
        setStatus({ type: "success", message: "Message sent! We'll be in touch." })
        form.reset()
        setCharCount(0)
      } else {
        throw new Error()
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." })
    } finally {
      setSending(false)
    }
  }

  return (
    <section ref={ref} className="relative z-10 max-w-xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <motion.h2
        className="font-syncopate text-2xl sm:text-3xl text-center mb-2 uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>
      <motion.p
        className="text-steel text-center mb-8 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Have a question or want to know more? Fill in the form below.
      </motion.p>
      <motion.form
        id="contactForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        action="https://formspree.io/f/mgobzjpa"
        method="POST"
        noValidate
      >
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fname" className="font-space text-[11px] uppercase tracking-wider text-steel">Name *</label>
            <input type="text" id="fname" name="name" placeholder="Your name" maxLength={80} autoComplete="name" required
              className="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neon transition-colors placeholder:text-steel/40" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="femail" className="font-space text-[11px] uppercase tracking-wider text-steel">Email *</label>
            <input type="email" id="femail" name="email" placeholder="you@company.com" maxLength={120} autoComplete="email" required
              className="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neon transition-colors placeholder:text-steel/40" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fsubject" className="font-space text-[11px] uppercase tracking-wider text-steel">Subject *</label>
          <select id="fsubject" name="subject" required
            className="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neon transition-colors">
            <option value="" disabled selected>Select a topic</option>
            <option value="ayas">ayas.ai — Industrial Intelligence</option>
            <option value="avelo">Avelo — Mac Accounting</option>
            <option value="partnership">Partnership / Business</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fmessage" className="font-space text-[11px] uppercase tracking-wider text-steel">
            Message * <span className={`ml-2 ${charCount >= 1000 ? "text-red-400" : "text-steel"}`}>{charCount} / 1000</span>
          </label>
          <textarea id="fmessage" name="message" placeholder="Tell us what's on your mind..." maxLength={1000} required
            onChange={(e) => setCharCount(e.target.value.length)}
            className="bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neon transition-colors placeholder:text-steel/40 resize-y min-h-[120px]" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <button type="submit" disabled={sending}
            className="font-space text-xs uppercase tracking-wider text-bg bg-neon rounded-full px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-85 hover:-translate-y-0.5 interactive"
            style={{ boxShadow: sending ? "none" : "0 0 20px rgba(0,255,136,0.25)" }}>
            {sending ? "Sending..." : "Send Message"}
          </button>
          {status && (
            <span className={`font-space text-xs ${status.type === "success" ? "text-neon" : "text-red-400"}`}>
              {status.message}
            </span>
          )}
        </div>
      </motion.form>
    </section>
  )
}
