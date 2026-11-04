#!/bin/bash
set -e
cd "$(dirname "$0")"

# Ensure PATH has Node, npm, and system binaries
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$PATH"

echo "================================================================="
echo "   BIOSCOPE LIMITED — 3D CORPORATE MOTION GRAPHICS RENDER"
echo "   Duration: 120 Seconds (3600 Frames @ 30 FPS, 1920x1080 Full HD)"
echo "================================================================="
echo ""

# STEP 1: Generate real spoken female voiceovers for all 6 scenes
echo ">>> STEP 1/2: Generating real spoken English Female Voiceovers..."
./scripts/generate_audio.sh

# STEP 2: Render video with Remotion
echo ""
echo ">>> STEP 2/2: Rendering full 120-second 3D video with GPU..."
mkdir -p out
./node_modules/.bin/remotion render src/index.ts BioscopeCorporateVideo out/bioscope-corporate-3d.mp4 --gl=angle

echo ""
echo "================================================================="
echo "✓ 100% COMPLETE: Video rendered with full voiceover and SFX!"
echo "Saved to: $(pwd)/out/bioscope-corporate-3d.mp4"
echo "================================================================="
echo ""
open out/bioscope-corporate-3d.mp4 2>/dev/null || true
read -p "Press [Enter] to exit..."
