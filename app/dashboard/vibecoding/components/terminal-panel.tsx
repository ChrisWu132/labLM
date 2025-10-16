"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { Terminal as TerminalIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import xterm CSS
import "xterm/css/xterm.css"

interface TerminalPanelProps {
  onReady?: (terminal: Terminal) => void
}

export function TerminalPanel({ onReady }: TerminalPanelProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<Terminal | null>(null)
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    // Create terminal instance
    const term = new Terminal({
      convertEol: true,
      fontSize: 13,
      fontFamily: "'Cascadia Code', 'Courier New', monospace",
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#d4d4d4",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
        brightBlack: "#666666",
        brightRed: "#f14c4c",
        brightGreen: "#23d18b",
        brightYellow: "#f5f543",
        brightBlue: "#3b8eea",
        brightMagenta: "#d670d6",
        brightCyan: "#29b8db",
        brightWhite: "#e5e5e5",
      },
      cursorBlink: false,
      disableStdin: true, // Read-only for students
      rows: 15,
    })

    // Add fit addon for responsive sizing
    const fit = new FitAddon()
    term.loadAddon(fit)

    // Open terminal in container
    term.open(terminalRef.current)

    // Fit terminal to container after a short delay to ensure container is rendered
    setTimeout(() => {
      try {
        fit.fit()
      } catch (e) {
        console.warn('Failed to fit terminal on initial render', e)
      }
    }, 100)

    // Welcome message
    term.writeln("\x1b[1;32m✓ Terminal ready\x1b[0m")
    term.writeln("\x1b[90mWaiting for commands...\x1b[0m")
    term.writeln("")

    setTerminal(term)
    setFitAddon(fit)

    // Notify parent
    if (onReady) {
      onReady(term)
    }

    // Handle window resize
    const handleResize = () => {
      if (fit) {
        try {
          fit.fit()
        } catch (e) {
          // Ignore fit errors during resize
        }
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      term.dispose()
    }
  }, [])

  const handleClear = () => {
    if (terminal) {
      terminal.clear()
      terminal.writeln("\x1b[1;32m✓ Terminal cleared\x1b[0m")
      terminal.writeln("")
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Terminal</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="h-6 w-6 text-gray-400 hover:text-gray-200 hover:bg-[#3e3e42]"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>

      {/* Terminal container */}
      <div ref={terminalRef} className="flex-1 overflow-hidden p-2" />
    </div>
  )
}

/**
 * Utility to write to terminal with ANSI colors
 */
export function writeToTerminal(terminal: Terminal | null, text: string, color?: "success" | "error" | "info") {
  if (!terminal) return

  const colorCodes = {
    success: "\x1b[1;32m", // Bright green
    error: "\x1b[1;31m", // Bright red
    info: "\x1b[1;36m", // Bright cyan
  }

  const reset = "\x1b[0m"
  const prefix = color ? colorCodes[color] : ""

  terminal.writeln(`${prefix}${text}${reset}`)
}
