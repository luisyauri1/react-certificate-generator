import { jsPDF } from 'jspdf'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { useRef, useState } from 'react'
import CertificatePreview from '../components/CertificatePreview'
import EmptyState from '../components/EmptyState'
import Sidebar from '../components/Sidebar'
import { TEXT_DEFAULTS } from '../constants/textDefaults'
import type { TextElement } from '../types'

export default function CertificateGenerator() {
  // Estado local compartido
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)
  const [texts, setTexts] = useState<TextElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const stageRef = useRef<KonvaStage>(null)

  // Subir imagen desde el PC
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const url = reader.result as string
        setImageUrl(url)

        // Obtener dimensiones originales
        const img = new Image()
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height })
        }
        img.src = url
      }
      reader.readAsDataURL(file)
    }
  }

  // Agregar texto nuevo
  const handleAddText = () => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      text: 'Nuevo texto',
      label: 'Sin etiqueta',
      x: 1750,
      y: 1240,
      fontSize: TEXT_DEFAULTS.fontSize,
      color: TEXT_DEFAULTS.color,
      fontFamily: TEXT_DEFAULTS.fontFamily,
      fontWeight: TEXT_DEFAULTS.fontWeight,
      fontStyle: TEXT_DEFAULTS.fontStyle,
      width: TEXT_DEFAULTS.width,
    }
    setTexts([...texts, newText])
    setSelectedId(newText.id)
  }

  // Actualizar texto seleccionado
  const handleChangeSelected = (updates: Partial<TextElement>) => {
    if (!selectedId) return
    console.log('Actualizando texto con:', updates)
    setTexts(texts.map(t => (t.id === selectedId ? { ...t, ...updates } : t)))
  }

  // Eliminar texto seleccionado
  const handleDeleteSelected = () => {
    if (!selectedId) return
    setTexts(texts.filter(t => t.id !== selectedId))
    setSelectedId(null)
  }

  // Actualizar posición desde canvas (drag)
  const handleUpdatePosition = (id: string, x: number, y: number) => {
    setTexts(texts.map(t => (t.id === id ? { ...t, x, y } : t)))
  }

  // Exportar PDF HD
  const handleExportPDF = () => {
    if (!imageUrl || !stageRef.current) {
      alert('Por favor, carga una imagen primero')
      return
    }

    try {
      // Capturar canvas en alta resolución
      const dataURL = stageRef.current.toDataURL({
        pixelRatio: 4,
      })

      // Crear PDF con dimensiones exactas del stage
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [3508, 2480],
      })

      // Agregar imagen cubriendo toda la página
      pdf.addImage(dataURL, 'PNG', 0, 0, 3508, 2480)
      pdf.save('certificado.pdf')
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      alert('Error al exportar el PDF')
    }
  }

  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar
        imageUrl={imageUrl}
        imageDimensions={imageDimensions}
        texts={texts}
        selectedId={selectedId}
        onImageUpload={handleImageUpload}
        onSelect={setSelectedId}
        onChangeSelected={handleChangeSelected}
        onAddText={handleAddText}
        onDeleteSelected={handleDeleteSelected}
      />

      <div className="flex-1 bg-slate-900 overflow-auto">
        {imageUrl ? (
          <CertificatePreview
            imageUrl={imageUrl}
            texts={texts}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onUpdatePosition={handleUpdatePosition}
            onChangeSelected={handleChangeSelected}
            stageRef={stageRef}
            onExport={handleExportPDF}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
