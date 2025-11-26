import { Search } from "lucide-react";

export const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-gray-950 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-300 text-center mb-4">
          Catálogo de Productos FARBEN
        </h1>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, código o descripción..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
          />
        </div>
      </div>
    </div>
  );
};
