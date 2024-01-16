interface UserCheckoutInformationProps {
  user: User | null;
}

const styles = {
  userInfo: "flex flex-col justify-between border-b border-black",
  listItem: "mx-1",
  itemTotal: "self-end",
  header: "text-lg font-bold",
};

export const UserCheckoutInformation: React.FC<
  UserCheckoutInformationProps
> = ({ user }) => {
  return (
    <div>
      <div className={styles.userInfo}>
        <span className={styles.listItem}>{user?.fullName}</span>
      </div>
      <div className={styles.userInfo}>
        <span className={styles.listItem}>{user?.address}</span>
        <span className={styles.listItem}>{user?.phoneNumber}</span>
        <span className={styles.listItem}>{user?.email}</span>

        <span className={styles.itemTotal}></span>
      </div>
    </div>
  );
};
