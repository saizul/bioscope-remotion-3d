# Bioscope Limited — 3D Corporate Motion Graphics Video (Remotion)

A production-ready, 2-minute (120 seconds, 3600 frames @ 30fps, 1920x1080 Full HD) 3D corporate motion graphics video project built using **Remotion**, **@remotion/three**, **React Three Fiber**, and **Three.js**.

- **Official Website:** [bioscopeltd.net](https://bioscopeltd.net)
- **Tagline:** *"CONSULTANCY. OUTSOURCING. IMPACT. — Empowering Organizations, Building Better Tomorrow."*

---

## 1. Project Specifications
- **Duration:** Exactly 120 seconds (3600 frames at 30 fps)
- **Resolution:** 1920 × 1080 (16:9 Full HD)
- **Tech Stack:**
  - `remotion` (v4)
  - `@remotion/three` & `@react-three/fiber`
  - `three` (v0.164+)
  - React 18 & TypeScript
- **Audio Profile:**
  - **SFX Only:** 35+ frame-accurate UI sound effects (`whoosh.mp3`, `swoosh.mp3`, `pop.mp3`, `click.mp3`, `chime.mp3`) triggered via `<Sequence>` on every 3D transition, number counter, and category snap.
  - **Zero Background Music:** No background track is included, allowing manual custom music placement later.
  - **Female Voiceover:** 6 synchronized scenes with pre-timed audio triggers and a TTS generator.

---

## 2. Scene Timeline & Voiceover Script (Exact 120s / 3600 Frames)

| Scene | Time Window | Frames | Visuals & 3D Elements | Voiceover Script Summary |
|---|---|---|---|---|
| **Scene 1: Intro & Brand Hook** | 0:00 – 0:15 | 0 – 450 | 3D Metallic Lens/Aperture Logo assembling, 3D wireframe Bangladesh map with 64 glowing district beacons | *"Welcome to Bioscope Limited—where consultancy, outsourcing, and impact come together to build a better tomorrow..."* |
| **Scene 2: Core Services & Stats** | 0:15 – 0:35 | 450 – 1050 | 3D rotating hexagonal carousel (6 services) + 4 giant animated glass counters (10+ Yrs, 100+ Projects, 1500+ Manpower, 64 Districts) | *"From high-level consultancy, research surveys, and digital IT solutions to event management, procurement, and nationwide outsourcing..."* |
| **Scene 3: Why Organizations Choose Bioscope** | 0:35 – 1:05 | 1050 – 1950 | 3D metallic compliance shield morphing into 8 isometric category pillars (63 job positions) | *"Why should your organization choose Bioscope Limited for manpower? Because hiring shouldn't be a hassle..."* |
| **Scene 4: Why Job Seekers Trust Bioscope** | 1:05 – 1:35 | 1950 – 2850 | 3D smartphone/portal with animated 2-minute registration UI + floating 3D career badges | *"Looking for your next career opportunity? Here is why thousands of job seekers trust Bioscope Limited..."* |
| **Scene 5: Trust & Compliance** | 1:35 – 1:48 | 2850 – 3240 | 4 rotating 3D golden medallions (Govt Approved, RJSC C-123913, DIFE Licensed, PPR/CPTU) | *"As a Government Approved Vendor registered with RJSC and licensed by DIFE, every partnership we build is rooted in legal compliance..."* |
| **Scene 6: CTA & Contact Outro** | 1:48 – 2:00 | 3240 – 3600 | 3D brand seal, 3D interactive dual CTA buttons ("Request Manpower", "Apply for a Job"), Banani & Shyamoli offices | *"Need reliable staff, or ready to apply for a job? Visit bioscopeltd.net or call us today..."* |

---

## 3. Quick Start & Execution

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Live Preview in Remotion Studio
```bash
npm start
```
This opens the Remotion Studio in your browser at `http://localhost:3000`. You can preview the full 120s master video or scrub individual scenes in the "Scenes" folder.

### Step 3: Generate AI Female Voiceover (Optional)
If you want to generate high-quality neural female voiceovers using Microsoft Edge-TTS or OpenAI TTS:
```bash
# Option A: Free Microsoft Edge-TTS (en-US-AriaNeural)
pip install edge-tts
npm run tts

# Option B: OpenAI TTS
export OPENAI_API_KEY="your-api-key"
npm run tts
```

### Step 4: Render Production MP4
```bash
npm run build
```
This outputs `out/bioscope-corporate-3d.mp4` rendered at 1920x1080, 30fps.

### Type check, timeline check and tests
```bash
npm run typecheck
npm run check      # timeline, voice-over and SFX consistency (no rendering)
npm test           # unit tests for the checks
```
All three run in GitHub Actions on every push and pull request.

---

## 4. Changing the timing

Scene start frames and lengths live in **one place**: `src/timeline.ts`. The master sequence (`MainVideo.tsx`) and the per-scene previews (`Root.tsx`) are built from it, and sound-effect cues live in `src/sfxTriggers.ts`.

The voice-over script (`src/voiceoverScript.json`) is also read by the TTS generator, so it keeps its own frame numbers. `npm run check` (`scripts/check-timeline.ts`) makes sure everything still lines up after an edit:

| Check | Level |
| --- | --- |
| Scenes start at 0, follow each other with no gap or overlap, and add up to exactly 3600 frames (2:00) | error |
| Each voice-over entry matches its scene's frames; `endFrame - startFrame = durationInFrames`; audio file names are unique and plain | error |
| Narration fits the scene at 160 words per minute (otherwise the TTS line is cut off) | warning |
| `timeRange` text matches the frames | warning |
| SFX ids are unique, frames are inside the video, files are one of `whoosh/swoosh/pop/click/chime.mp3`, volume 0-1, and an `sN_` id really falls in scene N | error |

Example after moving scene 3 without updating the script:

```text
ERROR  voiceoverScript.json: scene_3: frames 1050-1950 do not match Scene3-WhyOrganizations (1080-1980); update the JSON after changing timeline.ts
```

`--strict` makes warnings fail too.
