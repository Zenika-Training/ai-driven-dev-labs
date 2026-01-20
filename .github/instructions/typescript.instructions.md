---
applyTo: "brownfield-frontend/**/*.ts,brownfield-frontend/**/*.tsx"
---

# Frontend TypeScript Instructions

These guidelines apply to all TypeScript files in the `brownfield-frontend` project.

## Key Principles
- **Domain Organization**: Organize files by business domain (e.g., `pet`, `vet`, `visit`, `invoice`).
- **Component-Based**: Build reusable, focused React components.
- **Service Layer**: Keep API logic separate from components, residing in service files.
- **Type Safety**: Use TypeScript strict mode throughout. Avoid `any` types.

## Naming Conventions
- **Components**: Use PascalCase (e.g., `PetList.tsx`, `VetDetail.tsx`).
- **Services**: Use camelCase with a `Service` suffix (e.g., `petService.ts`).
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `API_BASE_URL`).
- **Domain Folders**: Include an `index.ts` file exporting all public members of the domain.

## Core Coding Rules
1. **API Interactions**: Place all API calls in service files. Never make API calls directly in components.
2. **State Management**: Handle loading and error states consistently in components that fetch data.
3. **Async/Await**: Use `async/await` syntax for asynchronous operations.
4. **Clean Code**: Remove `console.log` statements before committing code.
5. **Component Size**: Keep components small and focused (target <200 lines). Break down complex components into smaller sub-components.

## Styling
- Use **Tailwind CSS** utility classes for styling.
- **Container**: Use `className="container mx-auto px-6 py-8"`.
- **Buttons**: Use `className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"`.

## Testing
- Write component tests focusing on user interactions and behavior.
- Use `data-testid` attributes for test selectors to ensure robust tests.
- Ensure `import React from 'react';` is present in test files if required by the test environment.
