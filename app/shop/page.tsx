"use client";

import { Navbar } from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "@/redux/products/getAllProductsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ProductsList } from "@/components/ProductsList";
import { useEffect } from "react";
import { CategoryBanner } from "@/components/CategoryBanner";
import { Footer } from "@/components/Footer";

const styles = {
  pageContainer: "flex flex-col w-full h-full bg-secondary",
};

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const { status, items, error } = useSelector(
    (state: RootState) => state.products
  );
  const products = items || [];
  console.log(products, status);
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      {status === "succeeded" && products[0] && (
        <ProductsList products={products} />
      )}
      <CategoryBanner />
      <Footer />
    </div>
  );
}
