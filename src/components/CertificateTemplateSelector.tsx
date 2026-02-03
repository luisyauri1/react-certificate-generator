import { FileImage, Upload } from 'lucide-react'
import { useRef } from 'react'
import type { CertificateTemplateSelectorProps } from '../types/index'

export default function CertificateTemplateSelector({
  onTemplateLoad,
}: CertificateTemplateSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es muy grande. Tamaño máximo: 5MB')
        return
      }

      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Formato no válido. Solo JPG y PNG')
        return
      }

      const reader = new FileReader()
      reader.onload = e => {
        const result = e.target?.result as string
        onTemplateLoad(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-linear-to-r from-white via-orange-50 to-white p-8 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 shadow-lg">
          <FileImage className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="mb-2 text-2xl font-bold text-orange-950">
            Comienza Cargando una Plantilla
          </h3>
          <p className="text-sm text-orange-700">
            Selecciona una imagen para usar como plantilla de certificado
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center gap-3 rounded-lg bg-linear-to-r from-orange-600 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-orange-700 hover:to-orange-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <Upload className="h-5 w-5" />
          <span>Cargar Plantilla</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-orange-600">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
            ℹ
          </span>
          <span>Formatos admitidos: JPG, PNG • Tamaño máximo: 5MB</span>
        </div>
      </div>
    </div>
  )
}
