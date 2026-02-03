import CertificateForm from '../components/CertificateForm'
import CertificatePreview from '../components/CertificatePreview'
import CertificateTemplateSelector from '../components/CertificateTemplateSelector'

export default function CertificateGenerator() {
  return (
    <div>
      <CertificateTemplateSelector />
      <div className="grid gap-8 lg:grid-cols-2">
        <CertificateForm />
        <CertificatePreview />
      </div>
    </div>
  )
}
