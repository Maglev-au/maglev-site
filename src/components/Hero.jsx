import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePointer } from '../lib/pointer'
import { MEDIA, PRODUCT } from '../data/media'

export default function Hero() {
  const root = useRef(null)
  const pointer = usePointer(0.075)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from('[data-h-line] > span', {
        yPercent: 118,
        duration: 0.82,
        stagger: 0.07,
      })
        .from('[data-h-eyebrow]', { opacity: 0, x: -22, duration: 0.5 }, 0.1)
        .from('[data-h-plate]', { scale: 1.09, opacity: 0, duration: 1.1 }, 0.05)
        .from('[data-h-meta] > *', { opacity: 0, y: 18, duration: 0.5, stagger: 0.06 }, 0.5)
        .from('[data-h-cta] > *', { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, 0.6)

      gsap.to('[data-h-plate]', {
        yPercent: 13,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  // pointer parallax — type and footage move against each other
  const plateStyle = {
    transform: `translate3d(${pointer.x * -18}px, ${pointer.y * -12}px, 0) scale(1.06)`,
  }
  const typeStyle = {
    transform: `translate3d(${pointer.x * 10}px, ${pointer.y * 7}px, 0)`,
  }

  return (
    <section
      id="top"
      ref={root}
      className="grain relative h-screen min-h-[760px] w-full overflow-hidden"
    >
      {/* the hero still, full-bleed behind the type */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          data-h-plate
          className="h-full w-full object-cover"
          style={plateStyle}
          src={MEDIA.heroStill.src}
          alt="MAGLEV floating cash stack on a neon-lit gaming desk"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05040a] via-[#05040a]/10 to-[#05040a]/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05040a]/95 via-transparent to-[#05040a]/55" />
      </div>

      <div className="scan pointer-events-none absolute inset-0 opacity-30" />

      {/* type */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-12 md:px-8 md:pb-16">
        <div style={typeStyle}>
          <div
            data-h-eyebrow
            className="mono mb-4 flex items-center gap-3 whitespace-nowrap text-[8px] tracking-[0.2em] text-[var(--cyan)] md:mb-6 md:gap-4 md:text-[10px] md:tracking-[0.42em]"
          >
            <span className="inline-block h-px w-8 shrink-0 bg-[var(--cyan)] md:w-14" />
            DROP 001 · ONLY 500 AVAILABLE
          </div>

          {/* The display face sits at line-height 0.82em, so its glyph box is
              taller than the line box and `overflow-hidden` — which masks the
              slide-up reveal — was clipping the caps. Pad the mask out past the
              glyphs and pull it back with an equal negative margin, so nothing
              is cut and the tight leading is unchanged. */}
          {/* flex column so the two wrappers' negative margins sum instead of
              collapsing to one — otherwise the padding above loosens the leading */}
          {/* 8.8vw floors at 30px, not 52px — "FLOATING MONEY LAMP" is 19
              characters and overflowed a 375px screen at the old minimum */}
          <h1 className="display flex flex-col text-[clamp(30px,8.8vw,132px)]">
            <div data-h-line className="-my-[0.18em] overflow-hidden py-[0.18em]">
              {/* the wordmark stands in for the first line — sized to the line
                  box so the leading matches the type below it */}
              <span className="block">
                <img
                  src={MEDIA.logo.src}
                  alt="MAGLEV"
                  className="block h-[0.82em] w-auto"
                />
              </span>
            </div>
            <div data-h-line className="-my-[0.18em] overflow-hidden py-[0.18em]">
              <span className="neon-text block">FLOATING CASH STACK</span>
            </div>
          </h1>

          <div className="mt-7 flex flex-col items-start gap-7 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-16">
            <p
              data-h-meta
              className="max-w-[430px] text-[15px] leading-[1.45] text-[var(--dim)] md:text-[17px]"
            >
              <span className="block text-[var(--bone)]">
                A 480-gram stack of MAGLEV cash, held 6mm off a matte-black base.
              </span>
              <span className="block">
                Nothing runs into it. Nothing holds it up. An opposing N52 array corrects its
                position a thousand times a second, and you see none of that — you just see money
                sitting in the air, lit from inside.
              </span>
            </p>

            <div data-h-cta className="flex flex-wrap items-center gap-3">
              <a
                href="#buy"
                className="btn-neon mono border border-[var(--bone)]/30 bg-[var(--bone)]/[0.03] px-8 py-4 text-[11px] tracking-[0.3em] text-[var(--bone)]"
              >
                TAKE ONE — {PRODUCT.currencySymbol}
                {PRODUCT.price}
              </a>
              <a
                href="#spec"
                className="mono border border-[var(--edge)] px-8 py-4 text-[11px] tracking-[0.3em] text-[var(--dim)] transition-colors duration-200 hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
              >
                FULL SPEC
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mono absolute bottom-6 right-8 z-10 text-[10px] tracking-[0.3em] text-[var(--dim)]">
        SCROLL
      </div>
    </section>
  )
}
