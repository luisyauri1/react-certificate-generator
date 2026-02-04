interface ExportButtonProps {
  onExport: () => void
  disabled: boolean
}

export default function ExportButton({
  onExport,
  disabled,
}: ExportButtonProps) {
  return (
    <button
      onClick={onExport}
      disabled={disabled}
      className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
        disabled
          ? 'bg-slate-800/30 text-orange-400/40 cursor-not-allowed border border-orange-500/20'
          : 'bg-orange-600 hover:bg-orange-500 text-white'
      }`}
    >
      {disabled ? 'Carga una plantilla primero' : 'Exportar certificado'}
    </button>
  )
}
