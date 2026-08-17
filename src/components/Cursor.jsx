import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(ring.current, 'x', { duration: 0.32, ease: 'power3' })
    const yTo = gsap.quickTo(ring.current, 'y', { duration: 0.32, ease: 'power3' })
    const dxTo = gsap.quickTo(dot.current, 'x', { duration: 0.06, ease: 'power2' })
    const dyTo = gsap.quickTo(dot.current, 'y', { duration: 0.06, ease: 'power2' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      dxTo(e.clientX)
      dyTo(e.clientY)
    }

    const onOver = (e) => {
      const hot = e.target.closest('a, button, [data-hot]')
      ring.current.dataset.hot = hot ? 'true' : 'false'
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" data-hot="false" />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}
