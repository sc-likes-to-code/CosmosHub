import React, { useState } from 'react'
import { savePrefs, markOnboarded } from '../utils/personalization'

const INTERESTS = [
  { label: '🚀 Rockets',       value: 'Rockets'     },
  { label: '🇮🇳 ISRO',          value: 'ISRO'        },
  { label: '🌌 Deep Space',     value: 'Deep Space'  },
  { label: '🛰 Satellites',     value: 'Satellites'  },
  { label: '🪐 Exoplanets',     value: 'Exoplanets'  },
  { label: '🏠 ISS',            value: 'ISS'         },
  { label: '🔭 Astrophysics',   value: 'Astrophysics'},
  { label: '🌕 Moon Missions',  value: 'Moon'        },
]

export default function Onboarding({ onDone }) {
  const [selected, setSelected] = useState([])

  function toggleInterest(value) {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  function handleStart() {
    savePrefs(selected)
    markOnboarded()
    onDone(selected)
  }

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-box">
        <div
          className="cosmos-logo"
          style={{ width: 48, height: 48, fontSize: 22, margin: '0 auto .75rem' }}
        >
          🌌
        </div>

        <div className="onboarding-title">Welcome to CosmosHub</div>
        <div className="onboarding-sub">
          Pick your interests so we can personalize your space feed.
        </div>

        <div className="interest-grid">
          {INTERESTS.map(({ label, value }) => (
            <button
              key={value}
              className={`interest-btn${selected.includes(value) ? ' selected' : ''}`}
              onClick={() => toggleInterest(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="onboard-cta" onClick={handleStart}>
          Start Exploring →
        </button>
      </div>
    </div>
  )
}