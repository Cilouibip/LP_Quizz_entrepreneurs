import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-sm p-6',
        hover && 'transition-all duration-200 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
