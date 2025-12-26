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
        className="mb-6 px-4 py-2 border rounded transition-colors"
      >
        ← Back to Visits
      </button>

      <div className="mb-6 border rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Visit Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-lg">{formatDateTime(visit.dateTime)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Clinic</p>
            <p className="text-lg">{visit.clinic}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 border rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Pet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Pet Name</p>
            <p className="text-lg">{visit.pet.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Owner Name</p>
            <p className="text-lg">{visit.pet.ownerName}</p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Veterinarian Information</h3>
        {visit.vet ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Veterinarian Name</p>
              <p className="text-lg">{visit.vet.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialty</p>
              <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full border">
                {visit.vet.specialty}
              </span>
            </div>
          </div>
        ) : (
          <p>Not assigned</p>
        )}
      </div>

      <div className="border rounded-lg p-6 mt-6">
        <h3 className="text-2xl font-bold mb-4">Consultation Summary</h3>
        <p className="leading-relaxed whitespace-pre-line">{visit.summary}</p>
      </div>
    </div>
  );
};

export default VisitDetail;
