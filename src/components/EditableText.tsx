import Konva from 'konva'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Text, Transformer } from 'react-konva'
import { Html } from 'react-konva-utils'

interface TextAreaProps {
  textNode: Konva.Text | null
  onClose: () => void
  onChange: (value: string) => void
}

const TextArea = ({ textNode, onClose, onChange }: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (!textareaRef.current || !textNode) return

    const textarea = textareaRef.current
    if (!textNode.getStage()) return

    const textPosition = textNode.absolutePosition()
    const scale = textNode.getAbsoluteScale().x

    const areaPosition = {
      x: textPosition.x,
      y: textPosition.y,
    }

    textarea.value = textNode.text()
    textarea.style.position = 'absolute'
    textarea.style.top = `${areaPosition.y}px`
    textarea.style.left = `${areaPosition.x}px`
    const lineHeight = textNode.fontSize() * textNode.lineHeight() * scale
    textarea.style.width = `${textNode.width() * scale}px`
    textarea.style.height = `${textNode.height() * scale}px`
    textarea.style.fontSize = `${textNode.fontSize() * scale}px`
    textarea.style.border = '1px dashed #3b82f6'
    textarea.style.padding = '0px'
    textarea.style.margin = '0px'
    textarea.style.overflow = 'hidden'
    textarea.style.background = 'rgba(15, 23, 42, 0.9)'
    textarea.style.outline = 'none'
    textarea.style.resize = 'none'
    textarea.style.lineHeight = `${lineHeight}px`
    textarea.style.fontFamily = textNode.fontFamily()
    textarea.style.textAlign = textNode.align()
    textarea.style.color = textNode.fill() as string
    textarea.style.transformOrigin = 'left top'
    textarea.style.boxSizing = 'border-box'
    textarea.style.whiteSpace = 'pre-wrap'
    textarea.style.wordWrap = 'break-word'

    const rotation = textNode.rotation()
    let transform = ''
    if (rotation) {
      transform += `rotateZ(${rotation}deg)`
    }
    textarea.style.transform = transform

    textarea.focus()

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        onChange(textarea.value)
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onChange(textarea.value)
        onClose()
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleInput = () => {
      const currentScale = textNode.getAbsoluteScale().x
      const currentLineHeight =
        textNode.fontSize() * textNode.lineHeight() * currentScale

      textNode.text(textarea.value)

      textarea.style.width = `${textNode.width() * currentScale}px`
      textarea.style.lineHeight = `${currentLineHeight}px`
      textarea.style.height = `${textNode.height() * currentScale}px`
    }

    textarea.addEventListener('keydown', handleKeyDown)
    textarea.addEventListener('input', handleInput)
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick)
    })

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown)
      textarea.removeEventListener('input', handleInput)
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [textNode, onChange, onClose])

  return (
    <textarea
      ref={textareaRef}
      style={{
        minHeight: '1em',
        position: 'absolute',
      }}
    />
  )
}

const TextEditor = (props: TextAreaProps) => {
  return (
    <Html>
      <TextArea {...props} />
    </Html>
  )
}

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
  draggable?: boolean
  onChange?: (value: string) => void
}

export default function EditableText({
  initialText,
  x,
  y,
  width = 200,
  fontSize = 20,
  fill = '#e2e8f0',
  align = 'left',
  fontFamily = 'Roboto',
  lineHeight = 1,
  draggable = true,
  onChange,
}: EditableTextProps) {
  const [text, setText] = useState(initialText)
  const [isEditing, setIsEditing] = useState(false)
  const [textWidth, setTextWidth] = useState(width)
  const [editingNode, setEditingNode] = useState<Konva.Text | null>(null)
  const textRef = useRef<Konva.Text | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)

  useEffect(() => {
    setText(initialText)
  }, [initialText])

  useEffect(() => {
    if (trRef.current && textRef.current && !isEditing) {
      trRef.current.nodes([textRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isEditing])

  const handleTextDblClick = useCallback(() => {
    setEditingNode(textRef.current)
    setIsEditing(true)
  }, [])

  const handleTextChange = useCallback(
    (newText: string) => {
      setText(newText)
      onChange?.(newText)
    },
    [onChange]
  )

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
        draggable={draggable}
        width={textWidth}
        wrap="word"
        fill={fill}
        align={align}
        onDblClick={handleTextDblClick}
        onDblTap={handleTextDblClick}
        onTransform={handleTransform}
        visible={!isEditing}
      />
      {isEditing && (
        <TextEditor
          textNode={editingNode}
          onChange={handleTextChange}
          onClose={() => setIsEditing(false)}
        />
      )}
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
