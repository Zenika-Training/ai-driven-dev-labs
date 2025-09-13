- In a dedicated package, create a new Entity class named Pet. It should have 3 attributes (id, name and ownerName). Define its schema inside data.sql (sql should work for both h2 and mysql). Do the appropriate config inside application.properties

- Create a PetRepository with a findByName method, and create a PetService that calls the PetRepository and only includes find, findAll and save methods

- Create an integration test for PetService that verifies:
  - The service can find a pet by ID or by name
  - That test should be independent from the data created in data.sql

- Create a PetController that calls the PetService

- Expose OpenAPI API: add springdoc-openapi-starter-webmvc-ui dependency inside pom.xml

- In petclinic-frontend: Inside petclinic-frontend/src, create a subfolder called `pet`. Generate a service class called petService.ts . It should use axios and allow to connect to this api: http://localhost:8080/swagger-ui/index.html#/pet-controller/ . Controller is exposed by PetController.java

- Inside petclinic-frontend/tests folder, generate a test petService.test.ts which uses jest (import it from package.json if needed). Test should call the API (not mock it) and make sure it receives some result. It only needs one test case (findAll)

- Inside petclinic-frontend homepage, show the list of pets. Pet List should look like a datatable.

- inside petclinic-backend, add CORS configuration for the frontend to access the backend

- petclinic-frontend: improve the homepage look and feel so it looks better. Especially, it should look good in a web browser.
