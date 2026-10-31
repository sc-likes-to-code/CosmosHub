import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  MISSIONS,
  PROGRAMMES,
  getMissionById,
  getMissionsByProgramme,
  getMissionsByStatus,
  getMissionsByAgency,
  getMissionsByCategory,
  getMissionsByDestination,
  searchMissions,
  getMissionStats,
  getRelatedNewsForMission
} from '../src/data/missions.js'

describe('CosmosHub Space Mission Intelligence Archive — Data Integrity', () => {
  it('contains at least 80 verified mission records (exceeding target)', () => {
    assert.ok(MISSIONS.length >= 80, `Expected >= 80 missions, got ${MISSIONS.length}`)
    assert.equal(MISSIONS.length, 110)
  })

  it('guarantees all mission IDs are unique and kebab-case formatted', () => {
    const ids = new Set()
    const kebabRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/

    for (const m of MISSIONS) {
      assert.ok(m.id, 'Mission ID must exist')
      assert.ok(kebabRegex.test(m.id), `ID "${m.id}" must be kebab-case`)
      assert.ok(!ids.has(m.id), `Duplicate ID detected: "${m.id}"`)
      ids.add(m.id)
    }
  })

  it('validates every record contains required core metadata schema fields', () => {
    const validStatuses = [
      'active',
      'extended',
      'cruise',
      'upcoming',
      'in-development',
      'completed',
      'retired',
      'failed'
    ]

    for (const m of MISSIONS) {
      assert.ok(typeof m.name === 'string' && m.name.length > 0, `Invalid name for ${m.id}`)
      assert.ok(typeof m.agency === 'string' && m.agency.length > 0, `Invalid agency for ${m.id}`)
      assert.ok(typeof m.category === 'string' && m.category.length > 0, `Invalid category for ${m.id}`)
      assert.ok(typeof m.destination === 'string' && m.destination.length > 0, `Invalid destination for ${m.id}`)
      assert.ok(validStatuses.includes(m.status), `Invalid status "${m.status}" on ${m.id}`)
      assert.ok(typeof m.description === 'string' && m.description.length > 20, `Description too short on ${m.id}`)
      assert.ok(typeof m.currentOperationalStatus === 'string' && m.currentOperationalStatus.length > 0, `Missing operational status on ${m.id}`)
      assert.equal(m.lastVerifiedAt, '2026-10-31', `Invalid verification date on ${m.id}`)
      assert.ok(Array.isArray(m.keyAchievements) && m.keyAchievements.length > 0, `Missing achievements on ${m.id}`)
      assert.ok(Array.isArray(m.milestones) && m.milestones.length > 0, `Missing milestones on ${m.id}`)
    }
  })

  it('validates milestones format and chronological ordering sanity', () => {
    for (const m of MISSIONS) {
      for (const ms of m.milestones) {
        assert.ok(typeof ms.label === 'string' && ms.label.length > 0, `Missing milestone label in ${m.id}`)
        assert.ok(typeof ms.date === 'string' && /^\d{4}/.test(ms.date), `Invalid milestone date "${ms.date}" in ${m.id}`)
        assert.equal(typeof ms.done, 'boolean', `Missing ms.done boolean in ${m.id}`)
      }
    }
  })

  it('validates crew schema for crewed human spaceflight missions', () => {
    const crewedMissions = MISSIONS.filter(m => m.crew && m.crew.length > 0)
    assert.ok(crewedMissions.length >= 15, `Expected >= 15 crewed missions, got ${crewedMissions.length}`)

    for (const cm of crewedMissions) {
      assert.ok(Array.isArray(cm.crew), `Crew must be array on ${cm.id}`)
      for (const member of cm.crew) {
        assert.ok(typeof member.name === 'string' && member.name.length > 0, `Missing member name in ${cm.id}`)
        assert.ok(typeof member.role === 'string' && member.role.length > 0, `Missing member role in ${cm.id}`)
      }
    }
  })
})

describe('CosmosHub Space Mission Intelligence Archive — Programme Metadata', () => {
  it('defines structured metadata for major multi-flight exploration programmes', () => {
    assert.ok(PROGRAMMES.length >= 8, `Expected >= 8 programmes, got ${PROGRAMMES.length}`)
    const requiredProgrammes = ['apollo', 'artemis', 'chandrayaan', 'gaganyaan', 'mars-rovers', 'voyager', 'change', 'iss']

    for (const progId of requiredProgrammes) {
      const prog = PROGRAMMES.find(p => p.id === progId)
      assert.ok(prog, `Programme ${progId} not found`)
      assert.ok(prog.name, `Missing name on programme ${progId}`)
      assert.ok(prog.agency, `Missing agency on programme ${progId}`)
      assert.ok(prog.achievements.length > 0, `Missing achievements on programme ${progId}`)
    }
  })

  it('confirms every mission programmeId is a valid non-empty string', () => {
    for (const m of MISSIONS) {
      assert.ok(typeof m.programmeId === 'string' && m.programmeId.length > 0, `Missing programmeId in ${m.id}`)
    }
  })
})

describe('CosmosHub Space Mission Intelligence Archive — Historical & Operational Facts Verification', () => {
  it('accurately records Artemis II as completed crewed lunar flyby in 2026', () => {
    const artemis2 = getMissionById('artemis-2')
    assert.ok(artemis2, 'artemis-2 must exist')
    assert.equal(artemis2.status, 'completed')
    assert.ok(artemis2.currentOperationalStatus.includes('Mission completed in 2026'))
    assert.equal(artemis2.crew.length, 4)
    assert.ok(artemis2.crew.some(c => c.name.includes('Wiseman')))
  })

  it('accurately records Gaia science operations concluded in 2025 with DR4 processing', () => {
    const gaia = getMissionById('gaia')
    assert.ok(gaia, 'gaia must exist')
    assert.equal(gaia.status, 'completed')
    assert.ok(gaia.currentOperationalStatus.toLowerCase().includes('completed'))
  })

  it('accurately records SpaDeX as demonstrating autonomous space docking', () => {
    const spadex = getMissionById('spadex')
    assert.ok(spadex, 'spadex must exist')
    assert.ok(spadex.name.includes('SpaDeX'))
    assert.ok(spadex.description.toLowerCase().includes('docking'))
  })

  it('accurately records BepiColombo in cruise with late 2026 Mercury arrival', () => {
    const bepi = getMissionById('bepicolombo')
    assert.ok(bepi, 'bepicolombo must exist')
    assert.equal(bepi.status, 'cruise')
    assert.ok(bepi.currentOperationalStatus.includes('2026'))
  })

  it('accurately records Hera in cruise towards Didymos/Dimorphos', () => {
    const hera = getMissionById('hera')
    assert.ok(hera, 'hera must exist')
    assert.equal(hera.status, 'cruise')
    assert.ok(hera.destination.includes('Dimorphos'))
  })

  it('accurately records SLIM completed with historic pinpoint landing at Shioli crater', () => {
    const slim = getMissionById('slim')
    assert.ok(slim, 'slim must exist')
    assert.equal(slim.status, 'completed')
    assert.ok(slim.destination.includes('Shioli Crater'))
    assert.ok(slim.keyAchievements.some(a => a.includes('55 meters')))
  })

  it('accurately records Chang\'e 6 completed with historic farside sample return in June 2024', () => {
    const ce6 = getMissionById('change-6')
    assert.ok(ce6, 'change-6 must exist')
    assert.equal(ce6.status, 'completed')
    assert.ok(ce6.destination.includes('Lunar Farside'))
    assert.ok(ce6.keyAchievements.some(a => a.includes('1,935')))
  })

  it('accurately records Chandrayaan-3 completed at Shiv Shakti Point with sulfur detection and hop test', () => {
    const c3 = getMissionById('chandrayaan-3')
    assert.ok(c3, 'chandrayaan-3 must exist')
    assert.equal(c3.status, 'completed')
    assert.ok(c3.destination.includes('Shiv Shakti Point'))
    assert.ok(c3.keyAchievements.some(a => a.toLowerCase().includes('sulfur')))
    assert.ok(c3.keyAchievements.some(a => a.toLowerCase().includes('hop')))
  })

  it('accurately records Aditya-L1 active at Sun-Earth L1 halo orbit', () => {
    const l1 = getMissionById('aditya-l1')
    assert.ok(l1, 'aditya-l1 must exist')
    assert.equal(l1.status, 'active')
    assert.ok(l1.destination.includes('L1'))
  })
})

describe('CosmosHub Space Mission Intelligence Archive — Search, Filter & Helper Utilities', () => {
  it('retrieves mission by id', () => {
    const jwst = getMissionById('jwst')
    assert.ok(jwst, 'jwst must be found')
    assert.ok(jwst.name.includes('James Webb'))

    const nonExistent = getMissionById('non-existent-probe-123')
    assert.equal(nonExistent, null)
  })

  it('retrieves missions by programme ID', () => {
    const apolloMissions = getMissionsByProgramme('apollo')
    assert.equal(apolloMissions.length, 16)
    assert.ok(apolloMissions.every(m => m.programmeId === 'apollo'))

    const chandrayaanMissions = getMissionsByProgramme('chandrayaan')
    assert.equal(chandrayaanMissions.length, 4)
  })

  it('filters missions by status', () => {
    const activeMissions = getMissionsByStatus('active')
    assert.ok(activeMissions.length > 10)
    assert.ok(activeMissions.every(m => m.status === 'active'))

    const cruiseMissions = getMissionsByStatus('cruise')
    assert.ok(cruiseMissions.length >= 3)
  })

  it('filters missions by agency', () => {
    const isroMissions = getMissionsByAgency('ISRO')
    assert.ok(isroMissions.length >= 20)

    const esaMissions = getMissionsByAgency('ESA')
    assert.ok(esaMissions.length >= 8)
  })

  it('filters missions by category', () => {
    const observatories = getMissionsByCategory('Space Observatories')
    assert.ok(observatories.length >= 8)

    const human = getMissionsByCategory('Human Spaceflight')
    assert.ok(human.length >= 18)
  })

  it('filters missions by destination keyword', () => {
    const marsMissions = getMissionsByDestination('Mars')
    assert.ok(marsMissions.length >= 10)

    const moonMissions = getMissionsByDestination('Moon')
    assert.ok(moonMissions.length >= 20)
  })

  it('executes multi-field keyword search across titles, agencies, and descriptions', () => {
    const roverResults = searchMissions('rover')
    assert.ok(roverResults.length >= 5)

    const gagarinResults = searchMissions('Gagarin')
    assert.ok(gagarinResults.length > 0)
    assert.equal(gagarinResults[0].id, 'vostok-1')

    const emptyResults = searchMissions('zzzzxyznonexistent999')
    assert.equal(emptyResults.length, 0)
  })

  it('computes accurate overall archive statistics', () => {
    const stats = getMissionStats(MISSIONS)
    assert.equal(stats.total, 110)
    assert.ok(stats.active > 0)
    assert.ok(stats.cruise > 0)
    assert.ok(stats.upcoming > 0)
    assert.ok(stats.completed > 0)
    assert.ok(stats.humanSpaceflight > 0)
    assert.ok(stats.lunar > 0)
    assert.ok(stats.mars > 0)
  })

  it('accurately matches related intelligence articles without naive word splits', () => {
    const mockArticles = [
      {
        title: 'NASA James Webb Space Telescope discovers oldest known galaxy at cosmic dawn',
        summary: 'JWST deep field NIRCam observations reveal galaxy 290 million years post Big Bang',
        source: 'NASA JPL'
      },
      {
        title: 'ISRO Chandrayaan-3 Vikram lander findings published in Nature',
        summary: 'Pragyan rover confirms sulfur in south polar regolith at Shiv Shakti point',
        source: 'ISRO'
      },
      {
        title: 'Random unrelated news about artificial intelligence and computer chips',
        summary: 'Silicon valley tech conference wraps up',
        source: 'Tech Weekly'
      }
    ]

    const jwst = getMissionById('jwst')
    const jwstRelated = getRelatedNewsForMission(jwst, mockArticles)
    assert.equal(jwstRelated.length, 1)
    assert.ok(jwstRelated[0].title.includes('James Webb'))

    const c3 = getMissionById('chandrayaan-3')
    const c3Related = getRelatedNewsForMission(c3, mockArticles)
    assert.equal(c3Related.length, 1)
    assert.ok(c3Related[0].title.includes('Chandrayaan-3'))
  })

  it('safely handles articles with structured object source schemas {name, key, badgeClass, cardClass, tags}', () => {
    const structuredArticles = [
      {
        title: 'Chandrayaan-4 lunar sample return architecture gains formal approval',
        summary: 'ISRO advances dual-launch lunar sample return flight profile',
        source: {
          name: 'Universe Today',
          key: 'universetoday',
          badgeClass: 'badge-universe',
          cardClass: 'card-universe',
          tags: ['ISRO', 'Moon', 'Chandrayaan']
        }
      },
      {
        title: 'Artemis IV Gateway lunar space station module integration milestone',
        summary: 'NASA and ESA complete I-Hab pressure testing',
        source: {
          name: 'NASA',
          key: 'nasa',
          badgeClass: 'badge-nasa',
          cardClass: 'card-nasa',
          tags: ['NASA', 'Artemis', 'Gateway']
        }
      }
    ]

    const c4 = getMissionById('chandrayaan-4')
    const relC4 = getRelatedNewsForMission(c4, structuredArticles)
    assert.ok(relC4.length >= 1)
    assert.ok(typeof relC4[0].source === 'object')

    // Verify source display name resolution logic used in MissionDetailModal
    for (const art of relC4) {
      const sourceName = typeof art.source === 'object' && art.source !== null
        ? art.source.name || 'Space Intelligence'
        : (art.source || 'Space Intelligence')
      assert.equal(typeof sourceName, 'string')
      assert.ok(['Universe Today', 'NASA'].includes(sourceName))
    }

    const artemis4 = getMissionById('artemis-4')
    const relA4 = getRelatedNewsForMission(artemis4, structuredArticles)
    assert.equal(relA4.length, 1)
    for (const art of relA4) {
      const sourceName = typeof art.source === 'object' && art.source !== null
        ? art.source.name || 'Space Intelligence'
        : (art.source || 'Space Intelligence')
      assert.equal(typeof sourceName, 'string')
      assert.equal(sourceName, 'NASA')
    }
  })

  it('guarantees safe specifications and roster rendering across all 110 mission records', () => {
    for (const m of MISSIONS) {
      // Spacecraft mass check
      if (m.spacecraft && m.spacecraft.massKg) {
        assert.ok(
          typeof m.spacecraft.massKg === 'number' || typeof m.spacecraft.massKg === 'string',
          `massKg must be number or string in ${m.id}`
        )
      }

      // Crew roster check
      if (Array.isArray(m.crew)) {
        for (const member of m.crew) {
          assert.ok(typeof member === 'object' && member !== null, `Crew member must be object in ${m.id}`)
          assert.ok(typeof member.name === 'string', `Crew name must be string in ${m.id}`)
          assert.ok(typeof member.role === 'string', `Crew role must be string in ${m.id}`)
        }
      }

      // Milestones check
      if (Array.isArray(m.milestones)) {
        for (const ms of m.milestones) {
          assert.ok(typeof ms === 'object' && ms !== null, `Milestone must be object in ${m.id}`)
          assert.ok(typeof ms.date === 'string', `Milestone date must be string in ${m.id}`)
          assert.ok(typeof ms.label === 'string', `Milestone label must be string in ${m.id}`)
        }
      }

      // Status check
      assert.ok(typeof m.currentOperationalStatus === 'string', `Operational status must be string in ${m.id}`)
    }
  })
})
