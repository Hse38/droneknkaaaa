// src/components/svg/DroneCenter.jsx — SVG tabanlı modüler drone görüntüleyici

import React, { useState } from 'react'
import { getPart } from '../../data/parts'
import {
  UnifiedDroneSVG
} from './DroneSVGs'

function PartInfoCard({ label, part }) {
  return (
    <div style={{
      padding: '10px 12px',
      borderRight: '1px solid var(--border)',
      minWidth: 0,
    }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 8,
        color: 'var(--text3)', letterSpacing: 1,
        marginBottom: 6, textTransform: 'uppercase',
      }}>{label}</div>
      {part ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 4,
              background: `${part.color}22`,
              border: `1px solid ${part.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, flexShrink: 0,
            }}>
              {part.icon}
            </div>
            <div style={{
              fontFamily: 'var(--display)', fontSize: 11,
              fontWeight: 700, color: 'var(--text)',
              lineHeight: 1.2,
            }}>
              {part.name}
            </div>
          </div>
          {part.bullets?.slice(0, 3).map((b, i) => (
            <div key={i} style={{
              fontSize: 10, color: 'var(--text2)',
              display: 'flex', gap: 4, marginBottom: 2,
            }}>
              <span style={{ color: 'var(--text3)', flexShrink: 0 }}>·</span>{b}
            </div>
          ))}
          <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 10, color: 'var(--success)' }}>
              Avantaj: {part.avantaj}
            </span>
            <span style={{ fontSize: 10, color: 'var(--danger)' }}>
              Dezavantaj: {part.dezavantaj}
            </span>
          </div>
        </>
      ) : (
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
          Seçilmedi
        </div>
      )}
    </div>
  )
}

export default function DroneCenter({ selected, mission }) {
  const frame    = getPart('frames',    selected.frame)
  const motor    = getPart('motors',    selected.motor)
  const prop     = getPart('props',     selected.prop)
  const battery  = getPart('batteries', selected.battery)
  const software = getPart('software',  selected.software)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', background: 'var(--bg)', overflow: 'hidden',
    }}>

      {/* MISSION BANNER */}
      {mission && (
        <div style={{
          padding: '8px 16px',
          background: `${mission.color}0f`,
          borderBottom: `1px solid ${mission.color}28`,
          display: 'flex', alignItems: 'flex-start', gap: 12, flexShrink: 0,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 8,
              color: mission.color, letterSpacing: 2, marginBottom: 3,
            }}>
              {mission.icon} GÖREV
            </div>
            <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, marginBottom: 4 }}>
              {mission.desc}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {mission.hedefler?.slice(0, 3).map((h, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center',
                  gap: 5, fontSize: 10, color: 'var(--text2)',
                }}>
                  <span style={{ color: mission.color, fontSize: 8 }}>✓</span>{h}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: `${mission.color}18`,
            border: `1px solid ${mission.color}44`,
            borderRadius: 8, padding: '6px 14px', textAlign: 'center', flexShrink: 0,
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: mission.color }}>
              ÖDÜL
            </div>
            <div style={{
              fontFamily: 'var(--display)', fontSize: 18,
              fontWeight: 700, color: '#f59e0b',
            }}>
              ⭐ {mission.odul?.puan}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--accent)' }}>
              XP {mission.odul?.xp}
            </div>
          </div>
        </div>
      )}

      {/* DRONE VIEWER */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '40px 40px',
        }}/>

        {/* Center glow */}
        <div style={{
          position: 'absolute',
          width: 320, height: 320,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${frame?.color || '#00d4ff'}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}/>

        <div style={{ position: 'relative', width: 300, height: 300, animation: 'float 3s ease-in-out infinite' }}>
          <UnifiedDroneSVG
            frameId={selected.frame}
            frameColor={frame?.color || '#00d4ff'}
            motorColor={motor?.color || '#f59e0b'}
            propColor={prop?.color || '#00d4ff'}
            size={300}
          />
        </div>

        <style>{`
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        `}</style>
      </div>

      {/* PART INFO STRIP */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', flexShrink: 0 }}>
        <div style={{
          padding: '5px 14px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 8,
            letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase',
          }}>
            SEÇİLİ BİLEŞEN BİLGİLERİ
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
          <PartInfoCard label="Frame"           part={frame}/>
          <PartInfoCard label="Motor"           part={motor}/>
          <PartInfoCard label="Pervane"         part={prop}/>
          <PartInfoCard label="Batarya"         part={battery}/>
          <PartInfoCard label="Yazılım Profili" part={software}/>
        </div>
      </div>
    </div>
  )
}
