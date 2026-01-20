# Development Guide

## Getting Started

### Prerequisites

- **Node.js v22**: Download from [nodejs.org](https://nodejs.org/)
- **npm**: Comes with Node.js
- **IDE**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

### Setup

1. **Navigate to project:**
```bash
cd brownfield-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:5173`

## Project Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Lint code
npm run lint
```

## Project Structure

```
brownfield-frontend/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── components/           # Shared components
│   ├── pet/                  # Pet domain
│   ├── vet/                  # Vet domain
│   ├── visit/                # Visit domain
│   └── invoice/              # Invoice domain
├── tests/                    # Test files
├── public/                   # Static assets
├── index.html               # HTML template
└── Configuration files
```

## Development Workflow

### 1. Creating a New Component

```tsx
// src/domain/ComponentName.tsx
import React, { useState, useEffect } from 'react';

interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### 2. Creating a Service

```typescript
// src/domain/domainService.ts
const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface Entity {
  id?: number;
  field1: string;
  field2: string;
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

### 3. Exporting from Domain

```typescript
// src/domain/index.ts
export { default as ComponentName } from './ComponentName';
export { entityService } from './entityService';
export type { Entity } from './entityService';
```

### 4. Using in Parent Component

```tsx
import { ComponentName, type Entity } from './domain';

const ParentComponent = () => {
  return <ComponentName prop1="value" />;
};
```

## TypeScript Best Practices

### Interface Definitions

```typescript
// Define clear interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

// Use optional properties
interface FormData {
  required: string;
  optional?: string;
}

// Extend interfaces
interface Pet extends Animal {
  ownerName: string;
}
```

### Type Safety

```typescript
// Type function parameters
const formatName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

// Type state
const [pets, setPets] = useState<Pet[]>([]);

// Type events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### Avoid `any`

```typescript
// Bad
const data: any = await response.json();

// Good
const data: Pet[] = await response.json();
```

## Testing

### Component Test Example

```tsx
// tests/VetList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import VetList from '../src/vet/VetList';

test('displays vets after loading', async () => {
  render(<VetList />);
  
  await waitFor(() => {
    expect(screen.getByText(/Dr. Sarah Martinez/i)).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test -- --watch

# Run with coverage
npm run test -- --coverage

# Run specific test file
npm run test VetList.test.tsx
```

## Styling with Tailwind

### Common Patterns

```tsx
// Container
<div className="container mx-auto px-6 py-8">

// Card
<div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">

// Button
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Flexbox
<div className="flex items-center justify-between gap-4">
```

### Custom Styles

For custom CSS, use `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
```

## State Management

### Local State

```tsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [items, setItems] = useState<Item[]>([]);
```

### Form State

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

### Loading and Error State

```tsx
const [data, setData] = useState<Item[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await service.findAll();
    setData(result);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error');
  } finally {
    setLoading(false);
  }
};
```

## API Integration

### Environment Variables

Create `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Use in code:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
```

### Fetch Pattern

```typescript
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}

return response.json();
```

## Debugging

### Browser DevTools

- **React DevTools**: Inspect component tree and props
- **Console**: Use `console.log()` sparingly (remove before commit)
- **Network Tab**: Monitor API calls
- **Breakpoints**: Set in Sources tab

### VS Code Debugging

Add to `.vscode/launch.json`:
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/src"
}
```

## Code Quality

### ESLint

Configuration in `eslint.config.js`

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### TypeScript Checks

```bash
# Type check
npx tsc --noEmit
```

### Common Linting Rules

- No unused variables
- No console.log statements
- Proper import order
- React hooks rules

## Building for Production

### Build Process

```bash
npm run build
```

Output: `dist/` folder

### Build Optimization

Vite automatically:
- Minifies code
- Tree shakes unused code
- Splits chunks
- Optimizes assets

### Preview Build

```bash
npm run preview
```

Serves the production build locally.

## Performance Tips

1. **Lazy Load Components**
```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

2. **Memoize Expensive Calculations**
```tsx
const expensiveValue = useMemo(() => computeExpensive(data), [data]);
```

3. **Memoize Callbacks**
```tsx
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

4. **Optimize Re-renders**
```tsx
const MemoizedComponent = React.memo(Component);
```

## Common Issues

### Port Already in Use

Change port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000
  }
});
```

### API CORS Errors

Ensure backend allows `http://localhost:5173`

### Build Failures

```bash
# Clear cache
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf .vite
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes and commit
git add .
git commit -m "Add new component"

# Push to remote
git push origin feature/new-component
```

## Coding Standards

- Use PascalCase for components
- Use camelCase for functions/variables
- Use UPPER_SNAKE_CASE for constants
- Keep components under 200 lines
- Extract logic into custom hooks
- Write meaningful commit messages

## Next Steps

- Review [Architecture](architecture.md)
- Study [Data Models](data-models.md)
- Explore [API Reference](api-reference.md)
- Check [UI Design Guide](ui-design.md)
