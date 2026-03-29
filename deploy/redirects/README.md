Redirect rule files for common hosts.

Files included:
- `_redirects` — Netlify format; place in `public/` root for Netlify to apply.
- `vercel.json` — Vercel redirects; place at repo root for Vercel deployments.
- `.htaccess` — Apache rules; place in site root on Apache host.
- `nginx-rewrites.conf` — Nginx snippet; include inside `server {}`.
- `cloudflare-worker-redirects.js` — Cloudflare Worker script; deploy via Cloudflare Workers.

Note: GitHub Pages does not support server-side 301 redirects directly. For GitHub Pages, either keep the small client-side meta-refresh hints (already present) or put the site behind a CDN/edge (Cloudflare Worker) or switch to Netlify/Vercel to use the above server redirects.

Next steps:
- Tell me which host you want me to activate (Netlify, Vercel, Cloudflare, Apache, Nginx) and I will apply/remove meta-refresh hints and update files accordingly.
