// Every asset here was generated with the Higgsfield MCP for this drop.
// Higgsfield job ids kept alongside so the source generation is traceable.

export const MEDIA = {
  // the hero still — supplied, not generated
  heroStill: { src: '/media/hero-still.jpg' },
  gap: { src: '/media/gap.jpg', job: '5f1ec189-f3ab-4283-a3e0-14b365f55ce9' },
  desk: { src: '/media/desk.jpg', job: '313c0a7a-1a64-4051-a96c-6d41711fd764' },
  night: { src: '/media/night.jpg', job: 'c607874e-1a12-407a-a76a-43b709105d2e' },
  unbox: { src: '/media/unbox.jpg', job: 'b0fb081f-b5b5-4576-a89d-cc84b12e80b5' },
  ring: { src: '/media/ring.jpg', job: '1f07dc19-127d-4f54-9daa-ccd031ebb5c0' },
  arc: { src: '/media/arc.jpg', job: 'caf8f8c1-ca5a-48ef-83d4-40179dffc7ef' },
  cutout: { src: '/media/product-cutout.png', job: '23051f8b-fe9d-43c0-aa1a-5c5ec8f55e8e' },
  exploded: { src: '/media/exploded.png', job: '986925b1-fc8d-4de0-a817-56c56df82be2' },
  logo: { src: '/media/logo.png' },
  // the drop sequence, cropped to 4:3 for the gallery stage
  reveal: { src: '/media/reveal.mp4', poster: '/media/reveal-poster.jpg' },
  // photograph of an actual unit, trimmed in around the product
  unit: { src: '/media/unit.jpg' },
  // the real product capture, not a generation
  product: { src: '/media/product.mp4', poster: '/media/product-poster.jpg' },
}

// Shop gallery, in order. The real product capture leads; the rest are the
// generated stills. `fit` differs because the capture is vertical 9:16 and the
// stills are landscape — contain keeps every one uncropped on a shared stage.
export const GALLERY = [
  { id: 'reveal', type: 'video', src: MEDIA.reveal.src, poster: MEDIA.reveal.poster, alt: 'MAGLEV cash stack levitating against a neon skyline', label: 'THE DROP' },
  { id: 'clip', type: 'video', src: MEDIA.product.src, poster: MEDIA.product.poster, alt: 'MAGLEV lamp levitating on a desk', label: 'IN MOTION' },
  { id: 'unit', type: 'image', src: MEDIA.unit.src, alt: 'The MAGLEV cash stack resting on its base', label: 'THE UNIT' },
  { id: 'desk', type: 'image', src: MEDIA.desk.src, alt: 'MAGLEV lamp on a gaming desk beside a monitor and keyboard', label: 'ON THE DESK' },
  { id: 'night', type: 'image', src: MEDIA.night.src, alt: 'The lamp glowing as the only light source in a dark room', label: 'NIGHT MODE' },
  { id: 'unbox', type: 'image', src: MEDIA.unbox.src, alt: 'The lamp packed in its foam-cut box', label: 'IN THE BOX' },
]

export const PRODUCT = {
  name: 'MAGLEV — FLOATING CASH STACK',
  sku: 'MGLV-001',
  price: 119.99,
  currency: 'AUD',
  currencySymbol: 'A$',
  inStock: 500,
  bullets: [
    'Holds 500g at a 6mm gap — no wires, no contact.',
    'Spins at 5 rpm, or sits dead still. Your call.',
    'USB-C, 12V 2A. Runs off the same brick as your monitor.',
    'Matte-black hexagonal base, 118mm across, 480g stack.',
  ],
}
