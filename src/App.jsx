import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './lib/useLenis'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Figures from './components/Figures'
import Gallery from './components/Gallery'
import Specs from './components/Specs'
import Faq from './components/Faq'
import Order from './components/Order'
import Launch from './components/Launch'
import { isLaunched } from './data/launch'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [launched, setLaunched] = useState(() => isLaunched())

  useLenis(launched)

  useEffect(() => {
    if (import.meta.env.DEV) {
      window.__gsap = gsap
      window.__ScrollTrigger = ScrollTrigger
    }

    // pinned sections settle only once the plates have laid out
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 400)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  if (!launched) return <Launch onLaunched={() => setLaunched(true)} />

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Shop />
        <Figures />
        <Specs />
        <Gallery />
        <Faq />
        <Order />
      </main>
    </>
  )
}
