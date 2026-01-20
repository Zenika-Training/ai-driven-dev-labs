# Documentation AI Agents Guide

## Purpose

This guide is specifically for AI agents working on **documentation** in this folder. For coding guidelines, see [`../agents.md`](../agents.md).

## Documentation Rules

### File Size Limit
- **Maximum 500 lines per markdown file**
- If a file exceeds this limit, split it into multiple focused documents

### Code in Documentation
- **Link to source code** instead of duplicating it
- Use relative paths: `[ComponentName.tsx](../src/domain/ComponentName.tsx)`
- Include minimal code snippets only for **best practices** and **common patterns**
- Show examples that illustrate concepts, not full implementations

### Structure Requirements
Each documentation file should have:
1. Clear title and purpose
2. Focused sections (one topic per section)
3. Cross-references to related docs
4. Links to source code for implementations

## Documentation Files

### architecture.md
- Component patterns, state management, React architecture
- **Link to**: Key components, service files, hooks
- **Avoid**: Full component implementations

### api-reference.md
- Service layer methods, API integration patterns
- **Include**: Method signatures, usage examples
- **Link to**: Service files, component examples
- **Avoid**: Full service implementations

### data-models.md
- TypeScript interfaces and type definitions
- **Include**: Interface definitions, type relationships
- **Link to**: Service files where interfaces are defined
- **Avoid**: Duplicating interface definitions

### ui-design.md
- UI patterns, Tailwind conventions, styling
- **Include**: Example class names, pattern descriptions
- **Link to**: Component examples
- **Avoid**: Full component HTML

### development-guide.md
- Setup, workflows, testing, building
- **Include**: Commands, troubleshooting steps
- **Link to**: Config files, test examples

## Writing Best Practices

### Use Tables for Structure
Good for methods, properties, endpoints:
```markdown
| Method | Description | Returns |
|--------|-------------|---------|
| `findAll()` | Get all items | `Promise<Item[]>` |
```

### Link to Source Code
```markdown
**Service:** [`petService.ts`](../src/pet/petService.ts)
**Component:** [`PetDetail.tsx`](../src/pet/PetDetail.tsx)
```

### Minimal Code Examples
Show patterns, not implementations:
```markdown
**Component Pattern:**
```tsx
const Component: React.FC<Props> = ({ prop }) => {
  const [data, setData] = useState<Type[]>([]);
  // Load and render data
};
```

### Cross-Reference Related Docs
```markdown
See also: [Data Models](data-models.md), [Architecture](architecture.md)
```

## Maintenance Workflow

### When Adding New Features
1. Update relevant documentation file
2. Add link to new source files
3. Keep within 500-line limit
4. Update cross-references

### When Refactoring
1. Update links if files moved
2. Revise descriptions if behavior changed
3. Verify cross-references are valid

### Quality Checklist
Before committing:
- [ ] File is under 500 lines
- [ ] Code examples are minimal
- [ ] Links to source code instead of duplication
- [ ] Cross-references are current
- [ ] No duplicate content across files
- [ ] TypeScript types are linked, not duplicated

## Tailwind CSS Documentation

When documenting UI patterns:
- Show class name combinations
- Explain responsive patterns (sm:, md:, lg:)
- Link to component examples
- Don't duplicate full component markup

**Example:**
```markdown
**Button Pattern:** `className="px-4 py-2 bg-blue-500 rounded"`
See: [`Button.tsx`](../src/components/Button.tsx)
```

## Related Documentation

- [`../agents.md`](../agents.md) - Coding guidelines for this application
- [architecture.md](architecture.md) - Component architecture
- [development-guide.md](development-guide.md) - Development workflows
