// ── missions.js ──────────────────────────────────────

export const MISSIONS = [
  {
    name:   'Artemis Program',
    agency: 'NASA',
    status: 'active',
    desc:   "NASA's program to return humans to the Moon and establish a sustainable lunar presence by the late 2020s.",
    timeline: [
      { label: 'Artemis I — Uncrewed test flight',      year: '2022',  done: true                    },
      { label: 'Artemis II — Crewed lunar flyby',        year: '2025',  done: false, current: true    },
      { label: 'Artemis III — First crewed Moon landing',year: '2026',  done: false                   },
      { label: 'Lunar Gateway station assembly',         year: '2027+', done: false                   },
    ],
  },
  {
    name:   'Chandrayaan Series',
    agency: 'ISRO',
    status: 'active',
    desc:   "India's lunar exploration program — Chandrayaan-3 successfully landed near the Moon's south pole in 2023.",
    timeline: [
      { label: 'Chandrayaan-1 — Confirmed water ice',   year: '2008',  done: true  },
      { label: 'Chandrayaan-2 — Orbiter operational',   year: '2019',  done: true  },
      { label: 'Chandrayaan-3 — South pole landing',    year: '2023',  done: true  },
      { label: 'Chandrayaan-4 — Lunar sample return',   year: '2027',  done: false },
    ],
  },
  {
    name:   'Starship Program',
    agency: 'SpaceX',
    status: 'active',
    desc:   "SpaceX's fully reusable super-heavy launch system designed for Mars colonization and point-to-point Earth travel.",
    timeline: [
      { label: 'Integrated Flight Test 1',              year: '2023',  done: true                 },
      { label: 'Full stack orbital attempt',            year: '2024',  done: true                 },
      { label: 'Booster catch & reuse demo',            year: '2024',  done: true                 },
      { label: 'Crewed Artemis HLS mission',            year: '2026',  done: false, current: true },
    ],
  },
  {
    name:   'James Webb Space Telescope',
    agency: 'NASA / ESA / CSA',
    status: 'active',
    desc:   'The most powerful space telescope ever built, observing the universe in infrared from the L2 orbit since 2022.',
    timeline: [
      { label: 'Launch from Kourou, French Guiana',     year: '2021',  done: true                 },
      { label: 'Mirror alignment complete',             year: '2022',  done: true                 },
      { label: 'First science images released',         year: '2022',  done: true                 },
      { label: 'Extended mission (10+ years)',          year: '2031',  done: false, current: true },
    ],
  },
  {
    name:   'Gaganyaan',
    agency: 'ISRO',
    status: 'upcoming',
    desc:   "India's first crewed orbital spaceflight program, aiming to send Indian astronauts to low Earth orbit.",
    timeline: [
      { label: 'TV-D1 abort test success',              year: '2023',  done: true                 },
      { label: 'G1 uncrewed test flight',               year: '2024',  done: true                 },
      { label: 'Gaganyaan-1 crewed mission',            year: '2025',  done: false, current: true },
      { label: 'Indian space station — first module',   year: '2028',  done: false                },
    ],
  },
  {
    name:   'Europa Clipper',
    agency: 'NASA',
    status: 'active',
    desc:   "Mission to investigate whether Jupiter's moon Europa could harbor conditions suitable for life.",
    timeline: [
      { label: 'Launch on Falcon Heavy',                year: '2024',  done: true                 },
      { label: 'Mars gravity assist flyby',             year: '2025',  done: true, current: true  },
      { label: 'Jupiter orbit insertion',               year: '2030',  done: false                },
      { label: 'Europa science flybys begin',           year: '2031',  done: false                },
    ],
  },
  {
    name:   'Aditya-L1',
    agency: 'ISRO',
    status: 'active',
    desc:   "India's first solar observation mission, studying the Sun's corona and solar wind from the L1 Lagrange point.",
    timeline: [
      { label: 'Launch from Sriharikota',               year: '2023',  done: true                 },
      { label: 'L1 halo orbit insertion',               year: '2024',  done: true                 },
      { label: 'Solar science operations',              year: '2024',  done: true, current: true  },
      { label: 'Extended mission phase',                year: '2029',  done: false                },
    ],
  },
  {
    name:   'Nancy Grace Roman Telescope',
    agency: 'NASA',
    status: 'upcoming',
    desc:   "NASA's next flagship space telescope, designed to survey the infrared sky 1,000 times faster than Hubble.",
    timeline: [
      { label: 'Mirror and instrument delivery',        year: '2024',  done: true                 },
      { label: 'Spacecraft integration',                year: '2025',  done: false, current: true },
      { label: 'Launch target',                         year: '2026',  done: false                },
      { label: 'First light & science operations',      year: '2027',  done: false                },
    ],
  },
]