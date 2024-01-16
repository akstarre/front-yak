import { useEffect, useState } from "react";
import { fetchUserId, isAuthenticated } from "../../utils/Authentication";
import { fetchCartHistory } from "@/redux/carts/cartHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { CheckoutList } from "./CheckoutList";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CartProduct } from "@/types/cart";
import { Product } from "@/types/product";

const styles = {
  pageContainer: "flex flex-col items-center justify-start h-[100vh] w-full",
  pageContents:
    "flex flex-col justify-between items-center bg-white p-8 rounded-lg m-4 w-[400px]",
  orderContainer: "m-2",
  header: "text-lg font-bold my-4",
};

export const OrderHistoryComponent = () => {
  const [userId, setUserId] = useState(null);

  const authenticated = isAuthenticated();
  const dispatch = useDispatch<AppDispatch>();
  const orderHistory = useSelector(
    (state: RootState) => state.cartHistory.cartHistory
  );

  const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("authToken");
        let username;
        if (token) {
          username = jwtDecode(token).sub;
        }
        const response = await axios.get(
          `${springBootUrl}/api/auth/user/findUserByUsername/${username}`
        );
        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching user shipping information:", error);
      }
    };
    if (authenticated) {
      fetchUserId();
      if (userId) dispatch(fetchCartHistory(userId));
    }
  }, [userId]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>ORDER HISTORY</h1>
      {orderHistory?.map((order) => {
        return (
          <div key={order.id} className={styles.pageContents}>
            <div className={styles.orderContainer}>
              <CheckoutList products={order.products} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
