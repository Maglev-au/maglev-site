import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQS, POLICIES } from '../data/policies'

gsap.registerPlugin(ScrollTrigger)

/**
 * Questions and the three policies, as accordions.
 *
 * Native <details>/<summary> rather than hand-rolled state: it stays keyboard
 * accessible and works with in-page search (Cmd-F expands the match) for free.
 */
function Row({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <details
      data-faq-row
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="group border-b border-[var(--edge)]"
    >
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-[17px] leading-snug text-[var(--bone)] md:text-[19px]">{q}</span>
        <span
          aria-hidden="true"
          className={`mono shrink-0 text-[14px] text-[var(--cyan)] transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </summary>
      <div className="max-w-[680px] pb-6 text-[15px] leading-[1.55] text-[var(--dim)] md:text-[16px]">
        {a}
      </div>
    </details>
  )
}

export default function Faq() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-faq-reveal]', {
        y: 26,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="faq"
      ref={root}
      className="relative border-t border-[var(--edge)] bg-[var(--ink)] py-20 md:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div data-faq-reveal className="lg:col-span-4">
          <div className="mono mb-5 flex items-center gap-4 text-[10px] tracking-[0.42em] text-[var(--cyan)]">
            <span className="inline-block h-px w-10 bg-[var(--cyan)]" />
            QUESTIONS
          </div>
          <h2 className="display text-[clamp(38px,5vw,80px)] text-[var(--bone)]">
            BEFORE YOU
            <br />
            <span className="cyan-text">ASK.</span>
          </h2>
          <p className="mt-6 max-w-[380px] text-[15px] leading-[1.5] text-[var(--dim)] md:text-[16px]">
            Everything people want to know before they buy one, and the fine print underneath it.
          </p>
        </div>

        <div data-faq-reveal className="lg:col-span-8">
          <div className="border-t border-[var(--edge)]">
            {FAQS.map((f, i) => (
              <Row key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>

          <div className="mono mb-4 mt-14 text-[10px] tracking-[0.42em] text-[var(--pink)]">
            THE FINE PRINT
          </div>
          <div className="border-t border-[var(--edge)]">
            {POLICIES.map((p) => (
              <Row
                key={p.id}
                q={p.title}
                a={
                  <div className="space-y-3">
                    {p.body.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
