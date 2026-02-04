import { Check, Image, Settings, X } from 'lucide-react'
import { useState } from 'react'
import type { Certificate } from '../types'

interface GlobalSettingsProps {
  certificates: Certificate[]
  onUpdate: (certificates: Certificate[]) => void
}

export default function GlobalSettings({
  certificates,
  onUpdate,
}: GlobalSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [globalTemplate, setGlobalTemplate] = useState<string | null>(() => {
    return localStorage.getItem('globalTemplate')
  })

  // Cargar plantilla global
  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        setGlobalTemplate(imageUrl)
        localStorage.setItem('globalTemplate', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  // Aplicar plantilla a todos los certificados
  const handleApplyToAll = () => {
    if (!globalTemplate) {
      alert('Primero carga una plantilla')
      return
    }

    if (
      !confirm(
        '¿Aplicar esta plantilla a todos los certificados? Esto reemplazará las plantillas existentes.'
      )
    ) {
      return
    }

    const updatedCertificates = certificates.map(cert => ({
      ...cert,
      imageUrl: globalTemplate,
      updatedAt: new Date().toISOString(),
    }))

    localStorage.setItem('certificates', JSON.stringify(updatedCertificates))
    onUpdate(updatedCertificates)
    alert('Plantilla aplicada a todos los certificados')
  }

  // Remover plantilla global
  const handleRemoveTemplate = () => {
    setGlobalTemplate(null)
    localStorage.removeItem('globalTemplate')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded hover:border-gray-300"
      >
        <Settings size={16} strokeWidth={1.5} />
        Configuración
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-800">
                Configuración General
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Plantilla común
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Carga una plantilla que se aplicará a todos los certificados
                  nuevos y existentes.
                </p>

                {/* Preview de plantilla actual */}
                {globalTemplate && (
                  <div className="mb-4 relative">
                    <img
                      src={globalTemplate}
                      alt="Plantilla global"
                      className="w-full h-32 object-cover rounded border border-gray-200"
                    />
                    <button
                      onClick={handleRemoveTemplate}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                )}

                {/* Botón cargar plantilla */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTemplateUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors">
                    <Image size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {globalTemplate
                        ? 'Cambiar plantilla'
                        : 'Cargar plantilla'}
                    </span>
                  </div>
                </label>
              </div>

              {/* Botón aplicar a todos */}
              {globalTemplate && (
                <button
                  onClick={handleApplyToAll}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Check size={18} />
                  Aplicar a todos los certificados
                </button>
              )}

              {/* Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  💡 Los nuevos certificados usarán automáticamente esta
                  plantilla.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
