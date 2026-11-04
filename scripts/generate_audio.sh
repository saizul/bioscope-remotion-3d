#!/usr/bin/env bash
set -e

# Change to project root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
cd "$DIR"

VO_DIR="$DIR/public/voiceover"
mkdir -p "$VO_DIR"

echo "================================================================="
echo "   GENERATING REAL ENGLISH FEMALE VOICEOVER AUDIO FILES"
echo "================================================================="
echo ""

# Script lines
S1="Welcome to Bioscope Limited—where consultancy, outsourcing, and impact come together to build a better tomorrow. For over a decade, we have been Bangladesh's trusted multidisciplinary partner for private enterprises, government agencies, NGOs, and INGOs across all 64 districts."
S2="From high-level consultancy, research surveys, and digital IT solutions to event management, procurement, and nationwide outsourcing—we deliver comprehensive, result-oriented solutions. With over 100 successful projects and 1,500 deployed professionals, excellence is our standard."
S3="Why should your organization choose Bioscope Limited for manpower? Because hiring shouldn't be a hassle. We bring government-grade compliance, following all regulatory guidelines, directly to private companies, factories, hospitals, offices, and apartment complexes. We provide pre-vetted, trained staff across 63 specialized job positions in 8 major categories—backed by strict payroll discipline, ethical transparency, and rapid nationwide replacement support."
S4="Looking for your next career opportunity? Here is why thousands of job seekers trust Bioscope Limited. Whether you are an IT specialist, engineer, office administrator, driver, security professional, or customer service expert, we connect your talent with top private companies and institutions across Bangladesh. With 63 diverse job roles, zero hidden hassle, guaranteed payroll discipline, and a quick two-minute online registration, your next big career move starts right here."
S5="As a Government Approved Vendor registered with RJSC and licensed by DIFE, every partnership we build is rooted in legal compliance, accountability, and sustainable growth."
S6="Need reliable staff, or ready to apply for a job? Visit bioscopeltd.net or call us today. Bioscope Limited—your trusted partner for sustainable success."

# Function to generate audio using edge-tts if available, else macOS say
generate_scene() {
  local num="$1"
  local text="$2"
  local target_mp3="$VO_DIR/voiceover_scene${num}.mp3"
  local target_wav="$VO_DIR/voiceover_scene${num}.wav"
  local tmp_aiff="/tmp/vo_scene${num}.aiff"

  echo "[Scene ${num}] Generating audio..."

  if command -v edge-tts &> /dev/null; then
    echo "  -> Using Microsoft Edge Neural Female Voice (en-US-AriaNeural)..."
    edge-tts --voice en-US-AriaNeural --text "$text" --write-media "$target_mp3"
    afconvert -f WAVE -d LEI16@44100 "$target_mp3" "$target_wav" 2>/dev/null || cp "$target_mp3" "$target_wav"
  else
    echo "  -> Using macOS Native Female Voice (Samantha, 175 wpm)..."
    say -v Samantha -r 175 "$text" -o "$tmp_aiff"
    afconvert -f WAVE -d LEI16@44100 "$tmp_aiff" "$target_wav"
    cp "$target_wav" "$target_mp3"
    rm -f "$tmp_aiff"
  fi

  local size=$(ls -lh "$target_wav" | awk '{print $5}')
  echo "  ✓ Saved: voiceover_scene${num}.mp3 ($size)"
  echo ""
}

generate_scene 1 "$S1"
generate_scene 2 "$S2"
generate_scene 3 "$S3"
generate_scene 4 "$S4"
generate_scene 5 "$S5"
generate_scene 6 "$S6"

echo "================================================================="
echo "✓ All 6 voiceover tracks successfully created with spoken audio!"
echo "================================================================="
