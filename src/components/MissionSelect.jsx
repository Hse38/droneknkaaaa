import React from 'react'
import { MISSIONS } from '../data/missions'
import { useViewport } from '../hooks/useViewport'

export default function MissionSelect({ view = 'mode', onSelect, onFreeBuild, onChallengeMode, onBack, scores }) {
  const { isMobile, isTablet } = useViewport()
  const modeCardMin = isMobile ? 280 : 360
  const isModeView = view === 'mode'

  return (
    <div style={{
      height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'#060810', padding:isMobile?'22px 14px 14px':isTablet?'30px 24px 18px':'44px 40px 26px', gap:isMobile?16:28, position:'relative', overflow:isModeView?'auto':'hidden',
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
        <h1 style={{fontFamily:'var(--display)',fontSize:isMobile?34:52,fontWeight:700,letterSpacing:2,color:'var(--text)',lineHeight:1}}>
          {isModeView ? 'MOD SEÇİMİ' : 'CHALLENGE GÖREVLERİ'}
        </h1>
        <p style={{color:'var(--text2)',fontSize:isMobile?15:17,marginTop:8}}>
          {isModeView ? 'Önce oyun modunu seç.' : 'Hangi challenge görevini oynayacağını seç.'}
        </p>
      </div>

      <div style={{width:'100%',maxWidth:1240,zIndex:1}}>
        {isModeView ? (
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:isMobile?'wrap':'nowrap'}}>
            <div
              onClick={onChallengeMode}
              style={{
                border:'1px solid rgba(0,212,255,0.42)',borderRadius:16,background:'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                padding:22,minHeight:290,display:'flex',flexDirection:'column',justifyContent:'space-between',minWidth:modeCardMin,maxWidth:440,cursor:'pointer',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-7px)'; e.currentTarget.style.boxShadow='0 18px 36px rgba(0,212,255,0.24)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{height:7,background:'linear-gradient(90deg, #00d4ff, transparent)',margin:'-22px -22px 16px',borderTopLeftRadius:16,borderTopRightRadius:16}} />
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                  <div style={{fontSize:32}}>⚡</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:12,color:'#7dd3fc',letterSpacing:2}}>MODE</div>
                </div>
                <div style={{fontFamily:'var(--display)',fontSize:28,fontWeight:700,lineHeight:1.05}}>CHALLENGE</div>
                <div style={{marginTop:8,color:'var(--text2)',lineHeight:1.6,fontSize:16}}>Görev seçip hedeflere göre drone tasarla, puan topla ve yıldız kazan.</div>
              </div>
              <button style={{marginTop:20,padding:'12px 16px',borderRadius:10,border:'none',background:'#00d4ff',color:'#001018',fontFamily:'var(--display)',fontSize:16,fontWeight:700,cursor:'pointer'}}>
                GÖREV SEÇ
              </button>
            </div>
            <div
              onClick={onFreeBuild}
              style={{
                border:'1px solid rgba(168,85,247,0.4)',borderRadius:16,background:'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)), linear-gradient(135deg, rgba(99,102,241,0.22), rgba(168,85,247,0.12))',
                padding:22,minHeight:290,display:'flex',flexDirection:'column',justifyContent:'space-between',minWidth:modeCardMin,maxWidth:440,cursor:'pointer',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-7px)'; e.currentTarget.style.boxShadow='0 18px 36px rgba(168,85,247,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{height:7,background:'linear-gradient(90deg, #a855f7, transparent)',margin:'-22px -22px 16px',borderTopLeftRadius:16,borderTopRightRadius:16}} />
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                  <div style={{fontSize:32}}>🔓</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:12,color:'#d8b4fe',letterSpacing:2}}>MODE</div>
                </div>
                <div style={{fontFamily:'var(--display)',fontSize:28,fontWeight:700,lineHeight:1.05}}>FREE BUILD</div>
                <div style={{marginTop:8,color:'var(--text2)',lineHeight:1.6,fontSize:16}}>Görev baskısı olmadan parçaları birleştir, sistem karakterini canlı analiz et ve en iyi hibrit kombinasyonu keşfet.</div>
              </div>
              <button style={{marginTop:20,padding:'12px 16px',borderRadius:10,border:'none',background:'#a855f7',color:'#fff',fontFamily:'var(--display)',fontSize:16,fontWeight:700,cursor:'pointer',boxShadow:'0 0 22px rgba(168,85,247,0.35)'}}>
                BAŞLA
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:10,flexWrap:'wrap'}}>
              <div>
                <div style={{fontFamily:'var(--display)',fontSize:24,fontWeight:700,marginBottom:4,color:'var(--accent)'}}>CHALLENGE MODE</div>
                <div style={{fontSize:15,color:'var(--text2)'}}>Bir görevi seç ve hedefe uygun build kur.</div>
              </div>
              <button onClick={onBack} style={{padding:'10px 14px',borderRadius:9,border:'1px solid var(--border2)',background:'var(--bg3)',color:'var(--text2)',fontFamily:'var(--display)',fontSize:14,fontWeight:600,cursor:'pointer'}}>
                ← MODLARA DÖN
              </button>
            </div>
            <div
              style={{
                display:'grid',
                gridTemplateColumns:isMobile ? '1fr' : isTablet ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
                gap:12,
                width:'100%',
                overflowX:'hidden',
              }}
            >
        {MISSIONS.map((m,i) => {
          const prev = scores?.[m.id]
          return (
            <div key={m.id} onClick={() => onSelect(m)}
              style={{
                background:'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                border:`1px solid ${m.color}3d`, borderRadius:16, backdropFilter:'blur(11px)',
                padding:0, cursor:'pointer', position:'relative', overflow:'hidden', width:'100%', height:'100%', display:'flex', flexDirection:'column',
                transition:'all 0.22s', animation:`fadeIn 0.45s ease ${i*0.09}s both`,
              }}
              onMouseEnter={e => { e.currentTarget.style.border=`1px solid ${m.color}85`; e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow=`0 20px 44px ${m.color}33` }}
              onMouseLeave={e => { e.currentTarget.style.border=`1px solid ${m.color}33`; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{height:7,background:`linear-gradient(90deg, ${m.color}, transparent)`}} />
              <div style={{padding:'18px 18px 16px',display:'flex',flexDirection:'column',flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                  <div style={{fontSize:32}}>{m.icon}</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:12,color:m.color,letterSpacing:2}}>GÖREV {i+1}</div>
                </div>
                <div style={{fontFamily:'var(--display)',fontSize:24,fontWeight:700,color:'var(--text)',marginBottom:6,lineHeight:1}}>{m.title}</div>
                <div style={{fontSize:15,color:'var(--text2)',lineHeight:1.6,marginBottom:12,minHeight:60}}>{m.desc}</div>
                <div style={{display:'flex',flexDirection:'column',gap:5,marginBottom:12}}>
                {m.hedefler.slice(0,3).map((h,j) => (
                  <div key={j} style={{display:'flex',alignItems:'center',gap:7,fontSize:14,color:'var(--text2)'}}>
                    <span style={{color:m.color,fontWeight:700}}>✓</span>{h}
                  </div>
                ))}
                </div>
                <div style={{display:'flex',gap:12,alignItems:'center',marginTop:'auto'}}>
                  <span style={{fontFamily:'var(--mono)',fontSize:12,color:'#f59e0b'}}>⭐ {m.odul.puan}</span>
                  <span style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--accent)'}}>XP {m.odul.xp}</span>
                  <span style={{marginLeft:'auto',fontSize:12,padding:'3px 9px',borderRadius:999,border:`1px solid ${m.color}66`,color:m.color,background:`${m.color}1a`}}>ÖDÜL</span>
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
          </>
        )}
      </div>
      <div style={{zIndex:1,fontFamily:'var(--mono)',fontSize:12,color:'var(--text3)',letterSpacing:2,marginTop:6}}>DRONEFORGE EDU v2.0</div>
    </div>
  )
}
