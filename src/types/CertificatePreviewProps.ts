import type { TextElement } from './TextElement'

export interface CertificatePreviewProps {
  imageUrl: string | null
  texts: TextElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
  onChangeSelected: (updates: Partial<TextElement>) => void
  stageRef: React.RefObject<import('konva/lib/Stage').Stage | null>
  onExport: () => void
}
