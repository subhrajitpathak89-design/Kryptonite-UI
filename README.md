# Kryptonite UI

Modern, animated React components built on **shadcn/ui**, **Base UI** and **Tailwind CSS v4**. Copy them into your project and make them yours. There's no package to install.

The library includes:

- **66 components** from [HextaUI](https://hextaui.com) (MIT): buttons, forms, overlays, data display, navigation, chat and more, with loading, error and empty states handled.
- **8 Kryptonite components**: Shimmer Button, Glow Border Button, Magnetic Button, Spotlight Card, Tilt Card, Gradient Text, Aurora Background and Marquee. Colors, speed and other options are all props.
- **9 hooks** and a few utilities (motion, hotkeys, shimmer, hairline, scroll fade).

The site is a docs site, built with **Next.js** (App Router). It uses a charcoal-black theme, with **Calendas Plus** for headings and **Poppins** for body text.

## Run the site locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Using a component

1. Open the component's docs page, for example `/docs/button`.
2. Follow **Installation**: install the npm dependencies, copy any components it builds on, then copy its file.
3. Add the `cn` helper (`src/lib/utils.ts`) and the theme tokens from `src/app/globals.css` if your project doesn't have them yet.

## Heading font

Calendas Plus is a free font from Atipo Foundry and isn't on Google Fonts. Download it from Atipo Foundry and put the files in `public/fonts/` with these names:

- `CalendasPlus-Regular.woff2` (or `.otf`)
- `CalendasPlus-Italic.woff2` (or `.otf`)
- `CalendasPlus-Bold.woff2` (or `.otf`)

Until those files are added, headings use Instrument Serif instead.

## How the docs are built

`scripts/gen-docs.mjs` builds the docs catalog. It runs automatically before `dev` and `build`, and you can run it yourself with `npm run docs:gen`. It reads:

- `scripts/hexta-registry.json`: titles, descriptions, categories and dependencies of the HextaUI components.
- `scripts/kryptonite.json`: the same for Kryptonite's own components.
- `src/components/examples/<slug>/*.tsx`: one live example per file. `demo.tsx` is shown at the top of the page, and the rest appear under Examples.

It writes `src/docs/generated/` (don't edit it by hand). Every docs page comes from the single template in `src/app/docs/[slug]/page.tsx`.

## Adding a Kryptonite component

1. Create `src/components/kryptonite/MyComponent.tsx` and export it from `src/components/kryptonite/index.ts`. Give every option a prop with a sensible default.
2. Add an entry to `scripts/kryptonite.json` (name, title, file, description).
3. Add examples in `src/components/examples/<name>/`, starting with `demo.tsx`. Each file exports one component.
4. Run `npm run docs:gen`.

## Project structure

```
scripts/                  docs generator and component metadata
src/
  app/                    landing page, docs pages, layout and globals.css (theme)
  components/ui/          components (from HextaUI)
  components/kryptonite/  Kryptonite's own components
  components/examples/    live examples shown in the docs
  components/docs/        docs site UI (sidebar, code blocks, example frames)
  components/landing/     landing page background (React Bits; site-only)
  docs/                   catalog helpers and generated files
  hooks/                  hooks (from HextaUI)
  lib/                    cn(), motion and hotkey helpers
```

## Credits

Components, hooks, examples and theme tokens come from [HextaUI](https://github.com/preetsuthar17/HextaUI) by Preet Suthar (MIT). The landing page background is Light Rays from [React Bits](https://reactbits.dev) by David Haz (MIT + Commons Clause). It's used only on this site and isn't part of the library. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

MIT, for Kryptonite's own code. Third-party code keeps its own license; see THIRD_PARTY_NOTICES.md.
