import { FileImage, Upload } from 'lucide-react'

export default function CertificateTemplateSelector() {
  return (
    <div className="mb-8 rounded-xl border border-orange-200 bg-linear-to-r from-white via-orange-50 to-white p-6 shadow-lg">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 shadow-md">
            <FileImage className="h-8 w-8 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-950">
              Plantilla del Certificado
            </h3>
            <p className="text-sm text-orange-700">
              Carga tu propia plantilla o usa la predeterminada
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border-2 border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition-all hover:border-orange-400 hover:bg-orange-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <Upload className="h-4 w-4" />
            <span>Cargar Plantilla</span>
          </button>

          <button
            type="button"
            className="rounded-lg bg-linear-to-r from-orange-600 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-orange-700 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Usar Plantilla por Defecto
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-orange-600">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
          ℹ
        </span>
        <span>Formatos admitidos: JPG, PNG, PDF • Tamaño máximo: 5MB</span>
      </div>
    </div>
  )
}
