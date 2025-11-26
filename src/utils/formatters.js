export const formatCurrency = (num) => {
  if (!num) return "$0";
  const clean = String(num).replace(/[^\d.-]/g, "");
  const n = Math.floor(parseFloat(clean) || 0);
  return "$" + n.toLocaleString("es-CO");
};

export const toNumber = (n) => {
  const clean = String(n).replace(/[^\d.-]/g, "");
  return Math.floor(parseFloat(clean) || 0);
};
