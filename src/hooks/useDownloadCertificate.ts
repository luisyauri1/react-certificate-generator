import { jsPDF } from 'jspdf'
import Konva from 'konva'
import { useState } from 'react'
import type { Certificate, UseDownloadCertificateReturn } from '../types'

export function useDownloadCertificate(): UseDownloadCertificateReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const download = async (certificate: Certificate) => {
    setIsLoading(true)
    setError(null)

    if (!certificate.imageUrl) {
      setError('Este certificado no tiene plantilla')
      setIsLoading(false)
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
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al descargar el certificado'
      setError(errorMessage)
      console.error('Error al descargar certificado:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return { download, isLoading, error }
}
