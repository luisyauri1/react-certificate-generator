import { createBrowserRouter } from 'react-router'
import MainLayout from './layouts/MainLayout'
import CertificateDetail from './pages/CertificateDetail'
import CertificateGenerator from './pages/CertificateGenerator'
import CertificateList from './pages/CertificateList'
import ModeSelection from './pages/ModeSelection'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <ModeSelection />,
        },
        {
          path: 'individual',
          element: <CertificateGenerator />,
        },
        {
          path: 'grupo',
          element: <CertificateList />,
        },
        {
          path: 'grupo/:id',
          element: <CertificateDetail />,
        },
        {
          path: 'excel',
          element: <div>Subir Excel - Próximamente</div>,
        },
      ],
    },
  ],
  {
    basename: '/react-certificate-generator',
  }
)
