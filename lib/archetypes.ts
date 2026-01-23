import { ArchetypeId } from '@/types'

interface ArchetypeData {
  id: ArchetypeId
  name: string
  emoji: string
  description: string
  color: string
  defaultStrengths: string[]
  defaultTraps: string[]
  defaultBlindspots: string[]
  businessModels: string[]
}

export const archetypes: Record<ArchetypeId, ArchetypeData> = {
  batisseur_silencieux: {
    id: 'batisseur_silencieux',
    name: 'Le Bâtisseur Silencieux',
    emoji: '🧱',
    description: 'Tu construis pierre par pierre, sans faire de bruit. Méthodique, patient, orienté long terme. Tu préfères l\'exécution au pitch.',
    color: '#94A3B8',
    defaultStrengths: [
      'Discipline exceptionnelle',
      'Capacité à tenir dans la durée',
      'Focus sur la qualité',
      'N\'a pas besoin de validation externe'
    ],
    defaultTraps: [
      'Reste trop longtemps en mode préparation',
      'Évite la vente et le marketing',
      'Perfectionnisme paralysant'
    ],
    defaultBlindspots: [
      'Isolement (ne demande pas d\'aide)',
      'Sous-estime l\'importance du réseau',
      'Attend d\'être "prêt" pour se lancer'
    ],
    businessModels: [
      'Consulting/Freelance expertise',
      'SaaS bootstrappé',
      'Création de contenu long format'
    ]
  },
  connecteur: {
    id: 'connecteur',
    name: 'Le Connecteur',
    emoji: '🔗',
    description: 'Ton réseau est ton actif. Tu crées de la valeur en mettant les bonnes personnes en relation. Naturellement commercial sans être pushy.',
    color: '#FDBA74',
    defaultStrengths: [
      'Réseau puissant',
      'Capacité à closer naturellement',
      'Crée la confiance rapidement',
      'Détecte les opportunités sociales'
    ],
    defaultTraps: [
      'Dit oui à tout le monde',
      'Dispersion (trop de projets)',
      'Néglige l\'exécution pour les relations'
    ],
    defaultBlindspots: [
      'Dépendance au réseau',
      'Difficulté à travailler seul',
      'Sous-estime le travail de fond'
    ],
    businessModels: [
      'Apport d\'affaires / Courtage',
      'Coaching / Accompagnement',
      'Community building'
    ]
  },
  expert_technique: {
    id: 'expert_technique',
    name: 'L\'Expert Technique',
    emoji: '🎯',
    description: '20+ ans d\'expertise dans ton domaine. Tu sais tout sur ton sujet mais tu ne sais pas le vendre. Syndrome de l\'imposteur malgré une légitimité énorme.',
    color: '#C4B5FD',
    defaultStrengths: [
      'Expertise profonde et crédible',
      'Capacité à résoudre des problèmes complexes',
      'Clients fidèles une fois acquis',
      'Peut facturer cher'
    ],
    defaultTraps: [
      'Syndrome de l\'imposteur',
      'Sous-facture systématiquement',
      'Complexifie au lieu de simplifier'
    ],
    defaultBlindspots: [
      'Attend qu\'on le découvre',
      'Évite la prospection',
      'Se cache derrière la technique'
    ],
    businessModels: [
      'Formation / Cours en ligne',
      'Consulting high-ticket',
      'Audit / Diagnostic spécialisé'
    ]
  },
  opportuniste_agile: {
    id: 'opportuniste_agile',
    name: 'L\'Opportuniste Agile',
    emoji: '⚡',
    description: 'Tu vois des opportunités partout. Capable de pivoter en 24h. Tu aimes l\'excitation du deal. Souvent plusieurs projets en parallèle.',
    color: '#FDE047',
    defaultStrengths: [
      'Détection d\'opportunités rapide',
      'Tolérance au risque élevée',
      'Capacité à vendre n\'importe quoi',
      'Pas peur de l\'échec'
    ],
    defaultTraps: [
      'Abandonne trop vite',
      'Syndrome de l\'objet brillant',
      'Promet trop, délivre pas assez'
    ],
    defaultBlindspots: [
      'Néglige la construction long terme',
      'Burn-out par excès de projets',
      'Difficulté à approfondir'
    ],
    businessModels: [
      'Trading / Arbitrage',
      'Lancement de produits',
      'Affiliation / Partenariats'
    ]
  },
  createur_impact: {
    id: 'createur_impact',
    name: 'Le Créateur d\'Impact',
    emoji: '🌱',
    description: 'Tu veux changer les choses, pas juste gagner de l\'argent. Mission-driven. Parfois tiraillé entre idéalisme et réalité business.',
    color: '#6EE7B7',
    defaultStrengths: [
      'Vision inspirante',
      'Capacité à fédérer autour d\'une cause',
      'Persévérance pour les bonnes raisons',
      'Authenticité perçue'
    ],
    defaultTraps: [
      'Refuse de monétiser',
      'S\'épuise pour la cause',
      'Confond passion et business viable'
    ],
    defaultBlindspots: [
      'Culpabilité quand il faut être commercial',
      'Difficulté à fixer des prix',
      'Attire les gens qui ne peuvent pas payer'
    ],
    businessModels: [
      'Coaching transformationnel',
      'Formation à impact',
      'Contenu à mission (podcast, média)'
    ]
  },
  stratege_prudent: {
    id: 'stratege_prudent',
    name: 'Le Stratège Prudent',
    emoji: '♟️',
    description: 'Tu analyses tout avant d\'agir. Besoin de maîtriser le risque. Tu viens souvent d\'un environnement corporate structuré.',
    color: '#7DD3FC',
    defaultStrengths: [
      'Analyse rigoureuse',
      'Gestion des risques',
      'Planification solide',
      'Discipline financière'
    ],
    defaultTraps: [
      'Paralysie par l\'analyse',
      'Attend les conditions parfaites',
      'Surinvestit en formation'
    ],
    defaultBlindspots: [
      'Peur de l\'échec qui bloque le lancement',
      'Sous-estime l\'importance de l\'action',
      'Perfectionnisme déguisé'
    ],
    businessModels: [
      'Consulting structuré',
      'Gestion de projet externalisé',
      'Franchise (cadre existant)'
    ]
  }
}

export function getArchetypePrompt(archetypeId: ArchetypeId): ArchetypeData {
  return archetypes[archetypeId]
}

export function getAllArchetypes(): ArchetypeData[] {
  return Object.values(archetypes)
}
