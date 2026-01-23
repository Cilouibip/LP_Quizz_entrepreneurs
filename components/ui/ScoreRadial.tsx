'use client'

import { motion } from 'framer-motion'

interface ScoreRadialProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function ScoreRadial({ 
  score, 
  maxScore = 100, 
  size = 'md',
  label 
}: ScoreRadialProps) {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48'
  }

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizes[size]}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45"
            stroke="#F5F3EF"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45"
            stroke="#FF9B71"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`font-bold text-primary ${textSizes[size]}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      {label && (
        <p className="text-sm font-medium text-text-muted">{label}</p>
      )}
    </div>
  )
}
