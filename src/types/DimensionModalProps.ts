export interface DimensionModalProps {
  isOpen: boolean
  onClose: () => void
  imageDimensions: { width: number; height: number } | null
}
