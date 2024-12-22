import { v1 } from 'uuid';
import { expect, test } from 'vitest';
import { AllTasksType } from '../App';
import {
  addTaskAC,
  AddTaskACType,
  changeStatusAC,
  ChangeStatusACType,
  editTaskAC,
  EditTaskACType,
  removeTaskAC,
  RemoveTaskACType,
  tasksReducer,
} from './tasks-reducer';
import { addTodolistAC, AddTodolistACType, removeTodolistAC, RemoveTodolistACType } from './todolists-reducer';

const todolistsId_1 = v1();
const todolistsId_2 = v1();

const initialState: AllTasksType = {
  [todolistsId_1]: [
    { id: '1', title: 'HTML&CSS', isDone: true },
    { id: '2', title: 'JS', isDone: true },
    { id: '3', title: 'React', isDone: false },
  ],
  [todolistsId_2]: [
    { id: '1', title: 'Friends', isDone: true },
    { id: '2', title: 'Game of Thrones', isDone: true },
    { id: '3', title: 'Peaky Blinders', isDone: false },
  ],
};

test('New task must be added', () => {
  const newTitle = 'New task title';

  const action: AddTaskACType = addTaskAC(todolistsId_2, newTitle);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_1].length).toBe(3);
  expect(endState[todolistsId_2].length).toBe(4);
  expect(endState[todolistsId_2][0].id).toBeDefined();
  expect(endState[todolistsId_2][0].title).toEqual(newTitle);
  expect(endState[todolistsId_2][0].isDone).toBe(false);
});

test('Current task title must be changed', () => {
  const newTitle = 'New task title!';

  const action: EditTaskACType = editTaskAC(todolistsId_2, '2', newTitle);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_1][1].title).toBe('JS');
  expect(endState[todolistsId_2][1].title).toEqual(newTitle);
});

test('Target task must be removed', () => {
  const action: RemoveTaskACType = removeTaskAC(todolistsId_2, '2');
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_1].length).toBe(3);
  expect(endState[todolistsId_2].length).toBe(2);
  expect(endState[todolistsId_1].some(t => t.id === '2')).toBeTruthy();
  expect(endState[todolistsId_2].every(t => t.id !== '2')).toBeTruthy();
});

test('Target task`s status must be changed', () => {
  const action: ChangeStatusACType = changeStatusAC(todolistsId_2, '2', false);
  const endState: AllTasksType = tasksReducer(initialState, action);

  expect(endState[todolistsId_1][1].isDone).toBeTruthy();
  expect(endState[todolistsId_2][1].isDone).toBeFalsy();
});

test('New key with tasks array must be added when new todolist was added', () => {
  const action: AddTodolistACType = addTodolistAC('Some title');
  const endState: AllTasksType = tasksReducer(initialState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== todolistsId_1 && k !== todolistsId_2);
  if (!newKey) {
    throw Error('New key must be added!');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('Key and task`s array must be deleted', () => {
  const action: RemoveTodolistACType = removeTodolistAC(todolistsId_2);
  const endState: AllTasksType = tasksReducer(initialState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistsId_2]).toBeUndefined();
  // expect(endState[todolistsId_2]).not.toBeDefined();
});
