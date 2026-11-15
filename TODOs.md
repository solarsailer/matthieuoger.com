# TODOs

## Open

What is left to finish the migration from Gatsby (see `MIGRATION.md` for the decisions taken so far).

### Review

- [ ] Try the tooltips by hand in Safari and Firefox (`just test-browsers` runs their tests in the three engines; Firefox could not be run when they were written).
- [ ] Validate both feeds once published: the Atom feed with the W3C validator (by its URL: pasting a copy made from a browser breaks the lines), the JSON feed with https://validator.jsonfeed.org/.

### Cleanup, once the review is done

- [ ] Delete the `gatsby/` folder.
- [ ] Record the reference screenshots from the Hugo build, so that the tests no longer need the production build (`tests/.baseline`).
- [ ] Remove what only served the comparison with Gatsby: the exceptions in `tests/pages.js`, the content and URL comparisons, `tests/outline.mjs` and `tests/styles.mjs`.
- [ ] Retire `MIGRATION.md`, or keep it as a decision log.

### Publish

- [ ] Deploy: `just deploy` is a placeholder. Push the build to `solarsailer.github.io` as before, or use a GitHub Pages action.
- [ ] Push the branch and merge it into `master`.

### Later

- [ ] Host the fonts (Rubik, Fira Mono) instead of loading them from Google Fonts.
- [ ] Tooltips: when CSS anchor positioning is supported widely enough (in every engine since January 2026 only), it can replace the positioning code of `assets/js/index.js`.

## To consider

Ideas, not decisions. Each one changes the HTML structure inherited from the previous site, which the tests compare with production: the matching test exception has to be added at the same time (see `tests/pages.js`).

### One `h1` per page

Today, several elements are an `h1` on the same page: the site title in the header, the page title ("Articles", "Archive"), the title of each post, and any `# heading` written in a post. The articles page has five or more.

Search engines and screen readers build the outline of a page from its headings. A single `h1` (the page or post title) would be clearer, with the site title as a plain link and the headings of posts starting at `h2`.

### The date of a post is not a heading

Under the title of a post, the date is an `h2`. It is a subtitle, not the heading of a section: a `<p>`, or a `<time datetime="…">`, would say what it is. The same date is repeated in the footer of the post.

### `nav` on the home page

The two groups of links of the home page (About / Articles / RSS, and the social networks) are bare lists. In the header and the footer of the other pages, the same links are inside a `nav`.

### Recap cards as one big link

In the lists of articles and in the archive, a card is a link that wraps an `article` with its title, date and excerpt. It is valid, but a screen reader announces the whole card as one long link.

The usual alternative: the link is on the title only, and CSS extends its clickable area to the whole card.

### Dark mode

`layers/theme.scss` already has the structure for it (commented out): colors are variables, with a place for the values of a dark theme, following the preference of the visitor (`prefers-color-scheme`) or a choice stored on `<html data-theme>`. What is missing: the dark values, the many grays written directly in components, and a dark theme for code blocks (Catppuccin has matching ones: Latte for light, Frappé (in use), Macchiato and Mocha for dark).
