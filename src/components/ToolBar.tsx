import { Download, Palette, Type } from 'lucide-react'
import { TEXT_DEFAULTS } from '../constants/textDefaults'
import type { TextElement } from '../types'
import Button from './Button'

interface ToolBarProps {
  selectedText: TextElement | undefined
  onChangeSelected: (updates: Partial<TextElement>) => void
  onExport: () => void
}

export default function ToolBar({
  selectedText,
  onChangeSelected,
  onExport,
}: ToolBarProps) {
  return (
    <div className="w-full border-b border-orange-500/20 px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {selectedText ? (
          <div className="flex items-center gap-4 flex-wrap flex-1">
            {/* Selector de fuente */}
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-orange-400" />
              <select
                value={selectedText.fontFamily || TEXT_DEFAULTS.fontFamily}
                onChange={e => {
                  onChangeSelected({ fontFamily: e.target.value })
                }}
                className="px-2 py-1 bg-slate-900/50 border border-orange-500/30 rounded text-xs text-white focus:border-orange-500/50 focus:outline-none"
              >
                <option value="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Playfair Display">Playfair</option>
              </select>
            </div>

            {/* Tamaño */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                value={selectedText.fontSize}
                onChange={e =>
                  onChangeSelected({ fontSize: Number(e.target.value) })
                }
                min="20"
                max="200"
                className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-xs text-orange-200/90 font-mono min-w-12">
                {selectedText.fontSize}px
              </span>
            </div>

            {/* Color */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-orange-400" />
              <input
                type="color"
                value={selectedText.color}
                onChange={e => onChangeSelected({ color: e.target.value })}
                className="w-8 h-8 bg-slate-900/50 border border-orange-500/30 rounded cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-orange-200/90 font-medium flex-1 text-center">
            ✨ Bienvenido al generador de certificados
          </p>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={onExport}
          className="gap-2!"
        >
          <Download className="w-4 h-4" />
          Descargar PDF
        </Button>
      </div>
    </div>
  )
}
