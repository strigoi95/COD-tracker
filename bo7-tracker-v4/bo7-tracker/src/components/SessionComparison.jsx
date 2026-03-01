import { motion, AnimatePresence } from 'framer-motion'
import { useStore, getRank } from '../store/useStore'
import { getRankIcon } from '../utils/rankIcons'
import { fmtSR } from '../utils/format'
import styles from './SessionComparison.module.css'

function calcKD(kills, deaths) {
  if (deaths === 0) return kills === 0 ? 0 : kills
  return (kills / deaths).toFixed(2)
}

export default function SessionComparison() {
  const sessions = useStore(s => s.sessions)
  const deleteSession = useStore(s => s.deleteSession)
  const saveAndResetSession = useStore(s => s.saveAndResetSession)
  const games = useStore(s => s.games)

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.header}>
        <div className={styles.label}>
          <span className={styles.mono}>HISTORIAL DE SESIONES</span>
          <span className={styles.divider} />
          <span className={styles.count}>{sessions.length} sesiones</span>
        </div>
        {games.length > 0 && (
          <button className={styles.saveBtn} onClick={saveAndResetSession} title="Guardar sesión actual y resetear">
            💾 GUARDAR SESIÓN
          </button>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className={styles.empty}>
          <span>// SIN SESIONES GUARDADAS //</span>
          <p>Pulsa "Guardar Sesión" para almacenar la sesión actual y comparar</p>
        </div>
      ) : (
        <div className={styles.list}>
          <AnimatePresence initial={false}>
            {[...sessions].reverse().map((s, i) => {
              const srColor = s.srDelta >= 0 ? 'var(--green)' : 'var(--red)'
              const wr = s.gamesCount > 0 ? Math.round((s.wins / s.gamesCount) * 100) : 0
              const rankEnd = getRank(s.srEnd)
              const icon = getRankIcon(rankEnd.name)

              return (
                <motion.div
                  key={s.id}
                  className={styles.row}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ delay: i * 0.04 }}
                  layout
                >
                  {/* Rank icon */}
                  <div
                    className={styles.rankIcon}
                    dangerouslySetInnerHTML={{ __html: icon }}
                    style={{ filter: `drop-shadow(0 0 6px ${rankEnd.color}55)` }}
                  />

                  {/* Date + rank */}
                  <div className={styles.meta}>
                    <span className={styles.date}>{s.date}</span>
                    <span className={styles.rankName} style={{ color: rankEnd.color }}>
                      {s.rankEnd}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.statVal} style={{ color: srColor }}>
                        {fmtSR(s.srDelta)}
                      </span>
                      <span className={styles.statLbl}>SR</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statVal}>{s.gamesCount}</span>
                      <span className={styles.statLbl}>PARTIDAS</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statVal} style={{ color: wr >= 50 ? 'var(--green)' : 'var(--red)' }}>
                        {wr}%
                      </span>
                      <span className={styles.statLbl}>WIN RATE</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statVal}>{calcKD(s.kills, s.deaths)}</span>
                      <span className={styles.statLbl}>KD</span>
                    </div>
                  </div>

                  {/* W/L */}
                  <div className={styles.wl}>
                    <span className={styles.wins}>{s.wins}W</span>
                    <span className={styles.sep}>/</span>
                    <span className={styles.losses}>{s.losses}L</span>
                  </div>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteSession(s.id)}
                    title="Eliminar sesión"
                  >×</button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
