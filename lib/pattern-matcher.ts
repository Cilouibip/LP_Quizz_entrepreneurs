// /lib/pattern-matcher.ts

export type Archetype = 
  | 'batisseur_silencieux'
  | 'connecteur'
  | 'expert_technique'
  | 'opportuniste_agile'
  | 'createur_impact'
  | 'stratege_prudent'

export type Situation = 'en_poste' | 'transition' | 'freelance' | 'entrepreneur'
export type Blocage = 'clarte' | 'confiance' | 'execution' | 'temps'
export type Runway = 'moins_6_mois' | '6_12_mois' | 'plus_12_mois' | 'ne_sait_pas'

export interface PatternMatch {
  patternNumber: number
  archetype: Archetype
  situation: Situation
  blocage: Blocage
  runwayCategory: 'court' | 'moyen' | 'long' | 'variable'
}

// Matrice des 18 patterns
const PATTERN_MATRIX: PatternMatch[] = [
  // Bâtisseur Silencieux
  { patternNumber: 1, archetype: 'batisseur_silencieux', situation: 'en_poste', blocage: 'clarte', runwayCategory: 'long' },
  { patternNumber: 2, archetype: 'batisseur_silencieux', situation: 'transition', blocage: 'confiance', runwayCategory: 'moyen' },
  { patternNumber: 3, archetype: 'batisseur_silencieux', situation: 'freelance', blocage: 'execution', runwayCategory: 'variable' },
  
  // Connecteur
  { patternNumber: 4, archetype: 'connecteur', situation: 'en_poste', blocage: 'temps', runwayCategory: 'long' },
  { patternNumber: 5, archetype: 'connecteur', situation: 'transition', blocage: 'clarte', runwayCategory: 'court' },
  { patternNumber: 6, archetype: 'connecteur', situation: 'entrepreneur', blocage: 'confiance', runwayCategory: 'variable' },
  
  // Expert Technique
  { patternNumber: 7, archetype: 'expert_technique', situation: 'freelance', blocage: 'confiance', runwayCategory: 'variable' },
  { patternNumber: 8, archetype: 'expert_technique', situation: 'en_poste', blocage: 'execution', runwayCategory: 'long' },
  { patternNumber: 9, archetype: 'expert_technique', situation: 'entrepreneur', blocage: 'clarte', runwayCategory: 'moyen' },
  
  // Opportuniste Agile
  { patternNumber: 10, archetype: 'opportuniste_agile', situation: 'transition', blocage: 'execution', runwayCategory: 'court' },
  { patternNumber: 11, archetype: 'opportuniste_agile', situation: 'entrepreneur', blocage: 'clarte', runwayCategory: 'variable' },
  { patternNumber: 12, archetype: 'opportuniste_agile', situation: 'freelance', blocage: 'temps', runwayCategory: 'variable' },
  
  // Créateur d'Impact
  { patternNumber: 13, archetype: 'createur_impact', situation: 'entrepreneur', blocage: 'clarte', runwayCategory: 'variable' },
  { patternNumber: 14, archetype: 'createur_impact', situation: 'transition', blocage: 'confiance', runwayCategory: 'moyen' },
  { patternNumber: 15, archetype: 'createur_impact', situation: 'en_poste', blocage: 'temps', runwayCategory: 'long' },
  
  // Stratège Prudent
  { patternNumber: 16, archetype: 'stratege_prudent', situation: 'en_poste', blocage: 'clarte', runwayCategory: 'long' },
  { patternNumber: 17, archetype: 'stratege_prudent', situation: 'transition', blocage: 'execution', runwayCategory: 'moyen' },
  { patternNumber: 18, archetype: 'stratege_prudent', situation: 'freelance', blocage: 'confiance', runwayCategory: 'variable' },
]

// Convertit le runway quiz en catégorie
function getRunwayCategory(runway: Runway): 'court' | 'moyen' | 'long' | 'variable' {
  switch (runway) {
    case 'moins_6_mois': return 'court'
    case '6_12_mois': return 'moyen'
    case 'plus_12_mois': return 'long'
    case 'ne_sait_pas': return 'variable'
  }
}

// Calcule un score de correspondance entre le profil et un pattern
function calculateMatchScore(
  archetype: Archetype,
  situation: Situation,
  blocage: Blocage,
  runwayCategory: 'court' | 'moyen' | 'long' | 'variable',
  pattern: PatternMatch
): number {
  let score = 0
  
  // Archetype match = 40 points (obligatoire)
  if (pattern.archetype === archetype) score += 40
  else return 0 // Si l'archétype ne match pas, on rejette
  
  // Situation match = 30 points
  if (pattern.situation === situation) score += 30
  
  // Blocage match = 20 points
  if (pattern.blocage === blocage) score += 20
  
  // Runway match = 10 points
  if (pattern.runwayCategory === runwayCategory || pattern.runwayCategory === 'variable') score += 10
  
  return score
}

// Trouve le meilleur pattern pour un profil donné
export function findBestPattern(
  archetype: Archetype,
  situation: Situation,
  blocage: Blocage,
  runway: Runway
): PatternMatch {
  const runwayCategory = getRunwayCategory(runway)
  
  let bestPattern = PATTERN_MATRIX[0]
  let bestScore = 0
  
  for (const pattern of PATTERN_MATRIX) {
    const score = calculateMatchScore(archetype, situation, blocage, runwayCategory, pattern)
    if (score > bestScore) {
      bestScore = score
      bestPattern = pattern
    }
  }
  
  return bestPattern
}

// Fonction principale exportée
export function matchPattern(
  archetype: string,
  quizAnswers: {
    situation: string
    blocage: string
    runway: string
  }
): { patternNumber: number; confidence: 'exact' | 'proche' | 'fallback' } {
  
  const pattern = findBestPattern(
    archetype as Archetype,
    quizAnswers.situation as Situation,
    quizAnswers.blocage as Blocage,
    quizAnswers.runway as Runway
  )
  
  // Calcule la confiance
  const runwayCategory = getRunwayCategory(quizAnswers.runway as Runway)
  const score = calculateMatchScore(
    archetype as Archetype,
    quizAnswers.situation as Situation,
    quizAnswers.blocage as Blocage,
    runwayCategory,
    pattern
  )
  
  let confidence: 'exact' | 'proche' | 'fallback'
  if (score >= 90) confidence = 'exact'
  else if (score >= 60) confidence = 'proche'
  else confidence = 'fallback'
  
  return { patternNumber: pattern.patternNumber, confidence }
}
