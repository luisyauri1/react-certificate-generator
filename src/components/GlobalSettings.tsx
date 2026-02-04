import { Check, FileSpreadsheet, Image, Settings, X } from 'lucide-react'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { useCertificates } from '../contexts/CertificateContext'
import type { Certificate, TextElement } from '../types'

export default function GlobalSettings() {
  const {
    globalTemplate,
    setGlobalTemplate,
    applyTemplateToAll,
    addMultipleCertificates,
  } = useCertificates()
  const [isOpen, setIsOpen] = useState(false)

  // Cargar plantilla global
  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        setGlobalTemplate(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  // Aplicar plantilla a todos los certificados
  const handleApplyToAll = () => {
    if (!globalTemplate) {
      alert('Primero carga una plantilla')
      return
    }

    if (
      !confirm(
        '¿Aplicar esta plantilla a todos los certificados? Esto reemplazará las plantillas existentes.'
      )
    ) {
      return
    }

    applyTemplateToAll(globalTemplate)
    alert('Plantilla aplicada a todos los certificados')
  }

  // Remover plantilla global
  const handleRemoveTemplate = () => {
    setGlobalTemplate(null)
  }

  // Cargar Excel y generar certificados
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      })

      if (jsonData.length < 2) {
        alert(
          'El archivo Excel debe tener al menos una fila de encabezados y una fila de datos'
        )
        return
      }

      // Primera fila son las etiquetas
      const labels = (jsonData[0] as unknown[]).filter(
        label => label && String(label).trim()
      )

      if (labels.length === 0) {
        alert('El archivo Excel debe tener columnas con etiquetas')
        return
      }

      // Crear certificados a partir de las filas de datos
      const newCertificates: Certificate[] = []
      const baseY = 1240 // Posición Y base
      const spacing = 150 // Espaciado vertical entre textos

      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as unknown[]
        if (!row || row.length === 0) continue

        // Crear textos para cada columna
        const texts: TextElement[] = labels.map((label, index) => ({
          id: `text-${Date.now()}-${i}-${index}`,
          text: row[index] ? String(row[index]) : '',
          label: String(label),
          x: 1750, // Centro horizontal
          y: baseY + index * spacing,
          fontSize: 60,
          color: '#000000',
        }))

        const certificate: Certificate = {
          id: `cert-${Date.now()}-${i}`,
          name: row[0] ? String(row[0]) : `Certificado ${i}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          imageUrl: globalTemplate || null,
          texts,
        }

        newCertificates.push(certificate)
      }

      if (newCertificates.length === 0) {
        alert('No se encontraron datos válidos en el Excel')
        return
      }

      // Agregar los nuevos certificados
      addMultipleCertificates(newCertificates)

      alert(
        `✓ ${newCertificates.length} certificado${newCertificates.length !== 1 ? 's' : ''} creado${newCertificates.length !== 1 ? 's' : ''} desde Excel`
      )
      setIsOpen(false)
    } catch (error) {
      console.error('Error al procesar Excel:', error)
      alert('Error al procesar el archivo Excel')
    }

    // Limpiar input
    e.target.value = ''
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded hover:border-gray-300"
      >
        <Settings size={16} strokeWidth={1.5} />
        Configuración
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-800">
                Configuración General
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Plantilla común
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Carga una plantilla que se aplicará a todos los certificados
                  nuevos y existentes.
                </p>

                {/* Preview de plantilla actual */}
                {globalTemplate && (
                  <div className="mb-4 relative">
                    <img
                      src={globalTemplate}
                      alt="Plantilla global"
                      className="w-full h-32 object-cover rounded border border-gray-200"
                    />
                    <button
                      onClick={handleRemoveTemplate}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                )}

                {/* Botón cargar plantilla */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTemplateUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors">
                    <Image size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {globalTemplate
                        ? 'Cambiar plantilla'
                        : 'Cargar plantilla'}
                    </span>
                  </div>
                </label>
              </div>

              {/* Botón aplicar a todos */}
              {globalTemplate && (
                <button
                  onClick={handleApplyToAll}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Check size={18} />
                  Aplicar a todos los certificados
                </button>
              )}

              {/* Separador */}
              <div className="border-t border-gray-200" />

              {/* Sección de Excel */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Importar desde Excel
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Carga un archivo Excel para crear múltiples certificados. La
                  primera fila debe contener las etiquetas (columnas) y cada
                  fila siguiente será un certificado.
                </p>

                {/* Botón cargar Excel */}
                <label className="block">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleExcelUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors">
                    <FileSpreadsheet size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Cargar archivo Excel
                    </span>
                  </div>
                </label>

                {/* Info sobre el formato */}
                <div className="mt-3 bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-700 font-medium mb-1">
                    📋 Formato del Excel:
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1 ml-3">
                    <li>• Primera fila: nombres de las etiquetas</li>
                    <li>• Filas siguientes: valores para cada certificado</li>
                    <li>• Primera columna: nombre del certificado</li>
                  </ul>
                </div>
              </div>

              {/* Info general */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  💡 Los certificados creados desde Excel usarán la plantilla
                  común si está configurada.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
