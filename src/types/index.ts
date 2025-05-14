
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  isOrganic: boolean;
  discount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
