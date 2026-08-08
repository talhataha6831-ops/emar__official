# Pull Request: feature/emar-luxury-ui → main

This is the feature branch containing the secure WhatsApp order endpoints, product experience, QuickView, product pages, Instagram gallery, VIP concierge, accessibility improvements, and performance optimizations for the EMAR luxury storefront.

PR summary:
- Secure server-side endpoints: /api/whatsapp-order and /api/whatsapp-contact (require SUPABASE_SERVICE_ROLE_KEY env var set server-side)
- Client wrappers updated to POST to server endpoints and open wa.me links returned by the server
- Product listing: filters, persistent URL filters, hover-swap crossfade, Framer Motion micro-interactions
- QuickView modal: focus trap, Escape-to-close, variants selection, related products
- Product detail pages: JSON-LD structured data, OpenGraph meta, responsive gallery
- Instagram editorial gallery and Reviews carousel
- VIP Newsletter: insert into newsletter_subscribers with toasts
- Floating VIP Concierge widget: logs intent and opens WA for direct orders and VIP concierge
- Rate limiting: lightweight in-memory per-IP limiter (6 req / 60s) on WhatsApp endpoints

Notes:
- Do NOT commit or expose SUPABASE_SERVICE_ROLE_KEY anywhere. Set it as a server-only secret.
- Required env variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (server), NEXT_PUBLIC_EMAR_WHATSAPP_TARGET, NEXT_PUBLIC_EMAR_VIP_WHATSAPP, NEXT_PUBLIC_SUPPORT_EMAIL

Testing checklist included in PR description.
