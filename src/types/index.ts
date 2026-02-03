// Texto editable en el canvas
export interface TextElement {
  id: string
  text: string
  label?: string
  x: number
  y: number
  fontSize: number
  color: string
}

// Props para CertificatePreview
export interface CertificatePreviewProps {
  imageUrl: string | null
  texts: TextElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
  stageRef: React.RefObject<import('konva/lib/Stage').Stage | null>
}

// Props para CertificateForm
export interface CertificateFormProps {
  texts: TextElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onChangeSelected: (updates: Partial<TextElement>) => void
  onAddText: () => void
  onDeleteSelected: () => void
}

// Props para CertificateTemplateSelector
export interface CertificateTemplateSelectorProps {
  onTemplateLoad: (imageUrl: string) => void
}
