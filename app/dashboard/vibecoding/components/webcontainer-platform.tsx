"use client"

import { useState, useEffect } from "react"
import type { WebContainer } from "@webcontainer/api"
import type { Terminal } from "xterm"
import { FileTree, buildFileTree } from "./file-tree"
import { CodeEditor } from "./code-editor"
import { TerminalPanel, writeToTerminal } from "./terminal-panel"
import { PreviewPanel } from "./preview-panel"
import { demoFiles } from "@/lib/demo-files"
import {
  bootWebContainer,
  mountFiles,
  installDependencies,
  startDevServer,
  waitForServerReady,
  readFile,
} from "@/lib/webcontainer-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

type LoadingStep =
  | "booting"
  | "mounting"
  | "installing"
  | "starting"
  | "ready"
  | "error"

export function WebContainerPlatform() {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null)
  const [terminal, setTerminal] = useState<Terminal | null>(null)
  const [loadingStep, setLoadingStep] = useState<LoadingStep>("booting")
  const [error, setError] = useState<string | null>(null)

  // File system state
  const [files, setFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string>("")

  // Server state
  const [serverUrl, setServerUrl] = useState<string | null>(null)

  // Initialize WebContainer on mount
  useEffect(() => {
    initializeWebContainer()
  }, [])

  // Update file content when selection changes
  useEffect(() => {
    if (webcontainer && selectedFile) {
      loadFileContent(selectedFile)
    }
  }, [selectedFile, webcontainer])

  async function initializeWebContainer() {
    try {
      // Step 1: Boot WebContainer
      setLoadingStep("booting")
      writeToTerminal(terminal, "🚀 Booting WebContainer...", "info")

      const wc = await bootWebContainer()
      setWebcontainer(wc)
      writeToTerminal(terminal, "✓ WebContainer booted successfully", "success")

      // Step 2: Mount files
      setLoadingStep("mounting")
      writeToTerminal(terminal, "📁 Mounting project files...", "info")

      await mountFiles(wc, demoFiles)

      // Extract file paths from demo files
      const filePaths = extractFilePaths(demoFiles)
      setFiles(filePaths)

      // Select first file
      if (filePaths.length > 0) {
        setSelectedFile(filePaths[0])
      }

      writeToTerminal(terminal, "✓ Files mounted", "success")

      // Step 3: Install dependencies
      setLoadingStep("installing")
      writeToTerminal(terminal, "📦 Running npm install...", "info")

      await installDependencies(wc, (data) => {
        if (terminal) {
          terminal.write(data)
        }
      })

      writeToTerminal(terminal, "✓ Dependencies installed", "success")

      // Step 4: Start server
      setLoadingStep("starting")
      writeToTerminal(terminal, "⚡ Starting development server...", "info")

      // Start server process
      startDevServer(wc, "npm", ["start"], (data) => {
        if (terminal) {
          terminal.write(data)
        }
      })

      // Wait for server to be ready (60 seconds timeout for first load)
      const url = await waitForServerReady(wc, 60000)
      setServerUrl(url)

      writeToTerminal(terminal, "✓ Server ready!", "success")
      writeToTerminal(terminal, `🌐 Preview available at ${url}`, "info")

      setLoadingStep("ready")
    } catch (err: any) {
      console.error("[WebContainerPlatform] Initialization failed:", err)
      setLoadingStep("error")
      setError(err.message || "Failed to initialize WebContainer")
      writeToTerminal(terminal, `✗ Error: ${err.message}`, "error")
    }
  }

  async function loadFileContent(path: string) {
    if (!webcontainer) return

    try {
      const content = await readFile(webcontainer, path)
      setFileContent(content)
    } catch (err: any) {
      console.error(`[WebContainerPlatform] Failed to read file ${path}:`, err)
      setFileContent(`// Error reading file: ${err.message}`)
    }
  }

  const handleTerminalReady = (term: Terminal) => {
    setTerminal(term)
  }

  const fileTree = buildFileTree(files)

  return (
    <div className="h-full flex flex-col">
      {/* Error banner */}
      {loadingStep === "error" && error && (
        <Alert variant="destructive" className="rounded-none border-x-0">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading overlay */}
      {loadingStep !== "ready" && loadingStep !== "error" && (
        <div className="absolute inset-0 bg-background z-50 flex items-center justify-center">
          <div className="bg-card border rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <h3 className="font-semibold text-lg">Setting up environment...</h3>
            </div>
            <div className="space-y-2 text-sm">
              <LoadingStepIndicator step="booting" currentStep={loadingStep} label="Booting WebContainer" />
              <LoadingStepIndicator step="mounting" currentStep={loadingStep} label="Mounting project files" />
              <LoadingStepIndicator step="installing" currentStep={loadingStep} label="Installing dependencies" />
              <LoadingStepIndicator step="starting" currentStep={loadingStep} label="Starting server" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              First load may take 30-60 seconds. Please be patient...
            </p>
          </div>
        </div>
      )}

      {/* Three-panel layout - Narrower file tree, wider preview */}
      <div className="flex-1 grid grid-cols-[180px_1fr_1.2fr] gap-0 overflow-hidden">
        {/* Left: File Tree - Narrower */}
        <div className="border-r">
          <FileTree
            files={fileTree}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </div>

        {/* Middle: Editor + Terminal */}
        <div className="flex flex-col border-r">
          <div className="flex-1 border-b">
            <CodeEditor
              file={selectedFile}
              content={fileContent}
              readOnly={true}
            />
          </div>
          <div className="h-64">
            <TerminalPanel onReady={handleTerminalReady} />
          </div>
        </div>

        {/* Right: Preview - Wider */}
        <div>
          <PreviewPanel
            url={serverUrl}
            isLoading={loadingStep === "starting"}
          />
        </div>
      </div>
    </div>
  )
}

function LoadingStepIndicator({
  step,
  currentStep,
  label
}: {
  step: LoadingStep
  currentStep: LoadingStep
  label: string
}) {
  const stepOrder: LoadingStep[] = ["booting", "mounting", "installing", "starting", "ready"]
  const currentIndex = stepOrder.indexOf(currentStep)
  const stepIndex = stepOrder.indexOf(step)

  const isComplete = stepIndex < currentIndex
  const isActive = step === currentStep

  return (
    <div className="flex items-center gap-2">
      {isComplete && <span className="text-green-500">✓</span>}
      {isActive && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
      {!isComplete && !isActive && <span className="w-4 h-4 rounded-full border-2 border-muted" />}
      <span className={isActive ? "font-medium" : isComplete ? "text-muted-foreground" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  )
}

/**
 * Extract all file paths from the file system tree
 */
function extractFilePaths(tree: any, basePath: string = ""): string[] {
  const paths: string[] = []

  for (const [name, node] of Object.entries(tree)) {
    const currentPath = basePath ? `${basePath}/${name}` : name

    if (node && typeof node === "object") {
      if ("file" in node) {
        paths.push(currentPath)
      } else if ("directory" in node && node.directory) {
        paths.push(...extractFilePaths(node.directory, currentPath))
      }
    }
  }

  return paths.sort()
}
