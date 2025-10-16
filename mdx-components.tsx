import type { MDXComponents } from 'mdx/types'

/**
 * MDX Components Configuration
 *
 * This file allows you to provide custom React components
 * to be used in MDX files. You can use this to customize
 * how markdown elements are rendered.
 *
 * Learn more: https://nextjs.org/docs/app/building-your-application/configuring/mdx
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components will be added in Phase 2
    // PromptEditor and LLMOutputDisplay will be mapped here
    ...components,
  }
}
