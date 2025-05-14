
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  // If cart has items, user might be refreshing or directly accessing this page
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-sajuma/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-12 w-12 text-sajuma" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Thank You for Your Order!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your order has been placed and is being processed. We have sent you an email with your order details.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">SAJ-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()} - 
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-sajuma hover:bg-sajuma-dark">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
