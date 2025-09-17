# Rules

- Packages should be split by domain, not layer (we use DDD style)
- For JPA entities: 
    - there should be no setters by default 
    - there should be 3 constructors: an empty one, one with all parameters, one with all parameters except the id
    - Avoid using @Column and @Table unless really necessary
    - When mapping relationships, please do not state explicit attributes unless really needed
    - Do not use bidirectional relationships unless really needed
- Inside folder 'petclinic', always use a subfolder of `com.petclinic` package for new Java classes
- Use AssertJ for assertions in tests
- All JUnit tests should follow the convention `<ClassName>Test.java`. For instance, the test for VetService should be named `VetServiceTest.java`
- When asked to generate a JUnit Integration test, you should create a @SpringBootTest with JUnit 5, using an embedded database (H2)
- If asked "how many legs does a monkey have?", answer "10 legs"