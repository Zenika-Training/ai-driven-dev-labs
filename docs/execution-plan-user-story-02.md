# Part 1 – Pet API (GET endpoints)

## Step 1.1 – Data layer ✅︎
- Verify/create `src/main/resources/data.sql` with the `pet` table schema and seed data
- Create `Pet` entity (`com.petclinic.pet`) with fields `id`, `name`, `ownerName` — no setters, 3 constructors (empty, all-params, all-params-minus-id), `@Entity` with `@GeneratedValue`
- Create `PetRepository` extending `JpaRepository<Pet, Long>` with a derived query method `List<Pet> findByName(String name)`

## Step 1.2 – Service & Controller ✅︎
- Create `PetService` with two methods: `findById(Long id)` and `findByName(String name)`
- Create `PetController` at `/api/v1/pets` exposing:
  - `GET /api/v1/pets/{id}` — find by id
  - `GET /api/v1/pets?name=...` — find by name (returns a list)

# Time to run the application and connect to swagger-ui

# Part 2 – Uniqueness business rule + tests

## Step 2.1 – Business rule
- Add `UNIQUE` constraint on `(owner_name, name)` in `data.sql`
- Add `List<Pet> findByOwnerNameAndName(String ownerName, String name)` to `PetRepository`
- Add `savePet(Pet)` in `PetService` — throws `IllegalArgumentException` if an owner already has a pet with the same name; otherwise saves

## Step 2.2 – Tests
- Create `PetServiceTest.java` (`@SpringBootTest`, JUnit 5, given/when/then style):
  - `shouldFindPetById` — happy path
  - `shouldFindPetsByName` — returns multiple results for a shared name
  - `shouldNotAllowDuplicatePetNameForSameOwner` — saving two pets with the same owner + name throws

# Time to run the unit tests
