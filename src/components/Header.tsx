import { Award } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-blue-900/20 bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 transition-opacity">
            <Award className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-base font-semibold text-white tracking-tight">
            Certificados
          </h1>
        </button>

        <div className="text-xs text-blue-400/80 font-medium">v2.0</div>
      </div>
    </header>
  )
}
