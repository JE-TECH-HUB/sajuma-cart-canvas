
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ChevronRight, Heart, Share2, Check, Truck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductList } from "@/components/products/ProductList";
import { useCart } from "@/hooks/useCart";
import { featuredProducts } from "@/data/products";
import { Product } from "@/types";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Find product by ID
    const foundProduct = featuredProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category but not the same product)
      const related = featuredProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
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
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for does not exist or has been removed.</p>
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
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-sajuma">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-sajuma">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link 
            to={`/categories/${product.category}`} 
            className="text-gray-500 hover:text-sajuma"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
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
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="mb-4">
              <div className="flex items-center gap-3">
                {product.discount > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-sajuma-dark">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-sajuma-dark">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none mb-6">
              <p>{product.description}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
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
                  className="border-t border-b border-gray-300 h-10 w-16 text-center"
                />
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center"
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
              
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Delivery Info */}
            <Card className="p-4 bg-gray-50">
              <div className="flex items-start space-x-3 mb-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Authentic Products</p>
                  <p className="text-sm text-gray-600">All our products are 100% authentic</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 text-sajuma mt-0.5" />
                <div>
                  <p className="font-medium">Fast Delivery</p>
                  <p className="text-sm text-gray-600">Get your order delivered within 24-48 hours</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <ProductList products={relatedProducts} title="" showFilters={false} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
