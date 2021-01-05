# Docker
IMG_NAME=registry.lucasrobin.fr/i2fc-fa-devis-habitation-static
APP_NAME=i2fc-fa-devis-habitation-static
APP_PORT=4444

# image de prod pour le front
build:
	docker image build \
	--no-cache \
	--file $(PWD)/Dockerfile \
	--tag $(IMG_NAME) \
	.

run:
	docker run \
	--rm \
	--volume $(PWD):/app \
	--volume $(PWD)/node_modules:/app/node_modules \
	--publish $(APP_PORT):8080 \
	--name $(APP_NAME) \
	$(IMG_NAME)

exec:
	docker run \
	-it \
	--rm \
	--volume $(PWD):/app \
	--volume $(PWD)/node_modules:/app/node_modules \
	--publish $(APP_PORT):8080 \
	--name $(APP_NAME) \
	$(IMG_NAME) \
	sh