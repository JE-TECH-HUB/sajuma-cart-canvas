
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="relative block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        
        {/* Product Badges */}
        <div className="absolute top-2 left-2">
          {product.isOrganic && (
            <Badge className="bg-green-600 text-white">Organic</Badge>
          )}
        </div>
        
        <div className="absolute top-2 right-2">
          {product.discount > 0 && (
            <Badge className="bg-sajuma-accent text-white">{product.discount}% OFF</Badge>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-800 hover:text-sajuma transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sajuma-dark">${discountedPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold text-sajuma-dark">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="bg-sajuma hover:bg-sajuma-dark"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.inStock ? "Add" : "Sold out"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
