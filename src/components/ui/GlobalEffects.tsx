"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useCursor } from "@/components/ui/CursorProvider"

export function CustomCursor() {
  const { cursorText, cursorVariant } = useCursor()
  const [isHovering, setIsHovering] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Use MotionValues to avoid React re-renders on mousemove
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Smooth spring for the default outline cursor
  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)")
    setIsMobile(mobileQuery.matches)

    if (mobileQuery.matches) return

    let rafId: number
    const updateMousePosition = (e: MouseEvent) => {
      // Throttle mouse updates to animation frames
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY])

  if (isMobile || prefersReducedMotion) {
    return null
  }

  // Variants for the inner text/color dot
  const innerVariants = {
    default: {
      scale: isHovering ? 2 : 1,
      backgroundColor: "var(--color-brand-orange)",
      mixBlendMode: "difference" as const,
      width: 16,
      height: 16,
      x: "-50%",
      y: "-50%",
    },
    explore: {
      scale: 1,
      backgroundColor: "#fff",
      mixBlendMode: "normal" as const,
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
    },
    view: {
      scale: 1,
      backgroundColor: "var(--color-brand-orange)",
      mixBlendMode: "normal" as const,
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
    },
    visit: {
      scale: 1,
      backgroundColor: "#000",
      mixBlendMode: "normal" as const,
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
    }
  }

  return (
    <>
      {/* Inner Dot / Text Container */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center overflow-hidden will-change-transform"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.div
          animate={innerVariants[cursorVariant]}
          transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
          className="rounded-full flex items-center justify-center shadow-sm"
        >
          <AnimatePresence>
            {cursorVariant !== "default" && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-xs font-bold tracking-widest uppercase ${cursorVariant === 'visit' ? 'text-white' : (cursorVariant === 'explore' ? 'text-black' : 'text-white')}`}
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Outer Spring Cursor */}
      {cursorVariant === "default" && (
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 border border-[var(--color-brand-orange)] rounded-full pointer-events-none z-[99] mix-blend-difference will-change-transform"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: "tween", duration: 0.15 }}
        />
      )}
    </>
  )
}

export function AmbientBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 25, 50, 25, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-brand-orange)]/5 blur-[80px] will-change-transform"
      />
      <motion.div
        animate={{
          x: [0, -50, 0, 50, 0],
          y: [0, -25, -50, -25, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 blur-[80px] will-change-transform"
      />
    </div>
  )
}

export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    />
  )
}
