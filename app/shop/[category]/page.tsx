"use client";

import { Navbar } from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "@/redux/products/getProductsByCategorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ProductsList } from "@/components/ProductsList";
import { useEffect } from "react";
import { ReduxProvider } from "../../ReduxProvider";
import { useParams } from "next/navigation";
import { CategoryBanner } from "@/components/CategoryBanner";
import { Footer } from "@/components/Footer";

const styles = {
  pageContainer: "flex flex-col w-full h-full bg-secondary",
  headerContainer: "flex items-center justify-center text-center w-full",
  header: "text-xl",
};

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();

  const { category } = useParams();

  useEffect(() => {
    if (typeof category === "string")
      dispatch(fetchProductsByCategory(category));
  }, [dispatch]);

  const { status, categories, error } = useSelector(
    (state: RootState) => state.productsByCategory
  );

  const productCategory = categories[category];

  return (
    <>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>{category}</h1>
        </div>
        {status === "succeeded" && <ProductsList products={productCategory} />}
        <CategoryBanner />
        <Footer />
      </div>
    </>
  );
}
