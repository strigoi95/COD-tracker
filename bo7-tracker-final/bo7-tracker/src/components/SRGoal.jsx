import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import styles from './SRGoal.module.css'

export default function SRGoal() {
  const sr = useStore(s => s.sr)
  const srGoal = useStore(s => s.srGoal)
  const setSRGoal = useStore(s => s.setSRGoal)
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState('')

  const hasGoal = srGoal !== null && srGoal > 0

  const diff = hasGoal ? srGoal - sr : 0
  const progress = hasGoal ? Math.min(100, Math.max(0, (sr / srGoal) * 100)) : 0
  const reached = hasGoal && sr >= srGoal

  function saveGoal() {
    const v = parseInt(input)
    if (!isNaN(v) && v > 0) setSRGoal(v)
    setEditing(false)
    setInput('')
  }

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.header}>
        <div className={styles.label}>
          <span className={styles.mono}>META DIARIA</span>
          <span className={styles.divider} />
        </div>
        <button
          className={styles.editBtn}
          onClick={() => { setEditing(e => !e); setInput(srGoal?.toString() || '') }}
        >
          {editing ? 'CANCELAR' : hasGoal ? 'EDITAR' : 'FIJAR META'}
        </button>
      </div>

      {editing && (
        <div className={styles.editRow}>
          <input
            className={styles.goalInput}
            type="number"
            placeholder="SR objetivo (ej: 5000)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveGoal()}
            autoFocus
          />
          <button className={styles.saveBtn} onClick={saveGoal}>OK</button>
          {hasGoal && (
            <button className={styles.clearBtn} onClick={() => { setSRGoal(null); setEditing(false) }}>
              ×
            </button>
          )}
        </div>
      )}

      {!editing && !hasGoal && (
        <p className={styles.empty}>Fija un SR objetivo para el día</p>
      )}

      {!editing && hasGoal && (
        <div className={styles.body}>
          {reached ? (
            <motion.div
              className={styles.reached}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className={styles.checkmark}>✓</span>
              <div>
                <span className={styles.reachedTitle}>¡META ALCANZADA!</span>
                <span className={styles.reachedSub}>{sr} / {srGoal} SR</span>
              </div>
            </motion.div>
          ) : (
            <>
              <div className={styles.nums}>
                <div className={styles.numBlock}>
                  <span className={styles.numVal}>{sr.toLocaleString()}</span>
                  <span className={styles.numLbl}>ACTUAL</span>
                </div>
                <div className={styles.arrow}>→</div>
                <div className={styles.numBlock}>
                  <span className={styles.numVal} style={{ color: 'var(--accent2)' }}>
                    {srGoal.toLocaleString()}
                  </span>
                  <span className={styles.numLbl}>OBJETIVO</span>
                </div>
                <div className={styles.numBlock}>
                  <span className={styles.numVal} style={{ color: diff > 0 ? 'var(--red)' : 'var(--green)' }}>
                    {diff > 0 ? `-${diff}` : `+${Math.abs(diff)}`}
                  </span>
                  <span className={styles.numLbl}>FALTAN</span>
                </div>
              </div>

              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
                <span className={styles.progressLabel}>{progress.toFixed(0)}%</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
