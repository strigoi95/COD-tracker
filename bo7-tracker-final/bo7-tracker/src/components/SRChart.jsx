import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import styles from './SRChart.module.css'

export default function SRChart() {
  const games = useStore(s => s.games)
  const sr = useStore(s => s.sr)

  const points = games.filter(g => g.srAfter !== undefined)
  if (points.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.topBar} />
        <div className={styles.label}>
          <span className={styles.mono}>EVOLUCIÓN SR</span>
          <span className={styles.divider} />
        </div>
        <div className={styles.empty}>// SIN DATOS AÚN //</div>
      </div>
    )
  }

  const W = 600
  const H = 120
  const PAD = 16

  const srValues = points.map(g => g.srAfter)
  const minSR = Math.min(...srValues)
  const maxSR = Math.max(...srValues)
  const range = maxSR - minSR || 1

  const toX = (i) => PAD + (i / Math.max(points.length - 1, 1)) * (W - PAD * 2)
  const toY = (v) => PAD + ((maxSR - v) / range) * (H - PAD * 2)

  const pathD = points
    .map((g, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(g.srAfter).toFixed(1)}`)
    .join(' ')

  const areaD = pathD + ` L ${toX(points.length - 1).toFixed(1)} ${H} L ${toX(0).toFixed(1)} ${H} Z`

  // Dots colored by result
  const dotColor = (r) => r === 'win' ? 'var(--green)' : r === 'loss' ? 'var(--red)' : 'var(--muted)'

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>EVOLUCIÓN SR</span>
        <span className={styles.count}>{points.length} partidas</span>
        <span className={styles.divider} />
        <span className={styles.srRange}>{minSR} – {maxSR}</span>
      </div>

      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className={styles.svg}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <line
              key={i}
              x1={PAD} y1={PAD + t * (H - PAD * 2)}
              x2={W - PAD} y2={PAD + t * (H - PAD * 2)}
              stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={areaD}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--blue)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {/* Dots */}
          {points.map((g, i) => (
            <motion.circle
              key={g.id}
              cx={toX(i)}
              cy={toY(g.srAfter)}
              r="4"
              fill={dotColor(g.result)}
              stroke="var(--panel)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.04, duration: 0.2 }}
            >
              <title>{g.result.toUpperCase()} — SR: {g.srAfter} ({g.srChange >= 0 ? '+' : ''}{g.srChange})</title>
            </motion.circle>
          ))}
        </svg>
      </div>

      {/* Mini legend */}
      <div className={styles.legend}>
        <span className={styles.dot} style={{ background: 'var(--green)' }} /> <span>WIN</span>
        <span className={styles.dot} style={{ background: 'var(--red)' }} /> <span>LOSS</span>
        <span className={styles.dot} style={{ background: 'var(--muted)' }} /> <span>DRAW</span>
      </div>
    </div>
  )
}
