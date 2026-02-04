export interface CreateCertificateModalProps {
  onClose: () => void
  onCreate: (name: string) => void
  certificateCount: number
  hasTemplate: boolean
}
