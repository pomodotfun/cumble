import Link from 'next/link'
import { cn } from '@/lib/utils'

export function CumbleMark({ className }: { className?: string }) {
  return (
    <img
      src="/cumble-logo.png"
      alt=""
      aria-hidden="true"
      className={cn('size-8 shrink-0 object-cover', className)}
    />
  )
}

export function CumbleLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 text-foreground', className)}
      aria-label="Cumble home"
    >
      <CumbleMark />
      <span className="text-[26px] font-semibold leading-none tracking-[-0.06em]">
        Cumble<span className="text-primary">.</span>
      </span>
    </Link>
  )
}
