# Kryptonite UI

Modern, animated React + Tailwind CSS components. Copy them into your project and adapt them. There's no package to install.

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

## Run the showcase locally

```bash
npm install
npm run dev
```

## Using a component

1. Open the showcase, pick a component and click **Copy code**.
2. Paste it into your project (for example `components/ui/ShimmerButton.tsx`).
3. Copy `src/lib.ts` (the `cn` helper) and the `@theme` block from `src/index.css`. The block holds the colors and keyframes the components use.

Requires React 18+ and Tailwind CSS v4.

## Adding a new component

1. Create `src/components/ui/MyComponent.tsx` and export it from `src/components/ui/index.ts`.
2. Add any new keyframes or colors to the `@theme` block in `src/index.css`.
3. Add an entry to `src/registry/index.tsx` with a name, category, description and preview. The code tab reads the source file automatically.

## Project structure

```
src/
  components/ui/   the components (one file each)
  registry/        showcase metadata and previews
  lib.ts           cn() class helper
  index.css        Tailwind theme: colors, animations
  App.tsx          the showcase site
```

## License

MIT
