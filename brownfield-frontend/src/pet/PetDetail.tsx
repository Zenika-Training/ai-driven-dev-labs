import React, { useEffect, useState } from 'react';
import { visitService } from '../visit';
import type { Visit } from '../visit';
import type { Pet } from './index';

interface PetDetailProps {
  pet: Pet;
  onBack: () => void;
}

const PetDetail: React.FC<PetDetailProps> = ({ pet, onBack }) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVisits();
  }, [pet.id]);

  const loadVisits = async () => {
    if (!pet.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await visitService.findByPetId(pet.id);
      setVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load visits');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 border rounded transition-colors"
      >
        ← Back to Pets
      </button>

      <div className="mb-6 border rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
        <p>Owner: {pet.ownerName}</p>
        <p>Pet ID: {pet.id}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">Visit History</h3>
        <p>All visits for this pet</p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading visit history...</div>
      ) : error ? (
        <div className="text-center py-8">Error: {error}</div>
      ) : visits.length === 0 ? (
        <div className="border rounded-lg p-6">
          <p className="text-center">No visits recorded yet for {pet.name}.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Clinic</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{formatDateTime(visit.dateTime)}</td>
                  <td className="px-6 py-4 text-sm">{visit.clinic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PetDetail;
