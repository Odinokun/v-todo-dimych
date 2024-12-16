import { expect, test } from 'vitest';
import {
  AddTodolistActionType,
  ChangeTodolistFilterActionType,
  EditTodolistNameActionType,
  RemoveTodolistActionType,
  todolistsReducer,
} from './todolists-reducer';
import { FilterType, TodolistType } from '../App';
import { v1 } from 'uuid';

test('todolist must be delete', () => {
  const todolistsId1 = v1();
  const todolistsId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistsId1, title: 'To learn', filter: 'all' },
    { id: todolistsId2, title: 'Films', filter: 'active' },
  ];
  const action: RemoveTodolistActionType = { type: 'REMOVE-TODOLIST', id: todolistsId1 };
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
  const action: AddTodolistActionType = { type: 'ADD-TODOLIST', title: newTodolistTitle };
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
  const action: EditTodolistNameActionType = { type: 'EDIT-TODOLIST-NAME', id: todolistsId1, title: newTitle };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[1].title).toEqual('Films');
});

test('target todolist`s filter must be changed', () => {
  const todolistsId1 = v1();
  const todolistsId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistsId1, title: 'To learn', filter: 'all' },
    { id: todolistsId2, title: 'Films', filter: 'active' },
  ];
  const newFilter: FilterType = 'completed';
  const action: ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistsId1,
    filter: newFilter,
  };
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe('active');
});
