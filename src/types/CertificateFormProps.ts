import type { TextElement } from './TextElement'

export interface CertificateFormProps {
  texts: TextElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onChangeSelected: (updates: Partial<TextElement>) => void
  onAddText: () => void
  onDeleteSelected: () => void
  hasImage: boolean
}
