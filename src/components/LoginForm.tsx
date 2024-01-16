import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserFormField } from "./UserFormField";
import { SuccessModal } from "./SuccessModal";
import { useDispatch } from "react-redux";
import { createCart } from "@/redux/carts/cartSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const styles = {
  formContainer: "flex items-start justify-center h-[100vh] w-full",
  formContents:
    "flex flex-col justify-between items-center h-[400px] bg-white p-8 rounded-lg m-24",
  inputDivs: "flex ",
  input: "border-1 border-grey-500 rounded-lg m-2 p-2",
  loginButton: "py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-700",
  signUpButton: "text-blue-500 mx-2 hover:underline",
  signUpDiv: "m-2",
};

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

interface LoginFormProps {
  redirect: string;
}

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const LoginForm: React.FC<LoginFormProps> = ({ redirect }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const navigate = (path: string) => {
    router.push(path);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${springBootUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        setShowSuccessModal(true);

        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        const username = jwtDecode(data.token).sub;

        const { data: userId } = await axios(
          `${springBootUrl}/api/auth/user/findUserByUsername/${username}`
        );

        dispatch(createCart(userId));

        setTimeout(() => {
          router.push(redirect);
        }, 3000);
      } catch (error) {
        console.error("Authentication Failed", error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    const { username, password } = formData;

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className={styles.formContainer}>
      {showSuccessModal && <SuccessModal text="Login" path="Home" />}
      <form onSubmit={handleSubmit}>
        <div className={styles.formContents}>
          <h1>Sign-In</h1>
          <UserFormField
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            error={formErrors.username}
            onChange={handleChange}
          />
          <UserFormField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            error={formErrors.password}
            onChange={handleChange}
          />
          <div className={styles.signUpDiv}>
            <span>
              {`Don't have an account?`}
              <button
                className={styles.signUpButton}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </span>
          </div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
