import { FileSpreadsheet } from 'lucide-react'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { addMultipleCertificates } from '../store/certificatesSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Certificate, ExcelModalProps, TextElement } from '../types'

export default function ExcelModal({ onClose }: ExcelModalProps) {
  const dispatch = useAppDispatch()
  const globalTemplate = useAppSelector(
    state => state.certificates.globalTemplate
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)

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
        setIsLoading(false)
        return
      }

      const labels = (jsonData[0] as unknown[]).filter(
        label => label && String(label).trim()
      )

      if (labels.length === 0) {
        alert('El archivo Excel debe tener columnas con etiquetas')
        setIsLoading(false)
        return
      }

      const newCertificates: Certificate[] = []
      const baseY = 1240
      const spacing = 150

      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as unknown[]
        if (!row || row.length === 0) continue

        const texts: TextElement[] = labels.map((label, index) => ({
          id: `text-${Date.now()}-${i}-${index}`,
          text: row[index] ? String(row[index]) : '',
          label: String(label),
          x: 1750,
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
        setIsLoading(false)
        return
      }

      dispatch(addMultipleCertificates(newCertificates))

      alert(
        `✓ ${newCertificates.length} certificado${newCertificates.length !== 1 ? 's' : ''} creado${newCertificates.length !== 1 ? 's' : ''} desde Excel`
      )
      onClose()
    } catch (error) {
      console.error('Error al procesar Excel:', error)
      alert('Error al procesar el archivo Excel')
    } finally {
      setIsLoading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-orange-200/60 mb-4">
          Carga un archivo Excel para crear múltiples certificados. La primera
          fila debe contener las etiquetas (columnas) y cada fila siguiente será
          un certificado.
        </p>

        <label className="block">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
            disabled={isLoading}
            className="hidden"
          />
          <div className="flex items-center justify-center gap-2 border-2 border-dashed border-orange-500/30 rounded-lg p-4 cursor-pointer hover:border-orange-500/50 hover:bg-slate-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <FileSpreadsheet size={20} className="text-orange-400" />
            <span className="text-sm text-white font-medium">
              {isLoading ? 'Procesando...' : 'Cargar archivo Excel'}
            </span>
          </div>
        </label>

        <div className="mt-4 bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
          <p className="text-sm text-orange-300 font-medium mb-2">
            📋 Formato del Excel:
          </p>
          <ul className="text-sm text-orange-200/70 space-y-1 ml-3">
            <li>• Primera fila: nombres de las etiquetas</li>
            <li>• Filas siguientes: valores para cada certificado</li>
            <li>• Primera columna: nombre del certificado</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-3 border border-orange-500/20">
        <p className="text-sm text-orange-200/70">
          💡 Los certificados creados desde Excel usarán la plantilla común si
          está configurada.
        </p>
      </div>
    </div>
  )
}
