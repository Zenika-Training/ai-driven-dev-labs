import { useState } from 'react';
import { Header } from './components';
import { PetList, PetDetail } from './pet';
import { VisitList, VisitDetail } from './visit';
import { VetList } from './vet';
import { InvoiceList } from './invoice';
import type { Pet } from './pet';
import type { Visit } from './visit';

type View = 'petList' | 'petDetail' | 'visitList' | 'visitDetail' | 'vetList' | 'invoiceList';

function App() {
  const [currentView, setCurrentView] = useState<View>('petList');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

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

  const handleNavigateToInvoiceList = () => {
    setCurrentView('invoiceList');
    setSelectedPet(null);
  };

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setCurrentView('visitDetail');
  };

  const handleNavigateToVisitListFromDetail = () => {
    setCurrentView('visitList');
    setSelectedVisit(null);
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
        onNavigateToInvoiceList={handleNavigateToInvoiceList}
      />
      <main className="bg-gray-100 min-h-[calc(100vh-80px)]">
        {currentView === 'petList' && (
          <PetList onPetSelect={handlePetSelect} />
        )}
        {currentView === 'petDetail' && selectedPet && (
          <PetDetail 
            pet={selectedPet} 
            onBack={handleNavigateToPetList}
          />
        )}
        {currentView === 'visitList' && (
          <VisitList 
            onPetSelect={handlePetSelectFromVisit}
            onVisitClick={handleVisitClick}
          />
        )}
        {currentView === 'visitDetail' && selectedVisit && (
          <VisitDetail 
            visit={selectedVisit}
            onBack={handleNavigateToVisitListFromDetail}
          />
        )}
        {currentView === 'vetList' && (
          <VetList />
        )}
        {currentView === 'invoiceList' && (
          <InvoiceList />
        )}
      </main>
    </div>
  );
}

export default App;
