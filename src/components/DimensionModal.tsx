import type { DimensionModalProps } from '../types'
import Modal from './Modal'

export default function DimensionModal({
  isOpen,
  onClose,
  imageDimensions,
}: DimensionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="Información de la plantilla"
      onClose={onClose}
    >
      {imageDimensions ? (
        <div className="space-y-4">
          <p className="text-sm text-orange-200/70">
            Revisa los detalles de la imagen cargada y el formato de salida.
          </p>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-orange-500/30">
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
        </div>
      ) : (
        <p className="text-sm text-orange-200/70">
          Aún no hay plantilla cargada.
        </p>
      )}
    </Modal>
  )
}
