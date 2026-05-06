import React from 'react'

export default function BottomBar({ compatAlerts, stats }) {
  const visible = (compatAlerts||[]).filter(a => a.type !== 'info').slice(0,3)
  if (!visible.length && !stats) return null

  const icons = { critical:'🔴', warning:'⚠️', info:'ℹ️' }
  const colors = { critical:'#ef4444', warning:'#f59e0b', info:'#00d4ff' }

  return (
    <div style={{
      gridColumn:'1 / -1',
      display:'grid', gridTemplateColumns:'1fr 1fr',
      borderTop:'1px solid var(--border)', background:'rgba(10,14,24,0.78)', backdropFilter:'blur(10px)',
      maxHeight:70, flexShrink:0,
    }}>
      {/* Left: alerts */}
      <div style={{padding:'6px 14px',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',gap:4,justifyContent:'center'}}>
        <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',textTransform:'uppercase',marginBottom:2}}>SİSTEM UYARILARI</div>
        {visible.length === 0 ? (
          <div style={{fontSize:11,color:'var(--success)',display:'flex',gap:6,alignItems:'center'}}>
            <span>✓</span> Tüm bileşenler uyumlu
          </div>
        ) : visible.map((a,i) => (
          <div key={i} style={{display:'flex',gap:6,alignItems:'flex-start',fontSize:11,color:colors[a.type]||'var(--text2)'}}>
            <span style={{flexShrink:0,fontSize:10}}>{icons[a.type]}</span>
            <span style={{lineHeight:1.4,color:'var(--text2)'}}>{a.msg}</span>
          </div>
        ))}
      </div>

      {/* Right: quick stats */}
      {stats && (
        <div style={{padding:'6px 14px',display:'flex',alignItems:'center',gap:20}}>
          <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',textTransform:'uppercase',marginRight:4}}>HIZLI ÖZET</div>
          {[
            {l:'Hız',v:`${stats.maxHiz} km/s`},
            {l:'Süre',v:`${stats.ucusDakika} dk`},
            {l:'Ağırlık',v:`${stats.agirlik} g`},
            {l:'İtiş/Ağırlık',v:`${stats.itisOrani}:1`},
          ].map(item => (
            <div key={item.l} style={{textAlign:'center'}}>
              <div style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--text3)'}}>{item.l}</div>
              <div style={{fontFamily:'var(--display)',fontSize:15,fontWeight:700,color:'var(--text)'}}>{item.v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
