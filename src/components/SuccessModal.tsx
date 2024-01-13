const styles = {
  modalContainer:
    "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center",
  modalInner:
    "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center",
  paragraph: "text-lg font-semibold",
};

interface SuccessModalProps {
  text: string;
  path: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ text, path }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalInner}>
        <p className={styles.paragraph}>{text} successful!</p>
        <p>Redirecting to {path} page...</p>
      </div>
    </div>
  );
};
