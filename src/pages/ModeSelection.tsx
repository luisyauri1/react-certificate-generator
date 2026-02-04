import { FileText, Users } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function ModeSelection() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            ¿Cómo deseas generar tus certificados?
          </h1>
          <p className="text-lg md:text-xl text-orange-200/60">
            Elige la opción que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Opción Individual */}
          <button
            onClick={() => navigate('/individual')}
            className="group bg-slate-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 md:p-10 hover:border-orange-500/50 hover:bg-slate-900/70 transition-all duration-300 text-left"
          >
            <div className="flex flex-col items-center text-center gap-5 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-600/20 group-hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all duration-300">
                <FileText
                  className="w-10 h-10 md:w-12 md:h-12 text-orange-400 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  Individual
                </h3>
                <p className="text-base md:text-lg text-orange-200/60 leading-relaxed">
                  Crea un certificado único con tus propios datos
                </p>
              </div>
            </div>
          </button>

          {/* Opción Grupal */}
          <button
            onClick={() => navigate('/grupo')}
            className="group bg-slate-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 md:p-10 hover:border-orange-500/50 hover:bg-slate-900/70 transition-all duration-300 text-left"
          >
            <div className="flex flex-col items-center text-center gap-5 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-600/20 group-hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all duration-300">
                <Users
                  className="w-10 h-10 md:w-12 md:h-12 text-orange-400 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  Grupal
                </h3>
                <p className="text-base md:text-lg text-orange-200/60 leading-relaxed">
                  Agrega múltiples personas manualmente o importa un archivo
                  Excel
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-sm md:text-base text-orange-300/40">
            Selecciona una opción para comenzar
          </p>
        </div>
      </div>
    </div>
  )
}
