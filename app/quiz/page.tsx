'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { LinkedInInput } from '@/components/quiz/LinkedInInput'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { EmailCapture } from '@/components/quiz/EmailCapture'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Loader2 } from 'lucide-react'

const QUESTIONS = [
  {
    id: 'situation',
    question: 'Quelle est ta situation actuelle ?',
    options: [
      { value: 'en_poste', label: 'En poste (CDI/CDD)', description: 'Tu as un job stable' },
      { value: 'transition', label: 'En transition', description: 'Entre deux jobs ou en réflexion' },
      { value: 'freelance', label: 'Freelance / Indépendant', description: 'Tu travailles déjà à ton compte' },
      { value: 'entrepreneur', label: 'Entrepreneur', description: 'Tu as déjà lancé un business' },
    ],
  },
  {
    id: 'motivation',
    question: "Qu'est-ce qui te motive à entreprendre ?",
    options: [
      { value: 'impact', label: 'Créer un impact positif', description: 'Changer les choses à ta manière' },
      { value: 'liberte', label: 'La liberté', description: 'Être ton propre patron' },
      { value: 'challenge', label: 'Le challenge technique', description: 'Résoudre des problèmes complexes' },
      { value: 'argent', label: 'Générer des revenus', description: 'Construire ta sécurité financière' },
    ],
  },
  {
    id: 'decision',
    question: 'Comment tu prends tes décisions importantes ?',
    options: [
      { value: 'data', label: 'J\'analyse les données', description: 'Je me base sur les chiffres' },
      { value: 'intuition', label: 'Je fais confiance à mon intuition', description: 'Mon instinct me guide' },
      { value: 'conseil', label: 'Je demande conseil', description: 'Je consulte des experts ou mentors' },
      { value: 'test', label: 'Je teste rapidement', description: 'J\'expérimente et j\'ajuste' },
    ],
  },
  {
    id: 'force',
    question: "C'est quoi ta plus grande force ?",
    options: [
      { value: 'vision', label: 'Vision stratégique', description: 'Je vois loin et je planifie' },
      { value: 'execution', label: 'Exécution rapide', description: 'Je passe à l\'action vite' },
      { value: 'relation', label: 'Relations humaines', description: 'Je crée des liens solides' },
      { value: 'expertise', label: 'Expertise technique', description: 'Je maîtrise mon domaine' },
    ],
  },
  {
    id: 'runway',
    question: 'Tu as combien de runway devant toi ?',
    options: [
      { value: 'moins_6_mois', label: 'Moins de 6 mois', description: 'Épargne ou indemnités limitées' },
      { value: '6_12_mois', label: '6 à 12 mois', description: 'Un peu de marge' },
      { value: 'plus_12_mois', label: 'Plus de 12 mois', description: 'Confortable financièrement' },
      { value: 'ne_sait_pas', label: 'Je ne sais pas', description: 'Pas encore calculé' },
    ],
  },
  {
    id: 'objectif_revenus',
    question: "C'est quoi ton objectif de revenus à 12 mois ?",
    options: [
      { value: '3_5k', label: '3 000 - 5 000 €/mois', description: 'Remplacer un salaire' },
      { value: '5_10k', label: '5 000 - 10 000 €/mois', description: 'Vivre confortablement' },
      { value: '10k_plus', label: '10 000 €+ /mois', description: 'Scaler et peut-être recruter' },
    ],
  },
  {
    id: 'blocage',
    question: "Qu'est-ce qui te bloque le plus aujourd'hui ?",
    options: [
      { value: 'clarte', label: 'Le manque de clarté', description: 'Je ne sais pas par où commencer' },
      { value: 'confiance', label: 'Le manque de confiance', description: 'Je doute de mes capacités' },
      { value: 'execution', label: 'L\'exécution', description: 'J\'ai les idées mais j\'avance pas' },
      { value: 'temps', label: 'Le temps', description: 'Je n\'ai pas assez de temps' },
    ],
  },
  {
    id: 'reaction_incertitude',
    question: "Face à l'incertitude, tu fais quoi ?",
    options: [
      { value: 'fonce', label: 'Je fonce tête baissée', description: 'Action first, réflexion après' },
      { value: 'analyse', label: 'J\'analyse tous les angles', description: 'Je veux tout comprendre avant' },
      { value: 'procrastine', label: 'Je procrastine', description: 'Je repousse la décision' },
      { value: 'panique', label: 'Je stresse', description: 'L\'anxiété me paralyse' },
    ],
  },
]

type Step = 'linkedin' | 'questions' | 'email' | 'loading'

interface LinkedInProfile {
  full_name: string
  headline: string
  summary: string
  location?: string
  experiences: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
  }>
  skills: string[]
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('linkedin')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [linkedinUrl, setLinkedinUrl] = useState<string>('')
  const [linkedinProfile, setLinkedinProfile] = useState<LinkedInProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [showLinkedInWarning, setShowLinkedInWarning] = useState(false)

  const handleLinkedInSubmit = async (url: string) => {
    setLoading(true)
    setError(undefined)
    
    try {
      const response = await fetch('/api/scrape-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_url: url })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setLinkedinProfile(data.profile)
        setLinkedinUrl(url)
        setStep('questions')
      } else {
        setError(data.error || 'Impossible d\'analyser ce profil LinkedIn')
      }
    } catch (err) {
      setError('Erreur de connexion. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  const handleLinkedInSkip = () => {
    setShowLinkedInWarning(true)
  }

  const handleSkipConfirmed = () => {
    setShowLinkedInWarning(false)
    setLinkedinProfile(null)
    setStep('questions')
  }

  const handleAnswerSelect = (value: string) => {
    const questionId = QUESTIONS[currentQuestion].id
    setAnswers({ ...answers, [questionId]: value })
    
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setStep('email')
      }
    }, 300)
  }

  const handleEmailSubmit = async (data: { firstName: string; email: string }) => {
    setLoading(true)
    setStep('loading')

    try {
      // 1. Générer le diagnostic avec Claude
      const diagnosticResponse = await fetch('/api/generate-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedin_profile: linkedinProfile,
          quiz_answers: answers,
          first_name: data.firstName,
          email: data.email
        })
      })
      
      const diagnosticData = await diagnosticResponse.json()
      
      if (!diagnosticData.success) {
        throw new Error(diagnosticData.error || 'Erreur lors de la génération du diagnostic')
      }
      
      // 2. Sauvegarder dans Supabase
      const saveResponse = await fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          first_name: data.firstName,
          linkedin_url: linkedinUrl,
          linkedin_data: linkedinProfile,
          quiz_answers: answers,
          diagnostic: diagnosticData.diagnostic
        })
      })
      
      const saveData = await saveResponse.json()
      
      if (saveData.success) {
        router.push(`/resultat/${saveData.id}`)
      } else {
        throw new Error(saveData.error || 'Erreur lors de la sauvegarde')
      }
      
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'Une erreur est survenue')
      setStep('email')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {step === 'questions' && (
          <div className="mb-8">
            <ProgressBar current={currentQuestion + 1} total={QUESTIONS.length} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'linkedin' && (
            <LinkedInInput
              onSubmit={handleLinkedInSubmit}
              onSkip={handleLinkedInSkip}
              loading={loading}
              error={error}
            />
          )}

          {step === 'questions' && (
            <QuestionCard
              key={currentQuestion}
              question={QUESTIONS[currentQuestion].question}
              options={QUESTIONS[currentQuestion].options}
              selectedValue={answers[QUESTIONS[currentQuestion].id]}
              onSelect={handleAnswerSelect}
            />
          )}

          {step === 'email' && (
            <EmailCapture
              onSubmit={handleEmailSubmit}
              loading={loading}
            />
          )}

          {step === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Analyse en cours...
              </h2>
              <p className="text-text-muted">
                J'analyse ton profil et prépare ton diagnostic personnalisé
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {error && step !== 'linkedin' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}
      </div>

      {/* Modal avertissement LinkedIn */}
      {showLinkedInWarning && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowLinkedInWarning(false)}>
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Icône warning */}
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            {/* Titre */}
            <h3 className="text-xl font-bold text-[#112337] text-center mb-3">
              Ton diagnostic sera moins précis
            </h3>
            
            {/* Explication */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Sans ton profil LinkedIn, on ne peut pas analyser ton parcours, tes expériences et tes compétences.
              <span className="block mt-2 font-medium text-[#112337]">
                Ton diagnostic sera basé uniquement sur tes réponses au quiz — donc plus générique.
              </span>
            </p>
            
            {/* Ce qu'on perd */}
            <div className="bg-[#FAF9F6] rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-[#112337] mb-2">Sans LinkedIn, tu perds :</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✗</span>
                  Analyse de ton parcours professionnel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✗</span>
                  Diagnostic adapté à ton expérience
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✗</span>
                  Actions personnalisées à ton profil
                </li>
              </ul>
            </div>
            
            {/* Boutons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowLinkedInWarning(false)}
                className="w-full bg-[#FF9B71] text-white font-semibold py-4 rounded-full hover:bg-[#FF8A5C] transition-all"
              >
                OK, je mets mon LinkedIn
              </button>
              <button
                onClick={handleSkipConfirmed}
                className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm"
              >
                Continuer quand même →
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  )
}
