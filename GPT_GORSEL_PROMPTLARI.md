# DroneForge EDU — GPT Görsel Üretim Promptları

## ÖNEMLİ NOTLAR
- Her görseli ayrı ayrı üret
- Arka plan: ŞEFFAF (transparent background)
- Format: PNG
- Boyut: 512x512 px
- Stil: Hepsi AYNI stil olsun — tutarlı görünüm için

---

## HAZIRLIK PROMPTU (önce bunu çalıştır, stil sabitleniyor)

> "I need product-style illustrations of FPV drone parts for an educational app. 
> Style: dark tech, isometric 3/4 view, glowing neon accents, carbon fiber textures, 
> clean product render on transparent background, consistent lighting from top-left.
> No background, no shadows on ground. PNG format."

---

## FRAME GÖRSELLERİ → public/images/frames/

### freestyle.png
```
FPV freestyle racing drone frame, X-quad geometry, thin carbon fiber arms, 
aggressive angular design, red neon accent glow on motor mounts,
isometric 3/4 top view, transparent background, dark carbon fiber material,
no battery no props, product render style
```

### cinewhoop.png
```
Cinewhoop FPV drone frame with propeller guards/ducts, boxy protected design,
blue neon accent glow, compact square body, prop guards visible,
isometric 3/4 top view, transparent background, dark material, product render
```

### longrange.png
```
Long range FPV drone frame, stretched X or hybrid wing design, long thin arms,
green neon accent glow, sleek aerodynamic shape, wide motor spacing,
isometric 3/4 top view, transparent background, carbon fiber, product render
```

### egitim.png
```
Training/beginner FPV drone frame, sturdy symmetrical design, thick protective arms,
amber/orange neon glow, safe rounded edges, durable looking construction,
isometric 3/4 top view, transparent background, product render style
```

---

## MOTOR GÖRSELLERİ → public/images/motors/

### yuksek_kv.png
```
High KV brushless FPV drone motor, small compact bell motor design,
red neon glow ring around stator, aggressive racing motor look,
isometric side-top view, transparent background, metallic finish, product render
```

### orta_kv.png
```
Medium KV brushless drone motor, standard bell motor,
amber/yellow accent glow, balanced proportions, neutral design,
isometric side-top view, transparent background, metallic, product render
```

### dusuk_kv.png
```
Low KV efficient drone motor, larger diameter bell motor,
green neon glow, efficient looking design, wider stator visible,
isometric side-top view, transparent background, metallic finish, product render
```

---

## PERVANE GÖRSELLERİ → public/images/props/

### yuksek_pitch.png
```
High pitch FPV drone propeller set, aggressive 3-blade propeller,
red accent color blades, steep blade angle visible, racing prop,
top-down view, transparent background, plastic material, product render
```

### orta_pitch.png
```
Medium pitch FPV drone propeller, balanced 3-blade design,
amber/yellow colored blades, moderate angle,
top-down view, transparent background, product render
```

### dusuk_pitch.png
```
Low pitch FPV drone propeller, gentle 2-blade design,
green colored blades, shallow blade angle, smooth edges,
top-down view, transparent background, product render
```

---

## BATARYA GÖRSELLERİ → public/images/batteries/

### 3s.png
```
3S LiPo battery pack for FPV drone, small compact battery,
green label/accent, XT30 connector visible, lightweight design,
isometric 3/4 view, transparent background, product render
```

### 4s.png
```
4S LiPo battery pack for FPV drone, standard medium size battery,
amber/yellow label, XT60 connector visible, standard proportions,
isometric 3/4 view, transparent background, product render
```

### 6s.png
```
6S LiPo battery pack for FPV drone, larger high-voltage battery,
red warning label accent, XT60 connector, more cells visible,
isometric 3/4 view, transparent background, product render
```

### yuksek_kapasite.png
```
High capacity LiPo battery pack, large fat battery for long range drone,
blue accent label, multiple cells, heavy looking, XT90 connector,
isometric 3/4 view, transparent background, product render
```

---

## YAZILIM PROFİLİ GÖRSELLERİ → public/images/software/

### agresif.png
```
Flight controller board with aggressive/racing firmware UI visualization,
red glowing circuit board, betaflight style interface overlay,
flames or lightning bolt motif, dark PCB green board,
isometric view, transparent background, product render
```

### dengeli.png
```
Flight controller board with balanced firmware, amber/yellow glow,
neutral clean circuit board design, equilibrium symbol,
isometric view, transparent background, product render
```

### stabil.png
```
Flight controller board with stable/smooth firmware,
green glow, calm smooth wave motif, clean circuit board,
isometric view, transparent background, product render
```

---

## ANA DRONE GÖRSELLERİ (opsiyonel, çok daha iyi görünüm için)
→ public/images/frames/ klasörüne koy, aynı isimler

Bu sefer TAMAMEN monte edilmiş drone görselleri:

### freestyle.png (üzerine yaz)
```
Complete assembled FPV freestyle racing drone, X-quad, 5 inch props,
red and black carbon fiber frame, blue propellers, FPV camera mounted,
dramatic isometric 3/4 angle view, dark studio background with subtle grid,
neon red glow under propellers, photorealistic product render, 
NO transparent background this time, dark #060810 background
```

---

## DOSYA YERLEŞTİRME

```
droneforge-v2/
└── public/
    └── images/
        ├── frames/
        │   ├── freestyle.png
        │   ├── cinewhoop.png
        │   ├── longrange.png
        │   └── egitim.png
        ├── motors/
        │   ├── yuksek_kv.png
        │   ├── orta_kv.png
        │   └── dusuk_kv.png
        ├── props/
        │   ├── yuksek_pitch.png
        │   ├── orta_pitch.png
        │   └── dusuk_pitch.png
        ├── batteries/
        │   ├── 3s.png
        │   ├── 4s.png
        │   ├── 6s.png
        │   └── yuksek_kapasite.png
        └── software/
            ├── agresif.png
            ├── dengeli.png
            └── stabil.png
```

Toplam: 17 görsel
Görsel olmadan uygulama emoji fallback ile çalışır ✓
