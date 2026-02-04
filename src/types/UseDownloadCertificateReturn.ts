import type { Certificate } from './Certificate'

export interface UseDownloadCertificateReturn {
  download: (certificate: Certificate) => Promise<void>
  isLoading: boolean
  error: string | null
}
