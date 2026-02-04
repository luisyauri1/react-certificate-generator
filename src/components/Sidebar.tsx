import { useState } from 'react'
import type { TextElement } from '../types'
import CertificateForm from './CertificateForm'
import DimensionModal from './DimensionModal'
import ExportButton from './ExportButton'
import TemplateUploadButton from './TemplateUploadButton'

interface SidebarProps {
  imageUrl: string | null
  imageDimensions: { width: number; height: number } | null
  texts: TextElement[]
  selectedId: string | null
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelect: (id: string | null) => void
  onChangeSelected: (updates: Partial<TextElement>) => void
  onAddText: () => void
  onDeleteSelected: () => void
  onExport: () => void
}

export default function Sidebar({
  imageUrl,
  imageDimensions,
  texts,
  selectedId,
  onImageUpload,
  onSelect,
  onChangeSelected,
  onAddText,
  onDeleteSelected,
  onExport,
}: SidebarProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <div className="w-full md:w-full lg:w-72 xl:w-80 h-full min-h-full lg:h-auto bg-slate-900/50 backdrop-blur-sm border-r border-orange-500/20 flex flex-col overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="pb-6 border-b border-orange-500/20">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
            Paso 1: Plantilla
          </h3>
          <TemplateUploadButton
            onImageUpload={onImageUpload}
            hasImage={!!imageUrl}
          />

          {imageDimensions && (
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              className="mt-3 text-xs text-orange-300/80 hover:text-orange-200 underline underline-offset-4"
            >
              Ver más información
            </button>
          )}
        </div>

        <div className="pb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
            Paso 2: Textos
          </h3>
          <CertificateForm
            texts={texts}
            selectedId={selectedId}
            onSelect={onSelect}
            onChangeSelected={onChangeSelected}
            onAddText={onAddText}
            onDeleteSelected={onDeleteSelected}
            hasImage={!!imageUrl}
          />
        </div>
      </div>

      <div className="mt-auto p-6 pt-4 border-t border-orange-500/20 bg-slate-900/50 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              imageUrl ? 'bg-green-500' : 'bg-orange-400/50'
            }`}
          />
          <span
            className={`text-xs ${
              imageUrl ? 'text-green-400' : 'text-orange-400/60'
            }`}
          >
            {imageUrl ? 'Listo para exportar' : 'Sin plantilla'}
          </span>
        </div>
        <ExportButton onExport={onExport} disabled={!imageUrl} />
      </div>

      <DimensionModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        imageDimensions={imageDimensions}
      />
    </div>
  )
}
