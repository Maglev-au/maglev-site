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
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={MEDIA.logo.src} alt="MAGLEV" className="h-[18px] w-auto" />
        </a>

        <nav className="mono flex items-center gap-9 text-[10px] tracking-[0.28em] text-[var(--dim)]">
          {[
            ['DETAIL', '#detail'],
            ['SPEC', '#spec'],
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
          className="btn-neon mono border border-[var(--pink)] px-5 py-2 text-[10px] tracking-[0.28em] text-[var(--bone)]"
        >
          DROP 001 — {PRODUCT.currencySymbol}
          {PRODUCT.price}
        </a>
      </div>
    </motion.header>
  )
}
