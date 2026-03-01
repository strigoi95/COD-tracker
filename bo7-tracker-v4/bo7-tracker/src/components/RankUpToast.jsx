import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { getRankIcon } from '../utils/rankIcons'
import styles from './RankUpToast.module.css'

export default function RankUpToast() {
  const rankHistory = useStore(s => s.rankHistory)
  const [toast, setToast] = useState(null)
  const prevLenRef = useRef(rankHistory.length)

  useEffect(() => {
    if (rankHistory.length > prevLenRef.current) {
      const latest = rankHistory[rankHistory.length - 1]
      setToast(latest)
      prevLenRef.current = rankHistory.length
      const t = setTimeout(() => setToast(null), 5000)
      return () => clearTimeout(t)
    }
    prevLenRef.current = rankHistory.length
  }, [rankHistory.length])

  if (!toast) return null

  const isUp = toast.direction === 'up'
  const color = isUp ? 'var(--green)' : 'var(--red)'
  const icon = getRankIcon(toast.to)

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={styles.toast}
          style={{ borderColor: isUp ? 'rgba(0,230,118,0.4)' : 'rgba(255,23,68,0.4)', background: isUp ? 'rgba(0,230,118,0.06)' : 'rgba(255,23,68,0.06)' }}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <div className={styles.glowRing} style={{ borderColor: `${isUp ? '#00e676' : '#ff1744'}44` }} />

          <motion.div
            className={styles.iconWrap}
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            dangerouslySetInnerHTML={{ __html: icon }}
            style={{ filter: `drop-shadow(0 0 12px ${isUp ? '#00e676' : '#ff1744'}88)` }}
          />

          <div className={styles.content}>
            <span className={styles.topLine} style={{ color }}>
              {isUp ? '▲ RANK UP!' : '▼ RANK DOWN'}
            </span>
            <div className={styles.rankLine}>
              <span className={styles.fromRank}>{toast.from}</span>
              <motion.span
                className={styles.arrow}
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: 3, duration: 0.4 }}
              >→</motion.span>
              <span className={styles.toRank} style={{ color }}>{toast.to}</span>
            </div>
            <span className={styles.srLine}>{toast.sr.toLocaleString()} SR</span>
          </div>

          <button className={styles.close} onClick={() => setToast(null)}>×</button>

          {/* Progress bar countdown */}
          <motion.div
            className={styles.countdown}
            style={{ background: color }}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
