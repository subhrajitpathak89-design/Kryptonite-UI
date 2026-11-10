// Text content for the home page. The FAQ is also published as FAQPage
// structured data, so keep questions and answers in plain text.

export const FEATURES = [
  {
    title: 'Copy and paste, no package',
    body: 'Every component is a single file you copy into your project. No npm package to install or upgrade, and the code is yours to change.',
  },
  {
    title: 'Accessible by default',
    body: 'Built on Base UI primitives, so keyboard navigation, focus management and screen reader support come built in.',
  },
  {
    title: 'States already handled',
    body: 'Loading, success, error and empty states are part of the components, not something you wire up later.',
  },
  {
    title: 'Made for Next.js and Tailwind CSS',
    body: 'Works with the Next.js App Router, React 19, Tailwind CSS v4 and shadcn/ui. Theme it with CSS variables.',
  },
] as const

export const FAQ = [
  {
    q: 'What is Kryptonite UI?',
    a: 'Kryptonite UI is a free, open-source collection of modern, animated React components. You copy each component into your project instead of installing a package, then style and change it however you like.',
  },
  {
    q: 'Is Kryptonite UI free?',
    a: 'Yes. Kryptonite UI is free and open source under the MIT license, including for commercial projects.',
  },
  {
    q: 'Does it work with Next.js and Tailwind CSS?',
    a: 'Yes. The components are built for React and the Next.js App Router, and styled with Tailwind CSS v4. They also work in any React project that uses Tailwind CSS.',
  },
  {
    q: 'Do I need shadcn/ui to use it?',
    a: 'No, but it fits right in. Kryptonite UI follows the shadcn/ui approach and uses Base UI primitives, so it works alongside an existing shadcn/ui setup or on its own.',
  },
  {
    q: 'How do I add a component to my project?',
    a: 'Open the component in the docs, install the listed npm dependencies, and copy the component file into your project. Each docs page shows a live preview, the full source and usage examples.',
  },
  {
    q: 'Can I request a new component?',
    a: 'Yes. Post a request in the Community section. Others can upvote it, which helps decide what gets built next.',
  },
] as const
