import { Question } from '../types';

/**
 * Official Practice Set for:
 * 1. JEE Mains (Physics, Chemistry, Mathematics)
 * 2. NEET UG (Physics, Chemistry, Biology - Botany & Zoology)
 * 3. Government Preparation (SSC CGL / UPSC / State PSC - General Awareness, Reasoning, Quant, English)
 */
export const COMPETITIVE_EXAM_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. JEE MAINS: PHYSICS, CHEMISTRY, MATHEMATICS
  // =========================================================================
  {
    id: 'jee-phys-01',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Physics',
    topic: 'Mechanics & Rotational Dynamics',
    syllabusStandard: 'NTA JEE Mains Physics — Unit 3 (Laws of Motion & Work Energy)',
    questionText: 'A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of angle θ. What is the linear acceleration of the center of mass of the cylinder along the incline?',
    options: [
      '(2/3) g sin θ',
      '(1/2) g sin θ',
      '(3/4) g sin θ',
      'g sin θ'
    ],
    correctAnswerIndex: 0,
    rationale: 'For a solid cylinder rolling without slipping, Moment of Inertia I = (1/2) M R². Using the standard rolling acceleration formula a = (g sin θ) / (1 + I/(M R²)) = (g sin θ) / (1 + 1/2) = (2/3) g sin θ.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Physics', 'Rotational Mechanics', 'Rolling Motion']
  },
  {
    id: 'jee-phys-02',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Physics',
    topic: 'Electrostatics & Capacitance',
    syllabusStandard: 'NTA JEE Mains Physics — Unit 11 (Electrostatics & Potential)',
    questionText: 'A parallel plate capacitor with plate area A and separation d is filled with two dielectrics of dielectric constants K₁ and K₂ of equal thickness (d/2) in series. What is the equivalent capacitance?',
    options: [
      '(2 ε₀ A / d) × [ (K₁ K₂) / (K₁ + K₂) ]',
      '(ε₀ A / d) × (K₁ + K₂)',
      '(ε₀ A / 2d) × [ (K₁ + K₂) / (K₁ K₂) ]',
      '(4 ε₀ A / d) × (K₁ K₂)'
    ],
    correctAnswerIndex: 0,
    rationale: 'Two capacitors in series: C₁ = K₁ ε₀ A / (d/2) = 2 K₁ ε₀ A / d, and C₂ = 2 K₂ ε₀ A / d. C_eq = (C₁ C₂) / (C₁ + C₂) = [ (2 ε₀ A / d) (K₁ K₂) ] / (K₁ + K₂).',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Physics', 'Electrostatics', 'Capacitors']
  },
  {
    id: 'jee-phys-03',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Physics',
    topic: 'Thermodynamics & Kinetic Theory',
    syllabusStandard: 'NTA JEE Mains Physics — Unit 8 (Thermodynamics)',
    questionText: 'A Carnot engine operates between temperatures T₁ = 500 K and T₂ = 300 K. It absorbs 1000 J of heat from the high-temperature reservoir in each cycle. What is the work output per cycle?',
    options: [
      '400 J',
      '600 J',
      '300 J',
      '500 J'
    ],
    correctAnswerIndex: 0,
    rationale: 'Carnot efficiency η = 1 - (T₂ / T₁) = 1 - (300 / 500) = 1 - 0.6 = 0.4 (40%). Work done W = η × Q₁ = 0.4 × 1000 J = 400 J.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Physics', 'Thermodynamics', 'Carnot Cycle']
  },
  {
    id: 'jee-phys-04',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Physics',
    topic: 'Modern Physics & Photoelectric Effect',
    syllabusStandard: 'NTA JEE Mains Physics — Unit 18 (Dual Nature of Matter)',
    questionText: 'Light of frequency 1.5 times the threshold frequency is incident on a photosensitive metal plate. If the frequency of incident light is halved and intensity is doubled, what happens to the photoelectric current?',
    options: [
      'Photoelectric current becomes zero (no photoemission)',
      'Photoelectric current is doubled',
      'Photoelectric current is halved',
      'Photoelectric current remains unchanged'
    ],
    correctAnswerIndex: 0,
    rationale: 'Original frequency ν = 1.5 ν₀. When frequency is halved, new frequency ν\' = 0.75 ν₀, which is below the threshold frequency ν₀. When incident frequency is less than threshold frequency, no photoelectrons are emitted, so photocurrent is exactly zero regardless of intensity.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Physics', 'Modern Physics', 'Photoelectric Effect']
  },
  {
    id: 'jee-phys-05',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Physics',
    topic: 'Ray Optics & Wave Optics',
    syllabusStandard: 'NTA JEE Mains Physics — Unit 16 (Optics & Interference)',
    questionText: 'In Young\'s double-slit experiment, if the distance between the slits is halved and the distance of the screen from the slits is doubled, the fringe width will:',
    options: [
      'Increase by 4 times',
      'Double (increase by 2 times)',
      'Be halved',
      'Remain unchanged'
    ],
    correctAnswerIndex: 0,
    rationale: 'Fringe width β = (λ D) / d. If D becomes 2D and d becomes d/2, then β\' = (λ × 2D) / (d / 2) = 4 (λ D / d) = 4β. The fringe width increases 4 times.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Physics', 'Wave Optics', 'YDSE']
  },

  // JEE MAINS: CHEMISTRY
  {
    id: 'jee-chem-01',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Chemistry',
    topic: 'Organic Chemistry & Reaction Mechanisms',
    syllabusStandard: 'NTA JEE Mains Chemistry — Unit 13 (Hydrocarbons & Carbonyls)',
    questionText: 'Which of the following organic compounds will NOT undergo the Aldol condensation reaction when treated with dilute NaOH?',
    options: [
      'Benzaldehyde (C₆H₅CHO)',
      'Acetaldehyde (CH₃CHO)',
      'Propionaldehyde (CH₃CH₂CHO)',
      'Acetone (CH₃COCH₃)'
    ],
    correctAnswerIndex: 0,
    rationale: 'Aldol condensation requires at least one α-hydrogen atom adjacent to the carbonyl group. Benzaldehyde (C₆H₅CHO) has no α-hydrogen atom (the carbonyl is directly attached to the phenyl ring carbon with no hydrogen), so it undergoes Cannizzaro reaction instead.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Chemistry', 'Organic Chemistry', 'Aldol Reaction']
  },
  {
    id: 'jee-chem-02',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Chemistry',
    topic: 'Coordination Compounds',
    syllabusStandard: 'NTA JEE Mains Chemistry — Unit 9 (Coordination Chemistry)',
    questionText: 'What is the hybridization, geometry, and magnetic property of the complex ion [Ni(CN)₄]²⁻? (Atomic number of Ni = 28)',
    options: [
      'dsp², Square planar, Diamagnetic',
      'sp³, Tetrahedral, Paramagnetic',
      'sp³d², Octahedral, Diamagnetic',
      'dsp², Square planar, Paramagnetic'
    ],
    correctAnswerIndex: 0,
    rationale: 'Ni²⁺ has 3d⁸ configuration. Cyanide (CN⁻) is a strong field ligand causing pairing of the 3d electrons into 4 pairs, leaving one 3d orbital vacant. Hybridization is dsp² (square planar), and with zero unpaired electrons, it is diamagnetic.',
    difficulty: 'Hard',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Chemistry', 'Inorganic Chemistry', 'Coordination Compounds']
  },
  {
    id: 'jee-chem-03',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Chemistry',
    topic: 'Chemical Equilibrium & Ionic Equilibrium',
    syllabusStandard: 'NTA JEE Mains Chemistry — Unit 4 (Equilibrium & pH)',
    questionText: 'What is the pH of a 0.005 M solution of Ba(OH)₂ assuming complete dissociation in water at 25°C?',
    options: [
      '12.0',
      '11.7',
      '2.0',
      '12.3'
    ],
    correctAnswerIndex: 0,
    rationale: 'Ba(OH)₂ completely dissociates: Ba(OH)₂ -> Ba²⁺ + 2 OH⁻. [OH⁻] = 2 × 0.005 M = 0.01 M = 10⁻² M. pOH = -log₁₀[OH⁻] = -log₁₀(10⁻²) = 2. pH = 14 - pOH = 14 - 2 = 12.0.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Chemistry', 'Physical Chemistry', 'Ionic Equilibrium']
  },
  {
    id: 'jee-chem-04',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Chemistry',
    topic: 'Chemical Kinetics & Rate Law',
    syllabusStandard: 'NTA JEE Mains Chemistry — Unit 5 (Chemical Kinetics)',
    questionText: 'For a first-order chemical reaction, the half-life period (t₁/₂) is 20 minutes. What percentage of the initial reactant remains unreacted after 60 minutes?',
    options: [
      '12.5%',
      '25.0%',
      '6.25%',
      '37.5%'
    ],
    correctAnswerIndex: 0,
    rationale: 'Number of half-lives elapsed n = Total time / t₁/₂ = 60 min / 20 min = 3. Remaining amount = Initial × (1/2)³ = 1/8 of original = (1/8) × 100% = 12.5%.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Chemistry', 'Physical Chemistry', 'Kinetics']
  },

  // JEE MAINS: MATHEMATICS
  {
    id: 'jee-math-01',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Mathematics',
    topic: 'Calculus & Definite Integrals',
    syllabusStandard: 'NTA JEE Mains Mathematics — Unit 6 (Integral Calculus)',
    questionText: 'Evaluate the definite integral: ∫₀^(π/2) [ sin³(x) / (sin³(x) + cos³(x)) ] dx.',
    options: [
      'π / 4',
      'π / 2',
      'π / 3',
      '1'
    ],
    correctAnswerIndex: 0,
    rationale: 'Using King\'s property of definite integrals: ∫₀^a f(x) dx = ∫₀^a f(a - x) dx. Let I = ∫₀^(π/2) [ sin³x / (sin³x + cos³x) ] dx. Replacing x by (π/2 - x) gives I = ∫₀^(π/2) [ cos³x / (cos³x + sin³x) ] dx. Adding both: 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Mathematics', 'Calculus', 'Definite Integrals']
  },
  {
    id: 'jee-math-02',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Mathematics',
    topic: 'Matrices & Determinants',
    syllabusStandard: 'NTA JEE Mains Mathematics — Unit 2 (Matrices & Determinants)',
    questionText: 'If A is a 3 × 3 non-singular square matrix such that |A| = 4, what is the determinant of its adjoint matrix, |adj(A)|?',
    options: [
      '16',
      '64',
      '4',
      '12'
    ],
    correctAnswerIndex: 0,
    rationale: 'For an n × n matrix A, the determinant of adj(A) is given by |adj(A)| = |A|^(n - 1). Here n = 3 and |A| = 4, so |adj(A)| = 4^(3 - 1) = 4² = 16.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Mathematics', 'Matrices', 'Determinants']
  },
  {
    id: 'jee-math-03',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Mathematics',
    topic: 'Coordinate Geometry & Conic Sections',
    syllabusStandard: 'NTA JEE Mains Mathematics — Unit 8 (Conic Sections)',
    questionText: 'Find the equation of the directrix of the parabola y² = -12x.',
    options: [
      'x = 3',
      'x = -3',
      'y = 3',
      'x = 6'
    ],
    correctAnswerIndex: 0,
    rationale: 'Standard parabola y² = -4ax has directrix x = a. Comparing y² = -12x with y² = -4ax gives 4a = 12 => a = 3. Therefore, the directrix is the vertical line x = 3.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Mathematics', 'Coordinate Geometry', 'Parabola']
  },
  {
    id: 'jee-math-04',
    courseId: 'jee-mains',
    subjectName: 'JEE Mains (NTA Official)',
    sectionName: 'Mathematics',
    topic: 'Vectors & 3D Geometry',
    syllabusStandard: 'NTA JEE Mains Mathematics — Unit 9 (Vector Algebra)',
    questionText: 'If vectors a = 2i + 3j - k and b = i - 2j + 4k, what is the dot product a · b?',
    options: [
      '-8',
      '8',
      '-4',
      '6'
    ],
    correctAnswerIndex: 0,
    rationale: 'Dot product a · b = (2)(1) + (3)(-2) + (-1)(4) = 2 - 6 - 4 = -8.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Mathematics', 'Vectors', 'Dot Product']
  },

  // =========================================================================
  // 2. NEET UG: PHYSICS, CHEMISTRY, BIOLOGY (BOTANY & ZOOLOGY)
  // =========================================================================
  {
    id: 'neet-bio-01',
    courseId: 'neet-ug',
    subjectName: 'NEET UG (NTA Official)',
    sectionName: 'Biology (Botany)',
    topic: 'Plant Physiology & Photosynthesis',
    syllabusStandard: 'NTA NEET UG Biology — Unit 4 (Plant Physiology)',
    questionText: 'Which enzyme is the primary CO₂ fixing enzyme in C4 plants located in the mesophyll cells?',
    options: [
      'PEP carboxylase (Phosphoenolpyruvate carboxylase)',
      'RuBisCO',
      'Carbonic anhydrase',
      'Pyruvate dehydrogenase'
    ],
    correctAnswerIndex: 0,
    rationale: 'In C4 plants, the initial fixation of CO₂ takes place in mesophyll cells catalyzed by PEP carboxylase (forming oxaloacetate). RuBisCO is present in the bundle sheath cells.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Biology', 'Botany', 'Photosynthesis', 'C4 Cycle']
  },
  {
    id: 'neet-bio-02',
    courseId: 'neet-ug',
    subjectName: 'NEET UG (NTA Official)',
    sectionName: 'Biology (Botany)',
    topic: 'Genetics & Molecular Basis of Inheritance',
    syllabusStandard: 'NTA NEET UG Biology — Unit 7 (Genetics & Evolution)',
    questionText: 'In DNA replication, which enzyme is responsible for removing RNA primers and replacing them with deoxyribonucleotides in prokaryotes?',
    options: [
      'DNA Polymerase I',
      'DNA Polymerase III',
      'DNA Ligase',
      'Helicase'
    ],
    correctAnswerIndex: 0,
    rationale: 'DNA Polymerase I possesses 5\' to 3\' exonuclease activity which removes RNA primers and fills the gaps with DNA nucleotides. DNA Polymerase III is the main synthesizing enzyme.',
    difficulty: 'Hard',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Biology', 'Genetics', 'DNA Replication']
  },
  {
    id: 'neet-bio-03',
    courseId: 'neet-ug',
    subjectName: 'NEET UG (NTA Official)',
    sectionName: 'Biology (Zoology)',
    topic: 'Human Physiology & Endocrine System',
    syllabusStandard: 'NTA NEET UG Biology — Unit 5 (Human Physiology)',
    questionText: 'Which hormone is synthesized by the hypothalamus and stored/released by the posterior pituitary gland (neurohypophysis) to regulate water reabsorption in the collecting ducts of nephrons?',
    options: [
      'Antidiuretic Hormone (ADH / Vasopressin)',
      'Aldosterone',
      'Oxytocin',
      'Atrial Natriuretic Peptide (ANP)'
    ],
    correctAnswerIndex: 0,
    rationale: 'Vasopressin (ADH) is synthesized in hypothalamic nuclei (supraoptic and paraventricular) and transported to the posterior pituitary for release to promote water retention in renal tubules.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Biology', 'Zoology', 'Endocrine System', 'Physiology']
  },
  {
    id: 'neet-bio-04',
    courseId: 'neet-ug',
    subjectName: 'NEET UG (NTA Official)',
    sectionName: 'Biology (Zoology)',
    topic: 'Human Reproduction & Embryology',
    syllabusStandard: 'NTA NEET UG Biology — Unit 6 (Reproduction)',
    questionText: 'Which surge in pituitary gonadotropins triggers the rupture of the Graafian follicle and induces ovulation during the middle of the human menstrual cycle?',
    options: [
      'LH (Luteinizing Hormone) surge',
      'FSH (Follicle Stimulating Hormone) drop',
      'Progesterone surge',
      'Prolactin surge'
    ],
    correctAnswerIndex: 0,
    rationale: 'Rapid secretion of LH leading to its maximum level around the 14th day (LH surge) induces rupture of the mature Graafian follicle and the release of an ovum (ovulation).',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Biology', 'Zoology', 'Human Reproduction']
  },
  {
    id: 'neet-chem-01',
    courseId: 'neet-ug',
    subjectName: 'NEET UG (NTA Official)',
    sectionName: 'Chemistry',
    topic: 'Biomolecules & Organic Chemistry',
    syllabusStandard: 'NTA NEET UG Chemistry — Unit 14 (Biomolecules)',
    questionText: 'Which vitamin is water-soluble and its deficiency causes the disease Scurvy (bleeding gums and delayed wound healing)?',
    options: [
      'Vitamin C (Ascorbic acid)',
      'Vitamin A (Retinol)',
      'Vitamin D (Calciferol)',
      'Vitamin K (Phylloquinone)'
    ],
    correctAnswerIndex: 0,
    rationale: 'Vitamin C (Ascorbic acid) is a water-soluble vitamin required for collagen synthesis. Deficiency leads to scurvy. Vitamins A, D, E, and K are fat-soluble.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Chemistry', 'Biomolecules', 'Vitamins']
  },
  {
    id: 'neet-phys-01',
    courseId: 'neet-ug',
    subjectName: 'NEET UG (NTA Official)',
    sectionName: 'Physics',
    topic: 'Fluid Mechanics & Surface Tension',
    syllabusStandard: 'NTA NEET UG Physics — Unit 7 (Properties of Bulk Matter)',
    questionText: 'What is the excess pressure inside a spherical soap bubble of radius R suspended in air, given the surface tension of the soap solution is T?',
    options: [
      '4T / R',
      '2T / R',
      'T / R',
      '8T / R'
    ],
    correctAnswerIndex: 0,
    rationale: 'A soap bubble has two free liquid-air interfaces (inner and outer). Thus, excess pressure ΔP = 2 × (2T / R) = 4T / R. For a single liquid droplet in air, it is 2T / R.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Physics', 'Fluid Mechanics', 'Surface Tension']
  },

  // =========================================================================
  // 3. GOVERNMENT EXAMS (SSC CGL / UPSC PRELIMS / STATE PSC)
  // =========================================================================
  {
    id: 'govt-ga-01',
    courseId: 'govt-exams',
    subjectName: 'Government Exams (SSC / UPSC / State PSC)',
    sectionName: 'General Awareness & Polity',
    topic: 'Indian Constitution & Polity',
    syllabusStandard: 'SSC CGL / UPSC Prelims Syllabus — GS Paper I (Indian Constitution)',
    questionText: 'Under Article 32 of the Constitution of India, which writ is issued by the Supreme Court to produce a detained person before the court to examine the legality of detention?',
    options: [
      'Habeas Corpus',
      'Mandamus',
      'Certiorari',
      'Quo-Warranto'
    ],
    correctAnswerIndex: 0,
    rationale: 'Habeas Corpus (literally "to have the body") is the writ issued by courts to secure the release of a person who has been detained unlawfully or without legal justification.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Polity', 'Indian Constitution', 'Fundamental Rights', 'Writs']
  },
  {
    id: 'govt-ga-02',
    courseId: 'govt-exams',
    subjectName: 'Government Exams (SSC / UPSC / State PSC)',
    sectionName: 'General Awareness & Polity',
    topic: 'Indian Economy & Planning',
    syllabusStandard: 'SSC CGL / UPSC Prelims Syllabus — GS Paper I (Indian Economy)',
    questionText: 'Which constitutional body in India is responsible for recommending the distribution of net proceeds of taxes between the Union and the States under Article 280?',
    options: [
      'Finance Commission of India',
      'NITI Aayog',
      'GST Council',
      'Comptroller and Auditor General (CAG)'
    ],
    correctAnswerIndex: 0,
    rationale: 'Article 280 of the Constitution mandates the President to constitute a Finance Commission every 5 years to recommend the devolution of tax revenue between the Centre and States.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Economy', 'Finance Commission', 'Constitutional Bodies']
  },
  {
    id: 'govt-ga-03',
    courseId: 'govt-exams',
    subjectName: 'Government Exams (SSC / UPSC / State PSC)',
    sectionName: 'General Awareness & Polity',
    topic: 'Modern Indian History',
    syllabusStandard: 'SSC CGL / UPSC Prelims Syllabus — GS Paper I (Freedom Struggle)',
    questionText: 'In which year was the historic Poona Pact signed between Mahatma Gandhi and Dr. B. R. Ambedkar regarding reserved seats for depressed classes in provincial legislatures?',
    options: [
      '1932',
      '1928',
      '1935',
      '1942'
    ],
    correctAnswerIndex: 0,
    rationale: 'The Poona Pact was signed on September 24, 1932 at Yerwada Central Jail in Pune, abandoning separate electorates in favour of increased reserved seats in joint electorates.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['History', 'Modern India', 'Poona Pact']
  },
  {
    id: 'govt-quant-01',
    courseId: 'govt-exams',
    subjectName: 'Government Exams (SSC / UPSC / State PSC)',
    sectionName: 'Quantitative Aptitude',
    topic: 'Profit, Loss & Discount',
    syllabusStandard: 'SSC CGL Tier I & II Syllabus — Quantitative Aptitude',
    questionText: 'A dishonest shopkeeper uses a false weight of 900 grams instead of 1 kilogram while selling sugar at cost price. What is his overall profit percentage?',
    options: [
      '11.11% (11 1/9 %)',
      '10.0%',
      '9.09%',
      '12.5%'
    ],
    correctAnswerIndex: 0,
    rationale: 'Error in weight = 1000g - 900g = 100g. Profit % = [Error / (True weight - Error)] × 100% = (100 / 900) × 100% = 100/9% = 11.11%.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Quant', 'Arithmetic', 'Dishonest Dealer']
  },
  {
    id: 'govt-reasoning-01',
    courseId: 'govt-exams',
    subjectName: 'Government Exams (SSC / UPSC / State PSC)',
    sectionName: 'General Intelligence & Reasoning',
    topic: 'Analogy & Series',
    syllabusStandard: 'SSC CGL Tier I Syllabus — General Intelligence',
    questionText: 'Select the related number from the given alternatives: 12 : 144 :: 15 : ?',
    options: [
      '225',
      '215',
      '240',
      '250'
    ],
    correctAnswerIndex: 0,
    rationale: 'Pattern is x : x². 12² = 144, so 15² = 225.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['Reasoning', 'Number Analogy']
  },
  {
    id: 'govt-eng-01',
    courseId: 'govt-exams',
    subjectName: 'Government Exams (SSC / UPSC / State PSC)',
    sectionName: 'English Comprehension',
    topic: 'Idioms & Phrases',
    syllabusStandard: 'SSC CGL Tier I Syllabus — English Comprehension',
    questionText: 'What is the meaning of the idiom: "A feather in one\'s cap"?',
    options: [
      'An achievement or honor of which one can be proud',
      'A foolish or costly mistake',
      'A heavy burden or debt',
      'A secret that has been revealed'
    ],
    correctAnswerIndex: 0,
    rationale: '"A feather in one\'s cap" is an English idiom meaning an accomplishment, achievement, or distinction that brings honor and pride.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-20',
    tags: ['English', 'Idioms', 'Vocabulary']
  }
];
