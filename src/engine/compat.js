export function getCompatAlerts(frame, motor, prop, battery, software, stats) {
  const alerts = []
  if (motor?.id === 'yuksek_kv' && prop?.id === 'yuksek_pitch')
    alerts.push({ type:'warning', msg:'Yüksek KV motor + yüksek pitch pervane kombinasyonu motor ısınmasına neden olabilir.' })
  if (battery?.id === '6s' && motor?.id === 'yuksek_kv')
    alerts.push({ type:'warning', msg:'6S batarya + yüksek KV motor sistemi çok agresif hale getirebilir. Kontrol zorlaşır.' })
  if (battery?.id === '3s' && software?.id === 'agresif')
    alerts.push({ type:'warning', msg:'Agresif profil ani güç ihtiyacı oluşturur. 3S batarya voltaj düşümüne uğrayabilir.' })
  if (software?.id === 'agresif' && frame?.id === 'egitim')
    alerts.push({ type:'warning', msg:'Agresif yazılım profili eğitim frame ile birlikte kontrolü zorlaştırır.' })
  if (stats?.sistemRiski > 75)
    alerts.push({ type:'critical', msg:'Yüksek sistem riski! Bu kombinasyon gerçek uçuşta tehlikeli olabilir.' })
  if (frame && motor)
    alerts.push({ type:'info', msg:'Gerçek sistemde frame veya motor değiştiğinde PID ve filtre ayarlarının yeniden değerlendirilmesi gerekir.' })
  return alerts
}

export function getCompatStatus(alerts) {
  const hasCritical = alerts.some(a => a.type === 'critical')
  const hasWarning = alerts.some(a => a.type === 'warning')
  if (hasCritical) return { ok: false, label: 'Kritik uyumsuzluk var!', color: '#ef4444' }
  if (hasWarning)  return { ok: false, label: 'Uyarılar mevcut', color: '#f59e0b' }
  return { ok: true, label: 'Tüm bileşenler uyumlu. Sistem dengeli çalışıyor.', color: '#22c55e' }
}
