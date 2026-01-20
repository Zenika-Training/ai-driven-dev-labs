# API Reference

## Base URL

```
http://localhost:8080/api/v1
```

## General Information

### Response Format
All endpoints return JSON responses.

### Error Handling
- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### CORS
Cross-origin requests are allowed from `http://localhost:5173` (frontend application).

---

## Pet API

**Controller:** [`src/main/java/com/petclinic/pet/PetController.java`](../src/main/java/com/petclinic/pet/PetController.java)  
**Service:** [`src/main/java/com/petclinic/pet/PetService.java`](../src/main/java/com/petclinic/pet/PetService.java)  
**Entity:** [`src/main/java/com/petclinic/pet/Pet.java`](../src/main/java/com/petclinic/pet/Pet.java)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/pet` | Get all pets |
| GET | `/api/v1/pet/{id}` | Get pet by ID |
| POST | `/api/v1/pet` | Create new pet |
| PUT | `/api/v1/pet/{id}` | Update pet |
| DELETE | `/api/v1/pet/{id}` | Delete pet |

**Example Request (Create):**
```json
POST /api/v1/pet
{
  "name": "Max",
  "ownerName": "John Smith"
}
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Max",
  "ownerName": "John Smith"
}
```

---

## Vet API

**Controller:** [`src/main/java/com/petclinic/vet/VetController.java`](../src/main/java/com/petclinic/vet/VetController.java)  
**Service:** [`src/main/java/com/petclinic/vet/VetService.java`](../src/main/java/com/petclinic/vet/VetService.java)  
**Entity:** [`src/main/java/com/petclinic/vet/Vet.java`](../src/main/java/com/petclinic/vet/Vet.java)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/vet` | Get all veterinarians |
| GET | `/api/v1/vet/{id}` | Get vet by ID |
| POST | `/api/v1/vet` | Create new vet |
| PUT | `/api/v1/vet/{id}` | Update vet |
| DELETE | `/api/v1/vet/{id}` | Delete vet |

**Example Request (Create):**
```json
POST /api/v1/vet
{
  "name": "Dr. Sarah Martinez",
  "specialty": "Surgery"
}
```

---

## Visit API

**Controller:** [`src/main/java/com/petclinic/visit/VisitController.java`](../src/main/java/com/petclinic/visit/VisitController.java)  
**Service:** [`src/main/java/com/petclinic/visit/VisitService.java`](../src/main/java/com/petclinic/visit/VisitService.java)  
**Entity:** [`src/main/java/com/petclinic/visit/Visit.java`](../src/main/java/com/petclinic/visit/Visit.java)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/visit` | Get all visits |
| GET | `/api/v1/visit/{id}` | Get visit by ID |
| GET | `/api/v1/visit/pet/{petId}` | Get visits by pet |
| GET | `/api/v1/visit/vet/{vetId}` | Get visits by vet |
| POST | `/api/v1/visit` | Create new visit |
| PUT | `/api/v1/visit/{id}` | Update visit |
| DELETE | `/api/v1/visit/{id}` | Delete visit |

**Example Request (Create):**
```json
POST /api/v1/visit
{
  "dateTime": "2025-12-01T10:00:00",
  "clinic": "Downtown Clinic",
  "summary": "Annual checkup",
  "pet": { "id": 1 },
  "vet": { "id": 2 }
}
```

**Example Response:**
```json
{
  "id": 10,
  "dateTime": "2025-12-01T10:00:00",
  "clinic": "Downtown Clinic",
  "summary": "Annual checkup",
  "pet": {
    "id": 1,
    "name": "Max",
    "ownerName": "John Smith"
  },
  "vet": {
    "id": 2,
    "name": "Dr. James Chen",
    "specialty": "Dentistry"
  }
}
```

---

## Invoice API

**Controller:** [`src/main/java/com/petclinic/invoice/InvoiceController.java`](../src/main/java/com/petclinic/invoice/InvoiceController.java)  
**Service:** [`src/main/java/com/petclinic/invoice/InvoiceService.java`](../src/main/java/com/petclinic/invoice/InvoiceService.java)  
**Entity:** [`src/main/java/com/petclinic/invoice/Invoice.java`](../src/main/java/com/petclinic/invoice/Invoice.java)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/invoice` | Get all invoices |
| GET | `/api/v1/invoice/{id}` | Get invoice by ID |
| GET | `/api/v1/invoice/visit/{visitId}` | Get invoice by visit |
| POST | `/api/v1/invoice` | Create new invoice |
| GET | `/api/v1/invoice/{id}/pdf` | Download invoice as PDF |

**Example Request (Create):**
```json
POST /api/v1/invoice
{
  "invoiceNumber": "INV-2025-010",
  "invoiceDate": "2025-12-01T10:00:00",
  "amount": 200.00,
  "visit": { "id": 10 }
}
```

---

## Common Patterns

### Response Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource successfully created |
| 204 | No Content - Request succeeded, no response body |
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

### Data Validation

All endpoints validate input data:
- Required fields must be present
- Data types must match expectations
- Relationships must reference existing entities

### Best Practices

1. **Check response status codes** before processing data
2. **Handle errors gracefully** with user-friendly messages
3. **Use proper Content-Type headers** (`application/json`)
4. **Test with Swagger UI** before integrating: `http://localhost:8080/swagger-ui.html`

---

## Interactive Documentation

For detailed testing and full API schema:

**Swagger UI:** `http://localhost:8080/swagger-ui.html`  
**OpenAPI Spec:** `http://localhost:8080/v3/api-docs`

## Related Documentation

- [Data Models](data-models.md) - Entity schemas and relationships
- [Architecture](architecture.md) - Controller/Service/Repository patterns
- [Development Guide](development-guide.md) - Running and testing the application
