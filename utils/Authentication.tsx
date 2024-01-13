import { jwtDecode } from "jwt-decode";

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
