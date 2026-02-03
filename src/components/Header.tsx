import { Award, HelpCircle, Info } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between">
        {/* Lado izquierdo - alineado con panel de controles */}
        <div className="w-[360px] flex items-center gap-3 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 shadow-sm">
            <Award className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              Generador de Certificados
            </h1>
          </div>
        </div>

        {/* Lado derecho - navegación */}
        <nav className="flex items-center gap-2 px-6">
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Acerca de</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Ayuda</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
