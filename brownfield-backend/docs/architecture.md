# Brownfield Backend Architecture

## Overview

The brownfield backend follows a **Domain-Driven Design (DDD)** architecture pattern with a focus on clean separation of concerns and maintainability. This is a Spring Boot application that provides RESTful APIs for the Pet Clinic system.

## Architecture Style

### Domain-Driven Design (DDD)

The application is organized by **domain** rather than by technical layers. Each domain represents a business concept and contains all the code related to that concept.

```
com.petclinic/
├── config/          # Cross-cutting configuration
├── pet/             # Pet domain
│   ├── Pet.java           (Entity)
│   ├── PetRepository.java (Data Access)
│   ├── PetService.java    (Business Logic)
│   └── PetController.java (API Layer)
├── vet/             # Veterinarian domain
├── visit/           # Visit domain
└── invoice/         # Invoice domain
```

## Layers

### 1. Entity Layer (Domain Model)
- **Purpose**: Represents the core business entities
- **Technology**: JPA entities with Jakarta Persistence annotations
- **Characteristics**:
  - No setters (immutable-friendly)
  - Three constructors: empty, all parameters, all except ID
  - Minimal annotations (no @Column, @Table unless necessary)
  - One-to-many relationships preferred over many-to-one

**Example:**
```java
@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String ownerName;
    
    // Constructors, getters only
}
```

### 2. Repository Layer (Data Access)
- **Purpose**: Data access abstraction using Spring Data JPA
- **Technology**: Spring Data JPA repositories
- **Characteristics**:
  - Interface extending JpaRepository
  - No @Repository annotation needed
  - Custom queries when necessary

**Example:**
```java
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByOwnerName(String ownerName);
}
```

### 3. Service Layer (Business Logic)
- **Purpose**: Business logic and orchestration
- **Technology**: Spring @Service components
- **Characteristics**:
  - Use action verbs: find, save, delete (not create, remove)
  - Single responsibility principle
  - Transaction management

**Example:**
```java
@Service
public class PetService {
    private final PetRepository petRepository;
    
    public List<Pet> findAll() { ... }
    public Pet save(Pet pet) { ... }
    public void delete(Long id) { ... }
}
```

### 4. Controller Layer (API)
- **Purpose**: REST API endpoints
- **Technology**: Spring @RestController
- **Characteristics**:
  - URL pattern: `/api/v1/{entity}`
  - Avoid ResponseEntity unless necessary
  - Thin layer delegating to services

**Example:**
```java
@RestController
@RequestMapping("/api/v1/pet")
public class PetController {
    private final PetService petService;
    
    @GetMapping
    public List<Pet> findAll() { ... }
}
```

## Technology Stack

### Core Framework
- **Spring Boot 3.5.7**: Main application framework
- **Java 21**: Programming language with modern features

### Data Layer
- **Spring Data JPA**: Data access abstraction
- **Jakarta Persistence (JPA)**: ORM specification
- **HSQLDB**: In-memory database for development and testing

### API Documentation
- **SpringDoc OpenAPI 3**: Automatic API documentation
- **Swagger UI**: Interactive API explorer

### Additional Libraries
- **OpenPDF**: PDF generation for invoices

## Design Patterns

### 1. Repository Pattern
Abstracts data access logic through Spring Data JPA repositories.

### 2. Service Layer Pattern
Encapsulates business logic in dedicated service classes.

### 3. Dependency Injection
Constructor-based dependency injection for loose coupling.

### 4. DTO Pattern (Minimal)
Entities are used directly as DTOs for simplicity in this brownfield application.

## Configuration

### CORS Configuration
Cross-Origin Resource Sharing is configured to allow requests from the frontend application.

**Location**: `com.petclinic.config.CorsConfig`

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

### Database Configuration
- **Type**: HSQLDB (in-memory)
- **Schema**: Defined in `resources/data.sql`
- **Auto-initialization**: Enabled via Spring Boot
- **Data population**: Test data loaded on startup

## Domain Models

### Core Domains

#### 1. Pet Domain
- **Entity**: Pet
- **Relationships**: One pet can have many visits
- **Business Logic**: Pet management, owner association

#### 2. Vet (Veterinarian) Domain
- **Entity**: Vet
- **Relationships**: One vet can handle many visits
- **Business Logic**: Veterinarian management with specialties

#### 3. Visit Domain
- **Entity**: Visit
- **Relationships**: Many-to-one with Pet and Vet
- **Business Logic**: Visit scheduling, tracking, history

#### 4. Invoice Domain
- **Entity**: Invoice
- **Relationships**: One-to-one with Visit
- **Business Logic**: Invoice generation, PDF export

## Data Flow

```
Client Request
    ↓
Controller (REST API)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Database (HSQLDB)
```

## Testing Strategy

### Unit Tests
- **Target**: Service layer business logic
- **Framework**: JUnit 5
- **Assertions**: AssertJ
- **Structure**: Given-When-Then

### Integration Tests
- **Annotation**: @SpringBootTest
- **Database**: Embedded H2 for testing
- **Coverage**: Full application context tests

### Naming Convention
Test classes follow the pattern: `{ClassName}Test.java`

## Best Practices

### Code Organization
- Package by domain, not by layer
- Keep classes focused and cohesive
- Use meaningful names

### Database Design
- Schema in `data.sql`
- Proper foreign key relationships
- Data insertion in correct order

### API Design
- RESTful conventions
- Consistent URL patterns
- Proper HTTP methods

### Error Handling
- Graceful error responses
- Meaningful error messages
- Proper HTTP status codes

## Security Considerations

Currently, the brownfield application does not implement authentication or authorization. This is a legacy system focused on core functionality.

**Future Enhancements:**
- Spring Security integration
- JWT-based authentication
- Role-based access control

## Performance Considerations

- In-memory database for fast development
- Simple entity relationships to avoid N+1 queries
- Stateless REST API design

## Deployment

The application is packaged as a standalone Spring Boot JAR:

```bash
./mvnw clean package
java -jar target/brownfield-backend-0.0.1-SNAPSHOT.jar
```

## API Documentation Access

Once deployed, API documentation is available at:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
- [Data Models](data-models.md)
- [API Reference](api-reference.md)
- [Development Guide](development-guide.md)
