import { Course, CourseId, PerformanceTier } from '../types';

export const OFFICIAL_COURSES: Course[] = [
  {
    id: 'ap-calc',
    code: 'AP-CALC-AB',
    name: 'AP Calculus AB',
    category: 'Mathematics & Engineering',
    iconName: 'Calculator',
    examScaleType: 'AP_5_POINT',
    examScaleRange: 'Score 1 - 5 (College Board Scale)',
    description: 'Official College Board AP Calculus AB curriculum covering limits, derivatives, integrals, and differential equations.',
    officialDatabaseName: 'College Board AP Calculus AB Official Exam Standards',
    syllabusYear: '2025-2026',
    standardsList: [
      { code: 'CHA-1', title: 'Limits and Continuity', description: 'Concept of a limit, calculating limits, continuity at a point, Intermediate Value Theorem.', weightPercentage: 15 },
      { code: 'FUN-2', title: 'Differentiation: Definition & Basic Rules', description: 'Derivative as rate of change, power rule, product/quotient rules, tangents and normals.', weightPercentage: 20 },
      { code: 'FUN-3', title: 'Differentiation: Composite, Implicit & Inverse', description: 'Chain rule, implicit differentiation, derivatives of inverse trigonometric functions.', weightPercentage: 15 },
      { code: 'FUN-4', title: 'Contextual Applications of Differentiation', description: 'Related rates, rectilinear motion, optimization, L\'Hospital\'s rule, Mean Value Theorem.', weightPercentage: 20 },
      { code: 'FUN-5', title: 'Integration and Accumulation of Change', description: 'Riemann sums, Fundamental Theorem of Calculus, substitution rule, differential equations.', weightPercentage: 30 }
    ]
  },
  {
    id: 'ap-cs',
    code: 'AP-CSA',
    name: 'AP Computer Science A',
    category: 'Computer Science & IT',
    iconName: 'Code2',
    examScaleType: 'AP_5_POINT',
    examScaleRange: 'Score 1 - 5 (College Board Scale)',
    description: 'Official College Board AP CSA curriculum covering object-oriented Java programming, algorithms, arrays, and recursion.',
    officialDatabaseName: 'College Board AP Computer Science A Syllabus',
    syllabusYear: '2025-2026',
    standardsList: [
      { code: 'MOD-1', title: 'Primitive Types & Control Structures', description: 'Variables, data types, arithmetic expressions, if-else conditionals, boolean logic.', weightPercentage: 18 },
      { code: 'MOD-2', title: 'Using Objects & Class Implementation', description: 'Constructors, methods, instance variables, encapsulation, String and Math methods.', weightPercentage: 22 },
      { code: 'CON-1', title: 'Iteration & Arrays', description: 'while and for loops, 1D and 2D arrays, traversal algorithms, linear and binary search.', weightPercentage: 25 },
      { code: 'CON-2', title: 'ArrayLists & Sorting Algorithms', description: 'Dynamic arrays, selection sort, insertion sort, merge sort concepts.', weightPercentage: 20 },
      { code: 'MOD-3', title: 'Inheritance & Recursion', description: 'Superclasses and subclasses, method overriding, polymorphism, recursive methods.', weightPercentage: 15 }
    ]
  },
  {
    id: 'sat-math',
    code: 'SAT-MATH',
    name: 'SAT Mathematics (Digital SAT)',
    category: 'College Entrance Exam',
    iconName: 'GraduationCap',
    examScaleType: 'SAT_800_POINT',
    examScaleRange: 'Score 200 - 800 (College Board Digital SAT)',
    description: 'Official Digital SAT Math curriculum covering Heart of Algebra, Problem Solving, Advanced Math, and Geometry.',
    officialDatabaseName: 'College Board Digital SAT Official Question Bank',
    syllabusYear: '2025-2026',
    standardsList: [
      { code: 'SAT-1', title: 'Heart of Algebra', description: 'Linear equations, linear inequalities, systems of linear equations, graphical representation.', weightPercentage: 35 },
      { code: 'SAT-2', title: 'Problem Solving and Data Analysis', description: 'Ratios, percentages, scatterplots, probability, statistical inference, data distributions.', weightPercentage: 25 },
      { code: 'SAT-3', title: 'Passport to Advanced Math', description: 'Quadratic equations, polynomials, rational expressions, nonlinear functions.', weightPercentage: 28 },
      { code: 'SAT-4', title: 'Geometry and Trigonometry', description: 'Area and volume, triangle properties, circles, right triangle trigonometry.', weightPercentage: 12 }
    ]
  },
  {
    id: 'gcse-bio',
    code: 'GCSE-BIOLOGY',
    name: 'GCSE Biology (AQA / Edexcel)',
    category: 'Life Sciences',
    iconName: 'Dna',
    examScaleType: 'GCSE_9_POINT',
    examScaleRange: 'Grade 1 - 9 (UK GCSE Official Scale)',
    description: 'Official GCSE Biology specification covering cell biology, infection, bioenergetics, genetics, and ecology.',
    officialDatabaseName: 'AQA GCSE Biology (8461) Official Specification',
    syllabusYear: '2025-2026',
    standardsList: [
      { code: 'BIO-1', title: 'Cell Biology & Transport', description: 'Cell structure, microscopy, mitosis, diffusion, osmosis, active transport.', weightPercentage: 20 },
      { code: 'BIO-2', title: 'Organisation & Human Anatomy', description: 'Digestive system, enzymes, cardiovascular system, plant tissue organisation.', weightPercentage: 20 },
      { code: 'BIO-3', title: 'Infection, Response & Bioenergetics', description: 'Pathogens, immune system, vaccines, photosynthesis, cellular respiration.', weightPercentage: 25 },
      { code: 'BIO-4', title: 'Inheritance, Variation & Evolution', description: 'DNA structure, genetic crosses, natural selection, biodiversity and conservation.', weightPercentage: 35 }
    ]
  },
  {
    id: 'gre-quant',
    code: 'GRE-QUANT',
    name: 'GRE Quantitative Reasoning',
    category: 'Graduate Admissions',
    iconName: 'Sigma',
    examScaleType: 'GRE_170_POINT',
    examScaleRange: 'Score 130 - 170 (ETS GRE Scale)',
    description: 'Official ETS GRE Quantitative Reasoning curriculum including arithmetic, algebra, geometry, and data interpretation.',
    officialDatabaseName: 'ETS GRE General Test Quantitative Reasoning Curriculum',
    syllabusYear: '2025-2026',
    standardsList: [
      { code: 'GRE-1', title: 'Arithmetic & Number Properties', description: 'Integers, divisibility, primes, remainders, absolute value, roots and exponents.', weightPercentage: 25 },
      { code: 'GRE-2', title: 'Algebra & Equations', description: 'Algebraic expressions, factoring, quadratic equations, word problems, inequalities.', weightPercentage: 30 },
      { code: 'GRE-3', title: 'Geometry & Coordinate Geometry', description: 'Lines, angles, triangles, polygons, circles, 3D solids, coordinate graphing.', weightPercentage: 20 },
      { code: 'GRE-4', title: 'Data Interpretation & Probability', description: 'Tables, graphs, normal distribution, permutations, combinations, probability.', weightPercentage: 25 }
    ]
  },
  {
    id: 'aws-csa',
    code: 'AWS-SAA-C03',
    name: 'AWS Certified Solutions Architect',
    category: 'Cloud & Professional Certification',
    iconName: 'Cloud',
    examScaleType: 'AWS_1000_POINT',
    examScaleRange: 'Score 100 - 1000 (Passing: 720)',
    description: 'Official AWS SAA-C03 exam blueprint covering resilient architectures, high-performing architectures, secure apps, and cost optimization.',
    officialDatabaseName: 'AWS SAA-C03 Official Certification Exam Blueprint',
    syllabusYear: '2025-2026',
    standardsList: [
      { code: 'AWS-1', title: 'Design Resilient Architectures', description: 'Multi-AZ, decoupling workloads using SQS/SNS, failover strategies, backup and DR.', weightPercentage: 30 },
      { code: 'AWS-2', title: 'Design High-Performing Architectures', description: 'Compute scaling (ASG, ECS, EKS), storage selection, database caching, CloudFront.', weightPercentage: 28 },
      { code: 'AWS-3', title: 'Design Secure Applications and Architectures', description: 'IAM policies, KMS encryption, VPC security groups, WAF and Shield.', weightPercentage: 24 },
      { code: 'AWS-4', title: 'Design Cost-Optimized Architectures', description: 'Reserved vs Spot instances, S3 lifecycle policies, serverless cost trade-offs.', weightPercentage: 18 }
    ]
  },
  {
    id: 'banking-exams',
    code: 'BANKING-PO-CLERK',
    name: 'Banking Exams (IBPS / SBI / RBI)',
    category: 'Financial & Government Banking',
    iconName: 'Landmark',
    examScaleType: 'BANKING_100_POINT',
    examScaleRange: 'Score 0 - 100 (IBPS / SBI PO Official Cutoff Scale)',
    description: 'Official syllabus for IBPS PO, SBI PO, and RBI Grade B Officer exams covering Quantitative Aptitude, Reasoning, English, and Banking Awareness.',
    officialDatabaseName: 'IBPS / SBI PO & RBI Officer Official Question Pool',
    syllabusYear: '2025-2026',
    sections: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'General & Banking Awareness', 'Computer Aptitude'],
    standardsList: [
      { code: 'BANK-QUANT', title: 'Quantitative Aptitude & Data Interpretation', description: 'Data Interpretation (Tabular, Pie, Caselet), Arithmetic (SI/CI, Time & Work, Profit & Loss), Quadratic Equations, Number Series.', weightPercentage: 25 },
      { code: 'BANK-REASONING', title: 'Reasoning Ability & Logical Puzzles', description: 'Seating Arrangements, Syllogism, Blood Relations, Coding-Decoding, Input-Output, Critical Reasoning.', weightPercentage: 25 },
      { code: 'BANK-ENGLISH', title: 'English Language & Reading Comprehension', description: 'Reading Comprehension, Error Spotting, Cloze Test, Para Jumbles, Vocabulary & Idioms.', weightPercentage: 20 },
      { code: 'BANK-AWARENESS', title: 'Banking, Financial & General Awareness', description: 'RBI Monetary Policy, Basel Norms, Negotiable Instruments Act, Priority Sector Lending, Current Financial Affairs.', weightPercentage: 20 },
      { code: 'BANK-COMPUTER', title: 'Computer Aptitude & FinTech Systems', description: 'CBS (Core Banking Solutions), Payment Gateways (UPI, NEFT, RTGS), Network Security & Banking Protocols.', weightPercentage: 10 }
    ]
  },
  {
    id: 'jee-mains',
    code: 'JEE-MAIN-NTA',
    name: 'JEE Mains (NTA Official)',
    category: 'Engineering Entrance (IIT/NIT)',
    iconName: 'Atom',
    examScaleType: 'JEE_300_POINT',
    examScaleRange: 'Score 0 - 300 (NTA National Percentile Scale)',
    description: 'Official NTA JEE Mains examination blueprint covering Physics, Chemistry, and Mathematics for B.Tech/B.E. admissions.',
    officialDatabaseName: 'NTA JEE Mains Official Question Bank & Blueprint',
    syllabusYear: '2025-2026',
    sections: ['Physics', 'Chemistry', 'Mathematics'],
    standardsList: [
      { code: 'JEE-PHYS', title: 'Physics (Mechanics, Electrodynamics & Modern Physics)', description: 'Kinematics, Laws of Motion, Work Power Energy, Rotational Motion, Gravitation, Thermodynamics, Electrostatics, Magnetism, Optics, Modern Physics.', weightPercentage: 33.3 },
      { code: 'JEE-CHEM', title: 'Chemistry (Physical, Inorganic & Organic)', description: 'Atomic Structure, Chemical Bonding, Thermodynamics, Equilibrium, Coordination Compounds, Hydrocarbons, Carbonyls, Biomolecules.', weightPercentage: 33.3 },
      { code: 'JEE-MATH', title: 'Mathematics (Calculus, Algebra & Coordinate Geometry)', description: 'Matrices & Determinants, Coordinate Geometry, Integral & Differential Calculus, Vectors & 3D, Probability & Statistics.', weightPercentage: 33.4 }
    ]
  },
  {
    id: 'neet-ug',
    code: 'NEET-UG-NTA',
    name: 'NEET UG (Medical Entrance)',
    category: 'Medical & Dental Entrance',
    iconName: 'Stethoscope',
    examScaleType: 'NEET_720_POINT',
    examScaleRange: 'Score 0 - 720 (NTA Medical All-India Rank Scale)',
    description: 'Official NTA NEET-UG medical curriculum covering Physics, Chemistry, Botany, and Zoology for MBBS and BDS admissions.',
    officialDatabaseName: 'NTA NEET UG Official Examination Syllabus',
    syllabusYear: '2025-2026',
    sections: ['Physics', 'Chemistry', 'Biology (Botany)', 'Biology (Zoology)'],
    standardsList: [
      { code: 'NEET-BOTANY', title: 'Biology: Botany & Plant Sciences', description: 'Plant Physiology, Photosynthesis, Cell Structure, Plant Diversity, Genetics & Evolution.', weightPercentage: 25 },
      { code: 'NEET-ZOOLOGY', title: 'Biology: Zoology & Human Physiology', description: 'Human Digestive, Circulatory, Excretory, Neural, and Endocrine Systems, Human Reproduction, Biotechnology.', weightPercentage: 25 },
      { code: 'NEET-CHEM', title: 'Chemistry (Physical, Organic & Inorganic)', description: 'Equilibrium, Electrochemistry, Biomolecules, P-block, D & F-block, Polymers.', weightPercentage: 25 },
      { code: 'NEET-PHYS', title: 'Physics (Mechanics, Optics & Bulk Matter)', description: 'Laws of Motion, Fluid Mechanics, Ray & Wave Optics, Current Electricity, Dual Nature of Matter.', weightPercentage: 25 }
    ]
  },
  {
    id: 'govt-exams',
    code: 'GOVT-SSC-UPSC',
    name: 'Government Preparation (SSC / UPSC / State PSC)',
    category: 'Civil Services & Central Recruitment',
    iconName: 'Building2',
    examScaleType: 'GOVT_200_POINT',
    examScaleRange: 'Score 0 - 200 (SSC CGL Tier 1 & Civil Services Scale)',
    description: 'Official syllabus for SSC CGL, UPSC Prelims, and State PSC examinations spanning General Studies, Reasoning, Quant, and English.',
    officialDatabaseName: 'SSC CGL & UPSC Civil Services Official Question Pool',
    syllabusYear: '2025-2026',
    sections: ['General Awareness & Polity', 'Quantitative Aptitude', 'General Intelligence & Reasoning', 'English Comprehension'],
    standardsList: [
      { code: 'GOVT-GA', title: 'General Awareness, Polity & Current Affairs', description: 'Indian Constitution, Polity, Economy, Modern History, Geography, Current National Events.', weightPercentage: 25 },
      { code: 'GOVT-REASON', title: 'General Intelligence & Logical Reasoning', description: 'Analogy, Series, Syllogisms, Direction Sense, Coding-Decoding, Non-Verbal Reasoning.', weightPercentage: 25 },
      { code: 'GOVT-QUANT', title: 'Quantitative Aptitude & Arithmetic', description: 'Percentages, Profit & Loss, Ratio & Proportion, Time & Distance, Mensuration, Algebra.', weightPercentage: 25 },
      { code: 'GOVT-ENG', title: 'English Comprehension & Grammar', description: 'Error Spotting, Idioms & Phrases, Cloze Test, Reading Comprehension, Vocabulary.', weightPercentage: 25 }
    ]
  }
];

export function getCourseById(id: CourseId | string): Course | undefined {
  return OFFICIAL_COURSES.find(c => c.id === id);
}

/**
 * Standardized score converter from percentage (0-100%) to official exam scale
 */
export function convertAccuracyToExamScore(courseId: CourseId | 'all', accuracyPercent: number): string {
  const course = courseId === 'all' ? OFFICIAL_COURSES[0] : getCourseById(courseId);
  if (!course) return `${Math.round(accuracyPercent)}%`;

  switch (course.examScaleType) {
    case 'AP_5_POINT': {
      if (accuracyPercent >= 82) return 'AP Score: 5 (Extremely Well Qualified)';
      if (accuracyPercent >= 68) return 'AP Score: 4 (Well Qualified)';
      if (accuracyPercent >= 54) return 'AP Score: 3 (Qualified - Passing)';
      if (accuracyPercent >= 40) return 'AP Score: 2 (Possibly Qualified)';
      return 'AP Score: 1 (No Recommendation)';
    }
    case 'SAT_800_POINT': {
      // Linear mapping approx from 320 to 800
      const score = Math.min(800, Math.max(200, Math.round(200 + (accuracyPercent / 100) * 600)));
      return `SAT Math: ${score} / 800`;
    }
    case 'GCSE_9_POINT': {
      if (accuracyPercent >= 90) return 'GCSE Grade: 9 (Highest Distinction)';
      if (accuracyPercent >= 80) return 'GCSE Grade: 8 (A* Equivalent)';
      if (accuracyPercent >= 70) return 'GCSE Grade: 7 (A Equivalent)';
      if (accuracyPercent >= 60) return 'GCSE Grade: 6 (High Pass)';
      if (accuracyPercent >= 50) return 'GCSE Grade: 5 (Strong Pass)';
      if (accuracyPercent >= 40) return 'GCSE Grade: 4 (Standard Pass)';
      return 'GCSE Grade: 1-3 (Needs Revision)';
    }
    case 'GRE_170_POINT': {
      const score = Math.min(170, Math.max(130, Math.round(130 + (accuracyPercent / 100) * 40)));
      return `GRE Score: ${score} / 170`;
    }
    case 'AWS_1000_POINT': {
      const score = Math.min(1000, Math.max(100, Math.round(100 + (accuracyPercent / 100) * 900)));
      const passBadge = score >= 720 ? '✅ PASSED' : '⏳ BELOW CUTOFF (720)';
      return `AWS Score: ${score} / 1000 (${passBadge})`;
    }
    case 'BANKING_100_POINT': {
      const score = Math.min(100, Math.max(0, Math.round(accuracyPercent)));
      const cutoffBadge = score >= 68 ? '✅ QUALIFIED (Mains Cutoff: 68)' : '⏳ BELOW CUTOFF (68)';
      return `Banking Score: ${score} / 100 (${cutoffBadge})`;
    }
    case 'JEE_300_POINT': {
      const score = Math.min(300, Math.max(0, Math.round((accuracyPercent / 100) * 300)));
      const percentile = accuracyPercent >= 90 ? '99.5+ %ile' : accuracyPercent >= 75 ? '97.8 %ile' : accuracyPercent >= 50 ? '91.2 %ile' : '82.0 %ile';
      return `JEE Score: ${score} / 300 (~${percentile})`;
    }
    case 'NEET_720_POINT': {
      const score = Math.min(720, Math.max(0, Math.round((accuracyPercent / 100) * 720)));
      const cutoffBadge = score >= 610 ? '✅ GMC/AIIMS Rank' : score >= 520 ? '✅ Qualifying' : '⏳ Below Cutoff';
      return `NEET Score: ${score} / 720 (${cutoffBadge})`;
    }
    case 'GOVT_200_POINT': {
      const score = Math.min(200, Math.max(0, Math.round((accuracyPercent / 100) * 200)));
      const cutoffBadge = score >= 142 ? '✅ Tier 1 Cleared' : '⏳ Below Tier 1 Cutoff (142)';
      return `Govt Score: ${score} / 200 (${cutoffBadge})`;
    }
    default:
      return `${Math.round(accuracyPercent)}%`;
  }
}

/**
 * Maps accuracy to Performance Tier
 */
export function getPerformanceTier(accuracy: number): PerformanceTier {
  if (accuracy >= 90) return 'Mastery';
  if (accuracy >= 80) return 'Advanced';
  if (accuracy >= 70) return 'Proficient';
  if (accuracy >= 55) return 'Developing';
  return 'Novice';
}

/**
 * Returns color classes for Performance Tiers
 */
export function getPerformanceTierColors(tier: PerformanceTier): {
  badgeBg: string;
  badgeText: string;
  border: string;
  barColor: string;
  hex: string;
} {
  switch (tier) {
    case 'Mastery':
      return {
        badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
        badgeText: 'text-emerald-800 dark:text-emerald-300',
        border: 'border-emerald-300 dark:border-emerald-700',
        barColor: 'bg-emerald-600',
        hex: '#10b981'
      };
    case 'Advanced':
      return {
        badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
        badgeText: 'text-blue-800 dark:text-blue-300',
        border: 'border-blue-300 dark:border-blue-700',
        barColor: 'bg-blue-600',
        hex: '#3b82f6'
      };
    case 'Proficient':
      return {
        badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
        badgeText: 'text-indigo-800 dark:text-indigo-300',
        border: 'border-indigo-300 dark:border-indigo-700',
        barColor: 'bg-indigo-600',
        hex: '#6366f1'
      };
    case 'Developing':
      return {
        badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
        badgeText: 'text-amber-800 dark:text-amber-300',
        border: 'border-amber-300 dark:border-amber-700',
        barColor: 'bg-amber-500',
        hex: '#f59e0b'
      };
    case 'Novice':
    default:
      return {
        badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
        badgeText: 'text-rose-800 dark:text-rose-300',
        border: 'border-rose-300 dark:border-rose-700',
        barColor: 'bg-rose-500',
        hex: '#f43f5e'
      };
  }
}
