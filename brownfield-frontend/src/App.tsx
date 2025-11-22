import { useState } from 'react';
import { Header } from './components';
import { PetList, PetDetail } from './pet';
import type { Pet } from './pet';

function App() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const handleBack = () => {
    setSelectedPet(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {selectedPet ? (
          <PetDetail pet={selectedPet} onBack={handleBack} />
        ) : (
          <PetList onPetSelect={handlePetSelect} />
        )}
      </main>
    </div>
  );
}

export default App;
