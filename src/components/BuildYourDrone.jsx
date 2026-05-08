import React, { useMemo } from 'react'
import { getPart } from '../data/parts'
import { analyzeArchetype } from '../engine/archetypeEngine'
import { useViewport } from '../hooks/useViewport'
import { FrameSVGByID, MotorSVGByID, PropSVGByID, BatterySVGByID, SoftwareSVGByID } from './svg/DroneSVGsV3'

function price(v) {
  return `$${Number(v || 0).toFixed(0)}`
}

const BUILD_STEPS = [
  { id: 1, icon: '🔧', title: 'Frame Hazırlığı', duration: '~15 dk', desc: "Frame'i düz yüzeye koy. Alt plaka, üst plaka ve kolları ayır. Vida setini kontrol et (M2, M3 vidalar)." },
  { id: 2, icon: '⚙️', title: 'Motor Montajı', duration: '~20 dk', desc: "4 motoru frame kollarına sabitle. Motor kablolarını kol içinden geçir. Vidaları çapraz sıkma tekniğiyle sabitle." },
  { id: 3, icon: '⚡', title: 'ESC Bağlantısı', duration: '~30 dk', desc: "Her motor için 3 faz kablosunu ESC'ye lehimle veya konnektörle bağla. Sıralama şimdilik önemli değil, Betaflight'ta yön ayarlayacaksın." },
  { id: 4, icon: '💻', title: 'Flight Controller Montajı', duration: '~15 dk', desc: "FC'yi 30.5mm standoff'lara koy. Anti-vibration pad kullan. Ok işareti drone'un ön tarafını göstermeli." },
  { id: 5, icon: '🔋', title: 'Güç Bağlantıları', duration: '~20 dk', desc: "ESC güç kablolarını PDB'ye veya direkt FC'ye bağla. Kondansatör (1000µF 35V) güç girişine ekle. Polariteyi multimetre ile kontrol et." },
  { id: 6, icon: '📡', title: 'Alıcı ve Kamera', duration: '~25 dk', desc: "RC alıcıyı UART1'e bağla (SBUS veya CRSF). FPV kamerayı FC'nin kamera girişine bağla. VTX'i SmartAudio pinlerine bağla." },
  { id: 7, icon: '⚙️', title: 'Betaflight Kurulumu', duration: '~45 dk', desc: "Betaflight Configurator'ı aç. FC'yi USB ile bağla. Motor yönlerini BLHeli Suite ile ayarla. PID değerlerini seçilen build için ayarla.", extraNote: 'İlk uçuştan önce motorları pervane takmadan test et!' },
  { id: 8, icon: '🚁', title: 'İlk Uçuş', duration: '~30 dk', desc: "Açık alanda, rüzgarsız havada test et. Hover modunda başla, yavaş yavaş throttle ver. Titreşim veya anormal ses varsa motoru kontrol et.", extraNote: 'Bataryayı tam şarjlı kullan, güvenli mesafede dur.' },
]

function PartIcon({ type, id, color }) {
  if (type === 'frame') return <FrameSVGByID frameId={id} color={color} size={44} />
  if (type === 'motor') return <MotorSVGByID motorId={id} color={color} size={44} />
  if (type === 'prop') return <PropSVGByID propId={id} color={color} size={44} />
  if (type === 'battery') return <BatterySVGByID batteryId={id} color={color} size={44} />
  return <SoftwareSVGByID softwareId={id} color={color} size={44} />
}

export default function BuildYourDrone({ selected, stats, mission, onBack, onMissions }) {
  const { isMobile, isTablet } = useViewport()
  const accent = mission?.color || '#00d4ff'

  const parts = useMemo(() => {
    const frame = getPart('frames', selected?.frame)
    const motor = getPart('motors', selected?.motor)
    const prop = getPart('props', selected?.prop)
    const battery = getPart('batteries', selected?.battery)
    const software = getPart('software', selected?.software)
    return [
      { key: 'frame', title: 'Frame', part: frame, qty: 1 },
      { key: 'motor', title: 'Motor', part: motor, qty: 4 },
      { key: 'prop', title: 'Pervane', part: prop, qty: 1 },
      { key: 'battery', title: 'Batarya', part: battery, qty: 1 },
      { key: 'software', title: 'Yazılım', part: software, qty: 1 },
    ]
  }, [selected])

  const archetype = useMemo(() => {
    const build = {
      frame: getPart('frames', selected?.frame),
      motor: getPart('motors', selected?.motor),
      prop: getPart('props', selected?.prop),
      battery: getPart('batteries', selected?.battery),
      software: getPart('software', selected?.software),
    }
    return analyzeArchetype(stats || {}, build).primary
  }, [selected, stats])

  const total = parts.reduce((sum, item) => sum + (item.part?.price || 0) * item.qty, 0)

  return (
    <div style={{ minHeight: '100vh', height: '100vh', overflowY: 'auto', background: 'var(--bg)', padding: isMobile ? 12 : 20 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 110 }}>
        <section style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'rgba(12,16,28,0.8)', padding: isMobile ? 12 : 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={onBack} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}>← GERİ</button>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 24 : 30, fontWeight: 800, color: accent }}>BU DRONU YAP</div>
              <div style={{ color: 'var(--text2)', fontSize: 14 }}>Tasarladığın drone'u gerçek hayatta oluşturmak için rehber</div>
            </div>
          </div>
          <div style={{ border: `1px solid ${accent}66`, background: `${accent}22`, borderRadius: 999, padding: '8px 12px', fontFamily: 'var(--mono)', color: accent, fontSize: 12, whiteSpace: 'nowrap' }}>
            {archetype?.icon} {archetype?.name || 'Build'} %{archetype?.score || 0}
          </div>
        </section>

        <section style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'rgba(12,16,28,0.75)', padding: isMobile ? 12 : 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 2, color: 'var(--text3)', marginBottom: 10 }}>PARÇA LİSTESİ</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,minmax(0,1fr))' : 'repeat(3,minmax(0,1fr))', gap: 10 }}>
            {parts.map((item) => (
              <div key={item.key} style={{ border: `1px solid ${(item.part?.color || accent)}55`, borderRadius: 10, background: 'rgba(8,12,20,0.7)', padding: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 8, background: `${item.part?.color || accent}22`, border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.part ? <PartIcon type={item.key} id={item.part.id} color={item.part.color} /> : '•'}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 700 }}>{item.part?.name || 'Seçilmedi'}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.part?.subtitle || '-'}</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--border2)', display: 'grid', gap: 4, fontSize: 12 }}>
                  <div><span style={{ color: 'var(--text3)' }}>Adet:</span> <span style={{ color: 'var(--text2)' }}>{item.qty}{item.key === 'motor' ? ' (× 4)' : ''}</span></div>
                  <div><span style={{ color: 'var(--text3)' }}>Tahmini fiyat:</span> <span style={{ color: accent, fontFamily: 'var(--mono)' }}>{price((item.part?.price || 0) * item.qty)}</span></div>
                </div>
                <button style={{ marginTop: 8, width: '100%', height: 30, borderRadius: 7, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer' }}>[Ara] butonu (placeholder)</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--text2)', fontSize: 14 }}>Parça toplamı: <span style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>{price(total)}</span></div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 800, color: accent }}>Tahmini Toplam: {price(total)}</div>
          </div>
          <div style={{ marginTop: 6, color: 'var(--text3)', fontSize: 12 }}>* Fiyatlar tahminidir, piyasa fiyatlarına göre değişebilir</div>
        </section>

        <section style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'rgba(12,16,28,0.75)', padding: isMobile ? 12 : 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 2, color: 'var(--text3)', marginBottom: 10 }}>MONTAJ SIRASI</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {BUILD_STEPS.map((step) => (
              <div key={step.id} style={{ border: '1px solid var(--border2)', borderRadius: 10, background: 'rgba(8,12,20,0.75)', padding: 10, display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${accent}22`, border: `1px solid ${accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', color: accent, fontWeight: 700 }}>{step.id}</div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 700 }}>{step.icon} {step.title}</div>
                    <div style={{ fontFamily: 'var(--mono)', color: accent, fontSize: 12 }}>{step.duration}</div>
                  </div>
                  <div style={{ marginTop: 4, color: 'var(--text2)', fontSize: 13, lineHeight: 1.55 }}>{step.desc}</div>
                  {step.extraNote && <div style={{ marginTop: 6, padding: '6px 8px', borderRadius: 6, border: `1px solid ${accent}55`, background: `${accent}12`, fontSize: 12, color: 'var(--text)' }}>{step.extraNote}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'rgba(12,16,28,0.75)', padding: isMobile ? 12 : 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 2, color: 'var(--text3)', marginBottom: 3 }}>VİDEO REHBERLER</div>
          <div style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 10 }}>Bu bölüme yakında video rehberler eklenecek</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,minmax(0,1fr))', gap: 10 }}>
            {['FPV Drone Nasıl Kurulur? — Başlangıç Rehberi', 'Betaflight Kurulum ve PID Ayarları', 'İlk FPV Uçuşu — Güvenlik ve İpuçları'].map((title) => (
              <div key={title} style={{ border: `1px solid ${accent}66`, borderRadius: 10, overflow: 'hidden', background: 'rgba(8,12,20,0.9)' }}>
                <div style={{ aspectRatio: '16 / 9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.3))', cursor: 'pointer', transition: 'filter 0.2s ease' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', border: `1px solid ${accent}99`, background: `${accent}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff' }}>▶</div>
                </div>
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>{title}</div>
                  <span style={{ border: '1px solid var(--border2)', borderRadius: 999, padding: '3px 8px', fontSize: 11, color: 'var(--text3)' }}>Video yakında</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ border: '1px solid rgba(245,158,11,0.6)', borderRadius: 12, background: 'rgba(245,158,11,0.08)', padding: isMobile ? 12 : 16 }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>⚠️ GÜVENLİK</div>
          <div style={{ display: 'grid', gap: 6, fontSize: 14, color: 'var(--text2)' }}>
            <div>• LiPo bataryaları asla gözetimsiz şarj etme</div>
            <div>• İlk uçuşu mutlaka açık alanda, insansız bölgede yap</div>
            <div>• Türkiye'de 500g üzeri drone'lar için SHY kaydı zorunludur</div>
          </div>
        </section>
      </div>

      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, padding: isMobile ? 10 : 12, background: 'linear-gradient(180deg, rgba(6,8,16,0.2), rgba(6,8,16,0.95))', borderTop: '1px solid var(--border2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}>← GERİ DÖN</button>
          <button onClick={onMissions} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}>GÖREV SEÇİMİ</button>
          <button onClick={() => window.print()} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: accent, color: '#000', fontWeight: 700, cursor: 'pointer' }}>TASARIMI YAZDIR</button>
        </div>
      </div>
    </div>
  )
}
