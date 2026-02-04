import type { ModeCardProps } from '../types/ModeCardProps'

export default function ModeCard({
  icon: Icon,
  title,
  description,
  onClick,
}: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer bg-slate-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 md:p-10 hover:border-orange-500/50 hover:bg-slate-900/70 transition-all duration-300 text-left"
    >
      <div className="flex flex-col items-center text-center gap-5 md:gap-6">
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
      </div>
    </button>
  )
}
