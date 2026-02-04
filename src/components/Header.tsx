import { Award } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="h-20 border-b border-orange-500/30 fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 transition-all group-hover:bg-orange-500">
            <Award className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-base font-semibold text-white tracking-tight">
            Certificados
          </h1>
        </button>

        <div className="text-xs text-orange-400/60 font-medium">v2.0</div>
      </div>
    </header>
  )
}
