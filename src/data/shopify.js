/**
 * Shopify wiring.
 *
 * Uses cart permalinks rather than the Storefront API: no keys, no backend, and
 * the quantity carries through in the URL — which a Stripe Payment Link cannot
 * do. Shopify hosts the card form, shipping address and tax, so no payment data
 * ever touches this site.
 *
 * ── FILL THESE TWO IN ──────────────────────────────────────────────────────
 * domain    your store domain, no https:// and no trailing slash.
 *           e.g. 'maglev-9k2f.myshopify.com' (a custom domain works too)
 * variantId the numeric VARIANT id of the lamp — not the product id.
 *           Find it at https://<domain>/products/<handle>.json → variants[0].id
 * ───────────────────────────────────────────────────────────────────────────
 */
export const SHOPIFY = {
  domain: 'n1ya6r-qk.myshopify.com',
  // "Maglev Floating Money Lamp" — handle: maglev-floating-money-lamp
  variantId: '55028368965931',
}

export const shopifyReady = () => Boolean(SHOPIFY.domain && SHOPIFY.variantId)

/** straight to checkout with this quantity already in the cart */
export const checkoutUrl = (qty = 1) =>
  `https://${SHOPIFY.domain}/cart/${SHOPIFY.variantId}:${Math.max(1, qty)}`

/** add to the Shopify cart and land on the cart page */
export const addToCartUrl = (qty = 1) =>
  `https://${SHOPIFY.domain}/cart/add?id=${SHOPIFY.variantId}&quantity=${Math.max(1, qty)}`
