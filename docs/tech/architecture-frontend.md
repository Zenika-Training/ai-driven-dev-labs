# Frontend Architecture Rules

## React frontend

### Naming Conventions

- use Fetch API for API calls
- for React components, use PascalCase (eg: PetList.tsx, not petList.tsx)
- for React services, use camelCase with a suffix 'Service' (eg: petService.ts, not PetService.ts)
- when creating a new folder inside src, add an index.ts file which exports all components/services from that folder
- use camelCase for utility functions and hooks (eg: formatDate.ts, useAuth.ts)
- use UPPER_SNAKE_CASE for constants (eg: API_BASE_URL, MAX_RETRY_ATTEMPTS)

### Component Structure

- keep components small and focused on a single responsibility
- use functional components with hooks instead of class components
- extract complex logic into custom hooks
- use TypeScript interfaces for props and state
- place component-specific styles in the same directory as the component

### API Integration

- all API calls must be in service files, never directly in components
- handle loading states and errors consistently across all API calls
- use async/await syntax for cleaner asynchronous code
- implement proper error boundaries for error handling

### Testing

- write component tests focusing on user interactions
- no need to test API services unless they have some business logic
- use data-testid attributes for test selectors
- add "import React from "react";" when creating test file for components

### Code Quality

- use TypeScript strict mode
- avoid 'any' types - be explicit with types
- document complex logic with comments
- remove console.log statements before committing
