import React from 'react'
import { getPart } from '../data/parts'
import { useViewport } from '../hooks/useViewport'

function currency(v) {
  return `$${Number(v || 0).toFixed(0)}`
}

export default function BuildYourDrone({ selected, mission, onBack }) {
  const { isMobile, isTablet } = useViewport()
  const frame = getPart('frames', selected?.frame)
  const motor = getPart('motors', selected?.motor)
  const prop = getPart('props', selected?.prop)
  const battery = getPart('batteries', selected?.battery)
  const software = getPart('software', selected?.software)

  const cards = [
    { key: 'frame', title: 'Frame', part: frame, qty: 1 },
    { key: 'motor', title: 'Motor', part: motor, qty: 4 },
    { key: 'prop', title: 'Pervane', part: prop, qty: 1 },
    { key: 'battery', title: 'Batarya', part: battery, qty: 1 },
    { key: 'software', title: 'Yazılım', part: software, qty: 1 },
  ]

  const total = cards.reduce((sum, c) => sum + ((c.part?.price || 0) * c.qty), 0)
  const accent = mission?.color || '#00d4ff'

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% -20%, #101e34 0%, #060810 60%)', padding: isMobile ? 14 : 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 34 : 46, fontWeight: 800, color: accent }}>DRONE'UNU YAP</div>
          <div style={{ fontSize: isMobile ? 14 : 16, color: 'var(--text2)' }}>
            Tasarladığın drone'u gerçek hayatta oluşturmak için gerekli parça listesi
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 12 }}>
          {cards.map((c) => (
            <div key={c.key} style={{ border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg2)', padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${c.part?.color || accent}22`, border: `1px solid ${c.part?.color || accent}55` }}>
                  {c.part?.icon || '•'}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase' }}>{c.title}</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 700 }}>{c.part?.name || 'Seçilmedi'}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, minHeight: 46 }}>{c.part?.subtitle || '-'}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12 }}>
                <span style={{ color: 'var(--text3)' }}>Tahmini fiyat</span>
                <span style={{ color: accent, fontFamily: 'var(--mono)' }}>{currency(c.part?.price)} {c.qty > 1 ? `x${c.qty}` : ''}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${accent}66`, background: `${accent}15`, borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--text2)', letterSpacing: 1 }}>TOPLAM TAHMİNİ MALİYET</span>
          <span style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 800, color: accent }}>{currency(total)}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}>← GERİ DÖN</button>
          <button style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: accent, color: '#000', fontWeight: 700, cursor: 'pointer' }}>TASARIMI KAYDET (PDF)</button>
        </div>
      </div>
    </div>
  )
}
