import { Download, Edit, FileText, Trash2 } from 'lucide-react'
import type { CertificateListItemProps } from '../types'
import Button from './Button'

export default function CertificateListItem({
  certificate,
  onEdit,
  onDelete,
  onDownload,
  formatDate,
}: CertificateListItemProps) {
  return (
    <div className="group bg-slate-900/50 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/50 hover:bg-slate-900/70 rounded-xl p-4 md:p-5 transition-all">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-slate-800/50 rounded-lg flex items-center justify-center overflow-hidden border border-orange-500/10">
          {certificate.imageUrl ? (
            <img
              src={certificate.imageUrl}
              alt={certificate.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FileText className="w-8 h-8 md:w-10 md:h-10 text-orange-400/50 stroke-[1.5]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <h3 className="text-base md:text-lg font-semibold text-white truncate">
              {certificate.name}
            </h3>
            <div
              className={`flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md text-xs md:text-sm font-medium shrink-0 ${
                certificate.imageUrl
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-orange-500/20 text-orange-400'
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  certificate.imageUrl ? 'bg-green-400' : 'bg-orange-400'
                }`}
              />
              {certificate.imageUrl ? 'Listo' : 'Sin plantilla'}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-orange-200/50">
            <span>{formatDate(certificate.updatedAt)}</span>
            <span>•</span>
            <span>
              {certificate.texts.length}{' '}
              {certificate.texts.length !== 1 ? 'textos' : 'texto'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={e => onEdit(certificate.id, e)}
            title="Editar certificado"
          >
            <Edit size={16} />
            <span className="hidden lg:inline">Editar</span>
          </Button>

          {certificate.imageUrl && (
            <Button
              variant="success"
              size="sm"
              onClick={e => onDownload(certificate, e)}
              title="Descargar certificado"
            >
              <Download size={16} />
              <span className="hidden lg:inline">Descargar</span>
            </Button>
          )}

          <Button
            variant="danger"
            size="sm"
            onClick={e => onDelete(certificate.id, e)}
            title="Eliminar certificado"
          >
            <Trash2 size={16} />
            <span className="hidden lg:inline">Eliminar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
