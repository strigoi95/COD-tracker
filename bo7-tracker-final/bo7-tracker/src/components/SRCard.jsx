import { motion, AnimatePresence } from 'framer-motion'
import { useStore, getRank, getTier } from '../store/useStore'
import { getRankIcon } from '../utils/rankIcons'
import { fmtSR } from '../utils/format'
import styles from './SRCard.module.css'

export default function SRCard() {
  const sr = useStore(s => s.sr)
  const lastSrChange = useStore(s => s.lastSrChange)
  const rank = getRank(sr)
  const tier = getTier(rank, sr)

  const progress = rank.max === Infinity
    ? 100
    : Math.min(100, ((sr - rank.min) / (rank.max - rank.min)) * 100)

  const srToNext = rank.max === Infinity ? null : rank.max - sr + 1
  const iconSvg = getRankIcon(rank.name)

  return (
    <div className={styles.card}>
      <div className={styles.topBar} style={{ background: `linear-gradient(90deg, ${rank.color} 0%, transparent 70%)` }} />
      <div className={styles.label}>
        <span className={styles.mono}>RANKED SR</span>
        <span className={styles.divider} />
      </div>

      <div className={styles.body}>
        {/* Rank icon */}
        <motion.div
          key={rank.name}
          className={styles.iconWrap}
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          style={{ filter: `drop-shadow(0 0 14px ${rank.color}66)` }}
          dangerouslySetInnerHTML={{ __html: iconSvg }}
        />

        <div className={styles.info}>
          <motion.span
            key={sr}
            className={styles.srValue}
            style={{ color: rank.color, textShadow: `0 0 30px ${rank.color}55` }}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {sr.toLocaleString()}
          </motion.span>

          <div className={styles.rankRow}>
            <span className={styles.rankName} style={{ color: rank.color }}>
              {rank.name}
            </span>
            {tier && (
              <span className={styles.tier} style={{ borderColor: `${rank.color}55`, color: rank.color }}>
                {tier}
              </span>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {lastSrChange !== null && (
              <motion.span
                key={lastSrChange + '-' + sr}
                className={styles.srChange}
                style={{ color: lastSrChange >= 0 ? 'var(--green)' : 'var(--red)' }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                {fmtSR(lastSrChange)} SR
              </motion.span>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                style={{ background: rank.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <span className={styles.progressLabel} style={{ color: rank.color }}>
              {srToNext !== null ? `${srToNext} SR para ${RANKS_NEXT(rank)}` : 'RANGO MÁXIMO'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { RANKS } from '../store/useStore'
function RANKS_NEXT(rank) {
  const idx = RANKS.findIndex(r => r.name === rank.name)
  return idx < RANKS.length - 1 ? RANKS[idx + 1].name : 'MAX'
}
