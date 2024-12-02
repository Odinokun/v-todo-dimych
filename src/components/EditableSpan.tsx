import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  title: string;
  callback: (title: string) => void;
};

export const EditableSpan: FC<PropsType> = ({ title, callback }) => {
  const [onEditTask, setOnEditTask] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setOnEditTask(false);
      callback(inputValue);
    }
  };

  const setOnFocus = () => setOnEditTask(true);
  const setOffFocus = () => {
    setOnEditTask(false);
    callback(inputValue);
  };

  return onEditTask ? (
    <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} onBlur={setOffFocus} autoFocus />
  ) : (
    <span onDoubleClick={setOnFocus}>{title}</span>
  );
};
