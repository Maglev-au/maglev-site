import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MEDIA } from '../data/media'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
  ['LIFT', '500 g rated · 480 g stack'],
  ['GAP', '6 mm, base face to bill edge'],
  ['CORRECTION', '1,000 Hz hall-sensor ring'],
  ['ROTATION', '5 rpm · switchable off'],
  ['BASE', '118 mm across flats · 32 mm tall'],
  ['STACK', '148 × 66 × 52 mm · aluminium core'],
  ['MAGNETS', 'N52 neodymium, opposing array'],
  ['LIGHT', '2700 K · 90 CRI · 12 hr continuous'],
  ['POWER', '12 V / 2 A barrel · 4 W draw'],
  ['NOISE', 'none — no fan, no bearing'],
  ['IN THE BOX', 'base · stack · 1.8 m cable · spare band'],
]

export default function Specs() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-row]', {
        opacity: 0,
        x: -26,
        duration: 0.42,
        ease: 'back.out(1.6)',
        stagger: 0.035,
        scrollTrigger: { trigger: '[data-spec-table]', start: 'top 82%', once: true },
      })

      gsap.from('[data-exploded]', {
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-exploded]', start: 'top 85%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="spec"
      ref={root}
      className="relative border-y border-[var(--edge)] bg-[var(--ink-2)] py-20 md:py-36"
    >

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="mono mb-5 flex items-center gap-4 text-[10px] tracking-[0.42em] text-[var(--cyan)]">
            <span className="inline-block h-px w-14 bg-[var(--cyan)]" />
            SPEC SHEET
          </div>
          <h2 className="display mb-8 text-[clamp(42px,5vw,80px)] text-[var(--bone)]">
            THE WHOLE
            <br />
            <span className="cyan-text">MACHINE.</span>
          </h2>

          <img
            data-exploded
            src={MEDIA.exploded.src}
            alt="Exploded view: magnet plate, sensor ring, coil, board, base shell"
            className="w-full max-w-[420px]"
          />
          <div className="mono mt-4 text-[10px] leading-relaxed tracking-[0.24em] text-[var(--dim)]">
            TOP TO BOTTOM · STACK / MAGNET PLATE / SENSOR RING / COIL / BOARD / SHELL
          </div>
        </div>

        <div className="lg:col-span-7">
          <div data-spec-table className="border-t border-[var(--edge)]">
            {SPECS.map(([k, v]) => (
              <div
                key={k}
                data-row
                className="group flex flex-col gap-1 border-b border-[var(--edge)] py-4 transition-colors duration-200 hover:bg-[var(--bone)]/[0.02] md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-5"
              >
                <div className="mono shrink-0 text-[10px] tracking-[0.3em] text-[var(--pink)] md:w-[190px]">
                  {k}
                </div>
                <div className="flex-1 text-[17px] text-[var(--bone)] md:text-[19px]">{v}</div>
                <div className="mono text-[10px] tracking-[0.3em] text-[var(--bone)]/0 transition-colors duration-200 group-hover:text-[var(--cyan)]">
                  ·
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[520px] text-[17px] leading-[1.45] text-[var(--dim)]">
            It draws less than the lamp on your desk already does and it makes no sound doing it.
            The only thing that ever moves is the money.
          </p>
        </div>
      </div>
    </section>
  )
}
