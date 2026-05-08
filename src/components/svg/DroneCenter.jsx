import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getPart } from '../../data/parts'
import { UnifiedDroneSVG } from './DroneSVGs'
import { useViewport } from '../../hooks/useViewport'

function PartInfoCard({ label, part }) {
  return (
    <div style={{ padding: '10px 12px', borderRight: '1px solid var(--border)', minWidth: 0 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text3)', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
      {part ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 4, background: `${part.color}22`, border: `1px solid ${part.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
              {part.icon}
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 11, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{part.name}</div>
          </div>
          {part.bullets?.slice(0, 2).map((b, i) => (
            <div key={i} style={{ fontSize: 10, color: 'var(--text2)', display: 'flex', gap: 4, marginBottom: 2 }}>
              <span style={{ color: 'var(--text3)', flexShrink: 0 }}>·</span>{b}
            </div>
          ))}
        </>
      ) : <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Seçilmedi</div>}
    </div>
  )
}

const FC_DETAILS = {
  name: 'Flight Controller',
  color: '#00d4ff',
  badges: ['FC', 'Beyin'],
  specs: {
    Islemci: 'STM32F7',
    Gyro: 'ICM42688P',
    OSD: 'AT7456E',
    UART: '6',
    Blackbox: '16MB Flash',
  },
  mountingSteps: [
    'Soft mount grommetleri standoff üzerine yerleştir.',
    'M1-M4 çıkışlarını ESC sinyal kablolarına doğru sırada bağla.',
    'UART1 alıcı, UART2 VTX/telemetri için pin map doğrula.',
    '5V ve GND hatlarını kısa devre kontrolü sonrası enerjilendir.',
  ],
  compatibility: { props: '31mm-7"', motors: '1106-2806', batteries: '1S-6S' },
}

export default function DroneCenter({ selected, mission }) {
  const { isMobile, isTablet } = useViewport()
  const frame = getPart('frames', selected.frame)
  const motor = getPart('motors', selected.motor)
  const prop = getPart('props', selected.prop)
  const battery = getPart('batteries', selected.battery)
  const software = getPart('software', selected.software)

  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState({ x: -8, y: 10 })
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPartType, setSelectedPartType] = useState(null)
  const dragRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 })

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val))
  const zoomLabel = `ZOOM ${Math.round(zoom * 100)}%`

  const detail = useMemo(() => {
    if (selectedPartType === 'frame' && frame) {
      return {
        name: frame.name,
        color: frame.color,
        badges: ['Frame', frame.frameType],
        specs: frame.specs,
        mountingSteps: frame.mountingSteps,
        compatibility: frame.compatibility,
      }
    }
    if (selectedPartType === 'motor' && motor) {
      return {
        name: motor.name,
        color: motor.color,
        badges: ['Motor', `${motor.kv}KV`],
        specs: motor.specs,
        mountingSteps: motor.mountingSteps,
        compatibility: motor.compatibility,
      }
    }
    if (selectedPartType === 'prop' && prop) {
      return {
        name: prop.name,
        color: prop.color,
        badges: ['Pervane', `${prop.propSizeInch}"`],
        specs: prop.specs,
        mountingSteps: prop.mountingSteps,
        compatibility: prop.compatibility,
      }
    }
    if (selectedPartType === 'battery' && battery) {
      return {
        name: battery.name,
        color: battery.color,
        badges: ['Batarya', `${battery.cells}S`],
        specs: battery.specs,
        mountingSteps: battery.mountingSteps,
        compatibility: battery.compatibility,
      }
    }
    if (selectedPartType === 'fc') return FC_DETAILS
    return null
  }, [selectedPartType, frame, motor, prop, battery])
  const panelOpen = !!detail

  const handleSelectPart = (type) => {
    setSelectedPartType((prev) => (prev === type ? null : type))
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const dir = event.deltaY < 0 ? 1 : -1
    setZoom((prev) => clamp(prev + dir * 0.12, 0.5, 3))
  }

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
  }, [isDragging, rotation])

  const parts = [
    { label: 'Frame', part: frame },
    { label: 'Motor', part: motor },
    { label: 'Pervane', part: prop },
    { label: 'Batarya', part: battery },
    { label: 'Yazılım Profili', part: software },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)', overflow: 'hidden' }}>
      {mission && (
        <div style={{ padding: '8px 16px', background: `${mission.color}0f`, borderBottom: `1px solid ${mission.color}28`, display: 'flex', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: mission.color, letterSpacing: 2, marginBottom: 3 }}>{mission.icon} GOREV</div>
            <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, marginBottom: 4 }}>{mission.desc}</div>
          </div>
          <div style={{ background: `${mission.color}18`, border: `1px solid ${mission.color}44`, borderRadius: 8, padding: '6px 14px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: mission.color }}>ODUL</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 700, color: '#f59e0b' }}>⭐ {mission.odul?.puan}</div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
        <div style={{ flex: 1, minHeight: isMobile ? 340 : 0, position: 'relative', overflow: 'hidden' }} onWheel={handleWheel}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'grab',
              perspective: 900,
              userSelect: 'none',
            }}
          >
            <div
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 120ms ease-out',
              }}
            >
              <UnifiedDroneSVG
                frameId={selected.frame}
                frameColor={frame?.color || '#00d4ff'}
                motorColor={motor?.color || '#f59e0b'}
                propColor={prop?.color || '#00d4ff'}
                size={isTablet ? 270 : 300}
                onSelectPart={handleSelectPart}
              />
            </div>
          </div>

          <div style={{ position: 'absolute', left: 12, bottom: 10, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text2)', border: '1px solid var(--border2)', borderRadius: 6, padding: '4px 8px', background: 'rgba(8,12,20,0.8)' }}>
            {zoomLabel}
          </div>
          <div style={{ position: 'absolute', right: 12, bottom: 10, display: 'flex', gap: 6 }}>
            <button onClick={() => setZoom((z) => clamp(z + 0.15, 0.5, 3))} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)', cursor: 'pointer' }}>+</button>
            <button onClick={() => setZoom((z) => clamp(z - 0.15, 0.5, 3))} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)', cursor: 'pointer' }}>−</button>
            <button onClick={() => { setZoom(1); setRotation({ x: -8, y: 10 }) }} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)', cursor: 'pointer' }}>↺</button>
          </div>
        </div>

        <aside
          style={{
            width: isMobile ? '100%' : 280,
            minWidth: isMobile ? 'auto' : 280,
            borderLeft: isMobile ? 'none' : `3px solid ${detail?.color || 'var(--border)'}`,
            borderTop: isMobile ? `3px solid ${detail?.color || 'var(--border)'}` : 'none',
            background: 'var(--bg2)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
            opacity: panelOpen ? 1 : 0,
            pointerEvents: panelOpen ? 'auto' : 'none',
            transition: 'transform 0.25s ease, opacity 0.25s ease',
            marginRight: panelOpen ? 0 : (isMobile ? 0 : -280),
          }}
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
            {detail ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 700, color: detail.color }}>{detail.name}</div>
                  <button
                    onClick={() => setSelectedPartType(null)}
                    style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text2)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
                    title='Kapat'
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  {detail.badges?.map((b) => (
                    <span key={b} style={{ fontFamily: 'var(--mono)', fontSize: 9, color: detail.color, border: `1px solid ${detail.color}66`, borderRadius: 999, padding: '2px 7px' }}>{b}</span>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ color: 'var(--text3)', fontSize: 13 }}>Bir parçaya tıkla</div>
            )}
          </div>

          {detail && (
            <div style={{ overflowY: 'auto', minHeight: 0 }}>
              <section style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1, color: 'var(--text3)', marginBottom: 6 }}>TEKNIK OZELLIKLER</div>
                {Object.entries(detail.specs || {}).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text3)' }}>{k}</span>
                    <span style={{ color: 'var(--text2)', textAlign: 'right' }}>{String(v)}</span>
                  </div>
                ))}
              </section>

              <section style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1, color: 'var(--text3)', marginBottom: 6 }}>MONTAJ / BAGLANTI ADIMLARI</div>
                {(detail.mountingSteps || []).map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', marginBottom: 6 }}>
                    <span style={{ color: detail.color, minWidth: 16 }}>{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </section>

              {(selectedPartType === 'frame' || selectedPartType === 'motor' || selectedPartType === 'fc') && (
                <section style={{ padding: '10px 12px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1, color: 'var(--text3)', marginBottom: 6 }}>UYUMLULUK</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>Pervane: {detail.compatibility?.props || '-'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>Motor: {detail.compatibility?.motors || '-'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>Batarya: {detail.compatibility?.batteries || '-'}</div>
                </section>
              )}
            </div>
          )}
        </aside>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', flexShrink: 0 }}>
        <div style={{ padding: '5px 14px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase' }}>SECILI BILESEN BILGILERI</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(5,1fr)' }}>
          {parts.map(({ label, part }) => <PartInfoCard key={label} label={label} part={part} />)}
        </div>
      </div>

      <style>{`
      `}</style>
    </div>
  )
}
