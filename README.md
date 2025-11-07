# Time Tutor

Time Tutor is a Next.js (T3 stack) learning experience that drills you on converting 24-hour clocks to 12-hour time **and** translating meetings between world time zones. The quiz keeps score, plays celebratory/error tones, and lets you switch between twelve immersive skins ranging from “Space Drift” to “Molten Ember”.

- **Tech stack**: Next.js App Router • TypeScript • Tailwind CSS v4 • pnpm
- **Structure**: App routes for `/` (quiz), `/settings`, `/learn`, with shared providers/components
- **Persistence**: Theme + timezone/DST preferences saved in `localStorage`

## Feature Overview

| Area | Highlights |
| --- | --- |
| Quiz (`/`) | Randomized 24h prompts, 12h answers, DST-aware timezone conversion, Web Audio cues, responsive hero |
| Settings (`/settings`) | Skin gallery, pinned timezone scenarios (NYC→London/LA/Auckland, 12↔24 hour), custom dropdowns, DST toggles |
| Learn (`/learn`) | Daylight-savings reference for every supported timezone, JSON-LD dataset for SEO |
| Styling | 12 unique skins themed via a central preset map in `src/lib/themes.ts` |
| Accessibility | Semantic sections, ARIA labels, live regions, focus states |
| SEO | Canonical metadata, Open Graph/Twitter cards, structured data on quiz/learn pages |

## Quick Start

```bash
# install dependencies
pnpm install

# start the dev server
pnpm dev

# lint and type-check
pnpm lint
pnpm typecheck

# build for production
pnpm build
```

Open http://localhost:3000 to see the quiz. Hop into `/settings` to test each skin, pin quick timezone presets (NYC↔Auckland, NYC↔London, NYC↔LA, 12↔24 Hour), or pick any custom pair from the dropdowns. Visit `/learn` for the daylight-savings cheat sheet.

## Environment

No runtime env vars are required. If you add APIs or analytics later, expose them via the default `src/env.js` scaffolding from T3.

## Project Structure

```
src/
  app/
    layout.tsx        # root metadata, global providers
    page.tsx          # quiz UI
    settings/page.tsx # skin picker, timezone presets, DST toggles
    learn/page.tsx    # daylight savings reference
  components/
    theme-provider.tsx
  lib/
    themes.ts         # skin definitions
    timezones.ts      # timezone metadata + pinned scenarios
  styles/
    globals.css
```

## Customization Tips

- **Add skins**: extend `themePresets` in `src/lib/themes.ts` with new palettes; everything else picks them up automatically.
- **Adjust sounds**: tweak `playSound` in `page.tsx` to change oscillator types or note sequences.
- **Timezone presets**: add more pinned combos or extend `timezoneOptions` in `src/lib/timezones.ts` if you want full coverage.
- **SEO**: update `metadata` in `layout.tsx` or modify the JSON-LD payload in `page.tsx` to match your production domain.
- **Learn page content**: edit `src/app/learn/page.tsx` to include additional notes, charts, or resources.

## Testing & Verification

- `pnpm lint` – ESLint via Next.
- `pnpm typecheck` – TypeScript `--noEmit`.
- `pnpm build` – Ensures the app compiles with the latest Next.js build pipeline.

## Contributing

1. Fork and clone.
2. Create a feature branch off `main`.
3. Run `pnpm lint && pnpm typecheck && pnpm build` before opening a PR.
4. Describe UX/SEO impacts in the PR body.

## License

MIT © blockrush — feel free to remix for other learning drills (number bases, timezone practice, anything that benefits from fast recognition and stylish feedback). 🎉
