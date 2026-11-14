import React, { useEffect, useState } from 'react';
import { vetService, type Vet } from './vetService';

const ALL_SPECIALTIES = '';

const VetList: React.FC = () => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(ALL_SPECIALTIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        setLoading(true);
        const data = await vetService.findAll(selectedSpecialty || undefined);
        setVets(data);
        if (selectedSpecialty === ALL_SPECIALTIES) {
          setSpecialties([...new Set(data.map((vet) => vet.specialty))].sort());
        }
        setError(null);
      } catch (err) {
        setError('Failed to load vets. Please try again later.');
        console.error('Error fetching vets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, [selectedSpecialty]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading vets...</div>;
    }

    if (error) {
      return <div className="border px-4 py-3 rounded">{error}</div>;
    }

    if (vets.length === 0) {
      return <div className="text-center">No vets found.</div>;
    }

    return (
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
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">Our Veterinarians</h2>

      <div className="mb-4">
        <label htmlFor="specialty-filter" className="mr-2 text-sm font-medium">
          Specialty
        </label>
        <select
          id="specialty-filter"
          data-testid="specialty-filter"
          className="border rounded px-2 py-1"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value={ALL_SPECIALTIES}>All specialties</option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {renderContent()}
    </div>
  );
};

export default VetList;
