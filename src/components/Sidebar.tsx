import type { TextElement } from '../types'
import CertificateForm from './CertificateForm'
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
  return (
    <div className="w-64 lg:w-72 xl:w-80 bg-slate-900/50 backdrop-blur-sm border-r border-orange-500/20 flex flex-col overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Sección 1: Upload de imagen */}
        <div className="pb-6 border-b border-orange-500/20">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
            Paso 1: Plantilla
          </h3>
          <TemplateUploadButton
            onImageUpload={onImageUpload}
            hasImage={!!imageUrl}
          />

          {/* Mostrar dimensiones de la imagen */}
          {imageDimensions && (
            <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-orange-500/30">
              <div className="text-xs text-orange-300/70 font-semibold uppercase tracking-wide mb-2">
                Dimensiones
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-200/60">Original:</span>
                  <span className="text-xs font-mono text-white">
                    {imageDimensions.width} × {imageDimensions.height}px
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-200/60">Canvas:</span>
                  <span className="text-xs font-mono text-white">
                    3508 × 2480px
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-200/60">Formato:</span>
                  <span className="text-xs font-mono text-white">
                    A4 @ 300 DPI
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sección 2: Formulario de edición */}
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

      {/* Botón de exportación - sticky al fondo */}
      <div className="mt-auto p-6 pt-4 border-t border-orange-500/20 bg-slate-900/50 space-y-3">
        {/* Etiqueta de estado */}
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
    </div>
  )
}
