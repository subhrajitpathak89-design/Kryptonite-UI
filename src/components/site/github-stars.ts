import { cacheLife } from 'next/cache'

/** Star count for the repo, refreshed at most once an hour. Returns null if GitHub can't be reached. */
export async function getGithubStars(repo: string): Promise<number | null> {
  'use cache'
  cacheLife('hours')
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: 'application/vnd.github+json' } })
    if (!res.ok) return null
    const data = (await res.json()) as { stargazers_count?: number }
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null
  } catch {
    return null
  }
}

export function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n)
}
