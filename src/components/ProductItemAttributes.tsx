import React, { useState } from "react";
import AddToCartButton from "./BlueButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { isAuthenticated } from "../../utils/Authentication";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { addProduct, createCart } from "@/redux/carts/cartSlice";
import { productById } from "@/redux/products/getProductByIdSlice";
import { CartProduct } from "@/types/cart";
import { useRouter } from "next/navigation";
import BlueButton from "./BlueButton";

interface ProductItemAttributesProps {
  name: string;
  description: string;
  price: number;
  id: string;
}

const styles = {
  productAttributes:
    "block flex flex-col items-center justify-between w-full h-[200px]",
  productTitle: "text-2xl font-bold",
  productDescription: "mt-2 text-center text-gray-600",
  productPrice: "mt-2 text-lg font-semibold",
  counterDiv: "flex w-[95px] bg-primary rounded-lg m-2 p-2",
  counterButton:
    "flex items-center justify-center rounded-lg bg-white w-[30px] h-[25px] border border-gray px-2 pb-1 hover:bg-blue-500",
  counterDisplay: "text-center w-[25px]",
  cartButton:
    "px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 hover:scale-105 transition ease-in-out duration-150 m-4",
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

const ProductItemAttributes: React.FC<ProductItemAttributesProps> = ({
  name,
  description,
  price,
  id,
}) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.cart.cart);

  const addToCart = () => {
    const cartProduct: CartProduct = {
      productId: id,
      name: name,
      quantity: quantity,
      price: price,
    };
    dispatch(addProduct(cartProduct));
  };
  const checkout = () => {
    router.push("/checkout");
  };
  const incrementCoutner = () => {
    if (quantity < 98) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  const decrementCoutner = () => {
    if (quantity > 0) {
      setQuantity((prevState) => prevState - 1);
    }
  };
  return (
    <div className={styles.productAttributes}>
      <h1 className={styles.productTitle}>{name}</h1>
      <p className={styles.productDescription}>{description}</p>
      <p className={styles.productPrice}>{price}$</p>
      <div className={styles.counterDiv}>
        <button className={styles.counterButton} onClick={incrementCoutner}>
          +
        </button>
        <div className={styles.counterDisplay}>{quantity}</div>
        <button className={styles.counterButton} onClick={decrementCoutner}>
          -
        </button>
      </div>
      <BlueButton onClick={addToCart} text="Add to Cart" />
      <BlueButton onClick={checkout} text="Cart" />
    </div>
  );
};

export default ProductItemAttributes;
