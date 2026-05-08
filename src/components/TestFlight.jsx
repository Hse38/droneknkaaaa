import React, { useEffect, useState } from 'react'
import { scoreBuild } from '../engine/scorer'
import { getPart } from '../data/parts'
import { analyzeArchetype } from '../engine/archetypeEngine'
import BuildReport from './BuildReport'

function FlightAnim({ mission, stats, selected, onDone }) {
  const [msg, setMsg] = useState('Hazırlanıyor...')
  const [y, setY] = useState(0)
  const [x, setX] = useState(0)
  const [rot, setRot] = useState(0)
  const [tiltX, setTiltX] = useState(0)
  const unstable = stats.sistemRiski > 75
  const frame = getPart('frames', selected?.frame)
  const primary = analyzeArchetype(stats).primary?.name

  useEffect(() => {
    const tl = primary === 'Tinywhoop' ? [
      [0, ()=> setMsg('🫧 Stabil hover başlatılıyor...')],
      [900, ()=> { setY(-26); setX(8); setMsg('Yavaş mikro manevra') }],
      [1800, ()=> { setX(-8); setY(-20); setMsg('Kontrollü indoor geçiş') }],
      [2700, ()=> { setY(-10); setX(0); setMsg('Yüksek kontrol seviyesi') }],
      [3600, ()=> { setY(0); setMsg('✓ Güvenli iniş') }],
      [4300, ()=> onDone()],
    ] : primary === 'Toothpick' ? [
      [0, ()=> setMsg('🪶 Hızlı hafif kalkış')],
      [500, ()=> { setY(-60); setX(24) }],
      [1100, ()=> { setX(-30); setY(-50); setMsg('Çevik mikro dönüş') }],
      [1800, ()=> { setX(34); setY(-35) }],
      [2600, ()=> { setX(0); setY(-20); setMsg('Toothpick çizgisi') }],
      [3500, ()=> { setY(0); setMsg('✓ İniş tamam') }],
      [4100, ()=> onDone()],
    ] : primary === 'Cinewhoop' ? [
      [0, ()=> setMsg('🎬 Yumuşak kalkış')],
      [1000, ()=> { setY(-45); setX(15) }],
      [2200, ()=> { setX(40); setY(-50); setMsg('Geniş sinematik yay') }],
      [3300, ()=> { setX(0); setY(-40); setMsg('Minimal titreşim') }],
      [4500, ()=> { setY(0); setMsg('✓ Pürüzsüz iniş') }],
      [5200, ()=> onDone()],
    ] : primary === 'Race' ? [
      [0, ()=> setMsg('🏁 Race launch')],
      [400, ()=> { setY(-85); setX(45); setRot(40) }],
      [900, ()=> { setX(-55); setRot(120); setMsg('Çok yüksek hız') }],
      [1400, ()=> { setX(65); setRot(260); setMsg('Keskin apex dönüş') }],
      [2000, ()=> { setX(0); setY(-20); setRot(360) }],
      [2600, ()=> { setY(0); setMsg('✓ Kısa yarış inişi') }],
      [3000, ()=> onDone()],
    ] : primary === 'Long Range' ? [
      [0, ()=> setMsg('🗺️ Uzun seyir kalkışı')],
      [1200, ()=> { setY(-40); setX(25) }],
      [2600, ()=> { setX(120); setMsg('Sakin ve düz cruise') }],
      [4200, ()=> { setX(0); setY(-30); setMsg('Enerji verimli dönüş') }],
      [5600, ()=> { setY(0); setMsg('✓ Uzun menzil iniş') }],
      [6200, ()=> onDone()],
    ] : [
      [0, ()=> { setMsg('🌀 Freestyle kalkış') }],
      [700, ()=> { setY(-70); setMsg('Hızlanıyor') }],
      [1300, ()=> { setRot(360); setMsg('🔄 Flip') }],
      [2100, ()=> { setX(60); setY(-50); setTiltX(360); setMsg('Keskin dönüş') }],
      [3000, ()=> { setX(-45); setRot(720) }],
      [3800, ()=> { setY(0); setX(0); setMsg('✓ İniş') }],
      [4300, ()=> onDone()],
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
  }, [primary, unstable, onDone])

  return (
    <div style={{height:'100vh',background:mission.bgGradient,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:32,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none'}}/>
      <div style={{fontFamily:'var(--mono)',fontSize:13,color:mission?.color || 'var(--accent)',letterSpacing:3,textTransform:'uppercase'}}>TEST UÇUŞU — {(mission?.title || primary).toUpperCase()}</div>
      <div style={{
        width:200,height:200,transition: mission.id==='freestyle'?'transform 0.5s cubic-bezier(0.4,0,0.2,1)':'transform 0.8s ease',
        transform:`translate(${x}px,${y}px) rotate(${rot}deg) rotateX(${tiltX}deg)`,
        filter:`drop-shadow(0 0 24px ${mission?.color || '#00d4ff'})`,
        animation: unstable ? 'shake 0.1s infinite' : undefined,
      }}>
        {frame?.image
          ? <img src={frame.image} alt={frame.name} style={{width:'100%',height:'100%',objectFit:'contain'}} />
          : <div style={{fontSize:72}}>🚁</div>}
      </div>
      <div style={{fontFamily:'var(--display)',fontSize:22,fontWeight:600,color:'var(--text)',minHeight:32}}>{msg}</div>
      <div style={{width:280,height:3,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
        <div style={{height:'100%',background:mission?.color || 'var(--accent)',borderRadius:2,animation:'progressFill 4.5s linear forwards'}}/>
      </div>
      <style>{`@keyframes progressFill{from{width:0%}to{width:100%}}`}</style>
    </div>
  )
}

export default function TestFlight({ mission, mode, stats, selected, compatAlerts, onRetry, onMissions, onNewMission }) {
  const [phase, setPhase] = useState('flying')
  const scoringMission = mission || { title:'Free Build', color:'#00d4ff', bgGradient:'linear-gradient(135deg,#061020,#0f172a)', targets:{}, ipucu:'', ogrenmeNotlari:[] }
  const result = scoreBuild(scoringMission, stats, compatAlerts)
  return phase === 'flying'
    ? <FlightAnim mission={scoringMission} stats={stats} selected={selected} onDone={()=>setPhase('result')}/>
    : <BuildReport mission={scoringMission} mode={mode} stats={stats} result={result} onRetry={onRetry} onMissions={onMissions} onNewMission={onNewMission}/>
}
