import React, { useEffect, useState } from 'react';
import { visitService } from './index';
import type { Visit } from './index';

interface VisitListProps {
  onPetSelect?: (petId: number) => void;
  onVisitClick?: (visit: Visit) => void;
}

const VisitList: React.FC<VisitListProps> = ({ onPetSelect: _onPetSelect, onVisitClick }) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await visitService.findAll();
      setVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load visits');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading visits...</div>;
  }

  if (error) {
    return <div className="text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">All Visits</h2>
        <p>View all veterinary visits across all pets</p>
      </div>
      
      {visits.length === 0 ? (
        <p>No visits found.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Clinic</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Pet Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Owner Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Veterinarian</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Specialty</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visits.map((visit) => (
                <tr 
                  key={visit.id} 
                  className={`hover:bg-gray-50 ${onVisitClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onVisitClick && onVisitClick(visit)}
                >
                  <td className="px-6 py-4 text-sm">{visit.id}</td>
                  <td className="px-6 py-4 text-sm">{formatDateTime(visit.dateTime)}</td>
                  <td className="px-6 py-4 text-sm">{visit.clinic}</td>
                  <td className="px-6 py-4 text-sm">{visit.pet?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{visit.pet?.ownerName || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{visit.vet?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">
                    {visit.vet?.specialty ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full border">
                        {visit.vet.specialty}
                      </span>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VisitList;
