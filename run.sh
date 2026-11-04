#!/usr/bin/env bash
set -e

# Change to project directory
cd "$(dirname "$0")"

# Ensure Node & npm are in PATH
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$PATH"

echo "=========================================================="
echo "  Bioscope Limited — 3D Remotion Corporate Video (120s)"
echo "=========================================================="
echo "Node version: $(node -v)"
echo "npm version:  $(npm -v)"
echo ""

# 1. Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
  echo "[1/3] Installing dependencies (@remotion/three, three, React Three Fiber)..."
  npm install
else
  echo "[1/3] Dependencies already installed."
fi

# 2. Setup SFX & Voiceover audio slots
echo "[2/3] Setting up audio assets and sound effects..."
node scripts/setup-audio.js

# 3. Launch Remotion Studio Preview
echo "[3/3] Launching Remotion Studio Preview (http://localhost:3000)..."
echo "Press Ctrl+C to stop."
npm start
