import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getPart } from '../../data/parts'
import { UnifiedDroneSVG } from './DroneSVGsV3'
import { useViewport } from '../../hooks/useViewport'

function DetailRow({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, marginBottom: 4 }}>
      <span style={{ color: 'var(--text3)' }}>{k}</span>
      <span style={{ color: 'var(--text2)', textAlign: 'right' }}>{String(v)}</span>
    </div>
  )
}

export default function DroneCenter({ selected, mission }) {
  const { isMobile, isTablet } = useViewport()
  const frame = getPart('frames', selected.frame)
  const motor = getPart('motors', selected.motor)
  const prop = getPart('props', selected.prop)
  const battery = getPart('batteries', selected.battery)
  const software = getPart('software', selected.software)

  const [selectedPartType, setSelectedPartType] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState({ x: -8, y: 10 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 })
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  const detail = useMemo(() => {
    if (selectedPartType === 'frame') return frame
    if (selectedPartType === 'motor') return motor
    if (selectedPartType === 'prop') return prop
    if (selectedPartType === 'battery') return battery
    if (selectedPartType === 'fc') {
      return {
        name: 'Flight Controller',
        color: '#00d4ff',
        specs: { MCU: 'STM32', Gyro: 'ICM42688', UART: '6', OSD: 'AT7456E' },
        mountingSteps: ['FC stack sabitle', 'UART baglantilarini kontrol et', 'PID profili sec', 'Hover test yap'],
      }
    }
    return null
  }, [selectedPartType, frame, motor, prop, battery])

  const handleMouseDown = (event) => {
    setIsDragging(true)
    dragRef.current = { x: event.clientX, y: event.clientY, rotX: rotation.x, rotY: rotation.y }
  }

  useEffect(() => {
    if (!isDragging) return undefined
    const onMove = (event) => {
      const dx = event.clientX - dragRef.current.x
      const dy = event.clientY - dragRef.current.y
      setRotation({
        x: clamp(dragRef.current.rotX - dy * 0.18, -35, 35),
        y: clamp(dragRef.current.rotY + dx * 0.18, -35, 35),
      })
    }
    const onUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isDragging])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)', overflow: 'hidden' }}>
      {mission && (
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${mission.color}44`, background: `${mission.color}11`, flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1, color: mission.color }}>{mission.icon} GOREV</div>
          <div style={{ fontSize: 12, color: 'var(--text)' }}>{mission.desc}</div>
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
        <div style={{ flex: 1, minHeight: isMobile ? 320 : 0, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
          <div
            onMouseDown={handleMouseDown}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', perspective: 900 }}
          >
            <div style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`, transformStyle: 'preserve-3d', transition: isDragging ? 'none' : 'transform 0.15s ease' }}>
              <UnifiedDroneSVG
                frameId={selected.frame}
                motorId={selected.motor}
                propId={selected.prop}
                frameColor={frame?.color || '#ef4444'}
                propColor={prop?.color || '#00d4ff'}
                size={isTablet ? 280 : 305}
                onClickFrame={() => setSelectedPartType((p) => (p === 'frame' ? null : 'frame'))}
                onClickMotor={() => setSelectedPartType((p) => (p === 'motor' ? null : 'motor'))}
                onClickProp={() => setSelectedPartType((p) => (p === 'prop' ? null : 'prop'))}
                onClickFC={() => setSelectedPartType((p) => (p === 'fc' ? null : 'fc'))}
                onClickBattery={() => setSelectedPartType((p) => (p === 'battery' ? null : 'battery'))}
                selectedPart={selectedPartType}
              />
            </div>
          </div>
          <div style={{ position: 'absolute', right: 10, bottom: 10, display: 'flex', gap: 6 }}>
            <button onClick={() => setZoom((z) => clamp(z + 0.15, 0.55, 2.2))} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }}>+</button>
            <button onClick={() => setZoom((z) => clamp(z - 0.15, 0.55, 2.2))} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }}>-</button>
          </div>
        </div>

        <aside
          style={{
            width: isMobile ? '100%' : 280,
            minWidth: isMobile ? 'auto' : 280,
            borderLeft: isMobile ? 'none' : '1px solid var(--border)',
            borderTop: isMobile ? '1px solid var(--border)' : 'none',
            background: 'var(--bg2)',
            transform: detail ? 'translateX(0)' : 'translateX(100%)',
            opacity: detail ? 1 : 0,
            pointerEvents: detail ? 'auto' : 'none',
            transition: 'transform 0.25s ease, opacity 0.25s ease',
            marginRight: detail ? 0 : (isMobile ? 0 : -280),
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 15, fontWeight: 700, color: detail?.color || 'var(--text)' }}>{detail?.name || ''}</div>
            <button onClick={() => setSelectedPartType(null)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text2)' }}>×</button>
          </div>
          <div style={{ overflowY: 'auto', minHeight: 0, padding: '10px 12px' }}>
            {Object.entries(detail?.specs || {}).map(([k, v]) => <DetailRow key={k} k={k} v={v} />)}
            {(detail?.mountingSteps || []).length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1, color: 'var(--text3)', marginBottom: 6 }}>MONTAJ ADIMLARI</div>
                {(detail?.mountingSteps || []).map((s, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>{i + 1}. {s}</div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', padding: '6px 12px', fontSize: 11, color: 'var(--text3)' }}>
        Parca secimi: {selectedPartType ? selectedPartType.toUpperCase() : 'YOK'} | Yazilim: {software?.name || '-'}
      </div>
    </div>
  )
}
