# Gatsby → Hugo migration plan

Branch: `migration-hugo-parity` (created from `migration-hugo` @ `8732fa0`).
Written 2026-11-14 as a handoff. Read it top to bottom before touching anything.

## 1. Goal

Replace the Gatsby 2 site with a Hugo site that is **visually and structurally
the same**, with as few dependencies as possible.

Done means:

- Every URL of the current production site resolves on the Hugo build (except
  the deviations listed in §5).
- Every page has the same content and semantic structure as production.
- Every page looks the same as production at every breakpoint.
- Feeds keep the same entry ids, so feed readers do not re-flag old posts.
- `gatsby/`, React, styled-components, PostCSS are gone.

## 2. Hard rules

1. **Never edit anything under `content/posts/`.** Posts are human-written.
   `git diff --exit-code migration-hugo -- content/posts` must stay empty; it is
   part of the test run (§6). If a post seems to need a change, stop and ask
   Matthieu.
2. Runtime dependencies: Hugo and Dart Sass. Nothing else.
3. Dev dependencies: `@playwright/test` only (plus Prettier and its go-template
   plugin, which are already there for formatting).
4. Simple Sass: partials, nesting, a few `$breakpoint` variables, one mixin at
   most. No functions, maps, loops, `@extend`.
5. Minimal JS: one small ES module, no bundler. If it ever grows to several
   files, use native modules with an import map.
6. Do not reproduce Gatsby bugs or noise (hashed class names, `url=` attributes
   on links, `fill="[object Object]"`, `gatsby-focus-wrapper`).
7. Commit only when asked. Never push or deploy.

## 3. Where things stand

Verified on 2026-11-14 with Hugo 0.170.0 (Homebrew, non-extended), Node 26.

| Thing | State |
|---|---|
| `master` | Gatsby 2.14 source. Does not build on current Node without workarounds. |
| Production build | `github.com/solarsailer/solarsailer.github.io`, `master` @ `33723e2` (2024-01-23). In sync with `master`: 88 posts, latest is `/2023/06/date-formats/`. **This is the baseline.** |
| `migration-hugo` | Builds (93 pages) once the CSS partial is bypassed. Layout skeletons, post bundles, `data/social.json`, Sass layer structure (`reset, theme, base, app`) exist. No component styles, no meta, no feeds, no icons, no JS. |
| Dart Sass | **Not installed** on this machine: `brew install sass/sass/sass`. |
| Old Gatsby source | Kept in `gatsby/` on this branch as the porting reference. |

What already matches production: all 88 post URLs (including the 7 page
bundles and `/about/`), `/archive/`, `/articles/`, the date format
(`02 January 2006`), the pager size (9, giving 10 pages).

## 4. Findings that shape the work

These were checked against the real outputs, not assumed.

### 4.1 Markdown rendering differs from remark

- **`:::` containers are not supported by Goldmark.** 17 blocks in 12 posts
  (`::: blockquote transcript|tldr|twitter-tweet`) currently render as literal
  text. The output shape is regular: every block opens with
  `<p>::: blockquote NAME\n` (once `:::blockquote`, no space) and closes with
  `\n:::</p>`. Fix without touching posts: a `_partials/content.html` that runs
  two `replaceRE` on `.Content` to emit `<blockquote class="NAME">…</blockquote>`,
  as production does. Use that partial everywhere content is rendered (single,
  articles list, feeds).
- **Typographer is on by default** and rewrites `"` and `'` into curly
  entities. Production keeps them straight. Set
  `markup.goldmark.extensions.typographer.disable = true`.
- **Heading ids**: Hugo adds `id` to headings, production has none. Set
  `markup.goldmark.parser.autoHeadingID = false` for parity.
- **Footnotes**: same classes (`footnotes`, `footnote-ref`, `footnote-backref`),
  different ids (`fn:1` vs `fn-1`) and extra `role` attributes. Accept; the
  content test normalizes ids.
- **Code**: production uses Prism (`<div class="gatsby-highlight">` +
  `prism-tomorrow.css`), including on fences without a language (11 of 22
  fences). Hugo uses Chroma. Use a `_markup/render-codeblock.html` hook so every
  fence gets the same wrapper, Chroma with classes (`noClasses = false`), and a
  hand-written Tomorrow Night token palette. Token-level colors will not be
  pixel-identical; this is an accepted deviation (§5).
- **Inline code** has `class="language-text"` in production, and
  `prism-tomorrow.css` styles it (`border-radius: .3em`, `padding`,
  `white-space`). The site CSS overrides only part of that. Port what the
  browser actually computes, not just what `post/code.js` says.

### 4.2 Relative asset URLs in page bundles

`migration-hugo` moved post assets into page bundles and made the references
relative (`src="lock.jpg"`). That works on the post page but **breaks wherever
the content is rendered at another URL**: the first three posts on `/articles/`
and every entry of the feeds. Fix in the same `content.html` partial: rewrite
relative `src`/`href` (no slash, no scheme, no `#`) to the page's
`RelPermalink` (HTML) or `Permalink` (feeds). Render hooks cannot do it alone
because half the references are raw HTML (`<img>`, `<video>`, `<a>`).

Side effect: asset URLs change (`/images/posts/2018-10-18/x.jpg` →
`/2018/10/slug/x.jpg`). Old hotlinks to images break. See §5.

### 4.3 Things Hugo does not have out of the box

- **Feeds**: production serves a custom Atom feed at `/atom.xml` and JSON Feed
  1.0 at `/feed.json`, both linked from `<head>`, both excluding
  `category: meta` (the About page). Needs two custom output formats and
  templates. The current `rss` output (`/index.xml`) should go.
- **Pagination URLs**: production is `/articles/2/` … `/articles/10/`, Hugo is
  `/articles/page/2/`. See §5.
- **Meta tags**: `layouts/partials/meta.html` is empty. Port `Meta.js` and the
  per-post overrides in `PostTemplate.js` (title, `og:`/`twitter:` title, url,
  description from `excerpt` or `excerptQuote`).
- **404**: needs `layouts/404.html` (GitHub Pages serves `/404.html`).

### 4.4 JS-driven behavior in production

| Behavior | Source | Hugo approach |
|---|---|---|
| Tooltips on social icons | `Tooltip.js` (measures and positions in JS) | Native `popover` + CSS anchor positioning (`position-try-fallbacks: flip-block` replaces the "show below if near the top" logic). See note below. |
| Social items fade/slide in on the home page | `react-pose`, random delay 0–250 ms, duration 500–2000 ms | CSS `@keyframes`, per-item `--delay`/`--duration` set inline by the template from fixed, index-based values (builds must be deterministic). Honor `prefers-reduced-motion`. |
| Active menu button | Gatsby `activeClassName` | `aria-current="page"` set at build time, styled instead of `.selected`. Exact match only, as today. |
| Page-load progress bar | `gatsby-plugin-nprogress` | Drop. No client-side routing anymore. |
| Google Analytics `UA-41853457-1` | plugin | Drop. Universal Analytics stopped processing in 2023. |

Popover note: the Popover API is click- or script-triggered. Hover needs either
the `interestfor` attribute (interest invokers) or a few lines of JS
(`pointerenter`/`focus` → `showPopover()`, `pointerleave`/`blur` →
`hidePopover()`). Check current browser support for `interestfor` and for
anchor positioning before choosing; if `interestfor` is not in all three
engines, ship the ~15-line JS module. That module is then the only JS on the
site.

### 4.5 Build chain

- Remove `postcss`, `postcss-cli`, `autoprefixer` and the `postCSS` pipe in
  `css.html`. Nothing in this CSS needs prefixing.
- Sass `@import` is deprecated and goes away in Dart Sass 3. `index.scss`
  nests `@import` inside `@layer`, which `@use` cannot do. Simplest fix: each
  partial wraps its own rules in `@layer name { … }`, and `index.scss` is the
  layer order statement followed by plain `@use` lines.
- Hugo deprecations seen in the build: `languageCode` → `locale`,
  `.Site.Data` → `hugo.Data`, `toCSS` → `css.Sass`. Also move to the current
  template layout (`layouts/_partials`, `layouts/_markup`, no `_default`).
- `normalize`: `master` uses normalize.css 5, the branch uses modern-normalize
  3. Keep modern-normalize; if the visual tests show it fighting the port
  (heading sizes, `hr`, `line-height`, `strong`), add the missing declarations
  to `base` rather than switching back.

### 4.6 CSS layers: use them

`@layer` has been in every engine since March 2022. The real downside is that
a browser without support drops layered rules entirely, with no fallback; four
and a half years on, that population is negligible for this site. The gain
here is concrete: third-party CSS (normalize, the Chroma theme) sits in low
layers and can never out-rank site rules, so no `!important` (the two in
`base.scss` can go). Keep the branch's layer structure and extend it:

```
@layer reset, theme, base, app, layout, components, content;
```

Proposed files, mirroring the Gatsby sources one to one:

```
assets/sass/
  index.scss
  _config.scss               breakpoints, radius (from styles/config.js)
  layers/normalize.scss theme.scss base.scss app.scss      (exist)
  layout/page.scss header.scss footer.scss home.scss not-found.scss
  components/button.scss page-title.scss pagination.scss post.scss
             post-recap.scss header-row.scss social-nav.scss
             compact-social-nav.scss tooltip.scss invisible-link.scss
  content/title.scss list.scss body-link.scss special-link.scss
          blockquote.scss code.scss figure.scss footnotes.scss
```

`content/` styles what Markdown produces inside `.post__content`. `hint.js`
(shared `::before` label) becomes the one allowed mixin, or a grouped selector.

Class names: production's are hashed, so pick readable ones in the style
already used on the branch (`page-header`, `page-content__constraints`).

## 5. Accepted deviations (need Matthieu's confirmation)

Each has a recommended default. The tests encode them in one allowlist file so
they are explicit.

| # | Deviation | Recommendation |
|---|---|---|
| D1 | `/articles/N/` becomes `/articles/page/N/` | Accept, and add `aliases` so the old URLs redirect. Low-value URLs. |
| D2 | `/expo/` exists in production, was removed on the branch | Accept removal (it was a temporary page). |
| D3 | Post asset URLs move into the bundle path | Accept. Optionally keep `static/images/posts/` copies if old hotlinks matter. |
| D4 | Code token colors (Chroma vs Prism) | Accept; match background, padding, font and palette as closely as possible. |
| D5 | Analytics and progress bar removed | Accept. |
| D6 | Footnote ids, heading-free ids, extra ARIA roles | Accept. |
| D7 | `/404/` directory page gone, `/404.html` kept | Accept. |

Open questions that are not deviations:

- **Q1 front matter typo**: `2015/09/18/what-makes-indie-hit.md` has
  `exceprt:` instead of `excerpt:`, so that post shows no excerpt today.
  Parity says leave it. Matthieu to fix by hand if wanted.
- **Q2 fonts**: production loads Rubik and Fira Mono from Google Fonts. Keep
  the same `<link>` during the migration so pixels match. Self-hosting the
  woff2 files is a good follow-up (no third-party request), after parity.
- **Q3 deploy**: `just deploy` is `TBD` and Travis is dead. Out of scope here;
  decide between pushing `public/` to `solarsailer.github.io` as before or a
  GitHub Pages Action.
- **Q4 copyright year**: production says 2022, `hugo.toml` says 2024. Tests
  will flag it; pick one.

## 6. Tests

One tool: **Playwright Test** (`@playwright/test` 1.65.x, current as of this
writing). It covers pixel comparison, DOM comparison and plain HTTP checks, so
nothing else is needed. Alternatives considered: BackstopJS (aging, heavier),
Percy/Argos/Chromatic (hosted services, overkill), a hand-rolled
pixelmatch script (reinvents `toHaveScreenshot`).

### 6.1 Setup

```
tests/
  playwright.config.js
  serve.mjs            ~25-line static file server (node:http), no dependency
  pages.js             list of URLs + the deviations allowlist from §5
  urls.spec.js
  content.spec.js
  feeds.spec.js
  visual.spec.js
  interactions.spec.js
  .baseline/           gitignored: clone of solarsailer.github.io @ 33723e2
  snapshots/           gitignored: baseline screenshots
```

`justfile` targets:

- `just baseline`: clone the production repo at the pinned commit into
  `tests/.baseline/`, then run the visual spec against it with
  `--update-snapshots` to produce the golden screenshots.
- `just test`: `hugo --environment production`, check the posts guard
  (§2 rule 1), run Playwright.

Playwright config: two `webServer` entries (`serve.mjs` on the baseline at
`:8001`, on `public/` at `:8000`), Chromium only, `snapshotPathTemplate`
without the project name so both sides share the same snapshot files.

### 6.2 Specs

1. **`urls`**: every `index.html` in the baseline has a counterpart in
   `public/`, minus the allowlist; aliases of D1 redirect; `sitemap.xml`,
   `atom.xml`, `feed.json`, `404.html`, `CNAME`, favicons exist.
2. **`content`**: for each page, load both sides with JavaScript disabled and
   run the same `page.evaluate` extractor over `#page`. It returns a
   normalized tree: tag names, collapsed text, `href`/`src`/`alt`/`title`,
   and `class` only for author classes inside post content (`tldr`,
   `transcript`, `twitter-tweet`, `more`, `footnote-ref`, …). It ignores
   styled-components classes, comments, the tooltip DOM, heading ids, and
   maps the known differences (code wrapper, footnote ids, asset paths per
   D3). Compare `<head>` too: `title`, the `meta` name/property/content set,
   `link[rel=alternate|icon|mask-icon]`. This spec is fast and should go
   green first.
3. **`feeds`**: same entry ids in the same order, same titles, dates and
   links, About excluded, in both feeds. Compare entry HTML with the same
   normalizer.
4. **`visual`**: full-page `toHaveScreenshot` with `animations: 'disabled'`,
   after `document.fonts.ready`, `<video>` and `<iframe>` masked. Widths
   chosen to sit between the site's breakpoints (1600, 900, 800, 750, 700,
   650, 600, 525, 500, 450, 400, 350, 300):
   - all pages at 1280 and 375;
   - a representative set (home, `/articles/`, `/articles/page/2/`,
     `/archive/`, `/about/`, 404, and the posts covering every content
     feature: code, footnotes, figures/video, each blockquote variant,
     lists, special links) at 1700, 1280, 850, 680, 560, 480, 375, 320.

   Start with a loose `maxDiffPixelRatio` to see progress, tighten to near
   zero at the end. Same browser, same fonts and same CSS values render the
   same pixels, so near-exact is realistic outside D4.
5. **`interactions`**: element screenshots of hover/focus states that static
   screenshots miss: buttons, menu buttons, post recap card, body links,
   footnote back-reference, tooltip open (above, and below near the top),
   header title hover.

When a visual test fails and the cause is not obvious, diff
`getComputedStyle` of the offending element on both sides; it points at the
exact property.

### 6.3 After the migration

Regenerate the snapshots from the Hugo build, delete `tests/.baseline/`, the
baseline server and the `content`/`urls` comparison against Gatsby. What
remains is an ordinary visual regression suite for the site.

## 7. Work plan

Each phase ends with the listed specs green. Do them in order.

**Phase 0: housekeeping**
- Install Dart Sass. Remove PostCSS packages and pipe. Fix the three Hugo
  deprecations and move templates to the current layout.
- Restructure Sass to `@use` + self-layered partials (§4.5). The build must
  work with real CSS before anything else.

**Phase 1: test harness** (§6)
- `serve.mjs`, config, `pages.js`, `just baseline`, `just test`.
- Write `urls`, `content`, `feeds`; they fail. Generate baseline screenshots.

**Phase 2: markup parity** → `urls`, `content`, `feeds` green
- `hugo.toml`: typographer off, heading ids off, Chroma classes, output
  formats for Atom and JSON Feed, drop `rss`, params for author, description,
  keywords, handles (from `gatsby-config.js`).
- `_partials/content.html` (containers + relative URLs, §4.1, §4.2).
- `_markup/render-codeblock.html`.
- Templates, ported from the React components: `baseof`, `meta`, `header`
  (logo SVG, RSS icon, `aria-current`), `footer` (compact social nav with
  line icons), home (social nav with text + filled icons), `single`
  (`showPageTitle` variant used by About), articles list (page 1: three full
  posts then recaps; other pages: recaps only; second pager only when more
  than three items), archive (year header rows + recaps without "read more"),
  `post-recap` partial (`excerpt`, `excerptQuote`, read-more hint), 404.
- Icons: one SVG partial per icon under `_partials/icons/`, taken from
  `Icon.js`; color through `currentColor` / a `--color` custom property set
  inline from `data/social.json`.
- Aliases for D1.

**Phase 3: styles** → `visual` converging
- Port file by file following the map in §4.6, source of truth being
  `gatsby/src/**` plus `prism-tomorrow.css` for code. Keep values verbatim
  (hsl, rem, breakpoints). Order: layout → components → content.
- Chroma palette in `content/code.scss`.

**Phase 4: behavior** → `interactions` green
- Tooltip (popover + anchor positioning, hover trigger per §4.4).
- Home social nav entrance animation.

**Phase 5: convergence**
- Run the full visual suite, fix diffs page by page, tighten thresholds.
- Record any remaining, justified difference in the allowlist with a comment.

**Phase 6: cleanup**
- Delete `gatsby/`, unused static files (`card-2019.jpg` if unreferenced),
  update `README.md`, archetypes, `justfile`.
- Switch tests to self-baseline (§6.3).
- Deploy is a separate decision (Q3).

## 8. Reference: source → target map

| Gatsby source (`gatsby/src/…`) | Hugo target |
|---|---|
| `components/layouts/sections/Meta.js`, `templates/PostTemplate.js` (Helmet) | `_partials/meta.html` |
| `components/layouts/sections/Header.js` | `_partials/header.html`, `layout/header.scss`, `components/button.scss` |
| `components/layouts/sections/Footer.js`, `CompactSocialNavigation.js` | `_partials/footer.html`, `layout/footer.scss`, `components/compact-social-nav.scss` |
| `components/layouts/sections/Page.js` | `baseof.html`, `layout/page.scss` |
| `pages/index.js`, `SocialNavigation.js`, `MountedAnimator.js` | `home.html`, `layout/home.scss`, `components/social-nav.scss` |
| `templates/PaginationTemplate.js`, `PaginationController.js` | articles list template, `_partials/pagination.html`, `components/pagination.scss` |
| `pages/archive.js`, `HeaderRow.js` | archive template, `components/header-row.scss` |
| `Post.js`, `PageTitle.js`, `PostRecap.js` | `single.html`, `_partials/post.html`, `_partials/post-recap.html`, matching scss |
| `Tooltip.js` | `_partials/tooltip.html`, `components/tooltip.scss`, `assets/js/index.js` |
| `Icon.js` | `_partials/icons/*.svg` |
| `styles/components/post/*.js`, `post.js` | `content/*.scss` |
| `styles/components/grid-social-nav.js` | shared rules in the two social nav partials |
| `plugins/gatsby-plugin-feeds/*` | `list.atom.xml`, `list.feed.json` on the home output |
| `pages/404.js` | `404.html`, `layout/not-found.scss` |
| `gatsby-node.js`, `node/markdown-creator.js` | `[permalinks]` in `hugo.toml` (done) |
