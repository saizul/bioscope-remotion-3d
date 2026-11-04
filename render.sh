#!/usr/bin/env bash
set -e

# Change to project directory
cd "$(dirname "$0")"

# Ensure Node & npm are in PATH
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$PATH"

mkdir -p out

echo "=========================================================="
echo "  Bioscope Limited — Rendering 3D Corporate Video"
echo "  Duration: 120 Seconds (3600 Frames @ 30 FPS)"
echo "  Resolution: 1920x1080 (Full HD)"
echo "=========================================================="
echo ""

./node_modules/.bin/remotion render src/index.ts BioscopeCorporateVideo out/bioscope-corporate-3d.mp4 --gl=angle

echo ""
echo "✓ Successfully rendered to: out/bioscope-corporate-3d.mp4"
