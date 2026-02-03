import { Award } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-14 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        {/* Logo y título minimalista */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900">
            <Award className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-base font-semibold text-gray-900 tracking-tight">
            Certificados
          </h1>
        </div>

        {/* Versión o info sutil */}
        <div className="text-xs text-gray-400 font-medium">v1.0</div>
      </div>
    </header>
  )
}
