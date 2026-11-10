# Kryptonite UI

Modern, animated React + Tailwind CSS components. Copy them into your project and adapt them. There's no package to install.

The showcase site is built with **Next.js** (App Router), **shadcn/ui** and **Tailwind CSS v4**. It uses a charcoal-black theme, with **Calendas Plus** for headings and **Poppins** for body text.

### Heading font

Calendas Plus is a free font from Atipo Foundry and isn't on Google Fonts. Download it from Atipo Foundry and put the files in `public/fonts/` with these names:

- `CalendasPlus-Regular.woff2` (or `.otf`)
- `CalendasPlus-Italic.woff2` (or `.otf`)
- `CalendasPlus-Bold.woff2` (or `.otf`)

Until those files are added, headings use Instrument Serif instead.

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

1. On the site, pick a component. Click **Customize** to change its colors, speed and other options; the preview updates live.
2. Open the **Code** tab. **Usage** shows the code for your customized version (only the options you changed), and below it is the component's source.
3. Paste the source into your project (for example `components/kryptonite/ShimmerButton.tsx`) and use it as shown in **Usage**.
4. Make sure you have a `cn` helper (shadcn projects already have one at `@/lib/utils`). Also copy the "Kryptonite brand tokens" `@theme` block from `src/app/globals.css`, which holds the colors and keyframes the components use.

Requires React 18+ and Tailwind CSS v4.

## Adding a new component

1. Create `src/components/kryptonite/MyComponent.tsx` and export it from `src/components/kryptonite/index.ts`.
2. Add an entry to `src/registry/meta.ts` (name, slug, file, category, description).
3. Add a playground to `src/registry/playground.tsx`: its customize controls, a `render` function for the preview, and a `usage` function for the code snippet.

Give every customizable option a prop with a sensible default, so the component works with no props at all.

The Code tab reads the source file automatically.

## Project structure

```
src/
  app/                    Next.js pages, layout and globals.css (theme)
  components/kryptonite/  the Kryptonite components (one file each)
  components/site/        the showcase UI (gallery, component card)
  components/ui/          shadcn/ui primitives
  registry/               component list, customize controls and source loader
  lib/utils.ts            cn() class helper
```

## License

MIT
