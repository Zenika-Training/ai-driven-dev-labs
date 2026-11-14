# Data Model: Pet Owner Name Filter

No schema or entity change.

## Pet (existing, `com.petclinic.pet.Pet`)

| Field | Type | Notes |
|---|---|---|
| id | Long | generated |
| name | String | |
| ownerName | String | the value the filter is matched against |

## Filter (request-level, not persisted)

| Name | Type | Rules |
|---|---|---|
| ownerName (query param) | String, optional | null, empty or only spaces: return all pets. Otherwise trimmed, then case-insensitive "contains" match on `Pet.ownerName`. |

Result: list of `Pet` (unchanged shape); empty list when nothing matches.

Seed data check (`data.sql`): "smith" matches Max and Charlie (John Smith); the other 3 are excluded.
