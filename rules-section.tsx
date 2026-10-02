import Link from 'next/link'
import { LatestRoundsCard } from '@/components/latest-rounds-card'

export function RulesSection() {
  return (
    <section
      id="latest-rounds"
      aria-labelledby="rules-title"
      className="mx-auto grid max-w-[1240px] scroll-mt-20 gap-12 px-4 py-24 md:grid-cols-[1fr_420px] md:items-center md:px-6"
    >
      <div className="flex flex-col gap-6">
        <h2
          id="rules-title"
          className="text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-balance"
        >
          Your rules.
          <br />
          Every trade.
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Create a Cumble on pump.fun, choose what creator fees do, and every coin launched on it
          follows that rule, frozen on chain.
        </p>
        <Link
          href="/docs"
          className="self-start font-mono text-sm text-primary underline underline-offset-4"
        >
          How it works
        </Link>
      </div>
      <LatestRoundsCard />
    </section>
  )
}
