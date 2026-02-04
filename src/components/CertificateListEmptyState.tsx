import { FileText, Plus } from 'lucide-react'
import type { CertificateListEmptyStateProps } from '../types'
import Button from './Button'

export default function CertificateListEmptyState({
  onCreateClick,
}: CertificateListEmptyStateProps) {
  return (
    <div className="border border-orange-500/20 bg-slate-900/30 backdrop-blur-sm rounded-xl p-12 md:p-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-600/20 rounded-xl flex items-center justify-center">
          <FileText className="w-8 h-8 md:w-10 md:h-10 text-orange-400 stroke-[1.5]" />
        </div>
        <div>
          <p className="text-base md:text-lg text-white mb-2">
            No hay certificados
          </p>
          <Button variant="ghost" size="sm" onClick={onCreateClick}>
            <Plus size={16} />
            Crear el primero
          </Button>
        </div>
      </div>
    </div>
  )
}
