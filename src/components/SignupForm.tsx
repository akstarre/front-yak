import { useState } from "react";
import { UserFormField } from "./UserFormField";
import { useRouter } from "next/navigation";
import { SuccessModal } from "./SuccessModal";

const styles = {
  formContainer:
    "flex items-center justify-center h-screen w-full bg-secondary",
  formContents: "w-full max-w-md bg-white p-8 rounded-lg shadow-md",
  inputDiv: "mb-4",
  input: "w-full border border-gray-300 rounded-lg p-2",
  label: "block text-gray-700 text-sm font-bold mb-2",
  signUpButton:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
};

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullname: "",
    phoneNumber: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

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
        const { confirmPassword, ...partialFormData } = formData;

        const submissionData = {
          ...partialFormData,
          isActive: true,
          role: "user",
        };

        const response = await fetch(`${springBootUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        setShowSuccessModal(true);

        setTimeout(() => {
          router.push("/login");
        }, 3000);

        const result = await response.json();
        console.log("Successfully registered", result);
      } catch (error) {
        console.error("Registration failed", error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    const {
      username,
      password,
      confirmPassword,
      fullname,
      phoneNumber,
      address,
    } = formData;

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!fullname) {
      errors.fullname = "Full name is required";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }

    if (!address) {
      errors.address = "Address is required";
    }

    return errors;
  };

  return (
    <div className={styles.formContainer}>
      {showSuccessModal && <SuccessModal text="Registration" path="Log in" />}
      <form onSubmit={handleSubmit} className={styles.formContents}>
        <h1 className="text-xl font-semibold text-center mb-6">
          Create an Account
        </h1>

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

        <UserFormField
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          error={formErrors.confirmPassword}
          onChange={handleChange}
        />

        <UserFormField
          label="Full Name"
          id="fullname"
          name="fullname"
          type="text"
          value={formData.fullname}
          error={formErrors.fullname}
          onChange={handleChange}
        />
        <UserFormField
          label="Email"
          id="email"
          name="email"
          type="text"
          value={formData.email}
          error={formErrors.email}
          onChange={handleChange}
        />
        <UserFormField
          label="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          error={formErrors.phoneNumber}
          onChange={handleChange}
        />

        <UserFormField
          label="Address"
          id="address"
          name="address"
          type="text"
          value={formData.address}
          error={formErrors.address}
          onChange={handleChange}
        />

        <button className={styles.signUpButton} type="submit">
          Create an Account
        </button>
      </form>
    </div>
  );
};
