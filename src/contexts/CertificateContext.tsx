import { createContext, useContext, useState } from 'react'
import type { Certificate } from '../types'

interface CertificateContextType {
  certificates: Certificate[]
  globalTemplate: string | null
  addCertificate: (certificate: Certificate) => void
  updateCertificate: (id: string, updates: Partial<Certificate>) => void
  deleteCertificate: (id: string) => void
  setGlobalTemplate: (template: string | null) => void
  applyTemplateToAll: (template: string) => void
  addMultipleCertificates: (certificates: Certificate[]) => void
}

const CertificateContext = createContext<CertificateContextType | undefined>(
  undefined
)

export function CertificateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [globalTemplate, setGlobalTemplateState] = useState<string | null>(null)

  const addCertificate = (certificate: Certificate) => {
    setCertificates(prev => [...prev, certificate])
  }

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    setCertificates(prev =>
      prev.map(cert =>
        cert.id === id
          ? { ...cert, ...updates, updatedAt: new Date().toISOString() }
          : cert
      )
    )
  }

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id))
  }

  const setGlobalTemplate = (template: string | null) => {
    setGlobalTemplateState(template)
  }

  const applyTemplateToAll = (template: string) => {
    setCertificates(prev =>
      prev.map(cert => ({
        ...cert,
        imageUrl: template,
        updatedAt: new Date().toISOString(),
      }))
    )
  }

  const addMultipleCertificates = (newCertificates: Certificate[]) => {
    setCertificates(prev => [...prev, ...newCertificates])
  }

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        globalTemplate,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        setGlobalTemplate,
        applyTemplateToAll,
        addMultipleCertificates,
      }}
    >
      {children}
    </CertificateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCertificates() {
  const context = useContext(CertificateContext)
  if (context === undefined) {
    throw new Error('useCertificates must be used within a CertificateProvider')
  }
  return context
}
