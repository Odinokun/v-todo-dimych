import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  btnName: string;
  callback: (value: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ btnName, callback }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter' && newTaskTitle) {
      addTaskHandler();
    } else if (e.key === 'Enter' && !newTaskTitle) {
      setError('Title is required');
    }
  };
  const addTaskHandler = () => {
    if (!newTaskTitle.trim()) {
      setError('Title is required');
      setNewTaskTitle('');
      return;
    }
    callback(newTaskTitle.trim());
    setNewTaskTitle('');
  };

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addTaskHandler}>{btnName}</button>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};
