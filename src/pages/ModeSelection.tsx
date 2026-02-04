import { FileText, Users } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function ModeSelection() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">
            ¿Cómo deseas generar tus certificados?
          </h1>
          <p className="text-base text-blue-200/60">
            Elige la opción que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Opción Individual */}
          <button
            onClick={() => navigate('/individual')}
            className="group bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-slate-900/70 transition-all duration-300 text-left"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-blue-600/20 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
                <FileText
                  className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Individual
                </h3>
                <p className="text-sm text-blue-200/60 leading-relaxed">
                  Crea un certificado único con tus propios datos
                </p>
              </div>
            </div>
          </button>

          {/* Opción Grupal */}
          <button
            onClick={() => navigate('/grupo')}
            className="group bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-slate-900/70 transition-all duration-300 text-left"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-blue-600/20 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
                <Users
                  className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Grupal
                </h3>
                <p className="text-sm text-blue-200/60 leading-relaxed">
                  Agrega múltiples personas manualmente o importa un archivo
                  Excel
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-blue-300/40">
            Selecciona una opción para comenzar
          </p>
        </div>
      </div>
    </div>
  )
}
