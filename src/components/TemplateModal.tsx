import { Image, X } from 'lucide-react'
import { useCertificates } from '../contexts/CertificateContext'

export default function TemplateModal() {
  const { globalTemplate, setGlobalTemplate, applyTemplateToAll } =
    useCertificates()

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        setGlobalTemplate(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

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

    applyTemplateToAll(globalTemplate)
    alert('Plantilla aplicada a todos los certificados')
  }

  const handleRemoveTemplate = () => {
    setGlobalTemplate(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-orange-200/60 mb-4">
          Carga una plantilla que se aplicará a todos los certificados nuevos y
          existentes.
        </p>

        {globalTemplate && (
          <div className="mb-4 relative">
            <img
              src={globalTemplate}
              alt="Plantilla global"
              className="w-full h-32 object-cover rounded-lg border border-orange-500/30"
            />
            <button
              onClick={handleRemoveTemplate}
              className="absolute top-2 right-2 bg-slate-800 rounded-full p-1.5 hover:bg-slate-700 border border-orange-500/30 cursor-pointer transition-colors"
            >
              <X size={16} className="text-orange-400" />
            </button>
          </div>
        )}

        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleTemplateUpload}
            className="hidden"
          />
          <div className="flex items-center justify-center gap-2 border-2 border-dashed border-orange-500/30 rounded-lg p-4 cursor-pointer hover:border-orange-500/50 hover:bg-slate-800/50 transition-colors">
            <Image size={20} className="text-orange-400" />
            <span className="text-sm text-white font-medium">
              {globalTemplate ? 'Cambiar plantilla' : 'Cargar plantilla'}
            </span>
          </div>
        </label>
      </div>

      {globalTemplate && (
        <button
          onClick={handleApplyToAll}
          className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-500 transition-colors font-medium cursor-pointer"
        >
          Aplicar a todos los certificados
        </button>
      )}
    </div>
  )
}
