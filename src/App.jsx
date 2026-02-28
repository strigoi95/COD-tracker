import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from './store/useStore'
import KDCard from './components/KDCard'
import SRCard from './components/SRCard'
import AddGameForm from './components/AddGameForm'
import SessionStats from './components/SessionStats'
import GameHistory from './components/GameHistory'
import SRChart from './components/SRChart'
import StreakBanner from './components/StreakBanner'
import SRGoal from './components/SRGoal'
import RankHistory from './components/RankHistory'
import ThemeToggle from './components/ThemeToggle'
import RankUpToast from './components/RankUpToast'
import SessionComparison from './components/SessionComparison'
import styles from './App.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}

export default function App() {
  const theme = useStore(s => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={styles.app}>
      {/* Rank-up toast lives outside the grid, fixed position */}
      <RankUpToast />

      <header className={styles.header}>
        <motion.div
          className={styles.headerInner}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>BLACK OPS 7</h1>
            <p className={styles.subtitle}>// RANKED SESSION TRACKER //</p>
          </div>
          <ThemeToggle />
        </motion.div>
      </header>

      <motion.main
        className={styles.grid}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}><KDCard /></motion.div>
        <motion.div variants={item}><SRCard /></motion.div>
        <motion.div variants={item}><AddGameForm /></motion.div>
        <motion.div variants={item}><SessionStats /></motion.div>

        <motion.div variants={item} className={styles.fullWidth}>
          <StreakBanner />
        </motion.div>
        <motion.div variants={item} className={styles.fullWidth}>
          <SRChart />
        </motion.div>

        <motion.div variants={item}><SRGoal /></motion.div>
        <motion.div variants={item}><RankHistory /></motion.div>

        <motion.div variants={item} className={styles.fullWidth}>
          <SessionComparison />
        </motion.div>
        <motion.div variants={item} className={styles.fullWidth}>
          <GameHistory />
        </motion.div>
      </motion.main>
    </div>
  )
}
