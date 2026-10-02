'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import type { Coin } from '@/lib/pump'
import { pumpCoinUrl } from '@/lib/config'
import { formatUsd } from '@/lib/format'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'bonding' | 'graduated'
type Sort = 'marketCap' | 'newest' | 'volume'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bonding', label: 'Bonding' },
  { value: 'graduated', label: 'Graduated' },
]

function CoinImage({ coin }: { coin: Coin }) {
  const [failed, setFailed] = useState(false)
  const src = !coin.image || failed ? '/cumble-logo.png' : coin.image
  return (
    <img
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0 && !failed) setFailed(true)
      }}
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-16 shrink-0 border border-border bg-header object-cover md:size-20"
    />
  )
}

export function ExploreList({
  coins,
  initialQuery = '',
  showSearch = true,
}: {
  coins: Coin[]
  initialQuery?: string
  showSearch?: boolean
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('marketCap')
  const [query, setQuery] = useState(initialQuery)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return coins
      .filter((c) => (filter === 'all' ? true : filter === 'graduated' ? c.complete : !c.complete))
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q) ||
          c.mint.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        if (sort === 'newest') return b.createdAt - a.createdAt
        if (sort === 'volume') return b.volume1hUsd - a.volume1hUsd
        return b.marketCapUsd - a.marketCapUsd
      })
  }, [coins, filter, sort, query])

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter coins" className="flex self-start border border-border">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                'flex h-11 items-center gap-1.5 px-3 font-mono text-sm transition-colors',
                filter === f.value
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-foreground/80 hover:text-foreground',
              )}
            >
              {f.value !== 'all' && (
                <span
                  aria-hidden="true"
                  className={cn('size-1.5', f.value === 'graduated' ? 'bg-primary' : 'bg-foreground/70')}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          {showSearch && (
            <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 border border-border px-3 focus-within:border-primary sm:w-60 sm:flex-none">
              <Search className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Search by name, symbol or address</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, symbol or address"
                className="min-w-0 flex-1 bg-transparent font-mono text-sm placeholder:text-muted-foreground focus:outline-none"
              />
            </label>
          )}
          <label className="sr-only" htmlFor="explore-sort">
            Sort by
          </label>
          <select
            id="explore-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 border border-border bg-background px-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="marketCap">Market cap</option>
            <option value="volume">1h volume</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <ul className="border-t border-border">
        {visible.length === 0 && (
          <li className="border-b border-border py-16 text-center font-mono text-sm text-muted-foreground">
            {coins.length === 0 ? 'No coins listed yet.' : 'No coins match your search.'}
          </li>
        )}
        {visible.map((coin) => (
          <li key={coin.mint} className="border-b border-border">
            <a
              href={pumpCoinUrl(coin.mint)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-6 md:gap-6"
            >
              <CoinImage coin={coin} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="truncate text-2xl tracking-[-0.03em] text-foreground md:text-3xl">
                  {coin.name}
                </h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm text-muted-foreground">
                  <span className="text-foreground/80">${coin.symbol}</span>
                  <span className="text-xs">{coin.complete ? 'Graduated' : 'Bonding curve'}</span>
                  <span className="hidden text-xs lg:inline">
                    {coin.mint.slice(0, 6)}…{coin.mint.slice(-6)}
                  </span>
                </div>
              </div>
              <dl className="hidden gap-10 font-mono text-sm sm:flex">
                <div className="flex flex-col gap-2">
                  <dt className="text-muted-foreground">Market cap</dt>
                  <dd className="text-foreground">{formatUsd(coin.marketCapUsd)}</dd>
                </div>
                <div className="flex flex-col gap-2">
                  <dt className="text-muted-foreground">1h volume</dt>
                  <dd className="text-foreground">{formatUsd(coin.volume1hUsd)}</dd>
                </div>
              </dl>
              <div className="flex flex-col items-end gap-1 font-mono text-sm sm:hidden">
                <span className="text-foreground">{formatUsd(coin.marketCapUsd)}</span>
                <span className="text-xs text-muted-foreground">mcap</span>
              </div>
              <ArrowRight
                className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="sr-only">Open {coin.name} on pump.fun</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
