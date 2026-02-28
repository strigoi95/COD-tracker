import { useState } from 'react'
import { useStore } from '../store/useStore'

export function useGameForm() {
  const addGame = useStore(s => s.addGame)
  const updateSR = useStore(s => s.updateSR)

  const [kills, setKills] = useState('')
  const [deaths, setDeaths] = useState('')
  const [srChange, setSrChange] = useState('')
  const [result, setResult] = useState('win')
  const [mode, setMode] = useState('full') // 'full' | 'sronly'
  const [error, setError] = useState('')

  function submit() {
    const sr = parseInt(srChange)
    if (isNaN(sr)) {
      setError('Introduce el SR ganado o perdido')
      return
    }

    if (mode === 'full') {
      const k = parseInt(kills) || 0
      const d = parseInt(deaths) || 0
      addGame({ kills: k, deaths: d, srChange: sr, result })
    } else {
      updateSR(sr, result)
    }

    setKills('')
    setDeaths('')
    setSrChange('')
    setError('')
  }

  return {
    kills, setKills,
    deaths, setDeaths,
    srChange, setSrChange,
    result, setResult,
    mode, setMode,
    error, setError,
    submit,
  }
}
