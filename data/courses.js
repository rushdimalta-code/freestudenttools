/**
 * FreeStudentTools — Courses & Curriculum Data
 * Covers: stream descriptions, typical curricula, assessment methods,
 *         career outcomes, and university-specific programme notes
 * Last updated: 2026-04-13
 */
window.COURSES_DATA = {

  lastUpdated: "2026-04-13",

  streams: {

    "Computer Science": {
      description: "Covers algorithms, software engineering, systems, AI/ML, and theoretical computing. One of the highest-demand degree programmes globally.",
      icon: "💻",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Algorithms & Data Structures", "Programming Languages", "Operating Systems", "Computer Architecture", "Discrete Mathematics", "Database Systems", "Software Engineering", "Computer Networks"],
          electives: ["Machine Learning", "Computer Vision", "Cybersecurity", "Distributed Systems", "Compilers", "Human-Computer Interaction", "Quantum Computing"],
          capstone: "Final year project / dissertation or team software project"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Algorithms", "Research Methods", "Systems Design"],
          specialisations: ["AI & Machine Learning", "Cybersecurity", "Data Science", "Human-Computer Interaction", "Software Engineering", "Distributed Computing"],
          capstone: "Thesis (research track) or project (professional track)"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Original research contribution. Seminar coursework in year 1, then research proposal, annual reviews, and thesis defence.",
          funding: "Most PhD programmes fully funded with teaching/research assistantship."
        }
      },
      assessment: {
        Bachelor: "Mix of written exams (30–50%), programming assignments (30–40%), and group project work (20–30%). Some programmes are 100% coursework.",
        Master: "Project-heavy with written assignments, research seminars, and a thesis or capstone project.",
        PhD: "Qualifying exams, research papers, conference presentations, and final dissertation."
      },
      careers: ["Software Engineer", "Machine Learning Engineer", "Data Scientist", "Research Scientist", "Product Manager (tech)", "Cybersecurity Analyst", "DevOps / Cloud Engineer"],
      universities: {
        mit:        { programName: "Computer Science and Engineering (Course 6-3)", notes: "Integrated with Electrical Engineering. Heavy research focus. Many students pursue MEng after BSc.", admissionsLink: "https://www.eecs.mit.edu/academics-admissions/undergraduate-programs/" },
        stanford:   { programName: "Computer Science (BS/MS/PhD)", notes: "CS department world #1 by many rankings. Strong AI/ML and entrepreneurship culture. Coterminal BS/MS available.", admissionsLink: "https://cs.stanford.edu" },
        cmu:        { programName: "Computer Science (BS/MS/PhD)", notes: "School of Computer Science ranked #1 in US for many years. Separate undergraduate college (SCS). Strong AI and systems research.", admissionsLink: "https://www.cs.cmu.edu" },
        caltech:    { programName: "Computing and Mathematical Sciences (BS/MS/PhD)", notes: "Small cohort, intensive. Cross-disciplinary with mathematics and physics.", admissionsLink: "https://www.cms.caltech.edu" },
        uc_berkeley: { programName: "Computer Science (BS/MS/PhD) / EECS (BS)", notes: "Top 3 CS globally. Strong industry links (Silicon Valley proximity). EECS is highly competitive for direct entry.", admissionsLink: "https://eecs.berkeley.edu" },
        oxford:     { programName: "Computer Science (BA/MEng/MSc/DPhil)", notes: "Oxford offers 3-year BA or 4-year MEng. Emphasis on formal methods and theoretical foundations.", admissionsLink: "https://www.cs.ox.ac.uk/admissions/" },
        cambridge:  { programName: "Computer Science (BA/MEng/MPhil/PhD)", notes: "3-year BA progresses to 4-year MEng. Strong theoretical tradition. Part III highly regarded.", admissionsLink: "https://www.cst.cam.ac.uk/admissions" },
        imperial:   { programName: "Computing (BEng/MEng/MSc/PhD)", notes: "3-year BEng or 4-year MEng. Specialisations in AI, security, visual computing, and intelligent systems.", admissionsLink: "https://www.imperial.ac.uk/computing/prospective-students/" },
        ucl:        { programName: "Computer Science (BSc/MSc/PhD)", notes: "Strong AI and machine learning research. MEng in Computer Science with AI and ML focus.", admissionsLink: "https://www.ucl.ac.uk/computer-science/" },
        eth_zurich: { programName: "Computer Science (BSc/MSc/PhD)", notes: "World-class research. ETH Computer Science ranked top 5 globally. Master's in English, Bachelor's in German.", admissionsLink: "https://inf.ethz.ch" },
        epfl:       { programName: "Computer Science (BSc/MSc/PhD)", notes: "Fully bilingual (French/English at Master's). Strong in distributed systems, security, and data science.", admissionsLink: "https://www.epfl.ch/schools/ic/education/" },
        tsinghua:   { programName: "Computer Science and Technology (BSc/MSc/PhD)", notes: "Top CS programme in China. Admission via Gaokao (domestic) or separate international track. Strong in AI and systems.", admissionsLink: "https://www.cs.tsinghua.edu.cn/csen/index.htm" },
        nus:        { programName: "Computer Science (BSc/MSc/PhD)", notes: "Asia's top CS programme by many rankings. Strong fintech and AI research. 4-year BSc with specialisations.", admissionsLink: "https://www.comp.nus.edu.sg/programmes/ug/cs/" },
        ntu_sg:     { programName: "Computer Science / Computer Engineering (BSc/MSc/PhD)", notes: "Strong in AI, data science, and cybersecurity. Joint degrees with business and law available.", admissionsLink: "https://www.ntu.edu.sg/scse" },
        toronto:    { programName: "Computer Science (BSc/MSc/PhD)", notes: "Home of deep learning pioneers (Hinton). Strong AI and robotics research. Co-op programme available.", admissionsLink: "https://web.cs.toronto.edu" },
        kth:        { programName: "Computer Science (BSc/MSc/PhD)", notes: "Top Scandinavian CS. All Master's in English. Strong in networks, AI, and computer science theory.", admissionsLink: "https://www.kth.se/en/studies/programmes" }
      }
    },

    "Engineering": {
      description: "Broad discipline spanning civil, mechanical, electrical, chemical, and systems engineering. Applied mathematics and physics at its core.",
      icon: "⚙️",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years (BEng) / 4–5 years (MEng integrated)",
          core: ["Mathematics (Calculus, Linear Algebra, Differential Equations)", "Engineering Mechanics", "Thermodynamics", "Materials Science", "Electrical Circuits", "Engineering Design", "CAD/Simulation Tools"],
          electives: ["Vary by specialisation: e.g. Structural Analysis, Control Systems, Chemical Process Design, Biomedical Engineering"],
          capstone: "Final year design project — typically team-based with an industry or research client"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Engineering Mathematics", "Research Methodology"],
          specialisations: ["Civil & Structural", "Mechanical", "Electrical & Electronic", "Chemical & Process", "Aerospace", "Biomedical", "Environmental", "Systems & Control"],
          capstone: "Thesis or major design project"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Original research in a specialised subdiscipline. Lab/experimental or computational focus depending on field.",
          funding: "Funding common via research grants, TA/RA positions."
        }
      },
      assessment: {
        Bachelor: "Mix of closed-book exams (40–60%), lab reports, design coursework, and final year project. Some modules 100% exam-based.",
        Master: "Project reports, assignments, and thesis defence. Less exam-heavy than undergraduate.",
        PhD: "Annual progress reviews, journal publications, conference papers, and thesis defence (viva)."
      },
      careers: ["Civil/Structural Engineer", "Mechanical Engineer", "Electrical Engineer", "Chemical Engineer", "Aerospace Engineer", "Product Designer", "Systems Engineer", "Consulting Engineer"],
      universities: {
        mit:        { programName: "Multiple engineering departments (Course 1–10, 16, 22)", notes: "MIT is globally #1 for engineering. Departments include Civil (Course 1), Mechanical (Course 2), EE/CS (Course 6), Chemical (Course 10), Aerospace (Course 16), Nuclear (Course 22).", admissionsLink: "https://engineering.mit.edu" },
        stanford:   { programName: "School of Engineering (multiple BSc/MS/PhD)", notes: "Strong in Aeronautics, Bioengineering, Civil, ME, and EE. Entrepreneurship integration across all programmes.", admissionsLink: "https://engineering.stanford.edu" },
        caltech:    { programName: "Engineering and Applied Science (BSc/MS/PhD)", notes: "Small, research-intensive. Divisions include Computing + Math Sciences, Engineering + Applied Sciences.", admissionsLink: "https://www.caltech.edu/academics/undergraduate/engineering-and-applied-science" },
        imperial:   { programName: "Faculty of Engineering (BEng/MEng/MSc/PhD)", notes: "UK's top engineering faculty. Departments: Aeronautics, BioEng, Chemical, Civil, Computing, Dyson School (Design), EEE, Mechanical, EPSRC CDTs.", admissionsLink: "https://www.imperial.ac.uk/engineering/" },
        eth_zurich: { programName: "Multiple engineering departments (BSc/MSc/PhD)", notes: "ETH is Europe's top engineering school. Departments: Civil, Mechanical, EE, Chemical, Environmental, Information Technology & EE.", admissionsLink: "https://ethz.ch/en/studies.html" },
        tu_munich:  { programName: "Multiple engineering departments (BSc/MSc/PhD)", notes: "Germany's top technical university. Strong in Mechanical, Electrical, Civil, Aerospace, and Chemical Engineering. Many Master's in English.", admissionsLink: "https://www.tum.de/studium/studienangebot/" },
        tu_delft:   { programName: "Multiple engineering departments (BSc/MSc/PhD)", notes: "Netherlands' top engineering school. Aerospace Engineering, Civil Engineering, and Architecture consistently ranked top 5 in Europe.", admissionsLink: "https://www.tudelft.nl/en/education/programmes" },
        epfl:       { programName: "Multiple engineering schools (BSc/MSc/PhD)", notes: "Strong in Microengineering, Electrical, Life Sciences Engineering, Civil. Most MSc programmes in English.", admissionsLink: "https://www.epfl.ch/education/bachelor/en/" },
        cambridge:  { programName: "Engineering (BA/MEng/PhD)", notes: "4-year integrated MEng (equivalent to BEng + MSc). Unique generalist approach for first 2 years, then specialisation.", admissionsLink: "https://www.eng.cam.ac.uk/admissions" },
        oxford:     { programName: "Engineering Science (MEng/MSc/DPhil)", notes: "4-year integrated MEng. Broad first two years, then specialisation in Information, Energy, Biomedical, or Civil.", admissionsLink: "https://eng.ox.ac.uk/study/undergraduate/" },
        iit_bombay: { programName: "B.Tech / M.Tech / PhD (multiple departments)", notes: "India's top engineering college. Departments: CS, EE, Mech, Civil, Chem, Aero, Metallurgy, and more. JEE Advanced entry.", admissionsLink: "https://www.iitb.ac.in/newacadhome/admissionDetails.jsp" },
        iit_delhi:  { programName: "B.Tech / M.Tech / PhD (multiple departments)", notes: "India's second-ranked IIT. Strong in CS, EE, Mech, Civil. GATE score for M.Tech admissions.", admissionsLink: "https://home.iitd.ac.in/show_more.php?type=academic" },
        kth:        { programName: "Multiple engineering programmes (BSc/MSc/PhD)", notes: "Sweden's top technical university. All MSc taught in English. Strong in ICT, Industrial Tech, and Vehicle Engineering.", admissionsLink: "https://www.kth.se/en/studies/programmes" },
        nus:        { programName: "Faculty of Engineering (BEng/MEng/PhD)", notes: "Asia's top engineering school. Departments: BME, ChBE, CEE, ECE, ISEM, ME. Strong industry partnerships.", admissionsLink: "https://cde.nus.edu.sg/eng/" },
        utokyo:     { programName: "Faculty of Engineering (BSc/MSc/PhD)", notes: "Japan's top engineering school. Extensive range from Civil to Precision Engineering. Admission via Tokyo entrance exam.", admissionsLink: "https://www.t.u-tokyo.ac.jp/en/" }
      }
    },

    "Business": {
      description: "Covers management, finance, marketing, operations, and strategy. Includes MBA programmes and undergraduate business degrees.",
      icon: "📊",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Microeconomics", "Macroeconomics", "Financial Accounting", "Business Statistics", "Marketing Principles", "Organisational Behaviour", "Business Law", "Operations Management"],
          electives: ["Corporate Finance", "Entrepreneurship", "International Business", "Supply Chain", "Digital Marketing", "Business Analytics"],
          capstone: "Business simulation project or consulting case study"
        },
        Master: {
          duration: "1–2 years (MBA typically 2 years)",
          core: ["Strategic Management", "Financial Management", "Leadership", "Managerial Economics", "Data Analytics for Business"],
          specialisations: ["Finance", "Marketing", "Operations", "Entrepreneurship", "International Management", "Sustainability"],
          capstone: "Dissertation, consulting project, or MBA capstone"
        },
        PhD: {
          duration: "4–5 years",
          focus: "Business research across accounting, finance, management, marketing, or operations. Quantitative and qualitative methods.",
          funding: "Most PhD programmes funded at top schools."
        }
      },
      assessment: {
        Bachelor: "Mix of exams (30–50%), essays, case study analyses, group presentations, and internship reports.",
        Master: "Case studies, group projects, consulting deliverables, and a dissertation or capstone project.",
        PhD: "Research seminars, working papers, conference presentations, and thesis defence."
      },
      careers: ["Management Consultant", "Investment Banker", "Product Manager", "Marketing Manager", "Financial Analyst", "Entrepreneur", "General Manager", "Strategy Consultant"],
      universities: {
        harvard:    { programName: "Business Administration (HBS MBA/DBA) | AB (Harvard College)", notes: "HBS MBA is the world's most prestigious. Case-method teaching. Joint degrees with Law, Medicine, Kennedy School.", admissionsLink: "https://www.hbs.edu/mba" },
        stanford:   { programName: "Graduate School of Business (MBA/PhD) | Management Science & Engineering (BS)", notes: "Stanford GSB consistently #1 or #2 globally. Known for entrepreneurship and leadership focus.", admissionsLink: "https://www.gsb.stanford.edu/programs/mba" },
        columbia:   { programName: "Columbia Business School (MBA/EMBA/PhD)", notes: "NYC location gives unmatched finance and media access. Value Investing programme world-renowned.", admissionsLink: "https://business.columbia.edu" },
        nus:        { programName: "Business Administration (BBA/MBA/PhD)", notes: "Top ranked in Asia. NUS Business School is AACSB accredited. Strong fintech and Asian business focus.", admissionsLink: "https://bba.nus.edu.sg" },
        bocconi:    { programName: "Business Administration (BSc/MSc/PhD) | MBA", notes: "Italy's and continental Europe's top business school. All programmes available in English. Strong in finance and luxury management.", admissionsLink: "https://www.unibocconi.eu/wps/wcm/connect/bocconi/sitopubblico_en/navigation+tree/home/programs" },
        hku:        { programName: "Business Administration (BBA/MBA/PhD)", notes: "Hong Kong's top business school. Strong in Chinese business and finance. AACSB and EQUIS accredited.", admissionsLink: "https://www.hkubs.hku.hk" },
        toronto:    { programName: "Rotman Commerce (BCom) | Rotman School of Management (MBA/PhD)", notes: "Rotman MBA ranked top globally. BCom offered through Rotman Commerce with Finance/Accounting/Marketing tracks.", admissionsLink: "https://www.rotman.utoronto.ca" },
        melbourne:  { programName: "Melbourne Business School (MBA) | B.Com (University of Melbourne)", notes: "Australia's top MBA. BCom is an undergraduate degree with many specialisations.", admissionsLink: "https://mbs.edu" },
        iit_bombay: { programName: "MBA (Shailesh J. Mehta School of Management) | BSc Management", notes: "IIT Bombay's management school is highly competitive. Blends engineering and management.", admissionsLink: "https://www.som.iitb.ac.in" },
        sciences_po:{ programName: "Sciences Po Management & Strategy | Paris School of International Affairs", notes: "Sciences Po is France's most prestigious social sciences institution. Strong international management and public policy programmes.", admissionsLink: "https://www.sciencespo.fr/en/education/programs.html" }
      }
    },

    "Sciences": {
      description: "Natural sciences including Physics, Chemistry, Biology, Mathematics, and Earth Sciences. Foundation for research and applied disciplines.",
      icon: "🔬",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Mathematics (Calculus, Linear Algebra)", "Physics", "Chemistry", "Biology", "Statistics", "Scientific Writing", "Laboratory Techniques"],
          electives: ["Vary by specialisation: Quantum Mechanics, Molecular Biology, Organic Chemistry, Astrophysics, Earth Sciences"],
          capstone: "Final year research project / laboratory dissertation"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Research Methods", "Specialist seminars"],
          specialisations: ["Physics", "Chemistry", "Biochemistry", "Neuroscience", "Environmental Science", "Astronomy & Astrophysics", "Geology"],
          capstone: "Research thesis (most programmes)"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Original scientific research. Lab-based or theoretical/computational. Publication in peer-reviewed journals expected.",
          funding: "Almost always fully funded with stipend."
        }
      },
      assessment: {
        Bachelor: "Exams (40–60%), lab reports (20–30%), research projects (20%). Some programmes include field work.",
        Master: "Research seminars, written assignments, and thesis.",
        PhD: "Annual progression reports, publications, and thesis defence (viva)."
      },
      careers: ["Research Scientist", "Data Analyst", "Pharmaceutical Researcher", "Environmental Consultant", "Science Communicator", "Patent Examiner", "Teaching"],
      universities: {
        caltech:    { programName: "Physics / Chemistry / Biology / Astronomy (BSc/MSc/PhD)", notes: "World-leading research in all natural sciences. Nobel laureate faculty. Smallest student body of any top university.", admissionsLink: "https://www.caltech.edu/academics" },
        cambridge:  { programName: "Natural Sciences (BA/MSci/PhD)", notes: "Cambridge's Natural Sciences Tripos is unique — students study multiple sciences simultaneously before specialising. Among the world's best.", admissionsLink: "https://www.undergraduate.study.cam.ac.uk/courses/natural-sciences" },
        oxford:     { programName: "Physics / Chemistry / Biochemistry / Earth Sciences / Biology (BA/MChem/MPhys/DPhil)", notes: "Oxford offers integrated 4-year master's in most sciences. Tutorial-based teaching.", admissionsLink: "https://www.ox.ac.uk/admissions/undergraduate/courses" },
        eth_zurich: { programName: "Physics / Chemistry / Biology / Earth Sciences (BSc/MSc/PhD)", notes: "ETH sciences consistently ranked top 5 globally. Bachelor's in German, Master's in English.", admissionsLink: "https://ethz.ch/en/studies/programmes.html" },
        epfl:       { programName: "Physics / Chemistry / Life Sciences (BSc/MSc/PhD)", notes: "Strong in physics, life sciences engineering, and chemistry. Small, elite cohort.", admissionsLink: "https://www.epfl.ch/education/bachelor/en/" },
        tsinghua:   { programName: "Physics / Chemistry / Biology (BSc/MSc/PhD)", notes: "China's top science university. Physics and Chemistry highly ranked. International students admitted via direct application.", admissionsLink: "https://www.tsinghua.edu.cn/en/Admission.htm" },
        anu:        { programName: "Science (BSc/MSc/PhD)", notes: "Australia's top research university for science. Based in Canberra. Strong in Astrophysics, Climate Science, Chemistry.", admissionsLink: "https://www.anu.edu.au/study/find-a-degree/science" },
        utokyo:     { programName: "Science (BSc/MSc/PhD)", notes: "Japan's top science institution. Faculty of Science covers Physics, Chemistry, Earth Science, Biology, Astronomy.", admissionsLink: "https://www.s.u-tokyo.ac.jp/en/" },
        ku_leuven:  { programName: "Sciences (BSc/MSc/PhD)", notes: "Belgium's top research university. Sciences in Dutch (Bachelor) and English (Master). Strong in Chemistry, Physics, Biology.", admissionsLink: "https://www.kuleuven.be/english/education/study/programmes" }
      }
    },

    "Medicine": {
      description: "Clinical medicine, surgery, and health sciences. Typically 5–6 years undergraduate or graduate-entry (4 years). Highly competitive entry.",
      icon: "🏥",
      typicalCurriculum: {
        Bachelor: {
          duration: "5–6 years (integrated BSc+MB/BChir/MBBCh)",
          core: ["Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology", "Clinical Skills", "Medical Ethics"],
          electives: ["Intercalated BSc (UK system)", "Research SSCs", "Global Health", "Medical Education"],
          capstone: "Clinical placement years (years 3–6) across hospital wards, GP, surgery, and specialties"
        },
        Master: {
          duration: "1–2 years (MSc in Health Sciences / Public Health / Clinical Research)",
          core: ["Epidemiology", "Research Methods", "Biostatistics"],
          specialisations: ["Global Health", "Public Health", "Clinical Neuroscience", "Oncology", "Medical Education"],
          capstone: "Research dissertation"
        },
        PhD: {
          duration: "3–4 years (MD-PhD often 7–8 years combined)",
          focus: "Translational research, basic science, clinical trials, or public health. Lab and clinical components.",
          funding: "Often funded for MPhil/PhD. MD-PhD at US schools fully funded with stipend."
        }
      },
      assessment: {
        Bachelor: "Exams (written OSCEs/MCQs), clinical assessments, practical OSCE stations, and portfolio of clinical experience.",
        Master: "Written assignments, research dissertation, and sometimes clinical placement.",
        PhD: "Annual reviews, ethics approvals for clinical research, publications, and thesis defence."
      },
      careers: ["Doctor (GP/Hospital)", "Surgeon", "Research Physician", "Public Health Officer", "Pharmaceutical Physician", "Medical Consultant", "Global Health Specialist"],
      universities: {
        harvard:    { programName: "Harvard Medical School (MD/MD-PhD/MS)", notes: "World #1 medical school. MD is graduate-entry (4 years). Affiliated hospitals: MGH, Brigham and Women's, Dana-Farber. MD-PhD Harvard-MIT funded.", admissionsLink: "https://hms.harvard.edu/education/md-programs" },
        stanford:   { programName: "Stanford School of Medicine (MD/MD-PhD/MS/PhD)", notes: "Top 5 medical school. Graduate-entry MD (4 years). Known for translational research and health technology innovation.", admissionsLink: "https://med.stanford.edu/md-program.html" },
        oxford:     { programName: "Medicine (BM BCh — 6 years integrated)", notes: "UK's top medical school. 3 years pre-clinical (includes compulsory intercalated BSc), 3 years clinical. Tutorial-based pre-clinical teaching.", admissionsLink: "https://www.medsci.ox.ac.uk/study/medicine" },
        cambridge:  { programName: "Medicine (MB/BChir — 6 years integrated)", notes: "3 years pre-clinical (Natural Sciences-based, can intercalate an additional year), 3 years clinical based at Addenbrooke's Hospital.", admissionsLink: "https://www.undergraduate.study.cam.ac.uk/courses/medicine" },
        imperial:   { programName: "Medicine (MBBS — 6 years or 4-year graduate entry)", notes: "UK's largest medical school. Strong in research and clinical innovation. 6-year MBBS or 4-year GEP for graduates.", admissionsLink: "https://www.imperial.ac.uk/medicine/study/" },
        ucl:        { programName: "MBBS Medicine (6 years) / iBSc intercalated", notes: "London-based clinical training. Strong global health and research focus. Intercalated BSc compulsory in year 3.", admissionsLink: "https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/medicine-mbbs" },
        melbourne:  { programName: "Doctor of Medicine (MD — 4 years graduate entry)", notes: "Australia's top medical school. Graduate-entry only. Affiliated with major Melbourne hospitals.", admissionsLink: "https://medicine.unimelb.edu.au/study-with-us/medicine-dentistry-health-sciences/study/doctor-of-medicine" },
        nus:        { programName: "Medicine (MBBS — 5 years)", notes: "Singapore's top medical school. MBBS is 5-year undergraduate entry. Research year option available.", admissionsLink: "https://medicine.nus.edu.sg/mbbs" },
        ku_leuven:  { programName: "Medicine (MSc Medicine — 6 years, Belgian system)", notes: "Belgium's top medical school. All in Dutch. Recognised across EU. Strong in cardiology, oncology research.", admissionsLink: "https://www.kuleuven.be/english/education/study/programmes/programmes/master-of-medicine-in-medicine" }
      }
    },

    "Law": {
      description: "Legal studies covering common law, civil law, international law, and various specialisations. Entry through LLB or graduate JD/LLM.",
      icon: "⚖️",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years (LLB/BA Law)",
          core: ["Contract Law", "Tort Law", "Constitutional/Public Law", "Criminal Law", "Land/Property Law", "Equity & Trusts", "EU Law (European programmes)", "Legal Research & Writing"],
          electives: ["International Law", "Commercial Law", "Human Rights", "IP Law", "Tax Law", "Environmental Law", "Company Law"],
          capstone: "Dissertation or mooting competitions"
        },
        Master: {
          duration: "1–2 years (LLM) / 3 years (JD — US/Canada)",
          core: ["Legal Research Methodology", "Core law subjects by specialisation"],
          specialisations: ["International Law", "Corporate & Commercial Law", "Human Rights Law", "Tax Law", "IP & Technology Law", "Environmental Law"],
          capstone: "LLM dissertation or JD exams"
        },
        PhD: {
          duration: "3–5 years (SJD/LLD/DPhil)",
          focus: "Original legal scholarship. Theoretical, comparative, or empirical legal research.",
          funding: "Varies — scholarships competitive, less commonly fully funded than STEM."
        }
      },
      assessment: {
        Bachelor: "Written problem questions and essays under exam conditions (60–80%), plus essays and moots (20–40%). Oxford and Cambridge use unseen written papers.",
        Master: "Research papers, seminar participation, and a dissertation (15,000–30,000 words for LLM).",
        PhD: "Annual supervisory review, legal seminars, and thesis defence."
      },
      careers: ["Solicitor / Attorney", "Barrister / Advocate", "In-House Counsel", "International Arbitration", "Human Rights Lawyer", "Judge (via legal career path)", "Legal Academic", "Policy Advisor"],
      universities: {
        harvard:    { programName: "Harvard Law School (JD/LLM/SJD)", notes: "World's most famous law school. JD is 3-year graduate entry. LLM open to law graduates globally. Harvard Law Review most cited US legal journal.", admissionsLink: "https://hls.harvard.edu/jd-program/" },
        yale:       { programName: "Yale Law School (JD/LLM/JSD)", notes: "Smallest but consistently ranked #1. 2:1 faculty-student ratio. No grades — pass/fail system for first-year. Focus on theoretical and public interest law.", admissionsLink: "https://law.yale.edu/studying-law-yale/degree-programs" },
        oxford:     { programName: "Law (BA/BCL/MJur/DPhil)", notes: "Oxford BCL (Bachelor of Civil Law) is a one-year taught Masters for top law graduates globally. One of the most prestigious postgraduate law degrees.", admissionsLink: "https://www.law.ox.ac.uk/admissions" },
        cambridge:  { programName: "Law (BA/LLM/PhD)", notes: "Cambridge Law Tripos is 3 years (Part IA, IB, II). LLM is 9-month taught programme for graduates.", admissionsLink: "https://www.law.cam.ac.uk/admissions" },
        ucl:        { programName: "Law (LLB/LLM/PhD)", notes: "UCL Laws is London's top law school. Strong in international and comparative law. US-style JD offered as LLM pathway.", admissionsLink: "https://www.ucl.ac.uk/laws/study" },
        columbia:   { programName: "Columbia Law School (JD/LLM/Executive LLM/JSD)", notes: "NYC-based, major corporate law stronghold. LLM for foreign-trained lawyers is highly regarded.", admissionsLink: "https://www.law.columbia.edu" },
        sciences_po:{ programName: "Master in International Economic Policy / European Affairs / Global Affairs", notes: "Sciences Po is not strictly a law school but its law-adjacent programmes in international and European law are world-class.", admissionsLink: "https://www.sciencespo.fr/en/education/programs.html" },
        nus:        { programName: "Law (LLB/LLM/PhD)", notes: "Asia's top law school. Common law (English) system. Singapore as a global arbitration hub makes NUS Law highly relevant.", admissionsLink: "https://law.nus.edu.sg" },
        toronto:    { programName: "Faculty of Law (JD/LLM/SJD)", notes: "Canada's top law school. JD is 3-year graduate entry. Strong in common law, constitutional law, and international law.", admissionsLink: "https://www.law.utoronto.ca/programs" }
      }
    },

    "Arts & Humanities": {
      description: "Literature, languages, history, philosophy, and cultural studies. Develops analytical writing, critical thinking, and cross-cultural understanding.",
      icon: "🎭",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Academic Writing & Research", "Critical Theory", "History of Ideas", "Language study (modern or classical)", "Primary source analysis"],
          electives: ["Literature (English, Comparative, World)", "History", "Philosophy", "Linguistics", "Film Studies", "Religious Studies", "Classical Studies"],
          capstone: "Dissertation (8,000–15,000 words typically)"
        },
        Master: {
          duration: "1–2 years",
          core: ["Research methods in humanities", "Advanced seminars in specialisation"],
          specialisations: ["Comparative Literature", "Modern History", "Philosophy", "Cultural Studies", "Linguistics", "Classics", "Religious Studies"],
          capstone: "Thesis or extended research paper"
        },
        PhD: {
          duration: "3–6 years",
          focus: "Original scholarly contribution via archival research, textual analysis, or philosophical argumentation.",
          funding: "Less commonly funded than STEM; fully funded PhDs exist at top UK/US schools."
        }
      },
      assessment: {
        Bachelor: "Essays and dissertations (70–100%). Oxford and Cambridge use unseen written exam papers heavily. Some creative or performance-based assessment.",
        Master: "Long essays, seminar presentations, and a thesis.",
        PhD: "Annual reviews, conference papers, and thesis defence (viva)."
      },
      careers: ["Academic / Lecturer", "Journalist", "Writer / Editor", "Museum / Gallery Curator", "Civil Service / Policy", "Publishing", "Law (via conversion)", "NGO & International Development"],
      universities: {
        oxford:     { programName: "English / History / Philosophy / Classics / Linguistics / MLAC (BA/MPhil/DPhil)", notes: "Oxford humanities are world #1 across multiple disciplines. Tutorial system gives 1:1 academic feedback. Bodleian Library is a world-class research resource.", admissionsLink: "https://www.ox.ac.uk/admissions/undergraduate/courses" },
        cambridge:  { programName: "English / History / Philosophy / Classics / MML / AMES (BA/MPhil/PhD)", notes: "Cambridge humanities rivals Oxford globally. Supervision system. Strong classical and medieval studies tradition.", admissionsLink: "https://www.undergraduate.study.cam.ac.uk/courses" },
        yale:       { programName: "Humanities BA / MA / PhD (multiple departments)", notes: "Yale's residential college system creates a distinctive humanities culture. Strong in theatre, music, philosophy, and history.", admissionsLink: "https://www.yale.edu/academics" },
        columbia:   { programName: "Core Curriculum (liberal arts BA) + Humanities MAs/PhDs", notes: "Columbia's Core is the gold standard liberal arts foundation. Literature Humanities and Contemporary Civilisation are iconic courses.", admissionsLink: "https://www.college.columbia.edu/core" },
        sciences_po:{ programName: "History / Political Science / Sociology / Humanities (BA/MA/PhD)", notes: "Sciences Po is France's top social sciences and humanities institution. Deeply international — 50% of students from outside France.", admissionsLink: "https://www.sciencespo.fr/en/education/programs.html" },
        edinburgh:  { programName: "English Literature / History / Philosophy / Classics / Celtic Studies (MA/MSc/PhD)", notes: "Scottish MA is 4-year undergraduate degree. Edinburgh has particular strength in Philosophy (Edinburgh School of Thought) and Scottish history.", admissionsLink: "https://www.ed.ac.uk/studying/undergraduate/degrees" },
        trinity_dublin: { programName: "Arts (English, History, Philosophy, Classics, Drama — BA/MPhil/PhD)", notes: "Ireland's oldest and most prestigious university. Strong liberal arts tradition. TSM (Two Subject Moderatorship) allows combining disciplines.", admissionsLink: "https://www.tcd.ie/study/undergraduate/" }
      }
    },

    "Social Sciences": {
      description: "Political science, sociology, psychology, anthropology, geography, and related disciplines. Empirical and theoretical approaches to human society.",
      icon: "🌐",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Research Methods (Quantitative and Qualitative)", "Statistics for Social Sciences", "Introduction to core discipline (Psychology/Sociology/Politics)", "Essay writing and argumentation"],
          electives: ["International Relations", "Behavioural Economics", "Development Studies", "Gender Studies", "Urban Studies", "Political Theory", "Cognitive Psychology"],
          capstone: "Dissertation with original data collection or analysis"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Research Methods", "Policy Analysis or Research Design"],
          specialisations: ["International Relations", "Development Economics", "Clinical Psychology", "Public Policy", "Urban Planning", "Political Theory", "Cognitive Science"],
          capstone: "Research dissertation"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Original empirical or theoretical research. Fieldwork, surveys, or experimental methods.",
          funding: "ESRC and equivalent bodies fund PhDs at top UK institutions. US top programmes often funded."
        }
      },
      assessment: {
        Bachelor: "Essays and exams (40–80%), plus research project or dissertation in final year.",
        Master: "Research papers, statistical analysis assignments, and dissertation.",
        PhD: "Annual reviews, conference presentations, and thesis defence."
      },
      careers: ["Policy Analyst", "Social Researcher", "Psychologist / Counsellor", "NGO Worker", "Diplomat", "Academic", "Journalist", "Data Analyst (social sciences)"],
      universities: {
        harvard:    { programName: "Government / Psychology / Sociology / Anthropology (AB/AM/PhD)", notes: "Harvard's Kennedy School (public policy/government) is globally #1. Department of Psychology known for behavioural economics research.", admissionsLink: "https://hks.harvard.edu" },
        oxford:     { programName: "PPE / Sociology / Politics / Psychology (BA/MPhil/DPhil)", notes: "Oxford's PPE (Philosophy, Politics & Economics) is the UK's most famous undergraduate programme — routinely produces politicians, economists, and journalists.", admissionsLink: "https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-politics-and-economics" },
        sciences_po:{ programName: "Political Science / International Affairs / Sociology (BA/MA/PhD)", notes: "Sciences Po is the world's top institution for political science and international affairs. Produces a disproportionate share of French and EU political leaders.", admissionsLink: "https://www.sciencespo.fr/en/education/programs.html" },
        columbia:   { programName: "Political Science / Sociology / Anthropology / Psychology (BA/MA/PhD)", notes: "NYC setting gives unique access to UN, finance, and global NGOs. SIPA (School of International and Public Affairs) highly regarded.", admissionsLink: "https://sipa.columbia.edu" },
        nus:        { programName: "Social Sciences (BSocSci/MA/PhD)", notes: "Strong in Southeast Asian studies, communications, psychology, and political science. Asia-centric curriculum.", admissionsLink: "https://www.fas.nus.edu.sg" },
        lse:        { programName: "Not in database — see UCL/Edinburgh", notes: "Note: LSE is not in the comparison database.", admissionsLink: "" },
        mcgill:     { programName: "Political Science / Sociology / Psychology / Anthropology (BA/MA/PhD)", notes: "Strong bilingual (English/French) social sciences in Montreal. Research-intensive with connections to Canadian government and policy.", admissionsLink: "https://www.mcgill.ca/arts/" }
      }
    },

    "Economics": {
      description: "Theoretical and applied economics. Overlaps with mathematics, statistics, and policy. One of the most flexible and employable degrees.",
      icon: "📈",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Microeconomics", "Macroeconomics", "Mathematics for Economists", "Econometrics", "Statistics", "Game Theory", "Development Economics"],
          electives: ["Behavioural Economics", "Public Economics", "International Trade", "Labour Economics", "Financial Economics", "Economic History"],
          capstone: "Economics dissertation or research project"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Microeconomics", "Advanced Macroeconomics", "Econometrics"],
          specialisations: ["Financial Economics", "Development Economics", "Public Policy", "Quantitative Economics", "International Economics"],
          capstone: "Research thesis or research paper"
        },
        PhD: {
          duration: "5–6 years (US) / 3–4 years (UK/EU)",
          focus: "Theoretical or empirical economics research. First 2 years: intensive coursework + qualifying exams. Then research.",
          funding: "Fully funded with stipend at top economics PhD programmes globally."
        }
      },
      assessment: {
        Bachelor: "Problem sets and written exams (60–80%), econometric assignments, and a final dissertation.",
        Master: "Problem sets, empirical project assignments, and research paper or thesis.",
        PhD: "Qualifying exams (notorious in US programmes), field papers, and dissertation."
      },
      careers: ["Economist (central bank, government, IMF/World Bank)", "Financial Analyst", "Management Consultant", "Data Scientist", "Policy Adviser", "Investment Banker", "Academic Researcher"],
      universities: {
        oxford:     { programName: "Economics / PPE / Economics & Management (BA/MPhil/DPhil)", notes: "Oxford Economics and PPE (Philosophy, Politics & Economics) are globally elite. MPhil in Economics is a research preparation degree.", admissionsLink: "https://www.economics.ox.ac.uk/study-with-us" },
        cambridge:  { programName: "Economics (BA/MPhil/PhD)", notes: "Cambridge Economics Tripos is a rigorous 3-year degree. Cambridge Marshall Library is one of the best economics libraries globally.", admissionsLink: "https://www.econ.cam.ac.uk/study-at-cambridge" },
        ucl:        { programName: "Economics / Economics & Statistics (BSc/MSc/PhD)", notes: "Strong quantitative and empirical economics. UCL Economics is a top European department. Many joint programmes available.", admissionsLink: "https://www.ucl.ac.uk/economics/" },
        tsinghua:   { programName: "Economics (BA/MA/PhD)", notes: "China's top economics programme. Strong in development economics and Chinese macroeconomics. Increasing number of English-taught courses.", admissionsLink: "https://www.sem.tsinghua.edu.cn/en/" },
        bocconi:    { programName: "Economics / Finance / CLEF (BSc/MSc/PhD)", notes: "Italy's top economics institution. Highly rigorous quantitative approach. Most BSc and all MSc programmes offered in English.", admissionsLink: "https://www.unibocconi.eu/wps/wcm/connect/bocconi/sitopubblico_en/navigation+tree/home/programs/bachelor+of+science+programs" },
        utokyo:     { programName: "Economics (BA/MA/PhD)", notes: "Japan's top economics faculty. Admission via Tokyo entrance exam. Strong in Japanese/Asian economic development.", admissionsLink: "https://www.e.u-tokyo.ac.jp/en/" },
        snu:        { programName: "Economics (BA/MA/PhD)", notes: "Korea's top economics department. Strong in Korean economic development, international economics. Some English-taught graduate programmes.", admissionsLink: "https://econ.snu.ac.kr/en" }
      }
    },

    "Architecture": {
      description: "Design of buildings, urban spaces, and environments. Combines technical knowledge with creative design. Typically leads to professional accreditation.",
      icon: "🏛️",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–5 years (BArch / BA Arch)",
          core: ["Architectural Design Studio", "History & Theory of Architecture", "Structures & Materials", "Environmental Systems (Lighting, Acoustics, HVAC)", "Digital Representation (CAD, BIM, Rhino)", "Urban Design"],
          electives: ["Landscape Architecture", "Interior Architecture", "Sustainable Design", "Conservation", "Housing"],
          capstone: "Final design thesis project — a major design studio work with presentation"
        },
        Master: {
          duration: "2 years (MArch — required for licensure in most countries)",
          core: ["Advanced Design Studio", "Structures", "Professional Practice & Law", "Thesis"],
          specialisations: ["Urban Design", "Sustainable Architecture", "Digital Architecture", "Historic Preservation", "Housing"],
          capstone: "MArch design thesis"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Architectural history, theory, computation, or sustainability research.",
          funding: "Variable — less commonly funded than STEM."
        }
      },
      assessment: {
        Bachelor: "Design studios (40–60%) assessed via critique ('crit') presentations, plus technical drawings, essays, and model-making.",
        Master: "Advanced design crits, technical submissions, and thesis.",
        PhD: "Annual reviews and thesis."
      },
      careers: ["Architect (RIBA/AIA after licensure)", "Urban Designer", "Interior Designer", "Landscape Architect", "Construction Project Manager", "Heritage Consultant"],
      universities: {
        mit:        { programName: "Architecture (BS Arch/MArch/SMArchS/PhD)", notes: "MIT School of Architecture + Planning ranked #1 globally. Strong in computational design, sustainability, and housing.", admissionsLink: "https://architecture.mit.edu/architecture" },
        uc_berkeley: { programName: "Architecture (BA/MArch/MUD/PhD)", notes: "Top 5 globally. College of Environmental Design. Strong in sustainability and urban design. Bay Area context shapes practice.", admissionsLink: "https://ced.berkeley.edu/academics/architecture" },
        tu_delft:   { programName: "Architecture (BSc/MSc/PhD)", notes: "Europe's top architecture school by many rankings. Strong in urbanism, technology, and Dutch spatial planning tradition.", admissionsLink: "https://www.tudelft.nl/en/education/programmes/bachelors/architecture" },
        eth_zurich: { programName: "Architecture (BSc/MSc/PhD)", notes: "World-class architecture programme. ETH's architecture school shaped modern Swiss architectural tradition. Studio-focused with research emphasis.", admissionsLink: "https://arch.ethz.ch" },
        ucl:        { programName: "Architecture (BA/MArch/MA/PhD) — Bartlett School of Architecture", notes: "Bartlett is UK's top architecture school. Known for creative, experimental approach. BArch (BA+MArch pathway) and standalone MArch available.", admissionsLink: "https://www.ucl.ac.uk/bartlett/architecture/" }
      }
    },

    "Design": {
      description: "Product design, graphic design, UX/interaction design, and creative industries. Blends creative thinking with user-centred methodology.",
      icon: "🎨",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Design Thinking", "Visual Communication", "Typography & Layout", "User Experience / HCI", "Prototyping & Making", "Design History & Theory", "Studio Projects"],
          electives: ["Digital Product Design", "Industrial / Product Design", "Motion Graphics", "Service Design", "Design for Sustainability"],
          capstone: "Final major project with portfolio presentation"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Design Research", "User-Centred Design Methods"],
          specialisations: ["Interaction Design", "Industrial Design", "Visual Communication", "Design Management", "Service Design", "Speculative Design"],
          capstone: "Major design research project or thesis"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Design research, design theory, or practice-based research.",
          funding: "Variable."
        }
      },
      assessment: {
        Bachelor: "Portfolio reviews, studio crits, project presentations, and essays.",
        Master: "Design research projects, presentations, and thesis.",
        PhD: "Annual reviews and thesis."
      },
      careers: ["UX / Product Designer", "Industrial Designer", "Graphic Designer", "Creative Director", "Design Researcher", "Brand Strategist"],
      universities: {
        stanford:   { programName: "Product Design (BS) / HCI (MSc) / d.school (courses)", notes: "Stanford d.school (Hasso Plattner Institute of Design) is the global birthplace of design thinking. Product design BSc is highly competitive.", admissionsLink: "https://designprogram.stanford.edu" },
        cmu:        { programName: "School of Design (BDes/MDes/PhD)", notes: "Top design school globally. Strong in interaction design, communication design, and design research. Close ties to CS and HCI.", admissionsLink: "https://design.cmu.edu" },
        tu_delft:   { programName: "Industrial Design Engineering (BSc/MSc/PhD)", notes: "One of the world's best industrial design programmes. Highly technical approach. Products, systems, and sustainable innovation.", admissionsLink: "https://www.tudelft.nl/en/education/programmes/bachelors/ide/bachelor-of-science-in-industrial-design-engineering" },
        nus:        { programName: "Industrial Design (BA/MID)", notes: "Asia's leading design school. Strong in user-centred and sustainable design. Cross-faculty collaboration with engineering.", admissionsLink: "https://cde.nus.edu.sg/id/" },
        ntu_sg:     { programName: "Art, Design & Media (BA/MA)", notes: "Strong digital design, interactive media, and visual communication programmes. ADM school's industry partnerships are strong.", admissionsLink: "https://www.ntu.edu.sg/adm" }
      }
    },

    "Mathematics": {
      description: "Pure and applied mathematics, statistics, and mathematical physics. Foundation for many technical fields.",
      icon: "➗",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Calculus & Analysis", "Linear Algebra", "Abstract Algebra", "Real & Complex Analysis", "Topology", "Number Theory", "Differential Equations", "Probability & Statistics"],
          electives: ["Mathematical Physics", "Numerical Methods", "Combinatorics", "Geometry", "Mathematical Logic", "Applied Mathematics"],
          capstone: "Mathematics dissertation or research essay"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Analysis or Algebra", "Research Seminar"],
          specialisations: ["Pure Mathematics", "Applied Mathematics", "Statistics", "Mathematical Finance", "Mathematical Physics"],
          capstone: "Master's thesis"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Original mathematical research. Pure or applied. Expected to prove new theorems or make significant computational contributions.",
          funding: "Fully funded with stipend at all top mathematics departments."
        }
      },
      assessment: {
        Bachelor: "Written exams (70–90%). Mathematics degrees at Oxford/Cambridge are heavily exam-based. Problem sets and essays in some courses.",
        Master: "Written examinations and research dissertation.",
        PhD: "Annual progress seminars, publications or preprints, and thesis defence."
      },
      careers: ["Research Mathematician", "Statistician / Data Scientist", "Actuary", "Financial Quant", "Cryptographer", "Software Engineer", "Academic"],
      universities: {
        cambridge:  { programName: "Mathematics (BA/MMath/Part III/PhD)", notes: "Cambridge Part III (Master of Mathematics) is considered the world's hardest and most prestigious mathematics postgraduate exam. Multiple Fields Medal winners trained here.", admissionsLink: "https://www.maths.cam.ac.uk/admissions" },
        oxford:     { programName: "Mathematics / Maths & Statistics / Maths & Philosophy (BA/MMath/MSc/DPhil)", notes: "4-year MMath available. Oxford Mathematical Institute has outstanding research groups in geometry, number theory, and applied mathematics.", admissionsLink: "https://www.maths.ox.ac.uk/study-here" },
        eth_zurich: { programName: "Mathematics / Applied Mathematics (BSc/MSc/PhD)", notes: "ETH Mathematics is Europe's strongest mathematics department by many metrics. Strong in analysis, algebra, and mathematical physics.", admissionsLink: "https://math.ethz.ch/studies.html" },
        epfl:       { programName: "Mathematics (BSc/MSc/PhD)", notes: "EPFL's mathematics school has grown to world-class status. Strong in geometry, number theory, and mathematical physics.", admissionsLink: "https://www.epfl.ch/schools/sb/research/math/" }
      }
    },

    "Education": {
      description: "Teaching, educational leadership, curriculum design, and educational research. Paths into primary, secondary, and higher education.",
      icon: "📚",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years (BA Education or BEd)",
          core: ["Child Development & Learning Theory", "Curriculum Design", "Assessment & Evaluation", "Inclusive Education", "Educational Psychology", "Classroom Management", "Teaching Practice (placements)"],
          electives: ["STEM Education", "Early Childhood Education", "Special Educational Needs", "Educational Technology", "Arts Education"],
          capstone: "Extended school teaching placement + portfolio"
        },
        Master: {
          duration: "1–2 years",
          core: ["Educational Research Methods", "Learning Sciences", "Policy & Leadership"],
          specialisations: ["Educational Technology", "TESOL/Applied Linguistics", "Educational Leadership", "Curriculum Studies", "Special Education"],
          capstone: "Dissertation or research project"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Educational research — qualitative, quantitative, or mixed methods. Focus on learning, policy, technology, or equity.",
          funding: "Partially funded at top schools. Commonwealth PhD scholarships available."
        }
      },
      assessment: {
        Bachelor: "Placement assessments, essays and reflective journals, lesson plans, and a dissertation.",
        Master: "Research papers, seminars, and dissertation.",
        PhD: "Annual reviews, conference presentations, and thesis."
      },
      careers: ["Primary / Secondary Teacher", "School Leader / Headteacher", "Educational Researcher", "Curriculum Designer", "EdTech Professional", "University Lecturer", "Educational Policy Adviser"],
      universities: {
        harvard:    { programName: "Harvard Graduate School of Education (EdM/EdD/PhD)", notes: "World's top education school. EdM is 1-year professional master's. EdD for practitioners, PhD for researchers.", admissionsLink: "https://www.gse.harvard.edu" },
        stanford:   { programName: "Graduate School of Education (MA/EdD/PhD)", notes: "Top 2 education school globally. Strong in learning sciences, policy, and educational technology.", admissionsLink: "https://ed.stanford.edu" },
        ntu_sg:     { programName: "National Institute of Education (BEd/PGDE/MEd/PhD)", notes: "Singapore's only teacher training institution. NIE is world-renowned for Singapore's successful education system.", admissionsLink: "https://www.nie.edu.sg/our-programmes" },
        umelbourne: { programName: "Melbourne Graduate School of Education (MTeach/MEd/EdD/PhD)", notes: "Australia's top education school. Master of Teaching (MTeach) is the flagship initial teacher education programme.", admissionsLink: "https://education.unimelb.edu.au" },
        toronto:    { programName: "Ontario Institute for Studies in Education (BEd/MEd/EdD/PhD)", notes: "Canada's top education school. OISE is research-intensive with strong equity, curriculum, and counselling psychology divisions.", admissionsLink: "https://www.oise.utoronto.ca/programs" }
      }
    },

    "Agriculture": {
      description: "Agricultural science, food science, veterinary studies, and sustainable farming. Increasingly important given climate and food security challenges.",
      icon: "🌾",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["Soil Science", "Plant Biology & Agronomy", "Animal Science", "Agricultural Economics", "Food Chemistry & Technology", "Pest & Disease Management", "Agricultural Engineering"],
          electives: ["Sustainable Agriculture", "Precision Farming / AgTech", "Food Policy", "Veterinary Sciences", "Horticulture"],
          capstone: "Farm placement or research dissertation"
        },
        Master: {
          duration: "1–2 years",
          core: ["Research Methods in Agriculture", "Specialist seminars"],
          specialisations: ["Crop Science", "Animal Science", "Food Technology", "Sustainable Agriculture", "Agricultural Economics"],
          capstone: "Research thesis"
        },
        PhD: {
          duration: "3–4 years",
          focus: "Field trials, laboratory research, or policy analysis in agricultural or food systems.",
          funding: "Often funded via research councils or agricultural industry grants."
        }
      },
      assessment: {
        Bachelor: "Written exams, practical lab/field reports, and a dissertation.",
        Master: "Research seminars, field reports, and thesis.",
        PhD: "Field work reviews and thesis."
      },
      careers: ["Agricultural Scientist", "Farm Manager", "Food Technologist", "Environmental Consultant", "AgTech Entrepreneur", "Policy Adviser", "Veterinarian (via vet school)"],
      universities: {
        usydney:    { programName: "Agriculture / Food & Agribusiness (BSc/MAgri/PhD)", notes: "Australia's top agricultural faculty. Strong ties to Australian farming industry. Wagga Wagga farm placements.", admissionsLink: "https://www.sydney.edu.au/agriculture-food-environment.html" },
        utokyo:     { programName: "Agriculture (BSc/MSc/PhD)", notes: "Japan's top agricultural school. Strong in food science, forest science, veterinary medicine, and agricultural chemistry.", admissionsLink: "https://www.a.u-tokyo.ac.jp/english/" },
        snu:        { programName: "Agriculture & Life Sciences (BSc/MSc/PhD)", notes: "Korea's top agricultural university. College of Agriculture & Life Sciences covers agronomy, food, forest, and vet sciences.", admissionsLink: "https://en.snu.ac.kr/academics/colleges-schools/colleges/agriculture" },
        ku_leuven:  { programName: "Bioscience Engineering / Agricultural Sciences (BSc/MSc/PhD)", notes: "Belgium's top agricultural research university. KU Leuven is world-renowned for crop science and food technology.", admissionsLink: "https://www.kuleuven.be/english/education/study/programmes" },
        usp:        { programName: "Agronomic Engineering / Food Engineering / Agriculture (BSc/MSc/PhD)", notes: "Brazil's top agricultural university. ESALQ campus in Piracicaba is one of the world's largest agricultural research institutions.", admissionsLink: "https://esalq.usp.br" }
      }
    },

    "Journalism": {
      description: "Media, communications, and journalism. Combines writing, reporting, digital media, and communications theory.",
      icon: "📰",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years",
          core: ["News Writing & Reporting", "Media Law & Ethics", "Digital Journalism", "Broadcast & Visual Journalism", "Media Research Methods", "Communications Theory", "Editing & Production"],
          electives: ["Investigative Journalism", "Data Journalism", "International Reporting", "Documentary Filmmaking", "PR & Strategic Communications"],
          capstone: "Major journalism project or portfolio"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced Reporting", "Media Law", "Journalism Research"],
          specialisations: ["Investigative Journalism", "Business Journalism", "Science Journalism", "Broadcast Journalism", "Digital Media"],
          capstone: "Major investigative project or professional portfolio"
        },
        PhD: {
          duration: "3–4 years",
          focus: "Media studies, journalism research, communications theory, or media policy.",
          funding: "Variable."
        }
      },
      assessment: {
        Bachelor: "Portfolio of published or publishable work, practical assessments, and essays on media theory.",
        Master: "Investigative projects, industry placements, and dissertation.",
        PhD: "Annual reviews and thesis."
      },
      careers: ["Reporter / Journalist", "News Editor", "Broadcast Journalist", "Data Journalist", "PR / Communications Manager", "Documentary Filmmaker", "Media Strategist"],
      universities: {
        columbia:   { programName: "Columbia Journalism School (MS / MA / Dual Degree / PhD)", notes: "World's most prestigious journalism school. Home of the Pulitzer Prize. MS is the flagship 10-month professional programme. Network of working journalists is unmatched.", admissionsLink: "https://journalism.columbia.edu/ms" }
      }
    },

    "Music": {
      description: "Performance, composition, musicology, and music technology. Conservatoire-based or university-based programmes.",
      icon: "🎵",
      typicalCurriculum: {
        Bachelor: {
          duration: "3–4 years (BMus)",
          core: ["Music Theory & Harmony", "Ear Training / Aural Skills", "Music History", "Performance Study (principal instrument/voice)", "Counterpoint & Composition", "Ensemble & Orchestra/Chamber Performance"],
          electives: ["Electronic / Computer Music", "Conducting", "Ethnomusicology", "Jazz Studies", "Music Education", "Music Technology"],
          capstone: "Final solo recital and/or composition portfolio"
        },
        Master: {
          duration: "1–2 years",
          core: ["Advanced performance / composition study"],
          specialisations: ["Performance", "Composition", "Musicology", "Music Education", "Music Technology / Sound Design"],
          capstone: "Graduate recital, composition portfolio, or research thesis"
        },
        PhD: {
          duration: "3–5 years",
          focus: "Music research (musicology, ethnomusicology, music theory) or practice-based (composition, performance).",
          funding: "Variable — fully funded at some conservatoires and universities."
        }
      },
      assessment: {
        Bachelor: "Performance recitals (50–60%), composition portfolios, music theory exams, and musicology essays.",
        Master: "Performance exams, composition submissions, and thesis for research programmes.",
        PhD: "Annual reviews, recordings or scores, and thesis."
      },
      careers: ["Professional Performer", "Composer", "Music Teacher", "Music Therapist", "Sound Designer", "Music Producer", "Arts Administrator"],
      universities: {
        mcgill:     { programName: "Music (BMus/MA/MMus/PhD) — Schulich School of Music", notes: "Canada's top music school. World-class for performance, composition, music technology, and musicology. Schulich consistently ranked top 5 globally.", admissionsLink: "https://www.mcgill.ca/music/programs" }
      }
    }

  }

};
