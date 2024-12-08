import { ChangeEvent, FC } from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';

import { FilterType } from './App';

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
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px' }}>
          <EditableSpan title={title} callback={editTodolistNameHandler} />
        </h3>
        <Button title='del todolist' onClick={deleteTodolistHandler} />
      </div>

      <AddItemForm
        btnName='add task'
        callback={addTaskHandler}
        errorName='Hey dude!!! This field is required!'
      />

      <div>
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
      </div>

      <ul>
        {tasks.map(t => {
          const onRemoveHandler = () => removeTask(todolistId, t.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
          const onChangeTitleHandler = (newTaskTitle: string) =>
            editTask(todolistId, t.id, newTaskTitle);

          return (
            <li key={t.id} className={t.isDone ? 'completed' : ''}>
              <IconButton onClick={onRemoveHandler} color='error'>
                <DeleteIcon />
              </IconButton>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan title={t.title} callback={onChangeTitleHandler} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
