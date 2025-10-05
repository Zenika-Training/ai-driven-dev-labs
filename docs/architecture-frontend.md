# Frontend Architecture Rules

## React frontend
- use axios for API calls
- for React components, use PascalCase (eg: PetList.tsx, not petList.tsx)
- for React services, use camelCase with a suffix 'Service' (eg: petService.ts, not PetService.ts)
- when creating a new folder inside src, add an index.ts file which exports all components/services from that folder
