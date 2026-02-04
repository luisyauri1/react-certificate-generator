import { createBrowserRouter } from 'react-router'
import MainLayout from './layouts/MainLayout'
import CertificateDetail from './pages/CertificateDetail'
import CertificateGenerator from './pages/CertificateGenerator'
import CertificateList from './pages/CertificateList'
import EditableTextDemo from './pages/EditableTextDemo'
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
          path: 'demo-texto',
          element: <EditableTextDemo />,
        },
      ],
    },
  ],
  {
    basename: '/react-certificate-generator',
  }
)
