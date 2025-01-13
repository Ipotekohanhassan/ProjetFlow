import { LayoutGrid, Plus, Search } from "lucide-react";

// Header Component
const Header = () => {
    return (
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Nouveau Projet</span>
          </button>
        </div>
      </header>
    );
};

export default Header