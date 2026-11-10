# Kryptonite UI

Modern, animated React + Tailwind CSS components. Copy them into your project and adapt them. There's no package to install.

The showcase site is built with **Next.js** (App Router), **shadcn/ui** and **Tailwind CSS v4**. It uses a charcoal-black theme.

## Components

| Component | Category |
| --- | --- |
| Shimmer Button | Buttons |
| Glow Border Button | Buttons |
| Magnetic Button | Buttons |
| Spotlight Card | Cards |
| Tilt Card | Cards |
| Gradient Text | Text |
| Aurora Background | Backgrounds |
| Marquee | Layout |

## Run the site locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Using a component

1. On the site, pick a component and click **Copy**.
2. Paste it into your project (for example `components/ShimmerButton.tsx`).
3. Make sure you have a `cn` helper (shadcn projects already have one at `@/lib/utils`). Also copy the "Kryptonite brand tokens" `@theme` block from `src/app/globals.css`, which holds the colors and keyframes the components use.

Requires React 18+ and Tailwind CSS v4.

## Adding a new component

1. Create `src/components/kryptonite/MyComponent.tsx` and export it from `src/components/kryptonite/index.ts`.
2. Add an entry to `src/registry/meta.ts` (name, slug, file, category, description).
3. Add its preview to `src/registry/previews.tsx`.

The Code tab reads the source file automatically.

## Project structure

```
src/
  app/                    Next.js pages, layout and globals.css (theme)
  components/kryptonite/  the Kryptonite components (one file each)
  components/site/        the showcase UI (gallery, component card)
  components/ui/          shadcn/ui primitives
  registry/               component list, previews and source loader
  lib/utils.ts            cn() class helper
```

## License

MIT
