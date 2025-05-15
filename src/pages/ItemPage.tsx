
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ChevronRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { featuredProducts } from "@/data/products";
import { Product } from "@/types";

const ItemPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // Find the product from the data
    const foundProduct = featuredProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity
      });
    }
  };
  
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Product Not Found</h1>
          <p className="mb-6 text-muted-foreground">The product you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  // Format price in Naira
  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString('en-NG')}`;
  };
  
  return (
    <div className="bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm items-center">
          <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
        
        {/* Back button */}
        <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden border border-border">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            {/* Product badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isOrganic && (
                <Badge className="bg-green-600">Organic</Badge>
              )}
              {product.discount > 0 && (
                <Badge className="bg-sajuma-accent">Sale {product.discount}% OFF</Badge>
              )}
              {product.inStock ? (
                <Badge variant="outline" className="text-green-600 border-green-600">In Stock</Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">Out of Stock</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            
            {/* Price information */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                {product.discount > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-foreground">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Product description */}
            <div className="prose prose-sm max-w-none mb-6 text-foreground">
              <p>{product.description}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 border border-border rounded-l-md flex items-center justify-center bg-background text-foreground"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="border-t border-b border-border h-10 w-16 text-center bg-background text-foreground"
                />
                <button
                  type="button"
                  className="w-10 h-10 border border-border rounded-r-md flex items-center justify-center bg-background text-foreground"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart} 
                className="bg-sajuma hover:bg-sajuma-dark flex-1"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-foreground">Product Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>High quality materials</li>
                <li>Carefully selected by our experts</li>
                <li>Fast nationwide delivery</li>
                <li>30-day money back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ItemPage;
