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

### State Management

- use React hooks (useState, useEffect, useContext) for local state
- avoid prop drilling - use Context API for shared state across multiple levels
- keep state as close to where it's needed as possible
- use useReducer for complex state logic

### API Integration

- all API calls must be in service files, never directly in components
- handle loading states and errors consistently across all API calls
- use async/await syntax for cleaner asynchronous code
- implement proper error boundaries for error handling

### Code Organization

- organize files by feature/domain rather than by type (components, services, etc.)
- keep related files close together
- limit file length to 300 lines - split larger files into smaller modules
- use barrel exports (index.ts) to simplify imports

### Performance

- use React.memo() for expensive components that render frequently
- implement lazy loading for routes and heavy components
- avoid inline function definitions in JSX when possible
- optimize re-renders by using useMemo and useCallback appropriately

### Testing

- write unit tests for utility functions and services
- write component tests focusing on user interactions
- aim for meaningful test coverage, not just high percentages
- use data-testid attributes for test selectors

### Accessibility

- use semantic HTML elements
- ensure all interactive elements are keyboard accessible
- provide appropriate ARIA labels where needed
- maintain sufficient color contrast ratios

### Code Quality

- enable and follow ESLint rules
- use TypeScript strict mode
- avoid 'any' types - be explicit with types
- document complex logic with comments
- remove console.log statements before committing
