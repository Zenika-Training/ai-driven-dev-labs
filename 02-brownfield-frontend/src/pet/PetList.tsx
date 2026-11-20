import React, { useEffect, useState } from 'react';
import { petService } from './index';
import type { Pet } from './index';

interface PetListProps {
  onPetSelect: (pet: Pet) => void;
}

const PetList: React.FC<PetListProps> = ({ onPetSelect }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await petService.findAll();
      setPets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading pets...</div>;
  }

  if (error) {
    return <div className="text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">All Pets</h2>
        <p>Manage and view all pets in the directory</p>
      </div>
      
      {pets.length === 0 ? (
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
