import React, { ChangeEvent, FC, useCallback } from 'react';

import { TaskType } from '../../Todolist';

import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { EditableSpan } from '../EditableSpan/EditableSpan';

type PropsType = {
  removeTask: (todolistId: string, id: string) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  editTask: (todolistId: string, id: string, title: string) => void;
  todolistId: string;
  task: TaskType;
};

export const Task: FC<PropsType> = React.memo(
  ({ removeTask, changeTaskStatus, editTask, todolistId, task }) => {
    const onRemoveHandler = () => removeTask(todolistId, task.id);
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
    const onChangeTitleHandler = useCallback(
      (newTaskTitle: string) => editTask(todolistId, task.id, newTaskTitle),
      [editTask, todolistId, task.id]
    );

    return (
      <ListItem key={task.id} disablePadding sx={task.isDone ? { opacity: '.5' } : null}>
        <IconButton onClick={onRemoveHandler} color='error'>
          <DeleteIcon />
        </IconButton>

        <Checkbox
          size='small'
          color='success'
          checked={task.isDone}
          onChange={onChangeStatusHandler}
        />

        <Typography variant='body1' component='span'>
          <EditableSpan title={task.title} callback={onChangeTitleHandler} />
        </Typography>
      </ListItem>
    );
  }
);
