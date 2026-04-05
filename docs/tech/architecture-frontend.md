# Frontend Architecture Rules


## Service layer
- all API calls must be in service files, never directly in components
- naming: use camelCase with a suffix 'Service' (eg: petService.ts, not PetService.ts)
- handle loading states and errors consistently across all API calls
- use async/await syntax for cleaner asynchronous code
- implement proper error boundaries for error handling

## Component Structure
- keep components small and focused on a single responsibility
- use TypeScript interfaces for props and state
- place component-specific styles in the same directory as the component

## Util functions
- use camelCase for utility functions and hooks (eg: formatDate.ts, useAuth.ts)

## Testing
- write component tests focusing on user interactions
- no need to test API services unless they have some business logic
- use data-testid attributes for test selectors
- add "import React from "react";" when creating test file for components

# Refactoring
- When refactoring code, don't forget to refactor the unit tests
- When refactoring code, remember to add tests for the new code





