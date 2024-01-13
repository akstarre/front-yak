import { CategoryItem } from "./CategoryItem";
import { ItemBreak } from "./ItemBreak";
import { useRouter } from "next/navigation";

const styles = {
  outerContainer: "flex justify-center bg-primary h-full",
  container:
    "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4 bg-primary w-[90vw] h-full",
  header: "text-xl font-bold text-text tracking-wide",
  button: "h-full",
};

const categories = {
  Clothing: "/yakshirt.png",
  Accessories: "/yakearring.png",
  Kitchenware: "/yakcup.png",
  Stickers: "/yaksticker.png",
};

export const CategoryBanner = () => {
  const router = useRouter();

  const navigate = (path: string) => () => {
    router.push(`/shop/${path}`);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        {Object.entries(categories).map(([key, value], i) => {
          return (
            <button key={key} className={styles.button} onClick={navigate(key)}>
              <CategoryItem key={`${key}-${value}`} header={key} path={value} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
