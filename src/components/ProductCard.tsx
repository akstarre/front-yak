import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const styles = {
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

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };
  return (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className={styles.productCard}
      key={`${product.name}${product.id}`}
    >
      <Image src={product.image} alt={product.name} width="500" height="500" />
      <div className={styles.productAttributes}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productCategory}>{product.category}</p>
        <div className={styles.productTags}>{product.tags.join(", ")}</div>
      </div>
    </button>
  );
};
