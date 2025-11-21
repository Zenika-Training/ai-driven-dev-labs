# Backend Architecture Rules

# Packages 
    - should be split by domain, not layer (we use DDD style)
    - Inside folder 'greenfield-backend' or 'brownfield-backend', always use a subfolder of `com.petclinic` package for new Java classes

# Backend Coding practices
    - as much as possible, functions should be single responsibility. If a function is doing more than one thing, split it into several functions
    - for Repository/Service/Controller, use method action words such as `find`, `save`, `delete`. Do not use 'create' or `remove`

## Database
- schema should be defined in data.sql
- as of now, only use HSQL (test environment is enough)

## For JPA entities
- there should be no setters by default 
- there should be 3 constructors: an empty one, one with all parameters, one with all parameters except the id
- Avoid using @Column and @Table unless really necessary
- When mapping relationships, please do not state explicit attributes unless really needed
- Do not use bidirectional relationships unless really needed
- imports should be jakarta.persistence.* (not javax.persistence.*)

## For Controllers
- use URL such as /api/v1/ENTITY (eg: /api/v1/pet)
- avoid using ResponseEntity unless really needed

## JUnit tests
- Use AssertJ for assertions in tests
- All JUnit tests should follow the convention `<ClassName>Test.java`. For instance, the test for VetService should be named `VetServiceTest.java`
- inside test methods, use the `given/when/then` structure with a blank line between each section
- When asked to generate a JUnit Integration test, you should create a @SpringBootTest with JUnit 5, using an embedded database (H2). 
- when generating test data, make sure there is no conflict with the test data inside data.sql
