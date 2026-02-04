import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
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

const STAGE_WIDTH = 3508
const STAGE_HEIGHT = 2480

export default function CertificatePreview({
  imageUrl,
  texts,
  selectedId,
  onSelect,
  onUpdatePosition,
  stageRef,
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

  return (
    <div className="p-8">
      {/* Controles de zoom */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-slate-800/50 hover:bg-slate-800 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-lg transition-colors"
            title="Alejar (Zoom Out)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 bg-slate-800/50 hover:bg-slate-800 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-lg transition-colors"
            title="Restablecer zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-slate-800/50 hover:bg-slate-800 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-lg transition-colors"
            title="Acercar (Zoom In)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
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
                    onUpdatePosition(textItem.id, e.target.x(), e.target.y())
                  }}
                >
                  {/* Texto */}
                  <Text
                    text={textItem.text}
                    fontSize={textItem.fontSize}
                    fill={textItem.color}
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
  )
}
