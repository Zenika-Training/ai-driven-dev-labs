# Backend Architecture Rules

# Packages 
    - should be split by domain, not layer (we use DDD style)
    - Inside folder 'greenfield-backend' or 'brownfield-backend', always use a subfolder of `com.petclinic` package for new Java classes

# Backend Coding practices
    - as much as possible, functions should be single responsibility. If a function is doing more than one thing, split it into several functions
    - for Repository/Service/Controller, use method action words such as `find`, `save`, `delete`. Do not use 'create' or `remove`

# Refactoring
- When refactoring code, you **MUST** update the existing JUnit tests to ensure they pass and reflect the changes. Never leave tests in a broken state.
- If the refactoring introduces any new behavior, you **MUST** add new tests to cover it.


## Database
- schema should be defined in data.sql
- when having a data creation script inside data.sql, always make sure that data is populated in the right order, so we do not assign null values into columns which are "not null".
- as of now, only use HSQL (test environment is enough)

## For JPA entities
- there should be no setters by default 
- there should be 3 constructors: an empty one, one with all parameters, one with all parameters except the id
- Avoid using @Column and @Table unless really necessary
- When mapping relationships, please do not state explicit attributes unless really needed
- Do not use bidirectional relationships unless really needed
- imports should be jakarta.persistence.* (not javax.persistence.*)
- Whenever possible, use @OneToMany rather than @ManyToOne
- Annotations such as @OneToMany should be minimalistic. Do not use mappedBy, cascade etc unless explicitly stated.

## For Service classes
- Never implement a Service class without a JUnit Test

## For Repository classes
- When using Spring Data JPA, there is no need for @Repository annotation as it is not mandatory

## For Controller classes
- use URL such as /api/v1/ENTITY (eg: /api/v1/pet)
- avoid using ResponseEntity unless really needed

## JUnit tests - what to test
- We should have good coverage of JUnit tests at the service layer. If business rules are simple, do an Integration test (all the way down to in-memory database)
- All complex business rules should be tested with a pure Unit Test (with Mock)
- Only test Repository and Controller if there is something interesting to test

## JUnit tests - Implementation
- All JUnit tests should follow the convention `<ClassName>Test.java`. For instance, the test for VetService should be named `VetServiceTest.java`
- method names: should use `should` and `shouldNot`. Example: shouldFindPetByName
- inside test methods, use the `given/when/then` structure with a blank line between each section
- When asked to generate a JUnit Integration test, you should create a @SpringBootTest with JUnit 5, using an embedded database (H2). 
- when generating test data, make sure there is no conflict with the test data inside data.sql
