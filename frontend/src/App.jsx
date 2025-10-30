import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Receipt from "./components/Receipt";
import Navbar from "./components/Navbar";
import api from "./api";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || 'products';
  });
  const [receipt, setReceipt] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart);
      setCartTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await api.post("/cart", { productId: product._id, qty: 1 });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleCheckout = async (customerInfo) => {
    try {
      const cartItems = cart.map(item => ({
        price: item.productId.price,
        qty: item.qty
      }));
      const res = await api.post("/checkout", { cartItems });
      setReceipt({ ...res.data, customerInfo });
      setCurrentView('receipt');
      await fetchCart();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar 
        cart={cart}
        onCartClick={() => {
          setCurrentView('cart');
          localStorage.setItem('currentView', 'cart');
        }}
        onLogoClick={() => {
          setCurrentView('products');
          localStorage.setItem('currentView', 'products');
        }}
      />

      <div className="w-full flex justify-center items-center" style={{paddingTop: '3px', paddingBottom: '3px'}}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          {currentView === 'cart' ? 'Shopping Cart' : currentView === 'checkout' ? 'Checkout' : currentView === 'receipt' ? '🎉 Order Complete' : 'Our Products'}
        </h1>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'products' && <ProductList onAddToCart={handleAddToCart} />}
        {currentView === 'cart' && (
          <Cart 
            cart={cart} 
            total={cartTotal}
            onRemove={handleRemoveFromCart}
            onCheckout={() => {
              setCurrentView('checkout');
              localStorage.setItem('currentView', 'checkout');
            }}
            onContinueShopping={() => {
              setCurrentView('products');
              localStorage.setItem('currentView', 'products');
            }}
          />
        )}
        {currentView === 'checkout' && (
          <Checkout 
            cart={cart}
            total={cartTotal}
            onSubmit={handleCheckout}
            onBack={() => {
              setCurrentView('cart');
              localStorage.setItem('currentView', 'cart');
            }}
          />
        )}
        {currentView === 'receipt' && (
          <Receipt 
            receipt={receipt}
            onNewOrder={() => {
              setCurrentView('products');
              localStorage.setItem('currentView', 'products');
              setReceipt(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
