import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import styles from './StreakBanner.module.css'

export default function StreakBanner() {
  const games = useStore(s => s.games)

  if (!games.length) return null

  // Compute streak
  const last = games[games.length - 1]
  if (last.result === 'draw') return null

  const type = last.result
  let count = 0
  for (let i = games.length - 1; i >= 0; i--) {
    if (games[i].result === type) count++
    else break
  }

  if (count < 2) return null

  const isWin = type === 'win'
  const emoji = isWin ? '🔥' : '💀'
  const label = isWin ? `WIN STREAK` : `LOSS STREAK`
  const color = isWin ? 'var(--green)' : 'var(--red)'
  const bg    = isWin ? 'rgba(0,230,118,0.08)' : 'rgba(255,23,68,0.08)'
  const border= isWin ? 'rgba(0,230,118,0.25)' : 'rgba(255,23,68,0.25)'

  const message = isWin
    ? count >= 5 ? '¡IMPARABLE!' : count >= 3 ? '¡EN RACHA!' : '¡BUEN RITMO!'
    : count >= 5 ? 'TÓMATE UN DESCANSO' : count >= 3 ? 'CUIDADO...' : 'MALA RACHA'

  return (
    <AnimatePresence>
      <motion.div
        key={`${type}-${count}`}
        className={styles.banner}
        style={{ background: bg, borderColor: border }}
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <motion.span
          className={styles.emoji}
          animate={{ rotate: isWin ? [0, -10, 10, -5, 0] : [0, 5, -5, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.span>

        <div className={styles.content}>
          <span className={styles.label} style={{ color }}>{label}</span>
          <span className={styles.message}>{message}</span>
        </div>

        <motion.span
          className={styles.count}
          style={{ color }}
          key={count}
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350 }}
        >
          {count}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  )
}
