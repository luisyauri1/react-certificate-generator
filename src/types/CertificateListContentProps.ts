import type { MouseEvent } from 'react'
import type { Certificate } from './Certificate'

export interface CertificateListContentProps {
  certificates: Certificate[]
  onEdit: (id: string, event: MouseEvent) => void
  onDelete: (id: string, event: MouseEvent) => void
  onDownload: (certificate: Certificate, event: MouseEvent) => void
  formatDate: (date: string) => string
}
