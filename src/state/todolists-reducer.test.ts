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
  RemoveTodoACType,
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
  const action: RemoveTodoACType = removeTodolistAC(todolistsId_1);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistsId_2);
});
test('todolist must be added', () => {
  const newTitle = 'New todolist';
  const id = v1();
  const action: AddTodolistACType = addTodolistAC(id, newTitle);
  const endState: TodolistType[] = todolistsReducer(initialState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].id).toEqual(id);
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[0].filter).toEqual('all');
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
