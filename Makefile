include .env

.DEFAULT_GOAL:=help
PWD=$(shell pwd)
COMPOSE=docker compose
EXECNEXT=$(COMPOSE) exec next
EXECPG=$(COMPOSE) exec postgres

## All commands available in the Makefile

##@ Helper
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nAll commands available in the Makefile\n \nUsage:\n  make \033[36m<target>\033[0m\n"} /^[.a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Starting/stopping the project

start: build up-recreate ## Build and start containers project

build: ## Build containers project
	$(COMPOSE) build --force-rm

up: ## Start the project
	$(COMPOSE) up -d --remove-orphans

up-recreate: ## Start the project and recreate the containers
	$(COMPOSE) up -d --remove-orphans --force-recreate

stop: ## Stop containers project
	$(COMPOSE) stop

down: ## Stop and remove containers project
	$(COMPOSE) down

restart: ## Restart containers project
	$(COMPOSE) restart

##@ SSH
ssh: ## SSH into the next container
	$(EXECNEXT) sh

ssh-pg: ## SSH into the postgres container
	$(EXECPG) bash

##@ Installation
yarn: ## Install the Next.js App dependencies into the next container
	$(EXECNEXT) yarn install

##@ Linting
lint: ## Lint the Next.js App
	$(EXECNEXT) yarn lint

format: ## Format the Next.js App
	$(EXECNEXT) yarn format

# Update
update: ## Update the Next.js App dependencies
	$(EXECNEXT) npx npm-check-updates -i

##@ Build & Preview
build-start: next-build next-start ## Build and start the Next.js App

next-build: ## Build the Next.js App
	$(EXECNEXT) yarn build

next-start: ## Start the Next.js App (build)
	$(EXECNEXT) yarn start

##@ Database
db-reset: db-drop db-create db-pull ## Reset the database

db-drop: ## Drop the database
	$(EXECPG) dropdb ${POSTGRES_DB}

db-create: ## Create the database
	$(EXECPG) createdb ${POSTGRES_DB} && $(EXECNEXT) yarn prisma db push

db-pull: ## Pull the database
	$(EXECNEXT) yarn prisma db pull

db-migrate: ## Migrate the database
	$(EXECNEXT) yarn prisma migrate dev;

db-create-migration: ## Create database migration
	@echo "Please enter the migration name:"; \
	read name; \
	$(EXECNEXT) yarn prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script > down.sql; \
	$(EXECNEXT) yarn prisma migrate dev --create-only --name $$name;\
	search_name=$$(echo "$$name" | sed 's/[ -]/_/g'); \
	matching_folder=$$(find prisma/migrations -type d -name "*$$search_name*"); \
	mv down.sql $$matching_folder; \

db-rollback-migration: ## Rollback a database migration
	@echo "Please enter the migration name to rollback:"; \
	read name; \
	search_name=$$(echo "$$name" | sed 's/[ -]/_/g'); \
	matching_folder=$$(find prisma/migrations -type d -name "*$$search_name*"); \
	if [ -n "$$matching_folder" ]; then \
		  migration_name=$$(basename "$$matching_folder"); \
    	  echo "Found migration folder: $$matching_folder"; \
    	  $(EXECNEXT) yarn prisma db execute --file "$$matching_folder/down.sql" --schema prisma/schema.prisma; \
    	  $(EXECNEXT) yarn prisma migrate resolve --rolled-back "$$migration_name"; \
    	else \
    	  echo "No matching migration folder found for: $$name"; \
    	  exit 1; \
    	fi

db-seed: ## Seed the database
	$(EXECNEXT) yarn prisma db seed

##@ Containers
list-containers: ## List all containers
	docker compose ps -a

##@ Logs
logs: ## Show logs
	$(COMPOSE) logs

logs-next: ## Show logs for the next container
	$(COMPOSE) logs --since 1m -f next

logs-pg: ## Show logs for the postgres container
	$(COMPOSE) logs postgres