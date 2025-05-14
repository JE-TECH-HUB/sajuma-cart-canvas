
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface CartContextProps {
  cartItems: CartItem[];
  cartItemsCount: number;
  cartTotal: number;
  cartDiscountedTotal: number;
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("sajuma-cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("sajuma-cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const cartDiscountedTotal = cartItems.reduce((total, item) => {
    const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return total + (discountedPrice * item.quantity);
  }, 0);
  
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        
        toast({
          title: "Cart updated",
          description: `${item.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        toast({
          title: "Added to cart",
          description: `${item.name} has been added to your cart`,
        });
        
        return [...prevItems, item];
      }
    });
  };
  
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeFromCart = (id: string) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast({
        title: "Item removed",
        description: `${itemToRemove.name} has been removed from your cart`,
      });
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsCount,
        cartTotal,
        cartDiscountedTotal,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
}
