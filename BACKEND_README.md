# Backend - Quiz Diagnostic Entrepreneur

## Structure du projet

```
diagnostic-brutal/
├── app/
│   └── api/
│       ├── scrape-linkedin/      # Scraping profil LinkedIn via ScrapIn
│       ├── generate-diagnostic/  # Génération diagnostic avec Claude
│       └── save-result/          # Sauvegarde résultats dans Supabase
├── lib/
│   ├── supabase.ts              # Client Supabase
│   ├── scoring.ts               # Logique de scoring et détection archétype
│   └── archetypes.ts            # Données des 6 archétypes
├── types/
│   └── index.ts                 # Types TypeScript
├── supabase/
│   └── schema.sql               # Schéma base de données
└── .env.local                   # Variables d'environnement
```

## Configuration

### 1. Variables d'environnement (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
ANTHROPIC_API_KEY=votre_api_key_claude
SCRAPIN_API_KEY=votre_api_key_scrapin
```

### 2. Base de données Supabase

Exécuter le fichier `supabase/schema.sql` dans l'éditeur SQL de Supabase pour créer :
- Table `users` (id, email, first_name, linkedin_url)
- Table `diagnostics` (id, user_id, linkedin_data, quiz_answers, archetype, score, etc.)
- Index de performance

## API Routes

### POST /api/scrape-linkedin

**Body:**
```json
{
  "linkedin_url": "https://linkedin.com/in/username"
}
```

**Response (succès):**
```json
{
  "success": true,
  "profile": {
    "full_name": "John Doe",
    "headline": "Entrepreneur",
    "summary": "...",
    "experiences": [...],
    "education": [...],
    "skills": [...],
    "profile_pic_url": "..."
  }
}
```

**Response (fallback):**
```json
{
  "success": false,
  "fallback": true,
  "message": "Impossible de récupérer le profil..."
}
```

### POST /api/generate-diagnostic

**Body:**
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "linkedin_profile": { ... },
  "quiz_answers": {
    "situation": "en_poste",
    "runway": "6_12_mois",
    "objectif_revenus": "5_10k",
    "blocage": "clarte",
    "reaction_incertitude": "analyse",
    "urgence": "3_mois"
  }
}
```

**Response:**
```json
{
  "success": true,
  "diagnostic": {
    "archetype": "stratege_prudent",
    "archetype_name": "Le Stratège Prudent",
    "archetype_emoji": "♟️",
    "archetype_description": "...",
    "score": 65,
    "score_breakdown": {
      "clarity": 15,
      "confidence": 18,
      "resources": 20,
      "urgency": 12
    },
    "trap": {
      "title": "...",
      "description": "...",
      "cost": "..."
    },
    "strengths": ["...", "...", "..."],
    "blindspots": ["...", "...", "..."],
    "plan_7_days": ["...", "...", "..."],
    "personalized_insight": "..."
  }
}
```

### POST /api/save-result

**Body:**
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "linkedin_url": "https://linkedin.com/in/username",
  "linkedin_data": { ... },
  "quiz_answers": { ... },
  "diagnostic": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "diagnostic_id": "uuid",
  "user_id": "uuid"
}
```

## Logique de scoring

### Détection d'archétype (`lib/scoring.ts`)

L'algorithme analyse :
- **Réponses quiz** : situation, blocage, réaction à l'incertitude, urgence
- **Profil LinkedIn** : durée des expériences, nombre de postes, mots-clés dans headline/summary

Score par archétype, le plus élevé gagne.

### Calcul du score de readiness (0-100)

4 dimensions (0-25 chaque) :
- **Clarity** : clarté de la vision
- **Confidence** : confiance en soi
- **Resources** : runway financier
- **Urgency** : niveau d'urgence

## Les 6 archétypes

1. **🧱 Le Bâtisseur Silencieux** - Méthodique, patient, orienté long terme
2. **🔗 Le Connecteur** - Réseau puissant, naturellement commercial
3. **🎯 L'Expert Technique** - Expertise profonde, syndrome de l'imposteur
4. **⚡ L'Opportuniste Agile** - Détecte les opportunités, pivote rapidement
5. **🌱 Le Créateur d'Impact** - Mission-driven, veut changer les choses
6. **♟️ Le Stratège Prudent** - Analyse tout, maîtrise du risque

Chaque archétype a :
- Description, emoji, couleur
- Forces par défaut
- Pièges typiques
- Angles morts
- Business models recommandés

## Dépendances

```json
{
  "@supabase/supabase-js": "^2.x",
  "@anthropic-ai/sdk": "^0.x",
  "zod": "^3.x",
  "next": "^15.x",
  "react": "^19.x",
  "typescript": "^5.x"
}
```

## Lancer le projet

```bash
npm install
npm run dev
```

Le serveur démarre sur http://localhost:3000

## Notes importantes

- ✅ TypeScript strict activé
- ✅ Validation des inputs avec Zod
- ✅ Gestion des erreurs propre
- ✅ Fallback si scraping LinkedIn échoue
- ✅ Pas de composants UI (géré par un autre agent)
- ✅ Pas de dépendances non autorisées
