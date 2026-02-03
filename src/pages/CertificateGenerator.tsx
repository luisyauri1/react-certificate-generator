import { jsPDF } from 'jspdf'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { useRef, useState } from 'react'
import CertificatePreview from '../components/CertificatePreview'
import EmptyState from '../components/EmptyState'
import Sidebar from '../components/Sidebar'
import type { TextElement } from '../types'

export default function CertificateGenerator() {
  // Estado local compartido
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [texts, setTexts] = useState<TextElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const stageRef = useRef<KonvaStage>(null)

  // Subir imagen desde el PC
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result as string)
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
      x: 1750, // Centro aprox
      y: 1240,
      fontSize: 60,
      color: '#000000',
    }
    setTexts([...texts, newText])
    setSelectedId(newText.id)
  }

  // Actualizar texto seleccionado
  const handleChangeSelected = (updates: Partial<TextElement>) => {
    if (!selectedId) return
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
      {/* Panel izquierdo: Controles */}
      <Sidebar
        imageUrl={imageUrl}
        texts={texts}
        selectedId={selectedId}
        onImageUpload={handleImageUpload}
        onSelect={setSelectedId}
        onChangeSelected={handleChangeSelected}
        onAddText={handleAddText}
        onDeleteSelected={handleDeleteSelected}
        onExport={handleExportPDF}
      />

      {/* Panel derecho: Canvas preview - centrado */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto">
        {imageUrl ? (
          <CertificatePreview
            imageUrl={imageUrl}
            texts={texts}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onUpdatePosition={handleUpdatePosition}
            stageRef={stageRef}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
