import type { CertificatePreviewProps } from '../types/index'

export default function CertificatePreview({
  templateImage,
}: CertificatePreviewProps) {
  return (
    <div className="rounded-xl border border-orange-200 bg-linear-to-br from-white to-orange-50 p-8 shadow-lg">
      <div className="mb-8 border-l-4 border-orange-500 pl-4">
        <h3 className="text-xl font-bold text-orange-950">
          Vista Previa del Certificado
        </h3>
        <p className="text-sm text-orange-700">
          Así se verá tu certificado final
        </p>
      </div>

      <div className="mb-6 aspect-[1.414/1] overflow-hidden rounded-lg border-4 border-orange-300 bg-white shadow-md">
        <img
          src={templateImage}
          alt="Plantilla del certificado"
          className="h-full w-full object-contain"
        />
      </div>

      <button
        type="button"
        className="w-full rounded-lg border-2 border-orange-500 bg-white px-6 py-3.5 text-base font-semibold text-orange-700 shadow-sm transition-all hover:bg-orange-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Descargar Certificado
      </button>
    </div>
  )
}
