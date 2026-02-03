export default function CertificateForm() {
  return (
    <div className="rounded-xl border border-orange-200 bg-linear-to-br from-white to-orange-50 p-8 shadow-lg">
      <div className="mb-8 border-l-4 border-orange-500 pl-4">
        <h3 className="text-xl font-bold text-orange-950">
          Información del Certificado
        </h3>
        <p className="text-sm text-orange-700">
          Completa los datos para generar tu certificado
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="studentName"
            className="mb-2 block text-sm font-semibold text-orange-900"
          >
            Nombre del Estudiante
          </label>
          <input
            type="text"
            id="studentName"
            placeholder="Ingresa el nombre completo"
            className="w-full rounded-lg border-2 border-orange-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-orange-300 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="courseName"
            className="mb-2 block text-sm font-semibold text-orange-900"
          >
            Nombre del Curso
          </label>
          <input
            type="text"
            id="courseName"
            placeholder="Ingresa el nombre del curso"
            className="w-full rounded-lg border-2 border-orange-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-orange-300 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="completionDate"
            className="mb-2 block text-sm font-semibold text-orange-900"
          >
            Fecha de Finalización
          </label>
          <input
            type="date"
            id="completionDate"
            className="w-full rounded-lg border-2 border-orange-200 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="instructorName"
            className="mb-2 block text-sm font-semibold text-orange-900"
          >
            Nombre del Instructor
          </label>
          <input
            type="text"
            id="instructorName"
            placeholder="Ingresa el nombre del instructor"
            className="w-full rounded-lg border-2 border-orange-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-orange-300 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-linear-to-r from-orange-600 to-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:from-orange-700 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Generar Certificado
        </button>
      </div>
    </div>
  )
}
