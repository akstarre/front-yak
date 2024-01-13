"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import ProductItemAttributes from "./ProductItemAttributes";

interface ProductItemPageProps {
  product: Product;
}

const styles = {
  pageContainer: "flex justify-center bg-secondary",
  productDiv: "grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full",
  productImage: "m-4 col-span-1",
  productAttributes: "flex items-center justify-center col-span-1",
};

const ProductItemPage: React.FC<ProductItemPageProps> = ({ product }) => {
  console.log(product);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.productDiv}>
        <div className={styles.productImage}>
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
          />
        </div>
        <div className={styles.productAttributes}>
          <ProductItemAttributes
            name={product.name}
            description={product.description}
            price={product.price}
            id={product.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItemPage;
