import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { fmt, fmtSR, kdColor, srColor, resultIcon, timeAgo } from '../utils/format'
import styles from './GameHistory.module.css'

export default function GameHistory() {
  const games = useStore(s => s.games)
  const deleteGame = useStore(s => s.deleteGame)

  const reversed = [...games].reverse()

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>HISTORIAL</span>
        <span className={styles.count}>{games.length} partidas</span>
        <span className={styles.divider} />
      </div>

      <div className={styles.list}>
        <AnimatePresence initial={false}>
          {reversed.length === 0 && (
            <div className={styles.empty}>
              <span>// SIN PARTIDAS AÚN //</span>
            </div>
          )}
          {reversed.map((g, i) => {
            const num = games.length - i
            const icon = resultIcon(g.result)
            const srC = srColor(g.srChange)
            return (
              <motion.div
                key={g.id}
                className={styles.item}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0, padding: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <span className={styles.num} style={{ color: 'var(--muted)' }}>#{num}</span>

                <span
                  className={styles.icon}
                  style={{ color: g.result === 'win' ? 'var(--green)' : g.result === 'loss' ? 'var(--red)' : 'var(--muted)' }}
                >
                  {icon}
                </span>

                {g.kd !== null ? (
                  <span className={styles.kd} style={{ color: kdColor(g.kd) }}>
                    {fmt(g.kd)} KD
                  </span>
                ) : (
                  <span className={styles.kd} style={{ color: 'var(--muted)' }}>—</span>
                )}

                {g.kd !== null && (
                  <span className={styles.kills}>
                    {g.kills}K / {g.deaths}D
                  </span>
                )}

                <span className={styles.srChange} style={{ color: srC }}>
                  {fmtSR(g.srChange)} SR
                </span>

                <span className={styles.time}>{timeAgo(g.timestamp)}</span>

                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteGame(g.id)}
                  title="Eliminar"
                >
                  ×
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
