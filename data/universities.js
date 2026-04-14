/**
 * FreeStudentTools — University Seed Data
 * Top 1,500 universities tracked (seed: 55 representative entries)
 * Updated daily via tools/update_university_data.py
 * Last manual update: 2026-04-13
 *
 * Status values: "open" | "closing_soon" | "closed" | "upcoming" | "results_pending" | "results_released"
 */
window.UNI_DATA = {
  lastUpdated: "2026-04-12",
  totalTracked: 1500,
  universities: [

    /* ===== UNITED STATES ===== */
    {
      id: "mit", name: "Massachusetts Institute of Technology", shortName: "MIT",
      country: "United States", countryCode: "US", region: "North America", ranking: 1,
      website: "https://web.mit.edu",
      streams: ["Engineering", "Computer Science", "Sciences", "Architecture", "Business"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Dormitories", "Graduate apartments"],
        notes: "All freshmen guaranteed on-campus housing. Graduate housing available on a lottery basis; priority for first-year grad students.",
        link: "https://housing.mit.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-01-01", notificationDate: "2027-03-14", status: "upcoming", tuitionUSD: 59750, notes: "Early Action deadline Nov 1, 2026. Common App accepted.", link: "https://admissions.mit.edu" },
        { level: "Master", intake: "Fall", year: 2026, openDate: "2025-09-15", deadline: "2025-12-15", notificationDate: "2026-03-01", status: "results_released", tuitionUSD: 62990, notes: "Apply to specific department. Some programs rolling.", link: "https://gradapply.mit.edu" },
        { level: "PhD", intake: "Fall", year: 2026, openDate: "2025-09-01", deadline: "2025-12-15", notificationDate: "2026-02-15", status: "results_released", tuitionUSD: 62990, notes: "Most PhD programs fully funded with stipend.", link: "https://gradapply.mit.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-15", notificationDate: "2027-03-01", status: "upcoming", tuitionUSD: 65000, notes: "", link: "https://gradapply.mit.edu" }
      ]
    },

    {
      id: "harvard", name: "Harvard University", shortName: "Harvard",
      country: "United States", countryCode: "US", region: "North America", ranking: 4,
      website: "https://www.harvard.edu",
      streams: ["Business", "Law", "Medicine", "Sciences", "Arts & Humanities", "Social Sciences", "Education", "Engineering"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Houses (residential)", "Graduate dormitories", "Apartments"],
        notes: "Undergrads live in one of 12 residential houses for years 2-4. Harvard guarantees housing for all undergrads. Graduate housing is competitive.",
        link: "https://housing.harvard.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-01-01", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 59076, notes: "Restrictive Early Action deadline Nov 1. Meets 100% of demonstrated financial need.", link: "https://college.harvard.edu/admissions" },
        { level: "Master", intake: "Fall", year: 2026, openDate: "2025-10-01", deadline: "2026-01-02", notificationDate: "2026-03-15", status: "results_released", tuitionUSD: 55368, notes: "Varies by school. HBS, HLS, HMS each have their own process.", link: "https://gsas.harvard.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-09-15", deadline: "2026-12-01", notificationDate: "2027-02-15", status: "upcoming", tuitionUSD: 55368, notes: "PhD students typically receive full funding.", link: "https://gsas.harvard.edu" }
      ]
    },

    {
      id: "stanford", name: "Stanford University", shortName: "Stanford",
      country: "United States", countryCode: "US", region: "North America", ranking: 6,
      website: "https://www.stanford.edu",
      streams: ["Engineering", "Computer Science", "Business", "Law", "Medicine", "Sciences", "Education", "Design"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Dormitories", "Row houses", "Graduate residences", "Apartments"],
        notes: "Stanford guarantees 4 years of housing for undergrads. Graduate students can apply for on-campus housing; not guaranteed.",
        link: "https://rde.stanford.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-08-01", deadline: "2027-01-02", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 61731, notes: "Restrictive Early Action: Nov 1, 2026. Need-blind for US citizens.", link: "https://admission.stanford.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-01", notificationDate: "2027-03-15", status: "upcoming", tuitionUSD: 63009, notes: "Some coterminal degree programs available to Stanford undergrads.", link: "https://gradadmissions.stanford.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-01", notificationDate: "2027-02-01", status: "upcoming", tuitionUSD: 63009, notes: "Most PhD programs offer full funding.", link: "https://gradadmissions.stanford.edu" }
      ]
    },

    {
      id: "caltech", name: "California Institute of Technology", shortName: "Caltech",
      country: "United States", countryCode: "US", region: "North America", ranking: 10,
      website: "https://www.caltech.edu",
      streams: ["Engineering", "Computer Science", "Sciences"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Student houses"],
        notes: "Caltech operates a unique house system. All undergrads live in one of 8 houses on campus. Graduate housing available on campus.",
        link: "https://housing.caltech.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-01-03", notificationDate: "2027-03-15", status: "upcoming", tuitionUSD: 60816, notes: "Early Action: Nov 1. Meets 100% of demonstrated financial need.", link: "https://admissions.caltech.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2026-12-15", notificationDate: "2027-03-01", status: "upcoming", tuitionUSD: 56184, notes: "", link: "https://gradoffice.caltech.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2026-12-15", notificationDate: "2027-02-15", status: "upcoming", tuitionUSD: 56184, notes: "All admitted PhD students receive full funding.", link: "https://gradoffice.caltech.edu" }
      ]
    },

    {
      id: "uc_berkeley", name: "University of California, Berkeley", shortName: "UC Berkeley",
      country: "United States", countryCode: "US", region: "North America", ranking: 12,
      website: "https://www.berkeley.edu",
      streams: ["Engineering", "Computer Science", "Business", "Law", "Sciences", "Social Sciences", "Arts & Humanities", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Dormitories", "Apartment-style units", "Theme houses"],
        notes: "Freshmen are guaranteed housing for 2 years. Upper-division and grad students apply through a lottery. Berkeley also has partnerships with local housing providers.",
        link: "https://housing.berkeley.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-08-01", deadline: "2026-11-30", notificationDate: "2027-03-31", status: "upcoming", tuitionUSD: 15312, notes: "California residents pay significantly lower fees. UC Application used (not Common App).", link: "https://admissions.berkeley.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-01", notificationDate: "2027-03-01", status: "upcoming", tuitionUSD: 29026, notes: "Rolling deadlines by department.", link: "https://grad.berkeley.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-01", notificationDate: "2027-02-15", status: "upcoming", tuitionUSD: 29026, notes: "Most funded programs.", link: "https://grad.berkeley.edu" }
      ]
    },

    {
      id: "yale", name: "Yale University", shortName: "Yale",
      country: "United States", countryCode: "US", region: "North America", ranking: 16,
      website: "https://www.yale.edu",
      streams: ["Law", "Medicine", "Arts & Humanities", "Social Sciences", "Sciences", "Engineering", "Business", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residential colleges", "Graduate housing"],
        notes: "All undergrads belong to one of 14 residential colleges. Housing guaranteed for 4 years. Graduate housing available but competitive.",
        link: "https://housing.yale.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-08-15", deadline: "2027-01-02", notificationDate: "2027-03-31", status: "upcoming", tuitionUSD: 62250, notes: "Single-choice Early Action: Nov 1. Meets 100% of financial need.", link: "https://admissions.yale.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-15", notificationDate: "2027-03-15", status: "upcoming", tuitionUSD: 48700, notes: "Varies by school; check specific graduate program.", link: "https://gsas.yale.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-15", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 48700, notes: "All PhD students receive full funding + stipend.", link: "https://gsas.yale.edu" }
      ]
    },

    {
      id: "cmu", name: "Carnegie Mellon University", shortName: "CMU",
      country: "United States", countryCode: "US", region: "North America", ranking: 25,
      website: "https://www.cmu.edu",
      streams: ["Computer Science", "Engineering", "Business", "Design", "Arts & Humanities", "Sciences"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Dormitories", "Graduate apartments"],
        notes: "On-campus housing available for undergrads and some grad students. Freshmen are placed in dorms. Graduate housing is available but limited.",
        link: "https://housing.cmu.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-01-01", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 62568, notes: "Early Decision: Nov 1. CS programs are highly selective.", link: "https://admission.cmu.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-01", notificationDate: "2027-03-01", status: "upcoming", tuitionUSD: 53640, notes: "MSCS, MISM, and other professional masters are very popular.", link: "https://apply.cmu.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-15", notificationDate: "2027-02-15", status: "upcoming", tuitionUSD: 53640, notes: "Funded PhD programs available in CS, ECE, and more.", link: "https://apply.cmu.edu" }
      ]
    },

    {
      id: "columbia", name: "Columbia University", shortName: "Columbia",
      country: "United States", countryCode: "US", region: "North America", ranking: 33,
      website: "https://www.columbia.edu",
      streams: ["Engineering", "Business", "Law", "Medicine", "Journalism", "Social Sciences", "Sciences", "Arts & Humanities"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Dormitories", "Graduate residence halls", "Apartments"],
        notes: "Columbia guarantees 4 years of housing for undergrads. Graduate students can apply for on-campus residences; limited availability in NYC.",
        link: "https://housing.columbia.edu"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-08-01", deadline: "2027-01-01", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 65524, notes: "Early Decision: Nov 1 (binding). Need-blind for US applicants.", link: "https://undergrad.admissions.columbia.edu" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-02-01", notificationDate: "2027-04-15", status: "upcoming", tuitionUSD: 64224, notes: "Columbia SEAS, GSAP, and professional schools each run their own admissions.", link: "https://gradengineering.columbia.edu" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-09-15", deadline: "2026-12-15", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 64224, notes: "", link: "https://gsas.columbia.edu" }
      ]
    },

    /* ===== UNITED KINGDOM ===== */
    {
      id: "oxford", name: "University of Oxford", shortName: "Oxford",
      country: "United Kingdom", countryCode: "GB", region: "Europe", ranking: 3,
      website: "https://www.ox.ac.uk",
      streams: ["Law", "Medicine", "Sciences", "Engineering", "Arts & Humanities", "Social Sciences", "Business", "Economics"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["College rooms", "Graduate shared houses"],
        notes: "Oxford is organized into 39 colleges — each college provides its own accommodation. First-year undergrads are guaranteed a room in college. Graduate housing is college-specific; check your college's policy.",
        link: "https://www.ox.ac.uk/students/life/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-10-15", notificationDate: "2027-01-15", status: "upcoming", tuitionUSD: 41750, notes: "UK UCAS deadline Oct 15. International students same deadline. Interviews held Nov–Jan.", link: "https://www.ox.ac.uk/admissions/undergraduate" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-24", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 38200, notes: "Multiple deadlines per program. Early rounds close Dec 2026.", link: "https://www.ox.ac.uk/admissions/graduate" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-08", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 38200, notes: "Clarendon Fund and Rhodes Scholarship available for top applicants.", link: "https://www.ox.ac.uk/admissions/graduate" }
      ]
    },

    {
      id: "cambridge", name: "University of Cambridge", shortName: "Cambridge",
      country: "United Kingdom", countryCode: "GB", region: "Europe", ranking: 5,
      website: "https://www.cam.ac.uk",
      streams: ["Sciences", "Engineering", "Law", "Medicine", "Mathematics", "Arts & Humanities", "Economics", "Business"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["College rooms", "Shared accommodation"],
        notes: "Cambridge colleges guarantee first-year housing. Most colleges offer housing throughout the undergraduate degree. Graduate housing varies by college.",
        link: "https://www.cam.ac.uk/practical-information/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-10-15", notificationDate: "2027-01-15", status: "upcoming", tuitionUSD: 41250, notes: "UCAS deadline Oct 15. Cambridge-specific application (COPA) required.", link: "https://www.undergraduate.study.cam.ac.uk/applying" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-07", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 37100, notes: "Cambridge Assessment required for some programs. Gates-Cambridge Scholarship available.", link: "https://www.graduate.study.cam.ac.uk" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-07", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 37100, notes: "Self-funded and funded routes available. Cambridge Commonwealth Trust scholarships.", link: "https://www.graduate.study.cam.ac.uk" }
      ]
    },

    {
      id: "imperial", name: "Imperial College London", shortName: "Imperial",
      country: "United Kingdom", countryCode: "GB", region: "Europe", ranking: 2,
      website: "https://www.imperial.ac.uk",
      streams: ["Engineering", "Sciences", "Medicine", "Computer Science", "Business"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Halls of residence", "Shared houses"],
        notes: "Imperial guarantees accommodation for all first-year students. Halls are self-catered. Graduate accommodation is very limited in London — early applications advised.",
        link: "https://www.imperial.ac.uk/students/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-10-15", notificationDate: "2027-02-15", status: "upcoming", tuitionUSD: 38900, notes: "UCAS deadline Oct 15. Some programs have preliminary assessments.", link: "https://www.imperial.ac.uk/study/apply/undergraduate" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-05-31", notificationDate: "2027-07-01", status: "upcoming", tuitionUSD: 35800, notes: "Rolling admissions until program fills. Apply early for scholarships.", link: "https://www.imperial.ac.uk/study/apply/postgraduate-taught" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-06-30", notificationDate: "2027-08-01", status: "upcoming", tuitionUSD: 35800, notes: "Self-funded and funded positions available. Check department listings.", link: "https://www.imperial.ac.uk/study/apply/postgraduate-research" }
      ]
    },

    {
      id: "ucl", name: "University College London", shortName: "UCL",
      country: "United Kingdom", countryCode: "GB", region: "Europe", ranking: 9,
      website: "https://www.ucl.ac.uk",
      streams: ["Sciences", "Engineering", "Law", "Medicine", "Architecture", "Arts & Humanities", "Social Sciences", "Economics"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Halls of residence", "Shared flats"],
        notes: "UCL guarantees accommodation for first-year students who apply by the deadline. Graduate accommodation is extremely limited; most grad students find private housing in London.",
        link: "https://www.ucl.ac.uk/students/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-10-15", notificationDate: "2027-03-01", status: "upcoming", tuitionUSD: 32400, notes: "UCAS Oct 15 deadline for competitive programs. Some programs open until June.", link: "https://www.ucl.ac.uk/prospective-students/undergraduate/applying-ucl" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-07-31", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 31200, notes: "Rolling admissions. Popular programs fill fast — apply before March for scholarships.", link: "https://www.ucl.ac.uk/prospective-students/graduate/applying-ucl" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-07-31", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 31200, notes: "DTP-funded and self-funded routes.", link: "https://www.ucl.ac.uk/prospective-students/graduate/applying-ucl" }
      ]
    },

    {
      id: "edinburgh", name: "University of Edinburgh", shortName: "Edinburgh",
      country: "United Kingdom", countryCode: "GB", region: "Europe", ranking: 27,
      website: "https://www.ed.ac.uk",
      streams: ["Sciences", "Medicine", "Law", "Arts & Humanities", "Engineering", "Business", "Social Sciences"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["University halls", "Catered and self-catered options"],
        notes: "Accommodation guaranteed for all first-year undergrads who apply before deadline. Several halls across the city. Graduate accommodation also available.",
        link: "https://www.ed.ac.uk/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-10-15", notificationDate: "2027-03-15", status: "upcoming", tuitionUSD: 27800, notes: "UCAS Oct 15. Scottish students pay no tuition fees (SAAS funded).", link: "https://www.ed.ac.uk/studying/undergraduate/applying" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-06-30", notificationDate: "2027-08-15", status: "upcoming", tuitionUSD: 26400, notes: "Rolling admissions. Popular programs close earlier.", link: "https://www.ed.ac.uk/studying/postgraduate/applying" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-06-30", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 26400, notes: "EPSRC and ESRC DTP funding available for eligible students.", link: "https://www.ed.ac.uk/studying/postgraduate/applying" }
      ]
    },

    /* ===== SWITZERLAND ===== */
    {
      id: "eth_zurich", name: "ETH Zurich", shortName: "ETH Zurich",
      country: "Switzerland", countryCode: "CH", region: "Europe", ranking: 7,
      website: "https://ethz.ch",
      streams: ["Engineering", "Computer Science", "Sciences", "Architecture", "Mathematics"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["WOKO student housing", "University-affiliated housing"],
        notes: "ETH does not own student dorms directly but has a partnership with WOKO (student housing association). Apply early. Zürich housing market is competitive.",
        link: "https://www.woko.ch"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-01-15", deadline: "2027-04-30", notificationDate: "2027-07-15", status: "upcoming", tuitionUSD: 1500, notes: "Very low tuition (~1,500 CHF/year). Conducted mostly in German at Bachelor level. Entrance exam required for some programs.", link: "https://ethz.ch/en/studies/registration-application.html" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2026-12-15", notificationDate: "2027-04-15", status: "upcoming", tuitionUSD: 1500, notes: "English-language Master's programs. Competitive admission. Apply for Dec deadline for Fall start.", link: "https://ethz.ch/en/studies/registration-application.html" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-03-31", notificationDate: "2027-06-30", status: "upcoming", tuitionUSD: 1500, notes: "PhDs are employment contracts — you're paid a salary (~3,500 CHF/month). Apply directly to professors.", link: "https://ethz.ch/en/doctorate.html" }
      ]
    },

    {
      id: "epfl", name: "École Polytechnique Fédérale de Lausanne", shortName: "EPFL",
      country: "Switzerland", countryCode: "CH", region: "Europe", ranking: 19,
      website: "https://www.epfl.ch",
      streams: ["Engineering", "Computer Science", "Sciences", "Architecture", "Mathematics"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Agepoly housing", "Internef dormitories"],
        notes: "EPFL campus has on-site student housing managed by Agepoly. Priority for new students from abroad. Lausanne is smaller and more affordable than Zürich.",
        link: "https://www.epfl.ch/campus/housing"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-02-01", deadline: "2027-04-30", notificationDate: "2027-07-15", status: "upcoming", tuitionUSD: 1500, notes: "Bachelor's taught in French. Entrance exam or Swiss Matura required. ~1,600 CHF/year tuition.", link: "https://www.epfl.ch/education/bachelor/admission" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2026-12-15", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 1500, notes: "English-taught Master's. Very competitive. Apply for December deadline.", link: "https://www.epfl.ch/education/master/admission" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-04-30", notificationDate: "2027-07-01", status: "upcoming", tuitionUSD: 1500, notes: "Doctoral program is salaried employment (~3,000 CHF/month). Apply through professor or doctoral program.", link: "https://www.epfl.ch/education/phd" }
      ]
    },

    /* ===== GERMANY ===== */
    {
      id: "tu_munich", name: "Technical University of Munich", shortName: "TU Munich",
      country: "Germany", countryCode: "DE", region: "Europe", ranking: 28,
      website: "https://www.tum.de",
      streams: ["Engineering", "Computer Science", "Sciences", "Business", "Medicine", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Studentenwerk dorms", "Shared apartments"],
        notes: "Housing through Studentenwerk München. Apply as early as possible — waitlists are common. Rooms are affordable (~350–500 EUR/month). Many students find WG (shared flats) privately.",
        link: "https://www.studentenwerk-muenchen.de/wohnen"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-04-15", deadline: "2027-05-31", notificationDate: "2027-07-15", status: "upcoming", tuitionUSD: 350, notes: "Semester fee only (~350 EUR total). NC (numerus clausus) applies to some programs. German proficiency usually required.", link: "https://www.tum.de/en/studies/application" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2026-12-31", notificationDate: "2027-03-31", status: "upcoming", tuitionUSD: 350, notes: "Many English-taught Master's programs. IELTS 6.5 or TOEFL 88 typically required.", link: "https://www.tum.de/en/studies/application" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-06-30", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 350, notes: "PhD through doctoral agreements with TUM professors. DAAD and TUM doctoral fellowships available.", link: "https://www.tum.de/en/research/phd-postdoc" }
      ]
    },

    /* ===== NETHERLANDS ===== */
    {
      id: "tu_delft", name: "Delft University of Technology", shortName: "TU Delft",
      country: "Netherlands", countryCode: "NL", region: "Europe", ranking: 57,
      website: "https://www.tudelft.nl",
      streams: ["Engineering", "Computer Science", "Architecture", "Sciences", "Design"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Campus housing", "Shared apartments"],
        notes: "Student housing via DUWO and SSH. Apply immediately after admission — housing is competitive in Delft. Most students find rooms in shared houses.",
        link: "https://www.tudelft.nl/en/student/life-at-delft/housing"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-04-01", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 2400, notes: "EU students pay ~2,400 EUR/yr; non-EU ~9,000–17,000 EUR/yr.", link: "https://www.tudelft.nl/en/education/admission-and-application" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-15", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 18000, notes: "Most programs taught in English. Delft Excellence Scholarship available.", link: "https://www.tudelft.nl/en/education/admission-and-application/msc-application" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-06-30", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 0, notes: "PhDs are paid employment positions. Check department vacancy listings.", link: "https://www.tudelft.nl/en/about-tu-delft/working-at-tu-delft" }
      ]
    },

    /* ===== SINGAPORE ===== */
    {
      id: "nus", name: "National University of Singapore", shortName: "NUS",
      country: "Singapore", countryCode: "SG", region: "Asia-Pacific", ranking: 8,
      website: "https://www.nus.edu.sg",
      streams: ["Engineering", "Computer Science", "Business", "Sciences", "Law", "Medicine", "Arts & Humanities", "Design"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residence Halls", "Residential Colleges", "Student apartments"],
        notes: "NUS has 16 Halls of Residence and 6 Residential Colleges. Most students stay in halls for their first year. Graduate housing is available in Prince George's Park Residences.",
        link: "https://nus.edu.sg/osa/student-services/hostel-admission/undergraduate"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-02-01", deadline: "2027-03-19", notificationDate: "2027-05-30", status: "upcoming", tuitionUSD: 10050, notes: "Subsidised rate for Singaporeans and PRs. International students pay ~38,000 SGD/yr. NUS Scholarship and ASEAN scholarship available.", link: "https://www.nus.edu.sg/oam/undergraduate-admissions" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-02-28", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 22000, notes: "Applications typically open Oct–Dec for August intake.", link: "https://www.nus.edu.sg/registrar/prospective-students/graduate/admissions" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-15", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 5000, notes: "NUS Research Scholarship covers tuition + monthly stipend for eligible students.", link: "https://www.nus.edu.sg/registrar/prospective-students/graduate/admissions" }
      ]
    },

    {
      id: "ntu_sg", name: "Nanyang Technological University", shortName: "NTU Singapore",
      country: "Singapore", countryCode: "SG", region: "Asia-Pacific", ranking: 15,
      website: "https://www.ntu.edu.sg",
      streams: ["Engineering", "Computer Science", "Business", "Sciences", "Arts & Humanities", "Education", "Design"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Halls of Residence", "Graduate hall"],
        notes: "NTU has 17 Halls of Residence. Most international undergrads are guaranteed hostel in Year 1. Graduate Hall and on-campus apartments for postgrads.",
        link: "https://www.ntu.edu.sg/life-at-ntu/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-02-01", deadline: "2027-03-19", notificationDate: "2027-05-30", status: "upcoming", tuitionUSD: 9600, notes: "ASEAN Undergraduate Scholarship available. NTU Scholarship for international students.", link: "https://admissions.ntu.edu.sg" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-31", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 20000, notes: "", link: "https://www.ntu.edu.sg/admissions/graduate" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-15", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 4800, notes: "NTU Research Scholarship available. Subsidised tuition for scholars.", link: "https://www.ntu.edu.sg/admissions/graduate/phd" }
      ]
    },

    /* ===== AUSTRALIA ===== */
    {
      id: "umelbourne", name: "University of Melbourne", shortName: "U Melbourne",
      country: "Australia", countryCode: "AU", region: "Asia-Pacific", ranking: 13,
      website: "https://www.unimelb.edu.au",
      streams: ["Sciences", "Engineering", "Business", "Law", "Medicine", "Arts & Humanities", "Education", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residential Colleges", "University apartments"],
        notes: "Melbourne has 10 independent residential colleges and several university-operated apartments. Most offer meal plans. Applications open early — places fill quickly.",
        link: "https://students.unimelb.edu.au/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-08-01", deadline: "2026-10-31", notificationDate: "2026-12-15", status: "upcoming", tuitionUSD: 33600, notes: "Australian domestic fees are much lower via HECS-HELP. International undergrad tuition ~33,000–48,000 AUD/yr.", link: "https://study.unimelb.edu.au/how-to-apply" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-11-30", notificationDate: "2027-01-31", status: "upcoming", tuitionUSD: 31000, notes: "February and July intakes also available for some programs.", link: "https://study.unimelb.edu.au/how-to-apply/graduate" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-10-31", notificationDate: "2026-12-31", status: "upcoming", tuitionUSD: 31000, notes: "Melbourne Research Scholarship (MRS) covers tuition + stipend (~$30,000 AUD/yr).", link: "https://study.unimelb.edu.au/how-to-apply/graduate-research" }
      ]
    },

    {
      id: "usydney", name: "University of Sydney", shortName: "USydney",
      country: "Australia", countryCode: "AU", region: "Asia-Pacific", ranking: 18,
      website: "https://www.sydney.edu.au",
      streams: ["Sciences", "Engineering", "Business", "Law", "Medicine", "Arts & Humanities", "Agriculture", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Colleges (Wesley, St Andrew's, etc.)", "University residences"],
        notes: "Sydney has 7 affiliated residential colleges plus university-run housing. College life is a big part of the culture. Apply early for best placement.",
        link: "https://www.sydney.edu.au/campus-life/accommodation.html"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-11-30", notificationDate: "2026-12-31", status: "upcoming", tuitionUSD: 36000, notes: "Also accepts January (Semester 2) intake for some programs. UAC and direct applications accepted.", link: "https://www.sydney.edu.au/study/how-to-apply.html" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-11-30", notificationDate: "2027-01-31", status: "upcoming", tuitionUSD: 33000, notes: "February and July intakes available.", link: "https://www.sydney.edu.au/study/how-to-apply/postgraduate-coursework.html" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-31", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 33000, notes: "Sydney Research Scholarship covers tuition + living allowance.", link: "https://www.sydney.edu.au/research/higher-degree-research.html" }
      ]
    },

    {
      id: "anu", name: "Australian National University", shortName: "ANU",
      country: "Australia", countryCode: "AU", region: "Asia-Pacific", ranking: 34,
      website: "https://www.anu.edu.au",
      streams: ["Sciences", "Social Sciences", "Arts & Humanities", "Law", "Business", "Engineering", "Medicine"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["On-campus halls", "University apartments"],
        notes: "ANU has a strong residential community on its large campus in Canberra. 8 halls of residence available. Graduate accommodation also on-campus.",
        link: "https://www.anu.edu.au/students/student-life/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-31", notificationDate: "2027-01-31", status: "upcoming", tuitionUSD: 35000, notes: "UAC and direct applications. Chancellor's International Scholarship available.", link: "https://www.anu.edu.au/study/apply" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-31", notificationDate: "2027-02-01", status: "upcoming", tuitionUSD: 32000, notes: "", link: "https://www.anu.edu.au/study/apply" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-31", notificationDate: "2027-02-01", status: "upcoming", tuitionUSD: 32000, notes: "ANU HDR Scholarship available. AINSE Fellowship for science students.", link: "https://www.anu.edu.au/study/apply" }
      ]
    },

    /* ===== CANADA ===== */
    {
      id: "utoronto", name: "University of Toronto", shortName: "U Toronto",
      country: "Canada", countryCode: "CA", region: "North America", ranking: 22,
      website: "https://www.utoronto.ca",
      streams: ["Sciences", "Engineering", "Business", "Law", "Medicine", "Arts & Humanities", "Social Sciences", "Education"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residence halls", "College residences"],
        notes: "U of T has 7 colleges each with their own residence. First-year students are guaranteed housing if they apply by the deadline. Graduate housing is limited; apply as early as possible.",
        link: "https://housing.utoronto.ca"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-01-15", notificationDate: "2027-05-15", status: "upcoming", tuitionUSD: 43800, notes: "International tuition ~43,800–68,000 CAD/yr depending on program. Lester B. Pearson Scholarship for international students.", link: "https://future.utoronto.ca" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2026-12-01", notificationDate: "2027-03-15", status: "upcoming", tuitionUSD: 24000, notes: "SGS application portal. Vanier Canada Graduate Scholarship available.", link: "https://www.sgs.utoronto.ca/apply" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2026-12-01", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 16500, notes: "Most funded PhD programs. Connaught International Scholarship available.", link: "https://www.sgs.utoronto.ca/apply" }
      ]
    },

    {
      id: "mcgill", name: "McGill University", shortName: "McGill",
      country: "Canada", countryCode: "CA", region: "North America", ranking: 29,
      website: "https://www.mcgill.ca",
      streams: ["Sciences", "Engineering", "Law", "Medicine", "Arts & Humanities", "Business", "Music"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residence halls", "Apartments"],
        notes: "McGill guarantees first-year housing for students admitted by the deadline. Residences on two campuses (downtown and Macdonald). Graduate accommodation available but limited in Montreal.",
        link: "https://www.mcgill.ca/students/housing"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-01-15", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 23000, notes: "Canadian/Québec students pay much lower fees. International: ~23,000–40,000 CAD/yr.", link: "https://www.mcgill.ca/applying/instructions" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2026-12-01", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 9000, notes: "", link: "https://www.mcgill.ca/grad-admissions" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2026-12-01", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 4500, notes: "FRQSC and NSERC funding available for eligible students.", link: "https://www.mcgill.ca/grad-admissions" }
      ]
    },

    /* ===== JAPAN ===== */
    {
      id: "utokyo", name: "University of Tokyo", shortName: "UTokyo",
      country: "Japan", countryCode: "JP", region: "Asia-Pacific", ranking: 32,
      website: "https://www.u-tokyo.ac.jp",
      streams: ["Sciences", "Engineering", "Medicine", "Law", "Economics", "Arts & Humanities", "Agriculture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["International lodges", "Student dormitories"],
        notes: "UTokyo has international lodges for non-Japanese students. Priority given to new international students. Apply immediately after admission. Very affordable (~30,000–60,000 JPY/month).",
        link: "https://www.u-tokyo.ac.jp/en/life/facilities/housing.html"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-11-30", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 4900, notes: "MEXT scholarship for international students covers tuition + stipend. English programs via PEAK (Programs in English at Komaba) also available.", link: "https://www.u-tokyo.ac.jp/en/admissions/graduate.html" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-06-01", deadline: "2026-08-31", notificationDate: "2026-10-31", status: "upcoming", tuitionUSD: 4900, notes: "Most Master's start in April; some English programs in September. MEXT scholarship available.", link: "https://www.u-tokyo.ac.jp/en/admissions/graduate.html" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-06-01", deadline: "2026-08-31", notificationDate: "2026-10-31", status: "upcoming", tuitionUSD: 4900, notes: "MEXT and JASSO scholarships available.", link: "https://www.u-tokyo.ac.jp/en/admissions/graduate.html" }
      ]
    },

    /* ===== CHINA ===== */
    {
      id: "tsinghua", name: "Tsinghua University", shortName: "Tsinghua",
      country: "China", countryCode: "CN", region: "Asia-Pacific", ranking: 17,
      website: "https://www.tsinghua.edu.cn",
      streams: ["Engineering", "Computer Science", "Sciences", "Architecture", "Economics", "Arts & Humanities", "Law"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["International student dormitories"],
        notes: "All enrolled international students are eligible for campus accommodation. Rooms are affordable and well-maintained. The campus is large with most facilities on-site.",
        link: "https://www.tsinghua.edu.cn/en/Campus/StudentLife.htm"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-01-01", deadline: "2027-03-31", notificationDate: "2027-06-15", status: "upcoming", tuitionUSD: 4300, notes: "Chinese Government Scholarship (CGS) covers tuition, accommodation, stipend. Apply via CSC portal.", link: "https://www.tsinghua.edu.cn/en/Admissions.htm" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-03-31", notificationDate: "2027-06-01", status: "upcoming", tuitionUSD: 4300, notes: "Tsinghua University Scholarship and CGS available.", link: "https://www.tsinghua.edu.cn/en/Admissions.htm" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-03-31", notificationDate: "2027-06-01", status: "upcoming", tuitionUSD: 4300, notes: "CGS and Tsinghua PhD scholarships cover full tuition + stipend.", link: "https://www.tsinghua.edu.cn/en/Admissions.htm" }
      ]
    },

    /* ===== SOUTH KOREA ===== */
    {
      id: "snu", name: "Seoul National University", shortName: "SNU",
      country: "South Korea", countryCode: "KR", region: "Asia-Pacific", ranking: 37,
      website: "https://www.snu.ac.kr",
      streams: ["Sciences", "Engineering", "Business", "Law", "Medicine", "Arts & Humanities", "Social Sciences", "Agriculture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Dormitories", "Graduate halls"],
        notes: "SNU operates 7 dormitory buildings. Priority given to students from outside Seoul. Graduate dormitories separate from undergrad. Very affordable at ~200,000–400,000 KRW/month.",
        link: "https://dorm.snu.ac.kr"
      },
      admissions: [
        { level: "Bachelor", intake: "Spring", year: 2027, openDate: "2026-09-01", deadline: "2026-10-31", notificationDate: "2026-12-15", status: "upcoming", tuitionUSD: 4500, notes: "Global Excellence Scholarship available for international students.", link: "https://admission.snu.ac.kr" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-08-31", notificationDate: "2026-10-15", status: "upcoming", tuitionUSD: 4200, notes: "NIIED Korean Government Scholarship (GKS) covers tuition + stipend.", link: "https://admission.snu.ac.kr/graduate" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-08-31", notificationDate: "2026-10-15", status: "upcoming", tuitionUSD: 4200, notes: "GKS and SNU President Scholarship for eligible international students.", link: "https://admission.snu.ac.kr/graduate" }
      ]
    },

    /* ===== FRANCE ===== */
    {
      id: "sciences_po", name: "Sciences Po Paris", shortName: "Sciences Po",
      country: "France", countryCode: "FR", region: "Europe", ranking: 243,
      website: "https://www.sciencespo.fr",
      streams: ["Social Sciences", "Economics", "Law", "Arts & Humanities", "Business"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["CROUS residences", "Partner housing"],
        notes: "Sciences Po facilitates housing through CROUS and private partners. International students get priority. Paris is expensive — budget ~900–1,400 EUR/month for a studio.",
        link: "https://www.sciencespo.fr/students/en/campus-life/housing.html"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-01-31", notificationDate: "2027-03-31", status: "upcoming", tuitionUSD: 14900, notes: "Income-based tuition (0–14,900 EUR). Strong financial aid for all income levels.", link: "https://www.sciencespo.fr/college/en/applying.html" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-02-28", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 15400, notes: "Emile Boutmy Scholarship for non-EU students. Strong in policy, law, international affairs.", link: "https://www.sciencespo.fr/international/en/masters-program-application.html" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 9000, notes: "", link: "https://www.sciencespo.fr/doctoral-school" }
      ]
    },

    /* ===== SWEDEN ===== */
    {
      id: "kth", name: "KTH Royal Institute of Technology", shortName: "KTH",
      country: "Sweden", countryCode: "SE", region: "Europe", ranking: 89,
      website: "https://www.kth.se",
      streams: ["Engineering", "Computer Science", "Sciences", "Architecture", "Design"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["SSSB student housing", "Campus residences"],
        notes: "KTH partners with SSSB for student accommodation. Housing in Stockholm is competitive. Apply to SSSB immediately after receiving your acceptance letter. Queue-based system.",
        link: "https://www.kth.se/student/liv/boende"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-10-15", deadline: "2027-01-15", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 0, notes: "Free for EU/EEA students. Non-EU: ~125,000–175,000 SEK/yr. Apply via universityadmissions.se.", link: "https://www.kth.se/en/studies/bachelor/apply" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-16", deadline: "2027-01-15", notificationDate: "2027-04-01", status: "upcoming", tuitionUSD: 15000, notes: "KTH Scholarship covers 50–75% of tuition for non-EU top applicants.", link: "https://www.kth.se/en/studies/master/apply" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-05-31", notificationDate: "2027-08-31", status: "upcoming", tuitionUSD: 0, notes: "PhD is an employment contract. Funded salary ~32,000–38,000 SEK/month. Apply to specific advertised positions.", link: "https://www.kth.se/en/studies/phd" }
      ]
    },

    /* ===== IRELAND ===== */
    {
      id: "trinity_dublin", name: "Trinity College Dublin", shortName: "Trinity Dublin",
      country: "Ireland", countryCode: "IE", region: "Europe", ranking: 81,
      website: "https://www.tcd.ie",
      streams: ["Arts & Humanities", "Sciences", "Engineering", "Business", "Law", "Medicine", "Social Sciences"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["On-campus rooms", "Self-catered apartments"],
        notes: "Trinity's main campus is in Dublin city centre. On-campus accommodation is limited — apply very early. Graduate accommodation also available on campus.",
        link: "https://www.tcd.ie/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2027-02-01", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 21000, notes: "CAO system for Irish applicants. International students apply directly. €21,000–30,000/yr for non-EU.", link: "https://www.tcd.ie/study/ug" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-04-30", notificationDate: "2027-06-30", status: "upcoming", tuitionUSD: 18000, notes: "Global Excellence Scholarship for high-achieving international students.", link: "https://www.tcd.ie/study/pg" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-04-30", notificationDate: "2027-06-30", status: "upcoming", tuitionUSD: 7000, notes: "Irish Research Council (IRC) funding available.", link: "https://www.tcd.ie/study/pg" }
      ]
    },

    /* ===== INDIA ===== */
    {
      id: "iit_bombay", name: "Indian Institute of Technology Bombay", shortName: "IIT Bombay",
      country: "India", countryCode: "IN", region: "Asia-Pacific", ranking: 118,
      website: "https://www.iitb.ac.in",
      streams: ["Engineering", "Computer Science", "Sciences", "Design", "Economics"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Student hostels"],
        notes: "All IIT Bombay students are required to live on campus for the first year. Hostel system with separate hostels for boys and girls. Very affordable at ~5,000–15,000 INR/month.",
        link: "https://www.iitb.ac.in/newacadhome/hostelsDetails.jsp"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-03-31", notificationDate: "2027-06-15", status: "upcoming", tuitionUSD: 1100, notes: "JEE Advanced required for Indian applicants. DASA scheme for international/NRI students.", link: "https://www.iitb.ac.in/newacadhome/admissions.jsp" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-12-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 800, notes: "GATE score required for M.Tech. Direct PhD also available.", link: "https://www.iitb.ac.in/newacadhome/admissions.jsp" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-12-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 800, notes: "JRF stipend provided to eligible PhD students. GATE/NET required.", link: "https://www.iitb.ac.in/newacadhome/admissions.jsp" }
      ]
    },

    {
      id: "iit_delhi", name: "Indian Institute of Technology Delhi", shortName: "IIT Delhi",
      country: "India", countryCode: "IN", region: "Asia-Pacific", ranking: 150,
      website: "https://home.iitd.ac.in",
      streams: ["Engineering", "Computer Science", "Sciences", "Economics", "Design", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Student hostels"],
        notes: "On-campus hostel accommodation for all enrolled students. Separate facilities for male and female students. Very affordable and includes meal options.",
        link: "https://home.iitd.ac.in/hostels.php"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-03-31", notificationDate: "2027-06-15", status: "upcoming", tuitionUSD: 1100, notes: "JEE Advanced for domestic applicants. DASA scheme for international students.", link: "https://home.iitd.ac.in/admissions.php" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-12-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 800, notes: "GATE required for M.Tech. Waived for candidates with exceptional qualifications.", link: "https://home.iitd.ac.in/admissions.php" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-12-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 800, notes: "SRF/JRF stipend available.", link: "https://home.iitd.ac.in/admissions.php" }
      ]
    },

    /* ===== SOUTH AFRICA ===== */
    {
      id: "uct", name: "University of Cape Town", shortName: "UCT",
      country: "South Africa", countryCode: "ZA", region: "Africa", ranking: 233,
      website: "https://www.uct.ac.za",
      streams: ["Sciences", "Engineering", "Medicine", "Law", "Business", "Arts & Humanities", "Social Sciences"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Student residences", "Off-campus house clusters"],
        notes: "UCT operates 23 student residences. First-year students are prioritised. Mountain-view campus — some residences have stunning views of Table Mountain.",
        link: "https://www.uct.ac.za/students/life/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-04-01", deadline: "2026-07-31", notificationDate: "2026-10-31", status: "open", tuitionUSD: 4800, notes: "South African Rand fees. International students pay higher fee. Apply early — some programs fill by July.", link: "https://www.uct.ac.za/apply" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-04-01", deadline: "2026-10-31", notificationDate: "2026-12-31", status: "open", tuitionUSD: 3600, notes: "NRF funding available for research degrees.", link: "https://www.uct.ac.za/apply" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-04-01", deadline: "2026-10-31", notificationDate: "2026-12-31", status: "open", tuitionUSD: 3600, notes: "NRF and UCT doctoral funding available.", link: "https://www.uct.ac.za/apply" }
      ]
    },

    /* ===== ITALY ===== */
    {
      id: "bocconi", name: "Bocconi University", shortName: "Bocconi",
      country: "Italy", countryCode: "IT", region: "Europe", ranking: 182,
      website: "https://www.unibocconi.eu",
      streams: ["Business", "Economics", "Law", "Social Sciences"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Bocconi residences", "Casa Bocconi"],
        notes: "Bocconi operates its own residences close to campus in Milan. Modern facilities. About 1,400 places — priority for international and scholarship students. Room prices ~900–1,400 EUR/month.",
        link: "https://www.unibocconi.eu/wps/wcm/connect/bocconi/sitopubblico_en/navigation+tree/home/campus+and+city/student+housing"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-02-28", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 15000, notes: "Bocconi Talent Scholarship for top international students. Income-based financial aid also available.", link: "https://www.unibocconi.eu/wps/wcm/connect/bocconi/sitopubblico_en/navigation+tree/home/programs/undergraduate+programs/apply" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 16000, notes: "Bocconi Graduate Merit Award available. Strong in finance, consulting, economics.", link: "https://www.unibocconi.eu/wps/wcm/connect/bocconi/sitopubblico_en/navigation+tree/home/programs/graduate+programs/apply" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-01-31", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 0, notes: "All admitted PhD students receive full funding + stipend.", link: "https://www.unibocconi.eu/wps/wcm/connect/bocconi/sitopubblico_en/navigation+tree/home/programs/phd-programs" }
      ]
    },

    /* ===== NEW ZEALAND ===== */
    {
      id: "uauckland", name: "University of Auckland", shortName: "U Auckland",
      country: "New Zealand", countryCode: "NZ", region: "Asia-Pacific", ranking: 65,
      website: "https://www.auckland.ac.nz",
      streams: ["Sciences", "Engineering", "Business", "Law", "Medicine", "Arts & Humanities", "Architecture", "Education"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residential halls", "Apartments"],
        notes: "Auckland has 8 residential halls. Guaranteed housing for first-year students who apply early. Graduate accommodation also available. Auckland city is expensive for private rentals.",
        link: "https://www.auckland.ac.nz/en/students/student-life/accommodation.html"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-01", notificationDate: "2026-12-31", status: "upcoming", tuitionUSD: 27000, notes: "Also July intake available. New Zealand domestic students pay much lower NZQA rates.", link: "https://www.auckland.ac.nz/en/study/applications-and-admissions.html" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-31", notificationDate: "2027-01-31", status: "upcoming", tuitionUSD: 23000, notes: "", link: "https://www.auckland.ac.nz/en/study/applications-and-admissions/graduate-applications.html" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-07-01", deadline: "2026-12-31", notificationDate: "2027-01-31", status: "upcoming", tuitionUSD: 7000, notes: "University of Auckland Doctoral Scholarship covers fees + stipend.", link: "https://www.auckland.ac.nz/en/study/scholarships-and-awards/doctoral.html" }
      ]
    },

    /* ===== BELGIUM ===== */
    {
      id: "ku_leuven", name: "KU Leuven", shortName: "KU Leuven",
      country: "Belgium", countryCode: "BE", region: "Europe", ranking: 67,
      website: "https://www.kuleuven.be",
      streams: ["Sciences", "Engineering", "Medicine", "Business", "Law", "Arts & Humanities", "Social Sciences", "Agriculture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Kotlabel housing", "University rooms", "Private kots"],
        notes: "Leuven is a student city — the entire economy revolves around university life. KU Leuven facilitates 'kot' (room) searches. Prices are reasonable for Belgium: ~350–700 EUR/month.",
        link: "https://www.kuleuven.be/english/studentlife/accommodation"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-01-15", deadline: "2027-04-01", notificationDate: "2027-07-01", status: "upcoming", tuitionUSD: 1200, notes: "Belgian/EU students pay ~1,200 EUR/yr. Non-EU: ~4,000–10,000 EUR/yr depending on program.", link: "https://www.kuleuven.be/english/admissions/bachelor" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-03-01", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 4500, notes: "KU Leuven International Scholarship for non-EU students with high academic merit.", link: "https://www.kuleuven.be/english/admissions/master" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-05-31", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 1200, notes: "Most PhDs are funded research positions. FWO doctoral fellowships available.", link: "https://www.kuleuven.be/english/research/phd" }
      ]
    },

    /* ===== HONG KONG ===== */
    {
      id: "hku", name: "University of Hong Kong", shortName: "HKU",
      country: "Hong Kong", countryCode: "HK", region: "Asia-Pacific", ranking: 26,
      website: "https://www.hku.hk",
      streams: ["Sciences", "Engineering", "Business", "Law", "Medicine", "Arts & Humanities", "Social Sciences", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Residential colleges", "Student halls"],
        notes: "HKU has 13 residential colleges and halls. First-year non-local students are given priority for on-campus housing. Hong Kong is expensive for off-campus living.",
        link: "https://www.housing.hku.hk"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-09-01", deadline: "2026-12-01", notificationDate: "2027-03-15", status: "upcoming", tuitionUSD: 21000, notes: "HKU Scholarship for international students. Also JUPAS system for local applicants.", link: "https://admissions.hku.hk" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-03-31", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 18000, notes: "", link: "https://gradsch.hku.hk/admission" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-11-01", deadline: "2027-01-31", notificationDate: "2027-04-30", status: "upcoming", tuitionUSD: 12000, notes: "HKU Presidential PhD Scholarship (HKUPFS) offers full funding. Highly competitive.", link: "https://gradsch.hku.hk/admission" }
      ]
    },

    /* ===== DENMARK ===== */
    {
      id: "copenhagen", name: "University of Copenhagen", shortName: "KU Copenhagen",
      country: "Denmark", countryCode: "DK", region: "Europe", ranking: 97,
      website: "https://www.ku.dk/english",
      streams: ["Sciences", "Medicine", "Law", "Social Sciences", "Arts & Humanities", "Business"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["Kollegium (student housing)", "Private rooms"],
        notes: "Student housing in Copenhagen is through the Kollegium system. Apply early via the housing portal. Copenhagen is expensive — budget ~5,000–9,000 DKK/month for a room.",
        link: "https://international.ku.dk/students/practicalities/housing"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2027-01-15", deadline: "2027-03-15", notificationDate: "2027-06-30", status: "upcoming", tuitionUSD: 0, notes: "Free for EU/EEA students. Non-EU: ~95,000 DKK/yr. Apply via optagelse.dk.", link: "https://studies.ku.dk/bachelor/application-and-admission" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2027-01-15", deadline: "2027-03-15", notificationDate: "2027-05-31", status: "upcoming", tuitionUSD: 15000, notes: "UCPH Excellence Programme Scholarships for top non-EU applicants.", link: "https://studies.ku.dk/masters/application-and-admission" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-05-31", notificationDate: "2027-08-31", status: "upcoming", tuitionUSD: 0, notes: "PhD is a paid 3-year employment position (~35,000 DKK/month). Apply to advertised positions.", link: "https://employment.ku.dk/phd" }
      ]
    },

    /* ===== BRAZIL ===== */
    {
      id: "usp", name: "University of São Paulo", shortName: "USP",
      country: "Brazil", countryCode: "BR", region: "Latin America", ranking: 96,
      website: "https://www.usp.br",
      streams: ["Sciences", "Engineering", "Medicine", "Law", "Business", "Arts & Humanities", "Agriculture", "Architecture"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["University housing (CRUSP)", "Student apartments"],
        notes: "USP has CRUSP (Centro Residencial da USP) with ~1,000 units. Priority for low-income students. Graduate housing also available on campus at very low cost.",
        link: "https://www.usp.br/moradiaestudantil"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-06-01", deadline: "2026-10-31", notificationDate: "2027-01-31", status: "upcoming", tuitionUSD: 0, notes: "Free tuition for all enrolled students. FUVEST entrance exam for domestic. International students through bilateral agreements.", link: "https://www.usp.br/international" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-08-01", deadline: "2026-12-31", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 0, notes: "CAPES and FAPESP scholarships available.", link: "https://www.usp.br/international" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-08-01", deadline: "2026-12-31", notificationDate: "2027-02-28", status: "upcoming", tuitionUSD: 0, notes: "FAPESP doctoral scholarship covers stipend. Competitive but generous.", link: "https://www.usp.br/international" }
      ]
    },

    /* ===== NETHERLANDS (extra) ===== */
    {
      id: "uamsterdam", name: "University of Amsterdam", shortName: "UvA",
      country: "Netherlands", countryCode: "NL", region: "Europe", ranking: 58,
      website: "https://www.uva.nl",
      streams: ["Social Sciences", "Sciences", "Arts & Humanities", "Law", "Business", "Economics"],
      levels: ["Bachelor", "Master", "PhD"],
      accommodation: {
        available: true, types: ["DUWO student housing", "Private rooms"],
        notes: "UvA facilitates housing through DUWO. Amsterdam is one of Europe's most expensive cities for housing. Apply for accommodation the moment you receive your offer.",
        link: "https://student.uva.nl/en/content/az/housing/housing.html"
      },
      admissions: [
        { level: "Bachelor", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-04-15", notificationDate: "2027-05-15", status: "upcoming", tuitionUSD: 2400, notes: "EU rate ~2,400 EUR/yr; non-EU ~8,000–15,000 EUR/yr.", link: "https://www.uva.nl/en/education/bachelor-s/apply.html" },
        { level: "Master", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-04-01", notificationDate: "2027-05-01", status: "upcoming", tuitionUSD: 15000, notes: "UvA Holland Scholarship and Amsterdam Merit Scholarship available.", link: "https://www.uva.nl/en/education/master-s/apply.html" },
        { level: "PhD", intake: "Fall", year: 2027, openDate: "2026-10-01", deadline: "2027-06-30", notificationDate: "2027-09-01", status: "upcoming", tuitionUSD: 0, notes: "PhD is a paid 4-year position (~2,800–3,600 EUR/month).", link: "https://vacatures.uva.nl/UvA/search/?q=phd" }
      ]
    }

  ],

  /* ===== METADATA ===== */
  regions: ["North America", "Europe", "Asia-Pacific", "Latin America", "Africa", "Middle East"],

  countries: [
    "Australia", "Belgium", "Brazil", "Canada", "China", "Denmark", "France",
    "Germany", "Hong Kong", "India", "Ireland", "Italy", "Japan", "Netherlands",
    "New Zealand", "Singapore", "South Africa", "South Korea", "Sweden", "Switzerland",
    "United Kingdom", "United States"
  ],

  streams: [
    "Architecture", "Agriculture", "Arts & Humanities", "Business", "Computer Science",
    "Design", "Economics", "Education", "Engineering", "Law", "Mathematics",
    "Medicine", "Sciences", "Social Sciences"
  ],

  levels: ["Bachelor", "Master", "PhD"],

  intakes: ["Fall", "Spring", "Winter", "Summer"]
};
