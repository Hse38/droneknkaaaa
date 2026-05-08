export * from './DroneSVGsV3'
import React from 'react'

export const FRAME_CONFIGS = {
  tinywhoop: { viewBox: '0 0 280 280', centerX: 140, centerY: 140, motors: [{ x: 70, y: 70 }, { x: 210, y: 70 }, { x: 70, y: 210 }, { x: 210, y: 210 }], armWidth: 10, motorR: 10, propRx: 28, hasDucts: true, ductR: 36, ductWidth: 9, centerSize: 24 },
  toothpick: { viewBox: '0 0 300 300', centerX: 150, centerY: 150, motors: [{ x: 55, y: 55 }, { x: 245, y: 55 }, { x: 55, y: 245 }, { x: 245, y: 245 }], armWidth: 3, motorR: 9, propRx: 30, hasDucts: false, centerSize: 22, hasSquareMount: true },
  ducted: { viewBox: '0 0 300 300', centerX: 150, centerY: 150, motors: [{ x: 72, y: 72 }, { x: 228, y: 72 }, { x: 72, y: 228 }, { x: 228, y: 228 }], armWidth: 12, motorR: 11, propRx: 32, hasDucts: true, ductR: 44, ductWidth: 11, centerSize: 28 },
  x_frame: { viewBox: '0 0 320 320', centerX: 160, centerY: 160, motors: [{ x: 68, y: 68 }, { x: 252, y: 68 }, { x: 68, y: 252 }, { x: 252, y: 252 }], armWidth: 13, motorR: 15, propRx: 38, hasDucts: false, centerSize: 36, hasMountingHoles: true },
  stretched: { viewBox: '0 0 340 300', centerX: 170, centerY: 150, motors: [{ x: 55, y: 62 }, { x: 285, y: 62 }, { x: 78, y: 238 }, { x: 262, y: 238 }], armWidth: 11, motorR: 14, propRx: 36, hasDucts: false, centerSize: 32, hasArrow: true },
  lr_frame: { viewBox: '0 0 340 340', centerX: 170, centerY: 170, motors: [{ x: 42, y: 42 }, { x: 298, y: 42 }, { x: 42, y: 298 }, { x: 298, y: 298 }], armWidth: 8, motorR: 18, propRx: 48, hasDucts: false, centerSize: 38, hasGPS: true, hasBattTray: true },
}

const MOTOR_MAP = { '0802_19000': 19000, '1002_22000': 22000, '1102_18000': 18000, '1103_15000': 15000, '1404_4600': 4600, '2004_3000': 3000, '2207_1750': 1750, '2207_1950': 1950, '2207_2050': 2050, '2306_2450': 2450, '2806_1300': 1300 }
const PROP_MAP = { '31mm_2b': { blades: 2, pitch: 'low' }, '31mm_3b': { blades: 3, pitch: 'low' }, '40mm_3b': { blades: 3, pitch: 'mid' }, '45mm_ducted': { blades: 3, pitch: 'low', ducted: true }, '2521': { blades: 2, pitch: 'low' }, '2535': { blades: 3, pitch: 'high' }, '3520': { blades: 2, pitch: 'mid' }, '3540': { blades: 3, pitch: 'high' }, '5140': { blades: 3, pitch: 'mid' }, '5143': { blades: 3, pitch: 'high' }, '5046': { blades: 2, pitch: 'mid' }, '5052': { blades: 3, pitch: 'mid' }, '7035': { blades: 2, pitch: 'low' } }
const BATTERY_MAP = { '1s_300': { cells: 1, capacity: 300, slim: true }, '1s_450': { cells: 1, capacity: 450, slim: true }, '2s_550': { cells: 2, capacity: 550, slim: true }, '2s_650': { cells: 2, capacity: 650, slim: true }, '4s_1300': { cells: 4, capacity: 1300, slim: true }, '4s_1500': { cells: 4, capacity: 1500, slim: true }, '6s_1100': { cells: 6, capacity: 1100, slim: true }, '6s_1300': { cells: 6, capacity: 1300, slim: true }, '6s_2200': { cells: 6, capacity: 2200, slim: false } }

export function MotorSVG({ kv = 2450, color = '#f59e0b', size = 80, label = '' }) {
  const bellR = kv > 10000 ? 12 : kv > 3000 ? 17 : kv >= 1700 ? 22 : 28
  const statorR = kv > 10000 ? 8 : kv > 3000 ? 11 : kv >= 1700 ? 15 : 18
  return <svg viewBox="0 0 80 90" width={size} height={size * 1.1} xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="56" r={statorR} fill="#0f1522" stroke="#2a3550" strokeWidth="1.8" /><circle cx="40" cy="37" r={bellR} fill="#151b29" stroke={color} strokeWidth="1.6" opacity="0.85" /><circle cx="40" cy="37" r={bellR * 0.58} fill="#1f2937" stroke="#334155" strokeWidth="1" /><circle cx="40" cy="37" r={Math.max(2, bellR * 0.2)} fill={color} /><text x="40" y="82" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill={color}>{label || `${kv}KV`}</text></svg>
}

export function PropSVG({ blades = 3, pitch = 'mid', color = '#f59e0b', size = 80, ducted = false }) {
  const bladeAngles = blades === 2 ? [0, 180] : blades === 3 ? [0, 120, 240] : [0, 90, 180, 270]
  const pitchSkew = pitch === 'high' ? 18 : pitch === 'mid' ? 12 : 7
  return <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">{ducted && <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="1.8" opacity="0.7" />}{bladeAngles.map((a, idx) => <ellipse key={idx} cx="40" cy="40" rx="28" ry={pitchSkew} fill="none" stroke={color} strokeWidth="2" opacity="0.88" transform={`rotate(${a}, 40, 40)`} />)}<circle cx="40" cy="40" r="7" fill="#111827" stroke="#334155" strokeWidth="1.3" /><circle cx="40" cy="40" r="2.4" fill={color} /></svg>
}

export function BatterySVG({ cells = 4, capacity = 1500, color = '#f59e0b', size = 90, slim = true }) {
  const dims = cells === 1 ? { w: 32, h: 18 } : cells === 2 ? { w: 44, h: 22 } : cells === 4 ? { w: 60, h: 30 } : slim ? { w: 55, h: 35 } : { w: 75, h: 38 }
  return <svg viewBox="0 0 120 70" width={size * 1.35} height={size} xmlns="http://www.w3.org/2000/svg"><rect x="14" y="18" width={dims.w} height={dims.h} rx="4" fill="#121826" stroke="#334155" strokeWidth="1.4" /><rect x="14" y="18" width={dims.w} height="8" rx="4" fill={color} opacity="0.2" /><rect x={14 + dims.w} y={24} width="10" height={Math.max(8, dims.h - 10)} rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" /><text x={14 + (dims.w / 2)} y={18 + dims.h + 14} textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill={color}>{cells}S {capacity}</text></svg>
}

export function SoftwareSVG({ type = 'dengeli', color = '#f59e0b', size = 80 }) {
  return <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="60" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.4" />{type === 'stabil' && <path d="M 22 44 Q 30 34 40 40 Q 50 46 58 36" fill="none" stroke={color} strokeWidth="2.2" />}{type === 'dengeli' && <><line x1="24" y1="36" x2="56" y2="36" stroke={color} strokeWidth="2.2" /><line x1="24" y1="44" x2="56" y2="44" stroke={color} strokeWidth="2.2" /></>}{type === 'agresif' && <path d="M 30 28 L 44 28 L 37 42 L 50 42 L 34 58 L 38 45 L 28 45 Z" fill={color} opacity="0.9" />}{type === 'freestyle' && <path d="M 22 48 L 30 34 L 38 44 L 46 28 L 58 40" fill="none" stroke={color} strokeWidth="2.4" />}{type === 'cinematic' && <path d="M 18 44 C 26 36, 34 36, 42 44 C 50 52, 58 52, 64 44" fill="none" stroke={color} strokeWidth="2.2" />}{type === 'racing' && <path d="M 24 50 L 40 26 L 56 50 Z" fill="none" stroke={color} strokeWidth="2.3" />}<circle cx="40" cy="40" r="2.5" fill={color} /></svg>
}

export function FrameSVGByID({ frameId, color, size = 80 }) { return <UnifiedDroneSVG frameId={frameId} frameColor={color} propColor={color} size={size} /> }
export function MotorSVGByID({ motorId, color, size = 80 }) { return <MotorSVG kv={MOTOR_MAP[motorId] || 2450} color={color} size={size} /> }
export function PropSVGByID({ propId, color, size = 80 }) { const p = PROP_MAP[propId] || { blades: 3, pitch: 'mid' }; return <PropSVG blades={p.blades} pitch={p.pitch} color={color} size={size} ducted={Boolean(p.ducted)} /> }
export function BatterySVGByID({ batteryId, color, size = 80 }) { const b = BATTERY_MAP[batteryId] || { cells: 4, capacity: 1500, slim: true }; return <BatterySVG cells={b.cells} capacity={b.capacity} color={color} size={size} slim={b.slim} /> }
export function SoftwareSVGByID({ softwareId, color, size = 80 }) { return <SoftwareSVG type={softwareId} color={color} size={size} /> }

export function UnifiedDroneSVG({ frameId = 'x_frame', motorId, propId, frameColor = '#ef4444', propColor = '#00d4ff', size = 300, onClickFrame, onClickMotor, onClickProp, onClickFC, onClickBattery, selectedPart }) {
  const config = FRAME_CONFIGS[frameId] || FRAME_CONFIGS.x_frame
  const vbH = Number(config.viewBox.split(' ')[3]) || 320
  return (
    <svg viewBox={config.viewBox} width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ animation: 'floatDrone 3s ease-in-out infinite' }}>
      <defs><filter id={`glow-frame-${frameId}`}><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter><filter id={`glow-prop-${frameId}`}><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter><radialGradient id={`thrust-${frameId}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={propColor} stopOpacity="0.5" /><stop offset="100%" stopColor={propColor} stopOpacity="0" /></radialGradient><linearGradient id={`arm-${frameId}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2a2a3a" /><stop offset="100%" stopColor="#0e0e18" /></linearGradient></defs>
      {config.motors.map((m, i) => <ellipse key={`th-${i}`} cx={m.x} cy={m.y + 8} rx={config.propRx * 1.1} ry={config.propRx * 0.28} fill={`url(#thrust-${frameId})`} style={{ animation: 'thrustPulse 0.3s ease-in-out infinite alternate' }} />)}
      {config.hasDucts && config.motors.map((m, i) => <g key={`duct-${i}`}><circle cx={m.x} cy={m.y} r={config.ductR} fill="none" stroke="#1e2535" strokeWidth={config.ductWidth} /><circle cx={m.x} cy={m.y} r={config.ductR} fill="none" stroke={frameColor} strokeWidth="1.5" opacity="0.6" filter={`url(#glow-frame-${frameId})`} /><path d={`M ${m.x - config.ductR * 0.6} ${m.y - config.ductR * 0.85} A ${config.ductR} ${config.ductR} 0 0 1 ${m.x + config.ductR * 0.6} ${m.y - config.ductR * 0.85}`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" /><circle cx={m.x} cy={m.y} r={config.ductR - config.ductWidth * 0.8} fill="#060810" /></g>)}
      <g onClick={onClickFrame} style={{ cursor: 'pointer' }}>{config.motors.map((m, i) => <g key={`arm-${i}`}><line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke={`url(#arm-${frameId})`} strokeWidth={config.armWidth} strokeLinecap="round" /><line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke="rgba(255,255,255,0.05)" strokeWidth={config.armWidth * 0.4} strokeDasharray="4 4" strokeLinecap="round" /><line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke={frameColor} strokeWidth={selectedPart === 'frame' ? 2 : 1} opacity={selectedPart === 'frame' ? 0.8 : 0.3} strokeLinecap="round" /><line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke="transparent" strokeWidth="24" /></g>)}{frameId === 'stretched' && <><line x1={config.motors[0].x} y1={config.motors[0].y} x2={config.motors[1].x} y2={config.motors[1].y} stroke="#1a1a28" strokeWidth="6" strokeLinecap="round" /><line x1={config.motors[2].x} y1={config.motors[2].y} x2={config.motors[3].x} y2={config.motors[3].y} stroke="#1a1a28" strokeWidth="6" strokeLinecap="round" /></>}{config.hasGPS && <g><circle cx={config.centerX} cy={config.centerY - 52} r="12" fill="#0a0f18" stroke={frameColor} strokeWidth="1.5" filter={`url(#glow-frame-${frameId})`} opacity="0.8" /><circle cx={config.centerX} cy={config.centerY - 52} r="6" fill={frameColor} opacity="0.3" /><circle cx={config.centerX} cy={config.centerY - 52} r="2.5" fill={frameColor} opacity="0.9" /></g>}{config.hasBattTray && <rect x={config.centerX - 28} y={config.centerY + 40} width="56" height="18" rx="3" fill="#111827" stroke={frameColor} strokeWidth="1" opacity="0.5" />}{config.hasArrow && <path d={`M ${config.centerX} ${config.centerY - 55} L ${config.centerX - 8} ${config.centerY - 42} L ${config.centerX + 8} ${config.centerY - 42} Z`} fill={frameColor} opacity="0.4" />}</g>
      {config.motors.map((m, i) => { const isCW = i === 0 || i === 3; const pColor = i % 2 === 0 ? propColor : frameColor; return <g key={`prop-${i}`} onClick={onClickProp} style={{ transformOrigin: `${m.x}px ${m.y}px`, animation: `${isCW ? 'spinCW' : 'spinCCW'} 0.22s linear infinite`, cursor: 'pointer' }}><ellipse cx={m.x} cy={m.y} rx={config.propRx} ry={config.propRx * 0.19} fill="none" stroke={pColor} strokeWidth={selectedPart === 'prop' ? 3 : 2.5} strokeDasharray={`${config.propRx * 0.55} ${config.propRx * 0.45}`} opacity="0.9" filter={`url(#glow-prop-${frameId})`} /><ellipse cx={m.x} cy={m.y} rx={config.propRx * 0.82} ry={config.propRx * 0.15} fill="none" stroke={pColor} strokeWidth="1.5" strokeDasharray={`${config.propRx * 0.4} ${config.propRx * 0.6}`} opacity="0.5" transform={`rotate(60, ${m.x}, ${m.y})`} /></g> })}
      {config.motors.map((m, i) => { const mColor = i % 2 === 0 ? frameColor : propColor; const isSelected = selectedPart === 'motor'; return <g key={`motor-${i}`} onClick={onClickMotor} style={{ cursor: 'pointer' }}>{config.hasSquareMount ? <><rect x={m.x - 12} y={m.y - 12} width="24" height="24" rx="3" fill="#0a0a12" stroke="#1e2535" strokeWidth="1.5" transform={`rotate(45, ${m.x}, ${m.y})`} /><rect x={m.x - 12} y={m.y - 12} width="24" height="24" rx="3" fill="none" stroke={mColor} strokeWidth={isSelected ? 2 : 1} opacity="0.5" transform={`rotate(45, ${m.x}, ${m.y})`} filter={`url(#glow-frame-${frameId})`} /></> : <><circle cx={m.x} cy={m.y} r={config.motorR + 4} fill="#0a0a12" stroke="#1e2535" strokeWidth="2" /><circle cx={m.x} cy={m.y} r={config.motorR + 4} fill="none" stroke={mColor} strokeWidth={isSelected ? 2 : 1} opacity={isSelected ? 0.8 : 0.4} filter={`url(#glow-frame-${frameId})`} /></>}<circle cx={m.x} cy={m.y} r={config.motorR} fill="#111118" stroke="#2a3450" strokeWidth="1.5" /><circle cx={m.x} cy={m.y} r={config.motorR * 0.62} fill="#1a1a28" stroke={mColor} strokeWidth="1.5" filter={`url(#glow-frame-${frameId})`} /><circle cx={m.x} cy={m.y} r={config.motorR * 0.22} fill={mColor} opacity="0.9" />{(frameId === 'x_frame' || frameId === 'lr_frame') && [45, 135, 225, 315].map((angle, j) => { const rad = (angle * Math.PI) / 180; const sr = config.motorR + 2; return <circle key={`s-${j}`} cx={m.x + Math.cos(rad) * sr} cy={m.y + Math.sin(rad) * sr} r="1.5" fill="#060810" stroke="#2a3450" strokeWidth="0.8" /> })}</g> })}
      <g onClick={onClickFC} style={{ cursor: 'pointer' }}><rect x={config.centerX - config.centerSize / 2} y={config.centerY - config.centerSize / 2} width={config.centerSize} height={config.centerSize} rx="5" fill="#0f1520" stroke="#185FA5" strokeWidth="1.5" /><rect x={config.centerX - config.centerSize / 2 + 4} y={config.centerY - config.centerSize / 2 + 4} width={config.centerSize - 8} height={config.centerSize - 8} rx="3" fill="#111d30" stroke="#1e2a40" strokeWidth="1" /><rect x={config.centerX - config.centerSize / 4} y={config.centerY - config.centerSize / 4} width={config.centerSize / 2} height={config.centerSize / 2} rx="2" fill="#0a1018" stroke={selectedPart === 'fc' ? frameColor : '#00d4ff'} strokeWidth={selectedPart === 'fc' ? 1.8 : 0.8} opacity="0.9" /><circle cx={config.centerX} cy={config.centerY} r="4" fill="#00d4ff" opacity="0.9" filter={`url(#glow-prop-${frameId})`} /><circle cx={config.centerX} cy={config.centerY} r="1.5" fill="#fff" /></g>
      <g onClick={onClickBattery} style={{ cursor: 'pointer' }}><rect x={config.centerX - 24} y={config.centerY + config.centerSize * 0.8} width="48" height="16" rx="3" fill="#111827" stroke={selectedPart === 'battery' ? propColor : frameColor} strokeWidth={selectedPart === 'battery' ? 2 : 1} opacity="0.85" /><rect x={config.centerX + 24} y={config.centerY + config.centerSize * 0.8 + 4} width="7" height="8" rx="1" fill="#0b1220" stroke="#334155" strokeWidth="1" /></g>
      <text x={config.centerX} y={vbH - 8} textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="9" fill="#3a4a6a" letterSpacing="2">{frameId.toUpperCase().replace('_', ' ')}</text>
      <style>{`@keyframes thrustPulse{from{opacity:0.2}to{opacity:0.7}}@keyframes floatDrone{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes spinCW{to{transform:rotate(360deg)}}@keyframes spinCCW{to{transform:rotate(-360deg)}}`}</style>
    </svg>
  )
}
*** End of File

export const FRAME_CONFIGS = {
  tinywhoop: {
    viewBox: '0 0 280 280',
    centerX: 140, centerY: 140,
    motors: [{ x: 70, y: 70 }, { x: 210, y: 70 }, { x: 70, y: 210 }, { x: 210, y: 210 }],
    armWidth: 10, motorR: 10, propRx: 28, hasDucts: true, ductR: 36, ductWidth: 9, centerSize: 24,
  },
  toothpick: {
    viewBox: '0 0 300 300',
    centerX: 150, centerY: 150,
    motors: [{ x: 55, y: 55 }, { x: 245, y: 55 }, { x: 55, y: 245 }, { x: 245, y: 245 }],
    armWidth: 3, motorR: 9, propRx: 30, hasDucts: false, centerSize: 22, hasSquareMount: true,
  },
  ducted: {
    viewBox: '0 0 300 300',
    centerX: 150, centerY: 150,
    motors: [{ x: 72, y: 72 }, { x: 228, y: 72 }, { x: 72, y: 228 }, { x: 228, y: 228 }],
    armWidth: 12, motorR: 11, propRx: 32, hasDucts: true, ductR: 44, ductWidth: 11, centerSize: 28,
  },
  x_frame: {
    viewBox: '0 0 320 320',
    centerX: 160, centerY: 160,
    motors: [{ x: 68, y: 68 }, { x: 252, y: 68 }, { x: 68, y: 252 }, { x: 252, y: 252 }],
    armWidth: 13, motorR: 15, propRx: 38, hasDucts: false, centerSize: 36, hasMountingHoles: true,
  },
  stretched: {
    viewBox: '0 0 340 300',
    centerX: 170, centerY: 150,
    motors: [{ x: 55, y: 62 }, { x: 285, y: 62 }, { x: 78, y: 238 }, { x: 262, y: 238 }],
    armWidth: 11, motorR: 14, propRx: 36, hasDucts: false, centerSize: 32, hasArrow: true,
  },
  lr_frame: {
    viewBox: '0 0 340 340',
    centerX: 170, centerY: 170,
    motors: [{ x: 42, y: 42 }, { x: 298, y: 42 }, { x: 42, y: 298 }, { x: 298, y: 298 }],
    armWidth: 8, motorR: 18, propRx: 48, hasDucts: false, centerSize: 38, hasGPS: true, hasBattTray: true,
  },
}

const MOTOR_MAP = {
  '0802_19000': { kv: 19000 }, '1002_22000': { kv: 22000 }, '1102_18000': { kv: 18000 }, '1103_15000': { kv: 15000 },
  '1404_4600': { kv: 4600 }, '2004_3000': { kv: 3000 }, '2207_1750': { kv: 1750 }, '2207_1950': { kv: 1950 },
  '2207_2050': { kv: 2050 }, '2306_2450': { kv: 2450 }, '2806_1300': { kv: 1300 },
}

const PROP_MAP = {
  '31mm_2b': { blades: 2, pitch: 'low' }, '31mm_3b': { blades: 3, pitch: 'low' }, '40mm_3b': { blades: 3, pitch: 'mid' },
  '45mm_ducted': { blades: 3, pitch: 'low', ducted: true }, '2521': { blades: 2, pitch: 'low' }, '2535': { blades: 3, pitch: 'high' },
  '3520': { blades: 2, pitch: 'mid' }, '3540': { blades: 3, pitch: 'high' }, '5140': { blades: 3, pitch: 'mid' },
  '5143': { blades: 3, pitch: 'high' }, '5046': { blades: 2, pitch: 'mid' }, '5052': { blades: 3, pitch: 'mid' }, '7035': { blades: 2, pitch: 'low' },
}

const BATTERY_MAP = {
  '1s_300': { cells: 1, capacity: 300 }, '1s_450': { cells: 1, capacity: 450 }, '2s_550': { cells: 2, capacity: 550 }, '2s_650': { cells: 2, capacity: 650 },
  '4s_1300': { cells: 4, capacity: 1300 }, '4s_1500': { cells: 4, capacity: 1500 }, '6s_1100': { cells: 6, capacity: 1100, slim: true },
  '6s_1300': { cells: 6, capacity: 1300, slim: true }, '6s_2200': { cells: 6, capacity: 2200, slim: false },
}

export function MotorSVG({ kv = 2450, color = '#f59e0b', size = 80, label = '' }) {
  const bellR = kv > 10000 ? 12 : kv > 3000 ? 17 : kv >= 1700 ? 22 : 28
  const statorR = kv > 10000 ? 8 : kv > 3000 ? 11 : kv >= 1700 ? 15 : 18
  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.1} xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="56" r={statorR} fill="#0f1522" stroke="#2a3550" strokeWidth="1.8" />
      <circle cx="40" cy="37" r={bellR} fill="#151b29" stroke={color} strokeWidth="1.6" opacity="0.85" />
      <circle cx="40" cy="37" r={bellR * 0.58} fill="#1f2937" stroke="#334155" strokeWidth="1" />
      <circle cx="40" cy="37" r={Math.max(2, bellR * 0.2)} fill={color} />
      <text x="40" y="82" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill={color}>{label || `${kv}KV`}</text>
    </svg>
  )
}

export function PropSVG({ blades = 3, pitch = 'mid', color = '#f59e0b', size = 80, ducted = false }) {
  const bladeAngles = blades === 2 ? [0, 180] : blades === 3 ? [0, 120, 240] : [0, 90, 180, 270]
  const pitchSkew = pitch === 'high' ? 18 : pitch === 'mid' ? 12 : 7
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {ducted && <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="1.8" opacity="0.7" />}
      {bladeAngles.map((a, idx) => (
        <ellipse
          key={idx}
          cx="40"
          cy="40"
          rx="28"
          ry={pitchSkew}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.88"
          transform={`rotate(${a}, 40, 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="7" fill="#111827" stroke="#334155" strokeWidth="1.3" />
      <circle cx="40" cy="40" r="2.4" fill={color} />
    </svg>
  )
}

export function BatterySVG({ cells = 4, capacity = 1500, color = '#f59e0b', size = 90, slim = true }) {
  const dims = cells === 1 ? { w: 32, h: 18 } : cells === 2 ? { w: 44, h: 22 } : cells === 4 ? { w: 60, h: 30 } : (slim ? { w: 55, h: 35 } : { w: 75, h: 38 })
  return (
    <svg viewBox="0 0 120 70" width={size * 1.35} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="18" width={dims.w} height={dims.h} rx="4" fill="#121826" stroke="#334155" strokeWidth="1.4" />
      <rect x="14" y="18" width={dims.w} height="8" rx="4" fill={color} opacity="0.2" />
      <rect x={14 + dims.w} y={24} width="10" height={Math.max(8, dims.h - 10)} rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <text x={14 + (dims.w / 2)} y={18 + dims.h + 14} textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill={color}>{cells}S {capacity}</text>
    </svg>
  )
}

export function SoftwareSVG({ type = 'dengeli', color = '#f59e0b', size = 80 }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="60" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.4" />
      {type === 'stabil' && <path d="M 22 44 Q 30 34 40 40 Q 50 46 58 36" fill="none" stroke={color} strokeWidth="2.2" />}
      {type === 'dengeli' && <><line x1="24" y1="36" x2="56" y2="36" stroke={color} strokeWidth="2.2" /><line x1="24" y1="44" x2="56" y2="44" stroke={color} strokeWidth="2.2" /></>}
      {type === 'agresif' && <path d="M 30 28 L 44 28 L 37 42 L 50 42 L 34 58 L 38 45 L 28 45 Z" fill={color} opacity="0.9" />}
      {type === 'freestyle' && <path d="M 22 48 L 30 34 L 38 44 L 46 28 L 58 40" fill="none" stroke={color} strokeWidth="2.4" />}
      {type === 'cinematic' && <path d="M 18 44 C 26 36, 34 36, 42 44 C 50 52, 58 52, 64 44" fill="none" stroke={color} strokeWidth="2.2" />}
      {type === 'racing' && <path d="M 24 50 L 40 26 L 56 50 Z" fill="none" stroke={color} strokeWidth="2.3" />}
      <circle cx="40" cy="40" r="2.5" fill={color} />
    </svg>
  )
}

export function FrameSVGByID({ frameId, color, size = 80 }) {
  return (
    <UnifiedDroneSVG
      frameId={frameId}
      frameColor={color}
      propColor={color}
      size={size}
    />
  )
}

export function MotorSVGByID({ motorId, color, size = 80 }) {
  const m = MOTOR_MAP[motorId] || { kv: 2450 }
  return <MotorSVG kv={m.kv} color={color} size={size} />
}

export function PropSVGByID({ propId, color, size = 80 }) {
  const p = PROP_MAP[propId] || { blades: 3, pitch: 'mid' }
  return <PropSVG blades={p.blades} pitch={p.pitch} color={color} size={size} ducted={Boolean(p.ducted)} />
}

export function BatterySVGByID({ batteryId, color, size = 80 }) {
  const b = BATTERY_MAP[batteryId] || { cells: 4, capacity: 1500, slim: true }
  return <BatterySVG cells={b.cells} capacity={b.capacity} color={color} size={size} slim={b.slim !== false} />
}

export function SoftwareSVGByID({ softwareId, color, size = 80 }) {
  return <SoftwareSVG type={softwareId} color={color} size={size} />
}

export function UnifiedDroneSVG({
  frameId = 'x_frame',
  motorId,
  propId,
  frameColor = '#ef4444',
  propColor = '#00d4ff',
  size = 300,
  onClickFrame,
  onClickMotor,
  onClickProp,
  onClickFC,
  onClickBattery,
  selectedPart,
}) {
  const config = FRAME_CONFIGS[frameId] || FRAME_CONFIGS.x_frame
  const vbH = Number(config.viewBox.split(' ')[3]) || 320

  return (
    <svg viewBox={config.viewBox} width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ animation: 'floatDrone 3s ease-in-out infinite' }}>
      <defs>
        <filter id={`glow-frame-${frameId}`}><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id={`glow-prop-${frameId}`}><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id={`thrust-${frameId}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={propColor} stopOpacity="0.5" /><stop offset="100%" stopColor={propColor} stopOpacity="0" /></radialGradient>
        <linearGradient id={`arm-${frameId}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2a2a3a" /><stop offset="100%" stopColor="#0e0e18" /></linearGradient>
      </defs>

      {config.motors.map((m, i) => (
        <ellipse key={`th-${i}`} cx={m.x} cy={m.y + 8} rx={config.propRx * 1.1} ry={config.propRx * 0.28} fill={`url(#thrust-${frameId})`} style={{ animation: 'thrustPulse 0.3s ease-in-out infinite alternate' }} />
      ))}

      {config.hasDucts && config.motors.map((m, i) => (
        <g key={`duct-${i}`}>
          <circle cx={m.x} cy={m.y} r={config.ductR} fill="none" stroke="#1e2535" strokeWidth={config.ductWidth} />
          <circle cx={m.x} cy={m.y} r={config.ductR} fill="none" stroke={frameColor} strokeWidth="1.5" opacity="0.6" filter={`url(#glow-frame-${frameId})`} />
          <path d={`M ${m.x - config.ductR * 0.6} ${m.y - config.ductR * 0.85} A ${config.ductR} ${config.ductR} 0 0 1 ${m.x + config.ductR * 0.6} ${m.y - config.ductR * 0.85}`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
          <circle cx={m.x} cy={m.y} r={config.ductR - config.ductWidth * 0.8} fill="#060810" />
        </g>
      ))}

      <g onClick={onClickFrame} style={{ cursor: 'pointer' }}>
        {config.motors.map((m, i) => (
          <g key={`arm-${i}`}>
            <line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke={`url(#arm-${frameId})`} strokeWidth={config.armWidth} strokeLinecap="round" />
            <line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke="rgba(255,255,255,0.05)" strokeWidth={config.armWidth * 0.4} strokeDasharray="4 4" strokeLinecap="round" />
            <line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke={frameColor} strokeWidth={selectedPart === 'frame' ? 2 : 1} opacity={selectedPart === 'frame' ? 0.8 : 0.3} strokeLinecap="round" />
            <line x1={config.centerX} y1={config.centerY} x2={m.x} y2={m.y} stroke="transparent" strokeWidth="24" />
          </g>
        ))}
        {frameId === 'stretched' && <>
          <line x1={config.motors[0].x} y1={config.motors[0].y} x2={config.motors[1].x} y2={config.motors[1].y} stroke="#1a1a28" strokeWidth="6" strokeLinecap="round" />
          <line x1={config.motors[2].x} y1={config.motors[2].y} x2={config.motors[3].x} y2={config.motors[3].y} stroke="#1a1a28" strokeWidth="6" strokeLinecap="round" />
        </>}
        {config.hasGPS && <g><circle cx={config.centerX} cy={config.centerY - 52} r="12" fill="#0a0f18" stroke={frameColor} strokeWidth="1.5" filter={`url(#glow-frame-${frameId})`} opacity="0.8" /><circle cx={config.centerX} cy={config.centerY - 52} r="6" fill={frameColor} opacity="0.3" /><circle cx={config.centerX} cy={config.centerY - 52} r="2.5" fill={frameColor} opacity="0.9" /></g>}
        {config.hasBattTray && <rect x={config.centerX - 28} y={config.centerY + 40} width="56" height="18" rx="3" fill="#111827" stroke={frameColor} strokeWidth="1" opacity="0.5" />}
        {config.hasArrow && <path d={`M ${config.centerX} ${config.centerY - 55} L ${config.centerX - 8} ${config.centerY - 42} L ${config.centerX + 8} ${config.centerY - 42} Z`} fill={frameColor} opacity="0.4" />}
      </g>

      {config.motors.map((m, i) => {
        const isCW = i === 0 || i === 3
        const pColor = i % 2 === 0 ? propColor : frameColor
        return (
          <g key={`prop-${i}`} onClick={onClickProp} style={{ transformOrigin: `${m.x}px ${m.y}px`, animation: `${isCW ? 'spinCW' : 'spinCCW'} 0.22s linear infinite`, cursor: 'pointer' }}>
            <ellipse cx={m.x} cy={m.y} rx={config.propRx} ry={config.propRx * 0.19} fill="none" stroke={pColor} strokeWidth={selectedPart === 'prop' ? 3 : 2.5} strokeDasharray={`${config.propRx * 0.55} ${config.propRx * 0.45}`} opacity="0.9" filter={`url(#glow-prop-${frameId})`} />
            <ellipse cx={m.x} cy={m.y} rx={config.propRx * 0.82} ry={config.propRx * 0.15} fill="none" stroke={pColor} strokeWidth="1.5" strokeDasharray={`${config.propRx * 0.4} ${config.propRx * 0.6}`} opacity="0.5" transform={`rotate(60, ${m.x}, ${m.y})`} />
          </g>
        )
      })}

      {config.motors.map((m, i) => {
        const mColor = i % 2 === 0 ? frameColor : propColor
        const isSelected = selectedPart === 'motor'
        return (
          <g key={`motor-${i}`} onClick={onClickMotor} style={{ cursor: 'pointer' }}>
            {config.hasSquareMount ? (
              <>
                <rect x={m.x - 12} y={m.y - 12} width="24" height="24" rx="3" fill="#0a0a12" stroke="#1e2535" strokeWidth="1.5" transform={`rotate(45, ${m.x}, ${m.y})`} />
                <rect x={m.x - 12} y={m.y - 12} width="24" height="24" rx="3" fill="none" stroke={mColor} strokeWidth={isSelected ? 2 : 1} opacity="0.5" transform={`rotate(45, ${m.x}, ${m.y})`} filter={`url(#glow-frame-${frameId})`} />
              </>
            ) : (
              <>
                <circle cx={m.x} cy={m.y} r={config.motorR + 4} fill="#0a0a12" stroke="#1e2535" strokeWidth="2" />
                <circle cx={m.x} cy={m.y} r={config.motorR + 4} fill="none" stroke={mColor} strokeWidth={isSelected ? 2 : 1} opacity={isSelected ? 0.8 : 0.4} filter={`url(#glow-frame-${frameId})`} />
              </>
            )}
            <circle cx={m.x} cy={m.y} r={config.motorR} fill="#111118" stroke="#2a3450" strokeWidth="1.5" />
            <circle cx={m.x} cy={m.y} r={config.motorR * 0.62} fill="#1a1a28" stroke={mColor} strokeWidth="1.5" filter={`url(#glow-frame-${frameId})`} />
            <circle cx={m.x} cy={m.y} r={config.motorR * 0.22} fill={mColor} opacity="0.9" />
            {(frameId === 'x_frame' || frameId === 'lr_frame') && [45, 135, 225, 315].map((angle, j) => {
              const rad = (angle * Math.PI) / 180
              const sr = config.motorR + 2
              return <circle key={`s-${j}`} cx={m.x + Math.cos(rad) * sr} cy={m.y + Math.sin(rad) * sr} r="1.5" fill="#060810" stroke="#2a3450" strokeWidth="0.8" />
            })}
          </g>
        )
      })}

      <g onClick={onClickFC} style={{ cursor: 'pointer' }}>
        <rect x={config.centerX - config.centerSize / 2} y={config.centerY - config.centerSize / 2} width={config.centerSize} height={config.centerSize} rx="5" fill="#0f1520" stroke="#185FA5" strokeWidth="1.5" />
        <rect x={config.centerX - config.centerSize / 2 + 4} y={config.centerY - config.centerSize / 2 + 4} width={config.centerSize - 8} height={config.centerSize - 8} rx="3" fill="#111d30" stroke="#1e2a40" strokeWidth="1" />
        <rect x={config.centerX - config.centerSize / 4} y={config.centerY - config.centerSize / 4} width={config.centerSize / 2} height={config.centerSize / 2} rx="2" fill="#0a1018" stroke={selectedPart === 'fc' ? frameColor : '#00d4ff'} strokeWidth={selectedPart === 'fc' ? 1.8 : 0.8} opacity="0.9" />
        <circle cx={config.centerX} cy={config.centerY} r="4" fill="#00d4ff" opacity="0.9" filter={`url(#glow-prop-${frameId})`} />
        <circle cx={config.centerX} cy={config.centerY} r="1.5" fill="#fff" />
      </g>

      <g onClick={onClickBattery} style={{ cursor: 'pointer' }}>
        <rect x={config.centerX - 24} y={config.centerY + config.centerSize * 0.8} width="48" height="16" rx="3" fill="#111827" stroke={selectedPart === 'battery' ? propColor : frameColor} strokeWidth={selectedPart === 'battery' ? 2 : 1} opacity="0.85" />
        <rect x={config.centerX + 24} y={config.centerY + config.centerSize * 0.8 + 4} width="7" height="8" rx="1" fill="#0b1220" stroke="#334155" strokeWidth="1" />
      </g>

      <text x={config.centerX} y={vbH - 8} textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="9" fill="#3a4a6a" letterSpacing="2">
        {frameId.toUpperCase().replace('_', ' ')}
      </text>

      <style>{`
        @keyframes thrustPulse { from{opacity:0.2} to{opacity:0.7} }
        @keyframes floatDrone { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spinCW { to{transform:rotate(360deg)} }
        @keyframes spinCCW { to{transform:rotate(-360deg)} }
      `}</style>
    </svg>
  )
}
*** End of File

import React from 'react'

// ═══════════════════════════════════════
// FRAME SVG'LERİ
// ═══════════════════════════════════════

export function TinywhoopFrameSVG({ color = '#00d4ff', size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tw-body" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="100%" stopColor="#0a0a12"/>
        </radialGradient>
        <filter id="tw-glow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="tw-inner-shadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite operator="out" in="SourceGraphic"/>
        </filter>
        <linearGradient id="tw-arm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a4a"/>
          <stop offset="100%" stopColor="#1a1a2a"/>
        </linearGradient>
      </defs>

      {/* PROP GUARDS — Ducted rings */}
      {[
        { cx: 75, cy: 75 },
        { cx: 205, cy: 75 },
        { cx: 75, cy: 205 },
        { cx: 205, cy: 205 },
      ].map((p, i) => (
        <g key={i}>
          {/* Outer duct ring */}
          <circle cx={p.cx} cy={p.cy} r={42}
            fill="none" stroke="#1e2535" strokeWidth={10}/>
          {/* Inner duct ring */}
          <circle cx={p.cx} cy={p.cy} r={42}
            fill="none" stroke={color} strokeWidth={2}
            opacity={0.6} filter="url(#tw-glow)"/>
          {/* Duct highlight */}
          <circle cx={p.cx} cy={p.cy} r={42}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1}
            strokeDasharray="8 4"/>
          {/* Inner duct wall */}
          <circle cx={p.cx} cy={p.cy} r={35}
            fill="none" stroke="#0f1018" strokeWidth={6}/>
          <circle cx={p.cx} cy={p.cy} r={35}
            fill="none" stroke={color} strokeWidth={1} opacity={0.3}/>
        </g>
      ))}

      {/* ARMS connecting ducts to center */}
      {[
        { x1: 117, y1: 75, x2: 163, y2: 75 },   // top horizontal
        { x1: 117, y1: 205, x2: 163, y2: 205 },  // bottom horizontal
        { x1: 75, y1: 117, x2: 75, y2: 163 },    // left vertical
        { x1: 205, y1: 117, x2: 205, y2: 163 },  // right vertical
        { x1: 107, y1: 107, x2: 140, y2: 140 },  // TL diagonal
        { x1: 173, y1: 107, x2: 140, y2: 140 },  // TR diagonal
        { x1: 107, y1: 173, x2: 140, y2: 140 },  // BL diagonal
        { x1: 173, y1: 173, x2: 140, y2: 140 },  // BR diagonal
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="url(#tw-arm-grad)" strokeWidth={i < 4 ? 8 : 10} strokeLinecap="round"/>
      ))}

      {/* CENTER BODY */}
      <rect x={115} y={115} width={50} height={50} rx={8}
        fill="url(#tw-body)" stroke="#1e2535" strokeWidth={2}/>
      <rect x={119} y={119} width={42} height={42} rx={5}
        fill="none" stroke={color} strokeWidth={1} opacity={0.4}/>
      {/* PCB detail lines */}
      <line x1={125} y1={140} x2={155} y2={140} stroke={color} strokeWidth={0.5} opacity={0.5}/>
      <line x1={140} y1={125} x2={140} y2={155} stroke={color} strokeWidth={0.5} opacity={0.5}/>
      <circle cx={140} cy={140} r={6} fill={color} opacity={0.8} filter="url(#tw-glow)"/>
      <circle cx={140} cy={140} r={3} fill="#fff" opacity={0.9}/>

      {/* MOTOR MOUNTS inside ducts */}
      {[
        { cx: 75, cy: 75 },
        { cx: 205, cy: 75 },
        { cx: 75, cy: 205 },
        { cx: 205, cy: 205 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={10}
            fill="#0a0a12" stroke="#2a3450" strokeWidth={2}/>
          <circle cx={p.cx} cy={p.cy} r={6}
            fill="#1a1a2a" stroke={color} strokeWidth={1.5} filter="url(#tw-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={2.5}
            fill={color} opacity={0.9}/>
        </g>
      ))}

      {/* SIZE LABEL */}
      <text x={140} y={265} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={9} fill="#3a4a6a" letterSpacing={2}>
        TINYWHOOP — 65mm
      </text>
    </svg>
  )
}

export function ToothpickFrameSVG({ color = '#a855f7', size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tp-arm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="100%" stopColor="#111118"/>
        </linearGradient>
        <filter id="tp-glow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="tp-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e2535"/>
          <stop offset="100%" stopColor="#0a0b0e"/>
        </radialGradient>
      </defs>

      {/* Ultra thin arms — toothpick style */}
      {[
        { x1: 140, y1: 140, x2: 55, y2: 55, w: 4 },
        { x1: 140, y1: 140, x2: 225, y2: 55, w: 4 },
        { x1: 140, y1: 140, x2: 55, y2: 225, w: 4 },
        { x1: 140, y1: 140, x2: 225, y2: 225, w: 4 },
      ].map((l, i) => (
        <g key={i}>
          {/* Carbon fiber arm — very thin */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#tp-arm)" strokeWidth={l.w} strokeLinecap="round"/>
          {/* Carbon fiber weave effect */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.04)" strokeWidth={l.w - 1}
            strokeDasharray="3 3" strokeLinecap="round"/>
          {/* Accent line */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={color} strokeWidth={1} opacity={0.3} strokeLinecap="round"/>
        </g>
      ))}

      {/* Motor mount plates */}
      {[
        { cx: 55, cy: 55 },
        { cx: 225, cy: 55 },
        { cx: 55, cy: 225 },
        { cx: 225, cy: 225 },
      ].map((p, i) => (
        <g key={i}>
          {/* Mount plate */}
          <rect x={p.cx - 14} y={p.cy - 14} width={28} height={28} rx={4}
            fill="#0f1018" stroke="#1e2535" strokeWidth={1.5}
            transform={`rotate(45, ${p.cx}, ${p.cy})`}/>
          <rect x={p.cx - 14} y={p.cy - 14} width={28} height={28} rx={4}
            fill="none" stroke={color} strokeWidth={1} opacity={0.5}
            transform={`rotate(45, ${p.cx}, ${p.cy})`} filter="url(#tp-glow)"/>
          {/* Motor */}
          <circle cx={p.cx} cy={p.cy} r={9}
            fill="#0a0a12" stroke="#2a3450" strokeWidth={1.5}/>
          <circle cx={p.cx} cy={p.cy} r={5}
            fill="#111118" stroke={color} strokeWidth={1.5} filter="url(#tp-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={2}
            fill={color} opacity={0.9}/>
        </g>
      ))}

      {/* Stack — slim center */}
      <rect x={124} y={124} width={32} height={32} rx={4}
        fill="url(#tp-center)" stroke="#1e2535" strokeWidth={1.5}/>
      <rect x={128} y={128} width={24} height={24} rx={3}
        fill="none" stroke={color} strokeWidth={1} opacity={0.4}/>
      {/* FC chip */}
      <rect x={133} y={133} width={14} height={14} rx={2}
        fill="#111827" stroke={color} strokeWidth={0.5} opacity={0.8}/>
      <circle cx={140} cy={140} r={3} fill={color} opacity={0.9} filter="url(#tp-glow)"/>

      {/* Bracing struts */}
      <line x1={104} y1={140} x2={176} y2={140}
        stroke="#1a1a28" strokeWidth={2} opacity={0.6}/>
      <line x1={140} y1={104} x2={140} y2={176}
        stroke="#1a1a28" strokeWidth={2} opacity={0.6}/>

      <text x={140} y={265} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={9} fill="#3a4a6a" letterSpacing={2}>
        TOOTHPICK — 2.5"
      </text>
    </svg>
  )
}

export function DuctedFrameSVG({ color = '#3b82f6', size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="df-glow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="df-body" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a2030"/>
          <stop offset="100%" stopColor="#080a10"/>
        </radialGradient>
        <linearGradient id="df-duct" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a3550"/>
          <stop offset="50%" stopColor="#0f1520"/>
          <stop offset="100%" stopColor="#1a2030"/>
        </linearGradient>
      </defs>

      {/* LARGE PROP GUARDS */}
      {[
        { cx: 80, cy: 80 },
        { cx: 200, cy: 80 },
        { cx: 80, cy: 200 },
        { cx: 200, cy: 200 },
      ].map((p, i) => (
        <g key={i}>
          {/* Outer duct body */}
          <circle cx={p.cx} cy={p.cy} r={48}
            fill="url(#df-duct)" stroke="#1e2535" strokeWidth={12}/>
          {/* Duct glow ring */}
          <circle cx={p.cx} cy={p.cy} r={48}
            fill="none" stroke={color} strokeWidth={1.5}
            opacity={0.7} filter="url(#df-glow)"/>
          {/* Duct highlight arc */}
          <path d={`M ${p.cx - 30} ${p.cy - 38} A 48 48 0 0 1 ${p.cx + 30} ${p.cy - 38}`}
            fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={3} strokeLinecap="round"/>
          {/* Inner opening */}
          <circle cx={p.cx} cy={p.cy} r={33}
            fill="#060810" stroke="#0a0f1a" strokeWidth={2}/>
          {/* Duct struts */}
          {[0, 90, 180, 270].map((angle, j) => {
            const rad = (angle * Math.PI) / 180
            return (
              <line key={j}
                x1={p.cx + Math.cos(rad) * 33} y1={p.cy + Math.sin(rad) * 33}
                x2={p.cx + Math.cos(rad) * 36} y2={p.cy + Math.sin(rad) * 36}
                stroke={color} strokeWidth={2} opacity={0.4}/>
            )
          })}
          {/* Motor */}
          <circle cx={p.cx} cy={p.cy} r={11}
            fill="#0a0b0e" stroke="#2a3450" strokeWidth={2}/>
          <circle cx={p.cx} cy={p.cy} r={7}
            fill="#111827" stroke={color} strokeWidth={1.5} filter="url(#df-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={3}
            fill={color} opacity={0.9}/>
        </g>
      ))}

      {/* CONNECTING ARMS */}
      {[
        { x1: 128, y1: 80, x2: 152, y2: 80 },
        { x1: 128, y1: 200, x2: 152, y2: 200 },
        { x1: 80, y1: 128, x2: 80, y2: 152 },
        { x1: 200, y1: 128, x2: 200, y2: 152 },
        { x1: 113, y1: 113, x2: 140, y2: 140 },
        { x1: 167, y1: 113, x2: 140, y2: 140 },
        { x1: 113, y1: 167, x2: 140, y2: 140 },
        { x1: 167, y1: 167, x2: 140, y2: 140 },
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#1a2030" strokeWidth={i < 4 ? 10 : 12} strokeLinecap="round"/>
      ))}

      {/* CENTER STACK */}
      <rect x={118} y={118} width={44} height={44} rx={6}
        fill="url(#df-body)" stroke="#1e2a40" strokeWidth={2}/>
      <rect x={122} y={122} width={36} height={36} rx={4}
        fill="none" stroke={color} strokeWidth={1} opacity={0.4}/>
      <rect x={128} y={128} width={24} height={24} rx={3}
        fill="#0f1520" stroke={color} strokeWidth={0.5} opacity={0.6}/>
      <circle cx={140} cy={140} r={5} fill={color} opacity={0.9} filter="url(#df-glow)"/>
      <circle cx={140} cy={140} r={2} fill="#fff" opacity={0.8}/>

      <text x={140} y={265} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={9} fill="#3a4a6a" letterSpacing={2}>
        DUCTED — 3.5"
      </text>
    </svg>
  )
}

export function XFrameSVG({ color = '#ef4444', size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="xf-glow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="xf-arm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="40%" stopColor="#1a1a28"/>
          <stop offset="100%" stopColor="#0e0e18"/>
        </linearGradient>
        <radialGradient id="xf-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e2535"/>
          <stop offset="100%" stopColor="#080a12"/>
        </radialGradient>
      </defs>

      {/* ARMS — thick carbon fiber */}
      {[
        { x1: 140, y1: 140, x2: 55, y2: 55 },
        { x1: 140, y1: 140, x2: 225, y2: 55 },
        { x1: 140, y1: 140, x2: 55, y2: 225 },
        { x1: 140, y1: 140, x2: 225, y2: 225 },
      ].map((l, i) => (
        <g key={i}>
          {/* Main arm body */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#xf-arm)" strokeWidth={14} strokeLinecap="round"/>
          {/* Carbon fiber texture highlight */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.06)" strokeWidth={6}
            strokeDasharray="4 4" strokeLinecap="round"/>
          {/* Top highlight */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.1)" strokeWidth={2} strokeLinecap="round"/>
          {/* Color accent */}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={color} strokeWidth={1} opacity={0.4} strokeLinecap="round"/>
        </g>
      ))}

      {/* CENTER PLATE */}
      <rect x={112} y={112} width={56} height={56} rx={8}
        fill="url(#xf-center)" stroke="#2a3450" strokeWidth={2}/>
      {/* PCB layers */}
      <rect x={116} y={116} width={48} height={48} rx={6}
        fill="none" stroke={color} strokeWidth={1} opacity={0.3}/>
      <rect x={122} y={122} width={36} height={36} rx={4}
        fill="#0f1520" stroke="#1e2535" strokeWidth={1}/>
      {/* Mounting holes */}
      {[
        { x: 120, y: 120 }, { x: 160, y: 120 },
        { x: 120, y: 160 }, { x: 160, y: 160 },
      ].map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r={3}
          fill="#060810" stroke="#1e2535" strokeWidth={1}/>
      ))}
      {/* FC Chip */}
      <rect x={130} y={130} width={20} height={20} rx={3}
        fill="#111827" stroke={color} strokeWidth={0.8} opacity={0.8}/>
      <circle cx={140} cy={140} r={4} fill={color} opacity={0.9} filter="url(#xf-glow)"/>
      <circle cx={140} cy={140} r={1.5} fill="#fff"/>

      {/* MOTOR MOUNTS */}
      {[
        { cx: 55, cy: 55 },
        { cx: 225, cy: 55 },
        { cx: 55, cy: 225 },
        { cx: 225, cy: 225 },
      ].map((p, i) => (
        <g key={i}>
          {/* Mount plate */}
          <circle cx={p.cx} cy={p.cy} r={18}
            fill="#0a0a12" stroke="#1e2535" strokeWidth={2}/>
          <circle cx={p.cx} cy={p.cy} r={18}
            fill="none" stroke={color} strokeWidth={1} opacity={0.4} filter="url(#xf-glow)"/>
          {/* Motor bell */}
          <circle cx={p.cx} cy={p.cy} r={12}
            fill="#111118" stroke="#2a3450" strokeWidth={1.5}/>
          {/* Motor top */}
          <circle cx={p.cx} cy={p.cy} r={8}
            fill="#1a1a28" stroke={color} strokeWidth={1.5} filter="url(#xf-glow)"/>
          {/* Motor shaft */}
          <circle cx={p.cx} cy={p.cy} r={3}
            fill={color} opacity={0.9}/>
          {/* Mounting screws */}
          {[45, 135, 225, 315].map((angle, j) => {
            const rad = (angle * Math.PI) / 180
            return (
              <circle key={j}
                cx={p.cx + Math.cos(rad) * 14} cy={p.cy + Math.sin(rad) * 14}
                r={2} fill="#060810" stroke="#2a3450" strokeWidth={1}/>
            )
          })}
        </g>
      ))}

      <text x={140} y={265} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={9} fill="#3a4a6a" letterSpacing={2}>
        X FRAME — 5"
      </text>
    </svg>
  )
}

export function StretchedFrameSVG({ color = '#f97316', size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sf-glow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="sf-arm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a38"/>
          <stop offset="100%" stopColor="#0e0e18"/>
        </linearGradient>
      </defs>

      {/* STRETCHED X — front motors further apart */}
      {[
        { x1: 140, y1: 148, x2: 45, y2: 65 },   // TL — more stretched
        { x1: 140, y1: 148, x2: 235, y2: 65 },  // TR — more stretched
        { x1: 140, y1: 148, x2: 65, y2: 215 },  // BL — closer
        { x1: 140, y1: 148, x2: 215, y2: 215 }, // BR — closer
      ].map((l, i) => (
        <g key={i}>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#sf-arm)" strokeWidth={12} strokeLinecap="round"/>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.05)" strokeWidth={5}
            strokeDasharray="5 3" strokeLinecap="round"/>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={color} strokeWidth={1} opacity={0.35} strokeLinecap="round"/>
        </g>
      ))}

      {/* Center — slightly offset for stretched look */}
      <rect x={116} y={128} width={48} height={40} rx={6}
        fill="#0f1018" stroke="#1e2535" strokeWidth={2}/>
      <rect x={120} y={132} width={40} height={32} rx={4}
        fill="none" stroke={color} strokeWidth={1} opacity={0.3}/>
      <circle cx={140} cy={148} r={5} fill={color} opacity={0.9} filter="url(#sf-glow)"/>
      <circle cx={140} cy={148} r={2} fill="#fff"/>

      {/* Motor positions — asymmetric (stretched) */}
      {[
        { cx: 45, cy: 65 },
        { cx: 235, cy: 65 },
        { cx: 65, cy: 215 },
        { cx: 215, cy: 215 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={16}
            fill="#0a0a12" stroke="#1e2535" strokeWidth={2}/>
          <circle cx={p.cx} cy={p.cy} r={16}
            fill="none" stroke={color} strokeWidth={1} opacity={0.4} filter="url(#sf-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={10}
            fill="#111118" stroke="#2a3450" strokeWidth={1.5}/>
          <circle cx={p.cx} cy={p.cy} r={6}
            fill="#1a1a28" stroke={color} strokeWidth={1.5} filter="url(#sf-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={2.5} fill={color} opacity={0.9}/>
        </g>
      ))}

      {/* RACE arrow indicator */}
      <path d="M 130 108 L 140 95 L 150 108 Z"
        fill={color} opacity={0.4} filter="url(#sf-glow)"/>

      <text x={140} y={265} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={9} fill="#3a4a6a" letterSpacing={2}>
        STRETCHED — 5"
      </text>
    </svg>
  )
}

export function LRFrameSVG({ color = '#22c55e', size = 280 }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="lr-glow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="lr-arm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252535"/>
          <stop offset="100%" stopColor="#0c0c18"/>
        </linearGradient>
      </defs>

      {/* LONG ARMS — 7 inch spread */}
      {[
        { x1: 140, y1: 140, x2: 38, y2: 38 },
        { x1: 140, y1: 140, x2: 242, y2: 38 },
        { x1: 140, y1: 140, x2: 38, y2: 242 },
        { x1: 140, y1: 140, x2: 242, y2: 242 },
      ].map((l, i) => (
        <g key={i}>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#lr-arm)" strokeWidth={10} strokeLinecap="round"/>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.05)" strokeWidth={4}
            strokeDasharray="6 3" strokeLinecap="round"/>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={color} strokeWidth={1} opacity={0.3} strokeLinecap="round"/>
        </g>
      ))}

      {/* Battery tray on bottom */}
      <rect x={110} y={152} width={60} height={22} rx={4}
        fill="#0f1018" stroke="#1e2a30" strokeWidth={1.5}/>
      <rect x={114} y={155} width={52} height={16} rx={3}
        fill="#111827" stroke={color} strokeWidth={0.5} opacity={0.4}/>
      {/* Battery indicator bars */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={118 + i * 12} y={158} width={9} height={10} rx={1}
          fill={color} opacity={0.3 + i * 0.1}/>
      ))}

      {/* Center FC stack */}
      <rect x={118} y={118} width={44} height={36} rx={6}
        fill="#0a0f18" stroke="#1e2a40" strokeWidth={2}/>
      <rect x={122} y={122} width={36} height={28} rx={4}
        fill="none" stroke={color} strokeWidth={1} opacity={0.3}/>
      <rect x={127} y={127} width={26} height={18} rx={2}
        fill="#111827" stroke={color} strokeWidth={0.5} opacity={0.6}/>
      <circle cx={140} cy={136} r={4} fill={color} opacity={0.9} filter="url(#lr-glow)"/>
      <circle cx={140} cy={136} r={1.5} fill="#fff"/>

      {/* GPS module on top */}
      <circle cx={140} cy={108} r={10}
        fill="#0a0f18" stroke={color} strokeWidth={1.5} filter="url(#lr-glow)" opacity={0.8}/>
      <circle cx={140} cy={108} r={5}
        fill={color} opacity={0.3}/>
      <circle cx={140} cy={108} r={2}
        fill={color} opacity={0.8}/>
      <text x={140} y={103} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={6} fill={color} opacity={0.6}>
        GPS
      </text>

      {/* LARGE MOTOR MOUNTS */}
      {[
        { cx: 38, cy: 38 },
        { cx: 242, cy: 38 },
        { cx: 38, cy: 242 },
        { cx: 242, cy: 242 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={20}
            fill="#0a0a12" stroke="#1e2535" strokeWidth={2}/>
          <circle cx={p.cx} cy={p.cy} r={20}
            fill="none" stroke={color} strokeWidth={1.5} opacity={0.5} filter="url(#lr-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={13}
            fill="#111118" stroke="#2a3450" strokeWidth={1.5}/>
          <circle cx={p.cx} cy={p.cy} r={8}
            fill="#1a1a28" stroke={color} strokeWidth={1.5} filter="url(#lr-glow)"/>
          <circle cx={p.cx} cy={p.cy} r={3} fill={color} opacity={0.9}/>
          {/* Larger motor = more mounting screws */}
          {[0, 60, 120, 180, 240, 300].map((angle, j) => {
            const rad = (angle * Math.PI) / 180
            return (
              <circle key={j}
                cx={p.cx + Math.cos(rad) * 16} cy={p.cy + Math.sin(rad) * 16}
                r={1.5} fill="#060810" stroke="#2a3450" strokeWidth={0.8}/>
            )
          })}
        </g>
      ))}

      <text x={140} y={268} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={9} fill="#3a4a6a" letterSpacing={2}>
        LR FRAME — 7"
      </text>
    </svg>
  )
}

// ═══════════════════════════════════════
// MOTOR SVG'LERİ
// ═══════════════════════════════════════

export function MotorSVG({ kv = 2450, color = '#f59e0b', size = 80, label = '' }) {
  const isUltraSmall = kv > 10000
  const isSmall = kv > 3000
  const isMid = kv >= 1700
  const isBig = kv < 1700
  const bellR = isUltraSmall ? 14 : isSmall ? 18 : isMid ? 22 : isBig ? 28 : 22
  const statorR = isUltraSmall ? 9 : isSmall ? 12 : isMid ? 15 : isBig ? 18 : 15

  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.1} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`m-glow-${kv}`}>
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id={`m-bell-${kv}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a4a"/>
          <stop offset="40%" stopColor="#222230"/>
          <stop offset="100%" stopColor="#111118"/>
        </linearGradient>
        <radialGradient id={`m-top-${kv}`} cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#4a4a5a"/>
          <stop offset="100%" stopColor="#1a1a28"/>
        </radialGradient>
      </defs>

      {/* Motor base/stator */}
      <ellipse cx={40} cy={62} rx={statorR + 4} ry={6}
        fill="#0a0a12" stroke="#1e2535" strokeWidth={1.5}/>

      {/* Stator body */}
      <rect x={40 - statorR} y={45} width={statorR * 2} height={18} rx={2}
        fill="#0f0f1a" stroke="#1e2535" strokeWidth={1}/>

      {/* Stator windings */}
      {[-1, 0, 1].map(i => (
        <rect key={i}
          x={40 - statorR + 3 + i * (statorR * 2 / 3 - 1)} y={47}
          width={statorR * 2 / 3 - 3} height={14} rx={1}
          fill={color} opacity={0.15 + Math.abs(i) * 0.05}/>
      ))}

      {/* Motor bell (rotating part) */}
      <ellipse cx={40} cy={44} rx={bellR} ry={7}
        fill={`url(#m-bell-${kv})`} stroke="#2a2a3a" strokeWidth={1.5}/>

      {/* Bell side */}
      <rect x={40 - bellR} y={35} width={bellR * 2} height={10} rx={3}
        fill={`url(#m-bell-${kv})`} stroke="#2a2a3a" strokeWidth={1}/>

      {/* Bell top */}
      <ellipse cx={40} cy={35} rx={bellR} ry={6}
        fill={`url(#m-top-${kv})`} stroke="#3a3a4a" strokeWidth={1.5}/>

      {/* Bell highlight */}
      <ellipse cx={36} cy={33} rx={bellR * 0.5} ry={3}
        fill="rgba(255,255,255,0.08)"/>

      {/* Glow ring around bell */}
      <ellipse cx={40} cy={35} rx={bellR} ry={6}
        fill="none" stroke={color} strokeWidth={1.5}
        opacity={0.7} filter={`url(#m-glow-${kv})`}/>

      {/* Shaft */}
      <rect x={38} y={20} width={4} height={16} rx={2}
        fill="#3a3a4a" stroke="#4a4a5a" strokeWidth={1}/>
      <rect x={38.5} y={20} width={3} height={8} rx={1}
        fill="rgba(255,255,255,0.2)"/>

      {/* Shaft tip */}
      <rect x={38} y={18} width={4} height={4} rx={1}
        fill="#5a5a6a"/>

      {/* Motor label */}
      <text x={40} y={78} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={7}
        fill={color} opacity={0.8} letterSpacing={0.5}>
        {label || `${kv}KV`}
      </text>
    </svg>
  )
}

// ═══════════════════════════════════════
// PERVANE SVG'LERİ
// ═══════════════════════════════════════

export function PropSVG({ blades = 3, pitch = 'mid', color = '#f59e0b', size = 80, ducted = false }) {
  const r = 34
  const bladeAngles = blades === 2 ? [0, 180] : blades === 3 ? [0, 120, 240] : [0, 90, 180, 270]
  const pitchSkew = pitch === 'high' ? 20 : pitch === 'low' ? 7 : 13

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`p-glow-${pitch}`}>
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id={`p-blade-${pitch}`} cx="30%" cy="50%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.3"/>
        </radialGradient>
      </defs>

      {/* Blade shadows */}
      {bladeAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const tx = 40 + Math.cos(rad) * r * 0.5
        const ty = 40 + Math.sin(rad) * r * 0.5
        return (
          <ellipse key={`shadow-${i}`}
            cx={tx + 1} cy={ty + 2}
            rx={r * 0.42} ry={pitchSkew * 0.6}
            fill="rgba(0,0,0,0.4)"
            transform={`rotate(${angle + 90}, ${tx + 1}, ${ty + 2})`}/>
        )
      })}

      {/* Blades */}
      {bladeAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const tx = 40 + Math.cos(rad) * r * 0.5
        const ty = 40 + Math.sin(rad) * r * 0.5
        return (
          <g key={i}>
            <ellipse
              cx={tx} cy={ty}
              rx={r * 0.42} ry={pitchSkew}
              fill={`url(#p-blade-${pitch})`}
              stroke={color} strokeWidth={0.8} opacity={0.9}
              transform={`rotate(${angle + 90}, ${tx}, ${ty})`}/>
            {/* Blade highlight */}
            <ellipse
              cx={tx - Math.sin(rad) * 3} cy={ty + Math.cos(rad) * 3}
              rx={r * 0.2} ry={pitchSkew * 0.4}
              fill="rgba(255,255,255,0.15)"
              transform={`rotate(${angle + 90}, ${tx - Math.sin(rad) * 3}, ${ty + Math.cos(rad) * 3})`}/>
          </g>
        )
      })}

      {/* Hub */}
      <circle cx={40} cy={40} r={8}
        fill="#1a1a28" stroke="#2a2a3a" strokeWidth={1.5}/>
      {ducted && (
        <circle cx={40} cy={40} r={34} fill="none" stroke={color} strokeWidth={2.2} opacity={0.75} />
      )}
      <circle cx={40} cy={40} r={5}
        fill="#111118" stroke={color} strokeWidth={1.5} filter={`url(#p-glow-${pitch})`}/>
      <circle cx={40} cy={40} r={2.5}
        fill={color} opacity={0.9}/>
      {/* Hub highlight */}
      <circle cx={38} cy={38} r={1.5}
        fill="rgba(255,255,255,0.3)"/>
    </svg>
  )
}

// ═══════════════════════════════════════
// BATARYA SVG'LERİ
// ═══════════════════════════════════════

export function BatterySVG({ cells = 4, capacity = 1500, color = '#f59e0b', size = 100 }) {
  let w = 68
  let h = 36
  if (cells === 1) { w = 35; h = 20 }
  else if (cells === 2) { w = 45; h = 24 }
  else if (cells === 4 && capacity <= 1300) { w = 62; h = 33 }
  else if (cells === 4) { w = 68; h = 36 }
  else if (cells === 6 && capacity <= 1100) { w = 76; h = 38 }
  else if (cells === 6 && capacity >= 2200) { w = 90; h = 45 }
  else if (cells === 6) { w = 82; h = 41 }

  return (
    <svg viewBox="0 0 110 70" width={size * 1.4} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`bat-glow-${cells}`}>
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id={`bat-body-${cells}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="50%" stopColor="#1a1a28"/>
          <stop offset="100%" stopColor="#111118"/>
        </linearGradient>
        <linearGradient id={`bat-top-${cells}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3a3a4a"/>
          <stop offset="100%" stopColor="#222230"/>
        </linearGradient>
      </defs>

      {/* Battery shadow */}
      <rect x={16} y={22} width={w} height={h} rx={4}
        fill="rgba(0,0,0,0.4)"/>

      {/* Battery body */}
      <rect x={14} y={18} width={w} height={h} rx={5}
        fill={`url(#bat-body-${cells})`} stroke="#2a2a3a" strokeWidth={2}/>

      {/* Top face */}
      <rect x={14} y={18} width={w} height={12} rx={5}
        fill={`url(#bat-top-${cells})`}/>
      <rect x={14} y={24} width={w} height={6}
        fill={`url(#bat-top-${cells})`}/>

      {/* Cell dividers */}
      {Array.from({ length: cells - 1 }).map((_, i) => (
        <line key={i}
          x1={14 + (w / cells) * (i + 1)} y1={20}
          x2={14 + (w / cells) * (i + 1)} y2={18 + h - 2}
          stroke="#111118" strokeWidth={1.5} opacity={0.8}/>
      ))}

      {/* Cell numbers/indicators */}
      {Array.from({ length: Math.min(cells, 6) }).map((_, i) => (
        <rect key={i}
          x={16 + (w / cells) * i + 2} y={26}
          width={w / cells - 4} height={6} rx={1}
          fill={color} opacity={0.2 + i * 0.05}/>
      ))}

      {/* Label */}
      <rect x={18} y={32} width={w - 8} height={10} rx={2}
        fill={color} opacity={0.15}/>
      <text x={14 + w / 2} y={40} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={7}
        fill={color} opacity={0.9} letterSpacing={1}>
        {cells}S {capacity}mAh
      </text>

      {/* Glow border */}
      <rect x={14} y={18} width={w} height={h} rx={5}
        fill="none" stroke={color} strokeWidth={1}
        opacity={0.5} filter={`url(#bat-glow-${cells})`}/>

      {/* XT Connector */}
      <rect x={14 + w} y={26} width={10} height={12} rx={2}
        fill="#1a1a28" stroke="#2a2a3a" strokeWidth={1.5}/>
      <rect x={14 + w + 2} y={28} width={6} height={8} rx={1}
        fill="#0f0f18"/>
      {/* Connector pins */}
      <circle cx={14 + w + 4} cy={30} r={1.5} fill={color} opacity={0.8}/>
      <circle cx={14 + w + 7} cy={30} r={1.5} fill="#aaa" opacity={0.6}/>
      <circle cx={14 + w + 4} cy={34} r={1.5} fill="#aaa" opacity={0.4}/>
      <circle cx={14 + w + 7} cy={34} r={1.5} fill={color} opacity={0.6}/>

      {/* Voltage label */}
      <text x={14 + w / 2} y={58} textAnchor="middle"
        fontFamily="'Share Tech Mono', monospace" fontSize={7}
        fill="#3a4a6a" letterSpacing={1}>
        {(cells * 3.7).toFixed(1)}V
      </text>
    </svg>
  )
}

// ═══════════════════════════════════════
// YAZILIM PROFİLİ SVG'LERİ
// ═══════════════════════════════════════

export function SoftwareSVG({ type = 'dengeli', color = '#f59e0b', size = 80 }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`sw-glow-${type}`}>
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id={`sw-pcb-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f1f18"/>
          <stop offset="100%" stopColor="#080f0c"/>
        </linearGradient>
      </defs>

      {/* PCB Board */}
      <rect x={10} y={10} width={60} height={60} rx={5}
        fill={`url(#sw-pcb-${type})`} stroke="#1a3028" strokeWidth={1.5}/>

      {/* PCB edge contacts */}
      {[15, 25, 35, 45, 55, 65].map((x, i) => (
        <rect key={i} x={x} y={68} width={4} height={4}
          fill="#c0a060" opacity={0.8}/>
      ))}
      {[15, 25, 35, 45, 55, 65].map((x, i) => (
        <rect key={i} x={x} y={8} width={4} height={4}
          fill="#c0a060" opacity={0.8}/>
      ))}

      {/* PCB traces */}
      <line x1={20} y1={30} x2={60} y2={30} stroke="#1a5038" strokeWidth={1} opacity={0.6}/>
      <line x1={20} y1={50} x2={60} y2={50} stroke="#1a5038" strokeWidth={1} opacity={0.6}/>
      <line x1={30} y1={20} x2={30} y2={60} stroke="#1a5038" strokeWidth={1} opacity={0.6}/>
      <line x1={50} y1={20} x2={50} y2={60} stroke="#1a5038" strokeWidth={1} opacity={0.6}/>

      {/* Main MCU chip */}
      <rect x={25} y={25} width={30} height={30} rx={3}
        fill="#0a0f0c" stroke="#2a4a38" strokeWidth={1.5}/>
      <rect x={27} y={27} width={26} height={26} rx={2}
        fill="#111a14" stroke={color} strokeWidth={0.8} opacity={0.6}/>

      {/* Chip pins */}
      {[30, 36, 42, 48].map((y, i) => (
        <g key={i}>
          <rect x={22} y={y} width={4} height={2} fill="#c0a060" opacity={0.7}/>
          <rect x={54} y={y} width={4} height={2} fill="#c0a060" opacity={0.7}/>
        </g>
      ))}
      {[30, 36, 42, 48].map((x, i) => (
        <g key={i}>
          <rect x={x} y={22} width={2} height={4} fill="#c0a060" opacity={0.7}/>
          <rect x={x} y={54} width={2} height={4} fill="#c0a060" opacity={0.7}/>
        </g>
      ))}

      {/* Center glow / type indicator */}
      {type === 'agresif' && (
        <>
          <polygon points="40,30 45,42 35,42"
            fill={color} opacity={0.8} filter={`url(#sw-glow-${type})`}/>
          <polygon points="40,34 44,43 36,43"
            fill="rgba(0,0,0,0.6)"/>
        </>
      )}
      {type === 'dengeli' && (
        <>
          <line x1={32} y1={40} x2={48} y2={40}
            stroke={color} strokeWidth={2} opacity={0.8} filter={`url(#sw-glow-${type})`}/>
          <circle cx={36} cy={40} r={2} fill={color} opacity={0.9}/>
          <circle cx={44} cy={40} r={2} fill={color} opacity={0.9}/>
        </>
      )}
      {(type === 'stabil' || type === 'cinematic') && (
        <path d="M 30 42 Q 35 32 40 40 Q 45 48 50 38"
          fill="none" stroke={color} strokeWidth={2}
          opacity={0.8} filter={`url(#sw-glow-${type})`}/>
      )}
      {type === 'freestyle' && (
        <>
          <path d="M 32 44 L 36 32 L 40 38 L 44 28 L 48 36"
            fill="none" stroke={color} strokeWidth={2}
            opacity={0.8} filter={`url(#sw-glow-${type})`}/>
        </>
      )}
      {type === 'racing' && (
        <>
          <polygon points="33,44 40,28 47,44"
            fill="none" stroke={color} strokeWidth={1.5}
            opacity={0.8} filter={`url(#sw-glow-${type})`}/>
          <circle cx={40} cy={40} r={3}
            fill={color} opacity={0.9} filter={`url(#sw-glow-${type})`}/>
        </>
      )}

      {/* Corner LEDs */}
      {[
        { x: 14, y: 14 }, { x: 64, y: 14 },
        { x: 14, y: 64 }, { x: 64, y: 64 },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5}
          fill={color} opacity={0.6 + (i % 2) * 0.3}
          filter={`url(#sw-glow-${type})`}/>
      ))}
    </svg>
  )
}

// ═══════════════════════════════════════
// FRAME → SVG MAPPING
// ═══════════════════════════════════════

export function FrameSVGByID({ frameId, color, size = 280 }) {
  const map = {
    tinywhoop:  <TinywhoopFrameSVG color={color} size={size}/>,
    toothpick:  <ToothpickFrameSVG color={color} size={size}/>,
    ducted:     <DuctedFrameSVG color={color} size={size}/>,
    x_frame:    <XFrameSVG color={color} size={size}/>,
    stretched:  <StretchedFrameSVG color={color} size={size}/>,
    lr_frame:   <LRFrameSVG color={color} size={size}/>,
  }
  return map[frameId] || <XFrameSVG color={color} size={size}/>
}

export function MotorSVGByID({ motorId, color, size = 80 }) {
  const kvMap = {
    '0802_19000': 19000,
    '1002_22000': 22000,
    '1102_18000': 18000,
    '1103_15000': 15000,
    '1404_4600': 4600,
    '2004_3000': 3000,
    '2207_1750': 1750,
    '2207_1950': 1950,
    '2207_2050': 2050,
    '2306_2450': 2450,
    '2806_1300': 1300,
  }
  const kv = kvMap[motorId] || 2450
  return <MotorSVG kv={kv} color={color} size={size} label={`${kv}KV`}/>
}

export function PropSVGByID({ propId, color, size = 80 }) {
  const propMap = {
    '31mm_2b':   { blades: 2, pitch: 'low' },
    '31mm_3b':   { blades: 3, pitch: 'low' },
    '40mm_3b':   { blades: 3, pitch: 'mid' },
    '45mm_ducted': { blades: 3, pitch: 'low', ducted: true },
    '2521':      { blades: 2, pitch: 'low' },
    '2535':      { blades: 3, pitch: 'high' },
    '3520':      { blades: 2, pitch: 'mid' },
    '3540':      { blades: 3, pitch: 'high' },
    '5140':      { blades: 3, pitch: 'mid' },
    '5143':      { blades: 3, pitch: 'high' },
    '5046':      { blades: 2, pitch: 'mid' },
    '5052':      { blades: 3, pitch: 'mid' },
    '7035':      { blades: 2, pitch: 'low' },
  }
  const p = propMap[propId] || { blades: 3, pitch: 'mid' }
  return <PropSVG blades={p.blades} pitch={p.pitch} color={color} size={size} ducted={Boolean(p.ducted)}/>
}

export function BatterySVGByID({ batteryId, color, size = 80 }) {
  const batMap = {
    '1s_300':  { cells: 1, capacity: 300 },
    '1s_450':  { cells: 1, capacity: 450 },
    '2s_550':  { cells: 2, capacity: 550 },
    '2s_650':  { cells: 2, capacity: 650 },
    '4s_1300': { cells: 4, capacity: 1300 },
    '4s_1500': { cells: 4, capacity: 1500 },
    '6s_1100': { cells: 6, capacity: 1100 },
    '6s_1300': { cells: 6, capacity: 1300 },
    '6s_2200': { cells: 6, capacity: 2200 },
  }
  const b = batMap[batteryId] || { cells: 4, capacity: 1500 }
  return <BatterySVG cells={b.cells} capacity={b.capacity} color={color} size={size}/>
}

export function SoftwareSVGByID({ softwareId, color, size = 80 }) {
  return <SoftwareSVG type={softwareId} color={color} size={size}/>
}

export function UnifiedDroneSVG({
  frameId = 'x_frame',
  motorId = '2207_1950',
  propId = '5052',
  frameColor = '#00d4ff',
  motorColor = '#f59e0b',
  propColor = '#00d4ff',
  size = 300,
  onSelectPart,
}) {
  const [hovered, setHovered] = React.useState(null)
  const spreadMap = { tinywhoop: 70, toothpick: 80, ducted: 85, x_frame: 90, stretched: 95, lr_frame: 110 }
  const spread = spreadMap[frameId] || 90
  const motors = frameId === 'stretched'
    ? [
      { cx: 160 - (spread + 8), cy: 160 - (spread - 6) },
      { cx: 160 + (spread + 8), cy: 160 - (spread - 6) },
      { cx: 160 - (spread - 10), cy: 160 + (spread + 2) },
      { cx: 160 + (spread - 10), cy: 160 + (spread + 2) },
    ]
    : [
      { cx: 160 - spread, cy: 160 - spread },
      { cx: 160 + spread, cy: 160 - spread },
      { cx: 160 - spread, cy: 160 + spread },
      { cx: 160 + spread, cy: 160 + spread },
    ]
  const propRxMap = {
    tinywhoop: 28,
    ducted: 32,
    x_frame: 36,
    stretched: 36,
    toothpick: 36,
    lr_frame: 44,
  }

  const propRxFromId = propId === '31mm_2b' || propId === '31mm_3b'
    ? 28
    : propId === '40mm_3b'
      ? 30
      : propId === '45mm_ducted'
        ? 32
        : propId === '2521' || propId === '2535'
          ? 30
          : propId === '3520' || propId === '3540'
            ? 32
            : propId === '7035'
              ? 44
              : null
  const propRx = propRxFromId || propRxMap[frameId] || 36
  const propRy = Math.max(6, Math.round(propRx * 0.2))
  const propStroke = propRx > 40 ? 2.2 : 2
  const motorOuter = motorId === '0802_19000' || motorId === '1002_22000' || motorId === '1102_18000' || motorId === '1103_15000'
    ? 12
    : motorId === '1404_4600' || motorId === '2004_3000'
      ? 14
      : motorId === '2806_1300'
        ? 18
        : 16
  const motorMid = Math.max(8, motorOuter - 6)
  const motorInner = Math.max(5, motorOuter - 10)

  return (
    <svg viewBox="0 0 320 320" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ud-glow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="ud-center" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={`${frameColor}66`} />
          <stop offset="100%" stopColor={`${frameColor}00`} />
        </radialGradient>
      </defs>

      {/* 1) Thrust glows */}
      {motors.map((m, i) => (
        <ellipse
          key={`glow-${i}`}
          cx={m.cx}
          cy={m.cy + 8}
          rx="38"
          ry="10"
          fill={i === 0 || i === 3 ? '#00d4ff33' : `${frameColor}33`}
        />
      ))}

      {/* 2) Arms */}
      {motors.map((m, i) => (
        <line
          key={`arm-${i}`}
          x1="160"
          y1="160"
          x2={m.cx}
          y2={m.cy}
          stroke="#1a2232"
          strokeWidth="14"
          strokeLinecap="round"
          style={{ transition: 'stroke-opacity 0.2s ease', strokeOpacity: hovered?.type === 'frame' ? 0.95 : 0.78 }}
        />
      ))}

      {/* 3) Arm highlights */}
      {motors.map((m, i) => (
        <line
          key={`arm-h-${i}`}
          x1="160"
          y1="160"
          x2={m.cx}
          y2={m.cy}
          stroke="rgba(255,255,255,0.24)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="7 6"
          style={{ transition: 'opacity 0.2s ease', opacity: hovered?.type === 'frame' ? 0.9 : 0.52 }}
        />
      ))}

      {/* Center underglow */}
      <circle cx="160" cy="160" r="88" fill="url(#ud-center)" />

      {/* Frame click area */}
      {motors.map((m, i) => (
        <line
          key={`frame-hit-${i}`}
          x1="160"
          y1="160"
          x2={m.cx}
          y2={m.cy}
          stroke="transparent"
          strokeWidth="26"
          strokeLinecap="round"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectPart?.('frame')}
          onMouseEnter={() => setHovered({ type: 'frame', index: i })}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* 4) Props */}
      {motors.map((m, i) => {
        const isCW = i === 0 || i === 3
        const color = isCW ? '#00d4ff' : frameColor
        return (
          <g key={`prop-${i}`} style={{ transformOrigin: `${m.cx}px ${m.cy}px`, animation: `${isCW ? 'spinCW' : 'spinCCW'} 0.27s linear infinite` }}>
            <ellipse
              cx={m.cx}
              cy={m.cy}
              rx={propRx}
              ry={propRy}
              fill={`${color}1f`}
              stroke={color}
              strokeWidth={propStroke}
              strokeDasharray="9 5"
            />
            <ellipse
              cx={m.cx}
              cy={m.cy}
              rx={Math.max(12, propRx * 0.44)}
              ry={Math.max(3, propRy * 0.6)}
              fill="none"
              stroke={`${color}99`}
              strokeWidth="1.3"
              strokeDasharray="4 3"
            />
            <circle
              cx={m.cx}
              cy={m.cy}
              r={Math.max(22, propRx)}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectPart?.('prop')}
              onMouseEnter={() => setHovered({ type: 'prop', index: i })}
              onMouseLeave={() => setHovered(null)}
            />
          </g>
        )
      })}

      {/* 5) Motor mounts */}
      {motors.map((m, i) => (
        <g
          key={`motor-${i}`}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectPart?.('motor')}
          onMouseEnter={() => setHovered({ type: 'motor', index: i })}
          onMouseLeave={() => setHovered(null)}
        >
          <circle cx={m.cx} cy={m.cy} r={motorOuter} fill="#0b0f18" stroke={hovered?.type === 'motor' && hovered?.index === i ? '#5b6f95' : '#2a3550'} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }} />
          <circle cx={m.cx} cy={m.cy} r={motorMid} fill="#111827" stroke={hovered?.type === 'motor' && hovered?.index === i ? '#ffd166' : motorColor} strokeWidth="1.8" style={{ transition: 'stroke 0.2s ease, filter 0.2s ease', filter: hovered?.type === 'motor' && hovered?.index === i ? 'drop-shadow(0 0 5px rgba(255,209,102,0.8))' : 'none' }} />
          <circle cx={m.cx} cy={m.cy} r={motorInner} fill="#1f2937" stroke={frameColor} strokeWidth="1.1" />
          <circle cx={m.cx} cy={m.cy} r="2.5" fill={motorColor} filter="url(#ud-glow)" />
        </g>
      ))}

      {/* 6) Center FC board */}
      <rect
        x="136"
        y="136"
        width="48"
        height="48"
        rx="7"
        fill="#0d1220"
        stroke={hovered?.type === 'fc' ? '#7ed8ff' : '#2a3550'}
        strokeWidth="2"
        style={{ cursor: 'pointer', transition: 'stroke 0.2s ease, filter 0.2s ease', filter: hovered?.type === 'fc' ? 'drop-shadow(0 0 8px rgba(126,216,255,0.75))' : 'none' }}
        onClick={() => onSelectPart?.('fc')}
        onMouseEnter={() => setHovered({ type: 'fc' })}
        onMouseLeave={() => setHovered(null)}
      />
      <rect x="142" y="142" width="36" height="36" rx="5" fill="none" stroke={frameColor} strokeWidth="1.1" opacity="0.65" />
      <rect x="149" y="149" width="22" height="22" rx="3" fill="#0b1220" stroke={motorColor} strokeWidth="1" opacity="0.8" />
      <line x1="148" y1="160" x2="172" y2="160" stroke={frameColor} strokeWidth="0.9" opacity="0.6" />
      <line x1="160" y1="148" x2="160" y2="172" stroke={frameColor} strokeWidth="0.9" opacity="0.6" />
      <circle cx="160" cy="160" r="4" fill={propColor} filter="url(#ud-glow)" />
      <circle cx="146" cy="146" r="2" fill="#00d4ff" opacity="0.85" />
      <circle cx="174" cy="146" r="2" fill={frameColor} opacity="0.85" />
      <circle cx="146" cy="174" r="2" fill={frameColor} opacity="0.85" />
      <circle cx="174" cy="174" r="2" fill="#00d4ff" opacity="0.85" />

      {/* Battery indicator */}
      <rect
        x="136"
        y="210"
        width="48"
        height="20"
        rx="5"
        fill="#0f1824"
        stroke="#2a3550"
        strokeWidth="1.6"
        style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
        opacity={hovered?.type === 'battery' ? 1 : 0.84}
        onClick={() => onSelectPart?.('battery')}
        onMouseEnter={() => setHovered({ type: 'battery' })}
        onMouseLeave={() => setHovered(null)}
      />
      <rect x="141" y="215" width="38" height="10" rx="3" fill={frameColor} opacity={hovered?.type === 'battery' ? 0.45 : 0.25} style={{ transition: 'opacity 0.2s ease' }} />
      <rect x="184" y="216" width="5" height="8" rx="1" fill="#2a3550" />

      <style>{`
        @keyframes spinCW { to { transform: rotate(360deg); } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }
      `}</style>
    </svg>
  )
}
