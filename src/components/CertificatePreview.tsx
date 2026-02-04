import {
  Bold,
  Download,
  Italic,
  Palette,
  RotateCcw,
  Type,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Group,
  Image as KonvaImage,
  Layer,
  Rect,
  Stage,
  Text,
} from 'react-konva'
import type { CertificatePreviewProps } from '../types'
import Button from './Button'

const STAGE_WIDTH = 3508
const STAGE_HEIGHT = 2480

export default function CertificatePreview({
  imageUrl,
  texts,
  selectedId,
  onSelect,
  onUpdatePosition,
  onChangeSelected,
  stageRef,
  onExport,
}: CertificatePreviewProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [zoom, setZoom] = useState(1)

  // Cargar imagen de fondo
  useEffect(() => {
    if (!imageUrl) {
      return
    }

    const img = new window.Image()
    img.onload = () => setImage(img)
    img.src = imageUrl

    return () => {
      setImage(null)
    }
  }, [imageUrl])

  // Escala para preview (mantener aspecto ratio)
  const containerWidth = 700 // ancho base del preview
  const baseScale = containerWidth / STAGE_WIDTH
  const scale = baseScale * zoom

  // Dimensiones dinámicas según el zoom
  const previewWidth = containerWidth * zoom
  const previewHeight = STAGE_HEIGHT * baseScale * zoom

  // Manejar zoom con scroll del mouse
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()

    const scaleBy = 1.05
    const oldZoom = zoom

    // Zoom in/out
    const newZoom = e.deltaY < 0 ? oldZoom * scaleBy : oldZoom / scaleBy

    // Limitar zoom entre 0.3x y 5x
    const limitedZoom = Math.max(0.3, Math.min(5, newZoom))

    setZoom(limitedZoom)
  }

  // Funciones para botones de zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(5, prev * 1.2))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.3, prev / 1.2))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  const selectedText = texts.find(t => t.id === selectedId)

  return (
    <div className="h-full w-full flex flex-col">
      {/* Barra de herramientas superior */}
      <div className="w-full bg-gradient-to-r from-orange-600/20 via-orange-500/15 to-orange-600/20 border-b border-orange-500/30 px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {selectedText ? (
            <div className="flex items-center gap-4 flex-wrap flex-1">
              {/* Selector de fuente */}
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-orange-400" />
                <select
                  value={selectedText.fontFamily || 'Roboto'}
                  onChange={e =>
                    onChangeSelected({ fontFamily: e.target.value })
                  }
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
                  type="number"
                  value={selectedText.fontSize}
                  onChange={e =>
                    onChangeSelected({ fontSize: Number(e.target.value) })
                  }
                  min="20"
                  max="200"
                  className="w-16 px-2 py-1 bg-slate-900/50 border border-orange-500/30 rounded text-xs text-white focus:border-orange-500/50 focus:outline-none"
                />
                <span className="text-xs text-orange-200/60">px</span>
              </div>

              {/* Negrita */}
              <button
                onClick={() =>
                  onChangeSelected({
                    fontWeight:
                      selectedText.fontWeight === 'bold' ? 'normal' : 'bold',
                  })
                }
                className={`p-1.5 rounded transition-colors ${
                  selectedText.fontWeight === 'bold'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-900/50 border border-orange-500/30 text-white hover:border-orange-500/50'
                }`}
                title="Negrita"
              >
                <Bold className="w-4 h-4" />
              </button>

              {/* Cursiva */}
              <button
                onClick={() =>
                  onChangeSelected({
                    fontStyle:
                      selectedText.fontStyle === 'italic' ? 'normal' : 'italic',
                  })
                }
                className={`p-1.5 rounded transition-colors ${
                  selectedText.fontStyle === 'italic'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-900/50 border border-orange-500/30 text-white hover:border-orange-500/50'
                }`}
                title="Cursiva"
              >
                <Italic className="w-4 h-4" />
              </button>

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

              {/* Input de texto */}
              <input
                type="text"
                value={selectedText.text}
                onChange={e => onChangeSelected({ text: e.target.value })}
                className="flex-1 min-w-50 px-3 py-1 bg-slate-900/50 border border-orange-500/30 rounded text-sm text-white focus:border-orange-500/50 focus:outline-none"
                placeholder="Texto..."
              />
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

      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div>
          {/* Controles de zoom */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomOut}
                className="p-2!"
                title="Alejar (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetZoom}
                className="p-2!"
                title="Restablecer zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomIn}
                className="p-2!"
                title="Acercar (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-1.5 bg-slate-800/50 border border-orange-500/30 text-white text-sm font-mono rounded-lg">
              {Math.round(zoom * 100)}%
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden inline-block"
            onWheel={handleWheel}
            style={{
              cursor: 'grab',
            }}
          >
            <Stage
              width={previewWidth}
              height={previewHeight}
              scaleX={scale}
              scaleY={scale}
              ref={stageRef}
              onMouseDown={e => {
                // Deseleccionar si se hace click en el fondo o en la imagen
                const clickedOnEmpty = e.target === e.target.getStage()
                const clickedOnImage = e.target.getClassName() === 'Image'
                if (clickedOnEmpty || clickedOnImage) {
                  onSelect(null)
                }
              }}
            >
              <Layer>
                {/* Imagen de fondo */}
                {image && (
                  <KonvaImage
                    image={image}
                    width={STAGE_WIDTH}
                    height={STAGE_HEIGHT}
                  />
                )}

                {/* Placeholder si no hay imagen */}
                {!image && (
                  <Text
                    text="Carga una imagen de fondo para comenzar"
                    x={STAGE_WIDTH / 2}
                    y={STAGE_HEIGHT / 2}
                    fontSize={60}
                    fill="#9ca3af"
                    align="center"
                    verticalAlign="middle"
                    offsetX={600}
                    offsetY={30}
                  />
                )}

                {/* Textos editables */}
                {texts.map(textItem => {
                  const isSelected = selectedId === textItem.id

                  return (
                    <Group
                      key={textItem.id}
                      x={textItem.x}
                      y={textItem.y}
                      draggable
                      onClick={() => onSelect(textItem.id)}
                      onTap={() => onSelect(textItem.id)}
                      onDragEnd={e => {
                        onUpdatePosition(
                          textItem.id,
                          e.target.x(),
                          e.target.y()
                        )
                      }}
                    >
                      {/* Texto */}
                      <Text
                        text={textItem.text}
                        fontSize={textItem.fontSize}
                        fill={textItem.color}
                        fontFamily={textItem.fontFamily || 'Roboto'}
                        fontStyle={`${textItem.fontStyle || 'normal'}${textItem.fontWeight === 'bold' ? ' bold' : ''}`}
                        ref={node => {
                          if (node && isSelected) {
                            // Obtener dimensiones reales del texto
                            const width = node.width()
                            const height = node.height()
                            const padding = 6

                            // Crear contorno con dimensiones exactas
                            const rect = node
                              .getLayer()
                              ?.findOne(`.selection-${textItem.id}`)
                            if (rect) {
                              rect.position({ x: -padding, y: -padding })
                              rect.width(width + padding * 2)
                              rect.height(height + padding * 2)
                            }
                          }
                        }}
                      />

                      {/* Contorno cuadrado elegante cuando está seleccionado */}
                      {isSelected && (
                        <Rect
                          name={`selection-${textItem.id}`}
                          x={0}
                          y={0}
                          width={100}
                          height={50}
                          stroke="#3b82f6"
                          strokeWidth={2}
                          cornerRadius={4}
                          dash={[10, 5]}
                          shadowColor="#3b82f6"
                          shadowBlur={12}
                          shadowOpacity={0.25}
                          shadowOffsetX={0}
                          shadowOffsetY={2}
                          listening={false}
                        />
                      )}
                    </Group>
                  )
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  )
}
