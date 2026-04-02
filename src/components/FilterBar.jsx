import React from 'react'

export default function FilterBar({ active, onChange, sources = [] }) {
  const filters = [
    { label: 'All', value: 'all' },
    ...sources.map(name => ({ label: name, value: name })),
  ]

  return (
    <div className="cosmos-filters">
      <span className="filter-label">Source:</span>
      {filters.map(f => (
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