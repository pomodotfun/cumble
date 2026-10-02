import Link from 'next/link'
import { MAIN_CA, SITE, pumpCoinUrl } from '@/lib/config'
import { CopyCa } from '@/components/copy-ca'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Built on pump.fun
          </a>
          <div className="flex items-center gap-8">
            <Link
              href="/docs"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </Link>
            <a
              href={SITE.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <XIcon className="size-4" />
              <span className="sr-only">Cumble on X</span>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-muted-foreground">CA</span>
          {MAIN_CA ? (
            <>
              <a
                href={pumpCoinUrl(MAIN_CA)}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-foreground/80 hover:text-primary"
              >
                {MAIN_CA}
              </a>
              <CopyCa ca={MAIN_CA} />
            </>
          ) : (
            <span className="text-primary">Coming soon</span>
          )}
        </div>
      </div>
    </footer>
  )
}
