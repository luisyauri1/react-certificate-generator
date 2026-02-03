import { jsPDF } from 'jspdf'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { useRef, useState } from 'react'
import CertificateForm from '../components/CertificateForm'
import CertificatePreview from '../components/CertificatePreview'
import TemplateUploadButton from '../components/TemplateUploadButton'
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
    <div className="h-full flex overflow-hidden">
      {/* Panel izquierdo: Controles - fijo */}
      <div className="w-[360px] bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Sección 1: Upload de imagen */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Paso 1: Plantilla
            </h3>
            <TemplateUploadButton
              onImageUpload={handleImageUpload}
              hasImage={!!imageUrl}
            />
          </div>

          {/* Sección 2: Formulario de edición */}
          <div className="pb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Paso 2: Textos
            </h3>
            <CertificateForm
              texts={texts}
              selectedId={selectedId}
              onChangeSelected={handleChangeSelected}
              onAddText={handleAddText}
              onDeleteSelected={handleDeleteSelected}
            />
          </div>
        </div>

        {/* Botón de exportación - sticky al fondo */}
        <div className="mt-auto p-6 pt-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleExportPDF}
            disabled={!imageUrl}
            className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
              imageUrl
                ? 'bg-gray-900 hover:bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            {imageUrl ? 'Exportar certificado' : 'Carga una plantilla primero'}
          </button>
        </div>
      </div>

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
          <div className="text-center px-8 max-w-md">
            <div className="bg-white rounded-2xl p-12 shadow-lg border-2 border-dashed border-gray-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Comienza con tu plantilla
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Sube una imagen de fondo en el panel izquierdo para empezar a
                diseñar tu certificado
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
