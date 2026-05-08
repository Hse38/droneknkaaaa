import React from 'react'
import { PARTS } from '../data/parts'
import { UnifiedDroneSVG, MotorSVGByID, PropSVGByID, BatterySVGByID, SoftwareSVGByID } from './svg/DroneSVGsV3'

const BASE_SECTIONS = [
  { key: 'frame', label: 'FRAME', num: 1, total: 6, icon: '🧩', items: PARTS.frames },
  { key: 'motor', label: 'MOTOR', num: 2, total: 11, icon: '⚙️', items: PARTS.motors },
  { key: 'prop', label: 'PERVANE', num: 3, total: 13, icon: '🌀', items: PARTS.props },
  { key: 'battery', label: 'BATARYA', num: 4, total: 9, icon: '🔋', items: PARTS.batteries },
  { key: 'software', label: 'YAZILIM PROFİLİ', num: 5, total: 6, icon: '💻', items: PARTS.software },
]

function PartImage({ sectionKey, part, size = 48 }) {
  const boxStyle = {
    width: size,
    height: size,
    borderRadius: 6,
    background: 'var(--bg4)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  }
  if (sectionKey === 'frame') return <div style={boxStyle}><UnifiedDroneSVG frameId={part.id} frameColor={part.color} propColor={part.color} size={44} /></div>
  if (sectionKey === 'motor') return <div style={boxStyle}><MotorSVGByID motorId={part.id} color={part.color} size={44} /></div>
  if (sectionKey === 'prop') return <div style={boxStyle}><PropSVGByID propId={part.id} color={part.color} size={44} /></div>
  if (sectionKey === 'battery') return <div style={boxStyle}><BatterySVGByID batteryId={part.id} color={part.color} size={44} /></div>
  if (sectionKey === 'software') return <div style={boxStyle}><SoftwareSVGByID softwareId={part.id} color={part.color} size={44} /></div>
  return <div style={boxStyle} />
}

export default function PartSelector({ selected, onSelect }) {
  const safeSelected = selected || {}
  const [openSection, setOpenSection] = React.useState('frame')
  const [queries, setQueries] = React.useState({
    frame: '',
    motor: '',
    prop: '',
    battery: '',
    software: '',
  })

  const selectedFrame = React.useMemo(
    () => PARTS.frames.find((f) => f.id === safeSelected.frame),
    [safeSelected.frame],
  )
  const selectedMap = React.useMemo(() => ({
    frame: PARTS.frames.find((x) => x.id === safeSelected.frame),
    motor: PARTS.motors.find((x) => x.id === safeSelected.motor),
    prop: PARTS.props.find((x) => x.id === safeSelected.prop),
    battery: PARTS.batteries.find((x) => x.id === safeSelected.battery),
    software: PARTS.software.find((x) => x.id === safeSelected.software),
  }), [safeSelected.frame, safeSelected.motor, safeSelected.prop, safeSelected.battery, safeSelected.software])

  React.useEffect(() => {
    const hasSelection = Boolean(
      safeSelected.frame || safeSelected.motor || safeSelected.prop || safeSelected.battery || safeSelected.software,
    )
    if (!hasSelection && !openSection) setOpenSection('frame')
  }, [safeSelected.frame, safeSelected.motor, safeSelected.prop, safeSelected.battery, safeSelected.software, openSection])

  const sections = React.useMemo(() => {
    return BASE_SECTIONS.map((section) => {
      let items = [...section.items]
      if (section.key === 'motor') {
        items.sort((a, b) => (a.kv || 0) - (b.kv || 0))
      }
      const q = (queries[section.key] || '').trim().toLowerCase()
      if (q) {
        items = items.filter((item) => `${item.name} ${item.subtitle} ${item.id}`.toLowerCase().includes(q))
      }
      return { ...section, items }
    })
  }, [queries])

  const highlightStat = (stats = {}) => {
    const entries = Object.entries(stats).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    return entries.find(([, value]) => value !== 0)
  }

  const statLabel = (key) => ({
    hiz: 'Hiz',
    ceviklik: 'Ceviklik',
    kontrol: 'Kontrol',
    stabilite: 'Stabilite',
    ucusSuresi: 'Sure',
    verimlilik: 'Verim',
    dayaniklilik: 'Dayanim',
    sistemRiski: 'Risk',
  }[key] || key)

  const handleToggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  return (
    <div style={{ background: 'rgba(12,16,28,0.65)', backdropFilter: 'blur(12px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 3, color: 'var(--accent)', textTransform: 'uppercase' }}>.. BILESEN SECIMI</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Drone'un parcalarini sec ve tasarimini olustur.</div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: 6 }}>
        {sections.map((section) => (
          <div key={section.key} style={{ borderBottom: '1px solid var(--border)' }}>
            <div
              onClick={() => handleToggleSection(section.key)}
              style={{ padding: '8px 14px 6px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(8,12,22,0.92)', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(16,22,38,0.92)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(8,12,22,0.92)' }}
            >
              <div style={{ fontSize: 13 }}>{section.icon}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: 1 }}>{section.num}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 13, fontWeight: 700, color: selectedMap[section.key] ? '#22c55e' : 'var(--text2)', textTransform: 'uppercase', letterSpacing: 2 }}>
                {section.num} {section.label} ({section.total})
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                {selectedMap[section.key] && (
                  <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'var(--mono)' }}>
                    ✓ seçildi
                  </span>
                )}
                <span style={{ fontSize: 12, color: 'var(--text2)' }}>{openSection === section.key ? '▲' : '▼'}</span>
              </div>
            </div>

            {openSection !== section.key && selectedMap[section.key] && (
              <div style={{ padding: '5px 14px 8px', fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>
                {selectedMap[section.key]?.name} seçildi
              </div>
            )}

            <div style={{ maxHeight: openSection === section.key ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>
                <input
                  value={queries[section.key] || ''}
                  onChange={(e) => setQueries((prev) => ({ ...prev, [section.key]: e.target.value }))}
                  placeholder={`${section.label} ara...`}
                  style={{
                    width: '100%',
                    height: 30,
                    borderRadius: 6,
                    border: '1px solid var(--border2)',
                    background: 'rgba(10,14,24,0.9)',
                    color: 'var(--text)',
                    padding: '0 10px',
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {section.items.map((part) => {
                  const isSel = safeSelected[section.key] === part.id
                  const best = highlightStat(part.stats)
                  const statValue = best?.[1] || 0
                  const statKey = best?.[0]
                  const statColor = statValue > 0 ? '#ef4444' : '#f59e0b'
                  const incompatibleProp = section.key === 'prop'
                    && selectedFrame
                    && (part.propSizeInch || 0) > (selectedFrame.maxPropSize || Number.MAX_SAFE_INTEGER)

                  return (
                    <div
                      key={part.id}
                      onClick={() => {
                        onSelect(section.key, part.id)
                      }}
                      style={{
                        padding: '10px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        minHeight: 78,
                        opacity: 1,
                        background: isSel ? `${part.color}18` : 'transparent',
                        borderLeft: isSel ? `3px solid ${part.color}` : '3px solid transparent',
                        transition: 'all 0.2s',
                        boxShadow: isSel ? `inset 0 0 0 1px ${part.color}33` : 'none',
                      }}
                    >
                      <PartImage sectionKey={section.key} part={part} size={60} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: isSel ? 700 : 500, color: isSel ? 'var(--text)' : 'var(--text2)', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {part.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 3 }}>{part.subtitle}</div>
                        {best && (
                          <div style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ color: statColor, fontFamily: 'var(--mono)' }}>{statValue > 0 ? `+${statValue}` : statValue}</span>
                            <span>{statLabel(statKey)}</span>
                          </div>
                        )}
                        {incompatibleProp && <div style={{ fontSize: 11, color: '#fca5a5', marginTop: 2 }}>Frame max pervane limitini asiyor</div>}
                        {isSel && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--success)', borderRadius: 3, padding: '1px 6px', animation: 'pulse 1.2s ease-in-out infinite' }}>
                            <span style={{ fontSize: 10, color: '#000', fontFamily: 'var(--mono)', fontWeight: 700, letterSpacing: 1 }}>SECILDI</span>
                          </div>
                        )}
                      </div>
                      <div style={{ color: 'var(--text3)', fontSize: 14, flexShrink: 0 }}>›</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
