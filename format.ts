export function formatUsd(value: number) {
  if (!value) return '$0'
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}b`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`
  return `$${value.toFixed(0)}`
}
