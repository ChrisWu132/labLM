"use client"

import { Sandpack } from "@codesandbox/sandpack-react"

export default function SandpackWrapper() {
  return (
    <Sandpack
      template="react"
      theme="auto"
      options={{
        showNavigator: true,
        showTabs: true,
        showLineNumbers: true,
        editorHeight: 500,
      }}
      files={{
        "/App.js": `export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Welcome to Your AI Startup MVP</h1>
      <p>Start building your product here!</p>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h2>Quick Start</h2>
        <ul>
          <li>Customize the UI to match your brand</li>
          <li>Add your AI integration</li>
          <li>Test with real user scenarios</li>
        </ul>
      </div>
    </div>
  );
}`,
      }}
    />
  )
}
