import { jsPDF } from 'jspdf'
import Konva from 'konva'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import CertificateListContent from '../components/CertificateListContent'
import CertificateListEmptyState from '../components/CertificateListEmptyState'
import CertificateListHeader from '../components/CertificateListHeader'
import ExcelModal from '../components/ExcelModal'
import Modal from '../components/Modal'
import TemplateModal from '../components/TemplateModal'
import { useCertificates } from '../contexts/CertificateContext'
import type { Certificate } from '../types'

export default function CertificateList() {
  const navigate = useNavigate()
  const { certificates, globalTemplate, addCertificate, deleteCertificate } =
    useCertificates()
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)

  // Crear nuevo certificado
  const handleCreateNew = () => {
    const newCertificate: Certificate = {
      id: `cert-${Date.now()}`,
      name: `Certificado ${certificates.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: globalTemplate || null,
      texts: [],
    }

    addCertificate(newCertificate)

    // Navegar al editor del nuevo certificado
    navigate(`/grupo/${newCertificate.id}`)
  }

  // Eliminar certificado
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (confirm('¿Estás seguro de eliminar este certificado?')) {
      deleteCertificate(id)
    }
  }

  // Descargar certificado individual
  const handleDownload = async (
    certificate: Certificate,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()

    if (!certificate.imageUrl) {
      alert('Este certificado no tiene plantilla')
      return
    }

    try {
      // Crear canvas temporal con Konva
      const stage = new Konva.Stage({
        container: document.createElement('div'),
        width: 3508,
        height: 2480,
      })

      const layer = new Konva.Layer()
      stage.add(layer)

      // Cargar imagen de fondo
      const imageObj = document.createElement('img')
      imageObj.crossOrigin = 'Anonymous'

      await new Promise<void>((resolve, reject) => {
        imageObj.onload = () => resolve()
        imageObj.onerror = () => reject(new Error('Error al cargar imagen'))
        imageObj.src = certificate.imageUrl!
      })

      const bgImage = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj as HTMLImageElement,
        width: 3508,
        height: 2480,
      })
      layer.add(bgImage)

      // Agregar textos
      certificate.texts.forEach(textElement => {
        const text = new Konva.Text({
          x: textElement.x,
          y: textElement.y,
          text: textElement.text,
          fontSize: textElement.fontSize,
          fill: textElement.color,
          align: 'center',
          offsetX: 0,
        })
        layer.add(text)
      })

      layer.draw()

      // Generar PDF
      const dataURL = stage.toDataURL({
        pixelRatio: 1.5, // Reducido para menor tamaño
        mimeType: 'image/jpeg',
        quality: 0.85, // Compresión JPEG
      })

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [3508, 2480],
      })

      pdf.addImage(dataURL, 'JPEG', 0, 0, 3508, 2480)
      pdf.save(`${certificate.name}.pdf`)

      stage.destroy()
    } catch (error) {
      console.error('Error al descargar certificado:', error)
      alert('Error al descargar el certificado')
    }
  }

  // Navegar a editar
  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/grupo/${id}`)
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="h-full flex flex-col p-6 md:p-12 overflow-auto">
      <div className="max-w-6xl w-full mx-auto">
        <CertificateListHeader
          certificateCount={certificates.length}
          onTemplateClick={() => setIsTemplateModalOpen(true)}
          onExcelClick={() => setIsExcelModalOpen(true)}
          onNewClick={handleCreateNew}
          certificates={certificates}
        />

        {certificates.length === 0 ? (
          <CertificateListEmptyState onCreateClick={handleCreateNew} />
        ) : (
          <CertificateListContent
            certificates={certificates}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            formatDate={formatDate}
          />
        )}
      </div>

      <Modal
        isOpen={isTemplateModalOpen}
        title="Cargar Plantilla"
        onClose={() => setIsTemplateModalOpen(false)}
      >
        <TemplateModal />
      </Modal>

      <Modal
        isOpen={isExcelModalOpen}
        title="Importar desde Excel"
        onClose={() => setIsExcelModalOpen(false)}
      >
        <ExcelModal onClose={() => setIsExcelModalOpen(false)} />
      </Modal>
    </div>
  )
}
