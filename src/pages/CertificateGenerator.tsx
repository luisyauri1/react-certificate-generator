import { useState } from 'react'
import CertificateForm from '../components/CertificateForm'
import CertificatePreview from '../components/CertificatePreview'
import CertificateTemplateSelector from '../components/CertificateTemplateSelector'

export default function CertificateGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>(null)

  const handleTemplateLoad = (imageUrl: string) => {
    setTemplateImage(imageUrl)
  }

  return (
    <div>
      {!templateImage ? (
        <CertificateTemplateSelector onTemplateLoad={handleTemplateLoad} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <CertificateForm />
          <CertificatePreview templateImage={templateImage} />
        </div>
      )}
    </div>
  )
}
