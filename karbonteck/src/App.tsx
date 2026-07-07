import { lazy, Suspense } from "react"
import ErrorBoundary from "./components/ErrorBoundary"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import About from "./components/About"

const HowItWorks = lazy(() => import("./components/HowItWorks"))
const Products = lazy(() => import("./components/Products"))
const Team = lazy(() => import("./components/Team"))
const Testimonials = lazy(() => import("./components/Testimonials"))
const Timeline = lazy(() => import("./components/Timeline"))
const Contact = lazy(() => import("./components/Contact"))
const Footer = lazy(() => import("./components/Footer"))
const Cursor = lazy(() => import("./components/Cursor"))

function SectionFallback() {
  return <div className="py-24" />
}

function App() {
  return (
    <ErrorBoundary>
      <div className="page-wrapper min-h-screen bg-bg text-white overflow-hidden relative">
        <div
          className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "perspective(500px) rotateX(60deg) scale(2)",
            transformOrigin: "top center",
          }}
        />
        <div
          className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 60%)",
          }}
        />

        <Suspense fallback={null}>
          <Cursor />
        </Suspense>

        <Nav />
        <Hero />
        <Stats />
        <About />

        <Suspense fallback={<SectionFallback />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Products />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Team />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
