'use client'

import { useState } from 'react'

type SolanaProvider = {
  isPhantom?: boolean
  connect: () => Promise<{ publicKey: { toString: () => string } }>
  disconnect: () => Promise<void>
}

function getProvider(): SolanaProvider | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    phantom?: { solana?: SolanaProvider }
    solana?: SolanaProvider
    solflare?: SolanaProvider
  }
  return w.phantom?.solana ?? w.solana ?? w.solflare ?? null
}

export function ConnectWalletButton() {
  const [address, setAddress] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onClick() {
    const provider = getProvider()
    if (!provider) {
      window.open('https://phantom.app/', '_blank', 'noopener,noreferrer')
      return
    }
    try {
      setPending(true)
      if (address) {
        await provider.disconnect()
        setAddress(null)
      } else {
        const res = await provider.connect()
        setAddress(res.publicKey.toString())
      }
    } catch {
      // user rejected the request
    } finally {
      setPending(false)
    }
  }

  const label = address
    ? `${address.slice(0, 4)}…${address.slice(-4)}`
    : pending
      ? 'Connecting…'
      : 'Connect wallet'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="flex h-11 items-center justify-center border border-border px-4 font-mono text-sm text-foreground transition-colors hover:border-foreground disabled:opacity-60"
    >
      {label}
    </button>
  )
}
