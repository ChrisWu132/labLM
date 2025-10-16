"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string
  type: "file" | "directory"
  path: string
  children?: FileNode[]
}

interface FileTreeProps {
  files: FileNode[]
  selectedFile: string | null
  onFileSelect: (path: string) => void
  highlightedFiles?: Set<string>
}

export function FileTree({ files, selectedFile, onFileSelect, highlightedFiles = new Set() }: FileTreeProps) {
  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-2">
      <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">FILES</div>
      {files.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          highlightedFiles={highlightedFiles}
          level={0}
        />
      ))}
    </div>
  )
}

interface TreeNodeProps {
  node: FileNode
  selectedFile: string | null
  onFileSelect: (path: string) => void
  highlightedFiles: Set<string>
  level: number
}

function TreeNode({ node, selectedFile, onFileSelect, highlightedFiles, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const isDirectory = node.type === "directory"
  const isSelected = selectedFile === node.path
  const isHighlighted = highlightedFiles.has(node.path)

  const handleClick = () => {
    if (isDirectory) {
      setIsExpanded(!isExpanded)
    } else {
      onFileSelect(node.path)
    }
  }

  const IconComponent = isDirectory ? (isExpanded ? FolderOpen : Folder) : File

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-sm transition-all",
          "hover:bg-muted/50",
          isSelected && "bg-primary/10 text-primary font-medium",
          isHighlighted && "ring-2 ring-primary/50 animate-pulse"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {isDirectory && (
          <span className="w-4 h-4 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
            )}
          </span>
        )}
        {!isDirectory && <span className="w-4" />}
        <IconComponent
          className={cn(
            "w-4 h-4",
            isDirectory ? "text-amber-500" : "text-blue-500",
            isSelected && "text-primary"
          )}
        />
        <span className="truncate">{node.name}</span>
        {isHighlighted && (
          <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
      </div>

      {isDirectory && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              highlightedFiles={highlightedFiles}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Build file tree structure from flat file paths
 */
export function buildFileTree(filePaths: string[]): FileNode[] {
  const root: FileNode[] = []
  const nodeMap: Map<string, FileNode> = new Map()

  // Sort paths to ensure parents are created before children
  const sortedPaths = [...filePaths].sort()

  for (const path of sortedPaths) {
    const parts = path.split("/").filter(Boolean)
    let currentPath = ""
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1
      currentPath = currentPath ? `${currentPath}/${part}` : part

      // Check if node already exists
      let existingNode = nodeMap.get(currentPath)

      if (!existingNode) {
        // Create new node
        existingNode = {
          name: part,
          type: isLast ? "file" : "directory",
          path: currentPath,
          children: isLast ? undefined : [],
        }

        nodeMap.set(currentPath, existingNode)
        currentLevel.push(existingNode)
      }

      // Move to next level
      if (existingNode.children) {
        currentLevel = existingNode.children
      }
    }
  }

  return root
}
