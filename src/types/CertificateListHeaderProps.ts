import type { Certificate } from './Certificate'

export interface CertificateListHeaderProps {
  certificateCount: number
  onTemplateClick: () => void
  onExcelClick: () => void
  onBulkExportClick: () => void
  onNewClick: () => void
  certificates: Certificate[]
}
