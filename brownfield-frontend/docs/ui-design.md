# UI Design Guide

## Overview

The brownfield frontend follows a clean, functional design approach using Tailwind CSS for styling. The design prioritizes usability, accessibility, and responsive layouts.

## Design System

### Color Palette

The application uses Tailwind's default color system with subtle customizations:

**Primary Colors:**
- Blue for interactive elements (buttons, links)
- Gray for backgrounds and borders
- White for cards and containers

**Semantic Colors:**
- Red for errors and destructive actions
- Green for success states
- Yellow for warnings
- Blue for information

### Typography

**Font Family:**
- System font stack (default Tailwind)
- Ensures fast loading and native feel

**Font Sizes:**
- `text-xs`: 0.75rem (12px) - Small labels
- `text-sm`: 0.875rem (14px) - Body text, secondary info
- `text-base`: 1rem (16px) - Default body text
- `text-lg`: 1.125rem (18px) - Emphasized text
- `text-xl`: 1.25rem (20px) - Subheadings
- `text-2xl`: 1.5rem (24px) - Section headings
- `text-3xl`: 1.875rem (30px) - Page titles

**Font Weights:**
- `font-normal`: Regular text (400)
- `font-medium`: Slightly emphasized (500)
- `font-semibold`: Subheadings (600)
- `font-bold`: Headings (700)

### Spacing

Using Tailwind's spacing scale (4px base unit):
- `p-2`: 8px padding
- `p-4`: 16px padding
- `p-6`: 24px padding
- `p-8`: 32px padding
- `gap-4`: 16px gap between elements
- `space-y-4`: 16px vertical spacing

## Layout Patterns

### Container

Standard page container:
```tsx
<div className="container mx-auto px-6 py-8">
  {/* Page content */}
</div>
```

**Breakdown:**
- `container`: Max-width container
- `mx-auto`: Center horizontally
- `px-6`: Horizontal padding (24px)
- `py-8`: Vertical padding (32px)

### Grid Layout

Responsive grid for cards/items:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <div key={item.id} className="border rounded-lg p-4">
      {/* Item content */}
    </div>
  ))}
</div>
```

**Responsive Breakpoints:**
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

### Flexbox Layout

Horizontal layout with spacing:
```tsx
<div className="flex items-center gap-4">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

## Component Patterns

### Page Header

```tsx
<div className="mb-6">
  <h1 className="text-2xl font-bold mb-2">Page Title</h1>
  <p className="text-gray-600">Page description or subtitle</p>
</div>
```

### Card Component

```tsx
<div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
  <h3 className="font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-gray-600">Card content</p>
</div>
```

**Features:**
- Border and rounded corners
- Padding for content
- Shadow with hover effect
- Smooth transition

### Button Styles

**Primary Button:**
```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
  Primary Action
</button>
```

**Secondary Button:**
```tsx
<button className="px-4 py-2 border rounded transition-colors hover:bg-gray-100">
  Secondary Action
</button>
```

**Danger Button:**
```tsx
<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
  Delete
</button>
```

### List Items

```tsx
<div className="divide-y">
  {items.map(item => (
    <div key={item.id} className="py-4 hover:bg-gray-50 transition-colors">
      <h4 className="font-medium">{item.title}</h4>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  ))}
</div>
```

### Loading State

```tsx
{loading && (
  <div className="flex justify-center items-center py-12">
    <div className="text-gray-500">Loading...</div>
  </div>
)}
```

### Error State

```tsx
{error && (
  <div className="border border-red-400 bg-red-50 px-4 py-3 rounded">
    <p className="text-red-700">{error}</p>
  </div>
)}
```

### Empty State

```tsx
{items.length === 0 && !loading && (
  <div className="text-center py-12 text-gray-500">
    <p>No items found.</p>
  </div>
)}
```

## Form Design

### Form Container

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  {/* Form fields */}
</form>
```

### Input Field

```tsx
<div>
  <label htmlFor="name" className="block text-sm font-medium mb-1">
    Name
  </label>
  <input
    id="name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>
```

### Text Area

```tsx
<div>
  <label htmlFor="summary" className="block text-sm font-medium mb-1">
    Summary
  </label>
  <textarea
    id="summary"
    value={summary}
    onChange={(e) => setSummary(e.target.value)}
    rows={4}
    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
```

### Select Dropdown

```tsx
<div>
  <label htmlFor="clinic" className="block text-sm font-medium mb-1">
    Clinic
  </label>
  <select
    id="clinic"
    value={clinic}
    onChange={(e) => setClinic(e.target.value)}
    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select a clinic</option>
    <option value="Downtown Clinic">Downtown Clinic</option>
    <option value="North Branch">North Branch</option>
    <option value="East Side Clinic">East Side Clinic</option>
  </select>
</div>
```

### Form Actions

```tsx
<div className="flex gap-4 pt-4">
  <button
    type="submit"
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Save
  </button>
  <button
    type="button"
    onClick={onCancel}
    className="px-4 py-2 border rounded hover:bg-gray-100"
  >
    Cancel
  </button>
</div>
```

## Responsive Design

### Mobile-First Approach

Start with mobile layout, then enhance for larger screens:

```tsx
<div className="flex flex-col md:flex-row gap-4">
  {/* Stacks vertically on mobile, horizontally on tablet+ */}
</div>
```

### Breakpoints

| Breakpoint | Min Width | Usage          |
|------------|-----------|----------------|
| sm         | 640px     | Large phones   |
| md         | 768px     | Tablets        |
| lg         | 1024px    | Laptops        |
| xl         | 1280px    | Desktops       |
| 2xl        | 1536px    | Large displays |

### Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Hide/Show by Breakpoint

```tsx
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>
```

## Accessibility

### Semantic HTML

Use proper HTML elements:
```tsx
<nav>Navigation content</nav>
<main>Main content</main>
<article>Article content</article>
<button>Clickable action</button>
```

### Labels and IDs

Always associate labels with inputs:
```tsx
<label htmlFor="petName">Pet Name</label>
<input id="petName" type="text" />
```

### Focus States

Ensure visible focus indicators:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### ARIA Attributes

Add when necessary:
```tsx
<button aria-label="Close dialog">×</button>
<div role="alert">{errorMessage}</div>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible.

## Icons

Using **Lucide React** for icons:

```tsx
import { User, Calendar, MapPin } from 'lucide-react';

<div className="flex items-center gap-2">
  <User className="w-4 h-4" />
  <span>User Name</span>
</div>
```

**Common Icons:**
- `User`: Person/profile
- `Calendar`: Dates
- `MapPin`: Location
- `FileText`: Documents
- `Plus`: Add action
- `Edit`: Edit action
- `Trash2`: Delete action
- `ArrowLeft`: Back navigation

## Animation and Transitions

### Hover Transitions

```tsx
className="transition-colors hover:bg-blue-600"
className="transition-shadow hover:shadow-lg"
className="transition-transform hover:scale-105"
```

### Duration

```tsx
className="transition-all duration-200"  // Fast (200ms)
className="transition-all duration-300"  // Medium (300ms)
className="transition-all duration-500"  // Slow (500ms)
```

## Data Display

### Table Pattern

```tsx
<div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-gray-50 border-b">
      <tr>
        <th className="px-4 py-2 text-left text-sm font-medium">Column</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3">Data</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Detail View

```tsx
<div className="space-y-3">
  <div>
    <dt className="text-sm text-gray-600">Label</dt>
    <dd className="text-base font-medium">{value}</dd>
  </div>
</div>
```

### Badge/Tag

```tsx
<span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
  Tag
</span>
```

## Best Practices

1. **Consistent Spacing**: Use Tailwind's spacing scale (4, 8, 16, 24px)
2. **Color Contrast**: Ensure text is readable (WCAG AA minimum)
3. **Touch Targets**: Minimum 44×44px for mobile buttons
4. **Loading States**: Always show feedback during async operations
5. **Error Messages**: Clear, actionable error messages
6. **Responsive**: Test on multiple screen sizes
7. **Performance**: Avoid unnecessary animations
8. **Accessibility**: Support keyboard navigation and screen readers

## Dark Mode (Future Enhancement)

Tailwind supports dark mode with the `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

Enable in `tailwind.config.js`:
```js
module.exports = {
  darkMode: 'class', // or 'media'
}
```

## Component Library (Future Enhancement)

Consider creating reusable components:
- Button component with variants
- Input component with validation
- Card component
- Modal component
- Toast notifications

## Design Tools

Recommended for mockups and prototyping:
- **Figma**: UI design and prototyping
- **Tailwind UI**: Pre-built component examples
- **Headless UI**: Unstyled, accessible components

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Accessibility](https://react.dev/learn/accessibility)
