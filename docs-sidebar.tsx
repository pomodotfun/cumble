'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { DOC_SECTIONS } from '@/lib/docs'
import { SITE } from '@/lib/config'

const GROUPS = ['Get started', 'Understand the rules', 'Get help'] as const

export function DocsSidebar() {
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DOC_SECTIONS
    return DOC_SECTIONS.filter((s) =>
      [s.title, s.intro, ...(s.points ?? []), ...(s.steps ?? []).map((st) => st.body)]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [query])

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Docs navigation">
      <label className="flex h-11 items-center gap-3 border border-border bg-card px-3 focus-within:border-primary">
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Find an answer</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find an answer"
          className="min-w-0 flex-1 bg-transparent font-mono text-sm placeholder:text-muted-foreground focus:outline-none"
        />
      </label>

      <nav className="mt-6 flex flex-col gap-6">
        {GROUPS.map((group) => {
          const items = matches.filter((s) => s.group === group)
          if (items.length === 0) return null
          return (
            <div key={group} className="flex flex-col gap-4">
              <p className="font-mono text-sm text-muted-foreground">{group}</p>
              <ul className="flex flex-col gap-4">
                {items.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="font-mono text-sm text-foreground/85 transition-colors hover:text-primary"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        {matches.length === 0 && (
          <p className="font-mono text-sm text-muted-foreground">No answers found.</p>
        )}
      </nav>

      <a
        href={SITE.pumpCreateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-between border-t border-border pt-5 font-mono text-sm text-foreground/85 hover:text-primary"
      >
        Open the builder <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </aside>
  )
}
