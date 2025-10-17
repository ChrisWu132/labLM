"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { CoachState } from "./types"

interface AvatarButtonProps {
  onClick: () => void
  state: CoachState
  hasNotification?: boolean
}

export function AvatarButton({ onClick, state, hasNotification }: AvatarButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden bg-white"
      aria-label="Open AI Learning Coach"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: state === "idle" ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 2,
        repeat: state === "idle" ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      {/* Avatar Image */}
      <Image
        src="/owlgpt.png"
        alt="AI Coach"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 48px, 56px"
        priority
      />

      {/* Thinking State - Pulsing Glow */}
      {state === "thinking" && (
        <motion.div
          className="absolute inset-0 bg-primary/30 rounded-full"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Notification Badge */}
      {hasNotification && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
