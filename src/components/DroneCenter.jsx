import React, { useEffect, useState } from 'react'
import { getPart } from '../data/parts'

// Part image with fallback
function PartImg({ part, size=56 }) {
  const [err, setErr] = useState(false)
  useEffect(() => {
    setErr(false)
  }, [part?.image])

  if (!part?.image || err) return (
    <div style={{width:size,height:size,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.5,background:'var(--bg4)',borderRadius:6,border:'1px solid var(--border)'}}>
      {part?.fallbackEmoji||'⚙️'}
    </div>
  )
  return <img src={part.image} alt={part?.name} onError={()=>setErr(true)} style={{width:size,height:size,objectFit:'contain',borderRadius:6,background:'var(--bg4)'}}/>
}

function LayerItem({ src, alt, width, height, fallback, animationName, tint, rounded = true }) {
  const [err, setErr] = useState(false)

  useEffect(() => {
    setErr(false)
  }, [src])

  if (!src || err) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.round(Math.min(width, height) * 0.45),
          borderRadius: rounded ? 999 : 12,
          border: '1px solid var(--border)',
          background: 'var(--bg4)',
          color: 'var(--text2)',
          animation: animationName,
          filter: tint ? `drop-shadow(0 0 14px ${tint}66)` : undefined,
        }}
      >
        {fallback}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      style={{
        width,
        height,
        objectFit: 'contain',
        animation: animationName,
        filter: tint ? `drop-shadow(0 0 14px ${tint}55)` : undefined,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function DroneCenter({ selected, mission }) {
  const frame    = getPart('frames',   selected.frame)
  const motor    = getPart('motors',   selected.motor)
  const prop     = getPart('props',    selected.prop)
  const battery  = getPart('batteries',selected.battery)
  const software = getPart('software', selected.software)
  const motorPoints = [
    { x: 120, y: 120 },
    { x: 280, y: 120 },
    { x: 120, y: 280 },
    { x: 280, y: 280 },
  ]

  const parts = [
    { label:'FRAME',          part:frame },
    { label:'MOTOR',          part:motor },
    { label:'PERVANE',        part:prop },
    { label:'BATARYA',        part:battery },
    { label:'YAZILIM PROFİLİ',part:software },
  ]

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:'var(--bg)',overflow:'hidden'}}>

      {/* Mission banner */}
      {mission && (
        <div style={{padding:'8px 16px',background:`${mission.color}12`,borderBottom:`1px solid ${mission.color}33`,display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          <span style={{fontSize:14}}>{mission.icon}</span>
          <div>
            <div style={{fontFamily:'var(--mono)',fontSize:9,color:mission.color,letterSpacing:2}}>GÖREV</div>
            <div style={{fontSize:12,color:'var(--text)',fontWeight:500}}>{mission.desc}</div>
          </div>
          <div style={{marginLeft:'auto',display:'flex',flexDirection:'column',gap:2}}>
            {mission.hedefler.slice(0,3).map((h,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'var(--text2)'}}>
                <span style={{color:mission.color,fontSize:8}}>✓</span>{h}
              </div>
            ))}
          </div>
          <div style={{marginLeft:16,background:`${mission.color}22`,border:`1px solid ${mission.color}44`,borderRadius:8,padding:'6px 14px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:9,color:mission.color,letterSpacing:1}}>ÖDÜL</div>
            <div style={{fontFamily:'var(--display)',fontSize:16,fontWeight:700,color:'#f59e0b'}}>⭐ {mission.odul.puan}</div>
            <div style={{fontFamily:'var(--mono)',fontSize:9,color:'var(--accent)'}}>XP {mission.odul.xp}</div>
          </div>
        </div>
      )}

      {/* Drone viewer */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        {/* Grid bg */}
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)',backgroundSize:'50px 50px',pointerEvents:'none'}}/>
        {/* Glow circle */}
        <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          {/* Label */}
          <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:3,color:'var(--text3)',border:'1px solid var(--border)',borderRadius:4,padding:'3px 10px',display:'flex',gap:12}}>
            <span>↩ Modeli döndürmek için sürükle</span>
            <span>•</span>
            <span>Yakınlaştır/Uzaklaştır: Kaydır</span>
          </div>

          {/* Drone parts layered visualization */}
          <div
            style={{
              position: 'relative',
              width: 400,
              height: 400,
              animation: 'float 3s ease-in-out infinite',
              filter: `drop-shadow(0 0 36px ${frame?.color || '#00d4ff'}66)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 330,
                height: 330,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${frame?.color || '#00d4ff'}33 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* 1) Frame center */}
            <div style={{ position: 'absolute', left: 200, top: 200, width: 200, height: 200, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <LayerItem
                src={frame?.image}
                alt={frame?.name || 'frame'}
                width={200}
                height={200}
                fallback={frame?.fallbackEmoji || '🛸'}
                tint={frame?.color}
                rounded={false}
              />
            </div>

            {/* 2) Motor and 3) Prop at corners */}
            {motorPoints.map((point, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    position: 'absolute',
                    left: point.x,
                    top: point.y,
                    width: 70,
                    height: 70,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <LayerItem
                    src={motor?.image}
                    alt={motor?.name || 'motor'}
                    width={70}
                    height={70}
                    fallback={motor?.fallbackEmoji || '⚙️'}
                    animationName='spinMotor 0.45s linear infinite'
                    tint={motor?.color}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: point.x,
                    top: point.y,
                    width: 80,
                    height: 80,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                  }}
                >
                  <LayerItem
                    src={prop?.image}
                    alt={prop?.name || 'prop'}
                    width={80}
                    height={80}
                    fallback={prop?.fallbackEmoji || '🌀'}
                    animationName='spinProp 0.2s linear infinite'
                    tint={prop?.color}
                  />
                </div>
              </React.Fragment>
            ))}

            {/* 4) Battery bottom center */}
            <div style={{ position: 'absolute', left: 200, top: 340, width: 90, height: 60, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              <LayerItem
                src={battery?.image}
                alt={battery?.name || 'battery'}
                width={90}
                height={60}
                fallback={battery?.fallbackEmoji || '🔋'}
                animationName='softPulse 1.4s ease-in-out infinite'
                tint={battery?.color}
                rounded={false}
              />
            </div>

            {/* 5) Software top center */}
            <div style={{ position: 'absolute', left: 200, top: 52, width: 70, height: 70, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              <LayerItem
                src={software?.image}
                alt={software?.name || 'software'}
                width={70}
                height={70}
                fallback={software?.fallbackEmoji || '💻'}
                animationName='softPulse 1.1s ease-in-out infinite'
                tint={software?.color}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected part info - bottom strip */}
      <div style={{borderTop:'1px solid var(--border)',background:'var(--bg2)',flexShrink:0}}>
        <div style={{padding:'6px 14px',borderBottom:'1px solid var(--border)'}}>
          <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:2,color:'var(--text3)',textTransform:'uppercase'}}>SEÇİLİ BİLEŞEN BİLGİLERİ</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:0}}>
          {parts.map(({label, part}, i) => (
            <div key={label} style={{padding:'10px 12px',borderRight:i<4?'1px solid var(--border)':'none'}}>
              <div style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--text3)',letterSpacing:1,marginBottom:4,textTransform:'uppercase'}}>{label}</div>
              {part ? (
                <>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
                    <PartImg part={part} size={32}/>
                    <div style={{fontFamily:'var(--display)',fontSize:11,fontWeight:600,color:'var(--text)',lineHeight:1.2}}>{part.name}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:2}}>
                    {part.bullets?.slice(0,3).map((b,j) => (
                      <div key={j} style={{fontSize:10,color:'var(--text2)',display:'flex',gap:4}}>
                        <span style={{color:'var(--text3)'}}>•</span>{b}
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:6,display:'flex',gap:8}}>
                    <span style={{fontSize:10,color:'var(--success)'}}>Avantaj: {part.avantaj}</span>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <span style={{fontSize:10,color:'var(--danger)'}}>Dezavantaj: {part.dezavantaj}</span>
                  </div>
                </>
              ) : (
                <div style={{fontSize:11,color:'var(--text3)',marginTop:4}}>Seçilmedi</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes spinMotor {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinProp {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(1); opacity: 0.92; }
          50% { transform: scale(1.06); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
