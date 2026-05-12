// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { useInventory } from './hooks/useInventory';

function App() {
  const inventory = useInventory();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Inventory Pro
              </h1>
            </div>
            <div className="flex gap-1">
              <Link to="/" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">Dashboard</Link>
              <Link to="/products" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md font-medium">จัดการสินค้า</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<Dashboard products={inventory.products} />} />
            <Route path="/products" element={<Products {...inventory} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;