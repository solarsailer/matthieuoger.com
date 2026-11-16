# Development tools, installed in the project by `just setup`.
# They are called directly: nothing is ever downloaded on the fly.
playwright := "node_modules/.bin/playwright"
prettier := "node_modules/.bin/prettier"

# Install the development tools, at the versions of package-lock.json.
setup:
	npm ci
	{{playwright}} install chromium

# Development server, with live reload.
start:
	@hugo server -p 8000

# Production build, in public/.
build: clean
	@hugo

# Production build, served on http://localhost:8000/.
prod: build
	@node tests/serve.mjs public 8000

# Build the site and run the tests. Example: just test feeds.spec.js
test *args: build
	{{playwright}} test -c tests --project=chromium {{args}}

# Run the tooltip tests in Firefox and Safari's engine as well.
test-browsers: build
	{{playwright}} test -c tests tooltips.spec.js

# Record the reference screenshots. Do it before a change, on a good state.
snapshots: build
	rm -rf tests/snapshots
	{{playwright}} test -c tests --project=chromium visual.spec.js interactions.spec.js --update-snapshots

# Colors of code blocks, from one of Hugo's styles: https://xyproto.github.io/splash/docs/
code-theme style="catppuccin-frappe":
	@{ echo "@layer vendor {"; hugo gen chromastyles --style={{style}}; echo "}"; } > assets/sass/layers/code-theme.scss

# Format templates with gotmplfmt (tabs, as in Go), the rest with Prettier.
format:
	gotmplfmt -w layouts
	{{prettier}} --write .

# Publish the site on matthieuoger.com (asks for a confirmation).
deploy: build
	@scripts/deploy.sh

# Delete what the build generates.
clean:
	rm -rf public
	rm -rf resources
