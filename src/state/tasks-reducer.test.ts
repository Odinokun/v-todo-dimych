import { v1 } from 'uuid';
import { expect, test } from 'vitest';
import { AllTasksType } from '../App';
import {
  addTaskAC,
  AddTaskACType,
  addTasksAC,
  AddTasksACType,
  changeStatusAC,
  ChangeStatusACType,
  editTaskAC,
  EditTaskACType,
  removeTaskAC,
  RemoveTaskACType,
  tasksReducer,
} from './tasks-reducer';

const todolistsId_1 = v1();
const todolistsId_2 = v1();

const initialState: AllTasksType = {
  [todolistsId_1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
    { id: v1(), title: 'Storybook', isDone: false },
  ],
  [todolistsId_2]: [
    { id: v1(), title: 'Friends', isDone: true },
    { id: v1(), title: 'Game of Thrones', isDone: true },
    { id: v1(), title: 'Peaky Blinders', isDone: false },
    { id: v1(), title: 'Breaking Bad', isDone: false },
    { id: v1(), title: 'The Witcher', isDone: false },
  ],
};

test('Task must be added', () => {
  const newTitle = 'New task title';
  const action: AddTaskACType = addTaskAC(todolistsId_2, newTitle);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_2].length).toBe(6);
  expect(endState[todolistsId_2][0].title).toEqual(newTitle);
  expect(endState[todolistsId_2][0].isDone).toBe(false);
});
test('Tasks must must be added', () => {
  const id = v1();
  const action: AddTasksACType = addTasksAC(id);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[id].length).toBe(0);
});
test('Current task must be changed', () => {
  const id = initialState[todolistsId_2][0].id;
  const newTitle = 'New task title!';
  const action: EditTaskACType = editTaskAC(todolistsId_2, id, newTitle);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_2][0].title).toEqual(newTitle);
});
test('Target task must be removed', () => {
  const removeId = initialState[todolistsId_2][0].id;
  const secondId = initialState[todolistsId_2][1].id;
  const action: RemoveTaskACType = removeTaskAC(todolistsId_2, removeId);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_2].length).toBe(4);
  expect(endState[todolistsId_2][0].id).toEqual(secondId);
});
test('Target task`s status must be changed', () => {
  const id = initialState[todolistsId_2][0].id;
  const action: ChangeStatusACType = changeStatusAC(todolistsId_2, id, false);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_2][0].isDone).toBe(false);
});
