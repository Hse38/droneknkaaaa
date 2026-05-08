import { SIM_PROFILES } from '../data/simProfiles'

const KEYS = ['hiz', 'ceviklik', 'stabilite', 'kontrol', 'ucusSuresi', 'verimlilik']

function similarityScore(stats, profileStats) {
  const total = KEYS.reduce((acc, key) => {
    const diff = Math.abs((stats[key] || 0) - (profileStats[key] || 0))
    return acc + Math.max(0, 100 - diff)
  }, 0)
  return Math.round(total / KEYS.length)
}

export function recommendSims(stats) {
  return SIM_PROFILES
    .map((profile) => ({
      ...profile,
      similarity: similarityScore(stats, profile.statProfile),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
}
