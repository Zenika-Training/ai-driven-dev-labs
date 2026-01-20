# AI Coding Agents Guide

## Overview

This guide provides instructions for AI coding assistants working on the brownfield frontend codebase. Follow these conventions to maintain code quality and consistency.

## Architecture Principles

- **Domain Organization**: Organize by business domain (pet, vet, visit, invoice)
- **Component-Based**: Build reusable, focused React components
- **Service Layer**: Keep API logic separate from components
- **Type Safety**: Use TypeScript strict mode throughout

## Naming Conventions

- **Components**: PascalCase (e.g., `PetList.tsx`, `VetDetail.tsx`)
- **Services**: camelCase with `Service` suffix (e.g., `petService.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `useAuth.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_ITEMS`)
- **Domain Folders**: Include `index.ts` exporting all public members

## Component Structure

```tsx
import React, { useEffect, useState } from 'react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await service.findAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## TypeScript Rules

- Use strict mode (no implicit `any`)
- Define interfaces for all props and state
- Avoid `any` types - be explicit
- Use optional properties (`?`) appropriately
- Export types from service files

## API Integration

- **All API calls** must be in service files, never in components
- Handle loading and error states consistently
- Use `async/await` syntax
- Implement proper error boundaries

**Service Pattern:**
```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface Entity {
  id?: number;
  field: string;
}

export const entityService = {
  async findAll(): Promise<Entity[]> {
    const response = await fetch(`${API_BASE_URL}/entity`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  }
};
```

## Styling

- Use Tailwind CSS utility classes
- Follow responsive design patterns (mobile-first)
- Common container: `className="container mx-auto px-6 py-8"`
- Buttons: `className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"`
- Cards: `className="border rounded-lg p-4 shadow"`

## Testing

- Write component tests focusing on user interactions
- No need to test API services unless they have business logic
- Use `data-testid` attributes for test selectors
- Add `import React from 'react';` in test files

## Code Quality

- Remove `console.log` statements before committing
- Document complex logic with comments
- Keep components small and focused
- Extract complex logic into custom hooks
- Use functional components with hooks (no class components)

## Refactoring

- Update unit tests when refactoring code
- Add tests for new code
- Keep test coverage consistent

## Common Tasks

### Creating a Component

1. Create `ComponentName.tsx` in appropriate domain folder
2. Define TypeScript interfaces for props
3. Implement with proper loading/error states
4. Export from domain `index.ts`
5. Write tests in `tests/` folder

### Creating a Service

1. Create `entityService.ts` in domain folder
2. Define TypeScript interface for data model
3. Implement CRUD methods with proper error handling
4. Export service and types from `index.ts`

### Running the Application

```bash
npm run dev
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Best Practices

- Keep components under 200 lines
- Use semantic HTML elements
- Support keyboard navigation
- Handle loading and error states
- Validate forms before submission
- Use proper TypeScript types throughout
- Follow existing code patterns

## Documentation

- `docs/architecture.md`: Architecture and design patterns
- `docs/data-models.md`: TypeScript interfaces and data structures
- `docs/api-reference.md`: Service layer and API integration
- `docs/ui-design.md`: UI patterns and Tailwind conventions
- `docs/development-guide.md`: Setup and development workflows

## Quick Reference

**State Management:**
```tsx
const [items, setItems] = useState<Item[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

**Event Handlers:**
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Handle submission
};
```

**Conditional Rendering:**
```tsx
{loading && <div>Loading...</div>}
{error && <div className="text-red-500">{error}</div>}
{items.length === 0 && <div>No items found</div>}
```

## Development Server

- Default URL: `http://localhost:5173`
- Backend API: `http://localhost:8080/api/v1`
- Hot module replacement enabled
