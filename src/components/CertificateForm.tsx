import type { CertificateFormProps } from '../types'

export default function CertificateForm({
  texts,
  selectedId,
  onSelect,
  onChangeSelected,
  onAddText,
  onDeleteSelected,
  hasImage,
}: CertificateFormProps) {
  const selectedText = texts.find(t => t.id === selectedId)

  return (
    <div className="space-y-6">
      {/* Botón agregar texto */}
      <button
        onClick={onAddText}
        disabled={!hasImage}
        className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors disabled:bg-slate-800/30 disabled:text-orange-400/40 disabled:cursor-not-allowed disabled:hover:bg-slate-800/30"
        title={
          !hasImage ? 'Primero carga una plantilla' : 'Agregar nuevo texto'
        }
      >
        + Agregar texto
      </button>

      {/* Lista de textos agregados */}
      {texts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-orange-300/70 uppercase tracking-wide">
            Textos ({texts.length})
          </h4>
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {texts.map(text => (
              <button
                key={text.id}
                onClick={() => onSelect(text.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedId === text.id
                    ? 'border-orange-500/50 bg-orange-500/10'
                    : 'border-orange-500/20 bg-slate-800/30 hover:border-orange-500/40 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: text.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white">
                      {text.label || 'Sin etiqueta'}
                    </div>
                    <div className="text-xs text-orange-200/60 truncate">
                      {text.text || 'Texto vacío'}
                    </div>
                  </div>
                  {selectedId === text.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editor del texto seleccionado */}
      {selectedText && (
        <div className="p-4 bg-slate-800/50 rounded-lg border border-orange-500/30">
          <h4 className="text-xs font-semibold text-orange-300/70 uppercase tracking-wide mb-4">
            Editor
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-white">
                Etiqueta
              </label>
              <input
                type="text"
                value={selectedText.label || ''}
                onChange={e => onChangeSelected({ label: e.target.value })}
                placeholder="Ej: Nombre, Fecha, Curso..."
                className="w-full p-2.5 bg-slate-900/50 border border-orange-500/30 rounded-lg text-sm text-white placeholder:text-orange-200/40 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-white">
                Texto
              </label>
              <input
                type="text"
                value={selectedText.text}
                onChange={e => onChangeSelected({ text: e.target.value })}
                className="w-full p-2.5 bg-slate-900/50 border border-orange-500/30 rounded-lg text-sm text-white focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-white">
                Tamaño: {selectedText.fontSize}px
              </label>
              <input
                type="range"
                min="20"
                max="200"
                value={selectedText.fontSize}
                onChange={e =>
                  onChangeSelected({ fontSize: Number(e.target.value) })
                }
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-white">
                Color
              </label>
              <input
                type="color"
                value={selectedText.color}
                onChange={e => onChangeSelected({ color: e.target.value })}
                className="w-full h-10 bg-slate-900/50 border border-orange-500/30 rounded-lg cursor-pointer"
              />
            </div>

            <button
              onClick={onDeleteSelected}
              className="w-full py-2.5 bg-slate-800/50 hover:bg-red-500/20 border border-orange-500/30 hover:border-red-500/50 text-orange-200 hover:text-red-400 rounded-lg text-sm font-semibold transition-colors"
            >
              Eliminar texto
            </button>
          </div>
        </div>
      )}

      {texts.length === 0 && (
        <p className="text-sm text-orange-200/60 text-center p-4 bg-slate-800/30 rounded-lg border border-orange-500/20">
          Aún no hay textos. Agrega uno para empezar.
        </p>
      )}
    </div>
  )
}
