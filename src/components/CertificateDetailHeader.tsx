import { ArrowLeft, ChevronLeft, ChevronRight, Save } from 'lucide-react'
import Button from './Button'

interface CertificateDetailHeaderProps {
  certificateName: string
  isEditing: boolean
  currentIndex: number
  totalCertificates: number
  hasPrevious: boolean
  hasNext: boolean
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNameBlur: () => void
  onSetIsEditing: (value: boolean) => void
  onBack: () => void
  onPrevious: () => void
  onNext: () => void
  onSave: () => void
}

export default function CertificateDetailHeader({
  certificateName,
  isEditing,
  currentIndex,
  totalCertificates,
  hasPrevious,
  hasNext,
  onNameChange,
  onNameBlur,
  onSetIsEditing,
  onBack,
  onPrevious,
  onNext,
  onSave,
}: CertificateDetailHeaderProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border-b border-orange-500/20 px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
      <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-0 shrink-0 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Button>

        {isEditing ? (
          <input
            type="text"
            value={certificateName}
            onChange={onNameChange}
            onBlur={onNameBlur}
            onKeyDown={e => e.key === 'Enter' && onNameBlur()}
            className="flex-1 text-base md:text-lg font-semibold text-white bg-transparent border-b border-orange-500/50 focus:outline-none focus:border-orange-500 px-0 transition-colors"
            autoFocus
          />
        ) : (
          <h1
            onClick={() => onSetIsEditing(true)}
            className="flex-1 text-base md:text-lg font-semibold text-white cursor-pointer hover:text-orange-300 transition-colors truncate"
          >
            {certificateName}
          </h1>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-3 order-2 md:order-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            disabled={!hasPrevious}
            title="Certificado anterior"
            className="p-2 hover:bg-orange-500/20 rounded-lg transition-colors disabled:opacity-50 flex-1 md:flex-none"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <ChevronLeft
                size={18}
                strokeWidth={1.5}
                className="text-orange-400"
              />
              <span className="md:hidden text-sm font-medium text-white">
                Anterior
              </span>
            </div>
          </Button>

          <div className="px-3 py-2 text-xs font-semibold text-orange-300/80 bg-slate-800/40 rounded-lg border border-orange-500/30 text-center md:border-none md:bg-transparent md:px-0 order-1 md:order-2">
            {currentIndex + 1} / {totalCertificates}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            disabled={!hasNext}
            title="Siguiente certificado"
            className="p-2 hover:bg-orange-500/20 rounded-lg transition-colors disabled:opacity-50 flex-1 md:flex-none"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="md:hidden text-sm font-medium text-white">
                Siguiente
              </span>
              <ChevronRight
                size={18}
                strokeWidth={1.5}
                className="text-orange-400"
              />
            </div>
          </Button>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onSave}
          className="w-full md:w-auto order-1 md:order-2"
        >
          <Save size={14} strokeWidth={1.5} />
          Guardar
        </Button>
      </div>
    </div>
  )
}
