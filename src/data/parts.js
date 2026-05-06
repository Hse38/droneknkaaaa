export const PARTS = {
  frames: [
    {
      id: 'freestyle', name: 'Freestyle Frame', subtitle: 'Agresif uçuş ve manevra',
      icon: '⚡', color: '#ef4444',
      image: '/images/frames/freestyle.png',
      fallbackEmoji: '🛸',
      avantaj: 'Çeviklik', dezavantaj: 'Stabilite',
      bullets: ['Hafif ve dayanıklı', 'Yüksek manevra kabiliyeti', 'Agresif uçuşa uygun'],
      stats: { hiz:+15, ceviklik:+20, kontrol:-10, stabilite:-5, ucusSuresi:-5, verimlilik:0, dayaniklilik:+10, sistemRiski:+5 }
    },
    {
      id: 'cinewhoop', name: 'Cinewhoop Frame', subtitle: 'Pervane koruyuculu stabil gövde',
      icon: '🎬', color: '#3b82f6',
      image: '/images/frames/cinewhoop.png',
      fallbackEmoji: '🚁',
      avantaj: 'Stabilite, Güvenlik', dezavantaj: 'Hız',
      bullets: ['Pervane koruyuculu', 'Kamera stabilitesi yüksek', 'Güvenli iç mekan uçuşu'],
      stats: { hiz:-15, ceviklik:-10, kontrol:+15, stabilite:+20, ucusSuresi:-5, verimlilik:0, dayaniklilik:+15, sistemRiski:-10 }
    },
    {
      id: 'longrange', name: 'Long Range Frame', subtitle: 'Uzun menzil ve verimli seyir',
      icon: '🗺️', color: '#22c55e',
      image: '/images/frames/longrange.png',
      fallbackEmoji: '✈️',
      avantaj: 'Verimlilik, Uçuş süresi', dezavantaj: 'Çeviklik',
      bullets: ['Uzun menzil optimizasyonu', 'Düşük drag profili', 'Yüksek verimlilik'],
      stats: { hiz:-5, ceviklik:-10, kontrol:+5, stabilite:+10, ucusSuresi:+25, verimlilik:+25, dayaniklilik:+5, sistemRiski:-5 }
    },
    {
      id: 'egitim', name: 'Eğitim Frame', subtitle: 'Yeni başlayanlar için güvenli',
      icon: '🎓', color: '#f59e0b',
      image: '/images/frames/egitim.png',
      fallbackEmoji: '🔰',
      avantaj: 'Kontrol, Güvenlik', dezavantaj: 'Performans',
      bullets: ['Dayanıklı yapı', 'Stabil uçuş profili', 'Kolay kontrol'],
      stats: { hiz:-10, ceviklik:-15, kontrol:+20, stabilite:+15, ucusSuresi:+5, verimlilik:+5, dayaniklilik:+20, sistemRiski:-15 }
    },
  ],
  motors: [
    {
      id: 'yuksek_kv', name: 'Yüksek KV Motor', subtitle: 'Hızlı tepki ve yüksek güç',
      icon: '🚀', color: '#ef4444',
      image: '/images/motors/yuksek_kv.png',
      fallbackEmoji: '⚙️',
      avantaj: 'Hız, İtiş Gücü', dezavantaj: 'Uçuş Süresi',
      bullets: ['Hızlı tepki', 'Yüksek güç', 'Daha fazla enerji tüketimi'],
      stats: { hiz:+20, ceviklik:+20, kontrol:-10, stabilite:-5, ucusSuresi:-20, verimlilik:-10, dayaniklilik:0, sistemRiski:+10 }
    },
    {
      id: 'orta_kv', name: 'Orta KV Motor', subtitle: 'Dengeli performans',
      icon: '⚖️', color: '#f59e0b',
      image: '/images/motors/orta_kv.png',
      fallbackEmoji: '⚙️',
      avantaj: 'Denge', dezavantaj: 'Uzmanlaşmamış',
      bullets: ['Dengeli performans', 'Çok yönlü kullanım', 'Orta enerji tüketimi'],
      stats: { hiz:+5, ceviklik:+5, kontrol:0, stabilite:0, ucusSuresi:0, verimlilik:+5, dayaniklilik:0, sistemRiski:0 }
    },
    {
      id: 'dusuk_kv', name: 'Düşük KV Motor', subtitle: 'Verimli ve uzun uçuş',
      icon: '🔋', color: '#22c55e',
      image: '/images/motors/dusuk_kv.png',
      fallbackEmoji: '⚙️',
      avantaj: 'Uçuş Süresi, Kontrol', dezavantaj: 'Hız',
      bullets: ['Düşük enerji tüketimi', 'Uzun uçuş süresi', 'Kolay kontrol'],
      stats: { hiz:-10, ceviklik:-5, kontrol:+10, stabilite:+5, ucusSuresi:+15, verimlilik:+15, dayaniklilik:+5, sistemRiski:-5 }
    },
  ],
  props: [
    {
      id: 'yuksek_pitch', name: 'Yüksek Pitch Pervane', subtitle: 'Agresif thrust',
      icon: '💨', color: '#ef4444',
      image: '/images/props/yuksek_pitch.png',
      fallbackEmoji: '🌀',
      avantaj: 'Hız, Çeviklik', dezavantaj: 'Motor zorlanması',
      bullets: ['Yüksek thrust', 'Agresif uçuş', 'Motor yükü artar'],
      stats: { hiz:+20, ceviklik:+10, kontrol:-10, stabilite:-5, ucusSuresi:-15, verimlilik:-10, dayaniklilik:0, sistemRiski:+10 }
    },
    {
      id: 'orta_pitch', name: 'Orta Pitch Pervane', subtitle: 'Dengeli thrust ve kontrol',
      icon: '🔄', color: '#f59e0b',
      image: '/images/props/orta_pitch.png',
      fallbackEmoji: '🌀',
      avantaj: 'Denge', dezavantaj: 'Uzmanlaşmamış',
      bullets: ['Dengeli performans', 'Kontrollü güç çıkışı', 'Hız kazanımı daha düşük'],
      stats: { hiz:+5, ceviklik:+5, kontrol:+5, stabilite:0, ucusSuresi:0, verimlilik:0, dayaniklilik:0, sistemRiski:0 }
    },
    {
      id: 'dusuk_pitch', name: 'Düşük Pitch Pervane', subtitle: 'Yumuşak ve stabil uçuş',
      icon: '🌿', color: '#22c55e',
      image: '/images/props/dusuk_pitch.png',
      fallbackEmoji: '🌀',
      avantaj: 'Stabilite', dezavantaj: 'Hız',
      bullets: ['Daha stabil uçuş', 'Kontrollü güç çıkışı', 'Hız kazanımı daha düşük'],
      stats: { hiz:-10, ceviklik:0, kontrol:+15, stabilite:+10, ucusSuresi:+10, verimlilik:+10, dayaniklilik:0, sistemRiski:-5 }
    },
  ],
  batteries: [
    {
      id: '3s', name: '3S LiPo Batarya', subtitle: 'Hafif ve kontrol odaklı',
      icon: '🔋', color: '#22c55e',
      image: '/images/batteries/3s.png',
      fallbackEmoji: '🔋',
      avantaj: 'Kontrol, Hafif', dezavantaj: 'Düşük güç',
      bullets: ['Hafif yapı', 'Kolay kontrol', 'Orta kapasite'],
      stats: { hiz:-10, ceviklik:-5, kontrol:+10, stabilite:+5, ucusSuresi:+5, verimlilik:+10, dayaniklilik:0, sistemRiski:-10 }
    },
    {
      id: '4s', name: '4S LiPo Batarya', subtitle: 'Standart FPV bataryası',
      icon: '⚡', color: '#f59e0b',
      image: '/images/batteries/4s.png',
      fallbackEmoji: '🔋',
      avantaj: 'Denge', dezavantaj: 'Yok',
      bullets: ['Dengeli performans', 'Orta ağırlık', 'Uygun uçuş süresi'],
      stats: { hiz:+10, ceviklik:+10, kontrol:0, stabilite:0, ucusSuresi:0, verimlilik:0, dayaniklilik:0, sistemRiski:0 }
    },
    {
      id: '6s', name: '6S LiPo Batarya', subtitle: 'Yüksek voltaj maksimum güç',
      icon: '💥', color: '#ef4444',
      image: '/images/batteries/6s.png',
      fallbackEmoji: '🔋',
      avantaj: 'Hız, Güç', dezavantaj: 'Sistem riski',
      bullets: ['Yüksek voltaj', 'Maksimum performans', 'Risk artar'],
      stats: { hiz:+20, ceviklik:+15, kontrol:-5, stabilite:-5, ucusSuresi:-5, verimlilik:-5, dayaniklilik:0, sistemRiski:+10 }
    },
    {
      id: 'yuksek_kapasite', name: 'Yüksek Kapasite Batarya', subtitle: 'Uzun uçuş süresi',
      icon: '🏋️', color: '#3b82f6',
      image: '/images/batteries/yuksek_kapasite.png',
      fallbackEmoji: '🔋',
      avantaj: 'Uçuş Süresi', dezavantaj: 'Ağırlık',
      bullets: ['Uzun uçuş süresi', 'Ağır yapı', 'Çeviklik azalır'],
      stats: { hiz:-5, ceviklik:-10, kontrol:-5, stabilite:+5, ucusSuresi:+20, verimlilik:+10, dayaniklilik:0, sistemRiski:0 }
    },
  ],
  software: [
    {
      id: 'agresif', name: 'Agresif Profil', subtitle: 'Freestyle (Betaflight)',
      icon: '🔥', color: '#ef4444',
      image: '/images/software/agresif.png',
      fallbackEmoji: '💻',
      avantaj: 'Kontrol', dezavantaj: 'Yok',
      bullets: ['Hızlı tepki', 'Akıcı kontrol', 'Freestyle odaklı ayarlar'],
      stats: { hiz:+10, ceviklik:+20, kontrol:-15, stabilite:-10, ucusSuresi:-5, verimlilik:-5, dayaniklilik:0, sistemRiski:+10 }
    },
    {
      id: 'dengeli', name: 'Dengeli Profil', subtitle: 'Genel Kullanım',
      icon: '⚖️', color: '#f59e0b',
      image: '/images/software/dengeli.png',
      fallbackEmoji: '💻',
      avantaj: 'Çok yönlülük', dezavantaj: 'Uzmanlaşmamış',
      bullets: ['Dengeli ayarlar', 'Çok yönlü kullanım', 'Orta tepki süresi'],
      stats: { hiz:0, ceviklik:0, kontrol:0, stabilite:0, ucusSuresi:0, verimlilik:0, dayaniklilik:0, sistemRiski:0 }
    },
    {
      id: 'stabil', name: 'Stabil Profil', subtitle: 'Cinematic / Eğitim',
      icon: '🕊️', color: '#22c55e',
      image: '/images/software/stabil.png',
      fallbackEmoji: '💻',
      avantaj: 'Kontrol, Stabilite', dezavantaj: 'Çeviklik',
      bullets: ['Yumuşak tepki', 'Yüksek stabilite', 'Eğitim dostu ayarlar'],
      stats: { hiz:-5, ceviklik:-10, kontrol:+20, stabilite:+20, ucusSuresi:+5, verimlilik:+5, dayaniklilik:0, sistemRiski:-10 }
    },
  ]
}

export const DEFAULT_BUILD = {
  frame: 'freestyle', motor: 'yuksek_kv', prop: 'dusuk_pitch',
  battery: '4s', software: 'agresif'
}

export function getPart(group, id) {
  return PARTS[group]?.find(p => p.id === id)
}
