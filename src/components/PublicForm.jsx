import { useState, useRef } from 'react'
import { useStore, GAME_MODES } from '../store/useStore'
import styles from './PublicForm.module.css'

const RESULTS = [
  { value: 'win',  label: '▲ WIN',  color: 'var(--green)' },
  { value: 'loss', label: '▼ LOSS', color: 'var(--red)' },
]

export default function PublicForm() {
  const addPublicGame = useStore(s => s.addPublicGame)

  const [kills, setKills] = useState('')
  const [deaths, setDeaths] = useState('')
  const [assists, setAssists] = useState('')
  const [killStreak, setKillStreak] = useState('')
  const [result, setResult] = useState('win')
  const [mode, setMode] = useState(GAME_MODES[0])
  const [error, setError] = useState('')

  const deathsRef = useRef()
  const assistsRef = useRef()
  const streakRef = useRef()

  function submit() {
    const k = parseInt(kills) || 0
    const d = parseInt(deaths) || 0
    const a = parseInt(assists) || 0
    const ks = parseInt(killStreak) || 0

    if (k === 0 && d === 0) {
      setError('Introduce al menos kills o deaths')
      return
    }

    addPublicGame({ kills: k, deaths: d, assists: a, killStreak: ks, result, mode })
    setKills(''); setDeaths(''); setAssists(''); setKillStreak(''); setError('')
  }

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>AÑADIR PARTIDA PÚBLICA</span>
        <span className={styles.divider} />
      </div>

      {/* Mode selector */}
      <div className={styles.modeWrap}>
        <label className={styles.inputLabel}>MODO DE JUEGO</label>
        <select
          className={styles.select}
          value={mode}
          onChange={e => setMode(e.target.value)}
        >
          {GAME_MODES.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* KDA inputs */}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>KILLS</label>
          <input
            className={styles.input}
            type="number" min="0" placeholder="0"
            value={kills} onChange={e => setKills(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && deathsRef.current?.focus()}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>DEATHS</label>
          <input
            ref={deathsRef}
            className={styles.input}
            type="number" min="0" placeholder="0"
            value={deaths} onChange={e => setDeaths(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && assistsRef.current?.focus()}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>ASSISTS</label>
          <input
            ref={assistsRef}
            className={styles.input}
            type="number" min="0" placeholder="0"
            value={assists} onChange={e => setAssists(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && streakRef.current?.focus()}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>MAX RACHA</label>
          <input
            ref={streakRef}
            className={`${styles.input} ${styles.streakInput}`}
            type="number" min="0" placeholder="0"
            value={killStreak} onChange={e => setKillStreak(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
          />
        </div>
      </div>

      {/* Result */}
      <div className={styles.resultRow}>
        {RESULTS.map(r => (
          <button
            key={r.value}
            className={`${styles.resultBtn} ${result === r.value ? styles.resultActive : ''}`}
            style={result === r.value ? { color: r.color, borderColor: `${r.color}66`, background: `${r.color}11` } : {}}
            onClick={() => setResult(r.value)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.submitBtn} onClick={submit}>
        + REGISTRAR PARTIDA
      </button>
    </div>
  )
}
