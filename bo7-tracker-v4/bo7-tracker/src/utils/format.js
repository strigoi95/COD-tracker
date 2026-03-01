export function fmt(n, decimals = 2) {
  return Number(n).toFixed(decimals)
}

export function fmtSR(n) {
  return n >= 0 ? `+${n}` : `${n}`
}

export function kdColor(kd) {
  if (kd === null) return 'var(--muted)'
  if (kd >= 2.0) return '#cc55ff'
  if (kd >= 1.5) return 'var(--green)'
  if (kd >= 1.0) return 'var(--accent2)'
  if (kd >= 0.75) return 'var(--text)'
  return 'var(--red)'
}

export function srColor(change) {
  if (change > 0) return 'var(--green)'
  if (change < 0) return 'var(--red)'
  return 'var(--muted)'
}

export function resultIcon(result) {
  if (result === 'win') return '▲'
  if (result === 'loss') return '▼'
  return '—'
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'ahora'
  if (m < 60) return `hace ${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `hace ${h}h`
  return `hace ${Math.floor(h / 24)}d`
}
