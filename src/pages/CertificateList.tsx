import { useState } from 'react'
import { useNavigate } from 'react-router'
import CertificateListContent from '../components/CertificateListContent'
import CertificateListEmptyState from '../components/CertificateListEmptyState'
import CertificateListHeader from '../components/CertificateListHeader'
import ExcelModal from '../components/ExcelModal'
import Modal from '../components/Modal'
import TemplateModal from '../components/TemplateModal'
import { useCertificates } from '../contexts/CertificateContext'
import { useDownloadCertificate } from '../hooks/useDownloadCertificate'
import type { Certificate } from '../types'

export default function CertificateList() {
  const navigate = useNavigate()
  const { certificates, globalTemplate, addCertificate, deleteCertificate } =
    useCertificates()
  const { download: downloadCertificate } = useDownloadCertificate()
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)

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

    navigate(`/grupo/${newCertificate.id}`)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (confirm('¿Estás seguro de eliminar este certificado?')) {
      deleteCertificate(id)
    }
  }

  const handleDownload = async (
    certificate: Certificate,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    await downloadCertificate(certificate)
  }

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/grupo/${id}`)
  }

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
