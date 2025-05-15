
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";

interface ProductBreadcrumbsProps {
  product: Product;
}

export function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  return (
    <nav className="flex mb-6 text-sm">
      <Link to="/" className="text-gray-500 hover:text-sajuma dark:text-gray-400 dark:hover:text-sajuma-accent">Home</Link>
      <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
      <Link to="/products" className="text-gray-500 hover:text-sajuma dark:text-gray-400 dark:hover:text-sajuma-accent">Products</Link>
      <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
      <Link 
        to={`/categories/${product.category}`} 
        className="text-gray-500 hover:text-sajuma dark:text-gray-400 dark:hover:text-sajuma-accent"
      >
        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </Link>
      <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
      <span className="text-gray-800 font-medium dark:text-white">{product.name}</span>
    </nav>
  );
}
