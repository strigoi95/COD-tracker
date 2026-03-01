# BO7 Ranked Tracker v2

Tracker avanzado de KD y SR para ranked de Black Ops 7.

## 📁 Estructura de carpetas

```
bo7-tracker/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx                   ← Entry point (aplica tema antes de renderizar)
    ├── App.jsx                    ← Layout principal con grid responsive
    ├── App.module.css
    │
    ├── styles/
    │   └── global.css             ← Variables CSS: dark/light theme, reset
    │
    ├── store/
    │   └── useStore.js            ← Zustand + persist: estado global completo
    │                                 (games, SR, KD, racha, rankHistory, srGoal, theme)
    │
    ├── hooks/
    │   └── useGameForm.js         ← Lógica del formulario
    │
    ├── utils/
    │   └── format.js              ← fmt, fmtSR, kdColor, srColor, timeAgo...
    │
    └── components/
        ├── KDCard            ← KD ratio con colores dinámicos
        ├── SRCard            ← SR actual + rango + barra de progreso
        ├── AddGameForm       ← Formulario (modo KD+SR / solo SR)
        ├── SessionStats      ← Grid de stats + mejor/peor KD
        ├── GameHistory       ← Historial animado con delete
        ├── SRChart           ← Gráfica SVG de evolución SR
        ├── StreakBanner       ← Banner de racha WIN/LOSS con animación
        ├── SRGoal            ← Meta diaria de SR con barra de progreso
        ├── RankHistory       ← Historial de subidas/bajadas de rango
        └── ThemeToggle       ← Switch modo oscuro/claro
```

## 🚀 Instalación

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 🏗️ Build producción

```bash
npm run build
# Output en /dist
```

## ⚙️ Stack

| | |
|---|---|
| React 18 + Vite | UI y bundler |
| Zustand + persist | Estado global en localStorage |
| Framer Motion | Animaciones (entrada, racha, gráfica) |
| CSS Modules | Estilos locales por componente |
| SVG nativo | Gráfica de SR (sin dependencias extra) |

## 🎮 Features v2

- ✅ **Gráfica SVG** de evolución SR con puntos coloreados por resultado
- ✅ **Racha activa** — banner animado de win streak / loss streak (aparece desde ×2)
- ✅ **Modo claro / oscuro** con transición suave, persistido
- ✅ **Meta diaria de SR** con barra de progreso y detección de objetivo alcanzado
- ✅ **Historial de rangos** — registra automáticamente cada subida/bajada de rango
- ✅ **Responsive mejorado** — diseño single-column en móvil
- ✅ **Animaciones elaboradas** — stagger de entrada, spring en números, path drawing en chart
