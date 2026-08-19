import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MEDIA } from '../data/media'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  // spans are rebalanced so each row still fills the 12-col grid: 7+5, 8+4, 6+6
  { src: MEDIA.desk.src, kicker: 'ON THE DESK', title: 'IT OWNS THE ROOM AT 118MM.', span: 'md:col-span-7', ratio: 'aspect-16/9' },
  { src: MEDIA.arc.src, kicker: 'THE GAP', title: 'CYAN, 6MM WIDE, ALWAYS ON.', span: 'md:col-span-5', ratio: 'aspect-16/9' },
  { src: MEDIA.night.src, kicker: 'LIGHTS OUT', title: 'THE ONLY THING STILL ON.', span: 'md:col-span-8', ratio: 'aspect-16/9' },
  { src: MEDIA.ring.src, kicker: 'THE CHAMFER', title: 'BRUSHED STEEL, NOT PAINT.', span: 'md:col-span-4', ratio: 'aspect-16/9' },
  { src: MEDIA.unbox.src, kicker: 'IN THE BOX', title: 'FOUR CUTOUTS. NO FILLER.', span: 'md:col-span-6', ratio: 'aspect-4/5' },
  { src: MEDIA.gap.src, kicker: 'UNDERSIDE', title: 'NOTHING GOES IN. NOTHING HOLDS IT.', span: 'md:col-span-6', ratio: 'aspect-4/5' },
]

function TiltCard({ card }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 13}deg) rotateX(${-py * 13}deg) translateZ(14px)`
  }

  const onLeave = () => {
    ref.current.style.transform =
      'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <div data-card-wrap className={card.span}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-hot
        className="tilt group relative overflow-hidden border border-[var(--edge)] hover:border-[var(--cyan)]/45"
      >
        <div className={`relative w-full overflow-hidden ${card.ratio}`}>
          <img
            src={card.src}
            alt={card.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05040a] via-transparent to-transparent opacity-85" />
          <div className="scan pointer-events-none absolute inset-0 opacity-20" />
        </div>

        <div className="tilt-inner pointer-events-none absolute inset-x-0 bottom-0 p-7">
          <div className="mono mb-2 text-[10px] tracking-[0.34em] text-[var(--cyan)]">
            {card.kicker}
          </div>
          <div className="display text-[clamp(20px,1.7vw,30px)] text-[var(--bone)]">
            {card.title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-card-wrap]').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 56,
          duration: 0.55,
          ease: 'back.out(1.4)',
          delay: (i % 2) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="detail" ref={root} className="relative bg-[var(--ink)] py-20 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="mb-10 flex flex-col items-start gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono mb-5 flex items-center gap-4 text-[10px] tracking-[0.42em] text-[var(--pink)]">
              <span className="inline-block h-px w-14 bg-[var(--pink)]" />
              DETAIL
            </div>
            <h2 className="display text-[clamp(42px,5.4vw,86px)] text-[var(--bone)]">
              LOOK CLOSER.
              <br />
              <span className="cyan-text">IT GETS BETTER.</span>
            </h2>
          </div>
          <p className="max-w-[350px] pb-3 text-[17px] leading-[1.45] text-[var(--dim)]">
            Every surface was shot for this drop. No renders borrowed from the deck, no stock desk,
            no lifestyle model holding it at an angle that hides the seam.
          </p>
        </div>

        {/* one card per row on mobile; the 12-col mosaic only kicks in at md,
            which is why the card spans are md:-prefixed */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {CARDS.map((c) => (
            <TiltCard key={c.src + c.kicker} card={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
