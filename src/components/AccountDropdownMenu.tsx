import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const styles = {
  dropdownContainer:
    "absolute top-24 right-0 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-[200px] transition-all duration-350 ease-in-out",
  header:
    "text-lg font-semibold text-gray-700 p-4 bg-gray-100 border-b border-gray-200",
  styledButton:
    "py-2 px-4 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200",
  buttonContainer: "flex flex-col",
};

export const AccountDropDownMenu = () => {
  const router = useRouter();
  const token = localStorage.getItem("authToken");
  let username;
  if (token) {
    username = jwtDecode(token).sub;
  }

  const logOut = () => {
    localStorage.removeItem("authToken");
    router.refresh();
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.header}>
        Welcome, <span className="text-blue-500">{username}</span>!
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.styledButton}
          onClick={() => navigate("/checkout")}
        >
          Cart
        </button>
        <button className={styles.styledButton}>Account Details</button>
        <button className={styles.styledButton}>Order History</button>
        <button className={styles.styledButton} onClick={() => logOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};
