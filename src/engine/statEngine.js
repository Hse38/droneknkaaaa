export const STAT_KEYS = ['hiz','ceviklik','kontrol','stabilite','ucusSuresi','verimlilik','dayaniklilik','sistemRiski']
export const STAT_LABELS = { hiz:'HIZ', ceviklik:'ÇEVİKLİK', kontrol:'STABİLİTE', stabilite:'STABİLİTE', ucusSuresi:'UÇUŞ SÜRESİ', verimlilik:'VERİMLİLİK', dayaniklilik:'DAYANIKLILIK', sistemRiski:'SİSTEM RİSKİ' }
export const STAT_DISPLAY = { hiz:'Hız', ceviklik:'Çeviklik', kontrol:'Kontrol', stabilite:'Stabilite', ucusSuresi:'Uçuş Süresi', verimlilik:'Verimlilik', dayaniklilik:'Dayanıklılık', sistemRiski:'Sistem Riski' }
export const STAT_ICONS = { hiz:'⚡', ceviklik:'🔄', kontrol:'🎮', stabilite:'🎯', ucusSuresi:'⏱️', verimlilik:'♻️', dayaniklilik:'🛡️', sistemRiski:'⚠️' }
export const STAT_COLORS = { hiz:'#ef4444', ceviklik:'#f59e0b', kontrol:'#22c55e', stabilite:'#3b82f6', ucusSuresi:'#a855f7', verimlilik:'#06b6d4', dayaniklilik:'#84cc16', sistemRiski:'#f97316' }

export function calculateStats(frame, motor, prop, battery, software) {
  const parts = [frame, motor, prop, battery, software]
  const result = {}
  STAT_KEYS.forEach(key => {
    let val = 50
    parts.forEach(p => { if (p?.stats?.[key] !== undefined) val += p.stats[key] })
    result[key] = Math.max(0, Math.min(100, val))
  })
  result.maxHiz = Math.round(60 + (result.hiz - 50) * 2.2)
  result.ucusDakika = Math.round(1 + (result.ucusSuresi / 100) * 14)
  result.agirlik = Math.round(400 + (100 - result.verimlilik) * 4)
  result.itisOrani = parseFloat((1.5 + (result.hiz / 100) * 5).toFixed(1))
  return result
}
