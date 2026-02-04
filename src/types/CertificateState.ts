import type { Certificate } from './Certificate'

export interface CertificateState {
  certificates: Certificate[]
  globalTemplate: string | null
}
