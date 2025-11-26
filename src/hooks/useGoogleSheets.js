import { useState, useEffect } from "react";

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME;

export const useGoogleSheets = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!SHEET_ID || !SHEET_NAME) return;

    window.google = window.google || {};
    window.google.visualization = window.google.visualization || {};
    window.google.visualization.Query = window.google.visualization.Query || {};

    window.google.visualization.Query.setResponse = function (response) {
      if (!response || !response.table) {
        setError("Respuesta inválida del servidor");
        setIsLoading(false);
        return;
      }

      const cols = response.table.cols.map((c) =>
        (c.label || c.id || "")
          .toString()
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase()
      );
      const rows = response.table.rows.map((r) =>
        r.c.map((c) => (c ? c.v : ""))
      );

      const rawData = rows
        .map((row) => {
          const obj = {};
          cols.forEach((c, i) => (obj[c] = row[i]));

          return {
            name: obj["producto"],
            presentation: obj["presentacion"],
            code: obj["codigo"] || "",
            price: obj["venta publico iva incluido"] || "",
            priceAlmacen: obj["venta almacen iva incluido"] || "",
            info: obj["informacion"] || "",
            foto: obj["imagenes"] || "",
            link: obj["links"] || "",
            soloCatalizador: obj["solo catalizador"] || "",
            soloDisolvente: obj["solo disolvente"] || "",
            completo: obj["completo"] || "",
            audios: obj["audios"] || "",
            video: obj["video"] || "",
            pvd: obj["pvd"] || "",
          };
        })
        .filter((p) => p.name);

      const groupedProductsMap = rawData.reduce((acc, item) => {
        const productName = item.name.trim();

        if (!acc[productName]) {
          // Inicializa el producto base, tomando los detalles de la primera fila
          acc[productName] = {
            name: item.name,
            // Conservar todos los detalles para el modal

            foto: item.foto,
            links: item.links,
            sistema: item.sistema,
            audios: item.audios,
            video: item.video,
            pvd: item.pvd,
            prices: [], // Array para las opciones de presentación
          };
        } else {
          // Lógica de priorización de imagen: Si el producto AGRUPADO no tiene foto,
          // pero el ítem actual sí tiene una URL válida, la asigna.
          if (!acc[productName].foto && item.foto) {
            acc[productName].foto = item.foto;
          }
        }

        // Agrega la nueva opción de precio/presentación
        acc[productName].prices.push({
          presentation: item.presentation,
          price: item.price,
          priceAlmacen: item.priceAlmacen, // Agrega también el precio de almacén si es necesario
          info: item.info,
          sistema: item.sistema,
          completo: item.completo,
          soloCatalizador: item.soloCatalizador,
          soloDisolvente: item.soloDisolvente,
        });

        return acc;
      }, {});

      // 3. Convertir el mapa de vuelta a un array y establecer el estado
      const productsData = Object.values(groupedProductsMap);

      productsData.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(productsData);
      setIsLoading(false);
    };

    const script = document.createElement("script");
    script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(
      SHEET_NAME
    )}&tqx=out:json`;
    script.onerror = () => {
      setError("No se pudo cargar Google Sheets");
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [SHEET_ID, SHEET_NAME]);

  if (!SHEET_ID || !SHEET_NAME) {
    return {
      products: [],
      isLoading: false,
      error:
        "Error: VITE_SHEET_ID o VITE_SHEET_NAME no están definidos en .env",
    };
  }

  return { products, isLoading, error };
};
