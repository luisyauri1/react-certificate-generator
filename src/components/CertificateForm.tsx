import { useState } from 'react'
import type { CertificateFormProps } from '../types'
import Button from './Button'
import EditLabelModal from './EditLabelModal.tsx'
import Modal from './Modal'

export default function CertificateForm({
  texts,
  selectedId,
  onSelect,
  onChangeSelected,
  onAddText,
  onDeleteSelected,
  hasImage,
}: CertificateFormProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editLabel, setEditLabel] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleOpenEdit = (id: string) => {
    const textToEdit = texts.find(t => t.id === id)
    if (!textToEdit) return
    onSelect(id)
    setEditingId(id)
    setEditLabel(textToEdit.label || '')
    setIsEditModalOpen(true)
  }

  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
  }

  const handleSaveLabel = () => {
    if (!editingId) return
    onChangeSelected({ label: editLabel.trim() })
    setIsEditModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <Button
        variant="primary"
        size="md"
        onClick={onAddText}
        disabled={!hasImage}
        fullWidth
        title={
          !hasImage ? 'Primero carga una plantilla' : 'Agregar nuevo texto'
        }
      >
        + Agregar texto
      </Button>

      {texts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-orange-300/70 uppercase tracking-wide">
            Textos ({texts.length})
          </h4>
          <div className="space-y-1.5">
            {texts.map(text => (
              <div
                key={text.id}
                onClick={() => onSelect(text.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                  selectedId === text.id
                    ? 'border-orange-500/50 bg-orange-500/10'
                    : 'border-orange-500/20 bg-slate-800/30 hover:border-orange-500/40 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white">
                      {text.label || 'Sin etiqueta'}
                    </div>
                    <div className="text-xs text-orange-200/60 truncate">
                      {text.text || 'Texto vacío'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={event => {
                      event.stopPropagation()
                      onSelect(text.id)
                    }}
                    className="p-1.5 rounded hover:bg-orange-500/20 text-orange-400/70 hover:text-orange-400 transition-colors"
                    title="Seleccionar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={event => {
                      event.stopPropagation()
                      handleOpenEdit(text.id)
                    }}
                    className="p-1.5 rounded hover:bg-slate-500/20 text-slate-300/80 hover:text-slate-200 transition-colors"
                    title="Editar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5h-2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2m-6.586-9.414a2 2 0 112.828 2.828L11 12l-3 1 1-3 6.414-6.414z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={event => {
                      event.stopPropagation()
                      onSelect(text.id)
                      onDeleteSelected()
                    }}
                    className="p-1.5 rounded hover:bg-red-500/20 text-red-400/70 hover:text-red-400 transition-colors"
                    title="Eliminar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {texts.length === 0 && (
        <p className="text-sm text-orange-200/60 text-center p-4 bg-slate-800/30 rounded-lg border border-orange-500/20">
          Aún no hay textos. Agrega uno para empezar.
        </p>
      )}

      <Modal
        isOpen={isEditModalOpen}
        title="Editar etiqueta"
        onClose={handleCloseEdit}
      >
        <EditLabelModal
          label={editLabel}
          onChange={setEditLabel}
          onClose={handleCloseEdit}
          onSave={handleSaveLabel}
        />
      </Modal>
    </div>
  )
}
