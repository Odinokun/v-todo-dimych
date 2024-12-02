import { useState } from 'react';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';
import './App.css';
import { AddItemForm } from './components/AddItemForm';

type TodolistType = {
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

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));

    delete allTasks[todolistId];
    setAllTasks({ ...allTasks });
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setAllTasks({ ...allTasks, [todolistId]: [newTask, ...allTasks[todolistId]] });
  };

  const removeTask = (id: string, todolistId: string) =>
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].filter((t: TaskType) => t.id !== id),
    });

  const changeStatus = (id: string, todolistId: string, isDone: boolean) => {
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map((t: TaskType) => (t.id === id ? { ...t, isDone: isDone } : t)),
    });
  };

  const changeFilter = (filterVal: FilterType, todolistId: string) =>
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
    <div className='App'>
      <AddItemForm btnName='add task' callback={addTodolist} errorName="Yo-yo!!! Where is the todolist's name!" />
      <br />
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
            title={tl.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            deleteTodolist={deleteTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
