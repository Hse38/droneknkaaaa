const COMPONENT_WEIGHTS = {
  frame: 0.15,
  motor: 0.35,
  prop: 0.25,
  battery: 0.15,
  software: 0.1,
}

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

function componentAffinity(archetypeName, part = {}, kind) {
  const id = part?.id || ''
  const frameType = part?.frameType || ''
  const size = part?.propSizeInch || part?.sizeInch || 0
  const cells = part?.cells || 0
  const kv = part?.kv || 0
  const sw = part?.id || ''
  const p = (value) => Math.max(0, Math.min(100, value))

  const table = {
    Tinywhoop: {
      frame: p(frameType === 'tinywhoop' ? 100 : frameType === 'ducted' ? 70 : 20),
      motor: p(kv > 10000 ? 100 : kv > 4000 ? 65 : 20),
      prop: p(size <= 1.8 ? 100 : size <= 2.5 ? 70 : 20),
      battery: p(cells <= 1 ? 100 : cells === 2 ? 65 : 10),
      software: p(['stabil', 'cinematic', 'dengeli'].includes(sw) ? 100 : 45),
    },
    Toothpick: {
      frame: p(frameType === 'toothpick' ? 100 : frameType === 'tinywhoop' ? 70 : 35),
      motor: p(kv >= 3500 && kv <= 8000 ? 100 : kv > 8000 ? 70 : 40),
      prop: p(size >= 2.3 && size <= 2.6 ? 100 : size <= 3.0 ? 65 : 30),
      battery: p(cells === 2 ? 100 : cells === 3 ? 70 : 35),
      software: p(['dengeli', 'freestyle'].includes(sw) ? 100 : 50),
    },
    Cinewhoop: {
      frame: p(frameType === 'ducted' ? 100 : frameType === 'x' ? 65 : 35),
      motor: p(kv >= 2000 && kv <= 4500 ? 100 : kv < 2000 ? 80 : 45),
      prop: p(id.includes('ducted') || (size >= 3.0 && size <= 3.8) ? 100 : 45),
      battery: p(cells >= 4 ? 100 : cells === 3 ? 70 : 35),
      software: p(['cinematic', 'stabil', 'dengeli'].includes(sw) ? 100 : 45),
    },
    Freestyle: {
      frame: p(['x', 'stretched'].includes(frameType) ? 100 : frameType === 'ducted' ? 60 : 40),
      motor: p(kv >= 1750 && kv <= 2450 ? 100 : kv > 2450 ? 80 : 55),
      prop: p(size >= 4.9 && size <= 5.3 ? 100 : size >= 3.4 && size <= 5.5 ? 70 : 45),
      battery: p(cells === 4 || cells === 6 ? 100 : cells === 3 ? 55 : 30),
      software: p(['freestyle', 'agresif', 'dengeli'].includes(sw) ? 100 : 45),
    },
    Race: {
      frame: p(frameType === 'stretched' ? 100 : frameType === 'x' ? 80 : 35),
      motor: p(kv >= 2000 && kv <= 2800 ? 100 : kv > 2800 ? 70 : 45),
      prop: p(size >= 4.9 && size <= 5.3 ? 100 : size >= 3.4 && size <= 5.6 ? 65 : 35),
      battery: p(cells === 6 ? 100 : cells === 4 ? 70 : 25),
      software: p(['racing', 'agresif', 'freestyle'].includes(sw) ? 100 : 35),
    },
    'Long Range': {
      frame: p(frameType === 'lr' ? 100 : ['x', 'stretched'].includes(frameType) ? 65 : 35),
      motor: p(kv <= 1800 ? 100 : kv <= 2200 ? 75 : 45),
      prop: p(size >= 6.8 ? 100 : size >= 5 ? 70 : 35),
      battery: p(cells === 6 ? 100 : cells === 4 ? 70 : 30),
      software: p(['cinematic', 'stabil', 'dengeli'].includes(sw) ? 100 : 45),
    },
  }

  return table[archetypeName]?.[kind] ?? 50
}

function compositeScore(baseScore, archetype, buildParts) {
  if (!buildParts) return baseScore
  const partScore =
    componentAffinity(archetype.name, buildParts.frame, 'frame') * COMPONENT_WEIGHTS.frame +
    componentAffinity(archetype.name, buildParts.motor, 'motor') * COMPONENT_WEIGHTS.motor +
    componentAffinity(archetype.name, buildParts.prop, 'prop') * COMPONENT_WEIGHTS.prop +
    componentAffinity(archetype.name, buildParts.battery, 'battery') * COMPONENT_WEIGHTS.battery +
    componentAffinity(archetype.name, buildParts.software, 'software') * COMPONENT_WEIGHTS.software
  return Math.round((baseScore * 0.5) + (partScore * 0.5))
}

export function analyzeArchetype(stats, buildParts = null) {
  const scored = ARCHETYPES
    .map((a) => {
      const base = scoreArchetype(stats, a)
      return { ...a, score: Math.max(0, Math.min(100, compositeScore(base, a, buildParts))) }
    })
    .sort((a, b) => b.score - a.score)
  const primary = scored[0]
  const secondary = scored.slice(1).filter((a) => a.score >= 40).map((a) => ({ name: a.name, score: a.score }))
  const allScores = scored.reduce((acc, a) => ({ ...acc, [a.name]: a.score }), {})

  return {
    primary: { name: primary.name, score: primary.score, icon: primary.icon, desc: primary.desc },
    secondary,
    allScores,
  }
}
