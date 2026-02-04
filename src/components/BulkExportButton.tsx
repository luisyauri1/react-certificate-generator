import { jsPDF } from 'jspdf'
import JSZip from 'jszip'
import Konva from 'konva'
import { Download } from 'lucide-react'
import { useState } from 'react'
import type { Certificate } from '../types'

interface BulkExportButtonProps {
  certificates: Certificate[]
  onComplete?: () => void
}

export default function BulkExportButton({
  certificates,
  onComplete,
}: BulkExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  // Filtrar solo certificados listos (con plantilla)
  const readyCertificates = certificates.filter(cert => cert.imageUrl)

  const handleBulkExport = async () => {
    if (readyCertificates.length === 0) {
      alert('No hay certificados listos para exportar')
      return
    }

    setIsExporting(true)
    setProgress(0)

    try {
      const zip = new JSZip()
      const folder = zip.folder('certificados')

      if (!folder) {
        throw new Error('Error al crear carpeta en ZIP')
      }

      // Generar PDF de cada certificado
      for (let i = 0; i < readyCertificates.length; i++) {
        const certificate = readyCertificates[i]
        setProgress(Math.round(((i + 1) / readyCertificates.length) * 100))

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
          if (certificate.imageUrl) {
            const img = new Image()
            await new Promise<void>((resolve, reject) => {
              img.onload = () => {
                const konvaImage = new Konva.Image({
                  image: img,
                  width: 3508,
                  height: 2480,
                })
                layer.add(konvaImage)
                resolve()
              }
              img.onerror = reject
              img.src = certificate.imageUrl!
            })
          }

          // Agregar textos
          certificate.texts.forEach(text => {
            const konvaText = new Konva.Text({
              text: text.text,
              x: text.x,
              y: text.y,
              fontSize: text.fontSize,
              fill: text.color,
              fontFamily: 'Arial',
            })
            layer.add(konvaText)
          })

          layer.draw()

          // Generar imagen del canvas con menor resolución
          const dataURL = stage.toDataURL({
            pixelRatio: 1.5, // Reducido de 4 a 1.5 para menor tamaño
            mimeType: 'image/jpeg',
            quality: 0.85, // Compresión JPEG
          })

          // Crear PDF
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [3508, 2480],
            compress: true, // Compresión del PDF
          })

          pdf.addImage(dataURL, 'JPEG', 0, 0, 3508, 2480, undefined, 'FAST')

          // Agregar PDF al ZIP
          const pdfBlob = pdf.output('blob')
          const fileName = `${certificate.name.replace(/[^a-z0-9]/gi, '_')}.pdf`
          folder.file(fileName, pdfBlob)

          // Limpiar stage
          stage.destroy()
        } catch (error) {
          console.error(`Error al generar PDF de ${certificate.name}:`, error)
        }
      }

      // Generar y descargar ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `certificados_${new Date().getTime()}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      alert(
        `✓ ${readyCertificates.length} certificado${readyCertificates.length !== 1 ? 's' : ''} exportado${readyCertificates.length !== 1 ? 's' : ''} correctamente`
      )

      if (onComplete) onComplete()
    } catch (error) {
      console.error('Error al exportar certificados:', error)
      alert('Error al exportar los certificados')
    } finally {
      setIsExporting(false)
      setProgress(0)
    }
  }

  if (readyCertificates.length === 0) {
    return null
  }

  return (
    <button
      onClick={handleBulkExport}
      disabled={isExporting}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={16} strokeWidth={1.5} />
      {isExporting ? (
        <span>Exportando {progress}%...</span>
      ) : (
        <span>Exportar todos ({readyCertificates.length})</span>
      )}
    </button>
  )
}
