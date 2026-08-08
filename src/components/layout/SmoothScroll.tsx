"use client"

import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [lenisInst, setLenisInst] = useState<Lenis | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    })
    
    setLenisInst(lenis)

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      setLenisInst(null)
    }
  }, [])

  useEffect(() => {
    if (lenisInst) {
      lenisInst.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenisInst])

  return <>{children}</>
}
