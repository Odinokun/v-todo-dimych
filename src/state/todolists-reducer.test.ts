import { beforeEach, expect, test } from 'vitest';
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

const state: TodolistType[] = [
	{ id: '1', title: 'To learn', filter: 'all' },
	{ id: '2', title: 'Films', filter: 'active' },
];

let initialState: TodolistType[];

beforeEach(() => {
	initialState = state;
});

test('Target todolist must be deleted', () => {
	const action: RemoveTodolistACType = removeTodolistAC('1');
	const endState: TodolistType[] = todolistsReducer(initialState, action);

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe('2');
});

test('target todolist title must be changed', () => {
	const newTitle = 'New title';

	const action: EditTodolistNameACType = editTodolistNameAC('1', newTitle);
	const endState: TodolistType[] = todolistsReducer(initialState, action);

	expect(endState.length).toBe(2);
	expect(endState[0].title).toBe(newTitle);
	expect(endState[1].title).toBe('Films');
});

test('target todolist`s filter must be changed', () => {
	const newFilter: FilterType = 'completed';

	const action: ChangeTodolistFilterACType = changeTodolistFilterAC('1', newFilter);
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
