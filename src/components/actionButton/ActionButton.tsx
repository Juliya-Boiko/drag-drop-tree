import styles from './actionButton.module.css';

type ElementProps = { action: string, icon: React.ReactNode };

const actionIcons: ElementProps[] = [{
    action: 'add',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.icon} ${styles.iconAdd}`} viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
  },
  {
    action: 'done',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.icon} ${styles.iconDone}`} viewBox="0 0 16 16"> <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/> </svg>
  },
  {
    action: 'delete',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.icon} ${styles.iconDelete}`} viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
  },
  {
    action: 'edit',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.icon} ${styles.iconDone}`} viewBox="0 0 24 24"><path d="M19.4,7.34h0L16.66,4.6A2,2,0,0,0,14,4.53l-9,9a2,2,0,0,0-.57,1.21L4,18.91a1,1,0,0,0,.29.8A1,1,0,0,0,5,20h.09l4.17-.38a2,2,0,0,0,1.21-.57l9-9A1.92,1.92,0,0,0,19.4,7.34ZM9.08,17.62l-3,.28.27-3L12,9.32l2.7,2.7ZM16,10.68,13.32,8,15.27,6,18,8.73Z"/></svg>
  }
];


type ButtonProps = {
  actionType: string,
  disabled?: boolean,
  title?: string,
  onClick: () => void,
};

export const ActionButton = ({ onClick, actionType, disabled, title }: ButtonProps) => {
  const getIcon = (): ElementProps => {
    const currentItem = actionIcons.find(item => item.action === actionType);
    return currentItem ? currentItem : actionIcons[0];
  };

  return (
    <button
      type="button"
      disabled={disabled}
      title={title ? title : actionType}
      onClick={onClick}
      className={styles.button}
    >
      {getIcon().icon}
    </button>
  );
};