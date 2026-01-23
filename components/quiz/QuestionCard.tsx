'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'

interface Option {
  value: string
  label: string
  description?: string
}

interface QuestionCardProps {
  question: string
  options: Option[]
  selectedValue?: string
  onSelect: (value: string) => void
}

export function QuestionCard({ question, options, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card>
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          {question}
        </h2>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(option.value)}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                ${selectedValue === option.value
                  ? 'border-[#FF9B71] bg-[#FF9B71]/10'
                  : 'border-gray-200 hover:border-[#FF9B71]/50 hover:bg-[#FAF9F6]'
                }
              `}
            >
              <div className="font-medium text-text-primary">{option.label}</div>
              {option.description && (
                <div className="text-sm text-text-muted mt-1">{option.description}</div>
              )}
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
