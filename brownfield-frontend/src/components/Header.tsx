import React from 'react';
import { Cat, Home, Heart, Menu } from 'lucide-react';

const Header: React.FC = () => {
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
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-800 hover:bg-green-900 transition-colors">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-800 hover:bg-green-900 transition-colors">
              <Heart className="w-5 h-5" />
              <span>Pet List</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-800 hover:bg-green-900 transition-colors">
              <Menu className="w-5 h-5" />
              <span>More</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
