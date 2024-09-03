start:
	hugo server -p 8000

build:
	hugo

deploy:
	echo "TBD"

clean:
	trash public
	trash resources
