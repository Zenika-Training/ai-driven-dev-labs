# AI Coding Agents Guide

## Overview

This guide provides instructions for AI coding assistants working on the brownfield backend codebase. Follow these conventions to maintain code quality and consistency.

## Architecture Principles

- **Domain-Driven Design**: Organize code by business domain, not technical layers
- **Package Structure**: Use `com.petclinic.{domain}` for all Java classes
- **Single Responsibility**: Keep functions focused on one task

## Coding Conventions

### Entities (JPA)

- No setters (immutable-friendly design)
- Three constructors: empty, all parameters, all parameters except ID
- Use `jakarta.persistence.*` imports (not `javax.persistence.*`)
- Minimal annotations: avoid `@Column` and `@Table` unless necessary
- Prefer `@OneToMany` over `@ManyToOne` relationships
- Keep relationship annotations minimal (no `mappedBy`, `cascade` unless needed)

### Repositories

- Extend `JpaRepository<Entity, Long>`
- No `@Repository` annotation needed (Spring Data JPA provides it)
- Use action verbs: `find`, `save`, `delete` (not `create`, `remove`)

### Services

- Use `@Service` annotation
- Constructor-based dependency injection
- Action verbs: `find`, `save`, `delete` (not `create`, `remove`)
- Single responsibility principle

### Controllers

- Use `@RestController` and `@RequestMapping`
- URL pattern: `/api/v1/{entity}` (e.g., `/api/v1/pet`)
- Avoid `ResponseEntity` unless necessary
- Keep controllers thin - delegate to services

### Testing

- Use JUnit 5 with AssertJ for assertions
- Follow naming: `{ClassName}Test.java` (e.g., `VetServiceTest.java`)
- Structure: Given-When-Then with blank lines between sections
- Integration tests: Use `@SpringBootTest` with embedded database
- Ensure test data doesn't conflict with `data.sql`

## Database

- Schema defined in `src/main/resources/data.sql`
- Use HSQLDB (in-memory)
- Insert data in correct order (respect foreign key constraints)
- Avoid null values in NOT NULL columns

## Refactoring Rules

- **MUST** update existing tests when refactoring
- **MUST** add new tests for new behavior
- Never leave tests broken after refactoring

## Common Tasks

### Adding a New Entity

1. Create entity class in new domain package
2. Create repository interface
3. Create service class
4. Create controller class
5. Update `data.sql` with schema and test data
6. Write unit tests for service logic

### Running the Application

```bash
./mvnw spring-boot:run
```

### Running Tests

```bash
./mvnw test
```

### Building

```bash
./mvnw clean package
```

## API Documentation

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Best Practices

- Follow existing code patterns in the codebase
- Keep methods focused and single-purpose
- Use meaningful variable and method names
- Write tests before making changes (when applicable)
- Ensure all tests pass before committing

## Documentation

- `docs/architecture.md`: Detailed architecture information
- `docs/data-models.md`: Entity and database schema details
- `docs/api-reference.md`: Complete API endpoint documentation
- `docs/development-guide.md`: Setup and development workflows

## Quick Reference

**Entity Pattern:**
```java
@Entity
public class Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String field;
    
    public Entity() {}
    public Entity(Long id, String field) { /* ... */ }
    public Entity(String field) { /* ... */ }
    
    // Getters only
}
```

**Service Pattern:**
```java
@Service
public class EntityService {
    private final EntityRepository repository;
    
    public EntityService(EntityRepository repository) {
        this.repository = repository;
    }
    
    public List<Entity> findAll() { return repository.findAll(); }
    public Entity save(Entity entity) { return repository.save(entity); }
    public void delete(Long id) { repository.deleteById(id); }
}
```

**Controller Pattern:**
```java
@RestController
@RequestMapping("/api/v1/entity")
public class EntityController {
    private final EntityService service;
    
    public EntityController(EntityService service) {
        this.service = service;
    }
    
    @GetMapping
    public List<Entity> findAll() { return service.findAll(); }
    
    @PostMapping
    public Entity save(@RequestBody Entity entity) {
        return service.save(entity);
    }
}
```
