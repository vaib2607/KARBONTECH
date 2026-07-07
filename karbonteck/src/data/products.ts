import type { Product } from "../types"

export const products: Product[] = [
  {
    id: "ayas",
    name: "ayas.ai",
    subtitle: "अयस् · Iron · Intelligence",
    badge: "Cloud-Powered Terminal",
    tagline: "Know where to sell, at what price, before anyone else.",
    features: [
      "Live steel prices and real-time profit/tonne calculations across every Indian state",
      "Demand mapping — identify exact buyer connections and visualize raw material demand",
      "Commodity insights with Buy/Sell/Hold signals for physical trades",
      "Cloud-enabled market intelligence accessible from any device",
    ],
  },
  {
    id: "avelo",
    name: "Avelo.",
    subtitle: "// OFFLINE. COMPLIANT. MAC EXCLUSIVE.",
    badge: "Local & Secure Architecture",
    tagline: "Industrial accounting, air-gapped.",
    features: [
      "100% local, air-gapped architecture — zero external data leakage",
      "Pre-configured with Indian heavy industry taxation and compliance",
      "Engineered exclusively for macOS — native performance, zero bloat",
      "Industrial-grade minimalist financial dashboard with audit-ready reporting",
    ],
  },
]
