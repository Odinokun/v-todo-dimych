import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
};
export type EditTodolistNameActionType = {
  type: 'EDIT-TODOLIST-NAME';
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistNameActionType
  | ChangeTodolistFilterActionType;

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
