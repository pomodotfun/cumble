import type { Metadata } from 'next'
import Link from 'next/link'
import { LatestRoundsCard } from '@/components/latest-rounds-card'

export const metadata: Metadata = {
  title: 'Rounds',
  description: 'Fee rounds settled on chain across every Cumble.',
}

export default function RoundsPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-14 md:px-6">
      <div className="grid gap-12 md:grid-cols-[1fr_420px]">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-6xl">Rounds</h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Creator fees collect in a vault and settle in rounds. Each round pays holders or buys
            back and burns, depending on the rule the Cumble was created with. Every round is
            recorded on chain.
          </p>
          <Link
            href="/docs#rounds"
            className="self-start font-mono text-sm text-primary underline underline-offset-4"
          >
            Follow rewards and rounds
          </Link>
        </div>
        <LatestRoundsCard />
      </div>
    </div>
  )
}
