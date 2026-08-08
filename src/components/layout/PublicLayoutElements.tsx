'use client'

import { usePathname } from 'next/navigation'
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import CartDrawer from "../cart/CartDrawer";

export default function PublicLayoutElements({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
    </>
  )
}
