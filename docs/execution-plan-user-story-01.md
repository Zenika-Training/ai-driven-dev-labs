- Step 1: In greenfield-backend, in a dedicated package, create a new Entity class named Pet. It should have 3 attributes (id, name and ownerName). Define its schema and test data inside data.sql

- Step 2: Create a PetRepository with a findByName method which returns a single result. Create a PetService and a PetController (both should expose finders and should NOT have any create/update/delete methods)

# Time to run the application and connect to swagger-ui

- Step 3: Add a business rule inside PetService: we should have Pet uniqueness per owner. A single owner cannot have 2 pets with the same name. Also generate a JUnit Integration test for PetService

# Moving to the frontend

- Step 4: In greenfield-frontend: Inside greenfield-frontend/src, create a subfolder called `pet`. Generate a service class called petService.ts . It should use Fetch API and allow to connect to this api: http://localhost:8080/swagger-ui/index.html#/pet-controller/ .

- Step 5: greenfield-frontend: create a new component called PetList.tsx which displays the pet list. App.tsx should use it.

- Step 6: greenfield-frontend: add tests for PetList.tsx and petService.ts
