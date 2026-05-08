export function getCompatAlerts(frame, motor, prop, battery, software, stats) {
  const alerts = []

  const pidNote = ' Gerçek sistemde bu kombinasyon PID ve filtre ayarı gerektirebilir.'
  const frameType = frame?.frameType
  const propSize = prop?.propSizeInch || 0
  const cells = battery?.cells || 0
  const motorClass = motor?.motorClass || ''
  const kv = motor?.kv || 0

  // KRITIK: selection blocker type alerts
  if (propSize >= 7 && ['tinywhoop', 'toothpick', 'ducted'].includes(frameType)) {
    alerts.push({ type:'critical', msg:`7" pervane bu frame sınıfı ile fiziksel olarak uyumsuz.${pidNote}` })
  }
  if (cells === 1 && ['2207', '2806'].includes(motorClass)) {
    alerts.push({ type:'critical', msg:`1S batarya bu motor sınıfı için yetersiz kalır.${pidNote}` })
  }
  if (prop?.id === 'prop_31mm_3blade' && ['x', 'stretched', 'lr'].includes(frameType)) {
    alerts.push({ type:'critical', msg:`31mm pervane bu büyük frame ile kullanılamaz.${pidNote}` })
  }

  // TEKNIK warnings
  if (kv >= 2400 && propSize >= 5) {
    alerts.push({ type:'warning', msg:`Yüksek KV motor + büyük pervane: yüksek akım çekebilir, motor ısınma riski.${pidNote}` })
  }
  if ((battery?.weight || 0) >= 250 && (frame?.sizeInch || 0) <= 3.5) {
    alerts.push({ type:'warning', msg:`Bu batarya ağırlığı frame için fazla olabilir.${pidNote}` })
  }
  if (software?.id === 'racing' && frameType === 'tinywhoop') {
    alerts.push({ type:'warning', msg:`Racing profil + tinywhoop kombinasyonu kontrol kaybına yol açabilir.${pidNote}` })
  }
  if (cells === 6 && ['1404', '1106'].includes(motorClass)) {
    alerts.push({ type:'warning', msg:`6S batarya bu motor sınıfını zorlayabilir.${pidNote}` })
  }
  if (propSize >= 5 && (frame?.sizeInch || 0) <= 3.5) {
    alerts.push({ type:'warning', msg:`Büyük pervane küçük frame'e temas edebilir.${pidNote}` })
  }

  if (stats?.sistemRiski > 80) {
    alerts.push({ type:'critical', msg:`Sistem riski çok yüksek, uçuş güvenliği kritik düzeyde.${pidNote}` })
  }

  return alerts
}

export function getCompatStatus(alerts) {
  const hasCritical = alerts.some(a => a.type === 'critical')
  const hasWarning = alerts.some(a => a.type === 'warning')
  if (hasCritical) return { ok: false, label: 'Kritik uyumsuzluk var!', color: '#ef4444' }
  if (hasWarning)  return { ok: false, label: 'Uyarılar mevcut', color: '#f59e0b' }
  return { ok: true, label: 'Tüm bileşenler uyumlu. Sistem dengeli çalışıyor.', color: '#22c55e' }
}
