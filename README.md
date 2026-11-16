# CARTEL — Official Streetwear Store

A fresh, responsive React + Vite storefront for CARTEL, styled in black, charcoal and chrome with a premium editorial streetwear direction.

## Run locally
Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

The build command intentionally uses `vite build` and does not run `tsc -b`, so a missing TypeScript project config cannot block deployment. This is a JavaScript React project.

## Deploy to Vercel
1. Upload the contents of this folder to your GitHub repository.
2. In Vercel, import the repository.
3. Set **Root Directory** to the folder containing this `package.json` (or leave it as `.` if these files are at repository root).
4. Framework preset: Vite.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy.

## Store behaviour
- Product category filters
- Add-to-bag and quantity controls
- Responsive mobile navigation
- Demo cash-on-delivery checkout
- Demo orders are saved only in the visitor's browser local storage

## Before accepting real orders
This is a front-end demo starter. The checkout does not send orders to you and no online payment is configured. Connect Supabase, configure secure server-side order validation, delivery rules, privacy/returns information and a real contact/WhatsApp number before selling. Product imagery is illustrative and should be replaced with your own accurate product photos.

## Optional Supabase environment
Copy `.env.example` to `.env` and add your Supabase project URL and anon key when the backend integration is implemented. Never expose a service-role key in frontend code.
