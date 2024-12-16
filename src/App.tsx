import { useState } from 'react';
import { v1 } from 'uuid';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { TaskType, Todolist } from './Todolist';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};
type AllTasksType = {
  [key: string]: TaskType[];
};

export type FilterType = 'all' | 'active' | 'completed';

function App() {
  const todolistsId1 = v1();
  const todolistsId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistsId1, title: 'To learn', filter: 'all' },
    { id: todolistsId2, title: 'Films', filter: 'active' },
  ]);
  const [allTasks, setAllTasks] = useState<AllTasksType>({
    [todolistsId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'Storybook', isDone: false },
    ],
    [todolistsId2]: [
      { id: v1(), title: 'Friends', isDone: true },
      { id: v1(), title: 'Game of Thrones', isDone: true },
      { id: v1(), title: 'Peaky Blinders', isDone: false },
      { id: v1(), title: 'Breaking Bad', isDone: false },
      { id: v1(), title: 'The Witcher', isDone: false },
    ],
  });

  const editTodolistName = (todolistId: string, title: string) =>
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl)));

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));

    delete allTasks[todolistId];
    setAllTasks({ ...allTasks });
  };

  const editTask = (todolistId: string, id: string, title: string) => {
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map(t => (t.id === id ? { ...t, title } : t)),
    });
  };

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setAllTasks({
      ...allTasks,
      [todolistId]: [newTask, ...allTasks[todolistId]],
    });
  };

  const removeTask = (todolistId: string, id: string) =>
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].filter((t: TaskType) => t.id !== id),
    });

  const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map((t: TaskType) => (t.id === id ? { ...t, isDone: isDone } : t)),
    });
  };

  const changeFilter = (todolistId: string, filterVal: FilterType) =>
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: filterVal } : tl)));

  const addTodolist = (todolistTitle: string) => {
    const newTodolist: TodolistType = {
      id: v1(),
      title: todolistTitle,
      filter: 'all',
    };
    setTodolists([newTodolist, ...todolists]);
    setAllTasks({ [newTodolist.id]: [], ...allTasks });
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
            ToDo app
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg'>
        <Grid container spacing={3} sx={{ padding: '20px 0', alignItems: 'stretch' }}>
          <Grid item xs={12}>
            <Card variant='elevation' elevation={4} component='article' sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant='h6' component='h2'>
                  Create new ToDo
                </Typography>
                <AddItemForm callback={addTodolist} errorText="Yo-yo!!! Where is the todolist's name!" />
              </CardContent>
            </Card>
          </Grid>

          {todolists.map(tl => {
            const getFilteredTasks = () => {
              switch (tl.filter) {
                case 'active':
                  return allTasks[tl.id].filter((t: TaskType) => !t.isDone);
                case 'completed':
                  return allTasks[tl.id].filter((t: TaskType) => t.isDone);
                default:
                  return allTasks[tl.id];
              }
            };
            const filteredTasks = getFilteredTasks();

            return (
              <Todolist
                key={tl.id}
                todolistId={tl.id}
                editTodolistName={editTodolistName}
                title={tl.title}
                tasks={filteredTasks}
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
}

export default App;
