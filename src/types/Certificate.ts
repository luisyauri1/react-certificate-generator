import type { TextElement } from './TextElement'

export interface Certificate {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  imageUrl: string | null
  texts: TextElement[]
}
