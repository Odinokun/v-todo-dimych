import { expect, test } from 'vitest';
import { todolistsReducer } from './todolists-reducer';
import { TodolistType } from '../App';
import { v1 } from 'uuid';

test('todolist must be delete', () => {
  const todolistsId1 = v1();
  const todolistsId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistsId1, title: 'To learn', filter: 'all' },
    { id: todolistsId2, title: 'Films', filter: 'active' },
  ];
  const action = { type: 'REMOVE-TODOLIST', id: todolistsId1 };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistsId2);
});

test('todolist must be added', () => {
  const todolistsId1 = v1();
  const todolistsId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistsId1, title: 'To learn', filter: 'all' },
    { id: todolistsId2, title: 'Films', filter: 'active' },
  ];
  const newTodolistTitle = 'New todolist';
  const action = { type: 'ADD-TODOLIST', title: newTodolistTitle };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toEqual(newTodolistTitle);
  expect(endState[0].filter).toEqual('all');
});

test('target todolist title must be changed', () => {
  const todolistsId1 = v1();
  const todolistsId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistsId1, title: 'To learn', filter: 'all' },
    { id: todolistsId2, title: 'Films', filter: 'active' },
  ];
  const newTitle = 'New title';
  const action = { type: 'EDIT-TODOLIST-NAME', id: todolistsId1, title: newTitle };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[1].title).toEqual(startState[1].title);
});
