import axios from "axios";
import { jwtDecode } from "jwt-decode";

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      localStorage.removeItem("authToken");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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
    return response.data;
  } catch (error) {
    console.error("Error fetching user shipping information:", error);
  }
};
