import type { Metadata } from 'next'
import { ArrowRight, Link2 } from 'lucide-react'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DOC_SECTIONS } from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'From your first Cumble to your next coin. Understand the fees, set your terms, and know what happens after you sign.',
}

const QUICK_LINKS = [
  { id: 'create-a-launchpad', title: 'Create a launchpad', sub: 'Choose how your community shares fees.' },
  { id: 'launch-a-coin', title: 'Launch a coin', sub: 'Start with an existing Cumble.' },
]

export default function DocsPage() {
  return (
    <div className="mx-auto grid max-w-[1020px] gap-14 px-4 pb-24 pt-10 md:px-6 lg:grid-cols-[1fr_220px]">
      <article className="min-w-0">
        <h1 className="text-[clamp(3.5rem,9vw,6rem)] font-semibold leading-none tracking-[-0.06em]">
          Cumble docs
        </h1>
        <p className="mt-6 max-w-[700px] text-xl leading-snug text-muted-foreground">
          From your first launchpad to your next coin. Understand the fees, set your terms, and know
          what happens after you sign.
        </p>

        <ul className="mt-8 border-t border-border">
          {QUICK_LINKS.map((l) => (
            <li key={l.id} className="border-b border-border">
              <a href={`#${l.id}`} className="group flex items-center justify-between gap-4 py-5">
                <span className="flex flex-col gap-1">
                  <span className="text-3xl tracking-[-0.03em]">{l.title}</span>
                  <span className="font-mono text-sm text-muted-foreground">{l.sub}</span>
                </span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col">
          {DOC_SECTIONS.map((s) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="scroll-mt-24 border-t border-border py-10"
            >
              <h2
                id={`${s.id}-title`}
                className="group flex items-center gap-3 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.05em]"
              >
                {s.title}
                <a
                  href={`#${s.id}`}
                  className="text-muted-foreground opacity-60 transition-opacity hover:text-primary group-hover:opacity-100"
                >
                  <Link2 className="size-5" aria-hidden="true" />
                  <span className="sr-only">Link to {s.title}</span>
                </a>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">{s.intro}</p>

              {s.note && (
                <div className="mt-5 border border-border bg-card px-5 py-5">
                  <p className="text-foreground">{s.note.title}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{s.note.body}</p>
                </div>
              )}

              {s.steps && (
                <ol className="mt-6 flex flex-col gap-5 pl-7">
                  {s.steps.map((st, i) => (
                    <li key={st.title} className="relative">
                      <span className="absolute -left-7 font-mono text-sm text-primary">{i + 1}</span>
                      <p className="text-lg text-foreground">{st.title}</p>
                      <p className="mt-1 leading-relaxed text-muted-foreground">{st.body}</p>
                    </li>
                  ))}
                </ol>
              )}

              {s.points && (
                <ul className="mt-5 flex flex-col gap-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-foreground/85">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
      <DocsSidebar />
    </div>
  )
}
