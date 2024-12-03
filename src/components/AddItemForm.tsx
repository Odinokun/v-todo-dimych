import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  btnName: string;
  callback: (value: string) => void;
  errorName: string;
};

export const AddItemForm: FC<PropsType> = ({ btnName, callback, errorName }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter' && inputValue) {
      onSendInputValue();
    } else if (e.key === 'Enter' && !inputValue) {
      setError(errorName);
    }
  };
  const onSendInputValue = () => {
    if (!inputValue.trim()) {
      setError(errorName);
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
        style={{ marginRight: '5px' }}
      />
      <button onClick={onSendInputValue}>{btnName}</button>
      {error && <div className='error-message'>{errorName}</div>}
    </div>
  );
};
