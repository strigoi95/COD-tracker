import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import styles from './TabBar.module.css'

const TABS = [
  { id: 'ranked', label: 'RANKED', icon: '🏆', color: 'var(--accent)' },
  { id: 'public', label: 'PÚBLICAS', icon: '🎮', color: 'var(--blue)' },
]

export default function TabBar() {
  const activeTab = useStore(s => s.activeTab)
  const setTab = useStore(s => s.setTab)

  return (
    <div className={styles.wrap}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setTab(tab.id)}
          style={activeTab === tab.id ? { borderColor: tab.color, color: tab.color } : {}}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              className={styles.indicator}
              layoutId="tab-indicator"
              style={{ background: tab.color }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
