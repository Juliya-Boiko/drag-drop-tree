import styles from './category.module.css';
import { useState } from 'react';
import { ActionButton } from '../actionButton/ActionButton';
import { CustomForm } from '../customForm/CustomForm';

type CategoryProps = {
  initState?: string,
  children?: JSX.Element,
  hideActions?: boolean
};

type ItemProps = {
  id: string,
  inputValue: string,
};

export const Category = ({ initState, children, hideActions }: CategoryProps) => {
  const [childs, setChilds] = useState<Array<ItemProps>>([]);
  const [newItem, setNewItem] = useState<{ showInput: boolean, inputValue: "" }>({ showInput: false, inputValue: "" });
  const [editedItem, setEditedItem] = useState<{ showInput: boolean, id: string | null, inputValue: string }>({ showInput: false, id: null, inputValue: "" });

  const uniqueId = (): string => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
  };

  const addNewItem = () => {
    setChilds(prev => { return [...prev, { id: uniqueId(), inputValue: newItem.inputValue }] });
    setNewItem({ showInput: false, inputValue: "" });
  };

  const deleteItem = (id: string) => {
    console.log(id);
    const filtered = childs.filter(child => child.id !== id);
    setChilds(filtered);
  };

  const updateItem = () => {
    const idx = childs.findIndex(item => item.id === editedItem.id);
    const arr = [...childs];
    arr[idx].inputValue = editedItem.inputValue;
    setChilds(arr);
    setEditedItem({ showInput: false, id: null, inputValue: "" });
  };

  return (
    <div className={styles.item}>
      <div className={`${styles.title} ${childs.length > 0 ? `${styles.parent}` : ''}`}>
        {!hideActions && <>
          <span className={`${styles.text} ${editedItem.showInput}`}>{initState ? initState : 'Categories'}</span>
          <ActionButton actionType="add" onClick={() => setNewItem(prev => { return { ...prev, showInput: true } })} />
        </>}
        {children}
      </div>
      
      <ul className={styles.list}>
        {childs.map(({ id, inputValue }) => (
          <li key={id} className={styles.child}>
            <Category initState={inputValue} hideActions={id === editedItem.id}>
              {editedItem.showInput && editedItem.id === id ?
                <div className={styles.editBlock}>
                  <CustomForm
                    value={editedItem.inputValue}
                    onChange={(e) => setEditedItem(prev => { return { ...prev, inputValue: e.target.value } })}
                    confirm={updateItem}
                    cancel={() => setEditedItem({ showInput: false, id: null, inputValue: "" })}
                  />
                </div>
                :
                <>
                  <ActionButton actionType="edit" title="open editor" onClick={() => setEditedItem({ showInput: true, id, inputValue })} />
                  <ActionButton actionType="delete" onClick={() => deleteItem(id)} />
                </>
              }
            </Category>
          </li>
        ))}
        {newItem.showInput && (
          <li key={"add-input"} className={`${styles.item} ${styles.child}`}>
            <div className={styles.title}>
              <CustomForm
                placeholder='enter category'
                value={newItem.inputValue}
                onChange={(e) => setNewItem(prev => { return { ...prev, inputValue: e.target.value } })}
                confirm={addNewItem}
                cancel={() => setNewItem({ showInput: false, inputValue: "" })}
              />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};