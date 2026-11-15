# Production build, used as the reference for the tests during the migration.
baseline_repo := "https://github.com/solarsailer/solarsailer.github.io.git"
baseline_commit := "33723e2d8fc7c8339ff337ab25457f58dfe56661"

start:
	@hugo server -p 8000

build: clean
	@hugo

prod: build
	@node tests/serve.mjs public 8000

# Run the tests against the Hugo build. Example: just test content.spec.js
test *args: build
	npx playwright test -c tests --project=hugo {{args}}

# Run the tooltip tests in Firefox and Safari's engine as well.
test-browsers: build
	npx playwright test -c tests --project=hugo --project=firefox --project=webkit tooltips.spec.js

# Fetch the production build and record the reference screenshots.
baseline:
	rm -rf tests/.baseline tests/snapshots
	git clone --quiet {{baseline_repo}} tests/.baseline
	git -C tests/.baseline checkout --quiet {{baseline_commit}}
	rm -rf tests/.baseline/.git
	npx playwright test -c tests --project=baseline --update-snapshots

# Generate the colors of code blocks from one of Hugo's styles
# (list: https://xyproto.github.io/splash/docs/). Example: just code-theme github
code-theme style="catppuccin-latte":
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
