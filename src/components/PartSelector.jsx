import React from 'react'
import { PARTS } from '../data/parts'

const SECTIONS = [
  { key:'frame',   label:'Frame',          num:1, items: PARTS.frames },
  { key:'motor',   label:'Motor',          num:2, items: PARTS.motors },
  { key:'prop',    label:'Pervane',        num:3, items: PARTS.props },
  { key:'battery', label:'Batarya',        num:4, items: PARTS.batteries },
  { key:'software',label:'Yazılım Profili',num:5, items: PARTS.software },
]

function PartImage({ part, size = 48 }) {
  const [err, setErr] = React.useState(false)
  React.useEffect(() => {
    setErr(false)
  }, [part?.image])

  if (!part.image || err) {
    return (
      <div style={{width:size,height:size,borderRadius:6,background:'var(--bg4)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.45,flexShrink:0}}>
        {part.fallbackEmoji || '⚙️'}
      </div>
    )
  }
  return (
    <img src={part.image} alt={part.name} onError={()=>setErr(true)}
      style={{width:size,height:size,objectFit:'contain',borderRadius:6,background:'var(--bg4)',flexShrink:0}}
    />
  )
}

export default function PartSelector({ selected, onSelect }) {
  const listRef = React.useRef(null)

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0
    }
  }, [])

  const highlightStat = (stats = {}) => {
    const entries = Object.entries(stats).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    return entries.find(([, value]) => value !== 0)
  }

  const statLabel = (key) => ({
    hiz: 'Hız',
    ceviklik: 'Çeviklik',
    kontrol: 'Kontrol',
    stabilite: 'Stabilite',
    ucusSuresi: 'Süre',
    verimlilik: 'Verim',
    dayaniklilik: 'Dayanım',
    sistemRiski: 'Risk',
  }[key] || key)

  return (
    <div style={{background:'rgba(12,16,28,0.65)',backdropFilter:'blur(12px)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',height:'100%',overflow:'hidden'}}>
      {/* Header */}
      <div style={{padding:'12px 14px',borderBottom:'1px solid var(--border)',flexShrink:0}}>
        <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:3,color:'var(--accent)',textTransform:'uppercase'}}>.. BİLEŞEN SEÇİMİ</div>
        <div style={{fontSize:13,color:'var(--text2)',marginTop:2}}>Drone'un parçalarını seç ve tasarımını oluştur.</div>
      </div>

      {/* Sections */}
      <div ref={listRef} style={{flex:1,overflowY:'auto'}}>
        {SECTIONS.map(section => {
          return (
            <div key={section.key} style={{borderBottom:'1px solid var(--border)'}}>
              {/* Section label */}
              <div style={{padding:'8px 14px 6px',display:'flex',alignItems:'center',gap:8,background:'rgba(8,12,22,0.92)',backdropFilter:'blur(8px)',borderBottom:'1px solid var(--border)'}}>
                <div style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--text3)',letterSpacing:1}}>{section.num}</div>
                <div style={{fontFamily:'var(--display)',fontSize:13,fontWeight:700,color:'var(--text2)',textTransform:'uppercase',letterSpacing:2}}>{section.label}</div>
              </div>

              {/* Items */}
              {section.items.map(part => {
                const isSel = selected[section.key] === part.id
                const best = highlightStat(part.stats)
                const statValue = best?.[1] || 0
                const statKey = best?.[0]
                const statColor = statValue > 0 ? '#ef4444' : '#f59e0b'
                return (
                  <div key={part.id} onClick={() => onSelect(section.key, part.id)}
                    style={{
                      padding:'10px 14px', cursor:'pointer', display:'flex', alignItems:'center', gap:10, minHeight:78,
                      background: isSel ? `${part.color}18` : 'transparent',
                      borderLeft: isSel ? `3px solid ${part.color}` : '3px solid transparent',
                      transition:'all 0.2s',
                      boxShadow: isSel ? `inset 0 0 0 1px ${part.color}33` : 'none',
                    }}
                    onMouseEnter={e => { if(!isSel) e.currentTarget.style.background='var(--bg3)' }}
                    onMouseLeave={e => { if(!isSel) e.currentTarget.style.background='transparent' }}
                  >
                    <PartImage part={part} size={60} />
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:'var(--display)',fontSize:14,fontWeight:isSel?700:500,color:isSel?'var(--text)':'var(--text2)',marginBottom:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {part.name}
                      </div>
                      <div style={{fontSize:12,color:'var(--text3)',marginBottom:3}}>{part.subtitle}</div>
                      {best && (
                        <div style={{fontSize:12,color:'var(--text2)',display:'flex',alignItems:'center',gap:5}}>
                          <span style={{color:statColor,fontFamily:'var(--mono)'}}>{statValue > 0 ? `+${statValue}` : statValue}</span>
                          <span>{statLabel(statKey)}</span>
                          <span>{statValue > 0 ? '🔴' : '🟡'}</span>
                        </div>
                      )}
                      {isSel && (
                        <div style={{display:'inline-flex',alignItems:'center',gap:4,background:'var(--success)',borderRadius:3,padding:'1px 6px',animation:'pulse 1.2s ease-in-out infinite'}}>
                          <span style={{fontSize:10,color:'#000',fontFamily:'var(--mono)',fontWeight:700,letterSpacing:1}}>SEÇİLDİ</span>
                        </div>
                      )}
                    </div>
                    <div style={{color:'var(--text3)',fontSize:14,flexShrink:0}}>›</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Save button */}
      <div style={{padding:12,borderTop:'1px solid var(--border)',flexShrink:0}}>
        <button style={{width:'100%',padding:'10px',borderRadius:6,background:'var(--bg4)',border:'1px solid var(--border2)',color:'var(--text2)',fontFamily:'var(--display)',fontSize:14,fontWeight:600,cursor:'pointer',letterSpacing:1}}>
          TASARIMI KAYDET
        </button>
      </div>
    </div>
  )
}
