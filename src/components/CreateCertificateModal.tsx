import { useState } from 'react'
import type { CreateCertificateModalProps } from '../types/index'
import Button from './Button'

export default function CreateCertificateModal({
  onClose,
  onCreate,
  certificateCount,
  hasTemplate,
}: CreateCertificateModalProps) {
  const defaultName = `Certificado ${certificateCount + 1}`
  const [name, setName] = useState(defaultName)

  const handleCreate = () => {
    if (!name.trim()) {
      alert('El nombre no puede estar vacío')
      return
    }
    onCreate(name)
    onClose()
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-orange-200/60 mb-4">
          Se creará un nuevo certificado con los siguientes datos:
        </p>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-orange-500/20 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-orange-300/70 uppercase tracking-wide mb-2">
              Nombre del certificado
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900/50 border border-orange-500/30 rounded-lg text-sm text-white focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-orange-300/70 uppercase tracking-wide">
              Datos generados automáticamente
            </label>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-orange-200/60">Plantilla:</span>
                <span className="text-white font-medium">
                  {hasTemplate ? '✓ Cargada' : '✗ Sin plantilla'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-200/60">Textos:</span>
                <span className="text-white font-medium">0 elementos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-200/60">Creado:</span>
                <span className="text-white font-medium">
                  {new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="md" onClick={onClose} fullWidth>
          Cancelar
        </Button>
        <Button variant="primary" size="md" onClick={handleCreate} fullWidth>
          Crear certificado
        </Button>
      </div>
    </div>
  )
}
