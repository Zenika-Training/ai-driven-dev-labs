import React, { useEffect, useRef, useState } from 'react';
import { petService } from './index';
import type { Pet } from './index';

const FILTER_DEBOUNCE_MS = 300;

interface PetListProps {
  onPetSelect: (pet: Pet) => void;
}

const PetList: React.FC<PetListProps> = ({ onPetSelect }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string>('');
  const isFirstLoad = useRef(true);

  useEffect(() => {
    let cancelled = false;
    const delay = isFirstLoad.current ? 0 : FILTER_DEBOUNCE_MS;

    const timer = setTimeout(async () => {
      try {
        setError(null);
        const data = await petService.findAll(ownerName);
        if (!cancelled) {
          setPets(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load pets');
        }
      } finally {
        if (!cancelled) {
          isFirstLoad.current = false;
          setInitialLoading(false);
        }
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ownerName]);

  if (initialLoading) {
    return <div className="text-center py-8">Loading pets...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">All Pets</h2>
        <p>Manage and view all pets in the directory</p>
      </div>

      <div className="mb-6">
        <label htmlFor="owner-name-filter" className="block text-sm font-semibold mb-1">
          Filter by owner name
        </label>
        <input
          id="owner-name-filter"
          data-testid="owner-name-filter"
          type="text"
          className="border rounded px-3 py-2 w-full max-w-sm"
          placeholder="Owner name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </div>

      {error ? (
        <p data-testid="pet-list-error">Error: {error}</p>
      ) : pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Owner Name</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pets.map((pet) => (
                <tr
                  key={pet.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onPetSelect(pet)}
                >
                  <td className="px-6 py-4 text-sm">{pet.id}</td>
                  <td className="px-6 py-4 text-sm">{pet.name}</td>
                  <td className="px-6 py-4 text-sm">{pet.ownerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PetList;
