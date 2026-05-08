import React, { useState, useMemo, useCallback } from 'react'
import { PARTS, DEFAULT_BUILD, getPart } from './data/parts'
import { calculateStats } from './engine/statEngine'
import { getCompatAlerts } from './engine/compat'
import MissionSelect from './components/MissionSelect'
import PartSelector from './components/PartSelector'
import DroneCenter from './components/svg/DroneCenter'
import StatPanel from './components/StatPanel'
import BottomBar from './components/BottomBar'
import TestFlight from './components/TestFlight'
import BuildYourDrone from './components/BuildYourDrone'
import { useViewport } from './hooks/useViewport'

const TABS = ['TASARIM','GÖREVLER']
const EMPTY_SELECTION = {
  frame: null,
  motor: null,
  prop: null,
  battery: null,
  software: null,
}

export default function App() {
  const { isMobile, isTablet } = useViewport()
  const [screen, setScreen]   = useState('mode')
  const [mission, setMission] = useState(null)
  const [mode, setMode] = useState('challenge')
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
    setSelected((prev) => {
      return { ...prev, [group]: id }
    })
  }, [])

  const handleMissionSelect = (m) => {
    setMode('challenge')
    setMission(m)
    setSelected(DEFAULT_BUILD)
    setScreen('design')
    setTab('TASARIM')
  }
  const handleChallengeMode = () => {
    setMode('challenge')
    setMission(null)
    setSelected(DEFAULT_BUILD)
    setScreen('mission')
    setTab('GÖREVLER')
  }
  const handleFreeBuild = () => {
    setMode('free')
    setMission(null)
    setSelected(DEFAULT_BUILD)
    setScreen('design')
    setTab('TASARIM')
  }

  const handleTestFlight = () => setScreen('flight')
  const handleRetry = () => { setSelected(DEFAULT_BUILD); setScreen('design') }
  const handleMissions = () => setScreen('mode')
  const handleReset = () => {
    setSelected({ ...EMPTY_SELECTION })
    setScreen('design')
    setTab('TASARIM')
  }
  const handleBuildGuide = () => setScreen('buildguide')

  if (screen === 'mode') return <MissionSelect view='mode' onChallengeMode={handleChallengeMode} onFreeBuild={handleFreeBuild} />
  if (screen === 'mission') return <MissionSelect view='mission' onSelect={handleMissionSelect} onBack={handleMissions} scores={scores}/>
  if (screen === 'flight')  return <TestFlight mission={mission} mode={mode} stats={stats} selected={selected} compatAlerts={compatAlerts} onRetry={handleRetry} onMissions={handleMissions} onNewMission={handleBuildGuide}/>
  if (screen === 'buildguide') return (
    <BuildYourDrone
      selected={selected}
      stats={stats}
      mission={mission}
      onBack={() => setScreen('flight')}
      onMissions={() => setScreen('mission')}
    />
  )

  const designGrid = isMobile
    ? { gridTemplateColumns:'1fr', gridTemplateRows:'78px auto auto auto auto' }
    : isTablet
      ? { gridTemplateColumns:'270px 1fr 300px', gridTemplateRows:'64px 1fr auto' }
      : { gridTemplateColumns:'320px 1fr 340px', gridTemplateRows:'64px 1fr auto' }

  return (
    <div style={{display:'grid',...designGrid,height:'100dvh',background:'radial-gradient(circle at 50% -20%, #101e34 0%, #060810 60%)',overflowY:isMobile?'auto':'hidden',overflowX:'hidden'}}>

      {/* HEADER */}
      <header style={{
        gridColumn:'1/-1', display:'flex', alignItems:'center',
        padding:isMobile?'8px 10px':'0 16px', background:'rgba(9,13,22,0.75)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border2)',
        position:'relative', gap:isMobile?8:16, flexWrap:isMobile?'wrap':'nowrap', alignContent:isMobile?'center':'normal',
      }}>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${mission?.color||'var(--accent)'},transparent)`}}/>

        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginRight:isMobile?0:8}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,boxShadow:'0 0 16px rgba(0,212,255,0.3)'}}>🚁</div>
          <div>
            <div style={{fontFamily:'var(--display)',fontSize:15,fontWeight:700,letterSpacing:2,color:'var(--accent)',lineHeight:1}}>FPV DRONE</div>
            <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:2,color:'var(--text2)'}}>PARAMETRİK TASARIM</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:2,overflowX:isMobile?'auto':'visible',maxWidth:isMobile?'100%':'none'}}>
          {TABS.map(t => (
            <button key={t} onClick={()=>{ if(t==='GÖREVLER') handleMissions(); else setTab(t) }}
              style={{
                padding:isMobile?'8px 12px':'10px 18px', borderRadius:8, border:'none', cursor:'pointer',
                background: tab===t ? (mission?.color||'var(--accent)') : 'var(--bg3)',
                color: tab===t ? '#000' : 'var(--text2)',
                fontFamily:'var(--display)', fontSize:isMobile?12:14, fontWeight:700, letterSpacing:1, whiteSpace:'nowrap',
                transition:'all 0.15s',
              }}
            >
              {t==='TASARIM'?'✂ ':'⏰ '}{t}
            </button>
          ))}
        </div>

        {/* Right: user + score */}
        <div style={{marginLeft:isMobile?0:'auto',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          <div style={{padding:'7px 12px',borderRadius:999,border:'1px solid var(--border2)',background:mode==='challenge'?'rgba(239,68,68,0.15)':'rgba(168,85,247,0.15)',fontFamily:'var(--mono)',fontSize:isMobile?11:12,color:mode==='challenge'?'#ef4444':'#a855f7'}}>
            {mode === 'challenge' ? `⚡ CHALLENGE — ${mission?.title || 'Görev'}` : '🔓 FREE BUILD'}
          </div>
          <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'4px 10px',display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(0,212,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>👤</div>
            <div>
              <div style={{fontFamily:'var(--mono)',fontSize:isMobile?9:10,color:'var(--accent)',letterSpacing:1}}>EĞİTİM MODU</div>
              <div style={{fontSize:isMobile?11:12,color:'var(--text2)'}}>Seviye 3</div>
            </div>
          </div>
          <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'4px 10px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:isMobile?9:10,color:'var(--text3)',letterSpacing:1}}>PUAN</div>
            <div style={{fontFamily:'var(--display)',fontSize:isMobile?14:16,fontWeight:700,color:'#f59e0b'}}>
              {Object.values(scores).reduce((s,sc)=>s+(sc?.total||0),0)} ⭐
            </div>
          </div>
        </div>
      </header>

      {/* LEFT */}
      <div style={{minHeight:isMobile?300:0,overflow:isMobile?'visible':'hidden'}}>
        <PartSelector selected={selected} onSelect={handleSelect}/>
      </div>

      {/* CENTER */}
      <div style={{minHeight:isMobile?420:0,overflow:isMobile?'visible':'hidden'}}>
        <DroneCenter selected={selected} mission={mode === 'challenge' ? mission : null}/>
      </div>

      {/* RIGHT */}
      <div style={{minHeight:isMobile?440:0,overflow:isMobile?'visible':'hidden'}}>
        <StatPanel
          stats={stats}
          compatAlerts={compatAlerts}
          mission={mission}
          onTestFlight={handleTestFlight}
          onReset={handleReset}
          allSelected={allSelected}
        />
      </div>

      {/* BOTTOM */}
      <BottomBar
        compatAlerts={compatAlerts}
        stats={stats}
        onTestFlight={handleTestFlight}
        onReset={handleReset}
        allSelected={allSelected}
        mission={mission}
      />
    </div>
  )
}
