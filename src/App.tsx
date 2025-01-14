import React, { useCallback } from 'react';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  editTodolistNameAC,
  removeTodolistAC,
} from './state/todolists-reducer';
import { addTaskAC, changeStatusAC, editTaskAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

import { Header } from './components/Header/Header';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { TaskType, Todolist } from './Todolist';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type AllTasksType = {
  [key: string]: TaskType[];
};

export type FilterType = 'all' | 'active' | 'completed';

const App = React.memo(() => {
  console.log('App => ');
  const dispatch = useDispatch();

  // First type is GlobalStateType, second type is TodolistType[]
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
  // First type is GlobalStateType, second type is AllTasksType
  const allTasks = useSelector<AppRootStateType, AllTasksType>(state => state.tasks);

  const deleteTodolist = useCallback(
    (todolistId: string) => dispatch(removeTodolistAC(todolistId)),
    [dispatch]
  );

  const addTodolist = useCallback(
    (todolistTitle: string) => dispatch(addTodolistAC(todolistTitle)),
    [dispatch]
  );

  const editTodolistName = useCallback(
    (todolistId: string, title: string) => dispatch(editTodolistNameAC(todolistId, title)),
    [dispatch]
  );

  const changeFilter = useCallback(
    (todolistId: string, filterVal: FilterType) =>
      dispatch(changeTodolistFilterAC(todolistId, filterVal)),
    [dispatch]
  );

  const addTask = useCallback(
    (todolistId: string, title: string) => dispatch(addTaskAC(todolistId, title)),
    [dispatch]
  );

  const editTask = useCallback(
    (todolistId: string, id: string, title: string) => dispatch(editTaskAC(todolistId, id, title)),
    [dispatch]
  );

  const removeTask = useCallback(
    (todolistId: string, id: string) => dispatch(removeTaskAC(todolistId, id)),
    [dispatch]
  );

  const changeStatus = useCallback(
    (todolistId: string, id: string, isDone: boolean) =>
      dispatch(changeStatusAC(todolistId, id, isDone)),
    [dispatch]
  );

  return (
    <>
      <Header />

      <Container maxWidth='lg'>
        <Grid container spacing={3} sx={{ padding: '20px 0', alignItems: 'stretch' }}>
          <Grid item xs={12}>
            <Card variant='elevation' elevation={4} component='article' sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant='h6' component='h2'>
                  Create new ToDo
                </Typography>
                <AddItemForm
                  callback={addTodolist}
                  errorText="Yo-yo!!! Where is the todolist's name!"
                />
              </CardContent>
            </Card>
          </Grid>

          {todolists.map(tl => {
            return (
              <Todolist
                key={tl.id}
                todolistId={tl.id}
                editTodolistName={editTodolistName}
                title={tl.title}
                tasks={allTasks[tl.id]}
                removeTask={removeTask}
                addTask={addTask}
                editTask={editTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                deleteTodolist={deleteTodolist}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
});

export default App;
