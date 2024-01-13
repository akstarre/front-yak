"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const styles = {
  pageContainer: "flex flex-col h-[100vh] bg-secondary",
  headerContainer: "flex items-center justify-center text-center h-[20vh]",
  header: "text-xl",
  aboutParagraph: "flex justify-center text-center",
  paragraph: "w-[50vw] h-48",
  test: "w-[50vw] h-[50vh]",
};

export default function AboutUs() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>About Us</h1>
      </div>
      <div className={styles.aboutParagraph}>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro
          deleniti quod sint distinctio rem sit modi esse, placeat, quaerat,
          ipsum ipsa id explicabo nostrum tempora impedit sapiente illo! Odit.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
          voluptatibus sit hic magni tenetur quae recusandae doloremque nobis
          vel, magnam itaque illum voluptas eum praesentium modi atque aut
          maxime neque? Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Tenetur enim omnis corrupti amet quasi dolore, veniam odio
          officia incidunt debitis nam beatae minima repellat quisquam
          explicabo. Laborum aspernatur modi et!
        </p>
      </div>
      <Footer />
    </div>
  );
}
