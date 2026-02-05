export const TEXT_DEFAULTS = {
  fontSize: 180,
  width: 1100,
  color: '#000000',
  fontFamily: 'Roboto',
  fontStyle: 'normal' as const,
  fontWeight: 'normal' as const,
  align: 'left' as const,
  lineHeight: 1,
}

export type TextDefaults = typeof TEXT_DEFAULTS
