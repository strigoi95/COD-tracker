import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Real Black Ops 6 SR thresholds (from official Activision/GameSpot data)
export const RANKS = [
  { name: 'UNRANKED',   min: 0,     max: 899,      color: '#666680',  tier: false },
  { name: 'BRONZE',     min: 900,   max: 2099,     color: '#cd7f32',  tier: true  },
  { name: 'SILVER',     min: 2100,  max: 3599,     color: '#a8b8c8',  tier: true  },
  { name: 'GOLD',       min: 3600,  max: 5399,     color: '#ffd700',  tier: true  },
  { name: 'PLATINUM',   min: 5400,  max: 7499,     color: '#40e0d0',  tier: true  },
  { name: 'DIAMOND',    min: 7500,  max: 9999,     color: '#1e90ff',  tier: true  },
  { name: 'CRIMSON',    min: 10000, max: 12499,    color: '#ff2244',  tier: true  },
  { name: 'IRIDESCENT', min: 12500, max: 14999,    color: '#cc55ff',  tier: false },
  { name: 'TOP 250',    min: 15000, max: Infinity,  color: '#ffd000',  tier: false },
]

export function getRank(sr) {
  return RANKS.find(r => sr >= r.min && sr <= r.max) || RANKS[0]
}

export function getTier(rank, sr) {
  if (!rank.tier) return null
  const span = rank.max - rank.min
  const progress = sr - rank.min
  if (progress < span / 3) return 'I'
  if (progress < (span * 2) / 3) return 'II'
  return 'III'
}

export function calcKD(kills, deaths) {
  if (deaths === 0) return kills === 0 ? 0 : kills
  return kills / deaths
}

function computeStreak(games) {
  if (!games.length) return { type: null, count: 0 }
  const last = games[games.length - 1]
  if (last.result === 'draw') return { type: 'draw', count: 1 }
  const streakType = last.result
  let count = 0
  for (let i = games.length - 1; i >= 0; i--) {
    if (games[i].result === streakType) count++
    else break
  }
  return { type: streakType, count }
}

const defaultSessionState = {
  kills: 0,
  deaths: 0,
  sr: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  srDelta: 0,
  lastSrChange: null,
  games: [],
  rankHistory: [],
  srGoal: null,
}

const defaultState = {
  ...defaultSessionState,
  theme: 'dark',
  sessions: [],      // saved past sessions
}

export const useStore = create(
  persist(
    (set, get) => ({
      ...defaultState,

      _commitGame(kills, deaths, srChange, result) {
        const state = get()
        const prevRank = getRank(state.sr)
        const newSr = Math.max(0, state.sr + srChange)
        const newRank = getRank(newSr)

        const gameRecord = {
          id: Date.now(),
          kills, deaths,
          kd: (kills > 0 || deaths > 0) ? calcKD(kills, deaths) : null,
          srChange,
          srAfter: newSr,
          result,
          timestamp: new Date().toISOString(),
        }

        let newRankHistory = state.rankHistory
        if (newRank.name !== prevRank.name) {
          newRankHistory = [...state.rankHistory, {
            from: prevRank.name,
            to: newRank.name,
            sr: newSr,
            direction: newSr > state.sr ? 'up' : 'down',
            timestamp: new Date().toISOString(),
          }]
        }

        set({
          kills:       state.kills + kills,
          deaths:      state.deaths + deaths,
          sr:          newSr,
          srDelta:     state.srDelta + srChange,
          lastSrChange: srChange,
          wins:        result === 'win'  ? state.wins + 1  : state.wins,
          losses:      result === 'loss' ? state.losses + 1 : state.losses,
          draws:       result === 'draw' ? state.draws + 1  : state.draws,
          games:       [...state.games, gameRecord],
          rankHistory: newRankHistory,
        })
      },

      addGame({ kills, deaths, srChange, result }) {
        get()._commitGame(kills, deaths, srChange, result)
      },

      updateSR(srChange, result) {
        get()._commitGame(0, 0, srChange, result)
      },

      deleteGame(id) {
        const state = get()
        const game = state.games.find(g => g.id === id)
        if (!game) return
        set({
          kills:   state.kills - game.kills,
          deaths:  state.deaths - game.deaths,
          sr:      Math.max(0, state.sr - game.srChange),
          srDelta: state.srDelta - game.srChange,
          wins:    game.result === 'win'  ? state.wins - 1  : state.wins,
          losses:  game.result === 'loss' ? state.losses - 1 : state.losses,
          draws:   game.result === 'draw' ? state.draws - 1  : state.draws,
          games:   state.games.filter(g => g.id !== id),
        })
      },

      saveAndResetSession() {
        const state = get()
        if (state.games.length === 0) return
        const session = {
          id: Date.now(),
          date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          kills: state.kills,
          deaths: state.deaths,
          wins: state.wins,
          losses: state.losses,
          draws: state.draws,
          srDelta: state.srDelta,
          srStart: state.sr - state.srDelta,
          srEnd: state.sr,
          gamesCount: state.games.length,
          rankStart: getRank(state.sr - state.srDelta).name,
          rankEnd: getRank(state.sr).name,
        }
        set({
          ...defaultSessionState,
          theme: state.theme,
          srGoal: state.srGoal,
          sr: state.sr, // keep current SR
          sessions: [...state.sessions.slice(-9), session], // keep last 10
        })
      },

      resetSession() {
        const state = get()
        set({ ...defaultSessionState, theme: state.theme, srGoal: state.srGoal })
      },

      deleteSession(id) {
        const state = get()
        set({ sessions: state.sessions.filter(s => s.id !== id) })
      },

      setSRGoal(goal) { set({ srGoal: goal }) },
      setTheme(theme) { set({ theme }) },
      setSR(sr) { set({ sr: Math.max(0, sr) }) },
    }),
    { name: 'bo7-tracker-v3' }
  )
)
