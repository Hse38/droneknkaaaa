import React from 'react'
import { useViewport } from '../hooks/useViewport'

export default function BottomBar({ compatAlerts, stats, onTestFlight, onReset, allSelected, mission }) {
  const { isMobile } = useViewport()
  const visible = (compatAlerts||[]).filter(a => a.type !== 'info').slice(0,3)
  if (!visible.length && !stats) return null

  const icons = { critical:'🔴', warning:'⚠️', info:'ℹ️' }
  const colors = { critical:'#ef4444', warning:'#f59e0b', info:'#00d4ff' }

  return (
    <div style={{
      gridColumn:'1 / -1',
      display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr',
      borderTop:'1px solid var(--border)', background:'rgba(10,14,24,0.78)', backdropFilter:'blur(10px)',
      maxHeight:isMobile?120:70, minHeight:isMobile?120:70, flexShrink:0, overflow:'hidden',
    }}>
      {/* Left: alerts */}
      <div style={{padding:'6px 14px',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',gap:4,minHeight:0,overflow:'hidden'}}>
        <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:2,color:'var(--text3)',textTransform:'uppercase',marginBottom:2,flexShrink:0}}>SİSTEM UYARILARI</div>
        <div style={{flex:1,minHeight:0,overflowY:'auto',overflowX:'hidden',paddingRight:2}}>
          {visible.length === 0 ? (
            <div style={{fontSize:13,color:'var(--success)',display:'flex',gap:6,alignItems:'center'}}>
              <span>✓</span> Tüm bileşenler uyumlu
            </div>
          ) : visible.map((a,i) => (
            <div key={i} style={{display:'flex',gap:6,alignItems:'flex-start',fontSize:13,color:colors[a.type]||'var(--text2)',marginBottom:i===visible.length-1?0:4}}>
              <span style={{flexShrink:0,fontSize:12}}>{icons[a.type]}</span>
              <span style={{lineHeight:1.4,color:'var(--text2)'}}>{a.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: quick stats */}
      {stats && (
        <div style={{padding:'6px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:isMobile?8:16,flexWrap:isMobile?'wrap':'nowrap',minHeight:0,overflow:'hidden'}}>
          <div style={{display:'flex',alignItems:'center',gap:isMobile?10:20,flexWrap:'nowrap',minWidth:0}}>
            <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:2,color:'var(--text3)',textTransform:'uppercase',marginRight:4,whiteSpace:'nowrap'}}>HIZLI ÖZET</div>
            {[
              {l:'Hız',v:`${stats.maxHiz} km/s`},
              {l:'Süre',v:`${stats.ucusDakika} dk`},
              {l:'Ağırlık',v:`${stats.agirlik} g`},
              {l:'İtiş/Ağırlık',v:`${stats.itisOrani}:1`},
            ].map(item => (
              <div key={item.l} style={{textAlign:'center',whiteSpace:'nowrap'}}>
                <div style={{fontFamily:'var(--mono)',fontSize:10,color:'var(--text3)'}}>{item.l}</div>
                <div style={{fontFamily:'var(--display)',fontSize:16,fontWeight:700,color:'var(--text)'}}>{item.v}</div>
              </div>
            ))}
          </div>

          <div style={{display:'flex',alignItems:'center',gap:6,marginLeft:isMobile?0:'auto',width:isMobile?'100%':'auto'}}>
            <button
              onClick={onTestFlight}
              disabled={!allSelected}
              style={{
                flex:isMobile?1:'none',
                minWidth:isMobile?0:180,
                padding:isMobile?'8px 10px':'9px 12px',
                borderRadius:8,
                cursor:allSelected?'pointer':'not-allowed',
                background: allSelected ? (mission?.color||'#22c55e') : 'var(--bg4)',
                border:'none',
                color: allSelected ? '#000' : 'var(--text3)',
                fontFamily:'var(--display)',
                fontSize:isMobile?12:13,
                fontWeight:700,
                letterSpacing:1,
                textTransform:'uppercase',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:6,
                boxShadow: allSelected ? `0 0 16px ${mission?.color||'#22c55e'}44` : 'none',
              }}
            >
              <span style={{fontSize:13}}>▶</span>
              TEST UÇUŞU
            </button>
            <button
              onClick={onReset}
              style={{
                flex:isMobile?1:'none',
                minWidth:isMobile?0:138,
                padding:isMobile?'8px 10px':'9px 12px',
                borderRadius:8,
                background:'transparent',
                border:'1px solid var(--border2)',
                color:'var(--text2)',
                fontFamily:'var(--display)',
                fontSize:isMobile?12:13,
                fontWeight:600,
                cursor:'pointer',
                letterSpacing:1,
                textTransform:'uppercase',
              }}
            >
              ↺ SIFIRLA
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
