import { formatCurrency } from "../utils/formatters";
import { Copy } from "lucide-react";

export const SummaryModal = ({ isOpen, onClose, cart, cartTotal }) => {
  const copySummary = async () => {
    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }

    let text = "🧾 Resumen del pedido:\n";
    cart.forEach((item) => {
      text += `- ${item.name} (${item.presentation}) x${
        item.qty
      } — ${formatCurrency(item.price * item.qty)}\n`;
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4"
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
