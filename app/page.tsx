"use client";

import { Navbar } from "@/components/Navbar";
import { CategoryBanner } from "@/components/CategoryBanner";
import Image from "next/image";
import { Footer } from "@/components/Footer";

const styles = {
  pageContainer: "flex flex-col w-full min-h-[100vh] bg-secondary",
  imageContainer: "flex justify-center items-center",
  fakeDiv: "h-[200px] w-full bg-secondary",
};

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.imageContainer}>
        <Image
          src="/wanderingbanner.jpg"
          alt="Wandering Yak Banner"
          width={1000}
          height={150}
          layout="intrinsic"
        />
      </div>
      <div>
        <CategoryBanner />
      </div>
      <Footer />
    </div>
  );
}
