import React, { useRef, useEffect } from 'react'
import { STAT_KEYS, STAT_DISPLAY, STAT_ICONS, STAT_COLORS } from '../engine/statEngine'
import { getCompatStatus } from '../engine/compat'

function RadarChart({ stats, size=160 }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')
    const cx = size/2, cy = size/2, r = size*0.36
    const keys = ['hiz','ceviklik','kontrol','stabilite','ucusSuresi','verimlilik']
    const n = keys.length
    ctx.clearRect(0,0,size,size)
    for (let ring=1;ring<=4;ring++) {
      const rr = r*ring/4
      ctx.beginPath()
      for (let i=0;i<n;i++) { const a=(i/n)*Math.PI*2-Math.PI/2; i===0?ctx.moveTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)):ctx.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)) }
      ctx.closePath(); ctx.strokeStyle='rgba(42,58,90,0.7)'; ctx.lineWidth=1; ctx.stroke()
    }
    for (let i=0;i<n;i++) { const a=(i/n)*Math.PI*2-Math.PI/2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a)); ctx.strokeStyle='rgba(42,58,90,0.8)'; ctx.lineWidth=1; ctx.stroke() }
    const pts = keys.map((k,i) => { const a=(i/n)*Math.PI*2-Math.PI/2; const v=(stats[k]||0)/100; return {x:cx+r*v*Math.cos(a),y:cy+r*v*Math.sin(a)} })
    ctx.beginPath(); pts.forEach((p,i) => i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.closePath()
    ctx.fillStyle='rgba(0,212,255,0.1)'; ctx.fill(); ctx.strokeStyle='#00d4ff'; ctx.lineWidth=2; ctx.stroke()
    const labels = ['HIZ','ÇEVİKLİK','KONTROL','STABİLİTE','UÇUŞ SÜRESİ','VERİMLİLİK']
    ctx.font=`${size*0.055}px 'Share Tech Mono',monospace`; ctx.textAlign='center'
    keys.forEach((k,i) => { const a=(i/n)*Math.PI*2-Math.PI/2; const lr=r+14; ctx.fillStyle=STAT_COLORS[k]||'#8892aa'; ctx.fillText(labels[i],cx+lr*Math.cos(a),cy+lr*Math.sin(a)+4) })
  },[stats,size])
  return <canvas ref={ref} width={size} height={size}/>
}

export default function StatPanel({ stats, compatAlerts, mission, onTestFlight, onReset, allSelected }) {
  if (!stats) return null
  const compatStatus = getCompatStatus(compatAlerts||[])
  const warnings = (compatAlerts||[]).filter(a=>a.type!=='info')

  return (
    <div style={{background:'rgba(12,16,28,0.65)',backdropFilter:'blur(12px)',borderLeft:'1px solid var(--border)',display:'flex',flexDirection:'column',height:'100%',overflow:'hidden'}}>
      {/* Title */}
      <div style={{padding:'10px 14px',borderBottom:'1px solid var(--border)',flexShrink:0}}>
        <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:3,color:'var(--text3)',textTransform:'uppercase'}}>PERFORMANS GÖSTERGELERİ</div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'12px 14px',display:'flex',flexDirection:'column',gap:8}}>
        {/* Stat bars */}
        {STAT_KEYS.map(k => {
          const val = stats[k]||0
          const color = k==='sistemRiski' ? (val>70?'#ef4444':val>45?'#f59e0b':'#22c55e') : STAT_COLORS[k]
          return (
            <div key={k}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}}>
                <div style={{display:'flex',alignItems:'center',gap:5}}>
                  <span style={{fontSize:10}}>{STAT_ICONS[k]}</span>
                  <span style={{fontFamily:'var(--mono)',fontSize:9,color:'var(--text2)',letterSpacing:0.5,textTransform:'uppercase'}}>{STAT_DISPLAY[k]}</span>
                </div>
                <span style={{fontFamily:'var(--mono)',fontSize:11,fontWeight:700,color}}>{val} <span style={{color:'var(--text3)',fontWeight:400,fontSize:9}}>/100</span></span>
              </div>
              <div style={{height:5,background:'var(--bg4)',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${val}%`,background:color,borderRadius:3,transition:'width 0.4s ease',boxShadow:`0 0 6px ${color}66`}}/>
              </div>
            </div>
          )
        })}

        {/* Compat status */}
        <div style={{padding:'8px 10px',borderRadius:6,background:`${compatStatus.color}0f`,border:`1px solid ${compatStatus.color}33`,marginTop:4}}>
          <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',marginBottom:4,textTransform:'uppercase'}}>SİSTEM UYUMLULUĞU</div>
          <div style={{display:'flex',alignItems:'flex-start',gap:6}}>
            <span style={{color:compatStatus.color,fontSize:12,flexShrink:0}}>{compatStatus.ok?'✓':'⚠'}</span>
            <span style={{fontSize:10,color:compatStatus.color,lineHeight:1.5}}>{compatStatus.label}</span>
          </div>
        </div>

        {/* Radar */}
        <div style={{display:'flex',justifyContent:'center',padding:'4px 0'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',marginBottom:6,textTransform:'uppercase'}}>PERFORMANS ÖZETİ</div>
            <RadarChart stats={stats} size={155}/>
          </div>
        </div>

        {/* Tahmini values */}
        <div style={{background:'var(--bg3)',borderRadius:6,padding:'10px 12px',border:'1px solid var(--border)'}}>
          <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',marginBottom:8,textTransform:'uppercase'}}>TAHMİNİ DEĞERLER</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[
              {label:'Maks. Hız', value:`${stats.maxHiz} km/s`, icon:'⚡'},
              {label:'Tahm. Uçuş Süresi', value:`${String(Math.floor(stats.ucusDakika/60)).padStart(2,'0')}:${String(stats.ucusDakika%60).padStart(2,'0')} dk`, icon:'⏱️'},
              {label:'Ağırlık', value:`${stats.agirlik} g`, icon:'⚖️'},
              {label:'İtiş / Ağırlık Oranı', value:`${stats.itisOrani} : 1`, icon:'🚀'},
            ].map(item => (
              <div key={item.label}>
                <div style={{fontSize:9,color:'var(--text3)',marginBottom:2}}>{item.icon} {item.label}</div>
                <div style={{fontFamily:'var(--display)',fontSize:18,fontWeight:700,color:'var(--text)'}}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{padding:10,borderTop:'1px solid var(--border)',flexShrink:0,display:'flex',flexDirection:'column',gap:6}}>
        <button onClick={onTestFlight} disabled={!allSelected}
          style={{
            width:'100%', padding:'12px', borderRadius:8, cursor:allSelected?'pointer':'not-allowed',
            background: allSelected ? (mission?.color||'#22c55e') : 'var(--bg4)',
            border:'none', color: allSelected ? '#000' : 'var(--text3)',
            fontFamily:'var(--display)', fontSize:14, fontWeight:700,
            letterSpacing:1, textTransform:'uppercase', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow: allSelected ? `0 0 20px ${mission?.color||'#22c55e'}44` : 'none',
            transition:'all 0.2s',
          }}
        >
          <span style={{fontSize:16}}>▶</span>
          TEST UÇUŞUNA GÖNDER
        </button>
        <button onClick={onReset} style={{width:'100%',padding:'8px',borderRadius:6,background:'transparent',border:'1px solid var(--border2)',color:'var(--text2)',fontFamily:'var(--display)',fontSize:11,fontWeight:600,cursor:'pointer',letterSpacing:1,textTransform:'uppercase'}}>
          ↺ TASARIMI SIFIRLA
        </button>
      </div>
    </div>
  )
}
