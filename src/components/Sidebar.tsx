import type { TextElement } from '../types'
import CertificateForm from './CertificateForm'
import ExportButton from './ExportButton'
import TemplateUploadButton from './TemplateUploadButton'

interface SidebarProps {
  imageUrl: string | null
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
    <div className="w-64 lg:w-72 xl:w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Sección 1: Upload de imagen */}
        <div className="pb-6 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
            Paso 1: Plantilla
          </h3>
          <TemplateUploadButton
            onImageUpload={onImageUpload}
            hasImage={!!imageUrl}
          />
        </div>

        {/* Sección 2: Formulario de edición */}
        <div className="pb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
            Paso 2: Textos
          </h3>
          <CertificateForm
            texts={texts}
            selectedId={selectedId}
            onSelect={onSelect}
            onChangeSelected={onChangeSelected}
            onAddText={onAddText}
            onDeleteSelected={onDeleteSelected}
          />
        </div>
      </div>

      {/* Botón de exportación - sticky al fondo */}
      <div className="mt-auto p-6 pt-4 border-t border-gray-200 bg-white">
        <ExportButton onExport={onExport} disabled={!imageUrl} />
      </div>
    </div>
  )
}
