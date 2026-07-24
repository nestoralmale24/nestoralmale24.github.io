# AGENTS.md

## Repo Type
Static personal portfolio site. Single `index.html` entrypoint + `portfolio-details/` sub-pages. No build step — files are served as-is by GitHub Pages.

## Deploy
- Deploys on push to `main` via `.github/workflows/jekyll-gh-pages.yml`
- Jekyll build is a passthrough — no `_config.yml`, no Jekyll plugins. It just copies static files to `_site`.
- Live at: `https://nestoralmale24.github.io`

## Structure
- `index.html` — main single-page app (Profile, About, Technologies, Experience, Contact)
- `portfolio-details/` — detail pages for portfolio projects (GIBOA, SIGPEAC)
- `assets/css/main.css` — all custom styles, uses CSS custom properties for theming (`--accent-color`, etc.)
- `assets/js/main.js` — vanilla JS init for AOS, typed.js, Swiper, glightbox, isotope
- `vendor/` — third-party libs (Bootstrap 5, AOS, typed.js, Swiper, glightbox, isotope, waypoints, purecounter) — vendored, not from CDN (except devicon)
- `forms/contact.php` — PHP contact form (see gotcha below)
- `composer.json` — PHP deps for contact form only (`phpmailer/phpmailer`, `vlucas/phpdotenv`)

## Gotchas
- **Contact form won't work on GitHub Pages** — PHP is server-side and GitHub Pages is static-only. `forms/contact.php` requires a PHP server + `.env` with `MAIL_USERNAME` and `MAIL_PASSWORD` (Gmail SMTP).
- **Portfolio section is commented out** in `index.html` (lines 287-331). Uncomment to re-enable.
- **Contact section has a `maintenance-overlay`** covering the form (line 373-375 in index.html). Remove the overlay div to expose the form.
- No build tool, linter, formatter, or test framework. Just edit and push.

## Conventions
- HTML language is `es` (Spanish), but content is mixed English/Spanish.
- Section IDs use Spanish (`#sobremi`, `#resume`) — keep consistent when adding sections.
- Theme colors defined in `:root` CSS variables in `assets/css/main.css:3-22`. Change there to rebrand.
- Typed.js strings configured in `index.html` `data-typed-items` attribute.
