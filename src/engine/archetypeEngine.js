const ARCHETYPES = [
  {
    name: 'Tinywhoop',
    icon: '🫧',
    desc: 'Indoor, güvenli ve yüksek kontrol odaklı mikro karakter.',
    rules: { hiz: { max: 40 }, stabilite: { min: 65 }, kontrol: { min: 70 }, sistemRiski: { max: 30 } },
    weights: { hiz: 0.2, stabilite: 0.3, kontrol: 0.3, sistemRiski: 0.2 },
  },
  {
    name: 'Toothpick',
    icon: '🪶',
    desc: 'Ultra hafif, çevik ve akıcı throttle geçişleri.',
    rules: { hiz: { min: 55 }, ceviklik: { min: 60 }, dayaniklilik: { max: 50 } },
    weights: { hiz: 0.35, ceviklik: 0.4, dayaniklilik: 0.25 },
  },
  {
    name: 'Cinewhoop',
    icon: '🎬',
    desc: 'Akıcı çekim, düşük risk ve stabil görüntü karakteri.',
    rules: { stabilite: { min: 70 }, sistemRiski: { max: 35 }, kontrol: { min: 65 } },
    weights: { stabilite: 0.45, sistemRiski: 0.25, kontrol: 0.3 },
  },
  {
    name: 'Freestyle',
    icon: '🌀',
    desc: 'Yüksek manevra ve agresif uçuş tepkisi.',
    rules: { ceviklik: { min: 65 }, hiz: { min: 60 }, ucusSuresi: { max: 60 } },
    weights: { ceviklik: 0.45, hiz: 0.35, ucusSuresi: 0.2 },
  },
  {
    name: 'Race',
    icon: '🏁',
    desc: 'Maksimum hız, keskin dönüş ve yüksek tempolu karakter.',
    rules: { hiz: { min: 75 }, ceviklik: { min: 70 }, ucusSuresi: { max: 45 }, sistemRiski: { min: 50 } },
    weights: { hiz: 0.35, ceviklik: 0.3, ucusSuresi: 0.15, sistemRiski: 0.2 },
  },
  {
    name: 'Long Range',
    icon: '🗺️',
    desc: 'Uzun seyir, yüksek verim ve sakin cruise uçuşu.',
    rules: { ucusSuresi: { min: 70 }, verimlilik: { min: 65 }, hiz: { max: 60 } },
    weights: { ucusSuresi: 0.45, verimlilik: 0.35, hiz: 0.2 },
  },
]

function scoreAgainstRule(value, rule) {
  if (!rule) return 0
  if (rule.min !== undefined) {
    if (value >= rule.min) return 100
    const gap = rule.min - value
    return Math.max(0, 100 - (gap * 4))
  }
  if (rule.max !== undefined) {
    if (value <= rule.max) return 100
    const gap = value - rule.max
    return Math.max(0, 100 - (gap * 4))
  }
  return 0
}

function scoreArchetype(stats, archetype) {
  const score = Object.entries(archetype.rules).reduce((acc, [key, rule]) => {
    const weight = archetype.weights[key] || 0
    return acc + (scoreAgainstRule(stats[key] || 0, rule) * weight)
  }, 0)
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function analyzeArchetype(stats) {
  const scored = ARCHETYPES.map((a) => ({ ...a, score: scoreArchetype(stats, a) })).sort((a, b) => b.score - a.score)
  const primary = scored[0]
  const secondary = scored.slice(1).filter((a) => a.score > 40).map((a) => ({ name: a.name, score: a.score }))
  const allScores = scored.reduce((acc, a) => ({ ...acc, [a.name]: a.score }), {})

  return {
    primary: { name: primary.name, score: primary.score, icon: primary.icon, desc: primary.desc },
    secondary,
    allScores,
  }
}
