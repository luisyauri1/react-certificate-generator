import { Check, Upload } from 'lucide-react'
import { useRef } from 'react'

interface TemplateUploadButtonProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasImage: boolean
}

export default function TemplateUploadButton({
  onImageUpload,
  hasImage,
}: TemplateUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        className={`w-full rounded-lg border transition-all duration-200 ${
          hasImage
            ? 'border-gray-200 bg-white hover:border-gray-300'
            : 'border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white'
        }`}
      >
        <div className="p-5">
          <div className="flex items-center gap-4">
            {/* Ícono */}
            <div
              className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${
                hasImage
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              {hasImage ? (
                <Check className="w-5 h-5" strokeWidth={2.5} />
              ) : (
                <Upload className="w-5 h-5" strokeWidth={2} />
              )}
            </div>

            {/* Texto */}
            <div className="flex-1 text-left">
              <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                {hasImage ? 'Plantilla cargada' : 'Cargar plantilla'}
              </h4>
              <p className="text-xs text-gray-500">
                {hasImage ? 'Click para cambiar' : 'JPG o PNG, máx 5MB'}
              </p>
            </div>

            {/* Indicador */}
            {hasImage && (
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </div>
        </div>
      </button>
    </div>
  )
}
