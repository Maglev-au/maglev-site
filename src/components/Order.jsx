import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MEDIA, PRODUCT } from '../data/media'
import { checkoutUrl, shopifyReady } from '../data/shopify'

gsap.registerPlugin(ScrollTrigger)

export default function Order() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-order-type] > *', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
      })

      gsap.from('[data-order-cut]', {
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="order" ref={root} className="grain relative overflow-hidden bg-[var(--ink)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(52% 48% at 68% 42%, rgba(255,45,148,0.18), transparent 68%), radial-gradient(40% 40% at 22% 66%, rgba(34,230,224,0.14), transparent 70%)',
        }}
      />
      <div className="diag-grid-dense pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-10 px-8 pt-32 pb-24">
        <div data-order-type className="col-span-6">
          <div className="mono mb-6 flex items-center gap-4 text-[10px] tracking-[0.42em] text-[var(--cyan)]">
            <span className="inline-block h-px w-14 bg-[var(--cyan)]" />
            DROP 001 · 500 UNITS · NO RESTOCK
          </div>

          <h2 className="display text-[clamp(52px,7.4vw,116px)] text-[var(--bone)]">
            TAKE ONE
            <br />
            {/* broken deliberately — left to wrap it orphans "LATE." on its own line */}
            <span className="neon-text">
              BEFORE IT’S
              <br />
              TOO LATE.
            </span>
          </h2>

          <div className="mt-10 flex items-end gap-6">
            <div className="display text-[76px] text-[var(--bone)]">
              {PRODUCT.currencySymbol}
              {PRODUCT.price}
            </div>
          </div>

          <div className="mt-9 flex items-center gap-3">
            {shopifyReady() ? (
              <a
                href={checkoutUrl(1)}
                className="btn-neon mono border border-[var(--pink)] px-12 py-5 text-[12px] tracking-[0.3em] text-[var(--bone)]"
              >
                ADD TO CART
              </a>
            ) : (
              <button className="btn-neon mono border border-[var(--pink)] px-12 py-5 text-[12px] tracking-[0.3em] text-[var(--bone)]">
                ADD TO CART
              </button>
            )}
            <button className="mono border border-[var(--edge)] px-9 py-5 text-[12px] tracking-[0.3em] text-[var(--dim)] transition-colors duration-200 hover:border-[var(--cyan)] hover:text-[var(--cyan)]">
              NOTIFY ME
            </button>
          </div>

          <div className="mono mt-8 text-[11px] tracking-[0.24em] text-[var(--dim)]">
            412 OF 500 REMAINING
          </div>
        </div>

        <div data-order-cut className="col-span-6">
          <img
            src={MEDIA.cutout.src}
            alt="MAGLEV lamp, isolated"
            className="mx-auto w-full max-w-[560px]"
            style={{ filter: 'drop-shadow(0 34px 70px rgba(34,230,224,0.24))' }}
          />
        </div>
      </div>

      <footer className="relative border-t border-[var(--edge)]">
        <div className="mx-auto max-w-[1440px] px-8 py-12">
          <div className="flex items-end justify-between gap-10">
            <img src={MEDIA.logo.src} alt="MAGLEV" className="h-7 w-auto" />
            <div className="mono flex gap-12 text-[10px] tracking-[0.28em] text-[var(--dim)]">
              <div>
                <div className="mb-3 text-[var(--bone)]">CONTACT</div>
                <div className="leading-relaxed">
                  HELLO@MAGLEV.STUDIO
                  <br />
                  MIAMI, FL
                </div>
              </div>
            </div>
          </div>

          <div className="rule my-10" />

          <div className="mono flex justify-between text-[10px] tracking-[0.28em] text-[var(--dim)]">
            <span>© 2026 MAGLEV</span>
            <span>NOT LEGAL TENDER. OBVIOUSLY.</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
