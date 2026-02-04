import { Check, Upload } from 'lucide-react'
import { useRef } from 'react'
import Button from './Button'

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e)
    // Resetear el input para permitir cargar la misma imagen nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <Button
        variant="outline"
        size="md"
        fullWidth
        onClick={handleClick}
        className="px-0!"
      >
        <div className="w-full p-5">
          <div className="flex items-center gap-4">
            {/* Ícono */}
            <div
              className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${
                hasImage
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-700/50 border border-orange-500/30 text-orange-400'
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
              <h4 className="text-sm font-semibold text-white mb-0.5">
                {hasImage ? 'Plantilla cargada' : 'Cargar plantilla'}
              </h4>
              <p className="text-xs text-orange-200/60">
                {hasImage ? 'Click para cambiar' : 'JPG o PNG, máx 5MB'}
              </p>
            </div>

            {/* Indicador */}
            {hasImage && (
              <div className="shrink-0 w-2 h-2 rounded-full bg-green-500" />
            )}
          </div>
        </div>
      </Button>
    </div>
  )
}
