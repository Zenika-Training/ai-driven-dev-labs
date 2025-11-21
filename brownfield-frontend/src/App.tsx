import { Header } from './components';
import { PetList } from './pet';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <PetList />
      </main>
    </div>
  );
}

export default App;
