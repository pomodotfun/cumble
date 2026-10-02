'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { CumbleLogo } from '@/components/cumble-logo'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/explore', label: 'Explore' },
  { href: '/rounds', label: 'Rounds' },
  { href: '/docs', label: 'Docs' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (e.key === '/' && !typing) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')?.toString().trim() ?? ''
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
    setMenuOpen(false)
  }

  const handleLaunchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)

    if (pathname === '/') {
      const target = document.getElementById('deploy-section')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.location.hash = 'deploy-section'
      }
    } else {
      router.push('/#deploy-section')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header/95 backdrop-blur">
      <div className="flex h-16 items-center gap-6 px-4 md:px-6">
        <CumbleLogo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'px-2.5 py-3 font-mono text-sm transition-colors',
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <form role="search" onSubmit={onSearch} className="mr-2">
            <label className="flex h-11 w-72 items-center gap-2.5 border border-border px-3 focus-within:border-primary">
              <Search className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Search Cumbles</span>
              <input
                ref={inputRef}
                name="q"
                placeholder="Search Cumbles"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="border border-muted-foreground/60 px-1.5 font-mono text-xs text-muted-foreground">
                /
              </kbd>
            </label>
          </form>

          <ConnectWalletButton />

          {/* Sadece Launch Cumble Butonu (Forma İndirir) */}
          <button
            type="button"
            onClick={handleLaunchClick}
            className="flex h-11 items-center bg-primary px-5 font-mono text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
          >
            Launch Cumble
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="ml-auto flex size-11 items-center justify-center border border-border text-foreground lg:hidden"
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="flex flex-col gap-3 border-t border-border px-4 py-4 lg:hidden">
          <nav aria-label="Mobile" className="flex gap-1 md:hidden">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'px-3 py-2 font-mono text-sm',
                    active ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <form role="search" onSubmit={onSearch}>
            <label className="flex h-11 items-center gap-2.5 border border-border px-3 focus-within:border-primary">
              <Search className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Search Cumbles</span>
              <input
                name="q"
                placeholder="Search Cumbles"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
            </label>
          </form>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <ConnectWalletButton />
            <button
              type="button"
              onClick={handleLaunchClick}
              className="flex h-11 items-center justify-center bg-primary px-4 font-mono text-sm font-semibold text-primary-foreground cursor-pointer"
            >
              Launch Cumble
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
