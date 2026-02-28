import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const theme = useStore(s => s.theme)
  const setTheme = useStore(s => s.setTheme)

  const isDark = theme === 'dark'

  return (
    <button
      className={styles.btn}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={styles.icon}
      >
        {isDark ? '☀' : '☾'}
      </motion.span>
      <span className={styles.label}>{isDark ? 'CLARO' : 'OSCURO'}</span>
    </button>
  )
}
