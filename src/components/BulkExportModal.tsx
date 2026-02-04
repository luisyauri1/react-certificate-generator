import { jsPDF } from 'jspdf'
import JSZip from 'jszip'
import Konva from 'konva'
import { Download } from 'lucide-react'
import { useState } from 'react'
import type { BulkExportModalProps } from '../types'
import Button from './Button'

export default function BulkExportModal({
  certificates,
  onClose,
}: BulkExportModalProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  const readyCertificates = certificates.filter(cert => cert.imageUrl)
  const readyCount = readyCertificates.length

  const handleBulkExport = async () => {
    if (readyCount === 0) {
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

      for (let i = 0; i < readyCount; i++) {
        const certificate = readyCertificates[i]
        setProgress(Math.round(((i + 1) / readyCount) * 100))

        try {
          const stage = new Konva.Stage({
            container: document.createElement('div'),
            width: 3508,
            height: 2480,
          })

          const layer = new Konva.Layer()
          stage.add(layer)

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

          certificate.texts.forEach(text => {
            const konvaText = new Konva.Text({
              text: text.text,
              x: text.x,
              y: text.y,
              fontSize: text.fontSize,
              fill: text.color,
              fontFamily: text.fontFamily || 'Roboto',
            })
            layer.add(konvaText)
          })

          layer.draw()

          const dataURL = stage.toDataURL({
            pixelRatio: 1.5,
            mimeType: 'image/jpeg',
            quality: 0.85,
          })

          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [3508, 2480],
            compress: true,
          })

          pdf.addImage(dataURL, 'JPEG', 0, 0, 3508, 2480, undefined, 'FAST')

          const pdfBlob = pdf.output('blob')
          const fileName = `${certificate.name.replace(/[^a-z0-9]/gi, '_')}.pdf`
          folder.file(fileName, pdfBlob)

          stage.destroy()
        } catch (error) {
          console.error(`Error al generar PDF de ${certificate.name}:`, error)
        }
      }

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
        `✓ ${readyCount} certificado${readyCount !== 1 ? 's' : ''} exportado${readyCount !== 1 ? 's' : ''} correctamente`
      )

      onClose()
    } catch (error) {
      console.error('Error al exportar certificados:', error)
      alert('Error al exportar los certificados')
    } finally {
      setIsExporting(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-lg p-3 border border-orange-500/20">
        <p className="text-sm text-orange-200/70">
          {readyCount > 0
            ? `Se exportarán ${readyCount} certificado${readyCount !== 1 ? 's' : ''} listos.`
            : 'No hay certificados listos (sin plantilla).'}
        </p>
      </div>

      {isExporting && (
        <div className="space-y-2">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-orange-300/70">
            Exportando... {progress}%
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="md"
          onClick={onClose}
          disabled={isExporting}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleBulkExport}
          disabled={isExporting || readyCount === 0}
        >
          <Download size={18} strokeWidth={1.5} />
          {isExporting ? 'Exportando...' : 'Exportar todos'}
        </Button>
      </div>
    </div>
  )
}
