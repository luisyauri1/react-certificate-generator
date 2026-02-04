// Texto editable en el canvas
export interface TextElement {
  id: string
  text: string
  label?: string
  x: number
  y: number
  fontSize: number
  color: string
  fontFamily?: string
  fontWeight?: 'normal' | 'bold'
  fontStyle?: 'normal' | 'italic'
  width?: number
}
