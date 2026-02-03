import { jsPDF } from 'jspdf'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { useRef, useState } from 'react'
import CertificateForm from '../components/CertificateForm'
import CertificatePreview from '../components/CertificatePreview'
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
    <div className="flex gap-8 p-8 min-h-screen bg-gray-100">
      {/* Panel izquierdo: Controles */}
      <div className="w-[420px] bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
        <h2 className="mt-0 mb-6 text-xl font-semibold">
          Generador de Certificados
        </h2>

        {/* Upload de imagen */}
        <div className="mb-8">
          <label
            htmlFor="image-upload"
            className="block mb-2 font-semibold text-gray-700"
          >
            1. Cargar imagen de fondo
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
          {imageUrl && (
            <p className="mt-2 text-sm text-emerald-600">✓ Imagen cargada</p>
          )}
        </div>

        {/* Formulario de edición */}
        <CertificateForm
          texts={texts}
          selectedId={selectedId}
          onChangeSelected={handleChangeSelected}
          onAddText={handleAddText}
          onDeleteSelected={handleDeleteSelected}
        />

        {/* Botón de exportación */}
        <button
          onClick={handleExportPDF}
          disabled={!imageUrl}
          className={`w-full py-3.5 rounded-md text-base font-semibold mt-8 transition-colors ${
            imageUrl
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
              : 'bg-gray-300 text-white cursor-not-allowed'
          }`}
        >
          📥 Exportar PDF (HD)
        </button>
      </div>

      {/* Panel derecho: Canvas preview */}
      <div className="flex-1">
        <CertificatePreview
          imageUrl={imageUrl}
          texts={texts}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdatePosition={handleUpdatePosition}
          stageRef={stageRef}
        />
      </div>
    </div>
  )
}
