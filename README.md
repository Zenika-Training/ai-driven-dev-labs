# Pet Clinic application

## Setup Instructions

### Prerequisites

1. **Install development tools:**
   - Install VSCode
   - Install Java 21 and Node.js v22
   - Install an AI coding assistant of your choice (Copilot, Claude Code, Cursor…)
      > If you are using [GitHub Copilot](.github/copilot-instructions.md), instructions are inside `.github/copilot-instructions.md`  
       > If you are using Claude Code, instructions are inside [Claude.md](Claude.md)

### Running with Docker
If you don't have Java or Node, but you have docker, you can run the applications within docker as well. 

Each application (greenfield and brownfield) has its own Docker Compose file. They cannot be run at the same time as they share the same ports.

**Greenfield** (backend on `:8080`, frontend on `:5173`):
```bash
docker compose -f docker-compose.greenfield.yml up
```

**Brownfield** (backend on `:8080`, frontend on `:5173`):
```bash
docker compose -f docker-compose.brownfield.yml up
```

### Running Unit Tests in Docker

With the containers running, use `docker compose exec` to run tests inside each container.

**Greenfield:**
```bash
# Backend
docker compose -f docker-compose.greenfield.yml exec greenfield-backend mvn test

# Frontend
docker compose -f docker-compose.greenfield.yml exec greenfield-frontend npm test
```

**Brownfield:**
```bash
# Backend
docker compose -f docker-compose.brownfield.yml exec brownfield-backend mvn test

# Frontend
docker compose -f docker-compose.brownfield.yml exec brownfield-frontend npm test
```
