export interface Cart {
  id: string | null;
  userId: string | null;
  products: CartProduct[];
}

export interface CartProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}
