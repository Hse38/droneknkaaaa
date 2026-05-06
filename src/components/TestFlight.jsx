import React, { useEffect, useState } from 'react'
import { scoreBuild } from '../engine/scorer'
import { getPart } from '../data/parts'

function FlightAnim({ mission, stats, selected, onDone }) {
  const [msg, setMsg] = useState('Hazırlanıyor...')
  const [y, setY] = useState(0)
  const [x, setX] = useState(0)
  const [rot, setRot] = useState(0)
  const [tiltX, setTiltX] = useState(0)
  const unstable = stats.sistemRiski > 75
  const frame = getPart('frames', selected?.frame)

  useEffect(() => {
    const tl = mission.id === 'freestyle' ? [
      [0,    ()=>{ setMsg('⚡ Hızlı kalkış!') }],
      [600,  ()=>{ setY(-80); setMsg('Yükseliyor...') }],
      [1200, ()=>{ setRot(360); setMsg('🔄 FLIP!') }],
      [1800, ()=>{ setX(60); setY(-60); setTiltX(360); setMsg('Roll manevra!') }],
      [2400, ()=>{ setX(-40); setRot(720) }],
      [3200, ()=>{ setY(0); setX(0); setMsg('✓ Başarılı iniş') }],
      [4000, ()=> onDone()],
    ] : mission.id === 'cinematic' ? [
      [0,    ()=>setMsg('🎬 Yumuşak kalkış...')],
      [800,  ()=>{ setY(-60); setMsg('Yavaş tırmanış...') }],
      [1800, ()=>{ setX(30); setMsg('Akıcı hareket...') }],
      [2800, ()=>{ setX(0); setY(-40); setRot(8); setMsg('Stabil hover ✓') }],
      [3800, ()=>{ setY(0); setMsg('Pürüzsüz iniş...') }],
      [4800, ()=> onDone()],
    ] : mission.id === 'longrange' || mission.id === 'rescue' ? [
      [0,    ()=>setMsg('🗺️ Sakin kalkış...')],
      [1000, ()=>{ setY(-50); setMsg('Verimli yükseklik...') }],
      [2200, ()=>{ setX(110); setMsg('Uzun menzil seyri...') }],
      [3400, ()=>{ setX(0); setMsg('Geri dönüş...') }],
      [4400, ()=>{ setY(0); setMsg('Ekonomik iniş ✓') }],
      [5200, ()=> onDone()],
    ] : [
      [0,    ()=>setMsg('🎓 Yavaş kalkış...')],
      [800,  ()=>{ setY(-50); setMsg('Stabil hover...') }],
      [2200, ()=>setMsg('Kontrollü manevra...')],
      [3400, ()=>{ setY(0); setMsg('Güvenli iniş ✓') }],
      [4200, ()=> onDone()],
    ]

    if (unstable) {
      const t = [
        [0,   ()=>setMsg('⚠️ Sistem riski yüksek...')],
        [800, ()=>setMsg('Titreşim tespit edildi!')],
        [1600,()=>{ setY(-30); setMsg('Dengesiz kalkış!') }],
        [2400,()=>onDone()],
      ]
      const timers = t.map(([d,fn]) => setTimeout(fn,d))
      return () => timers.forEach(clearTimeout)
    }

    const timers = tl.map(([d,fn]) => setTimeout(fn,d))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{height:'100vh',background:mission.bgGradient,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:32,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none'}}/>
      <div style={{fontFamily:'var(--mono)',fontSize:11,color:mission.color,letterSpacing:3,textTransform:'uppercase'}}>TEST UÇUŞU — {mission.title.toUpperCase()}</div>
      <div style={{
        width:200,height:200,transition: mission.id==='freestyle'?'transform 0.5s cubic-bezier(0.4,0,0.2,1)':'transform 0.8s ease',
        transform:`translate(${x}px,${y}px) rotate(${rot}deg) rotateX(${tiltX}deg)`,
        filter:`drop-shadow(0 0 24px ${mission.color})`,
        animation: unstable ? 'shake 0.1s infinite' : undefined,
      }}>
        {frame?.image
          ? <img src={frame.image} alt={frame.name} style={{width:'100%',height:'100%',objectFit:'contain'}} />
          : <div style={{fontSize:72}}>🚁</div>}
      </div>
      <div style={{fontFamily:'var(--display)',fontSize:20,fontWeight:600,color:'var(--text)',minHeight:32}}>{msg}</div>
      <div style={{width:280,height:3,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
        <div style={{height:'100%',background:mission.color,borderRadius:2,animation:'progressFill 4.5s linear forwards'}}/>
      </div>
      <style>{`@keyframes progressFill{from{width:0%}to{width:100%}}`}</style>
    </div>
  )
}

function ResultScreen({ mission, result, selected, onRetry, onMissions }) {
  const parts = [
    {l:'Frame',   g:'frames',   id:selected.frame},
    {l:'Motor',   g:'motors',   id:selected.motor},
    {l:'Pervane', g:'props',    id:selected.prop},
    {l:'Batarya', g:'batteries',id:selected.battery},
    {l:'Yazılım', g:'software', id:selected.software},
  ].map(p => ({...p, part:getPart(p.g, p.id)}))

  const scoreColor = result.total>=85?'var(--success)':result.total>=65?'#f59e0b':'var(--danger)'
  const [displayScore, setDisplayScore] = useState(0)
  const [visibleStars, setVisibleStars] = useState(0)
  const [animateBars, setAnimateBars] = useState(false)

  useEffect(() => {
    let raf = null
    let start = null
    const duration = 1500
    const animate = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      setDisplayScore(Math.round(result.total * p))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const starTimers = [0, 1, 2].map((i) => setTimeout(() => setVisibleStars(s => Math.max(s, i + 1)), 300 + (i * 300)))
    const barTimer = setTimeout(() => setAnimateBars(true), 1000)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      starTimers.forEach(clearTimeout)
      clearTimeout(barTimer)
    }
  }, [result.total])

  return (
    <div style={{height:'100vh',background:mission.bgGradient,display:'flex',alignItems:'center',justifyContent:'center',padding:40,overflow:'auto'}}>
      <div style={{width:'100%',maxWidth:860,display:'flex',flexDirection:'column',gap:18}}>
        <div style={{textAlign:'center',animation:'fadeIn 0.5s ease'}}>
          <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:3,color:mission.color,marginBottom:6}}>GÖREV TAMAMLANDI</div>
          <div style={{fontFamily:'var(--display)',fontSize:88,fontWeight:900,lineHeight:1,color:scoreColor}}>{displayScore}</div>
          <div style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--text2)'}}>/100 PUAN</div>
          <div style={{fontSize:28,marginTop:6}}>
            {'⭐'.repeat(Math.min(result.stars, visibleStars))}
            {'☆'.repeat(Math.max(0, 3 - Math.min(result.stars, visibleStars)))}
          </div>
        </div>
        <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:18,border:`1px solid ${mission.color}44`,textAlign:'center',fontSize:14,color:mission.color,lineHeight:1.7,animation:'fadeIn 0.6s ease 0.2s both'}}>
          {result.text}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          <div style={{background:'var(--bg3)',borderRadius:10,padding:16,border:'1px solid var(--border)',animation:'fadeIn 0.6s ease 0.3s both'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',marginBottom:10}}>PUAN DAĞILIMI</div>
            {[{l:'Göreve Uygunluk',v:result.breakdown.gorev,m:40},{l:'Bileşen Uyumluluğu',v:result.breakdown.uyum,m:25},{l:'Performans Dengesi',v:result.breakdown.denge,m:20},{l:'Sistem Riski',v:result.breakdown.risk,m:15}].map(b => (
              <div key={b.l} style={{marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:2,fontSize:12}}>
                  <span style={{color:'var(--text2)'}}>{b.l}</span>
                  <span style={{fontFamily:'var(--mono)',color:'var(--text)'}}>{b.v}/{b.m}</span>
                </div>
                <div style={{height:4,background:'var(--bg4)',borderRadius:2}}>
                  <div style={{height:'100%',width:animateBars ? `${(b.v/b.m)*100}%` : '0%',background:mission.color,borderRadius:2,transition:'width 1s ease'}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'var(--bg3)',borderRadius:10,padding:16,border:'1px solid var(--border)',animation:'fadeIn 0.6s ease 0.4s both'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text3)',marginBottom:10}}>SEÇİLEN BİLEŞENLER</div>
            {parts.map(p => (
              <div key={p.l} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                <span style={{color:'var(--text3)'}}>{p.l}</span>
                <span style={{color:p.part?.color||'var(--text)'}}>{p.part?.icon} {p.part?.name||'—'}</span>
              </div>
            ))}
          </div>
        </div>
        {result.ogrenmeNotlari?.length > 0 && (
          <div style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:14,border:'1px solid var(--border)',animation:'fadeIn 0.6s ease 0.45s both'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:2,color:'var(--accent)',marginBottom:8}}>📚 ÖĞRENME NOTLARI</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {result.ogrenmeNotlari.slice(0, 3).map((note, i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'var(--text2)',lineHeight:1.5}}>
                  <span style={{color:mission.color}}>•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{display:'flex',gap:12,justifyContent:'center',animation:'fadeIn 0.6s ease 0.5s both'}}>
          <button onClick={onRetry} style={{padding:'12px 28px',borderRadius:8,cursor:'pointer',background:'transparent',border:`1px solid ${mission.color}`,color:mission.color,fontFamily:'var(--mono)',fontSize:11,letterSpacing:1,textTransform:'uppercase'}}>
            [ TEKRAR TASARLA ]
          </button>
          <button onClick={onMissions} style={{padding:'12px 28px',borderRadius:8,cursor:'pointer',background:mission.color,border:'none',color:'#000',fontFamily:'var(--mono)',fontSize:11,letterSpacing:1,textTransform:'uppercase',fontWeight:700}}>
            [ GÖREV SEÇİMİ ]
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TestFlight({ mission, stats, selected, compatAlerts, onRetry, onMissions }) {
  const [phase, setPhase] = useState('flying')
  const result = scoreBuild(mission, stats, compatAlerts)
  return phase === 'flying'
    ? <FlightAnim mission={mission} stats={stats} selected={selected} onDone={()=>setPhase('result')}/>
    : <ResultScreen mission={mission} result={result} selected={selected} onRetry={onRetry} onMissions={onMissions}/>
}
