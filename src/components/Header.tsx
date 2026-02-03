import { Award, HelpCircle, Info } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-orange-900/10 bg-linear-to-r from-orange-950 via-orange-900 to-orange-950 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 shadow-md ring-2 ring-orange-400/50">
              <Award className="h-7 w-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Generador de Certificados
              </h1>
              <p className="text-xs text-orange-300">
                Crea certificados profesionales
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-orange-100 transition-all hover:bg-orange-800/50 hover:text-white"
            >
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Acerca de</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-orange-100 transition-all hover:bg-orange-800/50 hover:text-white"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Ayuda</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
