import { useEffect, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import EditableText from '../components/EditableText'

export default function EditableTextDemo() {
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen w-screen bg-slate-900">
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          <EditableText
            initialText="Hola Mundo"
            x={50}
            y={80}
            width={220}
            fontSize={22}
            fill="#e2e8f0"
            align="left"
            fontFamily="Montserrat"
          />
          <EditableText
            initialText="Certificado de asistencia"
            x={50}
            y={150}
            width={420}
            fontSize={28}
            fill="#f59e0b"
            align="center"
            fontFamily="Playfair Display"
          />
          <EditableText
            initialText="Este texto es editable con doble click"
            x={50}
            y={230}
            width={520}
            fontSize={18}
            fill="#38bdf8"
            align="right"
            fontFamily="Roboto"
          />
        </Layer>
      </Stage>
    </div>
  )
}
