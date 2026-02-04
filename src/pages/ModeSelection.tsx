import { FileText, Users } from 'lucide-react'
import { useNavigate } from 'react-router'
import ModeCard from '../components/ModeCard'

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
          <ModeCard
            icon={FileText}
            title="Individual"
            description="Crea un certificado único con tus propios datos"
            onClick={() => navigate('/individual')}
          />

          <ModeCard
            icon={Users}
            title="Grupal"
            description="Agrega múltiples personas manualmente o importa un archivo Excel"
            onClick={() => navigate('/grupo')}
          />
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
