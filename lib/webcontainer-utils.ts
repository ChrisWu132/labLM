// WebContainer utilities for managing browser-based Node.js environment
import type { WebContainer, WebContainerProcess } from '@webcontainer/api'

let webcontainerInstance: WebContainer | null = null

/**
 * Boot WebContainer (singleton pattern)
 * Only boots once, subsequent calls return the same instance
 */
export async function bootWebContainer(): Promise<WebContainer> {
  if (webcontainerInstance) {
    return webcontainerInstance
  }

  try {
    // Dynamic import to avoid SSR issues
    const { WebContainer } = await import('@webcontainer/api')
    webcontainerInstance = await WebContainer.boot()
    console.log('[WebContainer] Booted successfully')
    return webcontainerInstance
  } catch (error) {
    console.error('[WebContainer] Failed to boot:', error)
    throw new Error('Failed to initialize WebContainer. Please refresh the page.')
  }
}

/**
 * Get existing WebContainer instance (must be booted first)
 */
export function getWebContainer(): WebContainer | null {
  return webcontainerInstance
}

/**
 * Check if browser supports WebContainer
 */
export function isWebContainerSupported(): boolean {
  if (typeof window === 'undefined') return false

  // Check for required features
  const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
  const hasCrossOriginIsolation = window.crossOriginIsolated

  return hasSharedArrayBuffer && hasCrossOriginIsolation
}

/**
 * Mount file system to WebContainer
 */
export async function mountFiles(
  webcontainer: WebContainer,
  files: any
): Promise<void> {
  try {
    await webcontainer.mount(files)
    console.log('[WebContainer] Files mounted successfully')
  } catch (error) {
    console.error('[WebContainer] Failed to mount files:', error)
    throw error
  }
}

/**
 * Install npm dependencies
 */
export async function installDependencies(
  webcontainer: WebContainer,
  onOutput?: (data: string) => void
): Promise<WebContainerProcess> {
  console.log('[WebContainer] Installing dependencies...')

  const installProcess = await webcontainer.spawn('npm', ['install'])

  if (onOutput) {
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          onOutput(data)
        }
      })
    )
  }

  const exitCode = await installProcess.exit

  if (exitCode !== 0) {
    throw new Error(`npm install failed with exit code ${exitCode}`)
  }

  console.log('[WebContainer] Dependencies installed')
  return installProcess
}

/**
 * Start the development server
 */
export async function startDevServer(
  webcontainer: WebContainer,
  command: string = 'npm',
  args: string[] = ['run', 'dev'],
  onOutput?: (data: string) => void
): Promise<WebContainerProcess> {
  console.log(`[WebContainer] Starting dev server: ${command} ${args.join(' ')}`)

  const serverProcess = await webcontainer.spawn(command, args)

  if (onOutput) {
    serverProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          onOutput(data)
        }
      })
    )
  }

  return serverProcess
}

/**
 * Get the server URL when ready
 */
export async function waitForServerReady(
  webcontainer: WebContainer,
  timeout: number = 30000
): Promise<string> {
  console.log(`[WebContainer] Waiting for server-ready event (timeout: ${timeout}ms)...`)

  return new Promise((resolve, reject) => {
    let resolved = false

    const timeoutId = setTimeout(() => {
      if (!resolved) {
        console.error('[WebContainer] Server start timeout - no server-ready event received')
        reject(new Error('Server start timeout. Please check the terminal for errors.'))
      }
    }, timeout)

    const handler = (port: number, url: string) => {
      if (!resolved) {
        resolved = true
        clearTimeout(timeoutId)
        console.log(`[WebContainer] Server ready at ${url} (port ${port})`)
        resolve(url)
      }
    }

    webcontainer.on('server-ready', handler)
  })
}

/**
 * Read file contents from WebContainer
 */
export async function readFile(
  webcontainer: WebContainer,
  path: string
): Promise<string> {
  try {
    const file = await webcontainer.fs.readFile(path, 'utf-8')
    return file
  } catch (error) {
    console.error(`[WebContainer] Failed to read file ${path}:`, error)
    throw error
  }
}

/**
 * Write file to WebContainer
 */
export async function writeFile(
  webcontainer: WebContainer,
  path: string,
  contents: string
): Promise<void> {
  try {
    await webcontainer.fs.writeFile(path, contents)
    console.log(`[WebContainer] Wrote file: ${path}`)
  } catch (error) {
    console.error(`[WebContainer] Failed to write file ${path}:`, error)
    throw error
  }
}

/**
 * List directory contents
 */
export async function listDirectory(
  webcontainer: WebContainer,
  path: string = '.'
): Promise<string[]> {
  try {
    const entries = await webcontainer.fs.readdir(path)
    return entries
  } catch (error) {
    console.error(`[WebContainer] Failed to list directory ${path}:`, error)
    return []
  }
}

/**
 * Clean up WebContainer resources
 */
export async function teardownWebContainer(): Promise<void> {
  if (webcontainerInstance) {
    try {
      await webcontainerInstance.teardown()
      webcontainerInstance = null
      console.log('[WebContainer] Torn down successfully')
    } catch (error) {
      console.error('[WebContainer] Failed to teardown:', error)
    }
  }
}
