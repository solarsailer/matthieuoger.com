start:
	@hugo server -p 8000

build: clean
	@hugo

prod: build
	@echo "Web Server is available at http://localhost:8000/"
	serve --port 8000 public/

deploy:
	@echo "TBD"

clean:
	rm -rf public
	rm -rf resources
