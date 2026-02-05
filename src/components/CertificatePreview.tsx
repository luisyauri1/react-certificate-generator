import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Image as KonvaImage, Layer, Stage, Text } from 'react-konva'
import { TEXT_DEFAULTS } from '../constants/textDefaults'
import type { CertificatePreviewProps } from '../types'
import Button from './Button'
import EditableText from './EditableText'
import ToolBar from './ToolBar'

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
      <ToolBar
        selectedText={selectedText}
        onChangeSelected={onChangeSelected}
        onExport={onExport}
      />

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
                  return (
                    <EditableText
                      key={textItem.id}
                      initialText={textItem.text}
                      x={textItem.x}
                      y={textItem.y}
                      width={textItem.width || TEXT_DEFAULTS.width}
                      fontSize={textItem.fontSize}
                      fill={textItem.color}
                      fontFamily={
                        textItem.fontFamily || TEXT_DEFAULTS.fontFamily
                      }
                      fontStyle={textItem.fontStyle || TEXT_DEFAULTS.fontStyle}
                      fontWeight={
                        textItem.fontWeight || TEXT_DEFAULTS.fontWeight
                      }
                      align={
                        TEXT_DEFAULTS.align as
                          | 'left'
                          | 'center'
                          | 'right'
                          | 'justify'
                      }
                      lineHeight={TEXT_DEFAULTS.lineHeight}
                      onChange={newText =>
                        onChangeSelected({
                          ...textItem,
                          text: newText,
                        })
                      }
                      onPositionChange={(newX, newY) =>
                        onUpdatePosition(textItem.id, newX, newY)
                      }
                    />
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
