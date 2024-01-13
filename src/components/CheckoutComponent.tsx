import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from "../../utils/Authentication";

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

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

const products = [
  {
    name: "Yak-Themed Ceramic Mug",
    price: 15,
    productId: "65981ffe2d580a513ae5acac",
    quantity: 4,
  },
  {
    name: "Yak Wool Socks",
    price: 20,
    productId: "65981ffe2d580a513ae5acbe",
    quantity: 6,
  },
  {
    name: "Yak Silhouette Sticker",
    price: 3,
    productId: "65981ffe2d580a513ae5acc4",
    quantity: 4,
  },
  {
    name: "Yak-Themed Ceramic Mug",
    price: 15,
    productId: "65981ffe2d580a513ae5acac",
    quantity: 4,
  },
];

export const CheckoutComponent = () => {
  //   const cart = useSelector((state: RootState) => state.cart.cart);
  const [user, setUser] = useState(null);

  const authenticated = isAuthenticated();

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
  }, []);

  const calculateTotal = () => {
    return products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onCheckout = () => {
    // Implement checkout logic
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cartContents}>
        <h2 className={styles.header}>Checkout</h2>
        <div className={styles.checkoutList}>
          {products.map((product) => {
            return (
              <div
                key={`${product.productId}${product.quantity}`}
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
      </div>
    </div>
  );
};
