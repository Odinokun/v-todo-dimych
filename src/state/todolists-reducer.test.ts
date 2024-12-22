import { expect, test } from 'vitest';
import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';
import {
  addTodolistAC,
  AddTodolistACType,
  changeTodolistFilterAC,
  ChangeTodolistFilterACType,
  editTodolistNameAC,
  EditTodolistNameACType,
  RemoveTodolistACType,
  removeTodolistAC,
  todolistsReducer,
} from './todolists-reducer';

const todolistsId_1 = v1();
const todolistsId_2 = v1();
const initialState: TodolistType[] = [
  { id: todolistsId_1, title: 'To learn', filter: 'all' },
  { id: todolistsId_2, title: 'Films', filter: 'active' },
];

test('todolist must be delete', () => {
  const action: RemoveTodolistACType = removeTodolistAC(todolistsId_1);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistsId_2);
});

test('target todolist title must be changed', () => {
  const newTitle = 'New title';
  const action: EditTodolistNameACType = editTodolistNameAC(todolistsId_1, newTitle);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[1].title).toEqual('Films');
});

test('target todolist`s filter must be changed', () => {
  const newFilter: FilterType = 'completed';
  const action: ChangeTodolistFilterACType = changeTodolistFilterAC(todolistsId_1, newFilter);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe('active');
});

test('todolist must be added', () => {
  const newTitle = 'New todolist';

  const action: AddTodolistACType = addTodolistAC(newTitle);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].id).toBeDefined();
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[0].filter).toEqual('all');
});
