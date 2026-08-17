import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FIGURES = [
  { value: 500, suffix: 'G', label: 'HELD IN THE AIR', note: 'Rated lift. The stack weighs 480.' },
  { value: 6, suffix: 'MM', label: 'OF NOTHING', note: 'Measured base face to bill edge.' },
  { value: 5, suffix: 'RPM', label: 'IF YOU WANT IT', note: 'One turn every twelve seconds.' },
  { value: 1000, suffix: 'HZ', label: 'CORRECTION RATE', note: 'A thousand saves a second.' },
]

export default function Figures() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-fig]').forEach((el, i) => {
        const num = el.querySelector('[data-num]')
        const target = Number(num.dataset.num)
        const counter = { v: 0 }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 34 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', delay: i * 0.06 }
            )
            gsap.to(counter, {
              v: target,
              duration: 1.05,
              ease: 'expo.out',
              delay: i * 0.06,
              onUpdate: () => {
                num.textContent = Math.round(counter.v).toLocaleString('en-US')
              },
            })
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative border-y border-[var(--edge)] bg-[var(--ink-2)]">
      <div className="diag-grid-dense pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-[var(--edge)] md:grid-cols-4">
        {FIGURES.map((f) => (
          <div key={f.label} data-fig className="bg-[var(--ink-2)] px-5 py-9 md:px-8 md:py-14">
            <div className="display flex items-baseline text-[clamp(34px,4.6vw,72px)] text-[var(--bone)]">
              <span data-num={f.value}>0</span>
              <span className="cyan-text ml-1">{f.suffix}</span>
            </div>
            <div className="mono mt-4 text-[10px] tracking-[0.3em] text-[var(--pink)]">
              {f.label}
            </div>
            <div className="mt-2 text-[15px] leading-tight text-[var(--dim)]">{f.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
