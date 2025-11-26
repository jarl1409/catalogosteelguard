import { Search } from "lucide-react";

export const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-gray-950 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col items-center lg:flex-row lg:justify-start lg:gap-8">
          <img
            className="w-48 lg:w-96 mb-4 lg:mb-0"
            src="/public/LOGOTIPO AMARILLO.png"
            alt="Logotipo Steelguard Amarillo"
          />

          <div className="w-full lg:w-auto lg:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-300 text-center mb-4 lg:text-left">
              Lista De Precios Pinturas SteelGuard
            </h1>

            <div className="relative max-w-2xl mx-auto lg:mx-0">
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
      </div>
    </div>
  );
};
