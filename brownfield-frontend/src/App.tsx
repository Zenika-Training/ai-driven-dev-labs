import { useState } from 'react';
import { Header } from './components';
import { PetList, PetDetail } from './pet';
import { VisitList } from './visit';
import { VetList } from './vet';
import type { Pet } from './pet';

type View = 'petList' | 'petDetail' | 'visitList' | 'vetList';

function App() {
  const [currentView, setCurrentView] = useState<View>('petList');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
    setCurrentView('petDetail');
  };

  const handleNavigateToPetList = () => {
    setCurrentView('petList');
    setSelectedPet(null);
  };

  const handleNavigateToVisitList = () => {
    setCurrentView('visitList');
    setSelectedPet(null);
  };

  const handleNavigateToVetList = () => {
    setCurrentView('vetList');
    setSelectedPet(null);
  };

  const handlePetSelectFromVisit = (_petId: number) => {
    // This would require fetching the pet by ID, for now we just navigate to pet list
    setCurrentView('petList');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        onNavigateToPetList={handleNavigateToPetList}
        onNavigateToVisitList={handleNavigateToVisitList}
        onNavigateToVetList={handleNavigateToVetList}
      />
      <main>
        {currentView === 'petDetail' && selectedPet ? (
          <PetDetail pet={selectedPet} onBack={handleNavigateToPetList} />
        ) : currentView === 'visitList' ? (
          <VisitList onPetSelect={handlePetSelectFromVisit} />
        ) : currentView === 'vetList' ? (
          <VetList />
        ) : (
          <PetList onPetSelect={handlePetSelect} />
        )}
      </main>
    </div>
  );
}

export default App;
