IMG_NAME=registry.lucasrobin.fr/i2fc-fa-devis-habitation
APP_NAME=i2fc-fa-devis-habitation
APP_PORT=3333

build:
	docker image build \
	--no-cache \
	--file $(PWD)/Dockerfile \
	--tag $(IMG_NAME) \
	.

run:
	docker run \
	--rm \
	--publish $(APP_PORT):3000 \
	--name $(APP_NAME) \
	$(IMG_NAME)

exec:
	docker run \
	-it \
	--rm \
	--publish $(APP_PORT):3000 \
	--name $(APP_NAME) \
	--volume $(PWD):/usr/src/app \
	--volume $(PWD)/node_modules:/usr/src/app/node_modules \
	$(IMG_NAME) \
	sh

