# MAGLEV — drop site

Storefront for the MAGLEV floating money lamp. Checkout is handled by Shopify;
this site is the shopfront.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output lands in `dist/`.

## Deploying (Cloudflare Pages)

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 or newer |

No environment variables are needed — there are no secrets in this app.

## Shopify

Checkout runs on Shopify via cart permalinks, configured in
[`src/data/shopify.js`](src/data/shopify.js). Two values drive it: the store
domain and the product's **variant** id. No API keys are involved, so nothing
sensitive ships to the browser.

`BUY NOW` goes straight to checkout with the chosen quantity
(`/cart/<variant>:<qty>`); `ADD TO CART` adds and lands on the Shopify cart.

If either config value is blank the buttons render without an `href` rather than
linking somewhere broken, and the local-only cart counter stands in.

**Price is defined in two places** — `PRODUCT.price` in
[`src/data/media.js`](src/data/media.js) and the product in Shopify. Change one
and you must change the other, or the page and the checkout will disagree.

## Media

Everything under `public/media/` is committed deliberately: the site is a static
build with no CDN or asset pipeline behind it. The hero film is the largest file
at ~8.4MB.
