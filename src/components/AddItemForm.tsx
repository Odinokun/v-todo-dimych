import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

type PropsType = {
  callback: (value: string) => void;
  errorText: string;
};

export const AddItemForm: FC<PropsType> = ({ callback, errorText }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    if (e.key === 'Enter' && inputValue) {
      onSendInputValue();
    } else if (e.key === 'Enter' && !inputValue) {
      setError(true);
    }
  };
  const onSendInputValue = () => {
    if (!inputValue.trim()) {
      setError(true);
      setInputValue('');
      return;
    }
    callback(inputValue.trim());
    setInputValue('');
  };

  return (
    <Box style={{ marginBottom: '10px' }}>
      <TextField
        size='small'
        error={error}
        helperText={error ? errorText : ''}
        value={inputValue}
        onChange={onInputValueChangeHandler}
        onKeyDown={onKeyPressHandler}
      />
      <IconButton onClick={onSendInputValue} color='success' size='small'>
        <Add />
      </IconButton>
    </Box>
  );
};
