const styles = {
  modalContainer:
    "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center",
  modalInner: "bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto",
  paragraph: "text-lg font-semibold mb-4",
  secondaryParagraph: "text-md mb-2",
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
        <p className={styles.secondaryParagraph}>
          Redirecting to {path} page...
        </p>
      </div>
    </div>
  );
};
