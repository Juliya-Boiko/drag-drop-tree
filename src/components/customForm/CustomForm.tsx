import styles from './customForm.module.css';
import { ActionButton } from '../actionButton/ActionButton';

type FormProps = {
  placeholder?: string,
  value: string,
  cancel: () => void,
  confirm: () => void,
  onChange: (e: any) => void,
};

export const CustomForm = ({ placeholder, value, onChange, confirm, cancel }: FormProps) => {
  return (
    <>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      <ActionButton onClick={confirm} disabled={value === '' ? true : false} actionType="done" />
      <ActionButton onClick={cancel} actionType="delete" title="cancel" />
    </>
  );
};