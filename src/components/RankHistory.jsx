import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { timeAgo } from '../utils/format'
import styles from './RankHistory.module.css'

export default function RankHistory() {
  const rankHistory = useStore(s => s.rankHistory)

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>HISTORIAL DE RANGOS</span>
        <span className={styles.divider} />
        <span className={styles.count}>{rankHistory.length} cambios</span>
      </div>

      {rankHistory.length === 0 ? (
        <div className={styles.empty}>// SIN CAMBIOS DE RANGO //</div>
      ) : (
        <div className={styles.list}>
          <AnimatePresence initial={false}>
            {[...rankHistory].reverse().map((r, i) => {
              const isUp = r.direction === 'up'
              const color = isUp ? 'var(--green)' : 'var(--red)'
              return (
                <motion.div
                  key={i}
                  className={styles.item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className={styles.arrow} style={{ color }}>
                    {isUp ? '▲' : '▼'}
                  </span>
                  <div className={styles.ranks}>
                    <span className={styles.fromRank}>{r.from}</span>
                    <span className={styles.sep}>→</span>
                    <span className={styles.toRank} style={{ color }}>
                      {r.to}
                    </span>
                  </div>
                  <span className={styles.srVal}>{r.sr.toLocaleString()} SR</span>
                  <span className={styles.time}>{timeAgo(r.timestamp)}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
