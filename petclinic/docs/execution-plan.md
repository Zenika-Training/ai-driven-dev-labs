- In a dedicated package, create a new Entity class named Pet. It should have 3 attributes (id, name and ownerName). Define its schema inside data.sql (sql should work for both h2 and mysql)

- Create a PetRepository with a findByName method which returns a single result. Create a PetService and a PetController.

- In petclinic-frontend: Inside petclinic-frontend/src, create a subfolder called `pet`. Generate a service class called petService.ts . It should use axios and allow to connect to this api: http://localhost:8080/swagger-ui/index.html#/pet-controller/ . 

- Inside petclinic-frontend/tests folder, generate a test petService.test.ts which uses jest (import it from package.json if needed). Test should call the API (not mock it) and make sure it receives some result. It only needs one test case (findAll)

- petclinic-frontend: create a new component called PetList.tsx which displays the pet list. App.tsx should use it.

- petclinic-frontend: improve the homepage look and feel. Main colours should be white and dark green. There should be a few icons and oen splash screen. Table should take 60% of the screen on a regular laptop.
