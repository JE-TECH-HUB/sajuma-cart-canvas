
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, Share2, Check, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity
    });
  };
  
  return (
    <>
      {/* Quantity Selector */}
      <div className="mb-6">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Quantity
        </label>
        <div className="flex items-center">
          <button
            type="button"
            className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-l-md flex items-center justify-center bg-white dark:bg-gray-800"
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
            className="border-t border-b border-gray-300 dark:border-gray-600 h-10 w-16 text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <button
            type="button"
            className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-r-md flex items-center justify-center bg-white dark:bg-gray-800"
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
      <Card className="p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-start space-x-3 mb-3">
          <Check className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium dark:text-white">Authentic Products</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">All our products are 100% authentic</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Truck className="h-5 w-5 text-sajuma mt-0.5" />
          <div>
            <p className="font-medium dark:text-white">Fast Delivery</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get your order delivered within 24-48 hours</p>
          </div>
        </div>
      </Card>
    </>
  );
}
