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
  const containerWidth = 700 // ancho máximo del preview
  const scale = containerWidth / STAGE_WIDTH
  const previewHeight = STAGE_HEIGHT * scale

  return (
    <div className="p-8">
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <Stage
          width={containerWidth}
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
