import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductsListProps {
  products: Product[];
}

const styles = {
  productsContainer:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4",
  productCard:
    "border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-between shadow-md hover:shadow-lg transition-shadow bg-primary",
  productImage: "w-32 h-32 object-cover object-center mb-4 rounded",
  productAttributes:
    "justify-self-end flex flex-col items-center text-center h-[200px]",
  productName: "font-semibold text-lg mb-2",
  productPrice: "text-gray-600 mb-2",
  productDescription: "text-sm text-gray-500 mb-2",
  productCategory: "text-sm text-gray-400 mb-2",
  productTags: "text-xs text-gray-400",
};

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className={styles.productsContainer}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
