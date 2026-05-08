export function getCompatAlerts(frame, motor, prop, battery, software, stats) {
  const alerts = []
  const cValue = battery?.cValue || 0
  const cells = battery?.cells || 0
  const kv = motor?.kv || 0
  const motorMinCells = motor?.minCells || 1
  const motorMaxCells = motor?.maxCells || 6
  const frameMaxProp = frame?.maxPropSize || Number.POSITIVE_INFINITY
  const frameMinProp = frame?.minPropSize || 0
  const propSize = prop?.propSizeInch || 0
  const isAggressiveSoftware = ['agresif', 'racing', 'freestyle'].includes(software?.id)

  if (cValue < 50 && isAggressiveSoftware) {
    alerts.push({
      type: 'critical',
      msg: 'Düşük C değerli batarya ani throttle ihtiyacında voltaj düşümüne uğrar. Performans kaybı ve sistem riski artar.',
    })
    if (stats) {
      stats.sistemRiski = Math.min(100, (stats.sistemRiski || 0) + 15)
      stats.ucusSuresi = Math.max(0, (stats.ucusSuresi || 0) - 10)
    }
  }

  if (cValue < 50 && kv > 3000) {
    alerts.push({
      type: 'warning',
      msg: 'Bu motor yüksek akım çekebilir. Bataryanın C değeri yetersiz kalabilir, throttle drop yaşanabilir.',
    })
  }

  if (cValue >= 100 && isAggressiveSoftware) {
    alerts.push({
      type: 'info',
      msg: 'Yüksek C değeri agresif build için ideal. Throttle response maksimum seviyede.',
    })
  }

  if (motorMinCells === 1 && cells >= 4) {
    alerts.push({ type: 'critical', msg: '1S motor + 4S/6S batarya kritik şekilde uyumsuz.', blockSelection: true })
  }
  if (motorMaxCells === 2 && cells >= 4) {
    alerts.push({ type: 'warning', msg: '2S motor + 4S/6S batarya motoru zorlayabilir.' })
  }
  if (motorMinCells >= 6 && cells === 4) {
    alerts.push({ type: 'critical', msg: '6S gerektiren motor 4S batarya ile güvenli çalışmaz.' })
  }

  if (propSize > frameMaxProp) {
    alerts.push({
      type: 'critical',
      msg: 'Seçili pervane frame için çok büyük. Fiziksel çarpışma ve güvenlik riski oluşur.',
      blockSelection: true,
    })
  } else if (propSize < frameMinProp) {
    alerts.push({ type: 'warning', msg: 'Küçük pervane bu frame için verimsiz.' })
  }

  if (stats?.sistemRiski > 85) {
    alerts.push({ type: 'critical', msg: 'Sistem riski çok yüksek, uçuş güvenliği kritik düzeyde.' })
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
