# Get .env variables
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

build-app:
	cd frontend && npm run build
	cd ../
	tsc
	cp -r ./src/public dist/
	cp .env ./dist

dev-frontend:
	cd frontend && npm run serve 

dev-backend:
	npm run start:watch

build:
	docker image build \
	--no-cache \
	--file $(PWD)/Dockerfile \
	--tag $(I2FC_IMG_NAME) .

run:
	docker run \
	--rm \
	--volume $(PWD)/.env:/app/.env \
	--publish $(I2FC_APP_PORT):$(APP_PORT) \
	--name $(I2FC_APP_NAME) \
	$(I2FC_IMG_NAME)

exec:
	docker run \
	--rm \
	-it \
	--volume $(PWD)/.env:/app/.env \
	--publish $(I2FC_APP_PORT):$(APP_PORT) \
	$(I2FC_IMG_NAME) \
	sh
