import { useStore, calcKD, calcKDA } from '../store/useStore'
import { fmt } from '../utils/format'
import styles from './PublicStats.module.css'

export default function PublicStats() {
  const kills    = useStore(s => s.pub_kills)
  const deaths   = useStore(s => s.pub_deaths)
  const assists  = useStore(s => s.pub_assists)
  const wins     = useStore(s => s.pub_wins)
  const losses   = useStore(s => s.pub_losses)
  const maxStreak = useStore(s => s.pub_maxStreak)
  const games    = useStore(s => s.pub_games)
  const resetPublicSession = useStore(s => s.resetPublicSession)

  const total = wins + losses
  const wr = total > 0 ? Math.round((wins / total) * 100) : 0
  const kd  = calcKD(kills, deaths)
  const kda = calcKDA(kills, deaths, assists)

  // Mode breakdown
  const modeMap = {}
  games.forEach(g => {
    if (!modeMap[g.mode]) modeMap[g.mode] = { games: 0, wins: 0 }
    modeMap[g.mode].games++
    if (g.result === 'win') modeMap[g.mode].wins++
  })
  const topModes = Object.entries(modeMap)
    .sort((a, b) => b[1].games - a[1].games)
    .slice(0, 3)

  const kdColor = kd >= 2 ? 'var(--green)' : kd >= 1 ? 'var(--accent2)' : 'var(--red)'

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.label}>
        <span className={styles.mono}>ESTADÍSTICAS PÚBLICAS</span>
        <span className={styles.divider} />
      </div>

      {/* Big KD / KDA */}
      <div className={styles.kdRow}>
        <div className={styles.bigStat}>
          <span className={styles.bigVal} style={{ color: kdColor }}>{fmt(kd)}</span>
          <span className={styles.bigLbl}>KD</span>
        </div>
        <div className={styles.bigDivider} />
        <div className={styles.bigStat}>
          <span className={styles.bigVal} style={{ color: 'var(--blue)' }}>{fmt(kda)}</span>
          <span className={styles.bigLbl}>KDA</span>
        </div>
        <div className={styles.bigDivider} />
        <div className={styles.bigStat}>
          <span className={styles.bigVal} style={{ color: wr >= 50 ? 'var(--green)' : 'var(--red)' }}>
            {wr}%
          </span>
          <span className={styles.bigLbl}>WIN RATE</span>
        </div>
        <div className={styles.bigDivider} />
        <div className={styles.bigStat}>
          <span className={styles.bigVal} style={{ color: 'var(--accent2)' }}>{maxStreak}</span>
          <span className={styles.bigLbl}>MAX RACHA</span>
        </div>
      </div>

      {/* Small stats grid */}
      <div className={styles.grid}>
        <div className={styles.statBox}>
          <span className={styles.val} style={{ color: 'var(--green)' }}>{kills}</span>
          <span className={styles.lbl}>KILLS</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.val} style={{ color: 'var(--red)' }}>{deaths}</span>
          <span className={styles.lbl}>DEATHS</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.val} style={{ color: 'var(--blue)' }}>{assists}</span>
          <span className={styles.lbl}>ASSISTS</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.val}>{total}</span>
          <span className={styles.lbl}>PARTIDAS</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.val} style={{ color: 'var(--green)' }}>{wins}</span>
          <span className={styles.lbl}>WINS</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.val} style={{ color: 'var(--red)' }}>{losses}</span>
          <span className={styles.lbl}>LOSSES</span>
        </div>
      </div>

      {/* Top modes */}
      {topModes.length > 0 && (
        <>
          <div className={styles.sep} />
          <div className={styles.modesLabel}>
            <span className={styles.mono}>TOP MODOS</span>
          </div>
          <div className={styles.modes}>
            {topModes.map(([mode, data]) => {
              const modeWr = Math.round((data.wins / data.games) * 100)
              return (
                <div key={mode} className={styles.modeRow}>
                  <span className={styles.modeName}>{mode}</span>
                  <span className={styles.modeGames}>{data.games} partidas</span>
                  <span className={styles.modeWr} style={{ color: modeWr >= 50 ? 'var(--green)' : 'var(--red)' }}>
                    {modeWr}% WR
                  </span>
                </div>
              )
            })}
          </div>
        </>
      )}

      <button className={styles.resetBtn} onClick={resetPublicSession}>
        ⟳ RESET PÚBLICAS
      </button>
    </div>
  )
}
