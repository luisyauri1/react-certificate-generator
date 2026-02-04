import { jsPDF } from 'jspdf'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { ArrowLeft, ChevronLeft, ChevronRight, Save } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CertificatePreview from '../components/CertificatePreview'
import EmptyState from '../components/EmptyState'
import Sidebar from '../components/Sidebar'
import { useCertificates } from '../contexts/CertificateContext'
import type { Certificate, TextElement } from '../types'

export default function CertificateDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { certificates, updateCertificate } = useCertificates()

  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [texts, setTexts] = useState<TextElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [certificateName, setCertificateName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const stageRef = useRef<KonvaStage>(null)

  // Obtener índice actual y certificados vecinos
  const currentIndex = certificates.findIndex(c => c.id === id)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < certificates.length - 1

  // Cargar certificado del contexto
  useEffect(() => {
    if (!id) {
      navigate('/grupo')
      return
    }

    const found = certificates.find(c => c.id === id)

    if (found) {
      setCertificate(found)
      setImageUrl(found.imageUrl)
      setTexts(found.texts)
      setCertificateName(found.name)
      setSelectedId(null) // Reset selection al cambiar de certificado
    } else {
      alert('Certificado no encontrado')
      navigate('/grupo')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, certificates])

  // Guardar cambios
  const handleSave = () => {
    if (!certificate) return

    updateCertificate(certificate.id, {
      name: certificateName,
      imageUrl,
      texts,
    })
    alert('Certificado guardado correctamente')
  }

  // Auto-guardar cada vez que cambian los datos
  useEffect(() => {
    if (!certificate) return

    const timer = setTimeout(() => {
      updateCertificate(certificate.id, {
        name: certificateName,
        imageUrl,
        texts,
      })
    }, 2000) // Auto-guardar después de 2 segundos de inactividad

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, texts, certificateName])

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
      x: 1750,
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
      const dataURL = stageRef.current.toDataURL({
        pixelRatio: 4,
      })

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [3508, 2480],
      })

      pdf.addImage(dataURL, 'PNG', 0, 0, 3508, 2480)
      pdf.save(`${certificateName}.pdf`)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      alert('Error al exportar el PDF')
    }
  }

  // Editar nombre del certificado
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateName(e.target.value)
  }

  const handleNameBlur = () => {
    setIsEditing(false)
    if (certificateName.trim()) {
      handleSave()
    } else {
      setCertificateName(certificate?.name || 'Sin nombre')
    }
  }

  // Navegar al certificado anterior
  const handlePrevious = () => {
    if (hasPrevious) {
      const previousCertificate = certificates[currentIndex - 1]
      navigate(`/grupo/${previousCertificate.id}`)
    }
  }

  // Navegar al siguiente certificado
  const handleNext = () => {
    if (hasNext) {
      const nextCertificate = certificates[currentIndex + 1]
      navigate(`/grupo/${nextCertificate.id}`)
    }
  }

  if (!certificate) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-orange-300/60 text-lg">Cargando certificado...</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con nombre editable y botones */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-orange-500/20 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/grupo')}
            className="text-orange-400/60 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>

          {isEditing ? (
            <input
              type="text"
              value={certificateName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={e => e.key === 'Enter' && handleNameBlur()}
              className="text-base md:text-lg font-semibold text-white bg-transparent border-b border-orange-500/50 focus:outline-none focus:border-orange-500 px-0"
              autoFocus
            />
          ) : (
            <h1
              onClick={() => setIsEditing(true)}
              className="text-base md:text-lg font-semibold text-white cursor-pointer hover:text-orange-300"
            >
              {certificateName}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Navegación entre certificados */}
          <div className="flex items-center gap-1 border border-orange-500/30 rounded-lg overflow-hidden bg-slate-800/30">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="p-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="Certificado anterior"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <div className="px-3 text-xs text-orange-300/70 border-x border-orange-500/30">
              {currentIndex + 1} / {certificates.length}
            </div>
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="p-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="Siguiente certificado"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-sm text-white bg-orange-600 hover:bg-orange-500 transition-colors px-4 py-2 rounded-lg font-medium"
          >
            <Save size={14} strokeWidth={1.5} />
            Guardar
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
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

        <div className="flex-1 bg-slate-900 flex items-center justify-center overflow-auto">
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
    </div>
  )
}
