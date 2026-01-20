# AI Coding Agents Guide

## Overview

This guide provides concise instructions for AI coding assistants working on the brownfield frontend. For detailed information, refer to the comprehensive documentation in the `docs/` folder.

## Quick Reference

### Key Principles
- **Domain Organization**: Organize by business domain (pet, vet, visit, invoice)
- **Component-Based**: Build reusable, focused React components
- **Service Layer**: Keep API logic separate from components
- **Type Safety**: Use TypeScript strict mode throughout

### Naming Conventions
- **Components**: PascalCase (e.g., `PetList.tsx`, `VetDetail.tsx`)
- **Services**: camelCase with `Service` suffix (e.g., `petService.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Domain Folders**: Include `index.ts` exporting all public members

### Core Rules
- All API calls in service files, never in components
- Handle loading and error states consistently
- Use `async/await` syntax; avoid `any` types
- Remove `console.log` statements before committing
- Keep components small and focused (<200 lines)

### Styling
- Use Tailwind CSS utility classes
- Container: `className="container mx-auto px-6 py-8"`
- Buttons: `className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"`

### Testing
- Write component tests focusing on user interactions
- Use `data-testid` attributes for test selectors
- Add `import React from 'react';` in test files

## Detailed Documentation

For comprehensive guides, refer to:
- **[docs/architecture.md](docs/architecture.md)** - Component architecture, patterns, state management
- **[docs/api-reference.md](docs/api-reference.md)** - Service layer and API integration details
- **[docs/data-models.md](docs/data-models.md)** - TypeScript interfaces and type definitions
- **[docs/ui-design.md](docs/ui-design.md)** - UI patterns, Tailwind conventions, accessibility
- **[docs/development-guide.md](docs/development-guide.md)** - Setup, testing, build workflows

## Quick Start

```bash
# Install and run
npm install
npm run dev

# Test and lint
npm run test
npm run lint

# Build
npm run build

# Development server: http://localhost:5173
# Backend API: http://localhost:8080/api/v1
```

## Code Templates

**Component:**
```tsx
import React, { useEffect, useState } from 'react';

interface ComponentProps {
  prop1: string;
}

const ComponentName: React.FC<ComponentProps> = ({ prop1 }) => {
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

**Service:**
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
  },
  
  async save(entity: Entity): Promise<Entity> {
    const response = await fetch(`${API_BASE_URL}/entity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entity)
    });
    if (!response.ok) throw new Error('Failed to save');
    return response.json();
  }
};
```
