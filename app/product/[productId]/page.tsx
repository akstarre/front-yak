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

const styles = {
  pageContainer: "w-full h-full bg-secondary",
};

const ProductPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (productId && typeof productId === "string") {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const product = useSelector((state: RootState) => state.productById.item);

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      {product && <ProductItemPage product={product} />}
      <CategoryBanner />
      <Footer />
    </div>
  );
};

export default ProductPage;
