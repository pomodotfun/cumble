import 'server-only'

export type Coin = {
  mint: string
  name: string
  symbol: string
  image: string | null
  marketCapUsd: number
  athMarketCapUsd: number
  volume1hUsd: number
  complete: boolean
  createdAt: number
}

const PUMP_API = 'https://frontend-api-v3.pump.fun/coins-v2'

const SOLANA_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

export function isValidCa(ca: string) {
  return SOLANA_ADDRESS.test(ca.trim())
}

function normalizeImage(uri: unknown) {
  if (typeof uri !== 'string' || !uri) return null
  // ipfs.io rate-limits hotlinked images; pump.fun's own gateway serves them reliably
  const cid = uri.match(/\/ipfs\/([^/?#]+)/)?.[1] ?? (uri.startsWith('ipfs://') ? uri.slice(7) : null)
  return cid ? `https://pump.mypinata.cloud/ipfs/${cid}` : uri
}

function toNumber(value: unknown) {
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : 0
}

export async function fetchCoin(ca: string): Promise<Coin | null> {
  const mint = ca.trim()
  if (!isValidCa(mint)) return null

  try {
    const res = await fetch(`${PUMP_API}/${mint}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0 Cumble' },
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.mint) return null

    return {
      mint: data.mint,
      name: String(data.name ?? 'Unknown'),
      symbol: String(data.symbol ?? ''),
      image: normalizeImage(data.image_uri),
      marketCapUsd: toNumber(data.usd_market_cap ?? data.market_cap_usd),
      athMarketCapUsd: toNumber(data.ath_market_cap),
      volume1hUsd: toNumber(data.volume_1h_usd),
      complete: Boolean(data.complete),
      createdAt: toNumber(data.created_timestamp),
    }
  } catch {
    return null
  }
}

export async function fetchCoins(cas: string[]) {
  const unique = Array.from(new Set(cas.map((c) => c.trim()).filter(Boolean)))
  const results = await Promise.all(unique.map(fetchCoin))
  return results.filter((c): c is Coin => c !== null)
}
