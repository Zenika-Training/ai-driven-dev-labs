# Brownfield Frontend Architecture

## Overview

The brownfield frontend is a modern React application built with TypeScript, Vite, and Tailwind CSS. It provides a user interface for the Pet Clinic application, allowing users to manage pets, veterinarians, visits, and invoices.

## Technology Stack

### Core Technologies
- **React 19.1.1**: UI library for building component-based interfaces
- **TypeScript 5.9.2**: Typed superset of JavaScript
- **Vite 7.1.2**: Fast build tool and development server
- **Tailwind CSS 4.1.17**: Utility-first CSS framework

### Testing
- **Vitest 2.1.8**: Fast unit test framework
- **React Testing Library 16.3.0**: Testing utilities for React components
- **jsdom 25.0.1**: DOM implementation for testing

### Code Quality
- **ESLint 9.33.0**: JavaScript/TypeScript linter
- **TypeScript ESLint 8.39.1**: TypeScript-specific linting rules

### UI Components
- **Lucide React 0.554.0**: Icon library

## Project Structure

```
brownfield-frontend/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root component with routing
│   ├── index.css                # Global styles (Tailwind)
│   ├── vite-env.d.ts           # Vite type definitions
│   ├── components/              # Shared components
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── pet/                     # Pet domain
│   │   ├── PetDetail.tsx       # Pet details view
│   │   ├── petService.ts       # API service
│   │   └── index.ts            # Domain exports
│   ├── vet/                     # Vet domain
│   │   ├── VetList.tsx         # Vet list view
│   │   ├── vetService.ts       # API service
│   │   └── index.ts
│   ├── visit/                   # Visit domain
│   │   ├── VisitList.tsx       # Visit list view
│   │   ├── VisitDetail.tsx     # Visit detail view
│   │   ├── visitService.ts     # API service
│   │   └── index.ts
│   └── invoice/                 # Invoice domain
│       ├── invoiceService.ts
│       └── index.ts
├── tests/                       # Test files
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest test configuration
├── eslint.config.js            # ESLint configuration
└── postcss.config.js           # PostCSS configuration
```

## Architecture Pattern

### Component-Based Architecture

The application follows React's component-based architecture with a clear separation of concerns:

```
User Interface (Components)
        ↓
    Services (API Layer)
        ↓
    Backend API
```

### Domain Organization

Like the backend, the frontend is organized by **domain** (business concept) rather than by technical layers:

- **pet/**: Everything related to pets
- **vet/**: Everything related to veterinarians
- **visit/**: Everything related to visits
- **invoice/**: Everything related to invoices
- **components/**: Shared UI components used across domains

Each domain folder contains:
- **Components**: React components (PascalCase, .tsx)
- **Services**: API communication logic (camelCase, .ts)
- **Types**: TypeScript interfaces and types
- **index.ts**: Barrel exports for the domain

## Design Patterns

### 1. Service Layer Pattern

All API communication is abstracted into service files, keeping components free from HTTP logic.

**Example: petService.ts**
```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface Pet {
  id?: number;
  name: string;
  ownerName: string;
}

export const petService = {
  async findAll(): Promise<Pet[]> {
    const response = await fetch(`${API_BASE_URL}/pet`);
    if (!response.ok) throw new Error('Failed to fetch pets');
    return response.json();
  },
  
  async save(pet: Pet): Promise<Pet> {
    const response = await fetch(`${API_BASE_URL}/pet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet)
    });
    if (!response.ok) throw new Error('Failed to save pet');
    return response.json();
  }
};
```

### 2. Functional Components with Hooks

All components are functional components using React hooks:

```typescript
const VetList: React.FC = () => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadVets();
  }, []);
  
  const loadVets = async () => {
    try {
      const data = await vetService.findAll();
      setVets(data);
    } catch (err) {
      setError('Failed to load vets');
    } finally {
      setLoading(false);
    }
  };
  
  // Render logic
};
```

### 3. Controlled Components

Form inputs are controlled components with React state:

```typescript
const [name, setName] = useState('');

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### 4. Barrel Exports

Each domain uses `index.ts` to export its public API:

```typescript
// pet/index.ts
export { default as PetDetail } from './PetDetail';
export { petService } from './petService';
export type { Pet } from './petService';
```

## Component Structure

### Standard Component Pattern

```typescript
import React, { useEffect, useState } from 'react';

interface ComponentProps {
  // Props definition
}

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Effects
  useEffect(() => {
    loadData();
  }, [dependencies]);
  
  // Event handlers
  const handleAction = async () => {
    // Logic
  };
  
  // Conditional rendering
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  // Main render
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## State Management

### Local State (useState)

Used for component-specific state:
```typescript
const [vets, setVets] = useState<Vet[]>([]);
const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
```

### Side Effects (useEffect)

Used for data fetching and subscriptions:
```typescript
useEffect(() => {
  fetchData();
}, [dependency]); // Runs when dependency changes
```

### No Global State Management

The brownfield application uses local state only. For larger applications, consider:
- **Context API**: For shared state across components
- **Redux**: For complex state management
- **Zustand**: Lightweight state management

## Styling Approach

### Tailwind CSS Utility Classes

The application uses Tailwind's utility-first approach:

```typescript
<div className="container mx-auto px-6 py-8">
  <h1 className="text-2xl font-bold mb-4">Title</h1>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click Me
  </button>
</div>
```

### Common Patterns

**Container:**
```typescript
<div className="container mx-auto px-6 py-8">
```

**Cards:**
```typescript
<div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
```

**Buttons:**
```typescript
<button className="px-4 py-2 border rounded transition-colors hover:bg-gray-100">
```

**Grid Layout:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## API Communication

### Base URL Configuration

```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

### Error Handling

Services throw errors that components catch:

```typescript
// In service
if (!response.ok) {
  throw new Error('Failed to fetch data');
}

// In component
try {
  const data = await service.findAll();
  setData(data);
} catch (err) {
  setError(err instanceof Error ? err.message : 'An error occurred');
}
```

### Async/Await Pattern

All API calls use async/await for cleaner code:

```typescript
const loadData = async () => {
  setLoading(true);
  try {
    const data = await service.findAll();
    setData(data);
    setError(null);
  } catch (err) {
    setError('Failed to load data');
  } finally {
    setLoading(false);
  }
};
```

## TypeScript Usage

### Interface Definitions

```typescript
export interface Pet {
  id?: number;          // Optional for new pets
  name: string;
  ownerName: string;
}

export interface Visit {
  id?: number;
  dateTime: string;
  clinic: string;
  summary: string;
  pet: Pet;
  vet: Vet;
}
```

### Strict Mode

The application uses TypeScript strict mode:
- No implicit `any`
- Strict null checks
- No unused parameters
- Strict property initialization

### Type Safety in Components

```typescript
interface VetListProps {
  onVetSelected?: (vet: Vet) => void;
}

const VetList: React.FC<VetListProps> = ({ onVetSelected }) => {
  const [vets, setVets] = useState<Vet[]>([]);
  // Type-safe throughout
};
```

## Routing

### Current Implementation

The app uses conditional rendering in App.tsx:

```typescript
const [currentView, setCurrentView] = useState<'vets' | 'pets'>('vets');

{currentView === 'vets' && <VetList />}
{currentView === 'pets' && <PetDetail />}
```

### Future Enhancement

Consider adding React Router:
```bash
npm install react-router-dom
```

## Performance Considerations

### 1. Component Optimization
- Use `React.memo()` for expensive renders
- Implement `useMemo()` for expensive calculations
- Use `useCallback()` for event handlers passed to children

### 2. Code Splitting
Vite automatically handles code splitting for optimal bundle size.

### 3. Lazy Loading
For large components:
```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

## Testing Strategy

### Component Tests

Tests focus on user interactions:

```typescript
import { render, screen } from '@testing-library/react';
import VetList from './VetList';

test('renders vet list', async () => {
  render(<VetList />);
  const heading = await screen.findByText(/vets/i);
  expect(heading).toBeInTheDocument();
});
```

### Test Selectors

Use `data-testid` attributes:

```typescript
<div data-testid="vet-list">
  {/* content */}
</div>

// In test
const list = screen.getByTestId('vet-list');
```

## Build and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output: `dist/` folder with optimized assets

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

Create `.env` file for environment-specific values:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Access in code:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

## Best Practices

1. **Component Size**: Keep components small and focused
2. **Type Safety**: Always define TypeScript interfaces
3. **Error Handling**: Handle loading and error states consistently
4. **API Separation**: Keep API logic in service files
5. **Naming**: Use PascalCase for components, camelCase for functions
6. **Testing**: Write tests for user interactions
7. **Accessibility**: Use semantic HTML and ARIA attributes
8. **Performance**: Optimize renders with React.memo when needed

## Security Considerations

- No authentication currently implemented
- API calls are not secured
- Input validation needed for forms
- XSS protection via React's built-in escaping

**Future Enhancements:**
- JWT authentication
- Protected routes
- Input sanitization
- Content Security Policy

## References

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Data Models](data-models.md)
- [API Reference](api-reference.md)
- [Development Guide](development-guide.md)
