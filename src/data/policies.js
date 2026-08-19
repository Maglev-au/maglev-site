// FAQ and policy copy. Kept as data so the section stays a dumb renderer.

export const FAQS = [
  {
    q: 'How does it actually float?',
    a: 'An opposing array of N52 neodymium magnets in the base pushes against a magnet plate inside the stack. A hall-sensor ring reads the position a thousand times a second and corrects it, which is why it sits still instead of drifting off. Nothing touches it.',
  },
  {
    q: 'Does it spin?',
    a: 'Yes — 5 rpm, about one full turn every twelve seconds. You can switch the rotation off and leave it parked if you would rather it sat still.',
  },
  {
    q: 'Is it noisy?',
    a: 'No. There is no fan and no bearing, so there is nothing to make a sound. It draws about 4W, less than the lamp already on your desk.',
  },
  {
    q: 'Is the cash real?',
    a: 'No. The stack is printed prop currency around a machined aluminium core. It is not legal tender and cannot be spent — it is a lamp.',
  },
  {
    q: 'What is in the box?',
    a: 'The base, the stack, a 1.8m USB-C cable and a spare paper band. It runs off a 12V 2A supply — the same brick most monitors use.',
  },
  {
    q: 'How much weight will it hold?',
    a: 'The array is rated to 500g and the stack is 480g. That 20g of headroom is why it does not drop when you close a drawer nearby.',
  },
]

export const POLICIES = [
  {
    id: 'shipping',
    title: 'SHIPPING',
    body: [
      'Drop 001 is a pre-order. Orders placed now ship in September–October 2026. You are charged at checkout and we email you the moment your unit leaves.',
      'Shipping options and costs are calculated at checkout based on your address. We ship Australia-wide and internationally.',
      'If your order has not shipped you can cancel it for a full refund — just contact us.',
    ],
  },
  {
    id: 'returns',
    title: 'RETURNS',
    body: [
      'If your lamp arrives damaged or faulty, contact us and we will replace it or refund you in full, including return postage.',
      'Nothing here limits your rights under Australian Consumer Law.',
    ],
  },
  {
    id: 'privacy',
    title: 'PRIVACY',
    body: [
      'We collect only what is needed to fulfil your order: your name, email, shipping address and order details.',
      'Payments are processed by Shopify. Your card details are entered on Shopify’s systems and never touch this website or our servers — we never see or store them.',
      'We do not sell your information, and we do not share it with anyone except the parties needed to get your order to you, such as Shopify and the carrier.',
      'Want your details removed? Contact us and we will delete them, except where we are legally required to keep order records.',
    ],
  },
]
