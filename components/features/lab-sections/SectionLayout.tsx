'use client'

/**
 * SectionLayout Component
 *
 * Main wrapper for a lab section with tab navigation.
 * Handles section-level layout, tab switching, and progress tracking.
 */

import { useState, ReactNode } from 'react'
import type { LabSection, SectionTab } from '@/types/prompt-lab'

export interface SectionLayoutProps {
  section: LabSection
  currentTab?: string // 'learn' | 'tryIt' | 'quiz'
  onTabChange?: (tabId: string) => void
  learnContent: ReactNode
  tryItContent?: ReactNode
  quizContent?: ReactNode
  onMarkComplete?: () => Promise<void>
  isCompleted?: boolean
}

export function SectionLayout({
  section,
  currentTab = 'learn',
  onTabChange,
  learnContent,
  tryItContent,
  quizContent,
  onMarkComplete,
  isCompleted = false,
}: SectionLayoutProps) {
  const [activeTab, setActiveTab] = useState(currentTab)
  const [isMarking, setIsMarking] = useState(false)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const handleMarkComplete = async () => {
    if (isMarking || isCompleted) return

    setIsMarking(true)
    try {
      await onMarkComplete?.()
    } finally {
      setIsMarking(false)
    }
  }

  // Determine which content to render
  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return learnContent
      case 'tryIt':
        return tryItContent || <p>No exercises available</p>
      case 'quiz':
        return quizContent || <p>No quiz available</p>
      default:
        return learnContent
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Section {section.id}
            </p>
            <h1 className="text-3xl font-bold text-[#164055] md:text-4xl">
              {section.title}
            </h1>
          </div>
          {isCompleted && (
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">✓ Completed</p>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {section.tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'border-[#3b999c] text-[#3b999c]'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">{renderContent()}</div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <div>
          {!isCompleted && (
            <button
              onClick={handleMarkComplete}
              disabled={isMarking}
              className="
                rounded-lg bg-[#f7aa37] px-6 py-3 font-semibold text-white
                shadow-md transition-all duration-200
                hover:bg-[#e89a27] hover:shadow-lg
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {isMarking ? 'Saving...' : 'Mark Complete & Continue →'}
            </button>
          )}
          {isCompleted && (
            <button
              onClick={handleMarkComplete}
              disabled={isMarking}
              className="
                rounded-lg bg-green-600 px-6 py-3 font-semibold text-white
                shadow-md transition-all duration-200
                hover:bg-green-700 hover:shadow-lg
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              Continue to Next Section →
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600">
          Section {section.order} of{' '}
          {section.labNumber === 1 || section.labNumber === 2 || section.labNumber === 3
            ? '5'
            : section.labNumber === 4 || section.labNumber === 5
              ? '6'
              : '8'}
        </p>
      </div>
    </div>
  )
}
