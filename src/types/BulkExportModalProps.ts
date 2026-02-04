import type { Certificate } from './Certificate'

export interface BulkExportModalProps {
  certificates: Certificate[]
  onClose: () => void
}
