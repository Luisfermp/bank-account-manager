# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := vfimmersive
SERVICE_NAME := app

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
.PHONY = deps
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif
	yarn install

# Build image
.PHONY = build
build: test
	yarn build

# Run tests
.PHONY = test
test: deps start_database
	./scripts/wait_for_elasticsearch.sh http://localhost:9200
	yarn test

# Clean containers
.PHONY = clean
clean:
	docker-compose down --rmi local --volumes --remove-orphans

# Start databases containers in background
.PHONY = start_database
start_database:
	docker-compose --profile infra up --detach