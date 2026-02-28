import { useEffect, useRef } from 'react'
import styles from './AdSlot.module.css'

// Tu Publisher ID de Google AdSense
const CLIENT_ID = 'ca-pub-3564748430431029'

const SLOT_CONFIG = {
  top: {
    slot: '1234567890',   // ← reemplaza con tu Ad Slot ID real cuando AdSense lo apruebe
    format: 'auto',
    style: { display: 'block', minHeight: '90px' },
    label: 'PUBLICIDAD',
  },
  mid: {
    slot: '0987654321',   // ← reemplaza con tu Ad Slot ID real
    format: 'auto',
    style: { display: 'block', minHeight: '90px' },
    label: 'PUBLICIDAD',
  },
  bottom: {
    slot: '1122334455',   // ← reemplaza con tu Ad Slot ID real
    format: 'auto',
    style: { display: 'block', minHeight: '90px' },
    label: 'PUBLICIDAD',
  },
}

export default function AdSlot({ position = 'top' }) {
  const ref = useRef(null)
  const config = SLOT_CONFIG[position]

  useEffect(() => {
    try {
      if (window.adsbygoogle && ref.current) {
        window.adsbygoogle.push({})
      }
    } catch (e) {
      // AdSense not loaded yet
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{config.label}</span>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={CLIENT_ID}
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
