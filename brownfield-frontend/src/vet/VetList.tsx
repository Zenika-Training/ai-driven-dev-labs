import React, { useEffect, useState } from 'react';
import { vetService, type Vet } from './vetService';

const VetList: React.FC = () => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        setLoading(true);
        const data = await vetService.findAll();
        setVets(data);
        setError(null);
      } catch (err) {
        setError('Failed to load vets. Please try again later.');
        console.error('Error fetching vets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">Loading vets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="border px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (vets.length === 0) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">No vets found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">Our Veterinarians</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Specialty
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {vets.map((vet) => (
              <tr key={vet.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {vet.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{vet.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full border">
                    {vet.specialty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VetList;
