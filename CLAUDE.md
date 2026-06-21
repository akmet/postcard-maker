# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start Vite dev server (port 5173)
pnpm build         # Type-check + production build
pnpm preview       # Preview production build
pnpm lint          # Run oxlint
pnpm lint:fix      # Auto-fix lint issues
pnpm format        # Format with oxfmt
pnpm format:check  # Check formatting only
pnpm tauri dev     # Run Tauri desktop app in dev mode
pnpm tauri build   # Build Tauri desktop app
```

## Architecture

**Vue 3 + Pinia + Konva.js** single-page app (also packaged as Tauri desktop app).

### State

Two Pinia stores:
- **persistentStore** (`src/stores/persistentStore.ts`): All user data — texts, images (5 slots), layout, gap, border settings. Persisted to `localStorage` via `@vueuse/core`. Contains undo/redo history as arrays of JSON-serialized snapshots.
- **stageStore** (`src/stores/stageStore.ts`): Holds the Konva `Stage` instance and DOM element refs. Not persisted.

### Canvas Rendering

Konva.js (`vue-konva`) renders the postcard as a Stage → Layer → Groups hierarchy. Layout logic lives in `src/helper/createStages.ts`, which computes positions for the 3 supported grid layouts (2×2, 2×3, 3×2). Images are stored as base64 strings deduped via a UUID map to keep localStorage usage manageable.

### Undo/Redo

Implemented manually: before each mutation, the current state is serialized to JSON and pushed onto `undoStore`. Undo pops from `undoStore` and pushes to `redoStore`.

### Export

`src/helper/exportImage.ts` handles PNG export via Konva's `toDataURL`. JSON import/export lives in `src/helper/importExport.ts`.

### Component Overview

- `App.vue` — root layout, wires canvas + sidebar
- `SidebarMenu.vue` — main control panel
- `ImageDrop.vue` / `ImageCrop.vue` — image upload and cropping flow
- `TextModal.vue` — text overlay editor
- `StageZoom.vue` — zoom controls for the Konva stage

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **State**: Pinia 3
- **Canvas**: Konva 10 / vue-konva
- **Styling**: Tailwind CSS
- **Desktop**: Tauri 2
- **Build**: Vite 7, TypeScript 6 (strict mode)
- **Linter/Formatter**: oxlint + oxfmt
- **Package manager**: pnpm 11

## Notes

- TypeScript strict mode is enabled (`noUnusedLocals`, `noUnusedParameters`).
- oxlint is configured to detect import cycles (`.oxlintrc.json`).
- The UI is in German (e.g., "Postkarte", "Viele Grüße").
- CI builds desktop releases (macOS arm64 + x86-64, Ubuntu, Windows) and deploys the web version to GitHub Pages.
