import type { LucideIcon } from 'lucide-react'

export interface ModeCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick: () => void
}
