import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Certificate, CertificateState } from '../types'

const initialState: CertificateState = {
  certificates: [],
  globalTemplate: null,
}

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload)
    },
    addMultipleCertificates: (state, action: PayloadAction<Certificate[]>) => {
      state.certificates.push(...action.payload)
    },
    updateCertificate: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Certificate> }>
    ) => {
      const { id, updates } = action.payload
      const target = state.certificates.find(cert => cert.id === id)
      if (target) {
        Object.assign(target, updates, {
          updatedAt: new Date().toISOString(),
        })
      }
    },
    deleteCertificate: (state, action: PayloadAction<string>) => {
      state.certificates = state.certificates.filter(
        cert => cert.id !== action.payload
      )
    },
    setGlobalTemplate: (state, action: PayloadAction<string | null>) => {
      state.globalTemplate = action.payload
    },
    applyTemplateToAll: (state, action: PayloadAction<string>) => {
      state.certificates = state.certificates.map(cert => ({
        ...cert,
        imageUrl: action.payload,
        updatedAt: new Date().toISOString(),
      }))
    },
  },
})

export const {
  addCertificate,
  addMultipleCertificates,
  updateCertificate,
  deleteCertificate,
  setGlobalTemplate,
  applyTemplateToAll,
} = certificatesSlice.actions

export default certificatesSlice.reducer
