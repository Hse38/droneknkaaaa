export const MISSIONS = [
  {
    id: 'challenge_control',
    title: 'Güvenli Başlangıç Platformu',
    icon: '🧠',
    color: '#22c55e',
    bgGradient: 'linear-gradient(135deg, #032211 0%, #060810 100%)',
    senaryo: 'Yeni başlayan pilotların ilk uçuş dersleri için bir eğitim buildi hazırlanıyor. Eğitmenler, hata toleransı yüksek ve sakin tepki veren bir platform istiyor. Amaç güvenli kalkış, sakin manevra ve kontrollü iniş.',
    amac: 'Yeni başlayanlar için güvenli ve kolay kontrollü drone tasarla.',
    desc: 'Kontrol, stabilite ve düşük risk odaklı eğitim dostu bir sistem üret.',
    hedefler: ['Yüksek kontrol', 'Yüksek stabilite', 'Düşük sistem riski'],
    targets: { kontrol: 72, stabilite: 72, sistemRiski: { max: 35 } },
    ipucu: 'Stabil veya cinematic yazılım, düşük/orta KV motor ve kontrollü pervane setleri başlangıç için daha güvenlidir.',
    uyarilar: {
      dusukCeviklik: 'Çeviklik düşük olabilir; bu görevde kritik değil, öncelik güvenli kontrol.',
      yuksekRisk: 'Sistem riski yüksek. Eğitim uçuşlarında güvenlik marjı düşmemeli.',
      dusukStabilite: 'Stabilite yetersiz. Yeni başlayanlar hover sırasında zorlanır.',
      dusukUcusSuresi: 'Uçuş süresi kısa kalırsa eğitim tekrarları verimsiz olur.'
    },
    degerlendirme: {
      mukemmel: 'Eğitim için örnek bir platform oluşturdun. Güvenlik ve kontrol dengesi çok güçlü.',
      iyi: 'Sistem kullanılabilir, birkaç ayarla daha stabil hale gelebilir.',
      orta: 'Temel seviyede uygun, ama başlangıç eğitiminde riskler hâlâ mevcut.',
      kotu: 'Bu build yeni başlayanlar için fazla zorlayıcı ve riskli kalıyor.'
    },
    ogrenmeNotlari: ['Eğitim buildlerinde ilk öncelik güvenliktir.', 'Stabilite arttıkça pilot hataları daha kolay toparlanır.', 'Düşük sistem riski, daha öngörülebilir uçuş davranışı sağlar.'],
    odul: { puan: 500, xp: 260 },
  },
  {
    id: 'challenge_agile',
    title: 'Agresif Manevra Testi',
    icon: '⚡',
    color: '#ef4444',
    bgGradient: 'linear-gradient(135deg, #250607 0%, #060810 100%)',
    senaryo: 'Kısıtlı bir parkurda hızlı yön değişimleri ve sert throttle geçişleriyle bir manevra testi yapılacak. Pilot senden refleksi yüksek bir build istiyor. Dar kapılar ve keskin dönüşler performansın sınırını belirleyecek.',
    amac: 'Yüksek manevra kabiliyetli agresif bir build oluştur.',
    desc: 'Çeviklik, hız ve throttle tepkisi odaklı yüksek tempolu konfigürasyon geliştir.',
    hedefler: ['Yüksek çeviklik', 'Yüksek hız', 'Agresif tepki karakteri'],
    targets: { ceviklik: 75, hiz: 70, sistemRiski: { max: 70 } },
    ipucu: 'Daha yüksek KV motor, agresif/freestyle yazılım ve performans odaklı pervane kombinasyonu manevra hızını artırır.',
    uyarilar: {
      dusukCeviklik: 'Manevra tepkisi yetersiz. Daha çevik bir frame/prop ikilisine geç.',
      yuksekRisk: 'Risk seviyesi kritik eşiği aştı. Bu tempoda kontrol kaybı yaşanabilir.',
      dusukStabilite: 'Sert dönüş sonrası toparlama süresi uzuyor. Kontrol karakterini iyileştir.',
      dusukUcusSuresi: 'Performans iyi ama uçuş süresi yarış akışını tamamlamaya yetmeyebilir.'
    },
    degerlendirme: {
      mukemmel: 'Build parkur saldırısı için çok güçlü. Yüksek çeviklik ve hız dengesi yakalandı.',
      iyi: 'Agresif profile yakınsın, ufak tuning ile daha keskin hale gelir.',
      orta: 'Temel hız var ama manevra karakteri henüz tam agresif değil.',
      kotu: 'Bu konfigürasyon agresif uçuş için fazla yumuşak veya dengesiz kalıyor.'
    },
    ogrenmeNotlari: ['Yüksek çeviklik için yalnızca motor değil frame/prop geometri de belirleyicidir.', 'Agresif tuning sistem riskini artırır; sınırı korumak gerekir.', 'Throttle cevabı ve kontrol dengesi birlikte optimize edilmelidir.'],
    odul: { puan: 620, xp: 320 },
  },
  {
    id: 'challenge_cinematic',
    title: 'Akıcı Çekim Operasyonu',
    icon: '🎬',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #030d1f 0%, #060810 100%)',
    senaryo: 'Profesyonel bir çekim ekibi, tek geçişte pürüzsüz FPV görüntü almak istiyor. Sahne içinde ani yön değişimleri yerine kontrollü ve akıcı uçuş gerekiyor. Titreşim ve sarsıntı en düşük seviyede tutulmalı.',
    amac: 'Akıcı görüntü çekimine uygun stabil sistem tasarla.',
    desc: 'Stabilite, düşük titreşim ve kontrollü hareket odağında sinematik bir yapı kur.',
    hedefler: ['Yüksek stabilite', 'Düşük titreşim karakteri', 'Kontrollü hareket'],
    targets: { stabilite: 75, kontrol: 65, sistemRiski: { max: 40 } },
    ipucu: 'Ducted/cinematic odaklı frame, düşük-orta pitch pervane ve cinematic/stabil yazılım profilleri çekim kalitesini artırır.',
    uyarilar: {
      dusukCeviklik: 'Aşırı çeviklik gerekmez; bu görevde akıcılık çeviklikten daha önemlidir.',
      yuksekRisk: 'Risk yüksekse çekim sırasında ani dengesizlik ve sahne kaybı yaşanabilir.',
      dusukStabilite: 'Görüntüde mikro sarsıntılar oluşuyor. Stabiliteyi artırmadan profesyonel sonuç zor.',
      dusukUcusSuresi: 'Çekim penceresi kısa kalıyor; tekrar uçuş gerektirir ve prodüksiyon süresini uzatır.'
    },
    degerlendirme: {
      mukemmel: 'Çekim odaklı çok güçlü bir platform kurdun. Akıcı hareket ve stabil görüntü hedefi karşılandı.',
      iyi: 'Sinematik profile yakın bir sonuç var, ufak filtre/tune iyileştirmeleriyle kalite artar.',
      orta: 'Kullanılabilir ama görüntü tutarlılığı profesyonel çekim için sınırlı.',
      kotu: 'Bu build sinematik görev için fazla agresif veya kararsız.'
    },
    ogrenmeNotlari: ['Sinematik uçuşta kontrol eğrileri performanstan daha kritiktir.', 'Titreşim azaltımı için pervane + filtre + frame birlikte değerlendirilmelidir.', 'Düşük sistem riski, çekim güvenilirliğinin temelidir.'],
    odul: { puan: 650, xp: 330 },
  },
  {
    id: 'challenge_efficiency',
    title: 'Verimli Seyir Görevi',
    icon: '🛰️',
    color: '#22c55e',
    bgGradient: 'linear-gradient(135deg, #063218 0%, #060810 100%)',
    senaryo: 'Uzun görev süresi gerektiren bir keşif hattında drone’un daha az enerji harcayarak daha fazla alan taraması bekleniyor. Ani hızdan çok verimli seyir ve dengeli enerji tüketimi önemli. Sistem uzun süre stabil kalmalı.',
    amac: 'En yüksek uçuş süresini sağlayan verimli sistem oluştur.',
    desc: 'Verimlilik, düşük tüketim ve stabil seyir odaklı uzun uçuş karakteri üret.',
    hedefler: ['Yüksek verimlilik', 'Düşük tüketim karakteri', 'Stabil seyir'],
    targets: { verimlilik: 70, ucusSuresi: 75, stabilite: 62 },
    ipucu: 'Büyük verimli pervane + düşük KV motor + yüksek kapasite batarya kombinasyonu uzun seyirde avantaj sağlar.',
    uyarilar: {
      dusukCeviklik: 'Çeviklik düşük olabilir; verimli seyir görevinde bu kabul edilebilir.',
      yuksekRisk: 'Risk seviyesi yükseldikçe uzun uçuşta arıza olasılığı artar.',
      dusukStabilite: 'Seyir hattında dalgalanma oluşuyor. Stabil uçuş karakterini güçlendir.',
      dusukUcusSuresi: 'Uçuş süresi hedefin altında. Enerji tüketimini azaltan parça seçimi yapman gerekir.'
    },
    degerlendirme: {
      mukemmel: 'Uzun seyir için son derece verimli bir sistem kurdun. Enerji ve stabilite dengesi çok iyi.',
      iyi: 'Görev hedefi büyük ölçüde karşılandı, birkaç optimizasyonla süre daha da uzayabilir.',
      orta: 'Kısmi başarı var ama enerji tüketimi hâlâ yüksek kalıyor.',
      kotu: 'Build, verimli seyir görevinde beklenen süre/denge hedefini karşılayamıyor.'
    },
    ogrenmeNotlari: ['Uzun uçuşta verimlilik ve uçuş süresi birlikte optimize edilmelidir.', 'Yüksek kapasite her zaman yeterli değildir; ağırlık etkisi de hesaba katılır.', 'Stabil seyir, enerji yönetimini doğrudan iyileştirir.'],
    odul: { puan: 700, xp: 360 },
  }
]
