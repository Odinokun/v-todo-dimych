import { ChangeEvent, FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';

import { FilterType } from './App';
import Typography from '@mui/material/Typography';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  editTodolistName: (todolistId: string, title: string) => void;
  title: string;
  tasks: TaskType[];
  removeTask: (todolistId: string, id: string) => void;
  addTask: (todolistId: string, title: string) => void;
  editTask: (todolistId: string, id: string, title: string) => void;
  changeFilter: (todolistId: string, filterVal: FilterType) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  filter: FilterType;
  deleteTodolist: (todolistId: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  editTodolistName,
  title,
  tasks,
  removeTask,
  addTask,
  editTask,
  changeFilter,
  changeTaskStatus,
  filter,
  deleteTodolist,
}) => {
  const editTodolistNameHandler = (title: string) =>
    editTodolistName(todolistId, title);
  const deleteTodolistHandler = () => deleteTodolist(todolistId);

  const onAllClickHandler = () => changeFilter(todolistId, 'all');
  const onActiveClickHandler = () => changeFilter(todolistId, 'active');
  const onCompletedClickHandler = () => changeFilter(todolistId, 'completed');

  const addTaskHandler = (newTaskTitle: string) =>
    addTask(todolistId, newTaskTitle);

  return (
    <Box component='section'>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h5' component='h2'>
          <EditableSpan title={title} callback={editTodolistNameHandler} />
        </Typography>

        <IconButton
          onClick={deleteTodolistHandler}
          style={{ marginLeft: 'auto' }}
          color='error'
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <AddItemForm
        callback={addTaskHandler}
        errorName='Hey dude!!! This field is required!'
      />

      <Box>
        <Button
          onClick={onAllClickHandler}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color='primary'
          size='small'
        >
          All
        </Button>
        <Button
          onClick={onActiveClickHandler}
          variant={filter === 'active' ? 'contained' : 'outlined'}
          color='warning'
          size='small'
        >
          Active
        </Button>
        <Button
          onClick={onCompletedClickHandler}
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          color='success'
          size='small'
        >
          Completed
        </Button>
      </Box>

      <List>
        {tasks.map(t => {
          const onRemoveHandler = () => removeTask(todolistId, t.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
          const onChangeTitleHandler = (newTaskTitle: string) =>
            editTask(todolistId, t.id, newTaskTitle);

          return (
            <ListItem
              key={t.id}
              disablePadding
              sx={t.isDone ? { opacity: '.5' } : null}
            >
              <IconButton onClick={onRemoveHandler} color='error'>
                <DeleteIcon />
              </IconButton>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <Typography variant='body1'>
                <EditableSpan title={t.title} callback={onChangeTitleHandler} />
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
