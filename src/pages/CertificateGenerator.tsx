import CertificateForm from '../components/CertificateForm'
import CertificatePreview from '../components/CertificatePreview'

export default function CertificateGenerator() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <CertificateForm />
      <CertificatePreview />
    </div>
  )
}
