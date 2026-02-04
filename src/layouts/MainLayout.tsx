import { Outlet } from 'react-router'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-950 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-700/10 rounded-full blur-3xl"></div>
      </div>

      <Header />
      <main className="flex-1 pt-20 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
