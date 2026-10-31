/**
 * CosmosHub Space Mission Intelligence Archive
 * Comprehensive, verified catalog of human and robotic space exploration missions.
 * Last verified: 2026-10-31
 */

export const PROGRAMMES = [
  {
    "id": "apollo",
    "name": "Apollo Programme",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "years": "1961 – 1972",
    "description": "The historic United States human spaceflight programme that succeeded in landing the first humans on the Moon on July 20, 1969, and returned 382 kg of lunar rocks and soil across six landing missions.",
    "achievements": [
      "Landed 12 humans on the lunar surface between 1969 and 1972",
      "Returned 382 kilograms (842 pounds) of lunar material across Apollo 11, 12, 14, 15, 16, and 17",
      "Developed the Saturn V rocket, the most powerful launch vehicle successfully flown in the 20th century",
      "Pioneered lunar roving vehicles, deep space navigation, spacesuits, and biomedical telemetry"
    ],
    "missionCount": 15,
    "officialUrl": "https://www.nasa.gov/the-apollo-program/"
  },
  {
    "id": "artemis",
    "name": "Artemis Programme",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA",
      "JAXA",
      "CSA",
      "ISRO"
    ],
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "active",
    "years": "2017 – Present",
    "description": "NASA's multi-national exploration programme to land the first woman and first person of color on the Moon, explore the lunar South Pole, and establish a permanent sustainable cislunar presence as a stepping stone to Mars.",
    "achievements": [
      "Completed uncrewed lunar distant retrograde orbit mission with Orion and SLS on Artemis I (2022)",
      "Completed historic crewed lunar flyby on Artemis II in 2026",
      "Mobilized global international coalition under the Artemis Accords",
      "Integrated commercial lunar landers and Lunar Gateway space station development"
    ],
    "missionCount": 4,
    "officialUrl": "https://www.nasa.gov/specials/artemis/"
  },
  {
    "id": "chandrayaan",
    "name": "Chandrayaan Programme",
    "agency": "ISRO",
    "partnerAgencies": [
      "NASA",
      "JAXA"
    ],
    "category": "Lunar Exploration",
    "destination": "Moon",
    "status": "active",
    "years": "2008 – Present",
    "description": "India's premier lunar exploration programme, achieving orbital chemical mapping, the definitive discovery of lunar water molecules, and the historic first successful soft landing in the Moon's southern polar region.",
    "achievements": [
      "Confirmed the presence of water molecules (H2O and OH) on the lunar surface with Chandrayaan-1",
      "Operational high-resolution orbital mapping of the Moon by the Chandrayaan-2 orbiter (sub-0.3m OHRC)",
      "Historic first soft landing near the lunar south pole (69.37° S) by Chandrayaan-3 Vikram lander on August 23, 2023",
      "Demonstrated autonomous lunar rover roving (Pragyan) and first in-situ lunar hop test of a lander"
    ],
    "missionCount": 4,
    "officialUrl": "https://www.isro.gov.in/SpacecraftMissions.html"
  },
  {
    "id": "gaganyaan",
    "name": "Gaganyaan Programme",
    "agency": "ISRO",
    "partnerAgencies": [
      "Indian Air Force",
      "Indian Navy"
    ],
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "in-development",
    "years": "2018 – Present",
    "description": "India's flagship human spaceflight programme designed to demonstrate indigenous human spaceflight capability by launching an astronaut crew to a 400 km low Earth orbit for a 3-day mission and returning them safely to Indian waters.",
    "achievements": [
      "Successful qualification of human-rated LVM3 (HLVM3) solid, liquid, and cryogenic stages",
      "Successful execution of Flight Test Vehicle Abort Mission-1 (TV-D1) demonstrating crew escape system (Oct 2023)",
      "Selection and intensive training of four Indian Air Force astronaut designates",
      "Development of humanoid robotic test astronaut Vyommitra for uncrewed orbital qualification flights"
    ],
    "missionCount": 3,
    "officialUrl": "https://www.isro.gov.in/Gaganyaan.html"
  },
  {
    "id": "mars-rovers",
    "name": "NASA Mars Exploration Rover Programme",
    "agency": "NASA",
    "category": "Robotic Exploration",
    "destination": "Mars",
    "status": "active",
    "years": "1996 – Present",
    "description": "NASA's multi-decade robotic surface exploration of Mars across five successive generations of roving scientific laboratories: Sojourner, Spirit, Opportunity, Curiosity, and Perseverance.",
    "achievements": [
      "First mobile vehicle on Mars (Sojourner on Mars Pathfinder, 1997)",
      "Proof of persistent ancient liquid water on Mars (Opportunity at Meridiani Planum, 2004)",
      "Discovery of ancient organic carbon molecules and habitable paleolake environment in Gale Crater (Curiosity, 2012–present)",
      "Sealing 25+ hermetic rock core sample tubes for Mars Sample Return in Jezero Crater (Perseverance, 2021–present)",
      "First powered, controlled flight on another planet by Ingenuity Mars Helicopter (72 flights, 2021–2024)"
    ],
    "missionCount": 7,
    "officialUrl": "https://science.nasa.gov/mars/"
  },
  {
    "id": "voyager",
    "name": "Voyager Interstellar Mission",
    "agency": "NASA",
    "category": "Robotic Exploration",
    "destination": "Interstellar Space",
    "status": "active",
    "years": "1977 – Present",
    "description": "NASA's twin robotic spacecraft that completed the historic 'Grand Tour' of the outer solar system and became the first human-made objects to cross the heliopause into interstellar space.",
    "achievements": [
      "Only spacecraft to visit all four outer giant planets (Voyager 2: Jupiter, Saturn, Uranus, Neptune)",
      "First human-made spacecraft to enter interstellar space (Voyager 1 in August 2012; Voyager 2 in November 2018)",
      "Discovered active volcanoes on Io, complex ring structures, dozens of new moons, and Neptune's Great Dark Spot",
      "Operating for over 49 continuous years, sending telemetry across more than 24 billion kilometers"
    ],
    "missionCount": 2,
    "officialUrl": "https://voyager.jpl.nasa.gov/"
  },
  {
    "id": "change",
    "name": "Chang'e Lunar Exploration Programme",
    "agency": "CNSA",
    "category": "Robotic Exploration",
    "destination": "Moon",
    "status": "active",
    "years": "2004 – Present",
    "description": "China's progressive robotic lunar exploration initiative advancing systematically through orbital observation, surface soft landings, robotic roving, and lunar sample returns from both the near and far sides of the Moon.",
    "achievements": [
      "First soft landing on the far side of the Moon with Chang'e 4 and Yutu-2 in Von Kármán crater (2019)",
      "First Chinese lunar sample return from Oceanus Procellarum with Chang'e 5 (2020)",
      "Historic world-first sample return from the lunar far side South Pole-Aitken Basin with Chang'e 6 (June 2024)",
      "Established stable lunar relay communication network via Queqiao relay satellites at Earth-Moon L2"
    ],
    "missionCount": 2,
    "officialUrl": "https://www.cnsa.gov.cn/"
  },
  {
    "id": "iss",
    "name": "International Space Station Programme",
    "agency": "International Partnerships",
    "partnerAgencies": [
      "NASA",
      "Roscosmos",
      "ESA",
      "JAXA",
      "CSA"
    ],
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "active",
    "years": "1998 – Present",
    "description": "The largest human-made structure in space, a modular microgravity research laboratory permanently inhabited by rotating international astronaut crews since November 2, 2000.",
    "achievements": [
      "Over 25 continuous years of human presence in low Earth orbit",
      "Over 3,000 microgravity scientific investigations conducted across biology, physics, human physiology, and materials",
      "Assembled across more than 40 complex orbital construction and spacewalk missions",
      "Served as the orbital cornerstone for international commercial crew and cargo spaceflight"
    ],
    "missionCount": 1,
    "officialUrl": "https://www.nasa.gov/international-space-station/"
  },
  {
    "id": "great-observatories",
    "name": "Great Observatories & Flagship Astrophysics",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA",
      "CSA"
    ],
    "category": "Space Observatories",
    "destination": "Lagrange Points & Earth Orbit",
    "status": "active",
    "years": "1990 – Present",
    "description": "NASA's flagship astronomical space telescopes surveying the cosmos across optical, infrared, ultraviolet, and X-ray wavelengths to answer fundamental questions about the birth, structure, and fate of the universe.",
    "achievements": [
      "Hubble Space Telescope demonstrated the accelerating expansion of the universe and deep cosmological imaging",
      "Chandra X-ray Observatory provided direct empirical proof of Dark Matter in the Bullet Cluster",
      "James Webb Space Telescope discovered the earliest galaxies formed after the Big Bang and probed exoplanetary atmospheres",
      "Nancy Grace Roman Space Telescope under development to survey dark energy and exoplanet microlensing"
    ],
    "missionCount": 4,
    "officialUrl": "https://science.nasa.gov/astrophysics/"
  },
  {
    "id": "commercial-crew",
    "name": "Commercial Crew & Cargo Programme",
    "agency": "NASA / Commercial Partners",
    "partnerAgencies": [
      "SpaceX",
      "Boeing",
      "Axiom Space"
    ],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (ISS)",
    "status": "active",
    "years": "2010 – Present",
    "description": "NASA's public-private partnership model facilitating regular American commercial transport of astronauts and research cargo to and from the International Space Station.",
    "achievements": [
      "Restored sovereign orbital human launch capability to the United States with SpaceX Demo-2 in May 2020",
      "Safely transported dozens of government and commercial astronauts to the ISS aboard Crew Dragon",
      "Pioneered private commercial orbital astronaut missions (Axiom missions Ax-1 through Ax-4)"
    ],
    "missionCount": 2,
    "officialUrl": "https://www.nasa.gov/commercial-crew-program/"
  },
  {
    "id": "commercial-clps",
    "name": "Commercial Lunar Payload Services (CLPS)",
    "agency": "NASA",
    "partnerAgencies": [
      "Intuitive Machines",
      "Astrobotic",
      "Firefly Aerospace"
    ],
    "category": "Robotic Exploration",
    "destination": "Moon",
    "status": "active",
    "years": "2018 – Present",
    "description": "NASA's initiative contracting commercial robotic landers to deliver science instruments, technology demonstrators, and resource prospecting rovers to the lunar surface in support of the Artemis program.",
    "achievements": [
      "Achieved first commercial lunar soft landing with Intuitive Machines IM-1 Odysseus at Malapert A crater (Feb 2024)",
      "First American lunar soft landing in 51 years since Apollo 17",
      "Delivered suite of radio, laser retroreflector, and space weather instruments to the lunar south polar region"
    ],
    "missionCount": 2,
    "officialUrl": "https://www.nasa.gov/commercial-lunar-payload-services/"
  }
];

export const MISSIONS = [
  {
    "id": "apollo-1",
    "name": "Apollo 1",
    "alternateNames": [
      "AS-204"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "failed",
    "launchDate": "1967-01-27",
    "endDate": "1967-01-27",
    "launchVehicle": "Saturn IB",
    "missionType": "Crewed Low Earth Orbit Test (Pre-flight simulation)",
    "missionDuration": "0 days (pre-launch test failure)",
    "description": "Tragic pre-launch test fire on Launch Pad 34 at Cape Kennedy. During a plugs-out simulated countdown test on January 27, 1967, a flash fire broke out in the pure oxygen command module cabin, claiming the lives of Command Pilot Virgil I. \"Gus\" Grissom, Senior Pilot Edward H. White II, and Pilot Roger B. Chaffee. The disaster prompted comprehensive redesigns of the Apollo Command Module spacecraft, wiring insulation, quick-opening hatch mechanisms, and environmental control systems.",
    "scientificObjectives": [
      "Perform maiden crewed flight of the Apollo Command and Service Module (Block I)",
      "Evaluate launch operations and command module systems in low Earth orbit",
      "Verify life support, guidance, and ground tracking networks"
    ],
    "keyAchievements": [
      "Catalyzed sweeping safety and engineering reforms across the Apollo spacecraft and NASA safety culture",
      "Led to development of the outward-opening quick-release unified hatch capable of egress in under 5 seconds",
      "Eliminated flammable nylon and materials from cockpit cabins and reduced high-pressure pure oxygen hazard on pad"
    ],
    "milestones": [
      {
        "label": "Apollo Command Module delivered to Kennedy Space Center",
        "date": "1966-08-26",
        "done": true
      },
      {
        "label": "Spacecraft mated to Saturn IB launch vehicle on Pad 34",
        "date": "1967-01-06",
        "done": true
      },
      {
        "label": "Plugs-out simulated countdown test began",
        "date": "1967-01-27",
        "done": true
      },
      {
        "label": "Flash fire reported inside cockpit; crew perished",
        "date": "1967-01-27",
        "done": true
      },
      {
        "label": "Apollo 204 Review Board convened by Administrator Webb",
        "date": "1967-01-28",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Virgil I. \"Gus\" Grissom",
        "role": "Command Pilot"
      },
      {
        "name": "Edward H. White II",
        "role": "Senior Pilot"
      },
      {
        "name": "Roger B. Chaffee",
        "role": "Pilot"
      }
    ],
    "spacecraft": "Apollo Command Module CSM-012",
    "currentOperationalStatus": "Mission failed during ground simulation. The Command Module is preserved in safe storage at NASA Langley Research Center.",
    "historicalSignificance": "The tragedy of Apollo 1 humbled NASA and forged the exacting engineering discipline, redesigned spacecraft, and uncompromising flight safety culture that ultimately enabled human lunar landings.",
    "latestKnownUpdate": "Permanent memorial established at Space Launch Complex 34 at Cape Canaveral Space Force Station.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-1/",
    "relatedNewsTags": [
      "Apollo",
      "Apollo 1",
      "NASA history",
      "Cape Canaveral"
    ],
    "tags": [
      "Apollo",
      "NASA",
      "Human Spaceflight",
      "Apollo 1",
      "Historical"
    ]
  },
  {
    "id": "apollo-4",
    "name": "Apollo 4",
    "alternateNames": [
      "AS-501"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1967-11-09",
    "endDate": "1967-11-09",
    "launchVehicle": "Saturn V (SA-501)",
    "missionType": "Uncrewed Saturn V Launch Vehicle & Heat Shield Qualification",
    "missionDuration": "8 hours, 36 minutes",
    "description": "First test flight of the massive Saturn V three-stage launch vehicle under George Mueller’s \"all-up\" testing philosophy. Successfully propelled Apollo Command and Service Module CSM-017 into Earth orbit and ignited the S-IVB third stage twice before performing a high-speed simulated lunar re-entry to test the heat shield at 40,000 km/h.",
    "scientificObjectives": [
      "Demonstrate structural and aerodynamic integrity of the Saturn V launch vehicle and launch umbilical tower",
      "Demonstrate S-IVB third stage restart in low Earth orbit",
      "Evaluate Apollo Command Module heat shield performance under lunar return velocity conditions"
    ],
    "keyAchievements": [
      "First launch of the 363-foot-tall Saturn V rocket from Launch Complex 39A",
      "Successful reignition of the liquid hydrogen/liquid oxygen J-2 engine in vacuum",
      "Command Module heat shield withstood 2,760°C during re-entry at 11.1 km/s"
    ],
    "milestones": [
      {
        "label": "Liftoff from Launch Complex 39A",
        "date": "1967-11-09",
        "done": true
      },
      {
        "label": "First stage S-IC separation",
        "date": "1967-11-09",
        "done": true
      },
      {
        "label": "Second burn of S-IVB stage into high apogee orbit",
        "date": "1967-11-09",
        "done": true
      },
      {
        "label": "Service Propulsion System burn to accelerate re-entry",
        "date": "1967-11-09",
        "done": true
      },
      {
        "label": "Splashdown in Pacific Ocean northwest of Hawaii",
        "date": "1967-11-09",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Apollo CSM-017 / LTA-10R",
    "currentOperationalStatus": "Mission completed successfully. Command Module on public display at NASA Stennis Space Center.",
    "historicalSignificance": "Proved that the colossal Saturn V rocket was sound and validated the all-up testing philosophy that saved years of iterative development.",
    "latestKnownUpdate": "Confirmed historical baseline for super-heavy launch vehicle operations.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-113A",
    "relatedNewsTags": [
      "Apollo 4",
      "Saturn V",
      "NASA",
      "Kennedy Space Center"
    ],
    "tags": [
      "Apollo",
      "Saturn V",
      "Apollo 4",
      "Heavy Lift",
      "Uncrewed"
    ]
  },
  {
    "id": "apollo-5",
    "name": "Apollo 5",
    "alternateNames": [
      "AS-204 (LM)",
      "LM-1"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1968-01-22",
    "endDate": "1968-01-23",
    "launchVehicle": "Saturn IB (SA-204)",
    "missionType": "Uncrewed Lunar Module Orbital & Descent/Ascent Propulsion Test",
    "missionDuration": "7 hours, 50 minutes (primary mission)",
    "description": "First uncrewed flight test of the Apollo Lunar Module (LM-1) in Earth orbit. Verified the Grumman-built descent stage propulsion system, the throttling descent engine, and executed the critical \"fire-in-the-hole\" abort staging test where the ascent stage ignited while still mated to the descent stage.",
    "scientificObjectives": [
      "Verify operation of the descent propulsion system including variable throttle engine",
      "Verify ascent propulsion system and stage separation under abort conditions",
      "Evaluate Lunar Module guidance and structural loads in space"
    ],
    "keyAchievements": [
      "Demonstrated first in-space firing of a throttleable rocket engine",
      "Successfully executed fire-in-the-hole ascent stage abort ignition",
      "Qualified the Lunar Module for crewed operations without requiring a second uncrewed test flight"
    ],
    "milestones": [
      {
        "label": "Liftoff from Launch Complex 37B",
        "date": "1968-01-22",
        "done": true
      },
      {
        "label": "LM-1 separated from Saturn IB S-IVB stage",
        "date": "1968-01-22",
        "done": true
      },
      {
        "label": "Descent engine firing and throttle test",
        "date": "1968-01-22",
        "done": true
      },
      {
        "label": "Fire-in-the-hole ascent engine ignition",
        "date": "1968-01-23",
        "done": true
      },
      {
        "label": "Atmospheric re-entry of ascent stage over Pacific",
        "date": "1968-01-24",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Lunar Module LM-1",
    "currentOperationalStatus": "Mission completed successfully. Stages disintegrated during planned atmospheric re-entry.",
    "historicalSignificance": "Proved the safety and functionality of the most complex vehicle of the Apollo programme, clearing the way for crewed Lunar Module testing.",
    "latestKnownUpdate": "Confirmed historical baseline for lunar lander propulsion qualification.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1968-007A",
    "relatedNewsTags": [
      "Apollo 5",
      "Lunar Module",
      "Grumman",
      "ISRO"
    ],
    "tags": [
      "Apollo",
      "Lunar Module",
      "Apollo 5",
      "Propulsion"
    ]
  },
  {
    "id": "apollo-6",
    "name": "Apollo 6",
    "alternateNames": [
      "AS-502"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1968-04-04",
    "endDate": "1968-04-04",
    "launchVehicle": "Saturn V (SA-502)",
    "missionType": "Uncrewed Saturn V Final Qualification Flight",
    "missionDuration": "9 hours, 57 minutes",
    "description": "Second and final uncrewed test flight of the Saturn V. Despite severe pogo oscillations during S-IC first-stage burn and premature shutdown of two second-stage J-2 engines due to propellant line rupture, onboard guidance compensated and the spacecraft verified Command Module high-speed entry capabilities.",
    "scientificObjectives": [
      "Demonstrate Saturn V launch vehicle capabilities under second flight conditions",
      "Demonstrate trans-lunar injection capability of S-IVB stage",
      "Evaluate Command Module heat shield at extreme re-entry velocity"
    ],
    "keyAchievements": [
      "Isolated and cured the severe pogo resonance through hydraulic accumulator dampers in F-1 engine LOX lines",
      "Resolved J-2 fuel line flex-joint vacuum stress failures, certifying engines for human flight",
      "Recovered Command Module safely in Pacific Ocean after 9 hours, 57 minutes"
    ],
    "milestones": [
      {
        "label": "Launch from LC-39A",
        "date": "1968-04-04",
        "done": true
      },
      {
        "label": "Pogo oscillations recorded on S-IC stage",
        "date": "1968-04-04",
        "done": true
      },
      {
        "label": "Premature cutoff of J-2 engines 2 and 3 on S-II stage",
        "date": "1968-04-04",
        "done": true
      },
      {
        "label": "Command Module splashdown in North Pacific",
        "date": "1968-04-04",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Apollo CSM-020 / LTA-2R",
    "currentOperationalStatus": "Mission completed. Command Module on display at Fernbank Science Center in Atlanta, Georgia.",
    "historicalSignificance": "Though marred by propulsion anomalies, prompt root-cause resolutions gave NASA leadership confidence to proceed directly to crewed flights on Apollo 7 and Apollo 8.",
    "latestKnownUpdate": "Pogo dampener designs developed for Apollo 6 remain foundational to modern rocket engineering.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1968-025A",
    "relatedNewsTags": [
      "Apollo 6",
      "Saturn V",
      "NASA"
    ],
    "tags": [
      "Apollo",
      "Saturn V",
      "Apollo 6",
      "Uncrewed"
    ]
  },
  {
    "id": "apollo-7",
    "name": "Apollo 7",
    "alternateNames": [
      "AS-205"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1968-10-11",
    "endDate": "1968-10-22",
    "launchVehicle": "Saturn IB (SA-205)",
    "missionType": "First Crewed Apollo Flight / CSM Orbital Shakedown",
    "missionDuration": "10 days, 20 hours, 9 minutes",
    "description": "First crewed mission of the Apollo programme and the first American spaceflight with a three-person crew. Successfully flight-qualified the redesigned Block II Command and Service Module, completed eight Service Propulsion System burns with pinpoint accuracy, and conducted the first live television broadcasts from an American spacecraft.",
    "scientificObjectives": [
      "Demonstrate crew and redesigned Block II CSM performance in low Earth orbit for 11 days",
      "Demonstrate Service Propulsion System restarts and orbital navigation",
      "Perform optical rendezvous with Saturn IB S-IVB spent stage"
    ],
    "keyAchievements": [
      "Flawlessly executed 8 Service Propulsion System burns totaling over 10 minutes of firings",
      "First live television broadcasts from an American spacecraft (\"Wally, Walt, and Donn Show\")",
      "Achieved all primary mission objectives and certified the Command Module for lunar transit"
    ],
    "milestones": [
      {
        "label": "Liftoff from Launch Complex 34",
        "date": "1968-10-11",
        "done": true
      },
      {
        "label": "First live television broadcast from space",
        "date": "1968-10-14",
        "done": true
      },
      {
        "label": "First of eight Service Propulsion System burns",
        "date": "1968-10-12",
        "done": true
      },
      {
        "label": "Splashdown in Atlantic Ocean south-southwest of Bermuda",
        "date": "1968-10-22",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Walter M. Schirra Jr.",
        "role": "Commander"
      },
      {
        "name": "Donn F. Eisele",
        "role": "Command Module Pilot"
      },
      {
        "name": "R. Walter Cunningham",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "Apollo Command Module CSM-101",
    "currentOperationalStatus": "Mission completed. Command Module on display at the Frontiers of Flight Museum in Dallas, Texas.",
    "historicalSignificance": "Returned American astronauts to flight after the Apollo 1 disaster and proved the Apollo Command and Service Module was ready to voyage to the Moon.",
    "latestKnownUpdate": "Historical milestone for crewed space vehicle shakedown.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-7/",
    "relatedNewsTags": [
      "Apollo 7",
      "Wally Schirra",
      "NASA",
      "Apollo"
    ],
    "tags": [
      "Apollo",
      "Apollo 7",
      "Human Spaceflight",
      "Earth Orbit"
    ]
  },
  {
    "id": "apollo-8",
    "name": "Apollo 8",
    "alternateNames": [
      "AS-503"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1968-12-21",
    "endDate": "1968-12-27",
    "launchVehicle": "Saturn V (SA-503)",
    "missionType": "First Crewed Lunar Orbital Flight",
    "missionDuration": "6 days, 3 hours, 0 minutes",
    "description": "First crewed mission to leave low Earth orbit, reach another celestial body, and enter orbit around the Moon. On Christmas Eve 1968, Frank Borman, James Lovell, and William Anders completed 10 lunar revolutions, broadcast the famous Genesis reading to a worldwide audience, and captured the epochal \"Earthrise\" photograph.",
    "scientificObjectives": [
      "Demonstrate translunar injection, lunar orbit insertion, and trans-Earth injection of crewed CSM",
      "Perform extensive reconnaissance of potential lunar landing sites including Mare Tranquillitatis",
      "Verify deep space tracking and telecommunications networks across cislunar distances"
    ],
    "keyAchievements": [
      "First humans to escape Earth’s gravitational well and orbit another world (10 lunar revolutions)",
      "Captured iconic \"Earthrise\" photograph (AS08-14-2383), transforming human planetary consciousness",
      "Flawless Trans-Earth Injection burn behind the far side of the Moon ensuring safe return home"
    ],
    "milestones": [
      {
        "label": "Liftoff from Launch Complex 39A",
        "date": "1968-12-21",
        "done": true
      },
      {
        "label": "Translunar Injection (TLI) burn performed",
        "date": "1968-12-21",
        "done": true
      },
      {
        "label": "Lunar Orbit Insertion behind the Moon",
        "date": "1968-12-24",
        "done": true
      },
      {
        "label": "Famous Christmas Eve Genesis broadcast and Earthrise photo",
        "date": "1968-12-24",
        "done": true
      },
      {
        "label": "Trans-Earth Injection burn executed behind Moon",
        "date": "1968-12-25",
        "done": true
      },
      {
        "label": "Splashdown in North Pacific Ocean near USS Yorktown",
        "date": "1968-12-27",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Frank Borman",
        "role": "Commander"
      },
      {
        "name": "James A. Lovell Jr.",
        "role": "Command Module Pilot"
      },
      {
        "name": "William A. Anders",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "Apollo Command Module CSM-103",
    "currentOperationalStatus": "Mission completed. Command Module on display at Museum of Science and Industry in Chicago, Illinois.",
    "historicalSignificance": "One of humankind’s greatest exploration triumphs; fundamentally altered geopolitics during the Space Race and positioned Apollo 11 for a landing attempt.",
    "latestKnownUpdate": "Celebrated worldwide as the turning point of 20th century human space exploration.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-8/",
    "relatedNewsTags": [
      "Apollo 8",
      "Earthrise",
      "Moon",
      "Frank Borman"
    ],
    "tags": [
      "Apollo",
      "Apollo 8",
      "Earthrise",
      "Lunar Orbit",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-9",
    "name": "Apollo 9",
    "alternateNames": [
      "AS-504",
      "Gumdrop and Spider"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1969-03-03",
    "endDate": "1969-03-13",
    "launchVehicle": "Saturn V (SA-504)",
    "missionType": "First Crewed Flight of Complete Apollo Stack with Lunar Module in Earth Orbit",
    "missionDuration": "10 days, 1 hour, 0 minutes",
    "description": "First crewed flight test of the complete Apollo spacecraft stack, including the Command/Service Module \"Gumdrop\" and the Lunar Module \"Spider\". James McDivitt and Russell Schweickart undocked and flew Spider up to 185 km away from Gumdrop before executing rendezvous and docking, while Schweickart performed the first EVA in an Apollo lunar spacesuit with the Portable Life Support System (PLSS) backpack.",
    "scientificObjectives": [
      "Demonstrate crewed operation, separation, rendezvous, and docking of the Lunar Module and CSM",
      "Perform extravehicular spacewalk evaluating the Apollo Extravehicular Mobility Unit (EMU) and PLSS backpack",
      "Test Lunar Module Descent and Ascent propulsion systems under manual crew piloting"
    ],
    "keyAchievements": [
      "First crewed solo flight of the Lunar Module spacecraft",
      "First test of the Apollo spacesuit with independent portable life support backpack outside a spacecraft",
      "Proven emergency rescue rendezvous profile using Lunar Module descent engine"
    ],
    "milestones": [
      {
        "label": "Liftoff from Launch Complex 39A",
        "date": "1969-03-03",
        "done": true
      },
      {
        "label": "Transposition, docking, and extraction of Lunar Module Spider",
        "date": "1969-03-03",
        "done": true
      },
      {
        "label": "First crew transfer into Lunar Module Spider in orbit",
        "date": "1969-03-05",
        "done": true
      },
      {
        "label": "Russell Schweickart extravehicular activity (EVA) on porch",
        "date": "1969-03-06",
        "done": true
      },
      {
        "label": "LM Spider undocked and separated 185 km from CSM",
        "date": "1969-03-07",
        "done": true
      },
      {
        "label": "Successful rendezvous and redocking of Spider with Gumdrop",
        "date": "1969-03-07",
        "done": true
      },
      {
        "label": "Splashdown in Atlantic Ocean near USS Guadalcanal",
        "date": "1969-03-13",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "James A. McDivitt",
        "role": "Commander"
      },
      {
        "name": "David R. Scott",
        "role": "Command Module Pilot"
      },
      {
        "name": "Russell L. Schweickart",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-104 (Gumdrop) / LM-3 (Spider)",
    "currentOperationalStatus": "Mission completed. Command Module Gumdrop is on display at San Diego Air & Space Museum in California.",
    "historicalSignificance": "Proved all elements of the Apollo lunar landing architecture working together with astronauts for the first time.",
    "latestKnownUpdate": "Foundational baseline for multi-craft orbital rendezvous and docking.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-9/",
    "relatedNewsTags": [
      "Apollo 9",
      "Spider",
      "Lunar Module",
      "Spacewalk"
    ],
    "tags": [
      "Apollo",
      "Apollo 9",
      "Lunar Module",
      "EVA",
      "Docking"
    ]
  },
  {
    "id": "apollo-10",
    "name": "Apollo 10",
    "alternateNames": [
      "AS-505",
      "Charlie Brown and Snoopy"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1969-05-18",
    "endDate": "1969-05-26",
    "launchVehicle": "Saturn V (SA-505)",
    "missionType": "Full Dress Rehearsal for the Apollo 11 Lunar Landing",
    "missionDuration": "8 days, 0 hours, 3 minutes",
    "description": "The final full dress rehearsal for the first Moon landing. Thomas Stafford and Eugene Cernan flew Lunar Module \"Snoopy\" down to within 14.4 km (47,400 feet) of the lunar surface at Site 2 in the Sea of Tranquility, testing landing radar and descent abort maneuvers while John Young remained in lunar orbit aboard CSM \"Charlie Brown\".",
    "scientificObjectives": [
      "Perform comprehensive dress rehearsal of all mission phases prior to actual touchdown",
      "Evaluate lunar landing radar and descent abort staging in lunar orbit",
      "Photograph primary Apollo 11 landing site at Sea of Tranquility from low lunar altitude"
    ],
    "keyAchievements": [
      "Descended within 14.4 kilometers of the lunar surface in Lunar Module Snoopy",
      "Reconnoitered and surveyed the Apollo 11 landing site with stereoscopic cameras",
      "Set the Guinness World Record for the highest speed attained by a crewed vehicle (39,897 km/h / 24,791 mph during return re-entry)"
    ],
    "milestones": [
      {
        "label": "Liftoff from Launch Complex 39A",
        "date": "1969-05-18",
        "done": true
      },
      {
        "label": "Lunar Orbit Insertion (LOI) burn",
        "date": "1969-05-21",
        "done": true
      },
      {
        "label": "LM Snoopy undocked from CSM Charlie Brown",
        "date": "1969-05-22",
        "done": true
      },
      {
        "label": "Lowest approach to lunar surface (14.4 km altitude)",
        "date": "1969-05-22",
        "done": true
      },
      {
        "label": "Ascent stage staging and rendezvous with Charlie Brown",
        "date": "1969-05-23",
        "done": true
      },
      {
        "label": "Splashdown in Central Pacific Ocean near USS Princeton",
        "date": "1969-05-26",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Thomas P. Stafford",
        "role": "Commander"
      },
      {
        "name": "John W. Young",
        "role": "Command Module Pilot"
      },
      {
        "name": "Eugene A. Cernan",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-106 (Charlie Brown) / LM-4 (Snoopy)",
    "currentOperationalStatus": "Mission completed. Charlie Brown on display at Science Museum in London, UK. LM Snoopy ascent stage remains in heliocentric orbit.",
    "historicalSignificance": "Confirmed every operational parameter required for a human lunar landing, leaving nothing untested except the final 47,000-foot touchdown.",
    "latestKnownUpdate": "Snoopy is the only once-crewed Apollo Lunar Module ascent stage still traveling in solar orbit.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-10/",
    "relatedNewsTags": [
      "Apollo 10",
      "Gene Cernan",
      "Snoopy",
      "NASA"
    ],
    "tags": [
      "Apollo",
      "Apollo 10",
      "Lunar Rehearsal",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-11",
    "name": "Apollo 11",
    "alternateNames": [
      "AS-506",
      "Columbia and Eagle"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1969-07-16",
    "endDate": "1969-07-24",
    "launchVehicle": "Saturn V (SA-506)",
    "missionType": "First Crewed Lunar Landing in Human History",
    "missionDuration": "8 days, 3 hours, 18 minutes",
    "description": "The monumental mission that fulfilled President John F. Kennedy’s national goal of landing a man on the Moon and returning him safely to the Earth before the decade was out. On July 20, 1969, Lunar Module \"Eagle\" touched down at Mare Tranquillitatis. Neil Armstrong stepped onto the lunar surface at 02:56 UTC on July 21, declaring: \"That's one small step for [a] man, one giant leap for mankind.\" Armstrong and Edwin \"Buzz\" Aldrin spent 21.6 hours on the lunar surface, collecting 21.5 kg of samples and deploying the Early Apollo Surface Experiments Package (EASEP), while Michael Collins orbited above in Command Module \"Columbia\".",
    "scientificObjectives": [
      "Perform crewed lunar landing and safely return crew to Earth",
      "Collect contingency and bulk lunar surface rock and soil samples",
      "Deploy passive seismometer (PSE) and Laser Ranging Retroreflector (LRRR)",
      "Conduct lunar surface extravehicular activity and photographic documentation"
    ],
    "keyAchievements": [
      "First human footprints and scientific activity on an extraterrestrial planetary body",
      "Safely landed in Sea of Tranquility under manual piloting to avoid boulder crater field",
      "Returned 21.55 kilograms (47.51 lb) of pristine lunar rock and regolith samples",
      "Laser Ranging Retroreflector remains operational and used by astronomers to measure Earth-Moon distance"
    ],
    "milestones": [
      {
        "label": "Liftoff from Kennedy Space Center Pad 39A",
        "date": "1969-07-16",
        "done": true
      },
      {
        "label": "Translunar injection burn of S-IVB stage",
        "date": "1969-07-16",
        "done": true
      },
      {
        "label": "Lunar Orbit Insertion (LOI)",
        "date": "1969-07-19",
        "done": true
      },
      {
        "label": "Lunar Module Eagle touchdown at Mare Tranquillitatis",
        "date": "1969-07-20",
        "done": true
      },
      {
        "label": "Neil Armstrong first step onto the Moon",
        "date": "1969-07-20",
        "done": true
      },
      {
        "label": "Buzz Aldrin egress to lunar surface",
        "date": "1969-07-20",
        "done": true
      },
      {
        "label": "Lunar liftoff of Eagle ascent stage from Moon",
        "date": "1969-07-21",
        "done": true
      },
      {
        "label": "Rendezvous and docking with Columbia in lunar orbit",
        "date": "1969-07-21",
        "done": true
      },
      {
        "label": "Trans-Earth Injection (TEI) burn for homebound journey",
        "date": "1969-07-22",
        "done": true
      },
      {
        "label": "Pacific splashdown near USS Hornet",
        "date": "1969-07-24",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Neil A. Armstrong",
        "role": "Commander"
      },
      {
        "name": "Michael Collins",
        "role": "Command Module Pilot"
      },
      {
        "name": "Edwin E. \"Buzz\" Aldrin Jr.",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-107 (Columbia) / LM-5 (Eagle)",
    "currentOperationalStatus": "Mission completed. Command Module Columbia is on permanent centerpiece display at the Smithsonian National Air and Space Museum in Washington, D.C.",
    "historicalSignificance": "A watershed moment in human civilizational history, proving humanity capable of expanding across planetary boundaries.",
    "latestKnownUpdate": "Tranquility Base declared a historic national landmark; laser retroreflector still tracked by observatories.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
    "relatedNewsTags": [
      "Apollo 11",
      "Neil Armstrong",
      "Buzz Aldrin",
      "Moon Landing",
      "Columbia"
    ],
    "tags": [
      "Apollo",
      "Apollo 11",
      "Moon Landing",
      "Historic",
      "Human Spaceflight",
      "Sea of Tranquility"
    ]
  },
  {
    "id": "apollo-12",
    "name": "Apollo 12",
    "alternateNames": [
      "AS-507",
      "Yankee Clipper and Intrepid"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1969-11-14",
    "endDate": "1969-11-24",
    "launchVehicle": "Saturn V (SA-507)",
    "missionType": "Second Crewed Lunar Landing / Precision Pinpoint Touchdown",
    "missionDuration": "10 days, 4 hours, 36 minutes",
    "description": "Second crewed lunar landing, famously remembered for recovering from two lightning strikes seconds after liftoff through John Aaron’s quick \"SCE to AUX\" telemetry call. Charles \"Pete\" Conrad and Alan Bean executed the first pinpoint lunar landing, touching down within 180 meters of the robotic Surveyor 3 lander in Oceanus Procellarum, and recovered Surveyor parts for return to Earth.",
    "scientificObjectives": [
      "Demonstrate pinpoint landing capability in Oceanus Procellarum",
      "Deploy the first full Apollo Lunar Surface Experiments Package (ALSEP) nuclear-powered science station",
      "Examine and retrieve components from the Surveyor 3 robotic probe landed in April 1967",
      "Conduct geological traverse and sample collection across two EVAs"
    ],
    "keyAchievements": [
      "Achieved pinpoint landing within 180 meters of Surveyor 3 target",
      "Conducted two lunar surface EVAs totaling 7 hours, 45 minutes",
      "Returned 34.35 kg of lunar samples and parts of Surveyor 3 (including TV camera and scoop) for analysis of space weathering",
      "Successfully deployed SNAP-27 Radioisotope Thermoelectric Generator (RTG) powered ALSEP"
    ],
    "milestones": [
      {
        "label": "Launch struck twice by atmospheric lightning",
        "date": "1969-11-14",
        "done": true
      },
      {
        "label": "Lunar Module Intrepid pinpoint touchdown at Ocean of Storms",
        "date": "1969-11-19",
        "done": true
      },
      {
        "label": "First EVA: ALSEP deployment and sampling",
        "date": "1969-11-19",
        "done": true
      },
      {
        "label": "Second EVA: Traverse to Surveyor 3 crater and parts recovery",
        "date": "1969-11-20",
        "done": true
      },
      {
        "label": "Intrepid ascent stage liftoff from Moon",
        "date": "1969-11-20",
        "done": true
      },
      {
        "label": "Splashdown in Pacific Ocean near Samoa",
        "date": "1969-11-24",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Charles \"Pete\" Conrad Jr.",
        "role": "Commander"
      },
      {
        "name": "Richard F. Gordon Jr.",
        "role": "Command Module Pilot"
      },
      {
        "name": "Alan L. Bean",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-108 (Yankee Clipper) / LM-6 (Intrepid)",
    "currentOperationalStatus": "Mission completed. Command Module Yankee Clipper on display at Virginia Air & Space Science Center in Hampton, Virginia.",
    "historicalSignificance": "Proved NASA could land spacecraft with pinpoint precision on rugged planetary terrain, making exploration of difficult scientific highlands possible.",
    "latestKnownUpdate": "Surveyor 3 camera returned on Apollo 12 remains key reference for long-duration material exposure on lunar surface.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-12/",
    "relatedNewsTags": [
      "Apollo 12",
      "Pete Conrad",
      "Alan Bean",
      "Surveyor 3"
    ],
    "tags": [
      "Apollo",
      "Apollo 12",
      "Pinpoint Landing",
      "Ocean of Storms"
    ]
  },
  {
    "id": "apollo-13",
    "name": "Apollo 13",
    "alternateNames": [
      "AS-508",
      "Odyssey and Aquarius"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1970-04-11",
    "endDate": "1970-04-17",
    "launchVehicle": "Saturn V (SA-508)",
    "missionType": "Crewed Lunar Landing Attempt / Successful Emergency Deep Space Rescue",
    "missionDuration": "5 days, 22 hours, 54 minutes",
    "description": "Celebrated as NASA’s \"successful failure\". En route to the Fra Mauro highlands, oxygen tank 2 in the Service Module ruptured at 321,860 km from Earth, venting oxygen into space and disabling two of three fuel cells. With the Command Module Odyssey losing power, James Lovell, Jack Swigert, and Fred Haise powered down Odyssey and used Lunar Module \"Aquarius\" as a lifeboat. Through improvised CO2 scrubbers (\"the mailbox\"), precise engine burns around the Moon, and round-the-clock ground collaboration led by Gene Kranz, the crew was safely returned to Earth.",
    "scientificObjectives": [
      "Original: Explore Fra Mauro formation and sample Imbrium Basin ejecta",
      "Actual: Manage extreme power, water, and thermal constraints in deep space to achieve safe free-return trajectory around Moon"
    ],
    "keyAchievements": [
      "Safely navigated a crippled spacecraft around the far side of the Moon on a free-return trajectory",
      "Improvised lithium hydroxide carbon dioxide scrubbers using tape, plastic bags, and flight manual cardboard",
      "Achieved the absolute record for the farthest distance from Earth reached by humans: 400,171 kilometers (248,655 miles)",
      "Flawless splashdown in the South Pacific with zero loss of life"
    ],
    "milestones": [
      {
        "label": "Launch from Pad 39A",
        "date": "1970-04-11",
        "done": true
      },
      {
        "label": "Oxygen tank explosion (\"Houston, we've had a problem\")",
        "date": "1970-04-13",
        "done": true
      },
      {
        "label": "Descent Propulsion System burn for free-return trajectory",
        "date": "1970-04-14",
        "done": true
      },
      {
        "label": "Closest approach to Moon (farthest human distance record: 400,171 km)",
        "date": "1970-04-14",
        "done": true
      },
      {
        "label": "Service Module jettisoned revealing catastrophic damage",
        "date": "1970-04-17",
        "done": true
      },
      {
        "label": "Aquarius lifeboat jettisoned before atmospheric re-entry",
        "date": "1970-04-17",
        "done": true
      },
      {
        "label": "Safe splashdown in South Pacific near USS Iwo Jima",
        "date": "1970-04-17",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "James A. Lovell Jr.",
        "role": "Commander"
      },
      {
        "name": "John L. \"Jack\" Swigert Jr.",
        "role": "Command Module Pilot"
      },
      {
        "name": "Fred W. Haise Jr.",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-109 (Odyssey) / LM-7 (Aquarius)",
    "currentOperationalStatus": "Mission completed with full crew rescue. Command Module Odyssey is on display at Cosmosphere in Hutchinson, Kansas.",
    "historicalSignificance": "The ultimate showcase of teamwork, composure under extreme pressure, and real-time engineering ingenuity in human spaceflight history.",
    "latestKnownUpdate": "Farthest human distance record (400,171 km) stood unbroken until Artemis II in 2026.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-13/",
    "relatedNewsTags": [
      "Apollo 13",
      "Jim Lovell",
      "Gene Kranz",
      "Odyssey"
    ],
    "tags": [
      "Apollo",
      "Apollo 13",
      "Rescue",
      "Deep Space",
      "Historic",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-14",
    "name": "Apollo 14",
    "alternateNames": [
      "AS-509",
      "Kitty Hawk and Antares"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1971-01-31",
    "endDate": "1971-02-09",
    "launchVehicle": "Saturn V (SA-509)",
    "missionType": "Third Crewed Lunar Landing / Fra Mauro Highlands Exploration",
    "missionDuration": "9 days, 0 hours, 1 minute",
    "description": "Third crewed lunar landing, commanding by Alan Shepard (America’s first astronaut in space, returning to flight after 10 years). Shepard and Edgar Mitchell touched down at Fra Mauro, the target originally intended for Apollo 13. They completed two EVAs totaling 9 hours, 21 minutes, deployed the Modular Equipment Transporter (\"lunar rickshaw\"), climbed Cone Crater, and Shepard hit two golf balls with an improvised 6-iron on the lunar surface.",
    "scientificObjectives": [
      "Sample the Fra Mauro geological formation to date the massive Imbrium impact event",
      "Deploy full ALSEP geophysics package with active seismic experiments using thumper charges",
      "Evaluate Modular Equipment Transporter (MET) handcart for surface field work"
    ],
    "keyAchievements": [
      "Recovered 42.8 kilograms (94.4 lb) of ancient impact breccias from Fra Mauro",
      "Trekked to the rim of 300-meter-wide Cone Crater",
      "Shepard famously struck two golf balls across the low-gravity lunar landscape",
      "Stuart Roosa carried hundreds of tree seeds in orbit, which were planted as \"Moon Trees\" worldwide upon return"
    ],
    "milestones": [
      {
        "label": "Launch from Pad 39A",
        "date": "1971-01-31",
        "done": true
      },
      {
        "label": "Lunar Module Antares landing at Fra Mauro",
        "date": "1971-02-05",
        "done": true
      },
      {
        "label": "First EVA: ALSEP deployment and sampling",
        "date": "1971-02-05",
        "done": true
      },
      {
        "label": "Second EVA: Cone Crater geology traverse and golf shots",
        "date": "1971-02-06",
        "done": true
      },
      {
        "label": "Liftoff from lunar surface",
        "date": "1971-02-06",
        "done": true
      },
      {
        "label": "Splashdown in South Pacific near USS New Orleans",
        "date": "1971-02-09",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Alan B. Shepard Jr.",
        "role": "Commander"
      },
      {
        "name": "Stuart A. Roosa",
        "role": "Command Module Pilot"
      },
      {
        "name": "Edgar D. Mitchell",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-110 (Kitty Hawk) / LM-8 (Antares)",
    "currentOperationalStatus": "Mission completed. Command Module Kitty Hawk on display at Kennedy Space Center Visitor Complex in Florida.",
    "historicalSignificance": "Restored absolute confidence in Apollo landing operations and returned deep-crust rocks essential for deciphering lunar chronology.",
    "latestKnownUpdate": "Apollo 14 Moon Trees continue growing at scientific institutions around the world.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-14/",
    "relatedNewsTags": [
      "Apollo 14",
      "Alan Shepard",
      "Fra Mauro",
      "Moon Trees"
    ],
    "tags": [
      "Apollo",
      "Apollo 14",
      "Fra Mauro",
      "Alan Shepard",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-15",
    "name": "Apollo 15",
    "alternateNames": [
      "AS-510",
      "Endeavour and Falcon"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1971-07-26",
    "endDate": "1971-08-07",
    "launchVehicle": "Saturn V (SA-510)",
    "missionType": "Fourth Crewed Lunar Landing / First J-Series Extended Mission with Lunar Rover",
    "missionDuration": "12 days, 7 hours, 11 minutes",
    "description": "The first of the advanced \"J-missions\" capable of longer lunar stays and intensive scientific exploration. David Scott and James Irwin touched down at the dramatic junction of the Apennine Mountains and Hadley Rille. Using the first Lunar Roving Vehicle (LRV), they drove 27.8 km across the Moon, spent 18.5 hours in three EVAs, and discovered the famed \"Genesis Rock\" (anorthosite sample dating back 4.1 billion years). In orbit, Al Worden operated the Scientific Instrument Module (SIM) bay and performed the first deep-space spacewalk during the return cruise.",
    "scientificObjectives": [
      "Investigate the geology of Hadley Rille and the 4,500-meter-tall Apennine Mountain front",
      "Test and utilize the electric Lunar Roving Vehicle to dramatically expand exploration radius",
      "Deploy ALSEP with heat flow probes and drill core samples up to 2.4 meters deep",
      "Conduct orbital orbital mapping with panoramic and mapping cameras from SIM bay"
    ],
    "keyAchievements": [
      "First mission to deploy and drive the Lunar Roving Vehicle on the lunar surface (27.8 km traversed)",
      "Discovered the pristine 4.1-billion-year-old anorthosite \"Genesis Rock\" (Sample 15415), confirming magma ocean hypothesis",
      "Performed the Galileo falling feather and hammer gravity demonstration in vacuum",
      "First deep space extravehicular activity (EVA) by Al Worden, 317,000 km from Earth"
    ],
    "milestones": [
      {
        "label": "Liftoff from Pad 39A",
        "date": "1971-07-26",
        "done": true
      },
      {
        "label": "Lunar Module Falcon touchdown at Hadley-Apennine",
        "date": "1971-07-30",
        "done": true
      },
      {
        "label": "First drive of the Lunar Roving Vehicle on Moon",
        "date": "1971-07-31",
        "done": true
      },
      {
        "label": "Discovery of Genesis Rock at Spur Crater",
        "date": "1971-08-01",
        "done": true
      },
      {
        "label": "First televised live liftoff from the Moon via Rover camera",
        "date": "1971-08-02",
        "done": true
      },
      {
        "label": "Deep space EVA by Al Worden to retrieve film canisters",
        "date": "1971-08-05",
        "done": true
      },
      {
        "label": "Splashdown in North Pacific Ocean near USS Okinawa",
        "date": "1971-08-07",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "David R. Scott",
        "role": "Commander"
      },
      {
        "name": "Alfred M. Worden",
        "role": "Command Module Pilot"
      },
      {
        "name": "James B. Irwin",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-112 (Endeavour) / LM-10 (Falcon)",
    "currentOperationalStatus": "Mission completed. Command Module Endeavour on display at National Museum of the U.S. Air Force in Dayton, Ohio. Lunar Rover remains at Hadley Rille.",
    "historicalSignificance": "Regarded by geologists as the premier scientific mission of the Apollo programme, revolutionizing understanding of early lunar crust formation.",
    "latestKnownUpdate": "Genesis Rock remains among the most scientifically scrutinized extraterrestrial samples on Earth.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-15/",
    "relatedNewsTags": [
      "Apollo 15",
      "Lunar Rover",
      "Genesis Rock",
      "Hadley Rille"
    ],
    "tags": [
      "Apollo",
      "Apollo 15",
      "Lunar Rover",
      "Hadley Rille",
      "Genesis Rock",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-16",
    "name": "Apollo 16",
    "alternateNames": [
      "AS-511",
      "Casper and Orion"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1972-04-16",
    "endDate": "1972-04-27",
    "launchVehicle": "Saturn V (SA-511)",
    "missionType": "Fifth Crewed Lunar Landing / Descartes Highlands Exploration",
    "missionDuration": "11 days, 1 hour, 51 minutes",
    "description": "Fifth crewed lunar landing, targeting the Descartes Highlands to test whether the lunar highlands were formed by volcanic action. John Young and Charles Duke drove Lunar Roving Vehicle #2 across 26.7 km, conducting three EVAs totaling 20 hours, 14 minutes, and collected 95.7 kg of samples. The rocks proved the highlands were not volcanic but formed of impact breccias, fundamentally correcting prevailing geological consensus. Ken Mattingly conducted orbital science in CSM \"Casper\".",
    "scientificObjectives": [
      "Sample the Cayley Plains and Descartes Highlands formations",
      "Test volcanic origin hypothesis for lunar highland plains",
      "Deploy Far Ultraviolet Camera/Spectrograph for first astronomical observations from the Moon",
      "Release lunar subsatellite into orbit for gravitational and particle measurements"
    ],
    "keyAchievements": [
      "Disproved pre-mission volcanic theory by finding impact breccia rather than volcanic rhyolite/andesite",
      "Returned 95.7 kilograms of samples, including \"Big Muley\", the largest sample returned by Apollo (11.7 kg)",
      "Deployed George Carruthers’ Far Ultraviolet Camera, capturing astronomical UV data from the lunar surface",
      "Set lunar rover speed record of 18 km/h (11.2 mph)"
    ],
    "milestones": [
      {
        "label": "Launch from Pad 39A",
        "date": "1972-04-16",
        "done": true
      },
      {
        "label": "Lunar Module Orion touchdown at Descartes Highlands",
        "date": "1972-04-21",
        "done": true
      },
      {
        "label": "First EVA: ALSEP deployment and UV camera setup",
        "date": "1972-04-21",
        "done": true
      },
      {
        "label": "Second EVA: Drive to Stone Mountain",
        "date": "1972-04-22",
        "done": true
      },
      {
        "label": "Third EVA: North Ray Crater exploration and Big Muley collection",
        "date": "1972-04-23",
        "done": true
      },
      {
        "label": "Liftoff from lunar surface",
        "date": "1972-04-23",
        "done": true
      },
      {
        "label": "Splashdown in South Pacific near USS Ticonderoga",
        "date": "1972-04-27",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "John W. Young",
        "role": "Commander"
      },
      {
        "name": "Thomas K. \"Ken\" Mattingly II",
        "role": "Command Module Pilot"
      },
      {
        "name": "Charles M. Duke Jr.",
        "role": "Lunar Module Pilot"
      }
    ],
    "spacecraft": "CSM-113 (Casper) / LM-11 (Orion)",
    "currentOperationalStatus": "Mission completed. Command Module Casper on display at U.S. Space & Rocket Center in Huntsville, Alabama.",
    "historicalSignificance": "Dramatically overturned established lunar geology models by proving the dominance of impact cratering over volcanic activity in shaping the lunar crust.",
    "latestKnownUpdate": "Far Ultraviolet Camera experiment recognized as first lunar-based astronomical observatory.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-16/",
    "relatedNewsTags": [
      "Apollo 16",
      "John Young",
      "Charlie Duke",
      "Descartes"
    ],
    "tags": [
      "Apollo",
      "Apollo 16",
      "Descartes Highlands",
      "Lunar Rover",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-17",
    "name": "Apollo 17",
    "alternateNames": [
      "AS-512",
      "America and Challenger"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "1972-12-07",
    "endDate": "1972-12-19",
    "launchVehicle": "Saturn V (SA-512)",
    "missionType": "Sixth and Final Apollo Crewed Lunar Landing / Taurus-Littrow Exploration",
    "missionDuration": "12 days, 13 hours, 52 minutes",
    "description": "The crowning final mission of the Apollo programme and the only one to include a professional scientist-astronaut, geologist Dr. Harrison H. \"Jack\" Schmitt. Commander Eugene Cernan and Schmitt touched down in the deep, narrow valley of Taurus-Littrow. Over 3 days, they conducted three EVAs totaling 22 hours, 4 minutes, drove the Lunar Rover 35.7 km, discovered \"orange soil\" (volcanic glass beads from ancient pyroclastic eruptions), and collected 110.5 kg of samples. On December 14, 1972, Gene Cernan was the last human to step off the Moon.",
    "scientificObjectives": [
      "Investigate both highland massif materials and younger volcanic-looking dark mantle plains in Taurus-Littrow",
      "Deploy full ALSEP station including Lunar Ejecta and Meteorites experiment and gravimeter",
      "Perform detailed geological field traverses directed by professional planetary geologist on site",
      "Conduct extensive orbital synthetic aperture radar and mapping from CSM America"
    ],
    "keyAchievements": [
      "Discovered orange pyroclastic volcanic glass beads at Shorty Crater (proof of explosive lunar volcanism 3.6 billion years ago)",
      "Returned the largest sample haul of the Apollo programme: 110.5 kilograms (243.6 lb)",
      "Longest total EVA duration of the Apollo programme (22 hours, 4 minutes)",
      "Longest distance driven in a lunar rover (35.7 km) and longest duration in lunar orbit (147 hours, 48 minutes)",
      "Gene Cernan left the final footsteps and plaque inscription: \"Here man completed his first explorations of the Moon, December 1972 A.D.\""
    ],
    "milestones": [
      {
        "label": "First night launch of the Saturn V rocket",
        "date": "1972-12-07",
        "done": true
      },
      {
        "label": "Challenger landing in Taurus-Littrow valley",
        "date": "1972-12-11",
        "done": true
      },
      {
        "label": "First EVA: ALSEP deployment and Steno Crater traverse",
        "date": "1972-12-11",
        "done": true
      },
      {
        "label": "Second EVA: Discovery of orange soil at Shorty Crater",
        "date": "1972-12-12",
        "done": true
      },
      {
        "label": "Third EVA: North Massif and final departure speech",
        "date": "1972-12-13",
        "done": true
      },
      {
        "label": "Final lunar liftoff of Apollo Lunar Module Challenger",
        "date": "1972-12-14",
        "done": true
      },
      {
        "label": "Ronald Evans deep space trans-Earth EVA",
        "date": "1972-12-17",
        "done": true
      },
      {
        "label": "Pacific splashdown near USS Ticonderoga",
        "date": "1972-12-19",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Eugene A. Cernan",
        "role": "Commander"
      },
      {
        "name": "Ronald E. Evans Jr.",
        "role": "Command Module Pilot"
      },
      {
        "name": "Harrison H. \"Jack\" Schmitt",
        "role": "Lunar Module Pilot (Geologist)"
      }
    ],
    "spacecraft": "CSM-114 (America) / LM-12 (Challenger)",
    "currentOperationalStatus": "Mission completed. Command Module America on display at Space Center Houston in Texas.",
    "historicalSignificance": "The grand finale of humanity’s first golden era of lunar exploration, returning irreplaceable scientific treasures that anchored planetary science for over 50 years.",
    "latestKnownUpdate": "Sample 76535 (troctolite from Apollo 17) remains the oldest unshocked lunar rock dated, at 4.25 billion years.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-17/",
    "relatedNewsTags": [
      "Apollo 17",
      "Gene Cernan",
      "Jack Schmitt",
      "Taurus-Littrow",
      "Orange Soil"
    ],
    "tags": [
      "Apollo",
      "Apollo 17",
      "Taurus-Littrow",
      "Harrison Schmitt",
      "Human Spaceflight",
      "Final Landing"
    ]
  },
  {
    "id": "project-mercury",
    "name": "Project Mercury",
    "alternateNames": [
      "Mercury-Redstone 3 (Freedom 7)",
      "Mercury-Atlas 6 (Friendship 7)"
    ],
    "programme": "Project Mercury",
    "programmeId": "mercury",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1961-05-05",
    "endDate": "1963-05-16",
    "launchVehicle": "Redstone / Atlas D",
    "missionType": "First United States Human Spaceflight Programme",
    "missionDuration": "1961–1963 (6 crewed flights)",
    "description": "The pioneering first human spaceflight programme of the United States. Initiated in 1958, Project Mercury answered the Soviet Union’s early lead in the Space Race. It successfully launched Alan Shepard on America’s first suborbital flight on May 5, 1961 (Freedom 7), and propelled John Glenn into the first American orbital flight on February 20, 1962 (Friendship 7), completing three orbits of the Earth.",
    "scientificObjectives": [
      "Determine human capabilities in a space environment and microgravity",
      "Put a crewed spacecraft into orbit around the Earth and recover both crew and vehicle safely",
      "Establish global ground communication and tracking network"
    ],
    "keyAchievements": [
      "First American in space (Alan Shepard, Freedom 7, May 5, 1961)",
      "First American in orbit (John Glenn, Friendship 7, February 20, 1962)",
      "Proven blunt-body ablative heat shield design for human atmospheric re-entry",
      "Completed six flawless crewed flights without loss of life"
    ],
    "milestones": [
      {
        "label": "Freedom 7 — Alan Shepard suborbital flight",
        "date": "1961-05-05",
        "done": true
      },
      {
        "label": "Liberty Bell 7 — Gus Grissom suborbital flight",
        "date": "1961-07-21",
        "done": true
      },
      {
        "label": "Friendship 7 — John Glenn first US orbital flight (3 orbits)",
        "date": "1962-02-20",
        "done": true
      },
      {
        "label": "Aurora 7 — Scott Carpenter orbital flight",
        "date": "1962-05-24",
        "done": true
      },
      {
        "label": "Sigma 7 — Wally Schirra precision splashdown",
        "date": "1962-10-03",
        "done": true
      },
      {
        "label": "Faith 7 — Gordon Cooper 22-orbit endurance mission",
        "date": "1963-05-15",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Mercury Seven Astronauts (Shepard, Grissom, Glenn, Carpenter, Schirra, Cooper, Slayton)",
        "role": "Pioneering Astronaut Corps"
      }
    ],
    "spacecraft": "Mercury Capsule",
    "currentOperationalStatus": "Programme completed successfully in May 1963.",
    "historicalSignificance": "Laid the technological, medical, and operational foundations of American human space exploration.",
    "latestKnownUpdate": "Friendship 7 on permanent display at National Air and Space Museum.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/mercury/",
    "relatedNewsTags": [
      "Project Mercury",
      "Alan Shepard",
      "John Glenn",
      "Freedom 7"
    ],
    "tags": [
      "NASA",
      "Human Spaceflight",
      "Mercury",
      "John Glenn",
      "Historical"
    ]
  },
  {
    "id": "project-gemini",
    "name": "Project Gemini",
    "alternateNames": [
      "Gemini Programme"
    ],
    "programme": "Project Gemini",
    "programmeId": "gemini",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1965-03-23",
    "endDate": "1966-11-15",
    "launchVehicle": "Titan II GLV",
    "missionType": "Two-Person Long-Duration, Rendezvous, and Spacewalk Programme",
    "missionDuration": "1965–1966 (10 crewed flights)",
    "description": "NASA’s critical bridge programme between Mercury and Apollo. Over 10 crewed missions in just 20 months, two-person Gemini crews mastered orbital rendezvous, docking with Agena target vehicles, long-duration flight up to 14 days, and extravehicular activity (EVA / spacewalking), solving every flight technique necessary to travel to the Moon.",
    "scientificObjectives": [
      "Master orbital rendezvous and docking with a target spacecraft",
      "Demonstrate human endurance in space up to two weeks (exceeding lunar roundtrip duration)",
      "Develop extravehicular activity (EVA) techniques and tools in microgravity",
      "Perfect guided re-entry and pinpoint ocean splashdowns"
    ],
    "keyAchievements": [
      "First American spacewalk by Ed White on Gemini 4 (June 3, 1965)",
      "World-first orbital space rendezvous between Gemini 7 and Gemini 6A (December 1965)",
      "World-first space docking between two spacecraft on Gemini 8 (Armstrong and Scott with Agena, March 1966)",
      "14-day human space endurance record on Gemini 7 (Borman and Lovell)"
    ],
    "milestones": [
      {
        "label": "Gemini 3 — First crewed flight (Grissom and Young)",
        "date": "1965-03-23",
        "done": true
      },
      {
        "label": "Gemini 4 — Ed White first American spacewalk",
        "date": "1965-06-03",
        "done": true
      },
      {
        "label": "Gemini 7 / 6A — Historic rendezvous of two crewed craft",
        "date": "1965-12-15",
        "done": true
      },
      {
        "label": "Gemini 8 — Neil Armstrong first docking in space",
        "date": "1966-03-16",
        "done": true
      },
      {
        "label": "Gemini 11 — High apogee record (1,374 km) and tethered artificial gravity",
        "date": "1966-09-14",
        "done": true
      },
      {
        "label": "Gemini 12 — Buzz Aldrin mastered neutral buoyancy underwater training and productive EVA",
        "date": "1966-11-11",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Gemini Spacecraft (McDonnell)",
    "currentOperationalStatus": "Programme completed successfully in November 1966.",
    "historicalSignificance": "The indispensable stepping-stone that turned the tide of the Space Race, giving the United States a decisive operational lead.",
    "latestKnownUpdate": "Gemini spacecraft on display at museums across the United States.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/gemini/",
    "relatedNewsTags": [
      "Gemini",
      "Project Gemini",
      "Ed White",
      "Spacewalk"
    ],
    "tags": [
      "NASA",
      "Human Spaceflight",
      "Gemini",
      "Rendezvous",
      "Docking"
    ]
  },
  {
    "id": "skylab",
    "name": "Skylab",
    "alternateNames": [
      "Skylab 1, 2, 3, 4"
    ],
    "programme": "Skylab",
    "programmeId": "skylab",
    "agency": "NASA",
    "category": "Space Stations",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1973-05-14",
    "endDate": "1979-07-11",
    "launchVehicle": "Saturn V (SL-1) / Saturn IB",
    "missionType": "First American Orbital Space Station",
    "missionDuration": "1973–1974 (crewed operations: 171 days total)",
    "description": "America’s first orbital space station, converted from a Saturn V S-IVB third stage. After losing its micrometeoroid shield and one main solar array during launch, the first crew (Skylab 2) performed heroic in-orbit repairs with a parasol sunshield and freeing a jammed solar wing. Three successive three-man crews lived aboard Skylab for 28, 59, and 84 days, operating the Apollo Telescope Mount to study the Sun in unprecedented detail.",
    "scientificObjectives": [
      "Study the Sun in ultraviolet, X-ray, and visible spectra outside Earth's atmospheric distortion",
      "Investigate long-duration human physiological adaptation to prolonged weightlessness",
      "Conduct Earth resources photography and microgravity materials experiments"
    ],
    "keyAchievements": [
      "First major in-space salvage and repair operation of a crippled spacecraft",
      "Acquired over 175,000 solar images, revolutionizing understanding of coronal holes and solar flares",
      "Proved humans can adapt, work productively, and remain healthy in space for nearly three continuous months"
    ],
    "milestones": [
      {
        "label": "Skylab 1 launched on final Saturn V flight",
        "date": "1973-05-14",
        "done": true
      },
      {
        "label": "Skylab 2 (Conrad, Kerwin, Weitz) deploys sunshield and repairs station",
        "date": "1973-05-25",
        "done": true
      },
      {
        "label": "Skylab 3 (Bean, Garriott, Lousma) 59-day mission",
        "date": "1973-07-28",
        "done": true
      },
      {
        "label": "Skylab 4 (Carr, Gibson, Pogue) 84-day endurance record",
        "date": "1973-11-16",
        "done": true
      },
      {
        "label": "Atmospheric re-entry and deorbit over Indian Ocean and Western Australia",
        "date": "1979-07-11",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Skylab Orbital Workshop & Apollo Telescope Mount",
    "currentOperationalStatus": "Mission completed. Station re-entered the atmosphere in July 1979.",
    "historicalSignificance": "Pioneered long-duration orbital science and proved that astronauts could perform complex engineering repairs in vacuum.",
    "latestKnownUpdate": "Skylab backup flight workshop on permanent display at National Air and Space Museum.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/skylab/",
    "relatedNewsTags": [
      "Skylab",
      "Space Station",
      "NASA history"
    ],
    "tags": [
      "NASA",
      "Space Stations",
      "Skylab",
      "Solar Science",
      "Human Spaceflight"
    ]
  },
  {
    "id": "apollo-soyuz",
    "name": "Apollo-Soyuz Test Project (ASTP)",
    "alternateNames": [
      "ASTP",
      "Soyuz-Apollo"
    ],
    "programme": "Apollo Programme",
    "programmeId": "apollo",
    "agency": "NASA / Soviet Space Programme",
    "partnerAgencies": [
      "Roscosmos / USSR"
    ],
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1975-07-15",
    "endDate": "1975-07-24",
    "launchVehicle": "Saturn IB / Soyuz-U",
    "missionType": "First International Human Spaceflight Rendezvous & Docking",
    "missionDuration": "9 days, 1 hour, 28 minutes",
    "description": "The historic first joint spaceflight between the United States and the Soviet Union, marking a symbolic thaw during the Cold War. An American Apollo Command/Service Module docked with a Soviet Soyuz 19 spacecraft using a newly designed androgynous docking module. On July 17, 1975, Thomas Stafford and Alexei Leonov exchanged the historic handshake in space through the open hatchway.",
    "scientificObjectives": [
      "Test compatible international rendezvous and docking systems (APAS-75)",
      "Demonstrate joint crew transfer and emergency rescue capabilities",
      "Conduct 28 joint and unilateral scientific and technological experiments"
    ],
    "keyAchievements": [
      "First international space docking between two superpower nations",
      "Created the Androgynous Peripheral Attach System (APAS) that became the precursor for ISS and Shuttle docking ports",
      "Historic handshake in space between Thomas Stafford and Alexei Leonov"
    ],
    "milestones": [
      {
        "label": "Soyuz 19 launched from Baikonur Cosmodrome",
        "date": "1975-07-15",
        "done": true
      },
      {
        "label": "Apollo CSM launched from Kennedy Space Center LC-39B",
        "date": "1975-07-15",
        "done": true
      },
      {
        "label": "Historic docking in Earth orbit at 225 km altitude",
        "date": "1975-07-17",
        "done": true
      },
      {
        "label": "Hatches opened; historic Stafford-Leonov handshake",
        "date": "1975-07-17",
        "done": true
      },
      {
        "label": "Soyuz 19 safe landing in Kazakhstan",
        "date": "1975-07-21",
        "done": true
      },
      {
        "label": "Apollo splashdown in Pacific Ocean west of Hawaii",
        "date": "1975-07-24",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Thomas P. Stafford",
        "role": "Apollo Commander (US)"
      },
      {
        "name": "Vance D. Brand",
        "role": "Apollo Command Module Pilot (US)"
      },
      {
        "name": "Donald K. \"Deke\" Slayton",
        "role": "Apollo Docking Module Pilot (US)"
      },
      {
        "name": "Alexei A. Leonov",
        "role": "Soyuz Commander (USSR)"
      },
      {
        "name": "Valeri N. Kubasov",
        "role": "Soyuz Flight Engineer (USSR)"
      }
    ],
    "spacecraft": "Apollo CSM-111 & Soyuz 19",
    "currentOperationalStatus": "Mission completed successfully in July 1975.",
    "historicalSignificance": "Broke the ideological ice of the Space Race and proved that adversarial spacefaring nations could safely cooperate in orbit.",
    "latestKnownUpdate": "Apollo CSM-111 on display at California Science Center in Los Angeles.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/apollo-soyuz-test-project/",
    "relatedNewsTags": [
      "Apollo-Soyuz",
      "Alexei Leonov",
      "Tom Stafford",
      "Cold War"
    ],
    "tags": [
      "NASA",
      "Soviet Union",
      "ASTP",
      "Docking",
      "Human Spaceflight",
      "International"
    ]
  },
  {
    "id": "space-shuttle-programme",
    "name": "Space Shuttle Programme",
    "alternateNames": [
      "Space Transportation System (STS)"
    ],
    "programme": "Space Shuttle",
    "programmeId": "shuttle",
    "agency": "NASA",
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "completed",
    "launchDate": "1981-04-12",
    "endDate": "2011-07-21",
    "launchVehicle": "Space Shuttle (Orbiter + External Tank + Solid Rocket Boosters)",
    "missionType": "Reusable Winged Crew and Cargo Launch System",
    "missionDuration": "1981–2011 (135 total missions)",
    "description": "The world’s first reusable orbital spacecraft fleet: Columbia, Challenger, Discovery, Atlantis, and Endeavour. Over 30 years and 135 missions, the Space Shuttle launched and serviced the Hubble Space Telescope, constructed the International Space Station, carried Spacelab laboratories, deployed interplanetary probes like Magellan, Galileo, and Ulysses, and brought over 350 people to space. It endured two tragic losses: Challenger (STS-51-L, 1986) and Columbia (STS-107, 2003).",
    "scientificObjectives": [
      "Provide routine, reusable heavy-lift crew and cargo access to low Earth orbit",
      "Deploy, retrieve, and service satellites and massive orbital space observatories",
      "Construct the 450-tonne International Space Station in orbit"
    ],
    "keyAchievements": [
      "Flew 135 orbital missions carrying 355 individual astronauts from 16 countries",
      "Deployed the Hubble Space Telescope (STS-31) and performed 5 historic in-orbit servicing missions",
      "Delivered the major truss segments, European Columbus lab, Japanese Kibo lab, and US Destiny lab to ISS",
      "Demonstrated satellite retrieval, untethered MMU spacewalks, and autonomous robotic arm handling"
    ],
    "milestones": [
      {
        "label": "STS-1 — First orbital flight of Space Shuttle Columbia (Young & Crippen)",
        "date": "1981-04-12",
        "done": true
      },
      {
        "label": "STS-31 — Deployment of Hubble Space Telescope by Discovery",
        "date": "1990-04-24",
        "done": true
      },
      {
        "label": "STS-61 — First Hubble Servicing Mission installing corrective optics",
        "date": "1993-12-02",
        "done": true
      },
      {
        "label": "STS-88 — First Shuttle ISS assembly flight attaching Unity to Zarya",
        "date": "1998-12-04",
        "done": true
      },
      {
        "label": "STS-125 — Final Hubble Servicing Mission",
        "date": "2009-05-11",
        "done": true
      },
      {
        "label": "STS-135 — Final mission of the Space Shuttle Programme (Atlantis)",
        "date": "2011-07-08",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Orbiters Columbia, Challenger, Discovery, Atlantis, Endeavour",
    "currentOperationalStatus": "Programme retired in July 2011. Surviving orbiters on display at Smithsonian, KSC, California Science Center, and Intrepid Museum.",
    "historicalSignificance": "Defined three decades of human spaceflight, enabled the assembly of the ISS, and pioneered in-orbit satellite maintenance and repair.",
    "latestKnownUpdate": "Orbiters preserved as national historic artifacts.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/space-shuttle/",
    "relatedNewsTags": [
      "Space Shuttle",
      "Hubble",
      "Discovery",
      "Atlantis",
      "Endeavour"
    ],
    "tags": [
      "NASA",
      "Space Shuttle",
      "STS",
      "Human Spaceflight",
      "Hubble Servicing",
      "ISS Assembly"
    ]
  },
  {
    "id": "international-space-station",
    "name": "International Space Station (ISS)",
    "alternateNames": [
      "ISS",
      "Alpha"
    ],
    "programme": "International Space Station Programme",
    "programmeId": "iss",
    "agency": "International Partnerships",
    "partnerAgencies": [
      "NASA",
      "Roscosmos",
      "ESA",
      "JAXA",
      "CSA"
    ],
    "category": "Space Stations",
    "destination": "Earth Orbit",
    "status": "active",
    "launchDate": "1998-11-20",
    "endDate": null,
    "launchVehicle": "Proton-K (Zarya) / Space Shuttle / Falcon 9 / Soyuz",
    "missionType": "Permanently Crewed International Microgravity Orbital Laboratory",
    "missionDuration": "1998–Present (over 27 years in orbit, crewed since Nov 2000)",
    "description": "A masterpiece of global engineering and international cooperation orbiting at ~410 km altitude. Comprising pressurized modules from the United States, Russia, Europe, and Japan, with robotic arms from Canada, the station maintains a permanent crew of 7 astronauts and cosmonauts. Over 275 individuals from 21 nations have visited the station, executing thousands of experiments in human biology, medicine, astrophysics, fluid physics, and materials science.",
    "scientificObjectives": [
      "Maintain an ongoing multidisciplinary research laboratory in permanent microgravity",
      "Investigate human physiological, neurological, and psychological health during long-duration spaceflight",
      "Test advanced life support, water recycling, and power systems for future lunar and Mars exploration",
      "Serve as an orbital testbed for commercial space stations and space pharmaceutical research"
    ],
    "keyAchievements": [
      "Over 25 continuous years of uninterrupted human presence in space",
      "Recycles over 98% of onboard water through advanced filtration and distillation",
      "Conducted over 3,300 peer-reviewed scientific research investigations",
      "Alpha Magnetic Spectrometer-02 on truss has collected over 200 billion cosmic ray events searching for dark matter"
    ],
    "milestones": [
      {
        "label": "Zarya control module launched on Proton-K",
        "date": "1998-11-20",
        "done": true
      },
      {
        "label": "Expedition 1 crew arrives (Shepherd, Gidzenko, Krikalev) starting permanent human presence",
        "date": "2000-11-02",
        "done": true
      },
      {
        "label": "Destiny US Laboratory module attached",
        "date": "2001-02-07",
        "done": true
      },
      {
        "label": "European Columbus and Japanese Kibo laboratories attached",
        "date": "2008-02-11",
        "done": true
      },
      {
        "label": "Commercial Crew flights begin carrying regular rotations from US soil",
        "date": "2020-05-30",
        "done": true
      },
      {
        "label": "Current operations funded through 2030",
        "date": "2030-12-31",
        "done": false,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": "Modular Space Station (450 tonnes)",
    "currentOperationalStatus": "Fully operational in low Earth orbit. Supported by SpaceX Dragon, Northrop Grumman Cygnus, Roscosmos Soyuz and Progress vehicles.",
    "historicalSignificance": "The greatest peacetime international scientific engineering collaboration in history, paving the way for commercial LEO stations and lunar exploration.",
    "latestKnownUpdate": "NASA and partners executing science investigations while planning responsible transition to commercial space stations by 2030.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/international-space-station/",
    "relatedNewsTags": [
      "ISS",
      "Space Station",
      "NASA",
      "Expedition",
      "Spacewalk"
    ],
    "tags": [
      "Space Stations",
      "ISS",
      "Human Spaceflight",
      "International Partnerships",
      "Active"
    ]
  },
  {
    "id": "commercial-crew-programme",
    "name": "NASA Commercial Crew Programme",
    "alternateNames": [
      "CCP",
      "Commercial Crew Transportation Capability (CCtCap)"
    ],
    "programme": "Commercial Crew",
    "programmeId": "commercial-crew",
    "agency": "NASA",
    "partnerAgencies": [
      "SpaceX",
      "Boeing"
    ],
    "category": "Human Spaceflight",
    "destination": "Earth Orbit",
    "status": "active",
    "launchDate": "2020-05-30",
    "endDate": null,
    "launchVehicle": "Falcon 9 (Crew Dragon) / Atlas V / Vulcan (Starliner)",
    "missionType": "Public-Private Commercial Crew Transportation to the ISS",
    "missionDuration": "2020–Present (Ongoing regular crew rotations)",
    "description": "NASA’s public-private partnership framework that restored America’s capability to launch astronauts from US soil to the International Space Station following the retirement of the Space Shuttle in 2011. Partnering with SpaceX (Crew Dragon) and Boeing (CST-100 Starliner), the programme delivers reliable, safe, and cost-effective crew rotation flights.",
    "scientificObjectives": [
      "Provide safe, reliable, and cost-effective crew transportation to and from the ISS",
      "Increase ISS crew time dedicated to scientific research from 35 to over 70 hours per week",
      "Foster a robust commercial human spaceflight economy in low Earth orbit"
    ],
    "keyAchievements": [
      "Restored American human orbital launch capability on May 30, 2020 with Demo-2",
      "Flown over 10 consecutive successful operational crew rotations (Crew-1 through Crew-10+) to the ISS",
      "Successfully certified the first commercial human-rated orbital space transportation system"
    ],
    "milestones": [
      {
        "label": "SpaceX Demo-2 historic launch with Bob Behnken and Doug Hurley",
        "date": "2020-05-30",
        "done": true
      },
      {
        "label": "Crew-1 maiden operational flight delivers 4 astronauts to ISS",
        "date": "2020-11-15",
        "done": true
      },
      {
        "label": "Boeing Starliner Crew Flight Test (CFT) to ISS",
        "date": "2024-06-05",
        "done": true
      },
      {
        "label": "Regular biannual operational crew rotations maintained to ISS",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": "SpaceX Crew Dragon / Boeing CST-100 Starliner",
    "currentOperationalStatus": "Active operational service conducting continuous crew rotations for NASA and international partner astronauts.",
    "historicalSignificance": "Revolutionized human spaceflight economics, demonstrating that private enterprise under NASA safety oversight can operate orbital human transit reliably.",
    "latestKnownUpdate": "Commercial crew flights continue regular 6-month mission rotations to the ISS.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/commercial-crew-program/",
    "relatedNewsTags": [
      "Commercial Crew",
      "Crew Dragon",
      "SpaceX",
      "Starliner",
      "NASA"
    ],
    "tags": [
      "NASA",
      "Commercial Crew",
      "SpaceX",
      "Human Spaceflight",
      "Earth Orbit",
      "Active"
    ]
  },
  {
    "id": "artemis-1",
    "name": "Artemis I",
    "alternateNames": [
      "Artemis 1",
      "Exploration Mission-1 (EM-1)"
    ],
    "programme": "Artemis Programme",
    "programmeId": "artemis",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA"
    ],
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "2022-11-16",
    "endDate": "2022-12-11",
    "launchVehicle": "Space Launch System (SLS Block 1)",
    "missionType": "Uncrewed Integrated Flight Test of SLS Rocket and Orion Spacecraft",
    "missionDuration": "25 days, 10 hours, 53 minutes",
    "description": "The historic uncrewed maiden flight test of the Space Launch System (SLS) super-heavy lift rocket and the human-rated Orion spacecraft. Orion completed a 2.25-million-kilometer voyage, entering a Distant Retrograde Orbit (DRO) 64,000 km beyond the Moon, farther than any spacecraft built for humans had ever flown. The mission proved the European Service Module (ESM) propulsion, deep space communications, and performed a skip re-entry at 40,000 km/h with the largest human-rated ablative heat shield.",
    "scientificObjectives": [
      "Demonstrate Orion spacecraft systems in deep space environment",
      "Qualify the SLS rocket during all flight phases including Trans-Lunar Injection (TLI)",
      "Test the Orion heat shield during 11 km/s lunar return entry conditions",
      "Deploy 10 scientific CubeSats into cislunar space"
    ],
    "keyAchievements": [
      "First launch of the 8.8-million-pound-thrust SLS super-heavy rocket",
      "Traveled 432,210 km (268,563 miles) from Earth, setting distance record for human-rated spacecraft",
      "Executed innovative skip-entry maneuver into Earth's atmosphere, reducing gravitational loads and fine-tuning landing precision",
      "European Service Module executed all trajectory and orbital maneuvers with exceptional fuel margin"
    ],
    "milestones": [
      {
        "label": "Liftoff of SLS Block 1 from Kennedy Space Center Pad 39B",
        "date": "2022-11-16",
        "done": true
      },
      {
        "label": "Trans-Lunar Injection burn by Interim Cryogenic Propulsion Stage (ICPS)",
        "date": "2022-11-16",
        "done": true
      },
      {
        "label": "Closest lunar flyby (130 km above surface)",
        "date": "2022-11-21",
        "done": true
      },
      {
        "label": "Insertion into Lunar Distant Retrograde Orbit (DRO)",
        "date": "2022-11-25",
        "done": true
      },
      {
        "label": "Maximum distance from Earth reached (432,210 km)",
        "date": "2022-11-28",
        "done": true
      },
      {
        "label": "Precision skip re-entry and splashdown in Pacific Ocean off Baja California",
        "date": "2022-12-11",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": "Orion Spacecraft (CM-002) / European Service Module (ESM-1)",
    "currentOperationalStatus": "Mission completed with full success. Orion spacecraft recovered and analyzed at Kennedy Space Center.",
    "historicalSignificance": "Formally inaugurated the Artemis era of human deep space exploration, proving the core hardware for return to the Moon.",
    "latestKnownUpdate": "Orion heat shield ablation and charring data applied to refine Artemis II thermal models.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/artemis-i/",
    "relatedNewsTags": [
      "Artemis I",
      "SLS",
      "Orion",
      "NASA",
      "Moon"
    ],
    "tags": [
      "Artemis",
      "Artemis 1",
      "SLS",
      "Orion",
      "Moon",
      "Lunar Orbit"
    ]
  },
  {
    "id": "artemis-2",
    "name": "Artemis II",
    "alternateNames": [
      "Artemis 2",
      "Crewed Lunar Flyby"
    ],
    "programme": "Artemis Programme",
    "programmeId": "artemis",
    "agency": "NASA",
    "partnerAgencies": [
      "CSA",
      "ESA"
    ],
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "completed",
    "launchDate": "2026-05-18",
    "endDate": "2026-05-28",
    "launchVehicle": "Space Launch System (SLS Block 1)",
    "missionType": "First Crewed Lunar Mission of the 21st Century (Lunar Flyby)",
    "missionDuration": "10 days, 1 hour, 15 minutes",
    "description": "The landmark first crewed mission of NASA’s Artemis programme, carrying Commander Reid Wiseman, Pilot Victor Glover, Mission Specialist Christina Hammock Koch, and Canadian Space Agency astronaut Jeremy Hansen on a high-speed free-return trajectory around the Moon. The mission flight-tested Orion’s life support, manual handling, deep-space optical communications, and biomedical responses with a live crew, flying over 10,000 km beyond the lunar far side before returning safely to Earth.",
    "scientificObjectives": [
      "Conduct first in-flight human evaluation of the Orion Environmental Control and Life Support System (ECLSS)",
      "Perform proximity operations and manual handling demonstration with the ICPS stage in high Earth orbit",
      "Transmit high-definition ultra-broadband video and telemetry via deep-space optical communications (O2O)",
      "Demonstrate crewed lunar free-return trajectory navigation and high-speed atmospheric recovery"
    ],
    "keyAchievements": [
      "First humans to journey beyond low Earth orbit and visit the vicinity of the Moon in over 50 years",
      "Victor Glover became the first person of color to leave Earth orbit and fly to the Moon",
      "Christina Koch became the first woman to fly around the Moon",
      "Jeremy Hansen became the first non-American international astronaut to travel to cislunar space",
      "Flawless manual handling demonstration and high-definition lunar optical transmission"
    ],
    "milestones": [
      {
        "label": "Liftoff from Kennedy Space Center Launch Complex 39B",
        "date": "2026-05-18",
        "done": true
      },
      {
        "label": "High Earth Orbit (HEO) systems shakedown and manual proximity operations",
        "date": "2026-05-19",
        "done": true
      },
      {
        "label": "Translunar injection burn executing lunar free-return trajectory",
        "date": "2026-05-20",
        "done": true
      },
      {
        "label": "Lunar far-side flyby at 10,300 km altitude",
        "date": "2026-05-23",
        "done": true
      },
      {
        "label": "Skip atmospheric re-entry at 11 km/s",
        "date": "2026-05-28",
        "done": true
      },
      {
        "label": "Safe splashdown in Pacific Ocean and crew recovery",
        "date": "2026-05-28",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "G. Reid Wiseman",
        "role": "Commander (NASA)"
      },
      {
        "name": "Victor J. Glover",
        "role": "Pilot (NASA)"
      },
      {
        "name": "Christina Hammock Koch",
        "role": "Mission Specialist 1 (NASA)"
      },
      {
        "name": "Jeremy R. Hansen",
        "role": "Mission Specialist 2 (CSA)"
      }
    ],
    "spacecraft": "Orion Spacecraft (CM-003) / European Service Module (ESM-2)",
    "currentOperationalStatus": "Mission completed in 2026. First crewed lunar flyby of the Artemis programme, verifying Orion life support and deep-space trajectory navigation before Artemis III.",
    "historicalSignificance": "Marked humanity's triumphant return to crewed deep space exploration and certified the Orion-SLS stack for human lunar landings.",
    "latestKnownUpdate": "Confirmed complete mission success; Orion telemetry and life-support data integrated into Artemis III flight readiness reviews.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/artemis-ii/",
    "relatedNewsTags": [
      "Artemis II",
      "Reid Wiseman",
      "Victor Glover",
      "Christina Koch",
      "Jeremy Hansen",
      "Orion"
    ],
    "tags": [
      "Artemis",
      "Artemis 2",
      "Human Spaceflight",
      "Moon",
      "Orion",
      "SLS",
      "Completed"
    ]
  },
  {
    "id": "artemis-3",
    "name": "Artemis III",
    "alternateNames": [
      "Artemis 3",
      "First Artemis Lunar Landing"
    ],
    "programme": "Artemis Programme",
    "programmeId": "artemis",
    "agency": "NASA",
    "partnerAgencies": [
      "SpaceX",
      "ESA",
      "Axiom Space"
    ],
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "in-development",
    "launchDate": "2027 (Targeted)",
    "endDate": null,
    "launchVehicle": "SLS Block 1 / SpaceX Starship HLS",
    "missionType": "First Artemis Crewed Lunar Landing at the Lunar South Pole",
    "missionDuration": "Approx. 30 days total (up to 6.5 days on lunar surface)",
    "description": "The monumental mission planned to return humans to the lunar surface for the first time since Apollo 17 in 1972. Four astronauts will launch aboard Orion on the SLS rocket, rendezvous with the SpaceX Starship Human Landing System (HLS) in lunar near-rectilinear halo orbit (NRHO), and two astronauts will descend to the lunar South Pole region. Equipped with next-generation Axiom Extravehicular Mobility Unit (AxEMU) spacesuits, the surface crew will conduct multiple EVAs to investigate permanently shadowed craters containing water ice.",
    "scientificObjectives": [
      "Land the first humans at the lunar South Pole to explore volatiles and water ice in permanently shadowed regions",
      "Collect and return ancient volatile and cryo-trapped samples crucial for understanding solar system history",
      "Demonstrate surface mobility, long-distance EVA operations, and in-situ resource utilization (ISRU) feasibility",
      "Conduct field geological exploration of South Pole-Aitken basin ejecta"
    ],
    "keyAchievements": [
      "Targeted to achieve the first human landing on the lunar South Pole in history",
      "Will land the first woman and first person of color on the surface of the Moon",
      "First operational utilization of commercial deep-space Human Landing System (Starship HLS)",
      "First deployment of Axiom commercial lunar exploration spacesuits"
    ],
    "milestones": [
      {
        "label": "Starship HLS uncrewed lunar landing demonstration test",
        "date": "2026-2027",
        "done": false,
        "current": true
      },
      {
        "label": "SLS Block 1 and Orion launch from KSC Pad 39B",
        "date": "2027",
        "done": false
      },
      {
        "label": "Docking with Starship HLS in Near-Rectilinear Halo Orbit (NRHO)",
        "date": "2027",
        "done": false
      },
      {
        "label": "Touchdown at lunar South Pole and execution of multiple surface EVAs",
        "date": "2027",
        "done": false
      },
      {
        "label": "Ascent from Moon, Orion redocking, and Pacific splashdown",
        "date": "2027",
        "done": false
      }
    ],
    "crew": [
      {
        "name": "To Be Announced (4 crew total, 2 landing on surface)",
        "role": "Commander, Pilot, 2 Mission Specialists"
      }
    ],
    "spacecraft": "Orion Spacecraft / SpaceX Starship Human Landing System (HLS)",
    "currentOperationalStatus": "In intensive hardware assembly and testing. Starship HLS propellant transfer tests and Axiom spacesuit thermal vacuum qualification underway.",
    "historicalSignificance": "Will restore human surface exploration of another world after over half a century and begin permanent lunar infrastructure development.",
    "latestKnownUpdate": "NASA actively reviewing propellant transfer milestones and lunar South Pole candidate landing sites.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/artemis-iii/",
    "relatedNewsTags": [
      "Artemis III",
      "Starship HLS",
      "Moon Landing",
      "South Pole",
      "Axiom Space"
    ],
    "tags": [
      "Artemis",
      "Artemis 3",
      "Moon Landing",
      "South Pole",
      "Starship HLS",
      "Human Spaceflight",
      "In-Development"
    ]
  },
  {
    "id": "artemis-4",
    "name": "Artemis IV",
    "alternateNames": [
      "Artemis 4",
      "Gateway I-HAB Mission"
    ],
    "programme": "Artemis Programme",
    "programmeId": "artemis",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA",
      "JAXA",
      "SpaceX"
    ],
    "category": "Human Spaceflight",
    "destination": "Moon",
    "status": "in-development",
    "launchDate": "2028 (Targeted)",
    "endDate": null,
    "launchVehicle": "Space Launch System Block 1B (with EUS)",
    "missionType": "First Lunar Gateway Crewed Assembly & Second Surface Landing Mission",
    "missionDuration": "Approx. 30 days",
    "description": "The first flight of the upgraded SLS Block 1B rocket equipped with the four-engine Exploration Upper Stage (EUS). Artemis IV will deliver the ESA-built International Habitat (I-HAB) to the Lunar Gateway in Near-Rectilinear Halo Orbit, dock Orion with the station, and facilitate a crewed descent to the lunar surface using an upgraded Starship HLS.",
    "scientificObjectives": [
      "Deliver and integrate the International Habitat (I-HAB) module to Lunar Gateway",
      "Conduct second Artemis crewed lunar surface exploration campaign",
      "Demonstrate multi-spacecraft operations at Gateway station"
    ],
    "keyAchievements": [
      "Debut flight of the more powerful SLS Block 1B rocket",
      "First human mission to dock with and habit the Lunar Gateway cislunar outpost",
      "Expansion of international astronaut surface landing opportunities"
    ],
    "milestones": [
      {
        "label": "Exploration Upper Stage (EUS) green run hot-fire test",
        "date": "2026-2027",
        "done": false,
        "current": true
      },
      {
        "label": "SLS Block 1B launch carrying Orion and I-HAB module",
        "date": "2028",
        "done": false
      },
      {
        "label": "Gateway rendezvous and I-HAB module installation",
        "date": "2028",
        "done": false
      },
      {
        "label": "Surface expedition touchdown and sample return",
        "date": "2028",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": "Orion / Gateway I-HAB / Starship HLS",
    "currentOperationalStatus": "In early hardware fabrication and structural testing across NASA, ESA, and prime contractors.",
    "historicalSignificance": "Establishes the permanent international orbital outpost around the Moon.",
    "latestKnownUpdate": "I-HAB module flight structure under fabrication at Thales Alenia Space in Turin, Italy.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/mission/artemis-iv/",
    "relatedNewsTags": [
      "Artemis IV",
      "Lunar Gateway",
      "I-HAB",
      "SLS Block 1B"
    ],
    "tags": [
      "Artemis",
      "Artemis 4",
      "Gateway",
      "I-HAB",
      "Moon",
      "Human Spaceflight",
      "In-Development"
    ]
  },
  {
    "id": "lunar-gateway",
    "name": "Lunar Gateway",
    "alternateNames": [
      "Gateway",
      "Lunar Orbital Platform-Gateway"
    ],
    "programme": "Gateway Programme",
    "programmeId": "gateway",
    "agency": "International Partnerships",
    "partnerAgencies": [
      "NASA",
      "ESA",
      "JAXA",
      "CSA",
      "MBRSC"
    ],
    "category": "Space Stations",
    "destination": "Moon",
    "status": "in-development",
    "launchDate": "2027 (Targeted PPE/HALO)",
    "endDate": null,
    "launchVehicle": "SpaceX Falcon Heavy",
    "missionType": "Cislunar International Human Space Station in Near-Rectilinear Halo Orbit",
    "missionDuration": "Planned 15+ year operational lifespan",
    "description": "An international space station in an eccentric Near-Rectilinear Halo Orbit (NRHO) around the Moon. Gateway will serve as a staging hub for lunar surface landings, an autonomous scientific laboratory for deep space radiation and astrophysics, and a communications relay for lunar South Pole missions. Initial elements include the Power and Propulsion Element (PPE) and Habitation and Logistics Outpost (HALO), followed by ESA’s I-HAB, JAXA logistics, and the Canadian Canadarm3 robotic system.",
    "scientificObjectives": [
      "Provide permanent cislunar orbital platform for lunar surface access and deep space transport",
      "Study space radiation, solar wind, and cosmic rays beyond Earth's protective magnetosphere",
      "Conduct autonomous uncrewed heliophysics, space weather, and lunar science when crew is absent"
    ],
    "keyAchievements": [
      "First international space station planned for orbit around a celestial body other than Earth",
      "Features high-power 50-kilowatt solar electric propulsion (SEP) for continuous orbital optimization",
      "Includes next-generation Canadarm3 intelligent autonomous robotics from Canada"
    ],
    "milestones": [
      {
        "label": "PPE and HALO integration and combined testing at KSC",
        "date": "2026-2027",
        "done": false,
        "current": true
      },
      {
        "label": "Dual launch of PPE and HALO on Falcon Heavy",
        "date": "2027",
        "done": false
      },
      {
        "label": "Transit to Near-Rectilinear Halo Orbit (NRHO) using Solar Electric Propulsion",
        "date": "2027-2028",
        "done": false
      },
      {
        "label": "Arrival of Artemis IV crew and installation of I-HAB module",
        "date": "2028",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": "Modular Cislunar Space Station (PPE, HALO, I-HAB, ESPRIT, Canadarm3)",
    "currentOperationalStatus": "PPE and HALO flight hardware in advanced integration; solar electric propulsion systems undergoing vacuum endurance validation.",
    "historicalSignificance": "The core staging infrastructure that shifts human space exploration from short Apollo-style sorties to permanent interplanetary presence.",
    "latestKnownUpdate": "HALO primary structure completed; Maxar progressing with PPE ion propulsion testing.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/gateway/",
    "relatedNewsTags": [
      "Gateway",
      "Lunar Gateway",
      "PPE",
      "HALO",
      "Canadarm3"
    ],
    "tags": [
      "Space Stations",
      "Gateway",
      "Moon",
      "NRHO",
      "International Partnerships",
      "In-Development"
    ]
  },
  {
    "id": "pioneer-10",
    "name": "Pioneer 10",
    "alternateNames": [
      "Pioneer F"
    ],
    "programme": "Pioneer Programme",
    "programmeId": "pioneer",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Jupiter & Interstellar Space",
    "status": "retired",
    "launchDate": "1972-03-03",
    "endDate": "2003-01-23",
    "launchVehicle": "Atlas-Centaur",
    "missionType": "Planetary Flyby & Outer Solar System Probe",
    "missionDuration": "30 years, 10 months",
    "description": "First spacecraft to traverse the Asteroid Belt and make direct observations of Jupiter, pioneering deep-space navigation and outer solar system exploration.",
    "scientificObjectives": [
      "Survey the interplanetary medium past the orbit of Mars and through the Asteroid Belt",
      "Investigate Jupiter's intense radiation belts and magnetic field",
      "Acquire first close-up photographs of Jupiter and its Galilean satellites"
    ],
    "keyAchievements": [
      "First spacecraft to traverse the Asteroid Belt safely",
      "First close-up reconnaissance of Jupiter (closest approach December 4, 1973)",
      "First human-made object to achieve escape velocity from the Solar System"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral SLC-36A",
        "date": "1972-03-03",
        "done": true
      },
      {
        "label": "Entered Asteroid Belt",
        "date": "1972-07-15",
        "done": true
      },
      {
        "label": "Closest Jupiter flyby (132,252 km)",
        "date": "1973-12-04",
        "done": true
      },
      {
        "label": "Crossed Neptune orbit (then outermost planet)",
        "date": "1983-06-13",
        "done": true
      },
      {
        "label": "Final telemetry signal received",
        "date": "2003-01-23",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Spin-stabilized deep space probe with 2.74 m parabolic antenna",
      "manufacturer": "TRW Systems Group",
      "massKg": 258,
      "powerSource": "Four SNAP-19 Radioisotope Thermoelectric Generators (RTGs)"
    },
    "currentOperationalStatus": "Mission concluded; last faint signal received January 23, 2003 from 12 billion km (80 AU). Coasting toward Aldebaran.",
    "historicalSignificance": "Proved the Asteroid Belt could be safely traversed and established operational procedures for deep-space outer planet exploration, carrying the iconic Pioneer Plaque.",
    "latestKnownUpdate": "Passive interstellar flight toward the red giant Aldebaran in the constellation Taurus, estimated to arrive in ~2 million years.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/pioneer-10/",
    "relatedNewsTags": [
      "Pioneer 10",
      "Pioneer Plaque",
      "Deep Space Network",
      "Interstellar"
    ],
    "tags": [
      "Pioneer",
      "Pioneer 10",
      "Jupiter",
      "Interstellar",
      "Outer Solar System",
      "NASA Historic"
    ]
  },
  {
    "id": "pioneer-11",
    "name": "Pioneer 11",
    "alternateNames": [
      "Pioneer G"
    ],
    "programme": "Pioneer Programme",
    "programmeId": "pioneer",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Jupiter, Saturn & Interstellar Space",
    "status": "retired",
    "launchDate": "1974-04-06",
    "endDate": "1995-09-30",
    "launchVehicle": "Atlas-Centaur",
    "missionType": "Planetary Flyby Probe",
    "missionDuration": "21 years, 5 months",
    "description": "Second probe to investigate Jupiter and the first spacecraft to achieve direct close reconnaissance of Saturn and its rings, pathfinding for the Voyager missions.",
    "scientificObjectives": [
      "Fly within 43,000 km of Jupiter's cloud tops to observe polar regions",
      "Execute gravity assist to intercept Saturn",
      "Reconnoiter Saturn's ring system and environment to verify safe passage for Voyager"
    ],
    "keyAchievements": [
      "First close-up reconnaissance and flyby of Saturn (September 1, 1979)",
      "Discovered Saturn's F ring and new moons Epimetheus and Janus confirmation",
      "Pioneered gravity-assist redirection across the solar system plane"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "1974-04-06",
        "done": true
      },
      {
        "label": "Jupiter closest approach (42,828 km)",
        "date": "1974-12-03",
        "done": true
      },
      {
        "label": "Saturn flyby (21,000 km above cloud tops)",
        "date": "1979-09-01",
        "done": true
      },
      {
        "label": "Final communications received",
        "date": "1995-09-30",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Spin-stabilized deep space probe",
      "manufacturer": "TRW Systems Group",
      "massKg": 259,
      "powerSource": "SNAP-19 RTGs"
    },
    "currentOperationalStatus": "Mission ended; spacecraft power exhausted in 1995. Coasting toward the constellation Aquila.",
    "historicalSignificance": "Confirmed the safety of Saturn's ring-plane crossings for Voyager 1 and 2, securing humanity's first detailed views of the ringed world.",
    "latestKnownUpdate": "Traveling at ~11.2 km/s toward the stars in the constellation of Aquila.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/pioneer-11/",
    "relatedNewsTags": [
      "Pioneer 11",
      "Saturn",
      "Jupiter",
      "F Ring"
    ],
    "tags": [
      "Pioneer",
      "Pioneer 11",
      "Saturn",
      "Jupiter",
      "Deep Space",
      "NASA"
    ]
  },
  {
    "id": "voyager-1",
    "name": "Voyager 1",
    "alternateNames": [
      "Voyager-A"
    ],
    "programme": "Voyager Programme",
    "programmeId": "voyager",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Interstellar Space",
    "status": "active",
    "launchDate": "1977-09-05",
    "endDate": null,
    "launchVehicle": "Titan IIIE-Centaur",
    "missionType": "Grand Tour Flyby & Interstellar Mission",
    "missionDuration": "49+ years (ongoing)",
    "description": "Humanity's most distant robotic emissary, the first spacecraft to cross the heliopause and enter interstellar space, conducting in-situ plasma and magnetic field measurements beyond our Sun.",
    "scientificObjectives": [
      "Explore the outer planets Jupiter and Saturn and their moon systems",
      "Conduct close reconnaissance of Saturn's largest moon Titan",
      "Determine the boundary of the heliosphere and measure interstellar plasma"
    ],
    "keyAchievements": [
      "Discovered active volcanism on Io (first active volcanism beyond Earth)",
      "Detailed survey of Saturn's complex ring system and Titan's thick atmosphere",
      "Captured the famous \"Pale Blue Dot\" solar system portrait in 1990",
      "Crossed the heliopause into interstellar space on August 25, 2012"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral LC-41",
        "date": "1977-09-05",
        "done": true
      },
      {
        "label": "Jupiter flyby (closest approach 348,890 km)",
        "date": "1979-03-05",
        "done": true
      },
      {
        "label": "Saturn flyby (closest approach 124,000 km)",
        "date": "1980-11-12",
        "done": true
      },
      {
        "label": "Crossed heliopause into interstellar space (121 AU)",
        "date": "2012-08-25",
        "done": true
      },
      {
        "label": "FDS memory glitch repaired remotely by JPL engineers",
        "date": "2024-05-19",
        "done": true
      },
      {
        "label": "Operating 4 scientific instruments in interstellar space",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized interstellar probe with 3.66 m high-gain antenna",
      "manufacturer": "NASA Jet Propulsion Laboratory (JPL)",
      "massKg": 825.5,
      "powerSource": "Three Multi-Hundred-Watt (MHW) RTGs"
    },
    "currentOperationalStatus": "Active and communicating via Deep Space Network from ~165+ AU (~24.7 billion km). Operating magnetometer, plasma wave instrument, low energy charged particle instrument, and cosmic ray subsystem.",
    "historicalSignificance": "The furthest human-made artifact from Earth; transformed our view of outer planetary systems and returned the first direct physical measurements of the interstellar medium.",
    "latestKnownUpdate": "JPL successfully reassigned power management parameters in 2024-2026, keeping all 4 active science instruments operating despite declining RTG thermal output.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/voyager-1/",
    "relatedNewsTags": [
      "Voyager 1",
      "Interstellar",
      "JPL",
      "Deep Space Network",
      "Heliopause"
    ],
    "tags": [
      "Voyager",
      "Voyager 1",
      "Interstellar",
      "Jupiter",
      "Saturn",
      "Deep Space",
      "NASA Active"
    ]
  },
  {
    "id": "voyager-2",
    "name": "Voyager 2",
    "alternateNames": [
      "Voyager-B"
    ],
    "programme": "Voyager Programme",
    "programmeId": "voyager",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Interstellar Space",
    "status": "active",
    "launchDate": "1977-08-20",
    "endDate": null,
    "launchVehicle": "Titan IIIE-Centaur",
    "missionType": "Grand Tour of Outer Planets & Interstellar Probe",
    "missionDuration": "49+ years (ongoing)",
    "description": "The only spacecraft to visit all four outer gas and ice giant planets—Jupiter, Saturn, Uranus, and Neptune—now exploring interstellar space alongside Voyager 1.",
    "scientificObjectives": [
      "Complete the Grand Tour trajectory across Jupiter, Saturn, Uranus, and Neptune",
      "Discover and characterize ring systems, magnetospheres, and moons of ice giants",
      "Measure interstellar magnetic fields, cosmic rays, and solar wind termination"
    ],
    "keyAchievements": [
      "Only spacecraft in history to explore Uranus (1986) and Neptune (1989)",
      "Discovered nitrogen ice geysers on Neptune's moon Triton",
      "Discovered 11 new moons at Uranus and 6 at Neptune",
      "Crossed the heliopause into interstellar space on November 5, 2018"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral LC-41",
        "date": "1977-08-20",
        "done": true
      },
      {
        "label": "Jupiter flyby",
        "date": "1979-07-09",
        "done": true
      },
      {
        "label": "Saturn flyby",
        "date": "1981-08-26",
        "done": true
      },
      {
        "label": "Uranus closest approach (81,500 km)",
        "date": "1986-01-24",
        "done": true
      },
      {
        "label": "Neptune closest approach (4,950 km)",
        "date": "1989-08-25",
        "done": true
      },
      {
        "label": "Entered interstellar space (119 AU)",
        "date": "2018-11-05",
        "done": true
      },
      {
        "label": "Active science telemetry in interstellar medium",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized deep space probe with 3.66 m high-gain antenna",
      "manufacturer": "NASA Jet Propulsion Laboratory (JPL)",
      "massKg": 825.5,
      "powerSource": "Three MHW-RTGs"
    },
    "currentOperationalStatus": "Active and transmitting from ~137+ AU (~20.5 billion km). Plasma Science (PLS) instrument working and directly measuring interstellar plasma density.",
    "historicalSignificance": "The definitive survey mission of our solar system's ice giants, providing baseline knowledge of Uranus and Neptune that remains unmatched.",
    "latestKnownUpdate": "Telemetry link maintained via the Canberra DSN 70m antenna; power management protocol extending science observations through late 2026.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/voyager-2/",
    "relatedNewsTags": [
      "Voyager 2",
      "Uranus",
      "Neptune",
      "Interstellar",
      "Triton"
    ],
    "tags": [
      "Voyager",
      "Voyager 2",
      "Uranus",
      "Neptune",
      "Interstellar",
      "NASA Active"
    ]
  },
  {
    "id": "mariner-4",
    "name": "Mariner 4",
    "alternateNames": [
      "Mariner-D"
    ],
    "programme": "Mariner Programme",
    "programmeId": "mariner",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars",
    "status": "retired",
    "launchDate": "1964-11-28",
    "endDate": "1967-12-21",
    "launchVehicle": "Atlas-Agena D",
    "missionType": "Mars Flyby Probe",
    "missionDuration": "3 years, 1 month",
    "description": "First successful flyby of Mars, returning the first close-up photographs of another planet from deep space and ending long-held myths of Martian canals and vegetation.",
    "scientificObjectives": [
      "Acquire close-range television imagery of the Martian surface",
      "Determine atmospheric pressure and composition via radio occultation",
      "Measure interplanetary magnetic fields and cosmic dust"
    ],
    "keyAchievements": [
      "Returned 21 historic close-up digital photographs of Mars's cratered surface",
      "Demonstrated Mars has an extremely thin atmosphere (under 1% of Earth's surface pressure)",
      "Dispelled the popular scientific conception of a wet, vegetated Martian environment"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral LC-12",
        "date": "1964-11-28",
        "done": true
      },
      {
        "label": "Mars closest approach (9,846 km)",
        "date": "1965-07-15",
        "done": true
      },
      {
        "label": "Transmitted first digital image data strip to Earth",
        "date": "1965-07-15",
        "done": true
      },
      {
        "label": "Final communications received",
        "date": "1967-12-21",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Octagonal magnesium frame with four solar panels",
      "manufacturer": "JPL",
      "massKg": 260.8,
      "powerSource": "Four solar panels providing 310 W at Mars"
    },
    "currentOperationalStatus": "Mission concluded; spacecraft derelict in heliocentric orbit.",
    "historicalSignificance": "Revolutionized our planetary perspective by revealing Mars as a cratered, desolate, thin-air world rather than an Earth-like canal-bearing planet.",
    "latestKnownUpdate": "Orbiting the Sun as a derelict spacecraft.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mariner-4/",
    "relatedNewsTags": [
      "Mariner 4",
      "Mars",
      "First Martian Photos",
      "JPL"
    ],
    "tags": [
      "Mariner",
      "Mariner 4",
      "Mars",
      "Flyby",
      "Historic",
      "NASA"
    ]
  },
  {
    "id": "mariner-9",
    "name": "Mariner 9",
    "alternateNames": [
      "Mariner Mars 71"
    ],
    "programme": "Mariner Programme",
    "programmeId": "mariner",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars Orbit",
    "status": "retired",
    "launchDate": "1971-05-30",
    "endDate": "1972-10-27",
    "launchVehicle": "Atlas-Centaur",
    "missionType": "Mars Orbiter",
    "missionDuration": "1 year, 5 months",
    "description": "First spacecraft to orbit another planet, outlasting a global Martian dust storm to map 85% of Mars and discovering massive volcanoes, gigantic canyons, and dry river valleys.",
    "scientificObjectives": [
      "Insert into orbit around Mars to map the planet at 1 km resolution",
      "Study temporal changes in atmosphere and surface features",
      "Reconnoiter landing sites for future Viking landers"
    ],
    "keyAchievements": [
      "First artificial satellite of Mars and first spacecraft to orbit any planet (November 14, 1971)",
      "Discovered Olympus Mons (largest volcano in the Solar System) and Valles Marineris (canyon system named in honor of Mariner 9)",
      "Returned 7,329 images covering 85% of the globe, revealing ancient water-carved channels"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "1971-05-30",
        "done": true
      },
      {
        "label": "Mars orbit insertion",
        "date": "1971-11-14",
        "done": true
      },
      {
        "label": "Waited out planet-encircling dust storm",
        "date": "1971-12-01",
        "done": true
      },
      {
        "label": "First mapping passes of Olympus Mons and Valles Marineris",
        "date": "1972-01-10",
        "done": true
      },
      {
        "label": "Attitude control gas depleted; mission shut down",
        "date": "1972-10-27",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized Mars orbiter",
      "manufacturer": "JPL",
      "massKg": 997.9,
      "powerSource": "Four solar panels providing 800 W at Earth / 500 W at Mars"
    },
    "currentOperationalStatus": "Decommissioned in Mars orbit. Projected to decay into the Martian atmosphere by ~2022-2030.",
    "historicalSignificance": "Proved Mars had a geologically dynamic and wet past, fundamentally establishing the modern paradigm of Mars science and water hunting.",
    "latestKnownUpdate": "Expected to remain in derelict Mars orbit until atmospheric drag induces breakup.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mariner-9/",
    "relatedNewsTags": [
      "Mariner 9",
      "Olympus Mons",
      "Valles Marineris",
      "Mars Orbit"
    ],
    "tags": [
      "Mariner",
      "Mariner 9",
      "Mars",
      "Orbiter",
      "Historic",
      "NASA"
    ]
  },
  {
    "id": "mariner-10",
    "name": "Mariner 10",
    "alternateNames": [
      "Mariner Venus-Mercury 1973"
    ],
    "programme": "Mariner Programme",
    "programmeId": "mariner",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Venus & Mercury",
    "status": "retired",
    "launchDate": "1973-11-03",
    "endDate": "1975-03-24",
    "launchVehicle": "Atlas-Centaur",
    "missionType": "Interplanetary Gravity-Assist Flyby Probe",
    "missionDuration": "1 year, 4 months",
    "description": "First spacecraft to visit Mercury and the first mission to use an interplanetary gravitational slingshot maneuver (at Venus) to reach its target destination.",
    "scientificObjectives": [
      "Measure Mercury's environment, atmosphere, surface, and physical characteristics",
      "Perform ultraviolet imaging of Venus's upper atmospheric cloud deck",
      "Test solar radiation pressure for attitude control"
    ],
    "keyAchievements": [
      "First spacecraft to utilize gravity assist to reshape its interplanetary trajectory",
      "First close-range images of Venus in ultraviolet light",
      "First close encounters with Mercury (three flybys: March 1974, September 1974, March 1975)",
      "Discovered Mercury's unexpected global dipole magnetic field"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "1973-11-03",
        "done": true
      },
      {
        "label": "Venus gravity-assist flyby",
        "date": "1974-02-05",
        "done": true
      },
      {
        "label": "First Mercury flyby (703 km)",
        "date": "1974-03-29",
        "done": true
      },
      {
        "label": "Second Mercury flyby (48,069 km)",
        "date": "1974-09-21",
        "done": true
      },
      {
        "label": "Third Mercury flyby (327 km)",
        "date": "1975-03-16",
        "done": true
      },
      {
        "label": "Attitude fuel depleted; transmitters disabled",
        "date": "1975-03-24",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with steerable high-gain dish and solar panels",
      "manufacturer": "Boeing / JPL",
      "massKg": 502.9,
      "powerSource": "Solar panels providing 540 W at Mercury"
    },
    "currentOperationalStatus": "Decommissioned in heliocentric orbit.",
    "historicalSignificance": "Pioneered gravity-assist orbital mechanics used by all subsequent outer solar system probes and provided humanity's sole close-up Mercury observations until MESSENGER in 2008.",
    "latestKnownUpdate": "Orbiting the Sun in an approximately 176-day orbit.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mariner-10/",
    "relatedNewsTags": [
      "Mariner 10",
      "Mercury",
      "Venus",
      "Gravity Assist"
    ],
    "tags": [
      "Mariner",
      "Mariner 10",
      "Mercury",
      "Venus",
      "Flyby",
      "NASA Historic"
    ]
  },
  {
    "id": "viking-1",
    "name": "Viking 1",
    "alternateNames": [
      "Viking A"
    ],
    "programme": "Viking Programme",
    "programmeId": "viking",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Chryse Planitia)",
    "status": "retired",
    "launchDate": "1975-08-20",
    "endDate": "1982-11-13",
    "launchVehicle": "Titan IIIE-Centaur",
    "missionType": "Mars Orbiter & Lander",
    "missionDuration": "Orbiter: 4 years; Lander: 6 years, 3 months",
    "description": "Comprising an orbiter and lander, Viking 1 achieved the first long-duration, fully successful landing on Mars, transmitting the first color surface panoramas and running biology experiments.",
    "scientificObjectives": [
      "High-resolution orbital mapping of Mars",
      "Safely land on Mars to analyze surface composition, seismology, and meteorology",
      "Conduct robotic biology assays for biosignatures in Martian soil"
    ],
    "keyAchievements": [
      "First fully successful soft touchdown on Mars (July 20, 1976)",
      "Transmitted first color photographs from the surface of Mars",
      "Conducted three biological experiments searching for microbial metabolism",
      "Orbiter mapped over 97% of the Martian surface"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral LC-41",
        "date": "1975-08-20",
        "done": true
      },
      {
        "label": "Mars orbit insertion",
        "date": "1976-06-19",
        "done": true
      },
      {
        "label": "Viking 1 Lander touchdown at Chryse Planitia",
        "date": "1976-07-20",
        "done": true
      },
      {
        "label": "First color surface photo transmitted",
        "date": "1976-07-21",
        "done": true
      },
      {
        "label": "Orbiter powered down",
        "date": "1980-08-17",
        "done": true
      },
      {
        "label": "Lander communications lost due to faulty uplink command",
        "date": "1982-11-13",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Dual spacecraft (Orbiter + Lander with aeroshell heat shield and terminal descent engines)",
      "manufacturer": "Martin Marietta (Lander) / JPL (Orbiter)",
      "massKg": 3527,
      "powerSource": "Orbiter: Solar panels (620 W); Lander: Two SNAP-19 RTGs (57 W)"
    },
    "currentOperationalStatus": "Mission completed. Lander remains intact at Chryse Planitia (Thomas Mutch Memorial Station).",
    "historicalSignificance": "The first successful long-lived operational outpost on the Martian surface, pioneering in-situ astrobiology experiments.",
    "latestKnownUpdate": "Preserved indefinitely on the Martian plains of Chryse Planitia.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/viking-1/",
    "relatedNewsTags": [
      "Viking 1",
      "Mars Lander",
      "Chryse Planitia",
      "Martian Soil"
    ],
    "tags": [
      "Viking",
      "Viking 1",
      "Mars",
      "Lander",
      "Orbiter",
      "NASA Historic"
    ]
  },
  {
    "id": "viking-2",
    "name": "Viking 2",
    "alternateNames": [
      "Viking B"
    ],
    "programme": "Viking Programme",
    "programmeId": "viking",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Utopia Planitia)",
    "status": "retired",
    "launchDate": "1975-09-09",
    "endDate": "1980-04-11",
    "launchVehicle": "Titan IIIE-Centaur",
    "missionType": "Mars Orbiter & Lander",
    "missionDuration": "Orbiter: 2 years; Lander: 3.5 years",
    "description": "Sister spacecraft to Viking 1, landing at high northern latitude Utopia Planitia, verifying water ice frost on the Martian surface and capturing complementary global orbital data.",
    "scientificObjectives": [
      "Analyze the Martian atmosphere and surface composition at northern latitudes",
      "Investigate surface frost cycles and meteorology",
      "Execute complementary biological tests for organic synthesis"
    ],
    "keyAchievements": [
      "Touchdown at Utopia Planitia on September 3, 1976",
      "Directly imaged water ice frost accumulating on the Martian rocks and regolith during winter",
      "Orbiter completed 706 orbits returning 16,000 images"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "1975-09-09",
        "done": true
      },
      {
        "label": "Mars orbit insertion",
        "date": "1976-08-07",
        "done": true
      },
      {
        "label": "Lander touchdown at Utopia Planitia",
        "date": "1976-09-03",
        "done": true
      },
      {
        "label": "Orbiter retired due to propulsion leak",
        "date": "1978-07-25",
        "done": true
      },
      {
        "label": "Lander retired due to battery failure",
        "date": "1980-04-11",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Dual Orbiter and Lander system",
      "manufacturer": "Martin Marietta (Lander) / JPL (Orbiter)",
      "massKg": 3527,
      "powerSource": "RTGs on Lander; Solar array on Orbiter"
    },
    "currentOperationalStatus": "Mission concluded; lander rests quietly at Utopia Planitia.",
    "historicalSignificance": "Provided the first photographic confirmation of winter water-frost condensation on the Martian surface.",
    "latestKnownUpdate": "Permanent surface relic on Utopia Planitia.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/viking-2/",
    "relatedNewsTags": [
      "Viking 2",
      "Utopia Planitia",
      "Mars Frost",
      "Viking Biology"
    ],
    "tags": [
      "Viking",
      "Viking 2",
      "Mars",
      "Lander",
      "Orbiter",
      "NASA Historic"
    ]
  },
  {
    "id": "mars-pathfinder",
    "name": "Mars Pathfinder & Sojourner",
    "alternateNames": [
      "Discovery 2",
      "MESUR Pathfinder"
    ],
    "programme": "Mars Exploration Rover Programme",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Ares Vallis)",
    "status": "completed",
    "launchDate": "1996-12-04",
    "endDate": "1997-09-27",
    "launchVehicle": "Delta II 7925",
    "missionType": "Mars Lander & Rover Technology Demonstrator",
    "missionDuration": "Lander: 83 sols; Rover: 83 sols (designed for 7)",
    "description": "Pioneered airbag landing technology and delivered Sojourner, the first wheeled planetary rover on Mars, inaugurating modern surface mobility and the \"Faster, Better, Cheaper\" exploration era.",
    "scientificObjectives": [
      "Demonstrate low-cost entry, descent, and landing using an innovative airbag cushion system",
      "Deploy the first mobile autonomous microrover on another world",
      "Conduct chemical elemental analysis of Martian rocks (e.g., Barnacle Bill, Yogi)"
    ],
    "keyAchievements": [
      "First mobile robotic rover deployed on Mars (Sojourner)",
      "Traversed ~100 meters across Ares Vallis and performed 15 alpha proton X-ray spectrometer (APXS) chemical analyses",
      "Generated world-wide internet excitement with millions of daily web visitors"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "1996-12-04",
        "done": true
      },
      {
        "label": "Airbag-cushioned direct touchdown at Ares Vallis",
        "date": "1997-07-04",
        "done": true
      },
      {
        "label": "Sojourner rover egressed ramp onto Martian soil",
        "date": "1997-07-06",
        "done": true
      },
      {
        "label": "Completed chemical analysis of rock Barnacle Bill",
        "date": "1997-07-08",
        "done": true
      },
      {
        "label": "Final transmission received",
        "date": "1997-09-27",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Tetrahedral base station lander with egress ramps and 6-wheel rocker-bogie microrover",
      "manufacturer": "JPL",
      "massKg": 890,
      "powerSource": "Lander: Solar cells + battery; Sojourner rover: 0.22 m² solar panel (16 W peak)"
    },
    "currentOperationalStatus": "Mission completed. Station designated Sagan Memorial Station.",
    "historicalSignificance": "Proved the viability of planetary rovers and the rocker-bogie suspension system that formed the mechanical DNA for Spirit, Opportunity, Curiosity, and Perseverance.",
    "latestKnownUpdate": "Permanent historic installation at Ares Vallis.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
    "relatedNewsTags": [
      "Pathfinder",
      "Sojourner",
      "Ares Vallis",
      "Carl Sagan Memorial Station"
    ],
    "tags": [
      "Mars",
      "Pathfinder",
      "Sojourner",
      "Rover",
      "Lander",
      "NASA Completed"
    ]
  },
  {
    "id": "mer-spirit",
    "name": "Mars Exploration Rover: Spirit",
    "alternateNames": [
      "MER-A",
      "MER-2"
    ],
    "programme": "Mars Exploration Rover Programme",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Gusev Crater)",
    "status": "completed",
    "launchDate": "2003-06-10",
    "endDate": "2010-03-22",
    "launchVehicle": "Delta II 7925",
    "missionType": "Long-Duration Surface Mobile Science Rover",
    "missionDuration": "6 years, 2 months, 19 days (designed for 90 sols)",
    "description": "First of the twin MER rovers, Spirit survived over six years exploring Gusev Crater and the Columbia Hills, discovering past hydrothermal hot-spring environments.",
    "scientificObjectives": [
      "Search for and characterize rocks and soils indicating past wet environments in Gusev Crater",
      "Ascend the Columbia Hills to inspect ancient volcanic and sedimentary stratigraphy",
      "Determine the distribution and composition of iron-bearing minerals and silicates"
    ],
    "keyAchievements": [
      "Operated for over 2,210 sols, 25 times beyond its planned primary mission lifetime",
      "Summited Husband Hill, offering panoramic vistas of the Gusev crater floor",
      "Accidentally uncovered 90% pure silica deposits with a jammed front wheel, proving ancient volcanic fumaroles or hot springs"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral SLC-17A",
        "date": "2003-06-10",
        "done": true
      },
      {
        "label": "Airbag touchdown in Gusev Crater",
        "date": "2004-01-04",
        "done": true
      },
      {
        "label": "Summited Husband Hill",
        "date": "2005-08-21",
        "done": true
      },
      {
        "label": "Uncovered pure silica deposit at Home Plate",
        "date": "2007-05-01",
        "done": true
      },
      {
        "label": "Became entrapped in soft soil at Troy",
        "date": "2009-05-01",
        "done": true
      },
      {
        "label": "Final communications received prior to Martian winter",
        "date": "2010-03-22",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "6-wheel rocker-bogie planetary rover with robotic arm and mast cameras",
      "manufacturer": "JPL",
      "massKg": 185,
      "powerSource": "Triple-junction GaAs solar arrays (up to 140 W)"
    },
    "currentOperationalStatus": "Mission concluded; rover remains in place at Troy in Gusev Crater.",
    "historicalSignificance": "Provided incontrovertible evidence of ancient hydrothermal activity on Mars where mineral-rich hot water once circulated.",
    "latestKnownUpdate": "Permanent relic at the Home Plate volcanic plateau on Mars.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mer-spirit/",
    "relatedNewsTags": [
      "Spirit Rover",
      "MER-A",
      "Gusev Crater",
      "Columbia Hills",
      "Silica"
    ],
    "tags": [
      "MER",
      "Spirit",
      "Mars",
      "Rover",
      "Geology",
      "NASA Completed"
    ]
  },
  {
    "id": "mer-opportunity",
    "name": "Mars Exploration Rover: Opportunity",
    "alternateNames": [
      "MER-B",
      "MER-1"
    ],
    "programme": "Mars Exploration Rover Programme",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Meridiani Planum)",
    "status": "completed",
    "launchDate": "2003-07-07",
    "endDate": "2018-06-10",
    "launchVehicle": "Delta II 7925H",
    "missionType": "Long-Duration Planetary Exploration Rover",
    "missionDuration": "14 years, 4 months, 17 days (designed for 90 days)",
    "description": "Humanity's marathon runner on another world, Opportunity explored Meridiani Planum for nearly 15 years, proving liquid acidic groundwater once saturated ancient Mars.",
    "scientificObjectives": [
      "Investigate sulfate-rich layered deposits at Meridiani Planum",
      "Determine if liquid water was persistent enough to sustain microbial life",
      "Examine crater rims (Eagle, Endurance, Victoria, and Endeavour) for deep stratigraphic history"
    ],
    "keyAchievements": [
      "Drove 45.16 kilometers (28.06 miles), setting the off-world driving distance record",
      "Discovered hematite spherules (\"blueberries\") formed in neutral-to-acidic standing water",
      "Discovered gypsum veins at Endeavour Crater, proving gentle water circulated in underground fractures"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "2003-07-07",
        "done": true
      },
      {
        "label": "Hole-in-one touchdown inside Eagle Crater",
        "date": "2004-01-25",
        "done": true
      },
      {
        "label": "Discovered hematite blueberries",
        "date": "2004-02-15",
        "done": true
      },
      {
        "label": "Reached rim of giant Victoria Crater",
        "date": "2006-09-26",
        "done": true
      },
      {
        "label": "Reached Endeavour Crater after 3-year trek",
        "date": "2011-08-09",
        "done": true
      },
      {
        "label": "Completed marathon distance (42.195 km)",
        "date": "2015-03-24",
        "done": true
      },
      {
        "label": "Engulfed by planet-encircling dust storm in Perseverance Valley",
        "date": "2018-06-10",
        "done": true
      },
      {
        "label": "NASA officially concluded mission after 1,000 recovery attempts",
        "date": "2019-02-13",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "6-wheel rocker-bogie planetary rover",
      "manufacturer": "JPL",
      "massKg": 185,
      "powerSource": "Triple-junction GaAs solar arrays with dust-cleaning wind events"
    },
    "currentOperationalStatus": "Mission completed; rested in Perseverance Valley on the rim of Endeavour Crater.",
    "historicalSignificance": "Rewrote the textbook on Mars with proof of persistent standing water, surviving 55 times longer than engineered expectations.",
    "latestKnownUpdate": "Permanent memorial in Perseverance Valley, Meridiani Planum.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mer-opportunity/",
    "relatedNewsTags": [
      "Opportunity",
      "MER-B",
      "Oppy",
      "Endeavour Crater",
      "Blueberries"
    ],
    "tags": [
      "MER",
      "Opportunity",
      "Mars",
      "Rover",
      "Marathon",
      "NASA Completed"
    ]
  },
  {
    "id": "msl-curiosity",
    "name": "Mars Science Laboratory: Curiosity",
    "alternateNames": [
      "MSL"
    ],
    "programme": "Mars Science Laboratory",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Gale Crater & Mount Sharp)",
    "status": "active",
    "launchDate": "2011-11-26",
    "endDate": null,
    "launchVehicle": "Atlas V 541",
    "missionType": "Analytical Chem-Lab Planetary Rover",
    "missionDuration": "14+ years (ongoing)",
    "description": "A car-sized analytical astrobiology laboratory on wheels that established Gale Crater once hosted long-lived, habitable freshwater lakes containing essential organic compounds.",
    "scientificObjectives": [
      "Assess whether Mars ever had an environment able to support microbial life",
      "Investigate the role of water in Gale Crater through mineralogical analyses",
      "Climb Mount Sharp (Aeolis Mons) to examine billions of years of environmental transition"
    ],
    "keyAchievements": [
      "Pioneered the revolutionary Sky Crane rocket-descent landing technique",
      "Drilled and analyzed ancient mudstones at Yellowknife Bay, confirming a habitable ancient freshwater lake",
      "Detected indigenous organic molecules in 3-billion-year-old mudstone samples",
      "Discovered episodic, background variations in atmospheric methane"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral SLC-41",
        "date": "2011-11-26",
        "done": true
      },
      {
        "label": "Sky Crane touchdown in Gale Crater",
        "date": "2012-08-06",
        "done": true
      },
      {
        "label": "Drilled Yellowknife Bay; declared Mars habitable",
        "date": "2013-02-08",
        "done": true
      },
      {
        "label": "Began ascent of lower Mount Sharp",
        "date": "2014-09-11",
        "done": true
      },
      {
        "label": "Discovered ancient organic compounds preserved in rocks",
        "date": "2018-06-07",
        "done": true
      },
      {
        "label": "Ascending Gediz Vallis channel in search of ancient water flows",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "1-tonne 6-wheel rover with robotic arm, turret drill, SAM and CheMin laboratories",
      "manufacturer": "JPL",
      "massKg": 899,
      "powerSource": "Multi-Mission Radioisotope Thermoelectric Generator (MMRTG) producing ~110 W"
    },
    "currentOperationalStatus": "Active and actively drilling on the sulfate-bearing unit and Gediz Vallis ridge on Mount Sharp. All core analytical suites operational.",
    "historicalSignificance": "Answered the foundational astrobiology question: Mars definitely had habitable environments with all basic chemical ingredients for life.",
    "latestKnownUpdate": "Curiosity is currently investigating debris channels along Gediz Vallis, searching for evidence of the youngest major water episodes in Gale Crater.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/msl-curiosity/",
    "relatedNewsTags": [
      "Curiosity Rover",
      "Mount Sharp",
      "Gale Crater",
      "Mars Organics",
      "Gediz Vallis"
    ],
    "tags": [
      "MSL",
      "Curiosity",
      "Mars",
      "Rover",
      "Astrobiology",
      "Gale Crater",
      "NASA Active"
    ]
  },
  {
    "id": "mars-2020-perseverance",
    "name": "Mars 2020: Perseverance",
    "alternateNames": [
      "Percy"
    ],
    "programme": "Mars 2020",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Jezero Crater)",
    "status": "active",
    "launchDate": "2020-07-30",
    "endDate": null,
    "launchVehicle": "Atlas V 541",
    "missionType": "Sample Collection & Astrobiology Rover",
    "missionDuration": "6+ years (ongoing)",
    "description": "NASA's flagship astrobiology rover exploring Jezero Crater's ancient river delta, collecting and sealing sealed core samples for future Mars Sample Return to Earth.",
    "scientificObjectives": [
      "Search for biosignatures in ancient lake and river delta deposits",
      "Collect and seal a diverse suite of scientifically pristine rock and regolith cores",
      "Produce oxygen from Martian CO2 with the MOXIE technology demonstration",
      "Deploy the first aerial rotorcraft on Mars (Ingenuity)"
    ],
    "keyAchievements": [
      "Successfully landed via Terrain-Relative Navigation Sky Crane into Jezero Crater",
      "Extracted and hermetically sealed 25+ rock, regolith, and atmospheric samples",
      "Established the \"Three Forks\" sample depot as backup for Mars Sample Return",
      "Demonstrated in-situ oxygen production via MOXIE (122 grams produced total)"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral",
        "date": "2020-07-30",
        "done": true
      },
      {
        "label": "Touchdown in Jezero Crater",
        "date": "2021-02-18",
        "done": true
      },
      {
        "label": "Deployed Ingenuity helicopter onto surface",
        "date": "2021-04-03",
        "done": true
      },
      {
        "label": "First sealed rock core collected (Montdenier)",
        "date": "2021-09-01",
        "done": true
      },
      {
        "label": "Completed Three Forks surface sample depot cache",
        "date": "2023-01-29",
        "done": true
      },
      {
        "label": "Ascending Jezero Crater rim into Neretva Vallis breach",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Advanced 1025 kg nuclear-powered rover with drill, rotary percussive corer, PIXL, SHERLOC, SuperCam",
      "manufacturer": "JPL",
      "massKg": 1025,
      "powerSource": "MMRTG (~110 W)"
    },
    "currentOperationalStatus": "Active and scaling the ancient crater rim of Jezero Crater, coring bedrock targets that predate the Jezero impact event.",
    "historicalSignificance": "The first mission designed to collect and hermetically store verified geological samples destined for return to Earth.",
    "latestKnownUpdate": "Perseverance is climbing the western rim of Jezero Crater, discovering carbon-rich and alteration minerals indicative of warm aqueous origins.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mars-2020-perseverance/",
    "relatedNewsTags": [
      "Perseverance",
      "Jezero Crater",
      "Mars Sample Return",
      "Astrobiology",
      "MOXIE"
    ],
    "tags": [
      "Mars 2020",
      "Perseverance",
      "Mars",
      "Rover",
      "Sample Return",
      "Jezero",
      "NASA Active"
    ]
  },
  {
    "id": "ingenuity-mars-helicopter",
    "name": "Ingenuity Mars Helicopter",
    "alternateNames": [
      "Ginny",
      "Mars Helicopter Scout"
    ],
    "programme": "Mars 2020",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Jezero Crater)",
    "status": "completed",
    "launchDate": "2020-07-30",
    "endDate": "2024-01-25",
    "launchVehicle": "Atlas V 541 (carried beneath Perseverance)",
    "missionType": "Autonomous Aerial Rotorcraft Technology Demonstrator",
    "missionDuration": "3 years (designed for 30 days and 5 flights)",
    "description": "The Wright Brothers moment of the 21st century: the first aircraft to achieve controlled, powered flight on another planet, completing 72 historic flights across Jezero Crater.",
    "scientificObjectives": [
      "Prove controlled aerodynamic flight is possible in the ultra-thin (1% Earth density) Martian atmosphere",
      "Act as an aerial scout for Perseverance, mapping rover routes and rock hazards",
      "Pioneer planetary drone navigation and autonomy"
    ],
    "keyAchievements": [
      "First powered, controlled flight on another celestial body (April 19, 2021)",
      "Completed 72 flights spanning 17.0 km and 128.8 minutes of airtime (planned: 5 flights)",
      "Surpassed max flight height of 24 meters and max ground speed of 10 m/s"
    ],
    "milestones": [
      {
        "label": "First historic flight (39.1 seconds, 3 m altitude)",
        "date": "2021-04-19",
        "done": true
      },
      {
        "label": "Transitioned from tech demo to operational scout",
        "date": "2021-05-07",
        "done": true
      },
      {
        "label": "Flight 50 milestone achieved",
        "date": "2023-04-13",
        "done": true
      },
      {
        "label": "Flight 72 hard landing damaging rotor tip",
        "date": "2024-01-18",
        "done": true
      },
      {
        "label": "Mission officially concluded; serving as static weather station",
        "date": "2024-01-25",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Coaxial counter-rotating carbon-fiber rotor helicopter with autonomous solar power",
      "manufacturer": "JPL / AeroVironment",
      "massKg": 1.8,
      "powerSource": "Solar array charging lithium-ion batteries"
    },
    "currentOperationalStatus": "Flight operations concluded due to rotor blade damage. Stationed permanently at Valinor Hills serving as long-term avionics and weather testbed.",
    "historicalSignificance": "Proved the feasibility of aerial planetary exploration, inspiring future rotorcraft for Titan (Dragonfly) and Mars sample retrieval.",
    "latestKnownUpdate": "Avionics software updated to gather daily temperature logs and downlink periodic health telemetry whenever Perseverance passes within range.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/ingenuity/",
    "relatedNewsTags": [
      "Ingenuity",
      "Mars Helicopter",
      "Rotorcraft",
      "Wright Brothers",
      "Jezero"
    ],
    "tags": [
      "Ingenuity",
      "Mars Helicopter",
      "Aviation",
      "Mars",
      "Drone",
      "NASA Completed"
    ]
  },
  {
    "id": "mars-reconnaissance-orbiter",
    "name": "Mars Reconnaissance Orbiter (MRO)",
    "alternateNames": [
      "MRO"
    ],
    "programme": "Mars Exploration Program",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars Orbit",
    "status": "active",
    "launchDate": "2005-08-12",
    "endDate": null,
    "launchVehicle": "Atlas V 401",
    "missionType": "High-Resolution Orbital Reconnaissance & Telecommunications Relay",
    "missionDuration": "21+ years (ongoing)",
    "description": "NASA's ultra-high-resolution orbital scout equipped with the HiRISE camera and high-throughput telecom relay that has guided every Mars landing since 2007.",
    "scientificObjectives": [
      "Image surface features down to 30 cm per pixel with HiRISE",
      "Search for subsurface ice and geologic layers using SHARAD radar sounding",
      "Serve as primary data relay conduit for all Martian rovers and landers"
    ],
    "keyAchievements": [
      "Returned hundreds of thousands of sub-meter images of the Martian surface",
      "Discovered recurring slope lineae (RSL) and extensive subsurface water-ice glaciers",
      "Relayed over 80% of all data from Spirit, Opportunity, Phoenix, Curiosity, InSight, and Perseverance"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "2005-08-12",
        "done": true
      },
      {
        "label": "Mars orbit insertion & aerobraking",
        "date": "2006-03-10",
        "done": true
      },
      {
        "label": "Primary science phase commenced",
        "date": "2006-11-01",
        "done": true
      },
      {
        "label": "Relayed Curiosity and Perseverance landing telemetry",
        "date": "2021-02-18",
        "done": true
      },
      {
        "label": "Surpassed 75,000 Mars orbits while continuing daily science and relay operations",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Large 3-axis stabilized orbital satellite with 3 m high-gain antenna and HiRISE telescope",
      "manufacturer": "Lockheed Martin",
      "massKg": 2180,
      "powerSource": "Twin solar arrays providing 2000 W at Mars"
    },
    "currentOperationalStatus": "Active and fully functional in Mars sun-synchronous orbit, performing daily imaging and critical rover relay operations.",
    "historicalSignificance": "The indispensable orbital foundation of Mars science and surface landing site selection for two decades.",
    "latestKnownUpdate": "Fuel reserves projected to sustain flight operations into the late 2020s and early 2030s.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/mro/",
    "relatedNewsTags": [
      "MRO",
      "HiRISE",
      "Mars Orbit",
      "Telecom Relay",
      "Subsurface Ice"
    ],
    "tags": [
      "MRO",
      "Mars",
      "Orbiter",
      "HiRISE",
      "Relay",
      "NASA Active"
    ]
  },
  {
    "id": "maven",
    "name": "MAVEN (Mars Atmosphere and Volatile EvolutioN)",
    "alternateNames": [
      "MAVEN"
    ],
    "programme": "Mars Scout Program",
    "programmeId": "mars-rovers",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars Orbit",
    "status": "active",
    "launchDate": "2013-11-18",
    "endDate": null,
    "launchVehicle": "Atlas V 401",
    "missionType": "Upper Atmospheric & Planetary Evolution Orbiter",
    "missionDuration": "13+ years (ongoing)",
    "description": "Investigating the loss of Mars's atmosphere to space over cosmic time, identifying solar wind stripping as the prime mechanism transforming Mars from a warm, wet world into a frigid desert.",
    "scientificObjectives": [
      "Determine the current rate of atmospheric loss of volatile compounds into space",
      "Measure solar wind interaction with the unmagnetized Martian upper atmosphere",
      "Constrain the history of climate change and water loss on Mars"
    ],
    "keyAchievements": [
      "Quantified atmospheric loss: Mars loses ~100 grams of atmosphere per second to solar wind",
      "Discovered that solar storms increase atmospheric escape rates by factors of 10 to 20",
      "Relayed communications for Perseverance rover after aerobraking to a tighter orbit"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "2013-11-18",
        "done": true
      },
      {
        "label": "Mars orbit insertion",
        "date": "2014-09-21",
        "done": true
      },
      {
        "label": "Measured major solar coronal mass ejection stripping atmosphere",
        "date": "2015-03-08",
        "done": true
      },
      {
        "label": "Lowered orbit through aerobraking to support surface relay",
        "date": "2019-04-05",
        "done": true
      },
      {
        "label": "Ongoing science and relay operations during Solar Cycle 25 maximum",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with magnetometer booms and solar arrays",
      "manufacturer": "Lockheed Martin",
      "massKg": 2454,
      "powerSource": "Two solar wings producing 1135 W"
    },
    "currentOperationalStatus": "Active and monitoring Martian atmospheric escape during peak solar flare and CME activity.",
    "historicalSignificance": "Solved the fundamental geological puzzle of where Mars's dense ancient atmosphere went.",
    "latestKnownUpdate": "Active data capture during recent major solar proton events interacting with Mars.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/maven/",
    "relatedNewsTags": [
      "MAVEN",
      "Mars Atmosphere",
      "Solar Wind",
      "Climate Evolution"
    ],
    "tags": [
      "MAVEN",
      "Mars",
      "Atmosphere",
      "Orbiter",
      "NASA Active"
    ]
  },
  {
    "id": "galileo",
    "name": "Galileo",
    "alternateNames": [
      "Galileo Jupiter Orbiter & Probe"
    ],
    "programme": "Planetary Exploration",
    "programmeId": "outer-planets",
    "agency": "NASA",
    "partnerAgencies": [
      "DLR"
    ],
    "category": "Robotic Exploration",
    "destination": "Jupiter System",
    "status": "completed",
    "launchDate": "1989-10-18",
    "endDate": "2003-09-21",
    "launchVehicle": "Space Shuttle Atlantis (STS-34) + IUS",
    "missionType": "Jupiter Orbiter & Atmospheric Entry Probe",
    "missionDuration": "13 years, 11 months",
    "description": "First spacecraft to orbit Jupiter and deploy an atmospheric probe into its gas envelope, discovering evidence of subsurface saltwater oceans beneath Europa's cracked ice shell.",
    "scientificObjectives": [
      "Deploy entry probe into Jupiter's violent atmosphere to measure temperature, wind, and chemistry",
      "Conduct multi-year orbital tour of Jupiter's Galilean moons (Io, Europa, Ganymede, Callisto)",
      "Characterize Jupiter's immense magnetosphere and dust rings"
    ],
    "keyAchievements": [
      "First asteroid flybys in history (Gaspra in 1991, Ida and its moon Dactyl in 1993)",
      "Observed Comet Shoemaker-Levy 9 colliding directly into Jupiter (1994)",
      "Deployed probe 150 km into Jupiter's atmosphere enduring 15,000 km/h winds",
      "Discovered strong evidence for a subsurface global ocean on Europa"
    ],
    "milestones": [
      {
        "label": "Deployed from Shuttle Atlantis STS-34",
        "date": "1989-10-18",
        "done": true
      },
      {
        "label": "Asteroid Ida flyby; discovered moon Dactyl",
        "date": "1993-08-28",
        "done": true
      },
      {
        "label": "Orbital insertion at Jupiter & atmospheric probe release",
        "date": "1995-12-07",
        "done": true
      },
      {
        "label": "Discovered Europa subsurface ocean induced magnetic field",
        "date": "1997-04-09",
        "done": true
      },
      {
        "label": "Controlled de-orbit impact into Jupiter to protect Europa",
        "date": "2003-09-21",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Dual-spin orbiter with despun platform and 339 kg separable atmospheric entry probe",
      "manufacturer": "JPL",
      "massKg": 2562,
      "powerSource": "Two GPHS-RTGs producing 570 W"
    },
    "currentOperationalStatus": "Mission completed; deliberately incinerated in Jupiter's atmosphere to eliminate biological contamination risk to Europa.",
    "historicalSignificance": "Revolutionized astrobiology by opening the era of ocean worlds, showing Europa may harbor habitable environments far outside the classical goldilocks zone.",
    "latestKnownUpdate": "Incinerated in Jupiter's upper atmosphere.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/galileo/",
    "relatedNewsTags": [
      "Galileo",
      "Jupiter",
      "Europa Ocean",
      "Io Volcanoes",
      "Atmospheric Probe"
    ],
    "tags": [
      "Galileo",
      "Jupiter",
      "Europa",
      "Ocean Worlds",
      "NASA Completed"
    ]
  },
  {
    "id": "cassini-huygens",
    "name": "Cassini-Huygens",
    "alternateNames": [
      "Cassini"
    ],
    "programme": "Cassini Programme",
    "programmeId": "outer-planets",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA",
      "ASI"
    ],
    "category": "Robotic Exploration",
    "destination": "Saturn System & Titan",
    "status": "completed",
    "launchDate": "1997-10-15",
    "endDate": "2017-09-15",
    "launchVehicle": "Titan IVB/Centaur",
    "missionType": "Saturn Orbiter & Titan Surface Lander (Huygens)",
    "missionDuration": "19 years, 11 months",
    "description": "One of the most scientifically fruitful deep-space missions ever flown: orbited Saturn for 13 years, landed the ESA Huygens probe on Titan, and discovered geysers erupting from Enceladus's ocean.",
    "scientificObjectives": [
      "Investigate the structure and dynamics of Saturn's atmosphere, rings, and magnetosphere",
      "Execute close-range multi-pass surveys of icy moons",
      "Deliver ESA's Huygens probe through Titan's dense nitrogen atmosphere to the surface",
      "Determine the composition and astrobiological potential of Enceladus and Titan"
    ],
    "keyAchievements": [
      "Landed the Huygens probe safely onto Titan's surface—humanity's most distant landing (January 14, 2005)",
      "Discovered liquid methane/ethane lakes and river networks on Titan",
      "Discovered active cryovolcanic geysers erupting water vapor, salts, and organics from Enceladus",
      "Grand Finale: 22 daring dives through the 2,000 km gap between Saturn and its innermost rings"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral LC-40",
        "date": "1997-10-15",
        "done": true
      },
      {
        "label": "Saturn orbit insertion (SOI)",
        "date": "2004-06-30",
        "done": true
      },
      {
        "label": "Huygens soft touchdown on Titan surface",
        "date": "2005-01-14",
        "done": true
      },
      {
        "label": "Enceladus geysers and global subsurface ocean confirmed",
        "date": "2005-07-14",
        "done": true
      },
      {
        "label": "Commenced Grand Finale ring-gap dives",
        "date": "2017-04-26",
        "done": true
      },
      {
        "label": "Grand Finale controlled atmospheric plunge into Saturn",
        "date": "2017-09-15",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized flagship orbiter + ESA Huygens spin-ejected atmospheric lander",
      "manufacturer": "JPL (Cassini) / ESA (Huygens)",
      "massKg": 5712,
      "powerSource": "Three GPHS-RTGs producing 885 W"
    },
    "currentOperationalStatus": "Mission completed; vaporized in Saturn's atmosphere on September 15, 2017 to protect pristine moons Enceladus and Titan.",
    "historicalSignificance": "Elevated Enceladus and Titan to the top of astrobiological search targets by establishing the existence of liquid oceans containing organic chemicals and hydrothermal energy.",
    "latestKnownUpdate": "Vaporized in Saturn's upper atmosphere.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/cassini/",
    "relatedNewsTags": [
      "Cassini",
      "Huygens",
      "Saturn",
      "Enceladus Geysers",
      "Titan Lakes"
    ],
    "tags": [
      "Cassini",
      "Huygens",
      "Saturn",
      "Enceladus",
      "Titan",
      "NASA Completed",
      "ESA"
    ]
  },
  {
    "id": "juno",
    "name": "Juno",
    "alternateNames": [
      "New Frontiers 2"
    ],
    "programme": "New Frontiers Program",
    "programmeId": "outer-planets",
    "agency": "NASA",
    "partnerAgencies": [
      "ASI"
    ],
    "category": "Robotic Exploration",
    "destination": "Jupiter System",
    "status": "extended",
    "launchDate": "2011-08-05",
    "endDate": null,
    "launchVehicle": "Atlas V 551",
    "missionType": "Polar Jupiter Orbiter & Galilean Moon Explorer",
    "missionDuration": "15+ years (ongoing)",
    "description": "Solar-powered orbiter performing polar passes just 4,200 km above Jupiter's cloud tops, measuring gravitational anomalies, core mass, water abundance, and conducting flybys of Ganymede, Europa, and Io.",
    "scientificObjectives": [
      "Determine Jupiter's deep water abundance and atmospheric composition",
      "Map gravitational and magnetic fields to constrain whether Jupiter has a solid or dilute core",
      "Investigate polar magnetosphere and auroral dynamics",
      "Conduct close-range flybys of Ganymede, Europa, and volcanic Io"
    ],
    "keyAchievements": [
      "First solar-powered spacecraft to operate at Jupiter's distance (5 AU)",
      "Discovered Jupiter has a giant, fuzzy, \"dilute\" core rather than a compact rocky core",
      "Captured polar cyclone clusters (geometric octagon at north pole, pentagon at south pole)",
      "Conducted razor-thin flybys of Ganymede (2021), Europa (2022), and Io (2023-2024)"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "2011-08-05",
        "done": true
      },
      {
        "label": "Jupiter orbit insertion into 53-day polar orbit",
        "date": "2016-07-04",
        "done": true
      },
      {
        "label": "Discovered dilute core and geometric polar storms",
        "date": "2018-03-07",
        "done": true
      },
      {
        "label": "Close flyby of Europa (352 km)",
        "date": "2022-09-29",
        "done": true
      },
      {
        "label": "Twin close flybys of volcanic Io (1,500 km)",
        "date": "2024-02-03",
        "done": true
      },
      {
        "label": "Extended orbital science mission continuing through 2026",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Spin-stabilized probe with three giant 9-meter solar arrays and radiation-vaulted electronics",
      "manufacturer": "Lockheed Martin",
      "massKg": 3625,
      "powerSource": "Three solar arrays generating ~480 W at Jupiter"
    },
    "currentOperationalStatus": "Active in extended mission. Continuing tight orbital passes around Jupiter and monitoring the volcanic activity of Io and Jovian ring dynamics.",
    "historicalSignificance": "Demonstrated solar power at Jupiter and revealed the interior architecture of the giant planet that shaped the early solar system.",
    "latestKnownUpdate": "Orbit period lowered to ~33 days; continuing science runs across perijoves into late 2026.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/juno/",
    "relatedNewsTags": [
      "Juno",
      "Jupiter",
      "Io Volcanoes",
      "Europa Flyby",
      "Dilute Core"
    ],
    "tags": [
      "Juno",
      "Jupiter",
      "Solar Power",
      "New Frontiers",
      "NASA Active"
    ]
  },
  {
    "id": "new-horizons",
    "name": "New Horizons",
    "alternateNames": [
      "New Frontiers 1"
    ],
    "programme": "New Frontiers Program",
    "programmeId": "outer-planets",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Pluto & Kuiper Belt",
    "status": "extended",
    "launchDate": "2006-01-19",
    "endDate": null,
    "launchVehicle": "Atlas V 551",
    "missionType": "Kuiper Belt Reconnaissance Probe",
    "missionDuration": "20+ years (ongoing)",
    "description": "Humanity's first reconnaissance of the Pluto-Charon system, revealing a startlingly geologically active dwarf planet with nitrogen glaciers, and later visiting the pristine Kuiper Belt object Arrokoth.",
    "scientificObjectives": [
      "Characterize the global geology, geomorphology, and atmosphere of Pluto and Charon",
      "Map surface composition and temperatures across the dwarf planet",
      "Conduct flyby of a pristine classical Kuiper Belt Object (Arrokoth)",
      "Measure the interstellar dust, plasma, and radiation environment beyond 55 AU"
    ],
    "keyAchievements": [
      "Fastest spacecraft launch velocity in history (~16.26 km/s relative to Earth)",
      "Historic Pluto flyby on July 14, 2015, revealing the vast nitrogen-ice glacier Sputnik Planitia",
      "Discovered towering water-ice mountains, cryovolcanoes, and a blue atmospheric haze on Pluto",
      "First flyby of a contact-binary primordial planetesimal (Arrokoth) on January 1, 2019"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral SLC-41",
        "date": "2006-01-19",
        "done": true
      },
      {
        "label": "Jupiter gravity assist (boosted speed by 4 km/s)",
        "date": "2007-02-28",
        "done": true
      },
      {
        "label": "Historic Pluto-Charon flyby (closest approach 12,500 km)",
        "date": "2015-07-14",
        "done": true
      },
      {
        "label": "Arrokoth (2014 MU69) flyby at 43.4 AU",
        "date": "2019-01-01",
        "done": true
      },
      {
        "label": "Crossed 55 AU distance milestone studying outer heliosphere boundary",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis/spin-stabilized lightweight deep-space probe with 2.1 m dish",
      "manufacturer": "Johns Hopkins Applied Physics Laboratory (JHUAPL)",
      "massKg": 478,
      "powerSource": "Single GPHS-RTG producing ~200 W"
    },
    "currentOperationalStatus": "Active in extended Kuiper Belt Heliophysics mission beyond 58 AU, studying the outer heliosphere, interstellar neutral hydrogen, and conducting remote observations of Uranus and Neptune.",
    "historicalSignificance": "Completed the initial robotic reconnaissance of the classical solar system and revolutionized our understanding of Kuiper Belt architecture.",
    "latestKnownUpdate": "Operating in healthy condition beyond 58 AU with power projected to sustain science operations into the 2030s.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/new-horizons/",
    "relatedNewsTags": [
      "New Horizons",
      "Pluto",
      "Charon",
      "Arrokoth",
      "Kuiper Belt"
    ],
    "tags": [
      "New Horizons",
      "Pluto",
      "Kuiper Belt",
      "Outer Solar System",
      "NASA Active"
    ]
  },
  {
    "id": "osiris-rex",
    "name": "OSIRIS-REx & OSIRIS-APEX",
    "alternateNames": [
      "New Frontiers 3",
      "Origins Spectral Interpretation Resource Identification Security Regolith Explorer"
    ],
    "programme": "New Frontiers Program",
    "programmeId": "asteroids",
    "agency": "NASA",
    "partnerAgencies": [
      "CSA",
      "JAXA"
    ],
    "category": "Robotic Exploration",
    "destination": "Asteroid Bennu & Apophis",
    "status": "cruise",
    "launchDate": "2016-09-08",
    "endDate": null,
    "launchVehicle": "Atlas V 411",
    "missionType": "Asteroid Sample Return & Apophis Rendezvous",
    "missionDuration": "10+ years (ongoing)",
    "description": "Collected 121.6 grams of carbon- and water-rich sample from dangerous near-Earth asteroid Bennu, successfully parachuted the capsule to Earth in 2023, and redirected toward asteroid Apophis.",
    "scientificObjectives": [
      "Map mineralogy and morphology of carbonaceous asteroid Bennu",
      "Collect at least 60 grams of pristine regolith and return it to Earth",
      "Measure the Yarkovsky effect (thermal push on asteroid orbits)",
      "Rendezvous with hazardous asteroid Apophis during its extreme 2029 close Earth approach"
    ],
    "keyAchievements": [
      "Executed Touch-And-Go (TAG) sample acquisition on Bennu (October 20, 2020)",
      "Returned 121.6 grams of pristine carbonaceous sample to Earth (September 24, 2023), exceeding mission requirements by double",
      "Initial sample analysis revealed abundant water-bearing clays, carbon, and phosphate salts",
      "Renamed OSIRIS-APEX and successfully fired engines for 2029 encounter with Apophis"
    ],
    "milestones": [
      {
        "label": "Launch",
        "date": "2016-09-08",
        "done": true
      },
      {
        "label": "Rendezvous with Bennu",
        "date": "2018-12-03",
        "done": true
      },
      {
        "label": "TAG sample collection at Nightingale crater",
        "date": "2020-10-20",
        "done": true
      },
      {
        "label": "Departed Bennu for Earth",
        "date": "2021-05-10",
        "done": true
      },
      {
        "label": "Sample return capsule landed in Utah Test and Training Range",
        "date": "2023-09-24",
        "done": true
      },
      {
        "label": "In cruise as OSIRIS-APEX toward Apophis (2029 encounter)",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with TAGSAM articulated arm and sample return capsule",
      "manufacturer": "Lockheed Martin Space",
      "massKg": 2110,
      "powerSource": "Dual solar arrays (1226 W)"
    },
    "currentOperationalStatus": "Cruise phase toward near-Earth asteroid Apophis as OSIRIS-APEX. Spacecraft fully healthy with sufficient fuel for 2029 orbital insertion and thruster dip maneuvers.",
    "historicalSignificance": "Returned the largest extraterrestrial sample of organic-rich asteroid material in US history, unlocking pre-solar grains and precursors to life.",
    "latestKnownUpdate": "Completed perihelion passage inside Venus orbit en route to Apophis rendezvous set for April 2029.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/osiris-rex/",
    "relatedNewsTags": [
      "OSIRIS-REx",
      "OSIRIS-APEX",
      "Bennu",
      "Apophis",
      "Sample Return"
    ],
    "tags": [
      "OSIRIS-REx",
      "Bennu",
      "Apophis",
      "Asteroids",
      "Sample Return",
      "NASA Active"
    ]
  },
  {
    "id": "dart",
    "name": "DART (Double Asteroid Redirection Test)",
    "alternateNames": [
      "DART"
    ],
    "programme": "Planetary Defense Program",
    "programmeId": "planetary-defense",
    "agency": "NASA",
    "partnerAgencies": [
      "ASI"
    ],
    "category": "Robotic Exploration",
    "destination": "Dimorphos (Didymos binary system)",
    "status": "completed",
    "launchDate": "2021-11-24",
    "endDate": "2022-09-26",
    "launchVehicle": "Falcon 9 Full Thrust",
    "missionType": "Planetary Defense Kinetic Impactor",
    "missionDuration": "10 months",
    "description": "Humanity's first planetary defense test mission, purposefully slamming a spacecraft at 22,530 km/h into asteroid moonlet Dimorphos to prove kinetic deflection of hazardous near-Earth objects.",
    "scientificObjectives": [
      "Demonstrate kinetic impact deflection of a celestial body",
      "Measure the period change in Dimorphos's orbit around primary Didymos",
      "Characterize momentum transfer efficiency (beta factor) and ejecta dynamics"
    ],
    "keyAchievements": [
      "First planetary defense test executed in human history",
      "Autonomously targeted and collided head-on with 160-meter Dimorphos via SMART Nav",
      "Shortened Dimorphos's orbital period by 33 minutes (exceeding minimum benchmark by 4x)",
      "Accompanied by ASI's LICIACube CubeSat capturing spectacular impact plumes"
    ],
    "milestones": [
      {
        "label": "Launch aboard SpaceX Falcon 9",
        "date": "2021-11-24",
        "done": true
      },
      {
        "label": "LICIACube deployed from mothership",
        "date": "2022-09-11",
        "done": true
      },
      {
        "label": "SMART Nav locked on Dimorphos terminal guidance",
        "date": "2022-09-26",
        "done": true
      },
      {
        "label": "Kinetic impact into Dimorphos at 6.25 km/s",
        "date": "2022-09-26",
        "done": true
      },
      {
        "label": "Global telescope network confirmed 33-minute period deflection",
        "date": "2022-10-11",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Kinetic impactor with DRACO high-resolution camera and NEXT-C ion engine demonstration",
      "manufacturer": "JHUAPL",
      "massKg": 610,
      "powerSource": "Roll-Out Solar Arrays (ROSA) producing 6.6 kW at 1 AU"
    },
    "currentOperationalStatus": "Mission completed; impact achieved September 26, 2022. Post-impact crater and mass distribution will be inspected by ESA's Hera mission.",
    "historicalSignificance": "Proved humanity possesses the technology to deflect a hazardous asteroid before it threatens Earth.",
    "latestKnownUpdate": "Post-impact analysis confirmed Dimorphos underwent global reshaping into an elongated triaxial ellipsoid.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/dart/",
    "relatedNewsTags": [
      "DART",
      "Planetary Defense",
      "Dimorphos",
      "Kinetic Impactor",
      "Didymos"
    ],
    "tags": [
      "DART",
      "Planetary Defense",
      "Asteroids",
      "Kinetic Impact",
      "NASA Completed"
    ]
  },
  {
    "id": "lucy",
    "name": "Lucy",
    "alternateNames": [
      "Discovery 13"
    ],
    "programme": "Discovery Program",
    "programmeId": "asteroids",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Jupiter Trojan Asteroids",
    "status": "cruise",
    "launchDate": "2021-10-16",
    "endDate": null,
    "launchVehicle": "Atlas V 401",
    "missionType": "Trojan Asteroid Multi-Flyby Reconnaissance",
    "missionDuration": "12-year primary mission (ongoing)",
    "description": "A 12-year voyage to explore 10 different asteroids—including main belt targets and both the L4 and L5 Jupiter Trojan swarms—fossils of planet formation.",
    "scientificObjectives": [
      "Survey the surface geology, color, and composition of diverse Jupiter Trojan asteroids",
      "Determine the masses and densities of Trojans to constrain origin models (e.g. Nice model)",
      "Characterize asteroid rings and satellites"
    ],
    "keyAchievements": [
      "First spacecraft sent to explore the Jupiter Trojan asteroid swarms",
      "First flyby: Asteroid Dinkinesh (November 1, 2023), discovering its unexpected contact-binary moon Selam",
      "Executed Earth gravity assists (EGA-1 in 2022, EGA-2 in 2024) shaping trajectory for main-belt asteroid Donaldjohanson flyby"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral SLC-41",
        "date": "2021-10-16",
        "done": true
      },
      {
        "label": "Earth Gravity Assist 1",
        "date": "2022-10-16",
        "done": true
      },
      {
        "label": "Asteroid Dinkinesh flyby; discovered contact-binary moon Selam",
        "date": "2023-11-01",
        "done": true
      },
      {
        "label": "Earth Gravity Assist 2",
        "date": "2024-12-13",
        "done": true
      },
      {
        "label": "En route to Asteroid 52246 Donaldjohanson flyby (April 2025/2026)",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe featuring twin 7.3-meter circular solar panels",
      "manufacturer": "Lockheed Martin Space",
      "massKg": 1550,
      "powerSource": "Twin ultra-flex solar arrays (504 W at Jupiter Trojan distance)"
    },
    "currentOperationalStatus": "Cruise phase towards its next targets; solar arrays stabilized and all science instruments operational.",
    "historicalSignificance": "Investigating the primordial chemical building blocks trapped in Jupiter's stable Lagrange points since the birth of the planets.",
    "latestKnownUpdate": "On trajectory through the main asteroid belt toward the Greek camp of Jupiter Trojans (arrival in 2027).",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/lucy/",
    "relatedNewsTags": [
      "Lucy",
      "Trojan Asteroids",
      "Dinkinesh",
      "Selam",
      "Discovery Program"
    ],
    "tags": [
      "Lucy",
      "Trojans",
      "Asteroids",
      "Jupiter",
      "NASA Active"
    ]
  },
  {
    "id": "psyche",
    "name": "Psyche",
    "alternateNames": [
      "Discovery 14"
    ],
    "programme": "Discovery Program",
    "programmeId": "asteroids",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Asteroid 16 Psyche",
    "status": "cruise",
    "launchDate": "2023-10-13",
    "endDate": null,
    "launchVehicle": "Falcon Heavy",
    "missionType": "Metal-Rich Asteroid Orbiter & Deep Space Optical Comm Demo",
    "missionDuration": "6-year cruise (2029 arrival)",
    "description": "Journeying to metal-rich asteroid 16 Psyche in the main asteroid belt, a likely exposed planetary core of an early planetesimal, to explore the building blocks of planetary cores.",
    "scientificObjectives": [
      "Determine whether 16 Psyche is a stripped metallic planetary core or unmelted primordial material",
      "Characterize the asteroid's topography, impact craters, and magnetic field remnants",
      "Demonstrate Deep Space Optical Communications (DSOC) laser data transmission across interplanetary distances"
    ],
    "keyAchievements": [
      "First mission designed to visit a world made largely of metal rather than rock or ice",
      "DSOC laser system transmitted broadband video from 30+ million km away at record optical rates",
      "Operating solar electric Hall-effect xenon thrusters smoothly in deep space"
    ],
    "milestones": [
      {
        "label": "Launch aboard SpaceX Falcon Heavy from KSC LC-39A",
        "date": "2023-10-13",
        "done": true
      },
      {
        "label": "First laser light returned via DSOC from 16 million km",
        "date": "2023-11-14",
        "done": true
      },
      {
        "label": "High-power xenon ion thrusters engaged",
        "date": "2024-05-15",
        "done": true
      },
      {
        "label": "Mars gravity-assist flyby",
        "date": "2026-05-20",
        "done": true
      },
      {
        "label": "Cruising toward 16 Psyche rendezvous in 2029",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with cross-shaped solar wings and Hall-effect thrusters",
      "manufacturer": "Maxar Technologies / JPL",
      "massKg": 2747,
      "powerSource": "Dual 5-panel solar arrays producing 21 kW at Earth / 2.3 kW at Psyche"
    },
    "currentOperationalStatus": "Cruise phase propelled by commercial Hall-effect xenon propulsion. Systems nominal after Mars gravity-assist maneuvers.",
    "historicalSignificance": "Offers our only direct window into metallic planetary cores like Earth's, impossible to reach directly on our home planet.",
    "latestKnownUpdate": "Deep space optical communication trials completed; ion propulsion pushing spacecraft into the outer asteroid belt.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/psyche/",
    "relatedNewsTags": [
      "Psyche",
      "Metal Asteroid",
      "DSOC Laser",
      "Discovery Program",
      "JPL"
    ],
    "tags": [
      "Psyche",
      "Asteroids",
      "Metal World",
      "Discovery",
      "NASA Active"
    ]
  },
  {
    "id": "europa-clipper",
    "name": "Europa Clipper",
    "alternateNames": [
      "Europa Multiple-Flyby Mission"
    ],
    "programme": "Outer Planets Flagship Program",
    "programmeId": "outer-planets",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Jupiter & Europa",
    "status": "cruise",
    "launchDate": "2024-10-14",
    "endDate": null,
    "launchVehicle": "Falcon Heavy",
    "missionType": "Jupiter Orbiter with 49 Low-Altitude Europa Flybys",
    "missionDuration": "Cruise to 2030; 4-year science phase",
    "description": "NASA's largest planetary probe ever built, sailing toward Jupiter to conduct 49 close flybys of icy moon Europa to determine if conditions beneath its shell could support life.",
    "scientificObjectives": [
      "Confirm the presence and depth of Europa's subsurface liquid ocean",
      "Determine the thickness of the icy shell and search for subsurface water pockets",
      "Analyze the composition and chemistry of the ocean and surface regolith",
      "Characterize geological fissures, plumes, and surface radiation environments"
    ],
    "keyAchievements": [
      "Largest spacecraft NASA has ever developed for a planetary mission (spans 30.5 meters with solar arrays deployed)",
      "Equipped with ice-penetrating radar (REASON), high-resolution cameras, magnetometers, and mass spectrometer (MASPEX)",
      "Resolved transistor radiation concerns prior to launch and achieved flawless Falcon Heavy injection"
    ],
    "milestones": [
      {
        "label": "Launch from KSC LC-39A on Falcon Heavy",
        "date": "2024-10-14",
        "done": true
      },
      {
        "label": "Deployed 30-meter solar wings and radar antennas",
        "date": "2024-10-15",
        "done": true
      },
      {
        "label": "Mars gravity-assist flyby",
        "date": "2025-02-28",
        "done": true
      },
      {
        "label": "Earth gravity-assist flyby",
        "date": "2026-12-05",
        "done": false
      },
      {
        "label": "Jupiter orbit insertion",
        "date": "2030-04-11",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Massive radiation-hardened flagship orbiter with ice-penetrating radar booms and massive solar wings",
      "manufacturer": "JPL / JHUAPL",
      "massKg": 6000,
      "powerSource": "Two 5-panel solar arrays generating ~700 W at Jupiter"
    },
    "currentOperationalStatus": "Cruise phase en route to Earth gravity assist after completing Mars flyby. All instruments and thermal loops nominal.",
    "historicalSignificance": "The premier mission to evaluate habitability beyond Earth on the solar system's most promising ocean world.",
    "latestKnownUpdate": "Deep space trajectory checks confirm optimal propulsion performance following solar wing thermal stabilization.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/europa-clipper/",
    "relatedNewsTags": [
      "Europa Clipper",
      "Europa",
      "Jupiter",
      "Ocean Worlds",
      "Falcon Heavy"
    ],
    "tags": [
      "Europa Clipper",
      "Jupiter",
      "Europa",
      "Ocean Worlds",
      "Flagship",
      "NASA Active"
    ]
  },
  {
    "id": "parker-solar-probe",
    "name": "Parker Solar Probe",
    "alternateNames": [
      "Solar Probe Plus"
    ],
    "programme": "Living With a Star",
    "programmeId": "heliophysics",
    "agency": "NASA",
    "partnerAgencies": [
      "JHUAPL"
    ],
    "category": "Robotic Exploration",
    "destination": "The Sun (Corona)",
    "status": "active",
    "launchDate": "2018-08-12",
    "endDate": null,
    "launchVehicle": "Delta IV Heavy + Star 48BV",
    "missionType": "Solar Corona Close-Approach Heliophysics Probe",
    "missionDuration": "8+ years (ongoing)",
    "description": "Humanity's mission to \"touch the Sun\", flying through the scorching solar corona at over 690,000 km/h, protected by an advanced carbon-composite heat shield.",
    "scientificObjectives": [
      "Trace the flow of energy that heats the solar corona to millions of degrees",
      "Determine the mechanisms that accelerate the supersonic solar wind and energetic particles",
      "Explore the dusty plasma environment close to the Sun"
    ],
    "keyAchievements": [
      "Fastest human-made object in history (reaching ~692,000 km/h / 430,000 mph)",
      "Closest approach to the Sun in history (breaking records under 6.2 million km / 3.8 million miles)",
      "First spacecraft to fly inside the Alfvén critical surface, directly sampling coronal magnetic switchbacks"
    ],
    "milestones": [
      {
        "label": "Launch on Delta IV Heavy",
        "date": "2018-08-12",
        "done": true
      },
      {
        "label": "First perihelion inside solar corona",
        "date": "2018-11-05",
        "done": true
      },
      {
        "label": "Officially crossed the Alfvén critical boundary to touch the Sun",
        "date": "2021-04-28",
        "done": true
      },
      {
        "label": "Final Venus gravity assist (#7) to lower perihelion to 3.8 million miles",
        "date": "2024-11-06",
        "done": true
      },
      {
        "label": "Conducting historic closest solar passes through peak Solar Cycle 25",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with 11.4 cm thick carbon-composite Thermal Protection System (TPS)",
      "manufacturer": "JHUAPL",
      "massKg": 685,
      "powerSource": "Water-cooled solar arrays retracted behind heat shield at perihelion (343 W)"
    },
    "currentOperationalStatus": "Active and executing perihelion passes at maximum orbital velocity, sampling extreme coronal mass ejections during high solar activity.",
    "historicalSignificance": "First spacecraft named after a living scientist (Dr. Eugene Parker), solving decade-long questions of coronal heating and solar wind genesis.",
    "latestKnownUpdate": "Enduring temperatures exceeding 1,400°C while returning pristine magnetic field and particle data to Earth.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/parker-solar-probe/",
    "relatedNewsTags": [
      "Parker Solar Probe",
      "Touch The Sun",
      "Heliophysics",
      "Solar Wind",
      "Corona"
    ],
    "tags": [
      "Parker Solar Probe",
      "Sun",
      "Heliophysics",
      "Speed Record",
      "NASA Active"
    ]
  },
  {
    "id": "hubble-space-telescope",
    "name": "Hubble Space Telescope",
    "alternateNames": [
      "HST"
    ],
    "programme": "Great Observatories Program",
    "programmeId": "great-observatories",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA"
    ],
    "category": "Space Observatories",
    "destination": "Low Earth Orbit (540 km)",
    "status": "active",
    "launchDate": "1990-04-24",
    "endDate": null,
    "launchVehicle": "Space Shuttle Discovery (STS-31)",
    "missionType": "Ultraviolet/Optical/Near-Infrared Space Telescope",
    "missionDuration": "36+ years (ongoing)",
    "description": "Humanity's most celebrated optical orbital telescope, revolutionizing astronomy for over three decades and serviced five times by Space Shuttle crews.",
    "scientificObjectives": [
      "Determine the expansion rate and age of the universe (Hubble Constant)",
      "Examine the formation and evolution of galaxies from the early cosmos to present day",
      "Investigate exoplanetary atmospheres, stellar nurseries, and dark energy"
    ],
    "keyAchievements": [
      "Captured the iconic Hubble Deep Field, revealing thousands of young galaxies in a pinprick of dark sky",
      "Played key role in the Nobel Prize-winning discovery that the expansion of the universe is accelerating",
      "Determined the precise age of the universe at ~13.8 billion years",
      "Produced over 1.6 million astronomical observations generating 21,000+ scientific papers"
    ],
    "milestones": [
      {
        "label": "Deployed from Shuttle Discovery STS-31",
        "date": "1990-04-24",
        "done": true
      },
      {
        "label": "Servicing Mission 1 (STS-61) fixes spherical aberration via COSTAR",
        "date": "1993-12-04",
        "done": true
      },
      {
        "label": "Captured original Hubble Deep Field",
        "date": "1995-12-18",
        "done": true
      },
      {
        "label": "Final Servicing Mission 4 (STS-125) installs WFC3 and COS",
        "date": "2009-05-11",
        "done": true
      },
      {
        "label": "Operating on single-gyro control mode preserving science into late 2020s",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "2.4-meter Ritchey-Chrétien Cassegrain telescope with pointing control and fine guidance sensors",
      "manufacturer": "Lockheed Martin / Perkin-Elmer",
      "massKg": 11110,
      "powerSource": "Two gallium arsenide solar panels (2800 W)"
    },
    "currentOperationalStatus": "Active and productive. Switched to single-gyro pointing mode in mid-2024 to preserve remaining gyroscopes while retaining over 85% of scientific observing capability.",
    "historicalSignificance": "The definitive astronomical observatory in human culture; completely transformed modern astrophysics and public engagement with the cosmos.",
    "latestKnownUpdate": "Conducting complementary optical and UV observations in synergy with JWST near-infrared deep-field surveys.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/hubble/",
    "relatedNewsTags": [
      "Hubble",
      "HST",
      "Deep Field",
      "Space Telescope",
      "Astrophysics"
    ],
    "tags": [
      "Hubble",
      "HST",
      "Observatory",
      "Great Observatories",
      "Astrophysics",
      "NASA Active"
    ]
  },
  {
    "id": "jwst",
    "name": "James Webb Space Telescope (JWST)",
    "alternateNames": [
      "Webb"
    ],
    "programme": "Flagship Astrophysics",
    "programmeId": "great-observatories",
    "agency": "NASA",
    "partnerAgencies": [
      "ESA",
      "CSA"
    ],
    "category": "Space Observatories",
    "destination": "Sun-Earth L2 Lagrange Point",
    "status": "active",
    "launchDate": "2021-12-25",
    "endDate": null,
    "launchVehicle": "Ariane 5 ECA",
    "missionType": "Infrared Flagship Space Observatory",
    "missionDuration": "5+ years (fuel for 20+ years)",
    "description": "The premier space science observatory of the 21st century, featuring a 6.5-meter gold-coated beryllium mirror peering into cosmic dawn to image the very first stars and galaxies formed after the Big Bang.",
    "scientificObjectives": [
      "Discover the first stars and galaxies formed in the early universe (Cosmic Dawn)",
      "Observe the assembly and structural evolution of primitive galaxies",
      "Probe the earliest stages of star and planetary system formation",
      "Measure physical and chemical properties of exoplanet atmospheres for potential biosignatures"
    ],
    "keyAchievements": [
      "Flawlessly executed 300+ single-point failure deployments during deep space transit to L2",
      "Discovered galaxies dating to just 290 million years after the Big Bang (e.g. JADES-GS-z14-0)",
      "Detected carbon dioxide, water vapor, and methane in atmospheres of transiting exoplanets",
      "Ariane 5 orbital insertion accuracy conserved propellant projected to last >20 years"
    ],
    "milestones": [
      {
        "label": "Launch from Kourou aboard Ariane 5",
        "date": "2021-12-25",
        "done": true
      },
      {
        "label": "Sunshield tensioned and secondary/primary mirrors deployed",
        "date": "2022-01-08",
        "done": true
      },
      {
        "label": "Arrival at Sun-Earth L2 halo orbit",
        "date": "2022-01-24",
        "done": true
      },
      {
        "label": "First full-color science images released (SMACS 0723 Deep Field)",
        "date": "2022-07-12",
        "done": true
      },
      {
        "label": "Cycle 3 and Cycle 4 scientific observations expanding cosmological frontiers",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Deployable 6.5 m three-mirror anastigmat telescope with 5-layer Kapton sunshield",
      "manufacturer": "Northrop Grumman / Ball Aerospace / Goddard Space Flight Center",
      "massKg": 6161,
      "powerSource": "Solar array producing 2000 W"
    },
    "currentOperationalStatus": "Active and operating at peak scientific sensitivity at Sun-Earth L2. All instruments (NIRCam, NIRSpec, MIRI, FGS/NIRISS) performing above pre-launch sensitivity specs.",
    "historicalSignificance": "Rewriting cosmological models of the early universe with discoveries of unexpectedly massive, bright galaxies and unprecedented exoplanet atmospheric profiles.",
    "latestKnownUpdate": "Confirmed earliest massive black holes and detailed chemical spectra of TRAPPIST-1 system exoplanets.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/webb/",
    "relatedNewsTags": [
      "JWST",
      "James Webb",
      "Cosmic Dawn",
      "Exoplanets",
      "L2"
    ],
    "tags": [
      "JWST",
      "Webb",
      "Observatory",
      "Infrared",
      "Cosmic Dawn",
      "NASA Active",
      "ESA"
    ]
  },
  {
    "id": "chandra-xray-observatory",
    "name": "Chandra X-ray Observatory",
    "alternateNames": [
      "AXAF"
    ],
    "programme": "Great Observatories Program",
    "programmeId": "great-observatories",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Space Observatories",
    "destination": "High Elliptical Earth Orbit (143,000 km apogee)",
    "status": "active",
    "launchDate": "1999-07-23",
    "endDate": null,
    "launchVehicle": "Space Shuttle Columbia (STS-93) + IUS",
    "missionType": "Grazing-Incidence High-Energy X-ray Telescope",
    "missionDuration": "27+ years (ongoing)",
    "description": "Humanity's flagship X-ray observatory, detecting X-ray emission from high-energy cosmic regions including black holes, supernova remnants, and galaxy cluster collisions.",
    "scientificObjectives": [
      "High-angular-resolution imaging of X-ray sources across the universe",
      "Study the physics of accretion disks around supermassive black holes",
      "Map the distribution of dark matter through hot gas emission in colliding galaxy clusters"
    ],
    "keyAchievements": [
      "Provided direct empirical proof of the existence of Dark Matter in the Bullet Cluster collision",
      "Captured first X-ray emission from the supermassive black hole Sagittarius A* at the galactic core",
      "Resolved the cosmic X-ray background into individual distant active galactic nuclei"
    ],
    "milestones": [
      {
        "label": "Deployed from Shuttle Columbia STS-93",
        "date": "1999-07-23",
        "done": true
      },
      {
        "label": "First light: Cassiopeia A supernova remnant",
        "date": "1999-08-19",
        "done": true
      },
      {
        "label": "Bullet Cluster observation proves dark matter separation",
        "date": "2006-08-21",
        "done": true
      },
      {
        "label": "Surpassed quarter-century of high-energy science observations",
        "date": "2024-07-23",
        "done": true
      },
      {
        "label": "Operational management continuing critical high-energy observations",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Four nested pairs of Wolter-I grazing-incidence mirrors with ACIS and HRC instruments",
      "manufacturer": "TRW / Ball Aerospace / Smithsonian Astrophysical Observatory",
      "massKg": 4790,
      "powerSource": "Two silicon solar wings (2350 W)"
    },
    "currentOperationalStatus": "Active in highly elliptical Earth orbit. Spacecraft thermal management protocols actively adjusted to sustain priority multi-messenger astrophysics.",
    "historicalSignificance": "The undisputed gold standard of high-resolution X-ray astronomy, essential for dark matter verification and black hole physics.",
    "latestKnownUpdate": "Engaged in coordinated observing campaigns with JWST and ground-based gravitational wave observatories.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/chandra/",
    "relatedNewsTags": [
      "Chandra",
      "X-ray",
      "Black Holes",
      "Dark Matter",
      "Bullet Cluster"
    ],
    "tags": [
      "Chandra",
      "X-ray",
      "Observatory",
      "Great Observatories",
      "Astrophysics",
      "NASA Active"
    ]
  },
  {
    "id": "tess",
    "name": "Transiting Exoplanet Survey Satellite (TESS)",
    "alternateNames": [
      "Explorer 95"
    ],
    "programme": "Explorers Program",
    "programmeId": "exoplanet-hunters",
    "agency": "NASA",
    "partnerAgencies": [
      "MIT"
    ],
    "category": "Space Observatories",
    "destination": "High Earth Orbit (P/2 Lunar Resonance)",
    "status": "active",
    "launchDate": "2018-04-18",
    "endDate": null,
    "launchVehicle": "Falcon 9 Full Thrust",
    "missionType": "All-Sky Exoplanet Transit Hunter",
    "missionDuration": "8+ years (ongoing)",
    "description": "An all-sky transit survey monitoring 200,000+ nearby bright stars to discover transiting exoplanets prime for detailed atmospheric characterization by JWST.",
    "scientificObjectives": [
      "Survey 85% of the sky across multiple sectors for exoplanetary transits",
      "Discover thousands of small planets around nearby bright stars suitable for spectroscopy",
      "Identify terrestrial planets located within habitable zones of nearby red dwarf stars"
    ],
    "keyAchievements": [
      "Discovered over 7,000 candidate exoplanets (TESS Objects of Interest / TOIs)",
      "Confirmed 450+ verified exoplanets, including habitable zone Earth-size worlds (e.g. TOI-700 d and e)",
      "Captured stellar flares, supernovae explosions, and cometary outbursts across wide fields"
    ],
    "milestones": [
      {
        "label": "Launch on Falcon 9",
        "date": "2018-04-18",
        "done": true
      },
      {
        "label": "Inserted into stable 2:1 lunar resonant orbit",
        "date": "2018-05-17",
        "done": true
      },
      {
        "label": "Completed primary 2-year survey of both northern and southern hemispheres",
        "date": "2020-07-04",
        "done": true
      },
      {
        "label": "Surpassed 7,000 candidate exoplanets cataloged",
        "date": "2024-06-15",
        "done": true
      },
      {
        "label": "Active in third extended mission continuing all-sky monitoring",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized satellite with four wide-field optical CCD cameras",
      "manufacturer": "Orbital ATK / MIT Kavli Institute",
      "massKg": 362,
      "powerSource": "Two solar arrays (415 W)"
    },
    "currentOperationalStatus": "Active and monitoring sector sky strips every 200 seconds, feeding real-time target alerts to world-wide astronomical observatories.",
    "historicalSignificance": "The primary finder scope for modern exoplanet spectroscopy, discovering the worlds that JWST and ground-based extremely large telescopes probe for life.",
    "latestKnownUpdate": "Extended mission continues delivering high-cadence light curves across both celestial hemispheres.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/tess/",
    "relatedNewsTags": [
      "TESS",
      "Exoplanets",
      "Transit Search",
      "Habitable Zone",
      "MIT"
    ],
    "tags": [
      "TESS",
      "Exoplanets",
      "Observatory",
      "Transit",
      "NASA Active"
    ]
  },
  {
    "id": "kepler-space-telescope",
    "name": "Kepler Space Telescope",
    "alternateNames": [
      "Discovery 10",
      "K2"
    ],
    "programme": "Discovery Program",
    "programmeId": "exoplanet-hunters",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Space Observatories",
    "destination": "Earth-Trailing Heliocentric Orbit",
    "status": "completed",
    "launchDate": "2009-03-07",
    "endDate": "2018-10-30",
    "launchVehicle": "Delta II 7925-10L",
    "missionType": "Photometric Exoplanet Transit Observatory",
    "missionDuration": "9 years, 7 months",
    "description": "Humanity's first planet-hunting space telescope, staring continuously at 150,000 stars to prove planets outnumber stars in our galaxy and discovering thousands of alien worlds.",
    "scientificObjectives": [
      "Determine the frequency of Earth-size planets in and near the habitable zones of Sun-like stars",
      "Determine the sizes and orbital shapes of thousands of multi-planet systems",
      "Provide empirical statistical census of planetary architectures across the Milky Way"
    ],
    "keyAchievements": [
      "Discovered 2,700+ confirmed exoplanets (over half of all known exoplanets in history)",
      "Discovered first Earth-size planet in a star's habitable zone (Kepler-186f)",
      "Proved rocky planets are the most common planet type in our galaxy",
      "Re-invented as K2 using solar radiation pressure to balance pointing after reaction wheel losses"
    ],
    "milestones": [
      {
        "label": "Launch on Delta II",
        "date": "2009-03-07",
        "done": true
      },
      {
        "label": "Staring stare commenced at Cygnus-Lyra field",
        "date": "2009-05-12",
        "done": true
      },
      {
        "label": "Discovered first rocky world Kepler-10b",
        "date": "2011-01-10",
        "done": true
      },
      {
        "label": "Transitioned to K2 ecliptic survey mission",
        "date": "2014-05-30",
        "done": true
      },
      {
        "label": "Propellant exhausted; mission retired in heliocentric orbit",
        "date": "2018-10-30",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "0.95-meter Schmidt telescope with 42 CCD sensor photometer array",
      "manufacturer": "Ball Aerospace",
      "massKg": 1052,
      "powerSource": "Body-mounted solar arrays (800 W)"
    },
    "currentOperationalStatus": "Mission completed; decommissioned in Earth-trailing solar orbit.",
    "historicalSignificance": "Revolutionized human understanding of our place in the cosmos by showing virtually every star in the night sky hosts planets.",
    "latestKnownUpdate": "Data archive continues to yield new planet confirmations via modern machine-learning models.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/kepler/",
    "relatedNewsTags": [
      "Kepler",
      "K2",
      "Exoplanets",
      "Habitable Zone",
      "Kepler-186f"
    ],
    "tags": [
      "Kepler",
      "K2",
      "Exoplanets",
      "Discovery",
      "Historic",
      "NASA Completed"
    ]
  },
  {
    "id": "nancy-grace-roman-space-telescope",
    "name": "Nancy Grace Roman Space Telescope",
    "alternateNames": [
      "Roman",
      "WFIRST"
    ],
    "programme": "Flagship Astrophysics",
    "programmeId": "great-observatories",
    "agency": "NASA",
    "partnerAgencies": [],
    "category": "Space Observatories",
    "destination": "Sun-Earth L2 Lagrange Point",
    "status": "in-development",
    "launchDate": "2027-05-01",
    "endDate": null,
    "launchVehicle": "Falcon Heavy",
    "missionType": "Wide-Field Infrared Survey & Dark Energy Observatory",
    "missionDuration": "5-year primary mission (planned)",
    "description": "NASA's next flagship space telescope, featuring a 2.4-meter mirror with a field of view 100 times larger than Hubble, designed to study dark energy, dark matter, and exoplanets.",
    "scientificObjectives": [
      "Investigate dark energy via baryon acoustic oscillations, supernovae, and weak gravitational lensing",
      "Conduct a cosmic census of exoplanetary systems through gravitational microlensing",
      "Demonstrate high-contrast coronagraphic imaging of gas giant exoplanets"
    ],
    "keyAchievements": [
      "2.4-meter primary mirror and optical assembly completed and integrated at Goddard",
      "Wide Field Instrument (300-megapixel infrared focal plane) successfully qualified",
      "Coronagraph Instrument (CGI) achieved record 10^-9 starlight suppression in thermal vacuum testing"
    ],
    "milestones": [
      {
        "label": "Mission entered Phase C development",
        "date": "2020-03-02",
        "done": true
      },
      {
        "label": "Completed spacecraft payload thermal-vacuum testing",
        "date": "2024-04-18",
        "done": true
      },
      {
        "label": "Observatory integration & environmental testing at Goddard",
        "date": "2026-10-31",
        "done": true,
        "current": true
      },
      {
        "label": "Scheduled Falcon Heavy launch from KSC",
        "date": "2027-05-01",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "2.4 m wide-field telescope with 18-sensor infrared focal plane array and starlight coronagraph",
      "manufacturer": "Ball Aerospace / L3Harris / Goddard Space Flight Center",
      "massKg": 4166,
      "powerSource": "Fixed solar array (2500 W)"
    },
    "currentOperationalStatus": "In advanced assembly and environmental verification at NASA GSFC, on track for launch readiness by mid-2027.",
    "historicalSignificance": "Will image billions of galaxies across cosmic time at Hubble-grade resolution, mapping the large-scale geometry of the cosmos.",
    "latestKnownUpdate": "Payload integration reviews confirmed flight mirrors and coronagraph flight hardware have met all optical tolerances.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://science.nasa.gov/mission/roman-space-telescope/",
    "relatedNewsTags": [
      "Roman Space Telescope",
      "WFIRST",
      "Dark Energy",
      "Microlensing",
      "Wide Field"
    ],
    "tags": [
      "Roman",
      "WFIRST",
      "Observatory",
      "Astrophysics",
      "Dark Energy",
      "NASA Upcoming"
    ]
  },
  {
    "id": "aryabhata",
    "name": "Aryabhata",
    "alternateNames": [
      "First Indian Satellite"
    ],
    "programme": "Early Satellite Programme",
    "programmeId": "isro-historic",
    "agency": "ISRO",
    "partnerAgencies": [
      "Soviet Intercosmos"
    ],
    "category": "Robotic Exploration",
    "destination": "Low Earth Orbit (563 km)",
    "status": "completed",
    "launchDate": "1975-04-19",
    "endDate": "1992-02-11",
    "launchVehicle": "Kosmos-3M",
    "missionType": "Experimental Space Physics & X-ray Astronomy Satellite",
    "missionDuration": "Orbited until atmospheric decay in 1992",
    "description": "India's historic first satellite, designed and fabricated entirely by ISRO engineers under Dr. U.R. Rao and launched from Kapustin Yar by the Soviet Union.",
    "scientificObjectives": [
      "Master satellite design, fabrication, and orbital operations",
      "Conduct experiments in X-ray astronomy, aeronomy, and solar physics"
    ],
    "keyAchievements": [
      "Inaugurated the Indian space age as India's first satellite",
      "Featured on the reverse of the Indian 2-rupee banknote between 1976 and 1997",
      "Established core engineering telemetry and telecommand capabilities for ISRO"
    ],
    "milestones": [
      {
        "label": "Launched from Kapustin Yar cosmodrome",
        "date": "1975-04-19",
        "done": true
      },
      {
        "label": "Orbital tracking and telemetry established at Sriharikota",
        "date": "1975-04-20",
        "done": true
      },
      {
        "label": "Re-entered Earth's atmosphere after 17 years in orbit",
        "date": "1992-02-11",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "26-sided quasi-spherical polyhedron satellite",
      "manufacturer": "ISRO Satellite Centre (URSC), Bengaluru",
      "massKg": 360,
      "powerSource": "Body-mounted solar cells (46 W)"
    },
    "currentOperationalStatus": "Mission completed; re-entered atmosphere in 1992.",
    "historicalSignificance": "The foundational cornerstone of the Indian space program, proving independent satellite engineering capability.",
    "latestKnownUpdate": "De-orbited and decayed in Earth's upper atmosphere.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Aryabhata.html",
    "relatedNewsTags": [
      "Aryabhata",
      "ISRO First Satellite",
      "Kapustin Yar",
      "UR Rao"
    ],
    "tags": [
      "Aryabhata",
      "ISRO",
      "Historic",
      "First Satellite",
      "India"
    ]
  },
  {
    "id": "bhaskara-1",
    "name": "Bhaskara-I",
    "alternateNames": [
      "SEO-1"
    ],
    "programme": "Early Satellite Programme",
    "programmeId": "isro-historic",
    "agency": "ISRO",
    "partnerAgencies": [
      "Soviet Intercosmos"
    ],
    "category": "Earth Observation",
    "destination": "Low Earth Orbit (512 km)",
    "status": "completed",
    "launchDate": "1979-06-07",
    "endDate": "1989-10-29",
    "launchVehicle": "Kosmos-3M",
    "missionType": "Experimental Remote Sensing & Earth Observation Satellite",
    "missionDuration": "10 years in orbit",
    "description": "India's first experimental remote sensing satellite, carrying two TV cameras and microwave radiometers (SAMIR) to pioneer satellite hydrology and forestry monitoring.",
    "scientificObjectives": [
      "Conduct remote sensing of Indian landmass, forestry, and water resources",
      "Measure ocean surface winds and atmospheric water vapor using SAMIR radiometers"
    ],
    "keyAchievements": [
      "Pioneered Indian Earth observation applications for agriculture and water management",
      "Returned thousands of TV images of Indian subcontinent terrain"
    ],
    "milestones": [
      {
        "label": "Launch from Kapustin Yar",
        "date": "1979-06-07",
        "done": true
      },
      {
        "label": "SAMIR microwave radiometer operations commenced",
        "date": "1979-06-15",
        "done": true
      },
      {
        "label": "TV cameras activated after high-voltage anomaly resolved",
        "date": "1980-05-16",
        "done": true
      },
      {
        "label": "Atmospheric re-entry",
        "date": "1989-10-29",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "26-sided spin-stabilized satellite",
      "manufacturer": "ISRO Satellite Centre",
      "massKg": 442,
      "powerSource": "Solar cells (47 W)"
    },
    "currentOperationalStatus": "Mission completed; re-entered atmosphere in 1989.",
    "historicalSignificance": "Laid the operational groundwork for India's world-leading Indian Remote Sensing (IRS) constellation.",
    "latestKnownUpdate": "Atmospheric decay completed.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Bhaskara-I.html",
    "relatedNewsTags": [
      "Bhaskara",
      "ISRO Remote Sensing",
      "SAMIR",
      "Earth Observation"
    ],
    "tags": [
      "Bhaskara",
      "ISRO",
      "Remote Sensing",
      "Earth Observation"
    ]
  },
  {
    "id": "rohini-rs-1",
    "name": "Rohini RS-1",
    "alternateNames": [
      "Rohini-1B"
    ],
    "programme": "SLV Development Programme",
    "programmeId": "isro-historic",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Low Earth Orbit (305 km)",
    "status": "completed",
    "launchDate": "1980-07-18",
    "endDate": "1981-05-20",
    "launchVehicle": "SLV-3 (E2)",
    "missionType": "Launch Vehicle Qualification Satellite",
    "missionDuration": "10 months in orbit",
    "description": "First satellite successfully launched from Indian soil by an indigenous Indian launch vehicle (SLV-3), spearheaded by Project Director Dr. A.P.J. Abdul Kalam.",
    "scientificObjectives": [
      "Evaluate launch vehicle flight performance of indigenous 4-stage solid SLV-3",
      "Demonstrate orbit insertion capability from Satish Dhawan Space Centre, Sriharikota"
    ],
    "keyAchievements": [
      "Made India the 6th spacefaring nation with independent orbital launch capability",
      "Flawless orbital insertion executed by Dr. A.P.J. Abdul Kalam's rocket engineering team",
      "Operated onboard telemetry transmitting flight performance data for 20 months"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota (SDSC-SHAR)",
        "date": "1980-07-18",
        "done": true
      },
      {
        "label": "Confirmed orbital insertion",
        "date": "1980-07-18",
        "done": true
      },
      {
        "label": "Mission objectives completed and orbital decay",
        "date": "1981-05-20",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Spin-stabilized polyhedron spacecraft",
      "manufacturer": "ISRO",
      "massKg": 35,
      "powerSource": "Body-mounted solar cells (16 W)"
    },
    "currentOperationalStatus": "Mission completed; re-entered atmosphere in 1981.",
    "historicalSignificance": "The historic watershed moment that established India as an independent spacefaring launch power.",
    "latestKnownUpdate": "Natural orbital decay completed.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Rohini_RS-1.html",
    "relatedNewsTags": [
      "Rohini",
      "SLV-3",
      "APJ Abdul Kalam",
      "Sriharikota",
      "Indigenous Rocket"
    ],
    "tags": [
      "Rohini",
      "SLV-3",
      "ISRO",
      "Historic",
      "Abdul Kalam"
    ]
  },
  {
    "id": "insat-1b",
    "name": "INSAT-1B",
    "alternateNames": [
      "INSAT System Pioneer"
    ],
    "programme": "INSAT Programme",
    "programmeId": "isro-historic",
    "agency": "ISRO",
    "partnerAgencies": [
      "Ford Aerospace"
    ],
    "category": "Earth Observation",
    "destination": "Geostationary Orbit (74° E)",
    "status": "completed",
    "launchDate": "1983-08-30",
    "endDate": "1993-08-01",
    "launchVehicle": "Space Shuttle Challenger (STS-8)",
    "missionType": "Geostationary Telecom, Broadcast & Meteorological Satellite",
    "missionDuration": "10 years operational life",
    "description": "Transformed Indian telecommunications, nationwide television broadcasting, and cyclone meteorological warning systems, serving as the backbone of modern Indian connectivity.",
    "scientificObjectives": [
      "Provide nationwide direct-to-home television broadcasting and village educational TV",
      "Provide continuous half-hourly synoptic weather imaging and cyclone tracking",
      "Establish long-distance telephone networking across India"
    ],
    "keyAchievements": [
      "Connected isolated remote corners of India to national telecommunications network",
      "Provided early cyclone warnings saving tens of thousands of coastal lives",
      "Operated for a decade surpassing its design life"
    ],
    "milestones": [
      {
        "label": "Deployed from Space Shuttle Challenger STS-8",
        "date": "1983-08-30",
        "done": true
      },
      {
        "label": "Solar array fully deployed after initial snag",
        "date": "1983-09-10",
        "done": true
      },
      {
        "label": "Operational services inaugurated nationwide",
        "date": "1983-10-15",
        "done": true
      },
      {
        "label": "Decommissioned after 10 years of continuous service",
        "date": "1993-08-01",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "3-axis stabilized geostationary bus with C-band, S-band transponders and VHRR weather sensor",
      "manufacturer": "Ford Aerospace / ISRO",
      "massKg": 1152,
      "powerSource": "Single solar array wing with solar sail (1185 W)"
    },
    "currentOperationalStatus": "Mission completed; boosted to graveyard orbit.",
    "historicalSignificance": "Revolutionized Indian society by enabling nationwide television, telecommunications, and early disaster warning.",
    "latestKnownUpdate": "Parked in supersynchronous graveyard orbit.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/INSAT-1B.html",
    "relatedNewsTags": [
      "INSAT-1B",
      "Telecommunications",
      "Weather Satellite",
      "Challenger STS-8"
    ],
    "tags": [
      "INSAT",
      "ISRO",
      "Telecom",
      "Meteorology",
      "Geostationary"
    ]
  },
  {
    "id": "irs-1a",
    "name": "IRS-1A",
    "alternateNames": [
      "Indian Remote Sensing Satellite 1A"
    ],
    "programme": "IRS Programme",
    "programmeId": "isro-historic",
    "agency": "ISRO",
    "partnerAgencies": [
      "Soviet Glavkosmos"
    ],
    "category": "Earth Observation",
    "destination": "Sun-Synchronous Polar Orbit (904 km)",
    "status": "completed",
    "launchDate": "1988-03-17",
    "endDate": "1996-05-01",
    "launchVehicle": "Vostok-2M",
    "missionType": "Operational Multispectral Earth Observation Satellite",
    "missionDuration": "8+ years",
    "description": "India's first operational remote sensing satellite, featuring LISS-I and LISS-II multispectral cameras that initiated India's self-reliant agricultural and natural resource management.",
    "scientificObjectives": [
      "Provide high-quality multispectral imagery for crop acreage and yield estimation",
      "Map underground water resources, forest cover, and soil wasteland classification"
    ],
    "keyAchievements": [
      "Inaugurated the world-class Indian Remote Sensing (IRS) series",
      "Enabled the National Drinking Water Mission to locate potable ground aquifers",
      "Returned millions of square kilometers of calibrated multispectral data"
    ],
    "milestones": [
      {
        "label": "Launch from Baikonur Cosmodrome",
        "date": "1988-03-17",
        "done": true
      },
      {
        "label": "First imagery delivered to National Remote Sensing Centre (NRSC)",
        "date": "1988-03-25",
        "done": true
      },
      {
        "label": "Completed 8 years of operational service",
        "date": "1996-05-01",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "3-axis body-stabilized polar platform with LISS cameras",
      "manufacturer": "ISRO Satellite Centre (URSC)",
      "massKg": 975,
      "powerSource": "Dual solar arrays (600 W)"
    },
    "currentOperationalStatus": "Mission completed; decommissioned after successful extended service.",
    "historicalSignificance": "Made India a global benchmark in civil applications of Earth observation for national development.",
    "latestKnownUpdate": "Orbiting passively in polar orbit.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/IRS-1A.html",
    "relatedNewsTags": [
      "IRS-1A",
      "Remote Sensing",
      "LISS",
      "Earth Observation",
      "NRSC"
    ],
    "tags": [
      "IRS",
      "ISRO",
      "Remote Sensing",
      "Earth Observation"
    ]
  },
  {
    "id": "chandrayaan-1",
    "name": "Chandrayaan-1",
    "alternateNames": [
      "PSLV-C11 / Chandrayaan-1"
    ],
    "programme": "Chandrayaan Programme",
    "programmeId": "chandrayaan",
    "agency": "ISRO",
    "partnerAgencies": [
      "NASA",
      "ESA",
      "Bulgarian Academy of Sciences"
    ],
    "category": "Robotic Exploration",
    "destination": "Lunar Orbit (100 km polar)",
    "status": "completed",
    "launchDate": "2008-10-22",
    "endDate": "2009-08-29",
    "launchVehicle": "PSLV-XL (C11)",
    "missionType": "Lunar Orbiter & Moon Impact Probe (MIP)",
    "missionDuration": "312 days",
    "description": "India's historic first deep-space mission to the Moon, which made the monumental discovery of water molecules (H2O and hydroxyl OH) on the lunar surface.",
    "scientificObjectives": [
      "High-resolution chemical and mineralogical mapping of the entire lunar surface",
      "Prepare a 3D atlas of both near and far sides of the Moon",
      "Release the Moon Impact Probe (MIP) to strike the lunar south pole"
    ],
    "keyAchievements": [
      "Discovered lunar water molecules via NASA's Moon Mineralogy Mapper (M3) and ISRO's MIP",
      "MIP impacted Shackleton Crater on November 14, 2008, unfurling the Indian tricolor on the Moon",
      "Confirmed the presence of water ice in permanently shadowed polar craters"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota on PSLV-XL",
        "date": "2008-10-22",
        "done": true
      },
      {
        "label": "Lunar orbit insertion (LOI)",
        "date": "2008-11-08",
        "done": true
      },
      {
        "label": "Moon Impact Probe touches down at Shackleton Crater",
        "date": "2008-11-14",
        "done": true
      },
      {
        "label": "Completed 3,400 lunar orbits",
        "date": "2009-08-20",
        "done": true
      },
      {
        "label": "Telemetry ceased; NASA radar relocated satellite in orbit in 2016",
        "date": "2009-08-29",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Cubic lunar orbiter with Moon Impact Probe and 11 scientific payloads",
      "manufacturer": "ISRO Satellite Centre",
      "massKg": 1380,
      "powerSource": "Single solar array wing (750 W)"
    },
    "currentOperationalStatus": "Mission completed. Spacecraft was tracked still silently orbiting the Moon by NASA JPL goldstone radar in 2016.",
    "historicalSignificance": "Forever changed humanity's view of the Moon from a bone-dry desert to a volatile-rich body hosting water resources.",
    "latestKnownUpdate": "Orbiting passively around the Moon.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Chandrayaan1.html",
    "relatedNewsTags": [
      "Chandrayaan-1",
      "Lunar Water",
      "Moon Impact Probe",
      "PSLV-C11",
      "M3"
    ],
    "tags": [
      "Chandrayaan-1",
      "Moon",
      "Water on Moon",
      "ISRO",
      "Historic"
    ]
  },
  {
    "id": "mars-orbiter-mission",
    "name": "Mars Orbiter Mission (Mangalyaan)",
    "alternateNames": [
      "MOM"
    ],
    "programme": "Interplanetary Exploration",
    "programmeId": "isro-mars",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars Orbit",
    "status": "completed",
    "launchDate": "2013-11-05",
    "endDate": "2022-10-02",
    "launchVehicle": "PSLV-XL (C25)",
    "missionType": "Mars Science Orbiter",
    "missionDuration": "8 years, 11 months (designed for 6 months)",
    "description": "India's sensational first interplanetary mission, making ISRO the first Asian space agency to reach Mars orbit and the first in the world to succeed on its maiden attempt.",
    "scientificObjectives": [
      "Develop the technologies required for designing, planning, and operating an interplanetary mission",
      "Explore Martian surface features, morphology, mineralogy, and Martian atmosphere using indigenous instruments"
    ],
    "keyAchievements": [
      "First nation in the world to reach Mars orbit on its maiden attempt",
      "First Asian nation to successfully reach Martian orbit",
      "Operated for nearly 9 years—15 times its planned design life—at a frugal cost of ~$74 million",
      "Captured iconic full-disk color portraits of Mars using the Mars Colour Camera (MCC)"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota",
        "date": "2013-11-05",
        "done": true
      },
      {
        "label": "Trans-Mars Injection (TMI) burn",
        "date": "2013-11-30",
        "done": true
      },
      {
        "label": "Flawless Mars Orbit Insertion (MOI)",
        "date": "2014-09-24",
        "done": true
      },
      {
        "label": "Survived long-duration eclipses using autonomous battery management",
        "date": "2017-01-17",
        "done": true
      },
      {
        "label": "Propellant exhausted; mission declared completed after 8 years of science",
        "date": "2022-10-02",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Modified I-1K satellite bus with 440 N Liquid Apogee Motor (LAM) and 5 science instruments",
      "manufacturer": "ISRO URSC",
      "massKg": 1337,
      "powerSource": "Three solar array panels (840 W at Mars)"
    },
    "currentOperationalStatus": "Mission completed; fuel exhausted after 8 years of stellar service.",
    "historicalSignificance": "A global triumph of frugal, high-precision aerospace engineering that cemented India's status as an interplanetary power.",
    "latestKnownUpdate": "Orbiting Mars passively as a defunct historic satellite.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/MOM.html",
    "relatedNewsTags": [
      "Mangalyaan",
      "Mars Orbiter Mission",
      "MOM",
      "PSLV-C25",
      "Mars"
    ],
    "tags": [
      "Mangalyaan",
      "MOM",
      "Mars",
      "Interplanetary",
      "ISRO Completed"
    ]
  },
  {
    "id": "astrosat",
    "name": "AstroSat",
    "alternateNames": [
      "India Multi-Wavelength Space Observatory"
    ],
    "programme": "Space Astronomy Programme",
    "programmeId": "isro-astronomy",
    "agency": "ISRO",
    "partnerAgencies": [
      "IUCAA",
      "TIFR",
      "IIA",
      "RRI",
      "CSA"
    ],
    "category": "Space Observatories",
    "destination": "Low Earth Orbit (650 km, 6° inclination)",
    "status": "active",
    "launchDate": "2015-09-28",
    "endDate": null,
    "launchVehicle": "PSLV-XL (C30)",
    "missionType": "Multi-Wavelength Astronomical Space Observatory",
    "missionDuration": "11+ years (ongoing)",
    "description": "India's dedicated multi-wavelength space astronomy observatory, observing the cosmos simultaneously from ultraviolet to high-energy X-rays.",
    "scientificObjectives": [
      "Simultaneous multi-wavelength monitoring of cosmic sources in optical, UV, soft X-ray, and hard X-ray bands",
      "Study periodic and aperiodic variability of X-ray binaries, pulsars, and active galactic nuclei",
      "Conduct wide-field deep UV surveys of nearby star-forming galaxies"
    ],
    "keyAchievements": [
      "Discovered extreme UV light from a galaxy 9.3 billion light-years away (AUDFs01)",
      "Captured black hole spin and coronal heating across binary systems",
      "Detected over 500 gamma-ray bursts (GRBs) and hundreds of coronal mass ejections",
      "Operated well over double its designed 5-year mission lifespan"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota",
        "date": "2015-09-28",
        "done": true
      },
      {
        "label": "All 5 instruments opened and calibrated in orbit",
        "date": "2015-10-15",
        "done": true
      },
      {
        "label": "Discovered AUDFs01 extreme-UV emission",
        "date": "2020-08-24",
        "done": true
      },
      {
        "label": "Completed 10th year of continuous astronomical observations",
        "date": "2025-09-28",
        "done": true
      },
      {
        "label": "Active observations supporting multi-messenger astrophysics",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized astronomy platform with UVIT, SXT, LAXPC, CZTI, and SSM instruments",
      "manufacturer": "ISRO URSC",
      "massKg": 1515,
      "powerSource": "Two solar arrays generating 2100 W"
    },
    "currentOperationalStatus": "Active and producing astronomical discoveries; Ultra-Violet Imaging Telescope (UVIT) and Cadmium Zinc Telluride Imager (CZTI) working nominally.",
    "historicalSignificance": "India's flagship orbital telescope, placing Indian astrophysicists at the cutting edge of multi-wavelength high-energy astronomy.",
    "latestKnownUpdate": "Coordinated observations with AstroSat and XPoSat tracking magnetar flare events.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/AstroSat.html",
    "relatedNewsTags": [
      "AstroSat",
      "UVIT",
      "Space Telescope",
      "X-ray Astronomy",
      "TIFR"
    ],
    "tags": [
      "AstroSat",
      "Astronomy",
      "Observatory",
      "UVIT",
      "ISRO Active"
    ]
  },
  {
    "id": "chandrayaan-2",
    "name": "Chandrayaan-2",
    "alternateNames": [
      "GSLV Mk III-M1 / Chandrayaan-2"
    ],
    "programme": "Chandrayaan Programme",
    "programmeId": "chandrayaan",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Lunar Orbit & South Polar Region",
    "status": "extended",
    "launchDate": "2019-07-22",
    "endDate": null,
    "launchVehicle": "LVM3 (GSLV Mk III-M1)",
    "missionType": "Lunar Orbiter, Lander (Vikram), and Rover (Pragyan)",
    "missionDuration": "Orbiter: 7+ years (active); Lander: Hard touchdown in 2019",
    "description": "India's second lunar expedition whose advanced Orbiter continues operating around the Moon, providing the highest-resolution lunar optical cameras (OHRC) in orbit and acting as communication relay for Chandrayaan-3.",
    "scientificObjectives": [
      "Orbital mapping of lunar surface elements and water ice with OHRC, CLASS, and dual-frequency SAR",
      "Attempted soft touchdown of Vikram lander near the south polar region"
    ],
    "keyAchievements": [
      "Orbiter High Resolution Camera (OHRC) provides sub-0.3m imagery, the sharpest optical images ever taken from lunar orbit",
      "Mapped distribution of water ice in permanently shadowed polar craters using dual-frequency Synthetic Aperture Radar (DFSAR)",
      "Served as communication conduit and relay station for Chandrayaan-3's Vikram lander in 2023"
    ],
    "milestones": [
      {
        "label": "Launch on LVM3-M1",
        "date": "2019-07-22",
        "done": true
      },
      {
        "label": "Lunar orbit insertion",
        "date": "2019-08-20",
        "done": true
      },
      {
        "label": "Vikram lander hard touchdown during final braking phase",
        "date": "2019-09-07",
        "done": true
      },
      {
        "label": "Orbiter science mission extended to 7 years due to fuel conservation",
        "date": "2019-10-01",
        "done": true
      },
      {
        "label": "Relayed landing imagery and data for Chandrayaan-3",
        "date": "2023-08-23",
        "done": true
      },
      {
        "label": "Orbiter actively mapping lunar surface in extended mission",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Heavy lunar orbiter bus with 8 scientific instruments (OHRC, DFSAR, CLASS, IIRS)",
      "manufacturer": "ISRO URSC",
      "massKg": 2379,
      "powerSource": "Solar array generating 1000 W"
    },
    "currentOperationalStatus": "Orbiter active and operational in 100 km circular lunar orbit with fuel reserves sufficient to operate into the late 2020s.",
    "historicalSignificance": "Delivered an exceptionally capable orbiter whose reconnaissance photos directly enabled the pinpoint safe landing of Chandrayaan-3.",
    "latestKnownUpdate": "Continuing high-resolution imaging of candidate landing sites for Chandrayaan-4 and international Artemis missions.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Chandrayaan2.html",
    "relatedNewsTags": [
      "Chandrayaan-2",
      "Lunar Orbiter",
      "OHRC",
      "DFSAR",
      "Vikram"
    ],
    "tags": [
      "Chandrayaan-2",
      "Moon",
      "Orbiter",
      "OHRC",
      "ISRO Active"
    ]
  },
  {
    "id": "chandrayaan-3",
    "name": "Chandrayaan-3",
    "alternateNames": [
      "LVM3-M4 / Chandrayaan-3"
    ],
    "programme": "Chandrayaan Programme",
    "programmeId": "chandrayaan",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Lunar South Pole (Shiv Shakti Point: 69.37° S, 32.35° E)",
    "status": "completed",
    "launchDate": "2023-07-14",
    "endDate": "2023-09-04",
    "launchVehicle": "LVM3 (M4)",
    "missionType": "Lunar Soft Lander (Vikram) & Rover (Pragyan)",
    "missionDuration": "1 Lunar Day (14 Earth days) surface operations",
    "description": "Humanity's historic first soft landing near the Moon's south pole, cementing India as the 4th nation to soft-land on the Moon and the first near the lunar south pole, discovering sulfur in the polar regolith.",
    "scientificObjectives": [
      "Demonstrate safe and soft landing on the lunar south polar region",
      "Demonstrate rover roving on the Moon's surface",
      "Conduct in-situ scientific experiments on lunar thermophysics, plasma, seismology, and elemental composition"
    ],
    "keyAchievements": [
      "First nation in human history to land a spacecraft near the lunar south pole",
      "Touchdown achieved at Shiv Shakti Point on August 23, 2023",
      "Pragyan rover traversed 101.4 meters and unambiguously detected Sulfur (S) in the polar regolith via LIBS",
      "ChaSTE probe measured the first-ever thermal gradient profile through lunar polar topsoil",
      "Executed a surprise \"hop experiment\", reigniting engines to lift 40 cm and relocate, demonstrating ascent capability for future sample return"
    ],
    "milestones": [
      {
        "label": "Launch on LVM3-M4 from Sriharikota",
        "date": "2023-07-14",
        "done": true
      },
      {
        "label": "Lunar orbit insertion",
        "date": "2023-08-05",
        "done": true
      },
      {
        "label": "Historic touchdown at Shiv Shakti Point (18:04 IST)",
        "date": "2023-08-23",
        "done": true
      },
      {
        "label": "Pragyan rover ramp rollout onto lunar dust",
        "date": "2023-08-24",
        "done": true
      },
      {
        "label": "LIBS confirms sulfur in lunar south polar soil",
        "date": "2023-08-29",
        "done": true
      },
      {
        "label": "Vikram executes successful lunar hop test",
        "date": "2023-09-03",
        "done": true
      },
      {
        "label": "Lander and rover put into sleep mode at lunar sunset; mission objectives 100% completed",
        "date": "2023-09-04",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Lander module (Vikram) with four throttleable 800N liquid engines + 6-wheel rover (Pragyan)",
      "manufacturer": "ISRO URSC",
      "massKg": 3900,
      "powerSource": "Lander: 738 W solar panels; Rover: 50 W solar panel"
    },
    "currentOperationalStatus": "Mission completed with 100% success. Vikram and Pragyan remain permanently at Shiv Shakti Point.",
    "historicalSignificance": "A triumph of space exploration, opening up the resource-rich lunar south pole for human settlement.",
    "latestKnownUpdate": "Shiv Shakti Point officially recognized by the IAU. Propulsion Module returned from lunar orbit to Earth orbit to test orbital return mechanics.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Chandrayaan3.html",
    "relatedNewsTags": [
      "Chandrayaan-3",
      "Shiv Shakti Point",
      "Lunar South Pole",
      "Vikram Lander",
      "Pragyan Rover",
      "Hop Test"
    ],
    "tags": [
      "Chandrayaan-3",
      "Moon",
      "Lunar South Pole",
      "Vikram",
      "Pragyan",
      "ISRO Completed",
      "Historic"
    ]
  },
  {
    "id": "aditya-l1",
    "name": "Aditya-L1",
    "alternateNames": [
      "PSLV-C57 / Aditya-L1"
    ],
    "programme": "Solar Physics Programme",
    "programmeId": "isro-astronomy",
    "agency": "ISRO",
    "partnerAgencies": [
      "IIA",
      "IUCAA",
      "PRL"
    ],
    "category": "Space Observatories",
    "destination": "Sun-Earth L1 Lagrange Point (1.5 million km)",
    "status": "active",
    "launchDate": "2023-09-02",
    "endDate": null,
    "launchVehicle": "PSLV-XL (C57)",
    "missionType": "Solar & Space Weather Observatory",
    "missionDuration": "5-year nominal mission (ongoing)",
    "description": "India's first dedicated solar observatory, orbiting Sun-Earth Lagrange Point 1 to provide uninterrupted observations of the Sun's corona, chromosphere, and solar flares.",
    "scientificObjectives": [
      "Study solar upper atmospheric (chromosphere and corona) dynamics and heating mechanisms",
      "Observe physical processes leading to coronal mass ejections (CMEs) and solar flares",
      "Provide real-time space weather alerts for geomagnetic storms"
    ],
    "keyAchievements": [
      "First Indian spacecraft stationed at Sun-Earth L1 halo orbit",
      "VELC coronagraph captured high-cadence solar coronal imagery",
      "SUIT telescope imaged the solar photosphere and chromosphere in 11 near-UV filters",
      "ASPEX and PAPA instruments recorded massive coronal mass ejection shocks during May 2024 solar storm"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota on PSLV-C57",
        "date": "2023-09-02",
        "done": true
      },
      {
        "label": "Trans-Lagrangian 1 Injection (TL1I)",
        "date": "2023-09-19",
        "done": true
      },
      {
        "label": "Flawless halo orbit insertion at Sun-Earth L1",
        "date": "2024-01-06",
        "done": true
      },
      {
        "label": "Captured major G5 solar storm impacts",
        "date": "2024-05-11",
        "done": true
      },
      {
        "label": "Continuous 24/7 solar observing operations during solar maximum",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized solar observatory with 7 payloads (VELC, SUIT, ASPEX, PAPA, SoLEXS, HEL1OS, MAG)",
      "manufacturer": "ISRO URSC",
      "massKg": 1475,
      "powerSource": "Dual solar arrays generating 1670 W"
    },
    "currentOperationalStatus": "Active and monitoring the Sun without occultation or eclipses from Sun-Earth L1 halo orbit. All 7 instruments operational.",
    "historicalSignificance": "Established India in the elite group of nations operating space weather sentinel observatories at the Sun-Earth L1 point.",
    "latestKnownUpdate": "SUIT and VELC data contributing to global space weather forecasts protecting satellites and terrestrial power grids.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Aditya_L1.html",
    "relatedNewsTags": [
      "Aditya-L1",
      "Sun",
      "L1",
      "Solar Flares",
      "Space Weather",
      "VELC",
      "SUIT"
    ],
    "tags": [
      "Aditya-L1",
      "Sun",
      "Observatory",
      "Solar",
      "ISRO Active"
    ]
  },
  {
    "id": "xposat",
    "name": "XPoSat (X-ray Polarimeter Satellite)",
    "alternateNames": [
      "PSLV-C58 / XPoSat"
    ],
    "programme": "Space Astronomy Programme",
    "programmeId": "isro-astronomy",
    "agency": "ISRO",
    "partnerAgencies": [
      "Raman Research Institute (RRI)"
    ],
    "category": "Space Observatories",
    "destination": "Low Earth Orbit (650 km, 6° inclination)",
    "status": "active",
    "launchDate": "2024-01-01",
    "endDate": null,
    "launchVehicle": "PSLV-DL (C58)",
    "missionType": "X-ray Polarimetry Space Observatory",
    "missionDuration": "5-year nominal mission (ongoing)",
    "description": "India's dedicated X-ray polarimetry satellite, only the world's second such mission (alongside NASA's IXPE), probing the polarization of X-rays from black holes, neutron stars, and pulsar wind nebulae.",
    "scientificObjectives": [
      "Measure polarimetric parameters of bright astronomical X-ray sources in 8-30 keV band",
      "Conduct long-term spectral and timing studies of cosmic X-ray emissions in 0.8-15 keV band"
    ],
    "keyAchievements": [
      "World's second dedicated orbital X-ray polarimetry observatory",
      "Successfully observed Crab Nebula and pulsar, determining precise magnetic field geometry",
      "POLIX payload (RRI) demonstrated high precision polarization detection in medium X-ray regime"
    ],
    "milestones": [
      {
        "label": "Launch on New Year's Day 2024 on PSLV-C58",
        "date": "2024-01-01",
        "done": true
      },
      {
        "label": "POLIX and XSPECT instruments opened for observations",
        "date": "2024-01-10",
        "done": true
      },
      {
        "label": "Crab Pulsar polarization confirmed",
        "date": "2024-03-15",
        "done": true
      },
      {
        "label": "Active observations of Galactic magnetars and microquasars",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized astronomy satellite with POLIX and XSPECT instruments",
      "manufacturer": "ISRO URSC / Raman Research Institute",
      "massKg": 469,
      "powerSource": "Solar array (280 W)"
    },
    "currentOperationalStatus": "Active and gathering polarimetric data on exotic astrophysical compact objects.",
    "historicalSignificance": "Elevated India into the frontier of astronomical polarimetry, illuminating the physics of intense magnetic and gravitational fields.",
    "latestKnownUpdate": "Routine science observations cycling through magnetar targets and X-ray binary systems.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/XPoSat.html",
    "relatedNewsTags": [
      "XPoSat",
      "X-ray Polarimetry",
      "POLIX",
      "Crab Nebula",
      "RRI"
    ],
    "tags": [
      "XPoSat",
      "Polarimetry",
      "Black Holes",
      "Neutron Stars",
      "ISRO Active"
    ]
  },
  {
    "id": "spadex",
    "name": "SpaDeX (Space Docking Experiment)",
    "alternateNames": [
      "PSLV-C60 / SpaDeX"
    ],
    "programme": "Space Docking & Space Station Programme",
    "programmeId": "isro-human",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Low Earth Orbit (450 km)",
    "status": "in-development",
    "launchDate": "2024-12-30",
    "endDate": null,
    "launchVehicle": "PSLV (C60)",
    "missionType": "Autonomous In-Orbit Rendezvous and Docking Technology Demonstrator",
    "missionDuration": "Primary demo phase followed by formation flying",
    "description": "A pivotal technology demonstrator deploying twin satellites (Chaser and Target) to master autonomous in-orbit rendezvous, docking, and power transfer—the crucial capability for Chandrayaan-4 lunar sample return and the Bharatiya Antariksh Station (BAS).",
    "scientificObjectives": [
      "Demonstrate autonomous rendezvous and berthing of two independent satellites in LEO",
      "Test optical, laser, and RF inter-satellite relative navigation systems",
      "Validate mechanical latching mechanisms and electrical power transfer between docked spacecraft"
    ],
    "keyAchievements": [
      "Developed indigenous androgynous docking mechanism and optical target sensors",
      "Integrated twin Chaser and Target flight modules at U.R. Rao Satellite Centre"
    ],
    "milestones": [
      {
        "label": "Flight hardware qualification completed at URSC",
        "date": "2024-10-25",
        "done": true
      },
      {
        "label": "Integrated twin satellite launch atop PSLV",
        "date": "2024-12-30",
        "done": true
      },
      {
        "label": "Autonomous approach and docking demonstration in LEO",
        "date": "2025-01-15",
        "done": true
      },
      {
        "label": "Demonstrated power transfer and undocking",
        "date": "2025-02-10",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Twin satellites (Chaser: ~220 kg; Target: ~200 kg) with docking adapters and optical lidar sensors",
      "manufacturer": "ISRO URSC",
      "massKg": 420,
      "powerSource": "Body and wing-mounted solar arrays"
    },
    "currentOperationalStatus": "Mission flight demonstration completed successfully; demonstrated autonomous orbital docking.",
    "historicalSignificance": "Unlocks the fundamental building block for orbital space stations, in-space satellite servicing, and multi-launch lunar sample return.",
    "latestKnownUpdate": "Post-docking telemetry verified alignment sensors operated within millimeter tolerance limits.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/",
    "relatedNewsTags": [
      "SpaDeX",
      "Space Docking",
      "Bharatiya Antariksh Station",
      "Chandrayaan-4",
      "PSLV"
    ],
    "tags": [
      "SpaDeX",
      "Docking",
      "Space Station",
      "ISRO",
      "Technology"
    ]
  },
  {
    "id": "nisar",
    "name": "NISAR (NASA-ISRO SAR)",
    "alternateNames": [
      "NASA-ISRO Synthetic Aperture Radar"
    ],
    "programme": "Earth Observation Partnership",
    "programmeId": "earth-observatories",
    "agency": "ISRO",
    "partnerAgencies": [
      "NASA JPL"
    ],
    "category": "Earth Observation",
    "destination": "Sun-Synchronous Polar Orbit (747 km)",
    "status": "in-development",
    "launchDate": "2025-03-15",
    "endDate": null,
    "launchVehicle": "GSLV Mk II (F16)",
    "missionType": "Dual-Frequency Synthetic Aperture Radar Earth Observatory",
    "missionDuration": "3-year primary mission (planned)",
    "description": "The world's most advanced Earth-observing radar observatory, a groundbreaking joint mission between NASA and ISRO featuring dual L-band and S-band radar to map the entire Earth surface every 12 days at millimeter-scale precision.",
    "scientificObjectives": [
      "Map dynamic land deformation, earthquake faults, volcanic swelling, and landslides down to fractions of an inch",
      "Measure ice sheet motion, polar glacier retreat, and sea ice dynamics",
      "Assess global forest canopy, biomass changes, agricultural crop patterns, and wetlands"
    ],
    "keyAchievements": [
      "First satellite to use dual-frequency Synthetic Aperture Radar (L-band from NASA, S-band from ISRO)",
      "Incorporates a massive 12-meter deployable mesh reflector antenna",
      "Thermal reflector antenna successfully re-coated and verified in joint NASA-ISRO cleanrooms"
    ],
    "milestones": [
      {
        "label": "S-band radar delivered by ISRO to JPL for integration",
        "date": "2021-03-19",
        "done": true
      },
      {
        "label": "Radar payload integrated with spacecraft bus at URSC Bengaluru",
        "date": "2023-10-15",
        "done": true
      },
      {
        "label": "Final acoustic and vibration environmental tests completed",
        "date": "2024-09-12",
        "done": true
      },
      {
        "label": "Launch on GSLV from Sriharikota",
        "date": "2025-03-15",
        "done": true
      },
      {
        "label": "Global radar mapping of Earth ecosystems and crustal motion",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Heavy 3-axis stabilized radar satellite with 12 m deployable boom and mesh reflector",
      "manufacturer": "ISRO URSC (Bus & S-SAR) / NASA JPL (L-SAR & Antenna)",
      "massKg": 2800,
      "powerSource": "Solar arrays producing 4 kW"
    },
    "currentOperationalStatus": "Active and delivering all-weather day/night radar imaging of Earth's changing biosphere and cryosphere.",
    "historicalSignificance": "Humanity's premier Earth observation asset for measuring climate change, environmental risk, and crustal deformation.",
    "latestKnownUpdate": "High-speed Ka-band downlinks streaming petabytes of radar interferometry to global scientific repositories.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://nisar.jpl.nasa.gov/",
    "relatedNewsTags": [
      "NISAR",
      "NASA-ISRO",
      "Radar",
      "Earth Observation",
      "Climate Change",
      "GSLV"
    ],
    "tags": [
      "NISAR",
      "Earth Observation",
      "Radar",
      "ISRO",
      "NASA",
      "Climate"
    ]
  },
  {
    "id": "gaganyaan-tv-d1",
    "name": "Gaganyaan TV-D1",
    "alternateNames": [
      "Test Vehicle Demonstration 1"
    ],
    "programme": "Gaganyaan Programme",
    "programmeId": "gaganyaan",
    "agency": "ISRO",
    "partnerAgencies": [
      "Indian Navy"
    ],
    "category": "Human Spaceflight",
    "destination": "Suborbital In-Flight Abort (17 km altitude)",
    "status": "completed",
    "launchDate": "2023-10-21",
    "endDate": "2023-10-21",
    "launchVehicle": "Test Vehicle (TV) Single-Stage Liquid Rocket",
    "missionType": "In-Flight Crew Escape System Demonstration",
    "missionDuration": "9 minutes, 17 seconds",
    "description": "Crucial in-flight abort test validating the quick-reaction Crew Escape System (CES) for the Gaganyaan human spaceflight mission at Mach 1.2 conditions.",
    "scientificObjectives": [
      "Evaluate Crew Escape System separation during transonic flight at Mach 1.2",
      "Demonstrate parachute deployment sequence and sea splashdown recovery operations with the Indian Navy"
    ],
    "keyAchievements": [
      "Flawlessly separated crew module at 17 km altitude under dynamic pressure",
      "All 10 parachutes deployed in sequence bringing module safely down to the Bay of Bengal",
      "Crew module recovered within 2 hours by Indian Navy dive teams off Chennai coast"
    ],
    "milestones": [
      {
        "label": "Liftoff from Sriharikota launch pad",
        "date": "2023-10-21",
        "done": true
      },
      {
        "label": "High-altitude abort command executed at Mach 1.2",
        "date": "2023-10-21",
        "done": true
      },
      {
        "label": "Parachute sequence decelerated module to 8.5 m/s splashdown",
        "date": "2023-10-21",
        "done": true
      },
      {
        "label": "Indian Navy recovered Crew Module from sea",
        "date": "2023-10-21",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Single-stage liquid test booster with unpressurized Gaganyaan Crew Module and Escape Tower",
      "manufacturer": "ISRO VSSC / LPSC",
      "massKg": 4520,
      "powerSource": "Internal batteries"
    },
    "currentOperationalStatus": "Mission completed with 100% test success.",
    "historicalSignificance": "Proved the safety architecture that protects Indian astronauts during a launch vehicle anomaly.",
    "latestKnownUpdate": "Data used to fine-tune flight computer abort triggers for orbital G1 mission.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Gaganyaan.html",
    "relatedNewsTags": [
      "Gaganyaan",
      "TV-D1",
      "Crew Escape System",
      "Indian Navy",
      "Vyomnauts"
    ],
    "tags": [
      "Gaganyaan",
      "TV-D1",
      "Crew Escape",
      "Human Spaceflight",
      "ISRO Completed"
    ]
  },
  {
    "id": "gaganyaan-g1",
    "name": "Gaganyaan G1 (Uncrewed)",
    "alternateNames": [
      "Gaganyaan Uncrewed Flight 1"
    ],
    "programme": "Gaganyaan Programme",
    "programmeId": "gaganyaan",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (400 km)",
    "status": "upcoming",
    "launchDate": "2025-04-15",
    "endDate": null,
    "launchVehicle": "LVM3 (Human Rated HLVM3)",
    "missionType": "Uncrewed Orbital Qualification Flight with Vyommitra Humanoid Robot",
    "missionDuration": "3-day orbital flight test",
    "description": "First uncrewed orbital flight of the Gaganyaan spacecraft launched by human-rated LVM3, carrying humanoid robot Vyommitra to validate life support, guidance, thermal protection, and ocean recovery.",
    "scientificObjectives": [
      "Qualify the human-rated launch vehicle (HLVM3) during actual orbital flight",
      "Test Environmental Control and Life Support System (ECLSS) performance in microgravity",
      "Monitor biometric, pressure, and thermal loads via the humanoid robot Vyommitra",
      "Execute controlled atmospheric re-entry and pinpoint sea recovery"
    ],
    "keyAchievements": [
      "Human-rating of Vikas liquid engines and cryogenic C25 stage completed and certified",
      "Vyommitra humanoid robot integrated with mission control voice communications",
      "Crew Module Service Module flight structures delivered to Sriharikota"
    ],
    "milestones": [
      {
        "label": "Human-rating static fire tests of C25 cryogenic engine completed",
        "date": "2024-02-21",
        "done": true
      },
      {
        "label": "Integration of flight crew module and ECLSS simulated cabin",
        "date": "2024-11-15",
        "done": true
      },
      {
        "label": "Orbital launch of HLVM3-G1 with Vyommitra robot",
        "date": "2025-04-15",
        "done": true
      },
      {
        "label": "Atmospheric re-entry and Bay of Bengal recovery",
        "date": "2025-04-18",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Pressurized human-rated crew module + service module carrying Vyommitra",
      "manufacturer": "ISRO VSSC / URSC / HAL",
      "massKg": 8200,
      "powerSource": "Solar panels and internal batteries"
    },
    "currentOperationalStatus": "Flight qualification completed, clearing the way for subsequent crewed missions.",
    "historicalSignificance": "The final critical orbital dress rehearsal before Indian astronauts fly into space.",
    "latestKnownUpdate": "Flight telemetry confirmed ECLSS maintained 1 atmosphere cabin pressure throughout orbital phase.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Gaganyaan.html",
    "relatedNewsTags": [
      "Gaganyaan G1",
      "Vyommitra",
      "HLVM3",
      "Uncrewed Mission",
      "Human Spaceflight"
    ],
    "tags": [
      "Gaganyaan",
      "G1",
      "Vyommitra",
      "Human Spaceflight",
      "ISRO"
    ]
  },
  {
    "id": "gaganyaan-h1",
    "name": "Gaganyaan H1 (First Crewed Flight)",
    "alternateNames": [
      "First Indian Crewed Orbital Flight"
    ],
    "programme": "Gaganyaan Programme",
    "programmeId": "gaganyaan",
    "agency": "ISRO",
    "partnerAgencies": [
      "Indian Air Force",
      "Indian Navy"
    ],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (400 km, 51.6° inclination)",
    "status": "in-development",
    "launchDate": "2026-08-15",
    "endDate": null,
    "launchVehicle": "Human Rated LVM3 (HLVM3)",
    "missionType": "First Crewed Indian Orbital Spaceflight",
    "missionDuration": "3-day orbital mission",
    "description": "India's historic first crewed spaceflight, sending Indian astronauts (Vyomnauts selected from the Indian Air Force) into a 400 km Earth orbit for 3 days aboard the indigenous Gaganyaan spacecraft.",
    "scientificObjectives": [
      "Safely deliver Indian astronauts to a 400 km Low Earth Orbit",
      "Conduct microgravity biomedical and materials science experiments",
      "Perform safe de-orbit burn and controlled re-entry with splashdown in Indian territorial waters"
    ],
    "keyAchievements": [
      "Four astronaut-designates publicly introduced by Prime Minister: Prashanth Nair, Ajit Krishnan, Angad Prathap, and Shubhanshu Shukla",
      "Astronaut Shubhanshu Shukla selected for Axiom-4 ISS mission as precursor international training flight",
      "Comprehensive centrifuge, zero-G parabolic flight, and survival training completed"
    ],
    "milestones": [
      {
        "label": "Astronaut candidates revealed to the nation",
        "date": "2024-02-27",
        "done": true
      },
      {
        "label": "Mission simulations and sea survival drills with Indian Navy",
        "date": "2025-06-10",
        "done": true
      },
      {
        "label": "Final integration of Human-Rated LVM3",
        "date": "2026-05-01",
        "done": true
      },
      {
        "label": "Scheduled crewed launch to Low Earth Orbit",
        "date": "2026-08-15",
        "done": false,
        "current": true
      }
    ],
    "crew": [
      {
        "name": "Group Captain Prashanth Nair",
        "role": "Mission Commander"
      },
      {
        "name": "Group Captain Ajit Krishnan",
        "role": "Flight Pilot"
      }
    ],
    "spacecraft": {
      "type": "Human-rated 8.2-tonne orbital vehicle with pressurized cabin, life support, and abort capability",
      "manufacturer": "ISRO / HAL / L&T",
      "massKg": 8200,
      "powerSource": "Deployable solar panels (up to 2 kW)"
    },
    "currentOperationalStatus": "Under active pre-flight preparation and crew simulation training at Astronaut Training Facility in Bengaluru.",
    "historicalSignificance": "Will make India the 4th nation on Earth with independent human orbital spaceflight capability.",
    "latestKnownUpdate": "Astronaut crew undergoing advanced docking and manual re-entry simulator scenarios.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Gaganyaan.html",
    "relatedNewsTags": [
      "Gaganyaan H1",
      "Indian Astronauts",
      "Vyomnauts",
      "Prashanth Nair",
      "Human Spaceflight"
    ],
    "tags": [
      "Gaganyaan",
      "H1",
      "Vyomnauts",
      "Crewed",
      "Human Spaceflight",
      "ISRO Upcoming"
    ]
  },
  {
    "id": "chandrayaan-4",
    "name": "Chandrayaan-4 (Lunar Sample Return)",
    "alternateNames": [
      "LUPEX / Lunar Sample Return"
    ],
    "programme": "Chandrayaan Programme",
    "programmeId": "chandrayaan",
    "agency": "ISRO",
    "partnerAgencies": [
      "JAXA"
    ],
    "category": "Robotic Exploration",
    "destination": "Lunar South Pole (Sample Collection & Earth Return)",
    "status": "in-development",
    "launchDate": "2028-06-01",
    "endDate": null,
    "launchVehicle": "Dual LVM3 launches with in-orbit docking",
    "missionType": "Lunar Sample Return Mission",
    "missionDuration": "Multi-module lunar mission",
    "description": "Approved by the Union Cabinet in 2024, Chandrayaan-4 is India's audacious lunar sample return mission, using dual launches and in-orbit docking to drill, collect, and return lunar south polar regolith safely to Earth.",
    "scientificObjectives": [
      "Collect and seal pristine lunar rock and core regolith from the south polar region",
      "Demonstrate lunar surface ascent (Ascenter Module)",
      "Perform autonomous docking in lunar orbit to transfer sample container",
      "Return sample capsule safely through Earth atmosphere"
    ],
    "keyAchievements": [
      "Official Cabinet approval and budget allocation granted in September 2024",
      "Architecture finalized: 5 distinct modules (Propulsion, Lander, Ascender, Transfer, and Re-entry Module)",
      "SpaDeX mission serves as key technology pathfinder for its orbital docking needs"
    ],
    "milestones": [
      {
        "label": "Union Cabinet approval granted",
        "date": "2024-09-18",
        "done": true
      },
      {
        "label": "Preliminary Design Review (PDR) of 5 modular spacecraft elements",
        "date": "2025-05-15",
        "done": true
      },
      {
        "label": "Sub-system fabrication and robotic drill testing",
        "date": "2026-10-31",
        "done": true,
        "current": true
      },
      {
        "label": "Targeted dual-launch campaign to the Moon",
        "date": "2028-06-01",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "5-module spacecraft architecture (Propulsion, Lander, Ascender, Transfer, Re-entry)",
      "manufacturer": "ISRO URSC / VSSC",
      "massKg": 5000,
      "powerSource": "Solar panels and thermal battery packs"
    },
    "currentOperationalStatus": "In advanced engineering design and hardware prototyping across ISRO centres.",
    "historicalSignificance": "Paves the technological highway for Indian astronauts landing on the Moon by 2040.",
    "latestKnownUpdate": "Robotic core drill mechanisms undergoing vacuum chamber testing with simulated lunar anorthosite regolith.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/",
    "relatedNewsTags": [
      "Chandrayaan-4",
      "Lunar Sample Return",
      "Shiv Shakti",
      "ISRO Moon",
      "Dual Launch"
    ],
    "tags": [
      "Chandrayaan-4",
      "Moon",
      "Sample Return",
      "ISRO Upcoming"
    ]
  },
  {
    "id": "shukrayaan-1",
    "name": "Shukrayaan-1 (Venus Orbiter Mission)",
    "alternateNames": [
      "VOM",
      "Venus Orbiter Mission"
    ],
    "programme": "Interplanetary Exploration",
    "programmeId": "isro-planetary",
    "agency": "ISRO",
    "partnerAgencies": [
      "CNES",
      "DLR"
    ],
    "category": "Robotic Exploration",
    "destination": "Venus Orbit",
    "status": "in-development",
    "launchDate": "2028-03-29",
    "endDate": null,
    "launchVehicle": "LVM3",
    "missionType": "Venus Science & Subsurface Radar Orbiter",
    "missionDuration": "5-year science mission",
    "description": "Approved by the Government of India in September 2024, Shukrayaan-1 is India's first mission to Venus, equipped with high-resolution synthetic aperture radar to penetrate Venus's dense acid clouds and study active volcanism.",
    "scientificObjectives": [
      "Investigate Venusian surface and subsurface geology using high-resolution SAR",
      "Study Venusian atmospheric dynamics, greenhouse mechanisms, and chemistry",
      "Search for active volcanism and trace phosphine/sulfur chemistry in cloud decks"
    ],
    "keyAchievements": [
      "Official Cabinet clearance and funding approved in September 2024",
      "Payload selection completed including synthetic aperture radar and thermal infrared sensor"
    ],
    "milestones": [
      {
        "label": "Mission cleared by Union Cabinet",
        "date": "2024-09-18",
        "done": true
      },
      {
        "label": "Aerobraking phase simulation completed for Venusian atmosphere",
        "date": "2025-08-10",
        "done": true
      },
      {
        "label": "Radar payload fabrication underway at Space Applications Centre (SAC)",
        "date": "2026-10-31",
        "done": true,
        "current": true
      },
      {
        "label": "Scheduled launch on LVM3 for Venus transfer window",
        "date": "2028-03-29",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized Venus orbiter with high-frequency SAR and atmospheric spectrometers",
      "manufacturer": "ISRO URSC / SAC Ahmedabad",
      "massKg": 2500,
      "powerSource": "High-temperature solar panels tailored for intense solar flux"
    },
    "currentOperationalStatus": "Approved and in active development across ISRO centres for the March 2028 planetary alignment window.",
    "historicalSignificance": "Positions India at the forefront of Venusian exploration alongside NASA's VERITAS and ESA's EnVision.",
    "latestKnownUpdate": "SAC Ahmedabad validated the dual-polarization synthetic aperture radar antenna design.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/",
    "relatedNewsTags": [
      "Shukrayaan",
      "Venus Orbiter",
      "ISRO Venus",
      "Active Volcanoes",
      "SAR"
    ],
    "tags": [
      "Shukrayaan",
      "Venus",
      "Interplanetary",
      "Radar",
      "ISRO Upcoming"
    ]
  },
  {
    "id": "rlv-lex",
    "name": "RLV-LEX (Reusable Launch Vehicle Landing Experiment)",
    "alternateNames": [
      "Pushpak"
    ],
    "programme": "Reusable Launch Vehicle Programme",
    "programmeId": "isro-technology",
    "agency": "ISRO",
    "partnerAgencies": [
      "DRDO",
      "Indian Air Force"
    ],
    "category": "Robotic Exploration",
    "destination": "Aeronautical Test Range, Chitradurga",
    "status": "completed",
    "launchDate": "2023-04-02",
    "endDate": "2024-06-23",
    "launchVehicle": "IAF Chinook Helicopter Drop",
    "missionType": "Autonomous Winged Reusable Spaceplane Landing Demonstrator",
    "missionDuration": "Series of 3 flight landing tests",
    "description": "ISRO's winged autonomous spaceplane \"Pushpak\" demonstrating pinpoint autonomous runway landing from mid-air release, pioneering reusable rocket launch infrastructure for India.",
    "scientificObjectives": [
      "Master autonomous autonomous guidance, navigation, and control algorithms for runway touchdown",
      "Demonstrate nose-wheel steering, braking, and drogue parachute deceleration under windy conditions"
    ],
    "keyAchievements": [
      "Executed three flawless autonomous landings (LEX-01 in 2023, LEX-02 in March 2024, LEX-03 in June 2024)",
      "Handled severe crosswinds simulating hypersonic orbital re-entry approach velocities",
      "Achieved centimetric touchdown accuracy on Chitradurga runway"
    ],
    "milestones": [
      {
        "label": "RLV-LEX-01 successful autonomous runway landing",
        "date": "2023-04-02",
        "done": true
      },
      {
        "label": "RLV-LEX-02 executes autonomous cross-range correction",
        "date": "2024-03-22",
        "done": true
      },
      {
        "label": "RLV-LEX-03 completes flight demonstration campaign under challenging wind conditions",
        "date": "2024-06-23",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Winged lifting-body autonomous aerodynamic flight vehicle with landing gear and drogue chute",
      "manufacturer": "ISRO VSSC Thiruvananthapuram",
      "massKg": 1750,
      "powerSource": "Thermal batteries"
    },
    "currentOperationalStatus": "Autonomous landing experiment campaign successfully completed. Preparing for orbital return test (ORE).",
    "historicalSignificance": "Proved India can develop winged reusable spacecraft capable of returning from space and landing on a standard runway.",
    "latestKnownUpdate": "Pushpak vehicle airframe cleared for upcoming orbital re-entry flight tests atop a rocket booster.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/RLV_LEX.html",
    "relatedNewsTags": [
      "Pushpak",
      "RLV-LEX",
      "Reusable Rocket",
      "Chitradurga",
      "VSSC"
    ],
    "tags": [
      "Pushpak",
      "RLV",
      "Reusable",
      "Aviation",
      "ISRO Completed"
    ]
  },
  {
    "id": "cartosat-3",
    "name": "Cartosat-3",
    "alternateNames": [
      "PSLV-C47 / Cartosat-3"
    ],
    "programme": "Earth Observation Programme",
    "programmeId": "earth-observatories",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Earth Observation",
    "destination": "Sun-Synchronous Polar Orbit (505 km)",
    "status": "active",
    "launchDate": "2019-11-27",
    "endDate": null,
    "launchVehicle": "PSLV-XL (C47)",
    "missionType": "Very High Resolution Panchromatic & Multispectral Earth Observation Satellite",
    "missionDuration": "5-year nominal mission (ongoing)",
    "description": "One of the sharpest civilian optical Earth observation satellites in the world, with ground resolution of ~0.28 meters for urban planning, infrastructure monitoring, and disaster mitigation.",
    "scientificObjectives": [
      "Provide ultra-high-resolution imaging (28 cm ground resolution) for urban planning and infrastructure development",
      "Monitor coastal land use, geographic utility mapping, and disaster vulnerability"
    ],
    "keyAchievements": [
      "Achieved ground resolution of 28 cm, among the highest of any civilian satellite globally",
      "Delivered crucial topological and infrastructural maps across the Indian subcontinent"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota",
        "date": "2019-11-27",
        "done": true
      },
      {
        "label": "First high-resolution images released to national user agencies",
        "date": "2019-12-15",
        "done": true
      },
      {
        "label": "Completed 5 years of daily sub-meter Earth monitoring",
        "date": "2024-11-27",
        "done": true
      },
      {
        "label": "Continuing high-resolution civil mapping services",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Advanced 3-axis stabilized remote sensing satellite with 1.2 m telescope optics",
      "manufacturer": "ISRO URSC / SAC",
      "massKg": 1625,
      "powerSource": "Solar array producing 2000 W"
    },
    "currentOperationalStatus": "Active and providing high-resolution geospatial imagery daily.",
    "historicalSignificance": "Established India as a global powerhouse in ultra-high-resolution civilian satellite imagery.",
    "latestKnownUpdate": "Routine optical data acquisition continuing with all sub-systems healthy.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/Cartosat3.html",
    "relatedNewsTags": [
      "Cartosat-3",
      "High Resolution Satellite",
      "Urban Mapping",
      "PSLV-C47"
    ],
    "tags": [
      "Cartosat-3",
      "Remote Sensing",
      "Earth Observation",
      "ISRO Active"
    ]
  },
  {
    "id": "oceansat-3",
    "name": "Oceansat-3 (EOS-06)",
    "alternateNames": [
      "PSLV-C54 / EOS-06"
    ],
    "programme": "Earth Observation Programme",
    "programmeId": "earth-observatories",
    "agency": "ISRO",
    "partnerAgencies": [],
    "category": "Earth Observation",
    "destination": "Sun-Synchronous Polar Orbit (743 km)",
    "status": "active",
    "launchDate": "2022-11-26",
    "endDate": null,
    "launchVehicle": "PSLV-XL (C54)",
    "missionType": "Oceanographic & Marine Meteorology Satellite",
    "missionDuration": "5-year nominal mission (ongoing)",
    "description": "Third-generation ocean monitoring satellite equipped with Ocean Colour Monitor (OCM-3), Ku-band Scatterometer, and Sea Surface Temperature Monitor for marine fisheries, weather, and cyclogenesis forecasting.",
    "scientificObjectives": [
      "Monitor ocean phytoplankton blooms, chlorophyll distribution, and potential fishing zones (PFZ)",
      "Measure ocean surface wind vector velocities for cyclone tracking",
      "Measure sea surface temperature to improve monsoonal forecasting models"
    ],
    "keyAchievements": [
      "Delivered daily high-precision wind vector and sea surface temperature maps",
      "Supported Indian National Centre for Ocean Information Services (INCOIS) with daily marine advisories for coastal fishermen",
      "Provided vital early storm-track data during major Arabian Sea and Bay of Bengal cyclones"
    ],
    "milestones": [
      {
        "label": "Launch from Sriharikota",
        "date": "2022-11-26",
        "done": true
      },
      {
        "label": "Scatterometer and OCM-3 sensor payload commissioning",
        "date": "2022-12-10",
        "done": true
      },
      {
        "label": "Full global ocean color datasets made publicly available",
        "date": "2023-03-29",
        "done": true
      },
      {
        "label": "Ongoing daily ocean and cyclone tracking operations",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized oceanographic satellite with OCM-3, Ku-Scatterometer, and SSTM",
      "manufacturer": "ISRO URSC / SAC",
      "massKg": 1117,
      "powerSource": "Dual solar arrays (1360 W)"
    },
    "currentOperationalStatus": "Active and providing daily ocean and meteorological products.",
    "historicalSignificance": "Guarantees continuous oceanographic data essential for Indian monsoon forecasting and coastal security.",
    "latestKnownUpdate": "Scatterometer and thermal infrared channels operating nominally in polar orbit.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.isro.gov.in/EOS_06.html",
    "relatedNewsTags": [
      "Oceansat-3",
      "EOS-06",
      "Ocean Monitoring",
      "INCOIS",
      "Scatterometer",
      "Cyclones"
    ],
    "tags": [
      "Oceansat-3",
      "EOS-06",
      "Oceanography",
      "Earth Observation",
      "ISRO Active"
    ]
  },
  {
    "id": "rosetta",
    "name": "Rosetta & Philae",
    "alternateNames": [
      "Rosetta Comet Rendezvous"
    ],
    "programme": "Horizon 2000",
    "programmeId": "esa-science",
    "agency": "ESA",
    "partnerAgencies": [
      "DLR",
      "CNES",
      "NASA"
    ],
    "category": "Robotic Exploration",
    "destination": "Comet 67P/Churyumov–Gerasimenko",
    "status": "completed",
    "launchDate": "2004-03-02",
    "endDate": "2016-09-30",
    "launchVehicle": "Ariane 5 G+",
    "missionType": "Comet Orbiter & Lander",
    "missionDuration": "12 years, 6 months",
    "description": "First spacecraft to orbit a comet and deploy a soft lander (Philae) onto its nucleus, revealing organic amino acids and proving cometary water differs isotopically from Earth's oceans.",
    "scientificObjectives": [
      "Rendezvous with and orbit Comet 67P as it approaches perihelion",
      "Deploy the Philae lander onto the cometary nucleus for in-situ science",
      "Measure isotope ratios of cometary water and detect prebiotic molecules"
    ],
    "keyAchievements": [
      "First spacecraft to escort and orbit a comet across its perihelion passage",
      "First soft landing on a cometary nucleus (Philae touchdown November 12, 2014)",
      "Discovered glycine (an amino acid) and phosphorus in the coma of Comet 67P",
      "Proved Earth's water has different deuterium-to-hydrogen ratio than 67P cometary ice"
    ],
    "milestones": [
      {
        "label": "Launch from Kourou",
        "date": "2004-03-02",
        "done": true
      },
      {
        "label": "Woke from 31-month deep space hibernation",
        "date": "2014-01-20",
        "done": true
      },
      {
        "label": "Comet 67P orbit insertion",
        "date": "2014-08-06",
        "done": true
      },
      {
        "label": "Philae soft touchdown at Agilkia / Abydos",
        "date": "2014-11-12",
        "done": true
      },
      {
        "label": "Controlled descent to comet surface ending mission",
        "date": "2016-09-30",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized orbiter with 32-meter solar arrays + 100 kg Philae lander",
      "manufacturer": "Airbus Defence and Space",
      "massKg": 3000,
      "powerSource": "Dual solar arrays (850 W at comet)"
    },
    "currentOperationalStatus": "Mission completed; rested on the surface of Comet 67P.",
    "historicalSignificance": "A landmark triumph in robotic navigation and cometary astrobiology.",
    "latestKnownUpdate": "Resting on Comet 67P in the Ma'at region.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Enabling_Support/Operations/Rosetta",
    "relatedNewsTags": [
      "Rosetta",
      "Philae",
      "Comet 67P",
      "ESA",
      "Astrobiology"
    ],
    "tags": [
      "Rosetta",
      "Philae",
      "Comet",
      "ESA",
      "Completed"
    ]
  },
  {
    "id": "mars-express",
    "name": "Mars Express",
    "alternateNames": [
      "MEX"
    ],
    "programme": "ESA Science Programme",
    "programmeId": "esa-science",
    "agency": "ESA",
    "partnerAgencies": [
      "ASI",
      "NASA"
    ],
    "category": "Robotic Exploration",
    "destination": "Mars Orbit",
    "status": "extended",
    "launchDate": "2003-06-02",
    "endDate": null,
    "launchVehicle": "Soyuz-FG / Fregat",
    "missionType": "Mars Science Orbiter",
    "missionDuration": "23+ years (ongoing)",
    "description": "Europe's first mission to Mars, continuously orbiting for over two decades and discovering evidence of subsurface liquid water lakes beneath the south polar ice cap using MARSIS radar.",
    "scientificObjectives": [
      "High-resolution stereoscopic global imaging of Martian topography",
      "Subsurface radar sounding for liquid water and ice layers",
      "Analyze atmospheric composition, circulation, and methane traces"
    ],
    "keyAchievements": [
      "Discovered evidence of subsurface liquid water beneath south polar layered deposits using MARSIS",
      "Mapped polar water-ice caps and hydrated clay minerals",
      "Completed over 25,000 orbits around Mars, returning thousands of stunning 3D stereoscopic images"
    ],
    "milestones": [
      {
        "label": "Launch from Baikonur",
        "date": "2003-06-02",
        "done": true
      },
      {
        "label": "Mars orbit insertion",
        "date": "2003-12-25",
        "done": true
      },
      {
        "label": "MARSIS radar antenna deployed",
        "date": "2005-06-17",
        "done": true
      },
      {
        "label": "Discovered subglacial liquid water lake signature",
        "date": "2018-07-25",
        "done": true
      },
      {
        "label": "Operations extended through late 2026",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized orbiter with HRSC stereo camera and 40-meter MARSIS radar boom",
      "manufacturer": "EADS Astrium",
      "massKg": 1120,
      "powerSource": "Two solar wings (460 W at Mars)"
    },
    "currentOperationalStatus": "Active in extended operations, acting as data relay and observing Martian atmospheric dynamics.",
    "historicalSignificance": "Europe's cornerstone planetary mission that confirmed Mars has vast water-ice reservoirs.",
    "latestKnownUpdate": "Routine science operations extended with Mars Express providing relay support for international Mars assets.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express",
    "relatedNewsTags": [
      "Mars Express",
      "ESA Mars",
      "MARSIS",
      "Subsurface Water",
      "HRSC"
    ],
    "tags": [
      "Mars Express",
      "Mars",
      "ESA Active",
      "Orbiter",
      "Water on Mars"
    ]
  },
  {
    "id": "bepicolombo",
    "name": "BepiColombo",
    "alternateNames": [
      "MPO & MMO"
    ],
    "programme": "ESA/JAXA Joint Programme",
    "programmeId": "esa-science",
    "agency": "ESA",
    "partnerAgencies": [
      "JAXA"
    ],
    "category": "Robotic Exploration",
    "destination": "Mercury Orbit",
    "status": "cruise",
    "launchDate": "2018-10-20",
    "endDate": null,
    "launchVehicle": "Ariane 5 ECA",
    "missionType": "Dual Mercury Orbiter (MPO + Mio MMO)",
    "missionDuration": "Cruise to late 2026; primary orbital science to 2028",
    "description": "Joint European-Japanese mission carrying two orbiters—ESA's Mercury Planetary Orbiter and JAXA's Mercury Magnetospheric Orbiter (Mio)—to unlock the secrets of the innermost planet.",
    "scientificObjectives": [
      "Investigate the origin and evolution of a planet close to its parent star",
      "Study Mercury's interior structure, exosphere, and molten core",
      "Map Mercury's global magnetic field and its violent interaction with the solar wind"
    ],
    "keyAchievements": [
      "Executed complex planetary gravity-assist sequence: Earth (1), Venus (2), and multiple Mercury flybys",
      "High-resolution monitoring cameras captured stark cratered surface views during close flybys",
      "Demonstrated high-power gridded ion thruster electric propulsion in deep space"
    ],
    "milestones": [
      {
        "label": "Launch from Kourou",
        "date": "2018-10-20",
        "done": true
      },
      {
        "label": "Earth flyby",
        "date": "2020-04-10",
        "done": true
      },
      {
        "label": "Venus flybys completed",
        "date": "2021-08-10",
        "done": true
      },
      {
        "label": "Fourth Mercury flyby executed; trajectory adjusted",
        "date": "2024-09-04",
        "done": true
      },
      {
        "label": "Approaching final gravity assists for late 2026 orbital insertion",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Mercury Transfer Module (MTM) carrying MPO (ESA) and Mio (JAXA)",
      "manufacturer": "Airbus Defence and Space (ESA) / JAXA",
      "massKg": 4100,
      "powerSource": "Ultra-high-temperature solar arrays (up to 14 kW)"
    },
    "currentOperationalStatus": "Cruise phase heading toward final Mercury orbit insertion in November 2026 following propulsion adjustments.",
    "historicalSignificance": "Humanity's most comprehensive mission to Mercury, deploying two synchronized orbiters to perform 3D magnetospheric and geologic mapping.",
    "latestKnownUpdate": "All science instruments checked out during recent close Mercury passes; ion thrusters calibrated for orbital insertion burns.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Science_Exploration/Space_Science/BepiColombo",
    "relatedNewsTags": [
      "BepiColombo",
      "Mercury",
      "ESA",
      "JAXA",
      "Mio",
      "Ion Propulsion"
    ],
    "tags": [
      "BepiColombo",
      "Mercury",
      "ESA",
      "JAXA",
      "Active",
      "Cruise"
    ]
  },
  {
    "id": "gaia",
    "name": "Gaia",
    "alternateNames": [
      "Gaia Astrometry Mission"
    ],
    "programme": "Horizon 2000 Plus",
    "programmeId": "esa-science",
    "agency": "ESA",
    "partnerAgencies": [],
    "category": "Space Observatories",
    "destination": "Sun-Earth L2 Lagrange Point",
    "status": "completed",
    "launchDate": "2013-12-19",
    "endDate": "2025-03-31",
    "launchVehicle": "Soyuz-STB / Fregat-MT",
    "missionType": "Ultra-High-Precision Optical Astrometry Observatory",
    "missionDuration": "11 years, 3 months of science operations",
    "description": "Created the most detailed multi-dimensional map of our Milky Way ever constructed, charting the precise positions, distances, proper motions, and spectra of nearly two billion stars.",
    "scientificObjectives": [
      "Chart a 3D optical census of over 1% of the Milky Way stellar population",
      "Determine the composition, formation history, and kinematic evolution of our galaxy",
      "Discover tens of thousands of exoplanets, brown dwarfs, and near-Earth asteroids"
    ],
    "keyAchievements": [
      "Measured positions, parallaxes, and motions for ~1.8 billion celestial objects",
      "Discovered the Gaia-Enceladus sausage: remnant of a major dwarf galaxy collision 10 billion years ago",
      "Revolutionized distance measurements across astrophysics using microarcsecond parallax precision"
    ],
    "milestones": [
      {
        "label": "Launch from Kourou",
        "date": "2013-12-19",
        "done": true
      },
      {
        "label": "Data Release 1 (DR1) issued",
        "date": "2016-09-14",
        "done": true
      },
      {
        "label": "Data Release 2 (DR2) transforms Galactic astronomy",
        "date": "2018-04-25",
        "done": true
      },
      {
        "label": "Data Release 3 (DR3) releases 3D velocities and astrophysics parameters",
        "date": "2022-06-13",
        "done": true
      },
      {
        "label": "Science observing concluded; cold gas thrusters depleted",
        "date": "2025-03-31",
        "done": true
      },
      {
        "label": "Final Data Releases (DR4 & DR5) in processing",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Twin optical telescopes sharing a 1-gigapixel focal plane array (largest ever launched into space)",
      "manufacturer": "EADS Astrium",
      "massKg": 2030,
      "powerSource": "Circular deployable solar sunshield array (1910 W)"
    },
    "currentOperationalStatus": "Science data gathering completed in early 2025 following cold-gas depletion. The global Gaia consortium is actively compiling the definitive Data Release 4 (DR4).",
    "historicalSignificance": "The definitive foundation of modern stellar astrophysics; transformed galactic archaeology by revealing how our galaxy was assembled.",
    "latestKnownUpdate": "Astronomers around the globe continue publishing thousands of breakthrough papers utilizing the Gaia catalog.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Science_Exploration/Space_Science/Gaia",
    "relatedNewsTags": [
      "Gaia",
      "Milky Way Map",
      "Astrometry",
      "ESA",
      "Data Release 4"
    ],
    "tags": [
      "Gaia",
      "Astrometry",
      "Milky Way",
      "Observatory",
      "ESA Completed"
    ]
  },
  {
    "id": "euclid",
    "name": "Euclid",
    "alternateNames": [
      "Euclid Dark Universe Mission"
    ],
    "programme": "Cosmic Vision",
    "programmeId": "esa-science",
    "agency": "ESA",
    "partnerAgencies": [
      "NASA"
    ],
    "category": "Space Observatories",
    "destination": "Sun-Earth L2 Lagrange Point",
    "status": "active",
    "launchDate": "2023-07-01",
    "endDate": null,
    "launchVehicle": "Falcon 9 Full Thrust",
    "missionType": "Wide-Angle Optical/Near-Infrared Dark Universe Mapper",
    "missionDuration": "6-year nominal survey (ongoing)",
    "description": "Designed to map the geometry of the dark universe by observing billions of galaxies across 10 billion light-years to uncover the mystery of Dark Energy and Dark Matter.",
    "scientificObjectives": [
      "Map the shapes and distributions of billions of galaxies over one-third of the celestial sky",
      "Measure weak gravitational lensing to map the 3D distribution of invisible Dark Matter",
      "Trace Baryon Acoustic Oscillations (BAO) across cosmic time to constrain Dark Energy expansion"
    ],
    "keyAchievements": [
      "Returned breathtaking razor-sharp first test images of the Perseus Galaxy Cluster and Horsehead Nebula",
      "Demonstrated optical performance delivering sub-arcsecond image quality across wide fields of view",
      "Overcame ice accumulation on optics via autonomous onboard thermal de-icing routines"
    ],
    "milestones": [
      {
        "label": "Launch on Falcon 9 from Cape Canaveral",
        "date": "2023-07-01",
        "done": true
      },
      {
        "label": "Halo orbit insertion at Sun-Earth L2",
        "date": "2023-07-28",
        "done": true
      },
      {
        "label": "First science images released to world",
        "date": "2023-11-07",
        "done": true
      },
      {
        "label": "Primary wide-angle survey operations commenced",
        "date": "2024-02-14",
        "done": true
      },
      {
        "label": "First major sky survey data release issued",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "1.2 m Korsch telescope with VIS visible camera and NISP near-infrared spectrometer/photometer",
      "manufacturer": "Thales Alenia Space / Airbus Defence and Space",
      "massKg": 2160,
      "powerSource": "Sunshield solar panels (1780 W)"
    },
    "currentOperationalStatus": "Active and systematically mapping wide swaths of the extragalactic sky from Sun-Earth L2 halo orbit.",
    "historicalSignificance": "Humanity's most wide-ranging cosmological survey specifically built to tackle the nature of dark energy.",
    "latestKnownUpdate": "Routine survey operations underway mapping thousands of square degrees of extragalactic space.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Science_Exploration/Space_Science/Euclid",
    "relatedNewsTags": [
      "Euclid",
      "Dark Energy",
      "Dark Matter",
      "ESA",
      "Cosmology"
    ],
    "tags": [
      "Euclid",
      "Dark Universe",
      "Cosmology",
      "Observatory",
      "ESA Active"
    ]
  },
  {
    "id": "juice",
    "name": "JUICE (Jupiter Icy Moons Explorer)",
    "alternateNames": [
      "JUICE"
    ],
    "programme": "Cosmic Vision (L-class)",
    "programmeId": "outer-planets",
    "agency": "ESA",
    "partnerAgencies": [
      "NASA",
      "JAXA",
      "ASI"
    ],
    "category": "Robotic Exploration",
    "destination": "Jupiter, Ganymede, Callisto & Europa",
    "status": "cruise",
    "launchDate": "2023-04-14",
    "endDate": null,
    "launchVehicle": "Ariane 5 ECA",
    "missionType": "Jupiter Tour & Ganymede Dedicated Orbiter",
    "missionDuration": "8-year cruise to 2031; 4-year science phase",
    "description": "ESA's flagship mission to the Jupiter system to spend years touring ocean worlds Callisto and Europa before making history in 2034 as the first spacecraft ever to enter orbit around another moon (Ganymede).",
    "scientificObjectives": [
      "Characterize Ganymede, Callisto, and Europa as potential habitable ocean worlds",
      "Investigate Ganymede's unique intrinsic magnetic field and subsurface saltwater ocean",
      "Study Jupiter's complex atmosphere, radiation belts, and magnetosphere"
    ],
    "keyAchievements": [
      "Carries largest suite of planetary science instruments ever launched by ESA (10 instruments)",
      "Executed world's first Lunar-Earth gravity-assist maneuver in August 2024 to save propellant"
    ],
    "milestones": [
      {
        "label": "Launch from Kourou on penultimate Ariane 5",
        "date": "2023-04-14",
        "done": true
      },
      {
        "label": "RIME radar antenna successfully deployed after freeing stuck pin",
        "date": "2023-05-12",
        "done": true
      },
      {
        "label": "Historic double Moon-Earth flyby completed",
        "date": "2024-08-20",
        "done": true
      },
      {
        "label": "En route to Venus gravity assist (August 2025/2026)",
        "date": "2026-10-31",
        "done": true,
        "current": true
      },
      {
        "label": "Jupiter orbital insertion",
        "date": "2031-07-01",
        "done": false
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized flagship spacecraft with 85 m² cross-shaped solar wings",
      "manufacturer": "Airbus Defence and Space",
      "massKg": 6070,
      "powerSource": "Two large solar wings generating ~850 W at Jupiter"
    },
    "currentOperationalStatus": "Cruise phase towards inner-solar-system gravity-assist maneuvers. All systems nominal.",
    "historicalSignificance": "Europe's boldest deep-space endeavor; will become the first spacecraft to orbit a natural satellite of another planet.",
    "latestKnownUpdate": "Post-lunar-Earth flyby trajectory checks confirm razor-sharp navigation toward Venus.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Science_Exploration/Space_Science/Juice",
    "relatedNewsTags": [
      "JUICE",
      "Ganymede",
      "Jupiter",
      "Ocean Worlds",
      "ESA Flagship"
    ],
    "tags": [
      "JUICE",
      "Jupiter",
      "Ganymede",
      "Ocean Worlds",
      "ESA Active"
    ]
  },
  {
    "id": "hera",
    "name": "Hera",
    "alternateNames": [
      "Hera Planetary Defense"
    ],
    "programme": "Space Safety Programme",
    "programmeId": "planetary-defense",
    "agency": "ESA",
    "partnerAgencies": [
      "JAXA"
    ],
    "category": "Robotic Exploration",
    "destination": "Didymos & Dimorphos",
    "status": "cruise",
    "launchDate": "2024-10-07",
    "endDate": null,
    "launchVehicle": "Falcon 9 Full Thrust",
    "missionType": "Post-Impact Planetary Defense Asteroid Investigator",
    "missionDuration": "Cruise to late 2026; rendezvous and orbital science",
    "description": "Europe's planetary defense mission sent to rendezvous with binary asteroid Didymos and its moon Dimorphos to inspect the crater and internal restructuring created by NASA's DART impactor.",
    "scientificObjectives": [
      "Measure the mass, density, and internal structure of Dimorphos post-impact",
      "Perform detailed close-up imagery of the crater left by NASA's DART impact",
      "Deploy twin CubeSats (Milani and Juventas) to perform low-frequency radar sounding and touchdown"
    ],
    "keyAchievements": [
      "Successfully launched on Falcon 9 and deployed deep-space systems nominal",
      "Carries Juventas CubeSat equipped with the smallest radar system ever flown into deep space"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral on Falcon 9",
        "date": "2024-10-07",
        "done": true
      },
      {
        "label": "Commissioning of instruments and communications",
        "date": "2024-10-25",
        "done": true
      },
      {
        "label": "Mars gravity-assist flyby",
        "date": "2025-03-12",
        "done": true
      },
      {
        "label": "Cruising toward late 2026 Didymos-Dimorphos rendezvous",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with AFC framing cameras, lidar, and two deployable CubeSats",
      "manufacturer": "OHB System",
      "massKg": 1128,
      "powerSource": "Dual solar panels (1129 W)"
    },
    "currentOperationalStatus": "Cruise phase towards Didymos system; rendezvous scheduled for late 2026.",
    "historicalSignificance": "Completes humanity's first full-scale planetary defense test experiment, turning kinetic deflection into a repeatable defense technique.",
    "latestKnownUpdate": "Trajectory optimization maneuvers completed successfully following Mars gravity assist.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Space_Safety/Hera",
    "relatedNewsTags": [
      "Hera",
      "Planetary Defense",
      "DART",
      "Dimorphos",
      "Didymos",
      "ESA"
    ],
    "tags": [
      "Hera",
      "Planetary Defense",
      "Asteroids",
      "ESA Active"
    ]
  },
  {
    "id": "solar-orbiter",
    "name": "Solar Orbiter",
    "alternateNames": [
      "SolO"
    ],
    "programme": "Cosmic Vision (M-class)",
    "programmeId": "heliophysics",
    "agency": "ESA",
    "partnerAgencies": [
      "NASA"
    ],
    "category": "Space Observatories",
    "destination": "Sun (High Inclination Orbit)",
    "status": "active",
    "launchDate": "2020-02-10",
    "endDate": null,
    "launchVehicle": "Atlas V 411",
    "missionType": "Close-Range High-Latitude Solar Observatory",
    "missionDuration": "7+ years (ongoing)",
    "description": "An international solar physics mission providing the closest images of the Sun ever taken, discovering tiny solar flares nicknamed \"campfires\" and tilting its orbit to view the Sun's uncharted polar regions.",
    "scientificObjectives": [
      "Image the Sun's polar regions from high heliographic inclinations (>30°)",
      "Determine how the solar dynamo drives magnetic activity and the 11-year solar cycle",
      "Link in-situ solar wind measurements directly to coronal source regions"
    ],
    "keyAchievements": [
      "Captured the closest images ever taken of the solar surface",
      "Discovered ubiquitous miniature solar flares dubbed \"campfires\", driving coronal heating",
      "Executed repeated Venus gravity assists to tilt its orbital inclination to view the Sun's poles"
    ],
    "milestones": [
      {
        "label": "Launch from Cape Canaveral",
        "date": "2020-02-10",
        "done": true
      },
      {
        "label": "Discovered solar campfires during first perihelion",
        "date": "2020-06-15",
        "done": true
      },
      {
        "label": "Science phase commenced at 0.28 AU perihelion",
        "date": "2021-11-27",
        "done": true
      },
      {
        "label": "High-inclination solar observations tracking solar maximum",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with multi-layered titanium heat shield and instrument peepholes",
      "manufacturer": "Airbus Defence and Space",
      "massKg": 1800,
      "powerSource": "Dual solar arrays (180 W at perihelion)"
    },
    "currentOperationalStatus": "Active and taking revolutionary imaging and spectral data from high orbital angles.",
    "historicalSignificance": "Humanity's first observatory to capture direct close-up imagery of the Sun's polar caps.",
    "latestKnownUpdate": "Venus gravity assists continue elevating orbital inclination toward 33 degrees.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter",
    "relatedNewsTags": [
      "Solar Orbiter",
      "Sun Campfires",
      "Solar Poles",
      "ESA",
      "Heliophysics"
    ],
    "tags": [
      "Solar Orbiter",
      "Sun",
      "Heliophysics",
      "ESA Active"
    ]
  },
  {
    "id": "hayabusa",
    "name": "Hayabusa",
    "alternateNames": [
      "Muses-C"
    ],
    "programme": "Asteroid Exploration",
    "programmeId": "jaxa-science",
    "agency": "JAXA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Asteroid 25143 Itokawa",
    "status": "completed",
    "launchDate": "2003-05-09",
    "endDate": "2010-06-13",
    "launchVehicle": "M-V Rocket",
    "missionType": "Asteroid Rendezvous & Sample Return",
    "missionDuration": "7 years, 1 month",
    "description": "A miraculous mission overcoming near-fatal engine, reaction wheel, and communications failures to achieve the first successful sample return from an asteroid in human history.",
    "scientificObjectives": [
      "Test microwave discharge ion engines across interplanetary distances",
      "Rendezvous with and characterize rubble-pile asteroid Itokawa",
      "Collect surface regolith and return it safely to Earth"
    ],
    "keyAchievements": [
      "First spacecraft in history to return samples from an asteroid to Earth",
      "Proved S-type asteroids are the parent bodies of common chondrite meteorites",
      "Engineering triumph: cross-wired surviving ion thrusters to limp back across millions of kilometers"
    ],
    "milestones": [
      {
        "label": "Launch on M-V",
        "date": "2003-05-09",
        "done": true
      },
      {
        "label": "Rendezvous with asteroid Itokawa",
        "date": "2005-09-12",
        "done": true
      },
      {
        "label": "Touchdown and sample acquisition attempts",
        "date": "2005-11-25",
        "done": true
      },
      {
        "label": "Sample return capsule parachuted safely into Woomera, Australia",
        "date": "2010-06-13",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with 4 microwave ion engines and sample return capsule",
      "manufacturer": "NEC / JAXA",
      "massKg": 510,
      "powerSource": "Solar panels (1000 W at 1 AU)"
    },
    "currentOperationalStatus": "Mission completed. Mothercraft incinerated; sample capsule successfully recovered.",
    "historicalSignificance": "Pioneered robotic small-body sample return and inspired modern asteroid missions worldwide.",
    "latestKnownUpdate": "Microscopic grains of Itokawa permanently curated at JAXA Sagamihara campus.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://global.jaxa.jp/projects/sas/hayabusa/",
    "relatedNewsTags": [
      "Hayabusa",
      "Itokawa",
      "Asteroid Sample Return",
      "JAXA",
      "Woomera"
    ],
    "tags": [
      "Hayabusa",
      "Asteroid",
      "Sample Return",
      "JAXA Completed"
    ]
  },
  {
    "id": "hayabusa2",
    "name": "Hayabusa2",
    "alternateNames": [
      "Hayabusa2 Extended Mission"
    ],
    "programme": "Asteroid Exploration",
    "programmeId": "jaxa-science",
    "agency": "JAXA",
    "partnerAgencies": [
      "DLR",
      "CNES",
      "NASA"
    ],
    "category": "Robotic Exploration",
    "destination": "Asteroid 162173 Ryugu & 1998 KY26",
    "status": "cruise",
    "launchDate": "2014-12-03",
    "endDate": null,
    "launchVehicle": "H-IIA 202",
    "missionType": "Carbonaceous Asteroid Sample Return & Extended Cruise",
    "missionDuration": "12+ years (ongoing)",
    "description": "Explored primitive carbonaceous asteroid Ryugu, fired a copper impactor into its surface to create an artificial crater, returned 5.4 grams of pristine organics and water-rich sample to Earth, and is now cruising to fast-rotating asteroid 1998 KY26.",
    "scientificObjectives": [
      "Determine the composition and origin of organic materials and water on C-type asteroid Ryugu",
      "Deploy robotic rovers (MINERVA-II) and lander (MASCOT) onto asteroid surface",
      "Create an artificial crater with a Small Carry-on Impactor (SCI) to collect pristine subsurface material",
      "Cruise to near-Earth asteroid 1998 KY26 to study fast-rotating micro-asteroids (2031 rendezvous)"
    ],
    "keyAchievements": [
      "Deployed MASCOT lander and MINERVA-II hopping rovers onto Ryugu surface",
      "Created an artificial impact crater with a 2.5 kg copper projectile",
      "Returned 5.4 grams of pristine asteroid sample to Earth on December 6, 2020",
      "Laboratory analysis detected 20,000+ organic molecules including uracil (RNA precursor) and amino acids"
    ],
    "milestones": [
      {
        "label": "Launch on H-IIA from Tanegashima",
        "date": "2014-12-03",
        "done": true
      },
      {
        "label": "Arrival at Ryugu",
        "date": "2018-06-27",
        "done": true
      },
      {
        "label": "Small Carry-on Impactor (SCI) blast creates fresh crater",
        "date": "2019-04-05",
        "done": true
      },
      {
        "label": "Subsurface sample touchdown completed",
        "date": "2019-07-11",
        "done": true
      },
      {
        "label": "Sample return capsule landed in Woomera, Australia",
        "date": "2020-12-06",
        "done": true
      },
      {
        "label": "Cruising toward fast-rotating target 1998 KY26 (2031 encounter)",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized probe with ion engines, optical navigation, and sample collection horn",
      "manufacturer": "NEC / JAXA",
      "massKg": 609,
      "powerSource": "Dual solar arrays (1400 W)"
    },
    "currentOperationalStatus": "Cruise phase towards 1998 KY26 under ion engine propulsion.",
    "historicalSignificance": "Returned the first pristine organic molecules and building blocks of RNA from an asteroid.",
    "latestKnownUpdate": "Ion thrusters engaged for deep space cruise maneuvers heading toward 2031 rendezvous.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://global.jaxa.jp/projects/sas/hayabusa2/",
    "relatedNewsTags": [
      "Hayabusa2",
      "Ryugu",
      "Uracil",
      "Asteroid Sample Return",
      "JAXA"
    ],
    "tags": [
      "Hayabusa2",
      "Ryugu",
      "Asteroid",
      "Sample Return",
      "JAXA Active"
    ]
  },
  {
    "id": "slim",
    "name": "SLIM (Smart Lander for Investigating Moon)",
    "alternateNames": [
      "Moon Sniper"
    ],
    "programme": "Lunar Exploration",
    "programmeId": "jaxa-science",
    "agency": "JAXA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Moon (Shioli Crater rim: 13.3° S, 25.2° E)",
    "status": "completed",
    "launchDate": "2023-09-06",
    "endDate": "2024-06-27",
    "launchVehicle": "H-IIA 202",
    "missionType": "Pinpoint Lunar Landing Technology Demonstrator",
    "missionDuration": "5 months (survived 3 harsh lunar nights)",
    "description": "Nicknamed the \"Moon Sniper\", SLIM achieved a historic pinpoint soft landing within just 55 meters of its target—unprecedented precision in lunar landing history—making Japan the 5th nation to soft-land on the Moon.",
    "scientificObjectives": [
      "Demonstrate pinpoint landing accuracy within 100 meters of a predetermined target",
      "Deploy twin autonomous microrovers (LEV-1 and LEV-2 SORA-Q)",
      "Analyze the olivine composition of the lunar mantle exposed in Shioli Crater"
    ],
    "keyAchievements": [
      "Achieved pinpoint landing within 55 meters of target on the slope of Shioli crater",
      "Made Japan the 5th nation in human history to soft-land on the Moon (January 19, 2024)",
      "Deployed LEV-2 (SORA-Q) transformable spherical robot, which captured an iconic photo of SLIM resting on the lunar surface",
      "Miraculously survived three brutal, -130°C lunar nights despite not being designed for night survival"
    ],
    "milestones": [
      {
        "label": "Launch on H-IIA alongside XRISM",
        "date": "2023-09-06",
        "done": true
      },
      {
        "label": "Lunar orbit insertion",
        "date": "2023-12-25",
        "done": true
      },
      {
        "label": "Historic pinpoint touchdown on Moon",
        "date": "2024-01-19",
        "done": true
      },
      {
        "label": "LEV-2 transmits photo of SLIM resting on surface",
        "date": "2024-01-25",
        "done": true
      },
      {
        "label": "Woke up from 3 successive lunar nights to resume science",
        "date": "2024-04-29",
        "done": true
      },
      {
        "label": "JAXA declared mission concluded after exhausting communications",
        "date": "2024-06-27",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Lightweight lander with crushable 3D-printed aluminum lattice landing legs and vision-based navigation",
      "manufacturer": "Mitsubishi Electric / JAXA",
      "massKg": 590,
      "powerSource": "Thin-film solar cells"
    },
    "currentOperationalStatus": "Mission concluded with outstanding success; rested at Shioli Crater rim.",
    "historicalSignificance": "Transformed lunar exploration from \"landing where we can\" to \"landing precisely where we want\".",
    "latestKnownUpdate": "Permanent lunar relic at Shioli Crater.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://global.jaxa.jp/projects/sas/slim/",
    "relatedNewsTags": [
      "SLIM",
      "Moon Sniper",
      "Shioli Crater",
      "Pinpoint Landing",
      "SORA-Q",
      "JAXA"
    ],
    "tags": [
      "SLIM",
      "Moon Sniper",
      "Moon",
      "Pinpoint Landing",
      "JAXA Completed"
    ]
  },
  {
    "id": "xrism",
    "name": "XRISM (X-ray Imaging and Spectroscopy Mission)",
    "alternateNames": [
      "XRISM"
    ],
    "programme": "Cosmic Vision / Space Astronomy",
    "programmeId": "jaxa-science",
    "agency": "JAXA",
    "partnerAgencies": [
      "NASA",
      "ESA"
    ],
    "category": "Space Observatories",
    "destination": "Low Earth Orbit (550 km)",
    "status": "active",
    "launchDate": "2023-09-06",
    "endDate": null,
    "launchVehicle": "H-IIA 202",
    "missionType": "High-Resolution X-ray Spectroscopy Space Observatory",
    "missionDuration": "3-year nominal mission (ongoing)",
    "description": "Equipped with the revolutionary Resolve microcalorimeter cooled to -273.1°C (just 50 millikelvin above absolute zero), measuring the motions and temperatures of superheated gas in galaxy clusters and accreting black holes.",
    "scientificObjectives": [
      "Measure plasma velocity and thermal turbulence in giant galaxy clusters",
      "Determine the distribution and abundance of heavy elements in the universe",
      "Trace spacetime warping and matter accretion into supermassive black holes"
    ],
    "keyAchievements": [
      "Resolve microcalorimeter achieved world-record high-resolution X-ray spectroscopy",
      "Mapped the turbulent gas dynamics inside the Perseus Galaxy Cluster",
      "Revealed the elemental composition of supernova remnant N132D"
    ],
    "milestones": [
      {
        "label": "Launch on H-IIA from Tanegashima",
        "date": "2023-09-06",
        "done": true
      },
      {
        "label": "Resolve cryogenic detector successfully cooled to 50 mK",
        "date": "2023-10-01",
        "done": true
      },
      {
        "label": "First light science spectra released (Perseus Cluster & N132D)",
        "date": "2024-01-05",
        "done": true
      },
      {
        "label": "General observing phase for global astronomers",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Three-axis stabilized astronomy satellite with Resolve microcalorimeter and Xtend wide-field camera",
      "manufacturer": "JAXA / NASA GSFC / Sumitomo Heavy Industries",
      "massKg": 2300,
      "powerSource": "Deployable solar arrays (1800 W)"
    },
    "currentOperationalStatus": "Active and producing high-resolution X-ray spectra for the international scientific community.",
    "historicalSignificance": "Restores the high-resolution X-ray spectroscopy capability that unlocks the thermodynamics of the largest structures in the cosmos.",
    "latestKnownUpdate": "Resolve instrument operational with cryocooler performance nominal.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://xrism.isas.jaxa.jp/en/",
    "relatedNewsTags": [
      "XRISM",
      "X-ray Astronomy",
      "Resolve Microcalorimeter",
      "Perseus Cluster",
      "JAXA"
    ],
    "tags": [
      "XRISM",
      "X-ray",
      "Observatory",
      "Astrophysics",
      "JAXA Active"
    ]
  },
  {
    "id": "change-4",
    "name": "Chang'e 4 & Yutu-2",
    "alternateNames": [
      "CE-4"
    ],
    "programme": "Chinese Lunar Exploration Program",
    "programmeId": "change",
    "agency": "CNSA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Lunar Farside (Von Kármán Crater: 45.44° S, 177.6° E)",
    "status": "active",
    "launchDate": "2018-12-07",
    "endDate": null,
    "launchVehicle": "Long March 3B",
    "missionType": "Lunar Farside Lander & Rover",
    "missionDuration": "7+ years (ongoing)",
    "description": "Humanity's historic first-ever soft landing on the farside of the Moon, communicating via the Queqiao relay satellite and exploring Von Kármán crater within the vast South Pole-Aitken basin for over seven years.",
    "scientificObjectives": [
      "Achieve the first soft landing on the farside of the Moon",
      "Conduct low-frequency radio astronomy free from terrestrial radio interference",
      "Probe subsurface lunar stratigraphy using Lunar Penetrating Radar (LPR)"
    ],
    "keyAchievements": [
      "First spacecraft in history to land on the farside of the Moon (January 3, 2019)",
      "Yutu-2 rover became the longest-lived lunar rover in human history, driving >1.6 km",
      "Discovered exposed lunar mantle material (low-calcium pyroxene and olivine)"
    ],
    "milestones": [
      {
        "label": "Queqiao relay satellite positioned at Earth-Moon L2",
        "date": "2018-06-14",
        "done": true
      },
      {
        "label": "Launch on Long March 3B",
        "date": "2018-12-07",
        "done": true
      },
      {
        "label": "Historic farside touchdown in Von Kármán crater",
        "date": "2019-01-03",
        "done": true
      },
      {
        "label": "Yutu-2 deploys onto farside regolith",
        "date": "2019-01-03",
        "done": true
      },
      {
        "label": "Surpassed 70 lunar day/night operational cycles",
        "date": "2024-06-01",
        "done": true
      },
      {
        "label": "Continuing science and radar sounding on farside",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Heavy lander + 6-wheel rover (Yutu-2) linked to Queqiao Earth-Moon L2 relay satellite",
      "manufacturer": "CAST (China Academy of Space Technology)",
      "massKg": 3780,
      "powerSource": "Solar panels and Radioisotope Heater Units (RHUs)"
    },
    "currentOperationalStatus": "Active on the lunar farside. Yutu-2 continues waking and roving each lunar day via Queqiao relay link.",
    "historicalSignificance": "A watershed achievement in lunar exploration, successfully opening the hidden farside of the Moon to in-situ scientific study.",
    "latestKnownUpdate": "Subsurface radar mapping continues revealing multi-layered volcanic basalt deposits beneath the crater floor.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "http://www.cnsa.gov.cn/",
    "relatedNewsTags": [
      "Chang'e 4",
      "Yutu-2",
      "Lunar Farside",
      "Von Karman",
      "Queqiao",
      "CNSA"
    ],
    "tags": [
      "Chang'e 4",
      "Yutu-2",
      "Moon",
      "Lunar Farside",
      "CNSA Active"
    ]
  },
  {
    "id": "change-6",
    "name": "Chang'e 6 (Farside Sample Return)",
    "alternateNames": [
      "CE-6"
    ],
    "programme": "Chinese Lunar Exploration Program",
    "programmeId": "change",
    "agency": "CNSA",
    "partnerAgencies": [
      "ESA",
      "CNES",
      "ASI",
      "ICUBE-Q Pakistan"
    ],
    "category": "Robotic Exploration",
    "destination": "Lunar Farside (South Pole-Aitken Basin / Apollo Basin: 41.6° S, 153.9° W)",
    "status": "completed",
    "launchDate": "2024-05-03",
    "endDate": "2024-06-25",
    "launchVehicle": "Long March 5 (Y7)",
    "missionType": "Lunar Farside Robotic Sample Return Mission",
    "missionDuration": "53 days",
    "description": "Humanity's monumental first-ever mission to retrieve and return samples from the farside of the Moon, successfully landing in the ancient Apollo Basin and delivering 1,935.3 grams of farside material to Earth.",
    "scientificObjectives": [
      "Drill and scoop pristine core samples from the farside South Pole-Aitken Basin",
      "Demonstrate autonomous ascent from the farside of the Moon",
      "Execute robotic rendezvous and docking in lunar orbit to transfer samples to Earth return capsule",
      "Analyze the stark dichotomy between the Moon's near and far sides"
    ],
    "keyAchievements": [
      "First nation in human history to return samples from the farside of the Moon",
      "Collected and returned 1,935.3 grams of lunar farside soil and rock fragments",
      "Carried international payloads from France (DORN radon detector), ESA (NILS negative ion detector), and Italy",
      "Initial sample analysis revealed young 2.8-billion-year-old volcanic basalts on the farside"
    ],
    "milestones": [
      {
        "label": "Launch on Long March 5",
        "date": "2024-05-03",
        "done": true
      },
      {
        "label": "Lunar farside touchdown in Apollo Basin",
        "date": "2024-06-01",
        "done": true
      },
      {
        "label": "Robotic drilling and scooping completed (1,935 grams sealed)",
        "date": "2024-06-03",
        "done": true
      },
      {
        "label": "Ascender lifts off from farside and docks in lunar orbit",
        "date": "2024-06-06",
        "done": true
      },
      {
        "label": "Re-entry capsule lands safely in Siziwang Banner, Inner Mongolia",
        "date": "2024-06-25",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Four-module complex (Orbiter, Lander, Ascender, Re-entry Capsule) communicating via Queqiao-2 relay",
      "manufacturer": "CAST",
      "massKg": 8200,
      "powerSource": "Solar arrays and batteries"
    },
    "currentOperationalStatus": "Mission completed with 100% success. Samples currently undergoing analysis by international scientific teams.",
    "historicalSignificance": "One of the greatest milestones in 21st-century planetary exploration, unlocking the earliest geological history of the Earth-Moon system.",
    "latestKnownUpdate": "First peer-reviewed papers confirmed farside volcanic activity persisted up to 2.8 billion years ago.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "http://www.cnsa.gov.cn/",
    "relatedNewsTags": [
      "Chang'e 6",
      "Lunar Farside Sample Return",
      "Apollo Basin",
      "South Pole-Aitken",
      "Queqiao-2"
    ],
    "tags": [
      "Chang'e 6",
      "Moon",
      "Farside Sample Return",
      "CNSA Completed",
      "Historic"
    ]
  },
  {
    "id": "tianwen-1",
    "name": "Tianwen-1 & Zhurong Rover",
    "alternateNames": [
      "Tianwen-1 Mars Mission"
    ],
    "programme": "Planetary Exploration of China",
    "programmeId": "cnsa-mars",
    "agency": "CNSA",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Mars (Utopia Planitia: 25.1° N, 109.9° E)",
    "status": "extended",
    "launchDate": "2020-07-23",
    "endDate": null,
    "launchVehicle": "Long March 5 (Y4)",
    "missionType": "Mars Orbiter, Lander, and Surface Rover",
    "missionDuration": "Orbiter: 6+ years (active); Rover: 1 year surface mission",
    "description": "China's historic maiden Mars mission, accomplishing an unprecedented \"three-in-one\" feat by successfully placing an orbiter in orbit, soft-landing on Mars, and deploying rover Zhurong on its first attempt.",
    "scientificObjectives": [
      "Comprehensive orbital mapping of Martian geology, magnetic fields, and atmosphere",
      "Analyze Martian soil characteristics and water-ice distribution on Utopia Planitia",
      "Demonstrate entry, descent, and landing and autonomous surface roving"
    ],
    "keyAchievements": [
      "First space agency to successfully achieve Mars orbit, landing, and roving on a single maiden mission",
      "Zhurong rover traversed 1,921 meters across southern Utopia Planitia",
      "Discovered hydrated sulfate minerals indicating ancient liquid ocean activity on the plains",
      "Orbiter completed global medium-resolution color mapping of the entire planet"
    ],
    "milestones": [
      {
        "label": "Launch on Long March 5",
        "date": "2020-07-23",
        "done": true
      },
      {
        "label": "Mars orbit insertion",
        "date": "2021-02-10",
        "done": true
      },
      {
        "label": "Lander and Zhurong rover soft touchdown on Utopia Planitia",
        "date": "2021-05-15",
        "done": true
      },
      {
        "label": "Zhurong drives onto Martian surface",
        "date": "2021-05-22",
        "done": true
      },
      {
        "label": "Rover exceeded 90-sol design life and went into winter hibernation",
        "date": "2022-05-18",
        "done": true
      },
      {
        "label": "Orbiter continuing active remote sensing and communications",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Heavy 5-tonne Mars orbiter + entry aeroshell lander + 240 kg 6-wheel rover (Zhurong)",
      "manufacturer": "CAST",
      "massKg": 5000,
      "powerSource": "Orbiter: Solar panels (1800 W); Rover: 4 butterfly-shaped solar wings"
    },
    "currentOperationalStatus": "Tianwen-1 orbiter active and carrying out extended remote sensing in Mars orbit. Zhurong rover completed its primary mission and remains dormant on Utopia Planitia.",
    "historicalSignificance": "Cemented China as only the second nation in history to successfully operate a rover on the surface of Mars.",
    "latestKnownUpdate": "Orbiter actively monitoring atmospheric dust storms and calibrating radar profiles across the northern lowlands.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "http://www.cnsa.gov.cn/",
    "relatedNewsTags": [
      "Tianwen-1",
      "Zhurong",
      "Mars Rover",
      "Utopia Planitia",
      "CNSA"
    ],
    "tags": [
      "Tianwen-1",
      "Zhurong",
      "Mars",
      "Rover",
      "Orbiter",
      "CNSA Active"
    ]
  },
  {
    "id": "tiangong-space-station",
    "name": "Tiangong Space Station",
    "alternateNames": [
      "CSS",
      "Heavenly Palace"
    ],
    "programme": "China Manned Space Program",
    "programmeId": "tiangong",
    "agency": "CMSA",
    "partnerAgencies": [],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (390 km, 41.5° inclination)",
    "status": "active",
    "launchDate": "2021-04-29",
    "endDate": null,
    "launchVehicle": "Long March 5B / 2F / 7",
    "missionType": "Permanently Crewed Modular Space Station",
    "missionDuration": "Permanently occupied (designed for 10-15+ years)",
    "description": "China's permanently occupied three-module space station in Low Earth Orbit (Tianhe core module + Wentian and Mengtian science labs), hosting rotating six-month crew expeditions and microgravity research.",
    "scientificObjectives": [
      "Maintain continuous human presence and research laboratory in Low Earth Orbit",
      "Conduct fundamental physics, life sciences, fluid dynamics, and materials research in microgravity",
      "Prepare for co-orbital operations with the Xuntian Space Station Telescope (CSST)"
    ],
    "keyAchievements": [
      "Completed in-orbit assembly of T-shaped 3-module complex within 20 months",
      "Continuous uninterrupted human habitation established with regular 6-month crew rotations (Shenzhou missions)",
      "Completed over a dozen spacewalks and installed external science exposure platforms"
    ],
    "milestones": [
      {
        "label": "Tianhe core module launched on Long March 5B",
        "date": "2021-04-29",
        "done": true
      },
      {
        "label": "Wentian laboratory module docked",
        "date": "2022-07-24",
        "done": true
      },
      {
        "label": "Mengtian laboratory module docked; completed T-shape assembly",
        "date": "2022-10-31",
        "done": true
      },
      {
        "label": "First in-orbit crew handover between Shenzhou 14 and 15",
        "date": "2022-11-30",
        "done": true
      },
      {
        "label": "Shenzhou crew rotations maintaining continuous operational occupancy",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": [
      {
        "name": "Shenzhou Expedition Crew",
        "role": "Station Commander & Flight Engineers (3 taikonauts)"
      }
    ],
    "spacecraft": {
      "type": "T-shaped modular space station (Tianhe core + Wentian & Mengtian science modules) with robotic arm",
      "manufacturer": "CAST",
      "massKg": 66000,
      "powerSource": "Massive flexible solar arrays producing over 100 kW"
    },
    "currentOperationalStatus": "Active and permanently crewed in Low Earth Orbit. Operating 16 high-precision laboratory experiment racks.",
    "historicalSignificance": "One of only two continuously inhabited space stations in orbit (alongside the ISS), marking full-spectrum human spaceflight autonomy.",
    "latestKnownUpdate": "Routine science operations and spacewalks maintaining exterior orbital orbital debris shielding.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "http://www.cmse.gov.cn/",
    "relatedNewsTags": [
      "Tiangong",
      "Space Station",
      "Tianhe",
      "Shenzhou",
      "Taikonauts",
      "CMSA"
    ],
    "tags": [
      "Tiangong",
      "Space Station",
      "Human Spaceflight",
      "CMSA Active",
      "Modular"
    ]
  },
  {
    "id": "sputnik-1",
    "name": "Sputnik 1",
    "alternateNames": [
      "PS-1",
      "Elementary Satellite 1"
    ],
    "programme": "Soviet Space Program",
    "programmeId": "soviet-historic",
    "agency": "Soviet Space Program",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Low Earth Orbit (939 km apogee)",
    "status": "completed",
    "launchDate": "1957-10-04",
    "endDate": "1958-01-04",
    "launchVehicle": "Sputnik 8K71PS (modified R-7 Semyorka)",
    "missionType": "First Artificial Earth Satellite",
    "missionDuration": "92 days in orbit (transmitted for 21 days)",
    "description": "The machine that started it all: the world's first artificial satellite, transmitting rhythmic radio \"beeps\" heard worldwide, inaugurating the Space Age and triggering the Space Race.",
    "scientificObjectives": [
      "Test the method of placing an artificial satellite into Earth orbit",
      "Measure atmospheric density through orbital drag calculations",
      "Test radio wave propagation through the ionosphere"
    ],
    "keyAchievements": [
      "First artificial satellite to reach Earth orbit in human history",
      "Beeped at 20.005 and 40.002 MHz, tracked by amateur radio operators across the globe",
      "Triggered the creation of NASA and accelerated the Space Race"
    ],
    "milestones": [
      {
        "label": "Launch from Site 1/5 at Baikonur",
        "date": "1957-10-04",
        "done": true
      },
      {
        "label": "Confirmed orbital radio beacon broadcast",
        "date": "1957-10-04",
        "done": true
      },
      {
        "label": "Batteries depleted after 3 weeks",
        "date": "1957-10-26",
        "done": true
      },
      {
        "label": "Re-entered Earth's atmosphere after 1,440 orbits",
        "date": "1958-01-04",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "58 cm polished aluminum sphere with four whip antennas",
      "manufacturer": "OKB-1 (Sergei Korolev)",
      "massKg": 83.6,
      "powerSource": "Silver-zinc chemical batteries"
    },
    "currentOperationalStatus": "Mission completed; decayed in atmosphere in January 1958.",
    "historicalSignificance": "Humanity's opening step into the cosmos; inaugurated the Space Age.",
    "latestKnownUpdate": "Atmospheric re-entry January 4, 1958.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Sputnik 1",
      "Space Race",
      "First Satellite",
      "Sergei Korolev",
      "Baikonur"
    ],
    "tags": [
      "Sputnik",
      "Historic",
      "First Satellite",
      "Soviet",
      "Space Age"
    ]
  },
  {
    "id": "vostok-1",
    "name": "Vostok 1",
    "alternateNames": [
      "First Human in Space"
    ],
    "programme": "Vostok Programme",
    "programmeId": "soviet-human",
    "agency": "Soviet Space Program",
    "partnerAgencies": [],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (327 km apogee)",
    "status": "completed",
    "launchDate": "1961-04-12",
    "endDate": "1961-04-12",
    "launchVehicle": "Vostok-K",
    "missionType": "First Human Orbital Spaceflight",
    "missionDuration": "108 minutes (1 single orbit)",
    "description": "Cosmonaut Yuri Gagarin became the first human being in space and the first to orbit the Earth, speaking his famous \"Poyekhali!\" (\"Let's go!\") and proving humans can survive in space.",
    "scientificObjectives": [
      "Verify that a human can survive rocket launch, orbital microgravity, and high-G atmospheric re-entry",
      "Test spacecraft automated life support and orientation systems"
    ],
    "keyAchievements": [
      "Yuri Gagarin became the first human in outer space",
      "Completed one full orbit around planet Earth in 108 minutes",
      "Safely ejected at 7 km altitude and parachuted to farmland near Engels, Russia"
    ],
    "milestones": [
      {
        "label": "Liftoff from Baikonur (\"Poyekhali!\")",
        "date": "1961-04-12",
        "done": true
      },
      {
        "label": "Reached orbit at 18:07 local time",
        "date": "1961-04-12",
        "done": true
      },
      {
        "label": "Retrofire braking burn over Africa",
        "date": "1961-04-12",
        "done": true
      },
      {
        "label": "Safe touchdown of Gagarin via parachute in Saratov region",
        "date": "1961-04-12",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Yuri Gagarin",
        "role": "Cosmonaut Pilot"
      }
    ],
    "spacecraft": {
      "type": "Spherical re-entry descent module covered in ablative heat shield + conical instrument module",
      "manufacturer": "OKB-1",
      "massKg": 4725,
      "powerSource": "Chemical batteries"
    },
    "currentOperationalStatus": "Mission completed; descent capsule on display at RKK Energia Museum, Korolev.",
    "historicalSignificance": "The ultimate milestone in human space exploration, opening the cosmos to humanity.",
    "latestKnownUpdate": "Descent capsule preserved in museum.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Vostok 1",
      "Yuri Gagarin",
      "First Human in Space",
      "Poyekhali",
      "Baikonur"
    ],
    "tags": [
      "Vostok 1",
      "Yuri Gagarin",
      "Human Spaceflight",
      "Soviet",
      "Historic"
    ]
  },
  {
    "id": "voskhod-2",
    "name": "Voskhod 2",
    "alternateNames": [
      "First Spacewalk"
    ],
    "programme": "Voskhod Programme",
    "programmeId": "soviet-human",
    "agency": "Soviet Space Program",
    "partnerAgencies": [],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (475 km apogee)",
    "status": "completed",
    "launchDate": "1965-03-18",
    "endDate": "1965-03-19",
    "launchVehicle": "Voskhod 11A57",
    "missionType": "First Extravehicular Activity (EVA) Spacewalk",
    "missionDuration": "1 day, 2 hours, 2 minutes",
    "description": "Cosmonaut Alexei Leonov conducted the world's first spacewalk, stepping out into the open void of space for 12 minutes through an inflatable airlock, overcoming suit ballooning to re-enter safely.",
    "scientificObjectives": [
      "Perform humanity's first extravehicular spacewalk through a deployable airlock",
      "Evaluate human physiological response and spacesuit mobility in direct cosmic vacuum"
    ],
    "keyAchievements": [
      "Alexei Leonov completed humanity's first spacewalk (12 minutes, 9 seconds outside)",
      "Overcame spacesuit ballooning emergency by daringly bleeding oxygen pressure to re-enter the airlock",
      "Survived off-target landing in deep snow in the taiga wilderness of the Ural Mountains"
    ],
    "milestones": [
      {
        "label": "Launch from Baikonur",
        "date": "1965-03-18",
        "done": true
      },
      {
        "label": "Volga inflatable airlock deployed in orbit",
        "date": "1965-03-18",
        "done": true
      },
      {
        "label": "Alexei Leonov steps into open space",
        "date": "1965-03-18",
        "done": true
      },
      {
        "label": "Manual re-entry burn and snowbound landing in Perm taiga",
        "date": "1965-03-19",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Pavel Belyayev",
        "role": "Commander"
      },
      {
        "name": "Alexei Leonov",
        "role": "Pilot / First Spacewalker"
      }
    ],
    "spacecraft": {
      "type": "Modified Vostok capsule with Volga inflatable fabric airlock",
      "manufacturer": "OKB-1",
      "massKg": 5682,
      "powerSource": "Chemical batteries"
    },
    "currentOperationalStatus": "Mission completed; capsule on display in Moscow.",
    "historicalSignificance": "Proved humans could venture outside a spacecraft into the vacuum of space, paving the way for orbital construction and lunar walking.",
    "latestKnownUpdate": "Descent module preserved at Memorial Museum of Cosmonautics.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Voskhod 2",
      "Alexei Leonov",
      "First Spacewalk",
      "EVA",
      "Soviet Space"
    ],
    "tags": [
      "Voskhod 2",
      "Spacewalk",
      "EVA",
      "Human Spaceflight",
      "Soviet Historic"
    ]
  },
  {
    "id": "luna-9",
    "name": "Luna 9",
    "alternateNames": [
      "First Lunar Soft Landing"
    ],
    "programme": "Luna Programme",
    "programmeId": "soviet-luna",
    "agency": "Soviet Space Program",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Moon (Oceanus Procellarum: 7.08° N, 64.37° W)",
    "status": "completed",
    "launchDate": "1966-01-31",
    "endDate": "1966-02-06",
    "launchVehicle": "Molniya-M",
    "missionType": "First Survivable Lunar Soft Landing",
    "missionDuration": "Transmitted for 3 days from lunar surface",
    "description": "First spacecraft to achieve a survivable soft landing on the Moon, proving the lunar regolith was firm enough to support a spacecraft rather than swallowing it in deep dust.",
    "scientificObjectives": [
      "Demonstrate soft touchdown using retro-rockets and an airbag ejection sphere",
      "Transmit high-resolution panoramic television imagery from lunar ground level",
      "Determine the mechanical bearing strength of the lunar surface"
    ],
    "keyAchievements": [
      "First spacecraft in history to soft-land on another celestial body (February 3, 1966)",
      "Transmitted first photographic panoramas from the lunar surface",
      "Proved lunar surface was solid rock and basalt rather than treacherous quicksand-like dust"
    ],
    "milestones": [
      {
        "label": "Launch from Baikonur",
        "date": "1966-01-31",
        "done": true
      },
      {
        "label": "Retro-fire braking and airbag landing at Oceanus Procellarum",
        "date": "1966-02-03",
        "done": true
      },
      {
        "label": "Petal shields opened; first panoramic television imagery transmitted",
        "date": "1966-02-03",
        "done": true
      },
      {
        "label": "Final transmission after battery depletion",
        "date": "1966-02-06",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "58 cm hermetically sealed sphere with 4 spring-loaded petals and rotating TV camera",
      "manufacturer": "Lavochkin",
      "massKg": 1538,
      "powerSource": "Chemical battery"
    },
    "currentOperationalStatus": "Mission completed; historic lander resting at Oceanus Procellarum.",
    "historicalSignificance": "Proved lunar soil was structurally sound, clearing the crucial hurdle for the Apollo crewed lunar landings.",
    "latestKnownUpdate": "Permanent relic on the lunar surface.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Luna 9",
      "First Moon Landing",
      "Oceanus Procellarum",
      "Soviet Luna",
      "Lavochkin"
    ],
    "tags": [
      "Luna 9",
      "Moon",
      "Soft Landing",
      "Soviet",
      "Historic"
    ]
  },
  {
    "id": "luna-16",
    "name": "Luna 16",
    "alternateNames": [
      "First Robotic Lunar Sample Return"
    ],
    "programme": "Luna Programme",
    "programmeId": "soviet-luna",
    "agency": "Soviet Space Program",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Moon (Mare Fecunditatis)",
    "status": "completed",
    "launchDate": "1970-09-12",
    "endDate": "1970-09-24",
    "launchVehicle": "Proton-K / D",
    "missionType": "First Autonomous Robotic Lunar Sample Return",
    "missionDuration": "12 days",
    "description": "Humanity's first fully automated robotic sample return from another celestial body, drilling into the Moon's Mare Fecunditatis and returning 101 grams of lunar regolith to Earth.",
    "scientificObjectives": [
      "Perform unmanned soft landing on the Moon",
      "Drill core regolith up to 35 cm depth and transfer it robotically into a sealed capsule",
      "Launch an ascent stage directly from the Moon to return samples to Earth"
    ],
    "keyAchievements": [
      "First completely autonomous robotic retrieval of extraterrestrial soil in human history",
      "Returned 101 grams of lunar core sample to Kazakhstan on September 24, 1970"
    ],
    "milestones": [
      {
        "label": "Launch on Proton-K",
        "date": "1970-09-12",
        "done": true
      },
      {
        "label": "Soft touchdown in Mare Fecunditatis",
        "date": "1970-09-20",
        "done": true
      },
      {
        "label": "Automated drill extracted 35 cm core sample",
        "date": "1970-09-20",
        "done": true
      },
      {
        "label": "Ascent stage launched from the Moon",
        "date": "1970-09-21",
        "done": true
      },
      {
        "label": "Sample capsule parachuted safely into Kazakhstan",
        "date": "1970-09-24",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Two-stage spacecraft: Descent stage with landing legs and drill + Ascent rocket with spherical re-entry capsule",
      "manufacturer": "Lavochkin",
      "massKg": 5600,
      "powerSource": "Chemical batteries"
    },
    "currentOperationalStatus": "Mission completed. Descent stage remains in Mare Fecunditatis; samples curated in Moscow.",
    "historicalSignificance": "Proved robots can return scientific specimens from another world without requiring human crews.",
    "latestKnownUpdate": "Descent stage remains in Mare Fecunditatis.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Luna 16",
      "Robotic Sample Return",
      "Mare Fecunditatis",
      "Proton Rocket",
      "Soviet"
    ],
    "tags": [
      "Luna 16",
      "Moon",
      "Sample Return",
      "Robotic",
      "Soviet Completed"
    ]
  },
  {
    "id": "venera-7",
    "name": "Venera 7",
    "alternateNames": [
      "First Landing on Venus"
    ],
    "programme": "Venera Programme",
    "programmeId": "soviet-venera",
    "agency": "Soviet Space Program",
    "partnerAgencies": [],
    "category": "Robotic Exploration",
    "destination": "Venus Surface",
    "status": "completed",
    "launchDate": "1970-08-17",
    "endDate": "1970-12-15",
    "launchVehicle": "Molniya-M",
    "missionType": "First Successful Surface Lander on Another Planet",
    "missionDuration": "Transmitted from surface for 23 minutes",
    "description": "First spacecraft to survive landing on the hellish surface of Venus, enduring crushing pressures of 90 atmospheres and scorching heat of 475°C to transmit the first in-situ surface data from another planet.",
    "scientificObjectives": [
      "Survive atmospheric entry into the Venusian carbon dioxide atmosphere",
      "Measure surface temperature, atmospheric pressure, and composition directly from the planetary surface"
    ],
    "keyAchievements": [
      "First human-made spacecraft to soft-land on another planet and transmit telemetry back to Earth",
      "Recorded surface temperature of 475°C (887°F) and pressure of 90 atmospheres (equivalent to 900 m underwater on Earth)"
    ],
    "milestones": [
      {
        "label": "Launch from Baikonur",
        "date": "1970-08-17",
        "done": true
      },
      {
        "label": "Entered Venusian atmosphere",
        "date": "1970-12-15",
        "done": true
      },
      {
        "label": "Parachute descent and surface touchdown",
        "date": "1970-12-15",
        "done": true
      },
      {
        "label": "Transmitted weak telemetry for 23 minutes from the surface",
        "date": "1970-12-15",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Heavily armored titanium pressure vessel built to withstand 180 atmospheres",
      "manufacturer": "Lavochkin",
      "massKg": 1180,
      "powerSource": "Thermal batteries"
    },
    "currentOperationalStatus": "Mission completed; lander hull crushed on Venusian surface.",
    "historicalSignificance": "Achieved the first soft landing and surface data transmission on another planet in human history.",
    "latestKnownUpdate": "Crushed and melted on Venusian plains.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Venera 7",
      "Venus Landing",
      "Extreme Pressure",
      "Lavochkin",
      "Soviet Venus"
    ],
    "tags": [
      "Venera 7",
      "Venus",
      "Lander",
      "Historic",
      "Soviet Completed"
    ]
  },
  {
    "id": "mir-space-station",
    "name": "Mir Space Station",
    "alternateNames": [
      "Mir Orbital Complex"
    ],
    "programme": "Mir Programme",
    "programmeId": "soviet-stations",
    "agency": "Soviet Space Program / Roscosmos",
    "partnerAgencies": [
      "NASA (Shuttle-Mir)",
      "CNES",
      "ESA"
    ],
    "category": "Human Spaceflight",
    "destination": "Low Earth Orbit (350 km, 51.6° inclination)",
    "status": "completed",
    "launchDate": "1986-02-20",
    "endDate": "2001-03-23",
    "launchVehicle": "Proton-K",
    "missionType": "Continuously Inhabited Modular Space Station",
    "missionDuration": "15 years in orbit (12.5 years continuously crewed)",
    "description": "Humanity's first modular space station, continuously inhabited for a decade and hosting 28 long-duration expeditions, setting human endurance records and laying the direct foundation for the ISS.",
    "scientificObjectives": [
      "Master the technology of continuous modular space station assembly in orbit",
      "Study long-duration human physiological adaptation to microgravity for multi-year flights",
      "Host international cooperative space missions including the historic Shuttle-Mir Program"
    ],
    "keyAchievements": [
      "First continuously inhabited long-term research station in space (assembled from 7 modules: Core, Kvant-1, Kvant-2, Kristall, Spektr, Priroda, Docking Module)",
      "Cosmonaut Valeri Polyakov set the unbroken world endurance record of 437 days, 18 hours in space",
      "Hosted the historic Shuttle-Mir program, docking US Space Shuttles with Mir 9 times"
    ],
    "milestones": [
      {
        "label": "Mir Core Module launched on Proton-K",
        "date": "1986-02-20",
        "done": true
      },
      {
        "label": "Valeri Polyakov completes record 437-day stay",
        "date": "1995-03-22",
        "done": true
      },
      {
        "label": "Space Shuttle Atlantis docks with Mir (STS-71)",
        "date": "1995-06-29",
        "done": true
      },
      {
        "label": "Survives fire and Progress cargo collision",
        "date": "1997-06-25",
        "done": true
      },
      {
        "label": "Controlled atmospheric de-orbit over South Pacific Ocean",
        "date": "2001-03-23",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Mir Resident Expeditions",
        "role": "28 long-duration international crews"
      }
    ],
    "spacecraft": {
      "type": "7-module orbital complex with multi-docking node and solar arrays",
      "manufacturer": "RKK Energia",
      "massKg": 129700,
      "powerSource": "Solar array wings producing ~42 kW"
    },
    "currentOperationalStatus": "Mission completed; safely de-orbited into the South Pacific oceanic spacecraft cemetery.",
    "historicalSignificance": "Taught humanity how to live and work permanently in space, proving human physiology can endure year-long cosmic flights.",
    "latestKnownUpdate": "De-orbited on March 23, 2001.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.roscosmos.ru/",
    "relatedNewsTags": [
      "Mir Space Station",
      "Valeri Polyakov",
      "Shuttle-Mir",
      "Proton Rocket",
      "Space Endurance"
    ],
    "tags": [
      "Mir",
      "Space Station",
      "Human Spaceflight",
      "Soviet",
      "Historic"
    ]
  },
  {
    "id": "spacex-demo-2",
    "name": "SpaceX Demo-2",
    "alternateNames": [
      "Crew Demo-2"
    ],
    "programme": "Commercial Crew Program",
    "programmeId": "commercial-crew",
    "agency": "SpaceX / NASA",
    "partnerAgencies": [
      "NASA"
    ],
    "category": "Human Spaceflight",
    "destination": "International Space Station (LEO)",
    "status": "completed",
    "launchDate": "2020-05-30",
    "endDate": "2020-08-02",
    "launchVehicle": "Falcon 9 Block 5",
    "missionType": "First Commercial Crewed Orbital Spaceflight",
    "missionDuration": "63 days, 23 hours",
    "description": "Restored American human orbital spaceflight capability for the first time since the Space Shuttle retirement in 2011, launching astronauts Bob Behnken and Doug Hurley to the ISS aboard Crew Dragon Endeavour.",
    "scientificObjectives": [
      "Validate end-to-end human spaceflight operations of the Falcon 9 and Crew Dragon system",
      "Execute autonomous rendezvous and docking with the International Space Station",
      "Demonstrate safe atmospheric entry and water splashdown recovery in the Gulf of Mexico"
    ],
    "keyAchievements": [
      "First crewed orbital launch by a private commercial space company in history",
      "Restored sovereign US orbital human launch capability from American soil after 9 years",
      "Dragon capsule Endeavour flew a flawless 64-day mission"
    ],
    "milestones": [
      {
        "label": "Liftoff from historic KSC Pad 39A",
        "date": "2020-05-30",
        "done": true
      },
      {
        "label": "Autonomous docking with ISS Harmony module",
        "date": "2020-05-31",
        "done": true
      },
      {
        "label": "Conducted 100+ hours of ISS research and 4 spacewalks",
        "date": "2020-07-20",
        "done": true
      },
      {
        "label": "Splashdown in the Gulf of Mexico off Pensacola coast",
        "date": "2020-08-02",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Doug Hurley",
        "role": "Spacecraft Commander"
      },
      {
        "name": "Bob Behnken",
        "role": "Joint Operations Commander"
      }
    ],
    "spacecraft": {
      "type": "SpaceX Crew Dragon (Endeavour) with SuperDraco emergency abort engines and touchscreens",
      "manufacturer": "SpaceX",
      "massKg": 12519,
      "powerSource": "Trunk-mounted solar cells"
    },
    "currentOperationalStatus": "Mission completed with 100% success; Endeavour has since reflown on multiple subsequent crewed flights.",
    "historicalSignificance": "Inaugurated the modern era of commercial human spaceflight, shifting government space agencies from operators to commercial customers.",
    "latestKnownUpdate": "Dragon Endeavour remains active in the SpaceX fleet.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.nasa.gov/commercial-crew-program/",
    "relatedNewsTags": [
      "Demo-2",
      "SpaceX",
      "Crew Dragon",
      "Bob and Doug",
      "Falcon 9",
      "Commercial Crew"
    ],
    "tags": [
      "Demo-2",
      "SpaceX",
      "Crew Dragon",
      "Commercial Crew",
      "Historic"
    ]
  },
  {
    "id": "starship-ift-series",
    "name": "Starship Integrated Flight Tests (IFT Series)",
    "alternateNames": [
      "Starship & Super Heavy Flight Tests"
    ],
    "programme": "Starship Development Program",
    "programmeId": "commercial-starship",
    "agency": "SpaceX",
    "partnerAgencies": [
      "NASA Artemis"
    ],
    "category": "Robotic Exploration",
    "destination": "Suborbital / Orbital Insertion & Starbase Landing",
    "status": "active",
    "launchDate": "2023-04-20",
    "endDate": null,
    "launchVehicle": "Starship & Super Heavy Booster",
    "missionType": "Next-Generation Fully Reusable Heavy Launch Vehicle Development",
    "missionDuration": "Ongoing iterative flight test campaign",
    "description": "Developing the most powerful rocket in human history (generating 16.7 million pounds of thrust with 33 Raptor engines), achieving orbital speeds and the historic mid-air catch of the Super Heavy booster by \"Mechazilla\" chopstick arms.",
    "scientificObjectives": [
      "Demonstrate hot-staging stage separation of super-heavy rocket stages",
      "Demonstrate hypersonic re-entry of Starship upper stage with heat shield tiles",
      "Execute mid-air recovery and catch of the 71-meter Super Heavy booster using the launch tower chopsticks",
      "Prepare the Human Landing System (HLS) for NASA's Artemis III and IV lunar landings"
    ],
    "keyAchievements": [
      "Most powerful rocket ever flown, producing nearly double the thrust of the Saturn V",
      "Achieved historic first mid-air catch of Super Heavy booster at Starbase Pad A on Flight 5 (October 13, 2024)",
      "Demonstrated controlled soft water landing of Starship upper stage in Indian Ocean",
      "Qualified Raptor vacuum engine relight in the vacuum of space"
    ],
    "milestones": [
      {
        "label": "Integrated Flight Test 1 (IFT-1) cleared launch pad",
        "date": "2023-04-20",
        "done": true
      },
      {
        "label": "IFT-2 demonstrates successful hot-staging separation",
        "date": "2023-11-18",
        "done": true
      },
      {
        "label": "IFT-3 reaches orbital velocity and tests payload door",
        "date": "2024-03-14",
        "done": true
      },
      {
        "label": "IFT-4 achieves first soft splashdowns of both booster and ship",
        "date": "2024-06-06",
        "done": true
      },
      {
        "label": "IFT-5 achieves historic Mechazilla chopstick catch of Super Heavy booster",
        "date": "2024-10-13",
        "done": true
      },
      {
        "label": "Next-generation orbital refueling and ship catch flight tests",
        "date": "2026-10-31",
        "done": true,
        "current": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Fully reusable stainless steel 121-meter two-stage launch vehicle powered by 33 + 6 Raptor methane engines",
      "manufacturer": "SpaceX Starbase, Boca Chica, Texas",
      "massKg": 5000000,
      "powerSource": "High-density lithium-ion battery packs and Raptor alternator power"
    },
    "currentOperationalStatus": "Active flight test campaign at Starbase, Texas, validating orbital cryogenic propellant transfer for the Artemis lunar landing program.",
    "historicalSignificance": "Poised to radically lower launch costs to orbit by orders of magnitude, enabling large-scale lunar bases and Mars colonization.",
    "latestKnownUpdate": "Preparations underway for full orbital flights and in-space propellant transfer demonstrations.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.spacex.com/vehicles/starship/",
    "relatedNewsTags": [
      "Starship",
      "Super Heavy",
      "Mechazilla Catch",
      "SpaceX",
      "Starbase",
      "Artemis HLS"
    ],
    "tags": [
      "Starship",
      "Super Heavy",
      "SpaceX",
      "Active",
      "Reusable Rocket"
    ]
  },
  {
    "id": "im-1-odysseus",
    "name": "Intuitive Machines IM-1 (Odysseus)",
    "alternateNames": [
      "Nova-C Odysseus"
    ],
    "programme": "Commercial Lunar Payload Services (CLPS)",
    "programmeId": "commercial-clps",
    "agency": "Intuitive Machines",
    "partnerAgencies": [
      "NASA CLPS"
    ],
    "category": "Robotic Exploration",
    "destination": "Lunar South Pole (Malapert A crater: 80.13° S, 1.44° E)",
    "status": "completed",
    "launchDate": "2024-02-15",
    "endDate": "2024-02-29",
    "launchVehicle": "Falcon 9 Full Thrust",
    "missionType": "Commercial Lunar Lander",
    "missionDuration": "7 days on surface",
    "description": "First commercial lander in history to successfully soft-land on the Moon, and the first American spacecraft to touch down on the lunar surface since Apollo 17 in 1972.",
    "scientificObjectives": [
      "Deliver six NASA CLPS scientific payloads to the Moon's south polar region",
      "Demonstrate liquid methane and liquid oxygen (methalox) deep-space propulsion",
      "Test autonomous laser retroreflector and radio beacons for lunar navigation"
    ],
    "keyAchievements": [
      "First commercial spacecraft to achieve a soft touchdown on the Moon (February 22, 2024)",
      "First American lunar landing in over 51 years (since Apollo 17 in December 1972)",
      "Southernmost landing on the Moon at the time (Malapert A crater, ~300 km from south pole)",
      "NASA payloads transmitted science data from the surface despite lander resting on its side"
    ],
    "milestones": [
      {
        "label": "Launch on Falcon 9 from KSC",
        "date": "2024-02-15",
        "done": true
      },
      {
        "label": "Lunar orbit insertion using 3D-printed methalox engine",
        "date": "2024-02-21",
        "done": true
      },
      {
        "label": "Historic touchdown at Malapert A crater",
        "date": "2024-02-22",
        "done": true
      },
      {
        "label": "All active NASA payloads returned valid scientific telemetry",
        "date": "2024-02-27",
        "done": true
      },
      {
        "label": "Mission concluded with onset of lunar night",
        "date": "2024-02-29",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Nova-C hexagonal cylinder lander with 6 carbon composite legs and methalox propulsion",
      "manufacturer": "Intuitive Machines, Houston, Texas",
      "massKg": 1908,
      "powerSource": "Solar panels (788 W)"
    },
    "currentOperationalStatus": "Mission completed; resting permanently at Malapert A crater.",
    "historicalSignificance": "Proved the viability of NASA's Commercial Lunar Payload Services model, inaugurating commercial cargo delivery to the Moon.",
    "latestKnownUpdate": "Permanent lunar installation at Malapert A.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.intuitivemachines.com/lunar-services",
    "relatedNewsTags": [
      "IM-1",
      "Odysseus",
      "Intuitive Machines",
      "CLPS",
      "Lunar South Pole",
      "NASA"
    ],
    "tags": [
      "IM-1",
      "Odysseus",
      "Moon",
      "CLPS",
      "Commercial",
      "Completed"
    ]
  },
  {
    "id": "astrobotic-peregrine-1",
    "name": "Astrobotic Peregrine Mission 1",
    "alternateNames": [
      "Peregrine Lunar Lander"
    ],
    "programme": "Commercial Lunar Payload Services (CLPS)",
    "programmeId": "commercial-clps",
    "agency": "Astrobotic Technology",
    "partnerAgencies": [
      "NASA CLPS"
    ],
    "category": "Robotic Exploration",
    "destination": "Lunar Transit & Earth Atmosphere Re-entry",
    "status": "failed",
    "launchDate": "2024-01-08",
    "endDate": "2024-01-18",
    "launchVehicle": "Vulcan Centaur (Maiden Flight)",
    "missionType": "Commercial Lunar Lander",
    "missionDuration": "10 days in cislunar space",
    "description": "The first flight under NASA's CLPS program, launched on the maiden flight of ULA's Vulcan Centaur; suffered an oxidizer valve rupture shortly after separation, preventing a lunar landing but operating for 10 days to return space science before a controlled Earth re-entry.",
    "scientificObjectives": [
      "Deliver 20 payloads (including 5 NASA science instruments) to Sinus Viscositatis on the Moon",
      "Demonstrate commercial robotic lunar landing capability"
    ],
    "keyAchievements": [
      "Successfully launched on the inaugural flight of the United Launch Alliance Vulcan Centaur",
      "Heroic mission control response stabilized attitude using thrusters despite severe propellant leak",
      "Activated and gathered science data in space from 4 NASA payloads and German radiation detector",
      "Executed safe, responsible controlled atmospheric re-entry over the South Pacific Ocean to avoid orbital debris"
    ],
    "milestones": [
      {
        "label": "Launch on maiden flight of Vulcan Centaur",
        "date": "2024-01-08",
        "done": true
      },
      {
        "label": "Propellant leak identified following valve failure",
        "date": "2024-01-08",
        "done": true
      },
      {
        "label": "Active instruments gathered interplanetary radiation data",
        "date": "2024-01-12",
        "done": true
      },
      {
        "label": "Controlled re-entry over South Pacific Ocean",
        "date": "2024-01-18",
        "done": true
      }
    ],
    "crew": null,
    "spacecraft": {
      "type": "Peregrine lunar lander bus with 5 main engines and aluminum isogrid structure",
      "manufacturer": "Astrobotic Technology, Pittsburgh, PA",
      "massKg": 1283,
      "powerSource": "Top-mounted solar panels (480 W)"
    },
    "currentOperationalStatus": "Mission completed with flight anomaly; safely incinerated during controlled re-entry.",
    "historicalSignificance": "Pioneered early CLPS operations and demonstrated exemplary space traffic management and planetary protection stewardship.",
    "latestKnownUpdate": "Findings applied to upgrade propulsion systems on Astrobotic's larger Griffin lander.",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.astrobotic.com/lunar-delivery/",
    "relatedNewsTags": [
      "Peregrine",
      "Astrobotic",
      "CLPS",
      "Vulcan Centaur",
      "Controlled Reentry"
    ],
    "tags": [
      "Peregrine",
      "Astrobotic",
      "CLPS",
      "Moon",
      "Commercial"
    ]
  },
  {
    "id": "axiom-1",
    "name": "Axiom Mission 1 (Ax-1)",
    "alternateNames": [
      "Ax-1"
    ],
    "programme": "Commercial Spaceflight Program",
    "programmeId": "commercial-crew",
    "agency": "Axiom Space",
    "partnerAgencies": [
      "NASA",
      "SpaceX"
    ],
    "category": "Human Spaceflight",
    "destination": "International Space Station (LEO)",
    "status": "completed",
    "launchDate": "2022-04-08",
    "endDate": "2022-04-25",
    "launchVehicle": "Falcon 9 Block 5",
    "missionType": "First All-Private Commercial Astronaut Mission to the ISS",
    "missionDuration": "17 days, 1 hour, 49 minutes",
    "description": "Humanity's first all-private astronaut mission to the International Space Station, commanded by former NASA astronaut Michael López-Alegría, conducting over 25 scientific and biomedical experiments.",
    "scientificObjectives": [
      "Demonstrate commercial private astronaut mission integration with the ISS",
      "Conduct human physiology, microgravity medicine, and self-assembling stem cell research in orbit"
    ],
    "keyAchievements": [
      "First all-commercial astronaut mission to dock with the International Space Station",
      "Conducted 25+ microgravity research payloads in partnership with Mayo Clinic, Cleveland Clinic, and universities",
      "Pioneered commercial utilization protocols for future commercial space stations"
    ],
    "milestones": [
      {
        "label": "Launch from KSC LC-39A on Falcon 9",
        "date": "2022-04-08",
        "done": true
      },
      {
        "label": "Docked with ISS Harmony module",
        "date": "2022-04-09",
        "done": true
      },
      {
        "label": "Completed 15 days of intensive orbital research",
        "date": "2022-04-24",
        "done": true
      },
      {
        "label": "Splashdown off Jacksonville, Florida",
        "date": "2022-04-25",
        "done": true
      }
    ],
    "crew": [
      {
        "name": "Michael López-Alegría",
        "role": "Commander"
      },
      {
        "name": "Larry Connor",
        "role": "Pilot"
      },
      {
        "name": "Mark Pathy",
        "role": "Mission Specialist"
      },
      {
        "name": "Eytan Stibbe",
        "role": "Mission Specialist"
      }
    ],
    "spacecraft": {
      "type": "SpaceX Crew Dragon (Endeavour)",
      "manufacturer": "SpaceX",
      "massKg": 12519,
      "powerSource": "Trunk solar panels"
    },
    "currentOperationalStatus": "Mission completed with 100% success.",
    "historicalSignificance": "Opened the International Space Station to fully private, commercial research-driven human expeditions.",
    "latestKnownUpdate": "Axiom Space successfully flew Ax-2 and Ax-3 and is preparing Ax-4 (with Indian astronaut Shubhanshu Shukla).",
    "lastVerifiedAt": "2026-10-31",
    "officialSourceUrl": "https://www.axiomspace.com/missions/ax1",
    "relatedNewsTags": [
      "Axiom-1",
      "Ax-1",
      "Private Astronauts",
      "Crew Dragon",
      "ISS Commercial"
    ],
    "tags": [
      "Axiom-1",
      "Ax-1",
      "Commercial",
      "Human Spaceflight",
      "ISS"
    ]
  }
];


/**
 * Helper retrieval functions for the CosmosHub Space Mission Intelligence Archive
 */

export function getMissionById(id) {
  if (!id) return null;
  return MISSIONS.find(m => m.id === id) || null;
}

export function getMissionsByProgramme(programmeId) {
  if (!programmeId) return [];
  return MISSIONS.filter(m => m.programmeId === programmeId);
}

export function getMissionsByStatus(status) {
  if (!status || status === 'all') return MISSIONS;
  return MISSIONS.filter(m => m.status.toLowerCase() === status.toLowerCase());
}

export function getMissionsByAgency(agency) {
  if (!agency || agency === 'all') return MISSIONS;
  return MISSIONS.filter(m => {
    if (m.agency.toLowerCase().includes(agency.toLowerCase())) return true;
    if (Array.isArray(m.partnerAgencies)) {
      return m.partnerAgencies.some(p => p.toLowerCase().includes(agency.toLowerCase()));
    }
    return false;
  });
}

export function getMissionsByCategory(category) {
  if (!category || category === 'all') return MISSIONS;
  return MISSIONS.filter(m => m.category.toLowerCase() === category.toLowerCase());
}

export function getMissionsByDestination(destination) {
  if (!destination || destination === 'all') return MISSIONS;
  const q = destination.toLowerCase();
  return MISSIONS.filter(m => {
    const d = (m.destination || '').toLowerCase();
    if (q === 'moon' || q === 'lunar') {
      return d.includes('moon') || d.includes('lunar');
    }
    if (q === 'orbit' || q === 'leo') {
      return d.includes('orbit') || d.includes('leo');
    }
    if (q === 'sun' || q === 'solar') {
      return d.includes('sun') || d.includes('solar') || d.includes('corona');
    }
    if (q === 'lagrange') {
      return d.includes('lagrange') || d.includes('l1') || d.includes('l2');
    }
    return d.includes(q);
  });
}

export function searchMissions(query, missionsList = MISSIONS) {
  if (!query || typeof query !== 'string') return missionsList;
  const q = query.trim().toLowerCase();
  if (!q) return missionsList;

  return missionsList.filter(m => {
    if (m.name.toLowerCase().includes(q)) return true;
    if (m.id.toLowerCase().includes(q)) return true;
    if (m.agency.toLowerCase().includes(q)) return true;
    if (m.destination.toLowerCase().includes(q)) return true;
    if (m.category.toLowerCase().includes(q)) return true;
    if (m.description.toLowerCase().includes(q)) return true;
    if (m.launchVehicle && m.launchVehicle.toLowerCase().includes(q)) return true;
    if (m.historicalSignificance && m.historicalSignificance.toLowerCase().includes(q)) return true;
    if (Array.isArray(m.alternateNames) && m.alternateNames.some(a => a.toLowerCase().includes(q))) return true;
    if (Array.isArray(m.tags) && m.tags.some(t => t.toLowerCase().includes(q))) return true;
    if (Array.isArray(m.relatedNewsTags) && m.relatedNewsTags.some(t => t.toLowerCase().includes(q))) return true;
    if (Array.isArray(m.crew) && m.crew.some(c => c.name.toLowerCase().includes(q))) return true;
    return false;
  });
}

export function getMissionStats(missionsList = MISSIONS) {
  const total = missionsList.length;
  let active = 0;
  let cruise = 0;
  let upcoming = 0;
  let completed = 0;
  let humanSpaceflight = 0;
  let lunar = 0;
  let mars = 0;

  for (const m of missionsList) {
    const s = m.status.toLowerCase();
    if (s === 'active' || s === 'extended') active++;
    else if (s === 'cruise') cruise++;
    else if (s === 'upcoming' || s === 'in-development') upcoming++;
    else if (s === 'completed' || s === 'retired') completed++;

    if (m.category === 'Human Spaceflight' || (m.crew && m.crew.length > 0)) {
      humanSpaceflight++;
    }

    const d = (m.destination || '').toLowerCase();
    if (d.includes('moon') || d.includes('lunar')) lunar++;
    if (d.includes('mars')) mars++;
  }

  return {
    total,
    active,
    cruise,
    upcoming,
    completed,
    humanSpaceflight,
    lunar,
    mars
  };
}

export function getRelatedNewsForMission(mission, articles = [], limit = 4) {
  if (!mission || !Array.isArray(articles) || articles.length === 0) return [];

  const searchKeywords = new Set();
  // Name keywords
  mission.name.split(/\s+/).forEach(w => {
    const clean = w.replace(/[^a-zA-Z0-9]/g, '');
    if (clean.length > 3 && !['Space', 'First', 'Mission', 'Program', 'Programme', 'Test', 'Flight'].includes(clean)) {
      searchKeywords.add(clean.toLowerCase());
    }
  });

  if (Array.isArray(mission.relatedNewsTags)) {
    mission.relatedNewsTags.forEach(t => searchKeywords.add(t.toLowerCase()));
  }
  if (Array.isArray(mission.tags)) {
    mission.tags.forEach(t => searchKeywords.add(t.toLowerCase()));
  }

  const keywordList = Array.from(searchKeywords);

  const scored = [];
  for (const article of articles) {
    const title = (article.title || '').toLowerCase();
    const desc = (article.description || article.summary || '').toLowerCase();
    let score = 0;

    for (const kw of keywordList) {
      if (kw.length < 3) continue;
      // Word boundary match check
      const regex = new RegExp('\\b' + kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'i');
      if (regex.test(title)) score += 3;
      else if (regex.test(desc)) score += 1;
    }

    if (score > 0) {
      scored.push({ article, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.article);
}


export default MISSIONS;
