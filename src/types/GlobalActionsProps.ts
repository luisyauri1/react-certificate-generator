import type { Certificate } from './Certificate'

export interface GlobalActionsProps {
  certificates: Certificate[]
  onTemplateClick: () => void
  onExcelClick: () => void
  onNewClick: () => void
}
