const styles = {
  inputDiv: "mb-4",
  input: "w-full border border-gray-300 rounded-lg p-2",
  label: "block text-gray-700 text-sm font-bold mb-2",
  formError: "text-red-500 text-xs italic",
};

interface UserFormFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserFormField: React.FC<UserFormFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  error,
  onChange,
}) => {
  return (
    <div className={styles.inputDiv}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
};
