import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── RANKED ──────────────────────────────────────────────
export const RANKS = [
  { name: 'UNRANKED',   min: 0,     max: 899,     color: '#666680', tier: false },
  { name: 'BRONZE',     min: 900,   max: 2099,    color: '#cd7f32', tier: true  },
  { name: 'SILVER',     min: 2100,  max: 3599,    color: '#a8b8c8', tier: true  },
  { name: 'GOLD',       min: 3600,  max: 5399,    color: '#ffd700', tier: true  },
  { name: 'PLATINUM',   min: 5400,  max: 7499,    color: '#40e0d0', tier: true  },
  { name: 'DIAMOND',    min: 7500,  max: 9999,    color: '#1e90ff', tier: true  },
  { name: 'CRIMSON',    min: 10000, max: 12499,   color: '#ff2244', tier: true  },
  { name: 'IRIDESCENT', min: 12500, max: 14999,   color: '#cc55ff', tier: false },
  { name: 'TOP 250',    min: 15000, max: Infinity, color: '#ffd000', tier: false },
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

export function calcKDA(kills, deaths, assists) {
  if (deaths === 0) return kills === 0 ? 0 : kills + assists * 0.5
  return (kills + assists * 0.5) / deaths
}

// ── GAME MODES ──────────────────────────────────────────
export const GAME_MODES = [
  'TDM', 'Dominio', 'Buscar y Destruir', 'Hardpoint',
  'Control', 'Bajas Confirmadas', 'Punto Caliente', 'Todos contra Todos',
]

// ── DEFAULT STATES ──────────────────────────────────────
const defaultRankedSession = {
  kills: 0, deaths: 0,
  sr: 0, wins: 0, losses: 0, draws: 0,
  srDelta: 0, lastSrChange: null,
  games: [], rankHistory: [], srGoal: null,
}

const defaultPublicSession = {
  pub_kills: 0, pub_deaths: 0, pub_assists: 0,
  pub_wins: 0, pub_losses: 0,
  pub_maxStreak: 0,
  pub_games: [],
}

const defaultState = {
  ...defaultRankedSession,
  ...defaultPublicSession,
  theme: 'dark',
  sessions: [],
  activeTab: 'ranked', // 'ranked' | 'public'
}

export const useStore = create(
  persist(
    (set, get) => ({
      ...defaultState,

      setTab(tab) { set({ activeTab: tab }) },
      setTheme(theme) { set({ theme }) },
      setSRGoal(goal) { set({ srGoal: goal }) },
      setSR(sr) { set({ sr: Math.max(0, sr) }) },

      // ── RANKED ACTIONS ──────────────────────────────
      _commitRankedGame(kills, deaths, srChange, result) {
        const state = get()
        const prevRank = getRank(state.sr)
        const newSr = Math.max(0, state.sr + srChange)
        const newRank = getRank(newSr)

        const gameRecord = {
          id: Date.now(),
          kills, deaths,
          kd: (kills > 0 || deaths > 0) ? calcKD(kills, deaths) : null,
          srChange, srAfter: newSr, result,
          timestamp: new Date().toISOString(),
        }

        let newRankHistory = state.rankHistory
        if (newRank.name !== prevRank.name) {
          newRankHistory = [...state.rankHistory, {
            from: prevRank.name, to: newRank.name,
            sr: newSr,
            direction: newSr > state.sr ? 'up' : 'down',
            timestamp: new Date().toISOString(),
          }]
        }

        set({
          kills: state.kills + kills,
          deaths: state.deaths + deaths,
          sr: newSr,
          srDelta: state.srDelta + srChange,
          lastSrChange: srChange,
          wins:   result === 'win'  ? state.wins + 1  : state.wins,
          losses: result === 'loss' ? state.losses + 1 : state.losses,
          draws:  result === 'draw' ? state.draws + 1  : state.draws,
          games: [...state.games, gameRecord],
          rankHistory: newRankHistory,
        })
      },

      addGame({ kills, deaths, srChange, result }) {
        get()._commitRankedGame(kills, deaths, srChange, result)
      },

      updateSR(srChange, result) {
        get()._commitRankedGame(0, 0, srChange, result)
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
          kills: state.kills, deaths: state.deaths,
          wins: state.wins, losses: state.losses, draws: state.draws,
          srDelta: state.srDelta,
          srStart: state.sr - state.srDelta, srEnd: state.sr,
          gamesCount: state.games.length,
          rankStart: getRank(state.sr - state.srDelta).name,
          rankEnd: getRank(state.sr).name,
        }
        set({
          ...defaultRankedSession,
          theme: state.theme, srGoal: state.srGoal, sr: state.sr,
          sessions: [...state.sessions.slice(-9), session],
          pub_kills: state.pub_kills, pub_deaths: state.pub_deaths,
          pub_assists: state.pub_assists, pub_wins: state.pub_wins,
          pub_losses: state.pub_losses, pub_maxStreak: state.pub_maxStreak,
          pub_games: state.pub_games,
          activeTab: state.activeTab,
        })
      },

      resetRankedSession() {
        const state = get()
        set({ ...defaultRankedSession, theme: state.theme, srGoal: state.srGoal,
          pub_kills: state.pub_kills, pub_deaths: state.pub_deaths,
          pub_assists: state.pub_assists, pub_wins: state.pub_wins,
          pub_losses: state.pub_losses, pub_maxStreak: state.pub_maxStreak,
          pub_games: state.pub_games, sessions: state.sessions, activeTab: state.activeTab,
        })
      },

      deleteSession(id) {
        set({ sessions: get().sessions.filter(s => s.id !== id) })
      },

      // ── PUBLIC ACTIONS ──────────────────────────────
      addPublicGame({ kills, deaths, assists, result, mode, killStreak }) {
        const state = get()
        const kd = calcKD(kills, deaths)
        const kda = calcKDA(kills, deaths, assists)
        const newMaxStreak = Math.max(state.pub_maxStreak, killStreak || 0)

        const gameRecord = {
          id: Date.now(),
          kills, deaths, assists, kd, kda,
          result, mode,
          killStreak: killStreak || 0,
          timestamp: new Date().toISOString(),
        }

        set({
          pub_kills:   state.pub_kills + kills,
          pub_deaths:  state.pub_deaths + deaths,
          pub_assists: state.pub_assists + assists,
          pub_wins:    result === 'win'  ? state.pub_wins + 1  : state.pub_wins,
          pub_losses:  result === 'loss' ? state.pub_losses + 1 : state.pub_losses,
          pub_maxStreak: newMaxStreak,
          pub_games:   [...state.pub_games, gameRecord],
        })
      },

      deletePublicGame(id) {
        const state = get()
        const game = state.pub_games.find(g => g.id === id)
        if (!game) return
        const remaining = state.pub_games.filter(g => g.id !== id)
        set({
          pub_kills:   state.pub_kills - game.kills,
          pub_deaths:  state.pub_deaths - game.deaths,
          pub_assists: state.pub_assists - game.assists,
          pub_wins:    game.result === 'win'  ? state.pub_wins - 1  : state.pub_wins,
          pub_losses:  game.result === 'loss' ? state.pub_losses - 1 : state.pub_losses,
          pub_maxStreak: remaining.length > 0 ? Math.max(...remaining.map(g => g.killStreak || 0)) : 0,
          pub_games:   remaining,
        })
      },

      resetPublicSession() {
        const state = get()
        set({ ...defaultPublicSession,
          theme: state.theme, sr: state.sr, srDelta: state.srDelta,
          kills: state.kills, deaths: state.deaths, wins: state.wins,
          losses: state.losses, draws: state.draws, srGoal: state.srGoal,
          games: state.games, rankHistory: state.rankHistory,
          sessions: state.sessions, activeTab: state.activeTab,
          lastSrChange: state.lastSrChange,
        })
      },
    }),
    { name: 'bo7-tracker-v4' }
  )
)
