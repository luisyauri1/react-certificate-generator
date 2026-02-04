import type { CertificateListContentProps } from '../types'
import CertificateListItem from './CertificateListItem'

export default function CertificateListContent({
  certificates,
  onEdit,
  onDelete,
  onDownload,
  formatDate,
}: CertificateListContentProps) {
  return (
    <div className="space-y-3">
      {certificates.map(certificate => (
        <CertificateListItem
          key={certificate.id}
          certificate={certificate}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
          formatDate={formatDate}
        />
      ))}
    </div>
  )
}
