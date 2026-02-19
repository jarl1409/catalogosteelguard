export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {/* Contenedor de imagen con brillo */}
      <div className="shimmer-wrapper bg-gray-200 h-80 w-full" />

      <div className="p-4">
        {/* Título con brillo */}
        <div className="shimmer-wrapper h-6 bg-gray-200 rounded w-3/4 mb-3" />
        
        {/* Código */}
        <div className="shimmer-wrapper h-3 bg-gray-100 rounded w-1/4 mb-4" />
        
        {/* Descripción */}
        <div className="space-y-2 mb-4">
          <div className="shimmer-wrapper h-3 bg-gray-50 rounded w-full" />
          <div className="shimmer-wrapper h-3 bg-gray-50 rounded w-5/6" />
        </div>

        {/* Selector y Botones */}
        <div className="shimmer-wrapper h-10 bg-gray-100 rounded-lg mb-4" />
        <div className="flex gap-2">
          <div className="shimmer-wrapper h-10 bg-gray-200 rounded-lg flex-1" />
          <div className="shimmer-wrapper h-10 bg-gray-200 rounded-lg w-12" />
        </div>
      </div>
    </div>
  );
};