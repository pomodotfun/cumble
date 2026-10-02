import type { Coin } from '@/lib/pump'
import { formatUsd } from '@/lib/format'

export function StatsBar({ coins }: { coins: Coin[] }) {
  const totalMcap = coins.reduce((sum, c) => sum + c.marketCapUsd, 0)
  const volume = coins.reduce((sum, c) => sum + c.volume1hUsd, 0)
  const graduated = coins.filter((c) => c.complete).length

  const stats = [
    { label: 'Total market cap', value: formatUsd(totalMcap) },
    { label: '1h volume', value: formatUsd(volume) },
    { label: 'Coins listed', value: String(coins.length) },
    { label: 'Graduated', value: String(graduated) },
  ]

  return (
    <section aria-label="Cumble totals" className="mx-auto max-w-[1240px] px-4 pb-10 md:px-6">
      <dl className="grid grid-cols-2 border-y border-border md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-3 px-5 py-7 ${i % 2 === 1 ? 'border-l border-border' : ''} ${i >= 2 ? 'border-t border-border md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
          >
            <dt className="font-mono text-sm text-muted-foreground">{s.label}</dt>
            <dd className="font-mono text-lg text-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
