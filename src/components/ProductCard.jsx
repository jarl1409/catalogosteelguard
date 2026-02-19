import { useEffect, useState } from "react";
import { Copy, Package } from "lucide-react";

import { SelectionModal } from "./SelectionModal";
import { toNumber, formatCurrency } from "../utils/formatters";
import { COMPONENT_PRICE_EXCLUSIONS } from "../utils/constants";

export const ProductCard = ({ product, onAddToCart, onOpenModal }) => {
  const [selectedOption, setSelectedOption] = useState(product.prices[0]);
  const [buttonText, setButtonText] = useState("Agregar");
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(product.prices[0]);
  }, [product]);

  const handleOptionChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    setSelectedOption(selectedValue);
  };

  const handleAddToCartClick = () => {
    // Si tiene catalizador o completo, abrimos el modal
    const hasComplexOptions =
      Number(selectedOption.soloCatalizador) > 0 ||
      Number(selectedOption.completo) > 0;

    if (hasComplexOptions) {
      setIsSelectionModalOpen(true);
    } else {
      confirmAddition("base");
    }
  };

  const confirmAddition = (tipo) => {
    let nameSuffix = "";
    let finalPrice = selectedOption.price;

    if (tipo === "catalizador") {
      nameSuffix = ` + ${selectedOption.nomCat || "Cat."}`;
      finalPrice = selectedOption.soloCatalizador;
    } else if (tipo === "completo") {
      nameSuffix = " (KIT COMPLETO)";
      finalPrice = selectedOption.completo;
    }

    const itemToAdd = {
      id: `${product.name}-${selectedOption.presentation}-${tipo}`,
      name: `${product.name}${nameSuffix}`,
      price: Number(finalPrice),
      presentation: selectedOption.presentation,
      extraInfo: tipo === "completo" ? selectedOption.proporcion : null,
    };

    onAddToCart(itemToAdd);
    setIsSelectionModalOpen(false);
    setButtonText("✓ Añadido");
    setTimeout(() => setButtonText("Agregar"), 800);
  };

  const isComponentPriceExcluded = () => {
    const productNameLower = product.name.toLowerCase();

    // Si alguna de las palabras clave de la lista se encuentra en el nombre del producto, retorna true
    return COMPONENT_PRICE_EXCLUSIONS.some((keyword) =>
      productNameLower.includes(keyword.toLowerCase()),
    );
  };

  const excluded = isComponentPriceExcluded();

  const handleCopy = async () => {
    const text = `${product.name} - ${
      selectedOption.presentation
    } : ${formatCurrency(selectedOption.price)}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      alert("No se pudo copiar");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div
        className="bg-gray-100 flex items-center justify-center p-4 h-80"
        onClick={() => onOpenModal && onOpenModal(product)}
      >
        {product.foto ? (
          <img
            src={product.foto}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-16 h-16 text-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-800">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">
          Código: {product.code || "N/A"}
        </p>
        <p className="text-sm text-red-600 mb-3 line-clamp-2">
          {selectedOption.info || product.info}
        </p>

        {/* Price Select */}
        {product.prices.length > 1 ? (
          <select
            value={JSON.stringify(selectedOption)}
            onChange={handleOptionChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {product.prices.map((option, index) => (
              <option key={index} value={JSON.stringify(option)}>
                {option.presentation}: {formatCurrency(option.price)}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg mb-3 text-sm font-medium text-gray-700">
            {selectedOption.presentation}:{" "}
            {formatCurrency(selectedOption.price)}
          </div>
        )}
        <div className="text-xs text-gray-500 space-y-1 mb-3 mt-1">
          {Number(selectedOption.completo) > 0 && !excluded && (
            <p className="flex justify-between">
              <span className="font-medium">Completo:</span>
              <span className="font-semibold text-gray-700">
                {formatCurrency(selectedOption.completo)}
              </span>
            </p>
          )}
          {Number(selectedOption.soloCatalizador) > 0 && !excluded && (
            <p className="flex justify-between">
              <span className="font-medium">Solo Catalizador:</span>
              <span className="font-semibold text-gray-700">
                {formatCurrency(selectedOption.soloCatalizador)}
              </span>
            </p>
          )}
          {Number(selectedOption.soloDisolvente) > 0 && !excluded && (
            <p className="flex justify-between">
              <span className="font-medium">Solo Disolvente:</span>
              <span className="font-semibold text-gray-700">
                {formatCurrency(selectedOption.soloDisolvente)}
              </span>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2"></div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCartClick}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-lg hover:from-green-500 hover:to-green-600 transition font-semibold text-sm"
          >
            {buttonText}
          </button>
          <button
            onClick={handleCopy}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <SelectionModal
          isOpen={isSelectionModalOpen}
          onClose={() => setIsSelectionModalOpen(false)}
          product={product}
          selectedOption={selectedOption}
          onConfirm={confirmAddition}
        />

        {/* Link */}
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-blue-500 hover:text-blue-700 text-sm mt-2 underline"
          >
            🔗 Ver más
          </a>
        )}
      </div>
    </div>
  );
};
