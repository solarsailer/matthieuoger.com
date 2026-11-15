# matthieuoger.com

I am a product manager, developer and designer from France. Co-founder of [Pixelnest Studio](https://pixelnest.io/).

→ [Read here](https://matthieuoger.com/).

## Installation

On macOS:

```
brew install just
brew install hugo
brew install sass/sass/sass # Dart Sass
brew install go

# Formatter for the templates, from the Hugo team (installed in ~/go/bin).
go install github.com/gohugoio/gotmplfmt@v0.5.0

# Formatter for the rest, and the test runner with its browser.
npm install
npx playwright install chromium
```

`~/go/bin` must be in your `PATH`.

## Formatting

`just format` formats everything:

- Templates (`layouts/`) with [gotmplfmt](https://github.com/gohugoio/gotmplfmt). They are indented with tabs: it is the convention of Go, and the tool has no setting for it.
- Styles, scripts and tests with [Prettier](https://prettier.io/), indented with two spaces.

Posts are never formatted.

## Develop

```
just start    # Development server, with live reload
just prod     # Production build, served locally
just format   # Format templates, styles, scripts and tests
just test     # Build and run the tests
```
