import {useState} from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemPrice = item.price;
    
    
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      setCart(prevCart => prevCart.map((cartItem, index) => 
        index === existingItemIndex
          ? { 
              ...cartItem, 
              qty: cartItem.qty + 1,
              price: itemPrice 
            }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, price: itemPrice, qty: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    if (cart.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }
    if (window.confirm('¿Deseas eliminar todos los productos del carrito?')) {
      setCart([]);
      alert('Carrito vaciado correctamente');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount
  };
};

