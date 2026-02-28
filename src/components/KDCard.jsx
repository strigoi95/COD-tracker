import { motion } from 'framer-motion'
import { useStore, calcKD } from '../store/useStore'
import { fmt, kdColor } from '../utils/format'
import styles from './KDCard.module.css'

export default function KDCard() {
  const kills = useStore(s => s.kills)
  const deaths = useStore(s => s.deaths)
  const kd = calcKD(kills, deaths)
  const color = kdColor(kd)

  const label =
    kd >= 2.0 ? 'GODLIKE' :
    kd >= 1.5 ? 'DOMINANT' :
    kd >= 1.0 ? 'POSITIVE' :
    kd >= 0.75 ? 'BELOW AVG' : 'FEEDING'

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>KD RATIO</span>
        <span className={styles.divider} />
      </div>

      <motion.div
        className={styles.kdMain}
        key={fmt(kd)}
        initial={{ scale: 0.92, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <span className={styles.kdValue} style={{ color, textShadow: `0 0 40px ${color}66` }}>
          {fmt(kd)}
        </span>
        <span className={styles.kdLabel} style={{ color }}>{label}</span>
      </motion.div>

      <div className={styles.row}>
        <div className={styles.stat}>
          <span className={styles.statVal} style={{ color: 'var(--green)' }}>{kills}</span>
          <span className={styles.statLbl}>KILLS</span>
        </div>
        <div className={styles.separator} />
        <div className={styles.stat}>
          <span className={styles.statVal} style={{ color: 'var(--red)' }}>{deaths}</span>
          <span className={styles.statLbl}>DEATHS</span>
        </div>
      </div>
    </div>
  )
}
