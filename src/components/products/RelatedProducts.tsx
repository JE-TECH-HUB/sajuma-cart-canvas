
import { ProductList } from "@/components/products/ProductList";
import { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">You May Also Like</h2>
      <ProductList products={products} title="" showFilters={false} />
    </div>
  );
}
