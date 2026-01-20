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

### Get All Pets

**Endpoint:** `GET /api/v1/pet`

**Description:** Retrieves a list of all pets in the system.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Max",
    "ownerName": "John Smith"
  },
  {
    "id": 2,
    "name": "Bella",
    "ownerName": "Sarah Johnson"
  }
]
```

---

### Get Pet by ID

**Endpoint:** `GET /api/v1/pet/{id}`

**Description:** Retrieves a specific pet by its ID.

**Path Parameters:**
- `id` (required): Pet ID (Long)

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Max",
  "ownerName": "John Smith"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Pet not found"
}
```

---

### Create Pet

**Endpoint:** `POST /api/v1/pet`

**Description:** Creates a new pet in the system.

**Request Body:**
```json
{
  "name": "Charlie",
  "ownerName": "Michael Brown"
}
```

**Response:** `201 Created`
```json
{
  "id": 3,
  "name": "Charlie",
  "ownerName": "Michael Brown"
}
```

---

### Update Pet

**Endpoint:** `PUT /api/v1/pet/{id}`

**Description:** Updates an existing pet.

**Path Parameters:**
- `id` (required): Pet ID (Long)

**Request Body:**
```json
{
  "name": "Max Updated",
  "ownerName": "John Smith"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Max Updated",
  "ownerName": "John Smith"
}
```

---

### Delete Pet

**Endpoint:** `DELETE /api/v1/pet/{id}`

**Description:** Deletes a pet from the system.

**Path Parameters:**
- `id` (required): Pet ID (Long)

**Response:** `204 No Content`

---

## Vet API

### Get All Vets

**Endpoint:** `GET /api/v1/vet`

**Description:** Retrieves a list of all veterinarians.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Dr. Sarah Martinez",
    "specialty": "Surgery"
  },
  {
    "id": 2,
    "name": "Dr. James Chen",
    "specialty": "Dentistry"
  }
]
```

---

### Get Vet by ID

**Endpoint:** `GET /api/v1/vet/{id}`

**Description:** Retrieves a specific veterinarian by ID.

**Path Parameters:**
- `id` (required): Vet ID (Long)

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Dr. Sarah Martinez",
  "specialty": "Surgery"
}
```

---

### Create Vet

**Endpoint:** `POST /api/v1/vet`

**Description:** Creates a new veterinarian.

**Request Body:**
```json
{
  "name": "Dr. Michael Thompson",
  "specialty": "Cardiology"
}
```

**Response:** `201 Created`
```json
{
  "id": 5,
  "name": "Dr. Michael Thompson",
  "specialty": "Cardiology"
}
```

---

### Update Vet

**Endpoint:** `PUT /api/v1/vet/{id}`

**Description:** Updates an existing veterinarian.

**Path Parameters:**
- `id` (required): Vet ID (Long)

**Request Body:**
```json
{
  "name": "Dr. Sarah Martinez-Smith",
  "specialty": "Surgery"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Dr. Sarah Martinez-Smith",
  "specialty": "Surgery"
}
```

---

### Delete Vet

**Endpoint:** `DELETE /api/v1/vet/{id}`

**Description:** Deletes a veterinarian from the system.

**Path Parameters:**
- `id` (required): Vet ID (Long)

**Response:** `204 No Content`

---

## Visit API

### Get All Visits

**Endpoint:** `GET /api/v1/visit`

**Description:** Retrieves a list of all visits.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "dateTime": "2025-11-15T09:30:00",
    "clinic": "Downtown Clinic",
    "summary": "Routine wellness examination. All vital signs normal.",
    "pet": {
      "id": 1,
      "name": "Max",
      "ownerName": "John Smith"
    },
    "vet": {
      "id": 1,
      "name": "Dr. Sarah Martinez",
      "specialty": "Surgery"
    }
  }
]
```

---

### Get Visit by ID

**Endpoint:** `GET /api/v1/visit/{id}`

**Description:** Retrieves a specific visit by ID.

**Path Parameters:**
- `id` (required): Visit ID (Long)

**Response:** `200 OK`
```json
{
  "id": 1,
  "dateTime": "2025-11-15T09:30:00",
  "clinic": "Downtown Clinic",
  "summary": "Routine wellness examination. All vital signs normal.",
  "pet": {
    "id": 1,
    "name": "Max",
    "ownerName": "John Smith"
  },
  "vet": {
    "id": 1,
    "name": "Dr. Sarah Martinez",
    "specialty": "Surgery"
  }
}
```

---

### Get Visits by Pet

**Endpoint:** `GET /api/v1/visit/pet/{petId}`

**Description:** Retrieves all visits for a specific pet.

**Path Parameters:**
- `petId` (required): Pet ID (Long)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "dateTime": "2025-11-15T09:30:00",
    "clinic": "Downtown Clinic",
    "summary": "Routine wellness examination.",
    "pet": { /* pet object */ },
    "vet": { /* vet object */ }
  }
]
```

---

### Get Visits by Vet

**Endpoint:** `GET /api/v1/visit/vet/{vetId}`

**Description:** Retrieves all visits performed by a specific veterinarian.

**Path Parameters:**
- `vetId` (required): Vet ID (Long)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "dateTime": "2025-11-15T09:30:00",
    "clinic": "Downtown Clinic",
    "summary": "Routine wellness examination.",
    "pet": { /* pet object */ },
    "vet": { /* vet object */ }
  }
]
```

---

### Create Visit

**Endpoint:** `POST /api/v1/visit`

**Description:** Creates a new visit record.

**Request Body:**
```json
{
  "dateTime": "2025-12-01T10:00:00",
  "clinic": "Downtown Clinic",
  "summary": "Annual checkup and vaccinations",
  "pet": {
    "id": 1
  },
  "vet": {
    "id": 2
  }
}
```

**Response:** `201 Created`
```json
{
  "id": 10,
  "dateTime": "2025-12-01T10:00:00",
  "clinic": "Downtown Clinic",
  "summary": "Annual checkup and vaccinations",
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

### Update Visit

**Endpoint:** `PUT /api/v1/visit/{id}`

**Description:** Updates an existing visit.

**Path Parameters:**
- `id` (required): Visit ID (Long)

**Request Body:**
```json
{
  "dateTime": "2025-12-01T10:30:00",
  "clinic": "North Branch",
  "summary": "Updated summary",
  "pet": {
    "id": 1
  },
  "vet": {
    "id": 2
  }
}
```

**Response:** `200 OK`

---

### Delete Visit

**Endpoint:** `DELETE /api/v1/visit/{id}`

**Description:** Deletes a visit record.

**Path Parameters:**
- `id` (required): Visit ID (Long)

**Response:** `204 No Content`

---

## Invoice API

### Get All Invoices

**Endpoint:** `GET /api/v1/invoice`

**Description:** Retrieves a list of all invoices.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "invoiceNumber": "INV-2025-001",
    "invoiceDate": "2025-11-15T09:30:00",
    "amount": 150.00,
    "visit": {
      "id": 1,
      "dateTime": "2025-11-15T09:30:00",
      "clinic": "Downtown Clinic",
      "summary": "Routine wellness examination.",
      "pet": { /* pet object */ },
      "vet": { /* vet object */ }
    }
  }
]
```

---

### Get Invoice by ID

**Endpoint:** `GET /api/v1/invoice/{id}`

**Description:** Retrieves a specific invoice by ID.

**Path Parameters:**
- `id` (required): Invoice ID (Long)

**Response:** `200 OK`
```json
{
  "id": 1,
  "invoiceNumber": "INV-2025-001",
  "invoiceDate": "2025-11-15T09:30:00",
  "amount": 150.00,
  "visit": { /* full visit object with pet and vet */ }
}
```

---

### Create Invoice

**Endpoint:** `POST /api/v1/invoice`

**Description:** Generates a new invoice for a visit.

**Request Body:**
```json
{
  "invoiceNumber": "INV-2025-010",
  "invoiceDate": "2025-12-01T10:00:00",
  "amount": 200.00,
  "visit": {
    "id": 10
  }
}
```

**Response:** `201 Created`
```json
{
  "id": 6,
  "invoiceNumber": "INV-2025-010",
  "invoiceDate": "2025-12-01T10:00:00",
  "amount": 200.00,
  "visit": { /* full visit object */ }
}
```

---

### Get Invoice by Visit

**Endpoint:** `GET /api/v1/invoice/visit/{visitId}`

**Description:** Retrieves the invoice associated with a specific visit.

**Path Parameters:**
- `visitId` (required): Visit ID (Long)

**Response:** `200 OK`
```json
{
  "id": 1,
  "invoiceNumber": "INV-2025-001",
  "invoiceDate": "2025-11-15T09:30:00",
  "amount": 150.00,
  "visit": { /* full visit object */ }
}
```

**Error Response:** `404 Not Found` if no invoice exists for the visit.

---

### Export Invoice as PDF

**Endpoint:** `GET /api/v1/invoice/{id}/pdf`

**Description:** Downloads an invoice as a PDF document.

**Path Parameters:**
- `id` (required): Invoice ID (Long)

**Response:** `200 OK`
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="invoice-{invoiceNumber}.pdf"`

**Usage Example:**
```bash
curl -O http://localhost:8080/api/v1/invoice/1/pdf
```

---

## Interactive API Documentation

For interactive testing and more detailed documentation, access the Swagger UI:

**URL:** `http://localhost:8080/swagger-ui.html`

Features:
- Try out endpoints directly from the browser
- See request/response schemas
- View all available endpoints
- Test authentication (when implemented)

## OpenAPI Specification

The complete OpenAPI 3.0 specification is available at:

**URL:** `http://localhost:8080/v3/api-docs`

This can be imported into tools like Postman or Insomnia for API testing.

## Common HTTP Status Codes

| Code | Description                                    |
|------|------------------------------------------------|
| 200  | OK - Request succeeded                         |
| 201  | Created - Resource successfully created        |
| 204  | No Content - Request succeeded, no response    |
| 400  | Bad Request - Invalid input data               |
| 404  | Not Found - Resource doesn't exist             |
| 500  | Internal Server Error - Server-side error      |

## Data Validation

All endpoints validate input data:
- Required fields must be present
- Data types must match expectations
- Relationships must reference existing entities

## Best Practices

1. **Always check response status codes**
2. **Handle error responses gracefully**
3. **Use proper Content-Type headers** (`application/json`)
4. **Include meaningful data** in POST/PUT requests
5. **Test with Swagger UI** before integrating

## Rate Limiting

Currently, no rate limiting is implemented. This is suitable for development and internal use.

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

**Future Enhancement:** JWT-based authentication will be added for production use.
