// Rank icons as SVG strings, styled after BO6's shield/military emblem aesthetic
// Each icon uses the real rank color palette from the game

export const RANK_ICONS = {
  BRONZE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_bronze" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#7a4010"/>
        <stop offset="100%" stop-color="#3d1a04"/>
      </radialGradient>
      <linearGradient id="shine_bronze" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8913a" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="#cd7f32"/>
        <stop offset="100%" stop-color="#8b4a10" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <!-- Outer shield -->
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_bronze)" stroke="#cd7f32" stroke-width="2"/>
    <!-- Inner shield border -->
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#e8913a" stroke-width="1" opacity="0.5"/>
    <!-- Center emblem - crossed swords -->
    <line x1="28" y1="28" x2="52" y2="52" stroke="#e8913a" stroke-width="3" stroke-linecap="round"/>
    <line x1="52" y1="28" x2="28" y2="52" stroke="#e8913a" stroke-width="3" stroke-linecap="round"/>
    <!-- Guard crossbars -->
    <line x1="24" y1="32" x2="32" y2="24" stroke="#cd7f32" stroke-width="2" stroke-linecap="round"/>
    <line x1="48" y1="32" x2="56" y2="24" stroke="#cd7f32" stroke-width="2" stroke-linecap="round"/>
    <!-- Roman numeral I at bottom -->
    <rect x="38" y="56" width="4" height="10" fill="#e8913a" rx="1"/>
    <!-- Top star -->
    <polygon points="40,8 41.5,13 47,13 42.5,16 44,21 40,18 36,21 37.5,16 33,13 38.5,13" fill="#cd7f32"/>
  </svg>`,

  SILVER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_silver" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#5a6070"/>
        <stop offset="100%" stop-color="#252835"/>
      </radialGradient>
      <linearGradient id="shine_silver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d8dce8"/>
        <stop offset="50%" stop-color="#a8b8c8"/>
        <stop offset="100%" stop-color="#687080"/>
      </linearGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_silver)" stroke="#a8b8c8" stroke-width="2"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#d8dce8" stroke-width="1" opacity="0.5"/>
    <!-- Hexagon pattern -->
    <polygon points="40,22 50,28 50,40 40,46 30,40 30,28" fill="none" stroke="#a8b8c8" stroke-width="2"/>
    <polygon points="40,28 46,32 46,38 40,42 34,38 34,32" fill="#a8b8c8" opacity="0.3"/>
    <!-- Center dot -->
    <circle cx="40" cy="35" r="4" fill="#d8dce8"/>
    <!-- Bottom rank marker -->
    <rect x="36" y="54" width="3" height="8" fill="#a8b8c8" rx="1"/>
    <rect x="41" y="54" width="3" height="8" fill="#a8b8c8" rx="1"/>
    <polygon points="40,6 41.5,11 47,11 42.5,14 44,19 40,16.5 36,19 37.5,14 33,11 38.5,11" fill="#a8b8c8"/>
  </svg>`,

  GOLD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_gold" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#8a6a00"/>
        <stop offset="100%" stop-color="#3d2d00"/>
      </radialGradient>
      <radialGradient id="glow_gold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffd700" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_gold)" stroke="#ffd700" stroke-width="2.5"/>
    <circle cx="40" cy="38" r="26" fill="url(#glow_gold)"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#ffd700" stroke-width="1" opacity="0.6"/>
    <!-- Crown -->
    <path d="M26 46 L26 36 L32 42 L40 30 L48 42 L54 36 L54 46 Z" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="26" y="46" width="28" height="4" rx="1" fill="#ffd700"/>
    <!-- Crown jewels -->
    <circle cx="32" cy="42" r="2.5" fill="#ffd700"/>
    <circle cx="40" cy="30" r="3" fill="#ffd700"/>
    <circle cx="48" cy="42" r="2.5" fill="#ffd700"/>
    <!-- Bottom -->
    <rect x="35" y="54" width="10" height="3" rx="1" fill="#ffd700" opacity="0.7"/>
    <!-- Stars -->
    <polygon points="40,5 41.8,10.5 47.5,10.5 43,13.5 44.8,19 40,16 35.2,19 37,13.5 32.5,10.5 38.2,10.5" fill="#ffd700"/>
  </svg>`,

  PLATINUM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_plat" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#1a4a48"/>
        <stop offset="100%" stop-color="#0a1e20"/>
      </radialGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_plat)" stroke="#40e0d0" stroke-width="2.5"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#40e0d0" stroke-width="1" opacity="0.4"/>
    <!-- Diamond shape -->
    <polygon points="40,22 52,34 40,52 28,34" fill="none" stroke="#40e0d0" stroke-width="2.5"/>
    <!-- Inner diamond -->
    <polygon points="40,28 47,34 40,44 33,34" fill="#40e0d0" opacity="0.2"/>
    <!-- Facets -->
    <line x1="40" y1="22" x2="40" y2="52" stroke="#40e0d0" stroke-width="1" opacity="0.4"/>
    <line x1="28" y1="34" x2="52" y2="34" stroke="#40e0d0" stroke-width="1" opacity="0.4"/>
    <line x1="28" y1="34" x2="40" y2="22" stroke="#40e0d0" stroke-width="1" opacity="0.3"/>
    <line x1="52" y1="34" x2="40" y2="22" stroke="#40e0d0" stroke-width="1" opacity="0.3"/>
    <!-- Center gem -->
    <circle cx="40" cy="34" r="4" fill="#40e0d0" opacity="0.7"/>
    <circle cx="40" cy="34" r="2" fill="#b0f8f4"/>
    <rect x="35" y="55" width="10" height="3" rx="1" fill="#40e0d0" opacity="0.6"/>
    <polygon points="40,5 41.8,10.5 47.5,10.5 43,13.5 44.8,19 40,16 35.2,19 37,13.5 32.5,10.5 38.2,10.5" fill="#40e0d0"/>
  </svg>`,

  DIAMOND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_dia" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#0a1840"/>
        <stop offset="100%" stop-color="#04080f"/>
      </radialGradient>
      <radialGradient id="glow_dia" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1e90ff" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#1e90ff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_dia)" stroke="#1e90ff" stroke-width="2.5"/>
    <circle cx="40" cy="40" r="28" fill="url(#glow_dia)"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#5ab0ff" stroke-width="1" opacity="0.5"/>
    <!-- 8-pointed star / diamond -->
    <polygon points="40,20 44,32 56,36 44,40 40,52 36,40 24,36 36,32" fill="none" stroke="#1e90ff" stroke-width="2"/>
    <polygon points="40,25 43,33 51,36 43,39 40,47 37,39 29,36 37,33" fill="#1e90ff" opacity="0.15"/>
    <!-- Vertical diamond -->
    <polygon points="40,23 45,35 40,48 35,35" fill="none" stroke="#5ab0ff" stroke-width="1.5" opacity="0.6"/>
    <circle cx="40" cy="36" r="5" fill="#1e90ff" opacity="0.6"/>
    <circle cx="40" cy="36" r="2.5" fill="#a0d4ff"/>
    <rect x="35" y="56" width="10" height="3" rx="1" fill="#1e90ff" opacity="0.7"/>
    <!-- 3 stars -->
    <polygon points="40,5 41.5,9.5 46,9.5 42.5,12 44,16.5 40,14 36,16.5 37.5,12 34,9.5 38.5,9.5" fill="#1e90ff"/>
    <circle cx="33" cy="9" r="2.5" fill="#1e90ff" opacity="0.6"/>
    <circle cx="47" cy="9" r="2.5" fill="#1e90ff" opacity="0.6"/>
  </svg>`,

  CRIMSON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_crim" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#4a0010"/>
        <stop offset="100%" stop-color="#1a0005"/>
      </radialGradient>
      <radialGradient id="glow_crim" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff2244" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#ff2244" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_crim)" stroke="#ff2244" stroke-width="2.5"/>
    <circle cx="40" cy="40" r="28" fill="url(#glow_crim)"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#ff5566" stroke-width="1" opacity="0.5"/>
    <!-- Skull-like emblem with crossed rifles aesthetic -->
    <!-- Outer ring of teeth/spikes -->
    <polygon points="40,18 43,25 50,22 47,29 55,30 49,35 54,42 47,40 46,48 40,44 34,48 33,40 26,42 31,35 25,30 33,29 30,22 37,25" fill="none" stroke="#ff2244" stroke-width="2"/>
    <!-- Inner circle -->
    <circle cx="40" cy="36" r="10" fill="none" stroke="#ff5566" stroke-width="2"/>
    <circle cx="40" cy="36" r="6" fill="#ff2244" opacity="0.3"/>
    <!-- Crosshair -->
    <line x1="40" y1="26" x2="40" y2="46" stroke="#ff2244" stroke-width="1.5" opacity="0.8"/>
    <line x1="30" y1="36" x2="50" y2="36" stroke="#ff2244" stroke-width="1.5" opacity="0.8"/>
    <circle cx="40" cy="36" r="3" fill="#ff5566"/>
    <rect x="35" y="56" width="10" height="3" rx="1" fill="#ff2244" opacity="0.7"/>
    <polygon points="40,5 41.5,9.5 46,9.5 42.5,12 44,16.5 40,14 36,16.5 37.5,12 34,9.5 38.5,9.5" fill="#ff2244"/>
    <circle cx="31" cy="8" r="2.5" fill="#ff2244" opacity="0.7"/>
    <circle cx="49" cy="8" r="2.5" fill="#ff2244" opacity="0.7"/>
  </svg>`,

  IRIDESCENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_irid" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#2a0050"/>
        <stop offset="100%" stop-color="#0a0018"/>
      </radialGradient>
      <linearGradient id="iris_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cc55ff"/>
        <stop offset="33%" stop-color="#1e90ff"/>
        <stop offset="66%" stop-color="#40e0d0"/>
        <stop offset="100%" stop-color="#cc55ff"/>
      </linearGradient>
      <radialGradient id="glow_irid" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#cc55ff" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#cc55ff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_irid)" stroke="url(#iris_grad)" stroke-width="3"/>
    <circle cx="40" cy="40" r="28" fill="url(#glow_irid)"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="url(#iris_grad)" stroke-width="1.5" opacity="0.7"/>
    <!-- Ornate crown with wings -->
    <path d="M22 44 L25 32 L32 38 L40 24 L48 38 L55 32 L58 44 Z" fill="none" stroke="url(#iris_grad)" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Wing details left -->
    <path d="M22 44 Q16 36 20 28 L25 32" fill="none" stroke="#cc55ff" stroke-width="1.5" opacity="0.6"/>
    <!-- Wing details right -->
    <path d="M58 44 Q64 36 60 28 L55 32" fill="none" stroke="#1e90ff" stroke-width="1.5" opacity="0.6"/>
    <rect x="22" y="44" width="36" height="4" rx="2" fill="url(#iris_grad)" opacity="0.8"/>
    <!-- Jewels on crown -->
    <circle cx="32" cy="38" r="3" fill="#cc55ff"/>
    <circle cx="40" cy="24" r="4" fill="url(#iris_grad)"/>
    <circle cx="48" cy="38" r="3" fill="#40e0d0"/>
    <!-- Center orb -->
    <circle cx="40" cy="35" r="6" fill="none" stroke="url(#iris_grad)" stroke-width="2"/>
    <circle cx="40" cy="35" r="3" fill="url(#iris_grad)" opacity="0.8"/>
    <rect x="34" y="56" width="12" height="3" rx="1.5" fill="url(#iris_grad)" opacity="0.7"/>
    <!-- 4 stars -->
    <polygon points="40,5 41.3,9 45.5,9 42.5,11.5 43.8,15.5 40,13 36.2,15.5 37.5,11.5 34.5,9 38.7,9" fill="url(#iris_grad)"/>
    <circle cx="31" cy="8" r="2.5" fill="#cc55ff" opacity="0.8"/>
    <circle cx="49" cy="8" r="2.5" fill="#40e0d0" opacity="0.8"/>
  </svg>`,

  'TOP 250': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_top" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#4a3800"/>
        <stop offset="100%" stop-color="#1a1200"/>
      </radialGradient>
      <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff8c0"/>
        <stop offset="30%" stop-color="#ffd700"/>
        <stop offset="70%" stop-color="#ffaa00"/>
        <stop offset="100%" stop-color="#ffd700"/>
      </linearGradient>
      <radialGradient id="glow_top" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffd700" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
      </radialGradient>
      <filter id="f_top">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_top)" stroke="url(#gold_grad)" stroke-width="3"/>
    <circle cx="40" cy="40" r="28" fill="url(#glow_top)"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="url(#gold_grad)" stroke-width="1.5" opacity="0.7"/>
    <!-- Elaborate crown -->
    <path d="M20 46 L20 34 L28 42 L36 26 L40 32 L44 26 L52 42 L60 34 L60 46 Z" fill="none" stroke="url(#gold_grad)" stroke-width="2.5" stroke-linejoin="round" filter="url(#f_top)"/>
    <rect x="20" y="46" width="40" height="5" rx="2" fill="url(#gold_grad)"/>
    <!-- Crown points -->
    <circle cx="28" cy="42" r="3.5" fill="#ffd700" filter="url(#f_top)"/>
    <polygon points="36,26 38,31 40,26 42,31 44,26 42,34 40,30 38,34" fill="#ffd700"/>
    <circle cx="52" cy="42" r="3.5" fill="#ffd700" filter="url(#f_top)"/>
    <!-- Center gem -->
    <polygon points="40,32 44,37 40,45 36,37" fill="url(#gold_grad)" opacity="0.8"/>
    <circle cx="40" cy="38" r="3" fill="#fff8c0"/>
    <!-- "250" text implied by 3 bars + 2 dots -->
    <rect x="33" y="55" width="14" height="3" rx="1.5" fill="url(#gold_grad)"/>
    <!-- 5 stars -->
    <polygon points="40,5 41.2,8.8 45.2,8.8 42.4,11 43.6,14.8 40,12.5 36.4,14.8 37.6,11 34.8,8.8 38.8,8.8" fill="#ffd700" filter="url(#f_top)"/>
    <circle cx="30.5" cy="7.5" r="2.8" fill="#ffd700" opacity="0.9"/>
    <circle cx="49.5" cy="7.5" r="2.8" fill="#ffd700" opacity="0.9"/>
    <circle cx="24" cy="12" r="2" fill="#ffd700" opacity="0.6"/>
    <circle cx="56" cy="12" r="2" fill="#ffd700" opacity="0.6"/>
  </svg>`,

  UNRANKED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <radialGradient id="bg_un" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#1e1e28"/>
        <stop offset="100%" stop-color="#0a0a10"/>
      </radialGradient>
    </defs>
    <path d="M40 4 L70 16 L70 44 Q70 64 40 76 Q10 64 10 44 L10 16 Z" fill="url(#bg_un)" stroke="#444460" stroke-width="2" stroke-dasharray="4 3"/>
    <path d="M40 10 L64 20 L64 44 Q64 60 40 70 Q16 60 16 44 L16 20 Z" fill="none" stroke="#333348" stroke-width="1"/>
    <!-- Question mark -->
    <text x="40" y="46" font-family="Orbitron, monospace" font-size="28" font-weight="900" fill="#444460" text-anchor="middle">?</text>
    <rect x="36" y="54" width="8" height="8" rx="4" fill="#444460" opacity="0.5"/>
  </svg>`,
}

export function getRankIcon(rankName) {
  return RANK_ICONS[rankName] || RANK_ICONS.UNRANKED
}
