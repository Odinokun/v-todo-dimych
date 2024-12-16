import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';

export type RemoveTodoActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodoActionType = {
  type: 'ADD-TODOLIST';
  title: string;
};
export type EditTodoNameActionType = {
  type: 'EDIT-TODOLIST-NAME';
  id: string;
  title: string;
};
export type ChangeTodoFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterType;
};

type ActionsType = RemoveTodoActionType | AddTodoActionType | EditTodoNameActionType | ChangeTodoFilterActionType;

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      return [{ id: v1(), title: action.title, filter: 'all' }, ...state];
    case 'EDIT-TODOLIST-NAME':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl));
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter as FilterType } : tl));
    default:
      throw new Error('I don`t understand this type');
  }
};

// begin ACTION CREATORS
export const RemoveTodoAC = (todolistId: string): RemoveTodoActionType => ({
  type: 'REMOVE-TODOLIST',
  id: todolistId,
});
export const AddTodoAC = (title: string): AddTodoActionType => ({ type: 'ADD-TODOLIST', title });
export const EditTodoNameAC = (id: string, title: string): EditTodoNameActionType => ({
  type: 'EDIT-TODOLIST-NAME',
  id,
  title,
});
export const ChangeTodoFilterAC = (id: string, filter: FilterType): ChangeTodoFilterActionType => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id,
  filter,
});
