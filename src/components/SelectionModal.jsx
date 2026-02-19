import { createPortal } from "react-dom"; // Importante para el Portal
import { X, Package, Pipette, Beaker } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

export const SelectionModal = ({
  isOpen,
  onClose,
  product,
  selectedOption,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const options = [
    {
      id: "base",
      title: "Solo Producto",
      icon: <Package className="w-5 h-5" />,
      price: selectedOption.price,
      description: "Solo el envase principal.",
      style: "border-gray-200 hover:border-blue-500",
    },
    {
      id: "catalizador",
      title: "Producto + Catalizador",
      icon: <Pipette className="w-5 h-5" />,
      price: selectedOption.soloCatalizador,
      description: `Incluye: ${selectedOption.nomCat || "Catalizador"}`,
      style: "border-gray-200 hover:border-purple-500",
    },
    {
      id: "completo",
      title: "Sistema Completo",
      icon: <Beaker className="w-5 h-5" />,
      price: selectedOption.completo,
      description: `Kit: ${selectedOption.nomCat} + ${selectedOption.nomDis}`,
      subText: `Relación: ${selectedOption.proporcion}`,
      style: "border-blue-200 bg-blue-50 hover:border-blue-500",
    },
  ];

  // El contenido del modal que queremos renderizar
  const modalHTML = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Overlay para cerrar al hacer clic fuera */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro cierre el modal
      >
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-800">Opciones de Mezcla</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
            <p className="text-xs text-blue-700 uppercase font-bold tracking-wider mb-1">
              Presentación Seleccionada:
            </p>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-lg font-black text-gray-900">
                {selectedOption.presentation}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Selecciona tu opción de compra para <br />
            <span className="font-bold text-gray-800">{product.name}</span>:
          </p>

          {options.map(
            (opt) =>
              Number(opt.price) > 0 && (
                <button
                  key={opt.id}
                  onClick={() => onConfirm(opt.id)}
                  className={`w-full flex items-start gap-4 p-4 border-2 rounded-xl transition-all text-left ${opt.style}`}
                >
                  <div className="mt-1 text-blue-600">{opt.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">
                        {opt.title}
                      </span>
                      <span className="font-black text-blue-700">
                        {formatCurrency(opt.price)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {opt.description}
                    </p>
                    {opt.subText && (
                      <p className="text-[10px] text-blue-500 font-medium mt-1 uppercase italic">
                        {opt.subText}
                      </p>
                    )}
                  </div>
                </button>
              ),
          )}
        </div>
      </div>
    </div>
  );

  // Teletransportamos el HTML al final del <body>
  return createPortal(modalHTML, document.body);
};
