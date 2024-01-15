import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../utils/Authentication";
import { AvatarDropDown } from "./AvatarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "@/redux/carts/cartSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import { RootState } from "@/redux/store";

const styles = {
  outerContainer: "flex flex-col justify-center items-center",
  navbar: "flex justify-evenly w-full border-text md:max-w-[50vw] max-w-[75vw]",
  navbarContainer:
    "flex flex-col justify-center items-center bg-primary w-full",
  logoContainer:
    "flex flex-col w-full justify-center items-center border-black border-b-2",
  upperNavbar:
    "relative flex items-center justify-end h-[50px] w-full bg-secondary",
  header: "text-xl font-semibold text-text tracking-wide",
  userDiv: "absolute top-16 right-20 flex justify-between mx-2 text-blue-500",
  linkButton: " text-black hover:text-blue-700 hover:underline m-2",
};

export const Navbar = () => {
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };

  const dispatch = useDispatch();
  const userIsAuthenticated = isAuthenticated();
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cart?.products
  );

  return (
    <div className={styles.outerContainer}>
      <div className={styles.upperNavbar}>
        <div className={styles.userDiv}>
          {userIsAuthenticated ? (
            <AvatarDropDown />
          ) : (
            <>
              <button
                className={styles.linkButton}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className={styles.linkButton}
                onClick={() => navigate("/signup")}
              >
                Sign-up
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <h1 className={styles.header}>The Wandering Yak</h1>
          <Image src="/yaklogo.png" alt="Yak Logo" width={125} height={125} />
        </div>
        <div className={styles.navbar}>
          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/shop">
            <button>Shop</button>
          </Link>

          <Link href="/about-us">
            <button>About Us</button>
          </Link>
          <Link href="/contact-us">
            <button>Contact</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
