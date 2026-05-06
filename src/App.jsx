import React, { useState, useMemo, useCallback } from 'react'
import { PARTS, DEFAULT_BUILD, getPart } from './data/parts'
import { calculateStats } from './engine/statEngine'
import { getCompatAlerts } from './engine/compat'
import MissionSelect from './components/MissionSelect'
import PartSelector from './components/PartSelector'
import DroneCenter from './components/DroneCenter'
import StatPanel from './components/StatPanel'
import BottomBar from './components/BottomBar'
import TestFlight from './components/TestFlight'

const TABS = ['TASARIM','GÖREVLER','TEST UÇUŞU','RAPOR']

export default function App() {
  const [screen, setScreen]   = useState('mission')
  const [mission, setMission] = useState(null)
  const [selected, setSelected] = useState(DEFAULT_BUILD)
  const [scores, setScores]   = useState({})
  const [tab, setTab]         = useState('TASARIM')

  const build = useMemo(() => ({
    frame:    getPart('frames',    selected.frame),
    motor:    getPart('motors',    selected.motor),
    prop:     getPart('props',     selected.prop),
    battery:  getPart('batteries', selected.battery),
    software: getPart('software',  selected.software),
  }), [selected])

  const stats = useMemo(() =>
    calculateStats(build.frame, build.motor, build.prop, build.battery, build.software),
    [build]
  )

  const compatAlerts = useMemo(() =>
    getCompatAlerts(build.frame, build.motor, build.prop, build.battery, build.software, stats),
    [build, stats]
  )

  const allSelected = !!(selected.frame && selected.motor && selected.prop && selected.battery && selected.software)

  const handleSelect = useCallback((group, id) => {
    setSelected(s => ({ ...s, [group]: id }))
  }, [])

  const handleMissionSelect = (m) => {
    setMission(m); setSelected(DEFAULT_BUILD); setScreen('design'); setTab('TASARIM')
  }

  const handleTestFlight = () => setScreen('flight')
  const handleRetry = () => { setSelected(DEFAULT_BUILD); setScreen('design') }
  const handleMissions = () => setScreen('mission')
  const handleReset = () => setSelected(DEFAULT_BUILD)

  if (screen === 'mission') return <MissionSelect onSelect={handleMissionSelect} scores={scores}/>
  if (screen === 'flight')  return <TestFlight mission={mission} stats={stats} selected={selected} compatAlerts={compatAlerts} onRetry={handleRetry} onMissions={handleMissions}/>

  return (
    <div style={{display:'grid',gridTemplateColumns:'320px 1fr 340px',gridTemplateRows:'64px 1fr auto',height:'100vh',background:'radial-gradient(circle at 50% -20%, #101e34 0%, #060810 60%)'}}>

      {/* HEADER */}
      <header style={{
        gridColumn:'1/-1', display:'flex', alignItems:'center',
        padding:'0 16px', background:'rgba(9,13,22,0.75)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border2)',
        position:'relative', gap:16,
      }}>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${mission?.color||'var(--accent)'},transparent)`}}/>

        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginRight:8}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,boxShadow:'0 0 16px rgba(0,212,255,0.3)'}}>🚁</div>
          <div>
            <div style={{fontFamily:'var(--display)',fontSize:13,fontWeight:700,letterSpacing:2,color:'var(--accent)',lineHeight:1}}>FPV DRONE</div>
            <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:2,color:'var(--text2)'}}>PARAMETRİK TASARIM</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:2}}>
          {TABS.map(t => (
            <button key={t} onClick={()=>{ if(t==='GÖREVLER') handleMissions(); else if(t==='TEST UÇUŞU') handleTestFlight(); else setTab(t) }}
              style={{
                padding:'10px 18px', borderRadius:8, border:'none', cursor:'pointer',
                background: tab===t ? (mission?.color||'var(--accent)') : 'var(--bg3)',
                color: tab===t ? '#000' : 'var(--text2)',
                fontFamily:'var(--display)', fontSize:12, fontWeight:700, letterSpacing:1,
                transition:'all 0.15s',
              }}
            >
              {t==='TASARIM'?'✂ ':t==='GÖREVLER'?'⏰ ':t==='TEST UÇUŞU'?'🎮 ':'📋 '}{t}
            </button>
          ))}
        </div>

        {/* Right: user + score */}
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:12}}>
          <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'4px 12px',display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(0,212,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>👤</div>
            <div>
              <div style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--accent)',letterSpacing:1}}>EĞİTİM MODU</div>
              <div style={{fontSize:10,color:'var(--text2)'}}>Seviye 3</div>
            </div>
          </div>
          <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'4px 12px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--text3)',letterSpacing:1}}>PUAN</div>
            <div style={{fontFamily:'var(--display)',fontSize:16,fontWeight:700,color:'#f59e0b'}}>
              {Object.values(scores).reduce((s,sc)=>s+(sc?.total||0),0)} ⭐
            </div>
          </div>
        </div>
      </header>

      {/* LEFT */}
      <PartSelector selected={selected} onSelect={handleSelect}/>

      {/* CENTER */}
      <DroneCenter selected={selected} mission={mission}/>

      {/* RIGHT */}
      <StatPanel
        stats={stats}
        compatAlerts={compatAlerts}
        mission={mission}
        onTestFlight={handleTestFlight}
        onReset={handleReset}
        allSelected={allSelected}
      />

      {/* BOTTOM */}
      <BottomBar compatAlerts={compatAlerts} stats={stats}/>
    </div>
  )
}
