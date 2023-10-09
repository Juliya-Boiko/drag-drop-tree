import styles from './zoomButton.module.css';

type ElementProps = { action: string, icon: React.ReactNode };

const zoomIcons: ElementProps[]  = [
{
  action: 'center',
  icon: <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 2)"><path d="m15.5.465-8 8.033"/><path d="m10.5 16.5-3-8.002-7-2.998 15-5z"/></g></svg>
},
{
  action: 'in',
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
},
{
  action: 'out',
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/> </svg>
},
];

type ZoomButtonProps = {
  actionType: string,
  onClick: () => void,
  disabled?: boolean,
};

export const ZoomButton = ({ onClick, actionType, disabled }: ZoomButtonProps) => {
  const getIcon = (): ElementProps => {
    const currentItem = zoomIcons.find(item => item.action === actionType);
    return currentItem ? currentItem : zoomIcons[0];
  };

  return (
    <button
      type="button"
      title={`zoom ${actionType}`}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {getIcon().icon}
    </button>
  );
};

