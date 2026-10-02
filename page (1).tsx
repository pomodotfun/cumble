import type { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { ExploreList } from '@/components/explore/explore-list'
import { EXPLORE_CAS, SITE } from '@/lib/config'
import { fetchCoins } from '@/lib/pump'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Every coin on Cumble, pulled live from pump.fun.',
}

export const revalidate = 60

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const [{ q }, coins] = await Promise.all([searchParams, fetchCoins(EXPLORE_CAS)])

  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-14 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
        <div className="flex items-baseline gap-4">
          <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-6xl">Explore</h1>
          <span className="font-mono text-sm text-muted-foreground">
            {coins.length} {coins.length === 1 ? 'coin' : 'coins'} on Cumble
          </span>
        </div>
        <a
          href={SITE.pumpCreateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-sm text-primary"
        >
          <span className="underline underline-offset-4">Create a Cumble</span>
          <Plus className="size-4" aria-hidden="true" />
        </a>
      </div>
      <ExploreList key={q ?? ''} coins={coins} initialQuery={q ?? ''} />
    </div>
  )
}
