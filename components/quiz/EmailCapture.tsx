'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Mail } from 'lucide-react'

interface EmailCaptureProps {
  onSubmit: (data: { firstName: string; email: string }) => Promise<void>
  loading: boolean
}

export function EmailCapture({ onSubmit, loading }: EmailCaptureProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({})

  const validate = () => {
    const newErrors: { firstName?: string; email?: string } = {}
    
    if (!firstName.trim()) {
      newErrors.firstName = 'Ton prénom est requis'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Ton email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      await onSubmit({ firstName, email })
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
            <Mail className="w-6 h-6 text-[#FF9B71]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Où on t'envoie ton diagnostic ?
            </h2>
            <p className="text-text-muted mt-1">
              Tu recevras aussi ton plan d'action personnalisé par email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Prénom"
            placeholder="Ton prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          
          <Input
            type="email"
            label="Email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Button type="submit" loading={loading} className="w-full">
            Découvrir mon profil →
          </Button>
          
          <p className="text-xs text-center text-text-muted">
            En continuant, tu acceptes de recevoir ton diagnostic par email. 
            Pas de spam, promis.
          </p>
        </form>
      </Card>
    </motion.div>
  )
}
