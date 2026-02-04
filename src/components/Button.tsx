import type { ButtonProps, ButtonVariant } from '../types/ButtonProps'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-orange-600 text-white hover:bg-orange-500 border-0 font-medium',
  secondary:
    'bg-slate-800/50 text-white hover:bg-slate-800/70 border border-orange-500/30 hover:border-orange-500/50',
  outline:
    'border-2 border-dashed border-orange-500/30 text-white hover:border-orange-500/50 hover:bg-slate-800/50',
  danger: 'text-red-400/60 hover:text-red-400 hover:bg-red-500/10 border-0',
  success: 'text-green-400 hover:text-green-300 hover:bg-green-500/10 border-0',
  ghost: 'text-orange-400 hover:text-orange-300 border-0',
}

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-2 py-1.5 text-xs md:text-sm',
  md: 'px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base',
  lg: 'px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base',
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'cursor-pointer flex items-center justify-center gap-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClass = variantStyles[variant]
  const sizeClass = sizeStyles[size]
  const widthClass = fullWidth ? 'w-full' : ''

  const finalClassName =
    `${baseStyles} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()

  return (
    <button
      className={finalClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}
