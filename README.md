## Get Started

Create a `.env` file and add docker variables.

```bash
#### DOCKER ####
NEXT_CONTAINER_NAME=$PROJECT_NAME$-nextjs
POSTGRES_CONTAINER_NAME=$PROJECT_NAME$-postgres
##################

#### POSTGRE ####
DATABASE_URL=$YOUR_DATABASE_URL$ # Contains the POSTGRES_CONTAINER_NAME
DATABASE_SEED_URL=$YOUR_DATABASE_SEED_URL$
POSTGRES_USER=$YOUR_POSTGRES_USER$
POSTGRES_PASSWORD=$YOUR_POSTGRES_PASSWORD$
POSTGRES_DB=$YOUR_POSTGRES_DB$
##################

##### AUTH ######
NEXTAUTH_URL=$YOUR_NEXTAUTH_URL$
AUTH_SECRET=$YOUR_AUTH_SECRET$ # Generate a secret key using the command: openssl rand -base64 64
#################
```

Run the following command to start the project.

```bash
make start
```

Setup the database.

```bash
make db-reset
```

Run migrations.

```bash
make db-migrate
```

Enjoy! 🚀
