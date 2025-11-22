import React from 'react';
import type { Visit } from './index';

interface VisitDetailProps {
  visit: Visit;
  onBack: () => void;
}

const VisitDetail: React.FC<VisitDetailProps> = ({ visit, onBack }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        ← Back to Visits
      </button>

      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-lg text-gray-900">{formatDateTime(visit.dateTime)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Clinic</p>
            <p className="text-lg text-gray-900">{visit.clinic}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Pet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Pet Name</p>
            <p className="text-lg text-gray-900">{visit.pet.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Owner Name</p>
            <p className="text-lg text-gray-900">{visit.pet.ownerName}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Veterinarian Information</h3>
        {visit.vet ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Veterinarian Name</p>
              <p className="text-lg text-gray-900">{visit.vet.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialty</p>
              <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-green-100 text-green-800">
                {visit.vet.specialty}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Not assigned</p>
        )}
      </div>
    </div>
  );
};

export default VisitDetail;
