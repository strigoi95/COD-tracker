import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './store/useStore'

// Shared
import ThemeToggle from './components/ThemeToggle'
import RankUpToast from './components/RankUpToast'
import AdSlot from './components/AdSlot'
import TabBar from './components/TabBar'

// Ranked tab
import KDCard from './components/KDCard'
import SRCard from './components/SRCard'
import AddGameForm from './components/AddGameForm'
import SessionStats from './components/SessionStats'
import GameHistory from './components/GameHistory'
import SRChart from './components/SRChart'
import StreakBanner from './components/StreakBanner'
import SRGoal from './components/SRGoal'
import RankHistory from './components/RankHistory'
import SessionComparison from './components/SessionComparison'

// Public tab
import PublicForm from './components/PublicForm'
import PublicStats from './components/PublicStats'
import PublicHistory from './components/PublicHistory'

import styles from './App.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
}

export default function App() {
  const theme = useStore(s => s.theme)
  const activeTab = useStore(s => s.activeTab)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={styles.app}>
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
            <p className={styles.subtitle}>// SESSION TRACKER //</p>
          </div>
          <ThemeToggle />
        </motion.div>
      </header>

      {/* Ad top */}
      <div className={styles.adWrap}>
        <AdSlot position="top" />
      </div>

      <div className={styles.inner}>
        <TabBar />

        <AnimatePresence mode="wait">
          {activeTab === 'ranked' && (
            <motion.div
              key="ranked"
              className={styles.grid}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
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

              {/* Ad mid */}
              <motion.div variants={item} className={styles.fullWidth}>
                <AdSlot position="mid" />
              </motion.div>

              <motion.div variants={item}><SRGoal /></motion.div>
              <motion.div variants={item}><RankHistory /></motion.div>

              <motion.div variants={item} className={styles.fullWidth}>
                <SessionComparison />
              </motion.div>
              <motion.div variants={item} className={styles.fullWidth}>
                <GameHistory />
              </motion.div>

              {/* Ad bottom */}
              <motion.div variants={item} className={styles.fullWidth}>
                <AdSlot position="bottom" />
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'public' && (
            <motion.div
              key="public"
              className={styles.grid}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div variants={item}><PublicForm /></motion.div>
              <motion.div variants={item}><PublicStats /></motion.div>
              <motion.div variants={item} className={styles.fullWidth}>
                <PublicHistory />
              </motion.div>
              <motion.div variants={item} className={styles.fullWidth}>
                <AdSlot position="bottom" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
