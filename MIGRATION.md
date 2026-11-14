# Gatsby → Hugo migration plan

Branch: `migration-hugo-parity` (created from `migration-hugo` @ `8732fa0`).
Written 2026-11-14 as a handoff, revised the same day after Matthieu's review.
Read it top to bottom before touching anything.

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

1. **Do not edit anything under `content/posts/` without Matthieu's approval.**
   Posts are human-written. If a post seems to need a change, stop and ask.
   An approved edit goes in **its own commit that touches only posts**, so it
   can be audited. The test run (§6) diffs `content/posts` against
   `migration-hugo` and fails on any file not in the approved list in
   `tests/pages.js`. Approved so far: the `excerpt` typo fix (`c11423b`).
2. Dependencies are exactly the list in §9. Adding one needs Matthieu's
   approval.
3. Simple Sass: partials, nesting, a few `$breakpoint` variables, one mixin at
   most. No functions, maps, loops, `@extend`.
4. Minimal JS: one small ES module for the tooltips. No bundler beyond
   `js.Build`, which the branch already uses.
5. Do not reproduce Gatsby bugs or noise (hashed class names, `url=` attributes
   on links, `fill="[object Object]"`, `gatsby-focus-wrapper`).
6. Commit only when asked. Never push or deploy.

## 3. Where things stand

Verified on 2026-11-14 with Hugo 0.170.0 (Homebrew, non-extended), Node 26.

| Thing | State |
|---|---|
| `master` | Gatsby 2.14 source. Does not build on current Node without workarounds. |
| Production build | `github.com/solarsailer/solarsailer.github.io`, `master` @ `33723e2` (2024-01-23). In sync with `master`: 88 posts, latest is `/2023/06/date-formats/`. **This is the baseline.** |
| `migration-hugo` | Builds (93 pages) once the CSS partial is bypassed. Layout skeletons, post bundles, `data/social.json`, Sass layer structure (`reset, theme, base, app`) exist. No component styles, no meta, no feeds, no icons, no JS. |
| Dart Sass | 1.108.2 installed, seen by `hugo env`. The branch's Sass compiles once the PostCSS pipe is removed (verified). |
| Old Gatsby source | Kept in `gatsby/` on this branch as the porting reference. |

What already matches production: all 88 post URLs (including the 7 page
bundles and `/about/`), `/archive/`, `/articles/`, the date format
(`02 January 2006`), the pager size (9, giving 10 pages).

Decisions taken by Matthieu on 2026-11-14: Playwright, CSS layers and Sass
structure approved; Floating UI for tooltips; keep the pagination URL format;
`/expo/` stays removed; analytics and progress bar dropped; typographer
disabled; post asset URLs may change; code highlighting may differ; copyright
year updated; Google Fonts link kept for now; deploy out of scope.

## 4. Findings that shape the work

These were checked against the real outputs, not assumed.

### 4.1 Markdown rendering differs from remark

- **`:::` containers are not supported by Goldmark.** 17 blocks in 12 posts
  (`::: blockquote transcript|tldr|twitter-tweet`) currently render as literal
  text. **Decision: keep the `:::` syntax in the posts.** The output shape is
  regular: every block opens with `<p>::: blockquote NAME\n` (once
  `:::blockquote`, no space) and closes with `\n:::</p>`. A
  `_partials/content.html` runs two `replaceRE` on `.Content` to emit
  `<blockquote class="NAME">…</blockquote>`, as production does. Use that
  partial everywhere content is rendered (single, articles list, feeds).
  Guard: a test asserts that no `:::` survives in any built page or feed, so
  a block the regex misses cannot ship silently.

  Alternatives, if the regex proves fragile (both need post edits, which
  Matthieu allows here, in a dedicated commit):
  - GitHub-style alerts, `> [!TRANSCRIPT]` on the first line of a normal
    blockquote, mapped to a class by a `_markup/render-blockquote.html` hook.
    Native to Hugo, portable syntax, but every line of the block needs `> `.
  - Block attributes, a `{.transcript}` line after a normal blockquote, with
    `markup.goldmark.parser.attribute.block = true`. Native, Hugo-specific.

  Neither was tested on this Hugo version; try on one post before converting.
- **Typographer: disable it.** It is on by default in Hugo and would curl
  about 840 quotes and apostrophes and turn 7 `--`/`---` into dashes.
  Production keeps the text as typed, and so will Hugo:
  `markup.goldmark.extensions.typographer.disable = true`.
- **Heading ids**: Hugo adds `id` to headings, production has none. Keep the
  Hugo default; the content test ignores them.
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
- **Pagination URLs**: production is `/articles/2/` … `/articles/10/`, Hugo's
  default is `/articles/page/2/`. Setting `pagination.path = ''` yields exactly
  the production URLs (verified on Hugo 0.170). **Decision: keep the existing
  format.** Hugo also emits `/articles/1/` as a redirect to `/articles/`,
  which is harmless.
- **Meta tags**: `layouts/partials/meta.html` is empty. Port `Meta.js` and the
  per-post overrides in `PostTemplate.js` (title, `og:`/`twitter:` title, url,
  description from `excerpt` or `excerptQuote`).
- **404**: needs `layouts/404.html` (GitHub Pages serves `/404.html`).

### 4.4 JS-driven behavior in production

| Behavior | Source | Hugo approach |
|---|---|---|
| Tooltips on social icons | `Tooltip.js` (measures and positions in JS) | **Floating UI** (`@floating-ui/dom`). See note below. |
| Social items fade/slide in on the home page | `react-pose`, random delay 0–250 ms, duration 500–2000 ms | CSS `@keyframes`, per-item `--delay`/`--duration` set inline by the template from fixed, index-based values (builds must be deterministic). Honor `prefers-reduced-motion`. |
| Active menu button | Gatsby `activeClassName` | `aria-current="page"` set at build time, styled instead of `.selected`. Exact match only, as today. |
| Progress bar during in-site navigation | `gatsby-plugin-nprogress` (shown while Gatsby's client-side router loads the next page) | Drop. Navigation is plain page loads now; the browser shows its own progress. |
| Google Analytics `UA-41853457-1` | plugin | Drop. Universal Analytics stopped processing in 2023. |

Tooltip note. Decision: Floating UI. One module, `assets/js/index.js`:

- markup: each social link is followed by a `<div class="tooltip" role="tooltip">`
  rendered by the template, hidden by default, linked with `aria-describedby`;
- `pointerenter`/`focus` show it, `pointerleave`/`blur` hide it (toggle a
  class, keep the existing opacity/translate transition);
- position with `computePosition(link, tooltip, {placement: 'top', middleware:
  [offset(20), flip(), shift({padding: 8})]})`. `flip()` replaces the old
  "show below when closer than 100px to the top" rule;
- import `@floating-ui/dom` from `node_modules`; `js.Build` bundles and
  minifies it into the single script. No import map needed.

The native Popover API is not required with this approach. Add
`popover="manual"` only if a tooltip ends up clipped by an ancestor.

For the record, the dependency-free route is CSS anchor positioning. It
reached all engines only in January 2026 (Firefox 147; Safari 26 in September
2025), so older Safari and Firefox would get misplaced tooltips. Hover
triggering needs JS either way: `interestfor` is Chromium-only. Revisit in a
year or two and delete the library.

### 4.5 Build chain

- Remove `postcss`, `postcss-cli`, `autoprefixer` and the `postCSS` pipe in
  `css.html`. They were on `migration-hugo` only to run Autoprefixer, and
  Autoprefixer has nothing to add here: the site's CSS is flexbox, grid,
  transitions, transforms, gradients and custom properties, none of which
  need a vendor prefix in any browser that also supports `@layer`. The one
  prefixed property in use (`-webkit-text-size-adjust`) is already written by
  hand in modern-normalize. Keeping them would cost three npm packages and
  make Node a requirement of every CSS build. Agreed with Matthieu, on one
  condition: a one-off check in Phase 5. Run
  `npx --yes -p postcss-cli -p postcss -p autoprefixer postcss <built css> --use autoprefixer --no-map`
  (nothing added to `package.json`) and diff against the input. Empty diff:
  the removal is final. Otherwise show Matthieu the added prefixes and let
  him decide.
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

## 5. Accepted deviations

Confirmed by Matthieu unless marked otherwise. The tests encode them in one
allowlist file (`tests/pages.js`) so they are explicit.

| # | Deviation | Recommendation |
|---|---|---|
| D1 | ~~Pagination URLs change~~ | Dropped: URLs are kept (§4.3). |
| D2 | `/expo/` exists in production, was removed on the branch | Confirmed. |
| D3 | Post asset URLs move into the bundle path (see below) | Confirmed: old URLs may break, no copies kept. |
| D4 | Code token colors (Chroma vs Prism) | Confirmed; match background, padding, font and palette as closely as possible. |
| D5 | Analytics and progress bar removed | Confirmed. |
| D6 | Footnote ids, heading ids, extra ARIA roles | Accept. |
| D7 | `/404/index.html` is not generated; `/404.html` is, as today | No visible change. GitHub Pages serves `/404.html` for any missing URL, in production and after the migration. Gatsby also wrote a duplicate at `/404/`; with Hugo that URL is simply missing, so it shows the same 404 page. |
| D8 | `/2015/09/what-makes-indie-hit/` now shows its excerpt on list pages and in meta description (typo fixed) | Confirmed. |
| D9 | Footer copyright year: 2022 in production, **2026** here | Confirmed. Update `copyright` in `hugo.toml`. |
| D10 | The title of the About page links to `/#` (the home page) in production; here it links to `/about/`, like the other page titles | Confirmed. |
| D11 | List paragraphs. remark decided item by item whether an item's text is wrapped in `<p>`; Goldmark follows CommonMark and decides for the whole list. Exact parity is impossible in 4 posts (`design-detail-ios8-messages`, `semicolon-comma-programming`, `date-formats`, `rotation-videos`) | Confirmed: keep Goldmark's consistent output, no CSS to emulate the old behavior. Spacing inside those 4 lists differs slightly from production; list them as known visual differences in Phase 5. `firefox-os` was fixed by making its list tight (post edit). The content test ignores `li > p`. |
| D13 | A quote on `/articles/7/` wraps one line differently at 375px. Gatsby splits it in several text nodes, which changes letter spacing by a fraction of a pixel | Accepted as a known visual difference; not worth reproducing. |
| D12 | Posts published the same day (4 days, on `/articles/5/`, `/8/`, `/9/` and in the feeds) are not in production's order | Confirmed: Hugo's default order is kept, for simplicity. No URL changes. The tests compare these without order. |

**Post edits, approved and committed alone (`Adapt 9 posts to Goldmark's
stricter Markdown`).** Goldmark is stricter than remark on two constructs.
Without these edits, 9 posts render wrongly (footnote text spills into the
article body):

- Footnote continuation lines are indented by 2 spaces; Goldmark needs 4.
  26 lines in 8 posts (`wearables`, `singapore`, `tools-as-superpowers`,
  `systemic-actions-automation`, `the-component`, `build-right-swiftly`,
  `playbooks`, `alpha-value-css-color-properties`). Whitespace only.
- `dwarf-fortress-systems`: a quote paragraph relies on lazy continuation
  after an empty `>` line; it needs its own `> ` prefix.

With them, the URL, content and feed specs all pass (120/120).

D3 in plain terms: a post image served today at
`/images/posts/2018-10-18/steredenn.jpg` is served at
`/2018/10/unity-iphone-x-home-indicator/steredenn.jpg` after the migration
(17 files). The site itself is fine; outside references to the old addresses
break. Accepted.

Settled, kept for context:

- **Fonts**: production loads Rubik and Fira Mono from Google Fonts. Keep the
  same `<link>` during the migration so pixels match. Self-hosting the woff2
  files is a follow-up, after parity.
- **Deploy**: `just deploy` is `TBD` and Travis is dead. Out of scope here.

Kept identical to production on purpose, although it looks like a bug: the
"Articles" menu button is never highlighted (only "About" is, on its page).
Fixing it is one line in `_partials/header.html`.

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
   `public/`, minus the allowlist; `sitemap.xml`, `atom.xml`, `feed.json`,
   `404.html`, `CNAME`, favicons exist; no `:::` in any built page or feed.
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
   same pixels, so near-exact is realistic on pages without code (D4).
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
- Remove PostCSS packages and pipe. Add `prettier` as a dev dependency. Fix
  the three Hugo deprecations and move templates to the current layout.
- `hugo.toml`: `pagination.path = ''`, typographer disabled, copyright year
  2026.
- `justfile`: `prod` calls `serve`, which is not installed; point it at
  `tests/serve.mjs` once that exists.
- Restructure Sass to `@use` + self-layered partials (§4.5). The build must
  work with real CSS before anything else.

**Phase 1: test harness** (§6)
- `serve.mjs`, config, `pages.js`, `just baseline`, `just test`.
- Write `urls`, `content`, `feeds`; they fail. Generate baseline screenshots.

**Phase 2: markup parity** → `urls`, `content`, `feeds` green
- `hugo.toml`: Chroma classes, output formats for Atom (`/atom.xml`) and
  JSON Feed (`/feed.json`), drop `rss`, params for author, description,
  keywords, handles (from `gatsby-config.js`).
- Feeds, meta and 404 first: they are pure templates with exact expected
  output in the baseline, so they turn `feeds` and half of `content` green
  early.
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

**Phase 3: styles** → `visual` converging
- Port file by file following the map in §4.6, source of truth being
  `gatsby/src/**` plus `prism-tomorrow.css` for code. Keep values verbatim
  (hsl, rem, breakpoints). Order: layout → components → content.
- Chroma palette in `content/code.scss`.

**Phase 4: behavior** → `interactions` green
- Tooltip with Floating UI (§4.4): `npm i @floating-ui/dom`.
- Home social nav entrance animation.

**Phase 5: convergence**
- Run the full visual suite, fix diffs page by page, tighten thresholds.
- Record any remaining, justified difference in the allowlist with a comment.
- Autoprefixer one-off check (§4.5) and report the result.

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

## 9. Dependencies

Complete list, every language and every kind. Versions are what is installed
or current on 2026-11-14.

**Needed to build the site**

| Dependency | Version | Kind | Role |
|---|---|---|---|
| Hugo | 0.170.0 (standard edition is enough) | Go binary, Homebrew | Site generator. Brings Goldmark (Markdown), Chroma (code highlighting) and esbuild (`js.Build`) built in. |
| Dart Sass | 1.108.2 | Binary, Homebrew | Compiles `assets/sass`. Called by Hugo. |
| Node.js + npm | 26.x | Runtime, Homebrew | Only to install the one npm library below so Hugo can bundle it. |
| `@floating-ui/dom` | 1.8.0 | npm, shipped to browsers | Tooltip positioning. Pulls `@floating-ui/core` and `@floating-ui/utils` (same project). |

**Vendored in the repository**

| Dependency | Version | Role |
|---|---|---|
| modern-normalize | 3.0.0 | CSS reset, copied into `assets/sass/layers/normalize.scss`. |

**Loaded by the browser from a third party**

| Dependency | Role |
|---|---|
| Google Fonts | Rubik (300–900, with italics) and Fira Mono. To be self-hosted after the migration. |

**Development and tests only**

| Dependency | Version | Kind | Role |
|---|---|---|---|
| just | 1.59.0 | Binary, Homebrew | Task runner (`justfile`). |
| `@playwright/test` | 1.65.1 | npm dev | All tests. Downloads its own Chromium (`npx playwright install chromium`). |
| git | any | Binary | `just baseline` clones the production build. |
| `prettier` | 3.x (latest) | npm dev | Formatting. Missing from `package.json` today; add it. |
| `prettier-plugin-go-template` | 0.0.15 | npm dev | Lets Prettier format Hugo templates. Already configured. |

**Services**

| Dependency | Role |
|---|---|
| `github.com/solarsailer/solarsailer.github.io` @ `33723e2` | Test baseline during the migration only. |
| GitHub Pages | Hosting (unchanged; deploy is out of scope). |

**Removed by this migration**

Gatsby and its 9 plugins, React, react-dom, react-helmet, react-pose,
styled-components (and its Babel plugin), lodash, Prism, `xml`,
`@sindresorhus/is`, gh-pages, husky, jest, webpack; PostCSS, postcss-cli and
autoprefixer from the first Hugo attempt; `serve`; Google Analytics; Travis CI.
