import Image from "next/image";

const styles = {
  outerContainer:
    "flex justify-center items-start bg-primary hover:bg-opacity-75 hover:scale-105 transition ease-in-out duration-300 rounded-lg h-full",
  container: "flex flex-col justify-center items-center bg-primary",
  header: "text-xl font-bold text-text tracking-wide",
  imageContainer: "p-5",
};

interface CategoryItemProp {
  header: string;
  path: string;
}

export const CategoryItem: React.FC<CategoryItemProp> = ({ header, path }) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <span className={styles.header}>{header}</span>
        <div className={styles.imageContainer}>
          <Image src={path} alt="category image" width={500} height={800} />
        </div>
      </div>
    </div>
  );
};
