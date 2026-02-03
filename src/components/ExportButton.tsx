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
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          : 'bg-gray-900 hover:bg-gray-800 text-white'
      }`}
    >
      {disabled ? 'Carga una plantilla primero' : 'Exportar certificado'}
    </button>
  )
}
