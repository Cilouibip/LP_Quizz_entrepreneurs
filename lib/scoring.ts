import { QuizAnswers, LinkedInProfile, ArchetypeId } from '@/types'

export function determineArchetype(
  answers: QuizAnswers, 
  profile?: LinkedInProfile
): ArchetypeId {
  const scores: Record<ArchetypeId, number> = {
    batisseur_silencieux: 0,
    connecteur: 0,
    expert_technique: 0,
    opportuniste_agile: 0,
    createur_impact: 0,
    stratege_prudent: 0
  }

  if (answers.reaction_incertitude === 'analyse') {
    scores.stratege_prudent += 3
    scores.expert_technique += 2
  } else if (answers.reaction_incertitude === 'fonce') {
    scores.opportuniste_agile += 3
    scores.connecteur += 2
  } else if (answers.reaction_incertitude === 'procrastine') {
    scores.batisseur_silencieux += 2
    scores.expert_technique += 1
  }

  if (answers.blocage === 'clarte') {
    scores.stratege_prudent += 2
  } else if (answers.blocage === 'confiance') {
    scores.expert_technique += 2
    scores.batisseur_silencieux += 1
  } else if (answers.blocage === 'execution') {
    scores.opportuniste_agile -= 1
    scores.batisseur_silencieux += 2
  } else if (answers.blocage === 'temps') {
    scores.connecteur += 1
  }

  if (answers.situation === 'en_poste') {
    scores.stratege_prudent += 2
    scores.batisseur_silencieux += 1
  } else if (answers.situation === 'transition') {
    scores.createur_impact += 1
  } else if (answers.situation === 'freelance') {
    scores.expert_technique += 2
  } else if (answers.situation === 'entrepreneur') {
    scores.opportuniste_agile += 1
    scores.connecteur += 1
  }

  // Analyse de la motivation
  if (answers.motivation === 'challenge') scores.expert_technique += 2
  if (answers.motivation === 'liberte') scores.opportuniste_agile += 2
  if (answers.motivation === 'impact') scores.createur_impact += 2
  if (answers.motivation === 'argent') scores.opportuniste_agile += 1

  // Analyse du style de décision
  if (answers.decision === 'data') scores.stratege_prudent += 2
  if (answers.decision === 'intuition') scores.opportuniste_agile += 2
  if (answers.decision === 'conseil') scores.connecteur += 2
  if (answers.decision === 'test') scores.opportuniste_agile += 1

  // Analyse de la force principale
  if (answers.force === 'vision') scores.batisseur_silencieux += 2
  if (answers.force === 'execution') scores.opportuniste_agile += 2
  if (answers.force === 'relation') scores.connecteur += 3
  if (answers.force === 'expertise') scores.expert_technique += 3

  if (answers.objectif_revenus === '10k_plus') {
    scores.opportuniste_agile += 1
    scores.connecteur += 1
  } else if (answers.objectif_revenus === '3_5k') {
    scores.batisseur_silencieux += 1
    scores.expert_technique += 1
  }

  if (profile) {
    const hasLongTenure = profile.experiences.some(exp => {
      const years = parseInt(exp.duration) || 0
      return years >= 5
    })
    if (hasLongTenure) {
      scores.batisseur_silencieux += 2
      scores.expert_technique += 1
    }

    if (profile.experiences.length >= 5) {
      scores.opportuniste_agile += 1
    }

    const text = `${profile.headline} ${profile.summary || ''}`.toLowerCase()
    
    if (text.includes('consultant') || text.includes('expert')) {
      scores.expert_technique += 2
    }
    if (text.includes('founder') || text.includes('ceo') || text.includes('entrepreneur')) {
      scores.opportuniste_agile += 1
      scores.connecteur += 1
    }
    if (text.includes('coach') || text.includes('mentor') || text.includes('impact')) {
      scores.createur_impact += 2
    }
    if (text.includes('director') || text.includes('manager') || text.includes('lead')) {
      scores.batisseur_silencieux += 1
      scores.stratege_prudent += 1
    }
  }

  const sortedArchetypes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
  
  return sortedArchetypes[0][0] as ArchetypeId
}

export function calculateScore(
  answers: QuizAnswers,
  profile?: LinkedInProfile
): { clarity: number; confidence: number; resources: number; urgency: number } {
  let clarity = 15
  let confidence = 15
  let resources = 15
  let urgency = 15

  if (answers.blocage === 'clarte') clarity -= 5
  if (answers.situation === 'transition') clarity -= 3
  if (profile?.experiences.length === 0) clarity -= 5

  if (answers.blocage === 'confiance') confidence -= 5
  if (answers.reaction_incertitude === 'panique') confidence -= 5
  if (answers.reaction_incertitude === 'procrastine') confidence -= 3
  if (profile && profile.experiences.length >= 3) confidence += 5

  if (answers.runway === 'plus_12_mois') resources += 10
  else if (answers.runway === '6_12_mois') resources += 5
  else if (answers.runway === 'moins_6_mois') resources -= 5
  if (answers.runway === 'ne_sait_pas') resources -= 3

  if (answers.objectif_revenus === '10k_plus') urgency += 3
  if (answers.runway === 'moins_6_mois') urgency += 5

  return {
    clarity: Math.max(0, Math.min(25, clarity)),
    confidence: Math.max(0, Math.min(25, confidence)),
    resources: Math.max(0, Math.min(25, resources)),
    urgency: Math.max(0, Math.min(25, urgency))
  }
}
