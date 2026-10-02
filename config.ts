/**
 * Cumble site configuration.
 *
 * Values are read from environment variables so they can be changed from the
 * Vercel dashboard without touching code. NEXT_PUBLIC_* values are inlined at
 * build time, so a redeploy is required after changing them.
 *
 * NEXT_PUBLIC_MAIN_CA: the official Cumble coin contract address.
 *   Empty or unset shows "Coming soon" everywhere.
 *
 * NEXT_PUBLIC_EXPLORE_CAS: comma-separated pump.fun contract addresses listed
 *   on the Explore page. Name, image, symbol and market cap are pulled from
 *   pump.fun automatically.
 */
const DEFAULT_MAIN_CA = ''

const DEFAULT_EXPLORE_CAS = ['mNg27UTWqp7UyL8npd1wNCZNf7C6G24sxnM5FM5qpad']

function parseCaList(value: string | undefined): string[] {
  if (!value) return []
  return Array.from(
    new Set(
      value
        .split(/[\s,]+/)
        .map((ca) => ca.trim())
        .filter(Boolean),
    ),
  )
}

export const MAIN_CA = process.env.NEXT_PUBLIC_MAIN_CA?.trim() || DEFAULT_MAIN_CA

const envExploreCas = parseCaList(process.env.NEXT_PUBLIC_EXPLORE_CAS)

export const EXPLORE_CAS: string[] =
  envExploreCas.length > 0 ? envExploreCas : DEFAULT_EXPLORE_CAS

export const SITE = {
  name: 'Cumble',
  url: 'https://cumble.fun',
  xUrl: 'https://x.com/Cumblefun',
  xHandle: '@Cumblefun',
  pumpCreateUrl: 'https://pump.fun/create',
}

export function pumpCoinUrl(ca: string) {
  return `https://pump.fun/coin/${ca}`
}
