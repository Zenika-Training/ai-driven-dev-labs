# Documentation AI Agents Guide

## Purpose

This guide is specifically for AI agents working on **documentation** in this folder. For coding guidelines, see [`../agents.md`](../agents.md).

## Documentation Rules

### File Size Limit
- **Maximum 500 lines per markdown file**
- If a file exceeds this limit, split it into multiple focused documents

### Code in Documentation
- **Link to source code** instead of duplicating it
- Use relative paths: `[ClassName.java](../src/main/java/com/petclinic/domain/ClassName.java)`
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
- High-level design patterns and principles
- **Link to**: Package structure, key classes
- **Avoid**: Detailed code implementation

### api-reference.md
- API endpoints, request/response formats
- **Include**: Endpoint tables, example requests
- **Link to**: Controller and service classes
- **Avoid**: Full implementation (refer to source)

### data-models.md
- Entity schemas, relationships
- **Include**: ER diagrams, field descriptions
- **Link to**: Entity classes, schema files
- **Avoid**: Full JPA code (link to source)

### development-guide.md
- Setup, workflows, testing, debugging
- **Include**: Commands, troubleshooting steps
- **Link to**: Config files, test examples

## Writing Best Practices

### Use Tables for Structure
Good for endpoints, methods, properties:
```markdown
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/pet` | Get all pets |
```

### Link to Source Code
```markdown
**Controller:** [`PetController.java`](../src/main/java/com/petclinic/pet/PetController.java)
```

### Minimal Code Examples
Show patterns, not implementations:
```markdown
**Service Pattern:**
```java
@Service
public class EntityService {
    private final EntityRepository repository;
    // Delegate to repository
}
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

## Related Documentation

- [`../agents.md`](../agents.md) - Coding guidelines for this application
- [architecture.md](architecture.md) - System architecture
- [development-guide.md](development-guide.md) - Development workflows
