import type { CertificateFormProps } from '../types'

export default function CertificateForm({
  texts,
  selectedId,
  onChangeSelected,
  onAddText,
  onDeleteSelected,
}: CertificateFormProps) {
  const selectedText = texts.find(t => t.id === selectedId)

  return (
    <div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">
          2. Agregar y editar textos
        </label>
        <button
          onClick={onAddText}
          className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-[15px] font-semibold transition-colors"
        >
          + Agregar texto
        </button>
      </div>

      {/* Editor del texto seleccionado */}
      {selectedText && (
        <div className="p-4 bg-sky-50 rounded-md border-2 border-sky-500">
          <h4 className="mt-0 mb-4 text-[15px] text-sky-900 font-semibold">
            Editando texto seleccionado
          </h4>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Texto
            </label>
            <input
              type="text"
              value={selectedText.text}
              onChange={e => onChangeSelected({ text: e.target.value })}
              className="w-full p-2 border border-sky-200 rounded text-[15px] focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tamaño (px): {selectedText.fontSize}
            </label>
            <input
              type="range"
              min="20"
              max="200"
              value={selectedText.fontSize}
              onChange={e =>
                onChangeSelected({ fontSize: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              value={selectedText.color}
              onChange={e => onChangeSelected({ color: e.target.value })}
              className="w-full h-10 border border-sky-200 rounded cursor-pointer"
            />
          </div>

          <button
            onClick={onDeleteSelected}
            className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-semibold transition-colors"
          >
            🗑️ Eliminar texto
          </button>
        </div>
      )}

      {!selectedText && texts.length > 0 && (
        <p className="text-sm text-slate-600 text-center p-4">
          Haz click en un texto del canvas para editarlo
        </p>
      )}

      {texts.length === 0 && (
        <p className="text-sm text-slate-600 text-center p-4">
          Aún no hay textos. Agrega uno para empezar.
        </p>
      )}
    </div>
  )
}
