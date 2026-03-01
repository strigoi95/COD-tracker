import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { fmt, timeAgo } from '../utils/format'
import styles from './PublicHistory.module.css'

function kdColor(kd) {
  if (kd >= 2) return 'var(--green)'
  if (kd >= 1) return 'var(--accent2)'
  return 'var(--red)'
}

export default function PublicHistory() {
  const games = useStore(s => s.pub_games)
  const deletePublicGame = useStore(s => s.deletePublicGame)

  const reversed = [...games].reverse()

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>HISTORIAL PÚBLICAS</span>
        <span className={styles.count}>{games.length} partidas</span>
        <span className={styles.divider} />
      </div>

      <div className={styles.list}>
        <AnimatePresence initial={false}>
          {reversed.length === 0 && (
            <div className={styles.empty}>// SIN PARTIDAS AÚN //</div>
          )}
          {reversed.map((g, i) => {
            const num = games.length - i
            const isWin = g.result === 'win'
            return (
              <motion.div
                key={g.id}
                className={styles.item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <span className={styles.num}>#{num}</span>
                <span className={styles.result} style={{ color: isWin ? 'var(--green)' : 'var(--red)' }}>
                  {isWin ? '▲' : '▼'}
                </span>
                <span className={styles.mode}>{g.mode}</span>
                <span className={styles.kd} style={{ color: kdColor(g.kd) }}>
                  {fmt(g.kd)} KD
                </span>
                <span className={styles.kda} style={{ color: 'var(--blue)' }}>
                  {fmt(g.kda)} KDA
                </span>
                <span className={styles.stats}>
                  {g.kills}K/{g.deaths}D/{g.assists}A
                </span>
                {g.killStreak > 0 && (
                  <span className={styles.streak}>🔥{g.killStreak}</span>
                )}
                <span className={styles.time}>{timeAgo(g.timestamp)}</span>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deletePublicGame(g.id)}
                >×</button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
