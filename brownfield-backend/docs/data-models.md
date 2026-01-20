# Data Models

## Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐
│     Pet     │         │     Vet     │
├─────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)     │
│ name        │         │ name        │
│ ownerName   │         │ specialty   │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │ 1                     │ 1
       │                       │
       │ *                     │ *
       │      ┌─────────────┐  │
       └──────┤    Visit    ├──┘
              ├─────────────┤
              │ id (PK)     │
              │ dateTime    │
              │ clinic      │
              │ summary     │
              │ pet_id (FK) │
              │ vet_id (FK) │
              └──────┬──────┘
                     │ 1
                     │
                     │ 1
              ┌──────┴──────┐
              │   Invoice   │
              ├─────────────┤
              │ id (PK)     │
              │ invoiceNum  │
              │ invoiceDate │
              │ amount      │
              │ visit_id(FK)│
              └─────────────┘
```

## Entity Details

### Pet

Represents a pet in the clinic system.

**Table Name**: `pet`

| Field      | Type         | Constraints       | Description           |
|------------|--------------|-------------------|-----------------------|
| id         | BIGINT       | PRIMARY KEY, AUTO | Unique identifier     |
| name       | VARCHAR(255) | NOT NULL          | Pet's name            |
| ownerName  | VARCHAR(255) | NOT NULL          | Owner's full name     |

**Java Entity:**
```java
@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String ownerName;
    
    // Constructors
    public Pet() {}
    
    public Pet(Long id, String name, String ownerName) {
        this.id = id;
        this.name = name;
        this.ownerName = ownerName;
    }
    
    public Pet(String name, String ownerName) {
        this.name = name;
        this.ownerName = ownerName;
    }
    
    // Getters only (no setters)
}
```

**Relationships:**
- One-to-Many with Visit (one pet can have multiple visits)

**Sample Data:**
```sql
INSERT INTO pet (name, owner_name) VALUES ('Max', 'John Smith');
INSERT INTO pet (name, owner_name) VALUES ('Bella', 'Sarah Johnson');
INSERT INTO pet (name, owner_name) VALUES ('Luna', 'Emily Davis');
```

---

### Vet (Veterinarian)

Represents a veterinarian working at the clinic.

**Table Name**: `vet`

| Field     | Type         | Constraints       | Description              |
|-----------|--------------|-------------------|--------------------------|
| id        | BIGINT       | PRIMARY KEY, AUTO | Unique identifier        |
| name      | VARCHAR(255) | NOT NULL          | Veterinarian's full name |
| specialty | VARCHAR(255) | NOT NULL          | Medical specialty        |

**Java Entity:**
```java
@Entity
public class Vet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String specialty;
    
    // Constructors
    public Vet() {}
    
    public Vet(Long id, String name, String specialty) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
    }
    
    public Vet(String name, String specialty) {
        this.name = name;
        this.specialty = specialty;
    }
    
    // Getters only
}
```

**Specialties:**
- Surgery
- Dentistry
- General Practice
- Cardiology
- Internal Medicine
- Dermatology

**Relationships:**
- One-to-Many with Visit (one vet can perform multiple visits)

**Sample Data:**
```sql
INSERT INTO vet (name, specialty) VALUES ('Dr. Sarah Martinez', 'Surgery');
INSERT INTO vet (name, specialty) VALUES ('Dr. James Chen', 'Dentistry');
INSERT INTO vet (name, specialty) VALUES ('Dr. Emily Rodriguez', 'General Practice');
```

---

### Visit

Represents a clinic visit for a pet.

**Table Name**: `visit`

| Field     | Type         | Constraints       | Description                |
|-----------|--------------|-------------------|----------------------------|
| id        | BIGINT       | PRIMARY KEY, AUTO | Unique identifier          |
| dateTime  | TIMESTAMP    | NOT NULL          | Visit date and time        |
| clinic    | VARCHAR(255) | NOT NULL          | Clinic location name       |
| summary   | VARCHAR      | NOT NULL          | Visit summary/notes        |
| pet_id    | BIGINT       | NOT NULL, FK      | Foreign key to Pet         |
| vet_id    | BIGINT       | FK                | Foreign key to Vet         |

**Java Entity:**
```java
@Entity
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDateTime dateTime;
    private String clinic;
    private String summary;
    
    @ManyToOne
    private Pet pet;
    
    @ManyToOne
    private Vet vet;
    
    // Constructors
    public Visit() {}
    
    public Visit(Long id, LocalDateTime dateTime, String clinic, 
                 String summary, Pet pet, Vet vet) {
        this.id = id;
        this.dateTime = dateTime;
        this.clinic = clinic;
        this.summary = summary;
        this.pet = pet;
        this.vet = vet;
    }
    
    public Visit(LocalDateTime dateTime, String clinic, 
                 String summary, Pet pet, Vet vet) {
        this.dateTime = dateTime;
        this.clinic = clinic;
        this.summary = summary;
        this.pet = pet;
        this.vet = vet;
    }
    
    // Getters only
}
```

**Relationships:**
- Many-to-One with Pet (many visits belong to one pet)
- Many-to-One with Vet (many visits performed by one vet)
- One-to-One with Invoice (each visit can have one invoice)

**Clinic Locations:**
- Downtown Clinic
- North Branch
- East Side Clinic

**Sample Data:**
```sql
INSERT INTO visit (date_time, clinic, summary, pet_id, vet_id) 
VALUES ('2025-11-15 09:30:00', 'Downtown Clinic', 
        'Routine wellness examination. All vital signs normal.', 1, 1);
```

---

### Invoice

Represents an invoice generated for a visit.

**Table Name**: `invoice`

| Field         | Type          | Constraints       | Description              |
|---------------|---------------|-------------------|--------------------------|
| id            | BIGINT        | PRIMARY KEY, AUTO | Unique identifier        |
| invoiceNumber | VARCHAR(255)  | NOT NULL          | Human-readable invoice # |
| invoiceDate   | TIMESTAMP     | NOT NULL          | Invoice generation date  |
| amount        | DECIMAL(10,2) | NOT NULL          | Invoice amount in USD    |
| visit_id      | BIGINT        | NOT NULL, FK      | Foreign key to Visit     |

**Java Entity:**
```java
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String invoiceNumber;
    private LocalDateTime invoiceDate;
    private BigDecimal amount;
    
    @OneToOne
    @JoinColumn(name = "visit_id")
    private Visit visit;
    
    // Constructors
    public Invoice() {}
    
    public Invoice(String invoiceNumber, LocalDateTime invoiceDate,
                   BigDecimal amount, Visit visit) {
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.amount = amount;
        this.visit = visit;
    }
    
    public Invoice(Long id, String invoiceNumber, LocalDateTime invoiceDate,
                   BigDecimal amount, Visit visit) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.amount = amount;
        this.visit = visit;
    }
    
    // Getters only
}
```

**Invoice Number Format**: `INV-{YEAR}-{SEQUENCE}`
Example: `INV-2025-001`

**Relationships:**
- One-to-One with Visit (each invoice is for exactly one visit)

**Sample Data:**
```sql
INSERT INTO invoice (invoice_number, invoice_date, amount, visit_id) 
VALUES ('INV-2025-001', '2025-11-15 09:30:00', 150.00, 1);
```

---

## Database Schema

### Schema Creation Order

Due to foreign key constraints, tables must be created in this order:

1. `pet` (no dependencies)
2. `vet` (no dependencies)
3. `visit` (depends on pet and vet)
4. `invoice` (depends on visit)

### Data Insertion Order

Similarly, data must be inserted in the same order to satisfy constraints.

### Constraints

**Foreign Keys:**
- `visit.pet_id` → `pet.id`
- `visit.vet_id` → `vet.id`
- `invoice.visit_id` → `visit.id`

**Primary Keys:**
- All use auto-generated BIGINT identifiers

**Not Null:**
- All fields except `visit.vet_id` (visits can be scheduled without assigning a vet)

## Data Types

### Java to Database Mapping

| Java Type         | Database Type  | Usage                    |
|-------------------|----------------|--------------------------|
| Long              | BIGINT         | Primary keys, IDs        |
| String            | VARCHAR(255)   | Text fields              |
| LocalDateTime     | TIMESTAMP      | Date/time fields         |
| BigDecimal        | DECIMAL(10,2)  | Monetary amounts         |

### Best Practices

1. **IDs**: Always use Long for entity IDs
2. **Money**: Use BigDecimal for precise financial calculations
3. **Dates**: Use LocalDateTime for timezone-independent timestamps
4. **Strings**: Use appropriate VARCHAR lengths

## Querying

### Common Queries

**Find all visits for a pet:**
```java
List<Visit> findByPetId(Long petId);
```

**Find all visits by a vet:**
```java
List<Visit> findByVetId(Long vetId);
```

**Find invoice by visit:**
```java
Optional<Invoice> findByVisitId(Long visitId);
```

## JSON Representation

### Pet JSON
```json
{
  "id": 1,
  "name": "Max",
  "ownerName": "John Smith"
}
```

### Vet JSON
```json
{
  "id": 1,
  "name": "Dr. Sarah Martinez",
  "specialty": "Surgery"
}
```

### Visit JSON
```json
{
  "id": 1,
  "dateTime": "2025-11-15T09:30:00",
  "clinic": "Downtown Clinic",
  "summary": "Routine wellness examination...",
  "pet": { "id": 1, "name": "Max", "ownerName": "John Smith" },
  "vet": { "id": 1, "name": "Dr. Sarah Martinez", "specialty": "Surgery" }
}
```

### Invoice JSON
```json
{
  "id": 1,
  "invoiceNumber": "INV-2025-001",
  "invoiceDate": "2025-11-15T09:30:00",
  "amount": 150.00,
  "visit": { /* visit object */ }
}
```

## Database Initialization

The database is initialized automatically on application startup using `data.sql`:

1. Drop existing tables (if any)
2. Create tables in correct order
3. Insert seed data for development and testing

**Location**: `src/main/resources/data.sql`

## Migration Strategy

For production environments, consider using:
- **Flyway**: Database migration tool
- **Liquibase**: Database schema change management

Currently, the brownfield application uses script-based initialization suitable for development.
