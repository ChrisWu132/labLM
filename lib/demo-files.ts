// Initial demo project for WebContainers
// Simple Express server with HTML frontend

export interface FileSystemTree {
  [name: string]: {
    file?: {
      contents: string
    }
    directory?: FileSystemTree
  }
}

export const demoFiles: FileSystemTree = {
  'package.json': {
    file: {
      contents: JSON.stringify({
        name: 'vibecoding-demo',
        version: '1.0.0',
        description: 'A simple Express server demo',
        main: 'server.js',
        scripts: {
          start: 'node server.js',
          dev: 'node server.js'
        },
        dependencies: {
          express: '^4.18.2',
          cors: '^2.8.5'
        }
      }, null, 2)
    }
  },
  'server.js': {
    file: {
      contents: `const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from your Express server!',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(\`✓ Server running on http://localhost:\${PORT}\`);
  console.log(\`✓ API available at http://localhost:\${PORT}/api/hello\`);
});
`
    }
  },
  'public': {
    directory: {
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibecoding Demo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>🎉 Welcome to Vibecoding!</h1>
    <p class="subtitle">Your Express server is running successfully.</p>

    <div class="card">
      <h2>What's Happening?</h2>
      <ul>
        <li><strong>Frontend</strong>: You're looking at it! (HTML + CSS)</li>
        <li><strong>Backend</strong>: Express server running in your browser</li>
        <li><strong>Magic</strong>: All powered by WebContainers</li>
      </ul>
    </div>

    <button id="fetchBtn" class="btn">Test API Call</button>
    <div id="result" class="result"></div>
  </div>

  <script src="app.js"></script>
</body>
</html>`
        }
      },
      'styles.css': {
        file: {
          contents: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  max-width: 600px;
  width: 100%;
}

h1 {
  color: #667eea;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.card {
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.card h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.card ul {
  list-style: none;
}

.card li {
  padding: 8px 0;
  color: #555;
}

.card strong {
  color: #667eea;
}

.btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: #e8f4f8;
  border: 1px solid #b8e0f0;
  color: #2c5f7c;
  min-height: 60px;
  display: none;
}

.result.show {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`
        }
      },
      'app.js': {
        file: {
          contents: `// Frontend JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const fetchBtn = document.getElementById('fetchBtn');
  const resultDiv = document.getElementById('result');

  fetchBtn.addEventListener('click', async () => {
    fetchBtn.textContent = 'Loading...';
    fetchBtn.disabled = true;

    try {
      const response = await fetch('/api/hello');
      const data = await response.json();

      resultDiv.innerHTML = \`
        <strong>✓ API Response:</strong><br>
        \${data.message}<br>
        <small>Received at: \${new Date(data.timestamp).toLocaleTimeString()}</small>
      \`;
      resultDiv.classList.add('show');
    } catch (error) {
      resultDiv.innerHTML = \`<strong>✗ Error:</strong> \${error.message}\`;
      resultDiv.classList.add('show');
    } finally {
      fetchBtn.textContent = 'Test API Call';
      fetchBtn.disabled = false;
    }
  });
});`
        }
      }
    }
  }
}
