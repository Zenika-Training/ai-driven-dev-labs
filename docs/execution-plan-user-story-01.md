- In a dedicated package, create a new Entity class named Pet. It should have 3 attributes (id, name and ownerName). Define its schema and test data inside data.sql

- Create a PetRepository with a findByName method which returns a single result. Create a PetService and a PetController.

# Time to run the application and connect to swagger-ui

- Add a business rule inside PetService: we should have Pet uniqueness per owner. A single owner cannot have 2 pets with the same name. Also generate a JUnit Integration test for PetService

# Moving to the frontend

- In greenfield-frontend: Inside greenfield-frontend/src, create a subfolder called `pet`. Generate a service class called petService.ts . It should use Fetch API and allow to connect to this api: http://localhost:8080/swagger-ui/index.html#/pet-controller/ .

- greenfield-frontend: create a new component called PetList.tsx which displays the pet list. App.tsx should use it.

- greenfield-frontend: add tests for PetList.tsx and petService.ts

- greenfield-frontend: improve the homepage look and feel. Main colours should be white and dark green. There should be a few icons and oen splash screen. Datatable should look sleek and have a dark green header. datatable width should take 60% of the screen on a regular laptop.
