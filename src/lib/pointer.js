import { useEffect, useRef, useState } from 'react'

/**
 * Normalised pointer position, -1..1 on both axes, measured from the centre of
 * the viewport. Smoothed so hero parallax never jitters.
 */
export function usePointer(smoothing = 0.09) {
  const target = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove)

    let frame
    let cur = { x: 0, y: 0 }
    const tick = () => {
      cur = {
        x: cur.x + (target.current.x - cur.x) * smoothing,
        y: cur.y + (target.current.y - cur.y) * smoothing,
      }
      setPos({ x: cur.x, y: cur.y })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [smoothing])

  return pos
}
