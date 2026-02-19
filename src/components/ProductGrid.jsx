import { Package } from "lucide-react";
import { ProductSkeleton } from "./ProductSkeleton";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products, onAddToCart, onOpenModal, isLoading }) => {
  // 1. Mostrar Skeletons mientras carga
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // 2. Mostrar mensaje de vacío solo si ya terminó de cargar y no hay productos
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No se encontraron productos</p>
      </div>
    );
  }

  // 3. Renderizar productos reales
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id || index} // Es mejor usar un ID único si lo tienes
          product={product}
          onAddToCart={onAddToCart}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
};