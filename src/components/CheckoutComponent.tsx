import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from "../../utils/Authentication";
import { CheckoutList } from "./CheckoutList";
import { UserCheckoutInformation } from "./UserCheckoutInformation";
import BlueButton from "./BlueButton";
import { useDispatch, useSelector } from "react-redux";
import { postCart } from "@/redux/carts/cartSlice";
import { Cart } from "@/types/cart";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { SuccessModal } from "./SuccessModal";

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

const styles = {
  pageContainer:
    "flex flex-col items-center justify-start h-screen w-full bg-secondary",
  cartContents:
    "text-center w-full max-w-md bg-white p-8 rounded-lg shadow-md m-4",
  checkoutList: "border-t border-black",
  checkoutListItem: "flex justify-between",
  listItem: "mx-1",
  itemTotal: "self-end",
  header: "text-lg font-bold",
  flexCol: "flex flex-col items-center",
  error: "text-red-400",
};

// const products = [
//   {
//     name: "Yak-Themed Ceramic Mug",
//     price: 15,
//     productId: "65981ffe2d580a513ae5acac",
//     quantity: 4,
//   },
//   {
//     name: "Yak Wool Socks",
//     price: 20,
//     productId: "65981ffe2d580a513ae5acbe",
//     quantity: 6,
//   },
//   {
//     name: "Yak Silhouette Sticker",
//     price: 3,
//     productId: "65981ffe2d580a513ae5acc4",
//     quantity: 4,
//   },
//   {
//     name: "Yak-Themed Ceramic Mug",
//     price: 15,
//     productId: "65981ffe2d580a513ae5acac",
//     quantity: 4,
//   },
// ];

export const CheckoutComponent = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [user, setUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  const authenticated = isAuthenticated();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserShippingInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        let username;
        if (token) {
          username = jwtDecode(token).sub;
        }
        const response = await axios.get(
          `${springBootUrl}/api/auth/user/getUserShippingByUsername/${username}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user shipping information:", error);
      }
    };

    if (authenticated) {
      fetchUserShippingInfo();
    }
  }, [authenticated]);

  const calculateTotal = () => {
    return cart?.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onCheckout = () => {
    let response;
    if (cart) {
      response = dispatch(postCart(cart))
        .then((response) => {
          setShowSuccessModal(true);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <div className={styles.pageContainer}>
      {showSuccessModal && <SuccessModal text="Order Submission" path="Home" />}
      <div className={styles.cartContents}>
        <h2 className={styles.header}>Checkout</h2>
        <CheckoutList
          products={cart?.products}
          calculateTotal={calculateTotal}
        />
      </div>
      {authenticated ? (
        <>
          <div className={styles.cartContents}>
            <UserCheckoutInformation user={user} />
          </div>
          <BlueButton onClick={onCheckout} text="Checkout" />
        </>
      ) : (
        <div className={styles.flexCol}>
          <h2 className={styles.header}>Login or Register to checkout</h2>
          <div>
            <LoginForm redirect="/checkout" />
          </div>
        </div>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
