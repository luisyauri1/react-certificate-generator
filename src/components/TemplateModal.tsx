import { Image, X } from 'lucide-react'
import { useRef } from 'react'
import {
  applyTemplateToAll,
  setGlobalTemplate,
} from '../store/certificatesSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { TemplateModalProps } from '../types/index'
import Button from './Button'

export default function TemplateModal({ onClose }: TemplateModalProps) {
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const globalTemplate = useAppSelector(
    state => state.certificates.globalTemplate
  )

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        dispatch(setGlobalTemplate(imageUrl))
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

    dispatch(applyTemplateToAll(globalTemplate))
    alert('Plantilla aplicada a todos los certificados')

    // Cerrar el modal después de aplicar
    if (onClose) {
      onClose()
    }
  }

  const handleRemoveTemplate = () => {
    dispatch(setGlobalTemplate(null))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveTemplate}
              className="absolute top-2 right-2 p-1.5! bg-slate-800 rounded-full border border-orange-500/30"
            >
              <X size={16} className="text-orange-400" />
            </Button>
          </div>
        )}

        <label className="block">
          <input
            ref={fileInputRef}
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
        <Button
          variant="primary"
          size="md"
          onClick={handleApplyToAll}
          fullWidth
        >
          Aplicar a todos los certificados
        </Button>
      )}
    </div>
  )
}
