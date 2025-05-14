
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyIcon, Check, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductList } from "@/components/products/ProductList";
import { useToast } from "@/hooks/use-toast";
import { featuredProducts } from "@/data/products";

type PromoCode = {
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
};

const promoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    discount: "10% OFF",
    description: "10% off your first order",
    expiryDate: "2023-12-31"
  },
  {
    code: "SUMMER25",
    discount: "25% OFF",
    description: "25% off selected summer items",
    expiryDate: "2023-08-31"
  },
  {
    code: "FREESHIP50",
    discount: "FREE SHIPPING",
    description: "Free shipping on orders over $50",
    expiryDate: "2023-12-31"
  }
];

const OffersPage = () => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    
    toast({
      title: "Code copied!",
      description: `${code} has been copied to clipboard`,
    });
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };
  
  const onSaleProducts = featuredProducts.filter(product => product.discount > 0);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Special Offers</h1>
          <p className="text-gray-600 mt-2">Check out our current deals, discounts, and promotions</p>
        </div>
        
        <div className="bg-gradient-to-r from-sajuma/20 to-sajuma-accent/20 rounded-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-sajuma-accent">Limited Time</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Summer Sale!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Get up to 30% off on selected seasonal products
            </p>
            <Button asChild className="bg-sajuma-accent hover:bg-sajuma text-lg">
              <Link to="/products">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="deals">
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="deals" className="flex-1 sm:flex-none">Current Deals</TabsTrigger>
            <TabsTrigger value="promo" className="flex-1 sm:flex-none">Promo Codes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deals" className="space-y-8">
            {/* Banner Deals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden bg-green-50">
                <div className="grid md:grid-cols-2">
                  <div className="p-6">
                    <Badge className="mb-2 bg-green-600">Organic Products</Badge>
                    <h3 className="text-xl font-bold mb-2">20% Off Organic Products</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Enjoy healthy and sustainable choices at a special price
                    </p>
                    <Button asChild>
                      <Link to="/products?category=fruits">
                        Shop Organic
                      </Link>
                    </Button>
                  </div>
                  <div className="h-full">
                    <img
                      src="https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=2574"
                      alt="Organic vegetables"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden bg-amber-50">
                <div className="grid md:grid-cols-2">
                  <div className="p-6">
                    <Badge className="mb-2 bg-sajuma-accent">Weekly Special</Badge>
                    <h3 className="text-xl font-bold mb-2">Buy 2, Get 1 Free</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      On all bakery items this week only!
                    </p>
                    <Button asChild>
                      <Link to="/products?category=bakery">
                        Shop Bakery
                      </Link>
                    </Button>
                  </div>
                  <div className="h-full">
                    <img
                      src="https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2670"
                      alt="Bakery items"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Products on Sale */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Products on Sale</h2>
              <ProductList products={onSaleProducts} title="" showFilters={false} />
            </div>
          </TabsContent>
          
          <TabsContent value="promo">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {promoCodes.map((promo) => (
                <Card key={promo.code} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gray-50 p-4 border-b">
                      <Badge className="bg-sajuma-accent mb-2">{promo.discount}</Badge>
                      <h3 className="font-semibold">{promo.description}</h3>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-mono bg-gray-100 px-3 py-1 rounded border border-gray-200 flex-1 mr-2 text-center">
                          {promo.code}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`min-w-[80px] ${copiedCode === promo.code ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                          onClick={() => handleCopyCode(promo.code)}
                        >
                          {copiedCode === promo.code ? (
                            <Check className="mr-1 h-4 w-4" />
                          ) : (
                            <CopyIcon className="mr-1 h-4 w-4" />
                          )}
                          {copiedCode === promo.code ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Expires: {new Date(promo.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">How to use promo codes</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Copy the promo code you want to use</li>
                <li>Add products to your cart</li>
                <li>Enter the promo code during checkout in the "Promo Code" field</li>
                <li>Click "Apply" to see your discount</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default OffersPage;
