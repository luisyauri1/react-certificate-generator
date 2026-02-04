import type { CertificateStatusBadgeProps } from '../types'

export default function CertificateStatusBadge({
  hasTemplate,
}: CertificateStatusBadgeProps) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md text-xs md:text-sm font-medium shrink-0 ${
        hasTemplate
          ? 'bg-green-500/20 text-green-400'
          : 'bg-orange-500/20 text-orange-400'
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          hasTemplate ? 'bg-green-400' : 'bg-orange-400'
        }`}
      />
      {hasTemplate ? 'Listo' : 'Sin plantilla'}
    </div>
  )
}
