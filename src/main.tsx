import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { CertificateProvider } from './contexts/CertificateContext'
import './index.css'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CertificateProvider>
      <RouterProvider router={router} />
    </CertificateProvider>
  </StrictMode>
)
