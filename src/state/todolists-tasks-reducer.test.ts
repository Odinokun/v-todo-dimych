import { expect, test } from 'vitest';
import { AllTasksType, TodolistType } from '../App';
import { addTodolistAC, AddTodolistACType, todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';

test('Id new todolist & id new tasks must be equal', () => {
  const initialTasksState: AllTasksType = {};
  const initialTodolistsState: TodolistType[] = [];

  const action: AddTodolistACType = addTodolistAC('New todolist title');

  const endTasksState: AllTasksType = tasksReducer(initialTasksState, action);
  const endTodolistsState: TodolistType[] = todolistsReducer(initialTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistId);
  expect(idFromTodolists).toBe(action.payload.todolistId);
});
