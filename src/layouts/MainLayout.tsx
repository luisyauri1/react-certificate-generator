import { Outlet } from 'react-router'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
    </div>
  )
}
