import { useState } from "react";
import { useGoogleSheets } from "./hooks/useGoogleSheets";
import { useCart } from "./hooks/useCart";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { CartButton } from "./components/CartButton";
import { CartPanel } from "./components/CartPanel";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { SummaryModal } from "./components/SummaryModal";
import { Package } from "lucide-react";

const App = () => {
  const { products, isLoading, error } = useGoogleSheets();
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] =
    useState(null);

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchQuery.toLowerCase().trim();

    if (searchTermLower === "") {
      return true;
    }

    // 1. Buscar en el Nombre y Código (Nivel Superior)
    const matchesName = product.name.toLowerCase().includes(searchTermLower);
    const matchesInfo =
      product.info && product.info.toLowerCase().includes(searchTermLower);
    const matchesCode =
      product.code && product.code.toLowerCase().includes(searchTermLower);

    if (matchesName || matchesInfo || matchesCode) {
      return true;
    }

    // 2. Buscar DENTRO del array de Presentaciones (product.prices)
    const presentationMatch = product.prices.some((option) => {
      // Buscar en la presentación (ej. "1 GAL")
      const presentationText = option.presentation || "";
      if (presentationText.toLowerCase().includes(searchTermLower)) {
        return true;
      }

      // Buscar en el precio de venta público
      const priceText = String(option.price || 0);
      if (priceText.includes(searchTermLower)) {
        return true;
      }

      // Buscar en los precios adicionales y descripción específica
      const completoText = String(option.completo || "");
      if (completoText.includes(searchTermLower)) {
        return true;
      }
      const optionInfoText = option.info || "";
      if (optionInfoText.toLowerCase().includes(searchTermLower)) {
        return true;
      }
      return false;
    });

    return presentationMatch;
  });

  const handleOpenProductDetailModal = (product) => {
    setSelectedProductForDetail(product);
    setIsProductDetailOpen(true);
  };

  const handleCloseProductDetailModal = () => {
    setSelectedProductForDetail(null);
    setIsProductDetailOpen(false);
  };

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const showNoResults = filteredProducts.length === 0 && searchQuery;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {showNoResults ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No se encontraron productos para "{searchQuery}"
            </p>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            onOpenModal={handleOpenProductDetailModal}
          />
        )}
      </div>

      <CartButton
        itemCount={cartItemCount}
        onClick={() => setIsCartOpen(true)}
      />

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onOpenSummary={() => setIsSummaryOpen(true)}
        cartTotal={cartTotal}
      />

      <SummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
      />

      <ProductDetailModal
        isOpen={isProductDetailOpen}
        onClose={handleCloseProductDetailModal}
        // Este modal ahora recibe el producto detallado en lugar del carrito
        product={selectedProductForDetail}
        // Nota: Tendrás que adaptar SummaryModal para mostrar detalles de producto si lo usas aquí
        cart={[]}
        cartTotal={0}
      />
    </div>
  );
};

export default App;
