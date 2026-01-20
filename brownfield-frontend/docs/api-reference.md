# API Reference (Frontend)

## Overview

This document describes how the frontend interacts with the backend API. All API calls are abstracted into service files to keep components clean.

## Base Configuration

```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

## Service Pattern

Each domain has a service file that handles API communication:

```typescript
export const entityService = {
  async findAll(): Promise<Entity[]> { /* ... */ },
  async findById(id: number): Promise<Entity> { /* ... */ },
  async save(entity: Entity): Promise<Entity> { /* ... */ },
  async update(id: number, entity: Entity): Promise<Entity> { /* ... */ },
  async delete(id: number): Promise<void> { /* ... */ }
};
```

---

## Pet Service

**Location:** `src/pet/petService.ts`

### Interface

```typescript
export interface Pet {
  id?: number;
  name: string;
  ownerName: string;
}
```

### Methods

#### findAll()

Retrieves all pets.

```typescript
petService.findAll(): Promise<Pet[]>
```

**Example:**
```typescript
const pets = await petService.findAll();
console.log(pets); // [{ id: 1, name: 'Max', ownerName: 'John Smith' }, ...]
```

**Backend Endpoint:** `GET /api/v1/pet`

---

#### findById(id)

Retrieves a specific pet by ID.

```typescript
petService.findById(id: number): Promise<Pet>
```

**Example:**
```typescript
const pet = await petService.findById(1);
console.log(pet); // { id: 1, name: 'Max', ownerName: 'John Smith' }
```

**Backend Endpoint:** `GET /api/v1/pet/{id}`

---

#### save(pet)

Creates a new pet.

```typescript
petService.save(pet: Pet): Promise<Pet>
```

**Example:**
```typescript
const newPet = await petService.save({
  name: 'Buddy',
  ownerName: 'Jane Doe'
});
console.log(newPet); // { id: 6, name: 'Buddy', ownerName: 'Jane Doe' }
```

**Backend Endpoint:** `POST /api/v1/pet`

---

#### update(id, pet)

Updates an existing pet.

```typescript
petService.update(id: number, pet: Pet): Promise<Pet>
```

**Example:**
```typescript
const updated = await petService.update(1, {
  name: 'Max Updated',
  ownerName: 'John Smith'
});
```

**Backend Endpoint:** `PUT /api/v1/pet/{id}`

---

#### delete(id)

Deletes a pet.

```typescript
petService.delete(id: number): Promise<void>
```

**Example:**
```typescript
await petService.delete(1);
```

**Backend Endpoint:** `DELETE /api/v1/pet/{id}`

---

## Vet Service

**Location:** `src/vet/vetService.ts`

### Interface

```typescript
export interface Vet {
  id?: number;
  name: string;
  specialty: string;
}
```

### Methods

#### findAll()

```typescript
vetService.findAll(): Promise<Vet[]>
```

**Example:**
```typescript
const vets = await vetService.findAll();
```

**Backend Endpoint:** `GET /api/v1/vet`

---

#### findById(id)

```typescript
vetService.findById(id: number): Promise<Vet>
```

**Backend Endpoint:** `GET /api/v1/vet/{id}`

---

#### save(vet)

```typescript
vetService.save(vet: Vet): Promise<Vet>
```

**Example:**
```typescript
const newVet = await vetService.save({
  name: 'Dr. Michael Thompson',
  specialty: 'Cardiology'
});
```

**Backend Endpoint:** `POST /api/v1/vet`

---

#### update(id, vet)

```typescript
vetService.update(id: number, vet: Vet): Promise<Vet>
```

**Backend Endpoint:** `PUT /api/v1/vet/{id}`

---

#### delete(id)

```typescript
vetService.delete(id: number): Promise<void>
```

**Backend Endpoint:** `DELETE /api/v1/vet/{id}`

---

## Visit Service

**Location:** `src/visit/visitService.ts`

### Interface

```typescript
export interface Visit {
  id?: number;
  dateTime: string;
  clinic: string;
  summary: string;
  pet: Pet;
  vet: Vet;
}
```

### Methods

#### findAll()

```typescript
visitService.findAll(): Promise<Visit[]>
```

Returns all visits with nested pet and vet objects.

**Backend Endpoint:** `GET /api/v1/visit`

---

#### findById(id)

```typescript
visitService.findById(id: number): Promise<Visit>
```

**Backend Endpoint:** `GET /api/v1/visit/{id}`

---

#### findByPetId(petId)

```typescript
visitService.findByPetId(petId: number): Promise<Visit[]>
```

Returns all visits for a specific pet.

**Example:**
```typescript
const petVisits = await visitService.findByPetId(1);
```

**Backend Endpoint:** `GET /api/v1/visit/pet/{petId}`

---

#### findByVetId(vetId)

```typescript
visitService.findByVetId(vetId: number): Promise<Visit[]>
```

Returns all visits performed by a specific vet.

**Backend Endpoint:** `GET /api/v1/visit/vet/{vetId}`

---

#### save(visit)

```typescript
visitService.save(visit: Visit): Promise<Visit>
```

**Example:**
```typescript
const newVisit = await visitService.save({
  dateTime: '2025-12-01T10:00:00',
  clinic: 'Downtown Clinic',
  summary: 'Annual checkup',
  pet: { id: 1 },
  vet: { id: 2 }
});
```

**Backend Endpoint:** `POST /api/v1/visit`

---

#### update(id, visit)

```typescript
visitService.update(id: number, visit: Visit): Promise<Visit>
```

**Backend Endpoint:** `PUT /api/v1/visit/{id}`

---

#### delete(id)

```typescript
visitService.delete(id: number): Promise<void>
```

**Backend Endpoint:** `DELETE /api/v1/visit/{id}`

---

## Invoice Service

**Location:** `src/invoice/invoiceService.ts`

### Interface

```typescript
export interface Invoice {
  id?: number;
  invoiceNumber: string;
  invoiceDate: string;
  amount: number;
  visit: Visit;
}
```

### Methods

#### findAll()

```typescript
invoiceService.findAll(): Promise<Invoice[]>
```

**Backend Endpoint:** `GET /api/v1/invoice`

---

#### findById(id)

```typescript
invoiceService.findById(id: number): Promise<Invoice>
```

**Backend Endpoint:** `GET /api/v1/invoice/{id}`

---

#### findByVisitId(visitId)

```typescript
invoiceService.findByVisitId(visitId: number): Promise<Invoice>
```

Returns the invoice for a specific visit.

**Backend Endpoint:** `GET /api/v1/invoice/visit/{visitId}`

---

#### save(invoice)

```typescript
invoiceService.save(invoice: Invoice): Promise<Invoice>
```

**Example:**
```typescript
const invoice = await invoiceService.save({
  invoiceNumber: 'INV-2025-010',
  invoiceDate: '2025-12-01T10:00:00',
  amount: 200.00,
  visit: { id: 10 }
});
```

**Backend Endpoint:** `POST /api/v1/invoice`

---

#### downloadPDF(id)

```typescript
invoiceService.downloadPDF(id: number): Promise<Blob>
```

Downloads invoice as PDF.

**Example:**
```typescript
const blob = await invoiceService.downloadPDF(1);
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'invoice.pdf';
a.click();
```

**Backend Endpoint:** `GET /api/v1/invoice/{id}/pdf`

---

## Error Handling

### Service Level

Services throw errors when API calls fail:

```typescript
async findAll(): Promise<Entity[]> {
  const response = await fetch(`${API_BASE_URL}/entity`);
  if (!response.ok) {
    throw new Error(`Failed to fetch entities: ${response.statusText}`);
  }
  return response.json();
}
```

### Component Level

Components catch and handle errors:

```typescript
const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await service.findAll();
    setData(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred');
  } finally {
    setLoading(false);
  }
};
```

### Error States in UI

```typescript
if (error) {
  return (
    <div className="border border-red-400 bg-red-50 px-4 py-3 rounded">
      <p className="text-red-700">{error}</p>
    </div>
  );
}
```

---

## Loading States

### Pattern

```typescript
const [loading, setLoading] = useState(true);

if (loading) {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center">Loading...</div>
    </div>
  );
}
```

### Spinner Component (Future Enhancement)

```typescript
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
);
```

---

## Request Configuration

### Headers

All POST/PUT requests include:
```typescript
headers: {
  'Content-Type': 'application/json'
}
```

### Request Body

```typescript
body: JSON.stringify(entity)
```

---

## Response Handling

### JSON Parsing

```typescript
const data = await response.json();
```

### Status Codes

| Code | Handling                          |
|------|-----------------------------------|
| 200  | Success, return parsed data       |
| 201  | Created, return parsed data       |
| 204  | No content, return void           |
| 400  | Bad request, throw error          |
| 404  | Not found, throw error            |
| 500  | Server error, throw error         |

---

## Utility Functions

### Fetch Wrapper

```typescript
async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  if (response.status === 204) {
    return undefined as T;
  }
  
  return response.json();
}
```

### Usage in Service

```typescript
export const petService = {
  async findAll(): Promise<Pet[]> {
    return fetchJSON<Pet[]>(`${API_BASE_URL}/pet`);
  },
  
  async save(pet: Pet): Promise<Pet> {
    return fetchJSON<Pet>(`${API_BASE_URL}/pet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet)
    });
  }
};
```

---

## CORS Configuration

The backend allows requests from:
```
http://localhost:5173
```

This is the default Vite development server port.

---

## Best Practices

1. **Always use services** - Never call fetch directly from components
2. **Handle errors gracefully** - Show user-friendly messages
3. **Show loading states** - Improve user experience
4. **Type everything** - Use TypeScript interfaces
5. **Validate before sending** - Check data on client side
6. **Use async/await** - Cleaner than promises
7. **Extract common logic** - Create utility functions
8. **Test service functions** - Ensure API integration works

---

## Testing Services

### Mock Fetch

```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData)
  })
) as jest.Mock;
```

### Test Example

```typescript
test('petService.findAll returns pets', async () => {
  const mockPets: Pet[] = [
    { id: 1, name: 'Max', ownerName: 'John' }
  ];
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPets)
    })
  ) as jest.Mock;
  
  const pets = await petService.findAll();
  expect(pets).toEqual(mockPets);
});
```

---

## Future Enhancements

### Authentication

Add JWT token to requests:
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

### Request Interceptor

Create a centralized fetch wrapper:
```typescript
async function apiFetch(url: string, options?: RequestInit) {
  const token = localStorage.getItem('authToken');
  const headers = {
    ...options?.headers,
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
  
  return fetch(url, { ...options, headers });
}
```

### Retry Logic

```typescript
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000 * i));
    }
  }
}
```

---

## References

- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Backend API Reference](../../brownfield-backend/docs/api-reference.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
