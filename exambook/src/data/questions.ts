import { Question } from '../types';
import { BANKING_QUESTIONS } from './bankingQuestions';
import { COMPETITIVE_EXAM_QUESTIONS } from './competitiveQuestions';

export const BUILT_IN_QUESTIONS: Question[] = [
  // ==========================================
  // AP Calculus AB Questions
  // ==========================================
  {
    id: 'apcalc-01',
    courseId: 'ap-calc',
    subjectName: 'AP Calculus AB',
    sectionName: 'Calculus AB Core',
    topic: 'Differentiation: Contextual Applications',
    syllabusStandard: 'College Board AP Calc AB 2025-2026 — FUN-4.A',
    questionText: 'A particle moves along the x-axis so that its position at time t ≥ 0 is given by x(t) = t³ - 6t² + 9t + 2. At what time t is the particle momentarily at rest, and what is its acceleration at that instant?',
    options: [
      't = 1 and t = 3; acceleration at t = 1 is -6, at t = 3 is 6',
      't = 2 only; acceleration is 0',
      't = 1 and t = 3; acceleration at t = 1 is 6, at t = 3 is -6',
      't = 0 and t = 3; acceleration at t = 3 is 12'
    ],
    correctAnswerIndex: 0,
    rationale: 'Step 1: Velocity is v(t) = x\'(t) = 3t² - 12t + 9. Setting v(t) = 0 gives 3(t - 1)(t - 3) = 0, so t = 1 and t = 3. Step 2: Acceleration is a(t) = v\'(t) = 6t - 12. At t = 1, a(1) = 6(1) - 12 = -6. At t = 3, a(3) = 6(3) - 12 = 6.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-15',
    tags: ['Rectilinear Motion', 'Derivatives', 'AP Calc AB']
  },
  {
    id: 'apcalc-02',
    courseId: 'ap-calc',
    subjectName: 'AP Calculus AB',
    sectionName: 'Calculus AB Core',
    topic: 'Integration & Accumulation of Change',
    syllabusStandard: 'College Board AP Calc AB 2025-2026 — FUN-5.B',
    questionText: 'Evaluate the definite integral: ∫₀² (3x² - 4x + 5) dx',
    options: [
      '10',
      '8',
      '14',
      '12'
    ],
    correctAnswerIndex: 0,
    rationale: 'Step 1: Find the antiderivative F(x) = x³ - 2x² + 5x. Step 2: Evaluate F(2) - F(0) = (2³ - 2(2)² + 5(2)) - 0 = 8 - 8 + 10 = 10.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-01',
    tags: ['Fundamental Theorem of Calculus', 'Definite Integrals']
  },
  {
    id: 'apcalc-03',
    courseId: 'ap-calc',
    subjectName: 'AP Calculus AB',
    sectionName: 'Calculus AB Core',
    topic: 'Differential Equations',
    syllabusStandard: 'College Board AP Calc AB 2025-2026 — FUN-7.D',
    questionText: 'Find the particular solution y = f(x) to the differential equation dy/dx = 2x / y² with the initial condition f(1) = 2.',
    options: [
      'y = ∛(3x² + 5)',
      'y = ∛(x² + 7)',
      'y = √(2x² + 2)',
      'y = 3x² - 1'
    ],
    correctAnswerIndex: 0,
    rationale: 'Step 1: Separate variables: y² dy = 2x dx. Step 2: Integrate both sides: (1/3)y³ = x² + C. Step 3: Apply initial condition y(1) = 2: (1/3)(8) = 1 + C => C = 5/3. Step 4: Solve for y: (1/3)y³ = x² + 5/3 => y³ = 3x² + 5 => y = ∛(3x² + 5).',
    difficulty: 'Hard',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-20',
    tags: ['Separable Differential Equations', 'AP Calc AB']
  },

  // ==========================================
  // AP Computer Science A Questions
  // ==========================================
  {
    id: 'apcsa-01',
    courseId: 'ap-cs',
    subjectName: 'AP Computer Science A',
    sectionName: 'Java & Object-Oriented CS',
    topic: 'Arrays & Search Algorithms',
    syllabusStandard: 'College Board AP CSA 2025-2026 — CON-2.I',
    questionText: 'Consider a sorted integer array: int[] arr = {4, 8, 15, 16, 23, 42, 50}. How many array elements will be compared against the target 16 when using the standard binary search algorithm?',
    options: [
      '1 comparison',
      '2 comparisons',
      '3 comparisons',
      '4 comparisons'
    ],
    correctAnswerIndex: 0,
    rationale: 'Initial indices low = 0, high = 6. Midpoint = (0+6)/2 = 3. Element at arr[3] is exactly 16. The match is found on the 1st comparison.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-10',
    tags: ['Binary Search', 'Algorithms', 'AP CSA']
  },
  {
    id: 'apcsa-02',
    courseId: 'ap-cs',
    subjectName: 'AP Computer Science A',
    sectionName: 'Java & Object-Oriented CS',
    topic: 'Recursion & Method Execution',
    syllabusStandard: 'College Board AP CSA 2025-2026 — MOD-3.B',
    questionText: 'What value is returned by the method call mystery(5) given the following recursive Java method?\n\npublic static int mystery(int n) {\n  if (n <= 1) return 2;\n  else return n + mystery(n - 2);\n}',
    options: [
      '10',
      '11',
      '9',
      '15'
    ],
    correctAnswerIndex: 0,
    rationale: 'Step-by-step trace: mystery(5) = 5 + mystery(3). mystery(3) = 3 + mystery(1). mystery(1) returns 2 (base case since 1 <= 1). Therefore, mystery(5) = 5 + 3 + 2 = 10.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-28',
    tags: ['Recursion', 'Java Methods']
  },
  {
    id: 'apcsa-03',
    courseId: 'ap-cs',
    subjectName: 'AP Computer Science A',
    sectionName: 'Java & Object-Oriented CS',
    topic: 'Object-Oriented Programming & Polymorphism',
    syllabusStandard: 'College Board AP CSA 2025-2026 — MOD-3.D',
    questionText: 'Which of the following statements about Java interface and abstract class hierarchy is TRUE according to the official AP CSA specification?',
    options: [
      'A class can implement multiple interfaces but can extend at most one superclass.',
      'An abstract class cannot declare instance variables or constructors.',
      'A subclass that overrides a superclass method can reduce the access visibility from public to private.',
      'An interface in Java can be instantiated directly using the new keyword.'
    ],
    correctAnswerIndex: 0,
    rationale: 'In Java, single inheritance applies to classes (extends at most one superclass), but a class can implement multiple interfaces. Option B is false because abstract classes can have constructors and instance variables. Option C is false because overriding methods cannot reduce visibility. Option D is false because interfaces cannot be instantiated directly.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-05',
    tags: ['OOP', 'Inheritance', 'AP CSA']
  },

  // ==========================================
  // Digital SAT Mathematics Questions
  // ==========================================
  {
    id: 'satmath-01',
    courseId: 'sat-math',
    subjectName: 'SAT Mathematics (Digital SAT)',
    sectionName: 'Math Module (Digital SAT)',
    topic: 'Heart of Algebra: Systems of Equations',
    syllabusStandard: 'College Board Digital SAT Math — SAT-1.C',
    questionText: 'In the xy-plane, the equations 3x - 2y = 12 and 9x - 6y = k represent a pair of parallel lines with no intersection points. What is one possible value that k CANNOT equal?',
    options: [
      '36',
      '12',
      '24',
      '0'
    ],
    correctAnswerIndex: 0,
    rationale: 'For two linear equations to be parallel with NO solutions, their coefficients of x and y must be proportional, but the constant terms must NOT have the same ratio. Here, multiplying the first equation by 3 gives 9x - 6y = 36. If k = 36, the two equations are identical and have infinitely many solutions. Therefore, for the lines to have no intersection, k CANNOT equal 36.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-18',
    tags: ['Systems of Linear Equations', 'Digital SAT']
  },
  {
    id: 'satmath-02',
    courseId: 'sat-math',
    subjectName: 'SAT Mathematics (Digital SAT)',
    sectionName: 'Math Module (Digital SAT)',
    topic: 'Passport to Advanced Math: Quadratics',
    syllabusStandard: 'College Board Digital SAT Math — SAT-3.A',
    questionText: 'The function f(t) = -16t² + 64t + 80 models the height in feet of a projectile t seconds after launch. After how many seconds does the projectile reach its maximum height, and what is that maximum height?',
    options: [
      't = 2 seconds; maximum height = 144 feet',
      't = 4 seconds; maximum height = 80 feet',
      't = 2 seconds; maximum height = 128 feet',
      't = 3 seconds; maximum height = 136 feet'
    ],
    correctAnswerIndex: 0,
    rationale: 'The vertex of a quadratic parabola y = at² + bt + c occurs at t = -b / (2a) = -64 / (2 * -16) = -64 / -32 = 2 seconds. Evaluating height at t = 2: f(2) = -16(4) + 64(2) + 80 = -64 + 128 + 80 = 144 feet.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-12',
    tags: ['Quadratic Functions', 'Vertex Formula', 'SAT Math']
  },
  {
    id: 'satmath-03',
    courseId: 'sat-math',
    subjectName: 'SAT Mathematics (Digital SAT)',
    sectionName: 'Math Module (Digital SAT)',
    topic: 'Geometry & Trigonometry: Right Triangles',
    syllabusStandard: 'College Board Digital SAT Math — SAT-4.B',
    questionText: 'In a right triangle ABC with right angle at C, if sin(A) = 3/5, what is the value of cos(B)?',
    options: [
      '3/5',
      '4/5',
      '3/4',
      '5/3'
    ],
    correctAnswerIndex: 0,
    rationale: 'In any right triangle ABC with C = 90°, angles A and B are complementary (A + B = 90°). By trigonometric identity, sin(A) = cos(90° - A) = cos(B). Therefore, cos(B) = sin(A) = 3/5.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-18',
    tags: ['Trigonometric Identities', 'Complementary Angles']
  },

  // ==========================================
  // GCSE Biology Questions
  // ==========================================
  {
    id: 'gcsebio-01',
    courseId: 'gcse-bio',
    subjectName: 'GCSE Biology (AQA / Edexcel)',
    sectionName: 'Cellular & Molecular Biology',
    topic: 'Cell Biology: Membrane Transport',
    syllabusStandard: 'AQA GCSE Biology (8461) — BIO-1.3',
    questionText: 'Which of the following processes requires energy released from ATP during cellular respiration to transport mineral ions across a plant root hair cell membrane?',
    options: [
      'Active transport against the concentration gradient',
      'Osmosis of water across a partially permeable membrane',
      'Simple diffusion down the concentration gradient',
      'Facilitated diffusion through protein channels'
    ],
    correctAnswerIndex: 0,
    rationale: 'Active transport moves substances against their concentration gradient (from an area of lower concentration to an area of higher concentration). This requires metabolic energy in the form of ATP produced during respiration. Diffusion and osmosis are passive processes.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-25',
    tags: ['Active Transport', 'Cell Biology', 'GCSE 9-1']
  },
  {
    id: 'gcsebio-02',
    courseId: 'gcse-bio',
    subjectName: 'GCSE Biology (AQA / Edexcel)',
    sectionName: 'Cellular & Molecular Biology',
    topic: 'Inheritance & Genetics',
    syllabusStandard: 'AQA GCSE Biology (8461) — BIO-4.2',
    questionText: 'In a monohybrid cross between two heterozygous purple-flowered pea plants (Pp × Pp), where purple (P) is dominant over white (p), what is the expected phenotypic ratio of purple to white flowers in the offspring?',
    options: [
      '3 purple : 1 white (75% purple, 25% white)',
      '1 purple : 1 white (50% purple, 50% white)',
      '1 purple : 2 pink : 1 white',
      '4 purple : 0 white (100% purple)'
    ],
    correctAnswerIndex: 0,
    rationale: 'A Punnett square for Pp × Pp produces genotypes: 1 PP, 2 Pp, and 1 pp. Since P is dominant, both PP and Pp phenotypes are purple (3/4 = 75%), while pp is white (1/4 = 25%). The ratio is 3:1.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-08',
    tags: ['Genetics', 'Monohybrid Inheritance']
  },
  {
    id: 'gcsebio-03',
    courseId: 'gcse-bio',
    subjectName: 'GCSE Biology (AQA / Edexcel)',
    sectionName: 'Cellular & Molecular Biology',
    topic: 'Bioenergetics: Photosynthesis',
    syllabusStandard: 'AQA GCSE Biology (8461) — BIO-3.1',
    questionText: 'An experiment investigates the rate of photosynthesis in Elodea pondweed at increasing light intensities. Which factor is most likely to become the limiting factor when the light intensity reaches saturation?',
    options: [
      'Carbon dioxide concentration or temperature',
      'Oxygen concentration in the water around the plant',
      'The number of chloroplasts within the epidermal cells',
      'The volume of water available to the roots'
    ],
    correctAnswerIndex: 0,
    rationale: 'When light intensity increases beyond the saturation point, the rate of photosynthesis levels off because another factor — typically carbon dioxide concentration or ambient temperature — becomes the limiting factor.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-14',
    tags: ['Limiting Factors', 'Photosynthesis', 'GCSE Biology']
  },

  // ==========================================
  // GRE Quantitative Reasoning Questions
  // ==========================================
  {
    id: 'grequant-01',
    courseId: 'gre-quant',
    subjectName: 'GRE Quantitative Reasoning',
    sectionName: 'Quantitative Reasoning',
    topic: 'Arithmetic & Number Properties',
    syllabusStandard: 'ETS GRE Official Quant — GRE-1.A',
    questionText: 'If n is a positive integer such that when n is divided by 7 the remainder is 4, what is the remainder when (3n + 5) is divided by 7?',
    options: [
      '3',
      '2',
      '4',
      '5'
    ],
    correctAnswerIndex: 0,
    rationale: 'Let n = 7k + 4 for some integer k ≥ 0. Then 3n + 5 = 3(7k + 4) + 5 = 21k + 12 + 5 = 21k + 17. Dividing 17 by 7 gives 17 = 7(2) + 3. Thus, the remainder is 3.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-30',
    tags: ['Modular Arithmetic', 'Remainders', 'GRE Quant']
  },
  {
    id: 'grequant-02',
    courseId: 'gre-quant',
    subjectName: 'GRE Quantitative Reasoning',
    sectionName: 'Quantitative Reasoning',
    topic: 'Geometry & Area Ratios',
    syllabusStandard: 'ETS GRE Official Quant — GRE-3.B',
    questionText: 'A circle with radius r is inscribed inside a square of side length 2r. What fraction of the square\'s area lies OUTSIDE the inscribed circle?',
    options: [
      '(4 - π) / 4',
      'π / 4',
      '(2 - π) / 2',
      '1 - (π / 2)'
    ],
    correctAnswerIndex: 0,
    rationale: 'The area of the square is (2r)² = 4r². The area of the inscribed circle is πr². The area outside the circle is 4r² - πr² = r²(4 - π). The fraction of the square area is r²(4 - π) / (4r²) = (4 - π) / 4.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-11',
    tags: ['Geometry', 'Area of Circles and Squares', 'GRE']
  },
  {
    id: 'grequant-03',
    courseId: 'gre-quant',
    subjectName: 'GRE Quantitative Reasoning',
    sectionName: 'Quantitative Reasoning',
    topic: 'Data Interpretation & Statistics',
    syllabusStandard: 'ETS GRE Official Quant — GRE-4.C',
    questionText: 'A dataset of 5 consecutive even integers has an arithmetic mean of 24. What is the standard deviation of this dataset?',
    options: [
      '√8 (approx 2.83)',
      '2',
      '4',
      '√10'
    ],
    correctAnswerIndex: 0,
    rationale: 'Let the 5 consecutive even integers be 20, 22, 24, 26, 28 (mean is 24). The deviations from the mean are -4, -2, 0, 2, 4. The squared deviations are 16, 4, 0, 4, 16, sum = 40. For population standard deviation: variance = 40 / 5 = 8, so standard deviation = √8 ≈ 2.83.',
    difficulty: 'Hard',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-15',
    tags: ['Statistics', 'Standard Deviation', 'GRE']
  },

  // ==========================================
  // AWS Certified Solutions Architect Questions
  // ==========================================
  {
    id: 'aws-01',
    courseId: 'aws-csa',
    subjectName: 'AWS Certified Solutions Architect',
    sectionName: 'Cloud Architecture & Infrastructure',
    topic: 'Design Resilient Architectures: Decoupling & Storage',
    syllabusStandard: 'AWS SAA-C03 Official Blueprint — Domain 1.2',
    questionText: 'An e-commerce company processes orders using microservices. During peak sales, backend servers are overwhelmed by spikes in order submissions, leading to dropped orders. Which AWS architecture pattern best resolves this issue while ensuring zero data loss and horizontal scalability?',
    options: [
      'Decouple order ingestion using an Amazon SQS standard queue and configure Auto Scaling for backend EC2 workers based on queue depth',
      'Replace backend EC2 instances with larger instance types using vertical scaling in a single Availability Zone',
      'Store incoming orders directly in an Amazon ElastiCache Redis cluster without persistent disk storage',
      'Configure Amazon CloudFront CDN to buffer write requests before forwarding them to RDS MySQL'
    ],
    correctAnswerIndex: 0,
    rationale: 'Amazon SQS provides highly reliable asynchronous messaging that acts as a shock absorber during traffic spikes. By decoupling ingestion from processing and using target tracking Auto Scaling on SQS queue depth, backend worker instances scale elastically without dropping orders.',
    difficulty: 'Medium',
    source: 'built-in-official-db',
    lastUpdated: '2026-01-22',
    tags: ['Amazon SQS', 'Decoupling Workloads', 'AWS SAA-C03']
  },
  {
    id: 'aws-02',
    courseId: 'aws-csa',
    subjectName: 'AWS Certified Solutions Architect',
    sectionName: 'Cloud Architecture & Infrastructure',
    topic: 'Design High-Performing Architectures: Database Storage',
    syllabusStandard: 'AWS SAA-C03 Official Blueprint — Domain 2.3',
    questionText: 'A financial services application requires a fully managed NoSQL database capable of single-digit millisecond latency at any scale, multi-region active-active replication, and automatic backup recovery point objectives under 1 second. Which AWS database service meets these requirements?',
    options: [
      'Amazon DynamoDB with Global Tables enabled',
      'Amazon RDS for PostgreSQL with Multi-AZ Read Replicas',
      'Amazon Redshift Serverless with cross-region snapshots',
      'Amazon Neptune Graph Database with read endpoints'
    ],
    correctAnswerIndex: 0,
    rationale: 'Amazon DynamoDB is a key-value and document NoSQL database delivering single-digit millisecond performance at any scale. DynamoDB Global Tables provide fully managed, multi-region active-active replication with automatic failover.',
    difficulty: 'Easy',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-04',
    tags: ['Amazon DynamoDB', 'Global Tables', 'NoSQL']
  },
  {
    id: 'aws-03',
    courseId: 'aws-csa',
    subjectName: 'AWS Certified Solutions Architect',
    sectionName: 'Cloud Architecture & Infrastructure',
    topic: 'Design Cost-Optimized Architectures: S3 Lifecycle',
    syllabusStandard: 'AWS SAA-C03 Official Blueprint — Domain 4.1',
    questionText: 'A healthcare analytics company stores diagnostic imaging files in Amazon S3 Standard. Files are accessed frequently during the first 30 days, occasionally between 30 and 90 days, and rarely after 90 days but must be retained for 7 years for regulatory compliance. What lifecycle rule provides the lowest total cost of ownership?',
    options: [
      'Transition objects to S3 Standard-IA after 30 days, then to S3 Glacier Flexible Retrieval after 90 days',
      'Transition objects to S3 Intelligent-Tiering immediately upon upload with no further lifecycle transitions',
      'Transition objects to S3 One Zone-IA after 30 days, then delete after 90 days',
      'Enable S3 Versioning and transfer all archives to EBS Cold HDD (sc1) after 30 days'
    ],
    correctAnswerIndex: 0,
    rationale: 'S3 Standard-IA is cost-effective for infrequently accessed data (after 30 days). For long-term archiving after 90 days where retrieval is rare and can tolerate minutes/hours, S3 Glacier Flexible Retrieval provides deep storage discounts while maintaining 7-year retention.',
    difficulty: 'Hard',
    source: 'built-in-official-db',
    lastUpdated: '2026-02-16',
    tags: ['Amazon S3', 'Lifecycle Policies', 'Cost Optimization']
  },
  ...BANKING_QUESTIONS,
  ...COMPETITIVE_EXAM_QUESTIONS
];

/**
 * Shuffles the 4 options of a question so the correct answer is randomly
 * positioned across index 0, 1, 2, or 3 (A, B, C, D) uniformly.
 */
export function shuffleQuestionOptions(question: Question): Question {
  const correctText = question.options[question.correctAnswerIndex];
  
  // Pair each option with whether it is the correct answer
  const indexed = question.options.map((opt, i) => ({
    text: opt,
    isCorrect: i === question.correctAnswerIndex || opt === correctText
  }));

  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }

  const newCorrectIndex = indexed.findIndex(item => item.isCorrect);

  return {
    ...question,
    options: indexed.map(item => item.text),
    correctAnswerIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

export function getQuestionsByCourse(courseId: string, difficulty?: string, topic?: string, section?: string): Question[] {
  return BUILT_IN_QUESTIONS.filter(q => {
    if (courseId !== 'all' && q.courseId !== courseId) return false;
    if (difficulty && difficulty !== 'All' && q.difficulty !== difficulty) return false;
    if (topic && topic !== 'All' && q.topic !== topic) return false;
    if (section && section !== 'All' && q.sectionName !== section) return false;
    return true;
  });
}

/**
 * Returns a randomized set of questions with randomized option ordering (A, B, C, D)
 * and balanced section representation if the course contains multiple sections.
 */
export function getRandomQuestions(
  courseId: string, 
  count: number = 20, 
  difficulty?: string, 
  topic?: string
): Question[] {
  const pool = getQuestionsByCourse(courseId, difficulty, topic);
  
  // Separate pool by sections if available for balanced distribution
  const sectionMap: Record<string, Question[]> = {};
  pool.forEach(q => {
    const sec = q.sectionName || q.topic || 'General';
    if (!sectionMap[sec]) sectionMap[sec] = [];
    sectionMap[sec].push(q);
  });

  const sections = Object.keys(sectionMap);
  let selectedPool: Question[] = [];

  if (sections.length > 1 && count >= sections.length) {
    // Interleave questions evenly across sections
    let currentIdx = 0;
    while (selectedPool.length < count) {
      let addedInRound = 0;
      for (const sec of sections) {
        const secQuestions = sectionMap[sec];
        if (secQuestions.length > 0) {
          const q = secQuestions[currentIdx % secQuestions.length];
          selectedPool.push(q);
          addedInRound++;
          if (selectedPool.length >= count) break;
        }
      }
      currentIdx++;
      if (addedInRound === 0) break;
    }
  } else {
    // Standard random draw
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    while (selectedPool.length < count && pool.length > 0) {
      for (const q of shuffledPool) {
        if (selectedPool.length < count) {
          selectedPool.push(q);
        }
      }
    }
  }

  // Shuffle individual questions and their 4 options (A, B, C, D)
  return selectedPool.map((q, index) => {
    const uniqueQ: Question = {
      ...q,
      id: `${q.id}-sess-${index}-${Math.random().toString(36).substring(2, 6)}`
    };
    return shuffleQuestionOptions(uniqueQ);
  });
}
