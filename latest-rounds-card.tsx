import Link from 'next/link'

export function LatestRoundsCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="border border-border p-[3px]">
        <div className="flex items-center justify-between px-1.5 pb-1">
          <h2 className="font-mono text-sm text-foreground">Latest rounds</h2>
          <span className="font-mono text-[11px] text-muted-foreground">On chain</span>
        </div>
        <div className="flex min-h-40 flex-col justify-center gap-6 border border-border bg-card px-5 py-8">
          <p className="text-sm text-foreground/85">No completed rounds yet.</p>
          <Link
            href="/docs#rounds"
            className="self-start font-mono text-sm text-primary underline underline-offset-4"
          >
            How rounds work
          </Link>
        </div>
      </div>
    </div>
  )
}
