import type { Certificate } from './Certificate'

export interface CertificateListHeaderProps {
  certificateCount: number
  onTemplateClick: () => void
  onExcelClick: () => void
  onNewClick: () => void
  certificates: Certificate[]
}
