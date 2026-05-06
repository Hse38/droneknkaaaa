export const MISSIONS = [
  {
    id: 'freestyle', title: 'Freestyle Parkur Yarışı', icon: '⚡', color: '#ef4444',
    bgGradient: 'linear-gradient(135deg, #1f0505 0%, #060810 100%)',
    senaryo: 'Şehir dışındaki terk edilmiş bir fabrikada gizli bir FPV yarış turnuvası düzenleniyor. Dar koridorlar, keskin virajlar ve yüksek hız gerektiren bir parkur seni bekliyor. Rakipler en iyi ekipmanlarıyla geliyor, sen de drone’unu buna göre hazırlamalısın.',
    amac: 'Yüksek çeviklik ve hız odaklı freestyle drone tasarla.',
    desc: 'Keskin virajlı, hızlı ve agresif yarış parkuru için maksimum manevra kabiliyetine sahip drone üret.',
    hedefler: ['Çeviklik en az 75 olmalı', 'Hız en az 70 olmalı', 'Sistem riski 65 altında kalmalı'],
    targets: { ceviklik: 75, hiz: 70, sistemRiski: { max: 65 } },
    ipucu: 'Freestyle frame + yüksek KV motor + yüksek pitch pervane + agresif yazılım profili, parkur süresini belirgin şekilde düşürür.',
    uyarilar: {
      dusukCeviklik: 'Drone dar virajlarda gecikmeli tepki veriyor. Daha çevik bir kombinasyon için frame ve motor seçimini agresifleştir.',
      yuksekRisk: 'Sistem riski yarış temposu için kritik seviyede. Bu değerle motor ısınması ve kontrol kaybı yaşanabilir.',
      dusukStabilite: 'Manevra geçişlerinde gövde savruluyor. Kontrollü dönüş için pervane pitch ve yazılım profilini dengele.',
      dusukUcusSuresi: 'Batarya parkuru bitirmeden tükenebilir. Güç ve süre dengesini yeniden kurman gerekiyor.'
    },
    degerlendirme: {
      mukemmel: 'Muhteşem bir yarış kurulumu! Drone parkurda agresif ama kontrol edilebilir karakter sergiliyor.',
      iyi: 'Rekabetçi bir tasarım ortaya çıktı, ancak birkaç ince ayarla dönüş performansı daha da iyileşebilir.',
      orta: 'Parkur için temel gereksinimleri kısmen karşılıyor; hız veya çeviklik tarafında belirgin eksikler var.',
      kotu: 'Bu kurulum yarış parkuru için zayıf kalıyor. Daha hızlı ve çevik bir konfigürasyon denemelisin.'
    },
    ogrenmeNotlari: [
      'Freestyle görevlerinde yüksek çeviklik değeri, hızdan bile daha kritik olabilir.',
      'Yüksek KV motor performans getirir ama sistem riskini de artırır.',
      'Pervane ve yazılım profili birlikte ayarlanmadığında kontrol kaybı oluşabilir.'
    ],
    odul: { puan: 500, xp: 250 },
  },
  {
    id: 'rescue', title: 'Arama Kurtarma Operasyonu', icon: '🧭', color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #0f0520 0%, #060810 100%)',
    senaryo: 'Dağlık arazide kaybolan bir yürüyüşçü grubu için arama kurtarma operasyonu başlatıldı. Ekip senden geniş alanda uzun süre tarama yapabilecek, stabil görüntü alabilen bir drone istiyor. Batarya ömrü kritik seviyede önem taşıyor.',
    amac: 'Uzun uçuş süreli, stabil ve verimli drone tasarla.',
    desc: 'Geniş alanda güvenli tarama yapacak, uzun süre havada kalacak keşif drone’u hazırla.',
    hedefler: ['Uçuş süresi en az 75 olmalı', 'Stabilite en az 65 olmalı', 'Verimlilik en az 70 olmalı'],
    targets: { ucusSuresi: 75, stabilite: 65, verimlilik: 70 },
    ipucu: 'Long range frame + düşük KV motor + yüksek kapasite batarya, arama görevlerinde en güvenilir uçuş süresini sağlar.',
    uyarilar: {
      dusukCeviklik: 'Çeviklik düşük olsa da görev başarısı için kritik değil; önce stabilite ve süreyi hedeflemelisin.',
      yuksekRisk: 'Arama-kurtarma görevinde yüksek sistem riski kabul edilemez. Uzun uçuşta arıza ihtimali artar.',
      dusukStabilite: 'Görüntü akışı dalgalanıyor; bu durumda kayıp hedefleri tespit etmek zorlaşır.',
      dusukUcusSuresi: 'Batarya kapasitesi yetersiz. Görev alanı tamamlanmadan iniş yapmak zorunda kalabilirsin.'
    },
    degerlendirme: {
      mukemmel: 'Mükemmel bir kurtarma platformu! Drone uzun süre stabil tarama yapabilecek seviyede.',
      iyi: 'Görev için iyi bir temel var, ancak uçuş süresi veya stabilite biraz daha artırılabilir.',
      orta: 'Operasyona çıkabilir ama kapsamlı arama için performans sınırda kalıyor.',
      kotu: 'Bu kombinasyon arama-kurtarma için riskli. Önceliği süre, stabilite ve verimliliğe ver.'
    },
    ogrenmeNotlari: [
      'Arama kurtarma görevlerinde uçuş süresi ve stabil görüntü, hızdan daha değerlidir.',
      'Yüksek kapasite batarya süreyi artırırken ağırlık dengesini de etkiler.',
      'Uzun uçuş senaryolarında sistem riski mutlaka düşük tutulmalıdır.'
    ],
    odul: { puan: 700, xp: 350 },
  },
  {
    id: 'cinematic', title: 'Sinematik Belgesel Çekimi', icon: '🎬', color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #030d1f 0%, #060810 100%)',
    senaryo: 'Ünlü bir belgesel yapımcısı, doğa rezervindeki yaban hayatını FPV drone ile kaydetmek istiyor. Hayvanları ürkütmemek için sessiz, titreşimsiz ve akıcı uçuş şart. Yapımcı en yüksek görüntü kalitesini bekliyor.',
    amac: 'Titreşimsiz, stabil sinematik drone tasarla.',
    desc: 'Yaban hayatını rahatsız etmeden akıcı ve temiz görüntü alacak sinematik drone oluştur.',
    hedefler: ['Stabilite en az 75 olmalı', 'Kontrol en az 65 olmalı', 'Sistem riski 40 altında kalmalı'],
    targets: { stabilite: 75, kontrol: 65, sistemRiski: { max: 40 } },
    ipucu: 'Cinewhoop frame + düşük pitch pervane + stabil yazılım, titreşimi azaltıp görüntü akıcılığını artırır.',
    uyarilar: {
      dusukCeviklik: 'Bu görevde aşırı çeviklik şart değil; ani tepkiler yerine yumuşak kontrol önceliklidir.',
      yuksekRisk: 'Yüksek risk, çekim sırasında ani düşüş veya titreşim artışı anlamına gelir.',
      dusukStabilite: 'Görüntüde sarsıntı oluşuyor. Belgesel çekim kalitesi için stabiliteyi yükseltmelisin.',
      dusukUcusSuresi: 'Çekim penceresi kısa kalıyor. Uzun sekanslar için uçuş süresini artır.'
    },
    degerlendirme: {
      mukemmel: 'Belgesel standartlarında bir kurulum! Akıcı ve temiz çekim için ideal bir drone tasarladın.',
      iyi: 'Görüntü kalitesi tatmin edici, ancak uzun planlarda daha stabil bir profil faydalı olur.',
      orta: 'Temel çekim yapılabilir; titreşim ve kontrol dengesinde geliştirme gerekiyor.',
      kotu: 'Bu kombinasyon sinematik çekim için uygun değil. Daha stabil ve düşük riskli yapı kurmalısın.'
    },
    ogrenmeNotlari: [
      'Sinematik uçuşta ani hızlanma yerine akıcı kontrol daha değerlidir.',
      'Düşük pitch pervaneler titreşim kontrolüne önemli katkı sağlar.',
      'Sistem riski düşük olduğunda çekim güvenilirliği belirgin şekilde artar.'
    ],
    odul: { puan: 600, xp: 300 },
  },
  {
    id: 'egitim', title: 'Eğitim Kampı', icon: '🎓', color: '#22c55e',
    bgGradient: 'linear-gradient(135deg, #052e16 0%, #060810 100%)',
    senaryo: 'Bir FPV drone eğitim merkezinde yeni başlayan öğrenciler için güvenli ve kontrol edilebilir bir drone hazırlamalısın. Öğrenciler ilk kez uçuracak, drone çarpmalara dayanıklı ve kolay kontrol edilebilir olmalı. Eğitmenler düşük riskli sistem kararlılığı bekliyor.',
    amac: 'Güvenli, dayanıklı ve kolay kontrollü eğitim drone’u tasarla.',
    desc: 'Başlangıç seviyesine uygun, güvenli ve dayanıklı eğitim drone’u geliştir.',
    hedefler: ['Kontrol en az 70 olmalı', 'Stabilite en az 70 olmalı', 'Dayanıklılık en az 70 olmalı'],
    targets: { kontrol: 70, stabilite: 70, dayaniklilik: 70, sistemRiski: { max: 30 } },
    ipucu: 'Eğitim frame + düşük KV motor + stabil yazılım profili, öğrenciler için güvenli bir öğrenme ortamı oluşturur.',
    uyarilar: {
      dusukCeviklik: 'Düşük çeviklik eğitim görevi için kritik değildir; önemli olan öngörülebilir kontrol tepkisidir.',
      yuksekRisk: 'Eğitim modunda yüksek sistem riski güvenlik protokolünü ihlal eder.',
      dusukStabilite: 'Öğrenciler drone’u sabit tutmakta zorlanır. Stabiliteyi mutlaka yükseltmelisin.',
      dusukUcusSuresi: 'Kısa uçuş süresi eğitim tekrarlarını kısıtlar, verimi düşürür.'
    },
    degerlendirme: {
      mukemmel: 'Harika bir eğitim platformu! Güvenlik, kontrol ve dayanıklılık dengesi örnek seviyede.',
      iyi: 'Eğitim uçuşları için uygun, ancak bazı güvenlik metrikleri daha da güçlendirilebilir.',
      orta: 'Başlangıç için kullanılabilir ama istikrarlı eğitim süreci için ek iyileştirme gerekli.',
      kotu: 'Bu kurulum yeni başlayanlar için riskli. Önce güvenlik ve kontrol odaklı seçim yapmalısın.'
    },
    ogrenmeNotlari: [
      'Eğitim drone’larında düşük risk, yüksek performanstan daha önceliklidir.',
      'Dayanıklılık, öğrenme sürecindeki çarpışmalarda maliyeti düşürür.',
      'Kontrol ve stabilite arttıkça öğrencinin özgüveni hızla gelişir.'
    ],
    odul: { puan: 500, xp: 250 },
  }
]
