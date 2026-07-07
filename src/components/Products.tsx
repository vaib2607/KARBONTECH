import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { products } from "../data/products"

function ProductCard({ product, index, isVisible }: { product: typeof products[number]; index: number; isVisible: boolean }) {
  return (
    <motion.div
      className="bg-surface rounded-2xl border border-white/10 p-6 sm:p-10 interactive will-change-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-neon before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" />
      <h3 className="font-syncopate text-2xl sm:text-3xl text-white mb-1">{product.name}</h3>
      <span className="font-space text-sm text-steel block mb-1">{product.subtitle}</span>
      <span className="inline-block text-xs text-neon border border-white/15 bg-white/5 px-2.5 py-1.5 rounded mb-6 uppercase tracking-wider">
        {product.badge}
      </span>
      <p className="text-steel text-sm mb-6 leading-relaxed">{product.tagline}</p>
      <ul className="space-y-3 text-left">
        {product.features.map((f) => (
          <li key={f} className="text-steel text-sm pl-5 relative leading-relaxed before:content-['⬢'] before:text-neon before:absolute before:left-0 before:text-xs">
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Products() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <motion.h2
        className="font-syncopate text-2xl sm:text-3xl text-center mb-16 uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Our Products
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  )
}
