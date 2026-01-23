'use client'

import { useState } from 'react'
import { Brain, Zap, ShieldAlert, TrendingUp, Target, MessageSquare, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [showPreview, setShowPreview] = useState(false)
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      
      {/* HERO */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-10 shadow-sm">
            <span className="text-sm text-gray-600">✨ Quiz gratuit • 3 minutes</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#112337] leading-tight">
            <span className="block">Quel entrepreneur</span>
            <span className="block">devrais-tu être ?</span>
          </h1>
          
          {/* Subheader - plus gros, orange, impactant */}
          <p className="text-3xl md:text-4xl font-semibold text-[#FF9B71] mt-4 mb-6">
            Et pourquoi tu ne l'es pas encore.
          </p>
          
          {/* Description - plus petit */}
          <p className="text-lg text-gray-500 mb-6">
            Un diagnostic brutal et bienveillant. Ton profil, tes blocages, ton plan d'action.
          </p>
          
          {/* Les deux avatars */}
          <p className="text-base text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Que tu sois <span className="font-medium text-[#112337]">expert qui hésite à quitter son job</span>,
            <br />ou <span className="font-medium text-[#112337]">déjà lancé mais bloqué</span> — ce diagnostic est pour toi.
          </p>
          
          {/* CTA */}
          <Link 
            href="/quiz" 
            className="inline-flex items-center gap-3 bg-[#FF9B71] text-white font-semibold text-lg px-10 py-5 rounded-full hover:bg-[#FF8A5C] transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Faire mon diagnostic
            <ArrowRight className="w-5 h-5" />
          </Link>
          
        </div>
      </section>

      {/* APERÇU DU RÉSULTAT */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Titre plus gros et visible */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#112337] mb-10">
            Voici ce que tu vas recevoir
          </h2>
          
          {/* Mockup cliquable avec effet glow */}
          <div 
            className="relative cursor-pointer group"
            onClick={() => setShowPreview(true)}
          >
            
            {/* Le mockup avec glow orange */}
            <div className="bg-[#FAF9F6] rounded-3xl p-8 md:p-12 border border-[#FF9B71]/20 shadow-[0_0_60px_-15px_rgba(255,155,113,0.4)] hover:shadow-[0_0_80px_-15px_rgba(255,155,113,0.6)] transition-all duration-300">
              
              {/* Header archétype */}
              <div className="text-center mb-8">
                <span className="text-4xl mb-3 block">⚡</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#112337]">L'Opportuniste Agile</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Tu vois des opportunités partout. Capable de pivoter en 24h. Tu aimes l'excitation du deal.
                </p>
              </div>
              
              {/* Graphique + Scores */}
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <h4 className="text-lg font-semibold text-center text-[#112337] mb-6">Ton profil en un coup d'œil</h4>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  
                  {/* Radar Chart Mockup */}
                  <div className="flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {/* Cercles de fond */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <circle cx="100" cy="100" r="60" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <circle cx="100" cy="100" r="40" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <circle cx="100" cy="100" r="20" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      
                      {/* Lignes axes */}
                      <line x1="100" y1="20" x2="100" y2="180" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="20" y1="100" x2="180" y2="100" stroke="#E5E5E5" strokeWidth="1" />
                      
                      {/* Polygone exemple */}
                      <polygon 
                        points="100,40 145,100 100,130 55,100" 
                        fill="rgba(255,155,113,0.2)" 
                        stroke="#FF9B71" 
                        strokeWidth="2"
                      />
                      
                      {/* Points */}
                      <circle cx="100" cy="40" r="5" fill="#FF9B71" />
                      <circle cx="145" cy="100" r="5" fill="#FF9B71" />
                      <circle cx="100" cy="130" r="5" fill="#FF9B71" />
                      <circle cx="55" cy="100" r="5" fill="#FF9B71" />
                      
                      {/* Labels */}
                      <text x="100" y="12" textAnchor="middle" className="text-xs fill-gray-500">Clarté</text>
                      <text x="188" y="104" textAnchor="middle" className="text-xs fill-gray-500">Confiance</text>
                      <text x="100" y="195" textAnchor="middle" className="text-xs fill-gray-500">Exécution</text>
                      <text x="12" y="104" textAnchor="middle" className="text-xs fill-gray-500">Ressources</text>
                    </svg>
                  </div>
                  
                  {/* Scores */}
                  <div className="space-y-3">
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Clarté</span>
                        <span className="font-bold text-[#FF9B71]">75/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Tu as une direction mais tu te disperses encore</p>
                    </div>
                    
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Confiance</span>
                        <span className="font-bold text-[#FF9B71]">45/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Tu doutes encore de ton prix</p>
                    </div>
                    
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Exécution</span>
                        <span className="font-bold text-[#FF9B71]">85/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Quand tu décides, tu déroules</p>
                    </div>
                    
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Ressources</span>
                        <span className="font-bold text-[#FF9B71]">80/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">CV solide + réseau + runway correct</p>
                    </div>
                    
                    {/* Score global */}
                    <div className="bg-[#FFF5F0] rounded-xl p-4 text-center mt-4">
                      <span className="text-3xl font-bold text-[#FF9B71]">71</span>
                      <span className="text-gray-600 ml-2">Score global</span>
                    </div>
                  </div>
                  
                </div>
              </div>
              
            </div>
            
            {/* Overlay avec CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent rounded-3xl flex items-end justify-center pb-12">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Clique pour voir un exemple complet</p>
                <p className="text-lg font-medium text-[#112337] mb-4">
                  Découvre ton propre profil
                </p>
                <Link 
                  href="/quiz" 
                  className="inline-flex items-center gap-3 bg-[#FF9B71] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#FF8A5C] transition-all shadow-lg hover:shadow-xl"
                >
                  Faire mon diagnostic
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* MODAL PREVIEW COMPLÈTE */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowPreview(false)}>
          <div className="bg-[#FAF9F6] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative my-8" onClick={(e) => e.stopPropagation()}>
            
            {/* Bouton fermer */}
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Badge exemple */}
            <div className="bg-amber-100 text-amber-800 text-sm font-medium px-4 py-2 text-center">
              ⚡ Exemple de diagnostic — Le tien sera 100% personnalisé
            </div>
            
            <div className="p-6 md:p-10">
              
              {/* Header archétype */}
              <div className="text-center mb-10">
                <span className="text-5xl mb-4 block">🎯</span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#112337]">Le Stratège Prudent</h3>
                <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                  Tu analyses tout avant d'agir. Tu veux que ce soit parfait. Tu attends le "bon moment" — qui ne vient jamais.
                </p>
              </div>
              
              {/* Graphique + Scores */}
              <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
                <h4 className="text-xl font-semibold text-center text-[#112337] mb-6">Ton profil en un coup d'œil</h4>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  
                  {/* Radar */}
                  <div className="flex justify-center">
                    <svg width="220" height="220" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <circle cx="100" cy="100" r="60" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <circle cx="100" cy="100" r="40" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <circle cx="100" cy="100" r="20" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="100" y1="20" x2="100" y2="180" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="20" y1="100" x2="180" y2="100" stroke="#E5E5E5" strokeWidth="1" />
                      <polygon points="100,35 120,100 100,150 45,100" fill="rgba(255,155,113,0.2)" stroke="#FF9B71" strokeWidth="2" />
                      <circle cx="100" cy="35" r="5" fill="#FF9B71" />
                      <circle cx="120" cy="100" r="5" fill="#FF9B71" />
                      <circle cx="100" cy="150" r="5" fill="#FF9B71" />
                      <circle cx="45" cy="100" r="5" fill="#FF9B71" />
                      <text x="100" y="12" textAnchor="middle" className="text-xs fill-gray-500">Clarté</text>
                      <text x="188" y="104" textAnchor="middle" className="text-xs fill-gray-500">Confiance</text>
                      <text x="100" y="195" textAnchor="middle" className="text-xs fill-gray-500">Exécution</text>
                      <text x="12" y="104" textAnchor="middle" className="text-xs fill-gray-500">Ressources</text>
                    </svg>
                  </div>
                  
                  {/* Scores détaillés */}
                  <div className="space-y-3">
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Clarté</span>
                        <span className="font-bold text-[#FF9B71]">82/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">15 ans de marketing chez Danone — tu sais exactement ce que tu vaux</p>
                    </div>
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Confiance</span>
                        <span className="font-bold text-[#FF9B71]">38/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Tu as piloté 12M€ de budget et tu doutes de facturer 3k€/mois</p>
                    </div>
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Exécution</span>
                        <span className="font-bold text-[#FF9B71]">35/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">18 mois que tu "prépares" ton lancement. C'est la paralysie.</p>
                    </div>
                    <div className="bg-[#FAF9F6] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#112337]">Ressources</span>
                        <span className="font-bold text-[#FF9B71]">90/100</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Réseau CMO + épargne 18 mois + expertise reconnue</p>
                    </div>
                    <div className="bg-[#FFF5F0] rounded-xl p-4 text-center mt-4">
                      <span className="text-3xl font-bold text-[#FF9B71]">61</span>
                      <span className="text-gray-600 ml-2">Score global</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Forces + Angles morts */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-[#112337] mb-4">💪 Tes forces</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">Tu as piloté 12M€ de budget marketing chez Danone — c'est rare et ça se monnaie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">Tu as un réseau de 200+ CMO/Directeurs Marketing qui te connaissent</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">Tu maîtrises la stratégie de marque de A à Z — pas juste l'exécution</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-[#112337] mb-4">👁️ Tes angles morts</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">⚠</span>
                      <span className="text-gray-700">Tu confonds "préparer" et "procrastiner" depuis 18 mois</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">⚠</span>
                      <span className="text-gray-700">Tu attends que ton offre soit "parfaite" — elle ne le sera jamais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">⚠</span>
                      <span className="text-gray-700">Tu sous-estimes ta légitimité parce que tu n'as "jamais été entrepreneur"</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Diagnostic brutal */}
              <div className="bg-white rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-semibold text-[#112337] mb-4">🎯 Diagnostic Brutal</h4>
                <p className="text-gray-700 leading-relaxed">
                  Tu as géré 12M€ de budget chez Danone, tu as un carnet d'adresses en or, et tu "prépares" ton lancement depuis 18 mois. C'est quoi le délire ? Tu te caches derrière la préparation pour éviter de te confronter au marché. Résultat : zéro client, zéro feedback, zéro revenu. Ton problème n'est pas la compétence — c'est la peur d'être jugée sans le bouclier du salariat.
                </p>
              </div>
              
              {/* Piège */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-semibold text-[#112337] mb-4">⚠️ Ton piège</h4>
                <p className="text-gray-700 leading-relaxed">
                  Piège du Stratège Prudent : tu veux tout maîtriser avant de te lancer. Tu lis des livres, tu fais des formations, tu "structures ton offre". Mais tu ne VENDS pas. Chaque jour qui passe, ton épargne fond et ta confiance aussi. Dans 6 mois, tu vas paniquer et accepter n'importe quel CDI par défaut.
                </p>
              </div>
              
              {/* Actions prioritaires */}
              <div className="bg-white rounded-2xl p-6 mb-8">
                <h4 className="text-xl font-semibold text-[#112337] mb-6">🚀 Tes 3 actions prioritaires</h4>
                
                <div className="space-y-6">
                  
                  {/* Action 1 */}
                  <div className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#FF9B71] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-semibold text-[#112337]">Premier client en 7 jours</h5>
                        <p className="text-sm text-[#FF9B71] font-medium">Cette semaine</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Pourquoi toi :</strong> Tu connais 200+ CMO. Tu n'as pas besoin de prospecter des inconnus. Tu as juste besoin d'OSER demander.
                    </p>
                    <div className="bg-[#FAF9F6] rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-[#112337] mb-2">Comment :</p>
                      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Liste 20 ex-collègues CMO/Directeurs Marketing</li>
                        <li>Envoie UN message simple (pas de pitch, juste une question)</li>
                        <li>Objectif : 5 calls cette semaine</li>
                        <li>Propose une mission test à 2k€ (pas gratuit)</li>
                      </ol>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-[#112337] mb-2">💬 Message à copier-coller :</p>
                      <p className="text-sm text-gray-600 italic">
                        "Salut [Prénom], je me lance en conseil stratégie de marque après 15 ans chez Danone. Question honnête : si tu avais un budget pour un audit de ta stratégie de marque, ce serait quoi ta priorité ? (Je cherche à comprendre les vrais besoins avant de structurer mon offre)"
                      </p>
                    </div>
                    <p className="text-sm text-green-600 mt-4">
                      ✅ <strong>Résultat attendu :</strong> 5 calls + 1 premier client payant à 2k€ minimum
                    </p>
                  </div>
                  
                  {/* Action 2 */}
                  <div className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#FF9B71] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-semibold text-[#112337]">Offre "Audit 48h" à 3k€</h5>
                        <p className="text-sm text-[#FF9B71] font-medium">Avant vendredi</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Pourquoi toi :</strong> Tu n'as pas besoin d'une offre "complète". Tu as besoin d'un premier produit vendable qui prouve ta valeur en 48h.
                    </p>
                    <div className="bg-[#FAF9F6] rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-[#112337] mb-2">Comment :</p>
                      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Format : 2h d'interview + 1 jour d'analyse + 1h de restitution</li>
                        <li>Livrable : 1 doc de 5 pages max avec 3 recommandations prioritaires</li>
                        <li>Prix : 3000€ HT (non négociable)</li>
                        <li>Promesse : "Les 3 leviers qui vont doubler l'impact de ta marque"</li>
                      </ol>
                    </div>
                    <p className="text-sm text-green-600 mt-4">
                      ✅ <strong>Résultat attendu :</strong> Une offre claire que tu peux pitcher en 30 secondes
                    </p>
                  </div>
                  
                  {/* Action 3 */}
                  <div className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#FF9B71] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-semibold text-[#112337]">Règle anti-perfectionnisme</h5>
                        <p className="text-sm text-[#FF9B71] font-medium">Immédiate</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Pourquoi toi :</strong> Ton cerveau de Stratège va vouloir "améliorer" l'offre avant de la vendre. C'est exactement ce qu'il faut éviter.
                    </p>
                    <div className="bg-[#FAF9F6] rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-[#112337] mb-2">Comment :</p>
                      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Interdit de modifier ton offre avant d'avoir eu 10 refus</li>
                        <li>Chaque "amélioration" va dans un doc "Plus tard"</li>
                        <li>Si tu triches : tu paies 200€ à une asso (engagement public)</li>
                      </ol>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-[#112337] mb-2">💬 Mantra à copier :</p>
                      <p className="text-sm text-gray-600 italic">
                        "Une offre imparfaite vendue vaut mieux qu'une offre parfaite dans ma tête."
                      </p>
                    </div>
                    <p className="text-sm text-green-600 mt-4">
                      ✅ <strong>Résultat attendu :</strong> Tu vends AVANT de perfectionner
                    </p>
                  </div>
                  
                </div>
              </div>
              
              {/* Anti-conseil */}
              <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">🚫 Ce que tu ne dois PAS faire</h4>
                <p className="text-gray-300 leading-relaxed">
                  NE crée PAS de site web avant d'avoir un client. NE fais PAS de formation "pour te sentir prête". NE passe PAS 3 mois à "structurer ton offre". Tu as 18 mois de préparation dans les pattes — c'est 17 mois de trop. La seule chose qui va te débloquer : un client qui paye.
                </p>
              </div>
              
              {/* CTA dans la modal */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-500 mb-4">Ceci est un exemple. Ton diagnostic sera basé sur TON parcours LinkedIn et TES réponses.</p>
                <Link 
                  href="/quiz" 
                  className="inline-flex items-center gap-3 bg-[#FF9B71] text-white font-semibold text-lg px-10 py-5 rounded-full hover:bg-[#FF8A5C] transition-all shadow-lg hover:shadow-xl"
                >
                  Découvrir mon vrai profil
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-4xl font-bold text-[#112337] text-center mb-16">
            Comment ça marche ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Carte 1 - Bleu */}
            <div className="bg-[#5BC0EB] rounded-3xl p-8 text-white">
              <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🔗
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Connecte LinkedIn</h3>
              <p className="text-white/90">
                On analyse ton parcours pour personnaliser le diagnostic à ton expérience réelle.
              </p>
            </div>
            
            {/* Carte 2 - Rose */}
            <div className="bg-[#FA7268] rounded-3xl p-8 text-white">
              <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6">
                📝
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Réponds au quiz</h3>
              <p className="text-white/90">
                8 questions pour identifier ton archétype, tes blocages et ton potentiel.
              </p>
            </div>
            
            {/* Carte 3 - Vert */}
            <div className="bg-[#95E1D3] rounded-3xl p-8 text-[#112337]">
              <div className="bg-white/40 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🎯
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Reçois ton diagnostic</h3>
              <p className="text-[#112337]/80">
                Un plan d'action personnalisé avec tes 3 prochaines étapes concrètes.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* CE QUE TU VAS DÉCOUVRIR */}
      <section className="py-16 px-4 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center text-[#112337] mb-12">
            Ce que tu vas découvrir
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Item 1 */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-[#FF9B71]" />
              </div>
              <div>
                <p className="font-medium text-[#112337]">Ton archétype entrepreneur parmi les 6 profils</p>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#FF9B71]" />
              </div>
              <div>
                <p className="font-medium text-[#112337]">Tes forces cachées que tu sous-exploites</p>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-[#FF9B71]" />
              </div>
              <div>
                <p className="font-medium text-[#112337]">Le piège qui te bloque (et comment l'éviter)</p>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#FF9B71]" />
              </div>
              <div>
                <p className="font-medium text-[#112337]">Ton profil en un coup d'œil (clarté, confiance, exécution, ressources)</p>
              </div>
            </div>
            
            {/* Item 5 */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-[#FF9B71]" />
              </div>
              <div>
                <p className="font-medium text-[#112337]">3 actions concrètes à faire cette semaine</p>
              </div>
            </div>
            
            {/* Item 6 */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-[#FF9B71]" />
              </div>
              <div>
                <p className="font-medium text-[#112337]">Des templates de messages prêts à envoyer</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#FA7268] via-[#FF9B71] to-[#F4D35E] rounded-[2rem] p-12 text-center">
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à découvrir ton profil ?
            </h2>
            
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              3 minutes pour obtenir un diagnostic personnalisé et tes prochaines étapes concrètes.
            </p>
            
            <Link href="/quiz">
              <button className="bg-white text-[#112337] font-bold text-lg px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Commencer le quiz gratuit →
              </button>
            </Link>
            
            <div className="flex justify-center gap-6 mt-8 text-white/90 text-sm">
              <span>✓ Gratuit</span>
              <span>✓ 3 minutes</span>
              <span>✓ Sans engagement</span>
            </div>
            
          </div>
        </div>
      </section>

    </main>
  )
}
