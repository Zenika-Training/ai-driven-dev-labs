# Data Models (Frontend)

## Overview

The frontend uses TypeScript interfaces to define data models that correspond to the backend entities. These models ensure type safety and provide clear contracts for API communication.

## Core Interfaces

### Pet

Represents a pet in the system.

```typescript
export interface Pet {
  id?: number;           // Optional: undefined for new pets
  name: string;
  ownerName: string;
}
```

**Usage:**
```typescript
// Creating a new pet (no id)
const newPet: Pet = {
  name: 'Max',
  ownerName: 'John Smith'
};

// Existing pet (with id)
const existingPet: Pet = {
  id: 1,
  name: 'Max',
  ownerName: 'John Smith'
};
```

**API Endpoints:**
- GET `/api/v1/pet` → `Pet[]`
- GET `/api/v1/pet/{id}` → `Pet`
- POST `/api/v1/pet` → `Pet` (accepts Pet without id)
- PUT `/api/v1/pet/{id}` → `Pet`

**Location:** `src/pet/petService.ts`

---

### Vet (Veterinarian)

Represents a veterinarian.

```typescript
export interface Vet {
  id?: number;           // Optional: undefined for new vets
  name: string;
  specialty: string;
}
```

**Specialty Examples:**
- Surgery
- Dentistry
- General Practice
- Cardiology
- Internal Medicine
- Dermatology

**Usage:**
```typescript
const vet: Vet = {
  id: 1,
  name: 'Dr. Sarah Martinez',
  specialty: 'Surgery'
};
```

**API Endpoints:**
- GET `/api/v1/vet` → `Vet[]`
- GET `/api/v1/vet/{id}` → `Vet`
- POST `/api/v1/vet` → `Vet`
- PUT `/api/v1/vet/{id}` → `Vet`

**Location:** `src/vet/vetService.ts`

---

### Visit

Represents a clinic visit for a pet.

```typescript
export interface Visit {
  id?: number;           // Optional: undefined for new visits
  dateTime: string;      // ISO 8601 format
  clinic: string;
  summary: string;
  pet: Pet;              // Nested Pet object
  vet: Vet;              // Nested Vet object
}
```

**Date Format:**
The `dateTime` field uses ISO 8601 format: `YYYY-MM-DDTHH:mm:ss`

Example: `2025-11-15T09:30:00`

**Clinic Locations:**
- Downtown Clinic
- North Branch
- East Side Clinic

**Usage:**
```typescript
const visit: Visit = {
  id: 1,
  dateTime: '2025-11-15T09:30:00',
  clinic: 'Downtown Clinic',
  summary: 'Routine wellness examination. All vital signs normal.',
  pet: {
    id: 1,
    name: 'Max',
    ownerName: 'John Smith'
  },
  vet: {
    id: 1,
    name: 'Dr. Sarah Martinez',
    specialty: 'Surgery'
  }
};
```

**API Endpoints:**
- GET `/api/v1/visit` → `Visit[]`
- GET `/api/v1/visit/{id}` → `Visit`
- GET `/api/v1/visit/pet/{petId}` → `Visit[]`
- GET `/api/v1/visit/vet/{vetId}` → `Visit[]`
- POST `/api/v1/visit` → `Visit`
- PUT `/api/v1/visit/{id}` → `Visit`

**Location:** `src/visit/visitService.ts`

---

### Invoice

Represents an invoice for a visit.

```typescript
export interface Invoice {
  id?: number;                // Optional: undefined for new invoices
  invoiceNumber: string;      // Format: INV-YYYY-###
  invoiceDate: string;        // ISO 8601 format
  amount: number;             // Decimal number (e.g., 150.00)
  visit: Visit;               // Full Visit object with nested Pet and Vet
}
```

**Invoice Number Format:** `INV-{YEAR}-{SEQUENCE}`
- Example: `INV-2025-001`

**Amount:**
- Stored as a number in JavaScript
- Backend uses BigDecimal for precision
- Display with 2 decimal places: `amount.toFixed(2)`

**Usage:**
```typescript
const invoice: Invoice = {
  id: 1,
  invoiceNumber: 'INV-2025-001',
  invoiceDate: '2025-11-15T09:30:00',
  amount: 150.00,
  visit: {
    id: 1,
    dateTime: '2025-11-15T09:30:00',
    clinic: 'Downtown Clinic',
    summary: 'Routine wellness examination.',
    pet: { /* Pet object */ },
    vet: { /* Vet object */ }
  }
};
```

**API Endpoints:**
- GET `/api/v1/invoice` → `Invoice[]`
- GET `/api/v1/invoice/{id}` → `Invoice`
- GET `/api/v1/invoice/visit/{visitId}` → `Invoice`
- POST `/api/v1/invoice` → `Invoice`

**Location:** `src/invoice/invoiceService.ts`

---

## Relationships

### Entity Relationship Diagram

```
Pet (1) ───── (*) Visit (*) ───── (1) Vet
                    │
                   (1)
                    │
                   (1)
                 Invoice
```

### Nested Objects

The API returns nested objects for related entities:

**Visit includes:**
- Full Pet object with all fields
- Full Vet object with all fields

**Invoice includes:**
- Full Visit object which includes:
  - Full Pet object
  - Full Vet object

This eliminates the need for multiple API calls to construct complete data views.

---

## Type Guards

Use type guards to safely check types:

```typescript
function isPet(obj: any): obj is Pet {
  return obj && typeof obj.name === 'string' && typeof obj.ownerName === 'string';
}

function hasId(obj: Pet | Vet | Visit | Invoice): obj is Required<Pet> {
  return obj.id !== undefined;
}
```

---

## Partial Types

For updates, you might use partial types:

```typescript
type PartialPet = Partial<Pet> & { id: number };

const update: PartialPet = {
  id: 1,
  name: 'Max Updated'  // ownerName is optional
};
```

---

## Validation

### Client-Side Validation

```typescript
function validatePet(pet: Pet): string[] {
  const errors: string[] = [];
  
  if (!pet.name || pet.name.trim() === '') {
    errors.push('Pet name is required');
  }
  
  if (!pet.ownerName || pet.ownerName.trim() === '') {
    errors.push('Owner name is required');
  }
  
  return errors;
}
```

### Required Fields

| Entity  | Required Fields                           |
|---------|-------------------------------------------|
| Pet     | name, ownerName                           |
| Vet     | name, specialty                           |
| Visit   | dateTime, clinic, summary, pet, vet       |
| Invoice | invoiceNumber, invoiceDate, amount, visit |

---

## Date Handling

### Parsing Dates

```typescript
const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleString(); // Browser locale format
};

const formatDate = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString(); // Date only
};

const formatTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString(); // Time only
};
```

### Creating Date Strings

```typescript
const now = new Date();
const isoString = now.toISOString(); // "2025-11-15T09:30:00.000Z"

// Remove milliseconds and Z for backend compatibility
const dateTime = isoString.slice(0, 19); // "2025-11-15T09:30:00"
```

---

## Formatting Utilities

### Currency Formatting

```typescript
const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Usage
formatAmount(150);    // "$150.00"
formatAmount(150.5);  // "$150.50"
```

### Display Names

```typescript
const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

const getVetDisplayName = (vet: Vet): string => {
  return vet.name; // Already includes title (e.g., "Dr. Sarah Martinez")
};
```

---

## API Response Handling

### Success Response

```typescript
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
const data: Pet[] = await response.json();
```

### Error Response

```typescript
try {
  const data = await petService.findAll();
  setPets(data);
} catch (error) {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('An unknown error occurred');
  }
}
```

---

## State Management Types

### Component State

```typescript
const [pets, setPets] = useState<Pet[]>([]);
const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
```

### Form State

```typescript
interface PetFormData {
  name: string;
  ownerName: string;
}

const [formData, setFormData] = useState<PetFormData>({
  name: '',
  ownerName: ''
});
```

---

## Common Patterns

### Optional Chaining

```typescript
const vetName = visit.vet?.name ?? 'Unassigned';
const petName = visit?.pet?.name;
```

### Array Operations

```typescript
// Filter visits by clinic
const downtownVisits = visits.filter(v => v.clinic === 'Downtown Clinic');

// Map to display format
const petNames = pets.map(p => p.name);

// Find specific pet
const pet = pets.find(p => p.id === 1);

// Sort by name
const sortedVets = [...vets].sort((a, b) => a.name.localeCompare(b.name));
```

### Destructuring

```typescript
const { id, name, ownerName } = pet;

const { dateTime, clinic, pet: visitPet, vet } = visit;
```

---

## Testing Data

### Mock Data

```typescript
const mockPet: Pet = {
  id: 1,
  name: 'Test Pet',
  ownerName: 'Test Owner'
};

const mockVet: Vet = {
  id: 1,
  name: 'Dr. Test',
  specialty: 'Testing'
};

const mockVisit: Visit = {
  id: 1,
  dateTime: '2025-01-01T10:00:00',
  clinic: 'Test Clinic',
  summary: 'Test summary',
  pet: mockPet,
  vet: mockVet
};
```

---

## TypeScript Configuration

The project uses strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedParameters": true
  }
}
```

This ensures:
- No implicit `any` types
- Null safety with explicit checks
- Catch unused variables
- Full type safety throughout

---

## Best Practices

1. **Always define interfaces** for data structures
2. **Use optional properties** (`?`) for fields that might be undefined
3. **Validate data** on the client side before sending to API
4. **Handle null/undefined** with optional chaining and nullish coalescing
5. **Format dates consistently** using utility functions
6. **Type component props** with interfaces
7. **Use TypeScript strict mode** for maximum type safety
8. **Export types** from service files for reuse

---

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Backend Data Models](../../brownfield-backend/docs/data-models.md)
