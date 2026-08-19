import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MEDIA } from '../data/media'
import { CONTACT } from '../data/policies'
import { timeUntilLaunch } from '../data/launch'

const UNITS = [
  ['days', 'DAYS'],
  ['hours', 'HRS'],
  ['minutes', 'MIN'],
  ['seconds', 'SEC'],
]

export default function Launch({ onLaunched }) {
  const [t, setT] = useState(() => timeUntilLaunch())

  useEffect(() => {
    const id = setInterval(() => {
      const next = timeUntilLaunch()
      setT(next)
      // flip to the store the moment it hits zero, without a reload
      if (next.done) onLaunched?.()
    }, 1000)
    return () => clearInterval(id)
  }, [onLaunched])

  return (
    <main className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      <img
        src={MEDIA.heroStill.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#05040a]/78" />
      <div className="scan pointer-events-none absolute inset-0 opacity-25" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <img src={MEDIA.logo.src} alt="MAGLEV" className="h-6 w-auto md:h-8" />

        <div className="mono mt-8 flex items-center gap-3 text-[9px] tracking-[0.32em] text-[var(--cyan)] md:text-[10px] md:tracking-[0.42em]">
          <span className="inline-block h-px w-8 bg-[var(--cyan)] md:w-14" />
          DROP 001 · ONLY 500 AVAILABLE
        </div>

        <h1 className="display mt-5 text-[clamp(38px,9vw,120px)] leading-[0.85]">
          <span className="block text-[var(--bone)]">FLOATING</span>
          <span className="neon-text block">CASH STACK</span>
        </h1>

        <p className="mt-6 max-w-[440px] text-[15px] leading-[1.5] text-[var(--dim)] md:text-[17px]">
          A 480-gram stack of cash, held 6mm off a matte-black base. No wires, no contact.
          Drops 27 August.
        </p>

        {/* countdown */}
        <div className="mt-10 flex items-start gap-4 md:gap-8" role="timer" aria-live="off">
          {UNITS.map(([key, label]) => (
            <div key={key} className="flex min-w-[58px] flex-col items-center md:min-w-[92px]">
              <div className="display text-[clamp(34px,6.5vw,78px)] leading-none text-[var(--bone)]">
                {String(t[key]).padStart(2, '0')}
              </div>
              <div className="mono mt-2 text-[9px] tracking-[0.3em] text-[var(--pink)] md:text-[10px]">
                {label}
              </div>
            </div>
          ))}
        </div>

        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('MAGLEV Drop 001 — notify me')}`}
          className="btn-neon mono mt-12 border border-[var(--bone)]/30 bg-[var(--bone)]/[0.03] px-9 py-4 text-[11px] tracking-[0.3em] text-[var(--bone)]"
        >
          NOTIFY ME
        </a>

        <div className="mono mt-10 text-[10px] tracking-[0.28em] text-[var(--dim)]">
          {CONTACT.email.toUpperCase()}
        </div>
      </motion.div>
    </main>
  )
}
