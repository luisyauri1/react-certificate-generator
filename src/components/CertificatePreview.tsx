import { useEffect, useState } from 'react'
import { Image as KonvaImage, Layer, Stage, Text } from 'react-konva'
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="mt-0 mb-4 text-xl font-semibold">
        Vista previa del certificado
      </h3>

      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Stage
          width={containerWidth}
          height={previewHeight}
          scaleX={scale}
          scaleY={scale}
          ref={stageRef}
          onMouseDown={e => {
            // Deseleccionar si se hace click en el fondo
            const clickedOnEmpty = e.target === e.target.getStage()
            if (clickedOnEmpty) {
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
            {texts.map(textItem => (
              <Text
                key={textItem.id}
                text={textItem.text}
                x={textItem.x}
                y={textItem.y}
                fontSize={textItem.fontSize}
                fill={textItem.color}
                draggable
                onClick={() => onSelect(textItem.id)}
                onTap={() => onSelect(textItem.id)}
                onDragEnd={e => {
                  onUpdatePosition(textItem.id, e.target.x(), e.target.y())
                }}
                // Estilo visual para el seleccionado
                stroke={selectedId === textItem.id ? '#0ea5e9' : undefined}
                strokeWidth={selectedId === textItem.id ? 3 : 0}
                shadowColor={selectedId === textItem.id ? '#0ea5e9' : undefined}
                shadowBlur={selectedId === textItem.id ? 10 : 0}
                shadowOpacity={selectedId === textItem.id ? 0.5 : 0}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center">
        💡 Arrastra los textos para posicionarlos. Click para seleccionar y
        editar.
      </p>
    </div>
  )
}
