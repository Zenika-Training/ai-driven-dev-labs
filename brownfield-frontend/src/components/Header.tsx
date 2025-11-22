import React from 'react';
import { Cat, Home, Calendar, Stethoscope } from 'lucide-react';

type View = 'petList' | 'petDetail' | 'visitList' | 'vetList';

interface HeaderProps {
  currentView: View;
  onNavigateToPetList: () => void;
  onNavigateToVisitList: () => void;
  onNavigateToVetList: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigateToPetList, onNavigateToVisitList, onNavigateToVetList }) => {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3">
              <Cat className="w-8 h-8 text-green-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pet Directory</h1>
              <p className="text-green-100 text-sm">Managing your furry friends</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="flex items-center gap-2">
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'petList' || currentView === 'petDetail'
                  ? 'bg-green-900'
                  : 'bg-green-800 hover:bg-green-900'
              }`}
              onClick={onNavigateToPetList}
            >
              <Home className="w-5 h-5" />
              <span>Pets</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'visitList'
                  ? 'bg-green-900'
                  : 'bg-green-800 hover:bg-green-900'
              }`}
              onClick={onNavigateToVisitList}
            >
              <Calendar className="w-5 h-5" />
              <span>Visits</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'vetList'
                  ? 'bg-green-900'
                  : 'bg-green-800 hover:bg-green-900'
              }`}
              onClick={onNavigateToVetList}
            >
              <Stethoscope className="w-5 h-5" />
              <span>Vets</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
