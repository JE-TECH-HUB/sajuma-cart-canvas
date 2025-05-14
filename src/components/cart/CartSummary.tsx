
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

export function CartSummary() {
  const { cartItems, cartTotal, cartDiscountedTotal } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  
  const savings = cartTotal - cartDiscountedTotal;
  const tax = cartDiscountedTotal * 0.07; // Example tax rate of 7%
  const shipping = cartDiscountedTotal > 50 ? 0 : 5.99; // Free shipping over $50
  const orderTotal = cartDiscountedTotal + tax + shipping;
  
  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    setIsApplyingPromo(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsApplyingPromo(false);
      
      // Mock promo code validation
      if (promoCode.toUpperCase() === "WELCOME10") {
        toast({
          title: "Promo code applied",
          description: "You got 10% off your order!",
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "Please enter a valid promo code",
          variant: "destructive",
        });
      }
      
      setPromoCode("");
    }, 1000);
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between text-sajuma-accent">
            <span>Savings</span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
          Promo Code
        </label>
        <div className="flex gap-2">
          <Input
            id="promo-code"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button 
            onClick={handleApplyPromo} 
            disabled={!promoCode || isApplyingPromo}
            className="bg-sajuma hover:bg-sajuma-dark"
          >
            Apply
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Try "WELCOME10" for 10% off</p>
      </div>
      
      <Button asChild className="w-full bg-sajuma-accent hover:bg-sajuma">
        <Link to="/checkout">
          Proceed to Checkout
        </Link>
      </Button>
      
      <div className="mt-4">
        <p className="text-xs text-gray-500 text-center">
          By proceeding, you agree to our <Link to="/terms" className="text-sajuma hover:underline">Terms</Link> and acknowledge our <Link to="/privacy" className="text-sajuma hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
