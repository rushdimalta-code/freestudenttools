/**
 * FreeStudentTools — University Guide Supplemental Data
 * Covers: course language, cost of living, nearby maps, rental links, important contacts
 * Keyed by university id (matches UNI_DATA universities[].id)
 * Last updated: 2026-04-13
 *
 * Cost of living estimates are monthly (USD equivalent) sourced from Numbeo.com and official university
 * cost calculators. Figures are estimates and will vary by lifestyle. Always check current rates.
 */
window.UNI_GUIDE = {
  lastUpdated: "2026-04-13",

  // ───────────────────────────────────────────────────────────────────────────
  // UNITED STATES
  // ───────────────────────────────────────────────────────────────────────────

  mit: {
    city: "Cambridge, Massachusetts, USA",
    courseLanguage: "English",
    languageNotes: "All programs taught in English. No additional language requirement beyond English proficiency tests (IELTS / TOEFL).",
    mapQuery: "MIT Massachusetts Institute of Technology, Cambridge, MA",
    nearestAirport: { name: "Boston Logan International Airport", code: "BOS", distanceKm: 8, mapsQuery: "Boston Logan International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 900,  max: 1500, label: "On-campus dorm room" },
        sharedApartment:   { min: 1400, max: 2200, label: "Shared apartment (per person)" },
        studioApartment:   { min: 2000, max: 3200, label: "Studio apartment" },
        twoBedroomApt:     { min: 3000, max: 4800, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 350, max: 600 },
        transport:         { min: 90,  max: 130, note: "MBTA monthly pass ~$90" },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/Cambridge-Massachusetts",
      notes: "Cambridge is among the most expensive US college cities. Graduate students often live in Somerville or Allston for lower rents."
    },
    rentalLinks: [
      { label: "Apartments.com — Cambridge", url: "https://www.apartments.com/cambridge-ma/" },
      { label: "Craigslist Boston Housing", url: "https://boston.craigslist.org/search/apa?query=cambridge" },
      { label: "Zillow — Cambridge rentals", url: "https://www.zillow.com/cambridge-ma/rentals/" },
      { label: "SpareRoom — Boston area", url: "https://www.spareroom.com/flatshare/massachusetts/boston" }
    ],
    importantContacts: {
      police: { name: "Cambridge Police Department (Non-Emergency)", number: "+1 617-349-3300", address: "125 6th Street, Cambridge, MA 02142" },
      hospital: { name: "Massachusetts General Hospital", address: "55 Fruit Street, Boston, MA 02114", url: "https://www.massgeneral.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "Charles River Esplanade", type: "Park / Running trail", url: "https://esplanade.org" },
      { name: "MIT Zesiger Sports & Fitness Center", type: "Gym (student access)", url: "https://athletics.mit.edu/zesiger" },
      { name: "Harvard Square", type: "Shopping / Restaurants", url: "https://www.harvardsquare.com" },
      { name: "Museum of Science Boston", type: "Museum", url: "https://www.mos.org" }
    ]
  },

  harvard: {
    city: "Cambridge, Massachusetts, USA",
    courseLanguage: "English",
    languageNotes: "All degree programs taught in English. The Faculty of Arts and Sciences offers language courses in 50+ languages.",
    mapQuery: "Harvard University, Cambridge, MA",
    nearestAirport: { name: "Boston Logan International Airport", code: "BOS", distanceKm: 8, mapsQuery: "Boston Logan International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 950,  max: 1600, label: "Residential house (on-campus)" },
        sharedApartment:   { min: 1400, max: 2200, label: "Shared apartment (per person)" },
        studioApartment:   { min: 2100, max: 3400, label: "Studio apartment" },
        twoBedroomApt:     { min: 3200, max: 5000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 350, max: 650 },
        transport:         { min: 90,  max: 130, note: "MBTA monthly pass ~$90" },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/Cambridge-Massachusetts",
      notes: "Harvard's financial aid office publishes a detailed cost of attendance calculator. Many students qualify for need-based grants."
    },
    rentalLinks: [
      { label: "Apartments.com — Cambridge", url: "https://www.apartments.com/cambridge-ma/" },
      { label: "Craigslist Boston Housing", url: "https://boston.craigslist.org/search/apa?query=cambridge" },
      { label: "Zillow — Cambridge rentals", url: "https://www.zillow.com/cambridge-ma/rentals/" }
    ],
    importantContacts: {
      police: { name: "Cambridge Police Department (Non-Emergency)", number: "+1 617-349-3300", address: "125 6th Street, Cambridge, MA 02142" },
      hospital: { name: "Mount Auburn Hospital", address: "330 Mount Auburn Street, Cambridge, MA 02138", url: "https://www.mountauburn.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "Harvard Athletic Complex", type: "Gym / Sports facilities", url: "https://gocrimson.com" },
      { name: "Harvard Art Museums", type: "Museum (free for students)", url: "https://harvardartmuseums.org" },
      { name: "Cambridge Common Park", type: "Park", url: "https://www.cambridgema.gov/parks" },
      { name: "Harvard Coop Bookstore", type: "Bookstore / Shopping" }
    ]
  },

  stanford: {
    city: "Stanford / Palo Alto, California, USA",
    courseLanguage: "English",
    languageNotes: "All programs in English. Stanford Language Center offers courses in 20+ languages. International students must meet English proficiency requirements.",
    mapQuery: "Stanford University, Palo Alto, CA",
    nearestAirport: { name: "San Francisco International Airport", code: "SFO", distanceKm: 35, mapsQuery: "San Francisco International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 1100, max: 1800, label: "On-campus dorm / row house" },
        sharedApartment:   { min: 1600, max: 2600, label: "Shared apartment — Palo Alto (per person)" },
        studioApartment:   { min: 2400, max: 3800, label: "Studio apartment" },
        twoBedroomApt:     { min: 3500, max: 5500, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 400, max: 700 },
        transport:         { min: 100, max: 180, note: "Caltrain monthly pass or Stanford Marguerite free shuttle" },
        utilities:         { min: 60,  max: 120 }
      },
      source: "https://numbeo.com/cost-of-living/in/Palo-Alto",
      notes: "The San Francisco Bay Area is one of the most expensive regions in the US. Stanford offers considerable on-campus housing to reduce off-campus pressure."
    },
    rentalLinks: [
      { label: "Apartments.com — Palo Alto", url: "https://www.apartments.com/palo-alto-ca/" },
      { label: "Zillow — Palo Alto rentals", url: "https://www.zillow.com/palo-alto-ca/rentals/" },
      { label: "Craigslist SF Bay Housing", url: "https://sfbay.craigslist.org/search/apa?query=palo+alto" }
    ],
    importantContacts: {
      police: { name: "Palo Alto Police Department (Non-Emergency)", number: "+1 650-329-2413", address: "275 Forest Avenue, Palo Alto, CA 94301" },
      hospital: { name: "Stanford Health Care — Stanford Hospital", address: "300 Pasteur Drive, Stanford, CA 94305", url: "https://stanfordhealthcare.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "Stanford Recreation & Wellness Center", type: "Gym / Pool (student access)", url: "https://rec.stanford.edu" },
      { name: "Dish Trail, Stanford Hills", type: "Hiking / Running trail" },
      { name: "Stanford Shopping Center", type: "Shopping" },
      { name: "Cantor Arts Center", type: "Museum (free)", url: "https://museum.stanford.edu" }
    ]
  },

  caltech: {
    city: "Pasadena, California, USA",
    courseLanguage: "English",
    languageNotes: "All programs in English. Caltech's focus is STEM; language courses are limited compared to larger universities.",
    mapQuery: "California Institute of Technology, Pasadena, CA",
    nearestAirport: { name: "Los Angeles International Airport", code: "LAX", distanceKm: 46, mapsQuery: "Los Angeles International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 900,  max: 1400, label: "On-campus student house (per person)" },
        sharedApartment:   { min: 1100, max: 1800, label: "Shared apartment — Pasadena (per person)" },
        studioApartment:   { min: 1600, max: 2600, label: "Studio apartment" },
        twoBedroomApt:     { min: 2400, max: 3600, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 350, max: 600 },
        transport:         { min: 100, max: 160, note: "LA Metro monthly pass ~$100. Car recommended for wider LA." },
        utilities:         { min: 70,  max: 130 }
      },
      source: "https://numbeo.com/cost-of-living/in/Pasadena-California",
      notes: "Pasadena is more affordable than central LA or the Bay Area, while offering easy access to both. Caltech's house system keeps many students on campus."
    },
    rentalLinks: [
      { label: "Apartments.com — Pasadena", url: "https://www.apartments.com/pasadena-ca/" },
      { label: "Zillow — Pasadena rentals", url: "https://www.zillow.com/pasadena-ca/rentals/" }
    ],
    importantContacts: {
      police: { name: "Pasadena Police Department (Non-Emergency)", number: "+1 626-744-4241", address: "207 N Garfield Ave, Pasadena, CA 91101" },
      hospital: { name: "Huntington Hospital", address: "100 W California Blvd, Pasadena, CA 91105", url: "https://www.huntingtonhospital.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "Caltech Recreation Center", type: "Gym / Pool", url: "https://wellness.caltech.edu" },
      { name: "Eaton Canyon Nature Area", type: "Hiking trails" },
      { name: "Old Town Pasadena", type: "Restaurants / Shopping" },
      { name: "Norton Simon Museum", type: "Museum", url: "https://www.nortonsimon.org" }
    ]
  },

  uc_berkeley: {
    city: "Berkeley, California, USA",
    courseLanguage: "English",
    languageNotes: "All degree programs in English. Berkeley's Language Department offers 40+ languages. Strong ESL support for international students.",
    mapQuery: "University of California Berkeley, Berkeley, CA",
    nearestAirport: { name: "San Francisco International Airport", code: "SFO", distanceKm: 28, mapsQuery: "San Francisco International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 1000, max: 1700, label: "On-campus dormitory (per person)" },
        sharedApartment:   { min: 1200, max: 2000, label: "Shared apartment — Berkeley (per person)" },
        studioApartment:   { min: 2000, max: 3200, label: "Studio apartment" },
        twoBedroomApt:     { min: 3000, max: 4500, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 350, max: 600 },
        transport:         { min: 80,  max: 130, note: "AC Transit + BART monthly pass" },
        utilities:         { min: 70,  max: 130 }
      },
      source: "https://numbeo.com/cost-of-living/in/Berkeley",
      notes: "Berkeley is expensive but slightly more affordable than SF. The city has a strong student rental market in areas like Southside and Northside."
    },
    rentalLinks: [
      { label: "Apartments.com — Berkeley", url: "https://www.apartments.com/berkeley-ca/" },
      { label: "Zillow — Berkeley rentals", url: "https://www.zillow.com/berkeley-ca/rentals/" },
      { label: "Craigslist Berkeley Housing", url: "https://sfbay.craigslist.org/search/apa?query=berkeley" },
      { label: "Cal Rentals (student housing board)", url: "https://calrentals.housing.berkeley.edu" }
    ],
    importantContacts: {
      police: { name: "Berkeley Police Department (Non-Emergency)", number: "+1 510-981-5900", address: "2100 Martin Luther King Jr Way, Berkeley, CA 94704" },
      hospital: { name: "Alta Bates Summit Medical Center", address: "2450 Ashby Avenue, Berkeley, CA 94705", url: "https://www.altabatessummit.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "RSF (Recreational Sports Facility)", type: "Gym / Pool (free for students)", url: "https://recsports.berkeley.edu" },
      { name: "Tilden Regional Park", type: "Hiking / Nature" },
      { name: "Telegraph Avenue", type: "Restaurants / Shopping" },
      { name: "Berkeley Art Museum", type: "Museum", url: "https://bampfa.org" }
    ]
  },

  yale: {
    city: "New Haven, Connecticut, USA",
    courseLanguage: "English",
    languageNotes: "All programs taught in English. Yale offers instruction in 50+ languages. Strong academic support for international students.",
    mapQuery: "Yale University, New Haven, CT",
    nearestAirport: { name: "Tweed New Haven Regional Airport", code: "HVN", distanceKm: 6, mapsQuery: "Tweed New Haven Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 900,  max: 1500, label: "Residential college room" },
        sharedApartment:   { min: 900,  max: 1500, label: "Shared apartment — New Haven (per person)" },
        studioApartment:   { min: 1400, max: 2200, label: "Studio apartment" },
        twoBedroomApt:     { min: 2000, max: 3200, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 300, max: 550 },
        transport:         { min: 60,  max: 120, note: "CT Transit monthly bus pass. Amtrak to NYC takes 90 min." },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/New-Haven",
      notes: "New Haven is significantly more affordable than Boston or NYC. Yale's residential college system means most undergrads are well-housed on campus."
    },
    rentalLinks: [
      { label: "Apartments.com — New Haven", url: "https://www.apartments.com/new-haven-ct/" },
      { label: "Zillow — New Haven rentals", url: "https://www.zillow.com/new-haven-ct/rentals/" },
      { label: "Craigslist New Haven Housing", url: "https://newhaven.craigslist.org/search/apa" }
    ],
    importantContacts: {
      police: { name: "New Haven Police Department (Non-Emergency)", number: "+1 203-946-6316", address: "1 Union Ave, New Haven, CT 06519" },
      hospital: { name: "Yale New Haven Hospital", address: "20 York Street, New Haven, CT 06510", url: "https://www.ynhh.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "Yale Athletics — Payne Whitney Gymnasium", type: "Gym / Pool (student access)", url: "https://yalebulldogs.com" },
      { name: "East Rock Park", type: "Hiking / Views" },
      { name: "Yale University Art Gallery", type: "Museum (free)", url: "https://artgallery.yale.edu" },
      { name: "Chapel Street", type: "Restaurants / Bars / Shopping" }
    ]
  },

  cmu: {
    city: "Pittsburgh, Pennsylvania, USA",
    courseLanguage: "English",
    languageNotes: "All programs taught in English. CMU's modern languages department offers courses in 20+ languages including Chinese, Arabic, and German.",
    mapQuery: "Carnegie Mellon University, Pittsburgh, PA",
    nearestAirport: { name: "Pittsburgh International Airport", code: "PIT", distanceKm: 28, mapsQuery: "Pittsburgh International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 800,  max: 1300, label: "On-campus dormitory" },
        sharedApartment:   { min: 700,  max: 1200, label: "Shared apartment — Squirrel Hill / Oakland (per person)" },
        studioApartment:   { min: 1100, max: 1800, label: "Studio apartment" },
        twoBedroomApt:     { min: 1600, max: 2500, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 280, max: 500 },
        transport:         { min: 65,  max: 110, note: "Port Authority bus pass. CMU provides free transit for students." },
        utilities:         { min: 80,  max: 160 }
      },
      source: "https://numbeo.com/cost-of-living/in/Pittsburgh",
      notes: "Pittsburgh is one of the most affordable major US university cities. The Oakland and Squirrel Hill neighbourhoods near CMU have a strong student housing market."
    },
    rentalLinks: [
      { label: "Apartments.com — Pittsburgh", url: "https://www.apartments.com/pittsburgh-pa/" },
      { label: "Zillow — Pittsburgh rentals", url: "https://www.zillow.com/pittsburgh-pa/rentals/" },
      { label: "Craigslist Pittsburgh Housing", url: "https://pittsburgh.craigslist.org/search/apa" }
    ],
    importantContacts: {
      police: { name: "Pittsburgh Police (Non-Emergency)", number: "+1 412-255-2827", address: "1203 Western Ave, Pittsburgh, PA 15233" },
      hospital: { name: "UPMC Presbyterian — Shadyside", address: "200 Lothrop Street, Pittsburgh, PA 15213", url: "https://www.upmc.com" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "CMU Athletics & Physical Education", type: "Gym / Pool (student access)", url: "https://athletics.cmu.edu" },
      { name: "Frick Park", type: "Park / Trails" },
      { name: "Carnegie Museum of Art", type: "Museum", url: "https://carnegiemuseums.org" },
      { name: "Strip District", type: "Markets / Restaurants" }
    ]
  },

  columbia: {
    city: "New York City (Morningside Heights), USA",
    courseLanguage: "English",
    languageNotes: "All programs in English. Columbia offers instruction in 40+ languages. Being in NYC provides unparalleled exposure to international communities.",
    mapQuery: "Columbia University, New York, NY",
    nearestAirport: { name: "John F. Kennedy International Airport", code: "JFK", distanceKm: 25, mapsQuery: "JFK Airport New York" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "USD",
      monthly: {
        dormRoom:          { min: 1200, max: 2000, label: "On-campus residence hall" },
        sharedApartment:   { min: 1400, max: 2500, label: "Shared apartment — Upper West Side (per person)" },
        studioApartment:   { min: 2500, max: 4000, label: "Studio apartment" },
        twoBedroomApt:     { min: 3800, max: 6000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 450, max: 750 },
        transport:         { min: 132, max: 160, note: "NYC Subway monthly unlimited card = $132" },
        utilities:         { min: 100, max: 180 }
      },
      source: "https://numbeo.com/cost-of-living/in/New-York",
      notes: "New York City is the most expensive US city. Columbia's Columbia Housing system and need-based financial aid help significantly. Many students live in Washington Heights or Inwood for lower rents."
    },
    rentalLinks: [
      { label: "StreetEasy — Manhattan rentals", url: "https://streeteasy.com/for-rent/nyc" },
      { label: "Apartments.com — NYC", url: "https://www.apartments.com/new-york-ny/" },
      { label: "SpareRoom — New York", url: "https://www.spareroom.com/flatshare/new_york" },
      { label: "Craigslist NYC Housing", url: "https://newyork.craigslist.org/search/apa" }
    ],
    importantContacts: {
      police: { name: "NYPD 26th Precinct (Non-Emergency)", number: "+1 212-678-1311", address: "520 West 126th Street, New York, NY 10027" },
      hospital: { name: "NewYork-Presbyterian / Columbia University Irving Medical Center", address: "622 West 168th Street, New York, NY 10032", url: "https://www.nyp.org" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "Dodge Fitness Center", type: "Gym (student access)", url: "https://fitness.columbia.edu" },
      { name: "Riverside Park", type: "Park / Running trail" },
      { name: "Metropolitan Museum of Art", type: "Museum (discounted for students)", url: "https://www.metmuseum.org" },
      { name: "Broadway / Theatre District", type: "Entertainment (student rush tickets available)" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // UNITED KINGDOM
  // ───────────────────────────────────────────────────────────────────────────

  oxford: {
    city: "Oxford, England, UK",
    courseLanguage: "English",
    languageNotes: "All degree programs taught in English. Oxford's Language Centre offers courses in 20+ languages for personal development. IELTS minimum typically 7.0–7.5 overall.",
    mapQuery: "University of Oxford, Oxford, England",
    nearestAirport: { name: "London Heathrow Airport", code: "LHR", distanceKm: 75, mapsQuery: "London Heathrow Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "GBP",
      monthly: {
        dormRoom:          { min: 600,  max: 1000, label: "College-owned room (Oxford)" },
        sharedApartment:   { min: 600,  max: 950,  label: "Shared house / flat (per person)" },
        studioApartment:   { min: 900,  max: 1400, label: "Studio flat" },
        twoBedroomApt:     { min: 1400, max: 2200, label: "2-bedroom flat" }
      },
      otherMonthly: {
        food:              { min: 200, max: 400 },
        transport:         { min: 50,  max: 100, note: "Oxford buses + occasional trains to London" },
        utilities:         { min: 60,  max: 120 }
      },
      source: "https://numbeo.com/cost-of-living/in/Oxford",
      notes: "Oxford is expensive for a UK city outside London. All students belong to a college, which provides accommodation — especially for first years. Rent in Cowley and Headington is lower."
    },
    rentalLinks: [
      { label: "Rightmove — Oxford to rent", url: "https://www.rightmove.co.uk/property-to-rent/Oxford.html" },
      { label: "Zoopla — Oxford rentals", url: "https://www.zoopla.co.uk/to-rent/property/oxford/" },
      { label: "SpareRoom — Oxford", url: "https://www.spareroom.co.uk/flatshare/oxford" },
      { label: "Gumtree — Oxford rooms", url: "https://www.gumtree.com/flats-houses/oxford" }
    ],
    importantContacts: {
      police: { name: "Thames Valley Police (Non-Emergency)", number: "101", address: "St Aldates Police Station, St Aldates, Oxford OX1 1SZ" },
      hospital: { name: "John Radcliffe Hospital", address: "Headley Way, Headington, Oxford OX3 9DU", url: "https://www.ouh.nhs.uk" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "Oxford University Sport", type: "Gym / Sports (student access)", url: "https://www.sport.ox.ac.uk" },
      { name: "Port Meadow", type: "Park / Walking" },
      { name: "Ashmolean Museum", type: "Museum (free)", url: "https://www.ashmolean.org" },
      { name: "Covered Market Oxford", type: "Shopping / Cafés" },
      { name: "Bodleian Libraries", type: "Library / Historic", url: "https://www.bodleian.ox.ac.uk" }
    ]
  },

  cambridge: {
    city: "Cambridge, England, UK",
    courseLanguage: "English",
    languageNotes: "All degree programs taught in English. Cambridge Language Centre offers 15+ languages. IELTS minimum typically 7.5 overall.",
    mapQuery: "University of Cambridge, Cambridge, England",
    nearestAirport: { name: "London Stansted Airport", code: "STN", distanceKm: 45, mapsQuery: "London Stansted Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "GBP",
      monthly: {
        dormRoom:          { min: 550,  max: 950,  label: "College room (Cambridge)" },
        sharedApartment:   { min: 600,  max: 900,  label: "Shared house / flat (per person)" },
        studioApartment:   { min: 900,  max: 1300, label: "Studio flat" },
        twoBedroomApt:     { min: 1300, max: 2000, label: "2-bedroom flat" }
      },
      otherMonthly: {
        food:              { min: 200, max: 380 },
        transport:         { min: 0,   max: 60,  note: "Cambridge is a cycle city — a bike often replaces all transport costs" },
        utilities:         { min: 50,  max: 110 }
      },
      source: "https://numbeo.com/cost-of-living/in/Cambridge-England",
      notes: "Cambridge is a small, safe, very cycle-friendly city. All undergrads are guaranteed college accommodation for at least 1 year. The city is expensive but more so than London."
    },
    rentalLinks: [
      { label: "Rightmove — Cambridge to rent", url: "https://www.rightmove.co.uk/property-to-rent/Cambridge.html" },
      { label: "Zoopla — Cambridge rentals", url: "https://www.zoopla.co.uk/to-rent/property/cambridge/" },
      { label: "SpareRoom — Cambridge", url: "https://www.spareroom.co.uk/flatshare/cambridge" }
    ],
    importantContacts: {
      police: { name: "Cambridgeshire Police (Non-Emergency)", number: "101", address: "Parkside Police Station, Parkside, Cambridge CB1 1JG" },
      hospital: { name: "Addenbrooke's Hospital", address: "Hills Road, Cambridge CB2 0QQ", url: "https://www.cuh.nhs.uk" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "Cambridge University Sports Centre", type: "Gym / Pool (student access)", url: "https://www.sport.cam.ac.uk" },
      { name: "Midsummer Common", type: "Park / Open space" },
      { name: "Fitzwilliam Museum", type: "Museum (free)", url: "https://www.fitzmuseum.cam.ac.uk" },
      { name: "The Backs (River Cam)", type: "Punting / Walking / Scenic" }
    ]
  },

  imperial: {
    city: "London, England, UK",
    courseLanguage: "English",
    languageNotes: "All programs taught in English. IELTS minimum 6.5–7.0 depending on programme. Imperial is heavily STEM focused.",
    mapQuery: "Imperial College London, South Kensington, London",
    nearestAirport: { name: "London Heathrow Airport", code: "LHR", distanceKm: 22, mapsQuery: "London Heathrow Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "GBP",
      monthly: {
        dormRoom:          { min: 750,  max: 1400, label: "Student hall room — London" },
        sharedApartment:   { min: 800,  max: 1300, label: "Shared flat — Zone 1-2 (per person)" },
        studioApartment:   { min: 1400, max: 2200, label: "Studio flat" },
        twoBedroomApt:     { min: 2200, max: 3500, label: "2-bedroom flat" }
      },
      otherMonthly: {
        food:              { min: 250, max: 450 },
        transport:         { min: 100, max: 175, note: "Travelcard Zone 1-2 monthly ~£160" },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/London",
      notes: "London is one of the most expensive cities in the world. Imperial's South Kensington campus is in a prime (expensive) area. Students often live further out in zones 2-3 to save on rent."
    },
    rentalLinks: [
      { label: "Rightmove — London to rent", url: "https://www.rightmove.co.uk/property-to-rent/London.html" },
      { label: "Zoopla — London rentals", url: "https://www.zoopla.co.uk/to-rent/property/london/" },
      { label: "SpareRoom — London", url: "https://www.spareroom.co.uk/flatshare/london" },
      { label: "Ideal Flatmate", url: "https://www.idealflatmate.co.uk" }
    ],
    importantContacts: {
      police: { name: "Metropolitan Police (Non-Emergency)", number: "101", address: "South Kensington — nearest: Kensington Police Station" },
      hospital: { name: "St Mary's Hospital", address: "Praed Street, Paddington, London W2 1NY", url: "https://www.imperial.nhs.uk" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "Imperial College Sport", type: "Gym / Sports (student access)", url: "https://www.imperialcollegesport.com" },
      { name: "Hyde Park / Kensington Gardens", type: "Park (5 min walk)" },
      { name: "Natural History Museum", type: "Museum (free, adjacent to campus)", url: "https://www.nhm.ac.uk" },
      { name: "South Kensington / Chelsea", type: "Restaurants / Shopping" }
    ]
  },

  ucl: {
    city: "London, England, UK",
    courseLanguage: "English",
    languageNotes: "All degree programs in English. UCL's Language Centre is one of the largest in the UK, offering 25+ languages. IELTS minimum typically 6.5–7.5 by programme.",
    mapQuery: "University College London UCL, Bloomsbury, London",
    nearestAirport: { name: "London Heathrow Airport", code: "LHR", distanceKm: 26, mapsQuery: "London Heathrow Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "GBP",
      monthly: {
        dormRoom:          { min: 750,  max: 1350, label: "Student hall room — London" },
        sharedApartment:   { min: 800,  max: 1250, label: "Shared flat — Zone 1-2 (per person)" },
        studioApartment:   { min: 1400, max: 2100, label: "Studio flat" },
        twoBedroomApt:     { min: 2100, max: 3400, label: "2-bedroom flat" }
      },
      otherMonthly: {
        food:              { min: 250, max: 450 },
        transport:         { min: 100, max: 175, note: "Travelcard Zone 1-2 monthly ~£160. UCL is in central Bloomsbury." },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/London",
      notes: "UCL's Bloomsbury campus is very central. Students often share flats in zones 2-3 (Hackney, Islington, Stratford) for considerably lower rent while staying on the Tube."
    },
    rentalLinks: [
      { label: "Rightmove — London to rent", url: "https://www.rightmove.co.uk/property-to-rent/London.html" },
      { label: "SpareRoom — London", url: "https://www.spareroom.co.uk/flatshare/london" },
      { label: "Ideal Flatmate", url: "https://www.idealflatmate.co.uk" }
    ],
    importantContacts: {
      police: { name: "Metropolitan Police (Non-Emergency)", number: "101", address: "Holborn Police Station, 70 Theobald's Road, London WC1X 8NR" },
      hospital: { name: "University College Hospital (UCLH)", address: "235 Euston Road, London NW1 2BU", url: "https://www.uclh.nhs.uk" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "UCL Sport Bloomsbury Fitness Centre", type: "Gym / Pool (student access)", url: "https://studentsunionucl.org/sport" },
      { name: "Regent's Park", type: "Park / Open air theatre" },
      { name: "British Museum", type: "Museum (free, 5 min walk)", url: "https://www.britishmuseum.org" },
      { name: "Brunswick Centre", type: "Shopping / Cafés" }
    ]
  },

  edinburgh: {
    city: "Edinburgh, Scotland, UK",
    courseLanguage: "English",
    languageNotes: "All degree programs taught in English. Some joint-degree programs have components in European languages. IELTS minimum typically 6.5 overall.",
    mapQuery: "University of Edinburgh, Edinburgh, Scotland",
    nearestAirport: { name: "Edinburgh Airport", code: "EDI", distanceKm: 13, mapsQuery: "Edinburgh Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "GBP",
      monthly: {
        dormRoom:          { min: 500,  max: 900,  label: "Student hall room — Edinburgh" },
        sharedApartment:   { min: 550,  max: 850,  label: "Shared flat (per person)" },
        studioApartment:   { min: 850,  max: 1300, label: "Studio flat" },
        twoBedroomApt:     { min: 1200, max: 1900, label: "2-bedroom flat" }
      },
      otherMonthly: {
        food:              { min: 200, max: 380 },
        transport:         { min: 60,  max: 100, note: "Lothian Buses student monthly pass. City is very walkable." },
        utilities:         { min: 70,  max: 130 }
      },
      source: "https://numbeo.com/cost-of-living/in/Edinburgh",
      notes: "Edinburgh is more affordable than London and Oxford. The Newington, Bruntsfield, and Marchmont neighbourhoods are popular with students and offer better-value flats close to the main campus."
    },
    rentalLinks: [
      { label: "Rightmove — Edinburgh to rent", url: "https://www.rightmove.co.uk/property-to-rent/Edinburgh.html" },
      { label: "Zoopla — Edinburgh rentals", url: "https://www.zoopla.co.uk/to-rent/property/edinburgh/" },
      { label: "SpareRoom — Edinburgh", url: "https://www.spareroom.co.uk/flatshare/edinburgh" }
    ],
    importantContacts: {
      police: { name: "Police Scotland (Non-Emergency)", number: "101", address: "St Leonards Police Station, 14 St Leonard's Street, Edinburgh EH8 9QW" },
      hospital: { name: "Royal Infirmary of Edinburgh", address: "51 Little France Crescent, Edinburgh EH16 4SA", url: "https://www.nhslothian.scot" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "University of Edinburgh Sport & Exercise", type: "Gym / Pool (student access)", url: "https://www.ed.ac.uk/sport-exercise" },
      { name: "Arthur's Seat (Holyrood Park)", type: "Hiking / City views" },
      { name: "National Museum of Scotland", type: "Museum (free)", url: "https://www.nms.ac.uk" },
      { name: "Princes Street & Royal Mile", type: "Shopping / Restaurants / Historic" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // GERMANY
  // ───────────────────────────────────────────────────────────────────────────

  tum: {
    city: "Munich, Bavaria, Germany",
    courseLanguage: "German / English",
    languageNotes: "Most Bachelor programmes are taught in German. Many Master's programmes are fully in English — check each programme page. German language courses are available at TUM's language centre (Sprachenzentrum).",
    mapQuery: "Technical University of Munich TUM, Munich, Germany",
    nearestAirport: { name: "Munich Airport (Franz Josef Strauss)", code: "MUC", distanceKm: 37, mapsQuery: "Munich Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "EUR",
      monthly: {
        dormRoom:          { min: 280,  max: 600,  label: "Studentenwerk hall room (subsidised)" },
        sharedApartment:   { min: 600,  max: 950,  label: "Shared flat / WG (per person)" },
        studioApartment:   { min: 950,  max: 1500, label: "Studio apartment" },
        twoBedroomApt:     { min: 1500, max: 2400, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 200, max: 380 },
        transport:         { min: 0,   max: 50,  note: "TUM semester ticket covers all MVV public transport in Munich for free!" },
        utilities:         { min: 60,  max: 120 }
      },
      source: "https://numbeo.com/cost-of-living/in/Munich",
      notes: "Munich is expensive for Germany but the semester fee covers all public transport — a major saving. Studentenwerk subsidised halls are the most affordable option but have long waiting lists. Apply early."
    },
    rentalLinks: [
      { label: "Studentenwerk München (official halls)", url: "https://www.studierendenwerk-muenchen-oberbayern.de/wohnen/" },
      { label: "WG-Gesucht — Munich shared flats", url: "https://www.wg-gesucht.de/wg-zimmer-in-Muenchen.90.0.1.0.html" },
      { label: "Immoscout24 — Munich", url: "https://www.immobilienscout24.de/Suche/de/muenchen/muenchen/wohnung-mieten" }
    ],
    importantContacts: {
      police: { name: "Polizei München (Non-Emergency)", number: "089 2910-0", address: "Ettstraße 2, 80333 München" },
      hospital: { name: "Klinikum rechts der Isar (TUM University Hospital)", address: "Ismaninger Straße 22, 81675 München", url: "https://www.mri.tum.de" },
      emergencyNumber: "112 (Europe-wide)"
    },
    leisure: [
      { name: "TUM Hochschulsport", type: "Gym / 100+ sports (heavily subsidised for students)", url: "https://www.sport.tum.de" },
      { name: "English Garden (Englischer Garten)", type: "Park (largest urban park in Europe)" },
      { name: "Deutsches Museum", type: "Museum", url: "https://www.deutsches-museum.de" },
      { name: "Marienplatz / Viktualienmarkt", type: "City centre / Markets / Shopping" }
    ]
  },

  lmu_munich: {
    city: "Munich, Bavaria, Germany",
    courseLanguage: "German / English",
    languageNotes: "Bachelor programs primarily in German. Many Master's programs in English (especially in natural sciences and medicine). International programmes clearly labelled on the LMU website.",
    mapQuery: "Ludwig Maximilian University of Munich LMU, Munich, Germany",
    nearestAirport: { name: "Munich Airport (Franz Josef Strauss)", code: "MUC", distanceKm: 37, mapsQuery: "Munich Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "EUR",
      monthly: {
        dormRoom:          { min: 280,  max: 580,  label: "Studentenwerk hall room" },
        sharedApartment:   { min: 600,  max: 950,  label: "Shared flat / WG (per person)" },
        studioApartment:   { min: 900,  max: 1500, label: "Studio apartment" },
        twoBedroomApt:     { min: 1500, max: 2400, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 200, max: 380 },
        transport:         { min: 0,   max: 50,  note: "LMU semester ticket covers all Munich MVV public transport." },
        utilities:         { min: 60,  max: 120 }
      },
      source: "https://numbeo.com/cost-of-living/in/Munich",
      notes: "Same cost of living context as TUM (both are in Munich). LMU's main campus is in Maxvorstadt, a central and lively student district."
    },
    rentalLinks: [
      { label: "Studentenwerk München (official halls)", url: "https://www.studierendenwerk-muenchen-oberbayern.de/wohnen/" },
      { label: "WG-Gesucht — Munich shared flats", url: "https://www.wg-gesucht.de/wg-zimmer-in-Muenchen.90.0.1.0.html" },
      { label: "Immoscout24 — Munich", url: "https://www.immobilienscout24.de/Suche/de/muenchen/muenchen/wohnung-mieten" }
    ],
    importantContacts: {
      police: { name: "Polizei München (Non-Emergency)", number: "089 2910-0", address: "Ettstraße 2, 80333 München" },
      hospital: { name: "LMU Klinikum München", address: "Marchioninistraße 15, 81377 München", url: "https://www.lmu-klinikum.de" },
      emergencyNumber: "112"
    },
    leisure: [
      { name: "Hochschulsport LMU", type: "Gym / Sports (student rates)", url: "https://www.hochschulsport-muenchen.de" },
      { name: "English Garden", type: "Park / River surfing / Beer gardens" },
      { name: "Pinakothek Museums", type: "Art museums (free on Sundays)", url: "https://www.pinakothek.de" },
      { name: "Schwabing", type: "Student neighbourhood / Bars / Cafés" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CANADA
  // ───────────────────────────────────────────────────────────────────────────

  toronto: {
    city: "Toronto, Ontario, Canada",
    courseLanguage: "English",
    languageNotes: "All programs in English. U of T's School of Graduate Studies and undergraduate colleges have extensive English language support. French-language programs available at some faculties.",
    mapQuery: "University of Toronto, Toronto, Canada",
    nearestAirport: { name: "Toronto Pearson International Airport", code: "YYZ", distanceKm: 25, mapsQuery: "Toronto Pearson International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "CAD",
      monthly: {
        dormRoom:          { min: 900,  max: 1600, label: "On-campus residence" },
        sharedApartment:   { min: 900,  max: 1500, label: "Shared apartment — Toronto (per person)" },
        studioApartment:   { min: 1700, max: 2600, label: "Studio apartment" },
        twoBedroomApt:     { min: 2500, max: 3800, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 300, max: 550 },
        transport:         { min: 143, max: 160, note: "TTC monthly student pass ~$143 CAD" },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/Toronto",
      notes: "Toronto has seen rapid rent inflation. The Annex, Kensington, and Rosedale areas near U of T are popular but expensive. Students often look further east or west along transit lines for cheaper options."
    },
    rentalLinks: [
      { label: "Kijiji — Toronto apartments", url: "https://www.kijiji.ca/b-apartments-condos/city-of-toronto/c37l1700273" },
      { label: "PadMapper — Toronto rentals", url: "https://www.padmapper.com/apartments/toronto-on" },
      { label: "Craigslist Toronto Housing", url: "https://toronto.craigslist.org/search/apa" }
    ],
    importantContacts: {
      police: { name: "Toronto Police (Non-Emergency)", number: "+1 416-808-2222", address: "40 College Street, Toronto, ON M5G 2J3" },
      hospital: { name: "Toronto General Hospital", address: "200 Elizabeth Street, Toronto, ON M5G 2C4", url: "https://www.uhn.ca" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "University of Toronto Athletic Centre", type: "Gym / Pool (student access)", url: "https://kpe.utoronto.ca" },
      { name: "High Park", type: "Park / Cherry blossoms / Nature trails" },
      { name: "Royal Ontario Museum", type: "Museum", url: "https://www.rom.on.ca" },
      { name: "Kensington Market", type: "Markets / Food / Vintage shopping" }
    ]
  },

  mcgill: {
    city: "Montreal, Quebec, Canada",
    courseLanguage: "English",
    languageNotes: "McGill is an English-language university. However, Montreal is bilingual (English/French). Living in the city means French is widely used. McGill offers French language courses. Quebec residency may require French proficiency for certain employment.",
    mapQuery: "McGill University, Montreal, Quebec, Canada",
    nearestAirport: { name: "Montréal-Trudeau International Airport", code: "YUL", distanceKm: 22, mapsQuery: "Montreal Trudeau International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "CAD",
      monthly: {
        dormRoom:          { min: 750,  max: 1300, label: "On-campus residence" },
        sharedApartment:   { min: 600,  max: 1000, label: "Shared apartment — Montreal (per person)" },
        studioApartment:   { min: 1100, max: 1800, label: "Studio apartment" },
        twoBedroomApt:     { min: 1700, max: 2800, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 260, max: 480 },
        transport:         { min: 97,  max: 110, note: "STM monthly student pass ~$97 CAD" },
        utilities:         { min: 60,  max: 120 }
      },
      source: "https://numbeo.com/cost-of-living/in/Montreal",
      notes: "Montreal is one of the most affordable major student cities in North America. The Plateau-Mont-Royal and Mile End neighbourhoods near campus are popular, vibrant, and well-priced by Canadian standards."
    },
    rentalLinks: [
      { label: "Kijiji — Montreal apartments", url: "https://www.kijiji.ca/b-apartments-condos/ville-de-montreal/c37l1700281" },
      { label: "PadMapper — Montreal rentals", url: "https://www.padmapper.com/apartments/montreal-qc" },
      { label: "Craigslist Montreal Housing", url: "https://montreal.craigslist.org/search/apa" }
    ],
    importantContacts: {
      police: { name: "Service de police de la Ville de Montréal (Non-Emergency)", number: "+1 514-280-2222" },
      hospital: { name: "McGill University Health Centre (MUHC)", address: "1001 Boulevard Décarie, Montréal, QC H4A 3J1", url: "https://muhc.ca" },
      emergencyNumber: "911"
    },
    leisure: [
      { name: "McGill Athletics & Recreation", type: "Gym / Pool (student access)", url: "https://www.mcgill.ca/athletics" },
      { name: "Mont Royal Park", type: "Park / Hiking / Winter skating" },
      { name: "Montreal Museum of Fine Arts", type: "Museum", url: "https://www.mbam.qc.ca" },
      { name: "Old Montreal / Plateau-Mont-Royal", type: "Restaurants / Nightlife / Markets" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // AUSTRALIA
  // ───────────────────────────────────────────────────────────────────────────

  melbourne: {
    city: "Melbourne, Victoria, Australia",
    courseLanguage: "English",
    languageNotes: "All degree programs taught in English. University of Melbourne English Language Testing (MELTS) available. IELTS minimum typically 6.5–7.0 overall.",
    mapQuery: "University of Melbourne, Parkville, Victoria, Australia",
    nearestAirport: { name: "Melbourne Airport (Tullamarine)", code: "MEL", distanceKm: 22, mapsQuery: "Melbourne Airport Tullamarine" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "AUD",
      monthly: {
        dormRoom:          { min: 800,  max: 1400, label: "Student residential college" },
        sharedApartment:   { min: 700,  max: 1100, label: "Shared house (per person)" },
        studioApartment:   { min: 1300, max: 2000, label: "Studio apartment" },
        twoBedroomApt:     { min: 2000, max: 3000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 300, max: 500 },
        transport:         { min: 100, max: 150, note: "Myki monthly pass (zones 1-2) ~$130 AUD. Campus is in Parkville, easy tram access." },
        utilities:         { min: 80,  max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/Melbourne",
      notes: "Melbourne is Australia's most liveable city but is expensive. Carlton, Fitzroy, and Brunswick near the university offer better rental value with great cafe culture."
    },
    rentalLinks: [
      { label: "Domain — Melbourne rentals", url: "https://www.domain.com.au/rent/melbourne-vic/" },
      { label: "Realestate.com.au — Melbourne", url: "https://www.realestate.com.au/rent/in-melbourne,+vic/" },
      { label: "Flatmates.com.au — Melbourne", url: "https://flatmates.com.au/melbourne" }
    ],
    importantContacts: {
      police: { name: "Victoria Police (Non-Emergency)", number: "131 444", address: "Melbourne City Police Station, 313-315 Spencer Street, Melbourne VIC 3000" },
      hospital: { name: "Royal Melbourne Hospital", address: "300 Grattan Street, Parkville VIC 3050", url: "https://www.thermh.org.au" },
      emergencyNumber: "000"
    },
    leisure: [
      { name: "University of Melbourne Sport", type: "Gym / Sports (student access)", url: "https://sport.unimelb.edu.au" },
      { name: "Royal Botanic Gardens Victoria", type: "Gardens / Walking" },
      { name: "National Gallery of Victoria (NGV)", type: "Museum (free)", url: "https://www.ngv.vic.gov.au" },
      { name: "Queen Victoria Market", type: "Market / Food" }
    ]
  },

  anu: {
    city: "Canberra, ACT, Australia",
    courseLanguage: "English",
    languageNotes: "All programs in English. ANU is an international research university with strong English language support programs.",
    mapQuery: "Australian National University ANU, Canberra, Australia",
    nearestAirport: { name: "Canberra Airport", code: "CBR", distanceKm: 12, mapsQuery: "Canberra Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "AUD",
      monthly: {
        dormRoom:          { min: 700,  max: 1200, label: "ANU Hall of Residence" },
        sharedApartment:   { min: 600,  max: 950,  label: "Shared house (per person)" },
        studioApartment:   { min: 1100, max: 1700, label: "Studio apartment" },
        twoBedroomApt:     { min: 1700, max: 2600, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 280, max: 480 },
        transport:         { min: 80,  max: 130, note: "ACTION bus network. Canberra is car-friendly but less public-transit than Sydney/Melbourne." },
        utilities:         { min: 80,  max: 140 }
      },
      source: "https://numbeo.com/cost-of-living/in/Canberra",
      notes: "Canberra is less expensive than Sydney or Melbourne. As the national capital, it has government jobs, embassies, and a strong international student community."
    },
    rentalLinks: [
      { label: "Domain — Canberra rentals", url: "https://www.domain.com.au/rent/canberra-act/" },
      { label: "Flatmates.com.au — Canberra", url: "https://flatmates.com.au/canberra" },
      { label: "Realestate.com.au — Canberra", url: "https://www.realestate.com.au/rent/in-canberra,+act/" }
    ],
    importantContacts: {
      police: { name: "ACT Policing (Non-Emergency)", number: "131 444" },
      hospital: { name: "Canberra Hospital", address: "Yamba Drive, Garran ACT 2605", url: "https://www.health.act.gov.au/hospitals-and-health-centres/canberra-hospital" },
      emergencyNumber: "000"
    },
    leisure: [
      { name: "ANU Sport & Recreation", type: "Gym / Aquatic centre (student access)", url: "https://sport.anu.edu.au" },
      { name: "Black Mountain Peninsula", type: "Walking / Cycling trails" },
      { name: "National Gallery of Australia", type: "Museum (free)", url: "https://nga.gov.au" },
      { name: "Civic / Braddon", type: "Restaurants / Cafés / Night life" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SINGAPORE
  // ───────────────────────────────────────────────────────────────────────────

  nus: {
    city: "Singapore",
    courseLanguage: "English",
    languageNotes: "All NUS programs are taught in English. Singapore's official working language is English. Malay, Mandarin, and Tamil are also national languages — language electives available.",
    mapQuery: "National University of Singapore NUS, Kent Ridge, Singapore",
    nearestAirport: { name: "Singapore Changi Airport", code: "SIN", distanceKm: 22, mapsQuery: "Singapore Changi Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "SGD",
      monthly: {
        dormRoom:          { min: 350,  max: 700,  label: "On-campus student hostel" },
        sharedApartment:   { min: 800,  max: 1400, label: "Shared HDB flat (per person)" },
        studioApartment:   { min: 1500, max: 2500, label: "Studio apartment" },
        twoBedroomApt:     { min: 2500, max: 4000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 300, max: 550, note: "Hawker centres and canteens are very affordable. Restaurant dining adds up quickly." },
        transport:         { min: 80,  max: 130, note: "MRT + bus with EZ-Link card. Singapore public transit is excellent." },
        utilities:         { min: 80,  max: 160 }
      },
      source: "https://numbeo.com/cost-of-living/in/Singapore",
      notes: "Singapore is expensive for rented accommodation but on-campus hostels are heavily subsidised. Hawker food keeps food costs low. Overall student experience is very high value given world-class facilities."
    },
    rentalLinks: [
      { label: "PropertyGuru — Singapore rentals", url: "https://www.propertyguru.com.sg/property-for-rent" },
      { label: "99.co — Singapore rooms", url: "https://www.99.co/singapore/rent" },
      { label: "NUS Off-campus Housing Board", url: "https://nus.edu.sg/osa/student-services/housing/off-campus" }
    ],
    importantContacts: {
      police: { name: "Singapore Police Force (Non-Emergency)", number: "1800-255-0000" },
      hospital: { name: "National University Hospital (NUH)", address: "5 Lower Kent Ridge Road, Singapore 119074", url: "https://www.nuh.com.sg" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "NUS Sports & Recreation Centre", type: "Gym / Olympic Pool (student access)", url: "https://nus.edu.sg/src" },
      { name: "Kent Ridge Park", type: "Park / Walking trails near campus" },
      { name: "National Museum of Singapore", type: "Museum", url: "https://www.nationalmuseum.sg" },
      { name: "Gardens by the Bay / Sentosa", type: "Major attractions" }
    ]
  },

  ntu: {
    city: "Singapore (Jurong West)",
    courseLanguage: "English",
    languageNotes: "All NTU degree programs are taught in English. The university has a strong STEM and business focus. Language courses available as electives.",
    mapQuery: "Nanyang Technological University NTU, Jurong West, Singapore",
    nearestAirport: { name: "Singapore Changi Airport", code: "SIN", distanceKm: 36, mapsQuery: "Singapore Changi Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "SGD",
      monthly: {
        dormRoom:          { min: 300,  max: 680,  label: "On-campus hall of residence" },
        sharedApartment:   { min: 800,  max: 1300, label: "Shared HDB flat (per person)" },
        studioApartment:   { min: 1500, max: 2400, label: "Studio apartment" },
        twoBedroomApt:     { min: 2400, max: 3800, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 280, max: 500 },
        transport:         { min: 90,  max: 140, note: "MRT to Jurong East + campus shuttle. Campus is large and has its own internal bus." },
        utilities:         { min: 80,  max: 160 }
      },
      source: "https://numbeo.com/cost-of-living/in/Singapore",
      notes: "NTU's campus is one of the most beautiful in Asia — residential and self-contained. Most students live on campus. The Jurong area has grown significantly with great food and transport links."
    },
    rentalLinks: [
      { label: "PropertyGuru — Singapore rentals", url: "https://www.propertyguru.com.sg/property-for-rent" },
      { label: "99.co — Singapore rooms", url: "https://www.99.co/singapore/rent" }
    ],
    importantContacts: {
      police: { name: "Singapore Police Force (Non-Emergency)", number: "1800-255-0000" },
      hospital: { name: "Ng Teng Fong General Hospital", address: "1 Jurong East Street 21, Singapore 609606", url: "https://www.juronghealth.com.sg" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "NTU Sports & Recreation Centre", type: "Gym / Aquatic centre (student access)", url: "https://www.ntu.edu.sg/sport" },
      { name: "Jurong Lake Gardens", type: "Park / Gardens" },
      { name: "Science Centre Singapore", type: "Museum / Attractions", url: "https://www.science.edu.sg" },
      { name: "JEM / Westgate Mall (Jurong)", type: "Shopping / Restaurants" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CHINA
  // ───────────────────────────────────────────────────────────────────────────

  tsinghua: {
    city: "Beijing, China",
    courseLanguage: "Chinese (Mandarin) / English",
    languageNotes: "Most undergraduate programmes are taught in Mandarin Chinese. International students without Mandarin proficiency should look specifically at English-taught Master's programmes (many available in engineering, business, and science). Tsinghua also runs a Chinese language centre for international students.",
    mapQuery: "Tsinghua University, Haidian, Beijing, China",
    nearestAirport: { name: "Beijing Capital International Airport", code: "PEK", distanceKm: 32, mapsQuery: "Beijing Capital International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "CNY",
      monthly: {
        dormRoom:          { min: 500,  max: 1200, label: "International student dormitory" },
        sharedApartment:   { min: 2000, max: 4000, label: "Shared apartment — Haidian (per person)" },
        studioApartment:   { min: 3500, max: 6000, label: "Studio apartment" },
        twoBedroomApt:     { min: 5000, max: 9000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 600, max: 1200, note: "Campus canteen meals are very affordable (5–20 CNY per meal)" },
        transport:         { min: 100, max: 200, note: "Beijing Subway is excellent and cheap — ~2 CNY per ride" },
        utilities:         { min: 100, max: 200 }
      },
      source: "https://numbeo.com/cost-of-living/in/Beijing",
      notes: "International student dorms at Tsinghua are strongly recommended — affordable, on-campus, and the hub of the international student community. Off-campus Haidian rents have risen sharply."
    },
    rentalLinks: [
      { label: "Tsinghua International Student Housing", url: "https://is.tsinghua.edu.cn" },
      { label: "Ziroom — Beijing rentals", url: "https://www.ziroom.com/z/beijing/" },
      { label: "58.com — Beijing apartments", url: "https://bj.58.com/zufang/" }
    ],
    importantContacts: {
      police: { name: "Beijing Police (Emergency only)", number: "110" },
      hospital: { name: "Peking University Third Hospital", address: "49 Huayuan North Road, Haidian District, Beijing 100083", url: "https://www.puh3.net.cn" },
      emergencyNumber: "120 (medical) / 110 (police) / 119 (fire)"
    },
    leisure: [
      { name: "Tsinghua Sports Centre", type: "Gym / Olympic Pool (student access)" },
      { name: "Old Summer Palace (Yuanmingyuan)", type: "Historic park / Gardens — 5 min from campus" },
      { name: "Wudaokou", type: "Student nightlife hub / Shopping / International restaurants" },
      { name: "Summer Palace", type: "UNESCO World Heritage site — 15 min by bike" }
    ]
  },

  pku: {
    city: "Beijing, China",
    courseLanguage: "Chinese (Mandarin) / English",
    languageNotes: "Undergraduate programs primarily in Mandarin. Strong range of English-taught Master's and MBA programmes. PKU runs a Chinese Language program for international students (HSK preparation).",
    mapQuery: "Peking University PKU, Haidian, Beijing, China",
    nearestAirport: { name: "Beijing Capital International Airport", code: "PEK", distanceKm: 30, mapsQuery: "Beijing Capital International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "CNY",
      monthly: {
        dormRoom:          { min: 500,  max: 1100, label: "International student dormitory" },
        sharedApartment:   { min: 2000, max: 4000, label: "Shared apartment — Haidian (per person)" },
        studioApartment:   { min: 3500, max: 6000, label: "Studio apartment" },
        twoBedroomApt:     { min: 5000, max: 9000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 600, max: 1200 },
        transport:         { min: 100, max: 200 },
        utilities:         { min: 100, max: 200 }
      },
      source: "https://numbeo.com/cost-of-living/in/Beijing",
      notes: "PKU's campus is within Haidian — adjacent to Tsinghua. The campus itself is strikingly beautiful with a historic garden. On-campus dormitories recommended for first year."
    },
    rentalLinks: [
      { label: "PKU International Student Office", url: "https://iso.pku.edu.cn" },
      { label: "Ziroom — Beijing rentals", url: "https://www.ziroom.com/z/beijing/" }
    ],
    importantContacts: {
      police: { name: "Beijing Police", number: "110" },
      hospital: { name: "Peking University People's Hospital", address: "11 Xizhimen South Street, Xicheng District, Beijing 100044" },
      emergencyNumber: "120 (medical) / 110 (police)"
    },
    leisure: [
      { name: "PKU Gym & Sports Facilities", type: "Gym / Track / Indoor sports" },
      { name: "Weiming Lake (On-campus)", type: "Scenic walk / Picnics" },
      { name: "Wudaokou", type: "Student nightlife / Shopping" },
      { name: "National Museum of China", type: "Museum (free with passport)", url: "https://www.chnmuseum.cn" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SWITZERLAND
  // ───────────────────────────────────────────────────────────────────────────

  eth_zurich: {
    city: "Zurich, Switzerland",
    courseLanguage: "German / English",
    languageNotes: "Bachelor programmes primarily in German (Zurich's language). Master's programmes are largely in English, and ETH has been moving towards more English-taught courses. All international Master's applicants are NOT required to know German, but learning basic German is strongly recommended for daily life in Zurich.",
    mapQuery: "ETH Zurich, Rämistrasse, Zurich, Switzerland",
    nearestAirport: { name: "Zurich Airport (Kloten)", code: "ZRH", distanceKm: 11, mapsQuery: "Zurich Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "CHF",
      monthly: {
        dormRoom:          { min: 500,  max: 950,  label: "WOKO or ETH student housing (subsidised)" },
        sharedApartment:   { min: 900,  max: 1500, label: "Shared apartment — WG Zurich (per person)" },
        studioApartment:   { min: 1500, max: 2400, label: "Studio apartment" },
        twoBedroomApt:     { min: 2400, max: 3600, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 400, max: 700 },
        transport:         { min: 70,  max: 90,  note: "Zurich ZVV half-price card with student discount. ETH has two campuses connected by the Polybahn." },
        utilities:         { min: 80,  max: 140 }
      },
      source: "https://numbeo.com/cost-of-living/in/Zurich",
      notes: "Zurich is consistently ranked one of the world's most expensive cities. However, salaries, grants, and PhD stipends (CHF 4,000–5,000/month tax-free) are also among the best in the world. WOKO housing is the most affordable option — apply as soon as you are admitted."
    },
    rentalLinks: [
      { label: "WOKO Student Housing Zurich (official)", url: "https://www.woko.ch" },
      { label: "Homegate — Zurich rentals", url: "https://www.homegate.ch/mieten/immobilien/ort-zuerich/trefferliste" },
      { label: "WG-Zimmer.ch — Zurich shared flats", url: "https://www.wg-zimmer.ch/wohngemeinschaften/zh/zuerich" }
    ],
    importantContacts: {
      police: { name: "Stadtpolizei Zürich (Non-Emergency)", number: "044 411 71 17", address: "Bahnhofquai 3, 8021 Zürich" },
      hospital: { name: "University Hospital Zurich (USZ)", address: "Rämistrasse 100, 8091 Zürich", url: "https://www.usz.ch" },
      emergencyNumber: "112 (Europe-wide) / 117 (Police) / 144 (Medical)"
    },
    leisure: [
      { name: "ASVZ — Academic Sports Association Zurich", type: "Gym / 120+ sports (free for ETH students)", url: "https://www.asvz.ch" },
      { name: "Zürichsee (Lake Zurich)", type: "Swimming / Sailing / Walking" },
      { name: "Kunsthaus Zürich", type: "Art museum", url: "https://www.kunsthaus.ch" },
      { name: "Zurich Old Town (Altstadt) / Langstrasse", type: "Restaurants / Bars / Shopping" }
    ]
  },

  epfl: {
    city: "Lausanne, Vaud, Switzerland",
    courseLanguage: "French / English",
    languageNotes: "EPFL is in the French-speaking part of Switzerland. Bachelor programmes are predominantly in French. Most Master's programmes are taught in English. PhD programs are in English. Learning basic French is essential for daily life in Lausanne.",
    mapQuery: "EPFL École Polytechnique Fédérale de Lausanne, Switzerland",
    nearestAirport: { name: "Geneva Airport", code: "GVA", distanceKm: 65, mapsQuery: "Geneva Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "CHF",
      monthly: {
        dormRoom:          { min: 450,  max: 900,  label: "Agepoly / subsidised student housing" },
        sharedApartment:   { min: 700,  max: 1200, label: "Shared apartment — Lausanne (per person)" },
        studioApartment:   { min: 1200, max: 1900, label: "Studio apartment" },
        twoBedroomApt:     { min: 2000, max: 3200, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:              { min: 350, max: 650 },
        transport:         { min: 60,  max: 90,  note: "Lausanne's metro (M2) and buses. EPFL has its own metro stop (M1 — EPFL/Uni)." },
        utilities:         { min: 80,  max: 140 }
      },
      source: "https://numbeo.com/cost-of-living/in/Lausanne",
      notes: "Lausanne is expensive but slightly more affordable than Zurich. EPFL's campus is on Lake Geneva's shore with stunning mountain views. Student housing demand is high — apply early through Logement EPFL."
    },
    rentalLinks: [
      { label: "Logement EPFL (official housing)", url: "https://www.epfl.ch/campus/services/prestations/logement/" },
      { label: "Homegate — Lausanne rentals", url: "https://www.homegate.ch/mieten/immobilien/ort-lausanne/trefferliste" },
      { label: "WG-Zimmer.ch — Lausanne", url: "https://www.wg-zimmer.ch/wohngemeinschaften/vd/lausanne" }
    ],
    importantContacts: {
      police: { name: "Police Lausanne (Non-Emergency)", number: "021 315 15 15", address: "Avenue Louis-Ruchonnet 14, 1003 Lausanne" },
      hospital: { name: "CHUV — Centre Hospitalier Universitaire Vaudois", address: "Rue du Bugnon 46, 1011 Lausanne", url: "https://www.chuv.ch" },
      emergencyNumber: "112 / 117 (Police) / 144 (Medical)"
    },
    leisure: [
      { name: "EPFL Sports Centre", type: "Gym / Pool / 70+ sports (student access)", url: "https://sport.epfl.ch" },
      { name: "Lake Geneva (Lac Léman)", type: "Swimming / Sailing / Walking promenades" },
      { name: "Olympic Museum Lausanne", type: "Museum", url: "https://www.olympic.org/museum" },
      { name: "Lausanne Flon", type: "Nightlife / Restaurants / Shopping" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // JAPAN
  // ───────────────────────────────────────────────────────────────────────────

  tokyo: {
    city: "Tokyo (Bunkyo / Meguro), Japan",
    courseLanguage: "Japanese / English",
    languageNotes: "Undergraduate programs are predominantly in Japanese. A growing number of Master's and PhD programmes are available in English (especially in engineering and sciences). UTokyo's PEAK programme offers English-track undergraduate study. Japanese language proficiency (JLPT N2 minimum) is typically required for Japanese-taught programs.",
    mapQuery: "University of Tokyo Hongo Campus, Bunkyo, Tokyo, Japan",
    nearestAirport: { name: "Tokyo Narita International Airport", code: "NRT", distanceKm: 65, mapsQuery: "Tokyo Narita International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13",
      currency: "JPY",
      monthly: {
        dormRoom:          { min: 15000, max: 40000, label: "University dormitory (International House)" },
        sharedApartment:   { min: 40000, max: 80000, label: "Shared apartment — share house (per person)" },
        studioApartment:   { min: 65000, max: 120000, label: "1K studio apartment" },
        twoBedroomApt:     { min: 100000, max: 180000, label: "2LDK apartment" }
      },
      otherMonthly: {
        food:              { min: 25000, max: 45000, note: "Convenience stores and university canteens keep costs low" },
        transport:         { min: 10000, max: 20000, note: "Tokyo Suica/Pasmo. Most students use the Tokyo Metro." },
        utilities:         { min: 8000,  max: 15000 }
      },
      source: "https://numbeo.com/cost-of-living/in/Tokyo",
      notes: "Tokyo is more affordable than many expect for a global megacity, particularly for food and transport. University dormitories are extremely affordable but have limited spaces and waitlists. Key Yok apartment sites (Suumo, Homes) useful for off-campus search."
    },
    rentalLinks: [
      { label: "SUUMO — Tokyo rentals", url: "https://suumo.jp/chintai/tokyo/" },
      { label: "Homes — Tokyo apartments", url: "https://www.homes.co.jp/chintai/tokyo/" },
      { label: "Sakura House (gaijin houses)", url: "https://www.sakura-house.com" }
    ],
    importantContacts: {
      police: { name: "Tokyo Metropolitan Police (Non-Emergency)", number: "#9110", address: "Hongo Police Station, 2-9-3 Hongo, Bunkyo-ku, Tokyo" },
      hospital: { name: "The University of Tokyo Hospital", address: "7-3-1 Hongo, Bunkyo-ku, Tokyo 113-8655", url: "https://www.h.u-tokyo.ac.jp" },
      emergencyNumber: "119 (medical/fire) / 110 (police)"
    },
    leisure: [
      { name: "UTokyo Todai Sports", type: "Gym / Pool / Sports (student access)" },
      { name: "Ueno Park", type: "Park / Museums cluster / Cherry blossoms" },
      { name: "Tokyo National Museum", type: "Museum", url: "https://www.tnm.jp" },
      { name: "Akihabara / Shibuya / Shinjuku", type: "Shopping / Entertainment / Nightlife" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // NETHERLANDS
  // ───────────────────────────────────────────────────────────────────────────

  tu_delft: {
    city: "Delft, South Holland, Netherlands",
    courseLanguage: "Dutch / English",
    languageNotes: "Most Bachelor programmes in Dutch. The majority of Master's programmes are fully in English — TU Delft has one of the highest proportions of English Master's in continental Europe. No Dutch required for English-track programmes.",
    mapQuery: "Delft University of Technology, Delft, Netherlands",
    nearestAirport: { name: "Amsterdam Airport Schiphol", code: "AMS", distanceKm: 60, mapsQuery: "Amsterdam Airport Schiphol" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "EUR",
      monthly: {
        dormRoom:        { min: 350, max: 650,  label: "Student room (SSH student housing)" },
        sharedApartment: { min: 550, max: 850,  label: "Shared apartment / student house (per person)" },
        studioApartment: { min: 850, max: 1400, label: "Studio apartment" },
        twoBedroomApt:   { min: 1400, max: 2200, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 200, max: 380 },
        transport: { min: 80, max: 120, note: "OV-chipkaart. Intercity train to The Hague (10 min) and Rotterdam (12 min)." },
        utilities: { min: 60, max: 110 }
      },
      source: "https://numbeo.com/cost-of-living/in/Delft",
      notes: "Delft is a compact, cycle-friendly student city. SSH housing for international students is competitive — apply immediately upon admission. Delft is affordable compared to Amsterdam but demand is high."
    },
    rentalLinks: [
      { label: "SSH Student Housing Delft (official)", url: "https://www.sshxl.nl/en/cities/delft" },
      { label: "Kamernet — Delft rooms", url: "https://kamernet.nl/en/for-rent/rooms-delft" },
      { label: "Pararius — Delft apartments", url: "https://www.pararius.com/apartments/delft" }
    ],
    importantContacts: {
      police: { name: "Politie Delft (Non-Emergency)", number: "0900-8844", address: "Phoenixstraat 15, 2611 AL Delft" },
      hospital: { name: "Reinier de Graaf Hospital", address: "Reinier de Graafweg 5, 2625 AD Delft", url: "https://www.reinierdegraaf.nl" },
      emergencyNumber: "112"
    },
    leisure: [
      { name: "TU Delft Sports Centre", type: "Gym / Aquatic centre (student access)", url: "https://www.tudelft.nl/sport" },
      { name: "Old Town Delft (Markt)", type: "Historic canals / Restaurants / Cafés" },
      { name: "Vermeer Centre Delft", type: "Museum", url: "https://www.vermeerdelft.nl" },
      { name: "The Hague / Rotterdam", type: "Major cities — 10–15 min by train" }
    ]
  },

  uamsterdam: {
    city: "Amsterdam, Netherlands",
    courseLanguage: "Dutch / English",
    languageNotes: "Dutch-language Bachelor programmes alongside a strong portfolio of English-taught Masters. Many graduate programmes in sciences, economics, and humanities are fully English. Amsterdam has exceptional English-speaking culture — no Dutch needed day-to-day.",
    mapQuery: "University of Amsterdam, Amsterdam, Netherlands",
    nearestAirport: { name: "Amsterdam Airport Schiphol", code: "AMS", distanceKm: 17, mapsQuery: "Amsterdam Airport Schiphol" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "EUR",
      monthly: {
        dormRoom:        { min: 500, max: 900,  label: "Student room / campus housing" },
        sharedApartment: { min: 700, max: 1100, label: "Shared apartment (per person)" },
        studioApartment: { min: 1100, max: 1900, label: "Studio apartment" },
        twoBedroomApt:   { min: 1800, max: 3000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 250, max: 450 },
        transport: { min: 90, max: 130, note: "GVB tram/metro monthly pass. A bicycle replaces most transit in Amsterdam." },
        utilities: { min: 70, max: 130 }
      },
      source: "https://numbeo.com/cost-of-living/in/Amsterdam",
      notes: "Amsterdam's rental market is extremely tight and expensive. UvA's housing is limited. Students often search in Amsterdam-Oost, Noord, or Zaandam for affordable options. Apply for housing well before arrival."
    },
    rentalLinks: [
      { label: "DUWO — Student Housing Amsterdam", url: "https://www.duwo.nl/en/cities/amsterdam" },
      { label: "Pararius — Amsterdam apartments", url: "https://www.pararius.com/apartments/amsterdam" },
      { label: "Kamernet — Amsterdam rooms", url: "https://kamernet.nl/en/for-rent/rooms-amsterdam" }
    ],
    importantContacts: {
      police: { name: "Amsterdam Politie (Non-Emergency)", number: "0900-8844" },
      hospital: { name: "Amsterdam UMC (University Medical Centres)", address: "Meibergdreef 9, 1105 AZ Amsterdam", url: "https://www.amsterdamumc.org" },
      emergencyNumber: "112"
    },
    leisure: [
      { name: "UvA Sport Centre", type: "Gym / Sports (student access)", url: "https://sport.uva.nl" },
      { name: "Vondelpark / Oosterpark", type: "Parks / Open air relaxation" },
      { name: "Rijksmuseum / Van Gogh Museum", type: "Museums (student discounts)", url: "https://www.rijksmuseum.nl" },
      { name: "Jordaan / De Pijp", type: "Restaurants / Bars / Markets" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // AUSTRALIA
  // ───────────────────────────────────────────────────────────────────────────

  usydney: {
    city: "Sydney, New South Wales, Australia",
    courseLanguage: "English",
    languageNotes: "All degree programs taught in English. IELTS minimum typically 6.5 overall. University of Sydney has excellent English language support and a large international student cohort.",
    mapQuery: "University of Sydney, Camperdown, NSW, Australia",
    nearestAirport: { name: "Sydney Kingsford Smith Airport", code: "SYD", distanceKm: 11, mapsQuery: "Sydney Airport Kingsford Smith" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "AUD",
      monthly: {
        dormRoom:        { min: 950,  max: 1700, label: "Student residence hall" },
        sharedApartment: { min: 800,  max: 1300, label: "Shared house (per person)" },
        studioApartment: { min: 1500, max: 2400, label: "Studio apartment" },
        twoBedroomApt:   { min: 2400, max: 3800, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 320, max: 550 },
        transport: { min: 120, max: 160, note: "Opal card monthly. Trains, buses and light rail connect campus to the city." },
        utilities: { min: 90, max: 160 }
      },
      source: "https://numbeo.com/cost-of-living/in/Sydney",
      notes: "Sydney is one of Australia's most expensive cities. Glebe, Newtown, and Redfern near campus offer better value. International students can work up to 48 hours per fortnight on a student visa."
    },
    rentalLinks: [
      { label: "Domain — Sydney rentals", url: "https://www.domain.com.au/rent/sydney-nsw/" },
      { label: "Flatmates.com.au — Sydney", url: "https://flatmates.com.au/sydney" },
      { label: "Realestate.com.au — Sydney", url: "https://www.realestate.com.au/rent/in-sydney,+nsw/" }
    ],
    importantContacts: {
      police: { name: "NSW Police (Non-Emergency)", number: "131 444", address: "Newtown Police Station, 160 King Street, Newtown NSW 2042" },
      hospital: { name: "Royal Prince Alfred Hospital", address: "50 Missenden Road, Camperdown NSW 2050", url: "https://www.slhd.nsw.gov.au/rpa" },
      emergencyNumber: "000"
    },
    leisure: [
      { name: "University of Sydney Sport & Fitness", type: "Gym / Pool (student access)", url: "https://sydney.edu.au/campus-life/sport-fitness" },
      { name: "Newtown / Glebe", type: "Cafés / Markets / Bars (walkable from campus)" },
      { name: "Bondi Beach", type: "Beach / Surf (20 min by bus)" },
      { name: "Royal Botanic Garden Sydney", type: "Gardens / Walking", url: "https://www.rbgsyd.nsw.gov.au" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SOUTH KOREA
  // ───────────────────────────────────────────────────────────────────────────

  snu: {
    city: "Seoul (Gwanak-gu), South Korea",
    courseLanguage: "Korean / English",
    languageNotes: "Most undergraduate programs in Korean. Growing number of English-taught graduate programs, especially in engineering, business, and international studies. Korean proficiency (TOPIK Level 3+) generally required for Korean-track programs. Graduate International programs (GIP) are English-only.",
    mapQuery: "Seoul National University, Gwanak-gu, Seoul, South Korea",
    nearestAirport: { name: "Incheon International Airport", code: "ICN", distanceKm: 52, mapsQuery: "Incheon International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "KRW",
      monthly: {
        dormRoom:        { min: 200000, max: 500000, label: "On-campus dormitory (Gwanak)" },
        sharedApartment: { min: 400000, max: 800000, label: "Shared apartment / gosiwon (per person)" },
        studioApartment: { min: 600000, max: 1200000, label: "One-room studio (officetel)" },
        twoBedroomApt:   { min: 1000000, max: 1800000, label: "2-bedroom apartment (often key money/jeonse system)" }
      },
      otherMonthly: {
        food:      { min: 200000, max: 400000, note: "Campus cafeteria meals from ₩3,000-6,000. Korean street food is affordable." },
        transport: { min: 50000, max: 90000, note: "T-money card for Seoul Metro + bus. Monthly pass ~₩55,000." },
        utilities: { min: 60000, max: 120000 }
      },
      source: "https://numbeo.com/cost-of-living/in/Seoul",
      notes: "Seoul is affordable compared to Tokyo or Singapore. SNU's dormitories are heavily subsidised. Note: Korean rental system uses 'jeonse' (large lump-sum deposit) — international students typically use monthly-rent (wolse) apartments or gosiwon rooms."
    },
    rentalLinks: [
      { label: "Zigbang — Seoul apartments (Korean)", url: "https://www.zigbang.com" },
      { label: "Dabang — Seoul rooms", url: "https://www.dabangapp.com" },
      { label: "SNU International Office Housing", url: "https://oia.snu.ac.kr" }
    ],
    importantContacts: {
      police: { name: "Seoul Metropolitan Police (Non-Emergency)", number: "182", address: "Gwanak Police Station, 26 Sillim-ro, Gwanak-gu, Seoul" },
      hospital: { name: "Seoul National University Hospital", address: "101 Daehak-ro, Jongno-gu, Seoul 03080", url: "https://www.snuh.org" },
      emergencyNumber: "119 (medical/fire) / 112 (police)"
    },
    leisure: [
      { name: "SNU Sports Complex", type: "Gym / Track / Indoor sports" },
      { name: "Gwanak Mountain (Gwanaksan)", type: "Hiking trail — on campus perimeter" },
      { name: "Sinchon / Hongdae", type: "Student nightlife / Shopping / Cafés" },
      { name: "National Museum of Korea", type: "Museum (free)", url: "https://www.museum.go.kr" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FRANCE
  // ───────────────────────────────────────────────────────────────────────────

  sciences_po: {
    city: "Paris (7th arrondissement), France",
    courseLanguage: "French / English",
    languageNotes: "Sciences Po is truly bilingual. Most undergraduate tracks are in French but the undergraduate college at Reims and many Paris Master's programmes are in English. Strong language requirement: students must reach C1 in a second language by graduation. French A2 minimum recommended for Paris campus life.",
    mapQuery: "Sciences Po Paris, Rue Saint-Guillaume, Paris, France",
    nearestAirport: { name: "Paris Charles de Gaulle Airport", code: "CDG", distanceKm: 27, mapsQuery: "Paris Charles de Gaulle Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "EUR",
      monthly: {
        dormRoom:        { min: 400, max: 900,  label: "CROUS student residence (subsidised)" },
        sharedApartment: { min: 700, max: 1100, label: "Shared flat — Paris (per person)" },
        studioApartment: { min: 900, max: 1700, label: "Studio / chambre de bonne" },
        twoBedroomApt:   { min: 1600, max: 2800, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 280, max: 500, note: "CROUS university canteens serve meals from €1 for students in financial need." },
        transport: { min: 86, max: 100, note: "Navigo monthly pass (all zones) = €86.40. Sciences Po is in the 7th, served by Metro 12, 13." },
        utilities: { min: 60, max: 120 }
      },
      source: "https://numbeo.com/cost-of-living/in/Paris",
      notes: "Paris is expensive, but France's social system subsidises student housing (CROUS) and meals heavily. Apply for CAF housing benefit (APL) as soon as you arrive — it can cover €100-200/month of rent."
    },
    rentalLinks: [
      { label: "CROUS Paris student housing (official)", url: "https://www.crous-paris.fr/logements/" },
      { label: "SeLoger — Paris rentals", url: "https://www.seloger.com/immobilier/locations/immo-paris-75/" },
      { label: "Appartager — Paris flatshares", url: "https://www.appartager.com/annonces/paris/" }
    ],
    importantContacts: {
      police: { name: "Police Nationale (Non-Emergency)", number: "17", address: "Commissariat du 7e — 9 Rue Fabert, 75007 Paris" },
      hospital: { name: "Hôpital européen Georges-Pompidou", address: "20 Rue Leblanc, 75015 Paris", url: "https://www.aphp.fr" },
      emergencyNumber: "15 (medical SAMU) / 17 (police) / 18 (fire)"
    },
    leisure: [
      { name: "Sciences Po Student Gym", type: "Gym (student access)" },
      { name: "Jardin du Luxembourg", type: "Park / Running — 5 min walk" },
      { name: "Musée d'Orsay", type: "Museum (free under 26 for EU citizens)", url: "https://www.musee-orsay.fr" },
      { name: "Saint-Germain-des-Prés", type: "Cafés / Bookshops / Restaurants" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SWEDEN
  // ───────────────────────────────────────────────────────────────────────────

  kth: {
    city: "Stockholm, Sweden",
    courseLanguage: "Swedish / English",
    languageNotes: "Bachelor programmes primarily in Swedish. All Master's programmes at KTH are taught in English — one of the most English-friendly technical universities in Europe. No Swedish required for Master's applicants.",
    mapQuery: "KTH Royal Institute of Technology, Stockholm, Sweden",
    nearestAirport: { name: "Stockholm Arlanda Airport", code: "ARN", distanceKm: 42, mapsQuery: "Stockholm Arlanda Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "SEK",
      monthly: {
        dormRoom:        { min: 3000, max: 6000,  label: "KTH student corridor / Studentbostäder" },
        sharedApartment: { min: 5000, max: 8000,  label: "Shared apartment (per person)" },
        studioApartment: { min: 8000, max: 14000, label: "Studio apartment" },
        twoBedroomApt:   { min: 13000, max: 20000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 2500, max: 5000 },
        transport: { min: 690,  max: 1000, note: "SL monthly pass = ~690 SEK. KTH campus is on Metro (Tekniska högskolan)." },
        utilities: { min: 500,  max: 900 }
      },
      source: "https://numbeo.com/cost-of-living/in/Stockholm",
      notes: "Stockholm is expensive. KTH's main campus is connected by Metro (red line) to central Stockholm. Student housing is subsidised but waitlists are long — apply through KTH Housing before accepting your place."
    },
    rentalLinks: [
      { label: "KTH Housing (official)", url: "https://www.kth.se/student/studentliv/boende" },
      { label: "Studentbostäder i Norden — Stockholm", url: "https://www.sin.se" },
      { label: "Blocket — Stockholm rentals (Swedish)", url: "https://www.blocket.se/bostad/hyra/stockholm" }
    ],
    importantContacts: {
      police: { name: "Polisen Stockholm (Non-Emergency)", number: "114 14" },
      hospital: { name: "Karolinska University Hospital", address: "171 76 Stockholm (Solna)", url: "https://www.karolinska.se" },
      emergencyNumber: "112"
    },
    leisure: [
      { name: "KTH Sport", type: "Gym / Sports (student access)", url: "https://www.kth.se/student/studentliv/idrott" },
      { name: "Djurgården Island", type: "Park / Cycling / Museums" },
      { name: "ABBA The Museum / Vasa Museum", type: "Museums", url: "https://www.vasamuseet.se" },
      { name: "Södermalm", type: "Cafés / Bars / Independent shops" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // IRELAND
  // ───────────────────────────────────────────────────────────────────────────

  trinity_dublin: {
    city: "Dublin 2, Ireland",
    courseLanguage: "English",
    languageNotes: "All programmes taught in English. Some programmes include Irish language modules. Trinity is one of the few English-language European universities outside the UK — strong attraction for international students.",
    mapQuery: "Trinity College Dublin, College Green, Dublin, Ireland",
    nearestAirport: { name: "Dublin Airport", code: "DUB", distanceKm: 12, mapsQuery: "Dublin Airport Ireland" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "EUR",
      monthly: {
        dormRoom:        { min: 700,  max: 1200, label: "Trinity on-campus accommodation" },
        sharedApartment: { min: 750,  max: 1200, label: "Shared house / apartment (per person)" },
        studioApartment: { min: 1300, max: 2100, label: "Studio apartment" },
        twoBedroomApt:   { min: 2000, max: 3300, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 280, max: 500 },
        transport: { min: 100, max: 150, note: "Leap Card monthly capping. Dublin city is walkable / cycleable from campus." },
        utilities: { min: 70, max: 130 }
      },
      source: "https://numbeo.com/cost-of-living/in/Dublin",
      notes: "Dublin has a severe housing crisis. On-campus accommodation is limited and highly competitive. Many students live in Rathmines, Ranelagh, Drumcondra, and Phibsborough — good value areas with strong bus links. Apply for accommodation immediately upon receiving your offer."
    },
    rentalLinks: [
      { label: "Daft.ie — Dublin rentals", url: "https://www.daft.ie/dublin/residential-properties-for-rent/" },
      { label: "Myhome.ie — Dublin flats", url: "https://www.myhome.ie/residential/to-let/dublin/" },
      { label: "SpareRoom — Dublin", url: "https://www.spareroom.ie/flatshare/dublin" }
    ],
    importantContacts: {
      police: { name: "An Garda Síochána (Non-Emergency)", number: "1800 666 111", address: "Pearse Street Garda Station, Dublin 2" },
      hospital: { name: "St James's Hospital", address: "James's Street, Dublin 8", url: "https://www.stjames.ie" },
      emergencyNumber: "999 / 112"
    },
    leisure: [
      { name: "Trinity Sport (Iveagh Grounds)", type: "Gym / Sports (student access)", url: "https://www.trinitysport.ie" },
      { name: "Trinity College Grounds & Book of Kells", type: "Historic campus / Tourist attraction" },
      { name: "National Gallery of Ireland", type: "Museum (free)", url: "https://www.nationalgallery.ie" },
      { name: "Temple Bar / Grafton Street", type: "Bars / Restaurants / Shopping" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // INDIA
  // ───────────────────────────────────────────────────────────────────────────

  iit_bombay: {
    city: "Powai, Mumbai, Maharashtra, India",
    courseLanguage: "English",
    languageNotes: "All IIT programmes are taught entirely in English. Hindi and Marathi are widely spoken in Mumbai but not required for academic study.",
    mapQuery: "IIT Bombay, Powai, Mumbai, India",
    nearestAirport: { name: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM", distanceKm: 8, mapsQuery: "Mumbai Chhatrapati Shivaji International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "INR",
      monthly: {
        dormRoom:        { min: 3000,  max: 8000,  label: "IIT Bombay hostel (subsidised, on-campus)" },
        sharedApartment: { min: 8000,  max: 18000, label: "Shared apartment — Powai / Vikhroli (per person)" },
        studioApartment: { min: 18000, max: 35000, label: "1BHK apartment — Powai" },
        twoBedroomApt:   { min: 30000, max: 60000, label: "2BHK apartment" }
      },
      otherMonthly: {
        food:      { min: 3000, max: 8000, note: "IIT canteen (mess) meals from ₹50-100. Powai has good restaurants." },
        transport: { min: 500, max: 2000, note: "Auto-rickshaw, local train (closest: Kanjurmarg). Uber/Ola widely used." },
        utilities: { min: 1000, max: 3000 }
      },
      source: "https://numbeo.com/cost-of-living/in/Mumbai",
      notes: "IIT Bombay has an excellent self-contained campus in Powai with hostels, sports, and facilities. Almost all students live on campus. Living costs are very low within the campus ecosystem."
    },
    rentalLinks: [
      { label: "MagicBricks — Powai rentals", url: "https://www.magicbricks.com/property-for-rent/residential-real-estate?proptype=Multistorey-Apartment,Builder-Floor-Apartment,Penthouse,Studio-Apartment&cityName=Mumbai&Location=Powai" },
      { label: "NoBroker — Mumbai flats", url: "https://www.nobroker.in/property/rent/flat/Mumbai" }
    ],
    importantContacts: {
      police: { name: "Powai Police Station", number: "+91-22-2578-0909", address: "IIT Market, Powai, Mumbai 400076" },
      hospital: { name: "Hiranandani Hospital Powai", address: "Dr. Antonio Da Silva Road, Powai, Mumbai 400076", url: "https://www.hiranandanihospital.org" },
      emergencyNumber: "112 (national) / 100 (police) / 108 (ambulance)"
    },
    leisure: [
      { name: "IIT Bombay Sports Complex", type: "Gym / Olympic pool / 40+ sports (student access)" },
      { name: "Powai Lake", type: "Walking / Running / Birdwatching" },
      { name: "Kala Ghoda Arts District", type: "Art galleries / Cafés / Culture (30 min by taxi)" },
      { name: "Juhu Beach / Marine Drive", type: "Beach / Promenade" }
    ]
  },

  iit_delhi: {
    city: "Hauz Khas, New Delhi, India",
    courseLanguage: "English",
    languageNotes: "All IIT programmes taught in English. Hindi is the dominant spoken language in Delhi but academic instruction is entirely in English.",
    mapQuery: "IIT Delhi, Hauz Khas, New Delhi, India",
    nearestAirport: { name: "Indira Gandhi International Airport", code: "DEL", distanceKm: 15, mapsQuery: "Indira Gandhi International Airport Delhi" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "INR",
      monthly: {
        dormRoom:        { min: 2500,  max: 7000,  label: "IIT Delhi hostel (subsidised, on-campus)" },
        sharedApartment: { min: 6000,  max: 15000, label: "Shared apartment — Hauz Khas / Munirka (per person)" },
        studioApartment: { min: 15000, max: 30000, label: "1BHK apartment" },
        twoBedroomApt:   { min: 25000, max: 50000, label: "2BHK apartment" }
      },
      otherMonthly: {
        food:      { min: 2500, max: 7000, note: "Campus mess food from ₹40-80 per meal." },
        transport: { min: 500, max: 2000, note: "Delhi Metro (Yellow Line — Hauz Khas station nearby). Excellent coverage." },
        utilities: { min: 800, max: 2500 }
      },
      source: "https://numbeo.com/cost-of-living/in/New-Delhi",
      notes: "IIT Delhi's campus in South Delhi is excellent. Nearly all students live in hostels on campus. Hauz Khas and Malviya Nagar nearby offer great food and shopping options."
    },
    rentalLinks: [
      { label: "MagicBricks — South Delhi rentals", url: "https://www.magicbricks.com/property-for-rent/residential-real-estate?proptype=Multistorey-Apartment&cityName=New-Delhi&Location=Hauz-Khas" },
      { label: "NoBroker — Delhi flats", url: "https://www.nobroker.in/property/rent/flat/Delhi" }
    ],
    importantContacts: {
      police: { name: "Hauz Khas Police Station", number: "+91-11-2656-2323", address: "IIT Gate, Hauz Khas, New Delhi 110016" },
      hospital: { name: "AIIMS (All India Institute of Medical Sciences)", address: "Ansari Nagar East, New Delhi 110029", url: "https://www.aiims.edu" },
      emergencyNumber: "112 / 100 (police) / 108 (ambulance)"
    },
    leisure: [
      { name: "IIT Delhi Sports Complex", type: "Gym / Pool / Multi-sports" },
      { name: "Hauz Khas Village & Lake", type: "Restaurants / Art galleries / Ruins" },
      { name: "Lodhi Garden", type: "Historic park / Walking" },
      { name: "Qutub Minar / Red Fort", type: "UNESCO World Heritage sites (Delhi)" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SOUTH AFRICA
  // ───────────────────────────────────────────────────────────────────────────

  uct: {
    city: "Rondebosch, Cape Town, South Africa",
    courseLanguage: "English",
    languageNotes: "All UCT programmes are taught in English. South Africa has 11 official languages — Afrikaans and Xhosa are widely spoken in Cape Town, but the academic environment is entirely English.",
    mapQuery: "University of Cape Town, Rondebosch, Cape Town, South Africa",
    nearestAirport: { name: "Cape Town International Airport", code: "CPT", distanceKm: 22, mapsQuery: "Cape Town International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "ZAR",
      monthly: {
        dormRoom:        { min: 3000,  max: 7000,  label: "UCT residence hall" },
        sharedApartment: { min: 3000,  max: 7000,  label: "Shared house — Rondebosch / Observatory (per person)" },
        studioApartment: { min: 7000,  max: 14000, label: "Studio apartment" },
        twoBedroomApt:   { min: 12000, max: 22000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 1500, max: 3500, note: "Campus food is affordable. Cape Town's food scene is excellent at all price points." },
        transport: { min: 300, max: 800, note: "MyCiTi Bus or Uber. Cape Town is very car-dependent outside central areas." },
        utilities: { min: 500, max: 1200 }
      },
      source: "https://numbeo.com/cost-of-living/in/Cape-Town",
      notes: "Cape Town is affordable for international students. UCT's famous mountainside campus is one of the most beautiful in the world. Observatory, Rondebosch, and Newlands near campus have strong student communities."
    },
    rentalLinks: [
      { label: "Private Property — Cape Town rentals", url: "https://www.privateproperty.co.za/to-rent/western-cape/cape-town" },
      { label: "Property24 — Cape Town", url: "https://www.property24.com/to-rent/cape-town/western-cape/10019" },
      { label: "Gumtree — Cape Town rooms", url: "https://www.gumtree.co.za/l-flats-apartments-for-rent/cape-town/" }
    ],
    importantContacts: {
      police: { name: "South African Police (Non-Emergency)", number: "10111", address: "Rondebosch Police Station, Thornton Road, Rondebosch, Cape Town" },
      hospital: { name: "Groote Schuur Hospital", address: "Main Road, Observatory, Cape Town 7925", url: "https://www.westerncape.gov.za/your_gov/157" },
      emergencyNumber: "10111 (police) / 10177 (ambulance)"
    },
    leisure: [
      { name: "UCT Sports Centre", type: "Gym / Aquatic centre (student access)" },
      { name: "Table Mountain National Park", type: "Hiking / Cable car — on campus doorstep" },
      { name: "Cape Point / Boulders Beach", type: "Day trips from Cape Town" },
      { name: "Long Street / Woodstock", type: "Restaurants / Bars / Creative spaces" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ITALY
  // ───────────────────────────────────────────────────────────────────────────

  bocconi: {
    city: "Milan (Bocconi Campus), Italy",
    courseLanguage: "Italian / English",
    languageNotes: "Bocconi offers a strong mix of Italian and English programmes. All undergraduate programmes are available in English (or bilingual). Master's programmes are predominantly in English. Milan's business community is bilingual — Italian is very helpful for social life and local internships.",
    mapQuery: "Bocconi University, Via Sarfatti, Milan, Italy",
    nearestAirport: { name: "Milan Malpensa Airport", code: "MXP", distanceKm: 47, mapsQuery: "Milan Malpensa Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "EUR",
      monthly: {
        dormRoom:        { min: 650,  max: 1200, label: "Bocconi Residence / student accommodation" },
        sharedApartment: { min: 600,  max: 1000, label: "Shared apartment — Navigli / Porta Romana (per person)" },
        studioApartment: { min: 1000, max: 1700, label: "Monolocale (studio)" },
        twoBedroomApt:   { min: 1500, max: 2500, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 250, max: 450 },
        transport: { min: 35, max: 60, note: "ATM Milan monthly pass ~€35 (under-26 student rate). Metro/tram covers the city." },
        utilities: { min: 70, max: 130 }
      },
      source: "https://numbeo.com/cost-of-living/in/Milan",
      notes: "Milan is expensive for Italy but Bocconi's location near Navigli and Porta Romana offers a good student neighbourhood. The university has strong industry connections — internship opportunities in finance, fashion, and consulting are exceptional."
    },
    rentalLinks: [
      { label: "Bocconi Accommodation Office", url: "https://www.unibocconi.eu/accommodation" },
      { label: "Idealista — Milan rentals", url: "https://www.idealista.it/en/affitto/abitazioni/milano-provincia/" },
      { label: "Immobiliare.it — Milan", url: "https://www.immobiliare.it/affitto-case/milano/" }
    ],
    importantContacts: {
      police: { name: "Polizia di Stato (Non-Emergency)", number: "113", address: "Questura di Milano, Via Fatebenefratelli 11, 20121 Milano" },
      hospital: { name: "Policlinico di Milano", address: "Via Francesco Sforza 35, 20122 Milano", url: "https://www.policlinico.mi.it" },
      emergencyNumber: "112 (Europe-wide) / 118 (medical emergency Italy)"
    },
    leisure: [
      { name: "Bocconi Sport Centre", type: "Gym / Sports (student access)", url: "https://www.unibocconi.eu/sport" },
      { name: "Navigli Canals", type: "Bars / Aperitivo / Walking — 10 min walk" },
      { name: "Pinacoteca di Brera / Triennale Milano", type: "Art museums", url: "https://www.brera.beniculturali.it" },
      { name: "Duomo di Milano", type: "Cathedral / Historic centre — 15 min by Metro" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // NEW ZEALAND
  // ───────────────────────────────────────────────────────────────────────────

  uauckland: {
    city: "Auckland City Centre, New Zealand",
    courseLanguage: "English",
    languageNotes: "All University of Auckland programmes are taught in English. IELTS minimum typically 6.5 overall. New Zealand is an English-speaking country with a diverse, international university community.",
    mapQuery: "University of Auckland, Auckland City Centre, New Zealand",
    nearestAirport: { name: "Auckland International Airport", code: "AKL", distanceKm: 21, mapsQuery: "Auckland International Airport New Zealand" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "NZD",
      monthly: {
        dormRoom:        { min: 900,  max: 1500, label: "Student residence hall" },
        sharedApartment: { min: 700,  max: 1200, label: "Shared house (per person)" },
        studioApartment: { min: 1300, max: 2000, label: "Studio apartment" },
        twoBedroomApt:   { min: 2000, max: 3200, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 300, max: 500 },
        transport: { min: 120, max: 180, note: "AT Hop card. Most students bike or take buses in the inner city." },
        utilities: { min: 80, max: 150 }
      },
      source: "https://numbeo.com/cost-of-living/in/Auckland",
      notes: "Auckland is New Zealand's most expensive city. The city centre campus means students have access to great urban amenities. Ponsonby, Mount Eden, and Kingsland near campus are popular, lively student areas."
    },
    rentalLinks: [
      { label: "Trade Me — Auckland rentals", url: "https://www.trademe.co.nz/a/property/residential/rent/auckland" },
      { label: "Flatmates.co.nz — Auckland", url: "https://www.flatmates.co.nz/auckland" },
      { label: "Realestate.co.nz — Auckland", url: "https://www.realestate.co.nz/residential/rent/auckland" }
    ],
    importantContacts: {
      police: { name: "New Zealand Police (Non-Emergency)", number: "105", address: "Auckland City Police Station, 11 Howe Street, Auckland 1010" },
      hospital: { name: "Auckland City Hospital", address: "2 Park Road, Grafton, Auckland 1023", url: "https://www.adhb.govt.nz" },
      emergencyNumber: "111"
    },
    leisure: [
      { name: "University of Auckland Sport & Recreation", type: "Gym / Pool (student access)", url: "https://www.auckland.ac.nz/sport" },
      { name: "Auckland Domain / Wintergardens", type: "Park / Botanic gardens" },
      { name: "Auckland War Memorial Museum", type: "Museum (discounted for students)", url: "https://www.aucklandmuseum.com" },
      { name: "Piha Beach / Waiheke Island", type: "Beach / Day trips" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // BELGIUM
  // ───────────────────────────────────────────────────────────────────────────

  ku_leuven: {
    city: "Leuven, Flemish Brabant, Belgium",
    courseLanguage: "Dutch / English",
    languageNotes: "KU Leuven is a Dutch-language university. However, it has an extensive range of English-taught Master's programmes across engineering, sciences, business, and humanities. Dutch knowledge not required for English programmes, but useful for daily life in Leuven. Brussels (30 min away) is French/Dutch bilingual.",
    mapQuery: "KU Leuven, Leuven, Belgium",
    nearestAirport: { name: "Brussels Airport (Zaventem)", code: "BRU", distanceKm: 25, mapsQuery: "Brussels Airport Zaventem" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "EUR",
      monthly: {
        dormRoom:        { min: 350, max: 650,  label: "Alma student residence (KU Leuven)" },
        sharedApartment: { min: 400, max: 700,  label: "Shared student house (per person)" },
        studioApartment: { min: 650, max: 1100, label: "Studio apartment" },
        twoBedroomApt:   { min: 1000, max: 1700, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 200, max: 380 },
        transport: { min: 60,  max: 100, note: "De Lijn bus pass. Trains to Brussels Midi: 30 min (Thalys/Eurostar connections)." },
        utilities: { min: 60, max: 110 }
      },
      source: "https://numbeo.com/cost-of-living/in/Leuven",
      notes: "Leuven is one of the most affordable university cities in Western Europe. It is entirely shaped around the university — student culture is central to city life. Excellent Belgian food, beer culture, and proximity to Brussels make it a very liveable choice."
    },
    rentalLinks: [
      { label: "Alma Student Housing KU Leuven (official)", url: "https://www.kuleuven.be/english/life-at-ku-leuven/housing" },
      { label: "Immoweb — Leuven rentals", url: "https://www.immoweb.be/en/search/apartment/for-rent?countries=BE&postalCodes=BE-3000" },
      { label: "Kotplaats — student rooms Leuven", url: "https://www.kotplaats.be/huur/leuven" }
    ],
    importantContacts: {
      police: { name: "Leuven Politie (Non-Emergency)", number: "016 21 17 00", address: "Philipssite 4, 3001 Leuven" },
      hospital: { name: "UZ Leuven (University Hospitals Leuven)", address: "Herestraat 49, 3000 Leuven", url: "https://www.uzleuven.be" },
      emergencyNumber: "112"
    },
    leisure: [
      { name: "KU Leuven Sport Leuven", type: "Gym / Pool / 80+ sports (student access)", url: "https://sport.kuleuven.be" },
      { name: "Groot Begijnhof (Leuven)", type: "UNESCO World Heritage site / Walking" },
      { name: "Museum M Leuven", type: "Museum", url: "https://www.mleuven.be" },
      { name: "Oude Markt Leuven", type: "Bars / Restaurants (legendary student square)" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // HONG KONG
  // ───────────────────────────────────────────────────────────────────────────

  hku: {
    city: "Pokfulam, Hong Kong SAR",
    courseLanguage: "English",
    languageNotes: "HKU is an English-medium university — all academic instruction and examinations are in English. Cantonese and Mandarin are widely spoken socially. Mandarin language courses are available and useful for students planning careers in mainland China.",
    mapQuery: "University of Hong Kong, Pokfulam, Hong Kong",
    nearestAirport: { name: "Hong Kong International Airport", code: "HKG", distanceKm: 33, mapsQuery: "Hong Kong International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "HKD",
      monthly: {
        dormRoom:        { min: 2000, max: 4500,  label: "HKU hall of residence" },
        sharedApartment: { min: 4000, max: 8000,  label: "Shared apartment — Pokfulam / Sai Ying Pun (per person)" },
        studioApartment: { min: 8000, max: 15000, label: "Studio apartment" },
        twoBedroomApt:   { min: 14000, max: 25000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 1500, max: 3000, note: "Dai pai dongs (local food stalls) are very cheap. Campus canteens affordable." },
        transport: { min: 400, max: 700, note: "Octopus Card for MTR/bus. Hong Kong transit is world-class and affordable." },
        utilities: { min: 300, max: 700 }
      },
      source: "https://numbeo.com/cost-of-living/in/Hong-Kong",
      notes: "Hong Kong is expensive for accommodation but affordable for food and transport. HKU's Pokfulam campus has limited hall places — apply immediately. Many students live in Sai Ying Pun (served by MTR) or Kennedy Town for better prices."
    },
    rentalLinks: [
      { label: "Squarefoot — Hong Kong rentals", url: "https://www.squarefoot.com.hk/en/rent" },
      { label: "Centaline — HK apartments", url: "https://www.centanet.com/en/rent" },
      { label: "SpareRoom HK", url: "https://www.spareroom.co.uk/flatshare/hong_kong" }
    ],
    importantContacts: {
      police: { name: "Hong Kong Police (Non-Emergency)", number: "2527 7177", address: "Western Police Station, 280 Des Voeux Road West, Sai Wan" },
      hospital: { name: "Queen Mary Hospital", address: "102 Pokfulam Road, Hong Kong", url: "https://www3.ha.org.hk/qmh" },
      emergencyNumber: "999"
    },
    leisure: [
      { name: "HKU Sports Centre", type: "Gym / Aquatic centre (student access)" },
      { name: "Victoria Peak (The Peak)", type: "Hiking / Views — accessible from campus" },
      { name: "Hong Kong Museum of History", type: "Museum", url: "https://hk.history.museum" },
      { name: "Soho / Lan Kwai Fong", type: "Restaurants / Bars / Nightlife" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DENMARK
  // ───────────────────────────────────────────────────────────────────────────

  copenhagen: {
    city: "Copenhagen (Frederiksberg / City), Denmark",
    courseLanguage: "Danish / English",
    languageNotes: "University of Copenhagen offers a mix of Danish-language and English programmes. Most Bachelor programmes are in Danish, but there is a large selection of English-taught Master's programmes across sciences, social sciences, humanities, and health. Denmark has near-universal English proficiency — no Danish required for daily life.",
    mapQuery: "University of Copenhagen, Copenhagen, Denmark",
    nearestAirport: { name: "Copenhagen Airport (Kastrup)", code: "CPH", distanceKm: 9, mapsQuery: "Copenhagen Airport Kastrup" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "DKK",
      monthly: {
        dormRoom:        { min: 2500, max: 5000,  label: "Studiebolig / student dormitory" },
        sharedApartment: { min: 4000, max: 7000,  label: "Shared apartment (per person)" },
        studioApartment: { min: 7000, max: 12000, label: "Studio apartment" },
        twoBedroomApt:   { min: 12000, max: 19000, label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 2000, max: 4000 },
        transport: { min: 400, max: 600, note: "Rejsekort monthly zone 1-2 ~460 DKK. Copenhagen is extremely cycle-friendly." },
        utilities: { min: 500, max: 900 }
      },
      source: "https://numbeo.com/cost-of-living/in/Copenhagen",
      notes: "Copenhagen is expensive but Danish students receive state stipends (SU) and high wages for student jobs. International students outside the EU don't receive SU. The city is safe, beautiful, and has very high quality of life. DSB and Metro cover the whole city."
    },
    rentalLinks: [
      { label: "lejebolig.dk — Copenhagen rentals", url: "https://www.lejebolig.dk/en/rentals/city/K%C3%B8benhavn" },
      { label: "boligportal.dk — Copenhagen", url: "https://www.boligportal.dk/en/rentals/city/K%C3%B8benhavn" },
      { label: "KKIK Student Housing Copenhagen", url: "https://www.kollegierneskontor.dk" }
    ],
    importantContacts: {
      police: { name: "Politiet (Non-Emergency)", number: "114" },
      hospital: { name: "Rigshospitalet (Copenhagen University Hospital)", address: "Blegdamsvej 9, 2100 København Ø", url: "https://www.rigshospitalet.dk" },
      emergencyNumber: "112"
    },
    leisure: [
      { name: "University of Copenhagen Sports", type: "Gym / Sports (student access)", url: "https://studerende.ku.dk/sport/" },
      { name: "Nørrebro / Vesterbro", type: "Bars / Cafés / Vintage shops / Student life" },
      { name: "National Museum of Denmark", type: "Museum (free)", url: "https://en.natmus.dk" },
      { name: "Tivoli Gardens", type: "Amusement park / Gardens (student discount)", url: "https://www.tivoli.dk" }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // BRAZIL
  // ───────────────────────────────────────────────────────────────────────────

  usp: {
    city: "Butantã, São Paulo, Brazil",
    courseLanguage: "Portuguese",
    languageNotes: "All USP programmes are taught in Portuguese (Brazilian Portuguese). International students without Portuguese proficiency must complete the Portuguese for Foreigners programme before beginning academic study. Some graduate and research programmes are open to international applicants in English.",
    mapQuery: "University of São Paulo USP, Butantã, São Paulo, Brazil",
    nearestAirport: { name: "Guarulhos International Airport", code: "GRU", distanceKm: 30, mapsQuery: "São Paulo Guarulhos International Airport" },
    costOfLiving: {
      lastUpdated: "2026-04-13", currency: "BRL",
      monthly: {
        dormRoom:        { min: 300,  max: 800,   label: "USP student housing / república" },
        sharedApartment: { min: 600,  max: 1500,  label: "Shared apartment — Butantã / Pinheiros (per person)" },
        studioApartment: { min: 1500, max: 3000,  label: "Studio apartment" },
        twoBedroomApt:   { min: 2500, max: 5000,  label: "2-bedroom apartment" }
      },
      otherMonthly: {
        food:      { min: 500, max: 1200, note: "Bandejão (USP cafeteria) meals from R$2-6. São Paulo has incredible food diversity." },
        transport: { min: 200, max: 400, note: "Bilhete Único (integrated bus/metro monthly pass). USP Circular buses are free on campus." },
        utilities: { min: 100, max: 250 }
      },
      source: "https://numbeo.com/cost-of-living/in/Sao-Paulo",
      notes: "USP is Brazil's top public university with an enormous, self-contained campus in São Paulo. Living costs in Brazil are very low in international terms. Safety note: take care in certain areas — follow university guidance on safe transit routes."
    },
    rentalLinks: [
      { label: "QuintoAndar — São Paulo rentals", url: "https://www.quintoandar.com.br/alugar/imovel/sao-paulo-sp-brasil" },
      { label: "ZAP Imóveis — São Paulo", url: "https://www.zapimoveis.com.br/aluguel/imoveis/sp+sao-paulo/" },
      { label: "OLX — São Paulo rooms", url: "https://www.olx.com.br/imoveis/estado-sp/sao-paulo-e-regiao/aluguel" }
    ],
    importantContacts: {
      police: { name: "Polícia Militar (Emergency)", number: "190" },
      hospital: { name: "Hospital das Clínicas da FMUSP", address: "Av. Dr. Enéas Carvalho Aguiar 255, Pinheiros, São Paulo", url: "https://www.hc.fm.usp.br" },
      emergencyNumber: "190 (police) / 192 (SAMU ambulance) / 193 (fire)"
    },
    leisure: [
      { name: "USP Physical Education Centre (CEPEUSP)", type: "Gym / Pool / 40+ sports (student access)", url: "https://www.cepeusp.usp.br" },
      { name: "Parque Estadual da Cantareira", type: "Atlantic Forest / Hiking (largest urban forest reserve in the world)" },
      { name: "Museu de Arte de São Paulo (MASP)", type: "Museum (free Tuesdays)", url: "https://masp.org.br" },
      { name: "Vila Madalena / Pinheiros", type: "Street art / Bars / Restaurants" }
    ]
  }

}; // end UNI_GUIDE

// ID aliases — map universities.js IDs to guide entries with different keys
window.UNI_GUIDE.tu_munich  = window.UNI_GUIDE.tum;
window.UNI_GUIDE.ntu_sg     = window.UNI_GUIDE.ntu;
window.UNI_GUIDE.umelbourne = window.UNI_GUIDE.melbourne;
window.UNI_GUIDE.utoronto   = window.UNI_GUIDE.toronto;
window.UNI_GUIDE.utokyo     = window.UNI_GUIDE.tokyo;
