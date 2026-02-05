import Konva from 'konva'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Text, Transformer } from 'react-konva'
import { TEXT_DEFAULTS } from '../constants/textDefaults'

interface EditableTextProps {
  initialText: string
  x: number
  y: number
  width?: number
  fontSize?: number
  fill?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  fontFamily?: string
  lineHeight?: number
  fontStyle?: string
  onChange?: (value: string) => void
  onPositionChange?: (x: number, y: number) => void
}

export default function EditableText({
  initialText,
  x,
  y,
  width = TEXT_DEFAULTS.width,
  fontSize = TEXT_DEFAULTS.fontSize,
  fill = TEXT_DEFAULTS.color,
  align = TEXT_DEFAULTS.align as 'left' | 'center' | 'right' | 'justify',
  fontFamily = TEXT_DEFAULTS.fontFamily,
  lineHeight = TEXT_DEFAULTS.lineHeight,
  fontStyle = TEXT_DEFAULTS.fontStyle,
  onChange,
  onPositionChange,
}: EditableTextProps) {
  const [text, setText] = useState(initialText)
  const [isEditing, setIsEditing] = useState(false)
  const [textWidth, setTextWidth] = useState(width)
  const textRef = useRef<Konva.Text | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)

  useEffect(() => {
    setText(initialText)
  }, [initialText])

  useEffect(() => {
    if (trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current])
    }
  }, [isEditing])

  const handleTextDblClick = useCallback(() => {
    const textNode = textRef.current
    if (!textNode) return

    const stage = textNode.getStage()
    if (!stage) return

    setIsEditing(true)
    textNode.hide()
    trRef.current?.hide()

    const textPosition = textNode.absolutePosition()
    const stageBox = stage.container().getBoundingClientRect()
    const scale = textNode.getAbsoluteScale().x

    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    }

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)

    textarea.value = textNode.text()
    textarea.style.position = 'absolute'
    textarea.style.top = areaPosition.y + 'px'
    textarea.style.left = areaPosition.x + 'px'
    textarea.style.width = textNode.width() * scale + 'px'
    textarea.style.height = textNode.height() * scale + 'px'
    textarea.style.fontSize = textNode.fontSize() * scale + 'px'
    textarea.style.border = '1px dashed #3b82f6'
    textarea.style.padding = '0px'
    textarea.style.margin = '0px'
    textarea.style.overflow = 'hidden'
    textarea.style.background = 'rgba(15, 23, 42, 0.9)'
    textarea.style.outline = 'none'
    textarea.style.resize = 'none'
    const lineHeight = textNode.fontSize() * textNode.lineHeight() * scale
    textarea.style.lineHeight = lineHeight + 'px'
    textarea.style.fontFamily = textNode.fontFamily()
    textarea.style.transformOrigin = 'left top'
    textarea.style.textAlign = textNode.align()
    textarea.style.color = textNode.fill() as string
    textarea.style.zIndex = '9999'
    textarea.style.boxSizing = 'border-box'
    textarea.style.whiteSpace = 'pre-wrap'
    textarea.style.wordWrap = 'break-word'

    const rotation = textNode.rotation()
    let transform = ''
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)'
    }
    textarea.style.transform = transform

    textarea.focus()

    function removeTextarea() {
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea)
      }
      window.removeEventListener('click', handleOutsideClick)
      if (textNode) {
        textNode.show()
      }
      trRef.current?.show()
      trRef.current?.forceUpdate()
      setIsEditing(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const newText = textarea.value
        textNode.text(newText)
        setText(newText)
        onChange?.(newText)
        removeTextarea()
      }
      if (e.key === 'Escape') {
        removeTextarea()
      }
    }

    const handleInput = () => {
      const currentScale = textNode.getAbsoluteScale().x
      const currentLineHeight =
        textNode.fontSize() * textNode.lineHeight() * currentScale

      textNode.text(textarea.value)

      textarea.style.width = textNode.width() * currentScale + 'px'
      textarea.style.lineHeight = currentLineHeight + 'px'
      textarea.style.height = textNode.height() * currentScale + 'px'
    }

    function handleOutsideClick(e: MouseEvent) {
      if (e.target !== textarea) {
        const newText = textarea.value
        if (textNode) {
          textNode.text(newText)
        }
        setText(newText)
        onChange?.(newText)
        removeTextarea()
      }
    }

    textarea.addEventListener('keydown', handleKeyDown)
    textarea.addEventListener('input', handleInput)
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick)
    }, 200)
  }, [onChange])

  const handleTransform = useCallback(() => {
    const node = textRef.current
    if (!node) return

    const scaleX = node.scaleX()
    const newWidth = node.width() * scaleX
    setTextWidth(newWidth)
    node.setAttrs({
      width: newWidth,
      scaleX: 1,
    })
  }, [])

  return (
    <>
      <Text
        ref={textRef}
        text={text}
        x={x}
        y={y}
        fontSize={fontSize}
        fontFamily={fontFamily}
        lineHeight={lineHeight}
        fontStyle={fontStyle}
        draggable
        width={textWidth}
        wrap="word"
        fill={fill}
        align={align}
        onDblClick={handleTextDblClick}
        onDblTap={handleTextDblClick}
        onTransform={handleTransform}
        onDragEnd={e => {
          onPositionChange?.(e.target.x(), e.target.y())
        }}
      />
      {!isEditing && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(_oldBox, newBox) => ({
            ...newBox,
            width: Math.max(30, newBox.width),
          })}
        />
      )}
    </>
  )
}
