import { FileSpreadsheet, FileText, Users } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function ModeSelection() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            ¿Cómo deseas generar tus certificados?
          </h1>
          <p className="text-base text-gray-500">
            Elige la opción que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Opción Individual */}
          <button
            onClick={() => navigate('/individual')}
            className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-900 hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                <FileText
                  className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Individual
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Crea un certificado único con tus propios datos
                </p>
              </div>
            </div>
          </button>

          {/* Opción Grupo Manual */}
          <button
            onClick={() => navigate('/grupo')}
            className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-900 hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                <Users
                  className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Grupo Manual
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Agrega múltiples personas y genera certificados por lote
                </p>
              </div>
            </div>
          </button>

          {/* Opción Subir Excel */}
          <button
            onClick={() => navigate('/excel')}
            className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-900 hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                <FileSpreadsheet
                  className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Subir Excel
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Importa un archivo Excel con los datos de los certificados
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Selecciona una opción para comenzar
          </p>
        </div>
      </div>
    </div>
  )
}
