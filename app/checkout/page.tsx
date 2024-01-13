"use client";
import { CheckoutComponent } from "@/components/CheckoutComponent";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { Navbar } from "@/components/Navbar";

const styles = {
  pageContainer: "flex flex-col w-full h-[100vh] bg-secondary",
};

export default function Checkout() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <CheckoutComponent />
      <Footer />
    </div>
  );
}
