'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Linkedin, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LinkedInInputProps {
  onSubmit: (url: string) => Promise<void>
  onSkip: () => void
  loading: boolean
  error?: string
}

export function LinkedInInput({ onSubmit, onSkip, loading, error }: LinkedInInputProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (url.includes('linkedin.com')) {
      await onSubmit(url)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[#FF9B71]/10 rounded-xl flex items-center justify-center">
            <Linkedin className="w-6 h-6 text-[#FF9B71]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Ton profil LinkedIn
            </h2>
            <p className="text-text-muted mt-1">
              On analyse ton parcours pour personnaliser ton diagnostic.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="url"
            placeholder="https://linkedin.com/in/ton-profil"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error}
            hint="Tes données restent privées et ne sont jamais partagées."
          />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-3">
            <Button type="submit" loading={loading} disabled={!url.includes('linkedin.com')}>
              Analyser mon profil
            </Button>
            <Button type="button" variant="ghost" onClick={onSkip}>
              Je préfère continuer sans LinkedIn
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  )
}
