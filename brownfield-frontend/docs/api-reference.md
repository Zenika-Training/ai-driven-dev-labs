# API Reference (Frontend)

## Overview

This document describes how the frontend interacts with the backend API. All API calls are abstracted into service files to keep components clean.

## Base Configuration

```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

---

## Pet Service

**Location:** [`src/pet/petService.ts`](../src/pet/petService.ts)  
**Component:** [`src/pet/PetDetail.tsx`](../src/pet/PetDetail.tsx)

### Interface

See the complete interface in the source file. Key fields:
```typescript
export interface Pet {
  id?: number;
  name: string;
  ownerName: string;
}
```

### Service Methods

| Method | Description | Backend Endpoint |
|--------|-------------|------------------|
| `findAll()` | Get all pets | `GET /api/v1/pet` |
| `findById(id)` | Get pet by ID | `GET /api/v1/pet/{id}` |
| `save(pet)` | Create new pet | `POST /api/v1/pet` |
| `update(id, pet)` | Update pet | `PUT /api/v1/pet/{id}` |
| `delete(id)` | Delete pet | `DELETE /api/v1/pet/{id}` |

**Example Usage:**
```typescript
const pets = await petService.findAll();
const newPet = await petService.save({ name: 'Buddy', ownerName: 'Jane Doe' });
```

---

## Vet Service

**Location:** [`src/vet/vetService.ts`](../src/vet/vetService.ts)  
**Component:** [`src/vet/VetList.tsx`](../src/vet/VetList.tsx)

### Interface

```typescript
export interface Vet {
  id?: number;
  name: string;
  specialty: string;
}
```

### Service Methods

| Method | Description | Backend Endpoint |
|--------|-------------|------------------|
| `findAll()` | Get all vets | `GET /api/v1/vet` |
| `findById(id)` | Get vet by ID | `GET /api/v1/vet/{id}` |
| `save(vet)` | Create new vet | `POST /api/v1/vet` |
| `update(id, vet)` | Update vet | `PUT /api/v1/vet/{id}` |
| `delete(id)` | Delete vet | `DELETE /api/v1/vet/{id}` |

**Example Usage:**
```typescript
const vets = await vetService.findAll();
```

---

## Visit Service

**Location:** [`src/visit/visitService.ts`](../src/visit/visitService.ts)  
**Components:** [`src/visit/VisitList.tsx`](../src/visit/VisitList.tsx), [`src/visit/VisitDetail.tsx`](../src/visit/VisitDetail.tsx)

### Interface

```typescript
export interface Visit {
  id?: number;
  dateTime: string;      // ISO 8601 format
  clinic: string;
  summary: string;
  pet: Pet;
  vet: Vet;
}
```

### Service Methods

| Method | Description | Backend Endpoint |
|--------|-------------|------------------|
| `findAll()` | Get all visits | `GET /api/v1/visit` |
| `findById(id)` | Get visit by ID | `GET /api/v1/visit/{id}` |
| `findByPetId(petId)` | Get visits by pet | `GET /api/v1/visit/pet/{petId}` |
| `findByVetId(vetId)` | Get visits by vet | `GET /api/v1/visit/vet/{vetId}` |
| `save(visit)` | Create new visit | `POST /api/v1/visit` |
| `update(id, visit)` | Update visit | `PUT /api/v1/visit/{id}` |
| `delete(id)` | Delete visit | `DELETE /api/v1/visit/{id}` |

**Example Usage:**
```typescript
const petVisits = await visitService.findByPetId(1);
```

---

## Invoice Service

**Location:** [`src/invoice/invoiceService.ts`](../src/invoice/invoiceService.ts)  
**Component:** [`src/invoice/InvoiceList.tsx`](../src/invoice/InvoiceList.tsx)

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

### Service Methods

| Method | Description | Backend Endpoint |
|--------|-------------|------------------|
| `findAll()` | Get all invoices | `GET /api/v1/invoice` |
| `findById(id)` | Get invoice by ID | `GET /api/v1/invoice/{id}` |
| `findByVisitId(visitId)` | Get invoice by visit | `GET /api/v1/invoice/visit/{visitId}` |
| `save(invoice)` | Create new invoice | `POST /api/v1/invoice` |
| `downloadPDF(id)` | Download PDF | `GET /api/v1/invoice/{id}/pdf` |

**PDF Download Example:**
```typescript
const blob = await invoiceService.downloadPDF(1);
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'invoice.pdf';
a.click();
```

---

## Common Patterns

### Error Handling

**Service Level** - Services throw errors when API calls fail:
```typescript
async findAll(): Promise<Entity[]> {
  const response = await fetch(`${API_BASE_URL}/entity`);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}
```

**Component Level** - Components catch and handle errors:
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

### Loading States

Always manage loading state for better UX:
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

if (loading) return <div>Loading...</div>;
if (error) return <div className="text-red-500">{error}</div>;
```

### Request Configuration

All POST/PUT requests use:
```typescript
{
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}
```

---

## Best Practices

1. **Always use services** - Never call fetch directly from components
2. **Handle errors gracefully** - Show user-friendly messages
3. **Show loading states** - Improve user experience
4. **Type everything** - Use TypeScript interfaces
5. **Validate before sending** - Check data on client side

---

## Testing Services

### Mock Fetch Example

```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData)
  })
) as jest.Mock;

const pets = await petService.findAll();
expect(pets).toEqual(mockData);
```

---

## Related Documentation

- [Data Models](data-models.md) - TypeScript interfaces and type definitions
- [Architecture](architecture.md) - Service layer patterns
- [Development Guide](development-guide.md) - Running and testing
- [Backend API Reference](../../brownfield-backend/docs/api-reference.md) - Complete endpoint specifications
