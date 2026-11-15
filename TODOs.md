# TODOs

## To consider

Ideas, not decisions. Each one changes the HTML structure inherited from the
previous site, which the tests compare with production: the matching test
exception has to be added at the same time (see `tests/pages.js`).

### One `h1` per page

Today, several elements are an `h1` on the same page: the site title in the
header, the page title ("Articles", "Archive"), the title of each post, and
any `# heading` written in a post. The articles page has five or more.

Search engines and screen readers build the outline of a page from its
headings. A single `h1` (the page or post title) would be clearer, with the
site title as a plain link and the headings of posts starting at `h2`.

### The date of a post is not a heading

Under the title of a post, the date is an `h2`. It is a subtitle, not the
heading of a section: a `<p>`, or a `<time datetime="…">`, would say what it
is. The same date is repeated in the footer of the post.

### `nav` on the home page

The two groups of links of the home page (About / Articles / RSS, and the
social networks) are bare lists. In the header and the footer of the other
pages, the same links are inside a `nav`.

### Recap cards as one big link

In the lists of articles and in the archive, a card is a link that wraps an
`article` with its title, date and excerpt. It is valid, but a screen reader
announces the whole card as one long link.

The usual alternative: the link is on the title only, and CSS extends its
clickable area to the whole card.
