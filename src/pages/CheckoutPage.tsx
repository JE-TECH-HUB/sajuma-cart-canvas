
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartDiscountedTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form field states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    savePaymentInfo: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, savePaymentInfo: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      navigate("/products");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      
      clearCart();
      navigate("/order-confirmation");
    }, 2000);
  };
  
  const tax = cartDiscountedTotal * 0.07; // Example tax rate of 7%
  const shipping = shippingMethod === "express" ? 9.99 : (cartDiscountedTotal > 50 ? 0 : 5.99); // Free standard shipping over $50
  const orderTotal = cartDiscountedTotal + tax + shipping;
  
  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">You need to add items to your cart before checking out.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-4 pl-0 text-sajuma hover:text-sajuma-dark"
          >
            <Link to="/cart">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-600">Complete your purchase by providing your details below.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Info and Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                        value={formData.state}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          {/* Add other states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Shipping Method</Label>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1">
                          <div className="font-medium">Standard Delivery</div>
                          <div className="text-sm text-gray-500">
                            {cartDiscountedTotal > 50 ? 'Free' : '$5.99'} - Delivery within 3-5 business days
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1">
                          <div className="font-medium">Express Delivery</div>
                          <div className="text-sm text-gray-500">
                            $9.99 - Delivery within 1-2 business days
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="pt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox
                          id="savePaymentInfo"
                          checked={formData.savePaymentInfo}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <Label htmlFor="savePaymentInfo" className="text-sm">
                          Save this card for future purchases
                        </Label>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="sticky top-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order items summary */}
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span className="text-sm">
                              {item.name} <span className="text-gray-500">x{item.quantity}</span>
                            </span>
                            <span>
                              ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        
                        {cartTotal !== cartDiscountedTotal && (
                          <div className="flex justify-between text-sajuma-accent">
                            <span>Savings</span>
                            <span>-${(cartTotal - cartDiscountedTotal).toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total</span>
                          <span>${orderTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-sajuma-accent hover:bg-sajuma text-lg py-6"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        By completing this purchase, you agree to our <Link to="/terms" className="text-sajuma hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-sajuma hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
