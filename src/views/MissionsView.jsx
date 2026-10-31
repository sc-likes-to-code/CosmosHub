import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  MISSIONS,
  PROGRAMMES,
  getMissionStats,
  searchMissions
} from '../data/missions'
import MissionDetailModal from '../components/MissionDetailModal'
import ErrorBoundary from '../components/ErrorBoundary'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PAGE_SIZE = 24

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

function getStatusBadgeClass(status) {
  const s = (status || '').toLowerCase()
  if (s === 'active' || s === 'extended') return 'status-active'
  if (s === 'cruise') return 'status-cruise'
  if (s === 'upcoming' || s === 'in-development') return 'status-upcoming'
  if (s === 'completed' || s === 'retired') return 'status-completed'
  if (s === 'failed') return 'status-failed'
  return 'status-planned'
}

export default function MissionsView({ articles = [], openModal }) {
  const [localArticles, setLocalArticles] = useState(articles)
  const [selectedMission, setSelectedMission] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'active' | 'upcoming' | 'completed' | 'human' | 'programmes'
  const [selectedAgency, setSelectedAgency] = useState('all')
  const [selectedDestination, setSelectedDestination] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(null)
  const [sortBy, setSortBy] = useState('date-desc') // 'date-desc' | 'date-asc' | 'name-asc' | 'status'
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const cardsContainerRef = useRef(null)

  // Load fallback news if articles array is empty (e.g. direct URL visit)
  useEffect(() => {
    if (articles && articles.length > 0) {
      setLocalArticles(articles)
    } else {
      import('../../data/latest-news.json')
        .then(mod => {
          const data = mod.default || mod
          if (Array.isArray(data)) setLocalArticles(data)
          else if (data && Array.isArray(data.articles)) setLocalArticles(data.articles)
        })
        .catch(() => {})
    }
  }, [articles])

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchQuery, activeTab, selectedAgency, selectedDestination, selectedCategory, selectedProgrammeId, sortBy])

  // Compute overall archive statistics
  const stats = useMemo(() => getMissionStats(MISSIONS), [])

  // Filter missions
  const filteredMissions = useMemo(() => {
    let result = MISSIONS

    // Tab filter
    if (activeTab === 'active') {
      result = result.filter(m => {
        const s = m.status.toLowerCase()
        return s === 'active' || s === 'extended' || s === 'cruise'
      })
    } else if (activeTab === 'upcoming') {
      result = result.filter(m => {
        const s = m.status.toLowerCase()
        return s === 'upcoming' || s === 'in-development'
      })
    } else if (activeTab === 'completed') {
      result = result.filter(m => {
        const s = m.status.toLowerCase()
        return s === 'completed' || s === 'retired' || s === 'failed'
      })
    } else if (activeTab === 'human') {
      result = result.filter(m => m.category === 'Human Spaceflight' || (m.crew && m.crew.length > 0))
    }

    // Programme filter
    if (selectedProgrammeId) {
      result = result.filter(m => m.programmeId === selectedProgrammeId)
    }

    // Agency filter
    if (selectedAgency !== 'all') {
      result = result.filter(m => {
        const matchMain = m.agency.toLowerCase().includes(selectedAgency.toLowerCase())
        const matchPartner = Array.isArray(m.partnerAgencies) &&
          m.partnerAgencies.some(p => p.toLowerCase().includes(selectedAgency.toLowerCase()))
        return matchMain || matchPartner
      })
    }

    // Destination filter
    if (selectedDestination !== 'all') {
      result = result.filter(m =>
        m.destination.toLowerCase().includes(selectedDestination.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(m =>
        m.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Search query filter
    if (searchQuery.trim()) {
      result = searchMissions(searchQuery, result)
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'date-desc') {
        return (b.launchDate || '').localeCompare(a.launchDate || '')
      }
      if (sortBy === 'date-asc') {
        return (a.launchDate || '').localeCompare(b.launchDate || '')
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status)
      }
      return 0
    })

    return result
  }, [
    activeTab,
    selectedProgrammeId,
    selectedAgency,
    selectedDestination,
    selectedCategory,
    searchQuery,
    sortBy
  ])

  const visibleMissions = useMemo(() => {
    return filteredMissions.slice(0, visibleCount)
  }, [filteredMissions, visibleCount])

  const selectedProgramme = useMemo(() => {
    if (!selectedProgrammeId) return null
    return PROGRAMMES.find(p => p.id === selectedProgrammeId) || null
  }, [selectedProgrammeId])

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedAgency !== 'all' ||
    selectedDestination !== 'all' ||
    selectedCategory !== 'all' ||
    selectedProgrammeId !== null ||
    sortBy !== 'date-desc'

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedAgency('all')
    setSelectedDestination('all')
    setSelectedCategory('all')
    setSelectedProgrammeId(null)
    setSortBy('date-desc')
    setActiveTab('all')
  }

  // Animate cards on initial mount or major tab switch
  useEffect(() => {
    if (!cardsContainerRef.current) return
    const cards = cardsContainerRef.current.querySelectorAll('.archive-mission-card')
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: 'power2.out' }
      )
    }
  }, [activeTab, selectedProgrammeId])

  return (
    <div className="missions-archive-container">
      {/* Archive Header & Banner */}
      <header className="archive-hero-header">
        <div className="archive-hero-glow" />
        <div className="archive-hero-content">
          <div className="archive-eyebrow">
            <span className="live-pulse-dot" />
            <span>GLOBAL SPACEFLIGHT REGISTRY • VERIFIED TO 2026</span>
          </div>
          <h1 className="archive-title">Space Mission Intelligence Archive</h1>
          <p className="archive-subtitle">
            Comprehensive historical and operational intelligence catalog covering NASA, ISRO, ESA, JAXA, CNSA,
            historic Soviet programs, and commercial NewSpace initiatives.
          </p>

          {/* Stats Bar */}
          <div className="archive-stats-bar">
            <div className="stat-pill">
              <span className="stat-pill-num">{stats.total}</span>
              <span className="stat-pill-label">Total Missions</span>
            </div>
            <div className="stat-pill active-stat">
              <span className="stat-pill-num">{stats.active}</span>
              <span className="stat-pill-label">Active & Operating</span>
            </div>
            <div className="stat-pill cruise-stat">
              <span className="stat-pill-num">{stats.cruise}</span>
              <span className="stat-pill-label">In Cruise</span>
            </div>
            <div className="stat-pill upcoming-stat">
              <span className="stat-pill-num">{stats.upcoming}</span>
              <span className="stat-pill-label">Upcoming / In-Dev</span>
            </div>
            <div className="stat-pill completed-stat">
              <span className="stat-pill-num">{stats.completed}</span>
              <span className="stat-pill-label">Completed & Historic</span>
            </div>
            <div className="stat-pill human-stat">
              <span className="stat-pill-num">{stats.humanSpaceflight}</span>
              <span className="stat-pill-label">Human Spaceflight</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="archive-view-tabs-bar">
        <div className="archive-tabs-list">
          <button
            className={`archive-tab-btn ${activeTab === 'all' && !selectedProgrammeId ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('all')
              setSelectedProgrammeId(null)
            }}
          >
            All Missions ({stats.total})
          </button>
          <button
            className={`archive-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('active')
              setSelectedProgrammeId(null)
            }}
          >
            Active & Operating ({stats.active + stats.cruise})
          </button>
          <button
            className={`archive-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('upcoming')
              setSelectedProgrammeId(null)
            }}
          >
            Upcoming & In-Dev ({stats.upcoming})
          </button>
          <button
            className={`archive-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('completed')
              setSelectedProgrammeId(null)
            }}
          >
            Completed & Historic ({stats.completed})
          </button>
          <button
            className={`archive-tab-btn ${activeTab === 'human' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('human')
              setSelectedProgrammeId(null)
            }}
          >
            Human Spaceflight ({stats.humanSpaceflight})
          </button>
          <button
            className={`archive-tab-btn ${activeTab === 'programmes' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('programmes')
              setSelectedProgrammeId(null)
            }}
          >
            Programme Archives ({PROGRAMMES.length})
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar (shown for all tabs except Programmes overview) */}
      {activeTab !== 'programmes' && (
        <div className="archive-toolbar">
          <div className="archive-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="archive-search-input"
              placeholder="Search by mission name, agency, spacecraft, destination, crew, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="archive-filters-row">
            {/* Agency Select */}
            <div className="filter-group">
              <label htmlFor="agency-select" className="filter-label">Agency:</label>
              <select
                id="agency-select"
                className="filter-select"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
              >
                <option value="all">All Agencies</option>
                <option value="NASA">NASA (USA)</option>
                <option value="ISRO">ISRO (India)</option>
                <option value="ESA">ESA (Europe)</option>
                <option value="JAXA">JAXA (Japan)</option>
                <option value="CNSA">CNSA / CMSA (China)</option>
                <option value="Soviet">Soviet Space Program / Roscosmos</option>
                <option value="SpaceX">SpaceX / Commercial</option>
                <option value="Intuitive Machines">Intuitive Machines</option>
              </select>
            </div>

            {/* Destination Select */}
            <div className="filter-group">
              <label htmlFor="destination-select" className="filter-label">Destination:</label>
              <select
                id="destination-select"
                className="filter-select"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="all">All Destinations</option>
                <option value="Moon">Moon / Lunar</option>
                <option value="Mars">Mars</option>
                <option value="Sun">The Sun / Heliophysics</option>
                <option value="Jupiter">Jupiter & Moons</option>
                <option value="Saturn">Saturn & Titan</option>
                <option value="Venus">Venus</option>
                <option value="Mercury">Mercury</option>
                <option value="Asteroid">Asteroids & Comets</option>
                <option value="Orbit">Earth Orbit / LEO</option>
                <option value="Lagrange">Lagrange Points (L1/L2)</option>
                <option value="Interstellar">Interstellar Space</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="filter-group">
              <label htmlFor="category-select" className="filter-label">Category:</label>
              <select
                id="category-select"
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Robotic Exploration">Robotic Exploration</option>
                <option value="Human Spaceflight">Human Spaceflight</option>
                <option value="Space Observatories">Space Observatories</option>
                <option value="Earth Observation">Earth Observation</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="filter-group">
              <label htmlFor="sort-select" className="filter-label">Sort By:</label>
              <select
                id="sort-select"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Launch Date (Newest First)</option>
                <option value="date-asc">Launch Date (Oldest First)</option>
                <option value="name-asc">Mission Name (A–Z)</option>
                <option value="status">Mission Status</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button className="reset-filters-btn" onClick={handleResetFilters}>
                Reset Filters ↺
              </button>
            )}
          </div>
        </div>
      )}

      {/* Selected Programme Banner (if filtered to a specific programme) */}
      {selectedProgramme && (
        <div className="selected-programme-banner">
          <div className="programme-banner-main">
            <div className="programme-banner-badge">PROGRAMME DOSSIER</div>
            <h2 className="programme-banner-title">{selectedProgramme.name}</h2>
            <div className="programme-banner-meta">
              <span>🏛️ {selectedProgramme.agency}</span>
              <span>📍 {selectedProgramme.destination}</span>
              <span>🗓️ {selectedProgramme.years}</span>
              <span className={`status-badge-inline ${getStatusBadgeClass(selectedProgramme.status)}`}>
                {selectedProgramme.status.toUpperCase()}
              </span>
            </div>
            <p className="programme-banner-desc">{selectedProgramme.description}</p>
          </div>
          <button
            className="clear-programme-filter-btn"
            onClick={() => setSelectedProgrammeId(null)}
          >
            ✕ View All Archive Missions
          </button>
        </div>
      )}

      {/* VIEW: Programme Archives Showcase */}
      {activeTab === 'programmes' ? (
        <div className="programmes-showcase-view">
          <div className="programmes-showcase-grid">
            {PROGRAMMES.map((prog) => {
              const missionsInProg = MISSIONS.filter(m => m.programmeId === prog.id)

              return (
                <div key={prog.id} className="programme-showcase-card">
                  <div className="programme-card-top">
                    <span className="programme-agency-pill">{prog.agency}</span>
                    <span className={`mission-status-badge ${getStatusBadgeClass(prog.status)}`}>
                      {prog.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="programme-card-title">{prog.name}</h3>
                  <div className="programme-card-meta">
                    <span>📍 {prog.destination}</span>
                    <span>🗓️ {prog.years}</span>
                    <span>🚀 {missionsInProg.length} Missions Cataloged</span>
                  </div>
                  <p className="programme-card-desc">{prog.description}</p>

                  <div className="programme-card-achievements">
                    <div className="achievements-heading">Programme Highlights:</div>
                    <ul>
                      {prog.achievements.slice(0, 3).map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="programme-card-footer">
                    <button
                      className="btn-inspect-programme"
                      onClick={() => {
                        setSelectedProgrammeId(prog.id)
                        setActiveTab('all')
                      }}
                    >
                      Explore {missionsInProg.length} Missions →
                    </button>
                    {prog.officialUrl && (
                      <a
                        href={prog.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="programme-ext-link"
                        title="Official portal"
                      >
                        Portal ↗
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* VIEW: Mission Cards Grid */
        <div className="archive-missions-results">
          {/* Results count indicator */}
          <div className="results-counter-strip">
            <span>
              Showing {visibleMissions.length} of {filteredMissions.length} space missions
              {filteredMissions.length < stats.total && ` (filtered from ${stats.total} total)`}
            </span>
          </div>

          {filteredMissions.length === 0 ? (
            <div className="no-missions-found">
              <div className="no-missions-icon">🛰️</div>
              <h3>No missions matched your criteria</h3>
              <p>Try broadening your search query or resetting filters.</p>
              <button className="reset-filters-btn" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="archive-missions-grid" ref={cardsContainerRef}>
              {visibleMissions.map((mission) => {
                const statusCls = getStatusBadgeClass(mission.status)

                // Pick key milestones for mini preview
                const lastDone = mission.milestones
                  ? [...mission.milestones].reverse().find(m => m.done)
                  : null
                const nextPending = mission.milestones
                  ? mission.milestones.find(m => !m.done || m.current)
                  : null

                return (
                  <div
                    key={mission.id}
                    className="archive-mission-card"
                    onClick={() => setSelectedMission(mission)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setSelectedMission(mission)
                    }}
                  >
                    {/* Card Header */}
                    <div className="card-top-row">
                      <span className="card-agency-label">{mission.agency}</span>
                      <span className={`mission-status-badge ${statusCls}`}>
                        <span className="status-indicator-dot" />
                        {mission.status ? mission.status.toUpperCase() : 'UNKNOWN'}
                      </span>
                    </div>

                    <h3 className="card-mission-title">{mission.name}</h3>

                    {/* Metadata Tags */}
                    <div className="card-tags-row">
                      <span className="mini-tag">📍 {mission.destination}</span>
                      <span className="mini-tag">🚀 {mission.launchVehicle || 'Rocket'}</span>
                      <span className="mini-tag">🗓️ {formatDate(mission.launchDate)}</span>
                    </div>

                    {/* Description Excerpt */}
                    <p className="card-mission-desc">{mission.description}</p>

                    {/* Operational Highlight */}
                    <div className="card-operational-highlight">
                      <span className="highlight-label">STATUS:</span>
                      <span className="highlight-text">{mission.currentOperationalStatus}</span>
                    </div>

                    {/* Mini Milestone Preview */}
                    <div className="card-milestone-preview">
                      {lastDone && (
                        <div className="mini-milestone done">
                          <span className="mini-dot done" />
                          <span className="mini-label">{lastDone.label}</span>
                        </div>
                      )}
                      {nextPending && nextPending !== lastDone && (
                        <div className="mini-milestone current">
                          <span className="mini-dot current" />
                          <span className="mini-label">{nextPending.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Action Footer */}
                    <div className="card-action-footer">
                      <span className="action-inspect-link">
                        Inspect Intelligence File →
                      </span>
                      {mission.crew && mission.crew.length > 0 && (
                        <span className="crew-indicator" title="Crewed mission">
                          👨‍🚀 {mission.crew.length} Crew
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Progressive Load More Button */}
          {visibleCount < filteredMissions.length && (
            <div className="load-more-section">
              <button
                className="btn-load-more"
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
              >
                Load More Missions ({visibleMissions.length} of {filteredMissions.length})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mission Detail Modal */}
      <ErrorBoundary onReset={() => setSelectedMission(null)}>
        <MissionDetailModal
          mission={selectedMission}
          isOpen={!!selectedMission}
          onClose={() => setSelectedMission(null)}
          articles={localArticles}
          onSelectProgramme={(progId) => {
            setSelectedProgrammeId(progId)
            setActiveTab('all')
          }}
          openModal={openModal}
        />
      </ErrorBoundary>
    </div>
  )
}
