'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/config'
import { cn } from '@/lib/utils'

export function Hero() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-labelledby="hero-title"
      className={cn('relative isolate overflow-hidden', paused && 'bg-paused')}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src="/earth-bg.png"
          alt=""
          className="earth-drift size-full object-cover object-[70%_center]"
        />
        <div className="star-twinkle absolute inset-0 dot-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,16,14,0.6)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1240px] flex-col px-4 pb-12 pt-16 md:px-6">
        <div className="mx-auto w-full max-w-[360px] border border-border/80 bg-header/70 p-[3px] backdrop-blur-sm">
          <div className="flex items-center justify-between px-1 pb-1 font-mono text-xs text-foreground/80">
            <span>Launchpad builder</span>
            <span>pump.fun</span>
          </div>
          <div className="flex flex-col items-center gap-5 border border-border/80 bg-card/80 px-4 py-6">
            <p className="font-mono text-sm text-foreground/90">Your community. Your fee split.</p>
            <a
              href={SITE.pumpCreateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 bg-primary px-5 font-mono text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Create a Cumble <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <h1
          id="hero-title"
          className="mt-auto pt-20 text-center text-[clamp(3.5rem,11vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-foreground text-balance"
        >
          Launchpads
          <br />
          on your terms.
        </h1>

        <div className="mt-16 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-8">
            <p className="max-w-sm text-lg leading-snug text-foreground">
              Choose how creator fees are shared.
              <br />
              One rule for every coin on your Cumble.
            </p>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="self-start font-mono text-xs text-foreground/80 underline underline-offset-4 hover:text-foreground"
            >
              {paused ? 'Play background' : 'Pause background'}
            </button>
          </div>
          <Link
            href="/explore"
            className="group flex items-center gap-4 self-start border-b-2 border-primary pb-1 text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold tracking-[-0.05em] text-primary md:self-auto"
          >
            Explore Cumbles
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
