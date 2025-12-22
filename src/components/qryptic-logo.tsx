"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export const QrypticLogo = () => {
  const TARGET_TEXT = "QRYPTIC"
  const CYCLES_PER_LETTER = 2
  const SHUFFLE_TIME = 50
  const CHARS = "!@#$%^&*():{};|,.<>/?~0123456789"

  const [text, setText] = useState(TARGET_TEXT)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scramble = () => {
    let pos = 0

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length)
          return CHARS[randomCharIndex]
        })
        .join("")

      setText(scrambled)
      pos++

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        clearInterval(intervalRef.current!)
      }
    }, SHUFFLE_TIME)
  }

  // Scramble on mount
  useEffect(() => {
    scramble()
  }, [])

  return (
    <motion.div
      onHoverStart={scramble}
      className="relative cursor-pointer select-none font-bold text-4xl tracking-tighter"
    >
      <span className="text-foreground relative z-10 font-mono">{text}</span>
      <div className="absolute inset-0 blur-xl bg-indigo-500/20 z-0 opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}