import React from 'react';

type View = 'petList' | 'petDetail' | 'visitList' | 'visitDetail' | 'vetList' | 'invoiceList';

interface HeaderProps {
  currentView: View;
  onNavigateToPetList: () => void;
  onNavigateToVisitList: () => void;
  onNavigateToVetList: () => void;
  onNavigateToInvoiceList: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigateToPetList, onNavigateToVisitList, onNavigateToVetList, onNavigateToInvoiceList }) => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Pet Directory</h1>
              <p className="text-sm">Managing your furry friends</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="flex items-center gap-2">
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'petList' || currentView === 'petDetail'
                  ? 'font-bold underline'
                  : 'hover:underline'
              }`}
              onClick={onNavigateToPetList}
            >
              <span>Pets</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'visitList' || currentView === 'visitDetail'
                  ? 'font-bold underline'
                  : 'hover:underline'
              }`}
              onClick={onNavigateToVisitList}
            >
              <span>Visits</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'vetList'
                  ? 'font-bold underline'
                  : 'hover:underline'
              }`}
              onClick={onNavigateToVetList}
            >
              <span>Vets</span>
            </button>

            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'invoiceList'
                  ? 'font-bold underline'
                  : 'hover:underline'
              }`}
              onClick={onNavigateToInvoiceList}
            >
              <span>Invoices</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
