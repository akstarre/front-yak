import Image from "next/image";
import { useRef, useState } from "react";
import { AccountDropDownMenu } from "./AccountDropdownMenu";

const styles = {
  componentContainer:
    "relative flex flex-col justify-center items center w-200px",
  imageContainer:
    "relative w-[50px] h-[50px] md:w-[75px] md:h-[75px] xl:w-[100px] xl:h-[100px] rounded-full overflow-hidden border border-gray-200 shadow-sm",
};

export const AvatarDropDown = () => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdownMenu = () => {
    setShowDropdownMenu(true);
  };

  const closeDropdownMenu = () => {
    setShowDropdownMenu(false);
  };

  const updateDropdowMenu = () => {
    setShowDropdownMenu((prevState) => !prevState);
  };

  const handleDropBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      closeDropdownMenu();
    }
  };

  return (
    <>
      <div
        className={styles.componentContainer}
        ref={dropdownRef}
        onBlur={handleDropBlur}
      >
        <button className={styles.imageContainer} onClick={updateDropdowMenu}>
          <Image
            src="/yak-avatar.png"
            alt="Yak Avatar"
            layout="fill"
            objectFit="cover"
          />
        </button>
        {showDropdownMenu && <AccountDropDownMenu />}
      </div>
    </>
  );
};
