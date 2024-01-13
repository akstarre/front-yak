"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SignupForm } from "@/components/SignupForm";

const styles = {
  pageContainer: "flex flex-col w-full h-[100vh] bg-secondary",
};

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <SignupForm />
      <Footer />
    </div>
  );
}
