"use client"

import { useState, useEffect } from "react"
import { Globe, RefreshCw, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PreviewPanelProps {
  url: string | null
  isLoading?: boolean
}

export function PreviewPanel({ url, isLoading = false }: PreviewPanelProps) {
  const [iframeKey, setIframeKey] = useState(0)
  const [loadError, setLoadError] = useState(false)

  // Reset iframe when URL changes
  useEffect(() => {
    if (url) {
      setLoadError(false)
      setIframeKey((prev) => prev + 1)
    }
  }, [url])

  const handleRefresh = () => {
    setLoadError(false)
    setIframeKey((prev) => prev + 1)
  }

  const handleOpenInNewTab = () => {
    if (url) {
      window.open(url, "_blank")
    }
  }

  const handleIframeError = () => {
    setLoadError(true)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Preview header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Preview</span>
          {url && (
            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded max-w-xs truncate">
              {url}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={!url || isLoading}
            className="h-7 w-7"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenInNewTab}
            disabled={!url || isLoading}
            className="h-7 w-7"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Starting server...</p>
            <p className="text-xs text-muted-foreground mt-2">This may take a few moments</p>
          </div>
        )}

        {!url && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20">
            <Globe className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground">No preview available</p>
            <p className="text-xs text-muted-foreground mt-2">Start building to see your app here</p>
          </div>
        )}

        {loadError && url && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-sm text-red-600 font-medium">Failed to load preview</p>
            <p className="text-xs text-red-500 mt-2 mb-4">The server may still be starting</p>
            <Button onClick={handleRefresh} size="sm" variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {url && !loadError && (
          <iframe
            key={iframeKey}
            src={url}
            className="w-full h-full border-none"
            title="App Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            onError={handleIframeError}
          />
        )}
      </div>
    </div>
  )
}
