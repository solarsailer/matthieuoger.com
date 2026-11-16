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
just setup
```

`~/go/bin` must be in your `PATH`.

## Writing

Posts are Markdown files in `content/posts/<year>/<month>/<day>/`. A post with files (images, videos…) is a folder: the text is in `index.md`, the files next to it. They are named without a path, in links and images alike.

A quote can have a kind, shown as a small label above it. Kinds: `TRANSCRIPT`, `TLDR`, `TWEET`.

```
> [!TRANSCRIPT]
> The rule of two is that two is one — and one is none.
```

An image with a width, or with a caption:

```
{{< image src="lock.jpg" alt="Rotation lock" title="Rotation lock" width="300" />}}

{{< image src="picker.png" alt="Image picker" title="iOS 8 Messages" >}}
It's not a button. It's a grid of three (or more) images.
{{< /image >}}
```

A video, with its caption:

```
{{< video src="action.mp4" width="221.5" height="480" >}}
Using the home indicator ([download video](action.mp4)).
{{< /video >}}
```

Code blocks are colored with one of Hugo's themes: `just code-theme <name>` changes it.

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
just deploy   # Build and publish (asks for a confirmation)
```

## Tests

The tests compare each page with a reference screenshot. These are not in the repository: record them before a change, from a state of the site that is known to be good.

```
just snapshots       # Record the reference screenshots
just test            # Build, then compare (report in tests/report/)
just test-browsers   # Tooltips in Firefox and Safari's engine too
```

`just test-browsers` needs `node_modules/.bin/playwright install firefox webkit` once.
