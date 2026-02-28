import { useStore, calcKD } from '../store/useStore'
import { fmt, fmtSR } from '../utils/format'
import styles from './SessionStats.module.css'

export default function SessionStats() {
  const kills = useStore(s => s.kills)
  const deaths = useStore(s => s.deaths)
  const wins = useStore(s => s.wins)
  const losses = useStore(s => s.losses)
  const draws = useStore(s => s.draws)
  const srDelta = useStore(s => s.srDelta)
  const resetSession = useStore(s => s.resetSession)
  const games = useStore(s => s.games)

  const total = wins + losses + draws
  const wr = total > 0 ? Math.round((wins / total) * 100) : 0
  const kd = calcKD(kills, deaths)

  // Best/worst game
  const kdGames = games.filter(g => g.kd !== null)
  const bestKD = kdGames.length > 0 ? Math.max(...kdGames.map(g => g.kd)) : null
  const worstKD = kdGames.length > 0 ? Math.min(...kdGames.map(g => g.kd)) : null

  const srGames = games.filter(g => g.srChange !== null)
  const biggestWin = srGames.length > 0 ? Math.max(...srGames.map(g => g.srChange)) : null
  const biggestLoss = srGames.length > 0 ? Math.min(...srGames.map(g => g.srChange)) : null

  const stats = [
    { label: 'PARTIDAS',   value: total,         color: 'var(--text)' },
    { label: 'WINS',       value: wins,           color: 'var(--green)' },
    { label: 'LOSSES',     value: losses,         color: 'var(--red)' },
    { label: 'WIN RATE',   value: `${wr}%`,       color: wr >= 50 ? 'var(--green)' : 'var(--red)' },
    { label: 'KD SESIÓN',  value: fmt(kd),        color: 'var(--accent2)' },
    { label: 'SR TOTAL',   value: fmtSR(srDelta), color: srDelta >= 0 ? 'var(--green)' : 'var(--red)' },
  ]

  const extras = [
    { label: 'MEJOR KD',   value: bestKD !== null ? fmt(bestKD) : '—',         color: 'var(--green)' },
    { label: 'PEOR KD',    value: worstKD !== null ? fmt(worstKD) : '—',       color: 'var(--red)' },
    { label: 'MAYOR WIN SR', value: biggestWin !== null ? `+${biggestWin}` : '—', color: 'var(--green)' },
    { label: 'MAYOR LOSS SR', value: biggestLoss !== null ? `${biggestLoss}` : '—', color: 'var(--red)' },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>STATS SESIÓN</span>
        <span className={styles.divider} />
      </div>

      <div className={styles.grid}>
        {stats.map(s => (
          <div key={s.label} className={styles.statBox}>
            <span className={styles.val} style={{ color: s.color }}>{s.value}</span>
            <span className={styles.lbl}>{s.label}</span>
          </div>
        ))}
      </div>

      {total > 0 && (
        <>
          <div className={styles.sep} />
          <div className={styles.grid2}>
            {extras.map(s => (
              <div key={s.label} className={styles.extraBox}>
                <span className={styles.extraVal} style={{ color: s.color }}>{s.value}</span>
                <span className={styles.extraLbl}>{s.label}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button className={styles.resetBtn} onClick={resetSession}>
        ⟳ RESET SESIÓN
      </button>
    </div>
  )
}
