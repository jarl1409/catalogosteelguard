import { ShoppingCart, X, Trash2, FileText } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

export const CartPanel = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  onOpenSummary,
  cartTotal,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 md:right-0 md:left-auto md:top-0 md:bottom-auto md:w-96 bg-white rounded-t-2xl md:rounded-none shadow-2xl z-50 max-h-[90vh] md:max-h-screen flex flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">🛒 Tu Carrito</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">El carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      {item.presentation}x{item.qty} • {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-blue-600">{formatCurrency(cartTotal)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenSummary}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              <FileText className="w-4 h-4" />
              Resumen
            </button>
            <button
              onClick={onClearCart}
              className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              Vaciar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export const SummaryModal = ({ isOpen, onClose, cart, cartTotal }) => {
  const copySummary = async () => {
    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }

    let text = "🧾 Resumen del pedido:\n";
    cart.forEach((item) => {
      text += `- ${item.name} x${item.qty} — ${formatCurrency(
        item.price * item.qty
      )}\n`;
    });
    text += `TOTAL: ${formatCurrency(cartTotal)}`;

    try {
      await navigator.clipboard.writeText(text);
      alert("Resumen copiado ✅");
    } catch (e) {
      alert("No se pudo copiar");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Producto</th>
                <th className="text-center py-2">Cant.</th>
                <th className="text-right py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    El carrito está vacío
                  </td>
                </tr>
              ) : (
                cart.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="text-center py-2">{item.qty}</td>
                    <td className="text-right py-2">
                      {formatCurrency(item.price * item.qty)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan="2" className="py-2">
                  Total
                </td>
                <td className="text-right py-2 text-blue-600">
                  {formatCurrency(cartTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={copySummary}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <Copy className="w-4 h-4" />
            Copiar
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
