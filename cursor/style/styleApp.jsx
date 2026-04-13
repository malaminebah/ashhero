import { useState } from 'react'

// ============================================================
// DESIGN TOKENS
// ============================================================
const T = {
  bg: '#08000f',
  bg2: '#0f0020',
  surface: 'rgba(255,255,255,0.03)',
  border: 'rgba(168,85,247,0.15)',
  accent: '#a855f7',
  accentDark: '#7c3aed',
  accentDeep: '#4c1d95',
  gold: '#fbbf24',
  red: '#ef4444',
  text: '#f3e8ff',
  textMuted: 'rgba(243,232,255,0.4)',
  textDim: 'rgba(243,232,255,0.2)',
}

// ============================================================
// PIXEL SPRITES
// ============================================================
const Sword = ({ s = 20 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 16 16"
    style={{ imageRendering: 'pixelated', display: 'block' }}
  >
    <rect x="7" y="1" width="2" height="8" fill="#d4d4d8" />
    <rect x="7" y="1" width="1" height="1" fill="#fff" />
    <rect x="5" y="9" width="6" height="2" fill="#92400e" />
    <rect x="7" y="11" width="2" height="4" fill="#78350f" />
  </svg>
)
const Shield = ({ s = 20, c = T.accent }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 16 16"
    style={{ imageRendering: 'pixelated', display: 'block' }}
  >
    <rect x="4" y="2" width="8" height="2" fill={c} />
    <rect x="2" y="4" width="12" height="6" fill={c} />
    <rect x="4" y="10" width="8" height="2" fill={c} opacity="0.8" />
    <rect x="6" y="12" width="4" height="2" fill={c} opacity="0.6" />
    <rect x="7" y="14" width="2" height="1" fill={c} opacity="0.4" />
    <rect x="6" y="5" width="4" height="4" fill="#fff" opacity="0.15" />
  </svg>
)
const Heart = ({ s = 16, c = '#ef4444' }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 10 10"
    style={{ imageRendering: 'pixelated', display: 'block' }}
  >
    <rect x="1" y="2" width="3" height="2" fill={c} />
    <rect x="6" y="2" width="3" height="2" fill={c} />
    <rect x="0" y="3" width="10" height="4" fill={c} />
    <rect x="2" y="7" width="6" height="2" fill={c} />
    <rect x="4" y="9" width="2" height="1" fill={c} />
    <rect x="1" y="3" width="1" height="1" fill="#fca5a5" />
  </svg>
)
const Star = ({ s = 16, c = T.gold }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 12 12"
    style={{ imageRendering: 'pixelated', display: 'block' }}
  >
    <rect x="5" y="0" width="2" height="4" fill={c} />
    <rect x="0" y="4" width="12" height="2" fill={c} />
    <rect x="2" y="6" width="8" height="2" fill={c} />
    <rect x="1" y="8" width="4" height="2" fill={c} />
    <rect x="7" y="8" width="4" height="2" fill={c} />
    <rect x="0" y="10" width="3" height="2" fill={c} />
    <rect x="9" y="10" width="3" height="2" fill={c} />
  </svg>
)
const Coin = ({ s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 12 12"
    style={{ imageRendering: 'pixelated', display: 'block' }}
  >
    <rect x="3" y="0" width="6" height="2" fill={T.gold} />
    <rect x="1" y="2" width="10" height="8" fill={T.gold} />
    <rect x="3" y="10" width="6" height="2" fill={T.gold} />
    <rect x="5" y="2" width="2" height="8" fill="#92400e" opacity="0.4" />
    <rect x="2" y="3" width="1" height="1" fill="#fef08a" />
  </svg>
)

const Character = ({ days = 0 }) => {
  const s = days < 1 ? 0 : days < 7 ? 1 : days < 30 ? 2 : 3
  const body = ['#52525b', '#7c3aed', '#6d28d9', '#4c1d95'][s]
  const eye = ['#71717a', '#a855f7', '#c084fc', '#e879f9'][s]
  const skin = s === 0 ? '#a1a1aa' : '#f5d5a0'
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 18 18"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {s >= 2 && <rect x="5" y="1" width="8" height="2" fill={body} />}
      <rect x="5" y="2" width="8" height="5" fill={skin} />
      <rect x="7" y="3" width="2" height="2" fill={eye} />
      <rect x="11" y="3" width="2" height="2" fill={eye} />
      <rect x="8" y="6" width="4" height="1" fill="#c0a080" />
      <rect x="4" y="7" width="10" height="6" fill={body} />
      {s >= 1 && (
        <rect x="4" y="7" width="10" height="2" fill={body} opacity="0.6" />
      )}
      {s >= 3 && <rect x="6" y="9" width="6" height="1" fill={eye} />}
      <rect x="1" y="7" width="3" height="5" fill={body} />
      <rect x="14" y="7" width="3" height="5" fill={body} />
      {s >= 1 && (
        <>
          <rect x="17" y="4" width="1" height="6" fill="#d4d4d8" />
          <rect x="16" y="7" width="3" height="1" fill="#92400e" />
        </>
      )}
      <rect x="5" y="13" width="3" height="4" fill={body} />
      <rect x="10" y="13" width="3" height="4" fill={body} />
    </svg>
  )
}

const PixelBar = ({ pct, color = T.accent, blocks = 16 }) => {
  const filled = Math.floor((Math.min(100, pct) / 100) * blocks)
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: blocks }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '7px',
            background: i < filled ? color : 'rgba(255,255,255,0.05)',
            borderRadius: '1px',
            boxShadow: i < filled ? `0 0 3px ${color}66` : 'none',
          }}
        />
      ))}
    </div>
  )
}

// ============================================================
// SHARED UI
// ============================================================
const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: '14px',
      padding: '14px',
      ...style,
    }}
  >
    {children}
  </div>
)

const Btn = ({ children, onClick, variant = 'primary', style = {} }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '15px',
      background:
        variant === 'primary'
          ? `linear-gradient(135deg, ${T.accentDark}, ${T.accentDeep})`
          : 'transparent',
      border: variant === 'ghost' ? `1px solid rgba(239,68,68,0.2)` : 'none',
      borderRadius: '12px',
      color: variant === 'ghost' ? 'rgba(239,68,68,0.45)' : '#fff',
      fontSize: '11px',
      fontFamily: 'monospace',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow:
        variant === 'primary' ? `0 8px 24px rgba(124,58,237,0.35)` : 'none',
      ...style,
    }}
  >
    {children}
  </button>
)

const Label = ({ children, style = {} }) => (
  <div
    style={{
      fontSize: '9px',
      letterSpacing: '3px',
      color: T.textDim,
      textTransform: 'uppercase',
      fontFamily: 'monospace',
      ...style,
    }}
  >
    {children}
  </div>
)

// ============================================================
// TAB BAR
// ============================================================
const TabBar = ({ active, onChange }) => {
  const tabs = [
    { id: 'dashboard', icon: <Shield s={18} />, label: 'Camp' },
    { id: 'combat', icon: <Sword s={18} />, label: 'Combat' },
    { id: 'profile', icon: <Star s={18} />, label: 'Héros' },
  ]
  return (
    <div
      style={{
        display: 'flex',
        background: '#0a001a',
        borderTop: `1px solid ${T.border}`,
        padding: '10px 0 16px',
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: active === t.id ? 1 : 0.3,
            transition: 'opacity 0.2s',
          }}
        >
          <div
            style={{
              filter:
                active === t.id ? `drop-shadow(0 0 6px ${T.accent})` : 'none',
            }}
          >
            {t.icon}
          </div>
          <span
            style={{
              fontSize: '9px',
              color: active === t.id ? T.accent : T.textDim,
              fontFamily: 'monospace',
              letterSpacing: '1px',
            }}
          >
            {t.label}
          </span>
          {active === t.id && (
            <div
              style={{
                width: '16px',
                height: '2px',
                background: T.accent,
                borderRadius: '1px',
              }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

// ============================================================
// SCREEN — ONBOARDING
// ============================================================
const steps = ['type', 'quantity', 'price', 'ready']

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ isVaper: false, qty: '20', price: '15' })

  const next = () =>
    step < steps.length - 1 ? setStep((s) => s + 1) : onDone()

  return (
    <div
      style={{
        flex: 1,
        padding: '40px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Progress pixels */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '40px' }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '4px',
              background: i <= step ? T.accent : 'rgba(255,255,255,0.06)',
              borderRadius: '2px',
              boxShadow: i <= step ? `0 0 6px ${T.accent}66` : 'none',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      <div style={{ flex: 1 }}>
        {step === 0 && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div
              style={{
                fontSize: '32px',
                marginBottom: '16px',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              ⚔️
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}
            >
              Ton aventure commence.
            </div>
            <div
              style={{
                fontSize: '13px',
                color: T.textMuted,
                marginBottom: '40px',
                lineHeight: 1.6,
              }}
            >
              Chaque heure sans fumer, ton guerrier grandit. Dis-nous contre
              quoi tu te bats.
            </div>
            <Label style={{ marginBottom: '12px' }}>
              Tu fumes ou tu vapes ?
            </Label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { v: false, label: '🚬 Fumer' },
                { v: true, label: '💨 Vaper' },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setData((d) => ({ ...d, isVaper: o.v }))}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background:
                      data.isVaper === o.v ? `rgba(168,85,247,0.2)` : T.surface,
                    border: `1px solid ${data.isVaper === o.v ? T.accent : T.border}`,
                    color: data.isVaper === o.v ? T.accent : T.textMuted,
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    transition: 'all 0.2s',
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '8px',
              }}
            >
              Combien par jour ?
            </div>
            <div
              style={{
                fontSize: '13px',
                color: T.textMuted,
                marginBottom: '40px',
                lineHeight: 1.6,
              }}
            >
              On calcule argent économisé et les cigarettes évitées en temps
              réel.
            </div>
            <Label style={{ marginBottom: '10px' }}>
              {data.isVaper ? 'Pods par semaine' : 'Cigarettes par jour'}
            </Label>
            <input
              value={data.qty}
              onChange={(e) => setData((d) => ({ ...d, qty: e.target.value }))}
              type="number"
              style={{
                width: '100%',
                padding: '16px',
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: '12px',
                color: '#fff',
                fontSize: '20px',
                fontFamily: 'monospace',
                outline: 'none',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
              <Coin s={32} />
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '8px',
              }}
            >
              Prix du paquet ?
            </div>
            <div
              style={{
                fontSize: '13px',
                color: T.textMuted,
                marginBottom: '40px',
                lineHeight: 1.6,
              }}
            >
              Tu vas voir largent accumuler en temps réel. cest motivant.
            </div>
            <Label style={{ marginBottom: '10px' }}>Prix en dollars ($)</Label>
            <input
              value={data.price}
              onChange={(e) =>
                setData((d) => ({ ...d, price: e.target.value }))
              }
              type="number"
              style={{
                width: '100%',
                padding: '16px',
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: '12px',
                color: '#fff',
                fontSize: '20px',
                fontFamily: 'monospace',
                outline: 'none',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            />
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', animation: 'fadeUp 0.3s ease' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                margin: '0 auto 20px',
                background: `radial-gradient(circle, ${T.accent}22, transparent)`,
                border: `1px solid ${T.accent}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 60px ${T.accent}33`,
              }}
            >
              <div style={{ animation: 'float 3s ease-in-out infinite' }}>
                <Character days={0} />
              </div>
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '8px',
              }}
            >
              Ton guerrier tattend.
            </div>
            <div
              style={{
                fontSize: '13px',
                color: T.textMuted,
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              {data.qty} {data.isVaper ? 'pods/sem' : 'cigs/jour'} ·{' '}
              {data.price}$/paquet
              <br />
              <span style={{ color: T.accent }}>
                Prêt à commencer le combat ?
              </span>
            </div>
          </div>
        )}
      </div>

      <Btn onClick={next}>
        {step < 3 ? 'Continuer →' : "⚔️ Commencer l'aventure"}
      </Btn>
    </div>
  )
}

// ============================================================
// SCREEN — DASHBOARD
// ============================================================
function Dashboard() {
  const days = 47
  const stage = 2
  const stageLabel = ['Novice', 'Apprenti', 'Guerrier', 'Maître'][stage]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '44px 20px 20px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
        }}
      >
        <div>
          <Label>Quête principale</Label>
          <div
            style={{
              fontSize: '16px',
              color: '#fff',
              fontWeight: '600',
              marginTop: '4px',
            }}
          >
            La Grande Évasion
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.25)',
            padding: '5px 10px',
            borderRadius: '20px',
          }}
        >
          <Star s={12} />
          <span
            style={{ fontSize: '11px', color: T.gold, fontFamily: 'monospace' }}
          >
            650 XP
          </span>
        </div>
      </div>

      {/* Personnage */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: '0 auto',
            background: `radial-gradient(circle, ${T.accent}22, transparent 70%)`,
            border: `1px solid ${T.accent}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 60px ${T.accent}22`,
            position: 'relative',
          }}
        >
          <div style={{ animation: 'float 3s ease-in-out infinite' }}>
            <Character days={days} />
          </div>
          {/* Pixel particles */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                background: T.accent,
                borderRadius: '1px',
                top: `${15 + i * 20}%`,
                left: i % 2 === 0 ? '6%' : '90%',
                opacity: 0.4,
                animation: `glow ${1.5 + i * 0.3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '12px',
            background: `${T.accent}15`,
            border: `1px solid ${T.accent}33`,
            borderRadius: '4px',
            padding: '4px 12px',
          }}
        >
          <Shield s={12} />
          <span
            style={{
              fontSize: '10px',
              color: T.accent,
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
          >
            {stageLabel}
          </span>
        </div>

        <div style={{ marginTop: '10px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: '900',
              lineHeight: 1,
              letterSpacing: '-4px',
              color: '#fff',
              fontFamily: 'monospace',
              textShadow: `0 0 30px ${T.accent}55`,
            }}
          >
            {days}
          </div>
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '5px',
              color: `${T.accent}88`,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            jours de combat
          </div>
          <div
            style={{
              fontSize: '12px',
              color: T.textDim,
              fontFamily: 'monospace',
              marginTop: '4px',
            }}
          >
            14h 32m
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <Card style={{ marginBottom: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sword s={14} />
            <span
              style={{
                fontSize: '10px',
                color: T.textMuted,
                fontFamily: 'monospace',
              }}
            >
              Niveau {stage + 1}
            </span>
          </div>
          <span
            style={{
              fontSize: '10px',
              color: T.accent,
              fontFamily: 'monospace',
            }}
          >
            → 1 mois
          </span>
        </div>
        <PixelBar pct={65} color={T.accent} />
        <div
          style={{
            fontSize: '9px',
            color: T.textDim,
            fontFamily: 'monospace',
            marginTop: '6px',
            textAlign: 'right',
          }}
        >
          13 jours restants
        </div>
      </Card>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {[
          { icon: <Coin s={18} />, val: '352$', label: 'Économisés' },
          {
            icon: <span style={{ fontSize: '16px' }}>🚬</span>,
            val: '940',
            label: 'Évitées',
          },
          { icon: <Heart s={18} />, val: '7h', label: 'Vie regagnée' },
          { icon: <Star s={18} />, val: '4/6', label: 'Jalons' },
        ].map((s) => (
          <Card key={s.label}>
            <div style={{ marginBottom: '6px' }}>{s.icon}</div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#fff',
                fontFamily: 'monospace',
                letterSpacing: '-0.5px',
              }}
            >
              {s.val}
            </div>
            <Label style={{ marginTop: '3px' }}>{s.label}</Label>
          </Card>
        ))}
      </div>

      {/* Jalons */}
      <Card style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <Label>Jalons débloqués</Label>
          <span
            style={{
              fontSize: '10px',
              color: T.accent,
              fontFamily: 'monospace',
            }}
          >
            4 / 6
          </span>
        </div>
        {[
          { label: '1h — Première victoire', done: true },
          { label: '24h — Rythme cardiaque OK', done: true },
          { label: '3j — Nicotine éliminée', done: true },
          { label: '7j — Guerrier débutant', done: true },
          { label: '30j — Guerrier du Souffle', done: false, current: true },
          { label: '90j — Armure complète', done: false },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '1px',
                background: m.done
                  ? T.accent
                  : m.current
                    ? `${T.accent}44`
                    : 'rgba(255,255,255,0.06)',
                boxShadow: m.done ? `0 0 6px ${T.accent}` : 'none',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '11px',
                color: m.done ? T.text : m.current ? T.textMuted : T.textDim,
                fontFamily: 'monospace',
              }}
            >
              {m.label}
            </span>
            {m.current && (
              <span
                style={{
                  fontSize: '9px',
                  color: T.accent,
                  fontFamily: 'monospace',
                  marginLeft: 'auto',
                }}
              >
                EN COURS
              </span>
            )}
          </div>
        ))}
      </Card>

      <Btn>
        <Sword s={16} />
        Combattre une envie
      </Btn>
      <Btn variant="ghost" style={{ marginTop: '8px' }}>
        jai rechuté
      </Btn>
    </div>
  )
}

// ============================================================
// SCREEN — COMBAT
// ============================================================
function Combat() {
  const [state, setState] = useState('idle') // idle | fighting | victory
  const [chosen, setChosen] = useState(null)
  const [bossHp, setBossHp] = useState(80)

  const actions = [
    { icon: '💧', label: "Boire un grand verre d'eau", xp: 25, dmg: 30 },
    { icon: '🌬️', label: 'Respiration 4-7-8', xp: 35, dmg: 40 },
    { icon: '🚶', label: 'Marcher 5 minutes', xp: 40, dmg: 50 },
    { icon: '🧘', label: '10 respirations profondes', xp: 30, dmg: 35 },
  ]

  const attack = (a) => {
    setChosen(a)
    setState('fighting')
    setTimeout(() => {
      setBossHp((h) => Math.max(0, h - a.dmg))
      setState('victory')
    }, 800)
  }

  const reset = () => {
    setState('idle')
    setChosen(null)
    setBossHp(80)
  }

  return (
    <div
      style={{
        flex: 1,
        padding: '44px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Label style={{ marginBottom: '20px' }}>Champ de bataille</Label>

      {/* Boss */}
      <Card
        style={{
          textAlign: 'center',
          marginBottom: '16px',
          background: 'rgba(120,0,30,0.15)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <Label style={{ color: 'rgba(239,68,68,0.5)', marginBottom: '8px' }}>
          Ennemi détecté
        </Label>
        <div
          style={{
            fontSize: '56px',
            margin: '8px 0',
            filter: state === 'fighting' ? 'brightness(2)' : 'none',
            transition: 'filter 0.3s',
            animation:
              state === 'idle' ? 'float 2s ease-in-out infinite' : 'none',
          }}
        >
          👹
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#fff',
            fontFamily: 'monospace',
            marginBottom: '12px',
          }}
        >
          Envie de Nicotine
        </div>
        <PixelBar pct={bossHp} color="#ef4444" />
        <div
          style={{
            fontSize: '9px',
            color: 'rgba(239,68,68,0.5)',
            fontFamily: 'monospace',
            marginTop: '4px',
            textAlign: 'right',
          }}
        >
          {bossHp} HP
        </div>
      </Card>

      {/* VS */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>
            <Character days={47} />
          </div>
          <div
            style={{
              fontSize: '14px',
              color: T.textDim,
              fontFamily: 'monospace',
            }}
          >
            VS
          </div>
          <div style={{ fontSize: '40px' }}>👹</div>
        </div>
      </div>

      {state === 'idle' && (
        <div style={{ flex: 1 }}>
          <Label style={{ marginBottom: '12px' }}>Choisis ton attaque</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => attack(a)}
                style={{
                  padding: '13px 16px',
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '20px' }}>{a.icon}</span>
                <span style={{ flex: 1 }}>{a.label}</span>
                <span style={{ fontSize: '10px', color: T.accent }}>
                  +{a.xp}xp
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {state === 'fighting' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              animation: 'float 0.3s ease-in-out infinite',
            }}
          >
            ⚔️
          </div>
          <div
            style={{
              fontSize: '14px',
              color: T.accent,
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
          >
            ATTAQUE EN COURS...
          </div>
        </div>
      )}

      {state === 'victory' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            animation: 'fadeUp 0.4s ease',
          }}
        >
          <div style={{ fontSize: '56px' }}>🏆</div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#fff',
              fontFamily: 'monospace',
            }}
          >
            Envie vaincue !
          </div>
          <div
            style={{
              fontSize: '28px',
              color: T.accent,
              fontFamily: 'monospace',
              fontWeight: '700',
            }}
          >
            +{chosen?.xp} XP
          </div>
          <div
            style={{
              fontSize: '12px',
              color: T.textMuted,
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            envie dure rarement plus de 3 minutes.
            <br />
            Tu as gagné ce combat.
          </div>
          <Btn onClick={reset} style={{ marginTop: '8px' }}>
            Continuer aventure →
          </Btn>
        </div>
      )}
    </div>
  )
}

// ============================================================
// SCREEN — PROFIL
// ============================================================
function Profile() {
  const days = 47
  const stage = 2

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '44px 20px 20px' }}>
      {/* Hero section */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            margin: '0 auto 12px',
            background: `radial-gradient(circle, ${T.accent}22, transparent)`,
            border: `1px solid ${T.accent}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 40px ${T.accent}22`,
          }}
        >
          <Character days={days} />
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#fff',
            fontFamily: 'monospace',
          }}
        >
          Guerrier Lvl.{stage + 1}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: T.textMuted,
            fontFamily: 'monospace',
            marginTop: '4px',
          }}
        >
          Membre depuis 47 jours
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '10px',
          }}
        >
          {['⚔️', '🛡️', '💜'].map((b, i) => (
            <div
              key={i}
              style={{
                width: '28px',
                height: '28px',
                background: `${T.accent}15`,
                border: `1px solid ${T.accent}33`,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Stats détaillées */}
      <Label style={{ marginBottom: '10px' }}>Statistiques du héros</Label>
      <Card style={{ marginBottom: '14px' }}>
        {[
          { label: 'Jours totaux', val: '47j', icon: <Shield s={14} /> },
          { label: 'Argent économisé', val: '352$', icon: <Coin s={14} /> },
          {
            label: 'Cigarettes évitées',
            val: '940',
            icon: <span style={{ fontSize: '12px' }}>🚬</span>,
          },
          { label: 'Vie regagnée', val: '7h 20m', icon: <Heart s={14} /> },
          { label: 'Combats gagnés', val: '23', icon: <Sword s={14} /> },
          { label: 'Meilleur streak', val: '47j', icon: <Star s={14} /> },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 0',
              borderBottom: i < 5 ? `1px solid ${T.border}` : 'none',
            }}
          >
            {s.icon}
            <span
              style={{
                flex: 1,
                fontSize: '12px',
                color: T.textMuted,
                fontFamily: 'monospace',
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontSize: '13px',
                color: '#fff',
                fontFamily: 'monospace',
                fontWeight: '600',
              }}
            >
              {s.val}
            </span>
          </div>
        ))}
      </Card>

      {/* XP progression */}
      <Label style={{ marginBottom: '10px' }}>Progression XP</Label>
      <Card style={{ marginBottom: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: T.textMuted,
              fontFamily: 'monospace',
            }}
          >
            Niveau {stage + 1} → {stage + 2}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: T.accent,
              fontFamily: 'monospace',
            }}
          >
            650 / 1000 XP
          </span>
        </div>
        <PixelBar pct={65} color={T.accent} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '9px',
            color: T.textDim,
            fontFamily: 'monospace',
          }}
        >
          <span>Guerrier</span>
          <span>Maître →</span>
        </div>
      </Card>

      {/* Historique rechutes */}
      <Label style={{ marginBottom: '10px' }}>Historique</Label>
      <Card>
        <div
          style={{
            fontSize: '11px',
            color: T.textMuted,
            fontFamily: 'monospace',
            marginBottom: '10px',
          }}
        >
          Rechutes passées
        </div>
        {[
          { date: 'Il y a 3 semaines', streak: '5j' },
          { date: 'Il y a 6 semaines', streak: '12j' },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: i === 0 ? `1px solid ${T.border}` : 'none',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: T.textDim,
                fontFamily: 'monospace',
              }}
            >
              {r.date}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(239,68,68,0.5)',
                fontFamily: 'monospace',
              }}
            >
              streak: {r.streak}
            </span>
          </div>
        ))}
        <div
          style={{
            fontSize: '10px',
            color: T.accent,
            fontFamily: 'monospace',
            marginTop: '10px',
            textAlign: 'center',
          }}
        >
          Ton meilleur streak : 47 jours 🔥
        </div>
      </Card>
    </div>
  )
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [screen, setScreen] = useState('onboarding')
  const [tab, setTab] = useState('dashboard')

  const showNav = screen !== 'onboarding'

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '32px 16px',
      }}
    >
      <style>{`
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes glow    { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        input { -webkit-appearance: none; }
        button { transition: opacity 0.15s, transform 0.1s; }
        button:active { opacity: 0.75; transform: scale(0.98); }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ width: '375px' }}>
        {/* Phone frame */}
        <div
          style={{
            background: T.bg,
            borderRadius: '44px',
            overflow: 'hidden',
            border: '6px solid #1c1c2e',
            boxShadow: `0 40px 80px rgba(0,0,0,0.9), 0 0 0 1px ${T.accent}22, 0 0 80px ${T.accent}11`,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '780px',
            position: 'relative',
          }}
        >
          {/* Ambient BG */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 50% 0%, rgba(120,0,255,0.18), transparent 55%)`,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(168,85,247,0.015) 0px, transparent 1px, transparent 4px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {screen === 'onboarding' && (
              <Onboarding
                onDone={() => {
                  setScreen('app')
                  setTab('dashboard')
                }}
              />
            )}
            {screen === 'app' && tab === 'dashboard' && <Dashboard />}
            {screen === 'app' && tab === 'combat' && <Combat />}
            {screen === 'app' && tab === 'profile' && <Profile />}
          </div>

          {/* Tab bar */}
          {showNav && <TabBar active={tab} onChange={setTab} />}
        </div>

        {/* Instructions */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontFamily: 'monospace',
          }}
        >
          {screen === 'onboarding' ? (
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '2px',
              }}
            >
              COMPLÈTE ONBOARDING POUR VOIR APP
            </div>
          ) : (
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '2px',
              }}
            >
              NAVIGUE AVEC LA TAB BAR · CLIQUE SUR COMBATTRE
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
