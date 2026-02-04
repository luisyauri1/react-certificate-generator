import { Download, FileSpreadsheet, Image, Plus } from 'lucide-react'
import type { GlobalActionsProps } from '../types'
import Button from './Button'

export default function GlobalActions({
  certificates,
  onTemplateClick,
  onExcelClick,
  onBulkExportClick,
  onNewClick,
}: GlobalActionsProps) {
  const readyCount = certificates.filter(cert => cert.imageUrl).length

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="secondary" size="md" onClick={onTemplateClick}>
        <Image size={16} strokeWidth={1.5} />
        <span className="hidden sm:inline">Plantilla</span>
      </Button>

      <Button variant="secondary" size="md" onClick={onExcelClick}>
        <FileSpreadsheet size={16} strokeWidth={1.5} />
        <span className="hidden sm:inline">Excel</span>
      </Button>

      {readyCount > 0 && (
        <Button variant="secondary" size="md" onClick={onBulkExportClick}>
          <Download size={18} strokeWidth={1.5} />
          <span className="hidden sm:inline">
            Exportar todos ({readyCount})
          </span>
        </Button>
      )}

      <Button variant="primary" size="md" onClick={onNewClick}>
        <Plus size={18} />
        Nuevo
      </Button>
    </div>
  )
}
