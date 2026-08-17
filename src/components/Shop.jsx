import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { GALLERY, PRODUCT } from '../data/media'
import { addToCartUrl, checkoutUrl, shopifyReady } from '../data/shopify'

gsap.registerPlugin(ScrollTrigger)

/**
 * Straight-to-purchase block, directly under the hero.
 *
 * The lead media is the real product capture (vertical 9:16); everything after
 * it is a generated still (landscape or square). They share one stage and are
 * sized with object-contain rather than cover, so no shot gets cropped to fit a
 * frame it was never composed for.
 */
export default function Shop() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(0)

  // clamp rather than index blindly: if the gallery ever shrinks below the
  // selected index, an undefined item would take the whole section down
  const index = Math.min(active, GALLERY.length - 1)
  const item = GALLERY[index]
  const total = (PRODUCT.price * qty).toFixed(2)
  const live = shopifyReady()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-shop-reveal]', {
        y: 34,
        opacity: 0,
        duration: 0.62,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 76%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="buy" ref={root} className="relative border-y border-[var(--edge)] bg-[var(--ink)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-8 py-24 lg:grid-cols-[minmax(0,1fr)_460px]">
        {/* ---------- gallery ---------- */}
        <div data-shop-reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--edge)] bg-[#07060d]">
            {/* neon pool behind whatever is on the stage */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(52% 44% at 50% 52%, rgba(139,59,245,0.26), transparent 72%)',
              }}
            />

            {/* The capture is vertical and the stills are landscape, so they get
                different fits: a centre crop of the clip frames the lamp cleanly
                for its whole run, while cropping the stills would cut the lamp
                out of shots composed around it. */}
            {item.type === 'video' ? (
              <video
                key={item.id}
                className="relative h-full w-full object-cover"
                // 38% rather than centred: the lamp sits high in the vertical
                // frame, so a centre crop cuts the top of the stack when it
                // tilts up (~3.5s) while keeping empty desk below the base
                style={{ objectPosition: '50% 38%' }}
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={item.alt}
              />
            ) : (
              <img
                key={item.id}
                className="relative h-full w-full object-contain"
                src={item.src}
                alt={item.alt}
              />
            )}

            <div className="scan pointer-events-none absolute inset-0 opacity-20" />

            <div className="mono absolute left-5 top-5 border border-[var(--cyan)]/40 bg-[#05040a]/70 px-3 py-1.5 text-[10px] tracking-[0.34em] text-[var(--cyan)]">
              {item.label}
            </div>
            <div className="mono absolute bottom-5 right-5 text-[10px] tracking-[0.3em] text-[var(--dim)]">
              {String(index + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}
            </div>
          </div>

          {/* thumbnails */}
          <div
            className="mt-3 grid gap-3"
            style={{ gridTemplateColumns: `repeat(${GALLERY.length}, minmax(0,1fr))` }}
          >
            {GALLERY.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${g.label}`}
                aria-current={i === index}
                className={`relative aspect-square overflow-hidden border transition-colors duration-200 ${
                  i === index
                    ? 'border-[var(--cyan)]'
                    : 'border-[var(--edge)] hover:border-[var(--bone)]/40'
                }`}
              >
                <img
                  src={g.type === 'video' ? g.poster : g.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
                {g.type === 'video' && (
                  <span className="mono absolute bottom-1 left-1 text-[8px] tracking-[0.2em] text-[var(--bone)]">
                    ▶
                  </span>
                )}
                {i !== index && <span className="absolute inset-0 bg-[#05040a]/45" />}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- buy box ---------- */}
        <div className="lg:pt-2">
          <div
            data-shop-reveal
            className="mono mb-5 flex items-center gap-3 text-[10px] tracking-[0.42em] text-[var(--cyan)]"
          >
            <span className="inline-block h-px w-10 bg-[var(--cyan)]" />
            IN STOCK
          </div>

          <h2 data-shop-reveal className="display mb-4 text-[clamp(34px,3.4vw,54px)] text-[var(--bone)]">
            FLOATING MONEY LAMP
          </h2>

          <div data-shop-reveal className="mb-7 flex items-baseline gap-3">
            <span className="display text-[clamp(40px,4.2vw,64px)] neon-text">
              {PRODUCT.currencySymbol}
              {PRODUCT.price}
            </span>
            <span className="mono text-[11px] tracking-[0.3em] text-[var(--dim)]">
              {PRODUCT.currency} · GST INCL.
            </span>
          </div>

          <ul data-shop-reveal className="mb-8 space-y-2.5 border-y border-[var(--edge)] py-6">
            {PRODUCT.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[16px] leading-snug text-[var(--dim)]">
                <span className="mt-[7px] h-1 w-1 shrink-0 bg-[var(--cyan)]" />
                {b}
              </li>
            ))}
          </ul>

          {/* quantity */}
          <div data-shop-reveal className="mb-5 flex items-center gap-5">
            <span className="mono text-[10px] tracking-[0.34em] text-[var(--dim)]">QTY</span>
            <div className="flex items-center border border-[var(--edge)]">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="px-4 py-2.5 text-[var(--dim)] transition-colors hover:text-[var(--cyan)]"
              >
                −
              </button>
              <span className="mono w-10 text-center text-[13px] text-[var(--bone)]">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="px-4 py-2.5 text-[var(--dim)] transition-colors hover:text-[var(--cyan)]"
              >
                +
              </button>
            </div>
            <span className="mono text-[11px] tracking-[0.24em] text-[var(--dim)]">
              {PRODUCT.currencySymbol}
              {total} TOTAL
            </span>
          </div>

          {/* Once Shopify is configured these become real links carrying the
              chosen quantity. Until then they keep the local-only behaviour
              rather than sending anyone to a broken URL. */}
          <div data-shop-reveal className="flex flex-col gap-3">
            <motion.a
              href={live ? addToCartUrl(qty) : undefined}
              role={live ? undefined : 'button'}
              tabIndex={0}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 520, damping: 22 }}
              onClick={live ? undefined : () => setAdded((n) => n + qty)}
              className="btn-neon mono block w-full cursor-pointer border border-[var(--bone)]/35 bg-[var(--bone)]/[0.04] px-8 py-5 text-center text-[11px] tracking-[0.32em] text-[var(--bone)]"
            >
              ADD TO CART — {PRODUCT.currencySymbol}
              {total}
            </motion.a>

            <motion.a
              href={live ? checkoutUrl(qty) : undefined}
              role={live ? undefined : 'button'}
              tabIndex={0}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 520, damping: 22 }}
              className="mono block w-full cursor-pointer bg-[var(--pink)] px-8 py-5 text-center text-[11px] tracking-[0.32em] text-[#0a0208]"
              style={{ boxShadow: '0 0 26px rgba(255,45,148,0.35)' }}
            >
              BUY NOW
            </motion.a>

            <div
              className="mono h-4 text-[10px] tracking-[0.28em] text-[var(--cyan)]"
              role="status"
              aria-live="polite"
            >
              {!live && added > 0 && `${added} IN CART`}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
