import { Package } from "lucide-react";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products, onAddToCart, onOpenModal }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onAddToCart={onAddToCart}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
};
