import type { CertificateFormProps } from '../types'

export default function CertificateForm({
  texts,
  selectedId,
  onSelect,
  onChangeSelected,
  onAddText,
  onDeleteSelected,
}: CertificateFormProps) {
  const selectedText = texts.find(t => t.id === selectedId)

  return (
    <div className="space-y-6">
      {/* Botón agregar texto */}
      <button
        onClick={onAddText}
        className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors"
      >
        + Agregar texto
      </button>

      {/* Lista de textos agregados */}
      {texts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Textos ({texts.length})
          </h4>
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {texts.map(text => (
              <button
                key={text.id}
                onClick={() => onSelect(text.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedId === text.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: text.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-900">
                      {text.label || 'Sin etiqueta'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {text.text || 'Texto vacío'}
                    </div>
                  </div>
                  {selectedId === text.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editor del texto seleccionado */}
      {selectedText && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Editor
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Etiqueta
              </label>
              <input
                type="text"
                value={selectedText.label || ''}
                onChange={e => onChangeSelected({ label: e.target.value })}
                placeholder="Ej: Nombre, Fecha, Curso..."
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Texto
              </label>
              <input
                type="text"
                value={selectedText.text}
                onChange={e => onChangeSelected({ text: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
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
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="color"
                value={selectedText.color}
                onChange={e => onChangeSelected({ color: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>

            <button
              onClick={onDeleteSelected}
              className="w-full py-2.5 bg-white hover:bg-gray-50 border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 rounded-lg text-sm font-semibold transition-colors"
            >
              Eliminar texto
            </button>
          </div>
        </div>
      )}

      {texts.length === 0 && (
        <p className="text-sm text-gray-500 text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          Aún no hay textos. Agrega uno para empezar.
        </p>
      )}
    </div>
  )
}
