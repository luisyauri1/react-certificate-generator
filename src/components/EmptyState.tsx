import { FileImage } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-white">
          <FileImage className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Comienza con tu plantilla
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Sube una imagen de fondo en el panel izquierdo para diseñar tu
          certificado
        </p>
      </div>
    </div>
  )
}
