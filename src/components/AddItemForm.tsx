import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  btnName: string;
  callback: (value: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ btnName, callback }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter' && inputValue) {
      onSendInputValue();
    } else if (e.key === 'Enter' && !inputValue) {
      setError('Title is required');
    }
  };
  const onSendInputValue = () => {
    if (!inputValue.trim()) {
      setError('Title is required');
      setInputValue('');
      return;
    }
    callback(inputValue.trim());
    setInputValue('');
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={onInputValueChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={onSendInputValue}>{btnName}</button>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};
