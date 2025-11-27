import { useEffect,useState } from "react";
import { Copy, Package } from "lucide-react";
import { toNumber,formatCurrency } from "../utils/formatters";
import { COMPONENT_PRICE_EXCLUSIONS } from "../utils/constants";

export const ProductCard = ({ product, onAddToCart, onOpenModal }) => {
  const [selectedOption, setSelectedOption] = useState(product.prices[0]);
  const [buttonText, setButtonText] = useState("Agregar");

  useEffect(() => {
    setSelectedOption(product.prices[0]);
  }, [product]);

  const handleOptionChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    setSelectedOption(selectedValue);
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: `${product.name}-${selectedOption.presentation}`,
      name: product.name,
      price: toNumber(selectedOption.price),
      presentation: selectedOption.presentation,
    };

    onAddToCart(itemToAdd);
    setButtonText("✓ Añadido");
    setTimeout(() => setButtonText("Agregar"), 800);
  };

  const isComponentPriceExcluded = () => {
    const productNameLower = product.name.toLowerCase();

    // Si alguna de las palabras clave de la lista se encuentra en el nombre del producto, retorna true
    return COMPONENT_PRICE_EXCLUSIONS.some((keyword) =>
      productNameLower.includes(keyword.toLowerCase())
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
            onClick={handleAddToCart}
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
