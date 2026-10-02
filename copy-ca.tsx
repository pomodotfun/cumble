'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CopyCa({ ca }: { ca: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(ca)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="text-muted-foreground transition-colors hover:text-primary"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span className="sr-only">{copied ? 'Copied' : 'Copy contract address'}</span>
    </button>
  )
}
