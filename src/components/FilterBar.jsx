import React from 'react'

const FILTERS = [
  { label: 'All',           value: 'all'          },
  { label: 'NASA',          value: 'NASA'          },
  { label: 'ISRO',          value: 'ISRO'          },
  { label: 'ESA',           value: 'ESA'           },
  { label: 'JAXA',          value: 'JAXA'          },
  { label: 'Space.com',     value: 'Space.com'     },
  { label: 'Universe Today',value: 'Universe Today'},
  { label: 'ISS',           value: 'ISS'           },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="cosmos-filters">
      <span className="filter-label">Agency:</span>
      {FILTERS.map(f => (
        <button
          key={f.value}
          className={`filter-btn${active === f.value ? ' active' : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}