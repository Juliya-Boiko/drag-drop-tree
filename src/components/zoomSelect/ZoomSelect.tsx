import styles from './zoomSelect.module.css';

type SelectProps = {
  zoom: string,
  zoomValues: string[],
  onChange: (e: any) => void,
};

export const ZoomSelect = ({ zoom, zoomValues, onChange }: SelectProps) => {
  return (
    <select
      id="zoom-select"
      value={zoom}
      onChange={onChange}
      className={styles.select}
    >
      {zoomValues.map((value: string) => {
        return <option key={value} value={value}>{value}</option>
      })}
    </select>
  );
};