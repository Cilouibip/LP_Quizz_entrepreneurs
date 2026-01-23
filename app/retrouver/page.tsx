'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RetrouverPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: supabaseError } = await supabase
        .from('diagnostics')
        .select('id')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (supabaseError || !data) {
        setError('Aucun diagnostic trouvé pour cet email')
        setLoading(false)
        return
      }

      router.push(`/resultat/${data.id}`)
    } catch (err) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
        
        <h1 className="text-2xl font-bold text-[#112337] text-center mb-2">
          Retrouve ton diagnostic
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Entre l'email que tu as utilisé pour le quiz
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-[#FF9B71] focus:ring-2 focus:ring-[#FF9B71]/20"
          />
          
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF9B71] text-white font-semibold py-4 rounded-full hover:bg-[#FF8A5C] transition-all disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Retrouver mon diagnostic →'}
          </button>
        </form>
        
      </div>
    </main>
  )
}
