import { Outlet } from 'react-router'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-950 relative">
      {/* Fondo con círculos desenfocados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculo azul superior izquierda */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        {/* Círculo azul inferior derecha */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"></div>
        {/* Círculo azul central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-3xl"></div>

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
        <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
        <div className="absolute left-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
      </div>

      {/* Contenido */}
      <Header />
      <main className="flex-1 pt-20 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
