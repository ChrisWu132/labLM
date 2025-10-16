"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { Loader2, FileCode } from "lucide-react"

interface CodeEditorProps {
  file: string | null
  content: string
  language?: string
  readOnly?: boolean
  onChange?: (value: string | undefined) => void
}

export function CodeEditor({ file, content, language, readOnly = true, onChange }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-muted/20 text-muted-foreground">
        <FileCode className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-sm">Select a file to view its contents</p>
      </div>
    )
  }

  const detectedLanguage = language || detectLanguage(file)

  return (
    <div className="h-full flex flex-col">
      {/* File header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b">
        <FileCode className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium truncate">{file}</span>
        {readOnly && (
          <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            Read-only
          </span>
        )}
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={detectedLanguage}
          value={content}
          onChange={onChange}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            renderLineHighlight: "line",
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
          loading={
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          }
        />
      </div>
    </div>
  )
}

/**
 * Detect programming language from file extension
 */
function detectLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()

  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    json: "json",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",
    md: "markdown",
    yml: "yaml",
    yaml: "yaml",
    xml: "xml",
    py: "python",
    rb: "ruby",
    go: "go",
    rs: "rust",
    java: "java",
    c: "c",
    cpp: "cpp",
    h: "c",
    hpp: "cpp",
    sh: "shell",
    bash: "shell",
    sql: "sql",
    php: "php",
    swift: "swift",
    kt: "kotlin",
    r: "r",
    txt: "plaintext",
  }

  return languageMap[ext || ""] || "plaintext"
}
