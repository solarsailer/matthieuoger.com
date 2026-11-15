start:
	@hugo server -p 8000

build: clean
	@hugo

prod: build
	@node tests/serve.mjs public 8000

# Build the site and run the tests. Example: just test feeds.spec.js
test *args: build
	npx playwright test -c tests --project=chromium {{args}}

# Run the tooltip tests in Firefox and Safari's engine as well.
test-browsers: build
	npx playwright test -c tests tooltips.spec.js

# Record the reference screenshots from the current state of the site.
# Do it before a change, on a state that is known to be good.
snapshots: build
	rm -rf tests/snapshots
	npx playwright test -c tests --project=chromium visual.spec.js interactions.spec.js --update-snapshots

# Generate the colors of code blocks from one of Hugo's styles
# (list: https://xyproto.github.io/splash/docs/). Example: just code-theme github
code-theme style="catppuccin-frappe":
	@{ echo "@layer vendor {"; hugo gen chromastyles --style={{style}}; echo "}"; } > assets/sass/layers/code-theme.scss

# Format the code: templates with gotmplfmt (tabs, the Go convention),
# everything else with Prettier (two spaces).
format:
	gotmplfmt -w layouts
	npx prettier --write .

deploy:
	@echo "TBD"

clean:
	rm -rf public
	rm -rf resources
