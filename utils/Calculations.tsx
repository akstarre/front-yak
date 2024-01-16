import { CartProduct } from "@/types/cart";

export const calculateTotal = (products: CartProduct[]) => {
  return products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
