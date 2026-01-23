export interface User {
  id: string
  email: string
  first_name: string | null
  linkedin_url: string | null
  created_at: string
}

export interface LinkedInProfile {
  full_name: string
  headline: string
  summary: string | null
  experiences: Experience[]
  education: Education[]
  skills: string[]
  profile_pic_url: string | null
}

export interface Experience {
  title: string
  company: string
  duration: string
  description: string | null
}

export interface Education {
  school: string
  degree: string | null
  field_of_study: string | null
}

export interface QuizAnswers {
  situation: 'en_poste' | 'transition' | 'freelance' | 'entrepreneur'
  motivation: 'impact' | 'liberte' | 'challenge' | 'argent'
  decision: 'data' | 'intuition' | 'conseil' | 'test'
  force: 'vision' | 'execution' | 'relation' | 'expertise'
  runway: 'moins_6_mois' | '6_12_mois' | 'plus_12_mois' | 'ne_sait_pas'
  objectif_revenus: '3_5k' | '5_10k' | '10k_plus'
  blocage: 'clarte' | 'confiance' | 'execution' | 'temps'
  reaction_incertitude: 'fonce' | 'analyse' | 'procrastine' | 'panique'
}

export type ArchetypeId = 
  | 'batisseur_silencieux'
  | 'connecteur'
  | 'expert_technique'
  | 'opportuniste_agile'
  | 'createur_impact'
  | 'stratege_prudent'

export interface Diagnostic {
  id: string
  user_id: string
  archetype: ArchetypeId
  score: number
  score_breakdown: {
    clarity: number
    confidence: number
    resources: number
    urgency: number
  }
  trap: {
    title: string
    description: string
    cost: string
  }
  strengths: string[]
  blindspots: string[]
  plan_7_days: string[]
  cta_text: string
}
