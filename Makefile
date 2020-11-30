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

docker-image:
	docker image build \
	--file $(PWD)/Dockerfile \
	--tag $(I2FC_IMG_NAME) .

docker-container:
	docker run \
	--detach \
	--volume $(PWD)/dist/:/usr/src/app \
	--volume $(PWD)/node_modules:/usr/src/app/node_modules \
	--publish $(APP_PORT):3000 \
	--name $(I2FC_APP_NAME) \
	$(I2FC_IMG_NAME)

docker-exec:
	docker exec -it $(I2FC_APP_NAME) /bin/bash