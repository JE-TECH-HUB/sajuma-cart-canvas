
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart</h1>
        <p className="text-gray-600 mb-8">Review the items in your cart before checkout.</p>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 mb-4">
                  <h2 className="text-lg font-semibold">Shopping Cart ({cartItems.length} items)</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
                
                <div>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Browse our products and find something you like!
            </p>
            <Button asChild className="bg-sajuma hover:bg-sajuma-dark">
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
