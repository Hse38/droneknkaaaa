import React from 'react'
import { MISSIONS } from '../data/missions'

export default function MissionSelect({ onSelect, scores }) {
  return (
    <div style={{
      height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'#060810', padding:'44px 40px 26px', gap:28, position:'relative', overflow:'hidden',
    }}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)',backgroundSize:'46px 46px',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 18% 12%, rgba(0,212,255,0.10), transparent 32%), radial-gradient(circle at 84% 84%, rgba(124,58,237,0.10), transparent 30%)',pointerEvents:'none'}} />

      {/* Logo */}
      <div style={{textAlign:'center',zIndex:1,animation:'fadeIn 0.45s ease'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,justifyContent:'center',marginBottom:10}}>
          <div style={{width:54,height:54,borderRadius:'50%',background:'rgba(0,212,255,0.14)',border:'1px solid rgba(0,212,255,0.38)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,boxShadow:'0 0 22px rgba(0,212,255,0.24)'}}>🚁</div>
          <div>
            <div style={{fontFamily:'var(--display)',fontSize:24,fontWeight:700,letterSpacing:4,color:'var(--accent)',textTransform:'uppercase',lineHeight:1}}>FPV DRONE</div>
            <div style={{fontFamily:'var(--mono)',fontSize:12,letterSpacing:3,color:'var(--text2)',textTransform:'uppercase',marginTop:4}}>PARAMETRİK TASARIM</div>
          </div>
        </div>
        <h1 style={{fontFamily:'var(--display)',fontSize:52,fontWeight:700,letterSpacing:2,color:'var(--text)',lineHeight:1}}>GÖREV SEÇİMİ</h1>
        <p style={{color:'var(--text2)',fontSize:15,marginTop:8}}>Göreve uygun drone tasarla, test et ve ödülleri topla.</p>
      </div>

      {/* Mission grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(300px, 420px))',gap:18,width:'100%',maxWidth:900,justifyContent:'center',zIndex:1}}>
        {MISSIONS.map((m,i) => {
          const prev = scores?.[m.id]
          return (
            <div key={m.id} onClick={() => onSelect(m)}
              style={{
                background:'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                border:`1px solid ${m.color}3d`, borderRadius:16, backdropFilter:'blur(11px)',
                padding:0, cursor:'pointer', position:'relative', overflow:'hidden',
                transition:'all 0.22s', animation:`fadeIn 0.45s ease ${i*0.09}s both`,
              }}
              onMouseEnter={e => { e.currentTarget.style.border=`1px solid ${m.color}85`; e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow=`0 20px 44px ${m.color}33` }}
              onMouseLeave={e => { e.currentTarget.style.border=`1px solid ${m.color}33`; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{height:7,background:`linear-gradient(90deg, ${m.color}, transparent)`}} />
              <div style={{padding:'18px 18px 16px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                  <div style={{fontSize:32}}>{m.icon}</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:10,color:m.color,letterSpacing:2}}>GÖREV {i+1}</div>
                </div>
                <div style={{fontFamily:'var(--display)',fontSize:24,fontWeight:700,color:'var(--text)',marginBottom:6,lineHeight:1}}>{m.title}</div>
                <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.6,marginBottom:12,minHeight:60}}>{m.desc}</div>
                <div style={{display:'flex',flexDirection:'column',gap:5,marginBottom:12}}>
                {m.hedefler.slice(0,3).map((h,j) => (
                  <div key={j} style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:'var(--text2)'}}>
                    <span style={{color:m.color,fontWeight:700}}>✓</span>{h}
                  </div>
                ))}
                </div>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <span style={{fontFamily:'var(--mono)',fontSize:11,color:'#f59e0b'}}>⭐ {m.odul.puan}</span>
                  <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)'}}>XP {m.odul.xp}</span>
                  <span style={{marginLeft:'auto',fontSize:11,padding:'3px 9px',borderRadius:999,border:`1px solid ${m.color}66`,color:m.color,background:`${m.color}1a`}}>ÖDÜL</span>
                </div>
              </div>
              {prev && (
                <div style={{position:'absolute',top:12,right:12,background:`${prev.total>=85?'#22c55e':'#f59e0b'}22`,border:`1px solid ${prev.total>=85?'#22c55e':'#f59e0b'}44`,borderRadius:6,padding:'3px 8px',fontFamily:'var(--mono)',fontSize:10,color:prev.total>=85?'#22c55e':'#f59e0b'}}>
                  {'⭐'.repeat(prev.stars)} {prev.total}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{zIndex:1,fontFamily:'var(--mono)',fontSize:10,color:'var(--text3)',letterSpacing:2,marginTop:6}}>DRONEFORGE EDU v2.0</div>
    </div>
  )
}
