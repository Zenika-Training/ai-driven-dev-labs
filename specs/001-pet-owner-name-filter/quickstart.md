# Quickstart: Validate the Pet Owner Name Filter

Contract: [contracts/pet-owner-name-filter.yaml](contracts/pet-owner-name-filter.yaml). Data: [data-model.md](data-model.md).

## Prerequisites

Java 21, Maven, Node 22. Seed pets come from `brownfield-backend/src/main/resources/data.sql`.

## Automated

```bash
cd brownfield-backend && mvn test
cd brownfield-frontend && npm test && npm run lint
```

Expected: all pass, including the new filter tests.

## Manual: API (backend on :8080)

```bash
cd brownfield-backend && mvn spring-boot:run
curl 'http://localhost:8080/api/v1/pet?ownerName=smith'       # Max, Charlie
curl 'http://localhost:8080/api/v1/pet?ownerName=SMITH'       # same
curl 'http://localhost:8080/api/v1/pet?ownerName=%20smith%20' # same
curl 'http://localhost:8080/api/v1/pet?ownerName=%20%20'      # all 5
curl 'http://localhost:8080/api/v1/pet'                       # all 5
curl 'http://localhost:8080/api/v1/pet?ownerName=xyz'         # []
```

## Manual: UI (frontend on :5173)

1. `cd brownfield-frontend && npm run dev`, open the pet list.
2. Type "smith": only Max and Charlie remain; the input keeps focus.
3. Type "SMITH": same rows.
4. Clear the input, or enter only spaces: all 5 pets return.
5. Type "xyz": "No pets found." appears and the input is still visible.
6. Filter by "smith", click a row: pet detail opens as before.
