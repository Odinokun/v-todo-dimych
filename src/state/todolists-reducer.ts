import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type EditTodolistNameACType = ReturnType<typeof editTodolistNameAC>;
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;

type ActionsType = RemoveTodolistACType | EditTodolistNameACType | ChangeTodolistFilterACType | AddTodolistACType;

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			const { id } = action.payload;
			return state.filter(tl => tl.id !== id);
		}
		case 'EDIT-TODOLIST-NAME': {
			const { id, title } = action.payload;
			return state.map(tl => (tl.id === id ? { ...tl, title } : tl));
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const { id, filter } = action.payload;
			return state.map(tl => (tl.id === id ? { ...tl, filter } : tl));
		}
		case 'ADD-TODOLIST': {
			const { todolistId, title } = action.payload;
			const newTodolist: TodolistType = { id: todolistId, title, filter: 'all' };
			return [newTodolist, ...state];
		}
		default:
			throw new Error('I don`t understand this type');
	}
};

export const removeTodolistAC = (id: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: { id },
	} as const;
};
export const editTodolistNameAC = (id: string, title: string) => {
	return {
		type: 'EDIT-TODOLIST-NAME',
		payload: { id, title },
	} as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		payload: { id, filter },
	} as const;
};
export const addTodolistAC = (title: string) => {
	return {
		type: 'ADD-TODOLIST',
		payload: { todolistId: v1(), title },
	} as const;
};
