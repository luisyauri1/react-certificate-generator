import { FileText, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import BulkExportButton from '../components/BulkExportButton'
import GlobalSettings from '../components/GlobalSettings'
import type { Certificate } from '../types'

export default function CertificateList() {
  const navigate = useNavigate()
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    // Cargar certificados del localStorage
    const stored = localStorage.getItem('certificates')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Error al cargar certificados:', error)
      }
    }
    return []
  })

  // Crear nuevo certificado
  const handleCreateNew = () => {
    // Obtener plantilla global si existe
    const globalTemplate = localStorage.getItem('globalTemplate')

    const newCertificate: Certificate = {
      id: `cert-${Date.now()}`,
      name: `Certificado ${certificates.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: globalTemplate || null,
      texts: [],
    }

    const updatedCertificates = [...certificates, newCertificate]
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates))
    setCertificates(updatedCertificates)

    // Navegar al editor del nuevo certificado
    navigate(`/grupo/${newCertificate.id}`)
  }

  // Eliminar certificado
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (confirm('¿Estás seguro de eliminar este certificado?')) {
      const updatedCertificates = certificates.filter(c => c.id !== id)
      localStorage.setItem('certificates', JSON.stringify(updatedCertificates))
      setCertificates(updatedCertificates)
    }
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
    <div className="h-full flex flex-col bg-white p-12">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-light text-gray-800 tracking-tight">
                Certificados
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                {certificates.length}{' '}
                {certificates.length !== 1 ? 'certificados' : 'certificado'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <GlobalSettings
                certificates={certificates}
                onUpdate={setCertificates}
              />
              <BulkExportButton certificates={certificates} />
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded hover:border-gray-300"
              >
                <Plus size={16} />
                Nuevo
              </button>
            </div>
          </div>
        </div>

        {/* Lista de certificados */}
        {certificates.length === 0 ? (
          <div className="border border-gray-100 rounded p-16 text-center">
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-10 h-10 text-gray-300 stroke-[1.5]" />
              <div>
                <p className="text-sm text-gray-400">No hay certificados</p>
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors mt-3"
                >
                  <Plus size={14} />
                  Crear primero
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map(certificate => (
              <div
                key={certificate.id}
                onClick={() => navigate(`/grupo/${certificate.id}`)}
                className="group border border-gray-100 hover:border-gray-200 rounded p-4 transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-3">
                  {/* Preview del certificado */}
                  <div className="w-full aspect-video bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                    {certificate.imageUrl ? (
                      <img
                        src={certificate.imageUrl}
                        alt={certificate.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-8 h-8 text-gray-200 stroke-[1.5]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-normal text-gray-800 truncate">
                        {certificate.name}
                      </h3>
                      {/* Etiqueta de estado */}
                      <div
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${
                          certificate.imageUrl
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            certificate.imageUrl
                              ? 'bg-green-500'
                              : 'bg-gray-400'
                          }`}
                        />
                        {certificate.imageUrl ? 'Listo' : 'Sin plantilla'}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatDate(certificate.updatedAt)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {certificate.texts.length}{' '}
                      {certificate.texts.length !== 1 ? 'textos' : 'texto'}
                    </p>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={e => handleDelete(certificate.id, e)}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
