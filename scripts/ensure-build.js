// Ensures .next build artifacts exist before starting the server
// If missing, runs `npm run build` automatically.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch (_) {
    return false;
  }
}

const manifestPath = path.join(process.cwd(), '.next', 'server', 'app-paths-manifest.json');
const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');

if (!exists(manifestPath) || !exists(buildIdPath)) {
  console.log('[ensure-build] Missing .next build artifacts. Running `npm run build`...');
  const res = spawnSync(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build'], {
    stdio: 'inherit',
    env: process.env,
  });
  if (res.status !== 0) {
    console.error('[ensure-build] Build failed. See logs above.');
    process.exit(res.status || 1);
  }
  console.log('[ensure-build] Build completed. Continuing to start the server...');
}
