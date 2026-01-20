# AI Coding Agents Guide

## Overview

This guide provides concise instructions for AI coding assistants working on the brownfield backend. For detailed information, refer to the comprehensive documentation in the `docs/` folder.

## Quick Reference

### Key Principles
- **Domain-Driven Design**: Organize code by business domain, not technical layers
- **Package Structure**: Use `com.petclinic.{domain}` for all Java classes
- **Single Responsibility**: Keep functions focused on one task

### Coding Conventions

**Entities (JPA)**
- No setters; three constructors (empty, all params, all except ID)
- Use `jakarta.persistence.*` imports (not `javax.persistence.*`)
- Minimal annotations; prefer `@OneToMany` over `@ManyToOne`

**Repositories**
- Extend `JpaRepository<Entity, Long>`; no `@Repository` annotation needed
- Action verbs: `find`, `save`, `delete` (not `create`, `remove`)

**Services**
- Use `@Service` annotation with constructor-based dependency injection
- Action verbs: `find`, `save`, `delete`; single responsibility principle

**Controllers**
- URL pattern: `/api/v1/{entity}`; avoid `ResponseEntity` unless necessary
- Keep controllers thin - delegate to services

**Testing**
- Use JUnit 5 with AssertJ; naming: `{ClassName}Test.java`
- Structure: Given-When-Then with blank lines between sections

### Database
- Schema in `src/main/resources/data.sql`; use HSQLDB (in-memory)
- Insert data in correct order (respect foreign key constraints)

## Detailed Documentation

For comprehensive guides, refer to:
- **[docs/architecture.md](docs/architecture.md)** - DDD architecture, layers, design patterns
- **[docs/api-reference.md](docs/api-reference.md)** - Complete REST API endpoint specifications
- **[docs/data-models.md](docs/data-models.md)** - Entity schemas, relationships, database details
- **[docs/development-guide.md](docs/development-guide.md)** - Setup, testing, build workflows, troubleshooting

## Quick Start

```bash
# Build and run
./mvnw spring-boot:run

# Run tests
./mvnw test

# API Documentation
# http://localhost:8080/swagger-ui.html
```

## Code Templates

**Entity:**
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

**Service:**
```java
@Service
public class EntityService {
    private final EntityRepository repository;
    
    public EntityService(EntityRepository repository) {
        this.repository = repository;
    }
    
    public List<Entity> findAll() { return repository.findAll(); }
    public Entity save(Entity entity) { return repository.save(entity); }
}
```

**Controller:**
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
