export function scoreBuild(mission, stats, compatAlerts) {
  let gorev = 40, breakdown = {}
  const notes = []
  const warningMap = mission.uyarilar || {}
  Object.entries(mission.targets).forEach(([key, target]) => {
    const val = stats[key]
    if (typeof target === 'object' && target.max !== undefined) {
      if (val > target.max) {
        const p = Math.min(15, Math.round((val - target.max) / 5))
        gorev -= p
        if (key === 'sistemRiski' && warningMap.yuksekRisk) notes.push(warningMap.yuksekRisk)
        else notes.push(`${key} hedefin üzerinde`)
      }
    } else {
      if (val < target) {
        const p = Math.min(15, Math.round((target - val) / 4))
        gorev -= p
        if (key === 'ceviklik' && warningMap.dusukCeviklik) notes.push(warningMap.dusukCeviklik)
        else if (key === 'stabilite' && warningMap.dusukStabilite) notes.push(warningMap.dusukStabilite)
        else if (key === 'ucusSuresi' && warningMap.dusukUcusSuresi) notes.push(warningMap.dusukUcusSuresi)
        else notes.push(`${key} hedefin altında`)
      }
    }
  })
  breakdown.gorev = Math.max(0, gorev)
  const criticals = compatAlerts.filter(a => a.type === 'critical').length
  const warnings  = compatAlerts.filter(a => a.type === 'warning').length
  breakdown.uyum = Math.max(0, 25 - criticals * 10 - warnings * 3)
  const keys = ['hiz','ceviklik','kontrol','stabilite','ucusSuresi']
  const avg = keys.reduce((s,k) => s + stats[k], 0) / keys.length
  const std = Math.sqrt(keys.reduce((s,k) => s + Math.pow(stats[k]-avg,2), 0) / keys.length)
  breakdown.denge = Math.max(0, Math.round(20 - std * 0.3))
  breakdown.risk  = Math.round(15 * (1 - stats.sistemRiski / 100))
  const total = Math.min(100, breakdown.gorev + breakdown.uyum + breakdown.denge + breakdown.risk)
  const stars = total >= 85 ? 3 : total >= 65 ? 2 : total >= 40 ? 1 : 0
  let text = ''
  if (mission.degerlendirme) {
    if (total >= 85) text = mission.degerlendirme.mukemmel
    else if (total >= 65) text = mission.degerlendirme.iyi
    else if (total >= 40) text = mission.degerlendirme.orta
    else text = mission.degerlendirme.kotu
  } else {
    if (total >= 85) text = `Mükemmel! Drone'unuz ${mission.title} için optimize edilmiş. Tüm hedefler karşılandı.`
    else if (total >= 65) text = `İyi tasarım! Bazı değerlerde iyileştirme yapılabilir. ${notes[0] || ''}`
    else if (total >= 40) text = `Kısmen uygun. ${notes[0] || 'Bileşen seçimlerini gözden geçirin.'}`
    else text = `Bu kombinasyon ${mission.title} için uygun değil. İpucu: ${mission.ipucu}`
  }
  if (total < 65 && notes.length) text = `${text} ${notes[0]}`

  return { total, breakdown, notes, text, stars, ogrenmeNotlari: mission.ogrenmeNotlari || [] }
}
