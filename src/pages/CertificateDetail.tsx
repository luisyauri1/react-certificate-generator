import { jsPDF } from 'jspdf'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CertificateDetailHeader from '../components/CertificateDetailHeader'
import CertificatePreview from '../components/CertificatePreview'
import EmptyState from '../components/EmptyState'
import Sidebar from '../components/Sidebar'
import { updateCertificate } from '../store/certificatesSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Certificate, TextElement } from '../types'

export default function CertificateDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const certificates = useAppSelector(state => state.certificates.certificates)

  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)
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

    dispatch(
      updateCertificate({
        id: certificate.id,
        updates: {
          name: certificateName,
          imageUrl,
          texts,
        },
      })
    )
    alert('Certificado guardado correctamente')
  }

  // Auto-guardar cada vez que cambian los datos
  useEffect(() => {
    if (!certificate) return

    const timer = setTimeout(() => {
      dispatch(
        updateCertificate({
          id: certificate.id,
          updates: {
            name: certificateName,
            imageUrl,
            texts,
          },
        })
      )
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
      fontSize: 60,
      color: '#000000',
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      fontStyle: 'normal',
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
      <CertificateDetailHeader
        certificateName={certificateName}
        isEditing={isEditing}
        currentIndex={currentIndex}
        totalCertificates={certificates.length}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onNameChange={handleNameChange}
        onNameBlur={handleNameBlur}
        onSetIsEditing={setIsEditing}
        onBack={() => navigate('/grupo')}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSave={handleSave}
      />

      <div className="flex-1 flex overflow-hidden">
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

        <div className="flex-1 bg-slate-900 flex items-center justify-center overflow-auto">
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
    </div>
  )
}
