import type { Certificate } from './Certificate'

export interface GlobalActionsProps {
  certificates: Certificate[]
  onTemplateClick: () => void
  onExcelClick: () => void
  onBulkExportClick: () => void
  onNewClick: () => void
}
