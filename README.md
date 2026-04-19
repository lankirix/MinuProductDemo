# Minu Natural — Ceramide Night Barrier Cream

A premium 30-second luxury skincare video built with [Remotion](https://remotion.dev) for the **Ceramide Night Barrier Cream** by minu Natural.

Renders a 30-second, 1080x1920 (vertical/Reels-ready) MP4 — fully animated, synced to voiceover, with background music.

---

## Scenes

All product scenes (1-6) share a unified visual style: **full-bleed product image** with slow Ken Burns zoom, dark gradient overlay for text readability, and sequential text reveal at the bottom.

| Scene | Duration | Voiceover | Visual Style |
|-------|----------|-----------|--------------|
| 1 | 0–4s | "Your skin works hardest while you sleep." | Full-bleed product, warm night tones, slow zoom |
| 2 | 4–8s | "That's when Minu's Ceramide Night Barrier Cream does its magic." | Full-bleed product, label text overlay |
| 3 | 8–14s | "Rich, luxurious ceramides lock in moisture, repair your skin's natural barrier, and restore that effortless glow." | Full-bleed texture shot, golden light sweep |
| 4 | 14–18s | "Wake up to softer, calmer, deeply nourished skin." | Full-bleed product, morning sunrise glow |
| 5 | 18–22s | "Because you deserve to feel this good every morning." | Full-bleed product, warm rose tones |
| 6 | 22–26s | "Minu Natural. Barrier care that works while you rest." | Full-bleed product, golden brand lockup |
| 7 | 26–34s | "Visit minunatural.shop" | Google search → typing → results → website landing page with CTA overlay |

### Scene 7 Breakdown (Google Search Simulation)

| Phase | Duration | Visual |
|-------|----------|--------|
| 1 | 26–28s | Google homepage |
| 2 | 28–30s | Typing "minunatural.shop" with blinking cursor |
| 3 | 30–31.5s | Search results with highlighted minunatural.shop result |
| 4 | 31.5–34s | Website landing page with CTA overlay |

**Note:** Video is 34 seconds (1020 frames) to match the full 33.67s voiceover recording.

---

## Audio

| Track | File | Volume |
|-------|------|--------|
| Voiceover | `I used to dread look.mp3` | 100% (primary) |
| Background Music | `Gentle_Triumph_2026-04-13T195831.mp3` | 28% (ambient) |

---

## Tech Stack

- [Remotion](https://remotion.dev) — React-based video rendering
- React 18 + TypeScript
- Docker — containerized render environment
- GitHub Actions — automated CI/CD render pipeline

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Preview in browser

```bash
npm start
```

Opens Remotion Studio at `http://localhost:3000`

### Render to MP4

```bash
npx remotion render MinuNaturalDemo output/minu-ceramide-night-cream.mp4
```

Output saves to `output/minu-ceramide-night-cream.mp4`

---

## Docker

Build and render inside a container:

```bash
docker build -t minu-render .
docker run --rm -v $(pwd)/output:/app/output minu-render
```

The rendered MP4 will appear in your local `output/` folder.

---

## CI/CD

Every push to `main` triggers a GitHub Actions workflow that:

1. Installs dependencies
2. Installs Chromium on the Ubuntu runner
3. Renders the video
4. Uploads `minu-final.mp4` as a downloadable artifact (retained for 7 days)

Find rendered artifacts under **Actions** > latest run > **Artifacts**.

---

## Project Structure

```
.
├── public/              # Product images + audio/video assets
│   ├── product-1.jpg
│   ├── product-2.jpeg
│   ├── product-3.jpeg
│   ├── product-4.jpeg
│   ├── minu_organics-removed-bg.png
│   ├── I used to dread look.mp3              (voiceover — 33.67s)
│   ├── Gentle_Triumph_2026-*.mp3             (background music)
│   ├── google-homepage.png                   (Scene 7 phase 1)
│   ├── google-typing.png                     (Scene 7 phase 2)
│   ├── google-results.png                    (Scene 7 phase 3)
│   ├── minunatural-shop.png                  (Scene 7 phase 4)
│   └── minunatural-shop-scrolled.png         (Scene 7 alternate)
├── src/
│   ├── scenes/          # Individual video scenes (7 total)
│   │   ├── Scene1NightHook.tsx
│   │   ├── Scene2ProductReveal.tsx
│   │   ├── Scene3TextureApplication.tsx
│   │   ├── Scene4MorningGlow.tsx
│   │   ├── Scene5SelfCare.tsx
│   │   ├── Scene6BrandLockup.tsx
│   │   └── Scene7CTA.tsx
│   ├── fonts.ts
│   ├── MinuNaturalVideo.tsx
│   └── Root.tsx
├── .github/workflows/
│   └── render.yml
├── Dockerfile
└── remotion.config.ts
```

---

## Brand

**minu Natural** — Wellness · Beauty · Consultancy

Shop: [minunatural.shop](https://minunatural.shop)

---

Built by [LANKIRIX AUTOMATION LTD](https://github.com/lankirix)
