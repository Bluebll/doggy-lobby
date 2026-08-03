"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type CursorContextType = {
  cursorText: string
  cursorVariant: "default" | "explore" | "view" | "visit"
  setCursorText: (text: string) => void
  setCursorVariant: (variant: "default" | "explore" | "view" | "visit") => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState<"default" | "explore" | "view" | "visit">("default")

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursorText, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider")
  }
  return context
}
