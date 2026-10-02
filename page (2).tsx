import Link from 'next/link'
import { Hero } from '@/components/home/hero'
import { RulesSection } from '@/components/home/rules-section'
import { OfficialBanner } from '@/components/home/official-banner'
import { StatsBar } from '@/components/home/stats-bar'
import { ExploreList } from '@/components/explore/explore-list'
import { EXPLORE_CAS } from '@/lib/config'
import { fetchCoins } from '@/lib/pump'

export const revalidate = 60

export default async function HomePage() {
  const coins = await fetchCoins(EXPLORE_CAS)

  return (
    <>
      <Hero />
      <RulesSection />
      <OfficialBanner />
      <section
        aria-labelledby="explore-title"
        className="mx-auto max-w-[1240px] px-4 pb-16 pt-20 md:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
          <div className="flex items-baseline gap-4">
            <h2 id="explore-title" className="text-4xl font-semibold tracking-[-0.05em]">
              Explore
            </h2>
            <span className="font-mono text-sm text-muted-foreground">
              {coins.length} {coins.length === 1 ? 'coin' : 'coins'} on Cumble
            </span>
          </div>
          <Link href="/explore" className="font-mono text-sm text-primary underline underline-offset-4">
            View all
          </Link>
        </div>
        <ExploreList coins={coins} showSearch={false} />
      </section>
      <StatsBar coins={coins} />
    </>
  )
}
