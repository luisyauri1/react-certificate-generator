import type { ModeCardProps } from '../types/ModeCardProps'
import Button from './Button'

export default function ModeCard({
  icon: Icon,
  title,
  description,
  onClick,
}: ModeCardProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className="group !p-8 md:!p-10 !h-auto !flex-col items-center text-center gap-5 md:gap-6"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-600/20 group-hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all duration-300">
        <Icon
          className="w-10 h-10 md:w-12 md:h-12 text-orange-400 group-hover:text-white transition-colors"
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-base md:text-lg text-orange-200/60 leading-relaxed">
          {description}
        </p>
      </div>
    </Button>
  )
}
