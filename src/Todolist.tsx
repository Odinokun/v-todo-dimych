import React, { ChangeEvent, FC, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { EditableSpan } from './components/EditableSpan/EditableSpan';

import { FilterType } from './App';
import { Task } from './components/Task/Task';

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

export const Todolist: FC<PropsType> = React.memo(
  ({
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
    const editTodolistNameHandler = useCallback(
      (title: string) => editTodolistName(todolistId, title),
      [editTodolistName, todolistId]
    );
    const deleteTodolistHandler = () => deleteTodolist(todolistId);
    const onAllClickHandler = useCallback(
      () => changeFilter(todolistId, 'all'),
      [changeFilter, todolistId]
    );
    const onActiveClickHandler = useCallback(
      () => changeFilter(todolistId, 'active'),
      [changeFilter, todolistId]
    );
    const onCompletedClickHandler = useCallback(
      () => changeFilter(todolistId, 'completed'),
      [changeFilter, todolistId]
    );
    const addTaskHandler = useCallback(
      (newTaskTitle: string) => addTask(todolistId, newTaskTitle),
      [addTask, todolistId]
    );

    const getFilteredTasks = () => {
      switch (filter) {
        case 'active':
          return tasks.filter((t: TaskType) => !t.isDone);
        case 'completed':
          return tasks.filter((t: TaskType) => t.isDone);
        default:
          return tasks;
      }
    };
    const filteredTasks = getFilteredTasks();

    return (
      <Grid item xs={4}>
        <Card variant='elevation' elevation={4} component='article' sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' component='h2'>
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
              errorText='Hey dude!!! This field is required!'
            />

            <Stack spacing={{ xs: 1 }} direction='row' useFlexGap sx={{ flexWrap: 'wrap' }}>
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
            </Stack>

            <List>
              {filteredTasks.map(t => (
                <Task
                  key={t.id}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  editTask={editTask}
                  todolistId={todolistId}
                  task={t}
                />
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
);
