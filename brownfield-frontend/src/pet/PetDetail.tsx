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
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        ← Back to Pets
      </button>

      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h2>
        <p className="text-gray-600">Owner: {pet.ownerName}</p>
        <p className="text-gray-600">Pet ID: {pet.id}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit History</h3>
        <p className="text-gray-600">All visits for this pet</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading visit history...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      ) : visits.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-center">No visits recorded yet for {pet.name}.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Clinic</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDateTime(visit.dateTime)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{visit.clinic}</td>
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
