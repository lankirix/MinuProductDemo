# Minu Organics — Product Demo Video

A programmatic marketing video built with [Remotion](https://remotion.dev) for the **Ceramide Barrier Night Cream** by minu Organics.

Renders a 27-second, 1080x1920 (vertical/Reels-ready) MP4 — fully animated, no video editing software required.

--

## Scenes

| Scene | Duration | Description |
|-------|----------|-------------|
| 1 | 3s | Hook — bold opening headline |
| 2 | 3s | Brand intro — logo reveal with particle burst |
| 3 | 8s | Simulated product search demo |
| 4 | 5s | Product showcase — 3-image crossfade with Ken Burns |
| 5 | 3s | Feature callouts — Deeply Moisturizing, Barrier Repair, Organic |
| 6 | 5s | Email waitlist CTA — animated signup + coming soon |

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
npx remotion render MinuOrganicsDemo output/minu-final.mp4
```

Output saves to `output/minu-final.mp4`

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
├── public/              # Product images
│   ├── product-1.jpg
│   ├── product-2.jpeg
│   ├── product-3.jpeg
│   └── product-4.jpeg
├── src/
│   ├── scenes/          # Individual video scenes
│   │   ├── Scene1Hook.tsx
│   │   ├── Scene2ProductIntro.tsx
│   │   ├── Scene3Demo.tsx
│   │   ├── Scene4Showcase.tsx
│   │   ├── Scene5Features.tsx
│   │   └── Scene6CTA.tsx
│   ├── fonts.ts
│   ├── MinuOrganicsVideo.tsx
│   └── Root.tsx
├── .github/workflows/
│   └── render.yml
├── Dockerfile
└── remotion.config.ts
```

---

## Brand

**minu Organics** — Wellness · Beauty · Consultancy

Shop: [minunatural.shop](https://minunatural.shop)

---

Built by [LANKIRIX AUTOMATION LTD](https://github.com/lankirix)
