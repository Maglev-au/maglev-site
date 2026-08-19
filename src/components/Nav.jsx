import { motion } from 'framer-motion'
import { MEDIA, PRODUCT } from '../data/media'

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 1.2, 0.3, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--edge)] bg-[#05040a]/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <img src={MEDIA.logo.src} alt="MAGLEV" className="h-[16px] w-auto md:h-[18px]" />
        </a>

        {/* anchors are the first thing to go on a narrow bar — the buy CTA matters more */}
        <nav className="mono hidden items-center gap-9 text-[10px] tracking-[0.28em] text-[var(--dim)] md:flex">
          {[
            ['SPEC', '#spec'],
            ['DETAIL', '#detail'],
            ['FAQ', '#faq'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition-colors duration-200 hover:text-[var(--cyan)]"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#buy"
          className="btn-neon mono shrink-0 whitespace-nowrap border border-[var(--pink)] px-3 py-2 text-[9px] tracking-[0.2em] text-[var(--bone)] md:px-5 md:text-[10px] md:tracking-[0.28em]"
        >
          <span className="hidden md:inline">DROP 001 — </span>
          {PRODUCT.currencySymbol}
          {PRODUCT.price}
        </a>
      </div>
    </motion.header>
  )
}
