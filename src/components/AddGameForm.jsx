import { useRef } from 'react'
import { useGameForm } from '../hooks/useGameForm'
import styles from './AddGameForm.module.css'

const RESULTS = [
  { value: 'win',  label: '▲ WIN',  color: 'var(--green)' },
  { value: 'draw', label: '— DRAW', color: 'var(--muted)' },
  { value: 'loss', label: '▼ LOSS', color: 'var(--red)' },
]

export default function AddGameForm() {
  const {
    kills, setKills,
    deaths, setDeaths,
    srChange, setSrChange,
    result, setResult,
    mode, setMode,
    error, submit,
  } = useGameForm()

  const deathsRef = useRef()
  const srRef = useRef()

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>AÑADIR PARTIDA</span>
        <span className={styles.divider} />
      </div>

      {/* Mode toggle */}
      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeBtn} ${mode === 'full' ? styles.modeActive : ''}`}
          onClick={() => setMode('full')}
        >
          KD + SR
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'sronly' ? styles.modeActive : ''}`}
          onClick={() => setMode('sronly')}
        >
          SOLO SR
        </button>
      </div>

      {/* KD inputs */}
      {mode === 'full' && (
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>KILLS</label>
            <input
              className={styles.input}
              type="number"
              min="0"
              placeholder="0"
              value={kills}
              onChange={e => setKills(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && deathsRef.current?.focus()}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>DEATHS</label>
            <input
              ref={deathsRef}
              className={styles.input}
              type="number"
              min="0"
              placeholder="0"
              value={deaths}
              onChange={e => setDeaths(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && srRef.current?.focus()}
            />
          </div>
        </div>
      )}

      {/* SR input */}
      <div className={styles.srRow}>
        <div className={styles.inputGroup} style={{ flex: 1 }}>
          <label className={styles.inputLabel}>SR CHANGE</label>
          <input
            ref={srRef}
            className={`${styles.input} ${styles.srInput}`}
            type="number"
            placeholder="+50 o -30"
            value={srChange}
            onChange={e => setSrChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
          />
        </div>
      </div>

      {/* Result selector */}
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
