import { CartProduct } from "@/types/cart";
import { Product } from "@/types/product";

const styles = {
  pageContainer: "flex items-start justify-center h-screen w-full bg-secondary",
  cartContents:
    "text-center w-full max-w-md bg-white p-8 rounded-lg shadow-md m-4",
  checkoutList: "border-t border-black",
  checkoutListItem: "flex justify-between",
  listItem: "mx-1",
  itemTotal: "self-end",
  header: "text-lg font-bold",
};

interface CheckoutListProps {
  products: CartProduct[] | undefined;
  calculateTotal: () => number | undefined;
}

export const CheckoutList: React.FC<CheckoutListProps> = ({
  products,
  calculateTotal,
}) => {
  return (
    <div className={styles.checkoutList}>
      {products?.map((product, i) => {
        return (
          <div
            key={`${product.productId}${product.quantity}${i}`}
            className={styles.checkoutListItem}
          >
            <div>
              <span className={styles.listItem}>{product.name}</span>
              <span className={styles.listItem}>x{product.quantity}</span>
            </div>
            <span className={styles.itemTotal}>
              ${product.quantity * product.price}
            </span>
          </div>
        );
      })}
      <div className={styles.checkoutList}>
        <div className={styles.checkoutListItem}>
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
};
