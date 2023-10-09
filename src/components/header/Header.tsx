import styles from './header.module.css';
import { ZoomButton } from '../zoomButton/zoomButton';
import { ZoomSelect } from '../zoomSelect/ZoomSelect';

const zoomValues = ['0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.25', '1.5'];

type HeaderProps = {
  zoom: string,
  setZoom: (value: string) => void,
  zoomIn: () => void,
  zoomOut: () => void,
  zoomCenter: () => void,
};

export const Header = ({ zoom, zoomIn, zoomOut, zoomCenter, setZoom }: HeaderProps) => {
  const disabledLessZoom = (): boolean => {
    const idx = zoomValues.indexOf(zoom);
    return idx === 0 ? true : false;
  };

  const disabledMoreZoom = (): boolean => {
    const lastElemIdx = zoomValues.length - 1;
    const idx = zoomValues.indexOf(zoom);
    return lastElemIdx === idx ? true : false;
  };

  return (
    <header className={styles.header}>
      <p className={styles.gradientText}>Categories</p>
      <div className={styles.wrapper}>
        <ZoomButton actionType="center" onClick={zoomCenter} />
        <ZoomButton actionType="out" onClick={zoomOut} disabled={disabledLessZoom()} />
        <ZoomSelect zoom={zoom} zoomValues={zoomValues} onChange={(e) => setZoom(e.target.value)} />
        <ZoomButton actionType="in" onClick={zoomIn} disabled={disabledMoreZoom()} />
      </div>
    </header>
  );
};