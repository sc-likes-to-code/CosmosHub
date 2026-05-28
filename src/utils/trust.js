// ── trust.js ─────────────────────────────────────────

const SOURCE_META = {
  'NASA':               { trust: 10, type: 'official', label: 'Verified Source' },
  'NASA JPL':           { trust: 10, type: 'official', label: 'Verified Source' },
  'ESA':                { trust: 10, type: 'official', label: 'Verified Source' },
  'ISRO':               { trust: 10, type: 'official', label: 'Verified Source' },
  'JAXA':               { trust: 10, type: 'official', label: 'Verified Source' },
  'ISS':                { trust: 10, type: 'official', label: 'Verified Source' },
  'SpaceNews':          { trust: 8,  type: 'media',    label: 'Trusted Media'   },
  'ScienceDaily Space': { trust: 8,  type: 'media',    label: 'Trusted Media'   },
  'Space.com':          { trust: 7,  type: 'media',    label: 'Trusted Media'   },
  'Universe Today':     { trust: 7,  type: 'media',    label: 'Trusted Media'   },
  'Astronomy Magazine': { trust: 7,  type: 'media',    label: 'Trusted Media'   },
  'SpacePolicyOnline':   { trust: 7,  type: 'media',    label: 'Trusted Media'   },
  'NOIRLab News':       { trust: 8,  type: 'research', label: 'Trusted Source'  },
}

const FALLBACK_META = { trust: 6, type: 'media', label: 'Trusted Media' }

export function getTrustMeta(sourceName) {
  return SOURCE_META[sourceName] || FALLBACK_META
}