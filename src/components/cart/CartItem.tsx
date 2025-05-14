
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(item.id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  const discountedPrice = item.discount 
    ? item.price * (1 - item.discount / 100) 
    : item.price;
    
  const itemTotal = discountedPrice * item.quantity;
  
  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-20 h-20 mb-4 sm:mb-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-1 px-4">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        
        {item.isOrganic && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
            Organic
          </span>
        )}
        
        <div className="flex items-center mt-1">
          {item.discount > 0 ? (
            <div className="flex items-center">
              <span className="font-medium text-sajuma-dark">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
              <span className="text-xs bg-sajuma-accent text-white px-2 py-1 rounded-full ml-2">
                {item.discount}% OFF
              </span>
            </div>
          ) : (
            <span className="font-medium text-sajuma-dark">${item.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center">{item.quantity}</span>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="w-24 text-right ml-6">
          <div className="font-medium">${itemTotal.toFixed(2)}</div>
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-2 text-gray-500 hover:text-red-500"
          onClick={handleRemove}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
