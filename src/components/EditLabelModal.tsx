import type { EditLabelModalProps } from '../types'
import Button from './Button'

export default function EditLabelModal({
  label,
  onChange,
  onClose,
  onSave,
}: EditLabelModalProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-orange-300/70 uppercase tracking-wide mb-2">
          Nombre de la etiqueta
        </label>
        <input
          type="text"
          value={label}
          onChange={e => onChange(e.target.value)}
          placeholder="Ej: Nombre, Fecha, Curso..."
          className="w-full px-3 py-2.5 bg-slate-900/50 border border-orange-500/30 rounded-lg text-sm text-white placeholder:text-orange-200/40 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
          autoFocus
        />
        <p className="text-xs text-orange-200/60 mt-2">
          Este nombre se usa para identificar el texto en la lista.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="md" onClick={onClose} fullWidth>
          Cancelar
        </Button>
        <Button variant="primary" size="md" onClick={onSave} fullWidth>
          Guardar
        </Button>
      </div>
    </div>
  )
}
