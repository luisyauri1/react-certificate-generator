import Button from './Button'

interface ExportButtonProps {
  onExport: () => void
  disabled: boolean
}

export default function ExportButton({
  onExport,
  disabled,
}: ExportButtonProps) {
  return (
    <Button
      variant={disabled ? 'secondary' : 'primary'}
      size="md"
      onClick={onExport}
      disabled={disabled}
      fullWidth
    >
      {disabled ? 'Carga una plantilla primero' : 'Exportar certificado'}
    </Button>
  )
}
