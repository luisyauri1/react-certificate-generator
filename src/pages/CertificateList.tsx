import { jsPDF } from 'jspdf'
import Konva from 'konva'
import { Download, Edit, FileText, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button'
import ExcelModal from '../components/ExcelModal'
import GlobalActions from '../components/GlobalActions'
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
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-1">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Certificados
              </h1>
              <p className="text-sm md:text-base text-orange-300/60 mt-2">
                {certificates.length}{' '}
                {certificates.length !== 1 ? 'certificados' : 'certificado'}
              </p>
            </div>
            <GlobalActions
              certificates={certificates}
              onTemplateClick={() => setIsTemplateModalOpen(true)}
              onExcelClick={() => setIsExcelModalOpen(true)}
              onNewClick={handleCreateNew}
            />
          </div>
        </div>

        {/* Lista de certificados */}
        {certificates.length === 0 ? (
          <div className="border border-orange-500/20 bg-slate-900/30 backdrop-blur-sm rounded-xl p-12 md:p-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-600/20 rounded-xl flex items-center justify-center">
                <FileText className="w-8 h-8 md:w-10 md:h-10 text-orange-400 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-base md:text-lg text-white mb-2">
                  No hay certificados
                </p>
                <Button variant="ghost" size="sm" onClick={handleCreateNew}>
                  <Plus size={16} />
                  Crear el primero
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {certificates.map(certificate => (
              <div
                key={certificate.id}
                className="group bg-slate-900/50 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/50 hover:bg-slate-900/70 rounded-xl p-4 md:p-5 transition-all"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Preview del certificado */}
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-slate-800/50 rounded-lg flex items-center justify-center overflow-hidden border border-orange-500/10">
                    {certificate.imageUrl ? (
                      <img
                        src={certificate.imageUrl}
                        alt={certificate.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-8 h-8 md:w-10 md:h-10 text-orange-400/50 stroke-[1.5]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <h3 className="text-base md:text-lg font-semibold text-white truncate">
                        {certificate.name}
                      </h3>
                      {/* Etiqueta de estado */}
                      <div
                        className={`flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md text-xs md:text-sm font-medium shrink-0 ${
                          certificate.imageUrl
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            certificate.imageUrl
                              ? 'bg-green-400'
                              : 'bg-orange-400'
                          }`}
                        />
                        {certificate.imageUrl ? 'Listo' : 'Sin plantilla'}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-orange-200/50">
                      <span>{formatDate(certificate.updatedAt)}</span>
                      <span>•</span>
                      <span>
                        {certificate.texts.length}{' '}
                        {certificate.texts.length !== 1 ? 'textos' : 'texto'}
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Botón editar */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => handleEdit(certificate.id, e)}
                      title="Editar certificado"
                    >
                      <Edit size={16} />
                      <span className="hidden lg:inline">Editar</span>
                    </Button>

                    {/* Botón descargar */}
                    {certificate.imageUrl && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={e => handleDownload(certificate, e)}
                        title="Descargar certificado"
                      >
                        <Download size={16} />
                        <span className="hidden lg:inline">Descargar</span>
                      </Button>
                    )}

                    {/* Botón eliminar */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={e => handleDelete(certificate.id, e)}
                      title="Eliminar certificado"
                    >
                      <Trash2 size={16} />
                      <span className="hidden lg:inline">Eliminar</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        title="Cargar Plantilla"
        onClose={() => setIsTemplateModalOpen(false)}
      >
        <TemplateModal />
      </Modal>

      {/* Excel Modal */}
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
