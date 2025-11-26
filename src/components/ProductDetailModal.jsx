import { X, ExternalLink, Speaker, Video, Package } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

export const ProductDetailModal = ({ isOpen, onClose, product }) => {
  // No renderizar si no está abierto o si no hay producto
  if (!isOpen || !product) return null;

  // Usar la primera presentación como precio de referencia
  const basePriceOption = product.prices[0];

  return (
    // Fondo semi-transparente para el modal
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        {/* Cabecera del Modal */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido del Modal (Grid) */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Columna Izquierda: Imagen y Precios */}
          <div className="space-y-4">
            {/* Imagen principal */}
            {product.foto ? (
              <img
                src={product.foto}
                alt={product.name}
                className="w-full h-64 object-contain rounded-lg mb-4 shadow-md bg-gray-50 p-2"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg mb-4 shadow-md">
                <Package className="w-12 h-12 text-gray-300" />
              </div>
            )}

            {/* Precios de Referencia (Base) */}
            <div className="space-y-2 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-700 border-b border-blue-300 pb-1 mb-2 text-base">
                Precios de Referencia:
              </h3>

              {/* Mostrar el precio de la primera opción como base */}
              {basePriceOption && (
                <p className="flex justify-between font-semibold text-gray-800">
                  <span>{basePriceOption.presentation} (P. Público):</span>
                  <span className="font-extrabold text-blue-600">
                    {formatCurrency(basePriceOption.price)}
                  </span>
                </p>
              )}

              {/* Mostrar otros precios de la primera opción si están disponibles */}
              {Number(basePriceOption?.completo) > 0 && (
                <p className="flex justify-between">
                  <span className="font-medium">Precio Completo:</span>
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(basePriceOption.completo)}
                  </span>
                </p>
              )}
              {Number(basePriceOption?.soloCatalizador) > 0 && (
                <p className="flex justify-between">
                  <span className="font-medium">Solo Catalizador:</span>
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(basePriceOption.soloCatalizador)}
                  </span>
                </p>
              )}
              {Number(basePriceOption?.soloDisolvente) > 0 && (
                <p className="flex justify-between">
                  <span className="font-medium">Solo Disolvente:</span>
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(basePriceOption.soloDisolvente)}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Columna Derecha: Detalles y Enlaces */}
          <div>
            {/* Descripción Detallada (INFO) */}
            <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">
              Detalles del Producto
            </h3>
            <p className="text-gray-600 mb-4 text-sm whitespace-pre-wrap">
              {product.info ||
                "No hay información detallada disponible para este producto."}
            </p>

            {/* Sistema/Clasificación */}
            {product.sistema && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700">
                  Sistema / Clasificación:
                </h4>
                <p className="text-sm text-gray-600">{product.sistema}</p>
              </div>
            )}

            {/* Código */}
            {product.code && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700">Código:</h4>
                <p className="text-sm text-gray-600">{product.code}</p>
              </div>
            )}

            {/* Media y Enlaces */}
            <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">
              Recursos y Enlaces
            </h3>
            <div className="space-y-2 text-sm">
              {product.links && (
                <a
                  href={product.links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ficha Técnica (Link)
                </a>
              )}
              {product.audios && (
                <a
                  href={product.audios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-500 hover:text-purple-700 transition"
                >
                  <Speaker className="w-4 h-4" />
                  Escuchar Audio
                </a>
              )}
              {product.video && (
                <a
                  href={product.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
                >
                  <Video className="w-4 h-4" />
                  Ver Video Tutorial
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Pie de página (Botón de Cerrar) */}
        <div className="p-4 border-t bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
