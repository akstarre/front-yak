import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../utils/Authentication";

const styles = {
  formContainer: "flex items-start justify-center h-[100vh] w-full",
  formContents:
    "flex flex-col justify-between items-center h-[400px] bg-white p-8 rounded-lg m-24",
  signUpDiv: "m-2",
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const OrderHistoryComponent = () => {
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
  }, [authenticated]);
  return (
    <div className={styles.formContainer}>
      <div className={styles.formContents}>
        <div className={styles.signUpDiv}></div>
      </div>
    </div>
  );
};
