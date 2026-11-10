// Community threads are powered by Giscus (https://giscus.app), which stores every
// post and reply as a GitHub Discussion in the repo. People sign in with GitHub to post.
//
// Setup (one time):
//   1. On GitHub, open the repo > Settings > General > Features, and tick "Discussions".
//   2. Install the Giscus app on the repo: https://github.com/apps/giscus
//   3. Open https://giscus.app, enter the repo, pick the "General" category, and copy the
//      data-category-id value into CATEGORY_ID below.

export const GISCUS = {
  repo: 'subhrajitpathak89-design/Kryptonite-UI' as const,
  repoId: 'R_kgDOVpMWUw',
  category: 'General',
  /** From giscus.app (step 3). Threads stay hidden with a setup note until this is set. */
  categoryId: '',
}

export const isCommunityReady = () => GISCUS.categoryId !== ''

/** The threads on the Community page. Each one is a single GitHub Discussion. */
export const COMMUNITY_THREADS = [
  {
    id: 'feedback',
    term: 'Kryptonite UI · Feedback',
    title: 'Feedback',
    description: 'Tell us what works, what doesn’t, and what you’d change. Every post can be replied to.',
  },
  {
    id: 'requests',
    term: 'Kryptonite UI · Component requests',
    title: 'Component requests',
    description: 'Ask for a component you need. Upvote requests you want too, so we know what to build next.',
  },
  {
    id: 'showcase',
    term: 'Kryptonite UI · Show and tell',
    title: 'Show and tell',
    description: 'Built something with Kryptonite UI? Post a link or a screenshot.',
  },
] as const
