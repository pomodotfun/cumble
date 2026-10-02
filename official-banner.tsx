import { ArrowUpRight } from 'lucide-react'
import { MAIN_CA, pumpCoinUrl } from '@/lib/config'
import { CopyCa } from '@/components/copy-ca'

export function OfficialBanner() {
  const live = Boolean(MAIN_CA)

  return (
    <section aria-labelledby="official-title" className="mx-auto max-w-[1240px] px-4 md:px-6">
      <div className="flex min-h-40 flex-col justify-center gap-4 border border-border bg-card px-7 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 id="official-title" className="text-3xl font-semibold tracking-[-0.04em]">
            {live ? 'The official Cumble is live' : 'The official Cumble launches soon'}
          </h2>
          {live ? (
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="break-all">{MAIN_CA}</span>
              <CopyCa ca={MAIN_CA} />
            </div>
          ) : (
            <p className="font-mono text-sm text-muted-foreground">
              Watching the chain. This turns live by itself when the coin lands.
            </p>
          )}
        </div>
        {live ? (
          <a
            href={pumpCoinUrl(MAIN_CA)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-2 self-start bg-primary px-5 font-mono text-sm text-primary-foreground md:self-auto"
          >
            Trade on pump.fun <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="flex items-center gap-2 self-start font-mono text-sm text-primary md:self-auto">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping bg-primary opacity-75" />
              <span className="relative inline-flex size-2 bg-primary" />
            </span>
            Coming soon
          </span>
        )}
      </div>
    </section>
  )
}
