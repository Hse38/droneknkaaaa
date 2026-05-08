import React, { useEffect, useMemo, useState } from 'react'
import { STAT_KEYS, STAT_DISPLAY, STAT_COLORS, STAT_ICONS } from '../engine/statEngine'
import { analyzeArchetype } from '../engine/archetypeEngine'
import { recommendSims } from '../engine/simRecommender'
import { useViewport } from '../hooks/useViewport'
import { getPart } from '../data/parts'

function metricColor(v) {
  if (v >= 75) return '#22c55e'
  if (v >= 50) return '#f59e0b'
  return '#64748b'
}

export default function BuildReport({ mission, stats, result, mode, selected, onRetry, onMissions, onNewMission }) {
  const { isMobile, isTablet } = useViewport()
  const buildParts = useMemo(() => ({
    frame: getPart('frames', selected?.frame),
    motor: getPart('motors', selected?.motor),
    prop: getPart('props', selected?.prop),
    battery: getPart('batteries', selected?.battery),
    software: getPart('software', selected?.software),
  }), [selected])
  const archetype = useMemo(() => analyzeArchetype(stats, buildParts), [stats, buildParts])
  const sims = useMemo(() => recommendSims(stats), [stats])
  const [fill, setFill] = useState(false)
  const [showScore, setShowScore] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setFill(true), 120)
    let raf = null
    let start = null
    const duration = 1200
    const animate = (tm) => {
      if (!start) start = tm
      const p = Math.min((tm - start) / duration, 1)
      setShowScore(Math.round(result.total * p))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => {
      clearTimeout(t)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [result.total])

  const sortedArchetypes = Object.entries(archetype.allScores).sort((a, b) => b[1] - a[1])
  const strengths = [...STAT_KEYS].sort((a, b) => (stats[b] || 0) - (stats[a] || 0)).slice(0, 3)
  const weaknesses = [...STAT_KEYS].sort((a, b) => (stats[a] || 0) - (stats[b] || 0)).slice(0, 3)
  const notes = mode === 'challenge' ? (mission?.ogrenmeNotlari || result.ogrenmeNotlari || []) : [
    'Hybrid buildler birden fazla archetype ile eşleşebilir.',
    'Sistem riski arttıkça gerçek uçuşta tuning ihtiyacı artar.',
    'Parça uyumu, tekil performans değerlerinden daha kritik olabilir.',
  ]

  return (
    <div style={{ height:'100vh', overflow:'auto', background: mission?.bgGradient || 'linear-gradient(135deg,#060810,#0f172a)', padding:isMobile?12:24 }}>
      <div style={{ maxWidth:1180, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:isMobile?'flex-start':'center', flexDirection:isMobile?'column':'row', gap:isMobile?8:0 }}>
          <div>
            <div style={{ fontFamily:'var(--mono)', color: mission?.color || 'var(--accent)', letterSpacing:2, fontSize:13 }}>BUILD ANALYSIS REPORT</div>
            <div style={{ fontFamily:'var(--display)', fontSize:isMobile?26:34, fontWeight:700 }}>{mission?.title || 'Free Build Raporu'}</div>
          </div>
          <div style={{ fontFamily:'var(--display)', fontSize:isMobile?42:54, fontWeight:800, color: metricColor(result.total) }}>{showScore}</div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:12, padding:14 }}>
          <div style={{ fontFamily:'var(--mono)', fontSize:12, letterSpacing:2, marginBottom:10 }}>GENEL PERFORMANS ÖZETİ</div>
          {STAT_KEYS.map((k, i) => (
            <div key={k} style={{ marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
                <span>{STAT_ICONS[k]} {STAT_DISPLAY[k]}</span>
                <span>{stats[k]}/100</span>
              </div>
              <div style={{ height:6, borderRadius:3, background:'var(--bg4)' }}>
                <div style={{ height:'100%', width: fill ? `${stats[k]}%` : '0%', background: STAT_COLORS[k], transition:`width 0.45s ease ${i * 0.1}s`, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.1fr 0.9fr', gap:14 }}>
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:12, padding:14 }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:12, letterSpacing:2, marginBottom:10 }}>DRONE CHARACTER ANALYSIS</div>
            <div style={{ border:'1px solid var(--border2)', borderRadius:10, padding:12, background:'rgba(0,0,0,0.15)', marginBottom:10 }}>
              <div style={{ fontFamily:'var(--display)', fontSize:24, fontWeight:700 }}>
                {archetype.primary.icon} {archetype.primary.name.toUpperCase()} — %{archetype.primary.score} Match
              </div>
              <div style={{ color:'var(--text2)', marginTop:4 }}>{archetype.primary.desc}</div>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {archetype.secondary.map((s) => (
                <span key={s.name} style={{ padding:'5px 9px', borderRadius:999, border:'1px solid var(--border2)', background:'rgba(255,255,255,0.03)', fontSize:13 }}>
                  {s.name} Characteristics %{s.score}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:12, padding:14 }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:12, letterSpacing:2, marginBottom:10 }}>ARCHETYPE MATCH SCORES</div>
            {sortedArchetypes.map(([name, score], idx) => (
              <div key={name} style={{ marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}><span>{name}</span><span>%{score}</span></div>
                <div style={{ height:6, borderRadius:3, background:'var(--bg4)' }}>
                  <div style={{ height:'100%', width: fill ? `${score}%` : '0%', background: metricColor(score), transition:`width 0.35s ease ${idx * 0.08}s`, borderRadius:3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:14 }}>
          <div style={{ background:'rgba(20,120,70,0.15)', border:'1px solid rgba(34,197,94,0.35)', borderRadius:12, padding:14 }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:12, marginBottom:8 }}>GÜÇLÜ YÖNLER</div>
            {strengths.map((k) => <div key={k} style={{ fontSize:14, marginBottom:5 }}>✓ {STAT_DISPLAY[k]} ({stats[k]})</div>)}
          </div>
          <div style={{ background:'rgba(120,30,30,0.15)', border:'1px solid rgba(239,68,68,0.35)', borderRadius:12, padding:14 }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:12, marginBottom:8 }}>ZAYIF YÖNLER</div>
            {weaknesses.map((k) => <div key={k} style={{ fontSize:14, marginBottom:5 }}>✗ {STAT_DISPLAY[k]} ({stats[k]})</div>)}
          </div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:12, padding:14 }}>
          <div style={{ fontFamily:'var(--mono)', fontSize:12, letterSpacing:2, marginBottom:10 }}>SİMÜLASYON ARAÇ ÖNERİLERİ</div>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':isTablet?'repeat(2,1fr)':'repeat(3, 1fr)', gap:10 }}>
            {sims.map((s) => (
              <div key={s.id} style={{ border:'1px solid var(--border2)', borderRadius:10, padding:10, background:'rgba(0,0,0,0.15)' }}>
                <div style={{ fontFamily:'var(--display)', fontSize:18, fontWeight:700 }}>{s.name}</div>
                <div style={{ fontSize:13, color:'var(--text2)' }}>{s.type} • {s.size}</div>
                <div style={{ marginTop:4, fontSize:13 }}>{s.desc}</div>
                <div style={{ marginTop:8, display:'inline-block', padding:'2px 8px', borderRadius:999, background:'rgba(0,212,255,0.12)', border:'1px solid rgba(0,212,255,0.4)', fontSize:12 }}>
                  Benzerlik %{s.similarity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:12, padding:14 }}>
          <div style={{ fontFamily:'var(--mono)', fontSize:12, letterSpacing:2, marginBottom:8 }}>📚 ÖĞRENME NOTLARI</div>
          {notes.slice(0, 3).map((n, i) => <div key={i} style={{ marginBottom:6, fontSize:14 }}>📚 {n}</div>)}
        </div>

        <div style={{ display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap' }}>
          <button onClick={onRetry} style={{ padding:'10px 16px', borderRadius:8, border:'1px solid var(--border2)', background:'transparent', color:'var(--text)' }}>TEKRAR TASARLA</button>
          <button onClick={onMissions} style={{ padding:'10px 16px', borderRadius:8, border:'1px solid var(--border2)', background:'transparent', color:'var(--text)' }}>GÖREV SEÇİMİ</button>
          <button onClick={() => onNewMission?.()} style={{ padding:'10px 16px', borderRadius:8, border:'none', background: mission?.color || 'var(--accent)', color:'#000', fontWeight:700 }}>DETAYLI <TASARLA></TASARLA></button>
        </div>
      </div>
    </div>
  )
}
