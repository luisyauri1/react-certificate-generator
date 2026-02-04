import type { CertificateListHeaderProps } from '../types'
import GlobalActions from './GlobalActions'

export default function CertificateListHeader({
  certificateCount,
  onTemplateClick,
  onExcelClick,
  onBulkExportClick,
  onNewClick,
  certificates,
}: CertificateListHeaderProps) {
  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Certificados
          </h1>
          <p className="text-sm md:text-base text-orange-300/60 mt-2">
            {certificateCount}{' '}
            {certificateCount !== 1 ? 'certificados' : 'certificado'}
          </p>
        </div>
        <GlobalActions
          certificates={certificates}
          onTemplateClick={onTemplateClick}
          onExcelClick={onExcelClick}
          onBulkExportClick={onBulkExportClick}
          onNewClick={onNewClick}
        />
      </div>
    </div>
  )
}
