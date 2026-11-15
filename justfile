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

# Fetch the production build and record the reference screenshots.
baseline:
	rm -rf tests/.baseline tests/snapshots
	git clone --quiet {{baseline_repo}} tests/.baseline
	git -C tests/.baseline checkout --quiet {{baseline_commit}}
	rm -rf tests/.baseline/.git
	npx playwright test -c tests --project=baseline --update-snapshots

# Format the code with Prettier (see .prettierignore for what is left out).
format:
	npx prettier --write .

deploy:
	@echo "TBD"

clean:
	rm -rf public
	rm -rf resources
