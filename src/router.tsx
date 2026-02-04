import { createBrowserRouter } from 'react-router'
import MainLayout from './layouts/MainLayout'
import CertificateGenerator from './pages/CertificateGenerator'
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
          element: <div>Grupo Manual - Próximamente</div>,
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
