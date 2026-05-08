const BASE_PARTS = {
  frames: [
    { id:'tinywhoop', name:'Tinywhoop Frame', subtitle:'65mm | çok hafif, indoor', icon:'🪶', color:'#00d4ff', image:'/images/frames/tinywhoop.png', fallbackEmoji:'🛸', sizeInch:1.3, frameType:'tinywhoop', bullets:['65mm mikro gövde', 'Kapalı alan optimizasyonu', 'Çok düşük ağırlık'], avantaj:'Kontrol, güvenlik', dezavantaj:'Maks hız', stats:{ hiz:-18, ceviklik:+8, kontrol:+20, stabilite:+16, ucusSuresi:+6, verimlilik:+12, dayaniklilik:-8, sistemRiski:-18 } },
    { id:'toothpick', name:'Toothpick Frame', subtitle:'2.5" | ultra hafif, çevik', icon:'🧩', color:'#a855f7', image:'/images/frames/toothpick.png', fallbackEmoji:'🛸', sizeInch:2.5, frameType:'toothpick', bullets:['Düşük kütle', 'Hızlı yön değişimi', 'Açık pervane yapısı'], avantaj:'Çeviklik', dezavantaj:'Dayanıklılık', stats:{ hiz:+4, ceviklik:+18, kontrol:+6, stabilite:-4, ucusSuresi:+6, verimlilik:+10, dayaniklilik:-12, sistemRiski:+2 } },
    { id:'ducted', name:'Ducted Frame', subtitle:'3.5" | cinewhoop, güvenli', icon:'🛡️', color:'#3b82f6', image:'/images/frames/ducted.png', fallbackEmoji:'🚁', sizeInch:3.5, frameType:'ducted', bullets:['Pervane korumalı', 'Sinematik uçuşa uygun', 'Yüksek çarpışma toleransı'], avantaj:'Stabilite', dezavantaj:'Hız', stats:{ hiz:-10, ceviklik:-2, kontrol:+14, stabilite:+20, ucusSuresi:+2, verimlilik:+4, dayaniklilik:+16, sistemRiski:-12 } },
    { id:'x_frame', name:'X Frame', subtitle:'5" | klasik freestyle', icon:'❌', color:'#ef4444', image:'/images/frames/xframe.png', fallbackEmoji:'🛸', sizeInch:5, frameType:'x', bullets:['Klasik 5 inç geometri', 'Freestyle denge noktası', 'Yüksek parça uyumluluğu'], avantaj:'Çok yönlülük', dezavantaj:'Ağırlık', stats:{ hiz:+10, ceviklik:+12, kontrol:+2, stabilite:+2, ucusSuresi:-4, verimlilik:-2, dayaniklilik:+6, sistemRiski:+6 } },
    { id:'stretched', name:'Stretched Frame', subtitle:'5" | race odaklı', icon:'🏁', color:'#f97316', image:'/images/frames/stretched.png', fallbackEmoji:'🛸', sizeInch:5, frameType:'stretched', bullets:['Uzun aks açıklığı', 'Yüksek hız stabilitesi', 'Yarış odaklı geometri'], avantaj:'Hız', dezavantaj:'Düşük tolerans', stats:{ hiz:+18, ceviklik:+14, kontrol:-2, stabilite:+2, ucusSuresi:-10, verimlilik:-6, dayaniklilik:-4, sistemRiski:+14 } },
    { id:'lr_frame', name:'LR Frame', subtitle:'7" | long range', icon:'🗺️', color:'#22c55e', image:'/images/frames/lr.png', fallbackEmoji:'✈️', sizeInch:7, frameType:'lr', bullets:['7 inç uzun menzil', 'Düşük cruise tüketimi', 'Büyük batarya desteği'], avantaj:'Süre, verim', dezavantaj:'Çeviklik', stats:{ hiz:-4, ceviklik:-16, kontrol:+8, stabilite:+10, ucusSuresi:+20, verimlilik:+18, dayaniklilik:+8, sistemRiski:-6 } },
  ],
  motors: [
    { id:'1106_6000', name:'1106 – 6000KV', subtitle:'ultra hafif, tinywhoop', icon:'⚙️', color:'#00d4ff', image:'/images/motors/1106_6000.png', fallbackEmoji:'⚙️', kv:6000, motorClass:'1106', bullets:['Mikro sınıf', 'Ani throttle tepkisi', 'Düşük kütle'], avantaj:'Mikro çeviklik', dezavantaj:'Isınma eğilimi', stats:{ hiz:+2, ceviklik:+14, kontrol:+8, stabilite:+4, ucusSuresi:-2, verimlilik:+2, dayaniklilik:-6, sistemRiski:+8 } },
    { id:'1404_4600', name:'1404 – 4600KV', subtitle:'toothpick motor', icon:'⚙️', color:'#a855f7', image:'/images/motors/1404_4600.png', fallbackEmoji:'⚙️', kv:4600, motorClass:'1404', bullets:['Toothpick dengesi', 'Hafif çekiş', 'Yüksek verim'], avantaj:'Hafif güç', dezavantaj:'Sınırlı thrust', stats:{ hiz:+6, ceviklik:+12, kontrol:+4, stabilite:+2, ucusSuresi:+2, verimlilik:+8, dayaniklilik:-2, sistemRiski:+4 } },
    { id:'2004_3000', name:'2004 – 3000KV', subtitle:'orta boy, dengeli', icon:'⚙️', color:'#22c55e', image:'/images/motors/2004_3000.png', fallbackEmoji:'⚙️', kv:3000, motorClass:'2004', bullets:['Dengeli sınıf', 'Orta thrust profili', 'Sürdürülebilir tüketim'], avantaj:'Denge', dezavantaj:'Maks performans', stats:{ hiz:+8, ceviklik:+6, kontrol:+8, stabilite:+6, ucusSuresi:+4, verimlilik:+8, dayaniklilik:+2, sistemRiski:0 } },
    { id:'2207_1950', name:'2207 – 1950KV', subtitle:'freestyle/LR motor', icon:'⚙️', color:'#3b82f6', image:'/images/motors/2207_1950.png', fallbackEmoji:'⚙️', kv:1950, motorClass:'2207', bullets:['6S uyumlu', 'Yüksek tork', 'Cruise verimi iyi'], avantaj:'Tork + verim', dezavantaj:'Ağırlık', stats:{ hiz:+10, ceviklik:+4, kontrol:+6, stabilite:+8, ucusSuresi:+2, verimlilik:+6, dayaniklilik:+6, sistemRiski:+4 } },
    { id:'2207_2450', name:'2207 – 2450KV', subtitle:'freestyle/race motor', icon:'⚙️', color:'#f59e0b', image:'/images/motors/2207_2450.png', fallbackEmoji:'⚙️', kv:2450, motorClass:'2207', bullets:['Yüksek throttle', 'Yarış karakteri', 'Ani hızlanma'], avantaj:'Maks hız', dezavantaj:'Tüketim', stats:{ hiz:+18, ceviklik:+10, kontrol:-2, stabilite:-2, ucusSuresi:-10, verimlilik:-8, dayaniklilik:0, sistemRiski:+12 } },
    { id:'2806_1300', name:'2806.5 – 1300KV', subtitle:'heavy lift, LR', icon:'⚙️', color:'#ef4444', image:'/images/motors/2806_1300.png', fallbackEmoji:'⚙️', kv:1300, motorClass:'2806', bullets:['Büyük stator', 'Ağır yük taşıma', 'Uzun menzil odaklı'], avantaj:'Dayanım', dezavantaj:'Çeviklik', stats:{ hiz:+6, ceviklik:-10, kontrol:+6, stabilite:+10, ucusSuresi:+6, verimlilik:+10, dayaniklilik:+12, sistemRiski:+2 } },
  ],
  props: [
    { id:'31mm_3b', name:'31mm 3-Blade', subtitle:'tinywhoop', icon:'🌀', color:'#00d4ff', image:'/images/props/31mm_3blade.png', fallbackEmoji:'🌀', propSizeInch:1.2, blades:3, bullets:['Mikro thrust', 'Düşük atalet', 'İç mekan kontrol'], avantaj:'Kontrol', dezavantaj:'Hız', stats:{ hiz:-10, ceviklik:+10, kontrol:+12, stabilite:+8, ucusSuresi:+8, verimlilik:+8, dayaniklilik:-2, sistemRiski:-10 } },
    { id:'2521', name:'2.5" 2521', subtitle:'toothpick', icon:'🌀', color:'#a855f7', image:'/images/props/2521.png', fallbackEmoji:'🌀', propSizeInch:2.5, blades:3, bullets:['Hızlı spool', 'Toothpick uyumu', 'Düşük titreşim'], avantaj:'Çeviklik', dezavantaj:'Top speed', stats:{ hiz:+2, ceviklik:+14, kontrol:+8, stabilite:+4, ucusSuresi:+4, verimlilik:+6, dayaniklilik:0, sistemRiski:+2 } },
    { id:'3520', name:'3.5" 3520', subtitle:'cinewhoop/ducted', icon:'🌀', color:'#3b82f6', image:'/images/props/3520.png', fallbackEmoji:'🌀', propSizeInch:3.5, blades:3, bullets:['Orta disk alanı', 'Ducted sinematik', 'Yumuşak throttle'], avantaj:'Stabilite', dezavantaj:'Agresif hız', stats:{ hiz:+2, ceviklik:+2, kontrol:+10, stabilite:+12, ucusSuresi:+2, verimlilik:+6, dayaniklilik:+2, sistemRiski:-4 } },
    { id:'5143', name:'5" 5143', subtitle:'freestyle agresif', icon:'🌀', color:'#ef4444', image:'/images/props/5143.png', fallbackEmoji:'🌀', propSizeInch:5, blades:3, bullets:['Yüksek pitch', 'Agresif ivmelenme', 'Freestyle punch'], avantaj:'Patlayıcı güç', dezavantaj:'Tüketim', stats:{ hiz:+16, ceviklik:+12, kontrol:-6, stabilite:-4, ucusSuresi:-12, verimlilik:-10, dayaniklilik:0, sistemRiski:+12 } },
    { id:'5052', name:'5" 5052', subtitle:'freestyle dengeli', icon:'🌀', color:'#f59e0b', image:'/images/props/5052.png', fallbackEmoji:'🌀', propSizeInch:5, blades:3, bullets:['Dengeli 5 inç', 'Kontrollü thrust', 'Geniş kullanım'], avantaj:'Denge', dezavantaj:'Aşırı hız', stats:{ hiz:+10, ceviklik:+8, kontrol:+6, stabilite:+4, ucusSuresi:-4, verimlilik:-2, dayaniklilik:+2, sistemRiski:+4 } },
    { id:'7035', name:'7" 7035', subtitle:'long range', icon:'🌀', color:'#22c55e', image:'/images/props/7035.png', fallbackEmoji:'🌀', propSizeInch:7, blades:2, bullets:['Yüksek verim cruise', 'Düşük RPM uçuş', 'Long-range profili'], avantaj:'Süre', dezavantaj:'Çeviklik', stats:{ hiz:-6, ceviklik:-12, kontrol:+8, stabilite:+10, ucusSuresi:+14, verimlilik:+14, dayaniklilik:+4, sistemRiski:-6 } },
  ],
  batteries: [
    { id:'1s_450', name:'1S 450mAh', subtitle:'3.7V, ~25g, 30C | tinywhoop', icon:'🔋', color:'#00d4ff', image:'/images/batteries/1s_450.png', fallbackEmoji:'🔋', cells:1, capacity:450, weight:25, cRating:30, bullets:['Mikro hücre', 'Çok hafif paket', 'Düşük anlık akım'], avantaj:'Ağırlık', dezavantaj:'Güç', stats:{ hiz:-18, ceviklik:+6, kontrol:+8, stabilite:+8, ucusSuresi:+2, verimlilik:+8, dayaniklilik:0, sistemRiski:-16 } },
    { id:'2s_650', name:'2S 650mAh', subtitle:'7.4V, ~45g, 50C | toothpick', icon:'🔋', color:'#a855f7', image:'/images/batteries/2s_650.png', fallbackEmoji:'🔋', cells:2, capacity:650, weight:45, cRating:50, bullets:['Toothpick uyum', 'Orta akım kabiliyeti', 'Düşük kütle'], avantaj:'Hafif güç', dezavantaj:'Sınırlı süre', stats:{ hiz:-6, ceviklik:+8, kontrol:+6, stabilite:+4, ucusSuresi:+2, verimlilik:+6, dayaniklilik:0, sistemRiski:-8 } },
    { id:'4s_1500', name:'4S 1500mAh', subtitle:'14.8V, ~175g, 100C | freestyle', icon:'🔋', color:'#3b82f6', image:'/images/batteries/4s_1500.png', fallbackEmoji:'🔋', cells:4, capacity:1500, weight:175, cRating:100, bullets:['Freestyle standardı', 'Yüksek çıkış', 'Dengeli süre'], avantaj:'Denge', dezavantaj:'Ağırlık', stats:{ hiz:+10, ceviklik:+8, kontrol:+2, stabilite:0, ucusSuresi:+2, verimlilik:0, dayaniklilik:0, sistemRiski:+4 } },
    { id:'6s_1300', name:'6S 1300mAh', subtitle:'22.2V, ~200g, 120C | race/freestyle', icon:'🔋', color:'#ef4444', image:'/images/batteries/6s_1300.png', fallbackEmoji:'🔋', cells:6, capacity:1300, weight:200, cRating:120, bullets:['Yarış tepkisi', 'Çok yüksek voltaj', 'Kısa ama güçlü uçuş'], avantaj:'Performans', dezavantaj:'Risk', stats:{ hiz:+18, ceviklik:+10, kontrol:-4, stabilite:-2, ucusSuresi:-6, verimlilik:-6, dayaniklilik:0, sistemRiski:+14 } },
    { id:'6s_2200', name:'6S 2200mAh', subtitle:'22.2V, ~320g, 60C | long range', icon:'🔋', color:'#22c55e', image:'/images/batteries/6s_2200.png', fallbackEmoji:'🔋', cells:6, capacity:2200, weight:320, cRating:60, bullets:['Uzun menzil kapasite', 'Yüksek kütle', 'Uzun cruise uçuşu'], avantaj:'Süre', dezavantaj:'Çeviklik', stats:{ hiz:+2, ceviklik:-12, kontrol:+4, stabilite:+8, ucusSuresi:+18, verimlilik:+12, dayaniklilik:+2, sistemRiski:+2 } },
  ],
  software: [
    { id:'stabil', name:'Stabil', subtitle:'yumuşak, kontrollü', icon:'🕊️', color:'#22c55e', image:'/images/software/stabil.png', fallbackEmoji:'💻', bullets:['Yumuşak PID tepkisi', 'Yeni başlayan dostu', 'Titreşim toleranslı'], avantaj:'Kontrol', dezavantaj:'Düşük agresiflik', stats:{ hiz:-6, ceviklik:-6, kontrol:+18, stabilite:+18, ucusSuresi:+4, verimlilik:+4, dayaniklilik:+2, sistemRiski:-12 } },
    { id:'dengeli', name:'Dengeli', subtitle:'genel kullanım', icon:'⚖️', color:'#f59e0b', image:'/images/software/dengeli.png', fallbackEmoji:'💻', bullets:['Orta ayar profili', 'Geniş görev uyumu', 'Tahmin edilebilir tepkiler'], avantaj:'Esneklik', dezavantaj:'Özelleşme yok', stats:{ hiz:+2, ceviklik:+2, kontrol:+6, stabilite:+6, ucusSuresi:+2, verimlilik:+2, dayaniklilik:0, sistemRiski:-2 } },
    { id:'agresif', name:'Agresif', subtitle:'hızlı tepki', icon:'🔥', color:'#ef4444', image:'/images/software/agresif.png', fallbackEmoji:'💻', bullets:['Düşük gecikme hissi', 'Yüksek stick hassasiyeti', 'Ani thrust değişimi'], avantaj:'Reaksiyon', dezavantaj:'Risk', stats:{ hiz:+10, ceviklik:+14, kontrol:-10, stabilite:-10, ucusSuresi:-4, verimlilik:-4, dayaniklilik:0, sistemRiski:+12 } },
    { id:'freestyle', name:'Freestyle (Betaflight)', subtitle:'freestyle odaklı', icon:'🎮', color:'#f97316', image:'/images/software/freestyle_bf.png', fallbackEmoji:'💻', bullets:['Air mode karakteri', 'Keskin angle geçişi', 'Freestyle tune'], avantaj:'Manevra', dezavantaj:'Enerji', stats:{ hiz:+8, ceviklik:+16, kontrol:-4, stabilite:-4, ucusSuresi:-6, verimlilik:-6, dayaniklilik:0, sistemRiski:+8 } },
    { id:'cinematic', name:'Cinematic', subtitle:'minimum titreşim', icon:'🎬', color:'#3b82f6', image:'/images/software/cinematic.png', fallbackEmoji:'💻', bullets:['Yumuşak expo', 'Titreşim filtreleme', 'Akıcı görüntü geçişi'], avantaj:'Stabil video', dezavantaj:'Ani hız', stats:{ hiz:-4, ceviklik:-2, kontrol:+14, stabilite:+20, ucusSuresi:+2, verimlilik:+4, dayaniklilik:+2, sistemRiski:-8 } },
    { id:'racing', name:'Racing', subtitle:'maksimum performans', icon:'🏁', color:'#a855f7', image:'/images/software/racing.png', fallbackEmoji:'💻', bullets:['Maksimum throttle hissi', 'Yüksek giriş oranı', 'Yarışa özel tune'], avantaj:'Hız', dezavantaj:'Kararlılık', stats:{ hiz:+16, ceviklik:+12, kontrol:-12, stabilite:-12, ucusSuresi:-10, verimlilik:-8, dayaniklilik:0, sistemRiski:+14 } },
  ],
}

const DEFAULT_DETAIL = {
  specs: {},
  mountingSteps: [
    'Parçayı montajdan önce fiziksel hasar açısından kontrol et.',
    'Bağlantı noktalarını temizleyip doğru yönle hizala.',
    'Montaj sonrası titreşim ve gevşeme kontrolü yap.',
  ],
  compatibility: { props: '-', motors: '-', batteries: '-' },
}

const DETAIL_BY_GROUP = {
  frames: {
    tinywhoop: {
      specs: { Boyut: '65mm', Malzeme: 'Karbon + plastik guard', Agirlik: '18g', Stack: '20x20', MotorDeligi: '9x9 M2' },
      mountingSteps: ['Alt plakayı düz zeminde hizala.', 'Standoffları çapraz sırayla sık.', 'FC stack vidalarını titreşim pulu ile sabitle.'],
      compatibility: { props: '31mm-2.5"', motors: '1106-1404', batteries: '1S-2S' },
    },
    toothpick: {
      specs: { Boyut: '2.5 inch', Malzeme: 'T700 karbon', Agirlik: '28g', Stack: '20x20', MotorDeligi: '12x12 M2' },
      mountingSteps: ['Kol uçlarını motor tabanına eşit hizala.', 'ESC kablolarını kol üstünden kısa rota ile çek.', 'Stack yüksekliğini canopy ile sürtünmeyecek şekilde ayarla.'],
      compatibility: { props: '2.5"-3"', motors: '1106-1404', batteries: '2S-4S' },
    },
    ducted: {
      specs: { Boyut: '3.5 inch', Malzeme: 'Karbon + duct', Agirlik: '58g', Stack: '20x20 / 25.5x25.5', MotorDeligi: '12x12 M2' },
      mountingSteps: ['Duct korumalarını çatlak açısından kontrol et.', 'Motor vidalarını duct ile temas etmeyecek boyda seç.', 'GoPro/VTX montajında ağırlık merkezini ortada tut.'],
      compatibility: { props: '3"-3.5"', motors: '1404-2004', batteries: '3S-6S' },
    },
    x_frame: {
      specs: { Boyut: '5 inch', Malzeme: '4mm karbon kol', Agirlik: '92g', Stack: '30.5x30.5', MotorDeligi: '16x16 M3' },
      mountingSteps: ['Kolları merkez plate içinde çapraz yerleştir.', 'Standoff ve top plate vidalarını eşit torkla sık.', 'Anten ve VTX bracket boşluklarını son kontrolde doğrula.'],
      compatibility: { props: '5"-5.1"', motors: '2204-2306', batteries: '4S-6S' },
    },
    stretched: {
      specs: { Boyut: '5 inch stretched', Malzeme: 'Karbon yarış geometri', Agirlik: '88g', Stack: '30.5x30.5', MotorDeligi: '16x16 M3' },
      mountingSteps: ['Ön kolları uzun aks yönünde hizala.', 'Kamera açı wedge parçasını yarış açısına ayarla.', 'ESC sinyal kablolarında M1-M4 sırasını yeniden doğrula.'],
      compatibility: { props: '5"-5.2"', motors: '2207-2306', batteries: '4S-6S' },
    },
    lr_frame: {
      specs: { Boyut: '7 inch', Malzeme: 'Karbon long-range', Agirlik: '138g', Stack: '30.5x30.5', MotorDeligi: '19x19 M3' },
      mountingSteps: ['Kol vidalarını threadlocker ile sabitle.', 'GPS mount ve anten açısını gökyüzüne bakacak şekilde konumlandır.', 'Batarya kayışını gövde orta hattında dengele.'],
      compatibility: { props: '7"', motors: '2506-2806', batteries: '4S-6S' },
    },
  },
  motors: {
    '1106_6000': { specs: { Stator: '11x6', KV: '6000KV', MaxAkim: '12A', Agirlik: '7g', Voltaj: '1S-2S' }, mountingSteps: ['M2 vidaları 3 turdan fazla sokma.', 'ESC padlerine üç faz kabloyu lehimle.', 'Motor yönünü BLHeli üzerinden test et.'], compatibility: { props: '31mm-2.5"', motors: 'M2 mount frame', batteries: '1S-2S' } },
    '1404_4600': { specs: { Stator: '14x4', KV: '4600KV', MaxAkim: '18A', Agirlik: '9.5g', Voltaj: '2S-4S' }, mountingSteps: ['Kablo çıkışını kol yönüne ver.', 'Faz kablolarında ısı büzüşmeli makaron kullan.', 'M1-M4 yön tablosuna göre CW/CCW ayarla.'], compatibility: { props: '2.5"-3.5"', motors: '12x12 M2 frame', batteries: '2S-4S' } },
    '2004_3000': { specs: { Stator: '20x4', KV: '3000KV', MaxAkim: '26A', Agirlik: '18g', Voltaj: '3S-6S' }, mountingSteps: ['Vida boyunu kol kalınlığına göre seç.', 'ESC telemetri hattını FC UART TX pinine bağla.', 'Dönüş yönünü props-out düzenine göre ayarla.'], compatibility: { props: '3.5"-5"', motors: '16x16 M3 frame', batteries: '4S-6S' } },
    '2207_1950': { specs: { Stator: '22x7', KV: '1950KV', MaxAkim: '35A', Agirlik: '31g', Voltaj: '4S-6S' }, mountingSteps: ['M3 vidaları çapraz sık.', 'ESC çıkışlarını kısa tutup lehim dirençlerini kontrol et.', 'M1-M4 yön tablosunu motor test sekmesinde doğrula.'], compatibility: { props: '5"-7"', motors: '16x16 M3 frame', batteries: '4S-6S' } },
    '2207_2450': { specs: { Stator: '22x7', KV: '2450KV', MaxAkim: '42A', Agirlik: '33g', Voltaj: '4S-6S' }, mountingSteps: ['Soğutma için motor çevresinde hava boşluğu bırak.', 'ESC kapasitesi en az 45A seç.', 'Yarış tune öncesi motor ısısını bench testte ölç.'], compatibility: { props: '5"-5.1"', motors: '16x16 M3 frame', batteries: '4S-6S' } },
    '2806_1300': { specs: { Stator: '28x6', KV: '1300KV', MaxAkim: '38A', Agirlik: '45g', Voltaj: '4S-6S' }, mountingSteps: ['19x19 motor deliğine merkezli oturt.', 'ESC kablolarını daha kalın AWG ile çek.', 'Cruise testte titreşim için siyah kutu kaydı al.'], compatibility: { props: '6"-7"', motors: '19x19 M3 frame', batteries: '4S-6S' } },
  },
  props: {
    '31mm_3b': { specs: { Boyut: '31mm', Pitch: 'Düşük', Kanat: '3', Malzeme: 'Polycarbonate', DelikCapi: '1.5mm' }, mountingSteps: ['CW/CCW pervaneleri motor yönüne göre ayır.', 'Pervane göbeğini şafta tam oturt.', 'Somunu hafif torkla sık, deformasyon yapma.'], compatibility: { props: '31mm', motors: '1106', batteries: '1S-2S' } },
    '2521': { specs: { Boyut: '2.5"', Pitch: '2.1', Kanat: '3', Malzeme: 'Polycarbonate', DelikCapi: '1.5mm' }, mountingSteps: ['M1-M4 props-out dizilimiyle tak.', 'Hub oturmasını elle çevirip kontrol et.', 'İlk hover testinden sonra somunları tekrar sık.'], compatibility: { props: '2.5"', motors: '1106-1404', batteries: '2S-4S' } },
    '3520': { specs: { Boyut: '3.5"', Pitch: '2.0', Kanat: '3', Malzeme: 'Polycarbonate', DelikCapi: '1.5mm' }, mountingSteps: ['Pervane yönünü FC motor tablosuyla doğrula.', 'Blade uçlarında çatlak kontrolü yap.', 'Duct clearance boşluğunu döndürerek test et.'], compatibility: { props: '3.5"', motors: '1404-2004', batteries: '3S-6S' } },
    '5143': { specs: { Boyut: '5"', Pitch: '4.3', Kanat: '3', Malzeme: 'PC blend', DelikCapi: '5mm hub' }, mountingSteps: ['CW/CCW eşleşmesini renk kodu ile ayır.', 'Kilitleme somununu orta torkla sık.', 'Yüksek throttle öncesi pervane dengesini kontrol et.'], compatibility: { props: '5"', motors: '2207-2306', batteries: '4S-6S' } },
    '5052': { specs: { Boyut: '5"', Pitch: '5.2', Kanat: '3', Malzeme: 'PC blend', DelikCapi: '5mm hub' }, mountingSteps: ['Pervaneyi motor şaftına düz oturt.', 'Somunları çapraz sırayla kontrol et.', 'Blackbox vibrasyon grafiği ile ince ayar yap.'], compatibility: { props: '5"', motors: '2207', batteries: '4S-6S' } },
    '7035': { specs: { Boyut: '7"', Pitch: '3.5', Kanat: '2', Malzeme: 'Nylon mix', DelikCapi: '5mm hub' }, mountingSteps: ['Kol boşluğunu ve kamera FOV çarpışmasını kontrol et.', 'CW/CCW sırasını M1-M4 tablosuna göre tak.', 'Uzun menzil uçuşu öncesi somun torkunu tekrar ölç.'], compatibility: { props: '7"', motors: '2506-2806', batteries: '4S-6S' } },
  },
  batteries: {
    '1s_450': { specs: { Hucre: '1S', NominalV: '3.7V', TamDoluV: '4.2V', MinV: '3.3V', Konnektor: 'BT2.0' }, mountingSteps: ['Bataryayı cırtla gövde merkezine sabitle.', 'Kabloyu pervane düzleminden uzaklaştır.', 'Şarj sonrası hücre voltajını eşitleyerek uçuşa başla.'], compatibility: { props: '31mm-2.5"', motors: '1106-1404', batteries: '1S' } },
    '2s_650': { specs: { Hucre: '2S', NominalV: '7.4V', TamDoluV: '8.4V', MinV: '6.6V', Konnektor: 'XT30' }, mountingSteps: ['Batarya padini kaymaz bantla destekle.', 'XT30 lehim eklerinde ısı testi yap.', 'Lipo alarm eşiğini 3.5V/hücreye ayarla.'], compatibility: { props: '2.5"-3.5"', motors: '1106-2004', batteries: '2S' } },
    '4s_1500': { specs: { Hucre: '4S', NominalV: '14.8V', TamDoluV: '16.8V', MinV: '13.2V', Konnektor: 'XT60' }, mountingSteps: ['Batarya kayışını çift kat kullan.', 'XT60 polaritesini multimetre ile doğrula.', 'Şarjda balance modunda 1C önerisini uygula.'], compatibility: { props: '3.5"-5"', motors: '2004-2306', batteries: '4S' } },
    '6s_1300': { specs: { Hucre: '6S', NominalV: '22.2V', TamDoluV: '25.2V', MinV: '19.8V', Konnektor: 'XT60' }, mountingSteps: ['6S için ESC voltaj sınırını kontrol et.', 'Kablo yollarını karbon kenarlarından koru.', 'İlk kalkışta düşük throttle ile ısınma testi yap.'], compatibility: { props: '5"-6"', motors: '2207-2306', batteries: '6S' } },
    '6s_2200': { specs: { Hucre: '6S', NominalV: '22.2V', TamDoluV: '25.2V', MinV: '19.8V', Konnektor: 'XT60/XT90' }, mountingSteps: ['Ağır paket için iki kayışla sabitle.', 'Cihaz CG noktasını orta hatta dengele.', 'Uzun uçuş öncesi hücre iç dirençlerini karşılaştır.'], compatibility: { props: '6"-7"', motors: '2207-2806', batteries: '6S' } },
  },
  software: {
    stabil: { specs: { Profil: 'Stabil', Filtre: 'Yuksek', Expo: 'Yumusak', FeedForward: 'Dusuk', Not: 'Egitim ve cine odakli' }, mountingSteps: ['Preseti FC profil slotuna yaz.', 'Gyro lowpass değerlerini doğrula.', 'Hover testte stick merkezini ince ayarla.'] },
    dengeli: { specs: { Profil: 'Dengeli', Filtre: 'Orta', Expo: 'Orta', FeedForward: 'Orta', Not: 'Genel kullanim' }, mountingSteps: ['PID profilini varsayılanla başlat.', 'Rates değerlerini pilot stiline göre ayarla.', 'Kısa parkur testinde osilasyon izle.'] },
    agresif: { specs: { Profil: 'Agresif', Filtre: 'Dusuk', Expo: 'Dusuk', FeedForward: 'Yuksek', Not: 'Hizli tepki' }, mountingSteps: ['Motor sıcaklık kontrolünü aç.', 'D-term değerini kademeli yükselt.', 'Ani throttle testinde bounce-back ölç.'] },
    freestyle: { specs: { Profil: 'Freestyle', Filtre: 'Orta-Dusuk', Expo: 'Dinamik', FeedForward: 'Yuksek', Not: 'Manevra odakli' }, mountingSteps: ['Rates’i roll/pitch için ayrı ayarla.', 'Air mode davranışını flip testinde kontrol et.', 'Prowash için filtreleri adım adım optimize et.'] },
    cinematic: { specs: { Profil: 'Cinematic', Filtre: 'Yuksek', Expo: 'Yuksek', FeedForward: 'Dusuk', Not: 'Akici goruntu' }, mountingSteps: ['Throttle curve’i yumuşat.', 'Anti-gravity değerini azalt.', 'Kamera hareketlerinde micro-jitter kontrol et.'] },
    racing: { specs: { Profil: 'Racing', Filtre: 'Dusuk', Expo: 'Dusuk', FeedForward: 'Cok Yuksek', Not: 'Maksimum performans' }, mountingSteps: ['Max throttle limitini pist şartına göre ayarla.', 'Launch control değerini doğrula.', 'M1-M4 yönlerini props-out yarış düzeninde kilitle.'] },
  },
}

const PRICE_BY_GROUP = {
  frames: {
    tinywhoop: 30,
    toothpick: 55,
    ducted: 95,
    x_frame: 120,
    stretched: 140,
    lr_frame: 180,
  },
  motors: {
    '1106_6000': 15,
    '1404_4600': 28,
    '2004_3000': 42,
    '2207_1950': 58,
    '2207_2450': 66,
    '2806_1300': 85,
  },
  props: {
    '31mm_3b': 3,
    '2521': 4,
    '3520': 5,
    '5143': 7,
    '5052': 6,
    '7035': 8,
  },
  batteries: {
    '1s_450': 25,
    '2s_650': 32,
    '4s_1500': 48,
    '6s_1300': 60,
    '6s_2200': 80,
  },
  software: {
    stabil: 0,
    dengeli: 0,
    agresif: 0,
    freestyle: 0,
    cinematic: 0,
    racing: 0,
  },
}

function withDetails(parts) {
  return Object.fromEntries(
    Object.entries(parts).map(([group, items]) => [
      group,
      items.map((item) => {
        const detail = DETAIL_BY_GROUP[group]?.[item.id] || {}
        return {
          ...item,
          specs: detail.specs || DEFAULT_DETAIL.specs,
          mountingSteps: detail.mountingSteps || DEFAULT_DETAIL.mountingSteps,
          compatibility: detail.compatibility || DEFAULT_DETAIL.compatibility,
          price: PRICE_BY_GROUP[group]?.[item.id] ?? 0,
        }
      }),
    ]),
  )
}

export const PARTS = withDetails(BASE_PARTS)

export const DEFAULT_BUILD = {
  frame: 'x_frame',
  motor: '2207_2450',
  prop: '5052',
  battery: '4s_1500',
  software: 'dengeli',
}

export function getPart(group, id) {
  return PARTS[group]?.find((p) => p.id === id)
}
