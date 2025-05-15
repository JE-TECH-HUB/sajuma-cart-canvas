
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  return (
    <>
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
      
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h1>
      
      <div className="mb-4">
        <div className="flex items-center gap-3">
          {product.discount > 0 ? (
            <>
              <span className="text-2xl font-bold text-sajuma-dark dark:text-white">
                ₦{discountedPrice.toLocaleString('en-NG')}
              </span>
              <span className="text-gray-500 dark:text-gray-400 line-through">
                ₦{product.price.toLocaleString('en-NG')}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-sajuma-dark dark:text-white">
              ₦{product.price.toLocaleString('en-NG')}
            </span>
          )}
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none mb-6 text-gray-800 dark:text-gray-200">
        <p>{product.description}</p>
      </div>
    </>
  );
}
