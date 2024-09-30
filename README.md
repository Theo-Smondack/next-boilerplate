## Get Started

Create a `.env` file and add docker variables.

```bash
#Docker
NEXT_CONTAINER_NAME=$PROJECT_NAME$-nextjs
POSTGRES_CONTAINER_NAME=$PROJECT_NAME$-postgres
```

Run the following command to start the project.

```bash
docker compose up -d --remove-orphans --force-recreate
```
