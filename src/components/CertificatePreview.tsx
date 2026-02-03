export default function CertificatePreview() {
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

      <div className="mb-6 aspect-[1.414/1] overflow-hidden rounded-lg border-4 border-orange-300 bg-linear-to-br from-amber-50 to-white p-8 shadow-md">
        <div className="flex h-full flex-col items-center justify-center space-y-3 border-4 border-double border-orange-400 p-6 text-center">
          <h1 className="text-3xl font-bold text-orange-950">
            Certificado de Finalización
          </h1>

          <p className="text-sm text-orange-800">Se certifica que</p>

          <p className="text-2xl font-semibold text-orange-950">
            Nombre del Estudiante
          </p>

          <p className="text-sm text-orange-800">
            ha completado exitosamente el curso
          </p>

          <p className="text-xl font-medium text-orange-900">
            Nombre del Curso
          </p>

          <p className="text-sm text-orange-800">el día</p>

          <p className="text-base text-orange-900">Fecha</p>

          <div className="mt-6 w-full pt-6">
            <div className="flex justify-center">
              <div className="text-center">
                <div className="mb-2 h-px w-48 bg-orange-400"></div>
                <p className="text-xs text-orange-700">Firma del Instructor</p>
              </div>
            </div>
          </div>
        </div>
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
