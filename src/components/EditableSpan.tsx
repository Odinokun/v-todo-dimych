import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  title: string;
  callback: (title: string) => void;
};

export const EditableSpan: FC<PropsType> = ({ title, callback }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      callback(inputValue);
    }
  };

  const onEditMode = () => {
    setEditMode(true);
    setInputValue(title);
  };
  const offEditMode = () => {
    setEditMode(false);
    callback(inputValue);
  };

  return editMode ? (
    <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} onBlur={offEditMode} autoFocus />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};
