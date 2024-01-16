"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Navbar } from "@/components/Navbar";
import { CategoryBanner } from "@/components/CategoryBanner";
import ProductItemPage from "@/components/ProductItemPage";
import { fetchProductById } from "@/redux/products/getProductByIdSlice";
import { Footer } from "@/components/Footer";
import { OrderHistoryComponent } from "@/components/OrderHistoryComponent";

const styles = {
  pageContainer: "w-full h-full bg-secondary",
};

const OrderHistoryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <OrderHistoryComponent />
      <CategoryBanner />
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
