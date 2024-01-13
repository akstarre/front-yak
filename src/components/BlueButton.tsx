import React from "react";

interface AddToCartButtonProps {
  onClick: () => void;
  text: string;
}

const styles = {
  addToCartButton:
    "px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 hover:scale-105 transition ease-in-out duration-150 m-2",
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

const BlueButton: React.FC<AddToCartButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.addToCartButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default BlueButton;
